import { ApiSearchResponse, Data } from "../../types";

export const searchData = async (search: string): Promise<[Error | null, Data | null]> => {
    try {
        const res = await fetch(`http://localhost:3000/api/users?q=${search}`);

        if (!res.ok) {
            return [new Error(`Error searching data: ${res.statusText}`), null];
        }

        const json: ApiSearchResponse = await res.json();

        return [null, json.data];
    } catch (error) {
        if (error instanceof Error) {
            return [error, null];
        }

        return [new Error('Unknown error'), null];
    }
};
