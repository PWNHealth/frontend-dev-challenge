const Notes = function () {
  let targets = {}

  const init = () => {
    setTargets()

    const { textarea, form } = targets

    textarea.addEventListener('input', setCounter)
    form.addEventListener('submit', handleSubmit)

    setCounter()
  }

  const setTargets = () => {
    const controller = document.querySelector('[data-module="notes"]')

    targets = {
      textarea: controller.querySelector('[data-target="textarea"]'),
      counter: controller.querySelector('[data-target="counter"]'),
      form: controller.querySelector('[data-target="form"]'),
      types: controller.querySelectorAll('[data-target="type"]'),
      messages: controller.querySelector('[data-target="messages"]'),
    }
  }

  const setCounter = () => {
    const { textarea, counter } = targets

    counter.textContent = `${1000 - textarea.value.length} characters remaining`
  }

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
    const { textarea } = targets
    const selectedType = getSelectedType()

    if (selectedType !== 'private') return true

    return textarea.value.match(/(^@[A-Z][a-z])\w+/g)
  }

  const getSelectedType = () => {
    const { types } = targets
    const { value } = Array.from(types).find((type) => type.checked === true)

    return value
  }

  const createNote = () => {
    const { textarea } = targets

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

  const clearForm = () => {
    const { types, textarea } = targets
    const publicInput = Array.from(types).find((type) => type.value === 'public')

    textarea.value = ''
    publicInput.checked = true
  }

  const buildNoteHTML = (note) => {
    const { messages } = targets
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

  return {
    init,
  }
}

export default Notes()
