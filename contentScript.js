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
    }
    
})();