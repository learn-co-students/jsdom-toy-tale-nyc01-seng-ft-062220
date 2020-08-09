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

  
document.addEventListener("submit", e => {
  // e.preventDefault()
  
  const newToyObj = e.target 
  
  const name = newToyObj.name.value
  const image = newToyObj.image.value
  const likes = 0
  const toyObj = { 
    name: name,
    image: image,
    likes: likes
  };
  let configObj = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(toyObj)
  };

  fetch('http://localhost:3000/toys', configObj);
    
});


fetch('http://localhost:3000/toys')
.then(resp => resp.json())
.then(toysResponse => renderToys(toysResponse));

function renderToys(json){
  const container = document.getElementById("toy-collection")

  for (const toyAttr of json){
  const toyCard = document.createElement("div")
  toyCard.classList.add("card")
  toyCard.innerHTML = `
  <h2>${toyAttr.name}</h2>
  <img src= ${toyAttr.image} class="toy-avatar" />
  <p id=${toyAttr.id}> ${toyAttr.likes} Likes </p>
  <button class="like-btn">Like <3</button>
  `
  container.append(toyCard)
  };
  
}
 
document.addEventListener("click", function(e){
  if (e.target.matches(".like-btn")){
    const likeBtn = e.target
    const toyId = likeBtn.previousSibling.previousSibling.id
    const likes = parseInt(likeBtn.previousSibling.previousSibling.innerText) + 1
    const toyIdEle = likeBtn.previousSibling.previousSibling

    toyIdEle.innerText = `${parseInt(likes)} Likes`
  
    let configObj = {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": likes
      })
    };
    fetch(`http://localhost:3000/toys/${toyId}`, configObj)
    };
});

});
