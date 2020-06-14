import{cookie} from './cookie.js';

class Right{
    constructor(){
        this.car_num=document.querySelector('.right-toolbar-top i');
        this.init();
    }
    init(){
        this.toTop();
        this.carnum();

    }
    // 回到顶部
    toTop(){
        const topBtn=document.querySelector('.subtopbtn');
        topBtn.onclick=()=>{
            document.documentElement.scrollTop=0;
        }
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
}

export{
    Right
}