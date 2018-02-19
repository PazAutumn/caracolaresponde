const btnAsking = document.getElementById('btnAsk');

btnAsking.addEventListener('click', function(event) {
  askHer();
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
}