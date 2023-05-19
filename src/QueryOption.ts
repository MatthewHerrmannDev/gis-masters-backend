export default class QueryOption {
    name: string;
    display_name: string;
    type: string;

    constructor(name: string, display_name: string, type: string) {
        this.name = name;
        this.display_name = display_name;
        this.type = type;
    }

    // Return generated display name for given name
    // (replace '_' with ' ' and capitalize first letter of each word)
    static generateDisplayName(name: string): string {
        let displayName = "";
        if (name.length != 0) {
            displayName += name[0].toUpperCase();
            for (let i = 1; i < name.length; i++) {
                if (name[i] == "_") {
                    displayName += " ";
                } else if (name[i-1] == "_") {
                    displayName += name[i].toUpperCase();
                } else {
                    displayName += name[i];
                }
            }
        }
        return displayName;
    }
}