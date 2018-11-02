import { Pipe, PipeTransform } from '@angular/core';
import { Counter } from './counter.class';

// const counters = new WeakMap<any, Counter>();

@Pipe({
  name: 'counterPipe'
})
export class CounterPipe implements PipeTransform  {
  count: Counter;

  transform(value: any): Counter {
    // if (!counters.has(value)) {
    //   counters.set(value, new Counter());
    // }
    // return counters.get(value);
    if (!this.count){
			this.count = new Counter();
		}
		return this.count;
  }
}
