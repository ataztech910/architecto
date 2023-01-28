class Store {
    storeData = {} as Partial<any>;

    private static instance: Store;

    private constructor() { }

    public static getInstance(): Store {
        if (!Store.instance) {
            Store.instance = new Store();
        }

        return Store.instance;
    }

    updateData(key: string, newValue: Partial<any>) {
        this.storeData[key] = newValue;
    }

    deleteData(key: string) {
        delete this.storeData[key];
    }

    resetStore() {
        this.storeData = {};
    }
}

export default Store;