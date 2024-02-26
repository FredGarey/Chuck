import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJokes } from '../redux/searchSlice';
import styles from './Search.module.scss';
import { debounce } from 'lodash';
import Loading from '../Loading/Loading';
import JokeList from '../Joke/JokeList/JokeList';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { entities, loading } = useSelector((state) => state.search);

  const debouncedSearch = useCallback(
    debounce((searchQuery) => {
      dispatch(fetchJokes(searchQuery));
    }, 500),
    [] 
  );

  useEffect(() => {
    if (query.length >= 3) {
      debouncedSearch(query);
    } 
  }, [query, debouncedSearch]); 

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <div className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          type="text"
          value={query}
          onChange={handleInputChange}
          autoFocus
          placeholder="Search jokes..."
        />
        {entities.length > 0 && <div className={styles.resultCount}><span>{entities.length} jokes found</span></div>}
      </div>
      {loading ? <Loading /> : <JokeList entities={entities} />}
      
    </div>
  );
};

export default SearchComponent;
