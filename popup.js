import { getActiveTabURL } from './utils.js';

// adding a new bookmark row to the popup
const addNewBookmark = (bookmarksElement, bookmark) => {
    console.log(`Inside addNewBookmark ${bookmarksElement}`);
    console.log(bookmark);
    const bookmarkTitleElement = document.createElement("div");
    const newBookmarkElement = document.createElement("div");

    bookmarkTitleElement.textContent = bookmark.desc;
    bookmarkTitleElement.className = "bookmark-title";

    // time in seconds
    newBookmarkElement.id = "bookmark-" + bookmark.time;
    newBookmarkElement.className = "bookmark";
    // <div timestamp="123">
    newBookmarkElement.setAttribute("timestamp", bookmark.time);

    newBookmarkElement.appendChild(bookmarkTitleElement);
    bookmarksElement.appendChild(newBookmarkElement);

};

const viewBookmarks = (currentBookmarks = []) => {
    const bookmarksElement = document.getElementById("bookmarks");
    // Append to this element all the bookmarks (if any)
    bookmarksElement.innerHTML = ""

    if (currentBookmarks.length > 0){
        for(let i = 0; i < currentBookmarks.length; i++){
            const bookmark = currentBookmarks[i];
            // Appending the current element (bookmark)
            addNewBookmark(bookmarksElement, bookmark);
        }
    }else{
        bookmarksElement.innerHTML = '<i class="row"> No bookmarks to show </i>'
    }

}

const onPlay = e => {};

const onDelete = e => {};

const setBookmarkAttributes =  () => {};

// if (document.readyState !== 'loading') init()
// else document.addEventListener('DOMContentLoaded', init);
//
// function init() {
//     console.log("Do it !");
//
// }

document.addEventListener("DOMContentLoaded", async () => {
    console.log("Inside the DOMContentLoaded");
    console.log("Inside the DOMContentLoaded");
    console.log("Inside the DOMContentLoaded");
    console.log("Inside the DOMContentLoaded");
    const activeTab = await getActiveTabURL();

    console.log("getActiveTabURL")
    console.log(getActiveTabURL);

    const queryParameters = activeTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    const currentVideo = urlParameters.get("v");

    // why [currentVideo] as a parameter??
    if(activeTab.url.includes("youtube.com/watch") && currentVideo){
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