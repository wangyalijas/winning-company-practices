/**
 * Created by wangyali on 17/5/9.
 */
// console.log('1')
window.onload = function () {
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
            // console.log(Ocon)
            // console.log(this)
            // console.log(this.index)
        }
    }
};

var url= '/winning-company-practices/LR/data/user.json';
 fetch(url).then(function (blob) {
    blob.json();
})
    .then(function (data) {
        console.log(data);
    });
function checkPhoneNumber(obj) {
    var gou=obj.nextElementSibling;
    var cha=gou.nextElementSibling;
    if (phoneNumberVerifier(obj.value)) {
        // 现实勾
        console.log('1');
        cha.style.display='none'
        gou.style.display='inline-block'
    } else {
        // 不显示
        console.log('0')
        gou.style.display='none'
        cha.style.display='inline-block'
    }

}


function phoneNumberVerifier(phone_number) {

    var patrn = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    return patrn.test(phone_number);

}
