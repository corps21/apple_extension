const getSongList = () => {
  setTimeout(() => {
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

    console.log(list, list.length);
    console.log(songs)
  }, 1000);
};




document.readyState ? getSongList() : document.addEventListener("DOMContentLoaded", getSongList);