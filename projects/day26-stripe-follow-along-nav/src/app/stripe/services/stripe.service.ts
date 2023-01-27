import { Injectable } from '@angular/core';
import { BehaviorSubject, map, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private readonly shouldFixNavSub = new BehaviorSubject<boolean>(false);
  readonly shouldFixNav$ = this.shouldFixNavSub.asObservable();

  addClass(value: boolean) {
    this.shouldFixNavSub.next(value);
  }

  getSocial() {
    return timer(500)
      .pipe(
        map(() => ([
          {
            link: 'http://twitter.com/wesbos',
            description:  'Twitter'
          },
          {
            link: 'http://facebook.com/wesbos.developer',
            description:  'Facebook'
          },
          {
            link: 'http://wesbos.com',
            description:  'Blog'
          },
          {
            link: 'http://wesbos.com/courses',
            description:  'Course Catalog'
          }
        ])
      )
    );
  }

  getCourses() {
    return timer(500)
      .pipe(
        map(() => ([
          {
            code: 'RFB',
            link: 'https://ReactForBeginners.com',
            description: 'React For Beginners'
          },
          {
            code: 'ES6',
            link: 'https://ES6.io',
            description: 'ES6 For Everyone'
          },
          {
            code: 'STPU',
            link: 'https://SublimeTextBook.com',
            description: 'Sublime Text Power User'
          },
          {
            code: 'WTF',
            link: 'http://flexbox.io',
            description: 'What The Flexbox?!'
          },
          {
            code: 'LRX',
            link: 'http://LearnRedux.com',
            description: 'Learn Redux'
          },
          {
            code: 'CLPU',
            link: 'http://CommandLinePowerUser.com',
            description: 'Command Line Power User'
          },
          {
            code: 'MMD',
            link: 'http://MasteringMarkdown.com',
            description: 'Mastering Markdown'
          }
        ])
      )
    );
  }
}
