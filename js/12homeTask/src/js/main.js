'use strict';

const list = document.querySelector('.list');
const form = document.querySelector('.js-form'); 
const input = document.querySelector('.js-input');
const tittle = document.querySelector('.hide');

const source = document.querySelector('.laptops-tpl').innerHTML.trim();
const template = Handlebars.compile(source);

let urls = [];

function allUrls(mas) {
  const markup = mas.reduce((acc, el) => (acc += template(el)), '');
  list.innerHTML =  markup;
}//get all urls in one massive and build an html

function checkValidUrl(url) {
  const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
  const result = pattern.test(url);
  const isWritted = urls.some( el => el.url === url);
  if(result && !isWritted) {
    
    fetch(`https://api.linkpreview.net/?key=5cd71a29bf3526610f7d14eb637f134f14713b1c85043&q=${url}`)
    .then(resp => {
      if(resp.ok) return resp.json();

      throw new Error('Error' + resp.statusText);
    })
    .then(data => 
      { urls.unshift({url: data.url, img: data.image}),
      allUrls(urls);
      set();
    })
    .catch(err => console.log('Error: ' + err));

  }else if (isWritted) {
    return alert(`Such an url is existed!`);
  }else{
    return alert(`It's unvalid url!`);
  }
}

function set() {
  localStorage.setItem("fetchTags", JSON.stringify(urls));
}//download from the workspace to localstorage

function get() {
  let data = localStorage.getItem("fetchTags");
  const mas = JSON.parse(data);
  if(mas !== null) {
    return mas;
  };
}//take elements from the localstorage

function updateLocMas() {
  if(localStorage.getItem('fetchTags')) {
    const mas = JSON.parse(localStorage.getItem('fetchTags'));
    urls = mas;
  }
}

function handleDel({target}) {
  if(target.nodeName === 'BUTTON') {
    console.log(urls)
      urls = urls.filter(el => { return target.previousElementSibling.innerHTML != el.url});
      allUrls(urls);
      set();
  }
}


form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(input.value)
  checkValidUrl(input.value);
  allUrls(urls);
  set();
});

list.addEventListener('click', handleDel);

updateLocMas()
allUrls(get());
console.log(urls)