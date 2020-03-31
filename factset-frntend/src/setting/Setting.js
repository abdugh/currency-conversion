import React, { useState } from 'react';
import { Layout, Breadcrumb, Menu, Row } from 'antd';

import Navbar from '../common/Navbar';
//import PageFooter from '../common/PageFooter';
import AddCurrency from './AddCurrency';
import AddConversion from './AddConversion';
import UpdateConversion from './UpdateConversion';

const { Content } = Layout;
const ADD_CURRENCY = 'add_currency';
const ADD_CONVERSION = 'add_conversion';
const UPDATE_CONVERSION = 'update_conversion';

export default function Setting() {
    const [currentTab, setCurrentTab] = useState(ADD_CURRENCY)

    const handleClick = e => {
        setCurrentTab(e.key)
    };
    const renderSetting = () => {
        switch (currentTab) {
            case ADD_CURRENCY:
                return <AddCurrency />
            case ADD_CONVERSION:
                return <AddConversion />
            case UPDATE_CONVERSION:
                return <UpdateConversion />
            default:
                break;
        }
    }
    return (
        <Layout className='layout'>
            <Navbar />
            <Content className='page-content'>
                <Breadcrumb className='page-breadcrumb' />
                <div className='site-layout-content'>
                    <Row align='middle' justify='center'>
                        <Menu onClick={handleClick} selectedKeys={[currentTab]} mode='horizontal'>
                            <Menu.Item key={ADD_CURRENCY}>
                                Add Currency
                            </Menu.Item>
                            <Menu.Item key={ADD_CONVERSION}>
                                Add Conversion
                            </Menu.Item>
                            <Menu.Item key={UPDATE_CONVERSION}>
                                Update Conversion
                            </Menu.Item>
                        </Menu>
                    </Row>
                    {renderSetting()}
                </div>
            </Content>
        </Layout>
    )
}