'use strict';
//globals variables
let allNotesArr = [];
let positionsArr = ['QB', 'RB', 'WR', 'TE'];
let teamsArr = ['ARI', 'ATL', 'BUF', 'BAL', 'CAR', 'CIN', 'CLE', 'CHI', 'DAL', 'DEN', 'DET', 'GB', 'HOU', 'IND', 'KC', 'LAC', 'LAR', 'JAC', 'MIA', 'MIN', 'NE', 'NO', 'NYG', 'NYJ', 'OAK', 'PHI', 'SF', 'SEA', 'PIT', 'TB', 'TEN', 'WAS'];
let noteEditedId;
//footholds into DOM
let createNoteForm = document.getElementById('create-note-form');
let filterForm = document.getElementById('filterform');
let deleteAllNotesButton = document.getElementById('deleteAllNotes');

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
  for (let i = 0; i <arr.length; i++){
    let div = document.createElement('div');
    let h1 = document.createElement('h1');
    let h2 = document.createElement('h2');
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    let img = document.createElement('img');
  
    div.className = 'card';
    div.id = arr[i].playerName; 

    allCards.appendChild(div);
    h1.textContent = arr[i].playerName;
    h2.textContent = arr[i].position.toUpperCase();
    h3.textContent = arr[i].team.toUpperCase();
    p.textContent = arr[i].text;
    img.src = 'img/edit-pencil.png';
    img.class = 'edit-note';
    img.id = arr[i].playerName;
    img.addEventListener('click', handleEditNote);
  
    div.appendChild(h1);
    div.appendChild(h2);
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(img);
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

function handleFilter(event){
  event.preventDefault();
  let team = event.target.filterTeam.value;
  let position = event.target.filterPosition.value;
  let outputArr = [];

  for(let i = 0; i < allNotesArr.length; i++){
    if ((allNotesArr[i].team === team) || allNotesArr[i].position === position){
      outputArr.push(allNotesArr[i]);
    }
  }
  clearAllCardsFromPage();
  renderCards(outputArr);
}

function handleEditNote(event){
  event.preventDefault();
  let main = document.querySelector('main');
  let editCard = document.createElement('div');
  editCard.className = 'editCard';
  editCard.id = event.currentTarget.id;

  let form = document.createElement('form');
  form.id = 'editNoteForm';
  let fieldset = document.createElement('fieldset');
  let legend = document.createElement('legend');
  let label1 = document.createElement('label');// player name label
  let label2 = document.createElement('label'); // position label
  let label3 = document.createElement('label'); //team label
  let label4 = document.createElement('label'); //note text label
  let input = document.createElement('input');
  input.value = editCard.id;
  let select2 = document.createElement('select'); //for position
  let select3 = document.createElement('select'); //for teams
  let textArea = document.createElement('textarea');
  let button = document.createElement('button'); //used for submition


  form.addEventListener('submit', handleEditNoteSubmission);

  //for loop creates all position options in edit card form
  for (let i = 0; i < positionsArr.length; i++){
    let pos = document.createElement('option');
    pos.textContent = positionsArr[i];
    let value = positionsArr[i].toLowerCase();
    pos.value = value;
    select2.appendChild(pos);
  }
  //for loop creates all team options in edit card form
  for (let i = 0; i < teamsArr.length; i++){
    let team = document.createElement('option');
    team.textContent = teamsArr[i];
    let value = teamsArr[i].toLowerCase();
    team.value = value;
    select3.appendChild(team);
  }


  legend.textContent = 'Edit Player Note';
  label1.textContent = 'Player Name:';
  label2.textContent = 'Position';
  label3.textContent = 'Team';
  label4.textContent = 'Edit Note';
  button.textContent = 'Submit Edit';

  label2.appendChild(select2);
  label3.appendChild(select3);
  label4.appendChild(textArea);

  input.type = 'text';
  input.id = 'editPlayerName';
  input.name = 'editPlayerName';

  select2.id = 'editPosition';
  select3.id = 'editTeam';

  textArea.id = 'editText';
  textArea.rows = '4';
  textArea.cols = '25';

  form.appendChild(fieldset);
  fieldset.appendChild(legend);
  fieldset.appendChild(label1);
  fieldset.appendChild(label2);
  fieldset.appendChild(label3);
  fieldset.appendChild(label4);
  fieldset.appendChild(button);
  label1.appendChild(input);
  editCard.appendChild(form);

  main.appendChild(editCard);
  noteEditedId = event.target.id;

}

function handleEditNoteSubmission(event){
  event.preventDefault();
  let playerName = event.target.editPlayerName.value;
  let position = event.target.editPosition.value;
  let team = event.target.editTeam.value;
  let text = event.target.editText.value;
  let k;

  for (let i = 0; i < allNotesArr.length; i++){
    if (allNotesArr[i].playerName = noteEditedId){
      k = i;
    }
  }
  allNotesArr[k].playerName = playerName;
  allNotesArr[k].position = position;
  allNotesArr[k].team = team;
  allNotesArr[k].text = text;
  let cardToRemove = document.getElementById(noteEditedId);
  addToLocalStorage('allNotesArr', allNotesArr);
  console.log(cardToRemove);
  location.reload();
}
function deleteAllNotes(event){
  event.preventDefault();
  console.log('inside delete all notes arr');
  allNotesArr = getFromLocalStorage('allNotesArr');
  allNotesArr = [];
  clearAllCardsFromPage();
  addToLocalStorage('allNotesArr', allNotesArr);
}
//event listeners
createNoteForm.addEventListener('submit', handleCreateNote);
filterForm.addEventListener('submit', handleFilter);
deleteAllNotesButton.addEventListener('click', deleteAllNotes);

//proof of lifes///
// new CreateNote('Tom Brady', 'QB', 'NE', 'He should be drafted high');
//render on run

if (getFromLocalStorage('allNotesArr')){
  allNotesArr = getFromLocalStorage('allNotesArr');
  renderCards(allNotesArr);
}
