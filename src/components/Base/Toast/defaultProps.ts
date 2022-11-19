import { ToastStyletype, ToastType } from './types';

export const defaultToastsProps = {
  direction: 'top right',
  gap: '2rem',
  isTransition: true,
  transitionDuration: 0.3,
  toastStyle: 'float',
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
