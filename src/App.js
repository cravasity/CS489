import React from "react";
import './App.css';
import Rank from './Rank'
import Testing from './Testing'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// function App() {
//   return (-
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// jsx file에서 image load하기
function App() {
  return (
    <div className="App">
      <BrowserRouter> {/* 페이지 이동을 위해 각 페이지가 어떤 path로 연결되는지 명시하는 부분입니다. */}
        <Routes> 
          <Route path="/" element={<Rank/>}></Route> {/* 처음 npm start를 했을 때 연결되는 root path에 Rank page를 연결하겠다는 의미입니다. 현구님께서 이 부분의 Rank를 Welcome page를 구현하신 js file 이름으로 바꿔주시면 됩니다. 만약 바꾸셨다면 아랫줄에 "/rank" path로 Rank page를 연결하는 코드도 추가해주세요 */}
          <Route path="/test" element={<Testing/>}></Route> {/* localhlot:3000/test에 Testing page를 연결하겠다는 의미입니다. */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
