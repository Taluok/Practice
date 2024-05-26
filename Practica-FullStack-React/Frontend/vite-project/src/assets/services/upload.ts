import { ApiUploadResponse, type Data } from "../../types";
import { API_HOST } from "../../config/";

export const uploadFile = async (file: File): Promise<[Error | null, Data | null]> => {
    const formData = new FormData();
    formData.append('file', file); // para hacer el feaching de datos

    try {
        const res = await fetch(`${API_HOST}/api/files`, {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            const errorMessage = await res.text();
            return [new Error(`Error uploading file: ${res.status} - ${errorMessage}`), null];
        }

        const json: ApiUploadResponse = await res.json();

        return [null, json.data];
    } catch (e) {
        if (e instanceof Error) {
            return [e, null];
        } else {
            return [new Error('Unknown error'), null];
        }
    }
};

