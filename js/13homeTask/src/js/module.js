import axios from 'axios';
import localStorage from '../services/localStorage'

export default class Model {
  constructor(notes = []) {
    this.notes = notes;

    this.locStor = new localStorage();
  }

  updateLocStor() {
    if (this.locStor.get("notes")) {
      this.notes = this.locStor.get("notes");
    }
  }

  validUrl(url) {
    const regExp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if(!regExp.test(url)) {
      return 'Try again!';
    }else if(this.notes.find( note => note.url === url)) {
      return 'Such note is existed!';
    }else {
      return false;
    }
  }

  addNote(url) {
     return axios
        .get(`https://api.linkpreview.net/?key=5cd71a29bf3526610f7d14eb637f134f14713b1c85043&q=${url}`)
        .then(res =>  {
          const item = {
            image: res.data.image,
            url: res.data.url,
          }
          this.notes.unshift(item);
          this.locStor.set('notes', this.notes);
          return this.notes;
        });
  }

  removeNote(url) {
    this.notes = this.notes.filter( item => item.url !== url);
    this.locStor.set('notes', this.notes)
  }
}