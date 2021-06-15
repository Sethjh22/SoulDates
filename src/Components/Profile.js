import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Header from './Header'


function Profile(props) {
    const [likes, getAllLikes] = useState([])
    console.log(likes)

    useEffect(() => {
        axios.get('/api/likes').then(res => {
            getAllLikes(res.data.results)
        })
    }, [])  
    
    
    
    return (
        <div>
            <div>
                <Header/>
            </div>
            <div>
                {likes.map((element, index) => {
                    return(
                        <div key={index}>
                            <img src={element.image}/>
                            <h1>{element.activity}</h1>
                            <h3>{element.price}</h3>
                            <h3>{element.location}</h3>
                            <p>{element.info}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Profile