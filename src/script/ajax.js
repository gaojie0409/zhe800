function ajax(option) {//option:配置参数   setting:默认参数
    //将对象转换成字符串格式。
    function arraytostring(obj) {
        let objarray = [];
        for (let attr in obj) {//attr:属性名  obj[attr]:属性对应的值
            objarray.push(attr + '=' + obj[attr]);
        }
        return objarray.join('&');
    }
    let ajax = new XMLHttpRequest();
    //1.设置请求方式，默认get - 设置默认值的一种方式。
    option.type = option.type || 'get';

    //2.设置接口地址。
    //接口地址不存在
    if (!option.url) {
        throw new Error('请输入接口地址');
    }

    //3.判断数据是否存在。
    if (option.data) {//数据存在
        if (Object.prototype.toString.call(option.data).slice(8, -1) === 'Object') {//数据格式是对象
            option.data = arraytostring(option.data);
        } else {//字符串
            option.data = option.data;
        }
    }
    //4.判断请求方式 - get - 地址栏后面?&
    if (option.data && option.type === 'get') {
        option.url += '?' + option.data;
    }

    //6.判断是否异步
    //除了输入false或者'false'其他的都是true异步
    if (option.async === 'false' || option.async === false) {
        option.async = false;
    } else {
        option.async = true;
    }

    ajax.open(option.type, option.url, option.async);

    //5.判断请求方式 - post
    if (option.data && option.type === 'post') {//数据存在，同时post请求
        ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');//post发送数据请求头
        ajax.send(option.data);
    } else {//get post
        ajax.send();//直接发送解析
    }
    //7.异步判断,监听获取数据。
    if (option.async) {//异步监听
        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4) {//发送解析已经完成，直接获取接口数据
                if (ajax.status === 200) {//接口地址是正确
                    // ajax.responseText:接口的数据
                    //问题：如果直接进行渲染，这个函数没有意义了，需要将数据拿到外面，函数调用时处理。
                    option.success && typeof option.success === 'function' && option.success(ajax.responseText);
                } else {//接口地址有误 404
                    option.error && typeof option.error === 'function' && option.error('数据接口有错误');
                }

            }
        }
    } else {//同步直接获取

        if (ajax.status === 200) {//接口地址是正确
            option.success && typeof option.success === 'function' && option.success(ajax.responseText);
        } else {//接口地址有误 404
            option.error && typeof option.error === 'function' && option.error('数据接口有错误');
        }
    }
}

export{
    ajax
}
