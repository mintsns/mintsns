import {Post} from '../models/post';
import { mockPosts } from '../models/post';
import {Injectable} from 'angular2/core';

@Injectable()
export class TimelineService {


    getPosts(): Promise<Post[]> {
        return Promise.resolve(mockPosts);
    }

    // See the "Take it slow" appendix
    getPostesSlowly(): Promise<Post[]> {
        return new Promise<Post[]>(
            resolve => setTimeout(
                () => resolve(mockPosts), 2000
            )
        )
    }
    getPost(id: number): Promise<Post> {
        return Promise.resolve(mockPosts).then(
            heroes => heroes.filter(hero => hero.id === id)[0]
        );
    }
}

