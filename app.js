let dataArray = [];
const navBar = document.querySelector('.navBar');
const articles = Array.from(document.querySelectorAll('.times'));
let thisWeekTime = '';
let previousWeekTime = '';
let indexNumber = 0;


fetchJSONData();

function fetchJSONData() {
    fetch("./data.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
                dataArray = data;
                loadListeners();
            })
        .catch((error) => 
               console.error("Unable to fetch data:", error));

}

function loadListeners(){
    getTimeFrameListener();
}


function getTimeFrameListener(){
    let timeFrame = 'weekly';
    navBar.addEventListener('click', getTimeFrame)

}

function getTimeFrame(e){
   if(e.target.textContent.toLowerCase() === 'daily'){
    timeFrame='daily';
    changeAll();
   } else if(e.target.textContent.toLowerCase() === 'monthly'){
    timeFrame='monthly';
    changeAll();
   } else if(e.target.textContent.toLowerCase() === 'weekly'){
    timeFrame='weekly';
    changeAll();
   }

}

function changeAll(){
    articles.forEach(saveNewTimes)
}


// Esta funcion tiene que darme el valor de tiempo que se hizo
function saveNewTimes(element, index, array){
    indexNumber = index;
    thisWeekTime = dataArray[index].timeframes[timeFrame].current + 'hrs';
    previousWeekTime = dataArray[index].timeframes[timeFrame].previous + 'hrs';

    printNewTimes(indexNumber);
}

function printNewTimes(indexNumber){
    articles[indexNumber].innerHTML=`

        <p class="time">${thisWeekTime}</p>
        <p class="previusTime">Previous - ${previousWeekTime}</p>

    `
    
} 