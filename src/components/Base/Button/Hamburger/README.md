# 🍔 Hamburger

햄버거는 주로 **`Sidebar`**와 함께 사용하기 위한 버튼입니다.
그 외에도 열고 닫는 것에 대해 유저가 인지하기 좋은 컴포넌트입니다.

## 사용법

### `Hamburger`은 외부의 상태에 의존합니다.

`actived` props로 값을 주입해주세요!  
`computed`를 통해 햄버거 컴포넌트가 반응할 것입니다.

### 반대로, 업데이트할 때는 `update:closed`로 값을 업데이트 해주세요.

`actived` 값을 통해 제어하기 때문에 완전히 외부 상태에 의존하고 있어요.  
따라서, 이를 지원하고자 `emit`을 지원합니다.

---

### 기본값

기본값은 다음과 같습니다.

```js
import globalCSS from '@/utils/globalCSS';

export const defaultHamburgerProps = {
  width: '24px',
  height: '18px',
  margin: '1rem',
  lineHeight: '2px',
  strokeColor: globalCSS.color.sub700,
  actived: false,
  fixed: false,
};
```

기타 자세한 것은, Storybook의 `Layout/Sidebar/Docs`를 통해 확인해주세요!

<div style="display: none;">TODO: 스토리북에 햄버거 버튼 역시 추가한다.</div>
