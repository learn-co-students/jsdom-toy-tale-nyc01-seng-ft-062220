let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const url = 'http://localhost:3000/toys/'
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      toyForm.addEventListener("submit", event => {
        event.preventDefault()
        renderNewToy(event.target)
      })
    } else {
      toyForm.style.display = "none";
    } 
  });


const getToy = () => {
  return fetch(url)
  .then(resp => resp.json())
};

const postNewToy = (newToy) => {
  let toyObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newToy) 
  };
  fetch(url, toyObj)
  .then(resp => resp.json())
  .then(newtoy => renderToy(newtoy))
};


const renderToy = (toy) => {
  const toyCards = document.querySelector("#toy-collection")
  const toyCard = document.createElement("div")
  toyCard.className = "card"
  toyCard.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p id=${toy.id}> ${toy.likes} likes</p>
    <button class="like-btn">Like <3</button>
  `
  toyCards.append(toyCard)
};


const renderNewToy = (input) => {
  let name = input.name.value
  let image = input.image.value
  newToy = {
    "name": name,
    "image": image
  };
  postNewToy(newToy);
};

const increaseLikes = () => {
  document.addEventListener("click", function(e){
    if (e.target.matches(".like-btn")){
    const toy = e.target.previousElementSibling
    const likes = {"likes": `${parseInt(toy.innerHTML) + 1}`}
    const toyId = toy.id
    patchToy(toyId, likes)
    }
  });
};

increaseLikes()

const patchToy = (toyId, likes) => {
  let toyObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(likes) 
  };
  fetch(url + toyId, toyObj)
  .then(resp => resp.json())
  .then(toy => {
    let likeEle = document.getElementById(`${toy.id}`)
    likeEle.innerText = `${toy.likes} likes`
  })
};


getToy().then(toys => {
  toys.forEach(toy => {
    renderToy(toy)
  });
});

});


