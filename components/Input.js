const { Component, h } = require('preact') /** @jsx h */

const c = require('classnames')
const randombytes = require('randombytes')

class Input extends Component {
  static get defaultProps () {
    return {
      type: 'text',
      required: false
    }
  }

  constructor () {
    super()
    this.state.id = randombytes(1).toString('hex') // enforce unique html ids
  }

  render (props, state) {
    if (!props.label) throw new Error('"label" prop is required')

    const id = props.label.toLowerCase() + '-' + state.id

    const $optional = !props.required
      ? <span class='normal black-60'>(optional)</span>
      : null

    const $desc = props.desc
      ? <small id={id + '-desc'} class='f6 black-60 db mb2'>{props.desc}</small>
      : null

    return (
      <div class={c('mb4', props.class)}>
        <label for={id} class='f5 b db mb2'>{props.label} {$optional}</label>
        <input
          id={id}
          type={props.type}
          class='input-reset ba b--black-20 pa2 mb2 db w-100'
          placeholder={props.placeholder}
          required={props.required}
          aria-describedby={id + '-desc'}
        />
        {$desc}
      </div>
    )
  }
}

module.exports = Input
