import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchJokeById } from '../../redux/searchSlice';
import styles from './JokeDetails.module.scss';
import Loading from '../../Loading/Loading';

export default function JokeDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const jokeDetails = useSelector((state) => state.search.currentJoke);
  const loading = useSelector((state) => state.search.loading);

  useEffect(() => {
    if (id) {
      dispatch(fetchJokeById(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (!jokeDetails) {
    return <p>No joke found.</p>;
  }

  return (
    <div className={styles.jokeDetailsContainer}>
    <div className={styles.jokeItem}>
    <div className={styles.jokeText}>
      <p>{jokeDetails.value}</p>
    </div>
    <div className={styles.jokeFooter}>
      <span>{jokeDetails.id}</span> <span>{new Date(jokeDetails.updated_at).toLocaleDateString()}</span>
    </div>
  </div>
  </div>
  );
}
