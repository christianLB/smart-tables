import React, { useState } from 'react';
import styles from '../styles/Home.module.scss'
import { Effect } from '../components/effect'
import { debounce } from 'lodash'
import { useEffect } from 'react';

export default function Home() {
  const [value, setValue] = useState('hi')
  const [value2, setValue2] = useState('hi')
  const debouncedValue = useDebounce(value, 500)

  const apply = () => {
    setValue2(value)
  }

  useEffect(() => {
    apply()
  }, [debouncedValue])


  return (
    <div className={styles['page-container']} >
      <button onClick={() => setValue2('hola')}>hola</button>
      <button onClick={() => setValue2('chau')}>chau</button>
      <button onClick={() => setValue2('mierda')}>mierda</button>
      <div className={'box'}>
        <Effect><div>{value2}</div></Effect>
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
