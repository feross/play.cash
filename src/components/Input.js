const { Component, h } = require('preact') /** @jsx h */

class Input extends Component {
  constructor (props) {
    super(props)
    this.id = 'input-' + Math.random().toString(16).slice(2, 8)
  }

  render (props) {
    const {
      type = 'text',
      required = false,
      placeholder,
      label,
      desc,
      value,
      onChange
    } = props

    const $optional = !required
      ? <span class='normal black-60'>(optional)</span>
      : null

    const $label = label
      ? <label for={this.id} class='f5 b db mb2'>{label} {$optional}</label>
      : null

    const descId = desc
      ? 'desc-' + this.id
      : null

    const $desc = desc
      ? <small id={descId} class='f6 black-60 db mb2'>{desc}</small>
      : null

    return (
      <div class={props.class}>
        {$label}
        <input
          id={this.id}
          type={type}
          class='input-reset ba b--black-20 pa2 mb2 db w-100'
          placeholder={placeholder}
          required={required}
          aria-describedby={descId}
          value={value}
          onChange={onChange}
        />
        {$desc}
      </div>
    )
  }
}

module.exports = Input
