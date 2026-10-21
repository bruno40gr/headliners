export function sitePath(path, preview = false) {
  if (!preview) return path;
  const paths = {
    '/': '/home-preview',
    '/programs/band': '/home-preview/band',
    '/little-rockers': '/home-preview/little-rockers',
    '/tiny-keys': '/home-preview/tiny-keys',
    '/services/rehearsal-space': '/home-preview/rehearsal-space',
    '/services/recording-music-production': '/home-preview/recording-music-production',
  };
  if (path.startsWith('/publications/')) return `/home-preview${path}`;
  if (path.startsWith('/#')) return `/home-preview${path.slice(1)}`;
  return paths[path] || path;
}