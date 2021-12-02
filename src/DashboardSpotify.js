import React, { useEffect, useState } from "react";
import axios from 'axios';
import {NavLink,} from 'react-router-dom'
import SendComponent from "./SendComponent";

const getReturnedParamsFromSpotifyAuth = (hash) => {
	const stringAfterHashtag = hash.substring(1);
	const paramsInUrl = stringAfterHashtag.split("&");
	const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
	  //console.log(currentValue);
	  const [key, value] = currentValue.split("=");
	  accumulater[key] = value;
	  return accumulater;
	}, {});
  //console.log(paramsSplitUp)
	return paramsSplitUp;
  };

const DashboardSpotify = () => {
	const [token, setToken] = useState(''); 
	const [data, setData] = useState({});
	// eslint-disable-next-line
	const [selectedPlaylist, setSelectedPlaylist] = useState([]);
	// eslint-disable-next-line
	const [trackList, setTrackList] = useState({});
	const [shareableData,setSharableData] = useState({})
	const [cleanedUpData,setCleanedUpData] = useState({})
	useEffect(() => {
		if (window.location.hash) {
			var { access_token } =
			  getReturnedParamsFromSpotifyAuth(window.location.hash);
			  localStorage.clear();
			  localStorage.setItem("hash",window.location.hash)
			  localStorage.setItem("accessToken", access_token);
			  if (localStorage.getItem("accessToken")) {
				setToken(localStorage.getItem("accessToken"));
			  }
			
		}
		axios.get('https://api.spotify.com/v1/me/playlists',{
			headers:{
				'Authorization':"Bearer " + token
			}
		}).then((response)=>{
			setData(response.data)
		})

		

},[token])

	const selectPlaylist = (id) => {
		var temp = []
		temp.push(id)
		setSelectedPlaylist(temp)
	}

	
	const generateTracks = (playlist_array) =>{
		var id = playlist_array[0]
		const trackPromise = axios.get('https://api.spotify.com/v1/playlists/'+ id +'/tracks',{
			headers:{
				'Authorization':"Bearer " + token
			}
		})
		const coverPromise = axios.get('https://api.spotify.com/v1/playlists/'+ id +'/images',{
			headers:{
				'Authorization':"Bearer " + token
			}
		})
		Promise.all([trackPromise,coverPromise]).then(axios.spread((res1,res2)=>{
			setTrackList(res1.data)
			setSharableData({
				coverImage:res2.data,
				tracks:res1.data.items
			})
		}))
	}

	const generateShareStuff = (sharedData) => {
			var tempArray = sharedData.tracks
			//console.log(tempArray)
			var tempJSON={
				'coverImageCleaned':[],
				'trackListArray':[]
			}
			tempJSON['coverImageCleaned'].push(sharedData.coverImage)
			tempArray.forEach((element) => {
			let arrayObject = {
				'track':'',
				'artist':''
			}
		arrayObject.artist = element.track.artists[0].name
		arrayObject.track =  element.track.name
		tempJSON['trackListArray'].push(arrayObject)

		})

		setCleanedUpData(tempJSON);
	}

	const copyToClipBoard = () => {
		var content = document.getElementById('shareArea');
    
		/* Select the text field */
		content.select();
		content.setSelectionRange(0, 99999); /* For mobile devices */

		/* Copy the text inside the text field */
		navigator.clipboard.writeText(content.value);

		/* Alert the copied text */
		alert("Copied the text: " + content.value);
	}

	return(
		<div>
			<NavLink to={"/spotify-dashboard"+window.location.hash}>Send</NavLink>
			<NavLink to={"/Recieve"}>Recieve</NavLink>
			<SendComponent datas = {data} selectPlaylist = {selectPlaylist} generateTracks = {generateTracks}  selectedPlaylist={selectedPlaylist} generateShareStuff = {generateShareStuff} shareableData = {shareableData} cleanedUpData = {cleanedUpData} copyToClipBoard = {copyToClipBoard}/>
		</div>
	);
}
export default DashboardSpotify;




