# Templates Format

Templates are in [SVG format](https://www.w3.org/TR/SVG11/).

Zaparoo Designer uses [FabricJS](https://fabricjs.com/) to parse/render templates on a canvas and export them on a printable PDF. It is limited by the features FabricJS supports.

## General guidelines

Designer supports the following SVG tags:

- Image
- Rect
- Path
- Gradient

It's recommended to use a viewport that starts from 0,0 and to have no content bleeding outside the viewport.

The preferred unit for measurement is in pixels and assuming a final print of 300dpi. For example, if you are working for a 2 by 3 inch label, it is advised to work with a 600 by 900 canvas and a viewBox that is `0 0 600 900`.

The template will be scaled anyway to fit the media you assign it to, more on that later.

Templates contributed to the Zaparoo Designer repository must not contain and copyrighted material or infringe on any trademarks, including Zaparoo trademarks.

A license must be included in all contributed templates using an XML comment. The license is your choice, but we recommend some variant of the [Creative Commons](https://creativecommons.org/) licenses that works best for your preferences. You can use the [Creative Common License Chooser](https://chooser-beta.creativecommons.org/) to easily pick the most appropriate one.

## The media dimensions

Templates on this application are meant to be customized and printed and fit or stick somewhere. As a consequence the template is made with a single size in mind. There may be templates that can be scaled freely to different sizes of the same aspect ratio, but we do not handle that.
