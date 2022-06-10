import axios from 'axios'
// todo обрабатывать и выводить все ошибки с сервера прямо здесь

const $api = axios.create({
  withCredentials: true,
})

export default $api
