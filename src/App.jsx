// src/App.js
import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { fetchData, setPage } from './redux-toolkit/slice';

function App() {
  const dispatch = useDispatch();
  const { data, status, currentPage, totalPages } = useSelector((state) => state.data);
  console.log(data);

  useEffect(() => {
    dispatch(fetchData(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  return (
    <div className="App">
      <h1>Data List</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error fetching data</p>}
      {status === 'succeeded' && (
        <div>
          <ul>
            {data.cars.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
          <div>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                style={{border: '1px solid black'}}
                key={index}
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

