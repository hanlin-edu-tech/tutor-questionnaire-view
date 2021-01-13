let type = "";
const perPage = 25;
const paginationStep = 10;
let totalPages = 0;
let totalItems = 0;
let items = {};

function initValue(itemList, pageType) {
  totalItems = itemList.length;
  totalPages = Math.ceil(totalItems / perPage);
  items = itemList;
  type = pageType;
}

function createPagination(start) {
  const pagination = document.querySelector('.pagination');
  const end = start + 10 > totalPages ? totalPages : start + 10;
  for (start; start < end; start++) {
    const li = document.createElement('li');
    li.classList.add('page-item');
    li.setAttribute('data-index', start + 1);
    li.innerHTML = `<div class="page-link page"
                          data-page="${start + 1}"
                          data-start="${start * perPage + 1}" 
                          data-end="${(start + 1) * perPage > totalItems ? totalItems : (start + 1) * perPage}">${start + 1}</div>`;
    pagination.append(li);
    li.addEventListener('click', (e) => {
      const current = document.querySelector('.bg-warning');
      if (current) current.classList.remove('bg-warning');
      e.target.classList.add('bg-warning');
      updatePageItems(parseInt(e.target.dataset.start));
    });
  }
  if (totalPages > paginationStep) {
    const pages = document.querySelectorAll('.pagination [data-index]');
    const startPage = parseInt(pages[0].dataset.index);
    const endPage = parseInt(pages[pages.length - 1].dataset.index);
    if (startPage > 1) appendPrevButton();
    if (endPage < totalPages) appendNextButton();
  }
  document.querySelectorAll('.pagination .page')[0].click();
}

function updatePageItems(start) {
  document.querySelector('#list').innerHTML = '';
  addPageItems(start);
}

function addPageItems(start) {
  const list = document.querySelector('#list');
  const pageItems = items.slice(start, start + perPage);
  pageItems.forEach(it => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.classList.add('list-group-item-action');
    li.innerHTML = itemTemplate(it, type);
    list.append(li);
  });
}

const itemTemplate = (item, type) => {
  return type === 'template' ? 
    `
        <a href="./template.html?id=${item.id}" class="d-flex">
          <div class="col-md-4 colTitle">${item.name}</div>
          <div class="col-md-4">${item.author}</div>
          <div class="col-md-4">${Intl.DateTimeFormat('zh-TW').format(new Date(item.createDate))}</div>
        </a>
    `:
    `
    <a href="./questionnaire.html?id=${item.id}" class="d-flex">
      <div class="col-md-4 colTitle">${item.name}</div> 
      <div class="col-md-4">${item.email}</div>
      <div class="col-md-4">${Intl.DateTimeFormat('zh-TW', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(item.finished))}</div>
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
    createPagination(firstLinkPage - 11);
  } else {
    const lastLinkPage = parseInt(pageLinks[pageLinks.length - 1].dataset.page);
    pagination.innerHTML = '';
    createPagination(lastLinkPage);
  }
}
