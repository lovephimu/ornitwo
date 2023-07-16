export async function copyToClipBoard(textToCopy: string) {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(textToCopy);
  } else {
    return document.execCommand('copy', true, textToCopy);
  }
}
