import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { VueAxios } from './api/request'

createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios)
  .mount('#app')

declare global {
  interface ObjectConstructor {
    typedKeys<T>(o: T): Array<keyof T>;
  }
}
