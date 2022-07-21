import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Components/Routes';
import NotificationContext, {
  Notification,
  defaultNotification,
} from './context/NotificationContext';
import { Alert } from '@mui/material';
//@ts-ignore
const NotificationWrapper: FC<any> = ({ children }) => {
  const [notification, setNotification] = useState<Notification | null>();
  const setNotificationState = (
    notification: Notification = defaultNotification,
  ) => {
    setNotification(notification);
    setTimeout(() => {
      setNotification(null);
    }, 10000);
  };
  return (
    <NotificationContext.Provider value={setNotificationState}>
      {notification ? (
        // eslint-disable-next-line react/jsx-no-undef
        <Alert variant="filled" severity={notification.type}>
          {notification.content}
        </Alert>
      ) : (
        ''
      )}

      {children}
    </NotificationContext.Provider>
  );
};
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <NotificationWrapper>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </NotificationWrapper>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
