// 参1：父元素 参2 一行有多少个图片
function lazyload(father, num) {
    load(father, num);
    window.addEventListener('scroll',() => {
        load(father, num);
    },false)
}
function load(father, num) {
    // 元素顶部在浏览器底部时：元素top=滚轮top+浏览器高度
    let a = document.documentElement.scrollTop + document.documentElement.clientHeight;
    if (a >= father.offsetTop) {
        let a = Math.ceil((document.documentElement.scrollTop + document.documentElement.clientHeight - father.offsetTop) / father.children[1].offsetHeight);
        a = (a - 1) * num
        // console.log(a)
        for (var i = 0; i < a + num; i++) {
            father.children[i].getElementsByTagName('img')[0].src = father.children[i].getElementsByTagName('img')[0].getAttribute('_src');
        }
    }
}
export {
    lazyload
}