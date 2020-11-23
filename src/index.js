import 'regenerator-runtime/runtime'
import { Notes, PhotoGallery, DataTable } from './modules'
import StaticSession from './session'

document.addEventListener('DOMContentLoaded', function () {
  window.StaticSession = StaticSession

  StaticSession.set('currentUser', { name: 'Jane Doe', profession: 'Physician' }) // Creates dummy current user

  const modules = [Notes, PhotoGallery, DataTable]

  modules.forEach((module) => module.init())
})
