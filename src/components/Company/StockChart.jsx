import React from 'react';
import ReactApexChart from 'react-apexcharts';

const StockChart = ({ option, series, chartChange }) => {
	console.log('StockChart', series);
	return (
		<div className="graph">
			<ul>
				<li>
					<input
						type="radio"
						id="oneday"
						name="chart-date"
						value="1day"
						onClick={chartChange}
						defaultChecked
					/>
					<label className="shadow-box" htmlFor="oneday">
						1일
					</label>
				</li>
				<li>
					<input type="radio" id="fiveday" name="chart-date" value="5day" onClick={chartChange} />
					<label className="shadow-box" htmlFor="fiveday">
						5일
					</label>
				</li>
				<li>
					<input
						id="onemonth"
						type="radio"
						name="chart-date"
						value="1month"
						onClick={chartChange}
					/>
					<label className="shadow-box" htmlFor="onemonth">
						1개월
					</label>
				</li>
				<li>
					<input id="oneyear" type="radio" name="chart-date" value="1year" onClick={chartChange} />
					<label className="shadow-box" htmlFor="oneyear">
						1년
					</label>
				</li>
			</ul>
			<div className="graph-chart shadow-box">
				<ReactApexChart options={option} series={series} type="candlestick" height={'100%'} />
			</div>
		</div>
	);
};

export default StockChart;
