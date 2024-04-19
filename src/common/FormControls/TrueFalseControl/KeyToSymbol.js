/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  Box,
  Button,
  IconButton,
  Popover,
  Typography,
} from '@mui/material';
import DoneSharpIcon from '@mui/icons-material/DoneSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';

const KeyToSymbol = ({
  data,
  setData,
  isOpen,
  onClose,
  anchorEl,
}) => {
  const trueData = (rowIndex) => {
    const newData = data?.map((item, index) => {
      if (index === rowIndex) {
        return {
          ...item,
          Symbol_Status: item.Symbol_Status === true ? null : true,
        };
      }
      return item;
    });
    setData(newData);
  };

  const falseData = (rowIndex) => {
    const newData = data?.map((item, index) => {
      if (index === rowIndex) {
        return {
          ...item,
          Symbol_Status: item.Symbol_Status === false ? null : false,

        };
      }
      return item;
    });
    setData(newData);
  };

  const clearButton = () => {
    setData(data?.map((item) => ({
      ...item,
      Symbol_Status: null,
    })));
  };

  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      sx={{
        maxHeight: '600px',
        '& .MuiPopover-paper': {
          maxHeight: '300px',
          maxWidth: '300px',
          padding: '5px 13px 13px 13px',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
        }}
      >
        <Button
          onClick={clearButton}
          sx={{
            fontFamily: 'calibri',
            padding: 0,
            background: 'linear-gradient(#018BED, rgb(34 108 163) 100%)',
            color: '#fff',
          }}
        >
          Clear
        </Button>
      </Box>
      {data?.map((item, rowIndex) => (
        <Box
          key={rowIndex}
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '3px 0',
            gap: '6px',
            borderBottom: '1px solid #c1c1c1',
          }}
        >
          <IconButton
            sx={{
              fontSize: '14px',
              padding: '2px',
              border: '1px solid #c1c1c1',
              background: item?.Symbol_Status === true ? 'green' : 'unset',
              '&:hover': {
                background: item?.Symbol_Status === true ? 'green' : 'unset',
              },
            }}
            onClick={() => trueData(rowIndex)}
          >
            <DoneSharpIcon sx={{ fontSize: '18px', color: item?.Symbol_Status === true ? '#fff' : 'unset' }} />
          </IconButton>
          <IconButton
            sx={{
              fontSize: '14px',
              padding: '2px',
              border: '1px solid #c1c1c1',
              background: item?.Symbol_Status === false ? 'red' : 'unset',
              '&:hover': {
                background: item?.Symbol_Status === false ? 'red' : 'unset',
              },
            }}
            onClick={() => falseData(rowIndex)}
          >
            <CloseSharpIcon sx={{ fontSize: '18px', color: item?.Symbol_Status === false ? '#fff' : 'unset' }} />
          </IconButton>
          <Typography
            sx={{
              fontFamily: 'calibri',
              fontSize: '14px',
            }}
          >
            {item?.Key_To_Symbol}
          </Typography>
        </Box>
      ))}
    </Popover>
  );
};

export default KeyToSymbol;
