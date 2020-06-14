import { lazyload } from './lazy_load.js';
import { $ajax } from './ajaxpromise.js';
import { Header } from './header.js';
import { ajax } from './ajax.js';
import { Right } from './right_toolbar.js';
// 列表渲染 分页  懒加载  （分页有bug）
var box = new CustomPagination('#page', {
    total: 3, //总页数
    changePage: function (pageNum) { //切换页码成功回调
        console.log('当前页码：' + pageNum); //当前页码
        $ajax({
            url: 'http://192.168.31.124/zhe800/php/listdata.php',
            data: {
                page: pageNum
            }
        }).then(function (data) {
            let goodsdata = JSON.parse(data);
            const new_banner = document.querySelector('.new-banner');
            let strnew = '';
            for (var i = 0; i < goodsdata.length; i++) {
                strnew += `<div class="items">
                <div class="imgbox">
                    <a href="details.html?sid=${goodsdata[i].sid}">
                        <img src="" _src="${goodsdata[i].url}"
                        alt="" sid="${goodsdata[i].sid}">
                    </a>
                    <a href="javascript:;"><p class="sub-title">找相似&gt;</p></a>
                </div>
                <a href="details.html"><p class="title" >${goodsdata[i].title}</p></a>
                <p class="price">￥<i>${goodsdata[i].price}</i><del>￥${(goodsdata[i].price * 3).toFixed(2)}</del><strong>剩余10天</strong></p>
                <p class="collect clearfix"><strong><a href="javascript:;"><em><i></i>收藏</em></a><a href="javascript:;"><b>[详情]</b></a></strong></p>
            </div>`;
            }
            new_banner.innerHTML = strnew;


            // 今日更新模块懒加载
            lazyload(new_banner, 4);
            //排序
            const priceup = document.querySelector('.up');
            const pricedown = document.querySelector('.down');
            const list_top_btns = document.querySelectorAll('.list-top-left span');
            let flag = 0;

            for (let i = 0; i < list_top_btns.length; i++) {
                //点击切换标签样式
                list_top_btns[i].onclick = function () {
                    flag=(flag+1)%2;
                    for (let i = 0; i < list_top_btns.length; i++) {
                        list_top_btns[i].className = '';
                    }
                    list_top_btns[i].className = 'active';
                    //如果点击的是价格进行排序
                    if(list_top_btns[i].id==="pxprice"){
                        if(flag===0){
                            priceup.style['border-bottom-color']='white';
                            pricedown.style['border-top-color']='red';
                            paixuBig();
                        }else{
                            pricedown.style['border-top-color']='white';
                            priceup.style['border-bottom-color']='red';
                            paixuSmall();
                        }
                    }
                    lazyload(new_banner, 4);                   
                }
                
            }
            //大小排序
            //思路：节点遍历赋值给数组，数组各项找到价格比较后冒泡排序
            function paixuBig(){
                let currentdata = document.querySelectorAll('.new-banner .items')
                let currentarr = [];
                
                for (var i = 0; i < currentdata.length; i++) {
                    currentarr[i] = currentdata[i]
                }
                for (var i = 0; i < currentarr.length - 1; i++) {
                    for (var j = 0; j < currentarr.length - i - 1; j++) {
                        let a = Number(currentarr[j].querySelector('.price i').innerHTML)
                        let b = Number(currentarr[j + 1].querySelector('.price i').innerHTML)
                        if (a < b) {
                            let c = currentarr[j];
                            currentarr[j] = currentarr[j + 1];
                            currentarr[j + 1] = c;
                        }
                    }
                }
                new_banner.innerHTML = '';
                for (var i = 0; i < currentarr.length; i++) {
                    new_banner.appendChild(currentarr[i]);
                }
            }
            //小大排序
            function paixuSmall(){
                let currentdata = document.querySelectorAll('.new-banner .items')
                let currentarr = [];
                for (var i = 0; i < currentdata.length; i++) {
                    currentarr[i] = currentdata[i]
                }
                for (var i = 0; i < currentarr.length - 1; i++) {
                    for (var j = 0; j < currentarr.length - i - 1; j++) {
                        let a = Number(currentarr[j].querySelector('.price i').innerHTML)
                        let b = Number(currentarr[j + 1].querySelector('.price i').innerHTML)
                        if (a > b) {
                            let c = currentarr[j];
                            currentarr[j] = currentarr[j + 1];
                            currentarr[j + 1] = c;
                        }
                    }
                }
                new_banner.innerHTML = '';
                for (var i = 0; i < currentarr.length; i++) {
                    new_banner.appendChild(currentarr[i]);
                }
            }
            





            // for (var i = 0; i < currentdata.length; i++) {
            //     for (var j = 0; j < currentdata.length - i; j++) {

            //     }
            // }


        });
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

            
            new Header();

        }
    })


    // 右侧固定工具栏
    ajax({
        url: '../src/right_toolbar.html',
        success(data) {
            const right_toolbar = document.querySelector('.right-toolbar');
            let strhtml = data.replace(/[\s\S]*<div class="right-toolbar">/, '');
            strhtml=strhtml.substring(0,(strhtml.length-24));
            right_toolbar.innerHTML = strhtml;
            new Right();
        }
    })
    // 左侧悬浮菜单
    ajax({
        url: '../src/left_menu.html',
        success(data) {
            const left_menu = document.querySelector('.left-menu');
            let strhtml = data.replace(/[\s\S]*<div class="left-menu">/, '');
            strhtml=strhtml.substring(0,(strhtml.length-24));
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


