import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllHistory,
  getAllHistory,
} from "../../redux/featurs/historySlice";
import HistoryList from "./historyList/HistoryList";
import Loading from "../../assets/loader/Loading";

const History = () => {
  const dispatch = useDispatch();
  // const { historyData } = useSelector((state) => state.history.historyData);
  const { historyData, loading } = useSelector((state) => state.history);

  const token = JSON.parse(localStorage.getItem("accessToken"));
  const accessToken = token.accessToken;

  useEffect(() => {
    dispatch(getAllHistory(accessToken));
  }, [accessToken, dispatch]);

  const clearAllHistory = () => {
    dispatch(deleteAllHistory(accessToken));
  };

  if (!historyData || historyData.length === 0) {
    return (
      <>
        <div className="m-3">
          <h3 className=''>History</h3>
        </div>
        <h4 className="text-center mt-5">No History Found</h4>
      </>
    );
  }

  if(loading) return <Loading/>

  return (
    <>
      <div className="m-3">
        <h3 className=''>History</h3>
      </div>
      <div className="history-list-main">
        {/* {loading && <p className="h6">video is removing from history</p>} */}

        {historyData && historyData.length > 0 && (
          <HistoryList historyData={historyData} token={accessToken} />
        )}
        <div className="clear-all-watch-later">

          <button onClick={clearAllHistory}>
            Clear All Watch Later
          </button>
        </div>
      </div>
    </>
  );
};

export default History;
