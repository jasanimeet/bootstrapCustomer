import React from 'react';
import clsx from 'clsx';
// Material UI
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';

// style
import useStyles from './style';

const CustomButton = ({
  btnLabel,
  className,
  addIcon,
  type,
  onClick,
  disable,
  form,
  variant,
  width,
  position,
  right,
  top,
  customclass,
}) => {
  const classes = useStyles();
  return (
    <Button
      form={form}
      disabled={disable}
      type={type}
      className={clsx(
        customclass,
        className,
        { [classes.button]: !disable },
        { [classes.disableButton]: disable },
      )}
      variant={variant}
      onClick={onClick}
      sx={{
        width,
        position,
        right,
        top,
        fontFamily: 'calibri',
      }}
    >
      {addIcon && <Add fontSize="small" />}
      {' '}
      {btnLabel}
    </Button>
  );
};

CustomButton.defaultProps = {
  btnLabel: 'Submit',
  className: '',
  addIcon: false,
  type: 'submit',
  onClick: () => { },
  disable: false,
  form: '',
  variant: 'contained',
  width: null,
  position: null,
  right: null,
  top: null,
};

export default CustomButton;
