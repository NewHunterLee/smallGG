import ContactsView from 'Frontend/views/contacts/ContactsView';
import MainLayout from 'Frontend/views/MainLayout';
import { lazy } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import {ChatRoomList} from './views/ChatRoomList';
import {ChatView} from './views/ChatView';
import LoginRegister from './views/LoginRegister';
import PickLabelView from './views/PickUserLablel';
import UserPage from './views/MatchedUser';
import Match from './views/matchview';
import Mainview from './views/mainview';

export const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    handle: { title: 'Hilla CRM' },
    children: [
      { path: '/', element: <ChatRoomList/>, handle: { title: 'list' } },
      { path: '/matchview', element: <Match />, handle: { title: 'Match' } },
      { path: '/chat/:roomId/:username', element: <ChatView /> ,handle: { title: 'chatroom' }}, 
      { path: '/LoginRegister', element: <LoginRegister /> ,handle: { title: 'login' }}, 
      { path: '/PickUserLablel', element: <PickLabelView /> ,handle: { title: 'User Label' }},
      { path: '/MatchedUser', element: <UserPage /> ,handle: { title: 'Matched User Page' }}, 
      { path: '/mainview', element: <Mainview /> ,handle: { title: 'main page' }},
    ],
  },
];

export default createBrowserRouter(routes);
