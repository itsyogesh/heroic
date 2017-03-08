import React, { Component, PropTypes } from 'react'
import isURL from 'validator/lib/isURL'
import classnames from 'classnames'

class GameForm extends Component {

  state = {
    title: '',
    cover: '',
    errors: {},
    placeholdeUrl: 'https://d13yacurqjgara.cloudfront.net/users/5031/screenshots/1338909/key-visual.png'
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    // Validation
    let errors = {}
    if (this.state.title === '') errors.title = "Can't be empty"
    if (this.state.cover === '') errors.cover = "Can't be empty"
    if(this.state.cover && !isURL(this.state.cover)) errors.cover = 'Not a valid URL'

    this.setState({errors})
  }

  render() {

    let renderForm = (
      <form className='ui form' onSubmit={this.handleSubmit}>
        <div className={classnames('field', { error: !!this.state.errors.title})}>
          <label htmlFor='title'>Game Title</label>
          <input
            name='title'
            value={this.state.title}
            onChange={this.handleChange}
            id='title'
          />
        </div>
        <div className='field'>
          <label htmlFor='cover'>Cover URL</label>
            <input
              name='cover'
              value={this.state.cover}
              onChange={this.handleChange}
              id='cover'
            />
        </div>
        <div className='field'>
          <button className='ui right labeled icon primary button'>
            <i className="plus icon"></i>
            Save
          </button>
        </div>
      </form>
    )

    let renderCard = (
      <div className="ui centered card">
        <div className="image">
          <img src={this.state.cover ? this.state.cover : this.state.placeholdeUrl} alt='cover'/>
        </div>
        <div className="content">
          <a className="header">{this.state.title ? this.state.title : 'Game Title'}</a>
        </div>
      </div>
    )

    return (
      <div className='ui main container'>
        <div className="ui text container">
          <h2 className='ui center aligned header'>Add a new game</h2>
          <div className="ui clearing divider"></div>
        </div>
        <div className="ui grid">
          <div className='ten wide column'>
            <div className="ui basic very padded segment">
              <h3 className='ui center aligned header'>Game Details</h3>
              {renderForm}
            </div>
          </div>
          <div className='six wide column'>
            <div className="ui basic very padded segment">
              <h3 className='ui center aligned header'>Preview</h3>
              {renderCard}
              </div>
          </div>
        </div>
      </div>
    )
  }
}


export default GameForm
