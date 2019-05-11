const interceptor = instance => {
  instance.interceptors.request.use(
    config => {
      const token = window.localStorage.getItem('access_token')

      if (token !== null && config.url.indexOf('login') === -1) {
        config.headers['access-token'] = token
      }

      return config
    },
    error => Promise.reject(error),
  )

  instance.interceptors.response.use(
    response => {
      // 过期
      if (response.data.error_code === 401) {
        window.localStorage.removeItem('access_token')
        if (window.location.pathname !== '/') {
          window.location.href = '/'
        }
      }

      return response.data
    },
    error => Promise.reject(error),
  )

  return instance
}

export default interceptor
