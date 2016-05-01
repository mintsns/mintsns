import {Observable} from 'rxjs/Observable';

export class AppSharedService {

  num: number;

  constructor() {
    this.num = parseInt(Math.random() * 1000);
  }

  // 実験中
  public counter = new Observable<number>((observer) => {
    observer.next(this.num);
    setInterval(()=>{
      observer.next(++this.num);
    }, 1000);
  });
}