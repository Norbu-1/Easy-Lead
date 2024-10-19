import React, { useState } from 'react';
import Loading from './Loading';

function Catdata() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=5&page=10&order=Desc');
      const data = await response.json();
      setCats(data);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='outside'>
      <div className='inside'>
      <button onClick={fetchData} className='button'>Fetch Cats</button>
      {loading && <p className='load'><Loading/></p>}
      {cats.length === 0 && !loading && <p className='noImage'>No images available</p>}
      {error && <p>{error}</p>}
      </div>
      <div className="grid-container">
        {cats.map(cat => (
          <div key={cat.id} className="card">
            <img src={cat.url} alt="Cat" className='catImg'/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catdata;
