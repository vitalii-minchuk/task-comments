function checkText(text: string) {
  if (!text) return '';
  if (text[0] === '<') return true;
  return false;
}

export default checkText;
