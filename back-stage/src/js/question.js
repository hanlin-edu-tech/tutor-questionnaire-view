(() => {
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
    <div class="form-row">
  <div class="form-group col-md-6">
    <textarea class="form-control" id="topic" type="text" data-field="topic" rows="1" required="required"></textarea>
    <div class="btn btn-secondary btn-sm" style="margin-top:3px" id="delete-question">刪除</div>
  </div>
  <div class="form-group col-md-2">
    <select class="form-control" id="inputType" data-field="type">
      <option value="單選題">單選題</option>
      <option value="多選題">多選題</option>
      <option value="問答題">問答題</option>
      <option value="下拉選單">下拉選單</option>
    </select>
  </div>
  <div class="form-group col-md-3">
    <div>
      <div style="display:flex">
        <input class="form-control" type="text" data-field="options">
        <ion-icon class="delete-option" name="trash" style="cursor:pointer">                                        </ion-icon>
      </div>
      <ion-icon class="add-option" name="add-circle-outline" style="cursor:pointer"></ion-icon>
    </div>
  </div>
  <div class="form-group col-md-1">
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" value="true" data-field="required"/>是
    </div>
  </div>
</div>
    `;
  };
  customElements.define('a-question', class extends HTMLElement {
    connectedCallback() {
      const questionIndex = this.getAttribute('index');
      this.shadowRoot.querySelector('#delete-question').addEventListener('click', () => {
        document.querySelector(`#q${questionIndex}`).remove();
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
          it.addEventListener('click', (e) => {
            const dom = document.createElement('div');
            dom.innerHTML = `<div style="display:flex">
            <input class="form-control" type="text" data-field="options">
            <ion-icon class="delete-option" name="trash" style="cursor:pointer"></ion-icon>
          </div>`;
            const parent = e.target.parentNode;          
            parent.insertBefore(dom, parent.lastElementChild);
            onClickDeleteOptionHandler(dom.querySelector('ion-icon'));
          });
        });
      }
      onClickAddOptionHandler();
    }
  });
})();