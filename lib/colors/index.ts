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

const blue = {
  blue50: '#e3f2fd',
  blue100: '#bbdefb',
  blue200: '#90caf9',
  blue300: '#64b5f6',
  blue400: '#42a5f5',
  blue500: '#2196f3',
  blue600: '#1e88e5',
  blue700: '#1976d2',
  blue800: '#1565c0',
  blue900: '#0d47a1',
}

const general = {
  thBackground: blue.blue50,
  background: gray.gray100,
  border: gray.gray300,
}

const COLOR = {
  black: '#333',
  white: '#fff',
  ...gray,
  ...blue,
  ...general,
}

export default COLOR
