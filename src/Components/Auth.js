import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateUser} from '../redux/authReducer'
import './Auth.scss'

class Auth extends Component {
    constructor(props){
        super(props)
        this.state = {
            username:'',
            email: '',
            password:'',
            mode: 'login',

        }
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
        
    }
    handleEmailChange(val){
        this.setState({ email: val})
    }
    handleUsernameChange(val){
        this.setState({ username: val })
    }
    handlePasswordChange(val){
        this.setState({ password: val })
    }
    handleMode = (val) => {
        this.setState({ mode: val.target.name })
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
        let {mode} = this.state
        if(mode === 'login'){

            return(
                <div className="auth">
                <div className="auth-container">
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
                    </div>
                    <div>
                        <span>Don't have an account?</span>
                        <button name='register' onClick={this.handleMode} disabled={mode === 'register'}>Register for free</button>
                        {/* <button name='login' onClick={this.handleMode} disabled={mode === 'login'}>Login</button> */}
                    </div>
                </div>
            </div>
        )}else {
            return(
                <div className="auth">
                <div className="auth-container">
                    <h1>Soul Dates</h1>
                    <div>
                        <p>Email:</p>
                        <input value={this.state.email} onChange={e => this.handleEmailChange(e.target.value)}/>
                    </div>
                    <div>
                        <p>Username:</p>
                        <input value={this.state.username} onChange={e => this.handleUsernameChange(e.target.value)}/>
                    </div>
                    <div>
                        <p>Password:</p>
                        <input value={this.state.password} type='password' onChange={e => this.handlePasswordChange(e.target.value)}/>
                    </div>
                    <div>
                        <button onClick={this.register}>Register</button>
                    </div>
                    <div>
                        <span>Already have and account?</span>
                        <button name='login' onClick={this.handleMode} disabled={mode === 'login'}>Login</button>
                    </div>
                </div>
            </div>
            )
        }
    }
}
export default connect(null, {updateUser})(Auth)