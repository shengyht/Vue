import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const url = 'https://vue3-course-api.hexschool.io/v2/';
const path = 'sheng-apitest';

const app = createApp({
    data(){
        return{
            user:{
                username:'',
                password:''
            },
        }
    },
    methods:{
        login(){
            const api = `${url}admin/signin`;
            axios.post(api, this.user)
            .then(res=>{
                const{token, expired}=res.data;
                document.cookie = `hexschoolToken=${token}; expires=${new Date(expired)}`;
                window.location = 'product-week3.html'
            })
            .catch(err=>{
                alert('登入失敗')
            })
        }
    }
})
app.mount('#app');

