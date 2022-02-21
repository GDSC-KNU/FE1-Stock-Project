import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StockChart from './StockChart';
import axios from 'axios';
import { BASE_URL, STOCK_1M_URL, STOCK_30M_URL, STOCK_4H_URL, STOCK_1D_URL } from '../../lib/Api';

const StockChartContainer = () => {
	const { TICKER } = useParams();
	const TODAY = new Date();
	const TODAY_STRING = `${TODAY.getFullYear()}-${(TODAY.getMonth() + 1)
		.toString()
		.padStart(2, '0')}-${(TODAY.getDate() - 1).toString().padStart(2, '0')}`;

	const getStockHistory1M = async () => {
		try {
			const response = await axios.get(`${BASE_URL}${STOCK_1M_URL}/${TICKER}`, {
				params: {
					from: TODAY_STRING,
					to: TODAY_STRING,
					apikey: process.env.REACT_APP_STOCK_API_KEY,
				},
			});

			const todayChart = response.data.reverse();

			const candleInfo = todayChart.map(({ date, open, low, high, close }) => ({
				x:
					new Date(date).getHours().toString().padStart(2, '0') +
					':' +
					new Date(date).getMinutes().toString().padStart(2, '0'),
				y: [open, high, low, close],
			}));

			const candleSeries = [
				{
					data: candleInfo,
				},
			];

			setStockHistory(candleSeries);
			setChartLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const getStockHistory30M = async () => {
		const BEFORE_STRING = `${TODAY.getFullYear()}-${(TODAY.getMonth() + 1)
			.toString()
			.padStart(2, '0')}-${(TODAY.getDate() - 1 + 7).toString().padStart(2, '0')}`;

		try {
			const response = await axios.get(`${BASE_URL}${STOCK_30M_URL}/${TICKER}`, {
				params: {
					from: BEFORE_STRING,
					to: TODAY_STRING,
					apikey: process.env.REACT_APP_STOCK_API_KEY,
				},
			});

			const weekChart = response.data.slice(0, 70).reverse();

			const candleInfo = weekChart.map(({ date, open, low, high, close }) => ({
				x:
					(new Date(date).getMonth() + 1).toString() +
					'/' +
					new Date(date).getDate().toString() +
					' ' +
					new Date(date).getHours().toString().padStart(2, '0') +
					':' +
					new Date(date).getMinutes().toString().padStart(2, '0'),
				y: [open, high, low, close],
			}));

			const candleSeries = [
				{
					data: candleInfo,
				},
			];

			setStockHistory(candleSeries);
			setChartLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const getStockHistory4H = async () => {
		const BEFORE_STRING = `${TODAY.getFullYear()}-${
			TODAY.getMonth() != 0 ? TODAY.getMonth().toString().padStart(2, '0') : 12
		}-${(TODAY.getDate() - 1).toString().padStart(2, '0')}`;

		try {
			const response = await axios.get(`${BASE_URL}${STOCK_4H_URL}/${TICKER}`, {
				params: {
					from: BEFORE_STRING,
					to: TODAY_STRING,
					apikey: process.env.REACT_APP_STOCK_API_KEY,
				},
			});

			const monthChart = response.data.reverse();

			const candleInfo = monthChart.map(({ date, open, low, high, close }) => ({
				x:
					(new Date(date).getMonth() + 1).toString() +
					'/' +
					new Date(date).getDate().toString() +
					' ' +
					new Date(date).getHours().toString().padStart(2, '0') +
					':' +
					new Date(date).getMinutes().toString().padStart(2, '0'),
				y: [open, high, low, close],
				y: [open, high, low, close],
			}));

			const candleSeries = [
				{
					data: candleInfo,
				},
			];

			setStockHistory(candleSeries);
			setChartLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const getStockHistory1D = async () => {
		const BEFORE_STRING = `${TODAY.getFullYear() - 1}-${(TODAY.getMonth() + 1)
			.toString()
			.padStart(2, '0')}-${(TODAY.getDate() - 1).toString().padStart(2, '0')}`;

		try {
			const response = await axios.get(`${BASE_URL}${STOCK_1D_URL}/${TICKER}`, {
				params: {
					from: BEFORE_STRING,
					to: TODAY_STRING,
					apikey: process.env.REACT_APP_STOCK_API_KEY,
				},
			});

			const yearChart = response.data.historical.reverse();

			const candleInfo = yearChart.map(({ date, open, low, high, close }) => ({
				x: (new Date(date).getMonth() + 1).toString() + '/' + new Date(date).getDate().toString(),
				y: [open, high, low, close],
			}));

			const candleSeries = [
				{
					data: candleInfo,
				},
			];

			setStockHistory(candleSeries);
			setChartLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getStockHistory1M();
	}, []);

	const [stockHistory, setStockHistory] = useState([]);
	const [chartLoading, setChartLoading] = useState(true);

	const chartChange = event => {
		switch (event.target.value) {
			case '1day':
				getStockHistory1M();
				break;
			case '5day':
				getStockHistory30M();
				break;
			case '1month':
				getStockHistory4H();
				break;
			case '1year':
				getStockHistory1D();
				break;
		}
	};

	const candleOptions = {
		plotOptions: {
			candlestick: {
				colors: {
					upward: '#e64747',
					downward: '#3861e8',
				},
				wick: {
					useFillColor: true,
				},
			},
		},
		chart: {
			type: 'candlestick',
			animations: {
				enabled: true,
				easing: 'easeinout',
				speed: 150,
				dynamicAnimation: {
					enabled: true,
					speed: 150,
				},
			},
		},
		xaxis: {
			type: 'category',
			tickAmount: 5,
			labels: {
				rotate: 0,
			},
		},
		yaxis: {
			tooltip: {
				enabled: true,
			},
			labels: {
				formatter: function (value) {
					return value + '.0';
				},
			},
		},
	};

	return (
		<>
			<StockChart option={candleOptions} series={stockHistory} chartChange={chartChange} />
		</>
	);
};

export default StockChartContainer;
