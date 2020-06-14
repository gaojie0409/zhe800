import { ajax } from './ajax.js';
import { cookie } from './cookie.js';
import { Header } from './header.js';
import { Right } from './right_toolbar.js';

class Shopcar {
    constructor() {

        this.init();

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
            url: 'http://192.168.31.124/zhe800/php/goodsdata.php',
            success(data) {
                // 克隆隐藏的商品，赋值数据
                let arrdata = JSON.parse(data);
                const clone_box = document.querySelector('.items')
                const itembox = document.querySelector('.itembox')
                for (var i = 0; i < arrsid.length; i++) {
                    for (var value of arrdata) {
                        if (value.sid === arrsid[i]) {
                            let new_item = clone_box.cloneNode(true);
                            new_item.sid = value.sid;
                            new_item.querySelector('img').src = value.url;
                            new_item.querySelector('.items .title').innerHTML = value.title;
                            new_item.querySelector('.items .s-price p').innerHTML = value.price;
                            new_item.querySelector('.items .t-price').innerHTML = (value.price * arrnum[i]).toFixed(2);
                            new_item.querySelector('.items .number input').value = arrnum[i];
                            new_item.style.display = "flex";
                            itembox.appendChild(new_item);
                        }
                    }
                }
                //顶部动态悬浮导航
                new Header();
                num();
                // 计算总价总数
                function sum() {
                    const t_price = document.querySelector('.list-bottom .t-price i');
                    const t_num = document.querySelector('.list-bottom .t-num i');
                    const itemlist = document.querySelectorAll('.itembox .items');
                    let goodssum = 0;
                    let pricesum = 0;
                    // 过滤出选中的商品累加价格
                    for (var i = 1; i < itemlist.length; i++) {
                        if (itemlist[i].querySelector('.itemCollect').checked === true) {
                            goodssum += Number(itemlist[i].querySelector('.number input').value)
                            pricesum += Number(itemlist[i].querySelector('.t-price').innerHTML)
                        }

                    }
                    t_price.innerHTML = pricesum.toFixed(2);
                    t_num.innerHTML = goodssum;
                }
                // 计算购物车商品总数
                function num() {
                    const itemlist = document.querySelectorAll('.itembox .items');
                    const topgoddsnum = document.querySelector('.top-toolbar-shopcar b');
                    const rightgoddsnum = document.querySelector('.right-toolbar-top i');

                    let goodssum = 0;
                    for (var i = 1; i < itemlist.length; i++) {
                        goodssum += Number(itemlist[i].querySelector('.number input').value)
                    }
                    topgoddsnum.innerHTML = goodssum;
                    rightgoddsnum.innerHTML = goodssum;
                }
                // 购物车商品选择
                !function () {
                    const all = document.querySelectorAll('.allCollect');
                    const itemCollect = document.querySelectorAll('.itemCollect');

                    // 联动上下全选按钮
                    all[0].onchange = () => {
                        all[1].checked = all[0].checked;
                        for (var i = 1; i < itemCollect.length; i++) {
                            // console.log(itemCollect.length)
                            itemCollect[i].checked = all[0].checked;
                            // console.log(itemCollect[i].checked)
                        }
                        sum();
                    }
                    all[1].onchange = () => {
                        all[0].checked = all[1].checked;
                        for (var i = 1; i < itemCollect.length; i++) {
                            itemCollect[i].checked = all[1].checked;
                        }
                        sum();
                    }
                    // 商品选择框
                    for (var i = 1; i < itemCollect.length; i++) {
                        itemCollect[i].onchange = () => {
                            let flag = true;
                            for (var j = 1; j < itemCollect.length; j++) {
                                if (itemCollect[j].checked === false) {
                                    flag = false;
                                }
                            }
                            if (flag === true) {
                                all[0].checked = true;
                                all[1].checked = true;
                            } else {
                                all[0].checked = false;
                                all[1].checked = false;
                            }
                            sum();
                        }
                    }
                }();

                //数量增减
                !function () {
                    const number = document.querySelector('.itembox');
                    // console.log(number)
                    number.addEventListener('click', (ev) => {
                        var ev = ev || window.event;
                        let itemnum = ev.target.parentNode.children[1].value;
                        if (ev.target.className === 'plus' || ev.target.className === 'minus') {
                            if (ev.target.className === 'plus') {
                                ev.target.parentNode.children[1].value = Number(itemnum) + 1;
                            } else if (ev.target.className === 'minus') {
                                ev.target.parentNode.children[1].value = Number(itemnum) - 1 < 1 ? 1 : Number(itemnum) - 1;
                            }
                            ev.target.parentNode.parentNode.querySelector('.t-price').innerHTML = (ev.target.parentNode.children[1].value * ev.target.parentNode.parentNode.querySelector('.s-price p').innerHTML).toFixed(2)

                            let currentsid = ev.target.parentNode.parentNode.sid;
                            let currentnum = ev.target.parentNode.parentNode.querySelector('.number input');
                            console.log(currentsid)
                            // 数据存储到cookie
                            //先检查cookie是否存在该商品
                            let arrsid = [];
                            let arrnum = [];
                            if (cookie.get('arrsid') && cookie.get('arrnum')) {//cookie内sid和数量转数组
                                arrsid = cookie.get('arrsid').split(',');
                                arrnum = cookie.get('arrnum').split(',');
                            }
                            if (arrsid.indexOf(currentsid) === -1) {//不能存在对应sid(第一次)  添加新sid和num
                                arrsid.push(currentsid);
                                arrnum.push(currentnum.value);
                            } else {//已经存在（购物车有该商品信息）  更新num
                                arrnum[arrsid.indexOf(currentsid)] = currentnum.value;
                            }
                            cookie.add('arrsid', arrsid, 10, '/');//覆盖sid和num
                            cookie.add('arrnum', arrnum, 10, '/');

                            // 重新计算总价
                            sum();
                            num();

                        }
                    }, false)
                }();
                //删除商品
                !function () {
                    const delAll = document.querySelector('.t-del');
                    const t_price = document.querySelector('.list-bottom .t-price i');
                    const t_num = document.querySelector('.list-bottom .t-num i');
                    delAll.onclick = () => {
                        const itemlist = document.querySelectorAll('.itembox .items');
                        // 获取当前选中商品的sid和在列表中的索引分别存入数组
                        let delarr = [];
                        let sidarr = [];
                        for (var i = 1; i < itemlist.length; i++) {
                            if (itemlist[i].querySelector('.itemCollect').checked === true) {
                                delarr.push(i);
                                sidarr.push(itemlist[i].sid);
                            }
                        }
                        if (delarr.length !== 0) {//判断要删除的数据数组长度
                            // 删除cookie中对应值
                            if (confirm('你确定要删除吗？？？？？？？')) {
                                let arrsid = cookie.get('arrsid').split(',');
                                let arrnum = cookie.get('arrnum').split(',');
                                for (var j = 0; j < delarr.length; j++) {
                                    itemlist[0].parentNode.removeChild(itemlist[delarr[j]]);
                                    arrnum.splice(arrsid.indexOf(sidarr[j]), 1)
                                    arrsid.splice(arrsid.indexOf(sidarr[j]), 1)
                                    cookie.add('arrsid', arrsid, 10, '/');
                                    cookie.add('arrnum', arrnum, 10, '/');
                                }
                            }
                        }
                        // 总价总数归零
                        t_num.innerHTML = 0;
                        t_price.innerHTML = 0.00;
                        num()

                    }

                }();


                //单个删除
                !function() {
                    const itembox = document.querySelector('.itembox');
                    itembox.onclick = (ev) => {
                        var ev = ev || window.event;
                        let currentsid = ev.target.parentNode.parentNode.sid;
                        if (ev.target.className === 'del') {
                            console.log(currentsid)
                            if (confirm('确定要删除吗？？？'))
                                console.log(ev.target)
                            let arrsid = cookie.get('arrsid').split(',');
                            let arrnum = cookie.get('arrnum').split(',');
                            arrnum.splice(arrsid.indexOf(currentsid), 1)
                            arrsid.splice(arrsid.indexOf(currentsid), 1)
                            cookie.add('arrsid', arrsid, 10, '/');
                            cookie.add('arrnum', arrnum, 10, '/');
                            ev.target.parentNode.parentNode.parentNode.removeChild(ev.target.parentNode.parentNode);
                        }
                        num();
                    }
                }();
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


        // 右侧固定工具栏
        ajax({
            url: '../src/right_toolbar.html',
            success(data) {
                const right_toolbar = document.querySelector('.right-toolbar');
                let strhtml = data.replace(/[\s\S]*<div class="right-toolbar">/, '');
                strhtml = strhtml.substring(0, (strhtml.length - 24));
                right_toolbar.innerHTML = strhtml;
                new Right;
            }
        })
        // 左侧悬浮菜单
        // ajax({
        //     url: '../src/left_menu.html',
        //     success(data) {
        //         const left_menu = document.querySelector('.left-menu');
        //         let strhtml = data.replace(/[\s\S]*<div class="left-menu">/, '');
        //         strhtml=strhtml.substring(0,(strhtml.length-24));
        //         left_menu.innerHTML = strhtml;

        //     }
        // })

        // 底部
        ajax({
            url: '../src/footer.html',
            success(data) {
                const left_menu = document.querySelector('footer');
                let strhtml = data.replace(/[\s\S]*<footer>/, '').replace(/<\/footer>[\s\S]*/, '')
                left_menu.innerHTML = strhtml;
                // console.log(strhtml)

            }
        })
    }


}
new Shopcar();