import { Message, Response } from "./utils/index.js";

const getSongList = () => {
  setTimeout(async () => {
    const songs = []
    const list = document.querySelectorAll(
      ".songs-list-row__song-name-wrapper"
    );


    list.forEach((el) => {
      const songInfo = {}
      songInfo.song = el.querySelector(".songs-list-row__song-name").textContent;
      songInfo.artist = el.querySelector(".songs-list-row__by-line > span").textContent
      songs.push(songInfo)
    })

    // const response = await chrome.runtime.sendMessage(new Message("song_list", songs));

    try {
      const response = await chrome.runtime.sendMessage({ type: "song_list", data: songs });
      if (response.success) console.log("content loaded on popup successfully")
    } catch (error) {
      console.log(error)
    }
  },1000)
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(sender.tab ? "from a content script:" + sender.tab.ur : "from the extension")
  if (request.type === "scan_button") {
    getSongList();
    sendResponse(new Response(true))
  }
});


document.readyState ? getSongList() : document.addEventListener("DOMContentLoaded", getSongList);
