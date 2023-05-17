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
    - [mergeMap](#mergemap)

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

Creates a higher-order component. The created layout has a wrapper `div` for further configuration. The main content (aka the component you want to wrap) also has a wrapper `main` for further configuration.

**Signature:** `(parts: JSX.Element[], position: number, options?: CreateLayoutOptions) => HigherOrderComponent`

| argument   | type                  | required | default | description                      |
| ---------- | --------------------- | -------- | ------- | -------------------------------- |
| `parts`    | `Element[]`           | Yes      | -       | Layout elements in order         |
| `position` | `number`              | Yes      | -       | Position of the wrapped element. |
| `options`  | `CreateLayoutOptions` | No       | -       | -                                |

You can pass each individual `part` of your layout as an array **IN ORDER** for the first argument and pass a `position` that indicates the function where to insert the content of your layout. This `position` can be anything except negative. If it exceeds the array length, then the content will be pushed at the end, otherwise the current `part` on the specified index will be pushed back once and the content will take it's place.

**Example:**

```jsx
const withLayout = createLayout([<div>Header</div> /* index: 0 */, <div>Footer</div> /* index: 1 */], 1);
const Page = withLayout(() => <div>Main</div>);

/* 
  Result:
  [
    <div>Header</div>, // index: 0
    <div>Main</div>,   // index: 1
    <div>Footer</div>  // index: 2
  ]
*/
```

**HigherOrderComponent:** `<TProps extends object>(Component: React.ComponentType<TProps>) => React.FC<TProps>`

**CreateLayoutOptions**

| argument         | type            | required                                    | default | description |
| ---------------- | --------------- | ------------------------------------------- | ------- | ----------- |
| `wrapperClasses` | `string`        | No                                          | -       |             |
| `mainClasses`    | `string`        | No                                          | -       |             |
| `content`        | `JSX.Element[]` | Yes if `position` is present. No by default | -       |             |
| `position`       | `number`        | Yes if `content` is present. No by default  | -       |             |

### mergeMap

This utility merges 2 maps of the same type. The first argument is the **base** where the submission will be merged into. It will override any `key-value` pair that already exist!

**Signature:** `<T extends Map<unknown, unknown>>(baseMap: T, submittedMap: T) => T`

| argument       | type    | required | default | description                                                   |
| -------------- | ------- | -------- | ------- | ------------------------------------------------------------- |
| `baseMap`      | generic | Yes      | -       | Will be cloned and used for base `Map`                        |
| `submittedMap` | generic | Yes      | -       | Will be merged into `baseMap` and override any existing value |

```typescript
// Example of merging

const baseMap = new Map<string, string>([
  ['a', '1'],
  ['b', '2'],
  ['c', '3'],
]);

const submittedMap = new Map<string, string>([
  ['d', '1'],
  ['e', '2'],
  ['f', '3'],
]);

const map = mergeMap(baseMap, submittedMap);
/*
  Result:
  [
    ['a','1'],
    ['b','2'],
    ['c','3'],
    ['d','1'],
    ['e','2'],
    ['f','3']
  ]
*/
```

```typescript
// Example of overriding

const baseMap = new Map<string, string>([
  ['a', '1'],
  ['b', '2'],
  ['c', '3'],
]);

const submittedMap = new Map<string, string>([
  ['a', '3'],
  ['d', '4'],
]);

const map = mergeMap(baseMap, submittedMap);
/*
  Result:
  [
    ['a','3'],
    ['b','2'],
    ['c','3'],
    ['d','4']
  ]
*/
```
