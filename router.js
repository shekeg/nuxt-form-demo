import Vue from 'vue'
import Router from 'vue-router'

const FormPage = () => import('~/pages/FormPage').then(m => m.default || m)
const ContactInfoPage = () => import('~/pages/FormPage/ContactInfoPage').then(m => m.default || m)
const MembershipPage = () => import('~/pages/FormPage/MembershipPage').then(m => m.default || m)
const OverviewPage = () => import('~/pages/FormPage/OverviewPage').then(m => m.default || m)
const SuccessPage = () => import('~/pages/FormPage/SuccessPage').then(m => m.default || m)

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        redirect: '/form/contact-info'
      },
      {
        path: '/form',
        component: FormPage,
        redirect: '/form/contact-info',
        children: [
          {
            path: '/form/contact-info',
            component: ContactInfoPage,
            name: 'contact-info'
          },
          {
            path: '/form/membership',
            component: MembershipPage,
            name: 'membership'
          },
          {
            path: '/form/overview',
            component: OverviewPage,
            name: 'overview'
          },
          {
            path: '/form/success',
            component: SuccessPage,
            name: 'success'
          }
        ]
      }
    ]
  })
}
