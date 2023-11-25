import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Listview.scss';

const NewsRow = (props) => {
    const publisher = props.percentages.publisher;
    const fact = props.percentages.fact;
    const conv = props.percentages.conv;
    const fake = props.percentages.fake;

    let class_name = ""
    if (publisher=="TV조선") {
        document.documentElement.style.setProperty('--fact-tv', fact);
        document.documentElement.style.setProperty('--conv-tv', conv);
        class_name="tv-chosun"
    } else if (publisher=="MBC") {
        document.documentElement.style.setProperty('--fact-mbc', fact);
        document.documentElement.style.setProperty('--conv-mbc', conv);
        class_name="mbc"
    } else if (publisher=="이데일리") {
        document.documentElement.style.setProperty('--fact-edaily', fact);
        document.documentElement.style.setProperty('--conv-edaily', conv);
        class_name="edaily"
    } else if (publisher=="한겨레") {
        document.documentElement.style.setProperty('--fact-han', fact);
        document.documentElement.style.setProperty('--conv-han', conv);
        class_name="han"
    } else if (publisher=="SBS") {
        document.documentElement.style.setProperty('--fact-sbs', fact);
        document.documentElement.style.setProperty('--conv-sbs', conv);
        class_name="sbs"
    } else if (publisher=="노컷뉴스") {
        document.documentElement.style.setProperty('--fact-nocut', fact);
        document.documentElement.style.setProperty('--conv-nocut', conv);
        class_name="nocut-news"
    } else if (publisher=="머니투데이") {
        document.documentElement.style.setProperty('--fact-money', fact);
        document.documentElement.style.setProperty('--conv-money', conv);
        class_name="money-today"
    } else if (publisher=="오마이뉴스") {
        document.documentElement.style.setProperty('--fact-ohmy', fact);
        document.documentElement.style.setProperty('--conv-ohmy', conv);
        class_name="ohmy-news"
    } else if (publisher=="연합뉴스") {
        document.documentElement.style.setProperty('--fact-combine', fact);
        document.documentElement.style.setProperty('--conv-combine', conv);
        class_name="combine-news"
    } else if (publisher=="YTN") {
        document.documentElement.style.setProperty('--fact-ytn', fact);
        document.documentElement.style.setProperty('--conv-ytn', conv);
        class_name="ytn"
    } 

    return (
        <div class="boundary">
            {/* percentage 막대 그래프로 나타내기 (1) */}
            <div class="row">
                <div class="text">{publisher}</div>
                
            </div>
            <div class="progress-bar">    
                <div class={class_name}></div>
            </div>
        </div>
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
