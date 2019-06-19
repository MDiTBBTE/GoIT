import template from '../templates/li.hbs';
import EventEmitter from '../services/event-emitter'

export default class View extends EventEmitter{
  constructor() {
    super();

    this.form = document.querySelector('.js-form');
    this.input = document.querySelector('.js-input');
    this.list = document.querySelector('.list');

    this.form.addEventListener('submit', this.handleAdd.bind(this))
  }

  handleAdd(evt) {
    evt.preventDefault();

    const {value} = this.input;

    if( value === '') return;

    this.emit('add', value)
  }

  addNote(note) {
    if (note == 'Try again!') {
      alert("Не вірний формат!");
    } else if (note == 'Such note is existed!') {
      alert("Така закладка вже існує!");
    } else {
      this.creatNote(note);
    }
  }

  creatNote(note) {
    const markup = note.reduce((acc, el) => acc += template(el), "");
    this.list.innerHTML = markup;
 
    const items = this.list.querySelectorAll('.item');
    items.forEach( item => this.appendEventListeners(item));
      
    this.form.reset();
  }

  appendEventListeners(item) {
    const removeBtn = item.querySelector('[data-action="remove"]');

    removeBtn.addEventListener('click', this.handleRemove.bind(this));
  }
  
  handleRemove({target}) {
    const parent = target.closest('.item');

    this.emit('remove', parent.dataset.url);
  }

  removeNote(url) {
    const item = this.list.querySelector(`[data-url="${url}"]`);
    
    this.list.removeChild(item);
  }
}