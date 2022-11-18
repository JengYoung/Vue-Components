import globalCSS from '@/utils/globalCSS';

export const defaultProps = {
  /**
   * @inner belows are omitted props
   * - target: must use selector to react by click event(required)
   */
  modelValue: false,

  width: '6.25rem',
  fontSize: '1rem',

  borderRadius: globalCSS.borderRadius.soft,
  borderColor: globalCSS.color.sub,

  isShadowed: true,
  isClickOutSide: true,
  boxShadow: `0px 0.5px 2px 1px ${globalCSS.color.sub}`,
};
