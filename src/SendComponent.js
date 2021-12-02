import Playlist from "./Playlist";
const SendComponent = ({datas, selectPlaylist, generateTracks, selectedPlaylist, generateShareStuff, shareableData, cleanedUpData, copyToClipBoard}) => {

	return (
		<div>
			<h1>Select a Playlist then click process</h1>
			{datas?.items ? datas.items.map((item) => <Playlist key={item.id} playlist={item} onSelect = {selectPlaylist} onSelect2 = {generateTracks} playlistArray = {selectedPlaylist} />) : null}
			
			<button onClick ={() => {
				if(selectedPlaylist){
					generateTracks(selectedPlaylist)
				}
			}}>Select</button>
			<button onClick ={() => {
				if(selectedPlaylist){
					generateShareStuff(shareableData)
				}
			}}>Get Link</button>
			  <textarea id='shareArea' value = {JSON.stringify(cleanedUpData)}>  </textarea>
    			<button onClick={copyToClipBoard}>Copy To Clipbord</button>
		</div>
	)
}

export default SendComponent
