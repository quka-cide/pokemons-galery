import React, { useCallback, useEffect, useState } from 'react'
import './styles.css'

function App() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const limit = 12;
    const offset = (page - 1) * limit;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await res.json();
    setItems((prevItems) => [...prevItems, ...data.results]);
    setHasMore(data.results.length === limit);
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchData()
  }, [fetchData]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    };
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll])

  return (
    <div className='container'>
      <ul className='list'>
        {items.map((item, index) => (
          <li className='item' key={index}>{item.name}
          <img className='img' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} />
          </li>
        ))}
      </ul>
      {loading && <p className='loading'>Loading...</p>}
    </div>
  )
}

export default App