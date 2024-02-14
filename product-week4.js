import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const url = 'https://vue3-course-api.hexschool.io/v2/';
const path = 'sheng-apitest';

import pagination from './pagination.js';
import ProductModal from './ProductModal.js';
import DelProductModal from './DelProductModal.js';

const app = createApp({
    data(){
        return{
            products:[],
            tempProduct:{
                imageUrl:[],
            },
            pages:{},
            modalProduct:null,
            modalDel:null,
            isNew:false,
        }
    },
    methods:{
        getProducts(page){
            const api = `${url}api/${path}/admin/products?page=${page}`;
            console.log(api)
            axios.get(api)
            .then(res=>{
                this.products = res.data.products;
                this.pages = res.data.pagination;
                console.log(res)
            })
        },
        openModal(status, product){
            if(status === 'new'){
                this.tempProduct = {
                    imagesUrl:[],
                };
                this.isNew = true;
                this.$refs.pModal.openModal();
                //this.modalProduct.show();
            }else if(status === 'edit'){
                this.tempProduct = {...product};
                this.isNew = false;
                this.$refs.pModal.openModal();
                //this.modalProduct.show();
            }else if(status === 'delete'){
                this.tempProduct = {...product};
                this.$refs.dModal.openModal();
                //this.modalDel.show();
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
                this.getProducts();
                //this.modalProduct.hide();
                this.$refs.pModal.closeModal();
            })
        },
        delProduct(){
            const api = `${url}api/${path}/admin/product/${this.tempProduct.id}`;
            
            axios.delete(api)
            .then(res=>{
                this.getProducts();
                
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
        this.getProducts();
    },
    components:{
        pagination,
        ProductModal,
        DelProductModal,
    },
})
app.mount('#app')
