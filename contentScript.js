(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = ""

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const {type, videoId} = obj;

        if(type === "NEW"){
            currentVideo = videoId;
            // newVideoLoaded();
        }
    });
    
    const newVideoLoaded = () => {
        const bookmarkBtnExists = document.getElementsByClassName("bookmark-name")[0];

        console.log(bookmarkBtnExists);

        if(!bookmarkBtnExists){
            const bookmarkBtn = document.createElement("img");
            // From where does this url fetches from
            bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png")
            bookmarkBtn.className = "ytp-button " + "bookmark-btn";
            bookmarkBtn.title = "Click to bookmark the current timestamp"


            youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
            youtubePlayer = document.getElementsByClassName("video-stream")[0];

            // Append the button to the left row
            youtubeLeftControls.appendChild(bookmarkBtn);
        }
    }
    // Fix this at a later point(due to onUpdate event listener) TODO
    newVideoLoaded();
    
})();