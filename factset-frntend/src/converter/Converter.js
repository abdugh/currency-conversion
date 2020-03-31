import React from 'react';
import { Layout, Breadcrumb } from 'antd';

import useData from '../common/useData';
import ConverterInputs from './ConverterInputs';
import Navbar from '../common/Navbar';
import PageFooter from '../common/PageFooter';
import './converter.css';

const { Content } = Layout;

export default function Converter(props) {

    const { currencies, currencyConversions } = useData();
    const {minimal} = props

    return (
        <Layout className="layout">
            { !minimal?  <Navbar /> : null }
            <Content className='page-content'>
                <Breadcrumb className='page-breadcrumb' />
                <div className="site-layout-content">
                    <ConverterInputs
                        currencyConversions={currencyConversions}
                        currencies={currencies}
                    />
                </div>
            </Content>
            { !minimal?  <PageFooter /> : null }

            
        </Layout>
    )
}