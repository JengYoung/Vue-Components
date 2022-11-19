import { ToastStyletype, ToastType } from './types';

export const defaultToastsProps = {
  direction: 'top right',
  gap: '2rem',
  isTransition: true,
  toastStyle: 'float',
  width: '20rem',
  height: '3rem',
} as const;

interface ToastPropsType {
  type: ToastType;
  content: string;
  showTime: number;
  toastStyle: ToastStyletype;
}

export const defaultToastProps: ToastPropsType = {
  type: 'info',
  content: '',
  showTime: 5,
  toastStyle: 'float',
} as const;
