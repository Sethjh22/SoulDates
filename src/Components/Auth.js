import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateUser} from '../redux/authReducer'

class Auth extends Component {
    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:''
        }
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
    }
    handleUsernameChange(val){
        this.setState({ username: val })
    }
    handlePasswordChange(val){
        this.setState({ password: val })
    }

    register() {
        axios.post('/auth/register', this.state)
        .then(res => {
            this.props.updateUser({username: res.data.username})
            this.props.history.push('/activities')
        }).catch(err => console.log(err))
    }

    login() {
        axios.post('/auth/login', this.state)
        .then(res => {
            this.props.updateUser({username: res.data.username})
            this.props.history.push('/Activities')
        }).catch(err => console.log(err))
    }

    render(){
        return(
            <div>
                <div>
                    <h1>Soul Dates</h1>
                    <div>
                        <p>Username:</p>
                        <input value={this.state.username} onChange={e => this.handleUsernameChange(e.target.value)}/>
                    </div>
                    <div>
                        <p>Password:</p>
                        <input value={this.state.password} type='password' onChange={e => this.handlePasswordChange(e.target.value)}/>
                    </div>
                    <div>
                        <button onClick={this.login}>Login</button>
                        <button onClick={this.register}>Register</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(null, {updateUser})(Auth)