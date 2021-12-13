function login() {
    var item=document.getElementById('profile');
    item.style.display='none';
    var item=document.getElementById('profile2');
    item.style.display='none';
    var item=document.getElementById('profile3');
    item.style.display='none';
    var item=document.getElementById('profile4');
    item.style.display='none';
    var item=document.getElementById('ebala');
    item.style.display='flex';
    localStorage.token='';
}


/* Функция выхода авторизированного пользователя из приложения. Все открытые экраны закрываются, открывает экран
авторизации, токен авторизации удаляется из локального хранилища*/
function exit() {
    var item=document.getElementById('profile');
    item.style.display='none';
    item=document.getElementById('login');
    item.style.display='flex';
    item=document.getElementById('error');
    item.style.display='none';
    localStorage.token='';
}
