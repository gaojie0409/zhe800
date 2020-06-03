function ajax(option) {//封装ajax

    function objtostr(obj) {//对象转字符串工具
        let str = '';
        for (key in obj) {
            str += key + '=' + obj[key] + '&';
        }
        str = str.substr(0, str.length - 1);
        return str;
    }
    let ajax = new XMLHttpRequest();//创建ajax实例
    option.type = option.type || 'get';//设置默认请求方式get
    if (!option.url) {//判断接口地址是否存在（必须值）
        throw new error('接口地址有误');
    }
 
    if (option.data && Object.prototype.toString.call(option.data).substr(8,6) === 'Object') {//判断传入数据是否为对象，对象转字符串
        option.data = objtostr(option.data);
    }
    if (option.data && option.type === 'get') {//请求方式get
        option.url +='?'+ option.data;
    }
    if (option.async === 'false' || option.async === false) {//设计默认异步
        option.async = false;
    }else{
        option.async = true;
    }
    ajax.open(option.type, option.url, option.async);//打开接口
    if (option.data && option.type === 'post') {//请求方式post
        ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');//设置请求头
        ajax.send(option.data);
    } else {
        ajax.send();
    }
    if (option.async) {//异步
        ajax.onreadystatechange = function () {//监听ajax就绪状态
            if (ajax.readyState === 4) {//发送解析完成
                if (ajax.status = 200) {//接口地址正确
                    option.success && typeof option.success === 'function' && option.success(ajax.responseText);//通过回调函数将数据传出
                } else {//接口地址有误404
                    option.error && typeof option.error === 'function' && option.error('接口地址有误');
                }
            }
        }
    } else {//同步直接执行无需监听
        if (ajax.status = 200) {//接口地址正确
            option.success && typeof option.success === 'function' && option.success(ajax.responseText);//通过回调函数将数据传出
        } else {//接口地址有误404
            option.error && typeof option.error === 'function' && option.error('接口地址有误');
        }
    }

}