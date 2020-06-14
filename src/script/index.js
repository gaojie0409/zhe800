import { ajax } from './ajax.js';
import { lazyload } from './lazy_load.js';
import { Header } from './header.js';
import { Right } from './right_toolbar.js';
// 渲染秒杀和今日新增模块数据
ajax({
    url: "http://192.168.31.124/zhe800/php/goodsdata.php",
    success(data) {
        let goodsdata = JSON.parse(data);
        const miaoshagoods = document.querySelector('.miaoshagoods');
        const new_banner = document.querySelector('.new-banner');
        let strmiaosha = '';
        let strnew = '';
        for (var i = 0; i < goodsdata.length; i++) {
            if (i < 20) {
                strmiaosha += `<div class="items">
            <a href="javascript:;">
            <div class="imgbox">
                <img src="${goodsdata[i].url}"
                    alt="">
                <p class="sub-title">还剩99件，抢完回复199</p>
            </div>
            <em>￥${goodsdata[i].price}</em>
            <p class="title">${goodsdata[i].title}</p>
            </a></div>`;
            }
            if (i % 4 !== 3) {
                strnew += `<div class="items">
                <a href="javascript:;">
                    <img src="" _src="${goodsdata[i].url}" alt="">
                </a>
                <p class="title clearfix"><span>${goodsdata[i].title}</span><em>剩余1天</em></p>
                <p class="price clearfix"><span>39元任选一件</span><strong><i></i><em>收藏商品</em></strong></p>
            </div>`
            } else {
                strnew += `<div class="items" style="margin-right:0">
            <a href="javascript:;">
                <img src="" _src="${goodsdata[i].url}"
                    alt="">
            </a>
            <p class="title clearfix"><span>${goodsdata[i].title}</span><em>剩余1天</em></p>
            <p class="price clearfix"><span>39元任选一件</span><strong><i></i><em>收藏商品</em></strong></p>
        </div>`
            }

        }
        miaoshagoods.innerHTML += strmiaosha;
        new_banner.innerHTML = strnew;
        // 今日更新模块懒加载
        lazyload(new_banner, 4);
    }
});
// 渲染品牌模块数据
ajax({
    url: "http://192.168.31.124/zhe800/php/branddata.php",
    success(data) {
        let branddata = JSON.parse(data);
        const brand = document.querySelector('.brand-recommend');
        let strbrand = '';
        for (var i = 0; i < 20; i++) {
            strbrand += `<div>
            <a href="javascript">
                <img src="${branddata[i].url}"
                    alt="">
            </a>
        </div>`
        }
        brand.innerHTML = strbrand;
    }
});

// 载入公共模块
!function addCommonBlocks() {
    // 头部
    ajax({
        url: '../src/header.html',
        success(data) {
            const header = document.querySelector('header');
            let strhtml = data.replace(/[\s\S]*<header>/, '').replace(/<\/header>[\s\S]*/, '')
            header.innerHTML = strhtml;
            // <style([\\s\\S]*)</style>
            // console.log(strhtml)
            new Header();

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
            console.log(document.querySelector('.subtopbtn'))
            new Right();
        }
    })
    // 左侧悬浮菜单
    ajax({
        url: '../src/left_menu.html',
        success(data) {
            const left_menu = document.querySelector('.left-menu');
            let strhtml = data.replace(/[\s\S]*<div class="left-menu">/, '');
            strhtml = strhtml.substring(0, (strhtml.length - 24));
            left_menu.innerHTML = strhtml;

        }
    })

    // 底部
    ajax({
        url: '../src/footer.html',
        success(data) {
            const left_menu = document.querySelector('footer');
            let strhtml = data.replace(/[\s\S]*<footer>/, '').replace(/<\/footer>[\s\S]*/, '')
            left_menu.innerHTML = strhtml;

        }
    })

}();

// 轮播
!function lunbo() {
    const btnli = document.querySelectorAll('.head-content-lunbo ol li');
    const imgli = document.querySelectorAll('.head-content-lunbo ul li');
    const lunbo = document.querySelector('.head-content-lunbo');
    let index = 0;
    let time = null;
    // 点击圆点
    for (let i = 0; i < btnli.length; i++) {
        btnli[i].onclick = () => {
            index = i;
            tabswitch();
        }
    }
    // 切换
    function tabswitch() {
        for (var j = 0; j < btnli.length; j++) {
            btnli[j].className = '';
            imgli[j].style.opacity = 0;
        }
        btnli[index].className = 'active';
        imgli[index].style.opacity = 1;

    }
    // 自动轮播
    time=setInterval(() => {
        index++;
        if(index>4){
            index=0;
        }
        tabswitch();
    },1000)
    // 鼠标移入移出
    lunbo.onmouseover=()=>{
        clearInterval(time);
    }
    lunbo.onmouseout=()=>{
        time=setInterval(() => {
            index++;
            if(index>4){
                index=0;
            }
            tabswitch();
        },1000)
    }
}();