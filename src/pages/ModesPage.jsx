import { useState } from 'react'
import { PHOTOGRAPHY_MODES } from '../data/photographyModes'
import { useFavorites } from '../hooks/useFavorites'
import { motion, AnimatePresence } from 'framer-motion'
import { SearchBar, Empty, Tabs } from 'antd-mobile'
import { HeartOutline, AppOutline, EditSOutline } from 'antd-mobile-icons'

export default function ModesPage({ onSelectMode }) {
  const { favorites } = useFavorites()
  const [activeTab, setActiveTab] = useState('repo')
  const [search, setSearch] = useState('')

  const filteredRepo = search
    ? PHOTOGRAPHY_MODES.filter(m =>
        m.name.includes(search) ||
        m.nameEn.toLowerCase().includes(search.toLowerCase()) ||
        m.tags.some(t => t.includes(search))
      )
    : PHOTOGRAPHY_MODES

  return (
    <div className="h-full flex flex-col bg-black">
      {/* 顶部导航 */}
      <div className="ios-nav-bar">
        <div className="ios-nav-bar-content">
          <h1 className="ios-nav-title">拍照模式</h1>
        </div>
      </div>

      {/* 搜索框 */}
      <div className="px-4 pt-3 pb-2">
        <SearchBar
          placeholder="搜索模式名称或标签..."
          value={search}
          onChange={setSearch}
          style={{ '--background': '#1C1C1E', '--border-radius': '10px' }}
        />
      </div>

      {/* Tab 切换 */}
      <div className="px-4 pb-2">
        <div className="ios-segmented">
          <button
            onClick={() => setActiveTab('repo')}
            className={`ios-segmented-item ${activeTab === 'repo' ? 'ios-segmented-item-active' : ''}`}
          >
            <AppOutline style={{ marginRight: 4 }} />
            模式仓库
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`ios-segmented-item ${activeTab === 'favorites' ? 'ios-segmented-item-active' : ''}`}
          >
            <HeartOutline style={{ marginRight: 4 }} />
            我的收藏
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`ios-segmented-item ${activeTab === 'custom' ? 'ios-segmented-item-active' : ''}`}
          >
            <EditSOutline style={{ marginRight: 4 }} />
            定制模式
          </button>
        </div>
      </div>

      {/* 模式列表 */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {/* 模式仓库 */}
          {activeTab === 'repo' && (
            <motion.div
              key="repo"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mode-grid"
            >
              {filteredRepo.map((mode, index) => (
                <motion.div
                  key={mode.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <ModeCard mode={mode} onClick={() => onSelectMode(mode)} />
                </motion.div>
              ))}
              {filteredRepo.length === 0 && (
                <div className="col-span-2 py-16">
                  <Empty
                    image={<div className="text-5xl">🔍</div>}
                    description="没有找到匹配的模式"
                  />
                </div>
              )}
            </motion.div>
          )}

          {/* 我的收藏 */}
          {activeTab === 'favorites' && (
            <motion.div
              key="favorites"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="px-4 py-2"
            >
              {favorites.length === 0 ? (
                <div className="py-16">
                  <Empty
                    image={<div className="text-5xl">❤️‍🔥</div>}
                    description="还没有收藏"
                  />
                  <p className="text-center text-gray-500 text-sm mt-2">
                    在拍照界面点模式收藏，或在仓库里点击 ❤️
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {favorites.map((fav, index) => {
                    const full = PHOTOGRAPHY_MODES.find(m => m.id === fav.id)
                    if (!full) return null
                    return (
                      <motion.div
                        key={fav.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="ios-list-item"
                        onClick={() => onSelectMode(full)}
                      >
                        <span className="text-2xl mr-3">{full.icon}</span>
                        <div className="ios-list-content">
                          <div className="ios-list-title">{full.name}</div>
                          <div className="ios-list-subtitle">{full.nameEn}</div>
                        </div>
                        <span className="ios-list-arrow">›</span>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </motion.div>
          )}

          {/* 定制模式 */}
          {activeTab === 'custom' && (
            <motion.div
              key="custom"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="text-6xl mb-4">🛠️</div>
              <h3 className="text-white font-semibold text-lg mb-2">自定义拍摄参数</h3>
              <p className="text-sm text-gray-400 text-center px-8 mb-6">
                保存你专属的参数预设，随用随调
              </p>
              <div className="ios-card p-6 text-center">
                <div className="text-4xl mb-3">🚧</div>
                <p className="text-sm text-gray-500">功能开发中，敬请期待</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function ModeCard({ mode, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="mode-card"
    >
      <div className="mode-card-icon">{mode.icon}</div>
      <div className="mode-card-title">{mode.name}</div>
      <div className="mode-card-subtitle">{mode.nameEn}</div>
      <div className="mode-card-desc">{mode.description}</div>
    </motion.button>
  )
}
