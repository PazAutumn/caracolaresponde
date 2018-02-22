const login = document.getElementById('login');
const principal = document.getElementById('principal');
var userName;
console.log(name);
const contPrin = '<nav><div class="nav-wrapper navCaracola"><img src="assets/img/ms-icon-70x70.png" alt="">' +
      '<a href="#" class="brand-logo">Caracola</a><ul id="nav-mobile" class="right hide-on-med-and-down">' +
      '<li><a href="#">Bienvenid@ ' + $(userName) + '</a></li><li><a id="salir" href="#">Salir</a></li></ul></div></nav><section>' +
      '<div class="container"><div class="row"><div class="col s12 center-align yellow info" id="infoCar">' +
      '<p>La Caracola Mágica lo sabe todo. Puedes preguntarle lo que quieras, siempre que sean preguntas cerradas' +
      ' (sí o no) y te llevarás una sorpresa.</p></div></div></div></section><section id="encabezado"><div class="c' +
      'ontainer"><div class="row"><div class="col s12"><h5>¿Tienes alguna pregunta que te quita el sueño? <br> Cara' +
      'cola te dará la respuesta</h5></div></div><div class="row"><form class="col s12" id="formul"><div class="row">' +
      '<div class="input-field col s12 m9"><input placeholder="Ingresa tu pregunta" id="pregunta" type="text" class="v' +
      'alidate inp" required><label for="pregunta"></label></div><div class="input-field col s12 m3"><a href="#hasSpoken" class="waves-e' +
      'ffect waves-light btn yellow" type="submit" id="btnAsk">Preguntar</a></div></div></form></div></div></section><' +
      'section><div class="container"><div class="row responsestosave" id="conResp"><div class="col s12 m6 center-align">' +
      '<p id="respuesta"></p><div id="answer" class="center-align"></div></div><div class="col s12 m6" id="randomImage">' +
      '</div><div class="row spoke"><div class="col s12 center-align" id="hasSpoken"></div></div></div> <!-- cierro .row' +
      ' .responsestosave --></div> <!-- cierro .container --></section> <!-- cierro section -->';
const contLog = '<div class="container"><div class="row"><div class="col s12"><h1 id="titulo">¡Bienvenido ' +
      'a la caracola responde!</h1></div></div><div class="row"><div class="col s12 center-align"><img class' +
      '="responsive-img caracolaimg" src="assets/img/magic-conch-30847.jpg" alt=""></div></div><div class="row">' +
      '<div class="col s12 center-align"><button type="button" class="waves-effect waves-light btn" id="butt' +
      'onGoogle">Inicia sesión con google <i class="fab fa-google"></i></button></div></div><div class="row">' +
      '<div class="col s12"><p class="center-align yellow info">Inicia sesión con google y comienza a resolver' +
      'tus dudas existenciales</p></div></div></div>';
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
    console.log(user);
    var userName = user.displayName;
    console.log(userName);

    if (user =! null) {
        $(login).html('');
        $(principal).html(contPrin);

      // Caracola

          const btnAsking = document.getElementById('btnAsk');
          const btnLogout = document.getElementById('salir');
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

          btnLogout.addEventListener('click', function(event) {
            $(login).html(contLog);
            $(principal).html('');
            $('#buttonGoogle').click(function(){
                authGoogle();
              })
          })

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
        } else {
          alert('No se pudo registar el usuario, intente nuevamente');
        }
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      var email = error.email;
      var credential = error.credential;
    })
  };

      var user = firebase.auth().currentUser;
      var name, email, photoUrl, uid, emailVerified;

      if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;
    }
  //DATABASE

  var database = firebase.database();

  //STORAGE

  //var storage = firebase.storage();


//





