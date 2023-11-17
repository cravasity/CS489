import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsRow = (props) => {
    const title = props.row.title;
    const date = props.row.date;
    const link = props.row.link;

    return (
        <li>
            <div className="link">
                {title}
                {link}
                {date}
            </div>
            
        </li>
    );
};

function ListView() {
  const [datas, setDatas] = useState(null);

  useEffect(() => {
    axios.get('/get-data')
    .then(({data}) => {
        setDatas(data);
    })
    .catch(e => {
        console.error(e.stack);
    });
  }, []);
  return (
    <ul className='listView'>
    {
        datas && datas.map((v, inx) => {
            const json_v = JSON.parse(v)
            return <NewsRow key={inx} row={json_v} />
        })
    }
    </ul>
  );
}

export default ListView;
