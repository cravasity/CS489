import React from "react";
import { useLocation } from 'react-router-dom';

function Testing() {
    let location = useLocation(); {/* 이 페이지에 전달된 정보를 받겠다는 코드입니다 */}
    {/* 아래 publisher 변수에는 Rank 페이지에서 클릭한 줄의 "출판사" 값이 전달됩니다. */}
    const publisher = location.state.publisher; {/* 정보가 dictionary 꼴로 전달된다고 생각하시면 편할 듯 합니다. { state : {key: value}} 형태로 data가 전달되기 때문에 알짜배기 데이터 값은 location.state.key에 저장됩니다. */}

    {/* 현규님께서 이 부분에 output.csv 파일 data 중 변수 publisher 값을 출판사로 갖는 data를 추려서 회의 때 보여드린 react 디자인 대로 기능을 구현하시면 됩니다. 이 때 data를 추출해내는 코드는 api/data.py에서 함수 하나를 정의해서 사용하시면 편합니다. */}
    {/* api 함수를 구현하셨으면 함수 리턴값은 http를 통해 받아야 합니다. 그 방법은 ListView.js의 38~61 line을 참고하시면 됩니다. */}
    {/* 이 파일에 바로 구현하실 예정이라면 파일명을 적절하게 바꿔주시면 감사드리겠습니다. ex. Detail.js */}
    return (
      <div className="Test">
        {/* TODO : publisher 값에 해당하는 디테일 페이지 구현하기 */}
        {publisher}
      </div>
    );
  }
  
  export default Testing;