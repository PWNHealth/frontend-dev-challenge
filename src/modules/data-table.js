import data from '../../tables.json'

const DataTable = (function () {
  const controller = document.querySelector('[data-module="data-table"]')
  const table = controller.querySelector('[data-target="table"]')

  const buildTableHead = () => {
    const thead = document.createElement('thead')
    const tr = document.createElement('tr')
    const tableHeaders = Object.values(data[0])

    tableHeaders.forEach((header) => {
      const td = document.createElement('td')

      td.textContent = header

      tr.append(td)
    })

    thead.append(tr)

    return thead
  }

  const buildTableBody = () => {
    const tbody = document.createElement('tbody')
    const tableRows = data.map(buildTableBodyRow)

    tableRows.shift()

    tbody.append(...tableRows)

    return tbody
  }

  const buildTableBodyRow = (person) => {
    const tr = document.createElement('tr')
    let columns = []

    for (let key in person) {
      const td = document.createElement('td')
      td.textContent = person[key]

      columns.push(td)
    }

    tr.append(...columns)

    return tr
  }

  const buildTableHTML = () => {
    const tableHead = buildTableHead()
    const tableBody = buildTableBody()

    table.append(tableHead, tableBody)
  }

  const init = async () => {
    buildTableHTML()
  }

  return { init }
})()

export default DataTable
