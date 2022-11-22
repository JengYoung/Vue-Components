import globalCSS from '@/utils/globalCSS';

export const defaultSliderProps = {
  max: 100,
  min: 0,
  step: 1,
  value: 0,
  width: '100%',
  height: '1rem',
  railColor: globalCSS.color.sub,
  trackColor: globalCSS.color.default,
  handleSize: '16px',
  handleColor: globalCSS.color.white,
  handleActiveColor: globalCSS.color.default,
  padding: '0',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '0px',
};
