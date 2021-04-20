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

                <Link to='/Activities'><button>Dates</button></Link>
                <Link to='/Profile'><button>Profile</button></Link>
                <Link to='/Dislikes'><button>Dislikes</button></Link>
                <Link to='/CreateNewDate'><button>Create New</button></Link>
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