import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL, search } from '../../../lib/Api';

const useCompanySearch = (queryName, limitNumber) => {
	useEffect(() => {
		axios({
			method: 'GET',
			url: BASE_URL + search,
			params: {
				query: queryName,
				limit: limitNumber,
				exchange: 'NASDAQ',
				apikey: process.env.REACT_APP_STOCK_API_KEY,
			},
		})
			.then(res => {
				console.log(res.data);
			})
			.catch(e => {
				console.log(e);
			});
	}, [queryName, limitNumber]);

	return null;
};

export default useCompanySearch;
