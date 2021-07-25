import styles from '../styles/Home.module.scss'
import { TableView } from '../components/table/table.view'
import { tableData } from './api/tabledata'
import { creditcards } from './api/creditcards'

export default function Home() {
  return (
    <div className={styles['page-container']}>
      <TableView api={tableData} />
      <TableView api={creditcards} />
    </div>
  )
}
