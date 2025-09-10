import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	categories: [
		{
			id: 'cspm',
			name: 'CSPM Executive Dashboard',
			tabName: 'CSPM',
			widgets: [
				{
					id: 'w1',
					name: 'Cloud Accounts',
					text: 'Connected (2), Not Connected (2)',
					isVisible: true
				},
				{
					id: 'w2',
					name: 'Cloud Account Risk Assessment',
					text: 'Failed (1689), Warning (681), Not available (36), Passed (7253)',
					isVisible: true
				},
				{
					id: 'w3',
					name: 'Compliance Overview',
					text: 'Total Policies: 156, Compliant: 142, Non-compliant: 14',
					isVisible: false
				}
			]
		},
		{
			id: 'cwpp',
			name: 'CWPP Dashboard',
			tabName: 'CWPP',
			widgets: [
				{
					id: 'w4',
					name: 'Top 5 Namespace Specific Alerts',
					text: 'No Graph data available!',
					isVisible: true
				},
				{
					id: 'w5',
					name: 'Workload Alerts',
					text: 'Critical: 12, High: 24, Medium: 45, Low: 128',
					isVisible: true
				},
				{
					id: 'w6',
					name: 'Registry Scan',
					text: 'Total images: 200, Vulnerable: 50',
					isVisible: false
				}
			]
		},
		{
			id: 'image',
			name: 'Image Security',
			tabName: 'Image',
			widgets: [
				{
					id: 'w7',
					name: 'Image Risk Assessment',
					text: 'Total Vulnerabilities: 1470, Critical (9), High (150)',
					isVisible: true
				},
				{
					id: 'w8',
					name: 'Image Security Issues',
					text: 'Critical (2), High (2), Medium (5), Low (7)',
					isVisible: true
				}
			]
		},
		{
			id: 'ticket',
			name: 'Ticket Management',
			tabName: 'Ticket',
			widgets: [
				{
					id: 'w9',
					name: 'Open Tickets',
					text: 'Total: 25, High Priority: 5, Medium: 10, Low: 10',
					isVisible: false
				},
				{
					id: 'w10',
					name: 'Resolved Tickets',
					text: 'This week: 15, This month: 60',
					isVisible: false
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
				category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
			}
		},
		addWidget: (state, action) => {
			const { categoryId, widget } = action.payload;
			const category = state.categories.find(cat => cat.id === categoryId);
			if (category) {
				category.widgets.push({
					id: Date.now().toString(),
					isVisible: true,
					...widget
				})
			}
		},
		toggleWidgetVisibility: (state, action) => {
			const { categoryId, widgetId } = action.payload;
			const category = state.categories.find(cat => cat.id === categoryId);
			const widget = category?.widgets.find(w => w.id === widgetId);
			if (widget) {
				widget.isVisible = !widget.isVisible;
			}
		}
	}
});

export const {
	addWidget,
	removeWidget,
	toggleWidgetVisibility
} = dashboardSlice.actions;
export default dashboardSlice.reducer;