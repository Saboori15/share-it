function Authorize(){
	const authorizeSpotify = () => {
		const clientId = '5ba7e939582c45b5b5053abeb8f12552'
		const queryparams = {
			client_id : clientId,
			response_type : 'token',
			redirect_uri : 'http://localhost:3000/spotify-dashboard'
		}

		var queryString = new URLSearchParams(queryparams).toString();
		window.location.href = 'https://accounts.spotify.com/authorize?'+ queryString
    }
	const authorizeApple = () => {
		
	}

	
	return(
		<div>
			<button onClick={authorizeSpotify}>Connect to Spotify</button>
			<button onClick={authorizeApple}>Connect to Apple Music</button>
		</div>
	);
	
}
export default Authorize;