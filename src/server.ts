import App from './app';
import { DBS } from './constants';
import FeedController from './controllers/feed-controller';
import config from './db/config';
import { DBService } from './db/db-service';

let dbType = DBS.POSTGRESQL;
let db = new DBService(dbType);

switch (dbType) {
    case DBS.POSTGRESQL: {
        db.connect().then(async () => {
            const app = new App(
                [
                    new FeedController()
                ], config.server.port
            );

            app.listen();
        });
    }
}

