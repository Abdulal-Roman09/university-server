import { Query, FilterQuery } from "mongoose";
import { query } from 'express';

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    search(searchableFields: string[]) {
        const searchTerm = this?.query?.searchTerm as string;

        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map(
                    (field) =>
                        ({
                            [field]: { $regex: searchTerm, $options: "i" },
                        }) as FilterQuery<T>
                ),
            });
        }

        return this;
    }

    filter() {
        const queryObj = { ...this.query }
        const excludeFildes = ['serachTerm', 'sort', 'limit', 'page', 'fields']
        excludeFildes.forEach((element) => delete queryObj[element])
        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)
        return this
    }
    sort() {
        const sort = (this?.query?.sort as string)?.split(',')?.join(' ') || '-creatAt'
        this.modelQuery = this.modelQuery.sort(sort as string)
    }
    
}


export default QueryBuilder;
