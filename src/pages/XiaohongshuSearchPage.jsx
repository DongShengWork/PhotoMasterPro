import { useState } from 'react'
import { NavBar, SearchBar, Empty, Toast } from 'antd-mobile'
import { LeftOutline, SearchOutline, FireFill, TagOutline } from 'antd-mobile-icons'

const MOCK_TUTORIALS = [
  { id: 1, title: '手机拍照技巧大全，新手也能拍出大片感', author: '摄影小达人', likes: '12.5万', image: '📸', tags: ['新手必看', '构图技巧'] },
  { id: 2, title: 'iPhone相机隐藏功能，90%的人都不知道', author: '数码研究所', likes: '8.3万', image: '📱', tags: ['iPhone技巧', '相机设置'] },
  { id: 3, title: '夜景拍摄参数设置，告别噪点模糊', author: '夜景摄影师', likes: '6.7万', image: '🌃', tags: ['夜景', '参数设置'] },
  { id: 4, title: '人像模式使用指南，拍出单反效果', author: '人像摄影', likes: '15.2万', image: '👤', tags: ['人像', '虚化'] },
  { id: 5, title: '美食摄影构图技巧，让食物更有食欲', author: '美食摄影师', likes: '9.1万', image: '🍜', tags: ['美食', '构图'] },
]

const HOT_KEYWORDS = ['构图技巧', '夜景拍摄', '人像模式', '美食摄影', '风景大片', '参数设置']

export default function XiaohongshuSearchPage({ mode, onBack }) {
  const [search, setSearch] = useState(mode?.searchKeywords || '')
  const [hasSearched, setHasSearched] = useState(false)
  const [results, setResults] = useState([])

  const handleSearch = (value) => {
    if (!value.trim()) {
      Toast.show({ content: '请输入搜索关键词', duration: 1500 })
      return
    }
    setSearch(value)
    setHasSearched(true)
    setResults(MOCK_TUTORIALS.filter(t =>
      t.title.includes(value) || t.tags.some(tag => tag.includes(value))
    ))
  }

  const handleKeywordClick = (keyword) => {
    setSearch(keyword)
    handleSearch(keyword)
  }

  return (
    <div className="min-h-screen bg-black">
      <NavBar
        onBack={onBack}
        backArrow={<LeftOutline fontSize={24} />}
        style={{ background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(20px)', borderBottom: '0.5px solid #38383A' }}
      >
        <span className="text-white font-semibold">小红书教程</span>
      </NavBar>

      <div className="px-4 py-3">
        <SearchBar
          placeholder={`搜索「${mode?.searchKeywords || '拍照教程'}」`}
          value={search}
          onChange={setSearch}
          onSearch={handleSearch}
          style={{ '--background': '#1C1C1E', '--border-radius': '10px', '--color': '#FFFFFF' }}
        />
      </div>

      <div className="px-4">
        {!hasSearched ? (
          <div>
            {/* 热门搜索 */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <FireFill color="#FF3B30" />
                <span className="text-white font-semibold text-sm">热门搜索</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {HOT_KEYWORDS.map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => handleKeywordClick(keyword)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium active:scale-95 transition-transform"
                    style={{ background: 'rgba(10, 132, 255, 0.15)', color: '#0A84FF' }}
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>

            {/* 推荐教程 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TagOutline color="#30D158" />
                <span className="text-white font-semibold text-sm">推荐教程</span>
              </div>
              <div className="space-y-3">
                {MOCK_TUTORIALS.slice(0, 3).map((tutorial) => (
                  <div
                    key={tutorial.id}
                    className="rounded-xl p-4 active:scale-98 transition-transform"
                    style={{ background: '#1C1C1E' }}
                  >
                    <div className="flex gap-3">
                      <div className="w-20 h-20 rounded-xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: 'rgba(60, 60, 60, 0.5)' }}>
                        {tutorial.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">{tutorial.title}</h3>
                        <p className="text-gray-500 text-xs mb-2">{tutorial.author}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-red-400 text-xs">❤️ {tutorial.likes}</span>
                          {tutorial.tags.slice(0, 1).map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: 'rgba(10, 132, 255, 0.15)', color: '#0A84FF' }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {results.length > 0 ? (
              <div className="space-y-3">
                <p className="text-gray-400 text-sm mb-3">找到 {results.length} 个相关教程</p>
                {results.map((tutorial) => (
                  <div
                    key={tutorial.id}
                    className="rounded-xl p-4 active:scale-98 transition-transform"
                    style={{ background: '#1C1C1E' }}
                  >
                    <div className="flex gap-3">
                      <div className="w-20 h-20 rounded-xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: 'rgba(60, 60, 60, 0.5)' }}>
                        {tutorial.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">{tutorial.title}</h3>
                        <p className="text-gray-500 text-xs mb-2">{tutorial.author}</p>
                        <div className="flex flex-wrap items-center gap-1">
                          <span className="text-red-400 text-xs">❤️ {tutorial.likes}</span>
                          {tutorial.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: 'rgba(10, 132, 255, 0.15)', color: '#0A84FF' }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Empty image={<div className="text-5xl">🔍</div>} description="没有找到相关教程" />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
