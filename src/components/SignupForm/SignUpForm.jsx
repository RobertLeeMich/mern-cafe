import { Component } from "react";
import { signUp } from '../../utilities/users-service'

export default class SignUpForm extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
      };

      handleChange = (evt) => {
        this.setState({
          [evt.target.name]: evt.target.value,
          error: ''
        });
      };

      handleSubmit = async (evt) => {
        //prevent refresh on submit
        evt.preventDefault()
        try {
          //we don't want to send state data directly to the server so we'll make a copy of it
          const formData = {...this.state} //making copy
          //we'll delete the error and the confirm message (confirm has to do with password info for confirming the password)
          delete formData.error
          delete formData.confirm
          //this function doesn't exist and it will come from our userservice file
          // The promise returned by the signUp service method
          // will resolve to the user object included in the
          // payload of the JSON Web Token (JWT)
          //first function called for signup, users-service sign up method gets added to the call stack which has to exit the stack first for it to work
          const user = await signUp(formData)
          this.props.setUser(user)
          console.log(user)
        }catch (err){
          //setting setState to the error string below, as we defined a state above and we have an error field in our jsx below that will show up under the form
          //console.log the error, troubleshooting
          console.log(err)
          this.setState({error: 'Sign up failed, try again'})
        }
        
      }
      
    render() {
        const disable = this.state.password !== this.state.confirm;
        return(
            <div>
                <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
          <label>Email</label>
          <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
          <label>Confirm</label>
          <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
          <button type="submit" disabled={disable}>SIGN UP</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{this.state.error}</p>
    </div>
            </div>
        )
    }
}