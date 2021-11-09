import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {
      history,
    } = this.props /* if the token submitted is valid then, we take history and if again logged in 
    it will be history will push the home route    */

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.push('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  } /* if the token submitted is invalid it throws an error */

  onClickLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    } /* username and password are inserted into userDetails variable */
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json() /* response converted into json */
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsername = () => {
    const {username} = this.state

    return (
      <>
        <label htmlFor="username-field" className="up-label">
          USERNAME
        </label>
        <input
          className="up-input"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="USERNAME"
          id="username-field"
          type="text"
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state

    return (
      <>
        <label htmlFor="password-field" className="up-label">
          PASSWORD
        </label>
        <input
          className="up-input"
          id="password-field"
          value={password}
          onChange={this.onChangePassword}
          type="password"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div className="desktop-login-container">
          <form className="desktop-form" onSubmit={this.onClickLoginForm}>
            <img
              src="https://res.cloudinary.com/dakda5ni3/image/upload/v1632837121/Vector_1x_gwfr5t.jpg"
              alt="website logo"
              className="login-logo"
            />
            <h1 className="logo-name">Tasty Kitchens</h1>
            <h1 className="login-head">Login</h1>
            <div className="up-container">{this.renderUsername()}</div>
            <div className="up-container">{this.renderPassword()}</div>
            {showSubmitError && <p className="error-msg">{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <img
            src="https://res.cloudinary.com/dakda5ni3/image/upload/v1632836824/Rectangle_1456_1x_cjs1nf.jpg"
            alt="website login"
            className="desktop-login-image"
          />
        </div>
        <div className="mobile-login-container">
          <div className="image-container">
            <img
              src="https://res.cloudinary.com/dakda5ni3/image/upload/v1632836824/Rectangle_1456_1x_cjs1nf.jpg"
              alt="website login"
              className="mobile-login-image"
            />
            <h1 className="login-head">Login</h1>
          </div>
          <form className="mobile-form" onSubmit={this.onClickLoginForm}>
            <div className="up-container">{this.renderUsername()}</div>
            <div className="up-container">{this.renderPassword()}</div>
            {showSubmitError && <p className="error-msg">{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </>
    )
  }
}
export default LoginForm
