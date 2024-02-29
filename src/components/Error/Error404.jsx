function Error404() {
  return (
    <div className="d-flex align-items-center justify-content-center h-100 bg-gray-100">
      <div className="text-center">
        {/* <LuConstruction className="mx-auto h-80 w-80 text-gray-400" /> */}
        <img
          src="/assets/messageImages/construction.jpg"
          alt=""
          style={{ height: "400px" }}
        />
        <h1 className="mt-2 text-4xl font-bold text-gray-800">
          Under Construction
        </h1>
        <p className="mt-2 text-gray-600">
          We&apos;re working on it. Stay tuned!
        </p>
      </div>
    </div>
    // <div className='my-3' style={{ display: "grid", height: "500px", placeItems: "center" }}>
    //     <div className='text-center'>
    //         <h3>Error 404 </h3>
    //         <h3>Page Not Found</h3>
    //     </div>
    // </div>
  );
}

export default Error404;
