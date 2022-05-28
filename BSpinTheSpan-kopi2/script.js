


const firebaseConfig = {
    // Skriv din config her
    /* apiKey: "AIzaSyBPnlx2XV9Sg-k3DYD0n_InzhhQPN5xUsQ",
    authDomain: "newprog-616ae.firebaseapp.com",
    projectId: "newprog-616ae",
    storageBucket: "newprog-616ae.appspot.com",
    messagingSenderId: "514830459978",
    appId: "1:514830459978:web:a8b0b2b16ffe8ce56532b3" */
    apiKey: "AIzaSyB36lZchbB9irTEi1RJgVZB0vtCdBdAnVs",
    authDomain: "myproject251-da91c.firebaseapp.com",
    projectId: "myproject251-da91c",
    storageBucket: "myproject251-da91c.appspot.com",
    messagingSenderId: "1026524450308",
    appId: "1:1026524450308:web:c1f45cada822a371996f51"
};




firebase.initializeApp(firebaseConfig);

let collectionName = "Brukere"
/* let collectionName= "DidrikVarHer" */

let db = firebase.firestore();

let bodyEl = document.querySelector("body")
let containerEl = document.querySelector("#container");
let spinBtn = document.querySelector("#spin");
let scoreEl = document.querySelector("#score")
let scoreCounterEl = document.querySelector("#scoreCounter")
let buySpinsEl = document.querySelector("#buySpins");
let timeCounterEl = document.querySelector("#timeCounter");
let spinDegrees = Math.floor(Math.random() * 1000 + 200);
let leaderboardsEl = document.querySelector("#leaderboards");
let navnInputEl = document.querySelector("#fornavn");
let sjekkLeaderboardsEl = document.querySelector("#sjekkLeaderboards")
let toggleLeaderboardsEl = document.querySelector("#toggleLeaderboards")
let navnetEl = document.querySelector("#navnet")
let slettBrukernavnInputEl = document.querySelector("#brukernavnSlett")
let spinsCounterEl = document.querySelector("#spinsCounter")
let upgradeEl = document.querySelector("#upgrade")
let registrerBtnEl = document.querySelector("#registrer")
let informasjonEl = document.querySelector("#informasjon")
let btninfoEl = document.querySelector("#info")


let score = 0;
let queue = true;
let numbera;
let numberb;


// Initialiserer spilleren
let spiller = {
    navn: "Temp",
    money: 350,
    spins: 15,
    timeSpin:5000,
    upgradeCost:10,
}
let spinsCost=10;




function updateSite() {
    scoreCounterEl.innerText = `MONEY: ${spiller.money}`;
    timeCounterEl.innerText = `TIME PER SPIN: ${spiller.timeSpin/1000}s`;
    containerEl.style.transition = spiller.timeSpin / 1000 + "s";
    spinsCounterEl.innerText = `Spins: ${spiller.spins}`;
    upgradeEl.innerText = `SPEED UP: ${spiller.upgradeCost}`;
}

updateSite()


function updateDatabase(spiller) {
    console.log("Oppdaterer databasen")
    //let id = e.target.getAttribute("data-id");
    // Bruker navnet på spilleren som id i firebase dokumentet
    let id = spiller.navn
    db.collection(collectionName).doc(id).update({
        money: spiller.money,
        spins: spiller.spins,
        timeSpin: spiller.timeSpin,
        upgradeCost:spiller.upgradeCost
    });
}



spinBtn.addEventListener("click", spinCheck);
buySpinsEl.addEventListener("click", buySpin)
upgradeEl.addEventListener("click",upgrade)
btninfoEl.addEventListener("click",toggleInfo)

function toggleInfo(){
    informasjonEl.classList.toggle("hidden")
}
function upgrade(){
    if(spiller.timeSpin>150){
        if(spiller.money >= spiller.upgradeCost){
            spiller.timeSpin -=250;
            spiller.money -= spiller.upgradeCost;
            scoreCounterEl.innerText = `MONEY: ${spiller.money}`;
            containerEl.style.transition = spiller.timeSpin / 1000 + "s";
            timeCounterEl.innerText = `TIME PER SPIN: ${spiller.timeSpin / 1000}s`
            spiller.upgradeCost = Math.floor(Number(spiller.upgradeCost) * 1.25);
            upgradeEl.innerText = `SPEED UP: ${Number(spiller.upgradeCost)}`;
        }
        }else{
            upgradeEl.innerText = "OUT OF UPGRADES"
        }
        updateDatabase(spiller)
    }



function buySpin() {
    if (spiller.money >= spinsCost) {
        spiller.spins += 1
        spiller.money -= spinsCost
        scoreCounterEl.innerText = `MONEY: ${Number(spiller.money)}`;
        spinsCounterEl.innerText = `Spins: ${Number(spiller.spins)}`;

    }

    updateDatabase(spiller)
}

function spinCheck() {
    if (spiller.spins >= 1) {
        spin()
    }
    else if (spiller.spins === 0) {
        hovedEl.innerHTML += '<h1>DEtte går ikke</h1>'

    }
}
function spin() {

    if (queue == true) {
        queue = false;
        containerEl.style.transform = `rotate(${spinDegrees}deg)`;
        score = (spinDegrees + 22.5) / 45;
        console.log(spinDegrees)
        console.log(score)
        //Slik at man ikke kan få mer enn 8 poeng:
        if (score > 9) {
            numbera = score % 8;
            numberb = score - numbera;
            score = score - numberb
        }
        if (score > 0 && score < 1) {
            /* score = 15; */
            spiller.money=0;
            console.log("du mistet alle pengene dine taper")
        }
        /* if (score === 8) {
            score += 7
        } */
        spinDegrees += Math.floor(Math.random() * 1000 + 200);
        setTimeout(scoreShow, spiller.timeSpin)
    }
    spiller.spins -= 1
}


function scoreShow() {
    queue = true;
    scoreEl.innerText = Math.floor(score);
    spiller.money = Number(spiller.money) + Math.floor(score);
    scoreCounterEl.innerText = `MONEY: ${Number(spiller.money)}`;
    spinsCounterEl.innerText = `Spins: ${Number(spiller.spins)}`;
    updateDatabase(spiller)
}

let refreshBtn = document.querySelector("#refreshimg");

refreshBtn.addEventListener("click", refresh);

function refresh() {
    spiller.money = 350;
    spiller.spins = 15;
    spiller.timeSpin = 5000;
    spiller.upgradeCost = 10;

    scoreCounterEl.innerText = `MONEY: ${Number(spiller.money)}`;

    buySpinsEl.innerText = `BUY SPIN : ${spinsCost}`;
    updateDatabase(spiller)
}



let hovedEl = document.querySelector("#hoved")
let navnEl = document.querySelector("#navn")



//registrerBtnEl.addEventListener("click", addUser)
registrerBtnEl.addEventListener("click", lagHentBruker)


function kjor() {
    let navn = navnInputEl.value;
    spiller.navn = navn

    db.collection(collectionName).doc(navn).set({
        navn: navn,
        money: spiller.money,
        spins: spiller.spins,
    })
}


function lagHentBruker() {
    refresh()
    let navn = navnInputEl.value;
    let ny

    if(navn!=""){

    navnetEl.innerHTML = `Ditt navn er: ${navn} `;

    db.collection(collectionName).get().then((snapshot) => {
        // Henter ut dokumentene
        let dokumenter = snapshot.docs;
        console.log(dokumenter)

        for (let i = 0; i < dokumenter.length; i++) {
            let data = dokumenter[i].data()
            console.log(data)

            if (data.navn == navn) {
                ny = false
                spiller.navn = data.navn
                spiller.money = data.money
                spiller.spins = data.spins

                break
            } else {
                ny = true
            }
        }

        if (ny) {
            spiller.navn = navn
            lagBruker(navn)
        }

        console.log("Velkommen", spiller.navn)
        navnInputEl.value = ""
        updateSite()
    })}
}





function lagBruker(navn) {
    //db.collection(collectionName).add({
    db.collection(collectionName).doc(navn).set({
        navn: navn,
        money: spiller.money,
        spins: spiller.spins,
        timeSpin: spiller.timeSpin,
        upgradeCost:spiller.upgradeCost,


    })
}



sjekkLeaderboardsEl.addEventListener("click", leaderboards)
window.addEventListener("load", leaderboards)
/* if (queue == true) {
    leaderboards()
} */
// Henter data. Når dataene er ferdig hentet, starter "then"-biten
function leaderboards() {
    db.collection(collectionName).orderBy("money", "desc").get().then((snapshot) => {
        // Henter ut dokumentene
        let dokumenter = snapshot.docs;

        leaderboardsEl.innerHTML = ""
        // Går gjennom dokumentene og sender dem videre      
        //for (let i = 0; i < dokumenter.length; i++) {
        // De 5 beste
        for (let i = 0; i < 5; i++) {

            let data = dokumenter[i].data();

            leaderboardsEl.innerHTML += `<div class="score">
            <h2>Navn: ${data.navn} </h2>
            <p>Penger: ${data.money} kr</p>
            <p>Spins: ${data.spins} </p>
            <p>TimeSpin: ${data.timeSpin/1000}s </p>
            </div>`



        }
    });
}


slettBtn = document.querySelector("#slett")

slettBtn.addEventListener("click", deleteToDatabase)

console.log(slettBrukernavnInputEl.value)

function deleteToDatabase(spiller) {
    console.log("Sletter til databasen")
    //let id = e.target.getAttribute("data-id");
    // Bruker navnet på spilleren som id i firebase dokumentet

    let id = slettBrukernavnInputEl.value
    db.collection(collectionName).doc(id).delete();
}




/*  console.log(endreTilstand(""))

  function endreTilstand(e){
      let id = e.target.getAttribute("data-id");

      db.collectioni(collectionName).doc(doc.id).update({navn:"PatrickTheMan"})
  } */