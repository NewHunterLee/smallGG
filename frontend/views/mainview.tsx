import { FormLayout } from '@hilla/react-components/FormLayout.js';
import { TextField, TextFieldChangeEvent } from '@hilla/react-components/TextField.js';
import { PasswordField } from '@hilla/react-components/PasswordField.js';
import { Button } from '@hilla/react-components/Button.js';
import { useNavigate, useParams } from 'react-router-dom';
import { TabSheet } from "@hilla/react-components/TabSheet.js";
import { Tab } from '@hilla/react-components/Tab.js';
import { Tabs } from '@hilla/react-components/Tabs.js';
import { useEffect, useState } from 'react';
import { Dialog } from '@hilla/react-components/Dialog.js';
import { ProgressBar } from '@hilla/react-components/ProgressBar.js';
import { Icon } from '@hilla/react-components/Icon.js';
import MessageRecord from 'Frontend/generated/com/example/application/data/service/ChatService/MessageRecord';
import { ChatEndPoint } from 'Frontend/generated/endpoints';
import { MessageInput } from '@hilla/react-components/MessageInput.js';
import { MessageList } from '@hilla/react-components/MessageList.js';


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
            Sports: ['Basketball','Soccer' ,'Badminton'],
            Movies: ['Sci-fi', 'Action'],
            Foods: ['Hot Pot', 'Barbecue']
        };

        const [dialogOpened, setDialogOpened] = useState(false);
        const [dialogContent, setDialogContent] = useState('initial');
        const [dialogOpenedNoMatch, setDialogOpenedNoMatch] = useState(false);

        const handleGoClick = () => {
            setDialogContent('changed');  
            setTimeout(() => {
            navigate('../MatchedUser');
            }, 5000);  
        };

        const dialogOpened_ai = () => {  
          navigate('../mainview'); 
      };

    const { roomId , username} = useParams<Record<string, string>>();
    const [messages, setMessages] = useState< MessageRecord[]>([]);
    const [message, setMessage] = useState('');

    console.log("useParams:", useParams<Record<string, string>>());
  useEffect(() => {
    if (roomId) {
      const subscription = ChatEndPoint.joinChatRoom(Number(roomId)).onNext(msg => {
        setMessages((prevState) => [...prevState, msg]);
      });
      
      return () => subscription.cancel();
    }
    // In case roomId is undefined, return an empty cleanup function
    return () => {};
  }, [roomId]);

  function sendMessage(message: string) {
    if (roomId) {
      ChatEndPoint.sendMessage(Number(roomId), String(username), message);
      setMessage('');
    }
}
function handleInput(e: TextFieldChangeEvent) {
    setMessage(e.target.value);
  }


  const messageListItems = messages.map((msg) => ({
    text: msg.content,
    userName: msg.username?msg.username:'unknown',
    time: msg.timestamp ? msg.timestamp.toString() : 'Unknown time', // Ensure this is a string
  }));

    

    return(

    <TabSheet>
        <Tabs slot="tabs">
          <Tab id="userpage-tab">UserPage</Tab>
          <Tab id="match-tab">Matched</Tab>
          <Tab id="chat-tab">ChatRoom</Tab>
          <Tab id="AI-chat-tab">AI ChatRoom</Tab>
        </Tabs>

        <div {...{ tab: 'userpage-tab' }}>
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
          <Button theme="large" onClick={handleNextClick}>Modify your profile</Button>
        </div>
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
            
            <Dialog
              headerTitle="No one matched"
              opened={dialogOpenedNoMatch}
              onOpenedChanged={({ detail }) => setDialogOpenedNoMatch(detail.value)}
              footerRenderer={() => (
                <>
                  <Button theme="primary" onClick={dialogOpened_ai}>Chat with AI</Button>
                  <Button theme="large" onClick={() => setDialogOpenedNoMatch(false)}>Close</Button>
                </>
              )}
            >
              <div style={{ textAlign: 'center', minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <h2>Chat with AI?</h2>
              </div>
            </Dialog>
        
            <div style={{ marginTop: '25px', fontSize: '14px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <Button theme="large" onClick={() => setDialogOpened(true)}>Find Someone Matched</Button>
            </div>
            </div>
            </div>

            <div {...{ tab: 'chat-tab' }}>
            <div className="flex flex-col p-m box-border h-full">
            <MessageList items={messageListItems} className="flex-grow" />
            <MessageInput onSubmit={e=>sendMessage(e.detail.value)} />
            </div>
            </div>

            <div {...{ tab: 'AI-chat-tab' }}>
            <div className="p-m flex flex-col h-full box-border">
          <MessageList items={messages} className="flex-grow"/>
          <MessageInput value={inputValue}
          onInput={(e) => setInputValue(e.target.value)}
          onSubmit={e => {
            sendMessage(inputValue);
            setInputValue("");
          }}
          />
      </div>
            </div>
    </TabSheet>
    );
}