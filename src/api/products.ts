import { API_URL } from 'configs';
import { IProduct } from 'interfaces/product.interface';

export const fetchProducts = async (): Promise<IProduct[]> => {
	const res = await fetch(`${API_URL}/products`);

	if (!res.ok) {
		throw new Error(`Что-то пошло не так (ошибка ${res.status})`);
	}

	const data = await res.json();

	return data;
};
