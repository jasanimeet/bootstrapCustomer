/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/react-in-jsx-scope */
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '../../common/Typography/Typography';

const AddFilterPopupList = ({ handleClose, filterActive, setFilterActive }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const clearBtnClick = () => {
    setFilterActive([]);
    handleClose();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      sx={{
        '& .MuiPaper-root': {
          minWidth: '600px',
        },
      }}
    >
      <DialogTitle
        id="responsive-dialog-title"
        style={{
          background: 'linear-gradient(#018BED, rgb(34 108 163) 100%)',
        }}
      >
        <IconButton
          onClick={() => handleClose()}
          sx={{
            position: 'absolute',
            right: 3,
            top: 3,
            padding: 0,
          }}
        >
          <CloseIcon style={{ color: '#fff' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{
        padding: '10px',
        paddingTop: '10px!important',
      }}
      >
        <div>
          {filterActive.map((innerArray, index) => (
            <div key={index} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Typography fontWeight="600">{`${index + 1}.`}</Typography>
              {innerArray.map((item, innerIndex) => (
                <Typography key={innerIndex}>
                  {item.Column_Name}
                  =
                  {item?.Category_Name
                  || item?.Category_Value
                  || (item?.KEY_TO_SYMBOL_TRUE && item?.KEY_TO_SYMBOL_FALSE && `True: ${item?.KEY_TO_SYMBOL_TRUE}, False: ${item?.KEY_TO_SYMBOL_FALSE}`)
                  || (item?.KEY_TO_SYMBOL_TRUE && `True: ${item?.KEY_TO_SYMBOL_TRUE}`)
                  || (item?.KEY_TO_SYMBOL_FALSE && `False: ${item?.KEY_TO_SYMBOL_FALSE}`)
                  || (item?.LAB_COMMENTS_TRUE && item?.LAB_COMMENTS_FALSE && `True: ${item?.LAB_COMMENTS_TRUE}, False: ${item?.LAB_COMMENTS_FALSE}`)
                  || (item?.LAB_COMMENTS_TRUE && `True: ${item?.LAB_COMMENTS_TRUE}`)
                  || (item?.LAB_COMMENTS_FALSE && `False: ${item?.LAB_COMMENTS_FALSE}`)}
                  {innerIndex !== innerArray.length - 1 && ','}
                </Typography>
              ))}
            </div>
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => clearBtnClick()}>
          Clear All
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFilterPopupList;
