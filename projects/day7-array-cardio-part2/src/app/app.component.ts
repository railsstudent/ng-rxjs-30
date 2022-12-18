import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { every, find, findIndex, from, map, shareReplay, tap, toArray } from 'rxjs';
import { some } from './custom-operators/some.operator';
import { Person, PersonNoAge } from './interfaces/person.interface';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <section class="people">
        <h1>People</h1>
        <ul *ngIf="peopleArray$ | async as peopleArray">
          <li *ngFor="let p of peopleArray">Name: {{ p.name }}<br/> Year: {{ p.year }}<br/> Age: {{ p.age }}</li>
        </ul>
        <p>Is Adult (at least one person is 19 or older)? {{ isAdult$ | async }}</p>
        <p>All Adults (everyone is 19 or older)? {{ allAdults$ | async }}</p>
      </section>
      <section class="comments">
        <h1>Comments</h1>
        <ul *ngIf="commentsArray$ | async as commentsArray">
          <li *ngFor="let p of commentsArray">Id: {{ p.id }}<br/> Text: {{ p.text }}</li>
        </ul>
        <ng-container *ngIf="comment$ | async as comment; else noComment">
          <p>Find comment 823423?</p>
          <p>Id: {{ comment.id }}, text: {{ comment.text }}</p>
        </ng-container>
        <p>FindIndex of comment 823423? {{ commentIndex$ | async }}</p>
      </section>
    </div>

    <ng-template #noComment>
      <p>Comment does not exist</p>
    </ng-template>
  `,
  styles: [`
    :host {
      display: block;
    }

    .container {
      display: flex;
    }

    .people, .comments {
      flex-basis: 25%;

      padding: 1rem;
      ul {
        padding: 0.75rem;

        li {
          margin: 0.5rem;
        }
      }
    }
  `]
})
export class AppComponent {
  title = 'Day7 Array Cardio Part 2';

  persons = [
    { name: 'Wes', year: 1988 },
    { name: 'Kait', year: 1986 },
    { name: 'Irv', year: 1970 },
    { name: 'Lux', year: 2015 }
  ];

  people$ = from(this.persons).pipe(
    tap((person) => console.log('people$', person)),
    map((person) => this.calculateAge(person)),
    shareReplay(this.persons.length));

  peopleArray$ = this.people$.pipe(toArray());
  isAdult$ = this.people$.pipe(some(person => this.isAnAdult(person)));
  allAdults$ = this.people$.pipe(every(person => this.isAnAdult(person)));
  
   comments = [
    { text: 'Love this!', id: 523423 },
    { text: 'Super good', id: 823423 },
    { text: 'You are the best', id: 2039842 },
    { text: 'Ramen is my fav food ever', id: 123523 },
    { text: 'Nice Nice Nice!', id: 542328 }
   ] 

  comments$ = from(this.comments).pipe(
    tap(comment => console.log('comments$', comment)), 
    shareReplay(this.comments.length)
  );

  commentsArray$ = this.comments$.pipe(toArray());
  commentIndex$ = this.comments$.pipe(findIndex(c => c.id === 823423));
  comment$ = this.comments$.pipe(find(c => c.id === 823423));

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }

  private isAnAdult(person: Person, age = 19): boolean {
    return person.age >= age;
  }

  private calculateAge(person: PersonNoAge): Person {
    return {
      ...person,
      age: new Date().getFullYear() - person.year
    };
  }
}
