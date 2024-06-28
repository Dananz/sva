# Style Variance Authority (SVA)

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

A powerful and flexible package for managing style-based variants in your components. Inspired by the [Class Variance Authority (CVA)](https://github.com/joe-bell/cva) package, SVA takes a similar approach but applies styles directly instead of using class-based variants.

## Installation

```sh
# npm
npm install style-variance-authority

# yarn
yarn add style-variance-authority

# pnpm
pnpm install style-variance-authority

# bun
bun install style-variance-authority
```

## Usage

```typescript
import { sva, type StyleVariantProps } from "style-variance-authority";

const useButtonStyles = sva({
  base: {
    padding: "10px",
    border: "none",
    borderRadius: "5px",
  },

  variants: {
    color: {
      primary: { backgroundColor: "blue", color: "white" },
      secondary: { backgroundColor: "gray", color: "black" },
    },
    size: {
      small: { fontSize: "12px" },
      large: { fontSize: "18px" },
    },
  },

  defaultVariants: {
    color: "primary",
    size: "small",
  },

  compoundVariants: [
    {
      color: "primary",
      size: "large",
      styles: { fontWeight: "bold" },
    },
  ],
});

const buttonStyles = useButtonStyles({ color: "secondary", size: "large" });
// Result: { padding: '10px', border: 'none', borderRadius: '5px', backgroundColor: 'gray', color: 'black', fontSize: '18px' }

interface ButtonProps extends StyleVariantProps<typeof buttonConfig> {}
// StyleVariantProps is an helper method to infer the props for a given SVA configuration
```

## API

### sva

The main function to generate resolved styles based on variant props.

```typescript
import { sva } from "style-variance-authority";

const useStyles = sva({
  variants: {
    color: {
      primary: { backgroundColor: "blue", color: "white" },
      secondary: { backgroundColor: "gray", color: "black" },
    },
  },
});
```

#### Properties

- `base`: Base CSS properties that apply to all variants.

- `variants`: Variants schema that defines the available variants and their styles.

- `defaultVariants`: Default values for each variant.

- `compoundVariants`: Compound variants that define additional styles based on combinations of variant values.

### StyleVariantProps

Infers the variant props for a given SVA configuration.

```typescript
import { type StyleVariantProps } from "style-variance-authority";

interface ButtonProps {
  color: StyleVariantProps<typeof useStyles>["color"]; // "primary" | "secondary"
}
```

## Credits

This package is inspired by the [Class Variance Authority (CVA)](https://github.com/joe-bell/cva) package by Joe Bell. Special thanks to Joe for his incredible work.

## License

[MIT](LICENSE)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/style-variance-authority/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/style-variance-authority
[npm-downloads-src]: https://img.shields.io/npm/dm/style-variance-authority.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/style-variance-authority
[license-src]: https://img.shields.io/npm/l/style-variance-authority.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/style-variance-authority
