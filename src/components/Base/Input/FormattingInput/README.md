# ⌨️ FormattingInput

포맷팅 인풋은 블록 단위로 구분자를 두어서, 자유롭게 커스터마이징할 수 있는 강력한 컴포넌트입니다.

본래 `Quasar`에서 컴포넌트를 쓸 때, 동적 마스킹이 되지 않아 불편해서 만든 컴포넌트에요.

해당 컴포넌트는 다음을 지원해요.

- 복사/붙여넣기 가능: 복사와 붙여넣기를 해도 커서의 위치가 잘못되지 않아요.
- prefix 기능: 맨 앞에 붙일 고정 문자를 지원해요.
- delimeter 기능: 구분자를 자유롭게 설정하고 싶을 때, 사용할 수 있어요.
- masking 동적 지원: 가장 강력한 기능입니다. 동적으로 마스킹을 동작해도, 끊김없이 자유롭게 설정할 수 있어요.
- 구분자를 지울 때 위치만 변경: 커서를 지우며 이동할 때, 구분자를 포함하여 2칸씩 이동하는 것이 좋지 않다고 생각했어요. 유저 입장에서는 '2번 지워야 하는 것 아닌가'할 수 있거든요. 따라서 구분자의 뒤에서 지울 시, 앞으로만 이동할 수 있도록 지원했습니다.

## 사용법

### 이벤트

인풋에서, 가끔 값을 가져와야 할 때가 있어요.  
`FormattingInput`에서는 값을 2가지 방식으로 가져올 수 있어요.

- `update:model-value`: **구분자를 포함한 값**을 가져와요.
- `update:row-value`: **순수 입력한 값**만 가져와요.

### 타입

- `modelValue`: 기본 값을 넣어요. **2가지의 emit 이벤트**를 통해 가져올 수 있습니다.
- `prefix`: 맨 앞에 기본적으로 붙이는 문자를 지원해요.
- `delimeter`: 구분자를 지원해요. <br/>🚨 다만 **절대** 문자와 혼합되지 않도록 주의하세요! <br/> 이를 지원하지만, 원하지 않는 결과가 나올 수 있어요.
- `blocks`: 나와야 할 개수를 블록 단위로 쪼개서 주입해요. <br/> 예컨대 3-3-4글자로 나눠야 한다면 `[3,3,4]`에요. 만약 사용하고 싶지 않다면, `[Infinity]`로 입력해주세요.
- `number`: 넘버 타입만 입력할 수 있도록 해요.
- `autoFocus`: 오토포커스 기능을 지원해요.
- `width`: 너비 값을 설정할 수 있어요.
- `height`: 높이값을 설정할 수 있어요.
- `padding`: Input 내부의 패딩을 설정할 수 있어요.
- `fontSize`: Input 내부의 폰트 크기를 설정할 수 있어요.
- `color`: 폰트 색상을 지정해줄 수 있어요.
- `border`: 보더의 속성을 지정해줄 수 있어요.
- `borderRadius`: Input의 외곽을 설정해줄 수 있어요.
- `outlineColor`: Focus되었을 때 outline의 색상 설정이 가능해요.

### 기본값

```js
import globalCSS from '@/utils/globalCSS';

export const defaultFormattingInputProps = {
  modelValue: '',
  blocks: [Infinity],
  delimeter: '',
  prefix: '',
  number: false,
  autoFocus: false,
  width: '300px',
  height: '2.5rem',
  padding: '0 0.5rem',
  fontSize: globalCSS.fontSize.l,
  color: globalCSS.fontSize.textsub,
  border: globalCSS.color.sub,
  borderRadius: globalCSS.borderRadius.soft,
  outlineColor: globalCSS.color.default,
};
```
