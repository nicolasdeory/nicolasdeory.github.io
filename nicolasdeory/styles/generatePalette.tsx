import tinycolor from 'tinycolor2'
// I used teal and this generates a decently similar palette
export default function generatePalette(color: string, inc: number = 10) {
  return {
    50: tinycolor(color)
      .brighten(inc * 5)
      .toString(),
    100: tinycolor(color)
      .brighten(inc * 4)
      .toString(),
    200: tinycolor(color)
      .brighten(inc * 3)
      .toString(),
    300: tinycolor(color)
      .brighten(inc * 2)
      .toString(),
    400: tinycolor(color)
      .brighten(inc * 1)
      .toString(),
    500: color,
    600: tinycolor(color)
      .darken(inc * 1)
      .toString(),
    700: tinycolor(color)
      .darken(inc * 2)
      .toString(),
    800: tinycolor(color)
      .darken(inc * 3)
      .toString(),
    900: tinycolor(color)
      .darken(inc * 4)
      .toString(),
    1000: tinycolor(color)
    .darken(inc * 5)
    .toString()
  }
}