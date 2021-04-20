import React from 'react'
import axios from 'axios'
import Header from './Header'

function Profile(props) {

    const getAllLikes = () => {
        axios.get('api/likes')
    }
    return (
        <div>
            <div>
                <Header/>
            </div>
        </div>
    )
}
export default Profile