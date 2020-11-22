const Notes = (function () {
  const controller = document.querySelector('[data-module="notes"]')
  const textarea = controller.querySelector('[data-target="textarea"]')
  const counter = controller.querySelector('[data-target="counter"]')
  const form = controller.querySelector('[data-target="form"]')
  const types = controller.querySelectorAll('[data-target="type"]')
  const messages = controller.querySelector('[data-target="messages"]')

  const handleChange = () => {
    setCounter()
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const now = new Date()

    const note = {
      text: textarea.value,
      type: getSelectedType(),
      author: {
        name: 'Jane Doe',
        profession: 'physician'
      },
      createdAt: now.toLocaleString(),
    }

    buildNoteHTML(note)
  }

  const getSelectedType = () => {
    const { value } = Array.from(types).find((type) => type.checked === true, types)

    return value
  }

  const setCounter = () => {
    const { length: currentTextareaLength } = textarea.value

    counter.textContent = `${1000 - currentTextareaLength} characters remaining`
  }

  const buildNoteHTML = (note) => {
    const container = document.createElement('article')
    const header = buildHeaderHTML(note)
    const content = buildContentHTML(note)

    container.classList.add('notes-item')
    container.append(header, content)

    messages.append(container)
  }

  const buildHeaderHTML = (note) => {
    const header = document.createElement('header')
    const content = document.createElement('small')
    const tag = document.createElement('span')

    header.classList.add('notes-item-header')
    tag.classList.add('tag')

    content.textContent = `Created by the ${note.author.profession} ${note.author.name} on ${note.createdAt}`

    if (note.type === 'private') {
      tag.textContent = 'Private'
      content.prepend(tag, '')
    }

    header.append(content)

    return header
  }

  const buildContentHTML = (note) => {
    const content = document.createElement('p')

    content.classList.add('notes-item-content')
    content.textContent = note.text

    return content
  }

  const init = () => {
    setCounter()

    textarea.addEventListener('input', handleChange)
    form.addEventListener('submit', handleSubmit)
  }

  return {
    init,
  }
})()

export default Notes
