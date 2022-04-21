export const copyText = async (text: string): Promise<void> => {
  if ('clipboard' in navigator) {
    await navigator.clipboard.writeText(text);
  } else {
    /**
     * This is the fallback deprecated way of copying text to the clipboard. Only runs if it can't find the clipboard API.
     */
    const element = document.createElement('input');

    element.type = 'text';
    element.disabled = true;

    element.style.setProperty('position', 'fixed');
    element.style.setProperty('z-index', '-100');
    element.style.setProperty('pointer-events', 'none');
    element.style.setProperty('opacity', '0');

    element.value = text;

    document.body.appendChild(element);

    element.click();
    element.select();
    document.execCommand('copy');

    document.body.removeChild(element);
  }
};
