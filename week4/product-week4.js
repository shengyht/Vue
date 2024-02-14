import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const url = 'https://vue3-course-api.hexschool.io/v2/';
const path = 'sheng-apitest';

const app = createApp({
    data(){
        return{
            products:[],
            tempProduct:{
                imageUrl:[],
            },
            modalProduct:null,
            modalDel:null,
            isNew:false,
        }
    },
    methods:{
        getProduct(){
            const api = `${url}api/${path}/admin/products`
            console.log(api)
            axios.get(api)
            .then(res=>{
                this.products = res.data.products
            })
        },
        openModal(status, product){
            if(status === 'new'){
                this.tempProduct = {
                    imagesUrl:[],
                };
                this.isNew = true;
                this.modalProduct.show();
            }else if(status === 'edit'){
                this.tempProduct = {...product};
                this.isNew = false;
                this.modalProduct.show();
            }else if(status === 'delete'){
                this.tempProduct = {...product};
                this.modalDel.show();
            }
        },
        updateProduct(){
            //新增
            let api = `${url}api/${path}/admin/product`
            let method = 'post';

            //更新
            if(!this.isNew){
                api = `${url}api/${path}/admin/product/${this.tempProduct.id}`;
                method = 'put';
            }
            
            axios[method](api,{data:this.tempProduct})
            .then(res=>{
                this.getProduct();
                this.modalProduct.hide();
            })
        },
        deleteProduct(){
            const api = `${url}api/${path}/admin/product/${this.tempProduct.id}`;
            
            axios.delete(api)
            .then(res=>{
                this.getProduct();
                this.modalDel.hide();
            })
        },
    },
    mounted(){
        const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)hexschoolToken\s*\=\s*([^;]*).*$)|^.*$/,
            '$1',
        );
        console.log(token);
        axios.defaults.headers.common['Authorization'] = token;
        this.getProduct();

        this.modalProduct = new bootstrap.Modal(this.$refs.productModal);
        this.modalDel = new bootstrap.Modal(this.$refs.delProductModal);
        

    }
})
app.mount('#app')
