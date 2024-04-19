/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  InputLabel, Autocomplete, TextField, createFilterOptions,
  Button,
  Checkbox,
} from '@mui/material';
import { styled } from '@mui/system';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { useTheme } from '@mui/styles';
import useStyles from './style';

const AutoComplete = ({
  name,
  value,
  options,
  required,
  onChange,
  onKeyDown,
  inputRef,
  ref,
  disabled,
  helperTexts,
  errors,
  multiple,
  helperTextIssue,
  errorIssue,
  autoCompleteWidth,
  autoCompleteMarginRight,
  autoFocus,
  id,
  clickAddNew,
  newbtnOption,
  checkboxOption,
  label,
  paddingFix,
  allshows,
  themeColor,
  themeColorLabSearch,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.value,
    limit: !allshows && 100,
  });

  const getOptionLabel = (option, index) => {
    if (index === options.length - 1) {
      return (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              // Handle button click for the last option here
            }}
          >
            Action
          </Button>
        </div>
      );
    }
    return option.value;
  };

  const GroupHeader = styled('div')(() => ({
    position: 'sticky',
    top: '-8px',
    background: 'white',
    color: 'white',
    marginLeft: 12,
    width: '95%',
  }));

  const GroupHeader2 = styled('div')(() => ({
    // width: '80px',
    background: 'linear-gradient(to right, #018BED, rgb(34 108 163) 100%)',
    padding: '4px 10px',
  }));

  const GroupItems = styled('ul')({
    padding: 0,
  });

  return (
    <>
      <div style={{ display: 'flex' }}>
        <InputLabel
          required={required}
          className={classes.inputLabel}
          classes={{
            asterisk: classes.labelAsterisk,
          }}
        >
          {label || name}
        </InputLabel>
      </div>
      <Autocomplete
        multiple={multiple}
        id={name || id}
        // openOnFocus
        disableCloseOnSelect={!!multiple}
        options={options}
        groupBy={(option, index) => (index === 0 ? 'Sticky' : 'Other Options')}
        getOptionLabel={getOptionLabel}
        value={value}
        disabled={disabled}
        onChange={(e, newValue) => {
          onChange(e, newValue);
        }}
        filterOptions={filterOptions}
        ref={ref}
        classes={{ option: classes.option }}
        isOptionEqualToValue={(option, values) => option?.value === values?.value}
        sx={{
          '& .MuiAutocomplete-input': {
            padding: paddingFix || '0.5px 14px!important',
            fontSize: '13px',
            height: 'auto',
            fontFamily: 'calibri',
          },
          width: autoCompleteWidth,
          marginRight: autoCompleteMarginRight,
          '& .MuiOutlinedInput-root': {
            // paddingTop: '5px',
            // paddingBottom: '5px',
            borderRadius: '6px',
            padding: '0 0!important',
          },
          '& .MuiAutocomplete-tag': {
            margin: '0px 3px',
            height: '27px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: (themeColorLabSearch || (themeColor && `${theme.palette.common.borderThemeColor}!important`)),
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            onKeyDown={onKeyDown}
            autoFocus={autoFocus}
            inputRef={inputRef}
            error={errors || errorIssue}
            helperText={helperTexts || helperTextIssue}
            autoComplete="off"
            sx={{
              fontSize: '13px',
              fontFamily: 'calibri',
              '& .MuiChip-label': {
                fontFamily: 'calibri',
                fontSize: '13px',
              },
            }}
          />
        )}
        renderOption={checkboxOption && ((props, optionss, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
              sx={{
                padding: '2px',
              }}
            />
            {optionss.value}
          </li>
        ))}
        renderGroup={(params) => (
          <li key={params.key}>
            {
              newbtnOption
              && (
              <GroupHeader onClick={() => clickAddNew()}>
                <GroupHeader2>
                  New
                </GroupHeader2>

              </GroupHeader>
              )
            }
            <GroupItems>{params.children}</GroupItems>
          </li>
        )}
      />
    </>
  );
};

export default AutoComplete;
