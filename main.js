const searchField = document.getElementById('inp-search');
const output = document.getElementById('output');

window.addEventListener('load', () => {
    loader();
    fetchCharacters();
})

searchField.addEventListener('change', () => {
    let searchQuery = searchField.value;
    loader();
    fetchCharacters(searchQuery);
});

function loader() {
    output.innerHTML = '<div class="gif-spinner mx-auto"><img src="images/loader.webp"></img></div>'
}

async function fetchCharacters(query) {
    let data;

    if (query) {
        data = await fetch(`https://www.breakingbadapi.com/api/characters?name=${query}`);
    } else {
        data = await fetch('https://www.breakingbadapi.com/api/characters');
    }

    output.innerHTML = "";
    let result;

    result = await data.json();

    result.map(result => {
        const htmlString = `<img src="${result.img}" class="img">
            <div class="info-display">
                <h5>Name: ${result.portrayed}</h5>
                <hr>
                <h6>Actor Name: <span>${result.name}</span></h6>
                <h6>Nickname: <span>${result.nickname}</span></h6>
                <h6>Birthday: <span>${result.birthday}</span></h6>
                <h6>Status: <span>${result.status}</span></h6>
            </div>`;

        let outputString = document.createElement('div');
        outputString.classList.add('col-md-3', 'mb-3', 'img-info');
        outputString.innerHTML = htmlString;
        output.appendChild(outputString);
    });
}