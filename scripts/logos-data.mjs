import fs from 'node:fs';
import path from 'node:path';

const logoDir = fs.readdirSync(`${import.meta.dirname}/../src/assets/logos`, {
  recursive: true,
});

const data = [];
const imports = [];
logoDir.entries().forEach(([, value]) => {
  const stats = fs.statSync(
    `${import.meta.dirname}/../src/assets/logos/${value}`,
  );
  if (stats.isDirectory()) {
    return;
  }
  const parts = value.split('/');
  const filename = parts[parts.length - 1];
  const importname = filename
    .split('.')[0]
    .replaceAll(' ', '')
    .replaceAll('-', '')
    .replaceAll(')', '')
    .replaceAll('(', '_');
  imports.push(`import ${importname} from './assets/logos/${value}';`);
  data.push(
    `{ url: '${importname}', name: '${filename.split('.')[0]}', style: '${
      parts[0]
    }', category: '${parts[1]}' },`,
  );
});

const fileData = `
${imports.join('\n')}
export const logos = [
${data.join('\n')}
];
`;

fs.writeFileSync(`${import.meta.dirname}/../src/logos.ts`, fileData, {
  encoding: 'utf-8',
});
