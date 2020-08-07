let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
      const addBtn = document.querySelector("#new-toy-btn");
      const toyFormContainer = document.querySelector(".container");
      addBtn.addEventListener("click", () => {
        // hide & seek with the form
        addToy = !addToy;
        if (addToy) {
          toyFormContainer.style.display = "block";
        } else {
          toyFormContainer.style.display = "none";
        }
      });
    //the end of addbuttonlistener

    fetch('http://localhost:3000/toys')
      .then(function(resp) {
        return resp.json()     //converts to json
    })
     .then(function(toys) {
        for (let i = 0; i < toys.length; i++) {
        createCard(toys[i]);
        }
      })
      
    let toyForm = document.getElementsByClassName("add-toy-form")[0];
    toyForm.addEventListener("submit", (e) => {
          e.preventDefault()      
        sendToy()
    })

    let toyCollection = document.getElementById('toy-collection') //why was this out of scope?
    // console.log(toyCollection);

    toyCollection.addEventListener("click", (e) => {
      if (e.target.className === "like-btn") {
        increaseLikes(e.target)
      }

    })
    //the end of DOMContentLoaded eventlistener
  
    });
    
    function createCard(toy) {
      toyInfo = ` <div class="card">
      <h2 id = ${toy.id} >${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
      </div>`
let toyCollection = document.getElementById('toy-collection') //why was this out of scope?
let card = document.createElement('div')
card.innerHTML = toyInfo;

toyCollection.append(card)
}

function sendToy() {

  let formData = {
    name: document.querySelector('[name=name]').value,
    image: document.querySelector('[name=image]').value,
    likes: 0 }
  
   let configObj = {
    method: 'POST',
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(formData)
};


  fetch('http://localhost:3000/toys', configObj) //configObj is a post, default is get
  .then(function(response) {
    console.log(response)
    return response.json();

  })
  .then(function(object) {
    createCard(object);
  })
  .catch(function(error) {
    alert("Errors!");
    console.log(error.message);
  });
}

function increaseLikes(button) {
  let toy = button.parentNode
let toyLikes = toy.querySelector('p')
let commentNumber = parseInt(toyLikes.innerText.split(" ")[0])
commentNumber ++


  // when user clicks like, like increases for the toy
function updateLikes(toy, commentNumber){
  
  let toyID = toy.querySelector('h2').id
  let formData = {likes: commentNumber }
  
   let configObj = {
    method: 'PATCH',
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(formData)
};


  fetch(`http://localhost:3000/toys/${toyID}`, configObj) //configObj is a post, default is get
  .then(function(response) {
    console.log(response)
    return response.json();

  })
  .then(function(object) {
    let h2 = document.getElementById(object.id);
    h2.parentNode.querySelector("p").innerText = ` ${object.likes} likes`
  })
  .catch(function(error) {
    alert("Errors!");
    console.log(error.message);
  });






}
 updateLikes(toy,commentNumber)
}

//X1) Find the toy collection <div> 
//X2) Make an element called div.card
//X3) Get toy info and insert into div.card
//X4) Add listener to form 
//X5) Add listener for clicks for likes
//6) Create post and patch action
//7) Turn like button into patch