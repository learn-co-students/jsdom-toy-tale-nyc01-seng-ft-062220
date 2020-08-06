// 1. get toys 
// 2. load cards from database
// 3. render/create cards
// 4. insert cards onto page in div class

const getToys = () => {
    fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toysCollection => renderCards(toysCollection))
}

function renderCards(toysCollection) {
    toysCollection.forEach (function (toysObj) {
        renderToy(toysObj)
    })
}

function renderToy(toysObj){
    const toyCard = document.createElement('div')
    toyCard.innerHTML = `
    <div class="card">
    <h2>${toysObj.name}</h2>
    <img src="${toysObj.image}" class="toy-avatar" />
    <p>${toysObj.likes}</p>
    <button class="like-btn">Like <3</button>
  </div>
    `
insertCards(toyCard)
}


function insertCards(toyCard) {
    let cardHolder = document.getElementById('toy-collection')
    cardHolder.append(toyCard)
}


  getToys()