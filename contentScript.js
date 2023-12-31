(() => {
    let youtubeLeftControls = ""
    let youtubePlayer = "";
    let currentVideo = ""
    let currentVideoBookmarks = [];

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const {type, videoId} = obj;

        if(type === "NEW"){
            currentVideo = videoId;
            callWithADelay();
        }
    });

    // HTML doesn't get loaded completely for script ot function properly
    // In case of slower connections
    function callWithADelay() {
        setTimeout(newVideoLoaded, 3000);
    }
    
    const newVideoLoaded = () => {
        // Condition always failing and more elements are getting appended TODO
        const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];

        console.log(bookmarkBtnExists);

        if(!bookmarkBtnExists){
            const bookmarkBtn = document.createElement("img");
            // From where does this url fetches from
            bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png")
            bookmarkBtn.className = "ytp-button " + "bookmark-btn";
            bookmarkBtn.title = "Click to bookmark the current timestamp"


            youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
            youtubePlayer = document.getElementsByClassName("video-stream")[0];
            console.log(`The left controls are`);
            console.log(youtubeLeftControls);

            console.log(`The youtube player is`);
            console.log(youtubePlayer);
            // Append the button to the left row
            youtubeLeftControls.appendChild(bookmarkBtn);
            bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);

        }
    }
    // Fix this at a later point(due to onUpdate event listener) TODO
    callWithADelay(); // (Two time showing)
    const addNewBookmarkEventHandler = () => {
        const timeStampElement = document.getElementsByClassName("ytp-time-current")[0];
        const timeStampFromYoutubeUIString = timeStampElement.innerHTML;

        const currentTime = youtubePlayer.currentTime;
        console.log(`The currentTime is - ${currentTime}`)

        // const getYoutubeTIme = getTime(currentTime);


        // console.log(`Output from the getTime fx - ${getYoutubeTIme}`)
        const newBookmark =  {
            time: currentTime,
            desc: `Bookmark at ${timeStampFromYoutubeUIString}`
        }
        console.log(`New bookmark - ${JSON.stringify(newBookmark)}`);
        console.log(newBookmark);

        chrome.storage.sync.set({
            [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
        });
    }

    // const getTime = timeInput => {
    //     let date = new Date(0);
    //     date.setSeconds(timeInput);
    //
    //     console.log(`date varibale - ${date}`);
    //
    //         return date.toISOString().substring(8, 11);
    // }
    
})();