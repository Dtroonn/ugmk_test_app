import { ProductTypeFilter } from 'components/ProductsFilter/ProductsFilter.constants';
import { IProduct } from 'interfaces/product.interface';

export type IMappedProducts = Record<
	string,
	Record<
		string,
		{
			[ProductTypeFilter.PRODUCT1]: number;
			[ProductTypeFilter.PRODUCT2]: number;
			[ProductTypeFilter.ALL]: number;
		}
	>
>;

export const mapProductsData = (products: IProduct[]): IMappedProducts => {
	const result = products.reduce<IMappedProducts>((prev, product) => {
		if (!product.date) {
			return prev;
		}

		const month = product.date.split('/')[1];
		const product1Value = (product.product1 || 0) / 1000;
		const product2Value = (product.product2 || 0) / 1000;
		if (prev[month]) {
			const productDataByFabric = prev[month][product.factory_id];
			if (productDataByFabric) {
				prev[month][product.factory_id] = {
					product1: productDataByFabric[ProductTypeFilter.PRODUCT1] + product1Value,
					product2: productDataByFabric[ProductTypeFilter.PRODUCT2] + product2Value,
					all: productDataByFabric[ProductTypeFilter.ALL] + product1Value + product2Value,
				};
			} else {
				prev[month][product.factory_id] = {
					product1: product1Value,
					product2: product2Value,
					all: product1Value + product2Value,
				};
			}
		} else {
			prev[month] = {
				[product.factory_id]: {
					product1: product1Value,
					product2: product2Value,
					all: product1Value + product2Value,
				},
			};
		}

		return prev;
	}, {});

	return result;
};
