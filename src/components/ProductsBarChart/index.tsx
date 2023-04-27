import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ChartData,
} from 'chart.js';
import { Bar, getElementAtEvent } from 'react-chartjs-2';
import { AppContext } from 'context/app.context';
import { barChartOptions } from './ProductsBarChart.constants';
import { factoryNameOnId, monthsNames } from 'configs';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const ProductsBarChart: React.FC = () => {
	const chartRef = React.useRef();
	const { mappedProducts, byProductTypeFilter } = React.useContext(AppContext);
	const navigate = useNavigate();

	const monthsNumbers = Object.keys(mappedProducts);
	const labels = monthsNumbers.map((number) => monthsNames[(number as unknown as number) - 1]);
	const factoriesData = Object.values(mappedProducts);

	const data: ChartData<'bar', number[], string> = {
		labels,
		datasets: [
			{
				label: `Фабрика ${factoryNameOnId['1']}`,
				data: factoriesData.map((item) => item[1][byProductTypeFilter]),
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
			{
				label: `Фабрика ${factoryNameOnId['2']}`,
				data: factoriesData.map((item) => item[2][byProductTypeFilter]),
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};

	const onClick: React.MouseEventHandler<HTMLCanvasElement> = (event) => {
		//@ts-ignore
		const [chartBarElem] = getElementAtEvent(chartRef.current, event);
		if (chartBarElem) {
			navigate(`/details/${chartBarElem.datasetIndex + 1}/${chartBarElem.index + 1}`);
		}
	};

	return (
		<div>
			<Bar options={barChartOptions} ref={chartRef} onClick={onClick} data={data} />
		</div>
	);
};
