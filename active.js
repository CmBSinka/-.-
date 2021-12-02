/*Функция авторизации login() включает в себя: получение данных с формы, формирование заголовков.
Данные формы преобразуются в j-son формат для отправки на сервер. Данные, пришедшие с сервера 
из  j-son преобразуются в объект JavaScript (result). По статус коду запроса определяется дальнешее 
действие. В случае успешного кода - 200, извлекаются данные пользователя и его бронирования, токен авторизации 
помещается  в локальное хранилище - localStorage. В противном случае выводятся данные об ошибках.*/

async function login() {
    var phone = document.getElementsByClassName('login_test');
    phone = phone[0].value;
    var password = document.getElementsByClassName('password_test');
    password = password[0].value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "phone": phone,
        "password": password
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
       // redirect: 'follow'
    };

    let response = await fetch("http://tickets.сделай.site/api/login", requestOptions);

    var result = await response.json();
    switch (code = response.status) {
        case 422: {
            validate_error(result);
            break;
        }
        case 401: {
            auth_error();
            break;
        }
        case 200: {
            localStorage.token = result.data.token;
            show_user();
            booking();
            break;
        }
    }
}
/* Функция обработки ошибок валидации validate_error(result), где result - массив ошибок валидации.
Функция включает показ блока с отображением ошибки, поясняющий заголовок, поэлементный перебор 
массива ошибок и их отображение на странице*/
function validate_error(result) {

        var error=document.getElementById('error');
        error.style.display='block';
        var title=document.getElementById('title_error');
        title.innerText=result.error.message;
        var message=document.getElementById('message');
        message.innerHTML='';
        for (var key in result.error.error) {
            message.innerHTML+=`${key}: ${result.error.error[key]}<br>`;
        }
}

/* Функция обработки события - ошибка авторизации. Отображает в блоке ошибок статичное содержимое*/
function auth_error() {
    var error=document.getElementById('error');
    error.style.display='block';
    var title=document.getElementById('title_error');
    title.innerText='Ошибка авторизации';
    var message=document.getElementById('message');
    message.innerHTML='Phone or password incorrect';
}

/* Функция отображение пользователя. Bearer токен излекается из локального хранилища и передается в
заголовках запроса. В случае ошибки выводится сообщение об ошибке авторизации. Данные пользователя 
вписываются в ошибку html.*/
async function show_user(){
   var myHeaders = new Headers();
   var token=localStorage.token;
    myHeaders.append("Authorization", "Bearer "+token);
       var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
   let result= await fetch("http://tickets.сделай.site/user", requestOptions);
   let res=await result.json();
   var code=result.status;
   if (code==401){
       auth_error();
   return}
   var profile=document.getElementById('profile');
   profile.style.display='flex';
   var login=document.getElementById('login');
   login.style.display='none';
   var login=document.getElementById('login2');
   login.style.display='none';
   var field=document.getElementsByClassName('test-3-name')[0];
   field.innerHTML=res[0].first_name;
   field=document.getElementsByClassName('test-3-last')[0];
   field.innerHTML=res[0].last_name;
}

/*Функция извлечения данных о бронированиях пользователя. Функция доступна для авторизованных пользователей,
у которых в локальном хранилище браузера есть валидный токен авторизации. Если такой токен не обнаружен, выводится ошибка.
Количество посещенных концертов (visited) определяется количеством забронированных концертов у которых значение поля 
date_concert прошло. Информация о предстоящих концертах формируется динамически (переменная booking)путем перебора элементов 
массива res.data.items. Для отображения инфрмации о концертах в html разметке предусмотрен контейнер 
<div class="row_align" id="concert">  </div>. Информация о концертах поступает в него с помощью свойства innerHTML*/
async function booking(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.token);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    let result=await fetch("http://tickets.сделай.site/user/booking", requestOptions);
    let res=await result.json();
    var code=result.status;

    if (code==401){
        auth_error();
        return;}
    var visited=0;
    var booking='';
    for (let i=0; i<res.data.items.length; i++){
        if (new Date(res.data.items[i].tickets.date_concert)<new Date()){visited++;
        }
        else {
                    booking+=`<div class="border_white">
                    <p class="row_item color_blue">Название концерта:</p>
                    <p class="test-3-to row_item color_white">${res.data.items[i].tickets.name_concert}</p>
                    <p class="row_item color_blue">Код заказа:</p>
                    <p class="test-3-code row_item color_white">${res.data.items[i].code}</p>
                    <p class="row_item color_blue">Дата и время концерта:</p>
                    <p class="test-3-d1 row_item color_white">${res.data.items[i].tickets.date_concert+' в '+res.data.items[i].tickets.time_start}</p>
                            </div>`;
        }

    }
    var items=document.getElementsByClassName('test-3-num')[0];
    items.innerText=visited;
    items=document.getElementById('concert');
    items.innerHTML=booking;
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
