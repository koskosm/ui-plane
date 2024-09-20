import React, { useState } from 'react';

const TabsDemo = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: 'Tab 1', content: 'This is the content for Tab 1.' },
    { label: 'Tab 2', content: 'Here\'s some information in Tab 2.' },
    { label: 'Tab 3', content: 'Tab 3 contains different data.' },
  ];

  return (
    <div className="tabs-demo bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Tabs Demo</h2>
      <div className="tabs flex border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab py-2 px-4 font-semibold ${
              activeTab === index
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content mt-4 p-4 bg-gray-50 rounded">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default TabsDemo;