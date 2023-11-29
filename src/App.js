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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Rank/>}></Route>
          <Route path="/test" element={<Testing/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
