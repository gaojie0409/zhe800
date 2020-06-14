import{cookie} from './cookie.js';

class Header{
    constructor(){
        this.reg=document.querySelector('.reg span');
        this.login=document.querySelector('.login span');
        this.logout=document.querySelector('.logout span');
        this.username=document.querySelector('.username span');
        this.car_num=document.querySelector('.top-toolbar-shopcar b');
        this.init();
    }
    init(){
        // 判断是否存在本地存储用户名
        let local_name=localStorage.getItem('name');
        if(local_name!==null){
            console.log(local_name)
            this.username.innerHTML=local_name;
            this.reg.style.display='none';
            this.login.style.display='none';
            this.logout.style.display='inline-block';
            this.username.style.display='inline-block';
        }else{
            this.username.innerHTML='';
            this.reg.style.display='inline-block';
            this.login.style.display='inline-block';
            this.logout.style.display='none';
            this.username.style.display='none';
        }
        this.topnavscroll();
        this.out();
        this.carnum();

    }
    // 顶部购物车数量
    carnum(){
        let arrnum=cookie.get('arrnum').split(',');
        if(arrnum){
            let sum=0;
            for(var i=0;i<arrnum.length;i++){
                sum+=Number(arrnum[i]);
            }
            this.car_num.innerHTML=sum;
        }
    }
    //退出
    out(){
        this.logout.onclick=(ev)=>{
            localStorage.removeItem('name');
            window.location.href='http://192.168.31.124/zhe800/dist/login.html';
        }
    }
    // 顶部悬浮导航定位
    topnavscroll(){
        const topnav=document.querySelector('.topnav');
        // console.log(topnav)
        window.addEventListener('scroll',()=>{
            // console.log(document.documentElement.scrollTop);  
            if(document.documentElement.scrollTop>=400){
                topnav.style.display='block';
                // console.log(topnav)
            }else{
                topnav.style.display='none'
            }
        },false);
    };
}
export{
    Header
}