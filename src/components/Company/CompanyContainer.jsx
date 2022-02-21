import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CompanyPresenter from './Company';
import { BASE_URL, PROFILE_URL, QUOTE_URL } from '../../lib/Api';
import axios from 'axios';

const Company = () => {
	const [loading, setLoading] = useState(true);

	const { TICKER } = useParams();

	const getCompanyQuote = async () => {
		try {
			const response = await axios.get(`${BASE_URL}${QUOTE_URL}/${TICKER}`, {
				params: {
					apikey: process.env.REACT_APP_STOCK_API_KEY,
				},
			});
			setQuote(response.data[0]);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const getCompanyProfile = async () => {
		try {
			const response = await axios.get(`${BASE_URL}${PROFILE_URL}/${TICKER}`, {
				params: {
					apikey: process.env.REACT_APP_STOCK_API_KEY,
				},
			});
			setProfile(response.data[0]);
			getCompanyQuote();
		} catch (error) {
			console.log(error);
		}
	};

	const [profile, setProfile] = useState({
		symbol: 'LOAD',
		companyName: 'LOADING...',
		currency: 'USD',
		description: 'LOADING...',
		image: 'LOADING...',
	});

	const [quote, setQuote] = useState({
		symbol: '',
		name: '',
		price: 0,
		changesPercentage: 0,
		change: 0,
	});

	useEffect(() => {
		getCompanyProfile();
	}, []);

	return (
		<>
			{loading ? (
				<CompanyPresenter profile={profile} quote={quote} />
			) : (
				<CompanyPresenter profile={profile} quote={quote} />
			)}
		</>
	);
};

export default Company;
