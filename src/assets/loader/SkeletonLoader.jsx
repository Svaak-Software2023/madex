import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const SkeletonLoader = () => {
  return (
    <>
      {/* <div className="d-flex flex-wrap flex-row bd-highlight align-items-start m-5"> */}
      <div className="m-2">
        <Skeleton width={320} height={190} />
        <div className="d-flex mt-1">
          <Skeleton
            circle
            height={38}
            width={38}
            containerClassName="avatar-skeleton"
          />
          <div>
            <Skeleton width={280} />
            <Skeleton width={280} />
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default SkeletonLoader;
