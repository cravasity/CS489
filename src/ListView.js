import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Listview.scss';
import { useNavigate } from 'react-router-dom';


const NewsRow = (props) => {
    const publisher = props.percentages.publisher;
    const fact = props.percentages.fact;
    const conv = props.percentages.conv;
    const fake = props.percentages.fake;
    
    const fact_var = `--${publisher}-fact`;
    const conv_var = `--${publisher}-conv`;

    document.documentElement.style.setProperty(fact_var, fact);
    document.documentElement.style.setProperty(conv_var, conv);

    const navigate = useNavigate();
    const goDetail = e => {
        navigate('/test', { state: { key:`${publisher}` } });
    };

    return (
        <div className="NewsRow">
            <div class="boundary">
                {/* percentage 막대 그래프로 나타내기 (1) */}
                <div class="text" onClick={goDetail}>{publisher}</div>
                <div class="progress-bar">    
                    <div class={publisher}/>
                </div>
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
