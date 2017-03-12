import React, { Component, PropTypes } from 'react'
import isURL from 'validator/lib/isURL'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import { saveGame } from './actions'

class GameForm extends Component {

  state = {
    title: '',
    cover: '',
    errors: {},
    loading: false,
    done: false,
    placeholdeUrl: 'https://d13yacurqjgara.cloudfront.net/users/5031/screenshots/1338909/key-visual.png'
  }

  handleChange = (e) => {
    if(!!this.state.errors[e.target.name]){
      let errors = Object.assign({}, this.state.errors)
      delete errors[e.target.name]
      this.setState({
        [e.target.name]: e.target.value,
        errors
      })
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    // Validation
    let errors = {}
    if (this.state.title === '') errors.title = "Can't be empty"
    if (this.state.cover === '') errors.cover = "Can't be empty"
    else if (!isURL(this.state.cover)) errors.cover = 'Not a valid URL'

    this.setState({errors})
    const isValid = Object.keys(errors).length === 0

    if (isValid) {
      this.setState({loading: true})
      const { title, cover } = this.state
      this.props.saveGame({name: title, cover})
        .then(() => {
          this.setState({done: true})
        })
        .catch((err) => {
          console.log('Inside error detail')
          console.log(err)
          err.response.json()
            .then((res) => {
              console.log('errors are here', res.errors)
              errors = {...res.errors.details, message: res.errors.message}
              this.setState({errors, loading: false})
            })
        })
    }
  }

  renderErrorMessage = (message) => {
    return (
      <div className="ui error message">
        <div className="header">
          {message.header ? message.header : 'Something Went Wrong'}
        </div>
        <p>{message.text}</p>
      </div>
    )
  }

  render() {

    const renderForm = (
      <form
        className={classnames(
          'ui form',
          {error: !!Object.keys(this.state.errors).length}
        )}
        onSubmit={this.handleSubmit}>
        <div className={classnames('field', { error: !!this.state.errors.title})}>
          <label htmlFor='title'>Game Title</label>
          <input
            name='title'
            value={this.state.title}
            onChange={this.handleChange}
            id='title'
          />
        </div>
        <div className={classnames('field', { error: !!this.state.errors.cover})}>
          <label htmlFor='cover'>Cover URL</label>
            <input
              name='cover'
              value={this.state.cover}
              onChange={this.handleChange}
              id='cover'
            />
        </div>
        {!!this.state.errors.message && this.renderErrorMessage({
          text: this.state.errors.message
        })}
        <div className='field'>
          <button
            className={
              classnames(
                'ui right labeled icon primary button',
                {loading: this.state.loading}
            )}>
            <i className="plus icon"></i>
            Save
          </button>
        </div>
      </form>
    )

    const renderCard = (
      <div className="ui centered card">
        <div className="image">
          <img src={this.state.cover ? this.state.cover : this.state.placeholdeUrl} alt='cover'/>
        </div>
        <div className="content">
          <a className="header">{this.state.title ? this.state.title : 'Game Title'}</a>
        </div>
      </div>
    )

    const formPage = (
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

    return (
      <div>
        {this.state.done ? <Redirect to='/games' /> : formPage}
      </div>
    )
  }
}



export default connect(null, { saveGame })(GameForm)
