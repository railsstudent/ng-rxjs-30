export interface Person {
    name: string;
    year: number;
    age: number;
}
  
export type PersonNoAge = Omit<Person, 'age'>;