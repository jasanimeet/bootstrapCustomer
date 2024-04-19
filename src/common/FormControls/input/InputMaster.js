/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
import React, { useState } from 'react';
import {
  InputLabel, TextField,
} from '@mui/material';
import { useTheme } from '@mui/styles';
import useStyles from './style';

const InputMaster = ({
  name,
  label,
  multiline,
  rows,
  type,
  required,
  placeholder,
  validationSchema,
  helperTexts,
  errors,
  maxLength,
  disabled,
  padding0,
  maxValue,
  minusAccepted,
  minValue,
  onBlur,
  themeColor,
  themeColorLabSearch,
  custombackground,
  customFontColor,
  focusSelection,
  paddingData,
  fontSizeCustomer,
  endAdornment,
  ...rest
}) => {
  const classes = useStyles();
  const [touched, setTouched] = useState(false);
  const [errorMessge, setErrorMessage] = useState('');
  const theme = useTheme();

  const handleBlur = async (event) => {
    if (validationSchema) {
      try {
        await validationSchema.validateAt(name, { [name]: event?.target?.value });
        setErrorMessage('');
      } catch (validationError) {
        setErrorMessage(validationError?.errors[0]);
      }
    }
    setTouched(true);
  };

  const configTextField = {
    ...rest,
    size: 'small',
    multiline,
    rows,
    type: type !== 'number' && type,
    className: classes.textField,
    onBlur: onBlur || handleBlur,
    error: (touched && !!errorMessge) || errors,
    helperText: (touched && errorMessge) || helperTexts,
    InputProps: {
      endAdornment,
    },

  };

  return (
    <>
      {
      label
      && (
      <InputLabel
        required={required}
        className={classes.inputLabel}
        classes={{
          asterisk: classes.labelAsterisk,
        }}
      >
        {label}
      </InputLabel>
      )
    }
      <TextField
        autoComplete="off"
        placeholder={placeholder || label}
        name={name}
        {...configTextField}
        className={classes.textField}
        onFocus={(event) => {
          focusSelection && event.target.select();
        }}
        FormHelperTextProps={{
          classes: {
            root: classes.helperText,
          },
        }}
        SelectProps={{
          MenuProps: {
            classes: { paper: classes.selectMenu },
          },
        }}
        fullWidth
        multiline={multiline}
        rows={rows}
        disabled={disabled}
        maxLength={maxLength}
        type={type !== 'number' && type}
        inputProps={{
          ...configTextField.inputProps,
          maxLength,
          'aria-label': `${name || label}-input`,
        }}
        onInput={(e) => {
          if (type === 'number') {
            e.target.value = minusAccepted
              ? e.target.value.replace(/[^-\d.]/g, '')
              : e.target.value.replace(/[^0-9.]/g, '');

            // Ensure only two digits are allowed after the decimal point
            const decimalIndex = e.target.value.indexOf('.');
            if (decimalIndex !== -1) {
              const decimalPart = e.target.value.substring(decimalIndex + 1);
              if (decimalPart.length > 2) {
                e.target.value = e.target.value.substring(0, decimalIndex + 3);
              }
            }

            // Convert the input value to a number
            const numericValue = parseFloat(e.target.value);

            // Check if the numeric value exceeds the maxValue prop
            if (!isNaN(numericValue) && maxValue !== undefined && numericValue > maxValue) {
              e.target.value = maxValue.toString();
            }
            if (!isNaN(numericValue) && minValue !== undefined && numericValue < minValue) {
              e.target.value = minValue.toString();
            }
          }
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& .MuiOutlinedInput-input': {
              padding: paddingData || (padding0 && '0px 4px') || '0.5px 14px',
              fontSize: (fontSizeCustomer && fontSizeCustomer) || (padding0 && '14px'),
              zIndex: custombackground && 100,
              color: customFontColor && `${customFontColor}!important`,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderRadius: '6px',
              borderColor: (themeColorLabSearch || (themeColor && `${theme.palette.common.borderThemeColor}!important`)),
              backgroundColor: `${custombackground}!important` || theme.palette.common.backgroundSecondary,
            },
          },
        }}
      />
    </>
  );
};

InputMaster.defaultProps = {
  maxLength: 50,
};

export default React.memo(InputMaster);
