export const barChartOptions = {
	responsive: true,
	plugins: {
		legend: {
			position: 'bottom' as const,
		},
	},
	scales: {
		y: {
			ticks: {
				// forces step size to be 50 units
				stepSize: 150,
			},
		},
	},
};
