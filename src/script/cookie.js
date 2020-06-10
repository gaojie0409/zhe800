let cookie={
    add(key,value,days,path){
        let date=new Date();
        date.setDate(date.getDate()+days);
        document.cookie=`${key}=${value};expires=${date};path=${path}`;
    },
    get(key){
        let arr=document.cookie.split('; ');
        let res='';
        arr.forEach(function(value){
            let newarr=value.split('=');
            if(newarr[0]===key){
                res= newarr[1];
            }
        })
        return res;
    },
    unset(key){
        this.add(key,'',-2,'/');
    }
}

export{
    cookie
}