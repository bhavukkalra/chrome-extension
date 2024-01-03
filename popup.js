import { getActiveTabURL } from './utils.js';

// adding a new bookmark row to the popup
const addNewBookmark = (bookmarksElement, bookmark) => {
    console.log(`Inside addNewBookmark ${bookmarksElement}`);
    console.log(bookmark);
    const bookmarkTitleElement = document.createElement("div");
    const newBookmarkElement = document.createElement("div");

    const controlsElement = document.createElement("div");
    controlsElement.className = "bookmark-controls";
    setBookmarkAttributes("play", onPlay, controlsElement);
    setBookmarkAttributes("delete", onDelete, controlsElement);

    bookmarkTitleElement.textContent = bookmark.desc;
    bookmarkTitleElement.className = "bookmark-title";

    // time in seconds
    newBookmarkElement.id = "bookmark-" + bookmark.time;
    newBookmarkElement.className = "bookmark";
    // <div timestamp="123">
    newBookmarkElement.setAttribute("timestamp", bookmark.time);

    newBookmarkElement.appendChild(bookmarkTitleElement);
    newBookmarkElement.appendChild(controlsElement);
    bookmarksElement.appendChild(newBookmarkElement);

};

const viewBookmarks = (currentBookmarks = []) => {
    console.log("inside viewBookmarks")
    const bookmarksElement = document.getElementById("bookmarks");
    // Append to this element all the bookmarks (if any)
    bookmarksElement.innerHTML = "";
    console.log("currentBookmarks");
    console.log(currentBookmarks);



    if (currentBookmarks.length > 0){
        for(let i = 0; i < currentBookmarks.length; i++){
            console.log("bookmark_current")
            let bookmark_current = currentBookmarks[i];
            console.log(bookmark_current)
            // Appending the current element (bookmark)
            addNewBookmark(bookmarksElement, bookmark_current);
        }
    }else{
        bookmarksElement.innerHTML = '<i class="row"> No bookmarks to show </i>'
    }

}

const onPlay = async e => {
    const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
    const activeTab = await getActiveTabURL();

    // Send the messeage to the content script to adjust the player current time
    chrome.tabs.sendMessage(activeTab.id, {
        type: "PLAY",
        value: bookmarkTime
    })
};

const onDelete = async e => {
    const activeTab = await getActiveTabURL();
    const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
    const bookmarkElementToBeDelete = document.getElementById("bookmark-" + bookmarkTime);

    bookmarkElementToBeDelete.parentNode.removeChild(bookmarkElementToBeDelete);

    chrome.tabs.sendMessage(activeTab.id, {
        type: "DELETE",
        value: bookmarkTime
    }, viewBookmarks);

};

/*
Generic Control Element

src = PLAY, DELETE



 */

const setBookmarkAttributes =  (src, eventListener, controlParentElement) => {
    const controlsElement = document.createElement("img");

    controlsElement.src = "assets/" + src + ".png";
    controlsElement.title = src;
    controlsElement.addEventListener("click", eventListener);
    controlParentElement.appendChild(controlsElement);

};

// if (document.readyState !== 'loading') {
//     init();
//     console.log("Bhai chal ja")
// }
// else document.addEventListener('DOMContentLoaded', init);
//
// function init() {
//     console.log("Do it !");
//
// }

document.addEventListener("DOMContentLoaded", async () => {
    console.log("Inside the DOMContentLoaded");
    const activeTab = await getActiveTabURL();

    console.log("getActiveTabURL")
    console.log(getActiveTabURL);

    const queryParameters = activeTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    const currentVideo = urlParameters.get("v");

    // why [currentVideo] as a parameter??
    if(activeTab.url.includes("youtube.com/watch") && currentVideo){
        console.log(`Current video is ${currentVideo}`)
        chrome.storage.sync.get([currentVideo], (data) => {
            console.log("it returns a promise");
            console.log(data);
            const currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]) : [];

            // populate the bookmarks
            viewBookmarks(currentVideoBookmarks);
        })
    }else{
        // Not a youtube video page
        const container = document.getElementsByClassName("container")[0];
        container.innerHTML = '<div class="title"> This is not a youtube page</div>>'

    }

});