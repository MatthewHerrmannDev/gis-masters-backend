import QueryOption from './QueryOption';
import appData from './app-data.json';

// Return array of QueryOption for the given organizationID
// (ignores properties with null values, types that are not number or boolean,
//  or types that are inconsistent across all organization assets)
export default function getQueryOptions(organizationID: string): QueryOption[] {
    let queryOptions: QueryOption[] = []

    // Check if organizationID is present
    if (appData.hasOwnProperty(organizationID)) {
        const assets = appData[organizationID as keyof typeof appData];
        
        // Check if assets are present
        if (assets.length != 0) {
            const properties = Object.getOwnPropertyNames(assets[0]);

            // Make query options for valid properties
            for (let property of properties) {
                let isValidQuery = true;
                let queryType = null;
                for (let asset of assets) {
                    const value = asset[property as keyof typeof asset];
                    const valueType = typeof value;

                    // Check if value is null
                    if (value == null) {
                        isValidQuery = false;
                        break;
                    }

                    // Check if value type is not number or boolean
                    if (valueType !== "number" && valueType !== "boolean") {
                        isValidQuery = false;
                        break;
                    }

                    // Check if value type is inconsistent (different from previous assets)
                    if (queryType == null) {
                        queryType = valueType;
                    } else if (queryType != valueType) {
                        isValidQuery = false;
                        break;
                    }
                }

                // Append query option
                if (isValidQuery) {
                    const name = property;
                    const display_name = QueryOption.generateDisplayName(property);
                    const type = (queryType == "boolean") ? "boolean" : "numeric";
                    queryOptions.push(new QueryOption(name, display_name, type));
                }
            }
        }
    }

    return queryOptions;
}