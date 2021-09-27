
// document.addEventListener("DOMContentLoaded", () => {
//  const addBtn = document.querySelector("#new-toy-btn");
//  const toyFormContainer = document.querySelector(".container");
//  addBtn.addEventListener("click", () => {
//    // hide & seek with the form
//    addToy = !addToy;
//    if (addToy) {
//      toyFormContainer.style.display = "block";
//    } else {
//      toyFormContainer.style.display = "none";
//    }
//  });
// });

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let divCollect = document.querySelector('#toy-collection')

// make a get request, do not forget to return fetch
function getToys(){
  return fetch('http://localhost:3000/toys')
    .then(res => res.json())
}

// send the post request
// The Response object represents what the destination server sent back to us. 
function postToy(toyData){
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toyData.name.value,
      "image": toyData.image.value,
      "likes": 0
    })
  })
  .then(res => res.json())
  .then((obj_toy) => {
    renderToys(obj_toy)
  })
}

function likes(e){
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch('http://localhost:3000/toys/${e.target.id}', {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": more 
    })
  })
  .then(res => res.json())
  .then((likeObj => {
    e.target.previousElementSibling.innerText = `${more} likes`; 
  }))
}

// add and display the toy info to the card
function renderToys(toy){

  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  divCollect.append(divCard)
}

addBtn.addEventListener('click',() => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
      postToy(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

getToys().then(toys => {
  toys.forEach(toy => {
    renderToys(toy)
  })
}) 
