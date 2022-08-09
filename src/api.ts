import axios, { AxiosError } from 'axios'
import Swal from 'sweetalert2'

const $api = axios.create({
  withCredentials: true,
  baseURL: '/api',
})

$api.interceptors.request.use(config => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem('access')}`
  config.headers!['X-CSRFToken'] = getCookie('csrftoken')

  return config
})

$api.interceptors.response.use(
  config => config,
  async (error: AxiosError) => {
    const originalRequest = error.config

    if (
      // @ts-ignore
      error.response?.data.detail ===
        'Ошибка авторизации. Время жизни токена истекло!' &&
      // @ts-ignore
      !error._isRetry
    ) {
      // @ts-ignore
      originalRequest._isRetry = true

      try {
        const resp = await axios.post(
          '/api/auth/refresh-token/',
          {
            token: localStorage.getItem('refresh'),
          },
          {
            headers: {
              'X-CSRFToken': getCookie('csrftoken'),
            },
          }
        )

        localStorage.setItem('access', resp.data['access_token'])
        localStorage.setItem('refresh', resp.data['refresh_token'])

        return $api.request(originalRequest)
      } catch (e) {
        await Swal.fire({
          icon: 'error',
          title: 'Уупс...',
          // @ts-ignore
          text: `Вы не авторизованны!`,
        })

        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
      }
    }

    // @ts-ignore
    if (error.response?.data.serialize_error) {
      let html = ''

      for (const [name, value] of Object.entries(
        // @ts-ignore
        error.response?.data.serialize_error
      )) {
        html += `<b>${name}</b> - ${value}<br>`
      }

      await Swal.fire({
        icon: 'error',
        title: 'Уупс...',
        // @ts-ignore
        html,
      })
    } else {
      await Swal.fire({
        icon: 'error',
        title: 'Уупс...',
        // @ts-ignore
        text: `Что-то пошло не так: ${error.response?.data.detail}`,
      })
    }
    throw error
  }
)

function getCookie(name: string) {
  var cookieValue = null
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';')
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim()
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue!
}

export default $api
