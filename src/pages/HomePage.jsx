import { useState } from 'react'
import { PHOTOGRAPHY_MODES } from '../data/photographyModes'
import { useFavorites } from '../hooks/useFavorites'

// 首页：拍照模式选择网格 + 底部导航
export default function HomePage({ onSelect, onProfile }) {
  const [searchTerm, setSearchTerm] = useState('')
  const { favorites } = useFavorites()

  const filtered = searchTerm
    ? PHOTOGRAPHY_MODES.filter(m =>
        m.name.includes(searchTerm) ||
        m.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.tags.some(t => t.includes(searchTerm))
      )
    : PHOTOGRAPHY_MODES

  return (
    <div className="pb-24">
      {/* 顶部标题 */}
      <div className="px-5 pt-14 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/20 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">📸</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">PhotoMaster Pro</h1>
              <p className="text-xs text-gray-400">专业拍照参数指南</p>
            </div>
          </div>
          {/* 收藏入口 */}
          <button
            onClick={onProfile}
            className="w-10 h-10 rounded-2xl bg-darkCard border border-gray-800 flex items-center justify-center relative active:scale-90 transition-transform"
          >
            <span className="text-lg">👤</span>
            {favorites.length > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{favorites.length > 9 ? '9+' : favorites.length}</span>
              </div>
            )}
          </button>
        </div>

        {/* 搜索框 */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="搜索拍照场景..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-darkCard rounded-2xl px-4 py-3 pl-11 text-sm text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-accent/50 border border-gray-800"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
        </div>

        <p className="text-gray-400 text-sm">
          选择拍摄场景，获取专业相机参数
        </p>
      </div>

      {/* 场景网格 */}
      <div className="px-5 grid grid-cols-2 gap-3">
        {filtered.map(mode => (
          <button
            key={mode.id}
            onClick={() => onSelect('detail', mode)}
            className="card-touch bg-darkCard rounded-2xl p-4 text-left border border-gray-800 hover:border-accent/50 transition-colors active:bg-darkCard/80"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="text-3xl">{mode.icon}</div>
              {favorites.some(f => f.id === mode.id) && (
                <span className="text-red-400 text-sm">❤️</span>
              )}
            </div>
            <div className="font-bold text-sm text-white mb-1">{mode.name}</div>
            <div className="text-xs text-gray-500">{mode.nameEn}</div>
            <div className="mt-2 text-xs text-gray-600 leading-relaxed">{mode.description}</div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-sm">没有找到匹配的场景</p>
          <p className="text-xs mt-1">试试其他关键词</p>
        </div>
      )}

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-dark/95 backdrop-blur-md border-t border-gray-800 p-4 z-10">
        <button
          onClick={() => onSelect('manual', null)}
          className="w-full bg-darkCard border border-gray-700 rounded-2xl py-3.5 text-sm text-gray-300 flex items-center justify-center gap-2 active:bg-gray-800 transition-colors"
        >
          <span>📱</span>
          我的手机不在列表？
          <span className="text-accent ml-1 font-medium">手动选择 →</span>
        </button>
      </div>
    </div>
  )
}
