import { cookie } from './cookie.js';

class Header {
    constructor() {
        this.reg = document.querySelector('.reg span');
        this.login = document.querySelector('.login span');
        this.logout = document.querySelector('.logout span');
        this.username = document.querySelector('.username span');
        this.car_num = document.querySelector('.top-toolbar-shopcar b');
        this.init();
    }
    init() {
        // 判断是否存在本地存储用户名
        let local_name = localStorage.getItem('name');
        if (local_name !== null) {
            console.log(local_name)
            this.username.innerHTML = local_name;
            this.reg.style.display = 'none';
            this.login.style.display = 'none';
            this.logout.style.display = 'inline-block';
            this.username.style.display = 'inline-block';
        } else {
            this.username.innerHTML = '';
            this.reg.style.display = 'inline-block';
            this.login.style.display = 'inline-block';
            this.logout.style.display = 'none';
            this.username.style.display = 'none';
        }
        this.topnavscroll();
        this.out();
        this.carnum();
        this.search();

    }
    // 顶部购物车数量
    carnum() {
        let arrnum = cookie.get('arrnum').split(',');
        if (arrnum) {
            let sum = 0;
            for (var i = 0; i < arrnum.length; i++) {
                sum += Number(arrnum[i]);
            }
            this.car_num.innerHTML = sum;
        }
    }
    //退出
    out() {
        this.logout.onclick = (ev) => {
            localStorage.removeItem('name');
            window.location.href = 'http://192.168.31.124/zhe800/dist/login.html';
        }
    }

    // 顶部悬浮导航定位
    topnavscroll() {
        const topnav = document.querySelector('.topnav');
        // console.log(topnav)
        window.addEventListener('scroll', () => {
            // console.log(document.documentElement.scrollTop);  
            if (document.documentElement.scrollTop >= 400) {
                topnav.style.display = 'block';
                // console.log(topnav)
            } else {
                topnav.style.display = 'none'
            }
        }, false);
    };
    // 搜索
    search() {
        const input = document.querySelector('.searchcontent');
        const ul = document.querySelector('.search_word');

        input.oninput = function () {
            const fndf = document.querySelector('#fndf');
            
            if (fndf) {
                document.body.removeChild(fndf);
            }
            let cfn = document.createElement('script');
            cfn.id = 'fndf';
            cfn.innerHTML = `function fn(data) {
                console.log(data);
                const ul = document.querySelector('.search_word');
                let dataarr=data.response.docs;
                let str='';
                for(value of dataarr){
                    let keyword=value.word;
                    if(keyword){
                        // str+="<li>"+keyword+"</li>";
                        str+="<li><a href='https://search.zhe800.com/search?keyword="+keyword+"/'>"+keyword+"</a></li>"
                    }
                }
                
                console.log(str)
                ul.innerHTML=str;
            }`

            document.body.appendChild(cfn);




            const searchdata = document.querySelector('#searchdata');
            if (searchdata) {
                document.body.removeChild(searchdata);
            }
            let cs = document.createElement('script');
            cs.id = 'searchdata';
            cs.src = "https://status.tuanimg.com/zhe800-search/suggestion/searchJsonp?callback=fn&word=" + this.value + "&limit=10&offset=0&userSex=0"
            document.body.appendChild(cs);

        }
        // function fn(data) {
        //     console.log(data)
        //     // let dataarr=data.words;
        //     // let str='';
        //     // for(value of dataarr){
        //     //     let keyword=value.keyword;
        //     //     if(keyword){
        //     //         // str+="<li>"+keyword+"</li>";
        //     //         str+="<li><a href='https://search.zhe800.com/search?keyword="+keyword+"/'>"+keyword+"</a></li>"
        //     //     }

        //     // }
        //     // ul.innerHTML=str;
        // }

    }
}
// new Header();
export {
    Header
}