const textarea = document.getElementById('lyrics');
const title = document.getElementById('title')
const author = document.getElementById('author')
const sharebtn = document.getElementById('share');

//const url = 'https://sgrodolix.website/api'
const url = 'http://127.0.0.1:2000/api'

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
    a.download = `${title}-${author}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);


    sharebtn.disabled = false
    sharebtn.textContent = "Scarica Bene"
}
