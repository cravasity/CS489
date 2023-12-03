import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Listview.scss';
import { useNavigate } from 'react-router-dom';
import {Image} from 'react-native';

const NewsRow = (props) => {
    const publisher = props.percentages.publisher;
    const fact = props.percentages.fact;
    const conv = props.percentages.conv;
    const fake = props.percentages.fake;
    const data_num = props.percentages.data_num;
    
    const fact_var = `--${publisher}-fact`;
    const conv_var = `--${publisher}-conv`;
    const img_path = `./icon${publisher}.png`;

    document.documentElement.style.setProperty(fact_var, fact);
    document.documentElement.style.setProperty(conv_var, conv);

    const navigate = useNavigate();
    const goDetail = e => {
        navigate('/publish', { state: { publisher:`${publisher}` } });
    };

    return (
        <div className="NewsRow">
            <div class="boundary">
                {/* percentage 막대 그래프로 나타내기 (1) */}
                <div class="text" onClick={goDetail}>{publisher}</div>
                <Image source={require(`./icon/${publisher}.png`)} style={{marginTop: 20, width: "10%", height: 100, float:"left"}} resizeMode="contain"/> 
                <div class={publisher}/>
                <div class="text3">전체 기사: {data_num}</div>
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
