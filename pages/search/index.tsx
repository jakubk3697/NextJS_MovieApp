import { useRouter } from 'next/router';
import { fetchMoviesByTitle } from '@/API/moviedbAPI';
import { useQuery } from 'react-query';

function SearchPage() {
    const router = useRouter();
    const { query }: any = router.query;
    
    const { data, isLoading, isError } = useQuery(
        ['movies', { query }],
        () => fetchMoviesByTitle(query),
        {
            enabled: !!query,
        }
    )
    return (
        <div>
            <h1>Search Results for {query}</h1>

        </div>
    )
}

export default SearchPage