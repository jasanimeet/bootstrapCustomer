/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
import React, {
  useCallback,
  useEffect, useMemo, useRef, useState,
} from 'react';
import { useToasts } from 'react-toast-notifications';
import { AgGridReact } from 'ag-grid-react';
import {
  Box, FormControl, FormControlLabel, FormLabel, Checkbox, Grid, IconButton, Radio, RadioGroup, TextField, Button, Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { EndPoint } from '../../utils/EndPoint';
import {
  ApiDelete,
  ApiGet,
  ApiPost,
  ApiPut,
} from '../../utils/api';
import useStyle from './style';
import BlurBackground from '../../common/Loader/BlurBackground';
import CommonButton from '../../common/FormControls/Button/CustomButton';
import Input from '../../common/FormControls/input/InputMaster';
import placeOrder from '../../assets/img/place order-m.png';
import email from '../../assets/img/email-m.png';
import download from '../../assets/img/download-m.png';
import deleteblack from '../../assets/img/deleteblack.png';
import share from '../../assets/img/electricity-bill.png';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Typography from '../../common/Typography/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import { formatDate } from '../../utils/index';
import DeleteModel from '../../common/PopUp/DeleteModel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { emailPattern } from '../../utils/Regex';
import WhatsAppImg from '../../assets/img/ShareImages/whatsapp.png';
import SkypeImg from '../../assets/img/ShareImages/skype.png';
import { AllMessage } from '../../constant/AllMessage';

// import { SearchOutlined } from '@mui/icons-material';

const Cart = () => {
  const { addToast } = useToasts();
  const gridRef = useRef();
  const classes = useStyle();
  const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // eslint-disable-next-line no-unused-vars
  const empId = localStorage.getItem('user');

  const [dataTotalTable, setDataTotalTable] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loaderDownload, setLoaderDownload] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [refreshKey, setRefreshKey] = useState(0);

  const [selectedRows, setSelectedRows] = useState([]);

  const [rowData, setRowData] = useState([]);
  const [deleteModalOpen, setDeletModalOpen] = useState(false);

  const [selectedFromDate, setSelectedFromDate] = useState(() => {
    const today = new Date();
    const initialDate = new Date(today);
    initialDate.setDate(today.getDate() - 15);

    const formattedDate = initialDate.toISOString().split('T')[0];

    return formattedDate;
  });
  const [selectedToDate, setSelectedToDate] = useState(new Date());
  const [stockId, setStockId] = useState('');

  const [emailOpen, setEmailOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('All Selected Stones');
  const [sendMail, setSendMail] = useState();
  const [remark, setRemark] = useState();

  const [emailFormError, setEmailFormError] = useState({});

  const [clickOnOrderProcessbtn, setClickOnOrderProcessbtn] = useState(false);
  const [remarkOrderProcess, setRemarkOrderProcess] = useState();

  const emailInputRef = useRef(null);
  const emailSubmitRef = useRef(null);
  const [emailPopup, setEmailPopup] = useState(false);

  // share
  const [shareModal, setShareModal] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    image: false,
    video: false,
    certificate: false,
    customerExcel: false,
  });

  // error
  const [formError, setFormError] = useState({});
  const [columnData, setColumnData] = useState([]);

  const columnName = [
    {
      field: 'View',
      headerName: 'View',
      pinned: 'left',
      width: '90',
      cellRenderer: (params) => {
        const handleClick = (link) => {
          window.open(link, '_blank');
        };

        const imageLink = params?.data && params?.data['IMAGE LINK'] ? (
          <ImageIcon
            onClick={() => handleClick(params.data['IMAGE LINK'])}
            style={{ cursor: 'pointer', color: '#262d47', width: '18px' }}
          />
        ) : <ImageNotSupportedIcon style={{ color: '#262d47', width: '18px' }} />;

        const videoLink = params?.data && params?.data['VIDEO LINK'] ? (
          <VideoCameraBackIcon
            onClick={() => handleClick(params.data['VIDEO LINK'])}
            style={{ cursor: 'pointer', color: '#262d47', width: '18px' }}
          />
        ) : <VideocamOffIcon style={{ color: '#262d47', width: '18px' }} />;
        return (
          <div style={{ height: '100%' }}>
            {imageLink}
            {videoLink}
          </div>
        );
      },
    },
    { field: 'STOCK ID', width: '90' },
    {
      field: 'LAB',
      headerName: 'LAB',
      cellStyle: {
        textAlign: 'left',
      },
      width: '80',
      cellRenderer: (params) => {
        const labLink = params?.data?.LAB ? (
          params?.data['CERTIFICATE LINK']
            ? (
              <a
                href={params?.data['CERTIFICATE LINK']}
                target="_blank"
                rel="noreferrer"
              >
                <div>{params.data.LAB}</div>
              </a>
            )
            : <div>{params.data.LAB}</div>
        ) : null;

        return (
          <div>
            {labLink}
          </div>
        );
      },
    },
    { field: 'LOCATION', width: '90' },
    { field: 'SHAPE', width: '90' },
    { field: 'BGM', width: '90' },
    { field: 'COLOR', width: '90' },
    { field: 'CLARITY', width: '90' },
    { field: 'CTS', width: '70' },
    { field: 'RAP RATE', headerName: 'RAP', width: '90' },
    { field: 'RAP AMOUNT', headerName: 'RAP AMT', width: '90' },
    { field: 'OFFER DISC', headerName: 'FINAL DISC-%', width: '90' },
    { field: 'OFFER AMOUNT', headerName: 'FINAL AMT', width: '90' },
    { field: 'PRICE PER CTS', headerName: 'PRICE PER CARAT', width: '90' },
    { field: 'CUT', width: '80' },
    { field: 'POLISH', width: '90' },
    { field: 'SYMM', width: '90' },
    { field: 'FLS INTENSITY', headerName: 'FLS', width: '90' },
    { field: 'LENGTH', width: '90' },
    { field: 'WIDTH', width: '90' },
    { field: 'DEPTH', width: '90' },
    { field: 'DEPTH PER', headerName: 'DEPTH-%', width: '90' },
    { field: 'TABLE PER', headerName: 'TABLE-%', width: '90' },
    { field: 'RATIO', width: '90' },
    {
      field: 'KEY TO SYMBOL', headerName: 'KTS', width: '130', tooltipField: 'KEY TO SYMBOL', headerTooltip: 'KEY TO SYMBOL',
    },
    {
      field: 'LAB COMMENTS', headerName: 'COMMENT', width: '130', tooltipField: 'LAB COMMENTS', headerTooltip: 'LAB COMMENTS',
    },
    { field: 'GIRDLE PER', headerName: 'GIRDLE-%', width: '90' },
    { field: 'CROWN ANGLE', width: '90' },
    { field: 'CROWN HEIGHT', width: '90' },
    { field: 'PAVILION ANGLE', headerName: 'PAV ANGLE', width: '70' },
    { field: 'PAVILION HEIGHT', headerName: 'PAV HEIGHT', width: '70' },
    { field: 'TABLE BLACK', width: '80' },
    { field: 'TABLE WHITE', width: '80' },
    { field: 'CROWN BLACK', width: '90' },
    { field: 'CROWN WHITE', width: '90' },
    { field: 'CULET', width: '90' },
    { field: 'TABLE OPEN', width: '90' },
    { field: 'CROWN OPEN', width: '90' },
    { field: 'PAVILION OPEN', width: '90' },
    { field: 'GIRDLE OPEN', width: '80' },
    { field: 'STR LN', headerName: 'STAR LENGH', width: '80' },
    { field: 'LR HALF', headerName: 'LOWER HALF', width: '80' },
  ];

  const [activeLayout, setActiveLayout] = useState([]);
  const [savedLayout, setSavedLayout] = useState([]);

  const removeCommas = (numString) => numString?.replace(/,/g, '');

  const getAllCTSCount = () => {
    let total = 0;
    rowData?.forEach((row) => {
      total += parseFloat(removeCommas(row.CTS)?.toString() || 0);
    });
    return total.toFixed(2);
  };

  const getAllAmountCount = () => {
    let total = 0;
    rowData?.forEach((row) => {
      total += parseFloat(removeCommas(row['OFFER AMOUNT']?.toString()) || 0);
    });
    return total.toFixed(2);
  };

  const getAllRapCount = () => {
    let total = 0;
    rowData?.forEach((row) => {
      total += parseFloat(removeCommas(row['RAP AMOUNT']?.toString()) || 0);
    });
    return total.toFixed(2);
  };

  const getAllDiscount = () => {
    const finalAMT = ((getAllAmountCount() * 100) / getAllRapCount());
    const selectedFinalDis = finalAMT - 100;

    return !isNaN(selectedFinalDis) ? selectedFinalDis.toFixed(2) : 0;
  };

  const [filterAllData, setFilterAllData] = useState({
    allData: '',
    allCtsData: '',
    allRapAmount: '',
    allDiscData: '',
    allAmountData: '',
  });

  const onFilterChanged = async () => {
    const filteredRows = [];
    gridRef?.current?.api.forEachNodeAfterFilter((node) => {
      filteredRows.push(node.data);
    });

    let totalcts = 0;
    filteredRows?.forEach((row) => {
      totalcts += parseFloat(removeCommas(row.CTS)?.toString());
    });

    console.log('filteredRows', filteredRows);
    let totalAmount = 0;
    filteredRows?.forEach((row) => {
      totalAmount += parseFloat(removeCommas(row['OFFER AMOUNT']?.toString()));
    });

    let totalRapAmount = 0;
    filteredRows?.forEach((row) => {
      totalRapAmount += parseFloat(removeCommas(row['RAP AMOUNT']?.toString()));
    });

    const finalAMT = ((totalAmount.toFixed(2) * 100) / totalRapAmount.toFixed(2));
    const selectedFinalDis = finalAMT - 100;

    setFilterAllData({
      allData: filteredRows?.length?.toString(),
      allCtsData: totalcts?.toFixed(2),
      allRapAmount: totalRapAmount?.toFixed(2),
      allAmountData: totalAmount?.toFixed(2),
      allDiscData: !isNaN(selectedFinalDis) ? selectedFinalDis.toFixed(2) : '0',
    });

    setSelectedRows([]);

    // const categoriesArray = await rowData;
    // console.log('categoriesArray', categoriesArray);
    // // const updatedCategoriesArray = categoriesArray?.map((category, index) => {
    // //   if (index === 0) {
    // const updatedApprovalModuleData = categoriesArray?.map((dataItem) => ({
    //   ...dataItem,
    //   isSelected: false,
    // }));

    // return {
    //   ...category,
    //   cartModule: {
    //     ...category.cartModule,
    //     data: updatedApprovalModuleData,
    //   },
    // };

    // return category;
    // });
    // console.log('updatedApprovalModuleData', updatedApprovalModuleData);
    // setDataTotalTable(updatedCategoriesArray[0]);
    gridRef.current.api.deselectAll();
  };

  const defaultColDef = useMemo(() => ({
    flex: (activeLayout?.length === 0
      || activeLayout === null
      || activeLayout === undefined
    ) ? null : 1,
    minWidth: (
      activeLayout?.length === 0
       || activeLayout === null
       || activeLayout === undefined
    ) ? null : 100,
    resizable: true,
    filter: true,
  }), [refreshKey]);

  const dataTypeDefinitions = useMemo(() => ({
    object: {
      baseDataType: 'object',
      extendsDataType: 'object',
      valueParser: (params) => ({ name: params.newValue }),
      valueFormatter: (params) => (params.value == null ? '' : params.value.name),
    },
  }), []);

  const fetchCartData = () => {
    const stockidData = stockId.replace(/\s+/g, ' ')
      .replace(/(?:\s|,)+/g, ',')
      .replace(/,\n/g, '\n')
      .replace(/\n+/g, ',');

    ApiPost(`${EndPoint.GET_CART}?stock_Id=${stockidData}&from_Date=${formatDate(selectedFromDate)}&to_Date=${formatDate(selectedToDate)}`)
      .then((res) => {
        if (res?.status === 200) {
          setRowData(res?.data?.data);
          setDataTotalTable(res?.data);
        } else if (res?.status === 204) {
          setRowData([]);
        }
      }).catch((error) => {
        addToast(error?.error, { appearance: 'error' });
      });
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const getRowStyle = (params) => {
//     if (params?.data?.isSelected || params?.data?.isRowSelectedData) {
//       params?.node.setSelected(true);
//     }
// console.log("params.node.rowIndex",params.node.rowIndex);
//     if (params.node.rowIndex % 2 === 0) {
//       return { background: 'rgb(238 238 238)' };
//     }
  };

  let inputNameValues = '';

  const inputNameRef = useRef(null);

  const handleInputChange = () => {
    inputNameValues = inputNameRef?.current?.value;
  };

  const getAllLayout = async (test) => {
    await ApiGet(`${EndPoint.GET_ALL_REPORT}?rm_Id=2`)
      .then((res) => {
        if (res?.status === 200) {
          setSavedLayout(res?.data?.data);
          const dataMainUpdated = res?.data?.data?.find((x) => x?.Status === true) || {};
          if (Object.keys(dataMainUpdated)?.length === 0) {
            gridRef?.current?.columnApi.resetColumnState();
            setActiveLayout(null);
          } else if (dataMainUpdated?.Report_Layout_Save_Detail_List !== 0) {
            setActiveLayout(dataMainUpdated);
            gridRef?.current.columnApi.applyColumnState({
              state: dataMainUpdated?.Report_Layout_Save_Detail_List,
              applyOrder: true,
            });
          }
          test === 'test' && setRefreshKey((prevKey) => prevKey + 1);
          gridRef.current.api.closeToolPanel();
        } else if (res?.status === 204) {
          test === 'test' && setRefreshKey((prevKey) => prevKey + 1);
          gridRef?.current?.columnApi.resetColumnState();
          setActiveLayout(null);
          setSavedLayout([]);
        } else {
          addToast(res?.data?.message, { appearance: 'error' });
        }
      })
      .catch((err) => {
        addToast(err?.error, { appearance: 'error' });
      });
  };

  const handleDataSend = async () => {
    try {
      const colState = gridRef.current.columnApi.getColumnState();
      const updatedData = colState?.map((items) => ({
        ...items,
        Id: 0,
        Report_Layout_Id: 0,
      }));

      const body = {
        Id: activeLayout?.Id || 0,
        Rm_Id: 2,
        Status: true,
        // User_Id: activeLayout?.User_Id || parseInt(empId),
        Name: activeLayout?.Name || inputNameValues,
        Report_Layout_Save_Detail_List: updatedData,
      };

      ApiPost(`${EndPoint.CREATE_LAYOUT}`, body)
        .then((res) => {
          if (res.data.message === AllMessage.REPORT_LAYOUT_CREATE) {
            addToast(AllMessage.REPORT_LAYOUT_CREATE, { appearance: 'success' });

            gridRef?.current?.api?.setFilterModel({});
            getAllLayout('test');
          } else if (res.data.message === AllMessage.REPORT_LAYOUT_UPDATE) {
            addToast(AllMessage.REPORT_LAYOUT_UPDATE, { appearance: 'success' });
            gridRef?.current?.api?.setFilterModel({});
            getAllLayout('test');
          } else {
            gridRef?.current?.api?.setFilterModel({});
            addToast(res?.data?.message, { appearance: 'error' });
          }
        }).catch((error) => {
          addToast(error?.error, { appearance: 'error' });
        });
    } catch (error) {
      addToast(error?.error, { appearance: 'error' });
    }
  };

  const handleDeleteLayout = (id) => {
    ApiDelete(`${EndPoint.DELETE_LAYOUT}?id=${id}`)
      .then((res) => {
        if (res.status === 200) {
          gridRef?.current?.api?.setFilterModel({});
          getAllLayout('test');
          addToast(res?.data?.message, { appearance: 'success' });
        } else {
          gridRef?.current?.api?.setFilterModel({});
          addToast(res?.data?.message, { appearance: 'error' });
        }
      }).catch((error) => {
        addToast(error?.error, { appearance: 'error' });
      });
  };

  const handleDefaultLayout = () => {
    ApiPut(`${EndPoint.UPDATE_LAYOUT}`)
      .then((res) => {
        if (res.status === 200) {
          gridRef?.current?.api?.setFilterModel({});
          getAllLayout('test');
          addToast(res?.data?.message, { appearance: 'success' });
        } else {
          addToast(res?.data?.message, { appearance: 'error' });
        }
      }).catch((error) => {
        addToast(error?.error, { appearance: 'error' });
      });
  };

  const onChangeValue = (layout) => {
    ApiPut(`${EndPoint.UPDATE_LAYOUT}?id=${layout?.Id}`)
      .then((res) => {
        if (res.data.message === AllMessage.REPORT_LAYOUT_UPDATE) {
          gridRef?.current?.api?.setFilterModel({});
          getAllLayout('test');
          addToast(res.data.message, { appearance: 'success' });
        } else {
          addToast(res?.data?.message, { appearance: 'error' });
        }
      }).catch((error) => {
        addToast(error?.error, { appearance: 'error' });
      });
  };

  const onGridReady = useCallback(() => {
    const newColumnData = [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        maxWidth: 50,
        suppressMenu: true,
        sortable: false,
        pinned: 'left',
        colId: 'Selection',
      },
      ...columnName.map((item) => ({
        ...item,
        menuTabs: [item.field === 'select_box' ? false : 'filterMenuTab', 'generalMenuTab', 'columnsMenuTab'],
        filterParams: item.field === 'RAP RATE' || item?.field === 'RAP AMOUNT' || item?.field === 'OFFER AMOUNT' ? {
          comparator(filterValue, cellValue) {
            const parsedFilterValue = parseFloat(filterValue?.replace(/,/g, ''));
            const parsedCellValue = parseFloat(cellValue?.replace(/,/g, ''));

            if (!isNaN(parsedFilterValue) && !isNaN(parsedCellValue)) {
              if (parsedFilterValue < parsedCellValue) {
                return -1;
              } if (parsedFilterValue > parsedCellValue) {
                return 1;
              }
              return 0;
            }
            return filterValue?.localeCompare(cellValue);
          },
        } : undefined,
      })),
    ];

    console.log(newColumnData, 'newColumnData');

    setColumnData(newColumnData);
    getAllLayout();
  }, []);

  const onFirstDataRendered = useCallback(() => {
    refreshKey === 0 && getAllLayout();
  }, []);

  const getSelectedCTSCount = () => {
    let total = 0;
    selectedRows?.forEach((row) => {
      total += parseFloat(row.CTS || 0);
    });
    return total.toFixed(2);
  };

  const getSelectedRapAmountCount = () => {
    let total = 0;
    selectedRows?.forEach((row) => {
      const withoutComma = row['RAP AMOUNT'].replace(/,/g, '');
      total += parseFloat(withoutComma || 0);
    });
    return total.toFixed(2);
  };

  const getSelectedOfferAmountCount = () => {
    let total = 0;
    selectedRows?.forEach((row) => {
      const withoutComma = row['OFFER AMOUNT'].replace(/,/g, '');
      total += parseFloat(withoutComma || 0);
    });
    return total.toFixed(2);
  };

  const getSelectedOfferRapCount = () => {
    let total = 0;
    selectedRows?.forEach((row) => {
      const withoutComma = row['RAP AMOUNT'].replace(/,/g, '');
      total += parseFloat(withoutComma || 0);
    });
    return total.toFixed(2);
  };

  const getSelectedOfferDiscount = () => {
    if (selectedRows?.length > 0) {
      const finalAMT = ((getSelectedOfferAmountCount() * 100) / getSelectedOfferRapCount());
      const selectedFinalDis = finalAMT - 100;
      return selectedFinalDis.toFixed(2);
    }
    return 0;
  };

  const onSelectionChanged = useCallback(() => {
    if (gridRef.current && gridRef.current.api) {
      const selectedNodes = gridRef.current.api.getSelectedNodes();
      setSelectedRows(selectedNodes.map((node) => node.data));
    }
  }, []);

  // menuitem
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // date
  const handleFromDate = (newValue) => {
    setSelectedFromDate(newValue);
  };
  const handleToDate = (newValue) => {
    setSelectedToDate(newValue);
  };

  const handleChangeStockId = (event) => {
    setStockId(event.target.value);
  };

  // reset
  const resetBtn = () => {
    setStockId('');
    fetchCartData();
  };

  // search
  const searchBtn = () => {
    fetchCartData();
  };

  // delete
  const handleSelectCartDelete = async () => {
    const body = {
      ids: selectedRows?.map((item) => item?.Id).join(','),
    };
    await ApiPut(`${EndPoint?.DELETE_CART}`, body)
      .then((res) => {
        if (res?.data?.statusCode === 200) {
          setDeletModalOpen(false);
          addToast(res?.data?.message, { appearance: 'success' });
          gridRef.current.api.deselectAll();
          fetchCartData();
        } else {
          addToast(res?.data?.message, { appearance: 'error' });
        }
      }).catch((err) => {
        addToast(err?.error, { appearance: 'error' });
      });
  };

  const ExcelDownloadBtn = () => {
    const promises = [];

    const filteredRows = [];

    gridRef?.current?.api.forEachNodeAfterFilter((node) => {
      filteredRows.push(node.data);
    });

    const stockIds = filteredRows.map((item) => item['STOCK ID']).join(',');
    const selectedStone = selectedRows?.map((x) => x['STOCK ID']).join(',');
    const selectedData = [
      {
        Col_Id: 0,
        Column_Name: 'STOCK ID',
        Category_Value: selectedStone || stockIds,
      },
    ];

    const body = {
      Stock_Filter_Parameter: selectedData,
    };

    promises.push(ApiPost(`${EndPoint.EXCEL_DOWNLOAD}`, body)
      .then(async (res) => {
        const fileUrl = res?.data?.result;
        try {
          if (res.status === 200) {
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = res.data.file_name;

            link.click();
          } else {
            addToast(res?.data?.message, { appearance: 'info' });
          }
        } catch (error) {
          addToast(error?.error, { appearance: 'error' });
        }
      }).catch((error) => {
        addToast(error?.error, { appearance: 'error' });
      }));
  };

  // email
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleChangeMail = (e) => {
    setSendMail(e.target.value);
    setEmailFormError((prevErrors) => ({ ...prevErrors, email: '' }));
  };

  // send email
  const sendToEmailData = () => {
    if (!sendMail) {
      setEmailFormError((prevErrors) => ({ ...prevErrors, email: 'Required' }));
      return;
    }

    if (!emailPattern.test(sendMail)) {
      setEmailFormError((prevErrors) => ({ ...prevErrors, email: 'Write Proper Email' }));
      return;
    }

    setEmailFormError((prevErrors) => ({ ...prevErrors, email: '' }));

    setEmailOpen(false);
    setLoaderDownload(true);

    const filteredRows = [];

    gridRef?.current?.api.forEachNodeAfterFilter((node) => {
      filteredRows.push(node.data);
    });
    const stockIds = filteredRows.map((item) => item['STOCK ID']).join(',');

    const selectedStone = selectedRows?.map((x) => x['STOCK ID']).join(',');

    if (selectedOption === 'Selected Stones' && selectedStone === '') {
      addToast('Please Select Stone First', { appearance: 'error' });

      setLoaderDownload(false);
      return;
    }

    const newData = [{
      Col_Id: 0,
      Column_Name: 'STOCK ID',
      Category_Value: selectedOption === 'Selected Stones' ? selectedStone : stockIds,
    }];

    const body = {
      To_Email: sendMail,
      Remarks: remark,
      Stock_Filter_Parameter: newData || [],
      // Send_From_Default: isTrue === 'isTrue',
    };

    ApiPost(`${EndPoint.CART_SEND_EMAIL}`, body)
      .then((res) => {
        if (res?.data?.statusCode === 200) {
          setRemark('');
          setSendMail('');
          setSelectedOption('All Selected Stones');
          gridRef.current.api.deselectAll();

          addToast(res?.data?.message, { appearance: 'success' });

          setLoaderDownload(false);
          setEmailPopup(false);
        } else {
          addToast(res?.data?.message, { appearance: 'error' });

          setLoaderDownload(false);
          setEmailPopup(false);
        }
      }).catch((error) => {
        if (error?.error === 'User mail not found. Do you want to send mail with default Email.') {
          setLoaderDownload(false);
          setEmailOpen(false);
          setEmailPopup(true);
        } else {
          addToast(error?.error, { appearance: 'error' });

          setEmailPopup(false);
          setLoaderDownload(false);
        }
      });
  };

  const handleEmailFormEnterKey = (e, nextRef, notSelect) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      nextRef?.current?.focus();
      notSelect !== 'notSelect' && nextRef?.current?.select();
    }
  };

  const emailCancelPopUp = () => {
    setEmailOpen(false);
    setSendMail('');
    setRemark('');
  };

  const groupedData = {};

  selectedRows?.forEach((item) => {
    const stoneId = item['STOCK ID'];
    const imageLink = item['IMAGE LINK'];
    const videoLink = item['VIDEO LINK'];
    const certificateLink = item['CERTIFICATE LINK'];

    if (!groupedData[stoneId]) {
      groupedData[stoneId] = { images: [], videos: [], certificates: [] };
    }

    if (checkedItems.image && imageLink) {
      groupedData[stoneId]?.images?.push(imageLink);
    }

    if (checkedItems.video && videoLink) {
      groupedData[stoneId]?.videos?.push(videoLink);
    }

    if (checkedItems.certificate && certificateLink) {
      groupedData[stoneId]?.certificates?.push(certificateLink);
    }
  });

  let resultImageSelected = '';

  // Construct the result string
  Object.entries(groupedData)?.forEach(([stoneId, links]) => {
    resultImageSelected += `Stone ID: ${stoneId}\n`;

    if (checkedItems.image && links?.images?.length > 0) {
      resultImageSelected += `Images: ${links?.images?.join('\n')}\n`;
    }

    if (checkedItems.video && links?.videos?.length > 0) {
      resultImageSelected += `Videos: ${links?.videos?.join('\n')}\n`;
    }

    if (checkedItems.certificate && links?.certificates?.length > 0) {
      resultImageSelected += `Certificates: ${links?.certificates?.join('\n')}\n`;
    }

    resultImageSelected += '\n';
  });
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems({
      ...checkedItems,
      [name]: checked,
    });
  };

  const clickOnSkypeImg = async (id) => {
    setLoaderDownload(true);
    setShareModal(false);
    if (checkedItems?.certificate
      || checkedItems?.customerExcel
      || checkedItems?.image
      || checkedItems?.video) {
      if (checkedItems?.customerExcel) {
        const filteredRows = [];

        gridRef?.current?.api.forEachNodeAfterFilter((node) => {
          filteredRows.push(node.data);
        });

        const stockIds = filteredRows.map((item) => item['STOCK ID']).join(',');
        const selectedStone = selectedRows?.map((x) => x['STOCK ID']).join(',');

        const selectedData = [
          {
            Col_Id: '101',
            Column_Name: 'STOCK ID',
            Category_Value: selectedStone || stockIds,
          },
          // {
          //   Col_Id: 1163,
          //   Column_Name: 'USER_ID',
          //   Category_Value: userId,
          // },
        ];

        const body = {
          // id: 2,
          Report_Filter_Parameter: selectedData,
        };

        try {
          const res = await ApiPost(`${EndPoint.EXCEL_DOWNLOAD}`, body);
          if (res.status === 200) {
            const fileUrl = res?.data?.result;
            if (fileUrl) {
              resultImageSelected += `Customer Excel: ${fileUrl}`;
            }
            setLoaderDownload(false);
          } else {
            setLoaderDownload(false);
            addToast(res?.data?.message, { appearance: 'success' });
          }
        } catch (error) {
          setLoaderDownload(false);
          addToast(error?.error, { appearance: 'error' });
        }
      }

      if (id === 1) {
        const whatsappMessage = encodeURIComponent(resultImageSelected);
        const whatsappWebUrl = `https://web.whatsapp.com/send?text=${whatsappMessage}`;
        const whatsappWebTab = window.open(whatsappWebUrl, '_blank');
        if (whatsappWebTab && !whatsappWebTab.closed) {
          whatsappWebTab.focus();
        }
      }

      if (id === 2) {
        const skypeUrl = 'skype:?chat';
        window.open(skypeUrl);
      }

      gridRef.current.api.deselectAll();

      setCheckedItems({
        image: false,
        video: false,
        certificate: false,
        customerExcel: false,
      });
    }
  };

  // oder Process remark
  const handleChangesOrderProcessRemarks = (e) => {
    setRemarkOrderProcess(e.target.value);
    setFormError((prevErrors) => ({ ...prevErrors, remarkOrderProcess: '' }));
  };

  const HandleOrderProcessCancelPopUp = () => {
    setClickOnOrderProcessbtn(false);
    // setFilter('');
    // setSelectedStatusValues([]);
    setRemarkOrderProcess('');
    setFormError('');
    // setRemarksOPFormError({});
    // clearBTNClick();
  };

  const clickContinueBtnOrderProcess = () => {
    if (!remarkOrderProcess) {
      setFormError({ remarkOrderProcess: 'Required' });
      return;
    }

    const updatedSelectedRows = selectedRows?.map((row) => ({
      ...row,
      Id: 0,
    }));

    const body = {
      Remarks: remarkOrderProcess || 'Regular',
      Order_Detail: updatedSelectedRows,
      Id: 2,
    };

    ApiPost(`${EndPoint.CREATE_UPDATE_ORDER}`, body)
      .then((res) => {
        if (res.data.statusCode === 200) {
          addToast(res?.data?.message, { appearance: 'success' });

          gridRef.current.api.deselectAll();
          // setOrderProcessPopup(false);
          setClickOnOrderProcessbtn(false);
          setRemarkOrderProcess('');
          fetchCartData();
          setFormError('');
        } else {
          addToast(res?.data?.message, { appearance: 'error' });
        }
      }).catch((err) => {
        addToast(err?.error, { appearance: 'error' });
      });
  };

  return (
    <>
      {loaderDownload && <BlurBackground />}
      <div
        style={{
          display: 'flex',
          marginBottom: '10px',
          height: '70px',
          padding: '0 16px',
          gap: 5,
          marginTop: '70px',
          background: '#fff'
        }}
        // className={classes.responsiveHeader}
      >
        <table
          className="resultpage-table"
          style={{
            width: '-webkit-fill-available',
            textAlign: 'center',
          }}
        >
          <thead>
            <tr>
              <th style={{ background: 'none' }}>{' '}</th>
              <th style={{ fontSize: '13px', fontWeight: 600 }}>Pcs</th>
              <th style={{ fontSize: '13px', fontWeight: 600 }}>Cts</th>
              <th style={{ fontSize: '13px', fontWeight: 600 }}>Rap</th>

              <th style={{ fontSize: '13px', fontWeight: 600 }}>Offer Disc(%)</th>
              <th style={{
                fontSize: '13px', fontWeight: 600, width: '85px',
              }}
              >
                Offer Amount
              </th>
              {/* <th style={{ fontSize: '13px', color: '#fff', fontWeight: 500 }}>Cost Disc(%)</th>
              <th style={{ fontSize: '13px', color: '#fff', fontWeight: 500 }}>Amount</th>
              <th style={{ fontSize: '13px', color: '#fff', fontWeight: 500 }}>Base Disc(%)</th>
              <th style={{ fontSize: '13px', color: '#fff', fontWeight: 500 }}>Base Amount</th> */}

            </tr>
          </thead>
          <tbody>
            <tr>
              <th style={{
                fontSize: '13px', textAlign: 'left', fontWeight: 600, paddingLeft: '5px', width: '10px',
              }}
              >
                Total
              </th>
              {/* <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{dataTotalTable?.total_Records || 0}</td> */}
              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{Number.isFinite(parseInt(filterAllData?.allData || dataTotalTable?.total_Records)) ? numberWithCommas(filterAllData?.allData || dataTotalTable?.total_Records) : 0}</td>
              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{Number.isFinite(parseInt(filterAllData?.allCtsData || getAllCTSCount())) ? numberWithCommas(filterAllData?.allCtsData || getAllCTSCount()) : 0}</td>
              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{Number.isFinite(parseInt(filterAllData?.allRapAmount || getAllRapCount())) ? numberWithCommas(filterAllData?.allRapAmount || getAllRapCount()) : 0}</td>
              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{Number.isFinite(parseInt(filterAllData?.allDiscData || getAllDiscount())) ? numberWithCommas(filterAllData?.allDiscData || getAllDiscount()) : 0}</td>
              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{Number.isFinite(parseInt(filterAllData?.allAmountData || getAllAmountCount())) ? numberWithCommas(filterAllData?.allAmountData || getAllAmountCount()) : 0}</td>
              {/* <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{parseFloat(dataTotalTable?.total_Cts || 0).toFixed(2)}</td>
              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{dataTotalTable?.total_Rap_Amt || 0}</td>
              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{parseFloat(dataTotalTable?.total_Offer_Disc || 0).toFixed(2)}</td>
              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{parseFloat(dataTotalTable?.total_Offer_Amt || 0).toFixed(2)}</td> */}

              {/* <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{parseFloat(dataTotalTable?.total_Disc || 0).toFixed(2)}</td>
              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{parseFloat(dataTotalTable?.total_Amt || 0).toFixed(2)}</td>
              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{parseFloat(dataTotalTable?.total_Base_Disc || 0).toFixed(2)}</td>
              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{parseFloat(dataTotalTable?.total_Base_Amt || 0).toFixed(2)}</td> */}

            </tr>
            <tr>
              <th style={{
                fontSize: '13px', textAlign: 'left', fontWeight: 600, padding: '0 10px 0 0 ', paddingLeft: '5px',
              }}
              >
                Selected
              </th>
              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{selectedRows?.length || 0}</td>
              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{getSelectedCTSCount()}</td>
              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{getSelectedRapAmountCount()}</td>

              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{getSelectedOfferDiscount()}</td>
              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{getSelectedOfferAmountCount()}</td>

            </tr>
          </tbody>
        </table>
        <Box>
          <Typography className={classes.KeyName}>
            From Date
          </Typography>
          <DatePicker
            value={dayjs(selectedFromDate)}
            format="DD-MM-YYYY"
            onChange={handleFromDate}
            label=""
            renderInput={(params) => (
              <TextField
                {...params}
              />
            )}
            slotProps={{
              field: { clearable: true },
            }}
            sx={{
              width: '125px',
              '& .MuiInputBase-root': {
                borderRadius: '10px',
              },
              ' & .MuiOutlinedInput-input': {
                padding: '2px 0px 2px 7px',
                fontSize: '13px',
                fontFamily: 'calibri',
                height: 'unset',
              },
              '& .MuiButtonBase-root': {
                padding: 0,
              },
            }}
          />
        </Box>

        <Box>
          <Typography className={classes.KeyName}>
            To Date
          </Typography>
          <DatePicker
            value={dayjs(selectedToDate)}
            format="DD-MM-YYYY"
            maxDateTime={dayjs(new Date())}
            onChange={handleToDate}
            label=""
            renderInput={(params) => (
              <TextField
                {...params}
              />
            )}
            slotProps={{
              field: { clearable: true },
            }}
            sx={{
              width: '125px',
              '& .MuiInputBase-root': {
                borderRadius: '10px',
              },
              ' & .MuiOutlinedInput-input': {
                padding: '2px 0px 2px 7px',
                fontSize: '13px',
                fontFamily: 'calibri',
                height: 'unset',
              },
              '& .MuiButtonBase-root': {
                padding: 0,
              },
            }}
          />
        </Box>
        <Box style={{ width: '30%' }}>
          <Input
            rows={2}
            multiline
            label="StockId/Certi No"
            placeholder="StockId/Certi No"
            value={stockId}
            onChange={handleChangeStockId}
            maxLength="1000"
          />
        </Box>
        <Box style={{ marginTop: '20px' }}>
          <Button
            sx={{
              borderRadius: '10px',
              border: '1px solid rgba(0, 0, 0, 0.23)',
              padding: '1px 5px',
              color: '#3c6070!important',
              height: 'fit-content',
            }}
            className={classes.fontNameStyle}
            onClick={searchBtn}
          >
            {/* <SearchOutlined style={{ fontSize: '20px' }} /> */}
            Search
          </Button>
        </Box>
        <Box style={{ marginTop: '20px' }}>
          <Button
            sx={{
              borderRadius: '10px',
              border: '1px solid rgba(0, 0, 0, 0.23)',
              padding: '1px 5px',
              color: '#3c6070!important',
              height: 'fit-content',
            }}
            className={classes.fontNameStyle}
            onClick={resetBtn}
          >
            {/* <RedoOutlined /> */}
            Reset
          </Button>
        </Box>

        <div style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'flex-end',
          width: 'calc(100% - 560px)',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}
        >
          <Tooltip title="Place Order" arrow>
            <img
              src={placeOrder}
              height={30}
              width={30}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                if (selectedRows?.length > 0) {
                  setClickOnOrderProcessbtn(true);
                  // setTimeout(() => {
                  //   useEffectTriggerOrder();
                  //   orderCompanyRef.current = true;
                  // }, 100);
                } else {
                  addToast('Please Select atlest 1 Record.', { appearance: 'info' });
                }
              }}
            />
          </Tooltip>
          <Tooltip title="Email" arrow>
            <img
              src={email}
              height={30}
              width={30}
              title="Email"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setEmailOpen(true);
                setSelectedOption('All Selected Stones');
              }}
            />
          </Tooltip>
          <div>
            <Tooltip title="Download" arrow>
              <img
                src={download}
                height={30}
                width={30}
                onClick={handleClick}
                style={{ cursor: 'pointer' }}
              />
            </Tooltip>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => ExcelDownloadBtn()}>Excel111</MenuItem>
              <MenuItem onClick={handleClose}>Image</MenuItem>
              <MenuItem onClick={handleClose}>Video</MenuItem>
              <MenuItem onClick={handleClose}>Certificate</MenuItem>
            </Menu>
          </div>
          <div>
            <Tooltip title="Share" arrow>
              <img
                src={share}
                height={30}
                width={30}
                onClick={() => setShareModal(true)}
              />
            </Tooltip>

          </div>
          <Tooltip title="Delete" arrow>
            <img
              src={deleteblack}
              height={30}
              width={25}
              title="Delete"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                selectedRows.length > 0 ? setDeletModalOpen(true)
                  : addToast('Please Select atlest 1 Record.', { appearance: 'info' });
              }}
            />
          </Tooltip>
        </div>
      </div>
      {dataTotalTable?.total_Records
        ? (
          <div
            style={{
              height: 'calc(100% - 135px)',
              width: '100%',
              padding: '0 16px',
              // marginTop: '30px',
            }}
            className="ag-theme-alpine"
          >
            <style>
              {`
                .ag-header-cell-label {
                  white-space: pre-wrap !important;
                  line-height: pre-wrap !important;
                  text-align: center !important;
                  color: #fff !important;
                  font-weight: 500 !important;
                }
              `}
            </style>
            <AgGridReact
              enableBrowserTooltips
              className={classes.devStyle}
              key={refreshKey !== 0 && refreshKey}
              // columnDefs={columnName}
              columnDefs={columnData}
              rowData={rowData}
              ref={gridRef}
              rowHeight={25}
              getRowStyle={getRowStyle}
              onFirstDataRendered={onFirstDataRendered}
              onSelectionChanged={onSelectionChanged}
              defaultColDef={defaultColDef}
              dataTypeDefinitions={dataTypeDefinitions}
              enableRangeSelection
              enableRangeHandle
              rowSelection="multiple"
              checkboxSelection
              suppressRowClickSelection
              onGridReady={onGridReady}
              onFilterChanged={onFilterChanged}
              // onFilterModified={(e) => {
              //   e?.filterInstance?.filterNameKey === 'setFilter'
              //       && gridRef?.current?.api?.showLoadingOverlay();
              // }}
              sideBar={{
                toolPanels: [
                  {
                    id: 'columns',
                    labelDefault: 'Columns',
                    iconKey: 'columns',
                    toolPanel: 'agColumnsToolPanel',
                    toolPanelParams: {
                      suppressRowGroups: true,
                      suppressValues: true,
                      suppressPivots: true,
                      suppressPivotMode: true,
                      suppressColumnFilter: true,
                      // suppressColumnSelectAll: true,
                      suppressColumnExpandAll: true,
                    },
                  },
                  {
                    id: 'save',
                    labelDefault: 'Save',
                    iconKey: 'menu',
                    toolPanel: () => (
                      <Box
                        sx={{
                          height: 'auto',
                          alignItems: 'start',
                          display: 'flex',
                          flexDirection: 'column',
                          padding: '22px 5px',
                        }}
                      >
                        <CommonButton
                          type="submit"
                          btnLabel="Default"
                          className="submitBtn"
                          onClick={handleDefaultLayout}
                          sx={{
                            marginLeft: '10px',
                          }}
                        />
                        <FormControl sx={{
                          width: '100%',
                        }}
                        >
                          <FormLabel id="demo-radio-buttons-group-label">Saved Layout</FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                          >
                            {savedLayout?.length > 0 ? (
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                              >
                                {savedLayout?.map((layout) => (
                                  <FormControlLabel
                                    key={layout?.Id}
                                    value={layout?.Id}
                                    checked={layout.Status}
                                    control={<Radio />}
                                    labelPlacement="end"
                                    onChange={() => {
                                      onChangeValue(layout);
                                    }}
                                    label={(
                                      <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                      }}
                                      >
                                        <Box>
                                          {layout?.Name}
                                        </Box>
                                        <Box sx={{
                                          position: 'absolute',
                                          right: '10px',
                                        }}
                                        >
                                          <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => handleDeleteLayout(layout?.Id)}
                                          >
                                            <DeleteIcon />
                                          </IconButton>
                                        </Box>
                                      </Box>
                                  )}
                                  />
                                ))}
                              </RadioGroup>
                            ) : (
                              <p>No saved layouts found.</p>
                            )}
                          </RadioGroup>
                        </FormControl>
                        <Input
                          inputRef={inputNameRef}
                          onChange={handleInputChange}
                        />
                        <Grid className={classes.footerButton}>
                          <CommonButton
                            type="submit"
                            btnLabel="Submit"
                            className="submitBtn"
                            onClick={handleDataSend}
                            customclass={classes.submitBtn}
                          />
                        </Grid>
                      </Box>
                    ),
                  },
                ],
              }}
            />
          </div>
        ) : null}

      {clickOnOrderProcessbtn
       && (
       <Dialog
         open={clickOnOrderProcessbtn}
         className={classes.customDialog}
         sx={{
           '& .MuiDialog-paper': {
             minWidth: '30%', maxHeight: 500, border: '2px solid #3c6070', borderRadius: '10px',
           },
         }}
       >
         <DialogTitle style={{ padding: '5px', color: '#3c6070', textAlign: 'center' }}>
           Order Process
         </DialogTitle>
         <DialogContent>

           <div className={classes.supplierNameClass}>
             <Input
               required
               label="Remarks"
               value={remarkOrderProcess}
               onChange={(e) => handleChangesOrderProcessRemarks(e)}
               helperTexts={formError?.remarkOrderProcess}
               errors={!!formError?.remarkOrderProcess}
              //  onKeyDown={(e) => handleFormOrderEnterKey(e, orderButtonClickRef, 'notSelect')}
              //  inputRef={remarkOrderRef}
             />
           </div>
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
             className={classes.fontNameStyle}
             onClick={HandleOrderProcessCancelPopUp}
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
             className={classes.fontNameStyle}
             onClick={() => clickContinueBtnOrderProcess()}
            //  ref={orderButtonClickRef}
           >
             Continue
           </Button>
         </DialogActions>
       </Dialog>
       )}

      {emailOpen
       && (
       <Dialog
         open={emailOpen}
         onClose={() => setEmailOpen(false)}
         className={classes.customDialog}
         sx={{
           '& .MuiDialog-paper': {
             minWidth: '30%', maxHeight: 500, border: '2px solid #3c6070', borderRadius: '10px',
           },
         }}
       >
         <DialogTitle style={{ padding: '5px', color: '#3c6070', textAlign: 'center' }}>Email</DialogTitle>
         <DialogContent>
           <RadioGroup value={selectedOption} onChange={handleOptionChange} style={{ display: 'block' }}>
             <>
               <FormControlLabel
                 value="All Selected Stones"
                 control={<Radio />}
                 label="All Stones"
               />
               <FormControlLabel
                 value="Selected Stones"
                 control={<Radio />}
                 label="Selected Stones"
                 disabled={selectedRows.length === 0}
               />
             </>
           </RadioGroup>
           <Input
             required
             label="To Email"
             value={sendMail}
             onChange={(e) => handleChangeMail(e)}
             helperTexts={emailFormError?.email}
             errors={!!emailFormError?.email}
             autoFocus
             focusSelection
             onKeyDown={(e) => handleEmailFormEnterKey(e, emailInputRef)}
           />
           <Input
             label="Remarks"
             value={remark}
             onChange={(e) => setRemark(e.target.value)}
             inputRef={emailInputRef}
             onKeyDown={(e) => handleEmailFormEnterKey(e, emailSubmitRef, 'notSelect')}
           />
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
             className={classes.fontNameStyle}
             onClick={emailCancelPopUp}
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
             className={classes.fontNameStyle}
             onClick={sendToEmailData}
             ref={emailSubmitRef}
           >
             Send
           </Button>
         </DialogActions>
       </Dialog>
       )}

      {shareModal
       && (
       <Dialog
         open={shareModal}
         onClose={() => setShareModal(false)}
         className={classes.customDialog}
         sx={{
           '& .MuiDialog-paper': {
             minWidth: '30%', maxHeight: 500, border: '2px solid #3c6070', borderRadius: '10px',
           },
         }}
       >
         <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
           <Box style={{ display: 'flex', justifyContent: 'space-around' }}>
             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               Customer Excel
               <Checkbox name="customerExcel" checked={checkedItems.customerExcel} onChange={handleCheckboxChange} />
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               Image
               <Checkbox disabled={selectedRows.length === 0} name="image" checked={checkedItems.image} onChange={handleCheckboxChange} />
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               Video
               <Checkbox disabled={selectedRows.length === 0} name="video" checked={checkedItems.video} onChange={handleCheckboxChange} />
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               Certificate
               <Checkbox disabled={selectedRows.length === 0} name="certificate" checked={checkedItems.certificate} onChange={handleCheckboxChange} />
             </div>
           </Box>
           <Typography style={{ padding: '5px', color: '#3c6070' }}>
             Share Options
           </Typography>
           <Box style={{ display: 'flex' }}>
             <img
               src={WhatsAppImg}
               alt="whatsapp_share"
               onClick={() => clickOnSkypeImg(1)}
               style={{
                 height: '50px',
                 width: '50px',
                 marginRight: '8px',
               }}
             />
             <div>
               <img
                 src={SkypeImg}
                 alt="skype_share"
                 onClick={() => clickOnSkypeImg(2)}
                 style={{ height: '50px', width: '50px', marginRight: '8px' }}
               />
             </div>
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
             className={classes.fontNameStyle}
             onClick={() => {
               setShareModal(false);
               setCheckedItems({
                 image: false,
                 video: false,
                 certificate: false,
                 customerExcel: false,
               });
             }}
           >
             Cancel
           </Button>
         </DialogActions>
       </Dialog>
       )}
      {
        deleteModalOpen && (
          <DeleteModel
            handleShapeDelete={handleSelectCartDelete}
            handleClose={() => setDeletModalOpen(false)}
          />
        )
      }

      {
        emailPopup && (
          <DeleteModel
            handleShapeDelete={() => sendToEmailData('isTrue')}
            handleClose={() => setEmailPopup(false)}
            navigationMessage="User mail not found. Do you want to send mail with default Email."
          />
        )
      }
    </>
  );
};

export default Cart;
