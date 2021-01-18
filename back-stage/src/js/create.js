(() => {
  function onClickAddQuestionHandler() {
    document.querySelector('#addQuestion').addEventListener('click', () => {
      const elem = document.createElement('a-question');
      const index = document.querySelectorAll('a-question').length;
      elem.setAttribute('index', index);
      elem.id = `q${index}`;
      document.querySelector('.questions').append(elem);
    });
  }

  function onClickSubmitHandler() {
    document.querySelector('#submit').addEventListener('click', () => {
      const template = getFormInputValues();
      console.log(template);
      const isValid = validate(template);
      if(isValid){
        window.eHanlin.dataprovider.questionnaire.submitTemplate(template);        
      }    
    });
  }

  function getFormInputValues() {
    const template = {};
    document.querySelectorAll('[data-field]').forEach(it => {
      template[it.dataset.field] = it.value.trim();
    });
    const questions = [];
    document.querySelectorAll('a-question').forEach(it => {
      const question = {};
      const options = [];
      it.shadowRoot.querySelectorAll('[data-field]').forEach(it => {
        const field = it.dataset.field;
        switch (field){
          case 'options':            
            options.push(it.value.trim());
            break;
          case 'required':
            const value = it.checked ? true : false;
            question[it.dataset.field] = value;
            break;
          default:
            question[it.dataset.field] = it.value.trim();
        }
      });
      if(question.type === '問答題') {
        question.options = null;
      }else{
        question.options = options;
      }
      questions.push(question);
    });
    template.questions = questions;
    return template;
  }

  function validate(template) {
    let errMsg = '';
    const {name, description, finishMsg} = template;
    name ? toggleInvalid('name', true) : toggleInvalid('name', false);
    description ? toggleInvalid('description', true) : toggleInvalid('description', false);
    finishMsg ? toggleInvalid('finishMsg', true) : toggleInvalid('finishMsg', false);
    errMsg += validateQuestions(template.questions);
    if (errMsg) {
      toggleErrorMessage(errMsg, true);
    }else{
      toggleErrorMessage(errMsg, false);
    }
    return !errMsg;
  }

  function toggleInvalid(fieldName, valid){
    if(valid){
      document.querySelector(`[data-field="${fieldName}"]`).classList.remove('is-invalid');  
    }else{
      document.querySelector(`[data-field="${fieldName}"]`).classList.add('is-invalid');
    }
    
  }

  function toggleErrorMessage(errMsg, show) {
    document.querySelector('#errMsg').innerText = '';
    if(show) document.querySelector('#errMsg').innerText = errMsg;
  }

  function validateQuestions(questions) {
    let errMsg = '';
    if (questions.length < 1) {
      errMsg += '至少要有一題問卷題目 \n';
    }
    questions.forEach(q => {
      if (!q.topic && errMsg.indexOf('題目不得為空 \n') === -1) {
        errMsg += '題目不得為空 \n';
      }
      if (q.type === '單選題' && q.options.length <= 1) {
        if (errMsg.indexOf('單選題至少要有一個以上的選項 \n') === -1) {
          errMsg += '單選題至少要有一個以上的選項 \n';
        }
      }
      if (q.type === '多選題' && q.options.length <= 2) {
        if (errMsg.indexOf('多選題至少要有二個以上的選項 \n') === -1) {
          errMsg += '多選題至少要有二個以上的選項 \n';
        }
      }
      if (q.options) {
        q.options.forEach(o => {
          if (!o) {
            if (errMsg.indexOf('選項不得為空 \n') === -1) {
              errMsg += '選項不得為空 \n';
            }
          }
        });
        const duplicate = q.options.filter((item, index) => q.options.indexOf(item) !== index);
        if(duplicate.length > 0 && errMsg.indexOf('選項不得為空 \n') === -1){
          errMsg += '選項不得重複 \n';
        }
      }
    });
    return errMsg;
  }

  onClickAddQuestionHandler();
  onClickSubmitHandler();
})();