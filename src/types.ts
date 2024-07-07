import type { Properties } from "csstype";

export type CSSProperties = Properties & Record<string, any>;

type OmitUndefined<T> = T extends undefined ? never : T;

export type VariantSchema = Record<string, Record<string, CSSProperties>>;

type InferVariants<T extends VariantSchema, AdditionalType = never> = {
  [Variant in keyof T]?:
    | Extract<keyof T[Variant], string>
    | null
    | undefined
    | AdditionalType;
};
/**
 * Represents the configuration for variants in a component.
 *
 * @template T - The type of the variant schema.
 */
export type Config<T extends VariantSchema = VariantSchema> = {
  /**
   * Base CSS properties that apply to all variants.
   */
  base?: CSSProperties;

  /**
   * Variants schema that defines the available variants and their styles.
   */
  variants?: T;

  /**
   * Default values for each variant.
   */
  defaultVariants?: InferVariants<T>;

  /**
   * Compound variants that define additional styles based on combinations of variant values.
   */
  compoundVariants?: Array<InferVariants<T, "*"> & { styles?: CSSProperties }>;
};

export type Props<T extends VariantSchema> = InferVariants<T> & {
  styles?: CSSProperties;
};

export type StyleVariantProps<StylesFn extends (...args: any) => any> = Omit<
  OmitUndefined<Parameters<StylesFn>[0]>,
  "styles"
>;
