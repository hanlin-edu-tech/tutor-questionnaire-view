(() => {
  const selectMenuDom = `<select class="form-control" id="inputType" data-field="type">
    <option value="單選題">單選題</option>
    <option value="多選題">多選題</option>
    <option value="問答題">問答題</option>
    <option value="下拉選單">下拉選單</option>
    <option value="api 下拉選單">api 下拉選單</option>
  </select>`;

  const mainDom = `
    <div class="form-group col-md-6">
      <textarea class="form-control" id="topic" type="text" data-field="topic" rows="1" required="required"></textarea>
      <div class="btn btn-secondary btn-sm" style="margin-top:3px" id="delete-question">刪除</div>
    </div>
    <div class="form-group col-md-2">
      ${selectMenuDom}
      <ion-icon class="add-option-question-type" name="add-circle-outline" style="cursor:pointer"></ion-icon>
    </div>
    <div class="form-group col-md-3">
      <div>
        <div style="display:flex">
          <input class="form-control" type="text" data-field="options">
          <ion-icon class="delete-option" name="trash" style="cursor:pointer"></ion-icon>
        </div>
        <ion-icon class="add-option" name="add-circle-outline" style="cursor:pointer"></ion-icon>
      </div>
    </div>
    <div class="form-group col-md-1">
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" value="true" data-field="required"/>是
      </div>
    </div>`;

  const createTemplate = () => {
    return `
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" rel="stylesheet">
    <style type="text/css">
      ion-icon {
          font-size: 25px;
          color:grey;
          height:38px;
      }
      ion-icon[name="add-circle-outline"] {
          display: block;
          margin: 0 40%;
      }
      .form-group.col-md-1 > .form-check-inline {
      margin-left: 25px;
      }
      .duplicateOption {
          border: 2px solid red !important;
      }
    </style>
    <div class="form-row" id=0>
      ${mainDom}
    </div>
    `;
  };
  customElements.define('a-question', class extends HTMLElement {
    connectedCallback() {
      const questionIndex = parseInt(this.getAttribute('index'));
      this.shadowRoot.querySelector('#delete-question').addEventListener('click', (e) => {
        document.querySelector(`#q${questionIndex}`).remove();
        window.refreshItem(questionIndex);
      });
    }

    constructor() {
      super();    
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = createTemplate();

      function onClickDeleteOptionHandler(dom){
        dom.addEventListener('click', (e) => {        
          e.target.parentNode.remove();
        });
      }

      function onClickAddOptionHandler(){
        shadowRoot.querySelectorAll('.add-option').forEach(it => {
          it.removeEventListener('click', onClickFunHandler ,true);
          it.addEventListener('click', onClickFunHandler, true);
        });
      }

      const onClickFunHandler = (e) => {
        const dom = document.createElement('div');
            dom.innerHTML = `<div style="display:flex">
            <input class="form-control" type="text" data-field="options">
            <ion-icon class="delete-option" name="trash" style="cursor:pointer"></ion-icon>
          </div>`;
        const parent = e.target.parentNode;          
        parent.insertBefore(dom, parent.lastElementChild);
        onClickDeleteOptionHandler(dom.querySelector('ion-icon'));
      }

      function onClickAddQuestionTypeHandler(){
        shadowRoot.querySelectorAll('.add-option-question-type').forEach(it => {
          it.addEventListener('click', (e) => {
            let form = document.createElement('div');
            form.classList.add('form-row');
            form.innerHTML = mainDom;
            shadowRoot.appendChild(form);
            let topic = form.querySelector('#topic');
            topic.disabled = true;
            topic.value = '與上同題';

            //刪除答題框的listener
            form.querySelector('#delete-question').addEventListener('click', (e)=>{
              form.remove();
            });

            //增加選項按鈕的listener
            onClickAddOptionHandler();

            //刪除第二個答題框以後的增加選項鈕
            form.querySelector('.add-option-question-type').remove();
          });
        });
      }
      onClickAddOptionHandler();
      onClickAddQuestionTypeHandler();
    }
  });
})();