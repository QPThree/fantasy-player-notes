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
  console.log(this);
}


//prototype methods


//functions

function renderCard(obj){
  console.log('card rendered');
  let allCards = document.getElementsByClassName('allCards');
  let div = document.createElement('div');
  let h1 = document.createElement('h1');
  let h2 = document.createElement('h2');
  div.className = 'card'; 

  h1.textContent = obj.name;
  h2.textContent = obj.position;
}

//event handlers
function handleCreateNote(event){
  event.preventDefault();
  let playerName = event.target.createPlayerName.value;
  let position = event.target.createPosition.value;
  let team = event.target.createTeam.value;
  let text = event.target.createText.value;
  renderCard(new CreateNote(playerName, position, team, text));
}

//event listeners
createNoteForm.addEventListener('submit', handleCreateNote);

//proof of lifes///
// new CreateNote('Tom Brady', 'QB', 'NE', 'He should be drafted high');
