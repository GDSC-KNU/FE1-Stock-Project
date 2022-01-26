import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL, search } from '../../lib/Api';

const useCompanySearch = (queryName, limitNumber) => {
	useEffect(() => {
		axios({
			method: 'GET',
			url: BASE_URL + search,
			parmas: {
				query: queryName,
				limit: limitNumber,
				exchange: 'NASDAQ',
				apiKey: process.env.REACT_APP_STOCK_API_KEY,
			},
		}).then(res => {
			console.log(res.data);
		});
	}, [queryName, limitNumber]);

	return null;
};

export default useCompanySearch;
