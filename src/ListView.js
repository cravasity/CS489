import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Listview.css';

const NewsRow = (props) => {
    // const title = props.results.title;
    // const date = props.results.date;
    // const link = props.results.link;

    const publisher = props.percentages.publisher;
    const fact = props.percentages.fact;
    const conv = props.percentages.conv;
    const fake = props.percentages.fake;

    let class_name = ""
    if (publisher=="JTBC") {
        document.documentElement.style.setProperty('--width-fact-jtbc', fact);
        document.documentElement.style.setProperty('--width-conv-jtbc', conv);
        class_name="progress-bar2-jtbc"
    } else if (publisher=="MBC") {
        document.documentElement.style.setProperty('--width-fact-mbc', fact);
        document.documentElement.style.setProperty('--width-conv-mbc', conv);
        class_name="progress-bar2-mbc"
    } else if (publisher=="SBS") {
        document.documentElement.style.setProperty('--width-fact-sbs', fact);
        document.documentElement.style.setProperty('--width-conv-sbs', conv);
        class_name="progress-bar2-sbs"
    } else {
        document.documentElement.style.setProperty('--width-fact-kbs', fact);
        document.documentElement.style.setProperty('--width-conv-kbs', conv);
        class_name="progress-bar2-kbs"
    }  

    return (
        <li>
            {/* percentage 막대 그래프로 나타내기 (1) */}
            <div>{publisher}</div>
            <div class="progress-bar">    
                <div class={class_name}></div>
            </div>
            <div class="progress-bar2"></div>
            {/* <div className="link">
                {fact}
            </div> */}
        </li>
    );
};

function ListView() {
  const [datas, setDatas] = useState(null);
  const [percentages, setPercent] = useState(null);

  useEffect(() => {
    // axios.get('/get-data')
    // .then(({data}) => {
    //     setDatas(data);
    // })
    // .catch(e => {
    //     console.error(e.stack);
    // });

    axios.get('/percentage')
    .then(({data}) => {
        setPercent(data);
    })
    .catch(e => {
        console.error(e.stack);
    });

  }, []);
  return (
    <ul className='listView'>
    {
        percentages && percentages.map((v, inx) => {
            const json_p = JSON.parse(v)
            return <NewsRow key={inx} percentages={json_p}/>
        })
    }
    </ul>
  );
}

export default ListView;
