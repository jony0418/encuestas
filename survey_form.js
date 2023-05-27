document.getElementById('addQuestion').addEventListener('click', function() {
    let surveyName = document.getElementById('surveyName').value;
    if (surveyName === "") {
      alert('Por favor, ingresa el nombre de la encuesta.');
      return;
    }
  
    let question = document.getElementById('question').value;
    let type = document.getElementById('type').value;
  
    if (question === "" || type === "") {
      alert('Por favor, llena todos los campos.');
      return;
    }
  
    let surveys = JSON.parse(localStorage.getItem('surveys')) || {};
    let survey = surveys[surveyName] || [];
    survey.push({ question: question, type: type });
    surveys[surveyName] = survey;
  
    localStorage.setItem('surveys', JSON.stringify(surveys));
    alert('Pregunta añadida a la encuesta "' + surveyName + '"');
  });
  