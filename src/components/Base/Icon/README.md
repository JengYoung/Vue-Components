# 🫥 Icon

아이콘 컴포넌트는 간단하게 이미지를 불러와서 사용하기 위한 컴포넌트입니다.
기존 이미지 컴포넌트와의 차이라면, 주로 프로필 사진이나 아바타에 최적화된, 정사각형의 이미지를 출력합니다.

> 현재는 아직 이미지만 지원하지만, 추후 다양한 확장자를 고려하고 있습니다.

## 사용법

- 정사각형이기 때문에 `width`나 `height`를 쓰지 않습니다. 오직 `size`만 사용합니다.

- 기본적으로 일관적인 디자인을 위해 `borderRadius`를 유지해주세요. (이왕이면 `globalCSS`에서 `borderRadius`의 형식을 따를 것을 권장합니다.)

- 선의 속성 역시 지정 가능합니다. `strokeWidth`, `strokeColor`을 통해 두께와 색상을 조정해보세요!

### 타입

다음과 같은 기본값을 갖고 있어요.

````js
import globalCSS from '@/utils/globalCSS';

export const defaultIconProps = {
  src: '',
  alt: 'ananymous-icon',
  size: '32px',
  strokeWidth: '1px',
  strokeColor: globalCSS.color.sub,
  round: true,
};```
````

`props`의 타입은 다음과 같습니다.

```js
props: {
  src: {
    type: String,
    default: defaultIconProps.src,
    required: true,
  },
  alt: {
    type: String,
    default: defaultIconProps.alt,
    required: true,
  },
  size: {
    type: String,
    default: defaultIconProps.size,
    required: true,
  },
  strokeWidth: {
    type: String,
    default: defaultIconProps.strokeWidth,
  },
  strokeColor: {
    type: String,
    default: defaultIconProps.strokeColor,
  },
  round: {
    type: Boolean,
    default: defaultIconProps.round,
  },
}
```
