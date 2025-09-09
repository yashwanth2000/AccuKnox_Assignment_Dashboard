import { Provider } from "react-redux";
import { store } from './store/store';
import DashBoard from "./components/DashBoard";
import Header from "./components/Header";

function App() {
	return (
		<Provider store={store}>
			<Header />
			<DashBoard />
		</Provider>
	)
}

export default App
