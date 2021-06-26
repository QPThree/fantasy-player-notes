'use strict';
//globals variables
let allNotesArr = [];
//footholds into DOM
let createNoteForm = document.getElementById('create-note-form');
//constructor functions

function CreateNote(playerName, position, team, text){
  this.playerName = playerName;
  this.position = position;
  this.team = team;
  this.text = text;

  allNotesArr.push(this);
  addToLocalStorage('allNotesArr', allNotesArr);
  console.log(playerName);
}


//prototype methods


//functions

function renderCards(arr){
  let allCards = document.getElementById('allCards');
  for (let i = 0; i <allNotesArr.length; i++){
    let div = document.createElement('div');
    let h1 = document.createElement('h1');
    let h2 = document.createElement('h2');
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
  
    div.className = 'card'; 
    allCards.appendChild(div);
    h1.textContent = arr[i].playerName;
    h2.textContent = arr[i].position;
    h3.textContent = arr[i].team;
    p.textContent = arr[i].text;
  
    div.appendChild(h1);
    div.appendChild(h2);
    div.appendChild(h3);
    div.appendChild(p);
  }

}

function clearAllCardsFromPage(){
  let allCards = document.getElementById('allCards');
  allCards.innerHTML = '';
}
function addToLocalStorage(key, item) {
  let stringifiedItem = JSON.stringify(item);
  localStorage.setItem(key, stringifiedItem);
}

function getFromLocalStorage(key) {
  let returnedItem = JSON.parse(localStorage.getItem(key));
  return returnedItem;
}
//event handlers
function handleCreateNote(event){
  event.preventDefault();
  let playerName = event.target.createPlayerName.value;
  let position = event.target.createPosition.value;
  let team = event.target.createTeam.value;
  let text = event.target.createText.value;
  new CreateNote(playerName, position, team, text);
  clearAllCardsFromPage();
  renderCards(allNotesArr);
  console.log(allNotesArr);
}

//event listeners
createNoteForm.addEventListener('submit', handleCreateNote);

//proof of lifes///
// new CreateNote('Tom Brady', 'QB', 'NE', 'He should be drafted high');
//render on run

if (getFromLocalStorage('allNotesArr')){
  allNotesArr = getFromLocalStorage('allNotesArr');
  renderCards(allNotesArr);
}
