function balls(){
    var b=document.getElementsByClassName('js-calc-spend');
    b[0].value+' рублей';
    b=b[0].value/3.5;
    var n=document.getElementsByClassName('js-calc-result');
    n[0].value=Math.round(b)+' баллов';}