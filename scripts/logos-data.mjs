import fs from 'node:fs';

function readPngDimensions(filePath) {
  const buf = Buffer.alloc(24);
  const fd = fs.openSync(filePath, 'r');
  fs.readSync(fd, buf, 0, 24, 0);
  fs.closeSync(fd);
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

const dirs = [
  'Dark - Black & White',
  'Dark - Color',
  'Dark - Just Black',
  'Light - Black & White',
  'Light - Color',
  'Light - Just White',
  'Thick Outlines',
  'Thin Outlines',
].forEach((dirName) => {
  const logoDir = fs.readdirSync(
    `${import.meta.dirname}/../src/assets/logos/${dirName}`,
    {
      recursive: true,
    },
  );
  const data = [];
  const imports = [];
  logoDir.entries().forEach(([, value], index) => {
    const stringIndex = index.toString().padStart(4, '0');
    const filePath = `${import.meta.dirname}/../src/assets/logos/${dirName}/${value}`;
    const stats = fs.statSync(filePath);
    const easyDirname = dirName.replaceAll(/[\s&-]/g, '');
    if (stats.isDirectory() || value.includes('.DS_Store')) {
      return;
    }
    const parts = value.split('/');
    const filename = parts[parts.length - 1];
    const importname = `${easyDirname}${value
      .replace('.png', `_${stringIndex}`)
      .replaceAll(/[^a-zA-Z0-9_]/g, '')}`;
    const { width, height } = readPngDimensions(filePath);
    imports.push(`import ${importname} from "./${dirName}/${value}";`);
    data.push(
      `  {\n    url: ${importname},\n    name: '${filename
        .replace('.png', '')
        .replaceAll(
          /[^\sa-zA-Z0-9+]/g,
          ' ',
        )}',\n    style: '${dirName}',\n    category: '${parts[0]}',\n    width: ${width},\n    height: ${height},\n  },`,
    );
    const fileData = `
${imports.join('\n')}
export const staticLogos${dirName.replaceAll(/[\s&-]/g, '')} = [
${data.join('\n')}
];
`;
    fs.writeFileSync(
      `${import.meta.dirname}/../src/assets/logos/logos-${easyDirname}.ts`,
      fileData,
      {
        encoding: 'utf-8',
      },
    );
  });
});
