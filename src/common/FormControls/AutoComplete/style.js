import { makeStyles } from '@mui/styles';

const useStyle = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%',
    '&.MuiFormControl-root': {
      '& .MuiOutlinedInput-root': {
        color: theme.palette.common.accentColorSecondary,
        backgroundColor: theme.palette.common.backgroundSecondary,
        borderRadius: '20px',
      },
      '& .MuiInputBase-root': {
        borderRadius: '20px',
      },
    },
  },
  inputLabel: {
    '&.MuiInputLabel-root': {
      color: theme.palette.primary.default,
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(16),
      fontFamily: 'calibri!important',
    },
  },
  select: {
    '& .MuiOutlinedInput-input': {
      padding: '8.5px 14px',
      fontFamily: 'calibri!important',
    },
  },
  label: {
    fontWeight: 'bold',
  },
  helperText: {
    color: 'red',
  },
  labelAsterisk: {
    color: theme.error.main,
  },
  option: {
    borderRadius: '10px',
  },
}));
export default useStyle;
