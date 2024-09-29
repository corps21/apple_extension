import { Message, Response } from "../utils/index";
import { songInfo } from "../utils/type";
type ButtonFlag = "scan" | "download";

let buttonFlag: ButtonFlag = "scan";

const list = document.querySelector(".song_list");
const mainButton = document.querySelector(".scan_button");

const updateButton = (Flag: ButtonFlag) => {
  if (mainButton) {
    if (Flag === "scan") {
      mainButton.textContent = "Scan for songs in the playlist";
      buttonFlag = "scan";
    } else {
      mainButton.textContent = "Download your selection";
      buttonFlag = "download";
    }
  }
};

const selectedList: string[] = [];

const visibleList = (makeVisible: boolean) => {
  if (list) {
    if (makeVisible) {
      list.classList.remove("invisible");
    } else {
      list.classList.add("invisible");
    }
  }
};

const removeSongs = (id: string) => {
  if (list) {
    const songToDelete = document.querySelector(`#${id}`);
    if (songToDelete) list.removeChild(songToDelete);
  }
};

mainButton?.addEventListener("click", async () => {
  if (buttonFlag === "scan") {
    const [tab] = await chrome.tabs.query({ active: true });

    if (tab && typeof tab.id === "number") {
      console.log("tab detected");
      try {
        const response = await chrome.tabs.sendMessage(
          tab.id,
          new Message("scan_request", null)
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  } else if(buttonFlag === "download") {
    console.log("button clicked")
    if(list) {
      if(list.childElementCount > 0) {
        const children = list.children;
        [...children].map(el => {
          if(el){
            const song = el.querySelector("p")?.innerText
            if(song) selectedList.push(song)
          }
        })
        console.log(selectedList)
      }
    }
  }
});

chrome.runtime.onMessage.addListener(function (
  request: Message<songInfo[]>,
  sender,
  sendResponse
) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  if (request.type === "update_list") {
    console.log("update request received");

    if (request.message.length === 0) {
      console.log("No songs detected");
      sendResponse(new Response(false, null));
      process.exit(1);
    }

    request.message.forEach((element, index) => {
      const listItem = list?.appendChild(document.createElement("li"));
      if (listItem) {
        listItem.classList.add("items");
        listItem.id = `item-${index + 1}`;
        const para = document.createElement("p");
        para.textContent = `${element.song} by ${element.artist}`;
        listItem.appendChild(para);
        const button = document.createElement("button");
        button.textContent = "🗑️";
        button.addEventListener("click", () => {
          removeSongs(`item-${index + 1}`)
        });
        listItem.appendChild(button);
      }
    });

    updateButton("download");
    visibleList(true);

    console.log("list Updated");

    sendResponse(new Response(true, null));
  }
});
