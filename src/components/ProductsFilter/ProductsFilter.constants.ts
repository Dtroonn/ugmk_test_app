export const enum ProductTypeFilter {
	PRODUCT1 = 'product1',
	PRODUCT2 = 'product2',
	ALL = 'all',
}

export const productTypesItems: { label: string; value: ProductTypeFilter }[] = [
	{
		label: 'Продукт 1',
		value: ProductTypeFilter.PRODUCT1,
	},
	{
		label: 'Продукт 2',
		value: ProductTypeFilter.PRODUCT2,
	},
	{
		label: 'Все продукты',
		value: ProductTypeFilter.ALL,
	},
];
