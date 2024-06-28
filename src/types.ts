import type { Properties as CSSProperties } from "csstype";

export type SVAVariantSchema = Record<string, Record<string, CSSProperties>>;

/**
 * Represents the configuration for variants in a component.
 *
 * @template T - The type of the variant schema.
 */
export type SVAConfig<T extends SVAVariantSchema = SVAVariantSchema> = {
  /**
   * Base CSS properties that apply to all variants.
   */
  base?: CSSProperties;

  /**
   * Variants schema that defines the available variants and their styles.
   */
  variants: T;

  /**
   * Default values for each variant.
   */
  defaultVariants?: InferVariants<SVAConfig<T>> | undefined;

  /**
   * Compound variants that define additional styles based on combinations of variant values.
   */
  compoundVariants?: Array<
    InferVariants<SVAConfig<T>> & { styles?: CSSProperties }
  >;
};

type InferVariants<T extends SVAConfig<SVAVariantSchema>> = {
  [K in keyof T["variants"]]?: Extract<keyof T["variants"][K], string> | null;
};

export type SVAProps<T> = T extends SVAOutput<infer U>
  ? InferVariants<SVAConfig<U>>
  : never;

export type SVAOutput<T extends SVAVariantSchema> = (
  props: InferVariants<SVAConfig<T>> & { styles?: CSSProperties },
) => Record<string, string | number>;
