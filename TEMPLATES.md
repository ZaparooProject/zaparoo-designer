# Zaparoo templates format

Templates are SVG.
The SVG [format](https://www.w3.org/TR/SVG11/) is very flexible, SVGs come in many forms and shape and support a lot of features.
The Zaparoo designer does not support any SVG feature. Zaparoo designer uses FabricJS to parse and render templates on a canvas and export them on a printable PDF, and so it inherits all the FabricJS limitations.

## General guidelines

Zaparoo designer supports the following svg tags:

- Image
- Rect
- Path
- Gradient

The SVG vector format can be stretched without issues, but as a generic reference and to help everyone understand the template is a good idea to use a viewport that starts from 0,0 and to have no content bleeding outside the viewport.

The preferred unit for measures is in pixels, as many pixels as you would need to print at 300dpi. This is only for easyness of calculation and debugging.

So for example if you are working for a 2 by 3 inch label, it is advised to work with a 600 by 900 canvas and a viewBox that is "0 0 600 900"

If you want to contribute a template for the designer do not add any copyrighted material in it.

If you are building a template for a specific console or videogame company, do not add the console logo or company logo, but uses placeholders and then users will search for their own logos on third party api or search engines and place them in the template.

When submitting a template add a license in it with an xml comment.
You can write anything that you want in your own license, but if you can use one of those premade ones you will make easier to understand what is allowed to do with your template. A classic example is to allow or not allow other users to modify your template and create new ones, or sell it on etsy.

## The canvas dimensions
