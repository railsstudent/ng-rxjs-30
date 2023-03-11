import { APP_BASE_HREF } from '@angular/common';
import { inject } from '@angular/core';

const buildImage = (image: string) => {
    const baseHref = inject(APP_BASE_HREF);
    const isEndWithSlash = baseHref.endsWith('/');
    const imagePath = `${baseHref}${isEndWithSlash ? '' : '/'}assets/images/${image}`;
    return `url('${imagePath}')`
}
  
export const moleSrc = (): string => buildImage('mole.svg');
export const holeSrc = (): string => buildImage('dirt.svg');
