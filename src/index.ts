import type { Properties as CSSProperties } from "csstype";

import type { SVAConfig, SVAOutput, SVAVariantSchema } from "./types";
import { isKey, mapFalsyToUndefined } from "./utils";

/**
 * Returns a function that generates resolved styles based on variant props.
 *
 * @param config - The configuration object for the variants schema.
 * @returns A function that accepts variant props and returns resolved styles.
 */
export function sva<T extends SVAVariantSchema>(
  config: SVAConfig<T>,
): SVAOutput<T> {
  const {
    base = {},
    variants = {},
    compoundVariants = [],
    defaultVariants = {},
  } = config;

  return (variantProps) => {
    const { styles, ...props } = variantProps;
    const resolvedStyles: CSSProperties = { ...base, ...styles };

    // Apply default variants
    for (const variant of Object.keys(defaultVariants) as Array<
      keyof typeof defaultVariants
    >) {
      const variantValue = defaultVariants[variant];

      if (variantValue && variants[variant]) {
        Object.assign(resolvedStyles, variants[variant][variantValue]);
      }
    }

    // Apply provided variants
    for (const variant of Object.keys(props)) {
      if (!isKey(variants, variant)) continue;
      const variantValue = props[variant];

      if (variantValue && variants[variant]) {
        Object.assign(resolvedStyles, variants[variant][variantValue]);
      }
    }

    // Apply compound variants
    for (const compound of compoundVariants) {
      const matches = Object.keys(compound).every((key) => {
        if (key === "styles") return true; // Skip the styles key
        return key in props && props[key] === compound[key];
      });

      if (matches) {
        Object.assign(resolvedStyles, compound.styles);
      }
    }

    return JSON.parse(JSON.stringify(mapFalsyToUndefined(resolvedStyles)));
  };
}

export * from "./types";
