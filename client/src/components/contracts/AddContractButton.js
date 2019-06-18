import React from 'react';
import { Button } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

const AddContractButton = () => {
  return (
      <div>
          <Button className = "ui positive button" as = {Link} to = '/contract/add'>Add Contract</Button>
      </div>
  )  ;
};

export default AddContractButton;