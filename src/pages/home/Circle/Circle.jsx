import "./style.css";
import { Link } from "react-router-dom";

import { FaSearch } from "react-icons/fa";

const Circle = () => {
  return (
    <>
      <div className="orbit">
        <div className="center-image">
          <img src="assets/circle/circle-logo.png" alt="" />
          {/* <img src="assets/circle/campass.png" alt="" /> */}
        </div>
        <ul>
          <li>
            <div>
              <img
                src="assets/icons/assistanceSupport.png"
                alt=""
                style={{ height: "60px" }}
              />
            </div>
            <Link to="">Assistance support</Link>
          </li>
          <li>
            <div>
              <img
                src="assets/icons/subscriptions.png"
                alt=""
                style={{ height: "60px" }}
              />
            </div>
            <Link to="">Subscription</Link>
          </li>
          <li>
            <div>
              <img
                src="assets/icons/madeXJunior.png"
                alt=""
                style={{ height: "60px" }}
              />
            </div>
            <Link to="">MadeX Junior</Link>
          </li>
          <li>
            <div>
              <img
                src="assets/icons/stageSettings.png"
                alt=""
                style={{ height: "60px" }}
              />
            </div>
            <Link to="">Stage settings</Link>
          </li>
          <li>
            <div>
              {/* <img
                src="assets/icons/madeXJunior.png"
                alt=""
                style={{ height: "60px" }}
              /> */}
              <FaSearch style={{ fontSize: "30px", color: "navy" }} />
            </div>
            <Link to="">Tour/Search</Link>
          </li>
          <li>
            <div>
              <img
                src="assets/circle/logout.svg"
                alt=""
                style={{ height: "60px" }}
              />
            </div>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <div>
              <img
                src="assets/icons/compass.png"
                alt=""
                style={{ height: "60px" }}
              />
            </div>
            <Link to="/second-home">Navigation</Link>
          </li>
          <li>
            <div>
              <img
                src="/assets/icons/miniClips.png"
                alt=""
                style={{ height: "60px" }}
              />
            </div>
            <Link to="">Mini Clip</Link>
          </li>
          <li>
            <div>
              <img
                src="assets/icons/station.png"
                alt=""
                style={{ height: "60px" }}
              />
            </div>
            <Link to="">Account</Link>
          </li>
          <li>
            <div>
              <img
                src="assets/icons/madeXBull.png"
                alt=""
                style={{ height: "60px" }}
              />
            </div>
            <Link to="">More from MadeX</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Circle;
