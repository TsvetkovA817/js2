const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                 this.goods = data;
//                 console.log(data);
                 this.render()
            });
    }
 
    _getProducts(){
      
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
       
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    
    buyProd(id) {
        let f=false;
        for (let el of clist.goods){
            if(el.id_product==id){
                f=true;
                let k=Number.parseInt(el.quantity);
                k+=1;
                el.quantity=k;
                alert(`Товар ${el.product_name} добавлен в корзину. Этого товара в корзине ${el.quantity}`);
                const block = document.querySelector('.cart');
                block.innerHTML='';
                clist.render();
            }
        }
        //если еще не купили этот товар, то добавляем новую запись в корзину
        if (!f){
            for (let el of this.goods){
                if(el.id_product==id){
                  clist.goods.push({"id_product": el.id_product, "product_name": el.product_name, "price": el.price, "quantity": 1 });
                  const block = document.querySelector('.cart');
                  block.innerHTML='';
                  clist.render();
                }
            }  
        }
    }

    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
//            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn" onClick="buy_prod(${this.id});">Купить</button>
                </div>
            </div>`
    }
}

let arrCart=[];


class Cart {
    constructor(container = '.cart'){
        this.container = container;
        this.goods = [];     //массив товаров 
        
        this._getProducts()
            .then(data => {  //data - объект js
                 this.goods = data.contents;
                 //console.log(data);
                 arrCart=this.goods;
                 localStorage.removeItem("arrCart")
                 localStorage.setItem("arrCart", JSON.stringify(arrCart));
                 localStorage.setItem("saveCart", false);
                 this.render();
            });
    }

    _getProducts(){
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }
    
    getCart(){
            this._getProducts()
                .then(data => {  //data - объект js
                    this.goods = data.contents;
                    //console.log(data);
                    arrCart=this.goods;
                    localStorage.removeItem("arrCart");
                    localStorage.setItem("arrCart", JSON.stringify(arrCart));
                    localStorage.setItem("saveCart", false);
                    this.render();
                });
    }

    addProd() {
        //buyProd(id) в ProductsList
    }
    
    editProd() {
    }

    delProd(id) {
        for (let el of clist.goods){
            if(el.id_product==id){
                let k=Number.parseInt(el.quantity);
                k-=1;
                el.quantity=k;
                alert(`Товар ${el.product_name} удален из корзины. Этого товара в корзине ${el.quantity}`);
                const block = document.querySelector('.cart');
                block.innerHTML='';
                clist.render();
            }
        }
    }
    
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new elemCart(product);
//            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }

    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }

}


class elemCart {
    constructor(product, img = 'https://via.placeholder.com/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.kol = product.quantity;
        this.id = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>Цена: ${this.price} $</p>
                    <p>Количество: ${this.kol} шт</p>
                    <button class="buy-btn" onClick="buy_prod(${this.id});">Добавить</button>
                    <button class="buy-btn" onClick="del_prod(${this.id});">Удалить</button>
                </div>
            </div>`
    }
}



class winCart {

    constructor(container = '.cart', mW){
        this.container = container;
        this.goods = [];     //массив товаров
        /*
        this._getProducts()
            .then(data => {  //data - объект js
                 this.goods = data.contents;
                 console.log(data);
                 this.render()
            });
        */
            arrCart = JSON.parse(localStorage.getItem("arrCart"));
            this.goods = arrCart;
            localStorage.setItem("saveCart", false);
            this.render();
    }

    _getProducts(){
      
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
       
    }

    render(){
        const block = mW.document.querySelector(this.container);
        
        for (let product of this.goods){
            const productObj = new elemCart(product);
//            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
}


const btnCartOpen = () => {

  try
  {
    mW.close();
  }
  catch(err)
  {
  }
  mW = window.open('','cart','width=500,height=500');
  
mW.document.write(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Корзина</title>
<link rel="stylesheet" href="css/normalize.css"><link rel="stylesheet" href="css/style.css"></head>
<body> <h2>Your shopping cart</h2><h3>Save and order</h3><div class="cart"></div>
<div class="btn1"><button class="buy-btn" onclick="cart_save();">Сохранить</button>
<button onclick="test1();">проверка</button></div> 
<script src="js/win2.js"></script>
</body></html>`);

 let cart = new winCart(container='.cart', mW);
 mW.focus();
}

const test1 = () =>{
    //console.log(arrCart);
    let array = JSON.parse(localStorage.getItem("arrCart"));
    console.log(array);
    console.log(localStorage.getItem("saveCart"));
    alert('Данные в консоле');
}

let list = new ProductsList();
let clist = new Cart();


const buy_prod = (id) => {
    list.buyProd(id);
};

const del_prod = (id) => {
    clist.delProd(id);
};

const cart_save = () => {
    localStorage.removeItem("arrCart")
    localStorage.setItem("arrCart", JSON.stringify(arrCart));
    localStorage.setItem("saveCart", true);
    alert('Сохранено');
};
