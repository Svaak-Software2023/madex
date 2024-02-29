const NoDataFound = () => {
  return (
    <>
      <div className="text-center">
        <img
          src="/assets/messageImages/empty.jpg"
          alt=""
          style={{ height: "300px", margin: "auto" }}
        />
        <h4 className="mt-2 text-4xl font-bold text-gray-800">
          Empty Now, But Not for Long
        </h4>
        <p className="mt-2 text-gray-600">Excitement Ahead!</p>
        {/* <h4 className="text-center mt-5">No History Found</h4> */}
      </div>
    </>
  );
};

export default NoDataFound;
