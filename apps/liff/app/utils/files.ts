export const getDirectusFileUrl = (
  fileId: string | null | undefined,
  options: {
    key?: string;
    width?: number;
    height?: number;
    baseUrl?: string;
    filename_download?: string;
  } = {}
): string => {
  if (!fileId) return "";

  const {
    key = "system-medium-cover",
    width,
    height,
    filename_download,
    baseUrl,
  } = options;
  let url = `/api/files/${fileId}?key=${encodeURIComponent(key)}`;

  if (filename_download) {
    url = `/api/files/${fileId}/${filename_download}?key=${encodeURIComponent(key)}`;
  }

  if (width) url += `&width=${width}`;
  if (height) url += `&height=${height}`;

  if (baseUrl) {
    return `${baseUrl}${url}`;
  }

  return url;
};