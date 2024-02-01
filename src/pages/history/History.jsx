import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllHistory,
  getAllHistory,
} from "../../redux/featurs/historySlice";
import HistoryList from "../../components/historyList/HistoryList";

const History = () => {
  const dispatch = useDispatch();
  // const { historyData } = useSelector((state) => state.history.historyData);
  const { historyData, loading } = useSelector((state) => state.history);

  const token = JSON.parse(localStorage.getItem("accessToken"));
  const accessToken = token.accessToken;
  useEffect(() => {
    dispatch(getAllHistory(accessToken));
  }, [accessToken, dispatch]);

  if (!historyData || historyData.length === 0) {
    return (
      <>
        <p className="h2 mt-3">Watch History</p>

        <h4 className="text-center mt-5">No History Found</h4>
      </>
    );
  }

  const clearAllHistory = () => {
    dispatch(deleteAllHistory(accessToken));
  };

  return (
    <>
      <p className="h3 mt-3">Watch History</p>
      <div className="history-list-main">
        {loading && <p className="h6">video is removing from history</p>}
        {historyData && historyData.length > 0 && (
          <HistoryList historyData={historyData} token={accessToken} />
        )}
        <button className="clear-history" onClick={clearAllHistory}>
          Clear All History
        </button>
      </div>
    </>
  );
};

export default History;
