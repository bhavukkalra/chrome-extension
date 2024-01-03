chrome.tabs.onUpdated.addListener((tabId, tab) => {
    console.log("OnUpdated called on refresh?? or not?")
    if (tab.url && tab.url.includes("youtube.com/watch")) {
        const queryParameters = tab.url.split("?")[1];
        const urlParameters = new URLSearchParams(queryParameters);
        console.log(urlParameters);

        // Returns a promise?
        chrome.tabs.sendMessage(tabId, {
            type: "NEW",
            videoId: urlParameters.get("v"),
            canBeAnythingElseAsWell: "canBeAnythingElseAsWell"
        });
    }
});
// Storage key "" in namespace "sync" changed.

chrome.storage.onChanged.addListener((changes, namespace) => {
    console.log(`Changes`);
    console.log(changes);
    console.log("namespace");
    console.log(namespace);

    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log(
            `Storage key "${key}" in namespace "${namespace}" changed.`,
            `Old value was "${oldValue}", new value is "${newValue}".`
        );
    }
});



