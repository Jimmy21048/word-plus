chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request.action)
    if (request.action === "getSelectedText") {
        let selectedText = window.getSelection().toString();
        sendResponse({ text: selectedText });
    }
});