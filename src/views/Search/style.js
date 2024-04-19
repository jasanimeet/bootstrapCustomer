// Material UI
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles(() => ({
  minWidthColumnName: {
    width: '125px',
  },
  dividerStyle: {
    margin: '10px 0!important',
  },
  optionContainerShape: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    height: 'fit-content',
  },
  fontNameStyle: {
    fontFamily: 'Montserrat, sans-serif!important',
    fontSize: '12px!important',
  },
  buttonClass: {
    width: '67px',
    minWidth: '67px',
    height: '25px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  remainingClass: {
    width: '100%',
  },
  ctsClassForSpecific: {
    flexDirection: 'column!important',
    display: 'contents!important',
  },
  caratClass: {
    width: 'calc(100% - 100px)',
    display: 'flex',
    flexDirection: 'column',
  },
  optionContainer: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    height: 'fit-content',
  },
  labelCommon: {
    borderRadius: '6px!important',
    marginRight: '6px',
    padding: '2px 10px!important',
    transition: 'opacity 0.3s ease',
    fontFamily: 'Montserrat, sans-serif!important',
    fontSize: '10px!important',
    '&:hover': {
      opacity: 0.8,
      cursor: 'pointer',
    },
  },
  buttonFocusClass: {
    color: '#757575',
    opacity: '0.8',
    position: 'relative',
    minWidth: '64px',
    padding: '6px 8px',
    borderRadius: '4px',
    textTransform: 'uppercase',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    border: 0,
    fontFamily: 'Montserrat, sans-serif!important',
    fontSize: '12px!important',
    fontWeight: 600,
    cursor: 'pointer',
    lineHeight: '1.75',
    '&:hover': {
      backgroundColor: 'rgba(25, 118, 210, 0.04)',
    },
    '&:focus': {
      backgroundColor: '#CFD2D4',
      outline: 'none',
    },
  },
  remainingButtonFocusClass: {
    opacity: '0.8',
    position: 'relative',
    textTransform: 'uppercase',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    cursor: 'pointer',
    lineHeight: '1.75',
    borderRadius: '6px!important',
    padding: '2px 10px!important',
    transition: 'opacity 0.3s ease',
    fontFamily: 'Montserrat, sans-serif!important',
    fontSize: '12px!important',
    '&:hover': {
      backgroundColor: 'rgba(25, 118, 210, 0.04)',
    },
    '&:focus': {
      backgroundColor: '#CFD2D4!important',
      outline: 'none',
      border: '1px solid #CFD2D4!important',
      color: '#757575!important',
    },
  },
  mediaStyle: {
    opacity: '0.8',
    position: 'relative',
    textTransform: 'capitalize',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    cursor: 'pointer',
    lineHeight: '1.75',
    borderRadius: '6px!important',
    padding: '7px 8px!important',
    transition: 'opacity 0.3s ease',
    fontFamily: 'Montserrat, sans-serif!important',
    fontSize: '12px!important',
    '&:hover': {
      backgroundColor: 'rgba(25, 118, 210, 0.04)',
    },
    '&:focus': {
      backgroundColor: '#CFD2D4!important',
      outline: 'none',
      border: '1px solid #CFD2D4!important',
      color: '#757575!important',
    },
  },
}));

export default useStyle;
