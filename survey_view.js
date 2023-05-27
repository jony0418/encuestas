document.getElementById('submitAnswers').addEventListener('click', function() {
  let name = document.getElementById('name').value;
  let nomina = document.getElementById('nomina').value;
  let surveyName = document.getElementById('surveyName').value;

  if (name === "" || nomina === "" || surveyName === "") {
    alert('Por favor, llena todos los campos.');
    return;
  }

  let surveys = JSON.parse(localStorage.getItem('surveys')) || {};
  let survey = surveys[surveyName];
  if (!survey) {
    alert('No existe ninguna encuesta con ese nombre.');
    return;
  }

  let answers = [];
  for (let i = 0; i < survey.length; i++) {
    let answerElement = document.querySelector('input[name="answer' + i + '"]:checked, textarea[name="answer' + i + '"]');
    if (answerElement) {
      answers.push(answerElement.value);
    } else {
      alert('Por favor, responde todas las preguntas.');
      return;
    }
  }

  // Envía las respuestas al archivo PHP a través de una solicitud AJAX
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "saveAnswers.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("nomina=" + nomina + "&surveyName=" + surveyName + "&answers=" + JSON.stringify(answers));

  let responses = JSON.parse(localStorage.getItem('responses')) || {};
  let id = 'nomina-' + nomina + '-survey-' + surveyName;
  responses[id] = {
    surveyName: surveyName,
    answers: answers
  };

  localStorage.setItem('responses', JSON.stringify(responses));
  alert('Tus respuestas han sido guardadas. ¡Gracias por participar!');
});
