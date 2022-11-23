# JengYoung's Vue-Design-System

> 일관성 있게 컴포넌트를 제작하며 개발하기 위해 만든 레포지토리입니다.

일관된 컨벤션 하에, 디자인 시스템을 정의하며 컴포넌트를 일관성 있게 개발해요.  
쉽게 재사용할 수 있으며, `Vue3`를 지원하는 UI 컴포넌트 라이브러리를 구축하고 있습니다. 🥰

## 개발 기간

2022.02.15 ~ (진행 중)

> 현재 이 글은 2022.11.18 기준 업데이트되고, 작성되었습니다.

---

## 목표

- `Vue 3`에서 달라진 문법들을 이해하고 적용합니다.
- 컴포넌트는 한 번 만들기만 하면 어느 프로젝트에서든 재사용성이 매우 높습니다. 궁금한 컴포넌트가 있으면 미리 구현합니다.
- `element plus`, `chakra-UI`, `material UI` 등 다양한 컴포넌트 라이브러리가 있습니다.  
  그러나 이를 사용하기 위해서는 내부 원리 역시 이해해야 합니다.  
  컴포넌트를 만들며 내부 동작 원리를 생각할 수 있는 힘을 기릅니다.

---

## 현재 가능한 컴포넌트 README

- [Base/Toast](./src/components/Base/Toast/README.md)
- [Base/Carousel](./src/components/Base/Carousel/README.md)
- [Base/Image](./src/components/Base/Image/README.md)
- [Base/Icon](./src/components/Base/Icon/README.md)
- [Base/Button/Hamburger](./src/components/Base/Button/Hamburger/README.md)
- [Base/Input/FormattingInput](./src/components/Base/Input/FormattingInput/README.md)

## 현재 개발한 컴포넌트

> 여유가 생기면, 리드미를 업데이트할 예정이에요!
> 대부분이 스토리북의 `Docs`에서, 충분히 속성들에 대해 잘 설명되어져 있어요. 참고해주세요 🥰

- [Base/Slider](./src/components/Base/Slider/index.vue)
- [Base/Menu](./src/components/Base/Menu/Menu.vue)
- [Base/Tabs](./src/components/Base/Tabs/index.vue)
- [Base/Toggle](./src/components/Base//Toggle/index.vue)
- [Base/HeaderText](./src/components/Base/HeaderText.vue)
- [Layout/Sidebar](./src/components/Layout/Sidebar/Sidebar.vue)

---

## 사용 기술 스택

<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">

<img src="https://img.shields.io/badge/vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white">

<img src="https://img.shields.io/badge/storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white">

---

## 컨벤션

- 선택자 명명에 관한 표기법은 기본적으로 `BEM`을 따릅니다.
- 커밋 메시지 컨벤션은 [해당 문서](./.github/git-commit-message.txt)를 참조합니다. 이는 `git commit` CLI를 통해 간편하게 커밋 시 볼 수 있습니다.

### 컴포넌트

- 일관성을 위해 다음과 같이 [기본 전역 스타일](./src/css/vars.module.scss)을 설정합니다. 이를 스타일 정의의 원천으로 삼습니다.
- `props`들은 컴포넌트 모듈의 같은 레벨에서 타입스크립트로 정의합니다. 이는 스토리북에서도 공통으로도 쉽게 적용하기 위함입니다.
- 컴포넌트는 일반적으로 **`Container`라는 가장 최상위 엘리먼트**가 Wrapping되어 있다고 명명합니다. 이는 외부구조를 설정합니다.
- `Container`의 바로 아래에는 `Inner`가 있습니다. 이는 내부의 전체 구조를 정의합니다.
- 간혹 너무 컴포넌트가 작아서, 이를 따를 필요가 없다고 생각할 수 있습니다.  
  (이를테면 `Icon`이 있습니다.) 그럴 때에는 `Inner`을 선택적으로 제거해도 무방합니다.
- `grid`가 아닌 `flex`를 사용합니다. 좀 더 유연하게 레이아웃을 설계하고 개발을 진행합니다.
- `rem`과 `px`을 따로 가리진 않습니다. 다만 `1rem`은 `16px`입니다.

#### `Container` (Essential, equal to Comopnent's Root)

- 컨테이너의 레벨의 최소 단위는 다음과 같습니다.
  1. **32px 이상**: `0.25rem(4px)`
  2. **32px 미만**: `0.125rem(4px)`
- 컨테이너의 클래스 명은 컴포넌트의 이름으로 정합니다.
- 자식 클래스 명의 `BEM`은 컨테이너를 따릅니다.
  > `button__text` (o)  
  > `inner__text` (x)

#### `Inner` (Optional)

- `inner` 아래의 모든 자식 엘리먼트의 최소 단위는 `0.125rem`로 합니다.
- `Inner`의 클래스 명은 `[[컴포넌트명]]__inner`으로 정합니다.

#### `Storybook`

- 항상 `description`을 습관화합니다. 초보자가 보아도 특징을 알 수 있도록 설명합니다.

- 다음과 같이 `Snippet`을 사용하여 템플릿화합니다. 기본적인 스토리북 작성 컨벤션은 이 스니펫을 원천으로 삼습니다.

```json
{
  "Vue3 Storybook Default Format": {
    "prefix": "vstrc",
    "body": [
      "import type { Meta, StoryFn } from '@storybook/vue3';",
      "import ${STORYBOOK_COMPONENT} from './${STORYBOOK_COMPONENT}.vue;",
      "",
      "// https://github.com/storybookjs/storybook/issues/17932",
      "// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export",
      "export default {",
      "  title: `${STORYBOOK_NAME}`,",
      "  component: { ${STORYBOOK_COMPONENT} },",
      "  // More on actions: https://storybook.js.org/docs/react/essentials/actions",
      "  parameters: { actions: { argTypesRegex: '^on.*' } },",
      "",
      "  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes",
      "  argTypes: {",
      "  },",
      "} as Meta<typeof ${STORYBOOK_COMPONENT}>;",
      "",
      "// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args",
      "const Template: StoryFn<typeof ${STORYBOOK_COMPONENT}> = (args) => ({",
      "  // Components used in your story `template` are defined in the `components` object",
      "  components: { ${STORYBOOK_COMPONENT} },",
      "  // The story's `args` need to be mapped into the template through the `setup()` method",
      "  setup() {",
      "  },",
      "  // And then the `args` are bound to your component with `v-bind=\"args\"`",
      "  template: `",
      "    <${STORYBOOK_COMPONENT} v-bind=\"args\" />",
      "  `,",
      "});",
      "",
      "export const Default = Template.bind({});",
      "// More on args: https://storybook.js.org/docs/vue/writing-stories/args",
      "Default.args = {};",
      ""
    ],
    "description": "Vue3 Storybook Default Format"
  }
}
```
