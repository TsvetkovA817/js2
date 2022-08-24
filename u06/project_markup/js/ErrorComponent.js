Vue.component('err_comp', {
    props: ['visibility'],
    data() {
        return {
            some_data: false,
        }
    },

    template: `
     <div v-show="visibility"><h2>Каталог с товарами не получен</h2></div>
    `
})
