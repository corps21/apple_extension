import { Message,Response } from "../utils/index"
import { songInfo } from "../utils/type";

const list = document.querySelector(".song_list");
const scanButton = document.querySelector(".scan_button");

scanButton?.addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    if(tab && typeof tab.id === "number") {
        const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
  // do something with response here, not outside the function
        console.log(response);
        
    }
})

// message.forEach(element => {
//     const listItem = list?.appendChild(document.createElement("li"))
//    if(listItem) listItem.textContent = `${element.song} by ${element.artist}`        
// });
