import React from 'react';
import styles from './JokeItem.module.scss';
import { useNavigate } from 'react-router-dom';

export default function JokeItem({ joke, isLarge }) {
    const itemStyle = isLarge ? styles.largeJokeItem : styles.smallJokeItem;

    const navigate = useNavigate();

    const formatText = (text) => {
        return text.length > 200 ? text.substring(0, 200) + '...' : text;
      }

      const goToJokePage = () => {
        navigate(`/jokes/${joke.id}`);
      };
  return (
    <>
        <div className={`${styles.jokeItem} ${itemStyle}`} onClick={goToJokePage}>
          <div className={styles.jokeText}>
            <p>{formatText(joke.value)}</p>
          </div>
          <div className={styles.jokeFooter}>
            <span>{joke.id}</span> <span>{new Date(joke.updated_at).toLocaleDateString()}</span>
          </div>
        </div>
    </>
  );
}