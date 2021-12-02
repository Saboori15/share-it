import './App.css';
import Authorize from './Authorize.js'
import DashboardSpotify  from './DashboardSpotify.js'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import RecieveComponent from "./RecieveComponent"

function App() {
  return (
		<Router>
		<div className="App">
			<Routes>
			<Route path='/' element ={<Authorize />} />
			<Route path='/spotify-dashboard/*' element ={<DashboardSpotify />} />
			<Route path={"/Recieve"} element ={<RecieveComponent />} />
			</Routes>
		</div>
		</Router>

  );
}

export default App;
