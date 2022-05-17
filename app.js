// constante y captura eventos
const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let ShopingCar = []
let contenido = document.querySelector("#Productos")

// funcion consumo/obtener datos de API
function mostrar(){
    fetch('http://localhost:3300/api/product')
        .then(res => res.json())
        .then((producto) => {
            console.log(producto[0])
            let productoJson = Object.keys(producto).length;


            for (let i = 0; i < productoJson; i++) {
                contenido.innerHTML += `

               <div class="col d-flex justify-content-center mb-4">
                <div class="card shadow mb-1 bg-dark rounded" style="width: 20rem;">
                    <h5 class="card-name pt-2 text-center text-primary">${producto[i].name}</h5>
                    <img src="${producto[i].url_image}" class="card-img-top" alt="...">
                    <div class="card-body ">
                       
                        <h5 class="text-primary">Precio: <span class="price">${producto[i].price}</span></h5>
                            <h5 class="text-primary">Discount: <span class="discount">${producto[i].discount}</span></h5>
                        
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary button d-block">Añadir a Comprar</button>
                        </div>
                    </div>
                </div>
            </div>
    
      `
            }
        })
}
mostrar()

Clickbutton.forEach(btn => {
    btn.addEventListener('click', getShopingCar)
})

//FUNCION PARA CREAR CARRO DE COMPRAS
function getShopingCar(e){

    const button = e.target
    const producto = button.closest('.card')

    const productoTitle = producto.name;
    const productoImg = producto.url_image;
    const productoPrice = producto.price;
    const productoCategroria = producto.category;


    const newProducto = {
        title: productoTitle,
        precio: productoPrice,
        img: productoImg,
        categoria: productoCategroria,
        cantidad: 1
    }

    addShopingCar(newProducto)
}
//AGREGAR PRODUCTOS CARRO DE COMPRAS
function addShopingCar(newProducto){

    const alert = document.querySelector('.alert')

    setTimeout( function(){
        alert.classList.add('hide')
    }, 2000)
    alert.classList.remove('hide')


    const InputElemnto = tbody.getElementsByClassName('input__elemento')
    for(let i= 0; i<ShopingCar.length; i++){
        if(ShopingCar[i].title.trim() === newProducto.title.trim()){
            ShopingCar[i].cantidad ++;
            const inputValue = InputElemnto[i]
            inputValue.value++;
            ShopingCarTotal()
            return null;
        }
    }

    ShopingCar.push(newProducto)

    renderShopingCar()
}


function renderShopingCar(){
    tbody.innerHTML = ''
    ShopingCar.map(producto => {
        const tr = document.createElement('tr')
        tr.classList.add('ItemShopingCar')
        const Content = `
    
                <th scope="row">1</th>
                <td class="table__productos">
                    <img src= ${producto.img} alt="">
                <h6 class="title">${producto.title}</h6>
                <td class="precio"><p>${producto.precio}</p></td>
                <td class="cantidad">
                    <input type="number" min="1" value=${producto.cantidad} class="input__elemento">
                    <button class="delete btn btn-danger">x</button>
                </td>
           
    `
        tr.innerHTML = Content;
        tbody.append(tr)

        tr.querySelector(".delete").addEventListener('click', removeItemShopingCar)
        tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
    })
    ShopingCarTotal()
}

//TOTAL CARRO DE COMPRAS
function ShopingCarTotal(){
    let Total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal')
    ShopingCar.forEach((producto) => {
        const precio = Number(producto.precio.replace("$", ''))
        Total = Total + precio*producto.cantidad
    })

    itemCartTotal.innerHTML = `Total $${Total}`
    addLocalStorage

}
//REMOVERE DE CARRO DE COMPRAS
function removeItemShopingCar(e){
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".ItemShopingCar")
    const title = tr.querySelector('.title').textContent;
    for(let i=0; i<ShopingCar.length ; i++){

        if(ShopingCar[i].title.trim() === title.trim()){
            ShopingCar.splice(i, 1)
        }
    }

    const alert = document.querySelector('.remove')
    setTimeout( function(){
        alert.classList.add('remove')
    }, 2000)
    alert.classList.remove('remove')

    tr.remove()
    ShopingCarTotal()
}

//OBTENER TOTAL DE COMPRA
console.log(ShopingCar)
function sumaCantidad(e){
    const sumaInput  = e.target
    const tr = sumaInput.closest(".ItemShopingCar")
    const title = tr.querySelector('.title').textContent;
    ShopingCar.forEach(producto => {
        if(producto.title.trim() === title){
            sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
            producto.cantidad = sumaInput.value;
            ShopingCarTotal()
        }

    })

}
//GUARDAR EN LOCAL STORAGE
function addLocalStorage(){
    localStorage.setItem('ShopingCar', JSON.stringify(ShopingCar))
}

window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('ShopingCar'));
    if(storage){
        ShopingCar = storage;
        renderShopingCar()
    }
}
