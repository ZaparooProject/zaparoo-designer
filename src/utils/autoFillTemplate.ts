import { findPlatformLogoUrl, findScreenshotUrl } from '../utils/gameDataUtils';
import { createProxyUrl } from '../utils/search';

export const autoFillTemplate = () => {
  // const screenshotUrl = findScreenshotUrl(game);
  // const platformLogoUrl = findPlatformLogoUrl(game);
  // const platformLogoPromise = platformLogoUrl
  //   ? util.loadImage(createProxyUrl(platformLogoUrl).toString(), {
  //       crossOrigin: 'anonymous',
  //     })
  //   : Promise.resolve(null);
  // const screenshotPromise = screenshotUrl
  //   ? util.loadImage(createProxyUrl(screenshotUrl).toString(), {
  //       crossOrigin: 'anonymous',
  //     })
  //   : Promise.resolve(null);
  //       const screenshotImg = screenshotImgResult.status === 'fulfilled' ? screenshotImgResult.value : null;
  //   const platformLogoImg = platformLogoResult.status === 'fulfilled' ? platformLogoResult.value : null;
  //       if (platformLogoImg) {
  //         const platformLogo = new FabricImage(platformLogoImg, { resourceType: "platform_logo" });
  //         const scale = util.findScaleToFit(platformLogo, fabricCanvas);
  //         platformLogo.scaleX = scale;
  //         platformLogo.scaleY = scale;
  //         fabricCanvas.add(platformLogo);
  //         fabricCanvas.centerObject(platformLogo);
  //       }
  //       if (screenshotImg) {
  //         const screenshot = new FabricImage(screenshotImg, { resourceType: "screenshot" });
  //         const scale = util.findScaleToFit(screenshot, fabricCanvas);
  //         screenshot.scaleX = scale;
  //         screenshot.scaleY = scale;
  //         fabricCanvas.add(screenshot);
  //         fabricCanvas.centerObject(screenshot);
  //       }
  // const platformLogoPlaceHolder = getPlaceholderScreenshot(templateSource);
  // if (platformLogoPlaceHolder) {
  //   // remove strokewidth so the placeholder can clip the image
  //   platformLogoPlaceHolder.strokeWidth = 0;
  //   // the placeholder stays with us but we don't want to see it
  //   platformLogoPlaceHolder.visible = false;
  // }
  // const screenshotPlaceholder = getPlaceholderPlatformLogo(templateSource);
  // if (screenshotPlaceholder) {
  //   // remove strokewidth so the placeholder can clip the image
  //   screenshotPlaceholder.strokeWidth = 0;
  //   // the placeholder stays with us but we don't want to see it
  //   screenshotPlaceholder.visible = false;
  // }
  // const mainScreensthot = canvas
  //   .getObjects('image')
  //   .find(
  //     (fabricImage) =>
  //       (fabricImage as FabricImage).resourceType === 'screenshot',
  //   ) as FabricImage;
  // const platformLogo = canvas
  //   .getObjects('image')
  //   .find(
  //     (fabricImage) =>
  //       (fabricImage as FabricImage).resourceType === 'platform_logo',
  //   ) as FabricImage;
  // if (screenshotPlaceholder) {
  //   if (mainScreensthot) {
  //     const index = canvas.getObjects().indexOf(screenshotPlaceholder);
  //     canvas.insertAt(index, mainScreensthot);
  //     await scaleImageToOverlayArea(screenshotPlaceholder, mainScreensthot);
  //   }
  // }
  // if (platformLogoPlaceHolder) {
  //   if (platformLogo) {
  //     const index = canvas.getObjects().indexOf(platformLogoPlaceHolder);
  //     canvas.insertAt(index, platformLogo);
  //     await scaleImageToOverlayArea(platformLogoPlaceHolder, platformLogo);
  //   }
  // }
};
