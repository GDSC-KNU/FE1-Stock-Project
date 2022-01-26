import React from 'react';

const SearchItem = ({ index, name, symbol, stockPrice, revisedPrice, percent }) => {
	return (
		<div className="search-item shadow-box">
			<div className="number shadow-box">
				<h1>{index + 1}</h1>
			</div>
			<div className="company-name">
				{name} ({symbol})
			</div>
			<div className="stock-numbers">
				<div className="stock-price">$ {stockPrice}</div>
				<div className="search-price">
					<div className="revised-price">
						{revisedPrice > 0 ? (
							<div className="up">
								<span>▲</span>
								<div className="percent">{percent}%</div>
								{revisedPrice}
							</div>
						) : (
							<div className="down">
								<span>▼</span>
								<div className="percent">{percent}%</div>
								{revisedPrice}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchItem;
