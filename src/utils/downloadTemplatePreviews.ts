import { prepareTemplateCarousel } from './prepareTemplateCarousel';
import type { InputWithSizeMeta } from 'client-zip';
import { downloadBlob } from './utils';
import { templates } from '../cardsTemplates';
import { util } from 'fabric';
import sob3 from '../assets/art/sampleart.png';

export const downloadTemplatesPreview = async () => {
  const { downloadZip } = await import('client-zip');

  const templatesWithMedia = Object.entries(templates).map(([key, value]) => ({
    ...value,
    key,
    media: value.compatibleMedia[0],
  }));
  const img = await util.loadImage(sob3);
  const inputs = await Promise.all(
    templatesWithMedia.map<Promise<InputWithSizeMeta>>((template, index) => {
      return prepareTemplateCarousel([template], img).then(([htmlCanvas]) => {
        return new Promise((resolve) => {
          htmlCanvas.toBlob((blob: Blob | null) => {
            blob &&
              resolve({
                name: `template_${template.media.label}_${template.label}_${index}.png`,
                lastModified: Date.now(),
                input: blob,
                size: blob.size,
              });
          });
        });
      });
    }),
  );
  const blob = await downloadZip(inputs).blob();
  // trigger download
  downloadBlob(blob, 'templates.zip');
};
