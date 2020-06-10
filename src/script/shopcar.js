import { ajax } from './ajax.js';
import { cookie } from './cookie.js';

class Shopcar {
    constructor() {
        this.init();
        this.changeNum();
        this.addCommonBlocks();
    }
    init() {
        let _this = this;
        let arrsid = [];
        let arrnum = [];
        if (cookie.get('arrsid') && cookie.get('arrnum')) {//获取cookie转成数组
            arrsid = cookie.get('arrsid').split(',');
            arrnum = cookie.get('arrnum').split(',');
        }
        ajax({
            url: 'http://10.31.162.73/zhe800/php/goodsdata.php',
            success(data) {
                let arrdata = JSON.parse(data);
                let goodssum = 0;
                let pricesum = 0;
                const clone_box = document.querySelector('.items')
                const itembox = document.querySelector('.itembox')
                // const t_price = document.querySelector('.list-bottom .t-price i');
                // const t_num = document.querySelector('.list-bottom .t-num i');
                for (var i = 0; i < arrsid.length; i++) {
                    for (var value of arrdata) {
                        if (value.sid === arrsid[i]) {
                            let new_item = clone_box.cloneNode(true);
                            new_item.querySelector('img').src = value.url;
                            new_item.querySelector('.items .title').innerHTML = value.title;
                            new_item.querySelector('.items .s-price p').innerHTML = value.price;
                            new_item.querySelector('.items .t-price').innerHTML = value.price * arrnum[i];
                            new_item.querySelector('.items .number input').value = arrnum[i];
                            new_item.style.display = "flex";
                            itembox.appendChild(new_item);
                            goodssum += Number(arrnum[i]);
                            pricesum += value.price * arrnum[i];
                            // t_price.innerHTML=pricesum;
                            // t_num.innerHTML=goodssum;



                            //顶部动态悬浮导航
                            new Header();
                        }
                    }
                }
            }
        })
    }


    // 载入公共模块
    addCommonBlocks() {
        ajax({
            url: '../src/header.html',
            success(data) {
                const header = document.querySelector('header');
                let strhtml = data.replace(/[\s\S]*<header>/, '').replace(/<\/header>[\s\S]*/, '')
                header.innerHTML = strhtml;
                // <style([\\s\\S]*)</style>


            }
        })
    }

    //数量增减
    changeNum() {
        const number = document.querySelector('.itembox');
        console.log(number)
        number.onclick = (ev) => {
            var ev = ev || window.event;
            let itemnum = ev.target.parentNode.children[1].value;
            if (ev.target.className === 'plus') {
                ev.target.parentNode.children[1].value = Number(itemnum) + 1;
            } else if (ev.target.className === 'minus') {
                ev.target.parentNode.children[1].value = Number(itemnum) - 1 < 0 ? 0 : Number(itemnum) - 1;
            }
            console.log(ev.target.parentNode.children[1].value);
            console.log(ev.target.parentNode.parentNode.querySelector('.s-price').innerHTML)
            ev.target.parentNode.parentNode.querySelector('.t-price').innerHTML = (ev.target.parentNode.children[1].value * ev.target.parentNode.parentNode.querySelector('.s-price p').innerHTML).toFixed(2)

        }
    }

}
new Shopcar();