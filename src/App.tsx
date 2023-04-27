import { fetchProducts } from 'api/products';
import { AppContextProvider } from 'context/app.context';
import React from 'react';
import { IMappedProducts, mapProductsData } from 'utils';
import './App.css';
import { MainPage } from './pages/MainPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Details } from 'pages/DetailsPage';

const App = (): JSX.Element | null => {
	const [mappedProducts, setMappedProducts] = React.useState<IMappedProducts | null>(null);
	const [loadingStatus, setLoadingStatus] = React.useState<'loading' | 'loaded' | 'error'>(
		'loading',
	);

	React.useEffect(() => {
		(async function () {
			try {
				const products = await fetchProducts();
				setMappedProducts(mapProductsData(products));
				setLoadingStatus('loaded');
			} catch (err) {
				setLoadingStatus('error');
			}
		})();
	}, []);

	if (loadingStatus === 'loading') {
		return (
			<div className="info-text-wrapper">
				<div className="info-text">Загрузка......</div>
			</div>
		);
	}

	if (loadingStatus === 'error') {
		return (
			<div className="info-text-wrapper">
				<div className="info-text info-text_red">
					Что-то пошло не так... Попробуйте перезагрузить страницу
				</div>
			</div>
		);
	}

	return (
		<AppContextProvider mappedProducts={mappedProducts!}>
			<div className="wrapper">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/details/:factoryId/:monthNumber" element={<Details />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</div>
		</AppContextProvider>
	);
};

export default App;
