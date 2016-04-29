import {Component, OnInit} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {Hero} from "./hero";
import {HeroDetailComponent} from "./hero-detail.component";
import {HeroService} from "./hero.service";
import { TimelineComponent } from './components/timeline.component';
import { HeroesComponent } from './heroes.component';
import {TimelineService} from "./services/timeline.service";

@Component({
    selector: 'my-app',
    // template: `
    //
    //     <h1>{{title}}</h1>
    //     <nav>
    //         <a [routerLink]="['Timeline']">Timeline</a>
    //         <a [routerLink]="['Heroes']">Heroes</a>
    //     </nav>
    //     <router-outlet></router-outlet>
    // `,
    templateUrl: "views/layout.html",
    
    // <h1>Hello {{title}}</h1>
    //        <ul class="heroes" >
    //          <!-- #は変数を宣言するための記号 -->
    //          <!-- (hoge) はイベントハンドラ -->
    //          <li [class.selected]="hero === selectedHero" [style.color]="hero === selectedHero" *ngFor="#hero of heroes" (click)="onSelectHero(hero)" >
    //             <span class="badge">{{hero.id}}</span>{{ hero.name }}
    //          </li>                     
    //        </ul>
    
    // 他から引っ張ってきたときはここで宣言をする
    directives: [
        HeroDetailComponent,
        ROUTER_DIRECTIVES
    ],
    
    providers: [
        TimelineService,
        HeroService,
        ROUTER_PROVIDERS
    ]
})

@RouteConfig([
  {
    path: '/timeline',
    name: 'Timeline',
    component: TimelineComponent,
    useAsDefault: true
  },
  {
    path: '/detail/:id',
    name: 'HeroDetail',
    component: HeroDetailComponent
  },
  {
    path: '/heroes',
    name: 'Heroes',
    component: HeroesComponent
  }
])
export class AppComponent implements OnInit {
    title = "Angular 2";
    
    hero: Hero = {
        id: 1,
        name: "Windstorm",
    };
       
    
    heroes: Hero[];
    
    selectedHero: Hero;
    
    constructor( private _heroService: HeroService ) { }
    
    ngOnInit() {
        this.getHeroes();
    }
    
    getHeroes() {
        this._heroService.getHeroes().then((heroes) => this.heroes = heroes );
    }
    
    /**
     *  関数を選択する
     */
    onSelectHero(hero: Hero) {
        this.selectedHero = hero;
    }
}