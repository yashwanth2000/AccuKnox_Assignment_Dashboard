import { configureStore } from "@reduxjs/toolkit";
import dashBoardReducer from './dashboardSlice';

export const store = configureStore({
	reducer: {
		dashboard: dashBoardReducer
	}
});