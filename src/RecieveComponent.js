import {NavLink} from 'react-router-dom'
const RecieveComponent = () => {
	return (
		<div>
			<NavLink to={"/spotify-dashboard"+localStorage.getItem("hash")}>Send</NavLink>
			<NavLink to={"/Recieve"}>Recieve</NavLink>
		</div>
	)
}
export default RecieveComponent