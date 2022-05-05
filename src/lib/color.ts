import * as chroma from 'chroma-js';

export const generateGradient = (startColor: string, endColor: string) => {
  return chroma.scale([startColor, endColor]).mode('hcl').colors(8, 'hex');
};

export const generateColors = (color: string, defaultColor: string) => {
  while (chroma.contrast(color, chroma.rgb(23, 23, 23).alpha(0.75)) < 4.5) {
    color = chroma.hex(color).brighten(0.2).hex();
  }
  if (chroma.deltaE(color, '#fafafa') < 30) {
    color = chroma.mix(defaultColor, color, 0.25).hex();
  }
  return [color, chroma.hex(color).brighten(1.25).hex()];
};

export const generateLightenColor = (color: string) => {
  return chroma.hex(color).brighten(1.25).hex();
};

export const getRandomColor = () => {
  return chroma.random().hex();
};

export const getColorWithAlpha = (color: string) => {
  return chroma.hex(color).alpha(0.75).rgba();
};

const colorRegex = /^#[a-f0-9]{6}$/i;

export const isColor = (color: string) => colorRegex.test(color);
