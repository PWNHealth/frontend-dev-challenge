import { screen } from '@testing-library/dom'

import Notes from './notes'

const html = `
  <div class="segment-content notes" data-module="notes">
    <div class="notes-group" data-target="messages"></div>
    <form class="notes-form stackGroup" data-target="form">
      <div class="radio-group">
        <div class="radio">
          <input id="note_type_private" type="radio" name="note_type" value="private" data-target="type">
          <label for="note_type_private">Private</label>
        </div>
        <div class="radio" >
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
        <small data-target="counter"></small>
      </div>

      <button class="button" data-target="submit">Add Note</button>
    </form>
  </div>
`

describe('Notes', () => {
  beforeEach(() => {
    document.body.innerHTML = html

    Notes.init()
  })

  describe('#init', () => {
    it('renders correctly', () => {
      const counter = screen.getByText(/1000 characters remaining/)
      const publicInput = screen.getByDisplayValue(/public/)

      expect(counter).toBeInTheDocument()
      expect(publicInput).toBeChecked()
    })
  })
})
