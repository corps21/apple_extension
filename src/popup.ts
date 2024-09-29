import { Message, Response } from "../utils/index";
import { songInfo } from "../utils/type";

const list = document.querySelector(".song_list");
const scanButton = document.querySelector(".scan_button");

scanButton?.addEventListener("click", async () => {
  console.log("button clicked");
  const [tab] = await chrome.tabs.query({ active: true });
  console.log(tab);

  if (tab && typeof tab.id === "number") {
    console.log("tab detected");
    const response = await chrome.tabs.sendMessage(
      tab.id,
      new Message("scan_request", null)
    );
    console.log(response);
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

    request.message.forEach((element) => {
      const listItem = list?.appendChild(document.createElement("li"));
      if (listItem)
        listItem.textContent = `${element.song} by ${element.artist}`;
    });
    
    console.log("list Updated");
    
    sendResponse(new Response(true, null));
  }
});
