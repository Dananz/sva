import { describe, expect, it } from "vitest";
import { sva } from "../src";

// Shared configurations
const buttonConfig = {
  base: {
    padding: "8px 16px",
    borderRadius: "4px",
  },
  variants: {
    color: {
      blue: { backgroundColor: "blue", color: "white" },
      purple: { backgroundColor: "purple", color: "white" },
      orange: { backgroundColor: "orange", color: "white" },
    },
  },
  defaultVariants: {
    color: "blue",
  } as const,
};

const cardConfig = {
  base: {
    padding: "10px 15px",
    borderRadius: "8px",
    color: "black",
    backgroundColor: "white",
  },
  variants: {
    boxShadow: {
      light: { boxShadow: "1px 1px 5px #aaa" },
      medium: { boxShadow: "2px 2px 8px #888" },
      heavy: { boxShadow: "4px 4px 12px #555" },
    },
  },
  defaultVariants: {
    boxShadow: "light",
  } as const,
};

const useButtonStyles = sva(buttonConfig);
const useCardStyles = sva(cardConfig);
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
});

describe("sva", () => {
  it("should apply default button styles if no variantProps are provided", () => {
    const style = useButtonStyles({});
    expect(style).toEqual({
      ...buttonConfig.base,
      ...buttonConfig.variants.color.blue,
    });
  });

  it("should apply specified button variant over default", () => {
    const style = useButtonStyles({ color: "purple" });
    expect(style).toEqual({
      ...buttonConfig.base,
      ...buttonConfig.variants.color.purple,
    });
  });

  it("should handle undefined variantProps correctly", () => {
    // @ts-ignore
    const style = useButtonStyles({ color: "red" }); // 'red' is not a defined variant
    expect(style).toEqual({
      ...buttonConfig.base,
      ...buttonConfig.variants.color.blue, // Falls back to default
    });
  });

  it("should handle card boxShadow variants correctly", () => {
    const lightStyle = useCardStyles({});
    expect(lightStyle).toEqual({
      ...cardConfig.base,
      ...cardConfig.variants.boxShadow.light,
    });
  });

  // Edge cases
  it("should ignore non-existent variant properties", () => {
    // @ts-ignore
    const style = useButtonStyles({ color: "unknown" }); // Non-existent variant
    expect(style).toEqual({
      ...buttonConfig.base,
      ...buttonConfig.variants.color.blue, // Should still apply the default
    });
  });

  it("should handle missing variants gracefully", () => {
    const faultyConfig = { base: { padding: "5px" }, variants: {} }; // No variants defined
    const useFaultyStyles = sva(faultyConfig);
    const style = useFaultyStyles({});
    expect(style).toEqual({
      padding: "5px", // Only base styles applied
    });
  });

  it("should manage incomplete configuration without variants", () => {
    const incompleteConfig = { base: { padding: "20px" } }; // Completely missing variants and defaultVariants
    const useIncompleteStyles = sva(incompleteConfig);
    // @ts-ignore
    const style = useIncompleteStyles({ color: "blue" }); // Attempt to use a variant
    expect(style).toEqual({
      padding: "20px", // Only base styles applied
    });
  });

  it("should filter out undefined style properties", () => {
    const style = useUndefinedStyles({ size: "large" });

    // Only valid styles should appear without undefined values
    expect(style).toEqual({
      padding: "10px",
    });
  });
});
