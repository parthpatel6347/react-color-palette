#### React Project

# colorPalette

Create and save beautiful color palettes.

[Go to website](https://parth-react-color.herokuapp.com/)

## Overview :

### Homepage

Any palette that you create will appear on this page. You may delete palettes from here, or click on any palette to go to that individual palette page.

### Palette page

- Adjust Lightness & Saturation.
- Choose color code format - HEX | RGB | CSS
- Hover over any color and click on the copy icon to copy the color code.
- Hover over any color and click on the palette icon to access more shades of that color. From this hover over any shade and click on its color code to copy it.

### New Palette page

- This page starts with one random color added to the palette.
- You may use the color picker and add upto 6 colors in the palette.
- You may drag to arrange the colors in the palette, or remove them by clicking the 'X' icon.
- Click on save and enter a palette name to save the palette. This palette will appear on the HomePage and can be removed at a later time
- Validations on this:
  - Prevents adding more than 6 colors.
  - Prevents adding the same color again.
  - Prevents saving an empty palette.
  - Requires palette name to be unique.
