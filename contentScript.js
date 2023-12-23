(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = ""

    chrome.runtime.onMessage.addEventListener((obj, sender, response) => {
        const {type, videoId} = obj;

        if(type === "NEW"){
            currentVideo = videoId;
            // newVideoLoaded();
        }
    })




})();