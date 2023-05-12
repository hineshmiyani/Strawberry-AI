export const isMobileDevice = () => {
  return 'ontouchstart' in window || 'onmsgesturechange' in window
}
