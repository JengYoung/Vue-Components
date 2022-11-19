export interface ToastInterface {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  content: string;
  showTime: number;
}
