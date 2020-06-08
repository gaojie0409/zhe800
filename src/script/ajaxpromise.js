function $ajax(option) {
    let promise = new Promise((resolve, reject) => {
        function arraytostring(obj) {
            let objarray = [];
            for (let attr in obj) {
                objarray.push(attr + '=' + obj[attr]);
            }
            return objarray.join('&');
        }
        let ajax = new XMLHttpRequest();
        option.type = option.type || 'get';
        if (!option.url) {
            throw new Error('请输入接口地址');
        }
        if (option.data) {
            if (Object.prototype.toString.call(option.data).slice(8, -1) === 'Object') {
                option.data = arraytostring(option.data);
            } else {
                option.data = option.data;
            }
        }
        if (option.data && option.type === 'get') {
            option.url += '?' + option.data;
        }
        if (option.async === 'false' || option.async === false) {
            option.async = false;
        } else {
            option.async = true;
        }
        ajax.open(option.type, option.url, option.async);
        if (option.data && option.type === 'post') {
            ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            ajax.send(option.data);
        } else {
            ajax.send();
        }
        if (option.async) {
            ajax.onreadystatechange = function () {
                if (ajax.readyState === 4) {
                    if (ajax.status === 200) {
                        resolve(ajax.responseText);//ajax.responseText->then
                    } else {
                        reject('数据接口有错误');
                    }
                }
            }
        } else {
            if (ajax.status === 200) {
                resolve(ajax.responseText);//ajax.responseText->then
            } else {
                reject('数据接口有错误');
            }
        }
    });

    return promise;
}

export{
    $ajax
}
