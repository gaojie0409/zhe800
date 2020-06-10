import { ajax } from './ajax.js';
import { lazyload } from './lazy_load.js';
import { Header } from './header.js';
// 渲染秒杀和今日新增模块数据
ajax({
    url: "http://10.31.162.73/zhe800/php/goodsdata.php",
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
        lazyload(new_banner,4);
    }
});
// 渲染品牌模块数据
ajax({
    url: "http://10.31.162.73/zhe800/php/branddata.php",
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
}();