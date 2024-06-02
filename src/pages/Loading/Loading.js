import React, { useEffect, useState } from 'react';
import RingLoader from "react-spinners/RingLoader";

const Loading = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  const override = {
    display: "flex",
    margin: "30vh auto",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div className='bg-pink-400 h-screen flex justify-center items-center'>
      <RingLoader
        color="pink"
        loading={loading}
        cssOverride={override}
        size={300}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
