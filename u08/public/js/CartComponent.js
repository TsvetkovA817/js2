// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('cart', {
    data() {
        return {
            //cartUrl: '/getBasket.json',
            cartItems: [],
            //imgCart: 'https://placehold.it/50x100',
            showCart: false,
            sumCart: 0,
            qntCart: 0,
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    this.$data.cartItems.push(item);
                }
                this.sump();
            });
    },
    methods: {
        addProduct(item) {
            //console.dir(item);
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++;
                            this.sump();
                        }
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                            this.sump();
                        }
                    })
            }


        },
        delp(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result) {
                            item.quantity--;
                            this.sump();
                        }
                    })
            }
            else {
                this.$parent.delJson(`/api/cart/${item.id_product}`, item)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                            this.sump();
                        } else {
                            console.log('error del');
                        }
                    })
            }

        },
        sump() {
            this.sumCart = 0;
            this.qntCart = 0;
            for (el of this.$data.cartItems) {
                this.sumCart = this.sumCart + el.price * el.quantity;
                this.qntCart += el.quantity;
            }
        },
    },
    template: `<div>
            
           <div class="menu_cart pulse">
                <img src="img/cart.svg" alt="cart" @click="showCart = !showCart">
                <p class="menu_cart_count">5</p>
           </div>

            <div class="cart_card" v-show="showCart">
              <div class="cart_card__container" v-show="showCart">
                <h3>Корзина</h3>
                <p v-if="!cartItems.length"  class="cart_card__empty">Пустая корзинка</p>
                <cart-item v-for="item of cartItems" :key="item.id_product" :img="item.imgCart" :cart-item="item" @delp="delp">
                </cart-item>
                <hr>
                <p class="cart_card__itog">Итого:</p>
                <p>Кол-во: {{ qntCart }} шт.</p>
                <p class="cart_card__summ">Сумма: {{ sumCart }} руб.</p>
               </div> 
            </div>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
    <div class="cart_card_product">

                    <div class="cart_card_product__img">
                        <img :src="img" alt="Some img">
                    </div>    
                    <div class="cart_card_product__info">
                            <div class="product-title">{{ cartItem.product_name }}</div>
                            <div class="product-quantity">Кол-во: {{ cartItem.quantity }}</div>
                            <div class="product-single-price">$ {{ cartItem.price }} each</div>
                    </div>
                    
                    <div class="cart_card_product__right">
                        <div class="product-price">Сумма: {{cartItem.quantity*cartItem.price}}</div>
                        <button class="del-btn" @click="$emit('delp', cartItem)">&times;</button>
                    </div>

    </div>


    `
})

