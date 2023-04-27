import { ProductTypeFilter } from 'components/ProductsFilter/ProductsFilter.constants';
import { localStorageProductTypeFilterKey } from 'configs';
import React, { PropsWithChildren } from 'react';
import { IMappedProducts } from 'utils';

interface IAppContext {
	mappedProducts: IMappedProducts;
	byProductTypeFilter: ProductTypeFilter;
	setByProductTypeFilter: (value: ProductTypeFilter) => void;
}

export const AppContext = React.createContext<IAppContext>({
	mappedProducts: {},
	byProductTypeFilter: ProductTypeFilter.ALL,
	/* eslint-disable */
	setByProductTypeFilter: () => {},
});

export const AppContextProvider: React.FC<
	PropsWithChildren<Pick<IAppContext, 'mappedProducts'>>
> = ({ mappedProducts, children }) => {
	const [byProductTypeFilter, setByProductTypeFilterState] = React.useState<ProductTypeFilter>(
		() => (localStorage.getItem(localStorageProductTypeFilterKey) as ProductTypeFilter) || ProductTypeFilter.ALL
	);

	const setByProductTypeFilter = (value: ProductTypeFilter) => {
		setByProductTypeFilterState(value);
	};

	return (
		<AppContext.Provider value={{ mappedProducts, byProductTypeFilter, setByProductTypeFilter }}>
			{children}
		</AppContext.Provider>
	);
};
