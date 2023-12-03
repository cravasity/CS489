import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Detail = (props) => {
    const row = props.row;
    const title = row.title;
    return (
      <div className="Detail">
        <div>{title}</div>
      </div>
    )
}

function Publisher() {
    let location = useLocation(); {/* 이 페이지에 전달된 정보를 받겠다는 코드입니다 */}
    {/* 아래 publisher 변수에는 Rank 페이지에서 클릭한 줄의 "출판사" 값이 전달됩니다. */}
    const publisher = location.state.publisher; {/* 정보가 dictionary 꼴로 전달된다고 생각하시면 편할 듯 합니다. { state : {key: value}} 형태로 data가 전달되기 때문에 알짜배기 데이터 값은 location.state.key에 저장됩니다. */}

    const [rows, setRow] = useState(null);

    useEffect(() => {
      axios.get('/get', {
        params: {input_pub: publisher}
      })
      .then(({data}) => {
          setRow(data);
      })
      .catch(e => {
          console.error(e.stack);
      });

    }, []);
    return (
      <div className="Test">
        {
        rows && rows.map((v, inx) => {
            const json_r = JSON.parse(v)
            return <Detail key={inx} row={json_r}/>
        })
    }
      </div>
    );
  }
  
  export default Publisher;