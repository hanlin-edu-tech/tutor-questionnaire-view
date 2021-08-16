var type = "";
var perPage = 25;
var paginationStep = 10;
var totalPages = 0;
var totalItems = 0;
var items = {};

function initValue(itemList, pageType) {
  if(pageType!== 'template'){
    itemList = itemList.reverse();
  }  
  totalItems = itemList.length;
  totalPages = Math.ceil(totalItems / perPage);
  items = itemList;
  type = pageType;
}

function createPagination(startPage = 0) {
  const pagination = document.querySelector('.pagination');
  const endPage = startPage + 10 > totalPages ? totalPages : startPage + 10;
  for (startPage; startPage < endPage; startPage++) {
    const li = document.createElement('li');
    li.classList.add('page-item');
    li.setAttribute('data-index', startPage);
    li.innerHTML = `<div class="page-link page"
                          data-page="${startPage}"
                          data-start="${startPage * perPage + 1}" 
                          data-end="${startPage * perPage > totalItems ? totalItems : startPage * perPage}">${startPage + 1}</div>`;
    pagination.append(li);
    li.addEventListener('click', (e) => {
      const current = document.querySelector('.bg-warning');
      if (current) current.classList.remove('bg-warning');
      e.target.classList.add('bg-warning');
      updatePageItems(parseInt(e.target.dataset.page));
    });
  }
  if (totalPages > paginationStep) {
    const pages = document.querySelectorAll('.pagination [data-index]');
    const startPage = parseInt(pages[0].dataset.index);
    const endPage = parseInt(pages[pages.length - 1].dataset.index);
    if (startPage > 1) appendPrevButton();
    if (endPage < totalPages - 1) appendNextButton();
  }
  document.querySelectorAll('.pagination .page')[0].click();
}

function updatePageItems(startPage) {
  document.querySelector('#list').innerHTML = '';
  const startItem = startPage * perPage;
  addPageItems(startItem);
}

function addPageItems(startItem = 0) {
  const list = document.querySelector('#list');
  const pageItems = items.slice(startItem, startItem + perPage);
  pageItems.forEach(it => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.classList.add('list-group-item-action');
    if(it.tags==null || it.tags.length==0){
      it.tags = [""];
    }
    try {
      li.innerHTML = itemTemplate(it, type);
      list.append(li);
    }catch(error){
      console.log(error);
      li.innerHTML = itemTemplateWithOutTime(it, type);
      list.append(li);
    }
  });
}

const itemTemplate = (item, type) => {
  return type === 'template' ? 
    `
        <a href="./template.html?id=${item.id}" class="d-flex">
          <div class="col-md-3 colTitle">${item.name}</div>
          <div class="col-md-3">${item.author}</div>
          <div class="col-md-3">${Intl.DateTimeFormat('zh-TW', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(item.createDate))}</div>
          <div class="col-md-3">${item.tags.join(',')}</div>
        </a>
    `:
    `
    <a href="./questionnaire.html?id=${item.id}" class="d-flex">
      <div class="col-md-4 colTitle">${item.template.name}</div> 
      <div class="col-md-4">${item.email}</div>
      <div class="col-md-4">${Intl.DateTimeFormat('zh-TW', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(item.finished))}</div>
    </a>`;
};

const itemTemplateWithOutTime = (item, type) => {
  return type === 'template' ? 
    `
        <a href="./template.html?id=${item.id}" class="d-flex">
          <div class="col-md-3 colTitle">${item.name}</div>
          <div class="col-md-3">${item.author}</div>
          <div class="col-md-3">不明</div>
          <div class="col-md-3">${item.tags.join(',')}</div>
        </a>
    `:
    `
    <a href="./questionnaire.html?id=${item.id}" class="d-flex">
      <div class="col-md-4 colTitle">${item.template.name}</div> 
      <div class="col-md-4">${item.email}</div>
      <div class="col-md-4">不明</div>
    </a>`;
};

function appendPrevButton() {
  const pagination = document.querySelector('.pagination');
  const li = document.createElement('li');
  li.classList.add('page-item');
  li.innerHTML = `<div class="page-link"><span aria-hidden='true'>&laquo; 前十頁</span></div>`;
  pagination.insertBefore(li, pagination.firstChild);
  li.addEventListener('click', updatePagination.bind(updatePagination, 'prev'));
}

function appendNextButton() {
  const pagination = document.querySelector('.pagination');
  const li = document.createElement('li');
  li.classList.add('page-item');
  li.innerHTML = `<div class="page-link"><span aria-hidden='true'> 後十頁 &raquo;</span></div>`;
  pagination.append(li);
  li.addEventListener('click', updatePagination.bind(updatePagination, 'next'));
}

function updatePagination(type) {
  const pageLinks = document.querySelectorAll('.pagination .page');
  const pagination = document.querySelector('.pagination');
  if (type === 'prev') {
    const firstLinkPage = parseInt(pageLinks[0].dataset.page);
    pagination.innerHTML = '';
    createPagination(firstLinkPage - 10);
  } else {
    const lastLinkPage = parseInt(pageLinks[pageLinks.length - 1].dataset.page);
    pagination.innerHTML = '';
    createPagination(lastLinkPage + 1);
  }
}
