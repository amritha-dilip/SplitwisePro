import { Utilities } from '@microsoft/office-js-helpers';
import { Splitwise } from './app/services';

class App {
    public url = 'https://secure.splitwise.com/api/v3.0';

    async login() {
        let oauth = new Splitwise();
        oauth.login().subscribe(
            next => console.log(next),
            error => Utilities.log(error)
        );
    }

    static bootstrap() {
        let app = new App();
        app.login();
    }
}

App.bootstrap();
