import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import superagent from 'superagent';
import './app.css';

class App extends Component {

  state = {
    files: [],
    uploadResponse: null
  }

  render() {
    const file = this.state.files[0];
    const uploadResponse = this.state.uploadResponse;
    
    return (
      <div className="app">    

        <Dropzone
          accept={'image/png, image/jpeg'}
          multiple={false}
          onDrop={this.onDrop}>
          <div>Drop image here or tap to upload</div>
        </Dropzone>

        {file != null
          ? <img
              alt="file-preview"
              src={file.preview}/>
          : null}

        {uploadResponse != null
          ? <pre>
              {JSON.stringify(uploadResponse, null, 2)}
            </pre>
          : null}
      </div>
    );
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    console.log('onDrop this: ', this);
    console.log('Accepted files: ', acceptedFiles);
    console.log('Rejected files: ', rejectedFiles);
    this.setState({
      files: acceptedFiles
    });

    var req = superagent.post('/file-upload');
    acceptedFiles.forEach((file)=> {
      // Backend expects 'file' reference
      req.attach('file', file, file.name);
    });
    req.end((err,res) => {  
      console.log('file-upload error', err);
      console.log('file-upload response', res);
      this.setState({
        uploadResponse: JSON.parse(res.body)
      });
    });

  }
}

export default App;
