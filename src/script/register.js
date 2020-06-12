import { ajax } from './ajax.js';
class Register {
    constructor() {
        this.form = document.querySelector('form');
        this.tel = document.querySelector('.tel input');
        this.pwd = document.querySelector('.password input');
        this.reppwd = document.querySelector('.reppassword input');
        this.tel_e = document.querySelector('.tel_error');
        this.pwd_e = document.querySelector('.pwd_error');
        this.reppwd_e = document.querySelector('.reppwd_error');
        this.tel_r = document.querySelector('.tel i');
        this.pwd_r = document.querySelector('.password i');
        this.reppwd_r = document.querySelector('.reppassword i');
        this.agree = document.querySelector('.agree input');
        this.telLock = false;
        this.pwdLock = false;
        this.reppwdLock = false;
        this.init();
        this.matchTel();
        this.pwdCheck();
        this.repPwd()
    }
    init() {
        let _this = this;
        this.form.onsubmit = () => {
            // console.log(this.agree.checked)
            if (this.agree.checked === true) {
                if(!this.telLock||!this.pwdLock||!this.reppwdLock){
                    if (!this.telLock) {
                        this.tel_r.style.visibility = "hidden";
                        this.tel_e.innerHTML = '请输入正确的手机号';
                        this.tel_e.style.visibility = 'visible';
                    }
                    if (!this.pwdLock) {
                        this.pwd_e.innerHTML = '密码包含数字字母和特殊字符中的两种,至少6位'; this.pwd_e.style.cssText = 'height: 20px;color: red;line-height: 20px;padding: 5px 0;margin-left: 60px;visibility:visible;';
                    }
                    if (!this.reppwdLock) {
                        this.reppwd_r.style.visibility = 'hidden';
                        this.reppwd_e.style.visibility = 'visible';
                    }
                    return false;
                }
                
            } else {
                alert('请阅读协议并勾选');
                return false;
            }
        }
    }
    //  手机号重复查询
    matchTel() {
        let _this = this;
        this.tel.oninput = () => {
            if (/^1[3456789]\d{9}$/.test(_this.tel.value)) {
                ajax({
                    url: '../php/registry.php',
                    data: {
                        name: _this.tel.value
                    },
                    success(data) {
                        if (data) {
                            _this.tel_r.style.visibility = "visible";
                            _this.tel_e.style.visibility = 'hidden';
                            _this.telLock = true;
                        } else {
                            _this.tel_e.innerHTML = '手机号已注册';
                            _this.tel_e.style.visibility = 'visible';
                            _this.tel_r.style.visibility = "hidden";
                            _this.telLock = false;
                        }
                    }
                })
            } else {
                this.tel_r.style.visibility = "hidden";
                this.tel_e.innerHTML = '请输入正确的手机号';
                this.tel_e.style.visibility = 'visible';
                this.telLock = false;
            }
            // console.log(this.telLock)
        }
    }

    // 密码判断
    pwdCheck() {
        this.pwd.oninput = () => {
            let flag = 0;
            if (/[0-9]/.test(this.pwd.value)) {
                flag++;
            }
            if (/[a-zA-Z]/.test(this.pwd.value)) {
                flag++;
            }
            if (/[\W_]/.test(this.pwd.value)) {
                flag++;
            }
            if (this.pwd.value !== '') {
                if (flag === 1) {
                    this.pwd_e.innerHTML = '弱';
                    this.pwd_e.style.cssText = 'height: 20px;color: white;line-height: 20px;padding: 5px 0;margin-left: 60px;background:red;width:150px;text-align:center;border-radius:5px'
                    this.pwd_r.style.visibility = 'hidden';
                    this.pwdLock = false;
                } else if (flag === 2 && this.pwd.value.length >= 6) {
                    this.pwd_e.innerHTML = '中';
                    this.pwd_e.style.cssText = 'height: 20px;color: white;line-height: 20px;padding: 5px 0;margin-left: 60px;background:orange;width:150px;text-align:center;border-radius:5px'
                    this.pwd_r.style.visibility = 'visible';
                    this.pwdLock = true;
                } else if (flag === 3 && this.pwd.value.length >= 6) {
                    this.pwd_e.innerHTML = '强';
                    this.pwd_e.style.cssText = 'height: 20px;color: white;line-height: 20px;padding: 5px 0;margin-left: 60px;background:green;width:150px;text-align:center;border-radius:5px';
                    this.pwd_r.style.visibility = 'visible';
                    this.pwdLock = true;
                }
            } else {
                this.pwd_e.innerHTML = '密码包含数字字母和特殊字符中的两种,至少6位'; this.pwd_e.style.cssText = 'height: 20px;color: red;line-height: 20px;padding: 5px 0;margin-left: 60px;visibility:hidden;';
                this.pwdLock = false;
            }
            this.pwd.onblur = () => {
                if (flag === 0 || flag === 1 || this.pwd.value.length < 6) {
                    this.pwd_e.innerHTML = '密码包含数字字母和特殊字符中的两种,至少6位'; this.pwd_e.style.cssText = 'height: 20px;color: red;line-height: 20px;padding: 5px 0;margin-left: 60px; 60px;';
                    this.pwdLock = false;
                }
                if (this.reppwd.value === this.pwd.value && this.pwd.value.length >= 6) {
                    this.reppwd_r.style.visibility = 'visible';
                    this.reppwd_e.style.visibility = 'hidden';
                    this.reppwdLock = true;
                } else {
                    this.reppwd_r.style.visibility = 'hidden';
                    this.reppwd_e.style.visibility = 'visible';
                    this.reppwdLock = false;
                }
            }
        }

    }

    //重复密码确认
    repPwd() {
        this.reppwd.onblur = () => {

            if (this.reppwd.value === this.pwd.value) {
                this.reppwd_r.style.visibility = 'visible';
                this.reppwd_e.style.visibility = 'hidden';
                this.reppwdLock = true;
                // console.log(this.reppwd.value === this.pwd.value)
            } else {
                this.reppwd_r.style.visibility = 'hidden';
                this.reppwd_e.style.visibility = 'visible';
                this.reppwdLock = false;
                // console.log(this.reppwd_e)
            }
        }
    }
}

new Register();