import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import MainContent from "../components/MainContent";
import { mockData } from "../data/mockData";

const USE_API = false;
const API_URL = "http://localhost:8000/api";

const OneReport = () => {
  const [total_topic, set_total_topic] = useState(null);
  const [topics, setTopics] = useState(null);

  useEffect(() => {
    if (USE_API) {
      fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
          set_total_topic(data.total_topic);
          setTopics(data.topics.slice(1));
        })
        .catch(() => {
          set_total_topic(mockData.total_topic);
          setTopics(mockData.topics.slice(1));
        });
    } else {
      set_total_topic(mockData.total_topic);
      setTopics(mockData.topics.slice(1));
    }
  }, []);

  if (total_topic === null || topics === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050816]">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-indigo-300">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.2),rgba(0,0,0,0))]">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 glass border-b border-indigo-500/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center shadow-lg glow-indigo text-2xl">
              📊
            </div>
            <div>
              <span className="text-xl font-bold gradient-text">Senty</span>
              <p className="text-xs text-indigo-300/60">Sentiment Analysis</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 bg-indigo-500/15 text-indigo-300 rounded-full text-sm font-medium border border-indigo-500/20">
              IT 기업 분석
            </span>
            <span className="text-sm text-indigo-300/60">2023.05 - 06</span>
          </div>
        </div>
      </header>

      {/* 메인 */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          <Sidebar props={{ datas: topics }} />
          <MainContent props={{ total_topic: total_topic, topics: topics }} />
        </div>
      </div>
    </div>
  );
};

export default OneReport;
