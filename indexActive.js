
async function login() {
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
    var dt1=document.getElementById('data1').value;
    var dt2=document.getElementById('data2').value;
    var type=document.getElementById('type').value;
    var requestOptions = {method: 'GET'};
    let response=await fetch(`http://tickets.сделай.site/api/concert?date1=${dt1}&date2=${dt2}&type=${type}`, requestOptions);
    var result=await response.json();
    result.status;
    let res=await result;
    var booking='';
    for (let i=0; i<res.data.concert.length; i++){
            if (new Date(res.data.concert[i].date_concert)<new Date()){visited++;
            }
            else {
                        booking+=`<div class="border_white">
                        <p class="row_item color_blue">Название концерта:</p>
                        <p class="test-3-to row_item color_white">${res.data.concert[i].name_concert}</p>
                        <p class="row_item color_blue">Код заказа:</p>
                        <p class="test-3-code row_item color_white">${res.data.concert[i].concert_code}</p>
                        <p class="row_item color_blue">Дата и время концерта:</p>
                        <p class="test-3-d1 row_item color_white">${res.data.concert[i].date_concert+' в '+res.data.concert[i].time_start}</p>
                                </div>`;
            }
    
        }
        items=document.getElementById('ebala');
        items.innerHTML=booking;
}


/* Функция выхода авторизированного пользователя из приложения. Все открытые экраны закрываются, открывает экран
авторизации, токен авторизации удаляется из локального хранилища*/
function exit() {
    var item=document.getElementById('profile');
    item.style.display='block';
    var item=document.getElementById('profile2');
    item.style.display='block';
    var item=document.getElementById('profile3');
    item.style.display='block';
    var item=document.getElementById('profile4');
    item.style.display='flex';
    var item=document.getElementById('ebala');
    item.style.display='none';
    localStorage.token='';
}

