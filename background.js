chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "word-phrase-finder",
        title: "Find meaning...",
        contexts: ["all"]
    })
})
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if(info.menuItemId === "word-phrase-finder") {
        chrome.action.openPopup()
    }
})
