class Header{
    constructor(){
        this.init();
    }
    init(){
        this.topnavscroll();
    }

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