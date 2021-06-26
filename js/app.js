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



//event handlers
function handleCreateNote(event){
  event.preventDefault();
  let playerName = event.target.createPlayerName.value;
  let position = event.target.createPosition.value;
  let team = event.target.createTeam.value;
  let text = event.target.createText.value;
  new CreateNote(playerName, position, team, text);
}

//event listeners
createNoteForm.addEventListener('submit', handleCreateNote);

//proof of lifes///
// new CreateNote('Tom Brady', 'QB', 'NE', 'He should be drafted high');
