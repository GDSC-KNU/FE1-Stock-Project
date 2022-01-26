import React from 'react';
import SearchItem from './component/SearchItem';
import { Link } from 'react-router-dom';
import './styles/SearchListStyle.scss';

const companies = [
	{
		name: 'Apple Inc. (APPL)',
		stockPrice: '172.19',
		revisedPrice: '-3.34',
		percent: '-1.41',
	},
	{
		name: 'Maui Land & Pinea... (MLP)',
		stockPrice: '10.08',
		revisedPrice: '0.08',
		percent: '+0.79',
	},
	{
		name: 'Apple Hospitality... (APLE)',
		stockPrice: '172.19',
		revisedPrice: '0.12',
		percent: '+0.72',
	},
	{
		name: 'GCP Applied Tech... (GCP)',
		stockPrice: '31.87',
		revisedPrice: '-0.08',
		percent: '-0.25',
	},
	{
		name: 'Apple Inc. (APPL)',
		stockPrice: '172.19',
		revisedPrice: '-3.34',
		percent: '-1.41',
	},
	{
		name: 'Maui Land & Pinea... (MLP)',
		stockPrice: '10.08',
		revisedPrice: '0.08',
		percent: '+0.79',
	},
	{
		name: 'Apple Hospitality... (APLE)',
		stockPrice: '172.19',
		revisedPrice: '0.12',
		percent: '+0.72',
	},
	{
		name: 'GCP Applied Tech... (GCP)',
		stockPrice: '31.87',
		revisedPrice: '-0.08',
		percent: '-0.25',
	},
];

const SearchList = () => {
	return (
		<div className="search-wrapper">
			<div className="contents">
				<div className="search-result shadow-box">
					<div className="search-num-text">
						<span>'APPLE' 검색 결과 </span>
						<span className="search-num">{companies.length}</span>
						<span> 건</span>
					</div>
				</div>
				<div>
					<Link to="/detail">
						{companies.map((company, index) => (
							<SearchItem
								index={index}
								name={company.name}
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
