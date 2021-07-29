import React, { useState } from 'react';
import styles from '../styles/Home.module.scss'
import { Effect } from '../components/effect'
import { debounce } from 'lodash'
import { useEffect } from 'react';
import * as transitions from '../utils/transitions'

export default function Home() {
  const [value, setValue] = useState('hi')
  const [onEnter, setOnEnter] = useState('fadeIn')
  const [onLeave, setOnLeave] = useState('fadeOut')
  const [customValue, setCustomValue] = useState('')
  //const debouncedValue = useDebounce(value, 500)

  // const apply = () => {
  //   setValue2(value)
  // }

  // useEffect(() => {
  //   apply()
  // }, [debouncedValue])
  const transitionOptions = () => Object.keys(transitions).map(transition => <option key={transition} value={transition}>{transition}</option>)

  return (
    <div className={styles['page-container']} >
      <div className={'controls'}>
        <label htmlFor={'buttons'}>Render: </label>
        <div name={'buttons'} className={'buttons'}>
          <button onClick={() => setValue('value 1')}>1</button>
          <button onClick={() => setValue('value 2')}>2</button>
          <button onClick={() => setValue('value 3')}>3</button>
          <button onClick={() => setValue(1000)}>1000</button>
          <button onClick={() => setValue(2000)}>2000</button>
          <button onClick={() => setValue(<icon>✈</icon>)}>✈</button>
          <button onClick={() => setValue(<icon>😲</icon>)}>😲</button>
          <button onClick={() => setValue(<icon>🚴</icon>)}>🚴</button>
          <button onClick={() => setValue(<icon>👙</icon>)}>👙</button>
          <button onClick={() => setValue(<icon>🏀</icon>)}>🏀</button>
        </div>

        <label htmlFor={'custom'}>custom: </label>
        <input type={'text'} value={customValue} onChange={e => setCustomValue(e.target.value)} /> <button onClick={() => setValue(customValue)}>Set</button>

        <label htmlFor={'entering'}>entering: </label>
        <select name={'entering'} value={onEnter} onChange={(e) => setOnEnter(e.target.value)}>
          {transitionOptions()}
        </select>
        <label htmlFor={'leaving'}>leaving: </label>
        <select value={onLeave} onChange={(e) => setOnLeave(e.target.value)}>
          {transitionOptions()}
        </select>
      </div>

      <div className={'box'}>
        <Effect onEnter={onEnter} onLeave={onLeave}>
          <div>{value}</div>
        </Effect>
      </div>
    </div>
  )
}

function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}
