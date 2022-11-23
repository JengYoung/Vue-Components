import globalCSS from '@/utils/globalCSS';

export const defaultSidebarProps = {
  width: '300px',
  headerHeight: '0',
  padding: `${globalCSS.layout.headerheight} 1rem 1rem 1rem`,
  bgColor: globalCSS.color.sub100,
  border: `1px solid ${globalCSS.color.sub}`,
  sidebarClosed: true,
  duration: 0.3,
  isClickAway: false,
};
