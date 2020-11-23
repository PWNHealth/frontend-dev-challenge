const Notes = (function () {
  const controller = document.querySelector('[data-module="notes"]')
  const textarea = controller.querySelector('[data-target="textarea"]')
  const counter = controller.querySelector('[data-target="counter"]')
  const form = controller.querySelector('[data-target="form"]')
  const types = controller.querySelectorAll('[data-target="type"]')
  const messages = controller.querySelector('[data-target="messages"]')

  const handleSubmit = (event) => {
    event.preventDefault()

    const isValid = isValidatesPrivateNote()

    if (!isValid) {
      alert('You have to add an username when a note is private')

      return false
    }

    const note = createNote()

    buildNoteHTML(note)
    clearForm()
  }

  const isValidatesPrivateNote = () => {
    const selectedType = getSelectedType()

    if (selectedType !== 'private') return true

    return textarea.value.match(/(^@[A-Z][a-z])\w+/g)
  }

  const getSelectedType = () => {
    const { value } = Array.from(types).find((type) => type.checked === true)

    return value
  }

  const clearForm = () => {
    const publicInput = Array.from(types).find((type) => type.value === 'public')

    textarea.value = ''
    publicInput.checked = true
  }

  const createNote = () => {
    return {
      text: textarea.value,
      type: getSelectedType(),
      author: {
        name: 'Jane Doe',
        profession: 'physician',
      },
      createdAt: new Date().toLocaleString(),
    }
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
      content.prepend(tag)
    }

    header.append(content)

    return header
  }

  const buildContentHTML = (note) => {
    const content = document.createElement('p')
    const usernames = note.text.match(/(@[A-Z][a-z])\w+/g)
    let formattedText = note.text

    if (usernames) {
      usernames.forEach((username) => {
        const mark = document.createElement('mark')

        mark.textContent = username

        formattedText = formattedText.replace(/(@[A-Z][a-z]\w+)(?!(.(?!<mark))*<\/mark>)/, mark.outerHTML)
      })
    }

    content.classList.add('notes-item-content')
    content.innerHTML = formattedText

    return content
  }

  const setCounter = () => {
    const { length: currentTextareaLength } = textarea.value

    counter.textContent = `${1000 - currentTextareaLength} characters remaining`
  }

  const init = () => {
    setCounter()

    textarea.addEventListener('input', setCounter)
    form.addEventListener('submit', handleSubmit)
  }

  return {
    init,
  }
})()

export default Notes
