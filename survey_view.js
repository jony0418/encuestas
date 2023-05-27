function displaySurvey(survey) {
    let form = document.getElementById('surveyAnswersForm');
  
    survey.forEach(function(questionObj, index) {
      let questionElement = document.createElement('p');
      questionElement.textContent = questionObj.question;
      form.appendChild(questionElement);
  
      let answerElement;
  
      switch(questionObj.type) {
        case 'open':
          answerElement = document.createElement('textarea');
          answerElement.name = 'answer' + index;
          form.appendChild(answerElement);
          break;
        
        case 'truefalse':
          ['verdadero', 'falso'].forEach(function(option) {
            let label = document.createElement('label');
            answerElement = document.createElement('input');
            answerElement.type = 'radio';
            answerElement.name = 'answer' + index;
            answerElement.value = option;
            label.appendChild(answerElement);
            label.appendChild(document.createTextNode(option));
            form.appendChild(label);
          });
          break;
  
        case 'satisfaction':
          ['Total desacuerdo', 'Desacuerdo', 'Indiferente', 'De acuerdo', 'Totalmente de acuerdo'].forEach(function(option) {
            let label = document.createElement('label');
            label.className = 'satisfactionOption';
            answerElement = document.createElement('input');
            answerElement.type = 'radio';
            answerElement.name = 'answer' + index;
            answerElement.value = option;
            label.appendChild(answerElement);
            label.appendChild(document.createTextNode(option));
            form.appendChild(label);
          });
          break;
      }
    });
  }
  
  window.onload = function() {
    let surveyNameSelector = document.getElementById('surveyName');
    let surveys = JSON.parse(localStorage.getItem('surveys')) || {};
  
    for (let surveyName in surveys) {
      let option = document.createElement('option');
      option.value = surveyName;
      option.textContent = surveyName;
      surveyNameSelector.appendChild(option);
    }
  };
  
  document.getElementById('surveyName').addEventListener('change', function() {
    let form = document.getElementById('surveyAnswersForm');
    // Borra todas las preguntas actuales
    while (form.firstChild) {
      form.removeChild(form.firstChild);
    }
    
    let surveyName = this.value;
    let surveys = JSON.parse(localStorage.getItem('surveys')) || {};
    let survey = surveys[surveyName];
  
    // Muestra las preguntas de la encuesta seleccionada
    displaySurvey(survey);
  });
  
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

  let responses = JSON.parse(localStorage.getItem('responses')) || {};
  let id = 'nomina-' + nomina + '-survey-' + surveyName;
  responses[id] = {
    surveyName: surveyName,
    answers: answers
  };

  localStorage.setItem('responses', JSON.stringify(responses));
  alert('Tus respuestas han sido guardadas. ¡Gracias por participar!');
});