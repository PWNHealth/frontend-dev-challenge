import { screen } from '@testing-library/dom'

describe('initial setup', () => {
  it('renders correctly', () => {
    document.body.innerHTML = '<h1>Hello World</h1>'

    const helloWorld = screen.getByText(/Hello World/)

    expect(helloWorld).toBeInTheDocument()
  })
})
