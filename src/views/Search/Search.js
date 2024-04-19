/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import {
  Box, Button, Divider, Grid, IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '../../common/Typography/Typography';
import Input from '../../common/FormControls/input/InputMaster';
import useStyle from './style';
import { shapes } from './data';

import AutoComplete from '../../common/FormControls/AutoComplete/AutoComplete';
import KeyToSymbol from '../../common/FormControls/TrueFalseControl/KeyToSymbol';
import AddFilterPopupList from './AddFllterPopupList';

const Search = ({
  SearchFilterData, setSearchFilterData,
  fancyColordata, fancyIntensitydata, fancyOvertonedata,
  handleSearchCall,
  setSaveSearchPopup,
  validationError, setValidationError,
  percentageData, setPercentageData,
  fancyColorValue, setFancyColorValue,
  fancyIntensityValue, setFancyIntensityValue,
  fancyOvertoneValue, setFancyOvertoneValue,
  caratData, setCaratData,
  colorData, setColorData,
  filterActive, setFilterActive,
  clickAddToFilter, resetBtn,
  apiGetData, totalDataCount,
  handleDownload,
}) => {
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = useState(null);
  const [keyToSymbolPopup, setKeyToSymbolPopup] = useState(false);

  const [commentsPopup, setCommentsPopup] = useState(false);
  const [anchorEl1, setAnchorEl1] = useState(null);

  const [cutPropData, setCutPropData] = useState('');

  const [addFilterPopup, setAddFilterPopup] = useState(false);

  const handleFancyColorChange = (e, newValue) => {
    setFancyColorValue(newValue);
    apiGetData(SearchFilterData, percentageData, newValue, fancyIntensityValue, fancyOvertoneValue);
  };

  const handleFancyIntensityChange = (e, newValue) => {
    setFancyIntensityValue(newValue);
    apiGetData(SearchFilterData, percentageData, fancyColorValue, newValue, fancyOvertoneValue);
  };

  const handleFancyOvertoneChange = (e, newValue) => {
    setFancyOvertoneValue(newValue);
    apiGetData(SearchFilterData, percentageData, fancyColorValue, fancyIntensityValue, newValue);
  };

  const toggleKeyToSymbolPopup = (target) => {
    setAnchorEl(target);
    setKeyToSymbolPopup(!keyToSymbolPopup);
  };

  const toggleCommentsPopup = (target) => {
    setAnchorEl1(target);
    setCommentsPopup(!commentsPopup);
  };

  const handleItemClick = (item, column) => {
    // Update Cat_val_Id and activeStatus based on the clicked item and column
    const updatedLabSearchData = SearchFilterData?.map((itemShape) => {
      if (itemShape?.Column_Name === column) {
        return {
          ...itemShape,
          data: itemShape.data.map((searchItem) => {
            if (searchItem.Cat_val_Id === item.Cat_val_Id) {
              return {
                ...searchItem,
                activeStatus: !searchItem.activeStatus,
              };
            }
            return searchItem;
          }),
        };
      }
      return itemShape;
    });
    apiGetData(updatedLabSearchData, percentageData, fancyColorValue, fancyIntensityValue, fancyOvertoneValue);

    // Update the state or relevant data structure with the modified labSearchData
    setSearchFilterData(updatedLabSearchData);
  };

  const AllClick = (column) => {
    const columnData = SearchFilterData?.find((itemShape) => itemShape?.Column_Name === column);
    const allActive = columnData?.data.every((item) => item.activeStatus);

    // Update Cat_val_Id and activeStatus based on the column data
    const updatedLabSearchData = SearchFilterData?.map((itemShape) => {
      if (itemShape?.Column_Name === column) {
        return {
          ...itemShape,
          data: itemShape.data.map((searchItem) => ({
            ...searchItem,
            activeStatus: !allActive,
          })),
        };
      }
      return itemShape;
    });
    apiGetData(updatedLabSearchData, percentageData, fancyColorValue, fancyIntensityValue, fancyOvertoneValue);

    // Update the state or relevant data structure with the modified labSearchData
    setSearchFilterData(updatedLabSearchData);
  };

  const fromDataGet = (fromDataParameter) => SearchFilterData?.filter(
    (item) => item?.Column_Name === fromDataParameter,
  )[0]?.fromData;

  const blankDataGet = (fromDataParameter) => SearchFilterData?.filter(
    (item) => item?.Column_Name === fromDataParameter,
  )[0]?.blank_Value;

  const toDataGet = (toDataParameter) => SearchFilterData?.filter(
    (item) => item?.Column_Name === toDataParameter,
  )[0]?.toData;

  const handleInputChange = (column, property, value) => {
    const updatedData = [...SearchFilterData];
    const sectionIndex = updatedData.findIndex((section) => section.Column_Name === column);
    updatedData[sectionIndex][property] = value;

    // console.log(updatedData, '111111');
    const apiData = [...updatedData];
    // // Modify apiData based on property
    if (property === 'fromData' && !apiData[sectionIndex].toData && value) {
      apiData[sectionIndex].toData = 1;
    } else if (property === 'toData' && !apiData[sectionIndex].fromData && value) {
      apiData[sectionIndex].fromData = 0;
    }

    console.log(updatedData, '11111122222');

    // // Call apiGetData with modified apiData
    apiGetData(apiData, percentageData, fancyColorValue, fancyIntensityValue, fancyOvertoneValue);

    setSearchFilterData(updatedData);
  };

  const validationFromHandle = (column) => {
    const columnName = column.Column_Name;
    const fromValue = column.fromData;
    const toValue = column.toData;

    if (!fromValue && toValue) {
      setValidationError((prevError) => ({
        ...prevError,
        [columnName]: 'Enter From Value',
      }));
    } else if (!fromValue && !toValue) {
      setValidationError((prevError) => ({
        ...prevError,
        [columnName]: '',
      }));
    }

    if (fromValue && toValue) {
      if (fromValue > toValue) {
        setValidationError((prevError) => ({
          ...prevError,
          [columnName]: 'Value Should be greater than From Value',
        }));
      } else {
        setValidationError((prevError) => ({
          ...prevError,
          [columnName]: '',
        }));
      }
    }
  };

  const validationHandle = (column) => {
    const columnName = column.Column_Name;
    const fromValue = parseFloat(column.fromData);
    const toValue = parseFloat(column.toData);

    if (!fromValue && toValue) {
      setValidationError((prevError) => ({
        ...prevError,
        [columnName]: 'Enter From Value',
      }));
    } else if (fromValue && !toValue) {
      setValidationError((prevError) => ({
        ...prevError,
        [columnName]: 'Enter To Value',
      }));
    } else if (!fromValue && !toValue) {
      setValidationError((prevError) => ({
        ...prevError,
        [columnName]: '',
      }));
    }

    if (fromValue && toValue) {
      if (fromValue > toValue) {
        setValidationError((prevError) => ({
          ...prevError,
          [columnName]: 'Value Should be greater than From Value',
        }));
      } else {
        setValidationError((prevError) => ({
          ...prevError,
          [columnName]: '',
        }));
      }
    }
  };

  const handleRemovefromToData = (index, columnName) => {
    setSearchFilterData((prevLabSearchData) => {
      // Update the state using the previous state
      const updatedLabSearchData = prevLabSearchData.map((column) => {
        if (
          column.Column_Name === columnName
          && column.multiData
          && column.multiData.length > index
        ) {
          const updatedMultiData = [...column.multiData];
          updatedMultiData.splice(index, 1);
          return {
            ...column,
            multiData: updatedMultiData,
          };
        }
        return column;
      });

      apiGetData(updatedLabSearchData, percentageData, fancyColorValue, fancyIntensityValue, fancyOvertoneValue);

      return updatedLabSearchData; // Return the updated state
    });
  };

  const fromToDataAddOnClick = (columnNameData) => {
    if (fromDataGet(columnNameData) === '' && toDataGet(columnNameData) === '') {
      return;
    }

    if (fromDataGet(columnNameData) === '' && toDataGet(columnNameData)) {
      setValidationError((prevError) => ({
        ...prevError,
        [columnNameData]: 'Enter From Value',
      }));
      return;
    }

    if (fromDataGet(columnNameData) && toDataGet(columnNameData) === '') {
      setValidationError((prevError) => ({
        ...prevError,
        [columnNameData]: 'Enter To Value',
      }));
      return;
    }

    const fromData = parseFloat(fromDataGet(columnNameData));
    const toData = parseFloat(toDataGet(columnNameData));

    if (fromData !== undefined && toData !== undefined) {
      if (fromData > toData) {
        setValidationError((prevError) => ({
          ...prevError,
          [columnNameData]: 'Value Should be greater than From Value',
        }));
        return;
      }
      setValidationError((prevError) => ({
        ...prevError,
        [columnNameData]: '',
      }));

      const newDataRange = `${parseFloat(fromData).toFixed(2)}-${parseFloat(toData).toFixed(2)}`;
      if (SearchFilterData.some((column) => column.Column_Name === columnNameData)) {
        setSearchFilterData((prevLabSearchData) => {
          const updatedLabSearchData = prevLabSearchData.map((column) => {
            if (column.Column_Name === columnNameData) {
              return {
                ...column,
                fromData: '',
                toData: '',
                multiData: column.multiData.length !== 0
                  ? [...column.multiData, newDataRange] : [newDataRange],
              };
            }
            return column;
          });

          return updatedLabSearchData;
        });
      }
    }
  };

  const handleCutPropChange = (data) => {
    if (cutPropData === data) {
      setCutPropData('');

      const newData = SearchFilterData.map((itemShape) => {
        if (itemShape.Column_Name === 'CUT' || itemShape.Column_Name === 'POLISH' || itemShape.Column_Name === 'SYMM') {
          return {
            ...itemShape,
            data: itemShape.data.map((searchItem) => ({
              ...searchItem,
              activeStatus: false,
            })),
          };
        }
        return itemShape;
      });

      // Update labSearchData state with the updated data
      apiGetData(newData, percentageData, fancyColorValue, fancyIntensityValue, fancyOvertoneValue);

      setSearchFilterData(newData);
    } else {
      setCutPropData(data);

      const newData = SearchFilterData.map((itemShape) => {
        if (itemShape.Column_Name === 'CUT' || itemShape.Column_Name === 'POLISH' || itemShape.Column_Name === 'SYMM') {
          return {
            ...itemShape,
            data: itemShape.data.map((searchItem) => ({
              ...searchItem,
              activeStatus: searchItem.Category_Value === '3EX' || searchItem.Category_Value === 'EX' || (data === '3VG+' && searchItem.Category_Value === 'VG'),
            })),
          };
        }
        return itemShape;
      });

      apiGetData(newData, percentageData, fancyColorValue, fancyIntensityValue, fancyOvertoneValue);

      // Update labSearchData state with the updated data
      setSearchFilterData(newData);
    }
  };

  const handleKeyToSymbolDataChange = (newData) => {
    const rowIndex = SearchFilterData.findIndex((section) => section.Column_Name === 'KEY TO SYMBOL');

    setSearchFilterData((prevData) => {
      const updatedData = [...prevData];
      if (rowIndex >= 0 && rowIndex < updatedData.length) {
        updatedData[rowIndex] = {
          ...updatedData[rowIndex],
          data: newData,
        };
      }
      apiGetData(updatedData, percentageData, fancyColorValue, fancyIntensityValue, fancyOvertoneValue);

      return updatedData;
    });
  };

  const handleCommentsDataChange = (newData) => {
    const rowIndex = SearchFilterData.findIndex((section) => section.Column_Name === 'LAB COMMENTS');

    setSearchFilterData((prevData) => {
      const updatedData = [...prevData];
      if (rowIndex >= 0 && rowIndex < updatedData.length) {
        updatedData[rowIndex] = {
          ...updatedData[rowIndex],
          data: newData,
        };
      }
      apiGetData(updatedData, percentageData, fancyColorValue, fancyIntensityValue, fancyOvertoneValue);

      return updatedData;
    });
  };

  const blankInputChange = (column) => {
    const updatedData = [...SearchFilterData];
    const sectionIndex = updatedData.findIndex((section) => section.Column_Name === column);
    if (updatedData[sectionIndex].blank_Value === 'BLANK') {
      updatedData[sectionIndex].blank_Value = '';
    } else {
      updatedData[sectionIndex].blank_Value = 'BLANK';
    }
    apiGetData(updatedData, percentageData, fancyColorValue, fancyIntensityValue, fancyOvertoneValue);

    setSearchFilterData(updatedData);
  };

  const handleMediaChange = (value) => {
    const updatedPercentageData = {
      ...percentageData,
      [value === 'Image' ? 'Image' : 'Video']: !percentageData[value === 'Image' ? 'Image' : 'Video'],
    };
    setPercentageData(updatedPercentageData);
    apiGetData(SearchFilterData, updatedPercentageData, fancyColorValue, fancyIntensityValue, fancyOvertoneValue);
  };

  const addFilterBadge = () => {
    setAddFilterPopup(!addFilterPopup);
  };

  return (
    <>

      <div style={{
        // backgroundColor: '#d5d5d5',
        // height: '100%',
        // padding: '5px',
        // marginTop: '53px'
      }}
      >
        <div style={{
          background: '#fff',
          borderRadius: '10px',
          height: '100%',
          padding: '5px 10px',
          // overflowY: 'scroll',
        }}
        >

          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Box className={classes.minWidthColumnName}>
              <Typography>
                Shape
              </Typography>
            </Box>
            <Box style={{ width: 'calc(100% - 125px)' }}>

              <div className={classes.optionContainerShape}>
                <div
                  style={{
                    textAlign: 'center',
                    width: '80px',
                    height: '65px',
                  }}
                >
                  <button
                    type="button"
                    className={classes.remainingButtonFocusClass}
                    style={{
                      height: '65px',
                      color: SearchFilterData
                        ?.filter(
                          (itemShape) => itemShape?.Column_Name === 'SHAPE',
                        )[0]
                        ?.data?.filter((item) => item?.activeStatus)?.length
                  === SearchFilterData?.filter(
                    (itemShape) => itemShape?.Column_Name === 'SHAPE',
                  )[0]?.data?.length
                        ? '#fff'
                        : 'rgb(117, 117, 117)',
                      background:
                      SearchFilterData
                        ?.filter(
                          (itemShape) => itemShape?.Column_Name === 'SHAPE',
                        )[0]
                        ?.data?.filter((item) => item?.activeStatus)?.length
                      === SearchFilterData?.filter(
                        (itemShape) => itemShape?.Column_Name === 'SHAPE',
                      )[0]?.data?.length
                        ? '#023067'
                        : 'transparent',
                      border:
                      SearchFilterData
                        ?.filter(
                          (itemShape) => itemShape?.Column_Name === 'SHAPE',
                        )[0]
                        ?.data?.filter((item) => item?.activeStatus)?.length
                      === SearchFilterData?.filter(
                        (itemShape) => itemShape?.Column_Name === 'SHAPE',
                      )[0]?.data?.length
                        ? '1px solid #023067'
                        : '1px solid rgb(207, 207, 207)',
                      width: '80px',
                    }}
                    onClick={() => AllClick('SHAPE')}
                  >
                    ALL
                  </button>
                </div>
                {SearchFilterData
                  ?.filter((itemShape) => itemShape?.Column_Name === 'SHAPE')[0]
                  ?.data?.map((item) => (
                    <div
                      style={{
                        textAlign: 'center',
                        width: '80px',
                        height: '65px',
                      }}
                      onClick={() => handleItemClick(item, 'SHAPE')}
                    >
                      <button
                        type="button"
                        className={classes.remainingButtonFocusClass}
                        style={{
                          height: '65px',
                          background: item?.activeStatus ? '#023067' : 'transparent',
                          border: item?.activeStatus
                            ? '1px solid #023067'
                            : '1px solid rgb(207, 207, 207)',
                          cursor: 'pointer',
                          width: '80px',
                        }}
                      >
                        {shapes?.map(
                          (itemss) => itemss?.name === item.Category_Value && (
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <img
                              key={itemss?.name}
                              src={item?.activeStatus ? itemss.ActiveImage : itemss.Image}
                              alt={itemss?.name}
                              height="45px"
                            />
                            <div style={{ color: item?.activeStatus ? '#fff' : 'rgb(117, 117, 117)' }}>
                              {item.Category_Value}
                            </div>
                          </div>
                          ),
                        )}
                      </button>
                    </div>
                  ))}
              </div>
            </Box>
          </Box>

          <Divider className={classes.dividerStyle} />

          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Box className={classes.minWidthColumnName}>
              <Typography>
                Carat
              </Typography>
            </Box>
            <Box style={{ width: 'calc(100% - 125px)' }}>
              <div style={{
                display: 'flex', gap: '10px', marginBottom: '6px',
              }}
              >
                <Box
                  className={classes.buttonClass}
                  sx={{
                    background: caratData === 'Specific' ? 'rgb(246,215,176);' : '',
                    border: caratData === 'Specific' ? '1px solid  rgb(246,215,176);' : '1px solid #707070',
                    boxShadow: '0px 0px 5px 3px #e7e7e7',
                  }}
                >
                  <Typography
                    sx={{
                      color: caratData === 'Specific' ? '#666' : '#707070',
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                    onClick={() => setCaratData('Specific')}
                  >
                    Specific
                  </Typography>
                </Box>
                <Box
                  className={classes.buttonClass}
                  sx={{
                    background: caratData === 'General' ? 'rgb(246,215,176);' : '',
                    border: caratData === 'General' ? '1px solid rgb(246,215,176);' : '1px solid #707070',
                    boxShadow: '0px 0px 5px 3px #e7e7e7',
                  }}
                >
                  <Typography
                    sx={{
                      color: caratData === 'General' ? '#666' : '#707070',
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                    onClick={() => setCaratData('General')}
                  >
                    General
                  </Typography>
                </Box>
              </div>
              <div className={classes.caratClass} style={{ display: 'flex', gap: '10px' }}>

                {caratData === 'Specific' ? (
                  <Grid className={classes.remainingClass} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{
                      display: 'flex',
                      width: '185px',
                      gap: '10px',
                      alignItems: 'center',
                      height: 'fit-content',
                    }}
                    >
                      <Input
                        name="fromData"
                        placeholder="From"
                        value={fromDataGet('CTS')}
                        onChange={(e) => handleInputChange('CTS', 'fromData', e.target.value)}
                        type="number"
                        minValue={0}
                        maxValue={99.99}
                        onBlur={() => validationFromHandle(
                          SearchFilterData?.filter(
                            (itemShape) => itemShape?.Column_Name === 'CTS',
                          )[0],
                        )}
                      />
                      <Input
                        name="toData"
                        placeholder="To"
                        value={toDataGet('CTS')}
                        onChange={(e) => handleInputChange('CTS', 'toData', e.target.value)}
                        type="number"
                        minValue={0}
                        maxValue={99.99}
                        errors={validationError?.CTS}
                        helperTexts={validationError?.CTS}
                        onBlur={() => validationHandle(
                          SearchFilterData?.filter(
                            (itemShape) => itemShape?.Column_Name === 'CTS',
                          )[0],
                        )}
                      />
                      <Button
                        sx={{
                          fontWeight: '600',
                          fontSize: '25px',
                          color: '#1976d2',
                          cursor: 'pointer',
                          lineHeight: '0.8',
                          minWidth: 'unset',
                          padding: 0,
                        }}
                        onClick={() => fromToDataAddOnClick('CTS')}
                      >
                        +
                      </Button>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {SearchFilterData
                        ?.filter((item) => item?.Column_Name === 'CTS')[0]
                        ?.multiData?.map((value, index) => (
                          <Box
                            sx={{
                              border: '1px solid #023067',
                              borderRadius: '6px',
                              padding: '0.5px 5px',
                              marginLeft: '10px',
                              display: 'flex',
                              height: 'max-content!important',
                              alignItems: 'flex-start',
                            }}
                            className={classes.fontNameStyle}
                            id={index}
                          >
                            {value}
                            <IconButton
                              sx={{ padding: 0 }}
                              onClick={() => handleRemovefromToData(index, 'CTS')}
                            >
                              <CloseIcon
                                sx={{ color: '#1976d2', fontSize: '15px' }}
                              />
                            </IconButton>
                          </Box>
                        ))}
                    </Box>
                  </Grid>
                ) : (
                  <Grid className={`${classes.optionContainer} ${classes.remainingClass}`}>
                    {SearchFilterData
                      ?.filter(
                        (itemShape) => itemShape?.Column_Name === 'POINTER',
                      )[0]
                      ?.data?.map((item, index) => (
                        <div
                          key={index}
                          style={{ textAlign: 'center' }}
                        >
                          <button
                            type="button"
                            className={classes.remainingButtonFocusClass}
                            style={{
                              minWidth: '74px',
                              color: item?.activeStatus
                                ? '#fff'
                                : '#757575',
                              border: item?.activeStatus
                                ? '1px solid #023067'
                                : '1px solid #CFCFCF',
                              backgroundColor: item?.activeStatus
                                ? '#023067'
                                : '#fff',
                              paddingTop: '3px',
                            }}
                            onClick={() => handleItemClick(item, 'POINTER')}
                          >
                            {item?.Category_Value}
                          </button>
                        </div>
                      ))}
                  </Grid>
                )}
              </div>
            </Box>
          </Box>

          <Divider className={classes.dividerStyle} />

          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Box className={classes.minWidthColumnName}>
              <Typography>
                Color
              </Typography>
            </Box>
            <Box style={{ width: 'calc(100% - 125px)' }}>
              <div style={{
                display: 'flex', gap: '10px', marginBottom: '6px',
              }}
              >
                <Box
                  className={classes.buttonClass}
                  sx={{
                    background: colorData === 'Regular' ? 'rgb(246,215,176)' : '',
                    border: colorData === 'Regular' ? 'rgb(246,215,176)' : '1px solid #707070',
                    boxShadow: '0px 0px 5px 3px #e7e7e7',
                  }}
                >
                  <Typography
                    sx={{
                      color: colorData === 'Regular' ? '#666' : '#707070',
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                    className={classes.fontNameStyleCaratColor}
                    onClick={() => setColorData('Regular')}
                  >
                    Regular
                  </Typography>
                </Box>
                <Box
                  className={classes.buttonClass}
                  sx={{
                    background: colorData === 'Fancy' ? 'rgb(246,215,176)' : '',
                    border: colorData === 'Fancy' ? 'rgb(246,215,176)' : '1px solid #707070',
                    boxShadow: '0px 0px 5px 3px #e7e7e7',
                  }}
                >
                  <Typography
                    sx={{
                      color: colorData === 'Fancy' ? '#666' : '#707070',
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                    className={classes.fontNameStyleCaratColor}
                    onClick={() => setColorData('Fancy')}
                  >
                    Fancy
                  </Typography>
                </Box>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  width: '100%',
                  alignItems: 'center',
                }}
              >

                {colorData !== 'Fancy' ? (
                  <Box className={classes.optionContainer}>
                    {SearchFilterData
                      ?.filter(
                        (itemShape) => itemShape?.Column_Name === 'COLOR',
                      )[0]
                      ?.data?.map((item, index) => (
                        <div
                          key={index}
                          style={{ textAlign: 'center' }}
                        >
                          <button
                            type="button"
                            className={classes.remainingButtonFocusClass}
                            style={{
                              minWidth: '31px',
                              color: item?.activeStatus
                                ? '#fff'
                                : '#757575',
                              border: item?.activeStatus
                                ? '1px solid #023067'
                                : '1px solid #CFCFCF',
                              backgroundColor: item?.activeStatus
                                ? '#023067'
                                : '#fff',
                              paddingTop: '3px',
                            }}
                            onClick={() => handleItemClick(item, 'COLOR')}
                          >
                            {item?.Category_Value}
                          </button>
                        </div>
                      ))}
                  </Box>
                ) : (
                  <Box sx={{
                    display: 'flex', gap: '10px', width: '100%', alignItems: 'center',
                  }}
                  >
                    <Box sx={{ width: '30%' }}>
                      <AutoComplete
                        name="Fancy Color"
                        options={fancyColordata}
                        value={fancyColorValue}
                        onChange={handleFancyColorChange}
                      />
                    </Box>
                    <Box sx={{ width: '30%' }}>
                      <AutoComplete
                        name="Fancy Intensity"
                        options={fancyIntensitydata}
                        value={fancyIntensityValue}
                        onChange={handleFancyIntensityChange}
                      />
                    </Box>
                    <Box sx={{ width: '30%' }}>
                      <AutoComplete
                        name="Fancy Overtone"
                        options={fancyOvertonedata}
                        value={fancyOvertoneValue}
                        onChange={handleFancyOvertoneChange}
                      />
                    </Box>
                  </Box>
                )}

              </div>
            </Box>
          </Box>

          <Divider className={classes.dividerStyle} />

          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Box className={classes.minWidthColumnName}>
              <Typography>
                Clarity
              </Typography>
            </Box>
            <Box style={{ width: 'calc(100% - 125px)' }}>
              <Box className={classes.optionContainer}>
                {SearchFilterData?.filter((itemShape) => itemShape?.Column_Name === 'CLARITY')[0]
                  ?.data?.map((item, index) => (
                    <div
                      key={index}
                      style={{ textAlign: 'center' }}
                    >
                      <button
                        type="button"
                        className={classes.remainingButtonFocusClass}
                        style={{
                          minWidth: '50px',
                          color: item?.activeStatus
                            ? '#fff'
                            : '#757575',
                          border: item?.activeStatus
                            ? '1px solid #023067'
                            : '1px solid #CFCFCF',
                          backgroundColor: item?.activeStatus
                            ? '#023067'
                            : '#fff',
                          paddingTop: '3px',
                        }}
                        onClick={() => handleItemClick(item, 'CLARITY')}
                      >
                        {item?.Category_Value}
                      </button>
                    </div>
                  ))}
              </Box>
            </Box>
          </Box>

          <Divider className={classes.dividerStyle} />

          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Box className={classes.minWidthColumnName}>
              <Typography>
                Cut
              </Typography>
            </Box>
            <Box style={{ width: 'calc(100% - 125px)' }}>
              <div style={{
                display: 'flex', gap: '10px', marginBottom: '6px',
              }}
              >
                <Typography
                  style={{
                    color: cutPropData === '3EX' ? '#666' : '#707070',
                    background: cutPropData === '3EX' ? 'rgb(246,215,176)' : '#fff',
                    border: cutPropData === '3EX' ? '1px solid rgb(246,215,176)' : '1px solid #707070',
                    boxShadow: '0px 0px 5px 3px #e7e7e7',
                    cursor: 'pointer',
                  }}
                  className={classes.labelCommon}
                  onClick={() => handleCutPropChange('3EX')}
                >
                  3EX
                </Typography>
                <Typography
                  className={classes.labelCommon}
                  style={{
                    color: cutPropData === '3VG+' ? '#666' : '#707070',
                    background: cutPropData === '3VG+' ? 'rgb(246,215,176)' : '#fff',
                    border: cutPropData === '3VG+' ? '1px solid rgb(246,215,176)' : '1px solid #707070',
                    boxShadow: '0px 0px 5px 3px #e7e7e7',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleCutPropChange('3VG+')}
                >
                  3VG+
                </Typography>
              </div>
              <div className={classes.optionContainer}>
                {SearchFilterData
                  ?.filter((itemShape) => itemShape?.Column_Name === 'CUT')[0]
                  ?.data?.map((item, index) => (
                    <div
                      key={index}
                      style={{ textAlign: 'center' }}
                    >
                      <button
                        type="button"
                        className={classes.remainingButtonFocusClass}
                        style={{
                          minWidth: '50px',
                          color: item?.activeStatus
                            ? '#fff'
                            : '#757575',
                          border: item?.activeStatus
                            ? '1px solid #023067'
                            : '1px solid #CFCFCF',
                          backgroundColor: item?.activeStatus
                            ? '#023067'
                            : '#fff',
                          paddingTop: '3px',
                        }}
                        onClick={() => handleItemClick(item, 'CUT', 'removeProps')}
                      >
                        {item?.Category_Value}
                      </button>
                    </div>
                  ))}
              </div>
            </Box>
          </Box>

          <Divider className={classes.dividerStyle} />

          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Box className={classes.minWidthColumnName}>
              <Typography>
                Polish
              </Typography>
            </Box>
            <Box style={{ width: 'calc(100% - 125px)' }}>
              <Box className={classes.optionContainer}>
                {SearchFilterData
                  ?.filter((itemShape) => itemShape?.Column_Name === 'POLISH')[0]
                  ?.data?.map((item, index) => (
                    <div
                      key={index}
                      style={{ textAlign: 'center' }}
                    >
                      <button
                        type="button"
                        className={classes.remainingButtonFocusClass}
                        style={{
                          minWidth: '50px',
                          color: item?.activeStatus
                            ? '#fff'
                            : '#757575',
                          border: item?.activeStatus
                            ? '1px solid #023067'
                            : '1px solid #CFCFCF',
                          backgroundColor: item?.activeStatus
                            ? '#023067'
                            : '#fff',
                          paddingTop: '3px',
                        }}
                        onClick={() => handleItemClick(item, 'POLISH', 'removeProps')}
                      >
                        {item?.Category_Value}
                      </button>
                    </div>
                  ))}
              </Box>
            </Box>
          </Box>

          <Divider className={classes.dividerStyle} />

          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Box className={classes.minWidthColumnName}>
              <Typography>
                Symmetry
              </Typography>
            </Box>
            <Box style={{ width: 'calc(100% - 125px)' }}>
              <Box className={classes.optionContainer}>
                {SearchFilterData
                  ?.filter((itemShape) => itemShape?.Column_Name === 'SYMM')[0]
                  ?.data?.map((item, index) => (
                    <div
                      key={index}
                      style={{ textAlign: 'center' }}
                    >
                      <button
                        type="button"
                        className={classes.remainingButtonFocusClass}
                        style={{
                          minWidth: '50px',
                          color: item?.activeStatus
                            ? '#fff'
                            : '#757575',
                          border: item?.activeStatus
                            ? '1px solid #023067'
                            : '1px solid #CFCFCF',
                          backgroundColor: item?.activeStatus
                            ? '#023067'
                            : '#fff',
                          paddingTop: '3px',
                        }}
                        onClick={() => handleItemClick(item, 'SYMM', 'removeProps')}
                      >
                        {item?.Category_Value}
                      </button>
                    </div>
                  ))}
              </Box>
            </Box>
          </Box>

          <Divider className={classes.dividerStyle} />

          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Box className={classes.minWidthColumnName}>
              <Typography>Fls</Typography>
            </Box>
            <Box style={{ width: 'calc(100% - 125px)' }}>
              <Box className={classes.optionContainer}>
                {SearchFilterData
                  ?.filter((itemShape) => itemShape?.Column_Name === 'FLS INTENSITY')[0]
                  ?.data?.map((item, index) => (
                    <div
                      key={index}
                      style={{ textAlign: 'center' }}
                    >
                      <button
                        type="button"
                        className={classes.remainingButtonFocusClass}
                        style={{
                          minWidth: '50px',
                          color: item?.activeStatus
                            ? '#fff'
                            : '#757575',
                          border: item?.activeStatus
                            ? '1px solid #023067'
                            : '1px solid #CFCFCF',
                          backgroundColor: item?.activeStatus
                            ? '#023067'
                            : '#fff',
                          paddingTop: '3px',
                        }}
                        onClick={() => handleItemClick(item, 'FLS INTENSITY')}
                      >
                        {item?.Category_Value}
                      </button>
                    </div>
                  ))}
              </Box>
            </Box>
          </Box>

          <Divider className={classes.dividerStyle} />

          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Box className={classes.minWidthColumnName}>
              <Typography>BGM</Typography>
            </Box>
            <Box style={{ width: 'calc(100% - 125px)' }}>
              <Box className={classes.optionContainer}>
                {SearchFilterData
                  ?.filter((itemShape) => itemShape?.Column_Name === 'BGM')[0]
                  ?.data?.map((item, index) => (
                    <div
                      key={index}
                      style={{ textAlign: 'center' }}
                    >
                      <button
                        type="button"
                        className={classes.remainingButtonFocusClass}
                        style={{
                          minWidth: '50px',
                          color: item?.activeStatus
                            ? '#fff'
                            : '#757575',
                          border: item?.activeStatus
                            ? '1px solid #023067'
                            : '1px solid #CFCFCF',
                          backgroundColor: item?.activeStatus
                            ? '#023067'
                            : '#fff',
                          paddingTop: '3px',
                        }}
                        onClick={() => handleItemClick(item, 'BGM')}
                      >
                        {item?.Category_Value}
                      </button>
                    </div>
                  ))}
              </Box>
            </Box>
          </Box>

          <Divider className={classes.dividerStyle} />

          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Box className={classes.minWidthColumnName}>
              <Typography>Lab</Typography>
            </Box>
            <Box style={{ width: 'calc(100% - 125px)' }}>
              <Box className={classes.optionContainer}>
                {SearchFilterData
                  ?.filter((itemShape) => itemShape?.Column_Name === 'LAB')[0]
                  ?.data?.map((item, index) => (
                    <div
                      key={index}
                      style={{ textAlign: 'center' }}
                    >
                      <button
                        type="button"
                        className={classes.remainingButtonFocusClass}
                        style={{
                          minWidth: '50px',
                          color: item?.activeStatus
                            ? '#fff'
                            : '#757575',
                          border: item?.activeStatus
                            ? '1px solid #023067'
                            : '1px solid #CFCFCF',
                          backgroundColor: item?.activeStatus
                            ? '#023067'
                            : '#fff',
                          paddingTop: '3px',
                        }}
                        onClick={() => handleItemClick(item, 'LAB')}
                      >
                        {item?.Category_Value}
                      </button>
                    </div>
                  ))}
              </Box>
            </Box>
          </Box>

          <Divider className={classes.dividerStyle} />

          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Box className={classes.minWidthColumnName}>
              <Typography>Location</Typography>
            </Box>
            <Box style={{ width: 'calc(100% - 125px)' }}>
              <Box className={classes.optionContainer}>
                {SearchFilterData
                  ?.filter((itemShape) => itemShape?.Column_Name === 'LOCATION')[0]
                  ?.data?.map((item, index) => (
                    <div
                      key={index}
                      style={{ textAlign: 'center' }}
                    >
                      <button
                        type="button"
                        className={classes.remainingButtonFocusClass}
                        style={{
                          minWidth: '50px',
                          color: item?.activeStatus
                            ? '#fff'
                            : '#757575',
                          border: item?.activeStatus
                            ? '1px solid #023067'
                            : '1px solid #CFCFCF',
                          backgroundColor: item?.activeStatus
                            ? '#023067'
                            : '#fff',
                          paddingTop: '3px',
                        }}
                        onClick={() => handleItemClick(item, 'LOCATION')}
                      >
                        {item?.Category_Value}
                      </button>
                    </div>
                  ))}
              </Box>
            </Box>
          </Box>

          <Divider className={classes.dividerStyle} />

          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Box className={classes.minWidthColumnName}>
              <Typography>Culet</Typography>
            </Box>
            <Box style={{ width: 'calc(100% - 125px)' }}>
              <Box className={classes.optionContainer}>
                {SearchFilterData
                  ?.filter((itemShape) => itemShape?.Column_Name === 'CULET')[0]
                  ?.data?.map((item, index) => (
                    <div
                      key={index}
                      style={{ textAlign: 'center' }}
                    >
                      <button
                        type="button"
                        className={classes.remainingButtonFocusClass}
                        style={{
                          minWidth: '50px',
                          color: item?.activeStatus
                            ? '#fff'
                            : '#757575',
                          border: item?.activeStatus
                            ? '1px solid #023067'
                            : '1px solid #CFCFCF',
                          backgroundColor: item?.activeStatus
                            ? '#023067'
                            : '#fff',
                          paddingTop: '3px',
                        }}
                        onClick={() => handleItemClick(item, 'CULET')}
                      >
                        {item?.Category_Value}
                      </button>
                    </div>
                  ))}
              </Box>
            </Box>
          </Box>

          <Divider className={classes.dividerStyle} />

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
          >
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Box style={{ width: '50%', display: 'flex' }}>
                <Box className={classes.minWidthColumnName}>
                  <Typography>Length</Typography>
                </Box>
                <Box style={{ width: 'calc(100% - 125px)' }}>
                  <Grid sx={{ display: 'flex', alignItems: 'baseline' }}>
                    <Box sx={{ display: 'flex', gap: '5px' }}>
                      <Box sx={{
                        display: 'flex',
                        width: '150px',
                        gap: '5px',
                        alignItems: 'center',
                        height: 'fit-content',
                      }}
                      >
                        <Input
                          name="fromData"
                          placeholder="From"
                          value={fromDataGet('LENGTH')}
                          onChange={(e) => handleInputChange('LENGTH', 'fromData', e.target.value)}
                          type="number"
                          minValue={0}
                          maxValue={99.99}
                          onBlur={() => validationFromHandle(
                            SearchFilterData?.filter(
                              (itemShape) => itemShape?.Column_Name === 'LENGTH',
                            )[0],
                          )}
                        />
                        <Input
                          name="toData"
                          placeholder="To"
                          value={toDataGet('LENGTH')}
                          onChange={(e) => handleInputChange('LENGTH', 'toData', e.target.value)}
                          type="number"
                          minValue={0}
                          maxValue={99.99}
                          errors={validationError?.LENGTH}
                          helperTexts={validationError?.LENGTH}
                          onBlur={() => validationHandle(
                            SearchFilterData?.filter(
                              (itemShape) => itemShape?.Column_Name === 'LENGTH',
                            )[0],
                          )}
                        />
                      </Box>
                      <Button
                        sx={{
                          fontWeight: '600',
                          fontSize: '25px',
                          color: '#1976d2',
                          cursor: 'pointer',
                          lineHeight: '0.8',
                          minWidth: 'unset',
                          padding: 0,
                        }}
                        onClick={() => fromToDataAddOnClick('LENGTH')}
                      >
                        +
                      </Button>
                    </Box>
                    <div
                      style={{
                        display: 'flex',
                        gap: '10px',
                      }}
                    >
                      {SearchFilterData
                        ?.filter((item) => item?.Column_Name === 'LENGTH')[0]
                        ?.multiData?.map((value, index) => (
                          <Box
                            sx={{
                              border: '1px solid #1976d2',
                              borderRadius: '6px',
                              padding: '0.5px 5px',
                              display: 'flex',
                              fontFamily: 'Montserrat, sans-serif!important',
                              width: 'fit-content',
                              minWidth: 'fit-content',
                              fontSize: '12px',
                              alignItems: 'end',
                            }}
                            id={index}
                          >
                            {value}
                            <IconButton
                              sx={{ padding: 0 }}
                              onClick={() => handleRemovefromToData(index, 'LENGTH')}
                            >
                              <CloseIcon
                                sx={{ color: '#1976d2', fontSize: '15px' }}
                              />
                            </IconButton>
                          </Box>
                        ))}
                    </div>
                  </Grid>
                </Box>
              </Box>
              <Box style={{ width: '50%', display: 'flex' }}>
                <Box className={classes.minWidthColumnName}>
                  <Typography>Width</Typography>
                </Box>
                <Box style={{ width: 'calc(100% - 125px)' }}>
                  <Grid sx={{ display: 'flex', alignItems: 'baseline' }}>
                    <Box sx={{ display: 'flex', gap: '5px' }}>
                      <Box sx={{
                        display: 'flex',
                        width: '150px',
                        gap: '5px',
                        alignItems: 'center',
                        height: 'fit-content',
                      }}
                      >
                        <Input
                          name="fromData"
                          placeholder="From"
                          value={fromDataGet('WIDTH')}
                          onChange={(e) => handleInputChange('WIDTH', 'fromData', e.target.value)}
                          type="number"
                          minValue={0}
                          maxValue={99.99}
                          onBlur={() => validationFromHandle(
                            SearchFilterData?.filter(
                              (itemShape) => itemShape?.Column_Name === 'WIDTH',
                            )[0],
                          )}
                        />
                        <Input
                          name="toData"
                          placeholder="To"
                          value={toDataGet('WIDTH')}
                          onChange={(e) => handleInputChange('WIDTH', 'toData', e.target.value)}
                          type="number"
                          minValue={0}
                          maxValue={99.99}
                          errors={validationError?.WIDTH}
                          helperTexts={validationError?.WIDTH}
                          onBlur={() => validationHandle(
                            SearchFilterData?.filter(
                              (itemShape) => itemShape?.Column_Name === 'WIDTH',
                            )[0],
                          )}
                        />
                      </Box>
                      <Button
                        sx={{
                          fontWeight: '600',
                          fontSize: '25px',
                          color: '#1976d2',
                          cursor: 'pointer',
                          lineHeight: '0.8',
                          minWidth: 'unset',
                          padding: 0,
                        }}
                        onClick={() => fromToDataAddOnClick('WIDTH')}
                      >
                        +
                      </Button>
                    </Box>
                    <div
                      style={{
                        display: 'flex',
                        gap: '10px',
                      }}
                    >
                      {SearchFilterData
                        ?.filter((item) => item?.Column_Name === 'WIDTH')[0]
                        ?.multiData?.map((value, index) => (
                          <Box
                            sx={{
                              border: '1px solid #1976d2',
                              borderRadius: '6px',
                              padding: '0.5px 5px',
                              display: 'flex',
                              fontFamily: 'Montserrat, sans-serif!important',
                              width: 'fit-content',
                              minWidth: 'fit-content',
                              fontSize: '12px',
                              alignItems: 'end',
                            }}
                            id={index}
                          >
                            {value}
                            <IconButton
                              sx={{ padding: 0 }}
                              onClick={() => handleRemovefromToData(index, 'WIDTH')}
                            >
                              <CloseIcon
                                sx={{ color: '#1976d2', fontSize: '15px' }}
                              />
                            </IconButton>
                          </Box>
                        ))}
                    </div>
                  </Grid>
                </Box>
              </Box>
            </Box>

            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Box style={{ width: '50%', display: 'flex' }}>
                <Box className={classes.minWidthColumnName}>
                  <Typography>Depth%</Typography>
                </Box>
                <Box style={{ width: 'calc(100% - 125px)' }}>
                  <div style={{ display: 'flex', width: '150px', gap: '5px' }}>
                    <Input
                      name="fromData"
                      placeholder="From"
                      value={fromDataGet('DEPTH PER')}
                      onChange={(e) => handleInputChange('DEPTH PER', 'fromData', e.target.value)}
                      type="number"
                      minValue={0}
                      maxValue={99.99}
                      onBlur={() => validationFromHandle(
                        SearchFilterData?.filter(
                          (itemShape) => itemShape?.Column_Name === 'DEPTH PER',
                        )[0],
                      )}
                    />
                    <Input
                      name="toData"
                      placeholder="To"
                      value={toDataGet('DEPTH PER')}
                      onChange={(e) => handleInputChange('DEPTH PER', 'toData', e.target.value)}
                      type="number"
                      minValue={0}
                      maxValue={99.99}
                      errors={validationError['DEPTH PER']}
                      helperTexts={validationError['DEPTH PER']}
                      onBlur={() => validationHandle(
                        SearchFilterData?.filter(
                          (itemShape) => itemShape?.Column_Name === 'DEPTH PER',
                        )[0],
                      )}
                    />
                  </div>
                </Box>
              </Box>
              <Box style={{ width: '50%', display: 'flex' }}>
                <Box className={classes.minWidthColumnName}>
                  <Typography>Table%</Typography>
                </Box>
                <Box style={{ width: 'calc(100% - 125px)' }}>
                  <div style={{ display: 'flex', width: '150px', gap: '5px' }}>
                    <Input
                      name="fromData"
                      placeholder="From"
                      value={fromDataGet('TABLE PER')}
                      onChange={(e) => handleInputChange('TABLE PER', 'fromData', e.target.value)}
                      type="number"
                      minValue={0}
                      maxValue={99.99}
                      onBlur={() => validationFromHandle(
                        SearchFilterData?.filter(
                          (itemShape) => itemShape?.Column_Name === 'TABLE PER',
                        )[0],
                      )}
                    />
                    <Input
                      name="toData"
                      placeholder="To"
                      value={toDataGet('TABLE PER')}
                      onChange={(e) => handleInputChange('TABLE PER', 'toData', e.target.value)}
                      type="number"
                      minValue={0}
                      maxValue={99.99}
                      errors={validationError['TABLE PER']}
                      helperTexts={validationError['TABLE PER']}
                      onBlur={() => validationHandle(
                        SearchFilterData?.filter(
                          (itemShape) => itemShape?.Column_Name === 'TABLE PER',
                        )[0],
                      )}
                    />
                  </div>
                </Box>
              </Box>
            </Box>
          </Box>

          <Divider className={classes.dividerStyle} />
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
          >
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Box style={{ width: '50%', display: 'flex' }}>
                <Box className={classes.minWidthColumnName}>
                  <Typography>Table Black</Typography>
                </Box>
                <Box style={{ width: 'calc(100% - 125px)' }}>
                  <Box className={classes.optionContainer}>
                    {SearchFilterData
                      ?.filter((itemShape) => itemShape?.Column_Name === 'TABLE BLACK')[0]
                      ?.data?.map((item, index) => (
                        <div
                          key={index}
                          style={{ textAlign: 'center' }}
                        >
                          <button
                            type="button"
                            className={classes.remainingButtonFocusClass}
                            style={{
                              minWidth: '50px',
                              color: item?.activeStatus
                                ? '#fff'
                                : '#757575',
                              border: item?.activeStatus
                                ? '1px solid #023067'
                                : '1px solid #CFCFCF',
                              backgroundColor: item?.activeStatus
                                ? '#023067'
                                : '#fff',
                              paddingTop: '3px',
                            }}
                            onClick={() => handleItemClick(item, 'TABLE BLACK')}
                          >
                            {item?.Category_Value}
                          </button>
                        </div>
                      ))}
                  </Box>
                </Box>
              </Box>

              <Box style={{ width: '50%', display: 'flex' }}>
                <Box className={classes.minWidthColumnName}>
                  <Typography>Side Black</Typography>
                </Box>
                <Box style={{ width: 'calc(100% - 125px)' }}>
                  <Box className={classes.optionContainer}>
                    {SearchFilterData
                      ?.filter((itemShape) => itemShape?.Column_Name === 'SIDE BLACK')[0]
                      ?.data?.map((item, index) => (
                        <div
                          key={index}
                          style={{ textAlign: 'center' }}
                        >
                          <button
                            type="button"
                            className={classes.remainingButtonFocusClass}
                            style={{
                              minWidth: '50px',
                              color: item?.activeStatus
                                ? '#fff'
                                : '#757575',
                              border: item?.activeStatus
                                ? '1px solid #023067'
                                : '1px solid #CFCFCF',
                              backgroundColor: item?.activeStatus
                                ? '#023067'
                                : '#fff',
                              paddingTop: '3px',
                            }}
                            onClick={() => handleItemClick(item, 'SIDE BLACK')}
                          >
                            {item?.Category_Value}
                          </button>
                        </div>
                      ))}
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Box style={{ width: '50%', display: 'flex' }}>
                <Box className={classes.minWidthColumnName}>
                  <Typography>Table White</Typography>
                </Box>
                <Box style={{ width: 'calc(100% - 125px)' }}>
                  <Box className={classes.optionContainer}>
                    {SearchFilterData
                      ?.filter((itemShape) => itemShape?.Column_Name === 'TABLE WHITE')[0]
                      ?.data?.map((item, index) => (
                        <div
                          key={index}
                          style={{ textAlign: 'center' }}
                        >
                          <button
                            type="button"
                            className={classes.remainingButtonFocusClass}
                            style={{
                              minWidth: '50px',
                              color: item?.activeStatus
                                ? '#fff'
                                : '#757575',
                              border: item?.activeStatus
                                ? '1px solid #023067'
                                : '1px solid #CFCFCF',
                              backgroundColor: item?.activeStatus
                                ? '#023067'
                                : '#fff',
                              paddingTop: '3px',
                            }}
                            onClick={() => handleItemClick(item, 'TABLE WHITE')}
                          >
                            {item?.Category_Value}
                          </button>
                        </div>
                      ))}
                  </Box>
                </Box>
              </Box>

              <Box style={{ width: '50%', display: 'flex' }}>
                <Box className={classes.minWidthColumnName}>
                  <Typography>Side White</Typography>
                </Box>
                <Box style={{ width: 'calc(100% - 125px)' }}>
                  <Box className={classes.optionContainer}>
                    {SearchFilterData
                      ?.filter((itemShape) => itemShape?.Column_Name === 'SIDE WHITE')[0]
                      ?.data?.map((item, index) => (
                        <div
                          key={index}
                          style={{ textAlign: 'center' }}
                        >
                          <button
                            type="button"
                            className={classes.remainingButtonFocusClass}
                            style={{
                              minWidth: '50px',
                              color: item?.activeStatus
                                ? '#fff'
                                : '#757575',
                              border: item?.activeStatus
                                ? '1px solid #023067'
                                : '1px solid #CFCFCF',
                              backgroundColor: item?.activeStatus
                                ? '#023067'
                                : '#fff',
                              paddingTop: '3px',
                            }}
                            onClick={() => handleItemClick(item, 'SIDE WHITE')}
                          >
                            {item?.Category_Value}
                          </button>
                        </div>
                      ))}
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Box style={{ width: '50%', display: 'flex' }}>
                <Box className={classes.minWidthColumnName}>
                  <Typography>Table Open</Typography>
                </Box>
                <Box style={{ width: 'calc(100% - 125px)' }}>
                  <Box className={classes.optionContainer}>
                    {SearchFilterData
                      ?.filter((itemShape) => itemShape?.Column_Name === 'TABLE OPEN')[0]
                      ?.data?.map((item, index) => (
                        <div
                          key={index}
                          style={{ textAlign: 'center' }}
                        >
                          <button
                            type="button"
                            className={classes.remainingButtonFocusClass}
                            style={{
                              minWidth: '50px',
                              color: item?.activeStatus
                                ? '#fff'
                                : '#757575',
                              border: item?.activeStatus
                                ? '1px solid #023067'
                                : '1px solid #CFCFCF',
                              backgroundColor: item?.activeStatus
                                ? '#023067'
                                : '#fff',
                              paddingTop: '3px',
                            }}
                            onClick={() => handleItemClick(item, 'TABLE OPEN')}
                          >
                            {item?.Category_Value}
                          </button>
                        </div>
                      ))}
                  </Box>
                </Box>
              </Box>

              <Box style={{ width: '50%', display: 'flex' }}>
                <Box className={classes.minWidthColumnName}>
                  <Typography>Crown Open</Typography>
                </Box>
                <Box style={{ width: 'calc(100% - 125px)' }}>
                  <Box className={classes.optionContainer}>
                    {SearchFilterData
                      ?.filter((itemShape) => itemShape?.Column_Name === 'CROWN OPEN')[0]
                      ?.data?.map((item, index) => (
                        <div
                          key={index}
                          style={{ textAlign: 'center' }}
                        >
                          <button
                            type="button"
                            className={classes.remainingButtonFocusClass}
                            style={{
                              minWidth: '50px',
                              color: item?.activeStatus
                                ? '#fff'
                                : '#757575',
                              border: item?.activeStatus
                                ? '1px solid #023067'
                                : '1px solid #CFCFCF',
                              backgroundColor: item?.activeStatus
                                ? '#023067'
                                : '#fff',
                              paddingTop: '3px',
                            }}
                            onClick={() => handleItemClick(item, 'CROWN OPEN')}
                          >
                            {item?.Category_Value}
                          </button>
                        </div>
                      ))}
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Box style={{ width: '50%', display: 'flex' }}>
                <Box className={classes.minWidthColumnName}>
                  <Typography>Pavilion Open</Typography>
                </Box>
                <Box style={{ width: 'calc(100% - 125px)' }}>
                  <Box className={classes.optionContainer}>
                    {SearchFilterData
                      ?.filter((itemShape) => itemShape?.Column_Name === 'PAVILION OPEN')[0]
                      ?.data?.map((item, index) => (
                        <div
                          key={index}
                          style={{ textAlign: 'center' }}
                        >
                          <button
                            type="button"
                            className={classes.remainingButtonFocusClass}
                            style={{
                              minWidth: '50px',
                              color: item?.activeStatus
                                ? '#fff'
                                : '#757575',
                              border: item?.activeStatus
                                ? '1px solid #023067'
                                : '1px solid #CFCFCF',
                              backgroundColor: item?.activeStatus
                                ? '#023067'
                                : '#fff',
                              paddingTop: '3px',
                            }}
                            onClick={() => handleItemClick(item, 'PAVILION OPEN')}
                          >
                            {item?.Category_Value}
                          </button>
                        </div>
                      ))}
                  </Box>
                </Box>
              </Box>

              <Box style={{ width: '50%', display: 'flex' }}>
                <Box className={classes.minWidthColumnName}>
                  <Typography>Girdle Open</Typography>
                </Box>
                <Box style={{ width: 'calc(100% - 125px)' }}>
                  <Box className={classes.optionContainer}>
                    {SearchFilterData
                      ?.filter((itemShape) => itemShape?.Column_Name === 'GIRDLE OPEN')[0]
                      ?.data?.map((item, index) => (
                        <div
                          key={index}
                          style={{ textAlign: 'center' }}
                        >
                          <button
                            type="button"
                            className={classes.remainingButtonFocusClass}
                            style={{
                              minWidth: '50px',
                              color: item?.activeStatus
                                ? '#fff'
                                : '#757575',
                              border: item?.activeStatus
                                ? '1px solid #023067'
                                : '1px solid #CFCFCF',
                              backgroundColor: item?.activeStatus
                                ? '#023067'
                                : '#fff',
                              paddingTop: '3px',
                            }}
                            onClick={() => handleItemClick(item, 'GIRDLE OPEN')}
                          >
                            {item?.Category_Value}
                          </button>
                        </div>
                      ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Divider className={classes.dividerStyle} />

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
          >
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Box style={{ width: '50%', display: 'flex' }}>
                <Box className={classes.minWidthColumnName}>
                  <Typography>Key To Symbol</Typography>
                </Box>
                <Box style={{ width: 'calc(100% - 125px)' }}>
                  <Box
                    component="button"
                    sx={{
                      width: '250px',
                      padding: '0.5px 12px',
                      border: '1px solid #c1c1c1',
                      borderRadius: '6px',
                      height: 'fit-content',
                      fontFamily: 'Montserrat, sans-serif!important',
                      fontSize: '14px',
                      color: '#c1c1c1',
                    }}
                    onClick={(e) => toggleKeyToSymbolPopup(e?.currentTarget)}
                  >
                    {`${
                      SearchFilterData
                        ?.filter(
                          (item) => item?.Column_Name === 'KEY TO SYMBOL',
                        )[0]
                        ?.data.filter((item) => item.Symbol_Status).length
                    } - Selected / ${
                      SearchFilterData
                        ?.filter(
                          (item) => item?.Column_Name === 'KEY TO SYMBOL',
                        )[0]
                        ?.data.filter((item) => item.Symbol_Status === false)
                        .length
                    } - Deselected`}
                  </Box>
                  <KeyToSymbol
                    data={
                      SearchFilterData?.filter(
                        (item) => item?.Column_Name === 'KEY TO SYMBOL',
                      )[0]?.data
                    }
                    anchorEl={anchorEl}
                    setData={(newData) => handleKeyToSymbolDataChange(newData)}
                    isOpen={keyToSymbolPopup}
                    onClose={() => toggleKeyToSymbolPopup()}
                  />
                </Box>
              </Box>

              <Box style={{ width: '50%', display: 'flex' }}>
                <Box className={classes.minWidthColumnName}>
                  <Typography>Lab Comments</Typography>
                </Box>
                <Box style={{ width: 'calc(100% - 125px)' }}>
                  <Box
                    component="button"
                    sx={{
                      width: '250px',
                      padding: '0.5px 12px',
                      border: '1px solid #c1c1c1',
                      borderRadius: '6px',
                      fontFamily: 'Montserrat, sans-serif!important',
                      fontSize: '14px',
                      color: '#c1c1c1',
                    }}
                    onClick={(e) => toggleCommentsPopup(e?.currentTarget)}
                  >
                    {`${
                      SearchFilterData
                        ?.filter(
                          (item) => item?.Column_Name === 'LAB COMMENTS',
                        )[0]
                        ?.data.filter((item) => item.Symbol_Status).length
                    } - Selected / ${
                      SearchFilterData
                        ?.filter(
                          (item) => item?.Column_Name === 'LAB COMMENTS',
                        )[0]
                        ?.data.filter((item) => item.Symbol_Status === false)
                        .length
                    } - Deselected`}
                  </Box>
                  <KeyToSymbol
                    data={
                      SearchFilterData?.filter(
                        (item) => item?.Column_Name === 'LAB COMMENTS',
                      )[0]?.data
                    }
                    anchorEl={anchorEl1}
                    setData={(newData) => handleCommentsDataChange(newData)}
                    isOpen={commentsPopup}
                    onClose={() => toggleCommentsPopup()}
                  />
                </Box>
              </Box>
            </Box>

            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Box style={{ width: '50%', display: 'flex' }}>
                <Box className={classes.minWidthColumnName}>
                  <Typography>Cert Type</Typography>
                </Box>
                <Box style={{ width: 'calc(100% - 125px)' }}>
                  <Box className={classes.optionContainer}>
                    {SearchFilterData
                      ?.filter((itemShape) => itemShape?.Column_Name === 'CERT TYPE')[0]
                      ?.data?.map((item, index) => (
                        <div
                          key={index}
                          style={{ textAlign: 'center' }}
                        >
                          <button
                            type="button"
                            className={classes.remainingButtonFocusClass}
                            style={{
                              minWidth: '50px',
                              color: item?.activeStatus
                                ? '#fff'
                                : '#757575',
                              border: item?.activeStatus
                                ? '1px solid #023067'
                                : '1px solid #CFCFCF',
                              backgroundColor: item?.activeStatus
                                ? '#023067'
                                : '#fff',
                              paddingTop: '3px',
                            }}
                            onClick={() => handleItemClick(item, 'CERT TYPE')}
                          >
                            {item?.Category_Value}
                          </button>
                        </div>
                      ))}
                  </Box>
                </Box>
              </Box>

              <Box style={{ width: '50%', display: 'flex' }}>
                <Box className={classes.minWidthColumnName}>
                  <Typography>Girdle Per</Typography>
                </Box>
                <Box style={{ width: 'calc(100% - 125px)', display: 'flex', gap: '5px' }}>
                  <div style={{ display: 'flex', width: '150px', gap: '5px' }}>
                    <Input
                      name="fromData"
                      placeholder="From"
                      value={fromDataGet('GIRDLE PER')}
                      onChange={(e) => handleInputChange('GIRDLE PER', 'fromData', e.target.value)}
                      type="number"
                      minValue={0}
                      maxValue={99.99}
                      onBlur={() => validationFromHandle(
                        SearchFilterData?.filter(
                          (itemShape) => itemShape?.Column_Name === 'GIRDLE PER',
                        )[0],
                      )}
                    />
                    <Input
                      name="toData"
                      placeholder="To"
                      value={toDataGet('GIRDLE PER')}
                      onChange={(e) => handleInputChange('GIRDLE PER', 'toData', e.target.value)}
                      type="number"
                      minValue={0}
                      maxValue={99.99}
                      errors={validationError['GIRDLE PER']}
                      helperTexts={validationError['GIRDLE PER']}
                      onBlur={() => validationHandle(
                        SearchFilterData?.filter(
                          (itemShape) => itemShape?.Column_Name === 'GIRDLE PER',
                        )[0],
                      )}
                    />
                  </div>
                  <Typography
                    style={{
                      color: blankDataGet('GIRDLE PER') === 'BLANK' ? '#666' : '#707070',
                      background: blankDataGet('GIRDLE PER') === 'BLANK' ? 'rgb(246,215,176)' : '#fff',
                      border: blankDataGet('GIRDLE PER') === 'BLANK' ? '1px solid rgb(246,215,176)' : '1px solid #707070',
                      boxShadow: '0px 0px 5px 3px #e7e7e7',
                      height: 'fit-content',
                    }}
                    className={classes.labelCommon}
                    onClick={() => blankInputChange('GIRDLE PER')}
                  >
                    BLANK
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Divider className={classes.dividerStyle} />

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
          >
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Box style={{ width: '50%', display: 'flex' }}>
                <Box className={classes.minWidthColumnName}>
                  <Typography>Crown Angle</Typography>
                </Box>
                <Box style={{ width: 'calc(100% - 125px)', display: 'flex', gap: '5px' }}>
                  <div style={{ display: 'flex', width: '150px', gap: '5px' }}>
                    <Input
                      name="fromData"
                      placeholder="From"
                      value={fromDataGet('CROWN ANGLE')}
                      onChange={(e) => handleInputChange('CROWN ANGLE', 'fromData', e.target.value)}
                      type="number"
                      minValue={0}
                      maxValue={99.99}
                      onBlur={() => validationFromHandle(
                        SearchFilterData?.filter(
                          (itemShape) => itemShape?.Column_Name === 'CROWN ANGLE',
                        )[0],
                      )}
                    />
                    <Input
                      name="toData"
                      placeholder="To"
                      value={toDataGet('CROWN ANGLE')}
                      onChange={(e) => handleInputChange('CROWN ANGLE', 'toData', e.target.value)}
                      type="number"
                      minValue={0}
                      maxValue={99.99}
                      errors={validationError['CROWN ANGLE']}
                      helperTexts={validationError['CROWN ANGLE']}
                      onBlur={() => validationHandle(
                        SearchFilterData?.filter(
                          (itemShape) => itemShape?.Column_Name === 'CROWN ANGLE',
                        )[0],
                      )}
                    />
                  </div>
                  <Typography
                    style={{
                      color: blankDataGet('CROWN ANGLE') === 'BLANK' ? '#666' : '#707070',
                      background: blankDataGet('CROWN ANGLE') === 'BLANK' ? 'rgb(246,215,176)' : '#fff',
                      border: blankDataGet('CROWN ANGLE') === 'BLANK' ? '1px solid rgb(246,215,176)' : '1px solid #707070',
                      boxShadow: '0px 0px 5px 3px #e7e7e7',
                      height: 'fit-content',
                    }}
                    className={classes.labelCommon}
                    onClick={() => blankInputChange('CROWN ANGLE')}
                  >
                    BLANK
                  </Typography>
                </Box>
              </Box>

              <Box style={{ width: '50%', display: 'flex' }}>
                <Box className={classes.minWidthColumnName}>
                  <Typography>Crown Height%</Typography>
                </Box>
                <Box style={{ width: 'calc(100% - 125px)', display: 'flex', gap: '5px' }}>
                  <div style={{ display: 'flex', width: '150px', gap: '5px' }}>
                    <Input
                      name="fromData"
                      placeholder="From"
                      value={fromDataGet('CROWN HEIGHT')}
                      onChange={(e) => handleInputChange(
                        'CROWN HEIGHT',
                        'fromData',
                        e.target.value,
                      )}
                      type="number"
                      minValue={0}
                      maxValue={99.99}
                      onBlur={() => validationFromHandle(
                        SearchFilterData?.filter(
                          (itemShape) => itemShape?.Column_Name === 'CROWN HEIGHT',
                        )[0],
                      )}
                    />
                    <Input
                      name="toData"
                      placeholder="To"
                      value={toDataGet('CROWN HEIGHT')}
                      onChange={(e) => handleInputChange('CROWN HEIGHT', 'toData', e.target.value)}
                      type="number"
                      minValue={0}
                      maxValue={99.99}
                      errors={validationError['CROWN HEIGHT']}
                      helperTexts={validationError['CROWN HEIGHT']}
                      onBlur={() => validationHandle(
                        SearchFilterData?.filter(
                          (itemShape) => itemShape?.Column_Name === 'CROWN HEIGHT',
                        )[0],
                      )}
                    />
                  </div>
                  <Typography
                    style={{
                      color: blankDataGet('CROWN HEIGHT') === 'BLANK' ? '#666' : '#707070',
                      background: blankDataGet('CROWN HEIGHT') === 'BLANK' ? 'rgb(246,215,176)' : '#fff',
                      border: blankDataGet('CROWN HEIGHT') === 'BLANK' ? '1px solid rgb(246,215,176)' : '1px solid #707070',
                      boxShadow: '0px 0px 5px 3px #e7e7e7',
                      height: 'fit-content',
                    }}
                    className={classes.labelCommon}
                    onClick={() => blankInputChange('CROWN HEIGHT')}
                  >
                    BLANK
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Box style={{ width: '50%', display: 'flex' }}>
                <Box className={classes.minWidthColumnName}>
                  <Typography>Pavilion Angle</Typography>
                </Box>
                <Box style={{ width: 'calc(100% - 125px)', display: 'flex', gap: '5px' }}>
                  <div style={{ display: 'flex', width: '150px', gap: '5px' }}>
                    <Input
                      name="fromData"
                      placeholder="From"
                      value={fromDataGet('PAVILION ANGLE')}
                      onChange={(e) => handleInputChange(
                        'PAVILION ANGLE',
                        'fromData',
                        e.target.value,
                      )}
                      type="number"
                      minValue={0}
                      maxValue={99.99}
                      onBlur={() => validationFromHandle(
                        SearchFilterData?.filter(
                          (itemShape) => itemShape?.Column_Name === 'PAVILION ANGLE',
                        )[0],
                      )}
                    />
                    <Input
                      name="toData"
                      placeholder="To"
                      value={toDataGet('PAVILION ANGLE')}
                      onChange={(e) => handleInputChange(
                        'PAVILION ANGLE',
                        'toData',
                        e.target.value,
                      )}
                      type="number"
                      minValue={0}
                      maxValue={99.99}
                      errors={validationError['PAVILION ANGLE']}
                      helperTexts={validationError['PAVILION ANGLE']}
                      onBlur={() => validationHandle(
                        SearchFilterData?.filter(
                          (itemShape) => itemShape?.Column_Name === 'PAVILION ANGLE',
                        )[0],
                      )}
                    />
                  </div>
                  <Typography
                    style={{
                      color: blankDataGet('PAVILION ANGLE') === 'BLANK' ? '#666' : '#707070',
                      background: blankDataGet('PAVILION ANGLE') === 'BLANK' ? 'rgb(246,215,176)' : '#fff',
                      border: blankDataGet('PAVILION ANGLE') === 'BLANK' ? '1px solid rgb(246,215,176)' : '1px solid #707070',
                      boxShadow: '0px 0px 5px 3px #e7e7e7',
                      height: 'fit-content',
                    }}
                    className={classes.labelCommon}
                    onClick={() => blankInputChange('PAVILION ANGLE')}
                  >
                    BLANK
                  </Typography>
                </Box>
              </Box>

              <Box style={{ width: '50%', display: 'flex' }}>
                <Box className={classes.minWidthColumnName}>
                  <Typography>Pavilion Height</Typography>
                </Box>
                <Box style={{ width: 'calc(100% - 125px)', display: 'flex', gap: '5px' }}>
                  <div style={{ display: 'flex', width: '150px', gap: '5px' }}>
                    <Input
                      name="fromData"
                      placeholder="From"
                      value={fromDataGet('PAVILION HEIGHT')}
                      onChange={(e) => handleInputChange(
                        'PAVILION HEIGHT',
                        'fromData',
                        e.target.value,
                      )}
                      type="number"
                      minValue={0}
                      maxValue={99.99}
                      onBlur={() => validationFromHandle(
                        SearchFilterData?.filter(
                          (itemShape) => itemShape?.Column_Name === 'PAVILION HEIGHT',
                        )[0],
                      )}
                    />
                    <Input
                      name="toData"
                      placeholder="To"
                      value={toDataGet('PAVILION HEIGHT')}
                      onChange={(e) => handleInputChange(
                        'PAVILION HEIGHT',
                        'toData',
                        e.target.value,
                      )}
                      type="number"
                      minValue={0}
                      maxValue={99.99}
                      errors={validationError['PAVILION HEIGHT']}
                      helperTexts={validationError['PAVILION HEIGHT']}
                      onBlur={() => validationHandle(
                        SearchFilterData?.filter(
                          (itemShape) => itemShape?.Column_Name === 'PAVILION HEIGHT',
                        )[0],
                      )}
                    />
                  </div>
                  <Typography
                    style={{
                      color: blankDataGet('PAVILION HEIGHT') === 'BLANK' ? '#666' : '#707070',
                      background: blankDataGet('PAVILION HEIGHT') === 'BLANK' ? 'rgb(246,215,176)' : '#fff',
                      border: blankDataGet('PAVILION HEIGHT') === 'BLANK' ? '1px solid rgb(246,215,176)' : '1px solid #707070',
                      boxShadow: '0px 0px 5px 3px #e7e7e7',
                      height: 'fit-content',
                    }}
                    className={classes.labelCommon}
                    onClick={() => blankInputChange('PAVILION HEIGHT')}
                  >
                    BLANK
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Box style={{ width: '50%', display: 'flex' }}>
                <Box className={classes.minWidthColumnName}>
                  <Typography>Disc (%)</Typography>
                </Box>
                <Box style={{ width: 'calc(100% - 125px)', display: 'flex', gap: '5px' }}>
                  <div style={{ display: 'flex', width: '150px', gap: '5px' }}>
                    <Input
                      name="fromData"
                      placeholder="From"
                      value={fromDataGet('OFFER DISC')}
                      onChange={(e) => handleInputChange('OFFER DISC', 'fromData', e.target.value)}
                      type="number"
                      minValue={-99.99}
                      maxValue={99.99}
                      onBlur={() => validationFromHandle(
                        SearchFilterData?.filter(
                          (itemShape) => itemShape?.Column_Name === 'OFFER DISC',
                        )[0],
                      )}
                    />
                    <Input
                      name="toData"
                      placeholder="To"
                      value={toDataGet('OFFER DISC')}
                      onChange={(e) => handleInputChange('OFFER DISC', 'toData', e.target.value)}
                      type="number"
                      minValue={-99.99}
                      maxValue={99.99}
                      errors={validationError['OFFER DISC']}
                      helperTexts={validationError['OFFER DISC']}
                      onBlur={() => validationHandle(
                        SearchFilterData?.filter(
                          (itemShape) => itemShape?.Column_Name === 'OFFER DISC',
                        )[0],
                      )}
                    />
                  </div>
                </Box>
              </Box>

              <Box style={{ width: '50%', display: 'flex' }}>
                <Box className={classes.minWidthColumnName}>
                  <Typography>Final Amount</Typography>
                </Box>
                <Box style={{ width: 'calc(100% - 125px)', display: 'flex', gap: '5px' }}>
                  <div style={{ display: 'flex', width: '150px', gap: '5px' }}>
                    <Input
                      name="fromData"
                      placeholder="From"
                      value={fromDataGet('OFFER AMOUNT')}
                      onChange={(e) => handleInputChange('OFFER AMOUNT', 'fromData', e.target.value)}
                      type="number"
                      minValue={1}
                      maxValue={9999999.99}
                      onBlur={() => validationFromHandle(
                        SearchFilterData?.filter(
                          (itemShape) => itemShape?.Column_Name === 'OFFER AMOUNT',
                        )[0],
                      )}
                    />
                    <Input
                      name="toData"
                      placeholder="To"
                      value={toDataGet('OFFER AMOUNT')}
                      onChange={(e) => handleInputChange('OFFER AMOUNT', 'toData', e.target.value)}
                      type="number"
                      minValue={1}
                      maxValue={9999999.99}
                      errors={validationError['OFFER AMOUNT']}
                      helperTexts={validationError['OFFER AMOUNT']}
                      onBlur={() => validationHandle(
                        SearchFilterData?.filter(
                          (itemShape) => itemShape?.Column_Name === 'OFFER AMOUNT',
                        )[0],
                      )}
                    />
                  </div>
                </Box>
              </Box>
            </Box>

            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Box style={{ width: '50%', display: 'flex' }}>
                <Box className={classes.minWidthColumnName}>
                  <Typography>Final Price/Cts</Typography>
                </Box>
                <Box style={{ width: 'calc(100% - 125px)', display: 'flex', gap: '5px' }}>
                  <div style={{ display: 'flex', width: '150px', gap: '5px' }}>
                    <Input
                      name="fromData"
                      placeholder="From"
                      value={fromDataGet('PRICE PER CTS')}
                      onChange={(e) => handleInputChange(
                        'PRICE PER CTS',
                        'fromData',
                        e.target.value,
                      )}
                      type="number"
                      minValue={1}
                      maxValue={999999.99}
                      onBlur={() => validationFromHandle(
                        SearchFilterData?.filter(
                          (itemShape) => itemShape?.Column_Name === 'PRICE PER CTS',
                        )[0],
                      )}
                    />
                    <Input
                      name="toData"
                      placeholder="To"
                      value={toDataGet('PRICE PER CTS')}
                      onChange={(e) => handleInputChange('PRICE PER CTS', 'toData', e.target.value)}
                      type="number"
                      minValue={1}
                      maxValue={999999.99}
                      errors={validationError['PRICE PER CTS']}
                      helperTexts={validationError['PRICE PER CTS']}
                      onBlur={() => validationHandle(
                        SearchFilterData?.filter(
                          (itemShape) => itemShape?.Column_Name === 'PRICE PER CTS',
                        )[0],
                      )}
                    />
                  </div>
                </Box>
              </Box>

              <Box style={{ width: '50%', display: 'flex' }}>
                <Box className={classes.minWidthColumnName}>
                  <Typography>Ratio</Typography>
                </Box>
                <Box style={{ width: 'calc(100% - 125px)' }}>
                  <Grid sx={{ display: 'flex', alignItems: 'baseline' }}>
                    <Box sx={{ display: 'flex', gap: '5px' }}>
                      <Box sx={{
                        display: 'flex',
                        width: '150px',
                        gap: '5px',
                        alignItems: 'center',
                        height: 'fit-content',
                      }}
                      >
                        <Input
                          name="fromData"
                          placeholder="From"
                          value={fromDataGet('RATIO')}
                          onChange={(e) => handleInputChange('RATIO', 'fromData', e.target.value)}
                          type="number"
                          minValue={0}
                          maxValue={99.99}
                          onBlur={() => validationFromHandle(
                            SearchFilterData?.filter(
                              (itemShape) => itemShape?.Column_Name === 'RATIO',
                            )[0],
                          )}
                        />
                        <Input
                          name="toData"
                          placeholder="To"
                          value={toDataGet('RATIO')}
                          onChange={(e) => handleInputChange('RATIO', 'toData', e.target.value)}
                          type="number"
                          minValue={0}
                          maxValue={99.99}
                          errors={validationError?.RATIO}
                          helperTexts={validationError?.RATIO}
                          onBlur={() => validationHandle(
                            SearchFilterData?.filter(
                              (itemShape) => itemShape?.Column_Name === 'RATIO',
                            )[0],
                          )}
                        />
                      </Box>
                      <Button
                        sx={{
                          fontWeight: '600',
                          fontSize: '25px',
                          color: '#1976d2',
                          cursor: 'pointer',
                          lineHeight: '0.8',
                          minWidth: 'unset',
                          padding: 0,
                        }}
                        onClick={() => fromToDataAddOnClick('RATIO')}
                      >
                        +
                      </Button>
                    </Box>
                    <div
                      style={{
                        display: 'flex',
                        gap: '10px',
                      }}
                    >
                      {SearchFilterData
                        ?.filter((item) => item?.Column_Name === 'RATIO')[0]
                        ?.multiData?.map((value, index) => (
                          <Box
                            sx={{
                              border: '1px solid #1976d2',
                              borderRadius: '6px',
                              padding: '0.5px 5px',
                              display: 'flex',
                              fontFamily: 'Montserrat, sans-serif!important',
                              width: 'fit-content',
                              minWidth: 'fit-content',
                              fontSize: '12px',
                              alignItems: 'end',
                            }}
                            id={index}
                          >
                            {value}
                            <IconButton
                              sx={{ padding: 0 }}
                              onClick={() => handleRemovefromToData(index, 'RATIO')}
                            >
                              <CloseIcon
                                sx={{ color: '#1976d2', fontSize: '15px' }}
                              />
                            </IconButton>
                          </Box>
                        ))}
                    </div>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Box>

          <Divider className={classes.dividerStyle} />

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '90px',
          }}
          >
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Box style={{ width: '50%', display: 'flex' }}>
                <Box className={classes.minWidthColumnName}>
                  <Typography>Final Disc(% Max Slab)</Typography>
                </Box>
                <Box style={{ width: 'calc(100% - 125px)', display: 'flex', gap: '5px' }}>
                  <div style={{ display: 'flex', width: '150px', gap: '5px' }}>
                    <Input
                      name="fromData"
                      placeholder="From"
                      value={fromDataGet('MAX SLAB BASE DISC')}
                      onChange={(e) => handleInputChange('MAX SLAB BASE DISC', 'fromData', e.target.value)}
                      type="number"
                      minValue={-99.99}
                      maxValue={99.99}
                      onBlur={() => validationFromHandle(
                        SearchFilterData?.filter(
                          (itemShape) => itemShape?.Column_Name === 'MAX SLAB BASE DISC',
                        )[0],
                      )}
                    />
                    <Input
                      name="toData"
                      placeholder="To"
                      value={toDataGet('MAX SLAB BASE DISC')}
                      onChange={(e) => handleInputChange('MAX SLAB BASE DISC', 'toData', e.target.value)}
                      type="number"
                      minValue={-99.99}
                      maxValue={99.99}
                      errors={validationError['MAX SLAB BASE DISC']}
                      helperTexts={validationError['MAX SLAB BASE DISC']}
                      onBlur={() => validationHandle(
                        SearchFilterData?.filter(
                          (itemShape) => itemShape?.Column_Name === 'MAX SLAB BASE DISC',
                        )[0],
                      )}
                    />
                  </div>
                </Box>
              </Box>

              <Box style={{ width: '50%', display: 'flex' }}>
                <Box className={classes.minWidthColumnName}>
                  <Typography>Final Amt(% Max Amt)</Typography>
                </Box>
                <Box style={{ width: 'calc(100% - 125px)', display: 'flex', gap: '5px' }}>
                  <div style={{ display: 'flex', width: '150px', gap: '5px' }}>
                    <Input
                      name="fromData"
                      placeholder="From"
                      value={fromDataGet('MAX SLAB BASE AMOUNT')}
                      onChange={(e) => handleInputChange('MAX SLAB BASE AMOUNT', 'fromData', e.target.value)}
                      type="number"
                      minValue={1}
                      maxValue={9999999.99}
                      onBlur={() => validationFromHandle(
                        SearchFilterData?.filter(
                          (itemShape) => itemShape?.Column_Name === 'MAX SLAB BASE AMOUNT',
                        )[0],
                      )}
                    />
                    <Input
                      name="toData"
                      placeholder="To"
                      value={toDataGet('MAX SLAB BASE AMOUNT')}
                      onChange={(e) => handleInputChange('MAX SLAB BASE AMOUNT', 'toData', e.target.value)}
                      type="number"
                      minValue={1}
                      maxValue={9999999.99}
                      errors={validationError['MAX SLAB BASE AMOUNT']}
                      helperTexts={validationError['MAX SLAB BASE AMOUNT']}
                      onBlur={() => validationHandle(
                        SearchFilterData?.filter(
                          (itemShape) => itemShape?.Column_Name === 'MAX SLAB BASE AMOUNT',
                        )[0],
                      )}
                    />
                  </div>
                </Box>
              </Box>
            </Box>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Box style={{ width: '50%', display: 'flex' }}>
                <Box className={classes.minWidthColumnName}>
                  <Typography>Final Price/Cts(Max Slab)</Typography>
                </Box>
                <Box style={{ width: 'calc(100% - 125px)', display: 'flex', gap: '5px' }}>
                  <div style={{ display: 'flex', width: '150px', gap: '5px' }}>
                    <Input
                      name="fromData"
                      placeholder="From"
                      value={fromDataGet('MAX SLAB PRICE PER CTS')}
                      onChange={(e) => handleInputChange(
                        'MAX SLAB PRICE PER CTS',
                        'fromData',
                        e.target.value,
                      )}
                      type="number"
                      minValue={1}
                      maxValue={999999.99}
                      onBlur={() => validationFromHandle(
                        SearchFilterData?.filter(
                          (itemShape) => itemShape?.Column_Name === 'MAX SLAB PRICE PER CTS',
                        )[0],
                      )}
                    />
                    <Input
                      name="toData"
                      placeholder="To"
                      value={toDataGet('MAX SLAB PRICE PER CTS')}
                      onChange={(e) => handleInputChange('MAX SLAB PRICE PER CTS', 'toData', e.target.value)}
                      type="number"
                      minValue={0}
                      maxValue={99.99}
                      errors={validationError['MAX SLAB PRICE PER CTS']}
                      helperTexts={validationError['MAX SLAB PRICE PER CTS']}
                      onBlur={() => validationHandle(
                        SearchFilterData?.filter(
                          (itemShape) => itemShape?.Column_Name === 'MAX SLAB PRICE PER CTS',
                        )[0],
                      )}
                    />
                  </div>
                </Box>
              </Box>

              <Box style={{ width: '50%', display: 'flex' }}>
                <Box className={classes.minWidthColumnName}>
                  <Typography>Media</Typography>
                </Box>
                <Box style={{ width: 'calc(100% - 125px)', display: 'flex', gap: '5px' }}>
                  <div style={{ display: 'flex', width: '150px', gap: '5px' }}>
                    <button
                      type="button"
                      className={classes.remainingButtonFocusClass}
                      style={{
                        color: percentageData?.Image ? '#fff' : 'rgb(141, 132, 132)',
                        border: percentageData?.Image ? '1px solid #023067' : '1px solid rgb(207, 207, 207)',
                        background: percentageData?.Image ? '#023067' : '',
                      }}
                      onClick={() => handleMediaChange('Image')}
                    >
                      <i className="fa fa-picture-o" aria-hidden="true" style={{ marginRight: '5px' }} />
                      Image
                    </button>
                    <button
                      type="button"
                      className={classes.remainingButtonFocusClass}
                      style={{
                        color: percentageData?.Video ? '#fff' : 'rgb(141, 132, 132)',
                        background: percentageData?.Video ? '#023067' : '',
                        border: percentageData?.Video ? '1px solid #023067' : '1px solid rgb(207, 207, 207)',
                      }}
                      onClick={() => handleMediaChange('Video')}
                    >
                      <i className="fa fa-video-camera" aria-hidden="true" style={{ marginRight: '5px' }} />
                      Video
                    </button>
                  </div>
                </Box>
              </Box>
            </Box>
          </Box>
        </div>

        <div
          style={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            padding: '7px 7px 7px 0px',
            background: '#fff',
            border: '1px solid rgb(207, 207, 207)',
            display: 'flex',
            justifyContent: 'center',
            boxShadow: '0 8px 6px 6px #a7a7a7',
            left: 0,
          }}
        >
          <Box sx={{
            width: '98%',
            gap: '8px',
            display: 'flex',
            justifyContent: 'end',
          }}
          >
            <Typography>
              {totalDataCount}
            </Typography>
            <Button
              sx={{
                color: '#fff!important',
                borderRadius: '10px',
                border: '1px solid #023067',
                padding: '4px 10px',
                background: '#023067',
                textTransform: 'capitalize',
                cursor: (totalDataCount > 1000 || totalDataCount === 0) && 'not-allowed!important',
                pointerEvents: (totalDataCount > 1000 || totalDataCount === 0) && 'auto!important',
                '&:hover': {
                  background: '#023067',
                },
                boxShadow: '0px 0px 5px 3px #cacaca',
              }}
              className={classes.fontNameStyle}
              disabled={(totalDataCount > 1000 || totalDataCount === 0)}
              onClick={() => handleSearchCall()}
            >
              <i className="fa fa-search" aria-hidden="true" style={{ marginRight: '5px' }} />
              Search
            </Button>
            <Button
              sx={{
                color: '#fff!important',
                borderRadius: '10px',
                border: '1px solid #023067',
                padding: '4px 10px',
                background: '#023067',
                textTransform: 'capitalize',
                '&:hover': {
                  background: '#023067', // Set the background color on hover to match the default background color
                },
                boxShadow: '0px 0px 5px 3px #cacaca',
              }}
              className={classes.fontNameStyle}
              onClick={() => handleDownload()}
            >
              <i className="fa fa-download" aria-hidden="true" style={{ marginRight: '5px' }} />
              Download
            </Button>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Button
                sx={{
                  color: '#fff!important',
                  borderRadius: '10px',
                  border: '1px solid #023067',
                  padding: '4px 10px',
                  background: '#023067',
                  textTransform: 'capitalize',
                  '&:hover': {
                    background: '#023067',
                  },
                  boxShadow: '0px 0px 5px 3px #cacaca',
                }}
                className={classes.fontNameStyle}
                onClick={() => clickAddToFilter()}
              >
                <i className="fa fa-filter" aria-hidden="true" style={{ marginRight: '5px' }} />
                Add To Filter
              </Button>
              {filterActive?.length !== 0 && (
              <Button
                sx={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  minWidth: 'auto',
                  minHeight: 'auto',
                  borderRadius: '50%',
                  padding: '1px 8px',
                  background: 'red',
                  '&:hover': {
                    background: 'red',
                  },
                  color: '#fff',
                  fontSize: '12px',
                }}
                onClick={() => addFilterBadge()}
              >
                {filterActive?.length}
              </Button>
              )}

            </div>

            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Button
                sx={{
                  color: '#fff!important',
                  borderRadius: '10px',
                  border: '1px solid #023067',
                  padding: '4px 10px',
                  background: '#023067',
                  textTransform: 'capitalize',
                  cursor: (totalDataCount > 1000 || totalDataCount === 0) && 'not-allowed!important',
                  pointerEvents: (totalDataCount > 1000 || totalDataCount === 0) && 'auto!important',
                  '&:hover': {
                    background: '#023067',
                  },
                  boxShadow: '0px 0px 5px 3px #cacaca',
                }}
                className={classes.fontNameStyle}
                onClick={() => setSaveSearchPopup(true)}
                disabled={(totalDataCount > 1000 || totalDataCount === 0)}
              >
                <i className="fa fa-floppy-o" aria-hidden="true" style={{ marginRight: '5px' }} />
                Save & Search
              </Button>
            </div>
            <Button
              sx={{
                color: '#fff!important',
                borderRadius: '10px',
                border: '1px solid #023067',
                padding: '4px 10px',
                background: '#023067',
                textTransform: 'capitalize',
                '&:hover': {
                  background: '#023067',
                },
                boxShadow: '0px 0px 5px 3px #cacaca',
              }}
              className={classes.fontNameStyle}
              onClick={resetBtn}
            >
              <i className="fa fa-refresh" aria-hidden="true" style={{ marginRight: '5px' }} />
              Refresh
            </Button>
          </Box>
        </div>
      </div>
      {addFilterPopup
      && (
      <AddFilterPopupList
        filterActive={filterActive}
        setFilterActive={setFilterActive}
        handleClose={() => addFilterBadge()}
      />
      )}
    </>
  );
};

export default Search;
