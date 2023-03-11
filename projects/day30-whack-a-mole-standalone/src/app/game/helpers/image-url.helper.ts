import { APP_BASE_HREF } from '@angular/common';
import { inject } from '@angular/core';

const buildImage = (image: string) => {
  const baseHref = inject(APP_BASE_HREF);
  const isEndWithSlash = baseHref.endsWith('/');
  const imagePath = `${baseHref}${isEndWithSlash ? '' : '/'}assets/images/${image}`;
  return `url('${imagePath}')`;
};

export const cssHoleImage = () => ({ '--hole-image': buildImage('dirt.svg') });
export const cssMoleImage = () => ({ '--mole-image': buildImage('mole.svg') });
