import React, { useState, useEffect } from 'react';
import { Form, InputNumber, Button, Row, Col, message, Input, Divider } from 'antd';
import axios from 'axios';

import config from '../common/config';

export default function UpdateConversion() {

  const [currencyConversions, setCurrencyConversions] = useState([]);

  const getConversionData = () => {
    console.log('API CALLL');
    
    axios({ method: 'get', url: `${config.baseUrl}/currencyConversions` })
      .then(values => {
        setCurrencyConversions(values.data);
      })
      .catch(error => {
        console.error(error.message)
      });
  }

  useEffect(() => {
    getConversionData();
  }, []);

  function onFinish(id, values) {
    axios({ method: 'PUT', url: `${config.baseUrl}/currencyConversions/${id}`, data: values, headers: { 'content-type': 'application/json' } })
      .then(function (response) {
        message.success('Currency conversion Added successfully', 1.5);
      })
      .catch(function (error) {
        message.error('Something went wrong, couldn\'t update conversion ');
      });
  }

  function handleDeleteConversion(conversionToDelete) {
    axios({ method: 'DELETE', url: `${config.baseUrl}/currencyConversions/${conversionToDelete}`, headers: { 'content-type': 'application/json' } })
      .then(function (response) {
        message.success('Conversion deleted successfully', 1.5);
        getConversionData()
      })
      .catch(function (error) {
        message.error('Something went wrong, couldn\'t delete conversion ');
      });
  }

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
        <h2>Update a Conversion Rate</h2>
        {
          currencyConversions.map(currencyConversion => {
            return <Form
              key={currencyConversion.id}
              {...layout}
              name={`updateConversion-${currencyConversion.id}`}
              onFinish={onFinish.bind(this, currencyConversion.id)}
              initialValues={{
                id: currencyConversion.id,
                base: currencyConversion.base,
                target: currencyConversion.target,
                rate: currencyConversion.rate,
              }}
            >
              <Form.Item
                label="Base Curency"
                name="base"
              >
                <Input value={currencyConversion.base} defaultValue={currencyConversion.base} disabled={true} />
              </Form.Item>

              <Form.Item
                label="Target Currency"
                name="target"
              >
                <Input value={currencyConversion.target} defaultValue={currencyConversion.target} disabled={true} />
              </Form.Item>

              <Form.Item
                label="Rate"
                name="rate"
                rules={[{ required: true, message: 'Please select the base currency' }]}
              >
                <InputNumber className='full-width' value={currencyConversion.rate} defaultValue={currencyConversion.rate} />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button style={{ marginRight: '8px' }} type="primary" htmlType="submit">
                  Update
                </Button>
                <Button danger htmlType="button" onClick={handleDeleteConversion.bind(this, currencyConversion.id)} >
                  Delete
                </Button>
              </Form.Item>

              <Divider />
            </Form>
          })

        }
      </Col>
    </Row>
  )
}