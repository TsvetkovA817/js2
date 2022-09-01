Vue.component('filterel', {
    data() {
        return {
            userSearch: ''
        }
    },
    template: `
    
    <form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                <input type="text" class="search-field" v-model="userSearch">
                <button type="submit" class="btn-search">
                    <img class="menu_img_search" src="img/search.svg" alt="search">
                </button>
            </form>
    
    `
})

