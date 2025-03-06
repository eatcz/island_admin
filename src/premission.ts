import router from './router'
import { useUserStore } from '@/store/modules/user'
import pinia from './store'
const userStore = useUserStore(pinia)
const whileList = ['/login']

router.beforeEach((to, _from, next) => {

  const TOKEN = userStore.token
  if (to.path == '/login') {
    if (TOKEN) {
      next({
        path: '/',
        replace: true,
      })
    } else {
      next()
    }
  } else {
    if (whileList.indexOf(to.path) == -1) {
      if (TOKEN) {
        next()
      } else {
        next({
          path: '/login',
          replace: true,
        })
      }
    } else {
      next()
    }
  }
})