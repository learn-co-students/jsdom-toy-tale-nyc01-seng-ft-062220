fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
.then(response =>response.json())
.then(data => {
    
    let element = document.getElementById('list')
    let pikachu = document.createElement('div')
    pikachu.innerHTML=`
    <h3>${data.forms[0].name}</h3>
    <img src=${data.forms[0].url}>
    `
    debugger
    element.appendChild(pikachu)





})