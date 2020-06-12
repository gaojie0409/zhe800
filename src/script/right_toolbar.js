class Right{
    constructor(){
        this.init();
    }
    init(){
        this.toTop();

    }
    // 回到顶部
    toTop(){
        const topBtn=document.querySelector('.subtopbtn');
        topBtn.onclick=()=>{
            document.documentElement.scrollTop=0;
        }
    }
}

export{
    Right
}