import { mount as mountCart } from 'cartApp/CartShow';
import { mount as mountProducts } from 'productsApp/ProductsIndex';

console.log('Container!');

mountCart(document.querySelector('#cart-holder'));
mountProducts(document.querySelector('#products-holder'));
