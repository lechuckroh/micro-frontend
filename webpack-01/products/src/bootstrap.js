import faker from 'faker';

function mount(el) {
  const products = [];

  for (let i = 0; i < 5; i++) {
    products.push(faker.commerce.productName());
  }

  const html = '<ul>' +
    products.map(product => `<li>${product}</li>`).join('') +
    '</ul>';
  el.innerHTML = html;
}

if (process.env.NODE_ENV === 'development') {
  const el = document.querySelector('#dev-products');
  if (el) {
    mount(el);
  }
}

export { mount };
