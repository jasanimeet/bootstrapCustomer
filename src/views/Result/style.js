// Material UI
import { makeStyles } from '@mui/styles';

// eslint-disable-next-line no-unused-vars
const useStyle = makeStyles((theme) => ({
  fontNameStyle: {
    fontFamily: 'calibri!important',
    fontSize: '13px!important',
  },
  devStyle: {
    '& .ag-header-cell-label': {
      whiteSpace: 'pre-wrap',
    },
    '& .ag-header-allow-overflow': {
      // background: '#3c6070',
    },
    '& .ag-header-cell-text': {
      // color: '#FFF',
      fontFamily: 'calibri',
    },
    '& .ag-cell': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  KeyName: {
    fontFamily: 'Open Sans!important',
    color: '#0A0A25',
    fontWeight: '600!important',
    fontSize: '12px!important',
  },
  dicsountTypeClass: {
    width: 'calc(50% - 10px)',
    '@media (min-width: 600px)': {
      width: 'calc(50% - 10px)',
    },
    '@media (min-width: 1060px)': {
      width: 'calc(10% - 10px)',
    },
  },
  signClass: {
    width: 'calc(25% - 10px)',
    '@media (min-width: 600px)': {
      width: 'calc(25% - 10px)',
    },
    '@media (min-width: 1060px)': {
      width: 'calc(6% - 10px)',
    },
  },
  buttonStyle: {
    border: '1px solid #c1c1c1!important',
    padding: '4px 10px!important',
    color: '#3c6070!important',
    borderRadius: '10px!important',
    fontFamily: 'calibri!important',
    fontSize: '13px!important',
  },
  iconStyle: {
    padding: '0!important',
  },
}));

export default useStyle;
