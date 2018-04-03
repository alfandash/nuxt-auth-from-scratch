import cookie from 'cookie'
import {setAuthToken, resetAuthToken} from '~/utils/auth'

export const state = () => ({
  sidebar: false
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  }
}

export const actions = {
  nuxtServerInit ({dispatch}, context) {
    return new Promise((resolve, reject) => {
      const cookies = cookie.parse(context.req.headers.cookie || '')
      if (cookies.hasOwnProperty('x-access-token')) {
        setAuthToken(cookies['x-access-token'])
        dispatch('auth/fetch')
          .then(result => {
            console.log('x-access-token is ', cookies['x-access-token'])
            resolve(true)
          })
          .catch(error => {
            console.log('Provided token is invalid:', error)
            resetAuthToken()
            resolve(false)
          })
      } else {
        console.log('x-access-token doesnt exist')
        resetAuthToken()
        resolve(false)
      }
    })
  }
}
