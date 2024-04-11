/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
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
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";

export const saveSearch = [
  {
    Date: "13-Jan-2024",
    Name: "test1",
    Criteria: "Shape: 20, Col: Regular, Criteria: IF,VVS1, Cts: 10",
  },
  {
    Date: "03-Jan-2024",
    Name: "test",
    Criteria: "Shape: 20, Col: Regular, Criteria: IF,VVS1, Cts: 10",
  },
  {
    Date: "28-Jan-2024",
    Name: "demo",
    Criteria: "Shape: 20, Col: Regular, Criteria: IF,VVS1, Cts: 10",
  },
  {
    Date: "28-Jan-2024",
    Name: "demo",
    Criteria: "Shape: 20, Col: Regular, Criteria: IF,VVS1, Cts: 10",
  },
  {
    Date: "28-Jan-2024",
    Name: "demo",
    Criteria: "Shape: 20, Col: Regular, Criteria: IF,VVS1, Cts: 10",
  },
];

const orderHistory = [
  {
    Date: '05-Jan-2024', orderNo: '1', totalPcs: 2000, totalCts: 1500, totalValue: 5000,
  },
  {
    Date: '24-Feb-2024', orderNo: '2', totalPcs: 2000, totalCts: 1500, totalValue: 5000,
  },
  {
    Date: '28-Jan-2024', orderNo: '3', totalPcs: 2000, totalCts: 1500, totalValue: 5000,
  },
  {
    Date: '05-Jan-2024', orderNo: '4', totalPcs: 2000, totalCts: 1500, totalValue: 5000,
  },
  {
    Date: '24-Feb-2024', orderNo: '5', totalPcs: 2000, totalCts: 1500, totalValue: 5000,
  },
  {
    Date: '28-Jan-2024', orderNo: '6', totalPcs: 2000, totalCts: 1500, totalValue: 5000,
  },
  {
    Date: '05-Jan-2024', orderNo: '7', totalPcs: 2000, totalCts: 1500, totalValue: 5000,
  },
  {
    Date: '24-Feb-2024', orderNo: '8', totalPcs: 2000, totalCts: 1500, totalValue: 5000,
  },
  {
    Date: '28-Jan-2024', orderNo: '9', totalPcs: 2000, totalCts: 1500, totalValue: 5000,
  },
  {
    Date: '28-Jan-2024', orderNo: '10', totalPcs: 2000, totalCts: 1500, totalValue: 5000,
  },
];
function Dashboard() {
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
                      <i className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Stones</p>
                      <CardTitle tag="p">150</CardTitle>
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
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Order</p>
                      <CardTitle tag="p">1,345</CardTitle>
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
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Cart</p>
                      <CardTitle tag="p">23</CardTitle>
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
          {/* <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Followers</p>
                      <CardTitle tag="p">+45K</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update now
                </div>
              </CardFooter>
            </Card>
          </Col> */}
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

        {/* <Row>
          <Col md="4">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Email Statistics</CardTitle>
                <p className="card-category">Last Campaign Performance</p>
              </CardHeader>
              <CardBody style={{ height: "266px" }}>
                <Pie
                  data={dashboardEmailStatisticsChart.data}
                  options={dashboardEmailStatisticsChart.options}
                />
              </CardBody>
              <CardFooter>
                <div className="legend">
                  <i className="fa fa-circle text-primary" /> Opened{" "}
                  <i className="fa fa-circle text-warning" /> Read{" "}
                  <i className="fa fa-circle text-danger" /> Deleted{" "}
                  <i className="fa fa-circle text-gray" /> Unopened
                </div>
                <hr />
                <div className="stats">
                  <i className="fa fa-calendar" /> Number of emails sent
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">NASDAQ: AAPL</CardTitle>
                <p className="card-category">Line Chart with Points</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={dashboardNASDAQChart.data}
                  options={dashboardNASDAQChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <div className="chart-legend">
                  <i className="fa fa-circle text-info" /> Tesla Model S{" "}
                  <i className="fa fa-circle text-warning" /> BMW 5 Series
                </div>
                <hr />
                <div className="card-stats">
                  <i className="fa fa-check" /> Data information certified
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row> */}

          <Row className="mt-3">
            <Col lg="12" md="6" sm="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Reset search</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>.</th>
                        <th>Date</th>
                        <th>Criteria</th>
                      </tr>
                    </thead>
                    <tbody>
                    {saveSearch?.map((item, index) => (
                        <tr
                          key={index}
                        >
                          <td style={{display: 'flex', gap: 5}}>
                            <i className="fa fa-calendar" />
                            <i className="fa fa-trash" />
                          </td>
                          <td>{item?.Date}</td>
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
                        .
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
                    {saveSearch?.map((item) => (
                      <tr>
                        <td style={{display: 'flex', gap: 5}}>
                          <i className="fa fa-calendar" />
                          <i className="fa fa-trash" />
                        </td>
                        <td>{item?.Date}</td>
                        <td>{item?.Name}</td>
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
                
              <thead>
                <tr>
                  <th className="table-header">Order No</th>
                  <th className="table-header">Date</th>
                  <th className="table-header">Total Pcs</th>
                  <th className="table-header">Total Cts</th>
                  <th className="table-header">Total Value</th>

                </tr>
              </thead>
              <tbody>
                {orderHistory.map((item) => (
                  <tr>
                    <td className="table-row">{item?.orderNo}</td>
                    <td className="table-row">{item?.Date}</td>
                    <td className="table-row">{item?.totalPcs}</td>
                    <td className="table-row">{item?.totalCts}</td>
                    <td className="table-row">{item?.totalValue}</td>
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
