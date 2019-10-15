import Vue from 'vue'
import App from 'app.vue'

document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(document.createElement('article_form'));
  const app = new Vue(App).$mount('article_form');
});