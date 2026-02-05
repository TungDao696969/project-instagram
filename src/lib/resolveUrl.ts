import avatarImg from "@/assets/avatarImg.jpg";

export const resolveUrl = (url?: string | null) => {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;

  const baseURL = import.meta.env.VITE_API_URL;
  if (!baseURL) return url;

  const normalizedBase = baseURL.endsWith("/") ? baseURL.slice(0, -1) : baseURL;

  const normalizedPath = url.startsWith("/") ? url : `/${url}`;

  return `${normalizedBase}${normalizedPath}`;
};

export const getProfilePictureUrl = (picture: string | null | undefined) => {
  if (!picture) return avatarImg;
  if (picture.startsWith("http")) return picture;
  // Nếu là relative path, thêm baseURL
  const baseURL = import.meta.env.VITE_API_URL;
  return `${baseURL}${picture}`;
};
