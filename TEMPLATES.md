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
Let's take for example a simple template for the mini nfc cards.
In the example i m going to omit the long path for the purpose of formatting and reading. So the xml you find here is a showcase and doesn't display correct graphics.

```xml
<svg width="354" height="591" viewBox="0 0 30 50" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
  <rect id="placeholder" zaparoo-placeholder="main" x="2.1186" y="9.8984" width="25.8474" height="37.6480" fill="none"
    stroke="red" stroke-dasharray="2 2" stroke-width="0.1" zaparoo-fill-strategy="fit" />
  <rect width="28.494" fill="none" stroke="#000" stroke-width=".506" height="40.994" x=".753" y="8.253" ry="2.05"
    rx="2" />
  <path d="M10.074 45c-.373 0-.674.3-.674.674V49.5H20.6v-3.826c0-.373-.301-.674-.675-.674h-9.85z" />
  <path fill="#fff" d="M19.347 ... redacted path ... c.05 0 .09-.04.09-.09z" />
  <rect width="29" height="7.25" x=".5" y=".5" ry="1.646" rx="2.012" fill="#00a3da" />
  <path d="M19 .5v7.25h8.488c1.115 0 2.012-.734 2.012-1.646V2.146C29.5 1.234 28.603.5 27.488.5H19z" />
  <path
    d="M20.37 6.839h-.082  ... redacted path ... m.512 0h.222l.099.707h.002l.1-.707h.22v.988h-.146v-.748h-.003l-.113.748h-.13l-.112-.748h-.003v.748h-.136z"
    clip-rule="evenodd" fill="#fff" fill-rule="evenodd" />
  <g clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2">
    <path
      d="M28.9 2.423c0 .566-.459 1.024-1.023 1.024h-7.454a1.024 1.024 0 0 1 0-2.047h7.454c.564 0 1.023.459 1.023 1.023z"
      fill="#fff" />
    <path
      d="M20.27 1.921 ... redacted path ... c0 .066.027.099.081.099z" />
  </g>
  <path
    d="M3.829 1.5 ... redacted path ... a.413.413 0 1 1-.317.762l-.324-.134a.558.558 0 0 0 1.022-.027.557.557 0 0 0 0-.43.556.556 0 0 0-.512-.346z"
    fill="#fff" />
</svg>
```

As you can see there are 10 elements in this SVG, some of them are in a group that is not important to us, is how the design application packaged it.

The elements are drawn top to bottom, meaning that the top element is drawn first, and so is behind the others. If you are not used to svgs it is the opposite of what you would think. Top elements are at the bottom.

In this case the first element is a special one:

```xml
<rect id="placeholder" zaparoo-placeholder="main" x="2.1186" y="9.8984" width="25.8474" height="37.6480" fill="none"
    stroke="red" stroke-dasharray="2 2" stroke-width="0.1" zaparoo-fill-strategy="fit" />
```

It has a special attribute: `zaparoo-placeholder` of value `main`, that means that this is the object that is going to contain your card image and define its exentension and position.
x, y, width and height define where this placholder is.
This rect has also `zaparoo-fill-strategy="fit"` meaning that the image will be scaled to fit the rectangle.

More attributes with different values are going to be implmented in the future ( image in a circle or custom path for example, more images, text placeholders )

The visual attributes of the placeholder are purely for visual reference and won't be displayed in the designer.

The template file looks like this:

![template example](/docs/template_example.png)
