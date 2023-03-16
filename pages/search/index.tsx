import { useRouter } from 'next/router'

function SearchPage() {
  const router = useRouter()
  const { query } = router.query

  return (
    <div>
      <h1>Search Results for {query}</h1>
        
    </div>
  )
}

export default SearchPage