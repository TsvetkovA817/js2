class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();//рекомендация, чтобы метод был вызван в текущем классе
        this.render();//вывод товаров на страницу
    }
    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Гамбургер1', price: 10 },
            { id: 2, title: 'Гамбургер2', price: 20 },
            { id: 3, title: 'Гамбургер3', price: 30 },
            { id: 4, title: 'Гамбургер4', price: 40 },
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        block.innerHTML = "";
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
            //              block.innerHTML += item.render();
        }
    }
}

class ProductItem {
    constructor(product, img = 'img/b1.jpg') {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render() {
        const block = document.querySelector('.desc');
        block.innerHTML = 'Описание: выбери бургер и нажми кн.Подробнее...';
    
        return `<div class="product-item">
                <img src="${this.img}">
                <h3 class="ph3">${this.title}</h3>
                <p>Price: ${this.price}=</p>
                <button class="desc-btn" data-id=${this.id} onClick="desc_Click(${this.id});">Подробнее</button>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}



class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.price = 0;
        this.kkal = 0;
        this.name = "Гамбургер";
        this.stuffname = "";
        this.adding = [{ idA: 0, nameA: "Без приправы" }, { idA: 0, nameA: "Без майонеза" }, { idA: 0, nameA: "Без перца" }, { idA: 0, nameA: "Без горчицы" }];

        if (size == 1) {
            this.name += ' малый'
            this.stuffname = "Без начинки";
        }
        if (size == 2) {
            this.name += ' большой'
            this.stuffname = "Без начинки";
        }
        if (stuffing == 1) {
            this.name += ' сырный'
            this.stuffname = "C сыром";
        }
        if (stuffing == 2) {
            this.name += ' салатовый'
            this.stuffname = "C салатом";
        }
        if (stuffing == 3) {
            this.name += ' картофельный'
            this.stuffname = "C картофелем";
        }
        this.price = this.calculatePrice();
        this.kkal = this.calculateCalories();
    }
    addTopping(topping) { // Добавить добавку 
        if (topping > 0 && topping < 5) {
            let i = topping - 1;
            if (topping == 1) { this.adding[i].idA = 1; this.adding[i].nameA = "C приправой"; }
            if (topping == 2) { this.adding[i].idA = 2; this.adding[i].nameA = "C майонезом"; }
            if (topping == 3) { this.adding[i].idA = 3; this.adding[i].nameA = "C перцем"; }
            if (topping == 4) { this.adding[i].idA = 4; this.adding[i].nameA = "C горчицей"; }
            this.price = this.calculatePrice();
            this.kkal = this.calculateCalories();
        }
    }
    removeTopping(topping) { // Убрать добавку 
        if (topping > 0 && topping < 5) {
            let i = topping - 1;
            if (topping == 1) { this.adding[i].idA = 0; this.adding[i].nameA = "Без приправы"; }
            if (topping == 2) { this.adding[i].idA = 0; this.adding[i].nameA = "Без майонеза"; }
            if (topping == 3) { this.adding[i].idA = 0; this.adding[i].nameA = "Без перца"; }
            if (topping == 4) { this.adding[i].idA = 0; this.adding[i].nameA = "Без горчицы"; }
            this.price = this.calculatePrice();
            this.kkal = this.calculateCalories();
        }
    }

    getInfo(){
        return `${this.name}  ${this.stuffname}  ${this.adding[0].nameA} ${this.adding[1].nameA}  ${this.adding[2].nameA}  ${this.adding[3].nameA} цена ${this.price} калорий ${this.kkal}`;
    }

    getToppings(topping) { // Получить список добавок 
        return this.adding
    }
    getSize() { // Узнать размер гамбургера
        return this.size;
    }
    getStuffing() { // Узнать начинку гамбургера
        return this.stuffing;
    }
    calculatePrice() { // расчет цены
        let v = 0;
        if (this.size == 1) { v = 50; }
        if (this.size == 2) { v = 100; }
        if (v > 0) {
            if (this.stuffing == 1) { v = v + 10; }
            if (this.stuffing == 2) { v = v + 20; }
            if (this.stuffing == 3) { v = v + 15; }
            if (this.adding[0].idA == 1) { v = v + 15; }
            if (this.adding[1].idA == 2) { v = v + 20; }
            if (this.adding[2].idA == 3) { v = v + 5; }
            if (this.adding[3].idA == 4) { v = v + 10; }
        }
        return v;
    }
    calculateCalories() { // расчет калорийность 
        let v = 0;
        if (this.size == 1) { v = 20; }
        if (this.size == 2) { v = 40; }
        if (v > 0) {
            if (this.stuffing == 1) { v = v + 20; }
            if (this.stuffing == 2) { v = v + 5; }
            if (this.stuffing == 3) { v = v + 10; }
            if (this.adding[1].idA == 2) { v = v + 5; }
            if (this.adding[3].idA == 4) { v = v + 2; }
        }
        return v;
    }
}

let gb1, gb2, gb3, gb4, list;
gb1=new Hamburger(Math.round(Math.random() + 1), parseInt(Math.random() * 3));;
let arr = [gb1,gb1,gb1,gb1];
let countCard=arr.length;

const desc_Click = (id) => {
    const block = document.querySelector('.desc');
    let s1 = 'Описание: ';
    s1+=arr[id-1].getInfo();
    block.innerHTML =  s1;
};


const list_refresh = () => {

  list = new ProductList();

   for (i=0; i<countCard; i++){
    arr[i]=new Hamburger(Math.round(Math.random() + 1), parseInt(Math.random() * 3));   
    list.goods[i] = { id: i+1, title: arr[i].name, price: arr[i].price };
    }
    list.render();
}

list_refresh();


const list_cook = () => {

    let size = parseInt(document.f1.chk1.value);
    let stu = parseInt(document.f1.chk2.value);

    if (isNaN(size)) { size = 1; }
    if (isNaN(stu)) { stu = 0; }

    let ad1 = 0;
    if (document.f1.chk6.checked) {
        ad1 = 1;
    }

    let ad2 = 0;
    if (document.f1.chk7.checked) {
        ad2 = 2;
    }
    let ad3 = 0;
    if (document.f1.chk8.checked) {
        ad3 = 3;
    }
    let ad4 = 0;
    if (document.f1.chk9.checked) {
        ad4 = 4;
    }

    arr[0]=new Hamburger(size, stu);
    arr[0].name = "Your burger!"
    for (i=1; i<countCard; i++){
        arr[i]=new Hamburger(size, parseInt(Math.random() * 3));
    }

    arr[0].addTopping(ad1);
    arr[0].addTopping(ad2);
    arr[0].addTopping(ad3);
    arr[0].addTopping(ad4);
    for (i=1; i<countCard; i++){
        arr[i].addTopping(parseInt(Math.random() * 4));
    }
    
    for (i=0; i<countCard; i++){
        list.goods[i] = { id: i+1, title: arr[i].name, price: arr[i].price };
    }    
    list.render();
}
