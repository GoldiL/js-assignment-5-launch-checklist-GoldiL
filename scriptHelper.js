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
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        list.style.visibility = 'hidden';
    
    //checking the fuel Level
    if (Number(fuelLevel) < 10000) {
        list.style.visibility = 'visible';
        fuelStatus.innerHTML = 'Fuel level too low for launch';       
        launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
        launchStatus.style.color = 'rgb(199, 37, 78)';
    } else if (Number(cargoLevel) > 10000) {
        cargoStatus.innerHTML = 'Cargo mass too heavy for launch';
        list.style.visibility = 'visible';
        launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
        launchStatus.style.color = 'rgb(199, 37, 78)';
    }else if (Number(fuelLevel) > 10000 && Number(cargoLevel) > 10000) {
        fuel.innerHTML = "Fuel level high enough for launch "
        cargo.innerHTML = "To much Cargo mass for the journey."
        launchStatus.innerHTML = "Shuttle is not ready for launch"
        launchStatus.style.color = "red";
    }else if((Number(fuelLevel) < 10000 && Number(cargoLevel) > 10000)){
        list.style.visibility = 'visible';
        cargoStatus.innerHTML = 'Cargo mass too heavy for launch';   
        fuelStatus.innerHTML = 'Fuel level too low for launch';     
        launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
        launchStatus.style.color = 'rgb(199, 37, 78)';
    }else {
        list.style.visibility = 'visible';
        launchStatus.style.color = "rgb(65, 159, 106)";
        launchStatus.innerHTML = 'Shuttle is Ready for Launch';
        cargoStatus.innerHTML = 'Cargo mass low enough for launch';
    } 
} 

//}

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
