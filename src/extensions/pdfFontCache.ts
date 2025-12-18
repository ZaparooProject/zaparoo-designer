import { FabricText } from 'fabric';
import NotoSansBold from '../assets/fonts/NotoSans-Bold.ttf';
import NotoSansItalic from '../assets/fonts/NotoSans-Italic.ttf';
import NotoSansRegular from '../assets/fonts/NotoSans-Regular.ttf';

// Font cache to avoid re-fetching fonts
const fontCache: Map<string, ArrayBuffer> = new Map();

// Map of font family + style combinations to font file paths
// You'll need to expand this based on fonts you want to support
const fontMap: Record<string, string> = {
  // Format: 'fontFamily-weight-style': '/path/to/font.ttf'
  'NotoSans-400-normal': NotoSansRegular,
  'NotoSans-700-normal': NotoSansBold,
  'NotoSans-400-italic': NotoSansItalic,
  // Fallback / default
  default: NotoSansRegular,
};

// Set to track which fonts have been registered with PDFKit
const registeredFonts: Set<string> = new Set();

/**
 * Get a unique font key based on FabricJS text properties
 */
export const getFontKey = (text: FabricText): string => {
  const family = (text.fontFamily || 'NotoSans').replace(/['"]/g, '');
  const weight = text.fontWeight || 400;
  const style = text.fontStyle || 'normal';
  return `${family}-${weight}-${style}`;
};

/**
 * Load and register a font with PDFKit
 */
export const registerFont = async (
  fontKey: string,
  pdfDoc: any,
): Promise<string> => {
  // Find font path or use default
  const fontPath = fontMap[fontKey] || fontMap['default'];
  const actualFontKey = fontMap[fontKey] ? fontKey : 'default';

  // Check if we already have this font in cache
  let fontBuffer = fontCache.get(fontPath);

  if (!fontBuffer) {
    try {
      // Fetch the font file
      const response = await fetch(fontPath);
      if (!response.ok) {
        console.warn(`Failed to load font ${fontPath}, using default`);
        // Try default font
        const defaultResponse = await fetch(fontMap['default']);
        fontBuffer = await defaultResponse.arrayBuffer();
      } else {
        fontBuffer = await response.arrayBuffer();
      }
      fontCache.set(fontPath, fontBuffer);
    } catch (error) {
      console.error(`Error loading font ${fontPath}:`, error);
      throw error;
    }
  }

  // Register with PDFKit
  pdfDoc.registerFont(actualFontKey, fontBuffer);
  registeredFonts.add(actualFontKey);

  return actualFontKey;
};

/**
 * Clear registered fonts (call this when creating a new PDF document)
 */
export const clearRegisteredFonts = () => {
  registeredFonts.clear();
};
