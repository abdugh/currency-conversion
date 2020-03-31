import React from 'react';
import { Form, InputNumber, Button, Row, Col, message, Select } from 'antd';
import axios from 'axios';
import { find } from 'lodash';

import config from '../common/config';
import useData from '../common/useData';

const { Option } = Select;

export default function AddConversion() {
    const [form] = Form.useForm();
    const { currencies, currencyConversions } = useData();

    /**
     * check if the conversion already exists in the db
     * @param  {string} shortNameValue
     */
    const isExistingConversion = (base, target) => {
        console.log(currencyConversions, { base, target });

        if (find(currencyConversions, { base, target })) {
            return true;
        }
        return false;
    }

    const onFinish = values => {

        axios({ method: 'POST', url: `${config.baseUrl}/currencyConversions`, data: values, headers: { 'content-type': 'application/json' } })
            .then(function (response) {
                message.success('Currency conversion Added successfully', 1.5);
                form.resetFields();
            })
            .catch(function (error) {
                message.error('Something went wrong');
            });
        //make the api call post
    };

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    return (
        <Row align="middle">
            <Col span={6} offset={2}>
                <h2>Add a Conversion Rate</h2>
                <Form
                    {...layout}
                    name="addConversion"
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        label="Base Curency"
                        name="base"
                        rules={[{ required: true, message: 'Please select the base currency' }]}
                    >
                        <Select
                            showSearch
                            className='full-width'
                            placeholder="Select Base currency"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                currencies.map(baseCurrency => {
                                    return <Option value={baseCurrency.shortName}> {baseCurrency.shortName}  </Option>
                                })
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Target Currency"
                        name="target"
                        rules={[
                            { required: true, message: 'Please select the target currency' },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    let baseValue = getFieldValue('base');
                                    let targetValue = value;
                                    if (!value || (!isExistingConversion(baseValue, targetValue) && baseValue !== targetValue)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('The Conversion already exists or can\'t be done !');
                                },
                            })
                        ]}
                    >
                        <Select
                            showSearch
                            className='full-width'
                            placeholder="Select Target currency"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                currencies.map(targetCurrency => {
                                    return <Option value={targetCurrency.shortName}> {targetCurrency.shortName}  </Option>
                                })
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Rate"
                        name="rate"
                        rules={[{ required: true, message: 'Please input the currency sign!' }]}
                    >
                        <InputNumber className='full-width' min={0} placeholder="Insert currency rate"/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

            </Col>
        </Row>
    )
}