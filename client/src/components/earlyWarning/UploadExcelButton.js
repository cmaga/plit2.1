import React from 'react';
import plitApi from '../../api/plitApi';

class UploadExcelButton extends React.Component {
state = {dummy: 0};
    handleUploadFile = (event) => {
        const data = new FormData();
        data.append('file', event.target.files[0]);

        plitApi.post('/api/upload', data).then((response) => {
            console.log(response); // do something with the response
        });

        this.setState({dummy: Math.random()});
    };


    render() {
        return (
            <div>

                <input type="file"
                       className="positive ui button"
                       name="file"
                       accept="file_extension/.csv"
                       onChange={this.handleUploadFile}/>

            </div>
        );
    }
}

export default UploadExcelButton;