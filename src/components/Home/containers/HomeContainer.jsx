import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Home from '../Home';
import {
	BASE_URL,
	historicalStockPrice,
	nasdaq100,
	nasdaqHistory,
	nasdaqIndex,
	stockPrice,
} from 'lib/Api';

const NASDAQDummy = [
	{
		symbol: '^IXIC',
		name: 'NASDAQ Composite',
		price: 14506.896,
		changesPercentage: -2.597441,
	},
];
const NASDAQ100Dummy = [
	{
		symbol: 'ATVI',
		name: 'Activision Blizzard',
		sector: 'Communication Services',
		subSector: 'Communication Services',
		headQuarter: 'Santa Monica, CALIFORNIA',
		dateFirstAdded: null,
		cik: '0000718877',
		founded: '1983-06-10',
	},
	{
		symbol: 'ADBE',
		name: 'Adobe',
		sector: 'Technology',
		subSector: 'Technology',
		headQuarter: 'San Jose, CALIFORNIA',
		dateFirstAdded: null,
		cik: '0000796343',
		founded: '1986-01-08',
	},
	{
		symbol: 'AMD',
		name: 'Advanced Micro Devices',
		sector: 'Technology',
		subSector: 'Technology',
		headQuarter: 'Santa Clara, CALIFORNIA',
		dateFirstAdded: null,
		cik: '0000002488',
		founded: '1979-10-15',
	},
	{
		symbol: 'ABNB',
		name: 'Airbnb',
		sector: 'Communication Services',
		subSector: 'Communication Services',
		headQuarter: 'San Francisco, CA',
		dateFirstAdded: null,
		cik: '0001559720',
		founded: '2020-12-10',
	},
	{
		symbol: 'ALGN',
		name: 'Align Technology',
		sector: 'Healthcare',
		subSector: 'Healthcare',
		headQuarter: 'San Jose, CALIFORNIA',
		dateFirstAdded: null,
		cik: '0001097149',
		founded: '2001-01-26',
	},
	{
		symbol: 'GOOGL',
		name: 'Alphabet (Class A)',
		sector: 'Communication Services',
		subSector: 'Communication Services',
		headQuarter: 'Mountain View, CALIFORNIA',
		dateFirstAdded: null,
		cik: '0001652044',
		founded: '2004-08-19',
	},
	{
		symbol: 'GOOG',
		name: 'Alphabet (Class C)',
		sector: 'Communication Services',
		subSector: 'Communication Services',
		headQuarter: 'Mountain View, CA',
		dateFirstAdded: null,
		cik: '0001652044',
		founded: '2004-08-19',
	},
	{
		symbol: 'AMZN',
		name: 'Amazon',
		sector: 'Consumer Cyclical',
		subSector: 'Consumer Cyclical',
		headQuarter: 'Seattle, WASHINGTON',
		dateFirstAdded: null,
		cik: '0001018724',
		founded: '1997-05-01',
	},
	{
		symbol: 'AEP',
		name: 'American Electric Power',
		sector: 'Utilities',
		subSector: 'Utilities',
		headQuarter: 'Columbus, OHIO',
		dateFirstAdded: null,
		cik: '0000004904',
		founded: '1949-09-01',
	},
	{
		symbol: 'AMGN',
		name: 'Amgen',
		sector: 'Healthcare',
		subSector: 'Healthcare',
		headQuarter: 'Thousand Oaks, CALIFORNIA',
		dateFirstAdded: null,
		cik: '0000318154',
		founded: '1987-05-01',
	},
	{
		symbol: 'ADI',
		name: 'Analog Devices',
		sector: 'Technology',
		subSector: 'Technology',
		headQuarter: 'Norwood, MASSACHUSETTS',
		dateFirstAdded: null,
		cik: '0000006281',
		founded: '1979-04-03',
	},
];

const NASDAQHistoryDummy = {
	symbol: '^GSPC',
	historical: [
		{
			date: '2022-01-19',
			open: 4588.029785,
			high: 4611.549805,
			low: 4530.200195,
			close: 4532.759766,
			adjClose: 4532.759766,
			volume: 2.483432e9,
			unadjustedVolume: 2.483432e9,
			change: -55.27002,
			changePercent: -1.205,
			vwap: 4558.16992,
			label: 'January 19, 22',
			changeOverTime: -0.01205,
		},
		{
			date: '2022-01-18',
			open: 4632.240234,
			high: 4632.240234,
			low: 4568.700195,
			close: 4577.109863,
			adjClose: 4577.109863,
			volume: 3.32496e9,
			unadjustedVolume: 3.32496e9,
			change: -55.13037,
			changePercent: -1.19,
			vwap: 4592.68343,
			label: 'January 18, 22',
			changeOverTime: -0.0119,
		},
		{
			date: '2022-01-14',
			open: 4637.990234,
			high: 4665.129883,
			low: 4614.75,
			close: 4662.850098,
			adjClose: 4662.850098,
			volume: 3.48353e9,
			unadjustedVolume: 3.48353e9,
			change: 24.85986,
			changePercent: 0.536,
			vwap: 4647.57666,
			label: 'January 14, 22',
			changeOverTime: 0.00536,
		},
		{
			date: '2022-01-13',
			open: 4733.560059,
			high: 4744.129883,
			low: 4650.290039,
			close: 4659.029785,
			adjClose: 4659.029785,
			volume: 3.53983e9,
			unadjustedVolume: 3.53983e9,
			change: -74.53027,
			changePercent: -1.575,
			vwap: 4684.48324,
			label: 'January 13, 22',
			changeOverTime: -0.01575,
		},
		{
			date: '2022-01-12',
			open: 4728.589844,
			high: 4748.830078,
			low: 4706.709961,
			close: 4726.350098,
			adjClose: 4726.350098,
			volume: 3.06004e9,
			unadjustedVolume: 3.06004e9,
			change: -2.23975,
			changePercent: -0.047,
			vwap: 4727.29671,
			label: 'January 12, 22',
			changeOverTime: -4.7e-4,
		},
		{
			date: '2022-01-11',
			open: 4669.140137,
			high: 4714.129883,
			low: 4638.27002,
			close: 4713.069824,
			adjClose: 4713.069824,
			volume: 3.4216e9,
			unadjustedVolume: 3.4216e9,
			change: 43.92969,
			changePercent: 0.941,
			vwap: 4688.48991,
			label: 'January 11, 22',
			changeOverTime: 0.00941,
		},
		{
			date: '2022-01-10',
			open: 4655.339844,
			high: 4673.02002,
			low: 4582.240234,
			close: 4670.290039,
			adjClose: 4670.290039,
			volume: 3.6218e9,
			unadjustedVolume: 3.6218e9,
			change: 14.9502,
			changePercent: 0.321,
			vwap: 4641.8501,
			label: 'January 10, 22',
			changeOverTime: 0.00321,
		},
		{
			date: '2022-01-07',
			open: 4697.660156,
			high: 4707.950195,
			low: 4662.740234,
			close: 4677.029785,
			adjClose: 4677.029785,
			volume: 3.27987e9,
			unadjustedVolume: 3.27987e9,
			change: -20.63037,
			changePercent: -0.439,
			vwap: 4682.5734,
			label: 'January 07, 22',
			changeOverTime: -0.00439,
		},
	],
};

const priceHistoryDummy = [
	{
		symbol: 'AAPL',
		historical: [
			{
				date: '2022-01-20',
				open: 166.98,
				high: 169.64,
				low: 164.23,
				close: 164.51,
				adjClose: 164.51,
				volume: 9.0212549e7,
				unadjustedVolume: 9.0212549e7,
				change: -2.47,
				changePercent: -1.479,
				vwap: 166.12667,
				label: 'January 20, 22',
				changeOverTime: -0.01479,
			},
			{
				date: '2022-01-19',
				open: 170.0,
				high: 171.08,
				low: 165.94,
				close: 166.23,
				adjClose: 166.23,
				volume: 9.4481247e7,
				unadjustedVolume: 9.4481247e7,
				change: -3.77,
				changePercent: -2.218,
				vwap: 167.75,
				label: 'January 19, 22',
				changeOverTime: -0.02218,
			},
		],
	},
];

const currentPriceDummy = [
	{
		symbol: 'AAPL',
		price: 164.51,
		volume: 91420515,
	},
];

const HomeContainer = () => {
	const [isChartLoading, setIsChartLoading] = useState(true);
	const [isListLoading, setIsListLoading] = useState(false);
	const [buttonSelected, setButtonSelected] = useState(0);
	const [NASDAQInfo, setNASDAQInfo] = useState([]);
	const [NASDAQ100, setNASDAQ100] = useState([]);
	const [NASDAQHistory, setNASDAQHistory] = useState([]);
	const [itemList, setItemList] = useState([]);

	const getNASDAQInfo = useCallback(async () => {
		const response = await axios.get(
			`${BASE_URL}${nasdaqIndex}?apikey=${process.env.REACT_APP_STOCK_API_KEY}`,
		);
		setNASDAQInfo(response.data);
		// await new Promise(res => setTimeout(res, 500));
		// setNASDAQInfo([2]);
		console.log('getNASDAQInfo complete');
	}, []);
	const getNASDAQ100 = async () => {
		const response = await axios.get(
			`${BASE_URL}${nasdaq100}?apikey=${process.env.REACT_APP_STOCK_API_KEY}`,
		);
		setNASDAQ100(response.data);
	};
	const getNASDAQHistory = async () => {
		const historyList = ['1min', '5min', '15min', '30min', '1hour', '4hour'];
		console.log(
			`${BASE_URL}${nasdaqHistory[historyList[buttonSelected]]}?apikey=${
				process.env.REACT_APP_STOCK_API_KEY
			}`,
		);
		// setNASDAQHistory(priceHistoryDummy[0]);
		const response = await axios.get(
			`${BASE_URL}${nasdaqHistory[historyList[buttonSelected]]}?apikey=${
				process.env.REACT_APP_STOCK_API_KEY
			}`,
		);
		console.log('nasdaqhistroy', response.data);
		setNASDAQHistory(response.data);
	};
	const getPriceDelta = async code => {
		const response = await axios.get(
			`${BASE_URL}${historicalStockPrice}/${code}?apikey=${process.env.REACT_APP_STOCK_API_KEY}`,
		);
		return response.data.historical[0].changePercent;
		// return priceHistoryDummy[0].historical[0].changePercent;
	};
	const getCurrentPrice = async code => {
		const response = await axios.get(
			`${BASE_URL}${stockPrice}/${code}?apikey=${process.env.REACT_APP_STOCK_API_KEY}`,
		);
		return response.data[0].price;
		// return currentPriceDummy[0].price;
	};

	const getMoreItem = async () => {
		if (itemList.length >= NASDAQ100.length || isListLoading) return;
		setIsListLoading(prev => !prev);
		await new Promise(resolve => setTimeout(resolve, 500));
		NASDAQ100.slice(itemList.length, itemList.length + 5).map(item => {
			setItemList(prev =>
				prev.concat({
					symbol: item.symbol,
					// percentDelta: await getPriceDelta(item.symbol),
					// price: await getCurrentPrice(item.symbol),
				}),
			);
		});
		console.log('nasdaq100', NASDAQ100);
		setIsListLoading(prev => !prev);
	};

	useEffect(() => {
		getNASDAQInfo();
		getNASDAQ100();
		getNASDAQHistory();
	}, [buttonSelected]);

	useEffect(() => {
		console.log('nasdaqinfo', NASDAQInfo);
		console.log('nasdaq100', NASDAQ100);
		console.log('nasdaqhistory', NASDAQHistory);
		if (NASDAQInfo.length && NASDAQ100.length && NASDAQHistory) {
			setIsChartLoading(false);
			console.log('set to false');
		}
	}, [NASDAQInfo, NASDAQ100, NASDAQHistory]);

	return (
		<Home
			isChartLoading={isChartLoading}
			isListLoading={isListLoading}
			buttonSelected={buttonSelected}
			setButtonSelected={setButtonSelected}
			NASDAQInfo={NASDAQInfo}
			NASDAQHistory={NASDAQHistory}
			itemList={itemList}
			getMoreItem={getMoreItem}
			setIsListLoading={setIsListLoading}
		/>
	);
};

export default HomeContainer;
