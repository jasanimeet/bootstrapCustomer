import { makeStyles } from '@mui/styles';

const useStyle = makeStyles((theme) => ({
  helperText: {
    '&.MuiFormHelperText-root': {
      lineHeight: 0.66,
      marginLeft: theme.spacing(0),
    },
  },
  inputLabel: {
    '&.MuiInputLabel-root': {
      color: theme.palette.primary.default,
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(16),
      fontFamily: 'calibri!important',
      marginBottom: 0,
    },
  },
  labelAsterisk: {
    color: theme.error.main,
  },
  textField: {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      fontSize: theme.typography.pxToRem(10),
      // borderColor: theme.palette.common.borderColorHr,
      borderRadius: 6,
      padding: 0,
    },
    // '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    //   borderColor: theme.palette.primary.main,
    // },
    '& .Mui-disabled': {
      WebkitTextFillColor: theme.palette.common.fontColorDisabled,
    },
    '& .MuiSelect-icon': {
      color: theme.palette.common.fontColorLightBlack,
    },
    '& .MuiOutlinedInput-root': {
      color: theme.palette.common.accentColorSecondary,
      backgroundColor: theme.palette.common.backgroundSecondary,
      borderRadius: 6,
      padding: 0,
      '& .MuiOutlinedInput-input': {
        padding: '0.5px 14px',
        fontSize: '13px',
        height: 'auto',
        fontFamily: 'calibri',
      },
    },
  },
  selectMenu: {
    backgroundColor: theme.backgroundColorPrimary,
    color: theme.palette.common.fontColorLightBlack,
    boxShadow: theme.shadows,
    maxHeight: '220px',
  },
}));
export default useStyle;
