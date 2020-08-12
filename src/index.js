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
  const divContainer = document.querySelector("#toy-collection")

  BASE_URL = "http://localhost:3000/toys"

   
    fetch(BASE_URL)
    .then(response => response.json())
    .then(toys => toys.forEach(toy =>renderToy(toy)))
    
       function renderToy(toy){
         const toyContainer = document.createElement('div')
         divContainer.appendChild(toyContainer)
         toyContainer.innerHTML = `
         <div class="card">
         <h2>${toy.name}</h2>
         <img src=${toy.image} class="toy-avatar" />
         <p> ${toy.likes} Likes </p>
         <button class="like-btn" id =${toy.id}>Like <3</button>
         </div>
         `
       }//f renderToy
  
     
    let form = document.querySelector(".add-toy-form")
    form.addEventListener("submit", function(e){  
    e.preventDefault()
    let name = e.target.name.value
    let image = e.target.image.value
    let likes = 0

    let newToy = {
      name: name,
      image: image,
      likes: likes
    }
    renderToy(newToy) 
      fetch(`http://localhost:3000/toys`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
        },
        body: JSON.stringify({
          name: name, 
          image: image, 
          likes: likes
        })
       })
       
      })//form event listener
       document.addEventListener("click", e=>{
         
         let likeId = parseInt(e.target.id)
         let p = e.target.parentNode.children[2]
         let likes = parseInt(p.innerText.split(" ")[0])
         let newLikes = likes+1
         console.log(newLikes)
         
         let options = {
           method: "PATCH",
           headers: {
             "Content-Type": "application/json",
             Accept: "application/json"
            },
            body: JSON.stringify({likes:newLikes})
          }
          
          fetch(`http://localhost:3000/toys/${likeId}`, options )
          .then(data =>{
            
            p.innerText=`${newLikes} Likes`
             })
             
    })
    
      
})//dom loaded
