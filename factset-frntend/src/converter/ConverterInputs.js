import React, { useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, InputNumber, Select, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { uniqBy, find, filter } from 'lodash';

const { Option } = Select;
const { Paragraph } = Typography;


export default function ConverterInputs(props) {

    const { t } = useTranslation();
    const { currencyConversions, currencies } = props;
    const [baseCurrency, setBaseCurrency] = useState('EUR')
    const [targetCurrency, setTargetCurrency] = useState('')
    const [amount, setAmount] = useState(1)

    function handleBaseCurrency(value) {
        setTargetCurrency('');
        setBaseCurrency(value);
    }

    function handleTargetCurrency(value) {
        setTargetCurrency(value);
    }
    function handleAmountInput(value) {
        setAmount(value)
    }
    /**
     * Gives a unique array of base currencies from the currencyConversions collection 
     * @returns {array} - ['EUR', 'USD'...]
     */
    const uniqueCurrencies = () => {
        const FIELD = 'base';
        const uniqueBaseCurrencies = uniqBy(currencyConversions, FIELD);
        return uniqueBaseCurrencies.map(currency => currency[FIELD]);
    }

    /**
     * map currency shortName to currency infos
     * @param {String} baseCurrencyShortName
     * @returns {object} - {id:string, name:string, shortName:string, sign:string}
     */
    const currencyInfoMap = (baseCurrencyShortName) => {
        return find(currencies, { shortName: baseCurrencyShortName })
    }

    /**
     * preload target currencies related to base
     * @returns {array} - ['EUR', 'USD'...]
     */
    const availableTargetCurrencies = () => {
        const targetCurrencies = filter(currencyConversions, { 'base': baseCurrency });
        return targetCurrencies.map(currency => currency.target)
    }

    /**
     * Calculate currency rate
     */
    const calculateCurencyRate = () => {
        const conversion = find(currencyConversions, { 'base': baseCurrency, 'target': targetCurrency });
        return (conversion.rate * amount).toFixed(5);
    }

    return (
        <Fragment>
            <Row align="middle" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={3} offset={1}>
                    {t('converter:Amount')}
                    <InputNumber className='full-width' size="large" min={1} defaultValue={1} onChange={handleAmountInput} />
                </Col>

                <Col className="gutter-row" span={3}>
                    {t('converter:From')}
                    <Select
                        showSearch
                        className='full-width'
                        placeholder="Select Base currency"
                        optionFilterProp="children"
                        defaultValue={baseCurrency}
                        onChange={handleBaseCurrency}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {
                            uniqueCurrencies().map(uniqueBaseCurrency => {
                                let currencyInfo = currencyInfoMap(uniqueBaseCurrency);
                                let currencyFullName = currencyInfo.name;
                                let currencySign = currencyInfo.sign;
                                return <Option value={uniqueBaseCurrency}>
                                    {currencyFullName ? `${currencyFullName} (${currencySign})` : uniqueBaseCurrency}
                                </Option>
                            })
                        }
                    </Select>
                </Col>

                <Col className="gutter-row" span={1} className='arrow-style' >
                    <ArrowRightOutlined />
                </Col>

                <Col span={3}>
                    {t('converter:To')}
                    <Select
                        showSearch
                        className='full-width'
                        optionFilterProp="children"
                        value={targetCurrency}
                        onChange={handleTargetCurrency}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <option value="" disabled>Select target currency</option>
                        {
                            availableTargetCurrencies().map(targetCurrency => {
                                let currencyInfo = currencyInfoMap(targetCurrency);
                                let currencyFullName = currencyInfo.name;
                                let currencySign = currencyInfo.sign;
                                return <Option value={targetCurrency}>
                                    {currencyFullName ? `${currencyFullName} (${currencySign})` : targetCurrency}
                                </Option>
                            })
                        }
                    </Select>
                </Col>
            </Row>
            <br />
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row center-text" span={12} >
                    {
                        targetCurrency !== '' ?
                            <div>
                                {amount} {baseCurrency} =
                                <Paragraph>
                                    <h2 >{calculateCurencyRate()} <span> {targetCurrency}</span></h2>
                                </Paragraph>
                            </div>
                            :
                            null
                    }
                </Col>

            </Row>
        </Fragment>

    )
}