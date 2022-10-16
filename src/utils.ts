export class Utils {
    public static attachIdToArrOfObject(object: any) {
        let count = 1;
        for (let i = 0; i < object.length; i++) {
            object[i].id = count;
            count++;
        }
        return object;
    }

    public static filterFieldsFromArr(fields: Array<string>, arr: any) {
        const values: any = []
        arr.forEach((record: any) => {
            const keys = Object.keys(record)
            const value: any = {}
            keys.forEach((key) => {
                const isKeyInFields = fields.indexOf(key) >= 0
                if (isKeyInFields) {
                    value[key] = record[key]
                }
            })
            if (Object.keys(value).length > 0) {
                values.push(value)
            }
        })
        
        if (values.length > 0) {
            return values
        }
        console.log('arr', arr)
        return arr;
    }
}