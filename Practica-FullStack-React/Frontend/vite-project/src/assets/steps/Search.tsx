import { Data } from '../../types';
import { useEffect, useState } from "react";
import { toast } from 'sonner';
import { useDebounce } from '@uidotdev/usehooks';

const DEBOUNCE_TIME = 500;

export const Search = ({ initialData }: { initialData: Data }) => {
    const [data, setData] = useState<Data>(initialData);
    const [search, setSearch] = useState<string>(() => {
        const searchParams = new URLSearchParams(window.location.search); // para filtrar la URL
        return searchParams.get('q') || '';
    });

    const debouncedSearch = useDebounce(search, DEBOUNCE_TIME);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        const newPathname = search === ''
            ? window.location.pathname
            : `?q=${debouncedSearch}`;

        window.history.pushState({}, '', newPathname);
    }, [debouncedSearch, search]);

    useEffect(() => {
        // llamar a la API para filtrar los resultados
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/users?q=${debouncedSearch}`);

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
    }, [debouncedSearch, initialData]);

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
                                        <p><strong>{key}</strong>: {row[key]}</p>
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
