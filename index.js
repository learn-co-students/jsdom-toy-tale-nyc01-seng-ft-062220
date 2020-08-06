
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


//1. grab like button and like number.
//2. listen for click
//3. increment like.

function increaseLike() {
    document.addEventListener("click", function(e) {
        e.preventDefault()
        if (e.target.matches(".like-btn")) {
            const button = e.target
            const parentLi = button.parentElement
            let likeValueContainer = parentLi.querySelector("p")
            let likeValue = parseInt(likeValueContainer.innerText) + 1

            likeValueContainer.innerText = likeValue

        }
    })

}

function submitHandler() {

    document.addEventListener("click", function(e){

        if(e.target.matches(".submit")) {
            e.preventDefault()

            const form = e.target

            const name = form.name
            const image = form.image

            console.log(form.name)
            const newToy = {name: name, image: image}

            createToy(newToy)
            form.reset()
        }

    })

}



function createToy(newToy) {

    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newToy)
    };

    fetch("http://localhost:3000/toys", configObj)
        .then(function(response) {
            return response.json();
        })
        .then(function(object) {
            console.log(object);
        });
}






/*

let formData = {
    dogName: "Byron",
    dogBreed: "Poodle"
};

let configObj = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(formData)
};

fetch("http://localhost:3000/dogs", configObj)
    .then(function(response) {
        return response.json();
    })
    .then(function(object) {
        console.log(object);
    });

*/





increaseLike()
getToys()
submitHandler()