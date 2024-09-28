import { Message,Response } from "./utils/index.js"

const list = document.querySelector(".song_list");
const scanButton = document.querySelector(".scan_button");

scanButton.addEventListener('click', async () => {
    const response = await chrome.runtime.sendMessage(new Message("scan_request"))
    if(response.success) console.log("button clicked for scanning");
})

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.type === "song-list") {
            request.songs.forEach(element => {
                const listItem = list.appendChild(document.createElement("li"))
                listItem.textContent =`${element.song} by ${element.artist}`            
            });

            sendResponse(new Response(true))
        }

    }
);