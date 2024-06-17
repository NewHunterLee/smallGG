import { FormLayout } from '@hilla/react-components/FormLayout.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { PasswordField } from '@hilla/react-components/PasswordField.js';
import { Button } from '@hilla/react-components/Button.js';
import { useNavigate } from 'react-router-dom';
import { TabSheet } from "@hilla/react-components/TabSheet.js";
import { Tab } from '@hilla/react-components/Tab.js';
import { Tabs } from '@hilla/react-components/Tabs.js';
import { useState } from 'react';
import { Dialog } from '@hilla/react-components/Dialog.js';
import { ProgressBar } from '@hilla/react-components/ProgressBar.js';


export default function LoginView() {
    const responsiveSteps = [
        { minWidth: '100px', columns: 1 },
      ];
    
      const navigate = useNavigate();
    
        const handleNextClick = () => {
          navigate('../ModifyProfile'); 
        };

        const LoginClick = () => {
            navigate('../matchview'); 
          };

        const FailLoginClick = () => {
            setDialogOpened(true);
          };


        const userData = {
            name: 'Miles Morales',
            mbti: 'ENFP',
            avatarUrl:'images/boy.jpg',
            tags: ['Basketball','Sci-Fi Movie' ,'Italian Cuisine']
        };

        const [dialogOpened, setDialogOpened] = useState(false);
        const [dialogContent, setDialogContent] = useState('initial');  // 狀態變量來管理對話框內容

        const handleGoClick = () => {
            setDialogContent('changed');  
            setTimeout(() => {
            navigate('../MatchedUser');
            }, 5000);  
        };

    return(

    <TabSheet>
        <Tabs slot="tabs">
          <Tab id="userpage-tab">UserPage</Tab>
          <Tab id="match-tab">Matched</Tab>
          <Tab id="chat-tab">ChatRoom</Tab>
          <Tab id="AI-chat-tab">AI ChatRoom</Tab>
        </Tabs>

        <div {...{ tab: 'userpage-tab' }}>
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
            <Button theme = "large" onClick={handleNextClick}>Modify your profile</Button> 
            </div>
            </div>
            </div>

            <div {...{ tab: 'match-tab' }}>
            <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
            <img style={{ width: '500px' }} src="images/MBTIHEAD.jpg" />
      
            <Dialog
                headerTitle=""
                opened={dialogOpened}
                onOpenedChanged={({ detail }) => {
                setDialogOpened(detail.value);
                }}
                footerRenderer={() => (
                <>
                {dialogContent === 'initial' ? (
                <Button theme="primary" onClick={handleGoClick}>Go</Button>
                ) : (
                <Button theme="primary" onClick={() => setDialogOpened(false)}>Close</Button>
                )}
                <Button onClick={() => setDialogOpened(false)}>Cancel</Button>
                </>
            )}
            >

            <div style={{ textAlign: 'center', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            {dialogContent === 'initial' ? (
                <>
                <h2>Are you Ready to find Someone matched?</h2>
                <p>Only one time per day</p>
                <img style={{ width: '200px' }} src="images/only-one.jpg" />
                </>
            ) : (
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', minHeight: '200px' }}>
                <h2>Searching...</h2>
                <p>Wait a second</p>
                <ProgressBar indeterminate style={{ width: '80%' }} />
                </div>
            )}
            </div>
            </Dialog>
        
            <div style={{ marginTop: '25px', fontSize: '14px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <Button theme="large" onClick={() => setDialogOpened(true)}>Find Someone Matched</Button>
            </div>
            </div>
            </div>
    </TabSheet>
    );
}