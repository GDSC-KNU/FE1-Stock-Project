import React, { useState, useEffect } from 'react';
import SearchItem from './component/SearchItem';
import { Link } from 'react-router-dom';
import useCompanySearch from './hooks/useCompanySearch';
import './styles/SearchListStyle.scss';

const companiesList = [
	{
		name: 'Apple Inc.',
		stockPrice: '172.19',
		revisedPrice: '-3.34',
		percent: '-1.41',
		symbol: 'APPL',
	},
	{
		name: 'Maui Land & Pinea...',
		stockPrice: '10.08',
		revisedPrice: '0.08',
		percent: '+0.79',
		symbol: 'MLP',
	},
	{
		name: 'Apple Hospitality...',
		stockPrice: '172.19',
		revisedPrice: '0.12',
		percent: '+0.72',
		symbol: 'APLE',
	},
	{
		name: 'GCP Applied Tech...',
		stockPrice: '31.87',
		revisedPrice: '-0.08',
		percent: '-0.25',
		symbol: 'GCP',
	},
];

const SearchList = () => {
	const [queryName, setQueryName] = useState('AA');
	const [limitNumber, setLimitNumber] = useState(10);

	const [companies, setCompanies] = useState([]);

	useEffect(() => {
		setQueryName('AA');
		setLimitNumber(10);
	}, []);

	useCompanySearch(queryName, limitNumber, setCompanies);
	console.log(companies);
	return (
		<div className="search-wrapper">
			<div className="contents">
				<div className="search-result shadow-box">
					<div className="search-num-text">
						<span>{queryName} 검색 결과 </span>
						<span className="search-num">{companies.length}</span>
						<span> 건</span>
					</div>
				</div>
				<div>
					<Link to="/detail">
						{companies.map((company, index) => (
							<SearchItem
								key={index}
								index={index}
								name={company.name}
								symbol={company.symbol}
								stockPrice={company.stockPrice}
								revisedPrice={company.revisedPrice}
								percent={company.percent}
							/>
						))}
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SearchList;
