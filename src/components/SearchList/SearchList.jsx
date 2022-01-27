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
	const [queryName, setQueryName] = useState('Goo');
	const [limitNumber, setLimitNumber] = useState(10);
	const [loading, setLoading] = useState(true);

	const [companies, setCompanies] = useState([]);

	useEffect(() => {
		//setQueryName('APPLE');
		setLimitNumber(10);
	}, []);

	useCompanySearch(queryName, limitNumber, setCompanies, setLoading);
	//console.log(companies);
	return (
		<div className="search-wrapper">
			<div className="contents">
				<div className="search-result shadow-box">
					<div className="search-num-text">
						{loading === true ? null : (
							<>
								<span>'{queryName}' 검색 결과 </span>
								<span className="search-num">{companies.length}</span>
								<span> 건</span>
							</>
						)}
					</div>
				</div>

				{loading === true ? (
					<div className="loading">
						<span>Loading...</span>
					</div>
				) : (
					<Link to="/detail">
						{companies.map((company, index) => (
							<SearchItem
								key={index}
								index={index}
								name={company.companyName}
								symbol={company.symbol}
								stockPrice={company.price}
								revisedPrice={company.changes}
								percent={0}
							/>
						))}
					</Link>
				)}
			</div>
		</div>
	);
};

export default SearchList;
