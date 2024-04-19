/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-case-declarations */
import React, { useEffect, useRef, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
import { ApiGet, ApiPost } from '../../utils/api';
import { EndPoint } from '../../utils/EndPoint';
import Search from './Search';
import { transformData } from '../../DataManage/DataManage';
import Result from '../Result/Result';
import Result2 from '../Result/Result2';
import Result3 from '../Result/Result3';
import Result4 from '../Result/Result4';
import Result5 from '../Result/Result5';
import InputMaster from '../../common/FormControls/input/InputMaster';
import BlurBackground from '../../common/Loader/BlurBackground';

const staffData = {
  Image: false,
  Video: false,
};

const SearchContainer = () => {
  const { addToast } = useToasts();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const [SearchFilterData, setSearchFilterData] = useState([]);
  const [fancyColordata, setFancyColordata] = useState([]);
  const [fancyIntensitydata, setFancyIntensitydata] = useState([]);
  const [fancyOvertonedata, setFancyOvertonedata] = useState([]);
  const [percentageData, setPercentageData] = useState(staffData);

  const [validationError, setValidationError] = useState({});

  const [fancyColorValue, setFancyColorValue] = useState(null);
  const [fancyIntensityValue, setFancyIntensityValue] = useState(null);
  const [fancyOvertoneValue, setFancyOvertoneValue] = useState(null);

  const [totalDataCount, setTotalDataCount] = useState(0);

  const [caratData, setCaratData] = useState('Specific');
  const [colorData, setColorData] = useState('Regular');

  const [filterActive, setFilterActive] = useState([]);

  const resultPageIndexRef = useRef(0);

  const [searchCount, setSearchCount] = useState(0);
  const [activeResultPage, setActiveResultPage] = useState('search');

  const [result1Data, setResult1Data] = useState([]);
  const [result2Data, setResult2Data] = useState([]);
  const [result3Data, setResult3Data] = useState([]);
  const [result4Data, setResult4Data] = useState([]);
  const [result5Data, setResult5Data] = useState([]);

  const [activeResult, setActiveResult] = useState(0);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedDataEdit, setSelectedDataEdit] = useState([]);
  const [saveSearchPopup, setSaveSearchPopup] = useState(false);
  const [saveSearchPopupData, setSaveSearchPopupData] = useState();
  const [popupError, setPopupError] = useState({});

  const [loader, setLoader] = useState(false);

  const [recentEdit, setRecentEdit] = useState(location?.state?.data?.Stock_Multiple_Filter_Parameter || []);

  const [saveCountSearch, setSaveCountSearch] = useState(null);

  const getSearchLabData = async () => {
    await ApiGet(EndPoint.SEARCH_FILTER_PARAMETER)
      .then((res) => {
        if (res.status === 200) {
          const result = transformData(res?.data?.data);
          setSearchFilterData(result);

          if (location?.state?.data !== undefined) {
            setSelectedData(location?.state?.data?.Stock_Multiple_Filter_Parameter);
            setSelectedDataEdit(location?.state?.data?.Stock_Multiple_Filter_Parameter);
          }
          const fancyColordataApi = res?.data?.data?.filter(
            (x) => x?.Column_Name === 'FANCY COLOR',
          );
          const fancyIntensitydataApi = res?.data?.data?.filter(
            (x) => x?.Column_Name === 'FANCY INTENSITY',
          );
          const fancyOverTonedata = res?.data?.data?.filter(
            (x) => x?.Column_Name === 'FANCY OVERTONE',
          );

          const modifiedDatafancyColor = fancyColordataApi.map((item) => ({
            ...item,
            value: item.Category_Value,
            label: item.Category_Value,
          }));

          setFancyColordata(
            (
              fancyColordataApi.length !== 0 && fancyColordataApi[0]?.Category_Value !== null
            ) ? modifiedDatafancyColor : [],
          );

          const modifiedDataFancyIntensity = fancyIntensitydataApi.map((item) => ({
            ...item,
            value: item.Category_Value,
            label: item.Category_Value,
          }));

          setFancyIntensitydata(
            (
              fancyIntensitydataApi.length !== 0
              && fancyIntensitydataApi[0]?.Category_Value !== null
            ) ? modifiedDataFancyIntensity : [],
          );

          const modifiedDataFancyOverTone = fancyOverTonedata.map((item) => ({
            ...item,
            value: item.Category_Value,
            label: item.Category_Value,
          }));

          setFancyOvertonedata(
            (
              fancyOverTonedata.length !== 0 && fancyOverTonedata[0]?.Category_Value !== null
            ) ? modifiedDataFancyOverTone : [],
          );
        } else if (res?.status === 204) {
          setSearchFilterData([]);
        } else {
          addToast(res?.data?.message, { appearance: 'success' });
        }
      })
      .catch((error) => {
        addToast(error?.error, { appearance: 'error' });
      });
  };

  useEffect(() => {
    getSearchLabData();
  }, []);

  const handleActiveTabChange = (data) => {
    setActiveResultPage(data);
  };

  function flattenData(data) {
    return data?.reduce((result, currentString) => {
      const values = currentString?.split(', ');
      result.push(...values.map((value) => `${value}`));
      return result;
    }, []);
  }

  useEffect(() => {
    if (selectedData?.length === 1) {
      const updatedDataArray = SearchFilterData?.map((entry) => {
        const matchingData = selectedData[0]?.find(
          (category) => category.Column_Name === entry.Column_Name,
        );

        if (matchingData
            && matchingData?.Column_Name !== 'FANCY COLOR'
            && matchingData?.Column_Name !== 'FANCY INTENSITY'
            && matchingData?.Column_Name !== 'FANCY INTENSITY'
            && matchingData?.Column_Name !== 'FANCY OVERTONE'
            && matchingData?.Column_Name !== 'IMAGE LINK'
            && matchingData?.Column_Name !== 'VIDEO LINK'
        ) {
          const categoryValues = matchingData?.Category_Name?.split(', ');
          const categoryValuesFromTo = matchingData?.Category_Value?.split(', ');

          if (entry?.Display_Type === 'SR') {
            entry.multiData = flattenData(categoryValuesFromTo);
          } if (entry?.Display_Type === 'R') {
            const data = categoryValuesFromTo[0]?.split('-');

            if (categoryValuesFromTo.length === 2) {
              entry.fromData = data[0];
              entry.toData = data[1];
              entry.blank_Value = 'BLANK';
            } else if (categoryValuesFromTo.length === 1) {
              entry.fromData = data[0];
              entry.toData = data[1];
              entry.blank_Value = '';
            }
          } if (entry?.Display_Type === 'S') {
            if (entry?.Column_Name === 'KEY TO SYMBOL') {
              const includedId = matchingData?.KEY_TO_SYMBOL_TRUE?.split(', ');
              const excludedIds = matchingData?.KEY_TO_SYMBOL_FALSE?.split(', ');
              entry?.data?.forEach((item) => {
                if (includedId?.includes(item?.Key_To_Symbol)) {
                  item.Symbol_Status = true;
                }
                if (excludedIds?.includes(item?.Key_To_Symbol)) {
                  item.Symbol_Status = false;
                }
              });
            } else {
              const includedId = matchingData?.LAB_COMMENTS_TRUE?.split(', ');
              const excludedIds = matchingData?.LAB_COMMENTS_FALSE?.split(', ');
              entry?.data?.forEach((item) => {
                if (includedId?.includes(item.Key_To_Symbol)) {
                  item.Symbol_Status = true;
                }
                if (excludedIds?.includes(item.Key_To_Symbol)) {
                  item.Symbol_Status = false;
                }
              });
            }
          } else {
            entry.data = entry?.data?.map((dataItem) => ({
              ...dataItem,
              activeStatus: categoryValues?.includes(dataItem.Category_Value),
            }));
          }
        }
        return entry;
      });

      setSearchFilterData(updatedDataArray);

      const fancyColorModifyData = selectedData[0]?.find((item) => item?.Column_Name === 'FANCY COLOR');
      const fancyIntensityModifyData = selectedData[0]?.find((item) => item?.Column_Name === 'FANCY INTENSITY');
      const fancyOvertoneModifyData = selectedData[0]?.find((item) => item?.Column_Name === 'FANCY OVERTONE');
      const imageLinkModifyData = selectedData[0]?.find((item) => item?.Column_Name === 'IMAGE LINK');
      const videoLinkModifyData = selectedData[0]?.find((item) => item?.Column_Name === 'VIDEO LINK');

      const pointerModifyData = selectedData[0]?.find((item) => item?.Column_Name === 'POINTER');

      if (pointerModifyData) {
        setCaratData('General');
      }

      if (fancyColorModifyData) {
        setColorData('Fancy');
        setFancyColorValue({
          label: fancyColorModifyData?.Category_Name,
          value: fancyColorModifyData?.Category_Name,
          Category_Value: fancyColorModifyData?.Category_Name,
          Cat_val_Id: fancyColorModifyData?.Category_Value,
          Col_Id: fancyColorModifyData?.Col_Id,
          Column_Name: fancyColorModifyData?.Column_Name,
        });
      }

      if (fancyIntensityModifyData) {
        setColorData('Fancy');
        setFancyIntensityValue({
          label: fancyIntensityModifyData?.Category_Name,
          value: fancyIntensityModifyData?.Category_Name,
          Category_Value: fancyIntensityModifyData?.Category_Name,
          Cat_val_Id: fancyIntensityModifyData?.Category_Value,
          Col_Id: fancyIntensityModifyData?.Col_Id,
          Column_Name: fancyIntensityModifyData?.Column_Name,
        });
      }

      if (fancyOvertoneModifyData) {
        setColorData('Fancy');
        setFancyOvertoneValue({
          label: fancyOvertoneModifyData?.Category_Name,
          value: fancyOvertoneModifyData?.Category_Name,
          Category_Value: fancyOvertoneModifyData?.Category_Name,
          Cat_val_Id: fancyOvertoneModifyData?.Category_Value,
          Col_Id: fancyOvertoneModifyData?.Col_Id,
          Column_Name: fancyOvertoneModifyData?.Column_Name,
        });
      }

      if (imageLinkModifyData) {
        setPercentageData(
          (prevData) => ({ ...prevData, Image: imageLinkModifyData?.Category_Value }),
        );
      }
      if (videoLinkModifyData) {
        setPercentageData(
          (prevData) => ({ ...prevData, Video: videoLinkModifyData?.Category_Value }),
        );
      }
    } else if (selectedData?.length !== 0 && selectedData?.length !== 1) {
      setFilterActive(selectedData);
      const newData = SearchFilterData?.map((itemShape) => ({
        ...itemShape,
        fromData: '',
        toData: '',
        multiData: [],
        data: itemShape.data.map((searchItem) => ({
          ...searchItem,
          Symbol_Status: null,
          activeStatus: false,
        })),
        blank_Value: (itemShape?.Column_Name === 'GIRDLE PER'
        || itemShape?.Column_Name === 'CROWN ANGLE'
        || itemShape?.Column_Name === 'CROWN HEIGHT'
        || itemShape?.Column_Name === 'PAVILION ANGLE'
        || itemShape?.Column_Name === 'PAVILION HEIGHT') ? 'BLANK' : '',
      }));
      setSearchFilterData(newData);
      setFancyColorValue(null);
      setFancyIntensityValue(null);
      setFancyOvertoneValue(null);
      setPercentageData(staffData);
      setValidationError({});
    }
  }, [activeResult, selectedDataEdit]);

  function transformDatass(inputData) {
    return inputData?.map((item) => {
      const transformedData = {
        Column_Name: item.Column_Name,
        Col_Id: item?.Col_Id,
        multiData: item?.multiData.length > 0 ? item?.multiData : [],
      };

      switch (item?.Display_Type) {
        case 'M':
          transformedData.Category_Value = item.data.filter((val) => val.activeStatus).map((val) => val.Cat_val_Id).join(', ');
          transformedData.Category_Name = item.data.filter((val) => val.activeStatus).map((val) => val.Category_Value).join(', ');
          break;

        case 'SR':
          transformedData.Category_Value = item.multiData.length ? item.multiData.join(', ') : (item.fromData && item.toData ? `${item.fromData}-${item.toData}` : '');
          transformedData.Category_Name = '';
          break;

        case 'R':
          transformedData.Category_Value = (item?.blank_Value === 'BLANK' && item.fromData && item.toData)
            ? `${item.fromData}-${item.toData}, BLANK`
            : ((((item?.blank_Value === '' || item?.blank_Value === undefined) && item.fromData && item.toData)
              ? `${item.fromData}-${item.toData}` : ''));

          break;

        case 'S':
          const includedData = item.data.filter((val) => val.Symbol_Status === true).map((val) => val.Key_To_Symbol).join(', ');
          const excludedData = item.data.filter((val) => val.Symbol_Status === false).map((val) => val.Key_To_Symbol).join(', ');
          if (item?.Column_Name === 'KEY TO SYMBOL') {
            transformedData.KEY_TO_SYMBOL_TRUE = includedData || '';
            transformedData.KEY_TO_SYMBOL_FALSE = excludedData || '';
          } else {
            transformedData.LAB_COMMENTS_TRUE = includedData || '';
            transformedData.LAB_COMMENTS_FALSE = excludedData || '';
          }
          break;

        default:
          transformedData.Category_Value = '';
          transformedData.Category_Name = '';
          break;
      }

      return transformedData;
    });
  }

  const resetBtn = () => {
    const newData = SearchFilterData?.map((itemShape) => ({
      ...itemShape,
      fromData: '',
      toData: '',
      multiData: [],
      data: itemShape.data.map((searchItem) => ({
        ...searchItem,
        Symbol_Status: null,
        activeStatus: false,
      })),
      blank_Value: (itemShape?.Column_Name === 'GIRDLE PER'
      || itemShape?.Column_Name === 'CROWN ANGLE'
      || itemShape?.Column_Name === 'CROWN HEIGHT'
      || itemShape?.Column_Name === 'PAVILION ANGLE'
      || itemShape?.Column_Name === 'PAVILION HEIGHT') ? 'BLANK' : '',
    }));
    setSearchFilterData(newData);
    setFancyColorValue(null);
    setFancyIntensityValue(null);
    setFancyOvertoneValue(null);
    setPercentageData(staffData);
    setValidationError({});
    setFilterActive([]);
  };

  const handleSearchCall = () => {
    const allValuesEmpty = Object.values(validationError).every((value) => value === '');

    if (allValuesEmpty) {
      const transformedOutput = transformDatass(SearchFilterData);

      const filteredArray = transformedOutput.filter((item) => item?.Category_Value?.trim() !== '');
      const filteredArrayRemoveLabComments = filteredArray.filter((item) => item?.LAB_COMMENTS_FALSE !== '' || item?.LAB_COMMENTS_TRUE !== '');
      const filteredArrayRemoveKeyToSymbol = filteredArrayRemoveLabComments.filter((item) => item?.KEY_TO_SYMBOL_TRUE !== '' || item?.KEY_TO_SYMBOL_FALSE !== '');

      const transformDatas = (value, columnName, colId, NameData) => (value ? {
        Column_Name: columnName,
        Col_Id: colId,
        Category_Name: NameData,
        Category_Value: (columnName === 'IMAGE LINK' || columnName === 'VIDEO LINK') ? value.toString() : value,
      } : null);

      const transformedFancyColorData = transformDatas(
        fancyColorValue?.Cat_val_Id,
        fancyColorValue?.Column_Name,
        fancyColorValue?.Col_Id,
        fancyColorValue?.Category_Value,
      );
      const transformedFancyIntensityData = transformDatas(
        fancyIntensityValue?.Cat_val_Id,
        fancyIntensityValue?.Column_Name,
        fancyIntensityValue?.Col_Id,
        fancyIntensityValue?.Category_Value,
      );
      const transformedFancyOvertoneData = transformDatas(
        fancyOvertoneValue?.Cat_val_Id,
        fancyOvertoneValue?.Column_Name,
        fancyOvertoneValue?.Col_Id,
        fancyOvertoneValue?.Category_Value,
      );
      const transformedImageData = transformDatas(percentageData?.Image, 'IMAGE LINK', 90, '');
      const transformedVideoData = transformDatas(percentageData?.Video, 'VIDEO LINK', 91, '');

      const newData111 = [
        ...filteredArrayRemoveKeyToSymbol.flat(),
        transformedFancyColorData,
        transformedFancyIntensityData,
        transformedFancyOvertoneData,
        transformedImageData,
        transformedVideoData,
      ];

      const data222 = newData111?.filter((item) => item?.Column_Name !== (caratData !== 'Specific' ? 'CTS' : 'POINTER'));
      const data333 = data222?.filter((item) => item?.Column_Name !== (colorData !== 'Regular' ? 'COLOR' : 'FANCY COLOR'));
      const data444 = data333?.filter((item) => item?.Column_Name !== (colorData !== 'Regular' ? 'COLOR' : 'FANCY INTENSITY'));
      const data111 = data444?.filter((item) => item?.Column_Name !== (colorData !== 'Regular' ? 'COLOR' : 'FANCY OVERTONE'));

      const newDataWithoutNull = [data111.filter((item) => item !== null)];

      const filteredNewDataWithoutNull = newDataWithoutNull.filter((item) => item.length > 0);

      const updatedFilterActive = [
        ...filterActive,
        ...filteredNewDataWithoutNull,
      ];
      const body = {
        id: 0,
        search_Value: {
          stock_Multiple_Filter_Parameter: updatedFilterActive,
        },
      };
      ApiPost(`${EndPoint?.POST_SEARCH_REPORT_RECENT_SEARCH}`, body)
        .then((res) => {
          console.log('respost', res);
        });

      setResult1Data(activeResult === 1
        ? updatedFilterActive
        : (result1Data.length !== 0 ? result1Data : updatedFilterActive));
      setResult2Data(activeResult === 2
        ? updatedFilterActive : (result2Data.length !== 0
          ? result2Data
          : (result1Data?.length !== 0 ? updatedFilterActive : [])));
      setResult3Data(activeResult === 3
        ? updatedFilterActive
        : (result3Data.length !== 0
          ? result3Data
          : (result2Data?.length !== 0 ? updatedFilterActive : [])));
      setResult4Data(activeResult === 4
        ? updatedFilterActive
        : (result4Data.length !== 0
          ? result4Data
          : (result3Data?.length !== 0 ? updatedFilterActive : [])));
      setResult5Data(activeResult === 5
        ? updatedFilterActive
        : (result5Data.length !== 0
          ? result5Data
          : (result4Data?.length !== 0 ? updatedFilterActive : [])));

      resultPageIndexRef.current = resultPageIndexRef.current < 5
        ? resultPageIndexRef.current + 1
        : resultPageIndexRef.current;

      if (activeResult !== 0) {
        const activePage = `result-${activeResult}`;
        setActiveResultPage(activePage);
      } else {
        const activePage = `result-${resultPageIndexRef.current}`;
        setActiveResultPage(activePage);
        setSearchCount((prevCount) => prevCount + 1);
      }

      setActiveResult(0);
      resetBtn();
      // apiCallForNumber([]);
      setSaveCountSearch(totalDataCount);
    }
  };

  const handleSaveAndSearchCall = () => {
    if (!saveSearchPopupData) {
      setPopupError({ saveSearchPopupData: 'Required' });
      return;
    }
    const allValuesEmpty = Object.values(validationError).every((value) => value === '');

    if (allValuesEmpty) {
      const transformedOutput = transformDatass(SearchFilterData);

      const filteredArray = transformedOutput.filter((item) => item?.Category_Value?.trim() !== '');
      const filteredArrayRemoveLabComments = filteredArray.filter((item) => item?.LAB_COMMENTS_FALSE !== '' || item?.LAB_COMMENTS_TRUE !== '');
      const filteredArrayRemoveKeyToSymbol = filteredArrayRemoveLabComments.filter((item) => item?.KEY_TO_SYMBOL_TRUE !== '' || item?.KEY_TO_SYMBOL_FALSE !== '');

      const transformDatas = (value, columnName, colId, NameData) => (value ? {
        Column_Name: columnName,
        Col_Id: colId,
        Category_Name: NameData,
        Category_Value: (columnName === 'IMAGE LINK' || columnName === 'VIDEO LINK') ? value.toString() : value,
      } : null);

      const transformedFancyColorData = transformDatas(
        fancyColorValue?.Cat_val_Id,
        fancyColorValue?.Column_Name,
        fancyColorValue?.Col_Id,
        fancyColorValue?.Category_Value,
      );
      const transformedFancyIntensityData = transformDatas(
        fancyIntensityValue?.Cat_val_Id,
        fancyIntensityValue?.Column_Name,
        fancyIntensityValue?.Col_Id,
        fancyIntensityValue?.Category_Value,
      );
      const transformedFancyOvertoneData = transformDatas(
        fancyOvertoneValue?.Cat_val_Id,
        fancyOvertoneValue?.Column_Name,
        fancyOvertoneValue?.Col_Id,
        fancyOvertoneValue?.Category_Value,
      );
      const transformedImageData = transformDatas(percentageData?.Image, 'IMAGE LINK', 90, '');
      const transformedVideoData = transformDatas(percentageData?.Video, 'VIDEO LINK', 91, '');

      const newData111 = [
        ...filteredArrayRemoveKeyToSymbol.flat(),
        transformedFancyColorData,
        transformedFancyIntensityData,
        transformedFancyOvertoneData,
        transformedImageData,
        transformedVideoData,
      ];

      const data222 = newData111?.filter((item) => item?.Column_Name !== (caratData !== 'Specific' ? 'CTS' : 'POINTER'));
      const data333 = data222?.filter((item) => item?.Column_Name !== (colorData !== 'Regular' ? 'COLOR' : 'FANCY COLOR'));
      const data444 = data333?.filter((item) => item?.Column_Name !== (colorData !== 'Regular' ? 'COLOR' : 'FANCY INTENSITY'));
      const data111 = data444?.filter((item) => item?.Column_Name !== (colorData !== 'Regular' ? 'COLOR' : 'FANCY OVERTONE'));

      const newDataWithoutNull = [data111.filter((item) => item !== null)];

      const filteredNewDataWithoutNull = newDataWithoutNull.filter((item) => item.length > 0);

      const updatedFilterActive = [
        ...filterActive,
        ...filteredNewDataWithoutNull,
      ];

      const body = {
        id: id?.toString() || 0,
        name: saveSearchPopupData,
        search_Value: {
          stock_Multiple_Filter_Parameter: updatedFilterActive,
        },
      };
      ApiPost(`${EndPoint?.POST_REPORT_STOCK_SAVE_SEARCH}`, body)
        .then((res) => {
          setSaveSearchPopup(false);
          setSaveSearchPopupData('');
          addToast(
            res?.data?.message,
            { appearance: 'success' },
          );
        });

      setActiveResult(0);
      resetBtn();
      // apiCallForNumber([]);
      setSaveCountSearch(totalDataCount);
    }
  };

  const clickAddToFilter = () => {
    const transformedOutput = transformDatass(SearchFilterData);
    const filteredArray = transformedOutput.filter((item) => item?.Category_Value?.trim() !== '');
    const filteredArrayRemoveLabComments = filteredArray.filter((item) => item?.LAB_COMMENTS_FALSE !== '' || item?.LAB_COMMENTS_TRUE !== '');
    const filteredArrayRemoveKeyToSymbol = filteredArrayRemoveLabComments.filter((item) => item?.KEY_TO_SYMBOL_TRUE !== '' || item?.KEY_TO_SYMBOL_FALSE !== '');

    const transformDatas = (value, columnName, colId, NameData) => (value ? {
      Column_Name: columnName,
      Col_Id: colId,
      Category_Name: NameData,
      Category_Value: (columnName === 'IMAGE LINK' || columnName === 'VIDEO LINK') ? value.toString() : value,
    } : null);

    const transformedFancyColorData = transformDatas(
      fancyColorValue?.Cat_val_Id,
      fancyColorValue?.Column_Name,
      fancyColorValue?.Col_Id,
      fancyColorValue?.Category_Value,
    );
    const transformedFancyIntensityData = transformDatas(
      fancyIntensityValue?.Cat_val_Id,
      fancyIntensityValue?.Column_Name,
      fancyIntensityValue?.Col_Id,
      fancyIntensityValue?.Category_Value,
    );
    const transformedFancyOvertoneData = transformDatas(
      fancyOvertoneValue?.Cat_val_Id,
      fancyOvertoneValue?.Column_Name,
      fancyOvertoneValue?.Col_Id,
      fancyOvertoneValue?.Category_Value,
    );
    const transformedImageData = transformDatas(percentageData?.Image, 'IMAGE LINK', 90, '');
    const transformedVideoData = transformDatas(percentageData?.Video, 'VIDEO LINK', 91, '');

    const newData111 = [
      ...filteredArrayRemoveKeyToSymbol.flat(),
      transformedFancyColorData,
      transformedFancyIntensityData,
      transformedFancyOvertoneData,
      transformedImageData,
      transformedVideoData,
    ];

    const data222 = newData111?.filter((item) => item?.Column_Name !== (caratData !== 'Specific' ? 'CTS' : 'POINTER'));
    const data333 = data222?.filter((item) => item?.Column_Name !== (colorData !== 'Regular' ? 'COLOR' : 'FANCY COLOR'));
    const data444 = data333?.filter((item) => item?.Column_Name !== (colorData !== 'Regular' ? 'COLOR' : 'FANCY INTENSITY'));
    const data111 = data444?.filter((item) => item?.Column_Name !== (colorData !== 'Regular' ? 'COLOR' : 'FANCY OVERTONE'));

    const newDataWithoutNull = [data111.filter((item) => item !== null)];

    if (newDataWithoutNull[0]?.length !== 0) {
      setFilterActive((prev) => [
        ...prev,
        ...newDataWithoutNull,
      ]);
      const newData = SearchFilterData.map((itemShape) => ({
        ...itemShape,
        fromData: '',
        toData: '',
        multiData: [],
        data: itemShape.data.map((searchItem) => ({
          ...searchItem,
          Symbol_Status: null,
          activeStatus: false,
        })),
        blank_Value: (itemShape?.Column_Name === 'GIRDLE PER'
        || itemShape?.Column_Name === 'CROWN ANGLE'
        || itemShape?.Column_Name === 'CROWN HEIGHT'
        || itemShape?.Column_Name === 'PAVILION ANGLE'
        || itemShape?.Column_Name === 'PAVILION HEIGHT') ? 'BLANK' : '',
      }));
      setFancyColorValue(null);
      setFancyIntensityValue(null);
      setFancyOvertoneValue(null);
      setSearchFilterData(newData);
      setPercentageData(staffData);
      setValidationError({});
    }
  };

  const generateResultTabs = () => {
    const tabs = [];
    tabs.push(
      <Button
        key="search"
        style={{ color: activeResultPage === 'search' && 'red' }}
        onClick={() => handleActiveTabChange('search')}
      >
        Search
      </Button>,
    );

    for (let i = 1; i <= Math.min(searchCount, 5); i++) {
      tabs.push(
        <Button
          key={`result-${i}`}
          style={{ color: activeResultPage === `result-${i}` && 'red' }}
          onClick={() => handleActiveTabChange(`result-${i}`)}
        >
          Result-
          {i}
        </Button>,
      );
    }
    return tabs;
  };

  // save & search
  const handleChanges = (e) => {
    setSaveSearchPopupData(e.target.value);
    setPopupError({ saveSearchPopupData: '' });
  };

  useEffect(() => {
    setTotalDataCount(saveCountSearch);
  }, []);

  const apiCallForNumber = async (filteredArrayRemoveKeyToSymbol) => {
    setLoader(true);

    const apiData = {
      Stock_Multiple_Filter_Parameter: filterActive?.length !== 0
        ? filteredArrayRemoveKeyToSymbol.concat(filterActive)
        : filteredArrayRemoveKeyToSymbol,
    };
    await ApiPost(EndPoint.GET_STOCK_COUNT, apiData)
      .then((res) => {
        if (res.status === 200) {
          setTotalDataCount(res?.data?.total_Records);
          setSaveCountSearch(null);
          setLoader(false);
        } else {
          setSaveCountSearch(null);
          setTotalDataCount(0);
          setLoader(false);
        }
      })
      .catch(() => {
        setLoader(false);
      });
  };

  const apiGetData = async (
    finalData,
    percentageDatas,
    fancyColorValues,
    fancyIntensityValues,
    fancyOvertoneValues,
  ) => {
    const transformedOutput = transformDatass(finalData);
    const filteredArray = transformedOutput?.filter((items) => items?.Category_Value?.trim() !== '');
    const filteredArrayRemoveLabComments = filteredArray?.filter((items) => items?.LAB_COMMENTS_FALSE !== '' || items?.LAB_COMMENTS_TRUE !== '');
    const filteredArrayRemoveKeyToSymbol = filteredArrayRemoveLabComments?.filter((items) => items?.KEY_TO_SYMBOL_TRUE !== '' || items?.KEY_TO_SYMBOL_FALSE !== '');

    const transformDatas = (value, columnName, colId, NameData) => (value ? {
      Column_Name: columnName,
      Col_Id: colId,
      Category_Name: NameData,
      Category_Value: (columnName === 'IMAGE LINK' || columnName === 'VIDEO LINK') ? value.toString() : value,
    } : null);

    const transformedImageData = transformDatas(percentageDatas?.Image, 'IMAGE LINK', 90, '');
    const transformedVideoData = transformDatas(percentageDatas?.Video, 'VIDEO LINK', 91, '');

    const transformedFancyColorData = transformDatas(
      fancyColorValues?.Cat_val_Id,
      fancyColorValues?.Column_Name,
      fancyColorValues?.Col_Id,
      fancyColorValues?.Category_Value,
    );
    const transformedFancyIntensityData = transformDatas(
      fancyIntensityValues?.Cat_val_Id,
      fancyIntensityValues?.Column_Name,
      fancyIntensityValues?.Col_Id,
      fancyIntensityValues?.Category_Value,
    );
    const transformedFancyOvertoneData = transformDatas(
      fancyOvertoneValues?.Cat_val_Id,
      fancyOvertoneValues?.Column_Name,
      fancyOvertoneValues?.Col_Id,
      fancyOvertoneValues?.Category_Value,
    );

    const newData111 = [
      ...filteredArrayRemoveKeyToSymbol.flat(),
      transformedFancyColorData,
      transformedFancyIntensityData,
      transformedFancyOvertoneData,
      transformedImageData,
      transformedVideoData,
    ];

    const newDataWithoutNull = [newData111.filter((item) => item !== null)];

    apiCallForNumber(newDataWithoutNull);
  };

  const handleDownload = async () => {
    try {
      const transformedOutput = transformDatass(SearchFilterData);
      const filteredArray = transformedOutput.filter((item) => item?.Category_Value?.trim() !== '');
      const filteredArrayRemoveLabComments = filteredArray.filter((item) => item?.LAB_COMMENTS_FALSE !== '' || item?.LAB_COMMENTS_TRUE !== '');
      const filteredArrayRemoveKeyToSymbol = filteredArrayRemoveLabComments.filter((item) => item?.KEY_TO_SYMBOL_TRUE !== '' || item?.KEY_TO_SYMBOL_FALSE !== '');

      const transformDatas = (value, columnName, colId, NameData) => (value ? {
        Column_Name: columnName,
        Col_Id: colId,
        Category_Name: NameData,
        Category_Value: (columnName === 'IMAGE LINK' || columnName === 'VIDEO LINK') ? value.toString() : value,
      } : null);

      const transformedFancyColorData = transformDatas(
        fancyColorValue?.Cat_val_Id,
        fancyColorValue?.Column_Name,
        fancyColorValue?.Col_Id,
        fancyColorValue?.Category_Value,
      );
      const transformedFancyIntensityData = transformDatas(
        fancyIntensityValue?.Cat_val_Id,
        fancyIntensityValue?.Column_Name,
        fancyIntensityValue?.Col_Id,
        fancyIntensityValue?.Category_Value,
      );
      const transformedFancyOvertoneData = transformDatas(
        fancyOvertoneValue?.Cat_val_Id,
        fancyOvertoneValue?.Column_Name,
        fancyOvertoneValue?.Col_Id,
        fancyOvertoneValue?.Category_Value,
      );
      const transformedImageData = transformDatas(percentageData?.Image, 'IMAGE LINK', 90, '');
      const transformedVideoData = transformDatas(percentageData?.Video, 'VIDEO LINK', 91, '');

      const newData111 = [
        ...filteredArrayRemoveKeyToSymbol.flat(),
        transformedFancyColorData,
        transformedFancyIntensityData,
        transformedFancyOvertoneData,
        transformedImageData,
        transformedVideoData,
      ];

      const data222 = newData111?.filter((item) => item?.Column_Name !== (caratData !== 'Specific' ? 'CTS' : 'POINTER'));
      const data333 = data222?.filter((item) => item?.Column_Name !== (colorData !== 'Regular' ? 'COLOR' : 'FANCY COLOR'));
      const data444 = data333?.filter((item) => item?.Column_Name !== (colorData !== 'Regular' ? 'COLOR' : 'FANCY INTENSITY'));
      const data111 = data444?.filter((item) => item?.Column_Name !== (colorData !== 'Regular' ? 'COLOR' : 'FANCY OVERTONE'));

      const newDataWithoutNull = [data111.filter((item) => item !== null)];

      const filteredNewDataWithoutNull = newDataWithoutNull.filter((item) => item.length > 0);

      const updatedFilterActive = [
        ...filterActive,
        ...filteredNewDataWithoutNull,
      ];

      const body = {
        Stock_Multiple_Filter_Parameter: updatedFilterActive,
      };

      const exportStockRes = await ApiPost(`${EndPoint.DOWNLOAD_STOCK}`, body);

      if (exportStockRes?.status === 200) {
        const fileUrl = exportStockRes?.data?.result;
        const response = await fetch(fileUrl);
        const blob = await response.blob();

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = exportStockRes.data.file_name;

        link.click();
      } else if (exportStockRes?.statusText === 204) {
        addToast(exportStockRes?.message, { appearance: 'info' });
      } else {
        addToast(exportStockRes?.data?.message, { appearance: 'error' });
      }
    } catch (error) {
      addToast(error.error, { appearance: 'error' });
    }
  };

  return (
    <>
      {loader && <BlurBackground />}
      {!location?.state?.recentSearch && !location?.state?.saveAndSearch && (
      <>
        <div style={{ display: 'flex', gap: '10px', height: '40px', marginTop: '60px' }}>
          {generateResultTabs()}
        </div>
        {activeResultPage === 'search' && (
        <Search
          SearchFilterData={SearchFilterData}
          setSearchFilterData={setSearchFilterData}
          fancyOvertonedata={fancyOvertonedata}
          fancyIntensitydata={fancyIntensitydata}
          fancyColordata={fancyColordata}
          setSaveSearchPopup={setSaveSearchPopup}
          handleSearchCall={handleSearchCall}
          validationError={validationError}
          setValidationError={setValidationError}
          percentageData={percentageData}
          setPercentageData={setPercentageData}
          fancyColorValue={fancyColorValue}
          setFancyColorValue={setFancyColorValue}
          fancyIntensityValue={fancyIntensityValue}
          setFancyIntensityValue={setFancyIntensityValue}
          fancyOvertoneValue={fancyOvertoneValue}
          setFancyOvertoneValue={setFancyOvertoneValue}
          caratData={caratData}
          setCaratData={setCaratData}
          colorData={colorData}
          setColorData={setColorData}
          filterActive={filterActive}
          setFilterActive={setFilterActive}
          clickAddToFilter={clickAddToFilter}
          resetBtn={resetBtn}
          totalDataCount={totalDataCount}
          apiGetData={apiGetData}
          handleDownload={handleDownload}
        />
        )}

        {activeResultPage === 'result-1'
        && (
        <Result
          location={location}
          data={result1Data}
          setActiveResultPage={setActiveResultPage}
          setActiveResult={setActiveResult}
          setSelectedData={setSelectedData}
        />
        )}
        {activeResultPage === 'result-2'
        && (
        <Result2
          data={result2Data}
          setActiveResultPage={setActiveResultPage}
          setActiveResult={setActiveResult}
          setSelectedData={setSelectedData}
        />
        )}
        {activeResultPage === 'result-3'
        && (
        <Result3
          data={result3Data}
          setActiveResultPage={setActiveResultPage}
          setActiveResult={setActiveResult}
          setSelectedData={setSelectedData}
        />
        )}
        {activeResultPage === 'result-4'
        && (
        <Result4
          data={result4Data}
          setActiveResultPage={setActiveResultPage}
          setActiveResult={setActiveResult}
          setSelectedData={setSelectedData}
        />
        )}
        {activeResultPage === 'result-5'
        && (
        <Result5
          data={result5Data}
          setActiveResultPage={setActiveResultPage}
          setActiveResult={setActiveResult}
          setSelectedData={setSelectedData}
        />
        )}

      </>
      )}

      {location?.state?.recentSearch && (
        <>
          <div style={{ display: 'flex', gap: '10px', height: '40px' }}>
            <Button
              style={{ color: 'red' }}
            >
              Result-1
            </Button>
          </div>
          <Result
            data={recentEdit}
          />
        </>
      )}
      {location?.state?.saveAndSearch && (
        <>
          <div style={{ display: 'flex', gap: '10px', height: '40px' }}>
            <Button
              style={{ color: 'red' }}
            >
              Result-1
            </Button>
          </div>
          <Result
            data={recentEdit}
          />
        </>
      )}

      {saveSearchPopup && (
      <Dialog
        open={saveSearchPopup}
        onClose={() => setSaveSearchPopup(false)}
        sx={{
          '& .MuiDialog-paper': {
            minWidth: '30%', maxHeight: 500, border: '2px solid #3c6070', borderRadius: '10px',
          },
        }}
      >
        <DialogTitle style={{ padding: '5px', color: '#3c6070', textAlign: 'center' }}>Save & Search</DialogTitle>
        <DialogContent>
          <Box>
            <InputMaster
              required
              label="Name"
              value={saveSearchPopupData}
              onChange={(e) => handleChanges(e)}
              helperTexts={popupError?.saveSearchPopupData}
              errors={!!popupError?.saveSearchPopupData}
            />

            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
            >
              {/* {saveFilterData?.map((item) => (
                <Box key={item?.Id} sx={{ display: 'flex', gap: '10px' }}>
                  <Typography fontWeight="900" fontSize="16px" sx={{ minWidth: '80px' }}>
                    {item?.Name}
                  </Typography>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  >
                    {item?.Search_Display?.map((items) => (
                      <Box sx={{ display: 'flex' }}>
                        <Typography>
                          {items?.Filter}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Button
                    onClick={() => handleApplySaveSearch(
                      item?.Search_Value?.Report_Filter_Parameter_List,
                    )}
                    sx={{
                      color: '#fff!important',
                      borderRadius: '10px',
                      border: '1px solid #1274ac',
                      padding: '4px 10px',
                      background: '#1274ac',
                      height: '31px',
                      textTransform: 'capitalize',
                      margin: 'auto 0 0 auto',
                      '&:hover': {
                        background: '#1274ac',
                      },
                      boxShadow: '0px 0px 5px 3px #cacaca',
                    }}
                  >
                    Apply
                  </Button>
                </Box>
              ))} */}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              marginRight: '10px',
              borderRadius: '4px',
              border: '1px solid #3c6070',
              padding: '3px 10px',
              color: '#3c6070!important',
            }}
            // className={classes.fontNameStyle}
            onClick={() => setSaveSearchPopup(false)}
          >
            Cancel
          </Button>
          <Button
            sx={{
              marginRight: '10px',
              borderRadius: '4px',
              border: '1px solid #3c6070',
              padding: '3px 10px',
              color: '#3c6070!important',
            }}
            // className={classes.fontNameStyle}
            onClick={handleSaveAndSearchCall}
          >
            Save & Search
          </Button>
        </DialogActions>
      </Dialog>
      )}
    </>
  );
};

export default SearchContainer;
