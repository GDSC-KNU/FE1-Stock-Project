import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL, search, profile } from '../../../lib/Api';

const useCompanySearch = (queryName, limitNumber, setCompanies, setLoading) => {
	const getCompany = async () => {
		const res = await axios.get(BASE_URL + search, {
			params: { query: queryName, exchange: 'NASDAQ', apikey: process.env.REACT_APP_STOCK_API_KEY },
		});
		console.log(res.data);
		return res.data[0].symbol;
	};

	const getCompanyPrice = async symbol => {
		const res = await axios.get(BASE_URL + profile + '/' + symbol, {
			params: { apikey: process.env.REACT_APP_STOCK_API_KEY },
		});
		console.log(res.data);
		setCompanies(res.data);
		setLoading(false);
	};

	useEffect(() => {
		const getSearchList = async () => {
			const symbol = await getCompany();
			console.log('symbol: ', symbol);
			getCompanyPrice(symbol);
		};

		getSearchList();
	}, [queryName, limitNumber]);

	return null;
};

export default useCompanySearch;
