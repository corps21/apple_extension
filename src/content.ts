import { Message, Response } from "../utils/index";
import { songInfo } from "../utils/type";

const getSongList = () => {
  setTimeout(async () => {
    const songs : Array<songInfo> = []
    const list = document.querySelectorAll(
      ".songs-list-row__song-name-wrapper"
    );


    list.forEach((el) => {
      const songInfo:songInfo = {
        song : el?.querySelector(".songs-list-row__song-name")?.textContent ?? "",
        artist : el?.querySelector(".songs-list-row__by-line > span")?.textContent ?? "",
      }
      songs.push(songInfo)
    })

    
    try {
      const response = await chrome.runtime.sendMessage(new Message("song_list", songs));
      if (response.success) console.log("content loaded on popup successfully")
    } catch (error) {
      console.log(error)
    }
  },1000)
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension")
  if (request.type === "scan_button") {
    getSongList();
    sendResponse(new Response(true, {}))
  }
});


document.readyState ? getSongList() : document.addEventListener("DOMContentLoaded", getSongList);
