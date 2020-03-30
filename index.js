let fruits = [
  {id: 1, title: 'Apples', price: 20, img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348'},
  {id: 2, title: 'Oranges', price: 30, img: 'https://fashion-stil.ru/wp-content/uploads/2019/04/apelsin-ispaniya-kg-92383155888981_small6.jpg'},
  {id: 3, title: 'Mango', price: 40, img: 'https://itsfresh.ru/upload/iblock/178/178d8253202ef1c7af13bdbd67ce65cd.jpg'},
];

const toHTML = fruit => `
  <div class="col">
    <div class="card">
      <img style="height: 300px" src="${fruit.img}" class="card-img-top" alt="${fruit.title}">
      <div class="card-body">
        <h5 class="card-title">${fruit.title}</h5>
        <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">What's the price?</a>
        <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Delete</a>
      </div>
    </div>
  </div>
`;

function render() {
  document.getElementById('fruits').innerHTML = fruits.map(toHTML).join('');
}

render();

const priceModal = $.modal({
  title: "Product's price",
  closable: true,
  width: '400px',
  footerButtons: [
    {text: 'Close', type: 'primary', handler() {
      priceModal.close();
    }}
  ]
});

document.addEventListener('click', event => {
  event.preventDefault();
  const btnType = event.target.dataset.btn;
  const id = +event.target.dataset.id;
  const fruit = fruits.find(f => f.id === id);

  if (btnType === 'price') {
    priceModal.setContent(`
      <p>The price for ${fruit.title} is: <strong>$${fruit.price}</strong></p>
    `);
    priceModal.open();
  } else if (btnType === 'remove') {
    $.confirm({
      title: 'Are you sure?',
      content: `<p>You are deleting: <strong>${fruit.title}</strong></p>`
    }).then(() => {
      fruits = fruits.filter(f => f.id !== id);
      render();
    }).catch(() => {
      console.log('cancel');
    })
  }
});