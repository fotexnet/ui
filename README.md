# Table of content

- [Table of content](#table-of-content)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Package contents](#package-contents)
  - [Components](#components)
    - [Breadcrumbs](#breadcrumbs)
    - [Header](#header)
  - [Hooks](#hooks)
    - [useFormUtils](#useformutils)
    - [useMediaQuery](#usemediaquery)
    - [usePrevState](#useprevstate)
    - [useStorage](#usestorage)
    - [useTextShortener](#usetextshortener)
    - [useToggle](#usetoggle)
  - [Utilities](#utilities)
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

## Hooks

### useFormUtils

### useMediaQuery

Used for checking screen size and orientation. Returns if the screen size matches the given argument.

**Signature:** `(mediaQuery: string) => boolean`
**Returns:** `true` or `false`

| argument     | type     | required | default | description                |
| ------------ | -------- | -------- | ------- | -------------------------- |
| `mediaQuery` | `string` | Yes      | -       | Media query in CSS3 format |

### usePrevState

Used for keep track of the previous state. Returns `undefined` in the first render, then returns the previous state.

**Signature:** `<TState>(state: TState) => TState | undefined`
**Returns:** The previous state

| argument | type     | required | default | description                                 |
| -------- | -------- | -------- | ------- | ------------------------------------------- |
| `state`  | `TState` | Yes      | -       | This is the state you want to keep track of |

### useStorage

Used to store data in your browser. Uses either `localStorage` or `sessionStorage`.

**Signatures:**

- `<TValue = string>(storage: Storage, key: string): StorageObject<TValue>`
- `<TValue>(storage: Storage, key: string, initialValue: TValue): StorageObject<TValue>`

**Returns:** A `StorageObject` object

| argument       | type      | required | default | description                                                  |
| -------------- | --------- | -------- | ------- | ------------------------------------------------------------ |
| `storage`      | `Storage` | Yes      | -       | Possible values are `localStorage` and `sessionStorage`      |
| `key`          | `string`  | Yes      | -       | This is used to indentify the field in your browsers storage |
| `initialValue` | `TValue`  | Yes      | -       | -                                                            |

**StorageObject:**

| argument | type                         | description                                      |
| -------- | ---------------------------- | ------------------------------------------------ |
| `value`  | `TValue`                     | -                                                |
| `update` | `(newValue: TValue) => void` | Updates state and field in your browsers storage |
| `remove` | `() => void`                 | Removes the field from your browsers storage     |

### useTextShortener

**Signature:** `(text: string, limit: number, options?: TextShortenerOptions) => TextShortenerResult`
**Returns:** A `TextShortenerResult` object

| argument  | type                   | required | default | description           |
| --------- | ---------------------- | -------- | ------- | --------------------- |
| `text`    | `string`               | Yes      | -       | A `string` to shorten |
| `limit`   | `number`               | Yes      | -       | Character limit       |
| `options` | `TextShortenerOptions` | No       | -       | -                     |

**TextShortenerOptions:**

| argument          | type                                       | required | default | description                                  |
| ----------------- | ------------------------------------------ | -------- | ------- | -------------------------------------------- |
| `delimiter`       | `string`                                   | Yes      | `...`   | A `string` that the shortened text ends with |
| `tooltipProps`    | `Omit<TooltipProps, 'children' | 'title'>` | Yes      | -       | MUI tooltip API                              |
| `typographyProps` | `Omit<TypographyProps, 'children'>`        | No       | -       | MUI typography API                           |

**TextShortenerResult:**

| argument  | type          | description                                           |
| --------- | ------------- | ----------------------------------------------------- |
| `isShort` | `boolean`     | Determines if the returned `text` is shortened or not |
| `text`    | `string`      | Shortened text                                        |
| `tooltip` | `JSX.Element` | Tooltip element for the `text`                        |

### useToggle

Used for capturing toggle states. Eg. when you want to use a switch or you have a toggle button.

**Signature:** `(initialValue?: boolean) => ToggleObject`
**Returns:** A `ToggleObject` object

| argument       | type      | required | default | description |
| -------------- | --------- | -------- | ------- | ----------- |
| `initialValue` | `boolean` | No       | `false` | -           |

**ToggleObject:**

| argument   | type         | description                                          |
| ---------- | ------------ | ---------------------------------------------------- |
| `isActive` | `boolean`    | Current state of the toggle                          |
| `toggle`   | `() => void` | Toggles the state (swaps between `true` and `false`) |

## Utilities

### createLayout

Creates a higher-order component. The created layout has a wrapper `div` for further configuration. The main content (aka the component you want to wrap) also has a wrapper `main` for further configuration.

**Signature:** `(parts: JSX.Element[], position: number, options?: CreateLayoutOptions) => HigherOrderComponent`
**Returns:** A higher-order component

| argument   | type                  | required | default | description                      |
| ---------- | --------------------- | -------- | ------- | -------------------------------- |
| `parts`    | `Element[]`           | Yes      | -       | Layout elements in order         |
| `position` | `number`              | Yes      | -       | Position of the wrapped element. |
| `options`  | `CreateLayoutOptions` | No       | -       | -                                |

You can pass each individual `part` of your layout as an array (**IN ORDER!**) for the first argument and pass a `position` that indicates the function where to insert the content of your layout. This `position` can be anything except negative. If it exceeds the array length, then the content will be pushed at the end, otherwise the current `part` on the specified index will be pushed back once and the content will take it's place.

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

| argument         | type            | required                                    | default | description                                                           |
| ---------------- | --------------- | ------------------------------------------- | ------- | --------------------------------------------------------------------- |
| `wrapperClasses` | `string`        | No                                          | -       | -                                                                     |
| `mainClasses`    | `string`        | No                                          | -       | -                                                                     |
| `content`        | `JSX.Element[]` | Yes if `position` is present. No by default | -       | Same as the `parts` argument except this will be in your main content |
| `position`       | `number`        | Yes if `content` is present. No by default  | -       | Same as the `position` argument                                       |

### mergeMap

This utility merges 2 maps of the same type. The first argument is the **base** where the second argument will be merged into. It will override any `key-value` pair that already exist!

**Signature:** `<T extends Map<unknown, unknown>>(baseMap: T, submittedMap: T) => T`
**Returns:** A new map with the values of both argument.

| argument       | type  | required | default | description                                                         |
| -------------- | ----- | -------- | ------- | ------------------------------------------------------------------- |
| `baseMap`      | `Map` | Yes      | -       | Will be cloned and used for base                                    |
| `submittedMap` | `Map` | Yes      | -       | Will be merged into the cloned base and override any existing value |

**Example of merging:**

```typescript
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

**Example of overriding:**

```typescript
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
