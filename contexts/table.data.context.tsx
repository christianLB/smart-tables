import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = React.createContext(null);
export const useData = () => useContext(DataContext);
interface DataProviderProps {
  api: any;
  params: any;
  children?: JSX.Element;
}
export const DataProvider: FunctionComponent<DataProviderProps> = ({
  api,
  children,
  params,
}) => {
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTableData = async () => {
    try {
      setLoading(true);
      const data = (api && (await api(params))) || {};
      setRows(data?.rows);
      setHeaders(data?.headers);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTableData();
  }, []);

  return (
    <DataContext.Provider value={{ rows, headers, loading }}>
      {children}
    </DataContext.Provider>
  );
};
