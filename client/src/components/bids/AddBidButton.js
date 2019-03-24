import React from 'react';
import { Button } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

const AddBidButton = () => {
  return (
      <div>
          <Button className = "ui positive button" as = {Link} to = '/bid/add'>Add Bid</Button>
      </div>
  )  ;
};

export default AddBidButton;