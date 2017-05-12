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
    if (!checkPhoneNumber(phone_number)) {
        return false;
    }

    var user = findUserViaPhoneNumber(phone_number.value);
    if (_.isObject(user)) {

        alert('用户已存在');

    } else {


    }

}

function sendVerifyCode() {

    var phone_number = document.querySelector('#phone_number');
    if (!checkPhoneNumber(phone_number)) {
        return false;
    }

    var verifying_users = localStorage.getItem('verifying_users');
    verifying_users = stringToJson(verifying_users, []);

    var verifying_user_index = _.findIndex(verifying_users, ['phone_number', phone_number.value]);
    if (verifying_user_index < 0) {
        console.log(verifying_users, 'push');
        verifying_users.push({
            phone_number: phone_number.value,
            verify_code: rand(1000, 9999)
        });
        console.log(verifying_users, 'pushed');
        console.log(verifying_users[0].verify_code)
    } else {
        verifying_users[verifying_user_index].verify_code = rand(1000, 9999);
    }
    saveStorage('verifying_users', verifying_users);

}

function rand(n, m) {
    var c = m - n + 1;
    return Math.floor(Math.random() * c + n);
}
