const cardListContainer = document.getElementById('cardList');
const perPageSelect = document.getElementById('perPage');
const currentPageInput = document.getElementById('currentPage');
const totalPagesSpan = document.getElementById('totalPages');

let currentPage = 1;
let totalPages = 1;
let perPage = 10;

async function searchCards() {
  const type = document.getElementById('type').value || '';
  const name = document.getElementById('name').value || '';

  let url = '/cards/getByParams?';
  if (type) {
    url += `type=${type}&`;
  }
  if (name) {
    url += `name=${name}&`;
  }
  url += `limit=${perPage}&page=${currentPage}`;

  // Verifica se a URL ainda está com o valor inicial, indicando que nenhum parâmetro foi especificado
  if (type === '' && name === '') {
    url = '/cards/getAll';
  }

  const response = await fetch(url);
  const data = await response.json();

  renderCardList(data.cards);
  updatePagination(data.totalPages);
}

function renderCardList(cards) {
  cardListContainer.innerHTML = '';

  cards.forEach(card => {
    const cardItem = document.createElement('div');
    cardItem.classList.add('cardItem');
    cardItem.innerHTML = `
      <p><strong>Nome:</strong> ${card.name}</p>
      <p><strong>Tipo:</strong> ${card.type}</p>
    `;
    cardListContainer.appendChild(cardItem);
  });
}

function updatePagination(total) {
  totalPages = total;
  totalPagesSpan.textContent = `/${totalPages}`;
  currentPageInput.max = totalPages;
  currentPageInput.value = currentPage;
}

function changePerPage() {
  perPage = parseInt(perPageSelect.value);
  currentPage = 1;
  searchCards();
}

function changePage() {
  currentPage = parseInt(currentPageInput.value);
  searchCards();
}

perPageSelect.addEventListener('change', changePerPage);
currentPageInput.addEventListener('change', changePage);

searchCards();
