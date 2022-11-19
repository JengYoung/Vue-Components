export type ToastType = 'info' | 'success' | 'warning' | 'error';
export type ToastStyletype = 'float' | 'block';

export interface ToastInterface {
  id: string;
  type: ToastType;
  content: string;
  showTime: number;
}
