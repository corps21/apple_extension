import { Message, Response } from "../utils/index";
import { songInfo } from "../utils/type";

const getSongList = async () => {

  // setTimeout(async () => {

  // },1000)


  const songs : songInfo[] = [];
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
    const response = await chrome.runtime.sendMessage(new Message("update_list", songs));
    if (response.success) console.log("content loaded on popup successfully")
  } catch (error) {
    console.log(error)
  }
};

chrome.runtime.onMessage.addListener(
  function(request: Message<null>, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if(request.type === "scan_request") {
      console.log("Scan request received");
      getSongList();
      sendResponse(new Response(true, null));
    }
  }
);