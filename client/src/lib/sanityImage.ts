import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "@/lib/sanity";

const builder = imageUrlBuilder(sanityClient);

type ImageSource = {
  asset?: {
    _ref?: string;
    _type?: string;
    _id?: string;
    url?: string;
  };
  alt?: string;
};

export function urlFor(
  source: unknown,
  options?: { width?: number; height?: number },
): string | undefined {
  if (!source) return undefined;

  const image = source as ImageSource;

  if (image.asset?.url) {
    const url = new URL(image.asset.url);
    if (options?.width) url.searchParams.set("w", String(options.width));
    if (options?.height) url.searchParams.set("h", String(options.height));
    url.searchParams.set("auto", "format");
    url.searchParams.set("q", "85");
    return url.toString();
  }

  try {
    let img = builder.image(source).auto("format").quality(85);
    if (options?.width) img = img.width(options.width);
    if (options?.height) img = img.height(options.height);
    return img.url();
  } catch {
    return undefined;
  }
}
