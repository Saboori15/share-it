import React from 'react'

const Playlist = ({playlist,onSelect, onSelect2, playlistArray}) => {
	return (
		<div onClick = {() => {
				 onSelect(playlist.id)
		}} style = {playlistArray[0] === playlist.id ? {backgroundColor : 'red'} : {backgroundColor : 'white'}}>
			{playlist.name}
		</div>
	)
}

export default Playlist