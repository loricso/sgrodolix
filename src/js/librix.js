const textarea = document.getElementById('lyrics');
const title = document.getElementById('title')
const author = document.getElementById('author')
const sharebtn = document.getElementById('share');

const url = 'https://sgrodolix.website/api'

// Subtle books recomendations as placeholders :3
const books = [
    ["L'identità", "Milan Kundera"],
    ["1984", "George Orwell"],
    ["Il giovane Holden", "J.D Salinger"],
    ["Notti bianche", "Fydor Dostoevsky"],
    ["Uno, nessuno e centomila", "Luigi Pirandello"],
    ["Bartleby lo scrivano", "Herman Melville"],
    ["Maniac", "Benjamín Labatut"],
    ["Lo straniero", "Albert Camus"],
    ["Raccolta poesie", "Pietro Pacciani"]
]

window.onload = () => {
    book = books[Math.floor(Math.random() * books.length)]
    title.placeholder = book[0]
    author.placeholder = book[1]
}

textarea.addEventListener('input', () => {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';

    sharebtn.disabled = textarea.value.length == 0
});

const share = async () => {
    sharebtn.disabled = true
    sharebtn.textContent = "Loading"


    const res = await fetch(`${url}/quote?t=${title.value}&a=${author.value}&q=${textarea.value}`, {
        method: "GET",
    })

    const blob = await res.blob();
    const img_url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = img_url;
    a.download = `${title.value}-${author.value}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);


    sharebtn.disabled = false
    sharebtn.textContent = "Scarica"
}
