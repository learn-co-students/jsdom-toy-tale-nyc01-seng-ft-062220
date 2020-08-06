let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  // const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  document.addEventListener("click", function(e){
    if (e.target.matches("#new-toy-btn")) {
      // hide & seek with the form
      addToy = !addToy;
      if (addToy) {
        toyFormContainer.style.display = "block";
      } else {
        toyFormContainer.style.display = "none";
      }
    } else if (e.target.matches(".like-btn")) {
      let likeButton = e.target
      toyName = likeButton.parentNode.querySelector("h2").innerText
      
      patchData(likeButton.parentNode)
    }
  });


    
  const submitHandler = () => {
    document.addEventListener("submit", function(e){
      submitData(e.target)
    })
  }

  function renderToys (toyCollection) {
    toyCollection.forEach(function(toyObj){
      renderToy(toyObj)
    })
  }

  function renderToy (toy) {
    const toyDiv = document.createElement('div')
    toyDiv.classList.add("card")

    toyDiv.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes}</p>
      <button class="like-btn">Like <3</button>
    `
    toyDiv.id = toy.id

    toyCollection = document.querySelector("#toy-collection")
    toyCollection.append(toyDiv)
  }

  const getToys = () => {
    fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toyCollectionJson => renderToys(toyCollectionJson))
  }

  function submitData(toyForm){
    let formData = {
        name: toyForm.name.value,
        image: toyForm.image.value,
        likes: 0
      };
       
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };
       
    fetch("http://localhost:3000/toys", configObj)
        .then(function(response) {
            response.json();
        })
        .then(function(toyObject) {
            renderToy(toyObject)
        })
        .catch(function(error) {
          console.log(error.message)
        });
    }

    function updateLikes(jsonObject,toyObject){ 
      //toyObject will have the name/img/id of the toy we want to update/
        //we need to find the corresponding HTML element, and update the likes with the JSON likes

      // toyObject.querySelector("p").innerText = jsonObject.likes
      let likes = parseInt(toyObject.querySelector("p").innerText)
      likes += 1 
      toyObject.querySelector("p").innerText = likes
    }

    function patchData(toyObject){

      function retrieveLikes(toyObject){
        let likes = parseInt(toyObject.querySelector("p").innerText,10)
        likes += 1
        return likes
      }

      let formData = {
        likes: retrieveLikes(toyObject)
      }
         
      let configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      };
         
      fetch(`http://localhost:3000/toys/${toyObject.id}`, configObj)
          .then(function(response) {
            response.json();
          })
          .then(function(jsonObject) {
            updateLikes(jsonObject,toyObject)
          })
          .catch(function(error) {
            console.log(error.message)
          });
      }
    
    submitHandler()
    getToys()
});


