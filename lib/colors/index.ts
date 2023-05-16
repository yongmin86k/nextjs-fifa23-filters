// https://m2.material.io/design/color/the-color-system.html#tools-for-picking-colors

const gray = {
  gray50: '#fafafa',
  gray100: '#f5f5f5',
  gray200: '#eeeeee',
  gray300: '#e0e0e0',
  gray400: '#bdbdbd',
  gray500: '#9e9e9e',
  gray600: '#757575',
  gray700: '#616161',
  gray800: '#424242',
  gray900: '#212121',
}

const general = {
  background: gray.gray100,
  border: gray.gray300,
}

const COLOR = {
  black: '#333',
  white: '#fff',
  ...gray,
  ...general,
}

export default COLOR
