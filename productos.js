

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




/*
let productos = {

    render: () => {
        const urlAPI = 'http://localhost:3300/api/product';
        const container = document.querySelector('#col');
        let contentHTML = '';

        fetch(urlAPI)
            .then(res => res.json())
            .then((json) => {
                for (const producto of json.data.results) {
                    let urlProducto = producto.urls[0].url;
                    contentHTML += `
                      <div class="col-md-3">
                          <a href="${urlProducto}" target="_blank">
                            <img src="${producto.url_image} alt="${producto.name}" class="img">
                          </a>
                          <h3 class="title">${producto.name}</h3>
                            <h3 class="price">${producto.price}</h3>
                             <h3 class="discount">${producto.discount}</h3>
                             <h3 class="category">${producto.category}</h3>
                      </div>`;
                }
                container.innerHTML = contentHTML;
            })
    }
};

productos.render();
*/
