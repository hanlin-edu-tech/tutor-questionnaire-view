const single = (question, index, isView) => {
  return `
          <div class="form-group" id="q${index}">
            <div class="form-topic">${index + 1}. ${question.topic}
              ${question.required === true ? '<span style="color: #F28121;">*</span>' : ''}
            </div>
            <div class="form-must hide" id="must${index}">*請填寫這個欄位*</div>
            <div class="form-item">
              ${isView ? question.answer : singleOptions(question.options, index)}            
            </div>
          </div>`;
};

const singleOptions = (options, questionIdx) => {
  let optionStr = '';
  options.forEach((opt, idx) => {
    optionStr += `<div class="control">
                    <input class="q${questionIdx}" id="q${questionIdx}o${idx}" type="radio" name="single${questionIdx}" value="${opt}">
                    <label for="q${questionIdx}o${idx}">${opt}</label>
                </div>`;
  });
  return optionStr;
};

const multiple = (question, index, isView) => {
  return `
          <div class="form-group" id="q${index}">
            <div style="display:flex">
              <div class="form-topic">${index + 1}. ${question.topic}
                ${question.required === true ? '<span style="color: #F28121;">*</span>' : ''}		
              </div>
            
              <div class="multiple">
                <div class="multiple-text">複選</div>
              </div>
            </div>
            <div class="form-must hide" id="must${index}">*請填寫這個欄位*</div>
            <div class="form-item" id="multi${index}">
              ${isView ? question.answer : multipleOptions(question.options, index)}
            </div>
          </div>`;
};

const multipleOptions = (options, questionIdx) => {
  let optionStr = '';
  options.forEach((opt, idx) => {
    optionStr += `<div class="control">
                  <input class="q${questionIdx}" id="q${questionIdx}o${idx}" type="checkbox" name="multi${questionIdx}" value="${opt}">
                  <label for="q${questionIdx}o${idx}">${opt}</label>
                </div>`;
  });
  return optionStr;
};

const text = (question, index, isView) => {
  return `<div class="form-group" id="q${index}">
            <div class="form-topic">${index + 1}. ${question.topic}
              ${question.required === true ? '<span style="color: #F28121;">*</span>' : ''}			
            </div>
            <div class="form-must hide" id="must${index}">*請填寫這個欄位*</div>            
            <div class="form-item">			
              ${isView ? question.answer : `<textarea placeholder="請填入文字" name="qa${index}" data-subject-answer="500">${isView ? question.answer : ''}</textarea>`}
            </div>
          </div>`;
};

(() => {
  const params = new URL(document.location).searchParams;
  const id = params.get("id");
  const course = params.get("course");
  const isView = params.get("view") !== null;

  function init() {
    if (isView) {
      initUserQuestionnaireView(id);
    } else {
      initSurveyView(id);
    }
  }

  async function initUserQuestionnaireView(questionnaireId) {
    const userQuestionnaire = await window.eHanlin.dataprovider.questionnaire.getQuestionnaire(questionnaireId);
    document.querySelector('#name').innerText = userQuestionnaire.template.name;
    document.querySelector('#description').innerText = userQuestionnaire.template.description;
    document.querySelector('.row-btn.send').classList.add('hide');
    composeForm(userQuestionnaire.questions, true);
  }

  async function initSurveyView(templateId) {
    const template = await window.eHanlin.dataprovider.questionnaire.getTemplate(templateId);
    document.querySelector('#name').innerText = template.name;
    document.querySelector('#description').innerText = template.description;
    composeForm(template.questions, false);
    document.querySelector('.btn-send').addEventListener('click', validateAndSubmit.bind(validateAndSubmit, template));
  }

  function composeForm(questions, isView) {
    questions.forEach((it, idx) => {
      switch (it.type) {
        case '單選題':
          document.querySelector('#content').innerHTML += single(it, idx, isView);
          break;
        case '多選題':
          document.querySelector('#content').innerHTML += multiple(it, idx, isView);
          break;
        case '問答題':
          document.querySelector('#content').innerHTML += text(it, idx, isView);
          break;
      }
    });
  }

  function validateAndSubmit(template) {
    const questionnaire = mapTemplateInfoToQuestionnaire(template);
    const isValidate = validate(questionnaire);
    if (isValidate) {
      questionnaire.finished = new Date();
      if (course) questionnaire.extraInfo = { userCourse: course };
      const success = window.eHanlin.dataprovider.questionnaire.submit(id, questionnaire);
      if (success) {
        if(template.finishMsg) document.querySelector('.success-content').innerText = template.finishMsg;      
        document.querySelector('.modal-success').classList.remove('hide');
      }
    }
  }

  function mapTemplateInfoToQuestionnaire(template) {
    const questionnaire = {};
    questionnaire.started = new Date();
    questionnaire.template = id;
    questionnaire.questions = [];

    template.questions.forEach((it, idx) => {
      const answer = getAnswers(it, idx);
      questionnaire.questions.push({
        topic: template.questions[idx].topic,
        answer,
        required: template.questions[idx].required,
        type: template.questions[idx].type,
        options: template.questions[idx].options
      });
    });
    return questionnaire;
  }

  function getAnswers(data, idx) {
    const answers = [];
    switch (data.type) {
      case '單選題':
        const checked = document.querySelector(`[name=single${idx}]:checked`);
        if (checked) {
          answers.push(checked.value);
        }
        return answers;
      case '多選題':
        const checkedItems = document.querySelectorAll(`[name=multi${idx}]:checked`);
        if (checkedItems.length !== 0) {
          checkedItems.forEach(it => {
            answers.push(it.value);
          });
        }
        return answers;
      case '問答題':
        const answer = document.querySelector(`[name=qa${idx}]`).value.trim();
        if (answer !== '') {
          answers.push(answer);
        }
        return answers;
    }
  }

  function validate(questionnaire) {
    resetWarning();
    const validate = questionnaire.questions.every((data, index) => {
      if (data.required) {
        const answer = data.answer;
        if (answer.length === 0) {
          warning(index);
          return false; 
        }
        if (data.type === '問答題' && answer[0].trim() === '') {
          warning(index);
          return false; 
        }
      }
      return true;
    });
    return validate;
  }

  function resetWarning() {
    document.querySelectorAll('.invalid').forEach(it => {
      it.classList.remove('invalid');
    });
    document.querySelectorAll('.form-must').forEach(it => {
      it.classList.add('hide');
    });
  }

  function warning(index) {
    document.getElementById("q" + index).classList.add("invalid");
    document.getElementById("must" + index).classList.remove("hide");
  }

  init();
})();