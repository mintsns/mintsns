import {Component, OnInit} from 'angular2/core';
import {Hero} from './hero';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService} from './hero.service';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <h2>My Heroes</h2>
    <ul class="heroes">
    <li [class.selected]="hero === selectedHero" *ngFor="#hero of heroes" (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
    </li>
    </ul>
    <my-hero-detail [hero]="selectedHero"></my-hero-detail>
  `,
  providers: [HeroService],
  directives: [HeroDetailComponent]
})
export class AppComponent implements OnInit {
  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private _heroService: HeroService) { }

  getHeroes() {
    this._heroService.getHeroes()
        .then(heroes => this.heroes = heroes);
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) { this.selectedHero = hero; }
}