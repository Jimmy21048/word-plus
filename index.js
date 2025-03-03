const text = document.getElementById('text')
let search

chrome.tabs.query({ active: true, currentWindow: true }, (tabs)  => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getSelectedText" }, (response) => {
        if(response && response.text) {
            let query = response.text

            const requestBody = {
                contents: [{ parts: [{ 
                    text: `Give the simplest meaning of the following word/phrase. 
                    keep the explanation simple, if possible just one sentence. 
                    also add an example in a sentence. 
                    The meaning and example should be on different lines and enclosed within <p>Meaning: ...</p> and <p>Example: ...</p> tags. exclude the '*'.
                    The word/phrase is: ${query}` }] }],
              };

            fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAfWR7WDUlcTcD1mjBwTRlKLV1jIfV19WQ`, {
                method : "POST",
                headers : {
                    headers: { "Content-Type": "application/json" },
                },
                body: JSON.stringify(requestBody)
            }).then(res => res.json()).then(data => {
                search = data.candidates[0].content.parts[0].text
                text.innerHTML = search
            }).catch(err => {
                text.innerHTML = "Sorry, an error occurred" + err
            })
            
        } else {
            text.innerHTML = "Error!, please check your interent connection or restart chrome"
        }
    })
})

