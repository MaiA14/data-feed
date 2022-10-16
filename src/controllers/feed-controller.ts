
import * as express from 'express';
import { TypedRequestBody } from '../..';
import { DBService } from '../db/db-service';
import FeedService from "../services/feed-service";
import { filterReq, getDataReq, updateValueReq } from '../types/requests';
import { Utils } from '../utils';

export default class FeedController {
    public path = '/api/feed';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.post(this.path, this.get);
        this.router.post(this.path + '/updateField', this.updateField);
        this.router.post(this.path + '/filter', this.filter);
    }

    public async get(req: TypedRequestBody<getDataReq>, res: any) {
        console.log('FeedController get', req.body ? req.body : null);
        let source;
        if (!req.body|| !req.body.source) {
            res.status(404).send('Error 1 - could not get feed data, no source supplied');
        }

        source = req.body.source;

        try {
            const feedData: any = await FeedService.getData(source);
            const feedDataAttachedIds = Utils.attachIdToArrOfObject(feedData.data.data);
            await new DBService().set('feed', feedDataAttachedIds);
            res.send({ data: feedDataAttachedIds });
        }
        catch (e) {
            console.log('Error on FeedController get - could not get feed data ', e);
            res.status(404).send('Error 2 - could not get feed data');
        }
    }

    public async updateField(req: TypedRequestBody<updateValueReq>, res: any) {
        console.log('FeedController updateField ', req.body);
        if (!req.body || !req.body.data || !req.body.data.fieldToUpdate ||
            !req.body.data.newValue) {
            console.log('Error 1 on FeedController updateField - could set record value');
            res.status(404).send('Error 1 - could set record value due to missing data parameters');
        }
        try {
            let rowId = req.body.data.rowId;
            let fieldToUpdate = req.body.data.fieldToUpdate;
            let newValue = req.body.data.newValue;
            const updatedFeed = await FeedService.setValue(rowId, fieldToUpdate, newValue);
            res.send({ data: updatedFeed });
        } catch (e) {
            console.log('Error 2 on FeedController updateField - could set record value', e);
            res.status(404).send('Error 2 - could set record value');
        }
    }


    public async filter(req: TypedRequestBody<filterReq>, res: any) {
        console.log('FeedController filter ', req.body);
        if (!req.body || !req.body.filters) {
            res.status(404).send('Error 1 - could not process filter due to missing filters');
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
            console.log('Error 2 on FeedController filter - could not filter data', e);
            res.status(404).send('Error 2 - could not filter data');
        }
    }
}