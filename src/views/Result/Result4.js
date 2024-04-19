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
  Box, Button, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { EndPoint } from '../../utils/EndPoint';
import {
  // ApiDelete, ApiGet, ApiPut,
  ApiPost,
} from '../../utils/api';
import BlurBackground from '../../common/Loader/BlurBackground';
import useStyle from './style';
import CommonButton from '../../common/FormControls/Button/CustomButton';
import Input from '../../common/FormControls/input/InputMaster';

import 'ag-grid-enterprise';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Result4 = ({
  data, setActiveResultPage, setActiveResult, setSelectedData,
}) => {
  const { addToast } = useToasts();
  const gridRef = useRef();
  const classes = useStyle();

  // eslint-disable-next-line no-unused-vars
  const empId = localStorage.getItem('user');

  const [dataTotalTable, setDataTotalTable] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loaderDownload, setLoaderDownload] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [refreshKey, setRefreshKey] = useState(0);

  const [selectedRows, setSelectedRows] = useState([]);
  const [rowData, setRowData] = useState([]);

  const columnName = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      maxWidth: 50,
      suppressMenu: true,
      sortable: false,
      pinned: 'left',
    },
    {
      field: 'View',
      headerName: 'View',
      pinned: 'left',
      cellRenderer: (params) => {
        const handleClick = (link) => {
          window.open(link, '_blank');
        };

        const imageLink = params?.data && params?.data['IMAGE LINK'] ? (
          <ImageIcon
            onClick={() => handleClick(params.data['IMAGE LINK'])}
            style={{ cursor: 'pointer', color: '#3c6070', width: '18px' }}
          />
        ) : <ImageNotSupportedIcon style={{ color: '#3c6070', width: '18px' }} />;

        const videoLink = params?.data && params?.data['VIDEO LINK'] ? (
          <VideoCameraBackIcon
            onClick={() => handleClick(params.data['VIDEO LINK'])}
            style={{ cursor: 'pointer', color: '#3c6070', width: '18px' }}
          />
        ) : <VideocamOffIcon style={{ color: '#3c6070', width: '18px' }} />;
        return (
          <div style={{ height: '100%' }}>
            {imageLink}
            {videoLink}
          </div>
        );
      },
    },
    {
      field: 'LAB',
      headerName: 'LAB',
      cellStyle: {
        textAlign: 'left',
      },
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
    { field: 'SUPPLIER NO' },
    { field: 'LOCATION' },
    { field: 'SHAPE' },
    { field: 'BGM' },
    { field: 'COLOR' },
    { field: 'CLARITY' },
    { field: 'CARATS' },
    { field: 'RAP PRICE' },
    { field: 'RAP AMT' },
    { field: 'FINAL DISC-%' },
    { field: 'FINAL AMT' },
    { field: 'PRICE PER CARAT' },
    { field: 'CUT' },
    { field: 'POLISH' },
    { field: 'SYMM' },
    { field: 'FLS' },
    { field: 'LENGTH' },
    { field: 'WIDTH' },
    { field: 'DEPTH' },
    { field: 'DEPTH-%' },
    { field: 'TABLE-%' },
    { field: 'RATIO' },
    { field: 'KTS' },
    { field: 'COMMENT' },
    { field: 'GIRDLE-%' },
    { field: 'CROWN ANGLE' },
    { field: 'CROWN HEIGHT' },
    { field: 'PAV ANGLE' },
    { field: 'PAV HEIGHT' },
    { field: 'TABLE BLACK' },
    { field: 'TABLE WHITE' },
    { field: 'CROWN BLACK' },
    { field: 'CROWN WHITE' },
    { field: 'CULET' },
    { field: 'TABLE OPEN' },
    { field: 'CROWN OPEN' },
    { field: 'PAVILION OPEN' },
    { field: 'GIRDLE OPEN' },
    { field: 'STAR LENGH' },
    { field: 'LOWER HALF' },
  ];

  // eslint-disable-next-line no-unused-vars
  const [activeLayout, setActiveLayout] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [savedLayout, setSavedLayout] = useState([]);

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

  const fetchCalculationTotal = async () => {
    try {
      const apiData = {
        Stock_Multiple_Filter_Parameter: data || [],
      };
      await ApiPost(`${EndPoint.GET_TOTAL_RESULT_PAGE}`, apiData)
        .then((res) => {
          if (res?.status === 200) {
            setDataTotalTable(res.data);
            setTimeout(() => {
              gridRef?.current?.api?.setRowCount(
                res?.data?.total_Records,
                res?.data?.total_Records,
              );
            }, 500);
          } else if (res?.status === 204) {
            setDataTotalTable({
              total_Records: 0,
              total_Cts: 0,
              total_Disc: 0,
              total_Amt: 0,
              total_Base_Disc: 0,
              total_Base_Amt: 0,
              total_Offer_Disc: 0,
              total_Offer_Amt: 0,
              total_MaxSlab_Disc: 0,
              total_MaxSlab_Amt: 0,
            });
            gridRef?.current?.api?.setRowCount(
              res?.data?.total_Records,
              res?.data?.total_Records,
            );
          } else {
            addToast(res?.data?.message, { appearance: 'success' });
          }
        }).catch((error) => {
          addToast(error?.error, { appearance: 'error' });
        });
    } catch (error) {
      addToast(error?.error, { appearance: 'error' });
    }
  };

  const fetchCartData = () => {
    const apiData = {
      Stock_Multiple_Filter_Parameter: data || [],
    };
    ApiPost(EndPoint.NEWLAB_SEARCH_API, apiData)
      .then((res) => {
        if (res?.status === 200) {
          setRowData(res?.data?.data);
        } else if (res?.status === 204) {
          setRowData([]);
        }
      }).catch((error) => {
        addToast(error?.error, { appearance: 'error' });
      });
  };

  useEffect(() => {
    fetchCalculationTotal();
    fetchCartData();
  }, []);

  const getRowStyle = (params) => {
    if (params?.data?.isSelected || params?.data?.isRowSelectedData) {
      params?.node.setSelected(true);
    }

    if (params.node.rowIndex % 2 === 0) {
      return { background: 'rgb(238 238 238)' };
    }
  };

  const onFirstDataRendered = useCallback(() => {
    refreshKey === 0 && getAllLayout();
  }, []);

  let inputNameValues = '';

  const inputNameRef = useRef(null);

  const handleInputChange = () => {
    inputNameValues = inputNameRef?.current?.value;
  };

  const getAllLayout = async (test) => {
    console.log(test, inputNameValues, 'test1111');
  //   await ApiGet(`${EndPoint.REPORT_LAYOUT_GET}?User_Id=${empId}&Rm_Id=1`)
  //     .then((res) => {
  //       if (res?.status === 200) {
  //         setSavedLayout(res?.data?.data);
  //         const dataMainUpdated = res?.data?.data?.find((x) => x?.Status === true) || {};
  //         if (Object.keys(dataMainUpdated)?.length === 0) {
  //           gridRef?.current?.columnApi.resetColumnState();
  //           setActiveLayout(null);
  //         } else if (dataMainUpdated?.Report_Layout_Save_Detail_List !== 0) {
  //           setActiveLayout(dataMainUpdated);
  //           gridRef?.current.columnApi.applyColumnState({
  //             state: dataMainUpdated?.Report_Layout_Save_Detail_List,
  //             applyOrder: true,
  //           });
  //         }
  //         test === 'test' && setRefreshKey((prevKey) => prevKey + 1);
  //         gridRef.current.api.closeToolPanel();
  //       } else if (res?.status === 204) {
  //         test === 'test' && setRefreshKey((prevKey) => prevKey + 1);
  //         gridRef?.current?.columnApi.resetColumnState();
  //         setActiveLayout(null);
  //         setSavedLayout([]);
  //       } else {
  //         addToast(res?.data?.message, { appearance: 'error' });
  //       }
  //     })
  //     .catch((err) => {
  //       addToast(err?.error, { appearance: 'error' });
  //     });
  };

  const handleDataSend = async () => {
  //   try {
  //     const colState = gridRef.current.columnApi.getColumnState();
  //     const updatedData = colState?.map((items) => ({
  //       ...items,
  //       Id: 0,
  //       Report_Layout_Id: 0,
  //     }));

    //     const body = {
    //       Id: activeLayout?.Id || 0,
    //       Status: true,
    //       User_Id: activeLayout?.User_Id || parseInt(empId),
    //       Name: activeLayout?.Name || inputNameValues,
    //       Report_Layout_Save_Detail_List: updatedData,
    //       Rm_Id: 1,
    //     };

    //     ApiPost(`${EndPoint.REPORT_LAYOUT_POST}`, body)
    //       .then((res) => {
    //         if (res.data.message === AllMessage.REPORT_LAYOUT_CREATE) {
    //           addToast(AllMessage.REPORT_LAYOUT_CREATE, { appearance: 'success' });

  //           gridRef?.current?.api?.setFilterModel({});
  //           getAllLayout('test');
  //         } else if (res.data.message === AllMessage.REPORT_LAYOUT_UPDATE) {
  //           addToast(AllMessage.REPORT_LAYOUT_UPDATE, { appearance: 'success' });
  //           gridRef?.current?.api?.setFilterModel({});
  //           getAllLayout('test');
  //         } else {
  //           gridRef?.current?.api?.setFilterModel({});
  //           addToast(res?.data?.message, { appearance: 'error' });
  //         }
  //       }).catch((error) => {
  //         addToast(error?.error, { appearance: 'error' });
  //       });
  //   } catch (error) {
  //     addToast(error?.error, { appearance: 'error' });
  //   }
  };

  const handleDeleteLayout = (id) => {
    console.log(id);
  //   ApiDelete(`${EndPoint.REPORT_LAYOUT_DELETE}?id=${id}`)
  //     .then((res) => {
  //       if (res.data.message === AllMessage.REPORT_LAYOUT_DELETE) {
  //         gridRef?.current?.api?.setFilterModel({});
  //         getAllLayout('test');
  //         addToast(AllMessage.REPORT_LAYOUT_DELETE, { appearance: 'success' });
  //       } else {
  //         gridRef?.current?.api?.setFilterModel({});
  //         addToast(res?.data?.message, { appearance: 'error' });
  //       }
  //     }).catch((error) => {
  //       addToast(error?.error, { appearance: 'error' });
  //     });
  };

  const handleDefaultLayout = () => {
  //   ApiPut(`${EndPoint.REPORT_LAYOUT_STATUS_CHANGE}?User_Id=${empId}`)
  //     .then((res) => {
  //       if (res.sta === AllMessage.REPORT_LAYOUT_STATUS_CHANGE) {
  //         gridRef?.current?.api?.setFilterModel({});
  //         getAllLayout('test');
  //         addToast(AllMessage.REPORT_LAYOUT_STATUS_CHANGE, { appearance: 'success' });
  //       } else {
  //         addToast(res?.data?.message, { appearance: 'error' });
  //       }
  //     }).catch((error) => {
  //       addToast(error?.error, { appearance: 'error' });
  //     });
  };

  const onChangeValue = (layout) => {
    console.log(layout, '111');
  //   ApiPut(`${EndPoint.REPORT_LAYOUT_STATUS_CHANGE}?id=${layout?.Id}&User_Id=${empId}`)
  //     .then((res) => {
  //       if (res.data.message === AllMessage.REPORT_LAYOUT_STATUS_CHANGE) {
  //         gridRef?.current?.api?.setFilterModel({});
  //         getAllLayout('test');
  //         addToast(AllMessage.REPORT_LAYOUT_STATUS_CHANGE, { appearance: 'success' });
  //       } else {
  //         addToast(res?.data?.message, { appearance: 'error' });
  //       }
  //     }).catch((error) => {
  //       addToast(error?.error, { appearance: 'error' });
  //     });
  };

  const onGridReady = useCallback(() => {

  }, []);

  const getSelectedCTSCount = () => {
    let total = 0;
    selectedRows?.forEach((row) => {
      total += parseFloat(row.CTS || 0);
    });
    return total.toFixed(2);
  };

  const getSelectedAmountCount = () => {
    let total = 0;
    selectedRows?.forEach((row) => {
      const withoutComma = row['COST AMOUNT'].replace(/,/g, '');
      total += parseFloat(withoutComma || 0);
    });
    return total.toFixed(2);
  };

  const getSelectedBaseAmountCount = () => {
    let total = 0;
    selectedRows?.forEach((row) => {
      const withoutComma = row['BASE AMOUNT'].replace(/,/g, '');
      total += parseFloat(withoutComma || 0);
    });
    return total.toFixed(2);
  };

  const getSelectedRapCount = () => {
    let total = 0;
    selectedRows?.forEach((row) => {
      const withoutComma = row['RAP AMOUNT'].replace(/,/g, '');
      total += parseFloat(withoutComma || 0);
    });
    return total.toFixed(2);
  };

  const getSelectedDiscount = () => {
    if (selectedRows?.length > 0) {
      const finalAMT = ((getSelectedAmountCount() * 100) / getSelectedRapCount());
      const selectedFinalDis = finalAMT - 100;
      return selectedFinalDis.toFixed(2);
    }
    return 0;
  };

  const getSelectedBaseDiscount = () => {
    if (selectedRows?.length > 0) {
      const finalAMT = ((getSelectedBaseAmountCount() * 100) / getSelectedRapCount());
      const selectedFinalDis = finalAMT - 100;
      return selectedFinalDis.toFixed(2);
    }
    return 0;
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

  return (
    <>
      {loaderDownload && <BlurBackground />}
      <div
        style={{
          display: 'flex',
          marginBottom: '10px',
          height: '88px',
          padding: '0 16px',
        }}
        className={classes.responsiveHeader}
      >
        <table
          className="resultpage-table"
          style={{
            width: 'fit-content',
            textAlign: 'center',
          }}
        >
          <thead>
            <tr>
              <th style={{ background: 'none' }}>{' '}</th>
              <th style={{ fontSize: '13px', color: '#fff', fontWeight: 500 }}>Pcs</th>
              <th style={{ fontSize: '13px', color: '#fff', fontWeight: 500 }}>Cts</th>

              <th style={{ fontSize: '13px', color: '#fff', fontWeight: 500 }}>Offer Disc(%)</th>
              <th style={{
                fontSize: '13px', color: '#fff', fontWeight: 500, width: '85px',
              }}
              >
                Offer Amount
              </th>

              <th style={{ fontSize: '13px', color: '#fff', fontWeight: 500 }}>Cost Disc(%)</th>
              <th style={{ fontSize: '13px', color: '#fff', fontWeight: 500 }}>Amount</th>
              <th style={{ fontSize: '13px', color: '#fff', fontWeight: 500 }}>Base Disc(%)</th>
              <th style={{ fontSize: '13px', color: '#fff', fontWeight: 500 }}>Base Amount</th>

            </tr>
          </thead>
          <tbody>
            <tr>
              <th style={{
                fontSize: '13px', textAlign: 'left', color: '#fff', fontWeight: 500, paddingLeft: '5px',
              }}
              >
                Total
              </th>
              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{dataTotalTable?.total_Records || 0}</td>
              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{parseFloat(dataTotalTable?.total_Cts || 0).toFixed(2)}</td>

              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{parseFloat(dataTotalTable?.total_Offer_Disc || 0).toFixed(2)}</td>
              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{parseFloat(dataTotalTable?.total_Offer_Amt || 0).toFixed(2)}</td>

              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{parseFloat(dataTotalTable?.total_Disc || 0).toFixed(2)}</td>
              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{parseFloat(dataTotalTable?.total_Amt || 0).toFixed(2)}</td>
              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{parseFloat(dataTotalTable?.total_Base_Disc || 0).toFixed(2)}</td>
              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{parseFloat(dataTotalTable?.total_Base_Amt || 0).toFixed(2)}</td>

            </tr>
            <tr>
              <th style={{
                fontSize: '13px', textAlign: 'left', color: '#fff', fontWeight: 500, padding: '0 10px 0 0 ', paddingLeft: '5px',
              }}
              >
                Selected
              </th>
              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{selectedRows?.length || 0}</td>
              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{getSelectedCTSCount()}</td>

              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{getSelectedOfferDiscount()}</td>
              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{getSelectedOfferAmountCount()}</td>

              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{getSelectedDiscount()}</td>
              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{getSelectedAmountCount()}</td>
              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{getSelectedBaseDiscount()}</td>
              <td style={{ fontSize: '13px', color: '#3c6070', fontFamily: 'calibri' }}>{getSelectedBaseAmountCount()}</td>

            </tr>
          </tbody>
        </table>

        <div style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'flex-end',
          width: 'calc(100% - 560px)',
          justifyContent: 'flex-end',
        }}
        >
          <Button
            className={classes.buttonStyle}
            onClick={() => {
              if (selectedRows?.length > 0) {
                // setClickOnOrderProcessbtn(true);
                // if (userType.includes('Assist By')) {
                //   setTimeout(() => {
                //     useEffectTriggerOrder();
                //     orderCompanyRef.current = true;
                //   }, 100);
                // }
              } else {
                // toast.info('Please Select atlest 1 Record.', {
                //   position: toast.POSITION.TOP_CENTER,
                // });
              }
            }}
          >
            Order Process
          </Button>
          <Button
            className={classes.buttonStyle}
            onClick={() => {
              // setEmailOpen(true);
              // setSelectedOption('All Selected Stones');
            }}
          >
            Email
          </Button>
          <Button
            className={classes.buttonStyle}
            onClick={() => {
              setActiveResultPage('search');
              setActiveResult(4);
              setSelectedData(data);
              // clickOnModifyBtn()
            }}
          >
            Modify
          </Button>
          <Button
            className={classes.buttonStyle}
            onClick={() => {
              if (selectedRows?.length > 0) {
                // setOpen(true);
                // if (userType.includes('Assist By')) {
                //   setTimeout(() => {
                //     useEffectTrigger();
                //     cartCompanyRef.current = true;
                //   }, 100);
                // }
              } else {
                // toast.info('Please Select atlest 1 Record.', {
                //   position: toast.POSITION.TOP_CENTER,
                // });
              }
            }}
          >
            Cart
          </Button>

          <Button
            className={classes.buttonStyle}
            onClick={() => {
              if (selectedRows?.length > 0) {
                // approvalData();
              } else {
                // toast.info('Please Select atlest 1 Record.', {
                //   position: toast.POSITION.TOP_CENTER,
                // });
              }
            }}
          >
            Approval
          </Button>

          <Button
            className={classes.buttonStyle}
            // onClick={DownloadData}
          >
            Download
          </Button>

          <Button
            className={classes.buttonStyle}
            // onClick={() => setShareModal(true)}
          >
            Share
          </Button>
        </div>
      </div>
      {dataTotalTable?.total_Records
        ? (
          <div
            style={{
              height: 'calc(100% - 138px)',
              width: '100%',
              padding: '0 16px',
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
              columnDefs={columnName}
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
              onFilterModified={(e) => {
                e?.filterInstance?.filterNameKey === 'setFilter'
                    && gridRef?.current?.api?.showLoadingOverlay();
              }}
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
    </>
  );
};

export default Result4;
