import React from 'react'
import styles from './JokeList.module.scss';
import JokeItem from '../JokeItem/JokeItem';

export default function JokeList(props) {
  return (
    <div className={styles.jokeListContainer}>
    <div className={styles.jokeList}>
      {props.entities.map((joke, index) => (
        <JokeItem
          key={joke.id}
          joke={joke}
          isLarge={index < 2} 
        />
      ))}
    </div>
    </div>
  )
}
