Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
            //imgProduct: 'https://placehold.it/200x150'
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name) || regexp.test(el.product_cn) || el.price == userSearch || regexp.test(el.desc));
        }
    },
    template: `<div class="cards">
                <product v-for="item of filtered" 
                    :key="item.id_product" 
                    :img="item.imgProduct"
                    :product="item">
                </product>
               </div>`
});

Vue.component('product', {
    props: ['product', 'img'],
    template: `
            <div class="card">
            <div class="cardImg">
                <img :src="img" alt="Some img">
                <div class="cardImgBuy">
                    <button @click="$root.$refs.cart.addProduct(product)">
                        <img src="./img/cart.svg" alt="cart">
                        Add to Cart
                    </button>
                </div>
            </div>
            <div class="card_txt">
                <h4 class="card_h4"><a href="product.html">{{product.product_name}} / {{product.product_cn}}</a></h4>
                <p class="card_p"><a href="product.html">{{product.desc}}</a></p>
                <p class="card_price">$ {{product.price}} </p>
            </div>
            </div>
    `
})

