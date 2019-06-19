export default class Controller {
  constructor(module, view) {
    this.module = module;
    this.view = view;

    view.on('add', this.addItem.bind(this));
    view.on('remove', this.removeItem.bind(this));

    this.module.updateLocStor();
    this.view.creatNote(this.module.notes)
  }

  addItem(url) {
    console.log(this.module.notes)
    if(this.module.validUrl(url)) {
      
      this.view.addNote(this.module.validUrl(url));
      console.log(this.module.validUrl(url));
    }else {
      this.module.addNote(url).then( notes => this.view.creatNote(notes));
      console.log('success')
    }
  }

  removeItem(url) {
    this.module.removeNote(url);
    this.view.removeNote(url);
  }
}