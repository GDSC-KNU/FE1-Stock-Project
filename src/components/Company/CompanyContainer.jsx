import React, { useState, useEffect } from 'react';
import CompanyPresenter from './Company';
import { BASE_URL, PROFILE_URL, QUOTE_URL } from '../../lib/Api';
import { companyProfile, companyQuote } from './dummyData';
import axios from 'axios';

const STOCK_API_KEY = process.env.REACT_APP_STOCK_API_KEY;
const TICKER = 'AAPL';

const Company = () => {
	const [loading, setLoading] = useState(true);

	// console.log('LOADING:', loading);

	const getCompanyQuote = async () => {
		console.log('getCompanyQuote');
		try {
			const response = await axios.get(`${BASE_URL}${QUOTE_URL}/${TICKER}?apikey=${STOCK_API_KEY}`);
			setQuote(response.data[0]);
			// await setQuote(companyQuote[0]);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}

		console.log('getCompanyQuote END');
	};

	const getCompanyProfile = async () => {
		console.log('getCompanyProfile');
		try {
			const response = await axios.get(
				`${BASE_URL}${PROFILE_URL}/${TICKER}?apikey=${STOCK_API_KEY}`,
			);
			setProfile(response.data[0]);
			// await setProfile(companyProfile[0]);
			getCompanyQuote();
		} catch (error) {
			console.log(error);
		}
		console.log('getCompanyProfile END');
	};

	const [profile, setProfile] = useState();
	const [quote, setQuote] = useState();

	useEffect(() => {
		console.log('useEffect');
		getCompanyProfile();
		console.log('useEffect end');
	}, []);

	return (
		<>
			{loading ? <div>Now Loading...</div> : <CompanyPresenter profile={profile} quote={quote} />}
		</>
	);
};

export default Company;
