export const encodeToBase64 = (v: string, encoding: BufferEncoding = 'utf-8'): string => {
  const buffer = Buffer.from(v, encoding);
  return buffer.toString('base64');
};

export const decodeFromBase64 = (v: string, encoding: BufferEncoding = 'utf-8'): string => {
  const buffer = Buffer.from(v, 'base64');
  return buffer.toString(encoding);
};
