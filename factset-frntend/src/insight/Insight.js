import React, { useEffect, useState } from 'react';
import { Layout, Breadcrumb, Row, Col, Select, Input } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import axios from 'axios';

import Navbar from '../common/Navbar';
import PageFooter from '../common/PageFooter';
import config from '../common/config';

const { Content } = Layout;

const CURRENCIES =['AUD','CAD', 'CHF', 'JPY', 'USD']

const { Option } = Select;
export default function Insight() {
    const [firstSelectedCurrency, setFirstSelectedCurrency] = useState('USD');
    const [secondSelectedCurrency, setSecondSelectedCurrency] = useState('CAD');
    const [cleanedChartData, setCleanedChartData] = useState([])
    useEffect(() => {
        axios({ 
            method: 'get', 
            url: `${config.baseUrl}/timeCurrency`
        })
        .then(values => {
           setCleanedChartData(prepareData(values.data))
        })
        .catch(error => {
            console.error(error.message)
        });
    }, [firstSelectedCurrency, secondSelectedCurrency]);


    const prepareData = (data) =>{
        let cleanedData = [];
        data.map(object=>{
            let point = {name:object.date, [firstSelectedCurrency]:object.rates[firstSelectedCurrency], [secondSelectedCurrency]:object.rates[secondSelectedCurrency]  };
            cleanedData.push(point);
            point = {};
        })
        return cleanedData
    }

    const handleCurrencyChange = (value) =>{ setFirstSelectedCurrency (value) }
    const handleSecondCurrencyChange = (value) =>{ setSecondSelectedCurrency (value) }

    return (
        <Layout className="layout">
            <Navbar />
            <Content className='page-content'>
                <Breadcrumb className='page-breadcrumb' />
                <div className="site-layout-content">
                    <Row align="middle" >
                        <Col offset={2} span={10}>
                            <h2>Compare Euro to currencies</h2>
                            <br />
                            <Row justify='center' gutter={16}>
                                <Col span={8} >
                                <Input defaultValue='EUR' disabled />

                                </Col>
                                <Col span={8}>
                                <Select
                                        showSearch
                                        className='full-width'
                                        defaultValue={secondSelectedCurrency}
                                        onChange={handleCurrencyChange}
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {
                                            CURRENCIES.map((currency) => {
                                                return <Option key={currency} value={currency}> {currency}  </Option>
                                            })
                                        }
                                    </Select>
                                </Col>

                                <Col span={8}>
                                <Select
                                        showSearch
                                        className='full-width'
                                        defaultValue={firstSelectedCurrency}
                                        onChange={handleSecondCurrencyChange}
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {
                                            CURRENCIES.map((currency,i) => {
                                                return <Option key={i} value={currency}> {currency}  </Option>
                                            })
                                        }
                                    </Select>
                                </Col>

                            </Row>
                            <br/>
                            <LineChart
                                width={800}
                                height={400}
                                data={cleanedChartData}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name">
                                    <Label value="Date" offset={0} position="insideBottom" />
                                </XAxis>
                                <YAxis >
                                    <Label value="Euro (€)" angle={-90} position="insideLeft" />
                                </YAxis>
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey={firstSelectedCurrency} stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey={secondSelectedCurrency} stroke="#82ca9d" />
                            </LineChart>
                        </Col>
                    </Row>
                </div>
            </Content>

            <PageFooter />
        </Layout>
    )
}
