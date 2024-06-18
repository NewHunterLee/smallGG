//import { ViewConfig } from '@hilla/hilla-file-router/types.js';
import { Button } from '@hilla/react-components/Button.js';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function UserPage() {

  const userData = {
    name: 'Gwen Stacy',
    mbti: 'ISTP',
    avatarUrl:'images/girl.jpg',
    Sports: ['Basketball','Soccer' ,'Badminton'],
    Movies: ['Sci-fi', 'Horror'],
    Foods: ['Hot Pot']
  };

  const navigate = useNavigate();

    const handleNextClick = () => {
      navigate('../mainview'); 
    };
  

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', padding: '20px' }}>
    <div style={{ textAlign: 'center', marginLeft: '20px' }}>
    <img src={userData.avatarUrl} alt="User Avatar" style={{ width: '400px', borderRadius: '50%', marginTop: '20px' }} />
    <br/>
    <h1 style={{  padding: '7px', display: 'inline-block', marginTop: '35px', fontSize:'50px'}}>
      {userData.name}
    </h1>
    </div>

  <div style={{ marginLeft: '250px', marginTop: '20px' }}>
    <div style={{ marginTop: '8px' }}>
      <h1 style={{fontSize: '50px'}}>MBTI: {userData.mbti}</h1>
    </div>
    <div>
      <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', fontSize: '20px'}}>

        {userData.Sports.map((tag, index) => (
          <p key={index} style={{ margin: '5px 0',border: '2px solid black', padding: '7px',borderRadius:'10px 10px',marginTop: '35px',width:'fit-content', marginRight: '8px'}} >{tag}</p>
        ))}
      </ul>
      <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', fontSize: '20px'}}>

        {userData.Movies.map((tag, index) => (
          <p key={index} style={{ margin: '5px 0',border: '2px solid black', padding: '7px',borderRadius:'10px 10px',marginTop: '35px',width:'fit-content', marginRight: '8px'}} >{tag}</p>
        ))}
      </ul>
      <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', fontSize: '20px'}}>

        {userData.Foods.map((tag, index) => (
          <p key={index} style={{ margin: '5px 0',border: '2px solid black', padding: '7px',borderRadius:'10px 10px',marginTop: '35px',width:'fit-content', marginRight: '8px'}} >{tag}</p>
        ))}
      </ul>

    </div>
    <div style={{ marginTop: '32px', fontSize: '50px', }}>
      <Button theme="large" onClick={handleNextClick}>Go Chat!</Button>
    </div>
  </div>
</div>
  );
}

export default UserPage;
