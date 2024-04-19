import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Table
} from "reactstrap";
import { EndPoint } from "utils/EndPoint";
import { ApiGet } from "utils/api";
import { BsCart2 } from 'react-icons/bs';
import { RiContactsBook2Fill } from 'react-icons/ri';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteForever } from 'react-icons/md';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { ApiDelete } from "utils/api";

function Dashboard() {
  const { addToast } = useToasts();
  const navigate = useNavigate();

  const [totalCountData, setTotalCountDataData] = useState({});
  const [recentData, setRecentData] = useState([]);
  const [saveSearchData, setSaveSearchData] = useState([]);
  const [orderHistoryData, setOrderHistoryhData] = useState([]);

  // total dashbord
  const getTotalCount = () => {
    ApiGet(`${EndPoint?.TOTAL_COUNT_DASHBORD}`)
      .then((res) => {
        if (res?.data?.statusCode === 200) {
          setTotalCountDataData(res?.data);
        }
      }).catch((error) => {
        addToast(error?.error, { appearance: 'error' });
      });
  };

    // recent data
    const getRecentSeach = () => {
      ApiGet(`${EndPoint?.GET_SEARCH_REPORT_RECENT_SEARCH}`)
        .then((res) => {
          if (res?.data?.statusCode === 200) {
            setRecentData(res?.data?.data);
          }
        }).catch((error) => {
          addToast(error?.error, { appearance: 'error' });
        });
    };
  
    // save & search
    const getSaveAndSeach = () => {
      ApiGet(`${EndPoint?.GET_SAVE_Stock_SEARCH}`)
        .then((res) => {
          if (res?.data?.statusCode === 200) {
            setSaveSearchData(res?.data?.data);
          }
        }).catch((error) => {
          addToast(error?.error, { appearance: 'error' });
        });
    };
  
    // Order History Summary
    const getOrderHistory = () => {
      ApiGet(`${EndPoint?.GET_ORDER_SUMMARY}`)
        .then((res) => {
          if (res?.data?.statusCode === 200) {
            setOrderHistoryhData(res?.data?.data);
          }
        }).catch((error) => {
          addToast(error?.error, { appearance: 'error' });
        });
    };

  useEffect(() => {
    getTotalCount();
    getRecentSeach();
    getSaveAndSeach();
    getOrderHistory();
  }, []);

  const criteriaSearch = (data) => {
    navigate('/admin/search', { state: { data: data?.Search_Value, recentSearch: true } });
  };

  const criteriaSaveAndSearch = (data) => {
    navigate('/admin/search', { state: { data: data?.Search_Value, saveAndSearch: true } });
  };

  const deleteSaveSearch = (id) => {
    ApiDelete(`${EndPoint?.DELETE_STOCK_SEARCH_SAVE}?id=${id}`)
      .then((res) => {
        getSaveAndSeach();
        addToast(res?.data?.message, { appearance: 'success' });
      }).catch((error) => {
        addToast(error?.error, { appearance: 'error' });
      });
  };

  const editSaveSearch = (data) => {
    ApiGet(`${EndPoint?.GET_SAVE_STOCK_SEARCH_BY_ID}?id=${data?.Id}`)
      .then((res) => {
        console.log('res', res?.data);
        if (res?.status === 200) {
          navigate(`/search?id=${res?.data?.data[0]?.Id}`, {
            state: { data: res?.data?.data[0]?.Search_Value },
          });
        }
      });
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col lg="4" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-zoom-split text-warning" />
                      {/* <SearchIcon style={{fontSize: '50px', color: 'rgb(244, 161, 0)', marginRight: '6px'}}/> */}
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Stones</p>
                      <CardTitle tag="p">{totalCountData?.stone_Count}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update Now
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="4" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                      {/* <RiContactsBook2Fill style={{ fontSize: '50px', color: 'rgb(0, 172, 105)' }} /> */}
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Order</p>
                      <CardTitle tag="p">{totalCountData?.order_count}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-calendar" /> Last day
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="4" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-cart-simple text-danger" />
                      {/* <BsCart2 style={{ fontSize: '50px', color: 'rgb(51, 102, 255)' }} /> */}
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Cart</p>
                      <CardTitle tag="p">{totalCountData?.cart_count}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-clock" /> In the last hour
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
{/* 
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Users Behavior</CardTitle>
                <p className="card-category">24 Hours performance</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={dashboard24HoursPerformanceChart.data}
                  options={dashboard24HoursPerformanceChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated 3 minutes ago
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row> */}

          <Row className="mt-3">
            <Col lg="12" md="6" sm="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Recent search</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table>
                    <thead className="text-primary">
                      <tr>
                        <th>Date</th>
                        <th>Criteria</th>
                      </tr>
                    </thead>
                    <tbody>
                    {recentData && recentData?.map((item, index) => (
                        <tr
                          key={index}>
                          <td>{item?.Created_Date}</td>
                          {item?.Search_Display?.map((x) => <td className="table-row" style={{ cursor: 'pointer' }} onClick={() => criteriaSearch(item)}>{x?.Filter}</td>)}
                        </tr>
                      ))}
                    
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-3">
          <Col lg="12" md="6" sm="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Save search</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive style={{overflow: 'none'}}>
                  <thead className="text-primary">
                    <tr>
                      <th>
                        
                      </th>
                      <th>
                        Date
                      </th>
                      <th>
                        Name
                      </th>
                      <th>
                        Criteria
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {saveSearchData?.map((item) => (
                      <tr>
                        <td style={{display: 'flex', gap: 5}}>
                          {/* <i className="fa fa-calendar" />
                          <i className="fa fa-trash" /> */}
                           <div onClick={() => editSaveSearch(item)}>
                          <CiEdit style={{ fontSize: '22px', color: 'green' }} />
                        </div>
                        <div onClick={() => deleteSaveSearch(item?.Id)}>
                          <MdDeleteForever style={{ fontSize: '22px', color: 'red' }} />
                        </div>
                        </td>
                        <td>{item?.Created_Date}</td>
                        <td>{item?.Name}</td>
                        {item?.Search_Display?.map((x) => (
                        <td
                          style={{ cursor: 'pointer' }}
                          onClick={() => criteriaSaveAndSearch(item)}
                        >
                          {x?.Filter}
                        </td>
                      ))}
                        <td>{item?.Criteria}</td>
                      </tr>
                    ))}
                  </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-3">
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Order History Summary</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                
                  <thead className="text-primary">
                    <tr>
                      <th>Order No</th>
                      <th>Date</th>
                      <th>Total Pcs</th>
                      <th>Total Cts</th>
                      <th>Total Value</th>

                    </tr>
                  </thead>
                  <tbody>
                  {orderHistoryData.slice(0, 10)?.map((item) => (
                      <tr>
                        <td className="table-row">{item?.Order_No}</td>
                        <td className="table-row">{item?.Order_Date}</td>
                        <td className="table-row">{item?.Pcs}</td>
                        <td className="table-row">{item?.Cts}</td>
                        <td className="table-row">{item?.Final_Amt}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>    
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated 3 minutes ago
                </div>
              </CardFooter>
            </Card>
          </Col>
            
          </Row>
   
      </div>
    </>
  );
}

export default Dashboard;
