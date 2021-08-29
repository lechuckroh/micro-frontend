import faker from 'faker';

const products = [];

for (let i = 0; i < 5; i++) {
  products.push(faker.commerce.productName());
}

const html = '<ul>' +
  products.map(product => `<li>${product}</li>`).join('') +
  '</ul>';
document.querySelector('#dev-products').innerHTML = html;
