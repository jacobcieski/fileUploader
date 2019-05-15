import React, { Component } from 'react';
import axios from '../../../../fileuploader/frontend/fileuploader/node_modules/axios';
import BucketList from './fileList';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      success : false,
      url : "",
      error: false,
      errorMessage : ""
    }
  }

  handleChange = (ev) => {
    //Check for file size to make sure it's not over 1 Gigabyte
    if(this.uploadInput.files[0] == null){
      return;
    }

    let fileSize = this.uploadInput.files[0].size;
    if(fileSize > 1073741824){
      console.log("File size is over 1 Gigabyte");
      alert("ERROR: File size is over 1GB");
      this.setState({success: false,
                    url: "",
                    error: true,
                    errorMessage: "File size is over 1 GB"});
    
    document.getElementById("fileUpload").value = "";
    }
    else{
      this.setState({success: false, url : ""});
    }
  }

  handleUpload = (ev) => {
    let file = this.uploadInput.files[0];

    // Split the filename to get the name and type
    let fileParts = this.uploadInput.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    console.log("Preparing the upload");
    axios.post("http://localhost:3001/sign_s3",{
      fileName : fileName,
      fileType : fileType
    })
    .then(response => {
      var returnData = response.data.data.returnData;
      var signedRequest = returnData.signedRequest;
      var url = returnData.url;
      this.setState({url: url})
      console.log("Recieved a signed request " + signedRequest);

      var options = {
        headers: {
          'Content-Type': fileType
        }
      };
      axios.put(signedRequest,file,options)
      .then(result => {
        console.log("Response from s3")
        this.setState({success: true});
      })
      .catch(error => {
        alert("ERROR " + JSON.stringify(error));
      })
    })
    .catch(error => {
      alert(JSON.stringify(error));
    })

  }


  render() {
    const SuccessMessage = () => (
      <div style={{padding:0}}>
        <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
        <br/>
      </div>
    )
    const ErrorMessage = () => (
      <div style={{padding:5}}>
        <h3 style={{color: 'red'}}>FAILED UPLOAD</h3>
        <span style={{color: 'red', backgroundColor: 'black'}}>ERROR: </span>
        <span>{this.state.errorMessage}</span>
        <br/>
      </div>
    )
    return (
      <div className="App">
        <center>
          <h1>UPLOAD A FILE</h1>
          {this.state.success ? <SuccessMessage/> : null}
          {this.state.error ? <ErrorMessage/> : null}
          <input id="fileUpload" onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
          <br/>
          <button onClick={this.handleUpload}>UPLOAD</button>
          <br/>
          <br/>
        </center>
        <div id="fileList">
          <BucketList/>
        </div>
      </div>
    );
  }
}

export default App;
