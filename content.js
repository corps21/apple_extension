const getSongList = () => {
  setTimeout(async () => {
    const list = document.querySelectorAll(
      ".songs-list-row__song-name-wrapper"
    );

    const songs = []

    list.forEach((el) => {
        const songInfo = {}
        songInfo.song = el.querySelector(".songs-list-row__song-name").textContent;
        songInfo.artist = el.querySelector(".songs-list-row__by-line > span").textContent
        songs.push(songInfo)
    })

    
    // const response = await chrome.runtime.sendMessage(songs)
    // if(response) console.log("songs sent successfully")
    
    console.log(list, list.length);
    console.log(songs)
    console.log( await chrome.runtime.sendMessage(songs) )
  }, 1000);
};




document.readyState ? getSongList() : document.addEventListener("DOMContentLoaded", getSongList);