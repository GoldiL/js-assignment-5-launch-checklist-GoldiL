// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML =`
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter:${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth:${distance} </li>
                    <li>Number of Moons:${moons} </li>
                </ol>
                <img src="${imageUrl}">
   `
}

function validateInput(testInput) {
    if(testInput === "" || testInput === null || testInput === 0){
       return "Empty";
    }else if(!isNaN(testInput)){
        return "Is a Number"
    }else{
        return "Not a Number"
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let cargoStatus = document.getElementById('cargoStatus');
    let launchStatus = document.getElementById('launchStatus');
   
    //checking whether the fields are having value
    if(validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty"){
        alert ('Please enter all the fields');
        list.style.visibility = "hidden";
    }else if(validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel)=== 'Not a Number'){
        alert ('Please enter a numerical value for the fuel and cargo level.')
        list.style.visibility = 'hidden';
    }else if(validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number"){
        alert ('Please enter a name for the pilot and co pilot.')
        list.style.visibility = 'hidden';
    }else {
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        list.style.visibility = 'hidden';
    //}
    //checking the fuel Level
    if (Number(fuelLevel) <= 10000) {
        alert("Not enough fuel for journey");
        list.style.visibility = 'visible';
        fuelStatus.innerHTML = 'Not enough fuel for journey';       
        launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
        launchStatus.style.color = 'red';
    } else if (Number(cargoLevel) >= 10000) {
        alert("Cargo mass too heavy for launch");
        cargoStatus.innerHTML = 'Cargo mass too heavy for launch';
        list.style.visibility = 'visible';
        launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
        launchStatus.style.color = 'red';
    } else if (Number(cargoLevel) <= 10000 && Number(fuelLevel) >= 10000) {
        list.style.visibility = 'visible';
        launchStatus.innerHTML = 'Shuttle  ready for launch';
        launchStatus.style.color = 'green';
    }   
} 

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json()
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random()*planets.length);
    return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
