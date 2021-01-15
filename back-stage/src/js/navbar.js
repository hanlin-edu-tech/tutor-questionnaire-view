(() => {
  const navbarTemplate = `
  <style>
  nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	.selected {
		position: relative;
		display: inline-block;
	}

	.selected::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}

	a.disabled {
		color: gray;
		pointer-events: none;
	}
  </style>
  <div class="header">
    <nav>
      <ul>
        <li><a href="./create.html" class="create">新增問卷</a></li>
        <li><a href="./list.html?type=template" class="template">樣板列表</a></li>
        <li><a href="./list.html?type=questionnaire" class="questionnaire">問卷列表</a></li>
      </ul>
    </nav>
</div>
  `;
  customElements.define('nav-bar', class extends HTMLElement{
    connectedCallback() {
      const current = this.getAttribute('current');
      this.shadowRoot.querySelector(`.${current}`).classList.add('selected');
    }
    constructor(){
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = navbarTemplate;
    }
  });
})();