const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        filtered: [],
        cart: [],
        imgCatalog: 'https://via.placeholder.com/200x150',
        userSearch: '',
        show: false,
        showFlt: false,
        divCart: false,
        quanCart: 0,
        sumCart: 0,
        showCtl: true
    },
    methods: {
        filter() {
            const regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
            this.showFlt = true;
            this.showCtl = false;
            console.log(this.filtered);
        },
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(item) {
            console.log(item.id_product);
            let find = this.cart.find(product => item.id_product == product.id_product);
            if (find) {
                find.quantity++;
            } else {
                // let itemCart = Object.assign(item,{quantity:1});
                this.$set(item, 'quantity', 1);
                this.cart.push(item);
            }
            this.quanCart = this.getQuantCart();
            this.sumCart = this.getSumCart();
            console.log('корзина:');
            console.log(this.quanCart);
            console.log(this.sumCart);
            console.log(this.cart);
        },

        delProduct(item) {
            console.log(item.id_product);
            let find = this.cart.find(product => item.id_product == product.id_product);
            const index = this.cart.indexOf(find);
            if (find) {
                if (+find.quantity > 1) {
                    find.quantity--;
                }
                else {
                    if (index > -1) {
                        this.cart.splice(index, 1);
                    }
                }
            }
            this.quanCart = this.getQuantCart();
            this.sumCart = this.getSumCart();
            console.log('корзина:');
            console.log(this.quanCart);
            console.log(this.sumCart);
            console.log(this.cart);
        },

        getQuantCart() {
            let s = 0;
            this.cart.forEach(element => s = s + +element.quantity);
            return s;
        },
        getSumCart() {
            let s = 0;
            this.cart.forEach(element => s = s + element.price * element.quantity);
            return s;
        },
        showCart() {
            if (!this.divCart) this.divCart = true;
            else this.divCart = false;
        }
    },

    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
        // this.getJson(`getProducts.json`)
        //     .then(data => {
        //         for(let el of data){
        //             this.products.push(el);
        //         }
        //     })
    }
})

