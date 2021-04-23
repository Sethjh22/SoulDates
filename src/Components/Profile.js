import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Header from './Header'

function Profile(props) {
    const [likes, getAllLikes] = useState([])

    useEffect(() => {
        axios.get('/api/likes').then(res => {
            getAllLikes(res.data.results)
        })
    }, [])  
    
    
    let mappedLikes = likes.map((e, i)=> {
        return <section key={i}><img src={e.image}/><h1>{e.activity}</h1><h3>{e.price}</h3><h3>{e.location}</h3><p>{e.info}</p></section>
    })
    return (
        <div>
            <div>
                <Header/>
            </div>
            <div>
                {mappedLikes}
            </div>
        </div>
    )
}
export default Profile