import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import axios from 'axios';
import { find } from 'lodash';

import config from '../common/config';

export default function AddCurrency() {
    const [form] = Form.useForm();
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        axios({ method: 'get', url: `${config.baseUrl}/currencies` })
            .then(values => {
                setCurrencies(values.data);
            })
            .catch(error => {
                console.error(error.message)
            });
    }, []);

    /**
     * check if the short name exists in the currency
     * @param  {string} shortNameValue
     */
    const isShortNameUsed = (shortNameValue) =>{
        if (find(currencies, { shortName: shortNameValue })){
            return true;
        }
        return false;
    }

    const onFinish = values => {
       
        axios({method:'POST', url:`${config.baseUrl}/currencies`, data: values, headers:{'content-type': 'application/json'}})
          .then(function (response) {
            message.success('Currency Added successfully', 1.5);
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
            <Col offset={2}>
                <h2>Add a Currency</h2>
                <Form
                    {...layout}
                    name="addCurrency"
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the currency name!' }]}
                    >
                        <Input placeholder="example: Euro" />
                    </Form.Item>

                    <Form.Item
                        label="Short Name"
                        name="shortName"
                        rules={[
                            { required: true, message: 'Please input the currency short name!' },
                            () => ({
                                validator(rule, value) {
                                  if (!value || !isShortNameUsed(value)) {
                                    return Promise.resolve();
                                  }
                    
                                  return Promise.reject('The currency already exists!');
                                },
                              })
                        ]}
                    >
                        <Input placeholder="example: EUR" />
                    </Form.Item>

                    <Form.Item
                        label="Sign"
                        name="sign"
                        rules={[{ required: true, message: 'Please input the currency sign!' }]}
                    >
                        <Input placeholder="example: €" />
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