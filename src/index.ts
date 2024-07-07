import type { CSSProperties, Config, Props, VariantSchema } from "./types";
import { isKey, mapFalsyToUndefined } from "./utils";

/**
 * Returns a function that generates resolved styles based on variant props.
 *
 * @param config - The configuration object for the variants schema.
 * @returns A function that accepts variant props and returns resolved styles.
 */
export function sva<T extends VariantSchema>(config: Config<T>) {
  const {
    base = {},
    variants = {},
    compoundVariants = [],
    defaultVariants = {},
  } = config;

  return (variantProps?: Props<T>) => {
    const { styles = {}, ...props } = variantProps || ({} as Props<T>);

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
        if (key === "styles" || compound[key] === "*") return true; // Skip the styles key
        return isKey(props, key) && props[key] === compound[key];
      });

      if (matches) {
        Object.assign(resolvedStyles, compound.styles);
      }
    }

    return JSON.parse(
      JSON.stringify(mapFalsyToUndefined(resolvedStyles)),
    ) as Record<string, string | number>;
  };
}

export type { StyleVariantProps } from "./types";
