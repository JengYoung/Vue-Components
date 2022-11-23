# 🫥 Icon

이미지 컴포넌트는 lazy하게 불러오는 기능을 지원하고 있어요!

> 현재는 아직 이미지만 지원하지만, 추후 다양한 확장자를 고려하고 있습니다.

## 사용법

이 친구는 `Next.js`의 `Next/Image`처럼 넘버 타입으로도 받을 수 있도록 지원해요. 이때의 단위는 `px`입니다.  
아래 제시한 둘의 결과는 같아요.

```vue
<template>
  <Image :width="100" />
  <!-- correct, 100px -->

  <Image width="100px" />
  <!-- correct -->
</template>
```

### `lazy` 기능

특정 뷰포트에 올 때까지 업로드를 하지 않음으로써, 최적화가 가능해요.
이를 위해 다음 옵션이 있어요.

- `lazy`: 레이지 로딩 여부를 결정합니다.
- `threshold`: 뷰포트에서 얼마나 보여질 때, 로드할지를 결정해요. 넘버 타입이며, `0 ~ 1`까지 조정 가능해요. `1`은 레이아웃 기준으로 했을 때 다 보여질 때를 의미하고, `0`은 보이지 않다가 뷰포트에 딱 들어설 때 로드됩니다.
- `defaultSrc`: 만약 보이는 게 느리다면, 유저 입장에서 기분 나쁠 수 있어요. 따라서 기본적으로 보여줄 사진을 정의할 수 있어요.
- `width`: 너비를 결정해요.
- `height`: 높이를 결정해요.

> 그 외에도 다양한 옵션이 있어요. 스토리북에서 `Base/Image/Lazy`를 참고해주세요!

### 🚨 주의사항

레이지 로딩의 원리는 일정 너비가 주어졌을 때, 사진이 뷰포트에 들어가 있는지를 통해 로드를 결정하는 거에요.

따라서 만약에 이미지의 일정 너비가 주어져 있지 않다면, 기본적으로 height: 0px;로 잡아버리기 때문에 이미지의 `lazy loading`이 제대로 적용되지 않습니다.

> **따라서 반드시! lazy를 true로 했다면, width와 height를 설정해주세요.**

### 타입

다음과 같은 기본값을 갖고 있어요.

```js
export const defaultImageProps = {
  display: 'block',
  width: 'auto',
  height: 'auto',
  src: '',
  objectFit: 'cover',
  defaultSrc: '',
  threshold: 0,
  lazy: true,
  alt: '',
};
```

`props`의 타입은 다음과 같습니다.

```js
props: {
  display: {
    type: String,
    default: defaultImageProps.display,
  },
  lazy: {
    type: Boolean,
    default: defaultImageProps.lazy,
  },
  threshold: {
    type: Number,
    default: defaultImageProps.threshold,
  },
  src: {
    type: String,
    default: defaultImageProps.src,
  },
  alt: {
    type: String,
    default: defaultImageProps.alt,
  },
  width: {
    type: [String, Number],
    default: defaultImageProps.objectFit,
  },
  height: {
    type: [String, Number],
    default: defaultImageProps.objectFit,
  },
  defaultSrc: {
    type: String,
    default: defaultImageProps.objectFit,
  },
  objectFit: {
    type: String,
    default: defaultImageProps.objectFit,
  },
}
```
