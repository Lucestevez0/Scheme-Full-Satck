function findWords() {
    return fetch('./json/words-list.json');
}

function randomNumber() {
    return 1
}

async function loadWoards() {
    try {
        const wordResponse = await findWords(words.value);
        const data = wordResponse.json();
        if (data.words) {
            console.log(data)
        }
    }catch (error) {
        console.log(error)
    }
}

