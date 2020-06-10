import { ajax } from './ajax.js';
import { cookie } from './cookie.js';
import { Header } from './header.js';
class Detail {
    constructor() {
        this.sid = location.search.substring(1).split('=')[1];
        this.numinput = document.querySelector('.number input');
        this.init();
        this.changeNum();
        this.addToShopcar();
        this.addCommonBlocks();
        


    }
    init() {
        let _this = this;
        // 载入公共模块
        
        // 详情页初始化数据加载
        ajax({
            url: 'http://10.31.162.73/zhe800/php/details.php',
            data: {
                sid: _this.sid
            },
            success(data) {
                const detail_data = JSON.parse(data);
                const picarr = detail_data.picurllist.split(',')
                const main_pic = document.querySelector('.main-pic img');
                const bf_pic = document.querySelector('.bf img');
                const title = document.querySelector('.title p');
                const samll_pic = document.querySelector('.small-pic');
                const shorttitle = document.querySelector('.title span');
                const price = document.querySelector('.price em');
                const delprice = document.querySelector('.price del');
                const color = document.querySelector('.color');

                main_pic.src = bf_pic.src = detail_data.url;
                //渲染主图下面小图
                var small_pic_str = ''
                for (var i = 0; i < picarr.length; i++) {
                    small_pic_str += `<img src="${picarr[i]}">`
                }
                samll_pic.innerHTML = small_pic_str;
                title.innerHTML = detail_data.title;
                shorttitle.innerHTML = detail_data.title.substr(0, 8);
                price.innerHTML = detail_data.price;
                delprice.innerHTML = detail_data.price * 3;
                // 渲染颜色图
                var color_pic_str = ''
                for (var i = 0; i < picarr.length; i++) {
                    color_pic_str += `<img src="${picarr[i]}">`
                }
                color.innerHTML += color_pic_str;

                // 切换主图
                _this.changeMainPic();
                // 放大镜
                _this.magnifier();
                //顶部动态悬浮导航
                new Header();
            }
        })



    }
    载入公共模块
    addCommonBlocks() {
        ajax({
            url: '../src/header.html',
            success(data) {
                const header = document.querySelector('header');
                let strhtml = data.replace(/[\s\S]*<header>/, '').replace(/<\/header>[\s\S]*/, '')
                header.innerHTML = strhtml;
                // <style([\\s\\S]*)</style>

                console.log(strhtml)


            }
        })
    }




    //数量增减
    changeNum() {
        const number = document.querySelector('.number');
        number.onclick = (ev) => {
            var ev = ev || window.event;
            console.log(ev.target.className)
            if (ev.target.className === 'plus') {
                this.numinput.value = Number(this.numinput.value) + 1;
            } else if (ev.target.className === 'minus') {
                this.numinput.value = Number(this.numinput.value) - 1 < 0 ? 0 : Number(this.numinput.value) - 1;
            }
        }
    }
    // 加入购物车
    addToShopcar() {
        const addBtn = document.querySelector('.addToShopcar');
        addBtn.onclick = () => {
            //先检查cookie是否存在该商品
            let arrsid = [];
            let arrnum = [];
            if (cookie.get('arrsid') && cookie.get('arrnum')) {//cookie内sid和数量转数组
                arrsid = cookie.get('arrsid').split(',');
                arrnum = cookie.get('arrnum').split(',');
            }
            if (arrsid.indexOf(this.sid) === -1) {//不能存在对应sid(第一次)  添加新sid和num
                arrsid.push(this.sid);
                arrnum.push(this.numinput.value);
            } else {//已经存在（购物车有该商品信息）  更新num
                arrnum[arrsid.indexOf(this.sid)] = Number(this.numinput.value) + Number(arrnum[arrsid.indexOf(this.sid)]);
            }
            cookie.add('arrsid', arrsid, 10, '/');//覆盖sid和num
            cookie.add('arrnum', arrnum, 10, '/');
            alert('添加成功');
        }
    }
    // 切换主图
    changeMainPic() {
        const main_pic = document.querySelector('.main-pic img');
        const big_pic = document.querySelector('.bf img');
        const samll_pic = document.querySelector('.small-pic');
        const samll_pic_arr = document.querySelectorAll('.small-pic img');
        samll_pic.onclick = (ev) => {
            var ev = ev || window.event;
            if (ev.target.nodeName === 'IMG') {
                main_pic.src = ev.target.src;
                big_pic.src = ev.target.src;
                for (var i = 0; i < samll_pic_arr.length; i++) {
                    samll_pic_arr[i].className = '';
                }
                ev.target.className = 'active';
            }
        }
    };
    // 放大镜
    magnifier() {
        const mainbox = document.querySelector('.main-pic-box');
        const sp = document.querySelector('.main-pic');
        const bp = document.querySelector('.bf img');
        const sf = document.querySelector('.main-pic .sf');
        const bf = document.querySelector('.bf');
        const bili = Number(bp.offsetHeight) / Number(sp.offsetHeight);
        sf.style.width = bf.offsetWidth / bili + 'px';
        sf.style.height = bf.offsetHeight / bili + 'px';
        sp.onmouseover = ev => {
            var ev = ev || window.event;
            sf.style.visibility = 'visible';
            bf.style.visibility = 'visible';
            sp.onmousemove = ev => {
                var ev = ev || window.event;
                let l = ev.pageX - mainbox.offsetLeft - sf.offsetWidth / 2;
                let t = ev.pageY - mainbox.offsetTop - sf.offsetHeight / 2;
                if (l < 0) {
                    l = 0;
                } else if (l >= sp.offsetWidth - sf.offsetWidth) {
                    l = sp.offsetWidth - sf.offsetWidth;
                }
                if (t < 0) {
                    t = 0;
                } else if (t >= sp.offsetHeight - sf.offsetHeight) {
                    t = sp.offsetHeight - sf.offsetHeight - 2;
                }
                sf.style.left = l + 'px';
                sf.style.top = t + 'px';

                bp.style.left=-l*bili+'px';
                bp.style.top=-t*bili+'px';
            }
        }
        sp.onmouseout = () => {
            sf.style.visibility = 'hidden';
            bf.style.visibility = 'hidden';

        }
    }
}

new Detail();

