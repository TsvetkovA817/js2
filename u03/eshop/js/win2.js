let arrCart=[];

class winCart {

    constructor(container = '.cart', mW){
        this.container = container;
        this.goods = [];     //массив товаров из JSON документа
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
            //this.render();

    }

    getProducts(){
      
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
       
    }


    addProd(id) {
        
        for (let el of clist.goods){
            if(el.id_product==id){
                let k=Number.parseInt(el.quantity);
                k+=1;
                el.quantity=k;
                alert(`Товар ${el.product_name} добавлен в корзину. Этого товара в корзине ${el.quantity}`);
                const block = document.querySelector('.cart');
                block.innerHTML='';
                clist.render();
            }
        }
    }

    delProd(id) {
        alert('1_del '+id);
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
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
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



let clist = new winCart();

const test1 = () =>{
    let array = JSON.parse(localStorage.getItem("arrCart"));
    console.log(array);
    console.log(localStorage.getItem("saveCart"));
    alert('Данные в консоле');
}


const buy_prod = (id) => {
    clist.addProd(id);
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
