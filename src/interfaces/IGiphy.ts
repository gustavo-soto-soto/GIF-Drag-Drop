export interface IGiphyResponse {
  data: IGIFData[];
}

export interface IGIFData {
  type: "gif";
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: string; // ISO 8601 format
  trending_datetime: string; // ISO 8601 format or "0000-00-00 00:00:00"
  images: {
    original: ImageData;
    downsized: ImageDetails;
    downsized_large: ImageDetails;
    downsized_medium: ImageDetails;
    downsized_small: {
      height: string;
      width: string;
      mp4_size: string;
      mp4: string;
    };
    downsized_still: ImageDetails;
    fixed_height: ImageData;
    fixed_height_downsampled: ImageDetailsWithWebp;
    fixed_height_small: ImageData;
    fixed_height_small_still: ImageDetails;
    fixed_height_still: ImageDetails;
    fixed_width: ImageData;
    fixed_width_downsampled: ImageDetailsWithWebp;
    fixed_width_small: ImageData;
    fixed_width_small_still: ImageDetails;
    fixed_width_still: ImageDetails;
    looping: {
      mp4_size: string;
      mp4: string;
    };
    original_still: ImageDetails;
    original_mp4: {
      height: string;
      width: string;
      mp4_size: string;
      mp4: string;
    };
    preview: {
      height: string;
      width: string;
      mp4_size: string;
      mp4: string;
    };
    preview_gif: ImageDetails;
    preview_webp: ImageDetails;
  };
}

export interface ImageData {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size: string;
  mp4: string;
  webp_size: string;
  webp: string;
  frames?: string; // Optional field
  hash?: string; // Optional field
}

export interface ImageDetails {
  height: string;
  width: string;
  size: string;
  url: string;
}

export interface ImageDetailsWithWebp extends ImageDetails {
  webp_size: string;
  webp: string;
}
