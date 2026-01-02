import fs from 'node:fs';

const logoDir = fs.readdirSync(`${import.meta.dirname}/../src/assets/logos`, {
  recursive: true,
});

const data = [];
const imports = [];
logoDir.entries().forEach(([, value]) => {
  const stats = fs.statSync(
    `${import.meta.dirname}/../src/assets/logos/${value}`,
  );
  if (stats.isDirectory() || value.includes('.DS_Store')) {
    return;
  }
  const parts = value.split('/');
  const filename = parts[parts.length - 1];
  const importname = value
    .split('.')[0]
    .replaceAll(/[\s)&/-]/g, '')
    // .replaceAll(' ', '')
    // .replaceAll('-', '')
    // .replaceAll(')', '')
    // .replaceAll('&', '')
    // .replaceAll('/', '')
    .replaceAll('+', 'plus')
    .replaceAll('(', '_');
  imports.push(`import ${importname} from './assets/logos/${value}';`);
  data.push(
    `  {\n    url: ${importname},\n    name: '${
      filename.split('.')[0]
    }',\n    style: '${parts[0]}',\n    category: '${parts[1]}',\n  },`,
  );
});

const fileData = `
${imports.join('\n')}
export const staticLogos = [
${data.join('\n')}
];
`;

fs.writeFileSync(`${import.meta.dirname}/../src/logos.ts`, fileData, {
  encoding: 'utf-8',
});
