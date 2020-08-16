document.addEventListener("DOMContentLoaded", function(){

    const toysUrl = "http://localhost:3000/toys/"

    getToys = () => {
        fetch(toysUrl)
        .then(response => response.json())
        .then(toyCollection => renderAllToys(toyCollection))
    }

    const renderAllToys = (toyCollection) => {
        toyCollection.forEach(toy => renderSingleToy(toy))
    }

    const renderSingleToy = (toyObj) => {
        const toyCollectionDiv = document.querySelector("#toy-collection")
        const cardDiv = document.createElement("div")
        cardDiv.classList.add("card")
        cardDiv.id = toyObj.id
        cardDiv.innerHTML = `
            <h2>${toyObj.name}</h2>
            <img src=${toyObj.image} class="toy-avatar" />
            <p id="likes">${toyObj.likes} likes</p>
            <button class="like-btn">Like <3</button>
            <button class="unlike-btn">Unlike </button>
        `
        toyCollectionDiv.append(cardDiv)
    }

     const clickHandler = () => {
         document.addEventListener("click", function(e) {
            if (e.target.matches(".like-btn")) {
                let button = e.target
                let parentDiv = button.parentElement
                let toyId = parentDiv.id
                let likeSpan = parentDiv.querySelector("#likes") 
                let currentLikes = parseInt(likeSpan.innerText.split(' ')[0])
                // debugger

                let newLikes = currentLikes + 1
    
                const configObj = {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify({likes: newLikes})
                }
                    fetch(toysUrl + toyId, configObj)
                    .then(response => response.json())
                    .then(updatedLikesObj => {console.log(likeSpan.innerHTML = `${updatedLikesObj.likes} likes`)})
                } else if (e.target.matches(".unlike-btn")){
                let button = e.target
                let parentDiv = button.parentElement
                let toyId = parentDiv.id
                let likeSpan = parentDiv.querySelector("#likes") 
                let currentLikes = parseInt(likeSpan.innerText.split(' ')[0])
                // debugger

                let newLikes = currentLikes - 1
    
                const configObj = {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify({likes: newLikes})
                }
                    fetch(toysUrl + toyId, configObj)
                    .then(response => response.json())
                    .then(updatedLikesObj => {console.log(likeSpan.innerHTML = `${updatedLikesObj.likes} likes`)})
                }
             })
        }

        const submitHandler = () => {
            document.addEventListener("submit", function(e){
                e.preventDefault()
                const form = document.querySelector("form")
                
                const toyObj = {    
                    name: form.children.name.value,
                    image: form.children.image.value,
                    likes: 0
                }

                const configObj = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(toyObj)
                }

                    fetch(toysUrl, configObj)
                    .then(response => response.json())
                    .then(newToy => renderSingleToy(newToy))

                    form.reset()
            })
        }


    submitHandler()
    clickHandler()
    getToys()

})
