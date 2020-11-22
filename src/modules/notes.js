const Notes = (function () {
  const controller = document.querySelector('[data-module="notes"]')
  const textarea = controller.querySelector('[data-target="textarea"]')
  const counter = controller.querySelector('[data-target="counter"]')
  const form = controller.querySelector('[data-target="form"]')

  const handleChange = () => {
    setCounter()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const setCounter = () => {
    const { length: currentTextareaLength } = textarea.value

    counter.textContent = `${1000 - currentTextareaLength} characters remaining`
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
