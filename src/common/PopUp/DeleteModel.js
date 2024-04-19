import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
// import {
//   CloseOutlined,
// } from '@ant-design/icons';
import { RiContactsBook2Fill } from 'react-icons/ri';

export default function DeleteModel({ handleShapeDelete, handleClose, navigationMessage }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleDelete = () => {
    handleShapeDelete();
    handleClose();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open // Always open the dialog when rendered
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      sx={{
        '& .MuiPaper-root': {
          minWidth: '300px',
        },
      }}
    >
      <DialogTitle
        id="responsive-dialog-title"
        sx={{
          fontFamily: 'calibri',
          fontWeight: 'bold',
        }}
        style={{
          background: 'linear-gradient(#018BED, rgb(34 108 163) 100%)',
          padding: '4px 24px',
        }}
      >
        {/* <PriorityHighIcon /> */}
        <IconButton onClick={() => handleClose()}>
          <RiContactsBook2Fill style={{ color: 'white' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ paddingTop: 30 }}>
        <DialogContentText sx={{
          fontFamily: 'calibri',
          fontWeight: 'bold',
        }}
        >
          {
            navigationMessage || 'Are you sure you want to delete this item?'
          }
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ marginBottom: 10, marginRight: 10 }}>
        <Button
          autoFocus
          onClick={handleDelete}
          sx={{
            fontFamily: 'calibri',
            fontWeight: 'bold',
          }}
          style={{
            background: '#f32b2b', color: 'white', letterSpacing: 1, padding: '4px 6px',
          }}
        >
          Yes
        </Button>
        <Button
          onClick={handleClose}
          sx={{
            fontFamily: 'calibri',
            fontWeight: 'bold',
          }}
          style={{
            background: '#ced2d8', color: '#4f5d73', letterSpacing: 1, padding: '4px 6px',
          }}
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
