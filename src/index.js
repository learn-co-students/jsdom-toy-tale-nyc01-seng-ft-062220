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

  const newForm = document.querySelector(".add-toy-form")
  function clickHandler(){
    newForm.addEventListener("submit", function(e){
      e.preventDefault();
      const toyForm = e.target
      const name = toyForm.name.value;
      const image = toyForm.image.value;
      const final = { name: name, image: image};
      //save the values onto an obj then apply the API POST 
      uploadToy(final)
      alert("ADDED")
      toyForm.reset();
    })
  }
  
  function likesHandler(){
    document.addEventListener("click", function(e){

      if(e.target.matches(".like-btn")){
        // e.preventDefault()
        // console.log("LIKE BUTTON")
        const button = e.target
        const parentbutton = button.parentElement
        const toyId = parentbutton.querySelector("h4").innerText
        likeCount = parentbutton.getElementsByClassName("likes")
    
        let updatedLikes = parseInt(likeCount[0].innerHTML++)
        // updatedHtml = parseInt(updatedLikes.innerText++)
        
        console.log(updatedLikes)
        

        //Apply the patch 
        updateLikes(updatedLikes, toyId)
        
      } 
  
    })
  }

  clickHandler()
  likesHandler()

  function updateLikes(updateLikes, toyId){
    fetch(`http://localhost:3000/toys/${toyId}`,{
    method: 'PATCH',
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": `${updateLikes}`
    })
  }
)}

})

  function fetchToys(){
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => toys.forEach(toy => addCard(toy)));
  }

function addCard(toy){
  // grab cards id 
  const mainDiv = document.getElementById("toy-collection")
  // create new element div
  const newDiv = document.createElement("div") 
  newDiv.className = "card"
  //apply the toy obj onto the div (id, name, image, likes)
  newDiv.innerHTML = `
  <h4>${toy.id}</h4>
  <h2>${toy.name}</h2>
  <img class="toy-avatar" alt=""
      src="${toy.image}" />
  <p class="likes">${toy.likes}</p>
  <button class="like-btn">Likes</button>
  `
  mainDiv.appendChild(newDiv)

}




  function uploadToy(toyObj){
    fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
        "name": toyObj.name,
        "image": toyObj.image,
        "likes": 0 })
    })
  }
  





  fetchToys();