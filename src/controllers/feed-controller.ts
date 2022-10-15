
import * as express from 'express';
import config from "../db/config";
import { DBService } from '../db/db-service';
import FeedService from "../services/feed-service";
import { Utils } from '../utils';

export default class FeedController {
    public path = '/api/feed';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.post(this.path, this.getFeedData);
        this.router.post(this.path + '/setFeedRecordValue', this.setFeedRecordValue);
        this.router.post(this.path + '/filterFeed', this.filterFeed);
    }

    public async getFeedData(req: any, res: any) {
        console.log('FeedController getFeedData', req.body ? req.body : null);
        let source;
        if (req.body && req.body.source) {
            source = req.body.source;
        } else {
            source = `http://api.aviationstack.com/v1/flights?access_key=${config.server.apiKey}&limit=${config.server.limit_feed_api_results}`;
        }

        try {
            const feedData: any = await FeedService.getData(source);
            const feedDataAttachedIds = Utils.attachIdToArrOfObject(feedData.data.data);
            await new DBService().set('feed', feedDataAttachedIds);
            res.send({ data: feedDataAttachedIds });
        }
        catch (e) {
            console.log('Error on FeedController getFeedData - could not get feed data ', e);
            res.send(404, 'Error - could not get feed data');
        }
    }

    public async setFeedRecordValue(req: any, res: any) {
        console.log('setFeedRecordValue ', req.body);
        if (!req.body || !req.body.data || !req.body.data.recordId || !req.body.data.valueToUpdate ||
            !req.body.data.newValue) {
            console.log('Error 1 on FeedController setFeedRecordValue - could set record value');
            res.send(404, 'Error 1 - could set record value due to missing data parametres');
        }
        try {
            let recordId = req.body.data.recordId;
            let valueToUpdate = req.body.data.valueToUpdate;
            let newValue = req.body.data.newValue;
            const updatedFeed = await FeedService.setValue(recordId, valueToUpdate, newValue);
            res.send({ data: updatedFeed });
        } catch (e) {
            console.log('Error 2 on FeedController setFeedRecordValue - could set record value', e);
            res.send(404, 'Error 2 - could set record value');
        }
    }


    public async filterFeed(req: any, res: any) {
        if (!req.body || !req.body.filters) {
            res.send(404, 'Error 1 - could not process filter due to missing filters');
        }

        try {
            let limit;
            if (req.body.filters.limit) {
                limit = req.body.filters.limit;
            }

            let columns;
            if (req.body.filters.columns) {
                columns = req.body.filters.columns;
            }

            const filteredData = await new DBService().get('feed', limit, columns);
            res.send({ data: filteredData });
        } catch (e) {
            console.log('Error 2 on FeedController filterFeed - could not filter data', e);
        }
    }
}