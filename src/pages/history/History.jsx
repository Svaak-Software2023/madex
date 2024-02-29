import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllHistory,
  getAllHistory,
} from "../../redux/featurs/historySlice";
import HistoryList from "./historyList/HistoryList";
import Loading from "../../assets/loader/Loading";
import "./style.css";
import NoDataFound from "../../components/Error/NoDataFound";

const History = () => {
  const dispatch = useDispatch();
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
        <div className="page-heading">
          <div className="heading-img-container">
            <img src="/assets/icons/chronicle.png" alt="" />
          </div>
          <h3 className="heading-name">Chronicle</h3>
        </div>
        <NoDataFound />
      </>
    );
  }

  if (loading) return <Loading />;

  return (
    <>
      <div className="page-heading">
        <div className="heading-img-container">
          <img src="/assets/icons/chronicle.png" alt="" />
        </div>
        <h3 className="heading-name">Chronicle</h3>
      </div>
      <div className="history-list-main">
        {historyData && historyData.length > 0 && (
          <HistoryList historyData={historyData} token={accessToken} />
        )}
        <div className="clear-all-watch-later">
          <button onClick={clearAllHistory}>Clear All Watch Later</button>
        </div>
      </div>
    </>
  );
};

export default History;
