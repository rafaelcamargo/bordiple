import './tabs.styl';
import { useState } from 'react';

export const Tab = ({ children }) => {
  return (
    <>{children}</>
  );
};

export const Tabs = ({ children }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  return (
    <div className="b-tabs">
      <div className="b-tabs-control">
        {children.map((tab, index) => (
          <button
            key={index}
            className={`b-tabs-control-btn ${handleActiveCssClass(index, selectedTabIndex)}`}
            onClick={() => setSelectedTabIndex(index)}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      {children.map((tab, index) => (
        <div
          key={index}
          className={`b-tabs-content ${handleActiveCssClass(index, selectedTabIndex)}`}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

function handleActiveCssClass(tabIndex, selectedTabIndex){
  return tabIndex === selectedTabIndex ? 'is-active' : '';
}
