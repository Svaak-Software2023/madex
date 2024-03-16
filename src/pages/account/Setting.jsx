import { useState } from "react";
import Account from "./Account";
import Notifications from "./Notifications";
import Downloads from "./Downloads";
import "./style.css";
import Privacy from "./Privacy";
import AdvancedSetting from "./AdvancedSetting";

const SettingMenus = [
  {
    id: 1,
    name: "Account",
  },
  {
    id: 2,
    name: "Notifications",
  },
  {
    id: 3,
    name: "Downloads",
  },
  {
    id: 4,
    name: "Privacy",
  },
  {
    id: 5,
    name: "Advanced Settings",
  },
];

const Setting = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return <Account handleTabClick />;
      case 2:
        return <Notifications />;
      case 3:
        return <Downloads />;
      case 4:
        return <Privacy />;
      case 5:
        return <AdvancedSetting />;
      default:
        return <Account />;
    }
  };

  return (
    <>
      <div className="container">
        <div className="setting-container">
          <div className="sideMenu_settings">
            <p className="ml-2 small-device">Setting</p>
            {SettingMenus.map((item, index) => {
              return (
                <button
                  key={index}
                  onClick={() => handleTabClick(item.id)}
                  className={`setting-tab ${
                    activeTab === index + 1 && "set-active-btn"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
          <div className="setting_container">{renderTabContent()}</div>
        </div>
      </div>
    </>
  );
};

export default Setting;
