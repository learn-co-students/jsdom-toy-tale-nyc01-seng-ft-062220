let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.getElementById("toy-collection")
  //const toyForm = document.querySelector(".add-toy-form")

  

  function renderToy(toyObject) {
    const newToyDiv = document.createElement("div")
    newToyDiv.classList.add("card")
    newToyDiv.innerHTML = `
      <h2>${toyObject.name}</h2>
      <img src=${toyObject.image} class="toy-avatar" />
      <p>${toyObject.likes} Likes </p>
      <button class="like-btn">Like <3</button>
    `
    toyCollection.append(newToyDiv)
  }

  function renderToys(toys) {
    toys.forEach(function(toy) {
      renderToy(toy)
    })
  }

addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

document.addEventListener("click", (e) => {
  const toyLikes = document.querySelector(".card p");
  let toyLikesP = toyLikes.textContent;
  let toyLikesCount = parseInt(toyLikes.textContent.split(" ")[0])
  let toyCounter = toyLikesCount
  if (e.target.matches(".like-btn")){
    toyLikesP = toyCounter++;
    console.log(toyLikes);
  }
})

document.addEventListener("submit", (e) => {
  const toyName = e.target.name.value
  const toyUrl = e.target.image.value

  let formData = { 
    "name": toyName,
    "image": toyUrl,
    "likes": 0
  };
  
  createToy(formData);

  // this.setTimeout(getToys, 300);
  e.preventDefault();
})


function getToys () {
fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toys => renderToys(toys))
}

function createToy(formData) {
  
  let fetchConfigObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData) 
  }
  fetch("http://localhost:3000/toys", fetchConfigObj)
    .then(response => response.json())  
    .then(toy => renderToy(toy))
}

getToys()

});



/*

2nd round deliverables
- 



first set deliverables -- to do
- create a fetch request for toy data DONE
- Build div tags with data strctured like this"
  - h2 = name
  - image with src=imag attr
  - p with like #
  - button with class like bttn

  Add new toy



*/


