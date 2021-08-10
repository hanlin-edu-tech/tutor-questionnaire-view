(() => {
    const mainDom = `
      <div class="form-group col-md-3">
        <div>
          <div style="display:flex">
            <input class="form-control" type="text" data-field="options">
            <ion-icon class="delete-option" name="trash" style="cursor:pointer"></ion-icon>
          </div>
          <ion-icon class="add-option" name="add-circle-outline" style="cursor:pointer"></ion-icon>
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
      </style>
      <div class="form-row" id=0>
        ${mainDom}
      </div>
      `;
    };
    customElements.define('a-tag', class extends HTMLElement {
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
  
        onClickAddOptionHandler();
      }
    });
  })();