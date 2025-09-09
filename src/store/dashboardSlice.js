import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	categories: [
		{
			id: 'cspm',
			name: 'CSPM Executive Dashboard',
			widgets: [
				{
					id: 'w1',
					name: 'Cloud Accounts',
					text: 'Connected (2), Not Connected (2)'
				},
				{
					id: 'w2',
					name: 'Cloud Account Risk Assessment',
					text: 'Failed (1689), Warning (681), Not available (36), Passed (7253)'
				},
				{
					id: 'w3',
					name: 'Compliance Overview',
					text: 'Total Policies: 156, Compliant: 142, Non-compliant: 14'
				}
			]
		},
		{
			id: 'cwpp',
			name: 'CWPP Dashboard',
			widgets: [
				{
					id: 'w4',
					name: 'Top 5 Namespace Specific Alerts',
					text: 'No Graph data available!'
				},
				{
					id: 'w5',
					name: 'Workload Alerts',
					text: 'Critical: 12, High: 24, Medium: 45, Low: 128'
				}
			]
		},
		{
			id: 'registry',
			name: 'Registry Scan',
			widgets: [
				{
					id: 'w6',
					name: 'Image Risk Assessment',
					text: 'Total Vulnerabilities: 1470, Critical (9), High (150)'
				},
				{
					id: 'w7',
					name: 'Image Security Issues',
					text: 'Critical (2), High (2), Medium (5), Low (7)'
				}
			]
		}
	]
}

export const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {
		removeWidget: (state, action) => {
			const { categoryId, widgetId } = action.payload;
			const category = state.categories.find(cat => cat.id === categoryId);
			if (category) {
				category.widgets.filter(widget => widget.id !== widgetId);
			}
		},
		addWidget: (state, action) => {
			const { categoryId, widget } = action.payload;
			const category = state.categories.find(cat => cat.id === categoryId);
			if (category) {
				category.widgets.push({
					id: Date.now().toString(),
					...widget
				})
			}
		}
	}
});

export const { addWidget, removeWidget } = dashboardSlice.actions;
export default dashboardSlice.reducer;