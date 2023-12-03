import './Publisher.scss';
import React, { useEffect, useState } from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import {Doughnut} from "react-chartjs-2";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import {styled} from "styled-components";
import {Image} from 'react-native';

ChartJS.register(ArcElement, Tooltip, Legend);

const Detail = (props) => {
    const row = props.row;
    const title = row.title;   
    return (
      <div className="Detail">
        <div class="null">{title}</div>
      </div>
    )
}

const DoghnutChart = (props) => {
  
  const fact_num = props.fact;
  const conv_num = props.conv;
  const false_num = props.false;
  // const fact_percent = props.fact;
  // const conv_percent = props.conv;
  // const false_percent = props.false;

  const Data = {
    labels: ["fact", "conv", "false"],
    datasets: [
      {
        data: [fact_num, conv_num, false_num],
        backgroundColor:["#1B263B", "#415A77", "#778DA9"],
        borderColor:["#1B263B", "#415A77", "#778DA9"],
      },
    ],
  }
  const Options = {}

  const Main = styled.div`
  display: flex;
  margin-left: 30%;
  // margin : 0 auto;
  margin-top: 30px;
  margin-bottom: 75px;
  align-items: left;
  width: 30%;
  float: left;
`;

  return(
    <div>
      <Main>
        <Doughnut data={Data} options={Options}></Doughnut>
      </Main>
      
    </div>
    
  )
}

const TableRow = (props) => {
  const row = props.row

  return(
    <tr>
      <td>{row.date}</td>
      <td>{row.title}</td>
      <td>{row.result}</td>
    </tr>
  )
}

const TableComp = (props) => {
  const rows = props.rows;

  return (
    <div class="wrap">
      <table class="null">
        <thead>
          <tr>
            <th>시간</th>
            <th>기사 제목</th>
            <th>결과</th>
          </tr>
        </thead>
        <tbody>
          {
            rows&&rows.map((v, inx) => {
              const json_r = JSON.parse(v);
              return (
                <tr class="tr">
                  <td>{json_r.date}</td>
                  <td><Link to={json_r.url}>{json_r.title}</Link></td>
                  <td>{json_r.result}</td>
                </tr>
              )
            })
          }
          
          
        </tbody>
      </table>
    </div>
  )
}

function Publisher() {
    let location = useLocation(); {/* 이 페이지에 전달된 정보를 받겠다는 코드입니다 */}
    {/* 아래 publisher 변수에는 Rank 페이지에서 클릭한 줄의 "출판사" 값이 전달됩니다. */}
    const publisher = location.state.publisher; {/* 정보가 dictionary 꼴로 전달된다고 생각하시면 편할 듯 합니다. { state : {key: value}} 형태로 data가 전달되기 때문에 알짜배기 데이터 값은 location.state.key에 저장됩니다. */}

    const [rows, setRow] = useState(null);
    const [numbers, setNumbers] = useState(null);
    

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

      axios.get('/pub-info', {
        params: {input_pub: publisher}
      })
      .then(({data}) => {
          setNumbers(data);
      })
      .catch(e => {
          console.error(e.stack);
      });

    }, []);
    return (
      <div className="Publisher">
        <Image source={require(`./icon/${publisher}.png`)} style={{marginTop: 20, width: "20%", height: 100, float:"left"}} resizeMode="contain"/> 
        <h1 class="header">{publisher}</h1>
        <div class="null"/>
      {
        numbers && numbers.map((v, inx) => {
          const json_n = JSON.parse(v)

          const data_num = json_n.data_num;
          const fact_num = json_n.fact_num;
          const conv_num = json_n.conv_num;
          const false_num = json_n.false_num;
          const fact_percent = json_n.fact;
          const conv_percent = json_n.conv;
          const false_percent = json_n.fake;

          return (
            <div className="number_info">
              <DoghnutChart fact={fact_percent} conv={conv_percent} false={false_percent} />
              <div class="text2">
                전체 기사 개수 : {data_num}
                <br/><br/>
                사실 기사 개수 : {fact_num}
                <br/>
                거짓 기사 개수 : {false_num}
                <br/>
                논란 기사 개수 : {conv_num}
              </div>
            </div>
          )
        })
      }
      <TableComp rows={rows}></TableComp>
      </div>
    );
  }
  
  export default Publisher;