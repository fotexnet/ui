# Table of content

- [Table of content](#table-of-content)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Package contents](#package-contents)
  - [Components](#components)
    - [Header](#header)
    - [Breadcrumbs](#breadcrumbs)
  - [Hooks](#hooks)
    - [useFormUtils](#useformutils)
    - [useMediaQuery](#usemediaquery)
    - [usePrevState](#useprevstate)
    - [useStorage](#usestorage)
    - [useTextShortener](#usetextshortener)
    - [useToggle](#usetoggle)
  - [Utility](#utility)
    - [createLayout](#createlayout)

# Prerequisites

1. You must use Node 14 or higher
2. In your project, you must have react installed since react is a peer dependency (16 or higher)
3. Create a [Personal Access Token (classic)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-personal-access-token-classic)
4. Select `repo`, `workflow`, `write:packages` and `delete:packages` scopes
5. Setup a global `~/.npmrc` file with the following line where `TOKEN` equals to your PAT you just created: `//npm.pkg.github.com/:_authToken=TOKEN`

# Installation

1. In your project, setup a local `.npmrc` file with the following line: `@fotexnet:registry=https://npm.pkg.github.com`
2. Install the package using `yarn add @fotexnet/ui`

# Package contents

## Components

### Header

```typescript
type HeaderProps = {
  Logo?: JSX.Element;
  backgroundColor?: string;
} & { children?: ReactNode };
```

| property          | type        | required | default | description                                                                                        |
| ----------------- | ----------- | -------- | ------- | -------------------------------------------------------------------------------------------------- |
| `Logo`            | `Element`   | No       | -       | Sets the element on the left side of the flexbox                                                   |
| `backgroundColor` | `string`    | No       | -       | Sets the background color. Accepts classes and css colors, but not css strings such as `aliceblue` |
| `children`        | `ReactNode` | No       | -       | Sets the child elements in the right side of the flexbox                                           |

### Breadcrumbs

```typescript
interface IBreadcrumbsProps {
  url: string;
  map?: Map<string, string>;
}
```

| property | type                  | required | default | description                                                                            |
| -------- | --------------------- | -------- | ------- | -------------------------------------------------------------------------------------- |
| `url`    | `string`              | Yes      | -       | Splits up the url by `/` and creates an array of breadcrumbs. Uses the parts as labels |
| `map`    | `Map<string, string>` | No       | -       | If present, parses the breadcrumb array to use the corresponding label in the map      |

## Hooks

### useFormUtils

### useMediaQuery

### usePrevState

### useStorage

### useTextShortener

### useToggle

## Utility

### createLayout

| argument   | type        | required | default | description                     |
| ---------- | ----------- | -------- | ------- | ------------------------------- |
| `parts`    | `Element[]` | Yes      | -       | Layout elements in order        |
| `position` | `number`    | Yes      | -       | Position of the wrapped element |

```jsx
const withLayout = createLayout([<div>Header</div>, <div>Footer</div>], 1);
const Page = withLayout(() => <div>Main</div>);

/*
Result:

<>
  <div>Header</div>
  <div>Main</div>
  <div>Footer</div>
</>
*/
```
