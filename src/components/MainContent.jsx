import { useState } from "react";
import BigCharacter from "./BigCharacter";
import CorrLine from "./CorrLine";
import SentimentDist from "./SentimentDist";
import SidebarElement from "./SidebarElement";
import TopicProportion from "./TopicProportion";
import TopicValueTable from "./TopicValueTable";
import WordCloud from "./WordCloud";

const Section = ({ id, number, title, icon, children }) => (
  <section className="mb-12">
    <SidebarElement props={{ section_name: id }} />
    <div className="flex items-center gap-3 mb-6">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/30">
        {number}
      </div>
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <span className="text-lg">{icon}</span>
    </div>
    {children}
  </section>
);

// 분석 방법론 설명 컴포넌트
const MethodologyCard = ({ icon, title, children }) => (
  <div className="glass-card rounded-xl p-5 h-full">
    <div className="flex items-center gap-2 mb-3">
      <span className="text-xl">{icon}</span>
      <h4 className="font-semibold text-white">{title}</h4>
    </div>
    <div className="text-sm text-indigo-200/70 leading-relaxed space-y-2">
      {children}
    </div>
  </div>
);

const TopicDetail = ({ topic }) => (
  <div className="animate-fadeIn space-y-4">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <BigCharacter props={{ title: "트윗 수", content: topic.tweet_number }} />
      <SentimentDist props={{ sentiment_dist: topic.sentiment_dist }} />
      <WordCloud props={{ data: topic.topic_words }} />
      <TopicValueTable
        props={{
          title: "연관 단어",
          description: "LDA 상위 10개",
          headers: ["단어", "값"],
          datas: topic.topic_words.slice(0, 10),
        }}
      />
    </div>

    <div className="grid grid-cols-4 gap-4">
      <BigCharacter props={{ title: "감성 최고일", content: topic.most_positive_day.slice(5) }} />
      <BigCharacter props={{ title: "감성 최저일", content: topic.most_negative_day.slice(5) }} />
      <BigCharacter props={{ title: "분포 최고일", content: topic.max_proportion_day.slice(5) }} />
      <BigCharacter props={{ title: "분포 최저일", content: topic.min_proportion_day.slice(5) }} />
    </div>

    {/* 상관관계 분석 설명 */}
    <div className="glass-card rounded-xl p-4 border-l-2 border-indigo-500">
      <div className="flex items-start gap-3">
        <span className="text-lg">📐</span>
        <div className="text-sm">
          <p className="text-white font-medium mb-1">Pearson 상관계수 해석</p>
          <p className="text-indigo-200/70">
            상관계수는 -1 ~ 1 범위로, <span className="text-rose-400">음수</span>는 역의 상관관계, 
            <span className="text-emerald-400"> 양수</span>는 정의 상관관계를 나타냅니다.
            |r| ≥ 0.7: 강한 상관, 0.4 ≤ |r| &lt; 0.7: 중간 상관, |r| &lt; 0.4: 약한 상관
          </p>
        </div>
      </div>
    </div>

    <CorrLine props={{ data: topic.sentiment_corr, max_corr_window_size: topic.max_corr_window_size }} />

    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="px-5 py-3 bg-indigo-500/10 border-b border-indigo-500/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium">Window 크기별 상관계수</p>
            <p className="text-xs text-indigo-300/60">scipy.stats.pearsonr 사용</p>
          </div>
          <div className="text-xs text-indigo-300/60 text-right">
            <p>이동 평균 적용으로 노이즈 감소</p>
          </div>
        </div>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-indigo-500/5">
          <tr>
            <th className="px-5 py-3 text-left text-xs font-medium text-indigo-300/70">지수</th>
            {topic.correlations.window_sizes.map((d, i) => (
              <th key={i} className="px-5 py-3 text-center text-xs font-medium text-indigo-300/70">{d}일 Window</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-indigo-500/10">
            <td className="px-5 py-3 font-medium text-indigo-100">S&P 500</td>
            {topic.correlations.snp500.map((v, i) => (
              <td key={i} className={`px-5 py-3 text-center font-semibold ${v < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {v}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const MainContent = ({ props }) => {
  const { total_topic, topics } = props;
  const [selectedTopic, setSelectedTopic] = useState(0);

  return (
    <main className="flex-1 min-w-0">
      {/* 서론 */}
      <Section id="introduction" number="1" title="서론" icon="📖">
        <div className="glass-card rounded-2xl p-6">
          <p className="text-indigo-100/80 leading-relaxed mb-6">
            본 보고서는 실시간 데이터와 비재무, 비계량 분석을 결합한 새로운 접근 방식을 통해
            기존 기업 평가의 한계를 해결하고자 한다.
          </p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/15">
              <p className="text-xs text-indigo-300/60 mb-1">수집 기간</p>
              <p className="font-semibold text-white">2023.05.23 ~ 06.15</p>
            </div>
            <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/15">
              <p className="text-xs text-indigo-300/60 mb-1">분석 대상</p>
              <p className="font-semibold text-white">5개 IT 기업</p>
            </div>
            <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/15">
              <p className="text-xs text-indigo-300/60 mb-1">추출 토픽</p>
              <p className="font-semibold text-white">9개</p>
            </div>
          </div>

          {/* 분석 방법론 설명 */}
          <div className="border-t border-indigo-500/10 pt-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span>🔬</span> 분석 방법론
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MethodologyCard icon="📊" title="LDA 토픽 모델링">
                <p>Latent Dirichlet Allocation을 사용하여 트윗에서 잠재 토픽을 추출합니다.</p>
                <p className="text-indigo-400">• 상위 50개 단어로 토픽 특성 파악</p>
              </MethodologyCard>

              <MethodologyCard icon="🤖" title="RoBERTa 감성분석">
                <p>사전 학습된 RoBERTa 모델을 fine-tuning하여 트윗의 감성을 분류합니다.</p>
                <p className="text-indigo-400">• 긍정 / 부정 / 중립 3분류</p>
              </MethodologyCard>

              <MethodologyCard icon="📐" title="Pearson 상관계수">
                <p><code className="bg-indigo-500/20 px-1 rounded">scipy.stats.pearsonr</code> 함수로 감성 점수와 주가 지수 간 상관관계를 계산합니다.</p>
                <p className="text-indigo-400">• -1(역상관) ~ +1(정상관)</p>
              </MethodologyCard>

              <MethodologyCard icon="📈" title="Window Size">
                <p>3일, 5일, 7일 이동 평균을 적용하여 일별 변동성(노이즈)을 줄입니다.</p>
                <p className="text-indigo-400">• 더 안정적인 상관관계 도출</p>
              </MethodologyCard>
            </div>
          </div>

          {/* 감성 점수 계산 공식 */}
          <div className="mt-6 p-4 bg-slate-900/50 rounded-xl border border-indigo-500/10">
            <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <span>🧮</span> 일별 감성 점수 계산 공식
            </h4>
            <div className="bg-indigo-500/10 p-4 rounded-lg font-mono text-sm text-center text-indigo-200">
              Score = ((긍정 수 - 부정 수) / 전체 트윗) × (1 - 중립 비율)
            </div>
            <p className="text-xs text-indigo-300/60 mt-2">
              긍정이 많으면 양수, 부정이 많으면 음수로 계산되며, 중립이 많을수록 점수의 절대값이 작아집니다.
            </p>
          </div>
        </div>
      </Section>

      {/* 전체 분석 */}
      <Section id="total_topic_analysis" number="2" title="전체 토픽 분석" icon="📊">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <BigCharacter props={{ title: "총 트윗", content: total_topic.tweet_number }} />
          <SentimentDist props={{ sentiment_dist: total_topic.sentiment_dist }} />
          <TopicValueTable
            props={{
              title: "감성 순위",
              description: "긍정-부정 기준",
              headers: ["토픽", "값"],
              datas: total_topic.sentiment_dist_rank,
            }}
          />
          <TopicValueTable
            props={{
              title: "상관관계 순위",
              description: "S&P500 기준",
              headers: ["토픽", "값"],
              datas: total_topic.corr_rank_list,
            }}
          />
        </div>

        {/* 상관관계 순위 설명 */}
        <div className="glass-card rounded-xl p-4 mb-4 border-l-2 border-sky-500">
          <div className="flex items-start gap-3">
            <span className="text-lg">💡</span>
            <div className="text-sm">
              <p className="text-white font-medium mb-1">상관관계 순위 해석</p>
              <p className="text-indigo-200/70">
                <span className="text-rose-400">음의 상관관계</span>는 감성 점수가 높아질 때 주가가 하락하는 경향을 의미합니다.
                이는 "호재가 이미 반영됨" 또는 "기대 심리 후 실망 매도" 현상으로 해석될 수 있습니다.
                상관관계 값은 5일 Window 기준 S&P500과 NASDAQ100의 평균입니다.
              </p>
            </div>
          </div>
        </div>

        <TopicProportion props={{ data: total_topic.topic_proportions }} />
      </Section>

      {/* 토픽별 분석 */}
      <Section id="analysisPerTopic" number="3" title="토픽별 감성 분석" icon="💬">
        <div className="glass-card rounded-2xl overflow-hidden">
          {/* 탭 */}
          <div className="flex flex-wrap gap-2 p-3 bg-indigo-500/5 border-b border-indigo-500/10">
            {topics.map((topic, i) => (
              <button
                key={i}
                onClick={() => setSelectedTopic(i)}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                  selectedTopic === i
                    ? 'bg-gradient-to-r from-indigo-500 to-sky-500 text-white shadow-lg shadow-indigo-500/30'
                    : 'text-indigo-300/70 hover:text-white hover:bg-indigo-500/15'
                }`}
              >
                {topic.topic_name}
              </button>
            ))}
          </div>

          {/* 선택된 토픽 헤더 */}
          <div className="px-6 py-5 border-b border-indigo-500/10 flex items-center justify-between bg-gradient-to-r from-indigo-500/10 to-sky-500/10">
            <div>
              <SidebarElement props={{ section_name: topics[selectedTopic].topic_name }} />
              <h3 className="text-xl font-bold text-white">{topics[selectedTopic].topic_name}</h3>
              <p className="text-sm text-indigo-300/60">토픽 #{selectedTopic + 1}</p>
            </div>
            <div className="flex gap-6 text-sm">
              <div className="text-right">
                <p className="text-indigo-400/50 text-xs">트윗 수</p>
                <p className="text-white font-semibold">{topics[selectedTopic].tweet_number.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-indigo-400/50 text-xs">상관계수 (5일)</p>
                <p className={`font-semibold ${topics[selectedTopic].correlations.snp500[1] < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {topics[selectedTopic].correlations.snp500[1]}
                </p>
              </div>
            </div>
          </div>

          {/* 내용 */}
          <div className="p-6">
            <TopicDetail topic={topics[selectedTopic]} />
          </div>

          {/* 네비게이션 */}
          <div className="px-6 py-4 bg-indigo-500/5 border-t border-indigo-500/10 flex justify-between items-center">
            <button
              onClick={() => setSelectedTopic(p => Math.max(0, p - 1))}
              disabled={selectedTopic === 0}
              className={`text-sm font-medium flex items-center gap-2 ${selectedTopic === 0 ? 'text-indigo-500/30' : 'text-indigo-300/70 hover:text-white'}`}
            >
              ← 이전 토픽
            </button>
            <div className="flex gap-1.5">
              {topics.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedTopic(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    selectedTopic === i ? 'bg-indigo-500 w-5' : 'bg-indigo-500/30 hover:bg-indigo-500/50'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setSelectedTopic(p => Math.min(topics.length - 1, p + 1))}
              disabled={selectedTopic === topics.length - 1}
              className={`text-sm font-medium flex items-center gap-2 ${selectedTopic === topics.length - 1 ? 'text-indigo-500/30' : 'text-indigo-300/70 hover:text-white'}`}
            >
              다음 토픽 →
            </button>
          </div>
        </div>
      </Section>

      {/* 결론 */}
      <Section id="conclusion" number="4" title="결론" icon="📝">
        <div className="glass-card rounded-2xl p-6">
          <p className="text-indigo-100/80 leading-relaxed mb-6">
            토픽 모델링과 감성 분석을 통해 대중의 감성을 수치화하고, 이를 기업 비재무 평가에 활용할 수 있음을 확인하였다.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-5 bg-gradient-to-br from-indigo-500/20 to-indigo-500/5 rounded-xl border border-indigo-500/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🏆</span>
                <p className="font-semibold text-white">GPU 토픽</p>
              </div>
              <p className="text-sm text-indigo-200/70 mb-2">p-value 기반 가장 신뢰할 수 있는 토픽, 기술 혁신과 높은 연관성</p>
              <div className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded inline-block">
                통계적 유의성 검증 완료
              </div>
            </div>
            <div className="p-5 bg-gradient-to-br from-sky-500/20 to-sky-500/5 rounded-xl border border-sky-500/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">📈</span>
                <p className="font-semibold text-white">상관계수 -0.68</p>
              </div>
              <p className="text-sm text-sky-200/70 mb-2">감성과 주가 지수 사이 강한 음의 상관관계 확인</p>
              <div className="text-xs text-sky-400 bg-sky-500/10 px-2 py-1 rounded inline-block">
                |r| ≥ 0.6 = 강한 상관
              </div>
            </div>
          </div>

          {/* p-value 설명 */}
          <div className="p-4 bg-slate-900/50 rounded-xl border border-indigo-500/10">
            <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <span>🎯</span> p-value란?
            </h4>
            <p className="text-sm text-indigo-200/70">
              <strong className="text-indigo-300">p-value (유의확률)</strong>는 귀무가설이 참일 때 현재 관측된 결과 또는 
              그보다 극단적인 결과가 나올 확률입니다. 일반적으로 <span className="text-emerald-400">p &lt; 0.05</span>이면 
              통계적으로 유의미한 것으로 판단합니다. GPU 토픽은 이 기준을 충족하여 감성 점수와 주가 지수 간 
              상관관계가 우연이 아닌 실제 관계임을 나타냅니다.
            </p>
          </div>

          <p className="mt-4 text-rose-400/80 text-sm">
            ⚠️ 본 분석은 참고용이며, 투자 결정의 유일한 근거가 될 수 없습니다.
          </p>
        </div>
      </Section>
    </main>
  );
};

export default MainContent;
