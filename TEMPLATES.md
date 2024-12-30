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

## Tools

Any application that let you edit SVG is good for this, one free application is [Inkscape](https://inkscape.org/), others are good as well and if you have examples to add to this guide you can contribute with a PR.

[SVGOmg](https://svgomg.net/) is a tool that will let you improve your svg size and complexity in case Inkscape or your favorite application would add too many tags and attributes that we do not really need

## The media dimensions

Templates on this application are meant to be customized and printed and fit or stick somewhere. As a consequence the template is made with a single size in mind. There may be templates that can be scaled freely to different sizes of the same aspect ratio, but we do not handle that.

The media dimensions are specified in the width and height of the main svg tag.
To make an example a standard nfc card is sized at 3.375 inches high by 2.125 inches wide. That make at 300dpi: 1012.5 by 637,5 pixels. Now if you are making a sticker for the nfc card you probably want to leave a bit of wiggle room for applying the sticker, or maybe no you want to go larger and then refine the borders with a knife. In this example we leave some border so that it can be applied safely and we pick up 994 by 619 that is a decent fit, and then we will leave some extra white space in the template itself.

If you are creating an horizontal or vertical template that depends on your taste and you will have to use width and height accordingly.

The resulting SVG initial tag would look like something like this:

```xml
<svg
   width="619"
   height="994"
   viewBox="0 0 619 994"
   version="1.1"
   xml:space="preserve"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns:serif="http://www.serif.com/">
   <!-- ... all my svg art goes here -->
</svg>
```

## The template layers

The SVG and so your template will be a stack of layers.
There will be a spot for one or more images between the stack.
Let's take for example our original basic template, the one with the old logo:

```xml


```
