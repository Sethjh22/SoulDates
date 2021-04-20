import React, {Component} from 'react'
import axios from 'axios'
import {logout} from '../redux/authReducer'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'


class Header extends Component{
    constructor(props){
        super(props)
        
        this.logout = this.logout.bind(this)
    }

    logout(){
        axios.post('/auth/logout').then(_ => logout())
    }
    render(){
        return(
            <div>

                <button>Dates</button>
                <button>Profile</button>
                <button>Dislikes</button>
                <button>Create New</button>
                <Link to='/'><button onClick={() => this.logout}>Logout</button></Link>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        username: state.username
    }
}



export default withRouter(connect(mapStateToProps, {logout})(Header))