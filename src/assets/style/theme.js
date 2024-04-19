import { createTheme } from '@mui/material';

const commonBackgroundColor = localStorage.getItem('bgColor');
const commonFontSize = localStorage.getItem('fontSizeData');
const commonFontColor = localStorage.getItem('fontColor');
const commonFontStyle = localStorage.getItem('fontStyle');
const commonActiveColor = localStorage.getItem('activeMenuColor');
const commonFontFamily = localStorage.getItem('fontFamily');
const labSearchHeaderColor = localStorage.getItem('HeaderColor');
const labSearchActiveColor = localStorage.getItem('ActiveColor');

const HeaderBackGroundColor = localStorage.getItem('HeaderBackGroundColor');
const HeaderFontColor = localStorage.getItem('HeaderFontColor');
const activeBackGroundColor = localStorage.getItem('activeBackGroundColor');
const activeFontLabColor = localStorage.getItem('activeFontLabColor');
const SelectBackGroundColor = localStorage.getItem('SelectBackGroundColor');
const SelectFontColor = localStorage.getItem('SelectFontColor');
const RegularBackGroundColor = localStorage.getItem('RegularBackGroundColor');
const RegularFontColor = localStorage.getItem('RegularFontColor');
const mainBackgroundColor = localStorage.getItem('mainBackgroundColor');

const baseTheme = {
  typography: {
    fontFamily: 'calibri',
    h5: {
      fontWeight: 400,
      fontSize: commonFontSize || '18px',
      fontStyle: commonFontStyle || 'normal',
      fontFamily: commonFontFamily || 'calibri',
    },
  },
  error: {
    main: '#d32f2f',
  },
  longTextTableCell: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '850px',
    display: '-webkit-box',
    WebkitLineClamp: '3',
    WebkitBoxOrient: 'vertical',
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3e79f7', // border color
      default: '#191919', // font color
    },
    secondary: {
      main: '#455560', // font color
    },
    common: {

      activeMenuColor: commonActiveColor || '#0680D6',
      themeBackgroundColor: commonBackgroundColor || '#f5f5f5',
      color: commonFontColor || '#000000b3',
      activeFontColor: commonFontColor || '#1B1B1B',

      themeColor: '#C0D6FF',

      labSearchHeaderColor: labSearchHeaderColor || '#003d66',
      labSearchActiveColor: labSearchActiveColor || '#225AA8',

      // font color
      accentColorSecondary: '#1B1B1B',
      fontColorLightBlack: '#000000b3',
      fontColorDisabled: '#00000059',

      // background color
      backgroundSecondary: '#ffffff',

      // borderColor
      borderThemeColor: '#5E728A',
      borderColorHr: '#0000001f',

      HeaderBackGroundColor: HeaderBackGroundColor || 'rgba(0, 88, 116)',
      HeaderFontColor: HeaderFontColor || '#fff',
      activeBackGroundColor: activeBackGroundColor || 'rgba(0, 88, 116)',
      activeFontLabColor: activeFontLabColor || '#fff',
      SelectBackGroundColor: SelectBackGroundColor || 'rgba(0, 88, 116)',
      SelectFontColor: SelectFontColor || '#039C10',
      RegularBackGroundColor: RegularBackGroundColor || '#fff',
      RegularFontColor: RegularFontColor || 'rgba(0, 88, 116)',
      mainBackgroundColor: mainBackgroundColor || '#fff',
    },
  },
  backgroundColorPrimary: '#ffffff',

  shadows: '#00000040 0px 1px 4px -1px',
  ...baseTheme,
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3e79f7',
      default: '#d6d7dc', // color of card title
    },
    secondary: {
      main: '#b4bed2',
    },
    common: {

      themeColor: '#C0D6FF',

      // font color
      accentColorSecondary: '#FFFFFF',
      fontColorLightBlack: '#d6d7dc',
      fontColorDisabled: '#ffffff52',

      // checkBoxcolor
      checkBoxColor: '#d6d7dc',

      // background color
      backgroundSecondary: '#1b2531',

      // borderColor
      borderColorTransparent: '#00000000',
      borderColorHr: '#4d5b75',
    },
  },
  backgroundColorPrimary: '#283142',

  shadows: '#000000bf 1px 0px 8px -1px',
  ...baseTheme,
});
