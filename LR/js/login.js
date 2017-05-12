console.log(localStorage);

var header = document.querySelector('.header');
var headerDiv = document.querySelectorAll('.header div');
var Ocon = document.querySelectorAll('.con > div');
for (var i = 0; i < headerDiv.length; i++) {
    var index = 0;
    headerDiv[i].index = Ocon[i].index = i;

    headerDiv[i].onclick = function () {
        for (var i = 0; i < headerDiv.length; i++) {
            headerDiv[i].id = '';
            Ocon[i].id = ''
        }

        this.id = 'active';
        Ocon[this.index].id = 'block';
    }
}

function checkPhoneNumber(obj) {

    if (obj.style.borderColor === 'red') {
        obj.style.borderColor = 'blue';
        console.log(obj.style.borderColor);
    }

    var gou = obj.nextElementSibling;
    var cha = gou.nextElementSibling;
    if (phoneNumberVerifier(obj.value)) {
        // 显示勾
        console.log('1');
        cha.style.display = 'none'
        gou.style.display = 'inline-block';
        return true;
    } else {
        // 不显示
        console.log('0')
        gou.style.display = 'none'
        cha.style.display = 'inline-block'
        return false;
    }

}


function phoneNumberVerifier(phone_number) {

    var patrn = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    return patrn.test(phone_number);

}

function saveStorage(key, value) {

    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);

}

function findUserViaPhoneNumber(phone_number) {

    var users = getUsers();
    var user_index = _.findIndex(users, ['phone_number', phone_number]);
    if (user_index < 0) {
        return null;
    } else {
        return users[user_index];
    }

}

function getUsers() {

    var users = localStorage.getItem('users');
    users = stringToJson(users, []);
    return users;

}

function stringToJson(string, default_value) {

    if (_.isUndefined(default_value)) {
        default_value = null;
    }

    var object;

    try {
        object = JSON.parse(string);
    } catch (e) {
    }

    if (_.isObject(object)) {
        return object;
    } else {
        return default_value;
    }

}

function login() {

    var phone_number = document.querySelector('#phone_number');
    var password = document.querySelector('#password');

    var user = findUserViaPhoneNumber(phone_number.value);
    // console.log(phone_number.value);
    if (_.isObject(user)) {

        if (user.password === password.value) {
            alert('登录成功');
        } else {
            password.style.borderColor = 'red';
        }

    } else {
        phone_number.style.borderColor = 'red';
    }

}

function register() {

    var phone_number = document.querySelector('#phone_number');
    var verify_code = document.querySelector('#verify_code');
    var password = document.querySelector('#password');
    if (!checkPhoneNumber(phone_number)) {
        return false;
    }

    if (password.value.length < 6 || password.value.length > 12) {
        alert('密码格式错误，长度在6-12之间');
    }

    var user = findUserViaPhoneNumber(phone_number.value);
    if (_.isObject(user)) {

        alert('用户已存在');

    } else {

        if (!checkVerifyCode(phone_number.value, verify_code.value)) {
            alert('验证码错误');
        } else {

            var users = getUsers();
            users.push({
                phone_number: phone_number.value,
                password: password.value
            });
            saveStorage('users', users);
            alert('注册成功');
            // 跳转页面
        }

    }

}

function sendVerifyCode() {//发送验证码
    console.log('seed verify code function.');

    var phone_number = document.querySelector('#phone_number');
    if (!checkPhoneNumber(phone_number)) {
        return false;
    }

    var verifying_users = localStorage.getItem('verifying_users');
    verifying_users = stringToJson(verifying_users, []);

    var verifying_user_index = _.findIndex(verifying_users, ['phone_number', phone_number.value]);
    if (verifying_user_index < 0) {
        console.log(verifying_users, 'push');
        var verify_code = rand(1000, 9999)
        verifying_users.push({
            phone_number: phone_number.value,
            verify_code: verify_code
        });
        console.log(verifying_users, 'pushed');
        console.log(verify_code)
    } else {
        verifying_users[verifying_user_index].verify_code = rand(1000, 9999);
    }
    saveStorage('verifying_users', verifying_users);
    alert('验证码发送成功');

}


function reasetCode() {

}

function rand(n, m) {
    var c = m - n + 1;
    return Math.floor(Math.random() * c + n);
}

function getVerifyingUsers() {

    var verifying_users = localStorage.getItem('verifying_users');
    verifying_users = stringToJson(verifying_users, []);
    return verifying_users;

}

function checkVerifyCode(phone_number, verify_code) {
    console.log('check verify code function.');

    var verifying_users = getVerifyingUsers();
    var verify_user_index = _.findIndex(verifying_users, ['phone_number', phone_number]);

    //如果大于等于0说明已经发送过验证码，如果小于0则直接返回false验证失败
    console.log(verify_user_index, 'verify user index');
    if (verify_user_index >= 0) {
        //获取正在验证的用户
        var verify_user = verifying_users[verify_user_index];

        //验证是否正确
        console.log(
            verify_user.verify_code,
            Number(verify_code),
            verify_user.verify_code === Number(verify_code)
        );
        if (verify_user.verify_code === Number(verify_code)) {
            // 验证成功
            return true;
        }
    }

    // 如果走到这一步说明验证都没进去，就是验证失败
    return false;
}
