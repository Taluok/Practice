import { Data } from '../../types';
import { useEffect, useState } from "react";
import { toast } from 'sonner';

export const Search = ({ initialData }: { initialData: Data }) => {
    const [data, setData] = useState<Data>(initialData);
    const [search, setSearch] = useState<string>('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        const newPathname = search === ''
            ? window.location.pathname
            : `?q=${search}`;

        window.history.pushState({}, '', newPathname);
    }, [search]);

    useEffect(() => {
        // llamar a la api para filtrar los resultados
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/users?q=${search}`);

                if (!res.ok) {
                    const errorMessage = await res.text();
                    toast.error(`Error searching data: ${res.status} - ${errorMessage}`);
                    return;
                }

                const json: { data: Data } = await res.json();
                setData(json.data);
            } catch (error) {
                toast.error('Error fetching data');
            }
        };
        fetchData();
    }, [search]);

    return (
        <>
            <h1>Search</h1>
            <form>
                <input onChange={handleSearch} type="search" placeholder="buscar información" />
            </form>
            <ul>
                {data.map((row, index) => (
                    <li key={index}>
                        <article>
                            <h2>{index}</h2>
                            <ul>
                                {Object.keys(row).map(key => (
                                    <li key={key}>
                                        <strong>{key}</strong>: {row[key]}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    </li>
                ))}
            </ul>
        </>
    );
};
