import axios from "axios";
var _ = require('lodash');
import { DBService } from "../db/db-service";

export default class FeedService {
    public static async getData(source: string) {
        try {
            const data = await axios.get(source);
            return data;
        } catch (e) {
            console.log('Error on FeedService getFeedData - could not get data ', e);
        }
    }

    public static async setValue(id: any, valueToUpdate: string, newValue: string): Promise<any> {
        const data = await new DBService().get('feed');
        for (let i = 0; i < data.length; i++) {
            console.log('in ', id, data[i])
            if (data[i].id === id) {
                data[i] =  _.set(data[i], valueToUpdate, newValue);
            }
        }
        return data;
    }
}