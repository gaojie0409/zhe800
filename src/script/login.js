import { ajax } from './ajax.js';
class Login{
    constructor(){
        this.tbcbox=document.querySelector('.ct_right .tbcbox');
        this.pwdbox=document.querySelector('.ct_right .pwd');
        this.form=document.querySelector('.ct_right .pwd form');
        this.username=document.querySelector('.usernamebox .username input');
        this.password=document.querySelector('.passwordbox .password input');
        this.name_r=document.querySelector('.usernamebox .username i');
        this.name_e=document.querySelector('.usernamebox .Error');
        this.pwd_e=document.querySelector('.passwordbox .Error');
        this.init();
    }
    init(){
        // 判断是否存在用户名本地存储
        let local_name=localStorage.getItem('name');
        if(local_name!==''){
            this.username.value=local_name
        }
        let _this=this;
        this.password.oninput=()=>{
            this.pwd_e.style.visibility='hidden';
        }
        this.form.onsubmit=()=>{
            if(this.username.value!=='' && this.password.value!==""){
                ajax({
                    url:'http://192.168.31.124/zhe800/php/login.php',
                    type:'post',
                    data:{
                        name:_this.username.value,
                        pwd:_this.password.value
                    },
                    success(data){
                        if(data){
                            // 账号密码正确存储用户名到本地存储，跳转首页
                            localStorage.setItem('name',_this.username.value)
                            window.location.href='http://192.168.31.124/zhe800/dist/index.html';

                        }else{
                            _this.pwd_e.innerHTML="用户名密码不存在";
                            _this.pwd_e.style.visibility="visible";

                        }
                    }

                })
            }else{
                return false;
            }
            
        }
        this.switchLog();

    }

    
    // 切换登录方式
    switchLog(){
        const log_pwd=document.querySelector('.ct_right .tbcbox img');
        const log_tbc=document.querySelector('.ct_right .pwd img');
        log_pwd.onclick=()=>{
            this.tbcbox.style.display='none';
            this.pwdbox.style.display='block';
        }
        log_tbc.onclick=()=>{
            this.tbcbox.style.display='block';
            this.pwdbox.style.display='none';
        }
    }
    
}

new Login();