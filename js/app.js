//shows and hides project details
function showhide(pIN) {
    var pjD = document.getElementById(pIN);
    console.log(pjD);
    if (pjD.classList.contains ("hidden")) {
        pjD.classList.remove("hidden");
        pjD.classList.add("shown");
      } else {
        pjD.classList.add("hidden")};
        pjD.classList.remove("shown");
  
};


//PACE Calculator Section



//create variables - set default values
let pace;
let time;
let Dist;
let CalcErr;

let HasTimeH;
let HasTimeM;
let HasTimeS;
let HasDist;
let uPace;

let isTime;
let isDist;
let isPace;
let findWhat;

//Pace Value

//

//formula to determine pace in seconds (rateS)
let rateS = (totSec, HasDist) => {
    return totSec / HasDist;
}

//formula to determine time in seconds

// race distances dropdown

let raceRun

let raceDrop = () => {

    runRace = document.getElementById("raceDist").value;
    document.getElementById("distance").value = runRace;
}

//gives variables the input values
//formula to turn hours and minutes into seconds and then adds that array together
//turn pace to minutes, rounding down to last whole minute
//take only the remainder of "turning pace to minutes" in order to get remaining seconds
//make seconds two digits
//insert both parts of pace into the web page

let givepace = () => {

    let makeblank = "";
    document.getElementById('calcanswer').textcontent = makeblank;
    CalcErr = " ";
    document.getElementById('ShowCalcErr').textContent = CalcErr;

    let HasTimeH = document.getElementById('hours').value;
    let HasTimeM = document.getElementById('minutes').value;
    let HasTimeS = document.getElementById('seconds').value;
    let HasDist = document.getElementById('distance').value;
    let HasPaceM = document.getElementById('pacemin').value;
    let HasPaceS = document.getElementById('pacesec').value;

    let HasTimeArray = [(HasTimeH*60*60), (HasTimeM*60), (HasTimeS*1)];
    
    let HasTotSec = HasTimeArray.reduce((a,b) => a + b, 0);

    let HasPaceArray = [(HasPaceM*60), (HasPaceS*1)];

    let HasTotPace = HasPaceArray.reduce((a,b) => a + b, 0);

//checks if time is entered, boolean isTime
    

    if (HasTimeH != "" || HasTimeM != "" || HasTimeS != "") {
        isTime = true;
    } else {isTime = false;}

    if(HasDist != "") {
        isDist = true;
    } else {isDist = false;}

    if(HasPaceM != "" || HasPaceS != "") {
        isPace = true;
    } else {isPace = false;}



    if(isTime == true && isDist == true && isPace == false) {
        findWhat = "findPace"
    } else if(isTime === true && isDist === false && isPace === true) {
        findWhat = "findDist"
    } else if(isTime === false && isDist === true && isPace === true) {
        findWhat = "findTime"
    } else {findWhat = "Error"};

    switch(findWhat) {
        case "findPace":
            
            let GetRateTot = rateS(HasTotSec, HasDist);
            
            let GetRateM = Math.floor(GetRateTot / 60);
            
            let GetRateS = Math.round(GetRateTot % 60);
            
            if(GetRateS < 10) {
                GetRateS = ('0' + GetRateS);
            } else; 
           
            GotPace = `Pace: ${GetRateM}:${GetRateS} per mile`;
            document.getElementById('calcanswer').textContent = GotPace;
            break;
        case "findDist":

            let GetDist = (HasTotSec / HasTotPace).toFixed(2);

            let GotDist = `Distance: ${GetDist} miles`;
            document.getElementById('calcanswer').textContent = GotDist;
            break;
        case "findTime":
            let GetTimeTot = (HasDist * HasTotPace);
    
            let GetTimeH = Math.floor(GetTimeTot / 3600)
    
            let GetTimeM = Math.floor((GetTimeTot % 3600) / 60);
    
            let GetTimeS = Math.round((GetTimeTot % 3600) % 60);
    
            if( GetTimeS < 10) {
                GetTimeS = ('0' + GetTimeS)

            if(GetTimeM < 10) {
                GetTimeM = ('0' + GetTimeM);
            } else;
    
            let GotTime = `Time: ${GetTimeH}:${GetTimeM}:${GetTimeS}`;
                
            document.getElementById('calcanswer').textContent = GotTime;
                break;
        case "Error":
            let CalcErr = `Please Enter EXACTLY Two Values to find the Third`;
            document.getElementById('ShowCalcErr').textContent = CalcErr;
            break;
    }
        
}

//listens for the button to get the pace
let calcRun = document.getElementById('calcRun').addEventListener('click', givepace);


//clears all values
let clearCalc = () => {
    let makeblank
    makeblank = "";
    document.getElementById('calcanswer').textcontent = makeblank;
    CalcErr = " ";
    document.getElementById('ShowCalcErr').textContent = CalcErr;

    document.getElementById('hours').value = makeblank;
    document.getElementById('minutes').value = makeblank;
    document.getElementById('seconds').value = makeblank;
    document.getElementById('distance').value = makeblank;
    document.getElementById('pacemin').value = makeblank;
    document.getElementById('pacesec').value = makeblank;
}


let calcClear = document.getElementById('calcClear').addEventListener('click', clearCalc);


//show brew list
// grabs postal code entered in box and uses
function findBs() {
    let postCode = document.getElementById('postalcode').value
    let apBs = "https://api.openbrewerydb.org/breweries?by_postal=" + postCode;
    document.getElementById('brewList').innerHTML = '';
    fetch(apBs)
    .then((res) => res.json())
    .then((data => {
        let listofB = document.getElementById('brewList')
        data.forEach(function(brewery){
            let linebreak = document.createElement("br");  
            let brewDetails = [brewery.name, brewery.street, brewery.city, brewery.state, brewery.country, brewery.brewery_type];
            brewDetails.forEach(function(deet) {
                let brewdeet = document.createTextNode(`${deet}`)
                let linebreak = document.createElement("br");
                listofB.appendChild(brewdeet)
                listofB.appendChild(linebreak);
            })
            listofB.appendChild(linebreak);
        })
    }))
}

let showBs = document.getElementById("showBs").addEventListener('click', findBs)


