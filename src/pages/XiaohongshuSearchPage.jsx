import { useState } from 'react'
import { motion } from 'framer-motion'
import { NavBar, SearchBar, List, Empty, Toast } from 'antd-mobile'
import { LeftOutline, SearchOutline, FireFill, TagOutline } from 'antd-mobile-icons'

// 模拟小红书教程数据
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
    // 模拟搜索结果
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
      {/* 导航栏 */}
      <NavBar
        onBack={onBack}
        backArrow={<LeftOutline fontSize={24} />}
        style={{ 
          background: 'rgba(0, 0, 0, 0.8)', 
          backdropFilter: 'blur(20px)',
          borderBottom: '0.5px solid #38383A'
        }}
      >
        <span className="text-white font-semibold">小红书教程</span>
      </NavBar>

      {/* 搜索框 */}
      <div className="px-4 py-3">
        <SearchBar
          placeholder={`搜索「${mode?.searchKeywords || '拍照教程'}」`}
          value={search}
          onChange={setSearch}
          onSearch={handleSearch}
          style={{ 
            '--background': '#1C1C1E', 
            '--border-radius': '10px',
            '--color': '#FFFFFF'
          }}
        />
      </div>

      {/* 搜索结果或推荐 */}
      <div className="px-4">
        {!hasSearched ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* 热门搜索 */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <FireFill color="#FF3B30" />
                <span className="text-white font-semibold text-sm">热门搜索</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {HOT_KEYWORDS.map((keyword, index) => (
                  <motion.button
                    key={keyword}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleKeywordClick(keyword)}
                    className="ios-tag ios-tag-blue"
                  >
                    {keyword}
                  </motion.button>
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
                {MOCK_TUTORIALS.slice(0, 3).map((tutorial, index) => (
                  <motion.div
                    key={tutorial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                    className="ios-card"
                    style={{ margin: 0 }}
                  >
                    <div className="ios-card-content flex gap-3">
                      <div className="w-20 h-20 rounded-xl flex items-center justify-center text-3xl" style={{ background: 'rgba(60, 60, 60, 0.5)' }}>
                        {tutorial.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">{tutorial.title}</h3>
                        <p className="text-gray-500 text-xs mb-2">{tutorial.author}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-red-400 text-xs">❤️ {tutorial.likes}</span>
                          {tutorial.tags.slice(0, 1).map(tag => (
                            <span key={tag} className="ios-tag ios-tag-blue text-xs py-0.5 px-2">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {results.length > 0 ? (
              <div className="space-y-3">
                <p className="text-gray-400 text-sm mb-3">找到 {results.length} 个相关教程</p>
                {results.map((tutorial, index) => (
                  <motion.div
                    key={tutorial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                    className="ios-card"
                    style={{ margin: 0 }}
                  >
                    <div className="ios-card-content flex gap-3">
                      <div className="w-20 h-20 rounded-xl flex items-center justify-center text-3xl" style={{ background: 'rgba(60, 60, 60, 0.5)' }}>
                        {tutorial.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">{tutorial.title}</h3>
                        <p className="text-gray-500 text-xs mb-2">{tutorial.author}</p>
                        <div className="flex flex-wrap gap-1">
                          <span className="text-red-400 text-xs">❤️ {tutorial.likes}</span>
                          {tutorial.tags.map(tag => (
                            <span key={tag} className="ios-tag ios-tag-blue text-xs py-0.5 px-2">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Empty
                image={<div className="text-5xl">🔍</div>}
                description="没有找到相关教程"
              />
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
