import { ProductsBarChart } from 'components/ProductsBarChart';
import { ProductsFilter } from 'components/ProductsFilter';
import React from 'react';

import classes from './MainPage.module.css';

export const MainPage: React.FC = () => {
	return (
		<div className={classes.page}>
			<div className={classes.page__body}>
				<ProductsFilter className={classes.page__filters} />
				<ProductsBarChart />
			</div>
		</div>
	);
};
