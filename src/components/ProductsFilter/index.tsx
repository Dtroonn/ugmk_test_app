import React from 'react';
import { ProductTypeFilter, productTypesItems } from './ProductsFilter.constants';
import { AppContext } from 'context/app.context';

import classes from './ProductsFilter.module.css';
import { ProductsFilterProps } from './ProductsFilter.props';
import { localStorageProductTypeFilterKey } from 'configs';

export const ProductsFilter: React.FC<ProductsFilterProps> = ({ className }) => {
	const { byProductTypeFilter, setByProductTypeFilter } = React.useContext(AppContext);

	const onChangeSelect: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
		const value = event.target.value as ProductTypeFilter;
		localStorage.setItem(localStorageProductTypeFilterKey, value);
		setByProductTypeFilter(value);
	};

	return (
		<div className={`${classes.filter} ${className ? className : ''}`}>
			<div className={classes.filter__title}>Фильтр по типу продукции</div>
			<select
				className={classes.filter__select}
				name="selectProductType"
				value={byProductTypeFilter}
				onChange={onChangeSelect}
			>
				{productTypesItems.map((item) => (
					<option key={item.value} value={item.value}>
						{item.label}
					</option>
				))}
			</select>
		</div>
	);
};
