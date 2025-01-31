import {Client} from 'boardgame.io/client';
import { Ouranomachia } from './Game';

//tutorial has Client and client. They are too similar. Findout what they do and change them.
class OuranomachiaClient {
    constructor() {
        this.client = Client({game: Ouranomachia});
        this.client.start();
    }
}

const app = new OuranomachiaClient();