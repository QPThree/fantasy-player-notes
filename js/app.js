'use strict';
//globals variables
const allNotes = [];
//footholds into DOM
let createNoteForm = document.getElementById('create-note-form');
//constructor functions

function CreateNote(playerName, position, team, text){
  this.playerName = playerName;
  this.position = position;
  this.team = team;
  this.text = text;

  allNotes.push(this);
  addToLocalStorage('allNotes', allNotes);
}


//prototype methods


//functions

function renderCard(obj){
  console.log('card rendered');
  let allCards = document.getElementById('allCards');
  let div = document.createElement('div');
  let h1 = document.createElement('h1');
  let h2 = document.createElement('h2');
  let h3 = document.createElement('h3');
  let p = document.createElement('p');

  div.className = 'card'; 
  allCards.appendChild(div);
  h1.textContent = obj.name;
  h2.textContent = obj.position;
  h3.textContent = obj.team;
  p.textContent = obj.text;

  div.appendChild(h1);
  div.appendChild(h2);
  div.appendChild(h3);
  div.appendChild(p);

  

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
  renderCard(new CreateNote(playerName, position, team, text));
  console.log(allNotes);
}

//event listeners
createNoteForm.addEventListener('submit', handleCreateNote);

//proof of lifes///
// new CreateNote('Tom Brady', 'QB', 'NE', 'He should be drafted high');
//render on run

if (getFromLocalStorage('allNotes')){
  allNotes = getFromLocalStorage('allNotes');
}
