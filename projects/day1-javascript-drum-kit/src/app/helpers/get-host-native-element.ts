import { ElementRef, inject } from '@angular/core';

export const getHostNativeElement = () => inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>).nativeElement;
