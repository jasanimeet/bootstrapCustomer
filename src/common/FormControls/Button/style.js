import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    '&.MuiButton-root': {
      textTransform: 'capitalize',
      color: theme.palette.common.black,
      height: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: theme.palette.common.themeColor,
      borderRadius: theme.typography.pxToRem(10),
      fontWeight: '500',
      textAlign: 'center',
      fontSize: theme.typography.pxToRem(14),
      cursor: 'pointer',
      marginLeft: 'auto',
      '&:hover': {
        background: theme.palette.common.themeColor,
      },
    },
    '&.MuiButton-root:hover': {
      background: theme.palette.common.themeColor,
      boxShadow: 'none',
    },
    '&.deleteBtn': {
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '19px',
      letterSpacing: '0.07em',
      width: '112px',
      height: '35px',
      background: theme.error.main,
      color: theme.palette.common.white,
      '&.MuiButton-root:hover': {
        background: theme.error.main,
      },
    },
    '&.submitBtn': {
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '19px',
      letterSpacing: '0.07em',
      minWidth: '112px',
      height: '35px',
      color: theme.palette.common.white,
      background: 'linear-gradient(#018BED, rgb(34 108 163) 100%)',
      '&.MuiButton-root:hover': {
        background: theme.palette.common.themeColor,
      },
    },
    '&.resetBtn': {
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '19px',
      letterSpacing: '0.07em',
      backgroundColor: 'transparent',
      color: theme.palette.common.fontColorLightBlack,
      borderColor: theme.palette.common.borderColorHr,
      borderWidth: '1px',
      borderStyle: 'solid',
      minWidth: '112px',
      height: '35px',
      '&.MuiButton-root:hover': {
        backgroundColor: 'transparent',
      },
    },
    '&.cancelBtn': {
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '19px',
      letterSpacing: '0.07em',
      background: 'none',
      minWidth: '112px',
      height: '35px',
      backgroundColor: '#c5c5c5',
      color: '#000',
      '&.MuiButton-root:hover': {
        background: '#efefef',
      },
    },
    '&.outlinedBtn': {
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '19px',
      letterSpacing: '0.07em',
      background: 'none',
      minWidth: '112px',
      height: '35px',
      color: theme.palette.common.fontColorLightBlack,
      '&.MuiButton-root:hover': {
        background: 'none',
      },
    },
  },

  disableButton: {
    '&.MuiButton-root': {
      textTransform: 'capitalize',
      marginLeft: theme.spacing(1),
      color: theme.palette.common.fontColorDisabled,
      height: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: theme.typography.pxToRem(10),
      fontWeight: theme.typography.fontWeightBold,
      textAlign: 'center',
      fontSize: theme.typography.pxToRem(14),
      '& .MuiSvgIcon-root': {
        marginRight: theme.spacing(1),
      },
    },
  },
}));

export default useStyles;
