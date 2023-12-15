import './Rank.scss';
import React from "react";
import ListView from './ListView';

const Box = (props) => {
  const box_name = props.name;
  var text="";
  var text_style="row";
  if (box_name=="fact-box"){
    text="fact";
  } else if (box_name=="conv-box") {
    text="conv";
  } else {
    text="false";
    text_style="none";
  }

  return(
    <div>
      <div class={box_name}/>
      <div class="row">{text} (%)</div>
    </div>
    
  )
}

function Rank() {
  return (
    <div className="Rank">
      <h1>Rank Page</h1>
      <Box name="fact-box"/>
      <Box name="conv-box"/>
      <Box name="false-box"/>
      <ListView/>
    </div>
  );
}

export default Rank;
