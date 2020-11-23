import 'regenerator-runtime/runtime'
import { Notes, PhotoGallery } from './modules'

document.addEventListener('DOMContentLoaded', function () {
  Notes.init()
  PhotoGallery.init()
})
