const frmPesquisa = document.querySelector('form')

frmPesquisa.onsubmit = (ev) => {
    ev.preventDefault()
    const pesquisa = ev.target.pesquisa.value

    if (pesquisa == "") {
        alert('preencha o campo')
        return
    }

    const apiKey = '8fa8be48'

    fetch(`https://www.omdbapi.com/?s=${pesquisa}&apikey=${apiKey}`)
    .then(result => result.json())
    .then(json => carregaLista(json))
};

const carregaLista = (json) => {
    const lista = document.querySelector('div.lista')
    lista.innerHTML = ''

    json.Search.forEach( element => {
        let item = document.createElement('div')
        item.classList.add('item')

        item.innerHTML = `<img src = "${element.Poster}" /> <h3>${element.Title}</h3>`
    
        lista.appendChild(item)
    });
}