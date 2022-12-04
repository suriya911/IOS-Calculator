// Dom Element: #app
// Description: This is the main entry point for the application. It is responsible for setting up the initial state of the application, and rendering the initial view.


// time variables
const hourElement = document.querySelector('.hour');
const minuteElement = document.querySelector('.minute');
const timeElement = document.querySelector('.time');


// Set up Time
const updateTime = () => {
    const currentTime = new Date();

    let currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    if(currentHour > 12){
        currentHour -= 12;
        timeElement.textContent = "PM";
    }
    else{
        timeElement.textContent = "AM";
    }
    hourElement.textContent = currentHour.toString();
    minuteElement.textContent = currentMinute.toString().padStart(2, '0');
}

setInterval(updateTime, 1000);
updateTime();  



// Display variables
const dispalyElement = document.querySelector('.display');


// operationvariables
const acElement = document.querySelector('.ac'); 
const pmElement = document.querySelector('.pm');
const percentElement = document.querySelector('.percent');
const additionElement = document.querySelector('.addition');
const subtractionElement = document.querySelector('.subtraction');
const multiplicationElement = document.querySelector('.multiplication');
const divisionElement = document.querySelector('.division');
const equalElement = document.querySelector('.equal');


// Number variabels
const decimalElement = document.querySelector('.decimal');
const num0Element = document.querySelector('.number-0');
const num1Element = document.querySelector('.number-1');
const num2Element = document.querySelector('.number-2');
const num3Element = document.querySelector('.number-3');
const num4Element = document.querySelector('.number-4');
const num5Element = document.querySelector('.number-5');
const num6Element = document.querySelector('.number-6');
const num7Element = document.querySelector('.number-7');
const num8Element = document.querySelector('.number-8');
const num9Element = document.querySelector('.number-9');
const numberArray=[
    num0Element, num1Element, num2Element, num3Element, num4Element,
    num5Element, num6Element, num7Element, num8Element, num9Element
];


// variables for the calculator
let valuememory = null;
let operationmemory = null;



// Functions for the displaying numbers and operators
const getvalueasstring = () => dispalyElement.textContent.split(',').join('');

const getvalueasnumber = () => {
    return parseFloat(getvalueasstring());
}

const setvalue = (num) => {
    if(num[num.length-1] === '.'){
        dispalyElement.textContent += '.';
        return ;
    }

    const [tempnumber,tempdecimal] = num.split('.');
    if(tempdecimal){
        dispalyElement.textContent = parseFloat(tempnumber).toLocaleString()+"."+tempdecimal;
    }else{
        dispalyElement.textContent = parseFloat(tempnumber).toLocaleString();
    }
}

const NumberClick = (numstring) => {
    const currentnum = getvalueasstring();
    if(currentnum === '0'){
        setvalue(numstring);
    }else{
        setvalue(currentnum + numstring);
    }
}

const getresult = () => {
    const curvaluenum = getvalueasnumber();
    const valuenummemory = parseFloat(valuememory);
    let newvalue;
    if(operationmemory === 'addition'){
        newvalue = valuenummemory + curvaluenum;
    }else if(operationmemory === 'subtraction'){
        newvalue = valuenummemory - curvaluenum;
    }else if(operationmemory === 'multiplication'){
        newvalue = valuenummemory * curvaluenum;
    }else if(operationmemory === 'division'){
        newvalue = valuenummemory / curvaluenum;
    }
    return newvalue.toString();
}

const OperatorClick = (operator) => {
    const curvaluestr = getvalueasstring();
    if(!valuememory){
        valuememory = curvaluestr;
        operationmemory = operator;
        setvalue('0');
        return;
    }
    
    valuememory = getresult();
    operationmemory = operator;
    setvalue('0');
};



// Add event listeners to the number buttons

for(let i = 0; i < numberArray.length; i++) {
    numberArray[i].addEventListener('click', () => {
        NumberClick(i.toString());
    });
}


// Add event listeners to the decimal buttons

decimalElement.addEventListener('click', () => {
    const currentnum = getvalueasstring();
    if(!currentnum.includes('.')){
        setvalue(currentnum + '.');
    }
});


// Add event listeners to the AC button

acElement.addEventListener('click', () => {
    setvalue('0');
    valuememory = null;
    operationmemory = null;
});


// Add event listeners to the PM button 

pmElement.addEventListener('click', () => {
    const currentnum = getvalueasnumber();
    if(currentnum !== 0){
        setvalue((currentnum * -1).toString());
    }
});


// Add event listeners to the percent button

percentElement.addEventListener('click', () => {
    const currentnum = getvalueasnumber();
    setvalue((currentnum / 100).toString());
    valuememory=null;
    operationmemory=null;
});


// Add event listeners to the operators buttons
additionElement.addEventListener('click', () => {
    OperatorClick('addition');
});

subtractionElement.addEventListener('click', () => {
    OperatorClick('subtraction');
});

multiplicationElement.addEventListener('click', () => {
    OperatorClick('multiplication');
});

divisionElement.addEventListener('click', () => {  
    OperatorClick('division');
});

equalElement.addEventListener('click', () => {
    if(valuememory){
        setvalue(getresult());
        valuememory = null;
        operationmemory = null;
    } 
});