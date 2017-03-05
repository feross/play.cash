const { Component, h } = require('preact') /** @jsx h */

const c = require('classnames')

class Input extends Component {
  static get defaultProps () {
    return {
      type: 'text',
      required: false
    }
  }

  constructor () {
    super()
    this.id = 'input-' + Math.random().toString(16).slice(2, 8)
  }

  render (props) {
    const $optional = !props.required
      ? <span class='normal black-60'>(optional)</span>
      : null

    const $label = props.label
      ? <label for={this.id} class='f5 b db mb2'>{props.label} {$optional}</label>
      : null

    const descId = props.desc
      ? 'desc-' + this.id
      : null

    const $desc = props.desc
      ? <small id={descId} class='f6 black-60 db mb2'>{props.desc}</small>
      : null

    return (
      <div class={c('mb4', props.class)}>
        {$label}
        <input
          id={this.id}
          type={props.type}
          class='input-reset ba b--black-20 pa2 mb2 db w-100'
          placeholder={props.placeholder}
          required={props.required}
          aria-describedby={descId}
          value={props.value}
          onChange={props.onChange}
        />
        {$desc}
      </div>
    )
  }
}

module.exports = Input
