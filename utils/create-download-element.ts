export function createDownloadElement(href: string) {
  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.click();
}
