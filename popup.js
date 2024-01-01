import { getActiveTabURL } from './utils.js';

// adding a new bookmark row to the popup
const addNewBookmark = () => {};

const viewBookmarks = () => {};

const onPlay = e => {};

const onDelete = e => {};

const setBookmarkAttributes =  () => {};

document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getActiveTabURL();
    const queryParameters = activeTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    const currentVideo = urlParameters.get("v");

    // why [currentVideo] as a parameter??
    if(activeTab.url.includes("youtube.com/watch") && currentVideo){
        chrome.storage.sync.get([currentVideo], (data) => {
            console.log("it returns a promise");
            console.log(data);
            const currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]) : [];

        //     viewBookmarks
        })
    }else{
        // Not a youtube video page
        const container = document.getElementsByClassName("container")[0];
        container.innerHTML = '<div class="title"> This is not a youtube page</div>>'

    }

});