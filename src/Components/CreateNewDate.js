import React, {Component} from 'react'
import axios from 'axios'
import {v4 as randomString} from 'uuid'
import Dropzone from 'react-dropzone'
import {GridLoader} from 'react-spinners'
import Header from './Header'

class CreateNewDate extends Component{
    constructor(){
        super()
        this.state = {
            isUploading: false,
            url: 'http://via.placeholder.com/450x450',
            activity: '',
            price: 0,
            location: '',
            info:''

        }
        this.createNewDate = this.createNewDate.bind(this)
        this.handleActivityChange = this.handleActivityChange.bind(this)
        this.handlePriceChange = this.handlePriceChange.bind(this)
        this.handleLocationChange = this.handleLocationChange.bind(this)
        this.handleInfoChange = this.handleInfoChange.bind(this)

    
    }

    getSignedRequest = ([file]) => {
        this.setState({ isUploading: true})
        const fileName = `${randomString()}-${file.name.replace(/\s/g,'-')}`

        axios.get('/api/signs3', {
            params: {
                'file-name': fileName,
                'file-type': file.type,
            },    
        }).then(res => {
            const {signedRequest, url} = res.data
            this.uploadFile(file, signedRequest, url)
        }).catch(err => console.log(err))
    }

    uploadFile = (file, signedRequest, url) => {
        const options = {
            headers: {
                'Content-Type': file.type
            }
        }
        axios.put(signedRequest, file, options)
        .then(res => {
            this.setState({ isUploading: false, url })

        })
        .catch(err  => {
            this.setState({
                isUploading: false,
            })
            if (err.response.status === 403) {
                alert(
                  `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
                    err.stack
                  }`
                );
              } else {
                alert(`ERROR: ${err.status}\n ${err.stack}`);
              }
        })
    }
    handleActivityChange(val){
        this.setState({activity: val})
    }
    handlePriceChange(val){
        this.setState({price: val})
    }
    handleLocationChange(val){
        this.setState({location: val})
    }
    handleInfoChange(val){
        this.setState({info: val})
    }
    createNewDate(){
        axios.post('/api/activities', this.state)
        .then(() => {
            this.setState({isUploading: false, url: 'http://via.placeholder.com/450x450', activity: '', price: 0, location: '', info:''})
        })
        .catch(err => console.log(err))
    }


    render() {
        const { url, isUploading } = this.state;
        return (
          <div className="App">
            <Header/>
            <div>

            <h1>Upload Image</h1>
            <h1>{url}</h1>
            <img src={url} alt="" width="450px" />
    
            <Dropzone
              onDropAccepted={this.getSignedRequest}
              accept="image/*"
              multiple={false}>
              {({getRootProps, getInputProps}) => (
                  <div 
                  style = {{
                      position: 'relative',
                      width: 160,
                      height: 80,
                      borderWidth: 5,
                      marginTop: 25,
                      borderColor: 'gray',
                      borderStyle: 'dashed',
                      borderRadius: 5,
                      display: 'inline-block',
                      fontSize: 17,}}
                      {...getRootProps()}>
                  <input {...getInputProps()} />
                  {isUploading ? <GridLoader /> : <p>Drop files here, or click to select files</p>}
                </div>
              )}
             </Dropzone>
             <h3>Activity</h3>
              <input value={this.state.activity} onChange={e => this.handleActivityChange(e.target.value)}/>
              <h3>Price</h3>
              <input value={this.state.price} onChange={e => this.handlePriceChange(e.target.value)}/>
              <h3>Location</h3>
              <input value={this.state.location} onChange={e => this.handleLocationChange(e.target.value)}/>
              <h3>Info</h3>
              <input value={this.state.info} onChange={e => this.handleInfoChange(e.target.value)}/>
              <button onClick={() => this.createNewDate()}>Create New Date</button>
              </div>
          </div>
        );
      }
}
export default CreateNewDate