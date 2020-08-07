let addToy = false;
const url = `http://localhost:3000/toys`
document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.querySelector("#toy-collection")
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  
  const patchToy = (value, cardID) => {
    fetch(url+`/${cardID}`, {
      method: `PATCH`,
      headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": value
      })
    })
      .then(resp => resp.json())
      .then(resp => {
        
        const card = document.getElementById(`${resp.id}`)
        const likePTag = card.querySelector(`p`)
        likePTag.innerText = `${resp.likes} likes`
      })
  }

  const getToys = (object) => {
    fetch(url)
    .then(response => response.json())
    .then(toys => {
      toys.forEach(toy => {
        putToyOnCard(toy)
      });
    })
  }
  
  const postToys = (name, toyUrl) => {
    fetch(url, 
      {
        method: `POST`,
        headers: 
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "name": `${name}`,
          "image": `${toyUrl}`,
          "likes": 0
      })
    })
    .then(resp => resp.json())
    .then(toy => putToyOnCard(toy))
  }
  
  const putToyOnCard = (toyObject) => {
    const card = document.createElement(`div`)
    card.classList = `card`
    card.id = toyObject.id
    card.innerHTML = `
    <h2>${toyObject.name}</h2>
    <img src=${toyObject.image} class="toy-avatar" />
    <p>${toyObject.likes} likes</p>
    <button class="like-btn">Like <3</button>
    `
    toyCollection.append(card)
  }
  
  document.addEventListener('submit', e => {
    e.preventDefault()
    console.log(e.target)
    const form = e.target
    const toyName = form.name.value
    const toyImageUrl = form.image.value
    postToys(toyName, toyImageUrl)
    form.reset()
  })

  document.addEventListener(`click`, e => {
    if (e.target.matches(`.like-btn`)) {
      const likeButton = e.target
      const card = likeButton.parentNode
      const likePTag = likeButton.parentNode.querySelector(`p`)
      const newValue = parseInt(likePTag.innerText) + 1
      patchToy(newValue, card.id)
    }
  })
  
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  getToys()
  
});
