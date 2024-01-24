import React from 'react';
import Splash from './splash/Splash';
import VideoList from '../../components/videoList/VideoList';
function Home(){
  return (
    <>
    <div style={{overflowX:"hidden"}}>
      <Splash />
    </div>
    </>
  );
}

export default Home;
