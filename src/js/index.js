const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const lyrics_element = document.getElementById("lyrics")
const author_element = document.getElementById("author")
const title_element = document.getElementById("title")
const share_btn = document.getElementById("share")

const url = 'https://sgrodolix.website/api'

let song_id, title, author
let lyrics = []

fetch(`${url}/lyrics?t=${urlParams.get("title")}&a=${urlParams.get("author")}`).then(res => res.json())
.then(data => {
    song_id = data.song_id
    lyrics = data.lyrics
    title = data.title
    author = data.author
    
    title_element.textContent = data.title
    author_element.textContent = data.author

    lyrics.forEach((verse, idx) => {
        lyrics_element.insertAdjacentHTML( 'beforeend', `
            <button 
                class="mb-2 md:hover:bg-primary md:hover:bg-opacity-60 text-white text-left font-semibold break-before-all"
                id="${idx}" onclick="on_select(this)"
            >
                ${verse}
            </button>
            ` )
    })
})

let selected_ids = []
const on_select = (element) => {
    id = parseInt(element.id)

    if (element.classList.toString().includes("text-primary")) {
        const index = selected_ids.indexOf(id);
        if (index > -1) {
            selected_ids.splice(index, 1);
        }
    }
    else selected_ids.push(id)

    element.classList.toggle("text-primary");
    element.classList.toggle("text-white");
    element.classList.toggle("font-extrabold");
    element.classList.toggle("text-semibold");
    element.classList.toggle("md:hover:bg-primary")
    element.classList.toggle("md:hover:bg-opacity-60")
    
    share_btn.disabled = selected_ids.length <= 0
}


const share = async () => {
    share_btn.disabled = true
    share_btn.textContent = "Loading"

    let selected_lyrics = []
    selected_ids.sort().forEach(id => selected_lyrics.push(lyrics[id]))

    const res = await fetch(`${url}/share?song_id=${song_id}`, {
        method: "POST",
        body: JSON.stringify(selected_lyrics),
        headers: {
                "Content-Type": "application/json",
        },
    })

    const blob = await res.blob();
    const img_url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = img_url;
    a.download = `${title}-${author}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);


    share_btn.disabled = false
    share_btn.textContent = "Scarica Bene"
}
