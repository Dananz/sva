import { type StyleVariantProps, sva } from "../src";

const useUndefinedStyles = sva({
  base: {
    padding: "10px",
    // @ts-ignore
    // eslint-disable-next-line
    color: null, // Should not appear in the output
  },
  variants: {
    size: {
      small: { fontSize: "12px" },
      large: { fontSize: undefined }, // Should not appear in the output
    },
  },
  defaultVariants: {
    size: "large",
  },
});

console.log(useUndefinedStyles({ size: "small" }));

type TestProps = {
  color: StyleVariantProps<typeof useUndefinedStyles>["size"];
};

const testProps: TestProps = {
  color: "large",
};

console.log("testProps", testProps);
