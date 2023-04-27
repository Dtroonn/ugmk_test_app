import { AppContext } from 'context/app.context';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { pieChartOptions } from './DetailsPage.constants';
import classes from './DetailsPage.module.css';
import { factoryNameOnId, monthsNames } from 'configs';

ChartJS.register(ArcElement, Tooltip, Legend);

export const Details: React.FC = () => {
	const { mappedProducts } = React.useContext(AppContext);
	const params = useParams();
	const factoryId = params.factoryId as string;
	const monthNumber = params.monthNumber as string;

	const factoryData = mappedProducts[monthNumber as string]?.[factoryId as string];

	if (!factoryData) {
		return (
			<div className={`${classes.page__title} ${classes.page__title_red}`}>
				Информация не найдена
			</div>
		);
	}

	const data = {
		labels: ['Продукт 1', 'Продукт 2'],
		datasets: [
			{
				// label: '# of Votes',
				data: [factoryData.product1, factoryData.product2],
				backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 159, 64, 0.2)'],
				borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)'],
				borderWidth: 1,
			},
		],
	};

	return (
		<div className={classes.page}>
			<div className={classes.page__body}>
				<div className={classes.page__title}>{`Статистика по продукции фабрики ${
					factoryNameOnId[factoryId as keyof typeof factoryNameOnId]
				} за ${monthsNames[+monthNumber - 1]}`}</div>
				<Pie data={data} options={pieChartOptions} />
			</div>
		</div>
	);
};
