//import { ViewConfig } from '@hilla/hilla-file-router/types.js';
import { Button } from '@hilla/react-components/Button.js';
import React from 'react';

/*export const config: ViewConfig = {
    menu: { order: 4, icon: 'line-awesome/svg/globe-solid.svg' },
    title: 'User Page',
  };*/

function UserPage() {

  const userData = {
    name: 'Gwen Stacy',
    mbti: 'ISTP',
    avatarUrl:'images/girl.jpg',
    tags: ['Basketball','Horror Movie' ,'Japanese Cuisine']
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div><img src={userData.avatarUrl} alt="User Avatar" style={{ width: '300px', borderRadius: '50%' }} /></div>
      
      <h1 style={{ border: '2px solid black', padding: '7px', display: 'inline-block' }}>
      {userData.name}
    </h1>
    <div style={{ marginTop: '8px' }}>
  <h2>MBTI: {userData.mbti}</h2>
  </div>
      
      <div>
        <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', justifyContent: 'center' }}>
          {userData.tags.map((tag, index) => (
            <p key={index} style={{ margin: '0 5px' }}>{tag}</p>
          ))}
        </ul>
      </div>
      <div style={{ marginTop: '25px', fontSize: '14px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
      <Button theme = "large">Chat Now!</Button>
      </div>
    </div>
  );
}

export default UserPage;
