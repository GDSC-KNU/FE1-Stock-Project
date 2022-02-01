export const BASE_URL = 'https://financialmodelingprep.com/api';

export const search = '/v3/search'; //api별로 v3인게 있고, v4인게 있네요... 암튼 이런식으로 밑으로 쭉쭉 추가하심 됩니다.
export const nasdaqIndex = '/v3/quote/%5EIXIC';
export const nasdaq100 = '/v3/nasdaq_constituent';
export const nasdaqHistory = {
	'1min': '/v3/historical-chart/1min/%5EIXIC',
	'5min': '/v3/historical-chart/5min/%5EIXIC',
	'15min': '/v3/historical-chart/15min/%5EIXIC',
	'30min': '/v3/historical-chart/30min/%5EIXIC',
	'1hour': '/v3/historical-chart/1hour/%5EIXIC',
	'4hour': '/v3/historical-chart/4hour/%5EIXIC',
};
export const stockPrice = '/v3/quote-short';
export const historicalStockPrice = '/v3/historical-price-full';
