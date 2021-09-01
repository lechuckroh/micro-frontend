import faker from 'faker';

const mount = (el) => {
  const html = `<div>You have ${faker.random.number()} items in your cart</div`;
  el.innerHTML = html;
};

if (process.env.NODE_ENV === 'development') {
  const el = document.querySelector('#dev-cart');
  if (el) {
    mount(el);
  }
}

export { mount };
