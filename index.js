// console.log(window.getSelection().toString())
const text = document.getElementById('text')
let search

chrome.tabs.query({ active: true, currentWindow: true }, (tabs)  => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getSelectedText" }, (response) => {
        if(response && response.text) {
            search = response.text
            text.innerHTML = response.text
        } else {
            text.innerHTML = "No text selected"
        }
    })
})

// text.innerHTML = "Jimmy rubia"

