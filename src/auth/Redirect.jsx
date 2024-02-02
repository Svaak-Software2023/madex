import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
function Redirect() {
  // state for count 
  const [count, setCount] = useState(5);
  // navigate to an other route 
  const navigate = useNavigate()

  // show count then send login page 
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);
    if (count === 0) {
      clearInterval(intervalId);
      navigate("/login")
    }
    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [count]);

  return (
    <div className='d-flex justify-content-center' style={{ display: "grid", height: "500px", placeItems: "center" }}>
      <div className='text-center'>
        <h3>Unauthorized Access</h3>
        <p> Sorry, you do not have permission to access this resource. Please
          authenticate yourself.</p>
        <h3>Wait for {count} seconds</h3>
      </div>
    </div>
  )
}

export default Redirect