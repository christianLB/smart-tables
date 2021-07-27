import styles from '../styles/Home.module.scss'
import { TableView } from '../components/table/table.view'
import { tableData } from './api/tabledata'
import { creditcards } from './api/creditcards'
import { products } from './api/products.api'
import { users } from './api/users.api'
import { covid } from './api/covid.api'

export default function Home() {
  return (
    <div className={styles['page-container']}>
      <TableView api={covid} params={{ country: 'Argentina' }} />
      <TableView api={covid} params={{ country: 'Chile' }} />
      <TableView api={covid} params={{ country: 'Brazil' }} />
      <TableView api={covid} params={{ country: 'Peru' }} />
      <TableView api={covid} params={{ country: 'US' }} />
    </div>
  )
}
