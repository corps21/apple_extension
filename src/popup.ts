import { Message,Response } from "../utils/index"
import { songInfo } from "../utils/type";

const list = document.querySelector(".song_list");
const scanButton = document.querySelector(".scan_button");

scanButton?.addEventListener('click', async () => {
    const response = await chrome.runtime.sendMessage(new Message("scan_request", {}))
    if(response.success) console.log("button clicked for scanning");
})

chrome.runtime.onMessage.addListener(
    function (request: Message<songInfo[]>, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        const {type,message} = request;

        if (type === "song_list") {
            message.forEach(element => {
                const listItem = list?.appendChild(document.createElement("li"))
               if(listItem) listItem.textContent = `${element.song} by ${element.artist}`        
            });
            sendResponse(new Response(true, {}))
        }

    }
);