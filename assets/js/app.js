const contLog = document.getElementById('login');
const contPrin = document.getElementById('principal');
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
    contLog.style.display = 'none';
    contPrin.style.display = 'block';
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
    console.log(result);
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
  }

  //DATABASE

  var database = firebase.database();

  //STORAGE

  //var storage = firebase.storage();


// Caracola

const btnAsking = document.getElementById('btnAsk');
let question = document.getElementById('pregunta');
let questionAsked;
let randomImage = document.getElementById('randomImage');
let answerYoN = document.getElementById('answer');
let questionAnswered = document.getElementById('respuesta');
let hasSpoken = document.getElementById('hasSpoken');

btnAsking.addEventListener('click', function(event) {
  questionAsked = question.value;
  question.value = '';
  if (questionAsked === '' || questionAsked == 'hola') {
    alert('Vamos, esa no es una pregunta, no seas tímido/a');
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

      let responseYN = `<h1 class="animated pulse circular">${data.answer}</h1>`;
      let imageAnswer = `<img class="responsive-img" src="${data.image}"></img>`;
      /*let btnSave = `<a class="waves-effect waves-light btn yellow" type="submit" id="btnSave" onclick=saveResponse();>Guardar respuesta</a>`;*/

      questionAnswered.innerHTML = questionAsked;
      questionAnswered.classList.add('preguntarespondida');
      answerYoN.innerHTML = responseYN;
      randomImage.innerHTML = imageAnswer;
      hasSpoken.innerHTML = `<h3 class="spongebob">¡La Caracola ha hablado!</h3><img class="responsive-img conch" src="assets/img/caracolahahablado.gif" alt="">`

  })
  .catch(function(error) {
    console.log(error);
  });
}

/*function saveResponse() {
  console.log('Hola');
  savedAnswersCont.appendChild(contResp).removeAttribute('id');
  btnSave.remove();
}*/
