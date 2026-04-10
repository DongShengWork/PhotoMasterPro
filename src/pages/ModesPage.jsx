import { useState } from 'react'
import { PHOTOGRAPHY_MODES } from '../data/photographyModes'
import { useFavorites } from '../hooks/useFavorites'

// 模式页：搜索 + 收藏/定制/仓库 三 Tab
export default function ModesPage({ onSelectMode }) {
  const { favorites } = useFavorites()
  const [tab, setTab] = useState('repo')    // 'favorites' | 'custom' | 'repo'
  const [search, setSearch] = useState('')

  const filteredRepo = search
    ? PHOTOGRAPHY_MODES.filter(m =>
        m.name.includes(search) ||
        m.nameEn.toLowerCase().includes(search.toLowerCase()) ||
        m.tags.some(t => t.includes(search))
      )
    : PHOTOGRAPHY_MODES

  const tabs = [
    { key: 'repo', label: '📦 模式仓库', count: PHOTOGRAPHY_MODES.length },
    { key: 'favorites', label: '❤️ 我的收藏', count: favorites.length },
    { key: 'custom', label: '🎯 定制模式', count: null },
  ]

  return (
    <div className="h-full flex flex-col bg-dark">
      {/* 顶部 */}
      <div className="flex-none px-5 pt-14 pb-4">
        <h1 className="text-2xl font-bold text-white mb-3">拍照模式</h1>
        {/* 搜索框 */}
        <div className="relative">
          <input
            type="text"
            placeholder="搜索模式名称或标签..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-darkCard rounded-2xl px-4 py-3 pl-11 text-sm text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-accent/50 border border-gray-800"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
        </div>
      </div>

      {/* Tab 切换 */}
      <div className="flex-none px-5 pb-3">
        <div className="flex bg-darkCard rounded-2xl p-1 border border-gray-800">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
                tab === t.key ? 'bg-accent/20 text-white' : 'text-gray-400'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 模式列表 */}
      <div className="flex-1 overflow-y-auto px-5 pb-24">
        {/* 模式仓库 */}
        {tab === 'repo' && (
          <div>
            <div className="grid grid-cols-2 gap-3">
              {filteredRepo.map(mode => (
                <ModeCard key={mode.id} mode={mode} onClick={() => onSelectMode(mode)} />
              ))}
            </div>
            {filteredRepo.length === 0 && (
              <EmptyState emoji="🔍" text="没有找到匹配的模式" sub="试试其他关键词" />
            )}
          </div>
        )}

        {/* 我的收藏 */}
        {tab === 'favorites' && (
          <div>
            {favorites.length === 0 ? (
              <EmptyState emoji="❤️‍🔥" text="还没有收藏" sub="在拍照界面点模式收藏，或在仓库里点击 ❤️" />
            ) : (
              <div className="space-y-2.5">
                {favorites.map(fav => {
                  const full = PHOTOGRAPHY_MODES.find(m => m.id === fav.id)
                  if (!full) return null
                  return (
                    <div key={fav.id} className="bg-darkCard rounded-2xl p-4 border border-gray-800">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => onSelectMode(full)}
                          className="flex items-center gap-3 flex-1 text-left active:opacity-70"
                        >
                          <span className="text-3xl">{full.icon}</span>
                          <div>
                            <div className="text-sm font-semibold text-white">{full.name}</div>
                            <div className="text-xs text-gray-500">{full.nameEn}</div>
                          </div>
                        </button>
                        <div className="text-xs text-gray-600">{fav.savedAt ? new Date(fav.savedAt).toLocaleDateString('zh-CN') : ''}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* 定制模式 */}
        {tab === 'custom' && (
          <div className="py-16">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🛠️</div>
              <h3 className="text-white font-bold text-base mb-1">自定义拍摄参数</h3>
              <p className="text-sm text-gray-400">保存你专属的参数预设，随用随调</p>
            </div>
            <div className="bg-darkCard rounded-2xl p-4 border border-gray-800 text-center">
              <div className="text-3xl mb-2">🚧</div>
              <p className="text-xs text-gray-500">功能开发中，敬请期待</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ModeCard({ mode, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-darkCard rounded-2xl p-4 text-left border border-gray-800 hover:border-accent/30 transition-colors active:scale-[0.98]"
    >
      <div className="text-3xl mb-2">{mode.icon}</div>
      <div className="font-bold text-sm text-white mb-0.5">{mode.name}</div>
      <div className="text-xs text-gray-500 mb-2">{mode.nameEn}</div>
      <div className="text-xs text-gray-600 leading-relaxed line-clamp-2">{mode.description}</div>
    </button>
  )
}

function EmptyState({ emoji, text, sub }) {
  return (
    <div className="text-center py-16">
      <div className="text-5xl mb-3">{emoji}</div>
      <p className="text-sm text-gray-400 mb-1">{text}</p>
      <p className="text-xs text-gray-600">{sub}</p>
    </div>
  )
}
