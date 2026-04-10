import { useState, useMemo, useCallback } from 'react'
import { PHOTOGRAPHY_MODES } from '../data/photographyModes'
import { useFavorites } from '../hooks/useFavorites'
import { SearchBar, Empty } from 'antd-mobile'
import { HeartOutline, AppOutline, EditSOutline } from 'antd-mobile-icons'

// 为每个模式添加示例图片 URL
const MODE_IMAGES = {
  starry: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80',
  backlight: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
  portrait: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80',
  food: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
  night: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80',
  macro: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&q=80',
  longexp: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=400&q=80',
  sunrise: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=400&q=80',
  street: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&q=80',
  snow: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=400&q=80',
  underwater: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=400&q=80',
  golden: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=400&q=80',
}

export default function ModesPage({ onSelectMode }) {
  const { favorites } = useFavorites()
  const [activeTab, setActiveTab] = useState('repo')
  const [search, setSearch] = useState('')

  // 使用 useMemo 缓存过滤结果
  const filteredModes = useMemo(() => {
    if (!search) return PHOTOGRAPHY_MODES
    const q = search.toLowerCase()
    return PHOTOGRAPHY_MODES.filter(m =>
      m.name.includes(search) ||
      m.nameEn.toLowerCase().includes(q) ||
      m.tags.some(t => t.toLowerCase().includes(q))
    )
  }, [search])

  const handleSelect = useCallback((mode) => {
    onSelectMode(mode)
  }, [onSelectMode])

  return (
    <div className="modes-page">
      {/* 顶部导航 */}
      <div className="modes-header">
        <h1 className="text-lg font-semibold text-white">拍照模式</h1>
      </div>

      {/* 搜索框 */}
      <div className="modes-search">
        <SearchBar
          placeholder="搜索模式..."
          value={search}
          onChange={setSearch}
          style={{ '--background': '#2C2C2E', '--border-radius': '10px' }}
        />
      </div>

      {/* Tab 切换 */}
      <div className="modes-tabs">
        {[
          { key: 'repo', label: '仓库', icon: <AppOutline /> },
          { key: 'favorites', label: '收藏', icon: <HeartOutline /> },
          { key: 'custom', label: '定制', icon: <EditSOutline /> },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
          >
            <span className="text-sm">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* 模式列表 */}
      <div className="modes-content">
        {/* 模式仓库 */}
        {activeTab === 'repo' && (
          <div className="mode-grid">
            {filteredModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => handleSelect(mode)}
                className="mode-card"
              >
                <div
                  className="mode-card-bg"
                  style={{ backgroundImage: `url(${MODE_IMAGES[mode.id] || ''})` }}
                >
                  <div className="mode-card-overlay" />
                  <div className="mode-card-icon">{mode.icon}</div>
                  <div className="mode-card-title">{mode.name}</div>
                  <div className="mode-card-subtitle">{mode.nameEn}</div>
                  <div className="mode-card-desc">{mode.description}</div>
                </div>
              </button>
            ))}
            {filteredModes.length === 0 && (
              <div className="empty-state">
                <Empty image={<div className="text-5xl">🔍</div>} description="没有找到" />
              </div>
            )}
          </div>
        )}

        {/* 我的收藏 */}
        {activeTab === 'favorites' && (
          <div className="favorites-list">
            {favorites.length === 0 ? (
              <div className="empty-state">
                <Empty image={<div className="text-5xl">❤️‍🔥</div>} description="还没有收藏" />
                <p className="text-gray-500 text-sm mt-2">在详情页点击 ❤️ 收藏</p>
              </div>
            ) : (
              favorites.map((fav) => {
                const full = PHOTOGRAPHY_MODES.find(m => m.id === fav.id)
                if (!full) return null
                return (
                  <button
                    key={fav.id}
                    onClick={() => handleSelect(full)}
                    className="favorite-item"
                  >
                    <span className="text-2xl">{full.icon}</span>
                    <div className="flex-1 text-left">
                      <div className="text-white font-medium">{full.name}</div>
                      <div className="text-xs text-gray-400">{full.nameEn}</div>
                    </div>
                    <span className="text-gray-500">›</span>
                  </button>
                )
              })
            )}
          </div>
        )}

        {/* 定制模式 */}
        {activeTab === 'custom' && (
          <div className="custom-placeholder">
            <div className="text-6xl mb-4">🛠️</div>
            <h3 className="text-white font-semibold text-lg mb-2">自定义参数</h3>
            <p className="text-sm text-gray-400 text-center px-8 mb-6">
              保存你专属的参数预设
            </p>
            <div className="custom-wip">
              <div className="text-4xl mb-3">🚧</div>
              <p className="text-sm text-gray-500">功能开发中</p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .modes-page {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #000;
        }
        .modes-header {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px 16px 12px;
          flex-shrink: 0;
          border-bottom: 0.5px solid #38383A;
        }
        .modes-search {
          padding: 12px 16px 8px;
          flex-shrink: 0;
        }
        .modes-tabs {
          display: flex;
          padding: 0 16px 12px;
          flex-shrink: 0;
        }
        .tab-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 8px 0;
          font-size: 13px;
          font-weight: 500;
          border: none;
          border-radius: 8px;
          background: transparent;
          color: #8E8E93;
          cursor: pointer;
          transition: all 0.15s;
        }
        .tab-btn.active {
          background: #3A3A3C;
          color: #fff;
        }
        .tab-btn:active { opacity: 0.7; }
        .modes-content {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 80px;
        }
        .mode-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          padding: 12px 16px;
        }
        .mode-card {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          border-radius: 14px;
          overflow: hidden;
        }
        .mode-card-bg {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1.1;
          background-size: cover;
          background-position: center;
          background-color: #1C1C1E;
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 12px;
          overflow: hidden;
        }
        .mode-card-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.8) 100%);
          z-index: 0;
        }
        .mode-card-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.3);
          z-index: 1;
          transition: opacity 0.15s;
        }
        .mode-card:active .mode-card-overlay {
          opacity: 0.6;
        }
        .mode-card-icon {
          font-size: 28px;
          margin-bottom: 6px;
          position: relative;
          z-index: 2;
        }
        .mode-card-title {
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 2px;
          position: relative;
          z-index: 2;
        }
        .mode-card-subtitle {
          font-size: 11px;
          color: rgba(255,255,255,0.6);
          margin-bottom: 4px;
          position: relative;
          z-index: 2;
        }
        .mode-card-desc {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          position: relative;
          z-index: 2;
        }
        .empty-state {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 0;
          text-align: center;
        }
        .favorites-list {
          padding: 0 16px;
        }
        .favorite-item {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 14px;
          background: #1C1C1E;
          border: none;
          border-radius: 12px;
          margin-bottom: 8px;
          cursor: pointer;
          transition: background 0.15s;
        }
        .favorite-item:active { background: #2C2C2E; }
        .favorite-item span:first-child { margin-right: 12px; }
        .custom-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 16px;
        }
        .custom-wip {
          background: #1C1C1E;
          border-radius: 16px;
          padding: 32px 48px;
          text-align: center;
        }
      `}</style>
    </div>
  )
}
