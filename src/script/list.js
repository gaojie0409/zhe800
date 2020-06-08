import { lazyload } from './lazy_load.js';
import { $ajax } from './ajaxpromise.js';
// 列表渲染 分页  懒加载  （分页有bug）
var box = new CustomPagination('#page', {
    total: 3, //总页数
    changePage: function (pageNum) { //切换页码成功回调
        console.log('当前页码：' + pageNum); //当前页码
        $ajax({
            url: 'http://10.31.162.73/zhe800/php/listdata.php',
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
                    <a href="javascript:;">
                        <img src="" _src="${goodsdata[i].url}"
                        alt="">
                    </a>
                    <a href="javascript:;"><p class="sub-title">找相似&gt;</p></a>
                </div>
                <a href="javascript:;"><p class="title">${goodsdata[i].title}</p></a>
                <p class="price">￥<i>${goodsdata[i].price}</i><del>￥${(goodsdata[i].price * 3).toFixed(2)}</del><strong>剩余10天</strong></p>
                <p class="collect clearfix"><strong><a href="javascript:;"><em><i></i>收藏</em></a><a href="javascript:;"><b>[详情]</b></a></strong></p>
            </div>`;
            }
            new_banner.innerHTML = strnew;


            // 今日更新模块懒加载
            lazyload(new_banner, 4);
            //排序
            const priceBtn = document.querySelector('#pxprice');
            const priceup = document.querySelector('.up');
            const pricedown = document.querySelector('.down');
            const list_top_btns = document.querySelectorAll('.list-top-left span');
            let flag = 0;

            for (let i = 0; i < list_top_btns.length; i++) {
                
                list_top_btns[i].onclick = function () {
                    flag=(flag+1)%2;
                    for (let i = 0; i < list_top_btns.length; i++) {
                        list_top_btns[i].className = '';
                    }
                    list_top_btns[i].className = 'active';
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

            function paixuBig(){
                let currentdata = document.querySelectorAll('.items')
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

            function paixuSmall(){
                let currentdata = document.querySelectorAll('.items')
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
