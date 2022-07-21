import { createContext } from 'react';

export interface Notification {
  content: string;
  type: 'info' | 'warning' | 'error' | 'error';
}

export const defaultNotification: Notification = {
  type: 'error',
  content: 'Something went wrong!!!!',
};

export default createContext<any>(null);
