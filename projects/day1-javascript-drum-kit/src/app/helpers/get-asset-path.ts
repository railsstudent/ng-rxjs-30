import { APP_BASE_HREF } from '@angular/common';
import { inject } from '@angular/core';

export const getFullAssetPath = () => {
    const baseHref = inject(APP_BASE_HREF);
    const isEndWithSlash = baseHref.endsWith('/');
    return `${baseHref}${isEndWithSlash ? '' : '/'}assets/`;
}
