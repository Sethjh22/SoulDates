import React, {Component} from 'react'
import axios from 'axios'
import Header from './Header'
import './Activities.css'

class Activities extends Component{
    constructor(props){
        super(props)
        this.state = {
           activity: []
        }
        this.getRandomActivity = this.getRandomActivity.bind(this)
        this.addToLikes = this.addToLikes.bind(this)
        this.addToDislikes = this.addToDislikes.bind(this)
    }
    getRandomActivity(){
        let id = Math.ceil(Math.random() * 4)
        axios.get(`/api/activities/${id}`).then(res => {
            this.setState({activity: res.data})
        })
    }
    addToLikes(){
        
        let {activity} = this.state
        axios.post(`/api/like/${activity.date_id}`)
        .then(() => this.getRandomActivity())
        .catch(err => console.log(err))
        
    }

    addToDislikes(){
        let {activity} = this.state
        axios.post(`/api/dislike/${activity.date_id}`)
        .then(() =>  this.getRandomActivity())
        .catch(err => console.log(err))
       
    }

    componentDidMount(){
        this.getRandomActivity()
    }
    
    render(){
        let {activity} = this.state
        return(
            <div>
                <Header/>
                <div>
                    <img src={activity.image} alt={'activity'}/>
                    <h1>{activity.activity}</h1>
                    <h2>{activity.price}</h2>
                    <h2>{activity.location}</h2>
                    <p>{activity.info}</p>

                </div>
                <div>
                    <button onClick={this.addToDislikes}>Nah</button>
                    <button onClick={this.addToLikes}>Fun</button>
                </div>
            </div>
        )
    }
}
export default Activities