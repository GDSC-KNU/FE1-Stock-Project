import React, { useState, useEffect } from 'react';
import StockChart from './StockChart';
import axios from 'axios';
import { BASE_URL, STOCK_1M_URL, STOCK_30M_URL, STOCK_1H_URL, STOCK_1D_URL } from '../../lib/Api';

const TICKER = 'AAPL';
const STOCK_API_KEY = process.env.REACT_APP_STOCK_API_KEY;

const StockChartContainer = () => {
	const getStockHistory1M = async () => {
		//가장 최근거에서 391개 가져옴, 1분마다 업데이트
		console.log('getStockHistory1M');
		try {
			const response = await axios.get(
				`${BASE_URL}${STOCK_1M_URL}/${TICKER}?apikey=${STOCK_API_KEY}`,
			);

			const todayChart = response.data.slice(0, 391);

			const candleInfo = todayChart.map(({ date, open, low, high, close }) => ({
				x: new Date(date),
				y: [open, high, low, close],
			}));

			const candleSeries = [
				{
					data: candleInfo,
				},
			];

			setStockHistory(candleSeries);
		} catch (error) {
			console.log(error);
		}
	};

	const getStockHistory30M = async () => {
		try {
			const response = await axios.get(
				`${BASE_URL}${STOCK_30M_URL}/${TICKER}?apikey=${STOCK_API_KEY}`,
			);
			const weekChart = response.data.slice(0, 70);

			const candleInfo = weekChart.map(({ date, open, low, high, close }) => ({
				x: new Date(date),
				y: [open, high, low, close],
			}));

			const candleSeries = [
				{
					data: candleInfo,
				},
			];

			setStockHistory(candleSeries);
		} catch (error) {
			console.log(error);
		}
	};

	const getStockHistory1H = async () => {
		try {
			const response = await axios.get(
				`${BASE_URL}${STOCK_1H_URL}/${TICKER}?apikey=${STOCK_API_KEY}`,
			);

			const weekChart = response.data.slice(0, 161);
			console.log(weekChart);

			const candleInfo = weekChart.map(({ date, open, low, high, close }) => ({
				x: new Date(date),
				y: [open, high, low, close],
			}));

			const candleSeries = [
				{
					data: candleInfo,
				},
			];

			setStockHistory(candleSeries);
		} catch (error) {
			console.log(error);
		}
	};

	const getStockHistory1D = async () => {
		try {
			const response = await axios.get(
				`${BASE_URL}${STOCK_1D_URL}/${TICKER}?apikey=${STOCK_API_KEY}`,
			);

			console.log('response', response.data.historical);

			const weekChart = response.data.historical.slice(0, 365);
			console.log(weekChart);

			const candleInfo = weekChart.map(({ date, open, low, high, close }) => ({
				x: new Date(date),
				y: [open, high, low, close],
			}));

			const candleSeries = [
				{
					data: candleInfo,
				},
			];

			setStockHistory(candleSeries);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getStockHistory1M();
		// getStockHistory1H();
		// getStockHistory1D();
	}, []);

	const [stockHistory, setStockHistory] = useState(getStockHistory1M);

	const chartChange = event => {
		switch (event.target.value) {
			case '1day':
				getStockHistory1M();
				break;
			case '5day':
				getStockHistory30M();
				break;
			case '1month':
				getStockHistory1H();
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
			type: 'datetime',
			labels: {
				datetimeFormatter: {
					year: 'yyyy',
					month: "MMM 'yy",
					day: 'dd MMM',
					hour: 'HH:mm',
				},
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

	return <StockChart option={candleOptions} series={stockHistory} chartChange={chartChange} />;
};

export default StockChartContainer;
