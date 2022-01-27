import React, { useState, useEffect } from 'react';
import CompanyPresenter from './Company';
import { BASE_URL, PROFILE_URL, QUOTE_URL } from '../../lib/Api';
import axios from 'axios';
import { companyProfile, companyQuote } from './dummyData';

const TICKER = 'AAPL';

const Company = () => {
	const [loading, setLoading] = useState(true);

	const getCompanyQuote = async () => {
		try {
			// const response = await axios.get(`${BASE_URL}${QUOTE_URL}/${TICKER}`, {
			// 	params: {
			// 		apikey: process.env.REACT_APP_STOCK_API_KEY,
			// 	},
			// });
			// setQuote(response.data[0]);
			await setQuote(companyQuote[0]);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const getCompanyProfile = async () => {
		try {
			// const response = await axios.get(`${BASE_URL}${PROFILE_URL}/${TICKER}`, {
			// 	params: {
			// 		apikey: process.env.REACT_APP_STOCK_API_KEY,
			// 	},
			// });
			// setProfile(response.data[0]);
			await setProfile(companyProfile[0]);
			getCompanyQuote();
		} catch (error) {
			console.log(error);
		}
	};

	const [profile, setProfile] = useState();
	const [quote, setQuote] = useState();

	useEffect(() => {
		getCompanyProfile();
	}, []);

	return (
		<>
			{loading ? <div>Now Loading...</div> : <CompanyPresenter profile={profile} quote={quote} />}
		</>
	);
};

export default Company;
