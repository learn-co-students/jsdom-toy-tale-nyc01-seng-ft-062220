let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyDivCont = document.getElementById("toy-collection")
  //index:
  const url = "http://localhost:3000/toys/"


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function getToys() {
    fetch(url)
      .then(response => response.json())
      .then(toyData => {renderToys(toyData) })
    }

  function renderToy(toyObj) {
      newToyDiv = document.createElement("div")
      newToyDiv.className = "card"
      newToyDiv.dataset.id = toyObj.id
      const toyName = toyObj.name
      const toyImage = toyObj.image
      const toyLikes = toyObj.likes
      
      
      newToyDiv.innerHTML = `
      <h2>${toyName}</h2>
      <img src=${toyImage} class="toy-avatar" />
      <p>${toyLikes} Likes </p>
      <button class="like-btn">Like <3</button>
      `
      toyDivCont.append(newToyDiv)
  }

  function renderToys(multToyObjects) {
    multToyObjects.forEach(renderToy)
  }

  toyFormContainer.addEventListener("submit", function(e){
    let form = e.target
    newToyName = form.name.value
    newToyImage = form.image.value
    console.log("I was clicked!")
    e.preventDefault()

    let newToyObj = {
      name: newToyName,
      image: newToyImage,
      likes: 0
    }

    let configObject = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newToyObj)
    }
    
    fetch(url, configObject)
      .then(response => response.json())
      .then(newToy => renderToy(newToy))

  })

  toyDivCont.addEventListener("click", function(e){
    //console.log(e.target)
    if (e.target.matches(".like-btn")) {
        
        const clickedToyId = parseInt(e.target.parentElement.dataset.id)
        const likePara = e.target.parentElement.querySelector("p")
        const likeNum = parseInt(likePara.textContent[0]) + 1
        
        const configObj = {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'  
          },
          body: JSON.stringify({likes: likeNum})
          
        }

        fetch(url + clickedToyId, configObj)
          .then(response => response.json())
          .then(toyData => {likePara.textContent = `${likeNum} Likes`})

      
      console.log(e.target.parentElement)
    }
  })


getToys()

});


/*

PLAN
- DONEfetch andys toys 
  - DONEget request - fetch all toys from DB
  - DONEadd each toy to a div
    - DONEhelper function - render one/render all
  -  DONE(add them to DOM)
  
- Add new toy
  - DONE event listner on form
  - DONE pull values from form and build object to be stringified
  - DONE post request with form data to update DB
  - DONE pessamistically render to DOM

- Likes
  - event listener delegation on like buttons
  - Patch request to server updating likes for toy
  - pessamistically update DOM after DB

*/

































// let addToy = false;

// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
//   const toyCollection = document.getElementById("toy-collection")
//   //const toyForm = document.querySelector(".add-toy-form")

  

//   function renderToy(toyObject) {
//     const newToyDiv = document.createElement("div")
//     newToyDiv.classList.add("card")
//     newToyDiv.innerHTML = `
//       <h2>${toyObject.name}</h2>
//       <img src=${toyObject.image} class="toy-avatar" />
//       <p>${toyObject.likes} Likes </p>
//       <button class="like-btn">Like <3</button>
//     `
//     toyCollection.append(newToyDiv)
//   }

//   function renderToys(toys) {
//     toys.forEach(function(toy) {
//       renderToy(toy)
//     })
//   }

// addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });

// document.addEventListener("click", (e) => {
//   const toyLikes = document.querySelector(".card p");
//   let toyLikesP = toyLikes.textContent;
//   let toyLikesCount = parseInt(toyLikes.textContent.split(" ")[0])
//   let toyCounter = toyLikesCount
//   if (e.target.matches(".like-btn")){
//     toyLikesP = toyCounter++;
//     console.log(toyLikes);
//   }
// })

// document.addEventListener("submit", (e) => {
//   const toyName = e.target.name.value
//   const toyUrl = e.target.image.value

//   let formData = { 
//     "name": toyName,
//     "image": toyUrl,
//     "likes": 0
//   };
  
//   createToy(formData);

//   // this.setTimeout(getToys, 300);
//   e.preventDefault();
// })


// function getToys () {
// fetch('http://localhost:3000/toys')
//   .then(response => response.json())
//   .then(toys => renderToys(toys))
// }

// function createToy(formData) {
  
//   let fetchConfigObj = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify(formData) 
//   }
//   fetch("http://localhost:3000/toys", fetchConfigObj)
//     .then(response => response.json())  
//     .then(toy => renderToy(toy))
// }

// getToys()

// });



// /*

// 2nd round deliverables
// - 



// first set deliverables -- to do
// - create a fetch request for toy data DONE
// - Build div tags with data strctured like this"
//   - h2 = name
//   - image with src=imag attr
//   - p with like #
//   - button with class like bttn

//   Add new toy



// */


