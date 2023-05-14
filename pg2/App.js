import React from 'react'
import firebase from './firebase'

class App extends React.Component {
  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        this.onSignInSubmit();
        console.log("Recaptca varified")
      },
      defaultCountry: "IN"
    });
  }
  onSignInSubmit = (e) => {
    e.preventDefault()
    this.configureCaptcha()
    const phoneNumber = "+91" + this.state.mobile
    console.log(phoneNumber)
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {

        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent")

      }).catch((error) => {

        console.log("SMS not sent")
      });
  }
  onSubmitOTP = (e) => {
    e.preventDefault()
    const code = this.state.otp
    console.log(code)
    window.confirmationResult.confirm(code).then((result) => {

      const user = result.user;
      console.log(JSON.stringify(user))
      alert("User is verified")
      window.location.replace('http://localhost:3003');

    }).catch((error) => {
      window.location.replace('http://localhost:3005/');
    });
  }
  render() {
    return (
      <div class="card">
        <span class="text-center">OTP AUTH</span>
        <div class="container ">

          <form onSubmit={this.onSignInSubmit}>
            <div id="sign-in-button"></div>
            <div class="input-container">
              <input type="number" name="mobile" required onChange={this.handleChange} class="in_space" />
              <label>Enter Phone</label>
              <button type="submit" class="in_space btn">Submit</button>
            </div>
          </form>


          <form onSubmit={this.onSubmitOTP} class="flex_property">
            <div></div>
            <div class="input-container">
              <input type="number" name="otp" required onChange={this.handleChange} class="in_space" />
              <label>Enter OTP</label>
              <button type="submit" class="in_space btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default App