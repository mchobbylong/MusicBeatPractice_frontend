import axios from 'axios'
import VueAxios from 'vue-axios'

const service = axios.create({
  baseURL: '/api',
  timeout: 20000
})

const installer = {
  install: (app: any) => {
    app.use(VueAxios, service)
  },
  axios: service
}

export { installer as VueAxios, service as axios }
