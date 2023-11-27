import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Listview.scss';


const NewsRow = (props) => {
    const publisher = props.percentages.publisher;
    const fact = props.percentages.fact;
    const conv = props.percentages.conv;
    const fake = props.percentages.fake;
    
    const fact_var = `--${publisher}-fact`;
    const conv_var = `--${publisher}-conv`;

    document.documentElement.style.setProperty(fact_var, fact);
    document.documentElement.style.setProperty(conv_var, conv);

    return (
        <div class="boundary">
            {/* percentage 막대 그래프로 나타내기 (1) */}
            <div class="text">{publisher}</div>
            <div class="progress-bar">    
                <div class={publisher}/>
            </div>
        </div>
    );
};

function ListView() {
  const [percentages, setPercent] = useState(null);

  useEffect(() => {
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
