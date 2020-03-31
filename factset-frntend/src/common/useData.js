import { useState, useEffect } from 'react';
import axios from 'axios';
import config from './config';

export default function useData() {
    const [currencyConversionData, setcurrencyConversionData] = useState({
        currencies: [],
        currencyConversions: []
    });

    useEffect(() => {
        let getCurrencies = axios({ method: 'get', url: `${config.baseUrl}/currencies` });
        let getCurrencyConversions = axios({ method: 'get', url: `${config.baseUrl}/currencyConversions` });
        Promise.all([getCurrencies, getCurrencyConversions])
            .then(values => {
                let currencies = (values[0].data);
                let currencyConversions = (values[1].data);
                setcurrencyConversionData({
                    currencies,
                    currencyConversions
                })
            })
            .catch(error => {
                console.error(error.message)
            });
    }, []);

    return currencyConversionData;
}