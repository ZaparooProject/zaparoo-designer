import fs from 'node:fs';

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
    const stats = fs.statSync(
      `${import.meta.dirname}/../src/assets/logos/${dirName}/${value}`,
    );
    const easyDirname = dirName.replaceAll(/[\s&-]/g, '');
    if (stats.isDirectory() || value.includes('.DS_Store')) {
      return;
    }
    const parts = value.split('/');
    const filename = parts[parts.length - 1];
    const importname = `${easyDirname}${value
      .replace('.png', `_${stringIndex}`)
      .replaceAll(/[^a-zA-Z0-9_]/g, '')}`;
    imports.push(`import ${importname} from "./${dirName}/${value}";`);
    data.push(
      `  {\n    url: ${importname},\n    name: '${filename
        .replace('.png', '')
        .replaceAll(
          /[^\sa-zA-Z0-9+]/g,
          ' ',
        )}',\n    style: '${dirName}',\n    category: '${parts[0]}',\n  },`,
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
