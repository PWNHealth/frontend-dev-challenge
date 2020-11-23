import { screen, fireEvent } from '@testing-library/dom'
import StaticSession from '../session'

import Notes from './notes'

const html = `
  <div class="segment-content notes" data-module="notes">
    <div class="notes-group" data-target="messages" data-testid="messages"></div>
    <form class="notes-form stackGroup" data-target="form" data-testid="form">
      <div class="radio-group">
        <div class="radio">
          <input id="note_type_private" type="radio" name="note_type" value="private" data-target="type">
          <label for="note_type_private">Private</label>
        </div>
        <div class="radio">
          <input id="note_type_public" type="radio" name="note_type" value="public" data-target="type" checked>
          <label for="note_type_public">Public</label>
        </div>
      </div>

      <div class="stackGroup" style="--stack-group-gap: .65rem;">
        <textarea class="textarea is-fluid"
          data-target="textarea"
          placeholder="Insert your note"
          maxlength="1000"
          required
        ></textarea>
        <small data-target="counter" data-testid="counter"></small>
      </div>

      <button class="button" data-target="submit">Add Note</button>
    </form>
  </div>
`

describe('Notes', () => {
  beforeEach(() => {
    document.body.innerHTML = html

    window.StaticSession = StaticSession

    StaticSession.set('currentUser', { name: 'Jane Doe', profession: 'physician' })

    Notes.init()
  })

  afterEach(() => {
    StaticSession.set('notes', [])
  })

  describe('#init', () => {
    it('renders correctly', () => {
      const counter = screen.getByText(/1000 characters remaining/)
      const publicInput = screen.getByDisplayValue(/public/)

      expect(counter).toBeInTheDocument()
      expect(publicInput).toBeChecked()
    })
  })

  describe('#setCounter', () => {
    it('shows remaining characters', () => {
      const counter = screen.getByTestId('counter')
      const textarea = screen.getByPlaceholderText(/Insert your note/)

      fireEvent.input(textarea, { target: { value: 'Test note' } })

      expect(counter).toHaveTextContent(/991 characters remaining/)

      fireEvent.input(textarea, { target: { value: '' } })

      expect(counter).toHaveTextContent(/1000 characters remaining/)
    })
  })

  describe('#handleSubmit', () => {
    it('creates a public note', () => {
      const textarea = screen.getByPlaceholderText(/Insert your note/)
      const form = screen.getByTestId('form')

      fireEvent.input(textarea, { target: { value: 'Test note' } })
      fireEvent.submit(form)

      const note = screen.getByText('Test note')
      const headerText = screen.getByText(/Created by the physician Jane Doe on/)

      expect(textarea).toHaveValue('')
      expect(note).toBeInTheDocument()
      expect(headerText).toBeInTheDocument()
    })

    it('returns an error when private does not have username', () => {
      const textarea = screen.getByPlaceholderText(/Insert your note/)
      const form = screen.getByTestId('form')
      const privateInput = screen.getByDisplayValue(/private/)

      window.alert = jest.fn()

      fireEvent.change(privateInput, { target: { checked: true } })
      fireEvent.input(textarea, { target: { value: 'Test note' } })
      fireEvent.submit(form)

      expect(window.alert).toHaveBeenCalledWith('You have to add an username when a note is private')

      expect(textarea).toHaveValue('Test note')
    })

    it('creates a private note', () => {
      const textarea = screen.getByPlaceholderText(/Insert your note/)
      const form = screen.getByTestId('form')
      const privateInput = screen.getByDisplayValue(/private/)

      fireEvent.change(privateInput, { target: { checked: true } })
      fireEvent.input(textarea, { target: { value: '@JohnDoe Test note' } })
      fireEvent.submit(form)

      const note = screen.getByText(/Test note/)
      const headerText = screen.getByText(/Created by the physician Jane Doe on/)

      expect(textarea).toHaveValue('')
      expect(headerText.innerHTML).toMatch(/<span class="tag">Private<\/span>Created by the physician Jane Doe/)
      expect(note.innerHTML).toMatch(/<mark>@JohnDoe<\/mark> Test note/)
    })
  })

  describe('#loadNotes', () => {
    beforeEach(() => {
      document.body.innerHTML = html

      window.StaticSession = StaticSession

      StaticSession.set('currentUser', { name: 'Jane Doe', profession: 'physician' })

      StaticSession.set('notes', [
        {
          text: '@JohnDoe this is a public message',
          type: 'public',
          author: { name: 'Foo', profession: 'Bar' },
          createdAt: '11/23/2020, 6:06:47 PM',
        },
        {
          text: '@JaneDoe this is a private message',
          type: 'private',
          author: { name: 'Fizz', profession: 'Buzz' },
          createdAt: '11/23/2020, 6:07:49 PM',
        },
      ])

      Notes.init()
    })

    it('shows persisted notes', () => {
      const note1 = screen.getByText(/this is a public message/)
      const note2 = screen.getByText(/this is a private message/)

      expect(note1).toBeInTheDocument()
      expect(note2).toBeInTheDocument()
    })
  })
})
