let step = false;
let first = "";
let operator = "";
let second = "";
let output = "";

let input = document.querySelector('input');
let gray = document.querySelector('.gray');
let blue = document.querySelector('.blue');
let red = document.querySelector('.red');
let clear = document.querySelector('.clear');
var cal = document.querySelector('#cal');

function operation(num) {
    if (step == false) { //초기화 //0이없는 상태로 만들기
        input.value = ""; //값 초기화
        step = true; //0이없는상태가됨
    }
    input.value += num;
}

function valueOut() {
    var str = input.value;
    var strArray = str.split('^');
    var findValue = "^";
    input.value = eval(input.value);

    if (str.indexOf(findValue) != -1) {
        //만약 출력값에 ^가 들어가면
        input.value = Math.pow(strArray[0], strArray[1]);
    }
}

function c() {
    input.value = input.value.substring(0, input.value.length - 1);
    //substring으로 0부터 value길이에서 -1 한만큼의 길이를 출력한다
}
