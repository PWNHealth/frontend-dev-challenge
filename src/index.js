import 'regenerator-runtime/runtime'
import { Notes, PhotoGallery, DataTable } from './modules'

document.addEventListener('DOMContentLoaded', function () {
  Notes.init()
  PhotoGallery.init()
  DataTable.init()
})
