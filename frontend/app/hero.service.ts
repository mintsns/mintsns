import {Hero} from './hero';
import { HEROES } from './mock-heroes';
import {Injectable} from 'angular2/core';


@Injectable()
export class HeroService {


    getHeroes(): Promise<Hero[]> {
        return Promise.resolve(HEROES);
    }

    // See the "Take it slow" appendix
    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise<Hero[]>(
            resolve => setTimeout(
                () => resolve(HEROES), 2000
            )
        )

    }

    getHero(id: number): Promise<Hero> {
        return Promise.resolve(HEROES).then(
            heroes => heroes.filter(hero => hero.id === id)[0]
        );
    }
}

