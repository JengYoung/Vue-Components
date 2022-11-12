import scssVars from '@css/global.scss';

interface GlobalCSSInterface {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  [key: string]: any;
}

const globalCSS: GlobalCSSInterface = {};

Object.entries(scssVars).forEach(([key, value]) => {
  const dashIndex = key.indexOf('-');
  if (dashIndex < 0) {
    globalCSS[key] = value;
  } else {
    const prefix = key.slice(0, dashIndex);
    const cssVar = key.slice(dashIndex + 1);
    globalCSS[prefix] = globalCSS[prefix] ?? {};
    globalCSS[prefix][cssVar] = value;
  }
});

export default globalCSS;
