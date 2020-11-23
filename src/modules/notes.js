const Notes = function () {
  let targets = {}

  const init = () => {
    setTargets()
    setCounter()
    loadNotes()

    const { textarea, form } = targets

    textarea.addEventListener('input', setCounter)
    form.addEventListener('submit', handleSubmit)
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

  const loadNotes = () => {
    const notes = StaticSession.get('notes')

    if (!notes) return

    notes.forEach(buildNoteHTML)
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
    persistNote(note)
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
    const { name, profession } = StaticSession.get('currentUser')

    return {
      text: textarea.value,
      type: getSelectedType(),
      author: {
        name,
        profession,
      },
      createdAt: new Date().toLocaleString(),
    }
  }

  const persistNote = (note) => {
    const notes = StaticSession.get('notes') || []

    StaticSession.set('notes', [...notes, { ...note }])
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
