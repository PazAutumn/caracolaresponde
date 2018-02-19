//Firebase

var config = {
    apiKey: "AIzaSyDlPuGTt0qq3ZiB1XB1e8h5_5RSSgYcwUg",
    authDomain: "caracola-6091f.firebaseapp.com",
    databaseURL: "https://caracola-6091f.firebaseio.com",
    projectId: "caracola-6091f",
    storageBucket: "caracola-6091f.appspot.com",
    messagingSenderId: "995615335235"
  };
  firebase.initializeApp(config);

//

const btnAsking = document.getElementById('btnAsk');
let question = document.getElementById('pregunta');
let questionAsked;

btnAsking.addEventListener('click', function(event) {
  questionAsked = question.value;
  question.innerHTML = '';
  if (questionAsked === '' || questionAsked == 'hola') {
    alert('Vamos, esa no es una pregunta, no seas tímido');
  } else {
    askHer();
  }
});

function askHer() {
  fetch(`https://yesno.wtf/api`)
  .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);

      let response = `<h1 class="center-align">${data.answer}</h1>`;
      let imageAnswer = `<img class="responsive-img" src="${data.image}"></img>`;


      document.getElementById('answer').innerHTML = response;
      document.getElementById('image').innerHTML = imageAnswer;

  })
  .catch(function(error) {
    console.log(error);
  });
}