import './css/styles.css';
import View from './js/view';
import Module from './js/module';
import Controller from './js/controller';

const view = new View();
const module = new Module();

new Controller(module, view);