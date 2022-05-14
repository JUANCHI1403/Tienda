
const items = document.getElementById('items')
const templateCard = document.getElementById('template-card').content
let fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', () =>{
    fetchData()
})

const fetchData = async () => {
try{
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')// la url
    const  data= await res.json()
    //console.log(data)
    getCarShopping(data)
} catch (error) {
         console.log(error)
}
    
}

const getCarShopping = data => {
    data.forEach(producto => {
        console.log(producto)
        templateCard.querySelector('h2').textContent = producto.tittle //`h5`

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
}



/*
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))


let carShopping = {
    1: {nombre: "item 1"},
    2: {nombre: "item 2"},
    3: {nombre: "item 3"},
    4: {nombre: "item 4"}

};

for (const key in carShopping) {
    if (carShopping.hasOwnProperty(key)){
        const element = carShopping[key];
        console.log(element)
    }
}

Object.values(carShopping).forEach((item) => console.log(item));

console.log(carShopping[1]);
console.log(Object.keys(carShopping));
console.log(Object.keys(carShopping).length);


*/
