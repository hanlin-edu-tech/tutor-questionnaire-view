(() => {
  function onClickAddQuestionHandler() {
    document.querySelector('#addQuestion').addEventListener('click', () => {
      const elem = document.createElement('a-question');
      let allQuestions = document.querySelectorAll('a-question');
      let lastOne = allQuestions.length-1;
      let lastIndex = lastOne<0 ? 0 : parseInt(allQuestions[lastOne].getAttribute('index'))+1;
      elem.setAttribute('index', lastIndex);
      elem.id = `q${lastIndex}`;
      document.querySelector('.questions').append(elem);
    });
  }

  function onClickAddPhaseHandler() {
    document.querySelector('#addPhase').addEventListener('click', () => {
      let currentQuestionsAll = document.querySelectorAll('a-question');
      let lastQuestion = currentQuestionsAll[currentQuestionsAll.length-1];
      let d_index = lastQuestion.getAttribute('index');

      if(document.querySelector(`#divider-id-${d_index}`)==null){
        let divider = document.createElement('div');
        divider.id = `divider-id-${d_index}`;
        divider.classList.add('divider-class' ,'col-md-12');
        divider.style.marginBottom = "20px";

        let dividerLine = document.createElement('div');
        dividerLine.classList.add('col-md-10');
        dividerLine.style.border = "1px solid red";
        dividerLine.style.height = '1px';
        dividerLine.style.display = 'inline-block';

        let deleteDivider = document.createElement('div');
        deleteDivider.classList.add('btn', 'btn-secondary', 'btn-sm');
        deleteDivider.innerHTML = "刪除階段";
        deleteDivider.style.marginLeft = "10px";
        deleteDivider.style.display = 'inline-block';
        deleteDivider.addEventListener('click', () => {
          deleteDivider.parentNode.remove();
        });

        let callBack = document.createElement('TEXTAREA');
        callBack.classList.add('phaseCallBack', 'form-control', 'col-md-10');
        callBack.placeholder = "階段Call back URL"

        lastQuestion.insertAdjacentElement('afterend',divider);
        divider.insertAdjacentElement('beforeend',callBack);
        divider.insertAdjacentElement('beforeend',dividerLine);
        divider.insertAdjacentElement('beforeend',deleteDivider);
      }
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
      const questionList = [];
      it.shadowRoot.querySelectorAll('.form-row').forEach(formIt => {
        const question = {};
        const options = [];
        formIt.querySelectorAll('[data-field]').forEach(item => {
          const field = item.dataset.field;
          switch (field){
            case 'options':            
              options.push(item.value.trim());
              break;
            case 'required':
              const value = item.checked ? true : false;
              question[item.dataset.field] = value;
              break;
            default:
              question[item.dataset.field] = item.value.trim();
          }
        });
        if(question.type === '問答題') {
          question.options = null;
        }else{
          question.options = options;
        }
        questionList.push(question);
      })
      questions.push({qid: it.getAttribute('index'), qContent: questionList});
    });

    let phase = [];
    let phaseCount = 0;
    document.querySelectorAll('.divider-class').forEach(it => {
      let tempPhase = {}
      tempPhase.phase = phaseCount;
      tempPhase.lastQuestionId = it.id.split('divider-id-')[1];
      tempPhase.callback = it.querySelector('.phaseCallBack').value;
      phaseCount++;
      phase.push(tempPhase);
    });
    template.phase = phase;
    template.questions = questions;
    console.log(JSON.stringify(template))
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
    questions.forEach(it => {
      it.qContent.forEach(q => {
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
    })    
    return errMsg;
  }

  function refreshItem(questionIndex){
    let allDividerClass = document.querySelectorAll(`.divider-class`);
    let length = allDividerClass.length;
    let isRemoved = false;
    for(let i=0;i<allDividerClass.length;i++){
      let tempId = parseInt(allDividerClass[i].id.split('divider-id-')[1]);

      //刪去的項比divider大，則不須-1
      if(questionIndex>tempId) continue;

      let prevId = -1;

      let qList = document.querySelectorAll('a-question');
      let qLength = qList.length;
      if(qLength==0){
        allDividerClass[i].remove();
      }

      for(let qIndex=0;qIndex<qLength;qIndex++){
        let lastLargestId = parseInt(qList[qIndex].id.split('q')[1]);
        if(lastLargestId<=tempId){
          prevId = lastLargestId;
          if(i == length-1 && qLength-1 == qIndex){
            if(lastLargestId<tempId){
              console.log(lastLargestId);
              if(prevId==0 || !!document.querySelector(`#divider-id-${lastLargestId}`)){
                allDividerClass[i].remove();
              }
              allDividerClass[i].id = `divider-id-${lastLargestId}`;
            }
          }
          continue;
        }else if(lastLargestId>tempId){
          if(prevId==-1 || !!document.querySelector(`#divider-id-${prevId}` && qLength!=0)){
            allDividerClass[i].remove();
          }
          allDividerClass[i].id = `divider-id-${prevId}`;
          isRemoved = true;
          break;
        }
      }
      if(isRemoved) break;
    }
  }
  window.refreshItem = refreshItem;

  onClickAddQuestionHandler();
  onClickSubmitHandler();
  onClickAddPhaseHandler();
})();