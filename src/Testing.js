import React from "react";
import { useLocation } from 'react-router-dom';

function Testing() {
    let location = useLocation();
    const data = location.state.key;
    return (
      <div className="Test">
        {data}
      </div>
    );
  }
  
  export default Testing;