const PhotoGallery = (function () {
  const controller = document.querySelector('[data-module="gallery"]')
  const content = controller.querySelector('[data-target="content"]')

  const fetchImages = async () => {
    try {
      const response = await fetch('https://picsum.photos/v2/list?limit=4')
      const images = await response.json()

      return images
    } catch (e) {
      console.error(e)
    }
  }

  const buildImagesHTML = (photos) => {
    photos.forEach((photo) => {
      const figure = document.createElement('figure')
      const img = buildImgHTML(photo)
      const caption = buildCaption(photo.author)

      figure.classList.add('gallery-photo')
      figure.append(img, caption)

      content.append(figure)
    })
  }

  const buildCaption = (author) => {
    const caption = document.createElement('figcaption', author)

    caption.textContent = `By: ${author}`

    return caption
  }

  const buildImgHTML = ({ download_url, author }) => {
    const imgTag = document.createElement('img')

    imgTag.setAttribute('src', download_url)
    imgTag.setAttribute('alt', author)
    imgTag.setAttribute('title', author)

    return imgTag
  }

  const init = async () => {
    const images = await fetchImages()

    if (!images) return

    buildImagesHTML(images)
  }

  return {
    init,
  }
})()

export default PhotoGallery
