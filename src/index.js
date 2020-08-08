document.addEventListener("DOMContentLoaded", () => {

  let addToy = false; //default display switch to false
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyUrl = "http://localhost:3000/toys/"; //extra / is important! 
  const toyCollection = document.getElementById("toy-collection");
  const toyForm = document.getElementsByClassName("add-toy-form");

  //fetch all toy function 
  async function fetchToys(){
    let response = await fetch(toyUrl)
    let data = await response.json()
    data.map(toy => renderToy(toy))
  }

  //render function
  function renderToy(toy){
    const card = document.createElement("div")
    //also set the id to the card will come in handy in patch
    card.id = toy.id 
    card.className = "card"
    card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p><span>${toy.likes}</span> Likes </p>
    <button class="like-btn">Like <3</button>`

    //add each toy div onto collection 
    toyCollection.append(card)
  }

  //post function (add toy - from form)
  async function postToy(name, image){
    const settings = {
      method: 'POST',
      headers:{
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'image': image,
        'likes': 0
      })
    }
    const response = await fetch(toyUrl, settings)
    const data = await response.json()
    return data
  }

 //Patch toys in API
 async function patchToy(id, likes){
    const settings = {
      method: 'PATCH',
      headers:{
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        'likes': likes
      })
    }
    console.log(toyUrl + id)
    const response = await fetch(toyUrl + id, settings) //add the id to the url
    const data = await response.json()
    return data
 }

  //function for increasing likes 
  function increaseLike(event){ //event is the target set to class like-btn 
    let parentId = event.target.parentNode.id //go up one level from like-btn
    let likecount = event.target.previousElementSibling.children[0] //span helps nest out the value and the text 'likes'. DO NOT FORGET .childern
    let likeValue = Number(likecount.innerText) + 1  //update value each like 
    patchToy(parentId, likeValue)
  }

  //event listener for the entire form 
  document.addEventListener('click', e => {
    if(e.target.matches('.like-btn')) {
      increaseLike(e)
    } 

    //addBtn should only listen to the new-toy-btn events
    addBtn.addEventListener("click", () => {
      // hide and seek with the form 
      addToy = !addToy;
      if(addToy){ // true
        toyFormContainer.style.display = "block";
        //add functionality to create toy form
        toyForm.addEventListener("submit", e =>{
          e.preventDefault()
          //grab the two form fields by id
          let toyName = toyForm.getElementById("toy-name").value
          let toyImage = toyForm.getElementById("toy-image").value
          //invoke the POST (patch) request to the API
          postToy(toyName, toyImage);
        })

      } else { //false
        toyFormContainer.style.display = "none";
      }
    })
  })

  //invoke functions
  fetchToys()

})