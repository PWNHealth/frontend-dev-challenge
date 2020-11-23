const Session = function () {
  const set = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const get = (key) => {
    return JSON.parse(localStorage.getItem(key))
  }

  return {
    set,
    get,
  }
}

export default Session()
