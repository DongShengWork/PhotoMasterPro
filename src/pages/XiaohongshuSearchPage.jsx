import { useState } from 'react'

// 小红书教程搜索页
export default function XiaohongshuSearchPage({ mode, onBack }) {
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = () => {
    setIsLoading(true)
    setSearched(true)
    // 模拟搜索结果（实际项目中接入小红书API）
    setTimeout(() => {
      setSearchResults(SIMULATED_RESULTS)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen pb-8">
      <div className="px-5 pt-14">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-gray-400 text-sm mb-4 active:opacity-70"
        >
          <span>←</span> 返回
        </button>
        <h1 className="text-2xl font-bold text-white mb-1">📕 小红书教程</h1>
        <p className="text-sm text-gray-400 mb-5">
          搜索「{mode.searchKeywords}」相关内容
        </p>

        {/* 搜索框 */}
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-2xl py-3.5 text-sm mb-5 flex items-center justify-center gap-2 active:opacity-90 disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <span className="animate-spin">⏳</span>
              搜索中...
            </>
          ) : (
            <>
              <span>🔍</span>
              搜索小红书教程
            </>
          )}
        </button>

        {/* 搜索提示 */}
        {!searched && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📕</div>
            <p className="text-sm text-gray-400">点击上方按钮搜索</p>
            <p className="text-xs text-gray-500 mt-1">{mode.searchKeywords}</p>
          </div>
        )}

        {/* 加载中 */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="text-4xl animate-pulse mb-4">📕</div>
            <p className="text-sm text-gray-400">正在搜索...</p>
          </div>
        )}

        {/* 搜索结果 */}
        {!isLoading && searched && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-300">搜索结果</h2>
              <span className="text-xs text-gray-500">{searchResults.length} 条</span>
            </div>
            <div className="space-y-3">
              {searchResults.map((result, idx) => (
                <div key={idx} className="bg-darkCard rounded-2xl overflow-hidden border border-gray-800">
                  {result.image && (
                    <img src={result.image} alt={result.title} className="w-full h-40 object-cover" />
                  )}
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-white mb-2 leading-snug">{result.title}</h3>
                    <p className="text-xs text-gray-400 mb-3 line-clamp-2">{result.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">❤️ {result.likes}</span>
                        <span className="text-xs text-gray-500">💬 {result.comments}</span>
                      </div>
                      <a
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-accent flex items-center gap-1"
                      >
                        查看 →
                      </a>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {result.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-0.5 bg-dark rounded-full text-gray-500">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 提示说明 */}
            <div className="mt-6 p-4 bg-darkCard rounded-2xl border border-gray-800">
              <div className="text-xs text-gray-400 leading-relaxed">
                <p className="mb-2">💡 <strong className="text-gray-300">使用说明：</strong></p>
                <p className="text-xs text-gray-500">• 上述为模拟数据，实际使用时将接入小红书开放API获取真实内容</p>
                <p className="text-xs text-gray-500">• 点击「查看」将跳转到小红书App或网页</p>
                <p className="text-xs text-gray-500">• 建议在App内搜索关键词获得最佳体验</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// 模拟搜索结果（实际项目中替换为真实API数据）
const SIMULATED_RESULTS = [
  {
    title: '手机拍星空教程｜保姆级教程，新手也能拍出银河🌌',
    description: '很多小伙伴问我手机怎么拍星空，今天分享一下用华为/iPhone拍银河的完整教程，包括参数设置、APP推荐和后期调色。',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80',
    url: 'https://www.xiaohongshu.com/search_result?keyword=手机拍星空教程',
    likes: '2.3万',
    comments: '1847',
    tags: ['星空摄影', '手机拍照', '教程']
  },
  {
    title: '手机逆光拍照技巧｜这样拍光斑绝了✨',
    description: '逆光拍照总是黑脸？今天教你3个技巧，轻松拍出氛围感逆光照，还有详细参数设置。',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    url: 'https://www.xiaohongshu.com/search_result?keyword=手机逆光拍照教程',
    likes: '1.8万',
    comments: '956',
    tags: ['逆光摄影', '拍照技巧', '手机摄影']
  },
  {
    title: 'iPhone人像模式保姆教程｜虚化效果拉满🍎',
    description: 'iPhone人像模式怎么用？分享我常用的设置和拍摄技巧，让你的照片更有质感。',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80',
    url: 'https://www.xiaohongshu.com/search_result?keyword=手机人像模式教程',
    likes: '3.1万',
    comments: '2156',
    tags: ['人像模式', 'iPhone摄影', '虚化']
  }
]
