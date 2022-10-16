import axios from "axios";
var _ = require('lodash');
import { DBService } from "../db/db-service";

export default class FeedService {
    public static async getData(source: string) {
        try {
            const data = await axios.get(source);
            return data;
        } catch (e) {
            console.log('Error on FeedService get - could not get data ', e);
        }
    }

    public static async setValue(id: any, fieldToUpdate: string, newValue: string): Promise<any> {
        const data = await new DBService().get('feed');
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {      // set only choosen row
                data[i] = _.set(data[i], fieldToUpdate, newValue);
            } else if (id === null || id === undefined) {     // set all column
                data[i] = _.set(data[i], fieldToUpdate, newValue);
            }
        }
        return data;
    }
}