import { util, FabricImage, Textbox } from 'fabric';
import { type CardData } from '../contexts/fileDropper';
import { findPlatformLogoUrl, findScreenshotUrl } from '../utils/gameDataUtils';
import { createProxyUrl } from '../utils/search';
import {
  getPlaceholderDescription,
  getPlaceholderPlatformLogo,
  getPlaceholderScreenshot,
  getPlaceholderTitle,
} from './templateHandling';
import { scaleImageToOverlayArea } from './setTemplateV2';

const fromResultToValue = <T>(
  result: PromiseSettledResult<T | null>,
): T | null => (result.status === 'fulfilled' ? result.value : null);

/**
 * Function that given a card and a canvas, can read from the game property
 * a logo and a screenshot and place it on the template
 */
export const autoFillTemplate = async ({ card }: { card: CardData }) => {
  const { game, canvas: fabricCanvas, template } = card;
  if (!game || !fabricCanvas || !template) {
    return;
  }
  const screenshotUrl = findScreenshotUrl(game);
  const platformLogoUrl = findPlatformLogoUrl(game);
  const platformLogoPromise = platformLogoUrl
    ? util.loadImage(createProxyUrl(platformLogoUrl).toString(), {
        crossOrigin: 'anonymous',
      })
    : Promise.resolve(null);
  const screenshotPromise = screenshotUrl
    ? util.loadImage(createProxyUrl(screenshotUrl).toString(), {
        crossOrigin: 'anonymous',
      })
    : Promise.resolve(null);
  const [platformLogoImg, screenshotImg] = await Promise.allSettled([
    platformLogoPromise,
    screenshotPromise,
  ]).then((results) =>
    results.map((result) => fromResultToValue<HTMLImageElement>(result)),
  );

  if (platformLogoImg) {
    const platformLogo = new FabricImage(platformLogoImg, {
      resourceType: 'platform_logo',
    });

    const platformLogoPlaceHolder = getPlaceholderPlatformLogo(fabricCanvas);
    if (platformLogoPlaceHolder) {
      // remove strokewidth so the placeholder can clip the image
      platformLogoPlaceHolder.strokeWidth = 0;
      // the placeholder stays with us but we don't want to see it
      platformLogoPlaceHolder.visible = false;
      const index = fabricCanvas.getObjects().indexOf(platformLogoPlaceHolder);
      fabricCanvas.insertAt(index, platformLogo);
      await scaleImageToOverlayArea(platformLogoPlaceHolder, platformLogo);
    }
  }
  if (screenshotImg) {
    const screenshot = new FabricImage(screenshotImg, {
      resourceType: 'screenshot',
    });

    const screenshotPlaceholder = getPlaceholderScreenshot(fabricCanvas);
    if (screenshotPlaceholder) {
      // remove strokewidth so the placeholder can clip the image
      screenshotPlaceholder.strokeWidth = 0;
      // the placeholder stays with us but we don't want to see it
      screenshotPlaceholder.visible = false;
      const index = fabricCanvas.getObjects().indexOf(screenshotPlaceholder);
      fabricCanvas.insertAt(index, screenshot);
      await scaleImageToOverlayArea(screenshotPlaceholder, screenshot);
    }
  }
  if (game.summary) {
    const summaryPlaceHolder = getPlaceholderDescription(fabricCanvas);
    if (summaryPlaceHolder) {
      // remove strokewidth so the placeholder can clip the image
      summaryPlaceHolder.strokeWidth = 0;
      // the placeholder stays with us but we don't want to see it
      summaryPlaceHolder.visible = false;
      const index = fabricCanvas.getObjects().indexOf(summaryPlaceHolder);
      const gameDescription = new Textbox(game.summary, {
        fontSize: 18,
        width: summaryPlaceHolder.width,
      });
      const topLeftCorner = summaryPlaceHolder.getPointByOrigin('left', 'top');
      gameDescription.setPositionByOrigin(topLeftCorner, 'left', 'top');

      fabricCanvas.insertAt(index, gameDescription);
    }
  }
  if (game.name) {
    const summaryPlaceHolder = getPlaceholderTitle(fabricCanvas);
    if (summaryPlaceHolder) {
      // remove strokewidth so the placeholder can clip the image
      summaryPlaceHolder.strokeWidth = 0;
      // the placeholder stays with us but we don't want to see it
      summaryPlaceHolder.visible = false;
      const index = fabricCanvas.getObjects().indexOf(summaryPlaceHolder);
      const gameDescription = new Textbox(game.name, {
        fontSize: 36,
        width: summaryPlaceHolder.width,
      });
      const topLeftCorner = summaryPlaceHolder.getPointByOrigin('left', 'top');
      gameDescription.setPositionByOrigin(topLeftCorner, 'left', 'top');

      fabricCanvas.insertAt(index, gameDescription);
    }
  }
  fabricCanvas.requestRenderAll();
};
