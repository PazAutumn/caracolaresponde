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

  //Autenticación

  $('#buttonGoogle').click(function(){
    authGoogle();
  })

  function authGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    authentication(provider);
  }

  function authentication(provider) {
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;
    consolle.log(result);
    })
    .catch(function(error) {
      console.log(error);
      var errorCode = error.code;
      console.log(errorCode);
      var errorMessage = error.message;
      console.log(errorMessage);
      var email = error.email;
      console.log(email);
      var credential = error.credential;
      console.log(credential);
    });
  };

//

const btnAsking = document.getElementById('btnAsk');
let question = document.getElementById('pregunta');
let questionAsked;
let answerYoN = document.getElementById('answer');
let questionAnswered = document.getElementById('respuesta');

btnAsking.addEventListener('click', function(event) {
  questionAsked = question.value;
  question.value = '';
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

      let response = `<h1 class="animated pulse circular">${data.answer}</h1>`;
      let imageAnswer = `<img class="responsive-img" src="${data.image}"></img>`;


      questionAnswered.innerHTML = questionAsked;
      answerYoN.innerHTML = response;
      document.getElementById('image').innerHTML = imageAnswer;
  })
  .catch(function(error) {
    console.log(error);
  });
}