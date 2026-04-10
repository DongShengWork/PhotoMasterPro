import { useState } from 'react'
import { PHONE_BRANDS } from '../data/photographyModes'
import { useFavorites } from '../hooks/useFavorites'

// 参数详情展示页
export default function ModeDetailPage({ mode, onBack, onSearch }) {
  const { params, name, icon, nameEn } = mode
  const { isFavorited, toggleFavorite } = useFavorites()
  const [justFavorited, setJustFavorited] = useState(false)
  const favorited = isFavorited(mode.id)

  const handleFavorite = () => {
    const added = toggleFavorite(mode)
    setJustFavorited(true)
    setTimeout(() => setJustFavorited(false), 1500)
  }

  return (
    <div className="min-h-screen pb-28">
      {/* 顶部背景 */}
      <div
        className="px-5 pt-14 pb-8 rounded-b-3xl"
        style={{
          background: 'linear-gradient(180deg, #1A1A1A 0%, #0D0D0D 100%)',
          borderBottom: '1px solid rgba(255,107,53,0.15)'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-gray-400 text-sm active:opacity-70"
          >
            <span>←</span> 返回
          </button>
          <button
            onClick={handleFavorite}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-lg transition-all active:scale-90 ${
              justFavorited
                ? 'bg-red-500/30'
                : favorited
                ? 'bg-red-500/20'
                : 'bg-darkCard border border-gray-800'
            }`}
          >
            {justFavorited ? '💗' : favorited ? '❤️' : '🤍'}
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-5xl">{icon}</div>
          <div>
            <h1 className="text-2xl font-bold text-white">{name}</h1>
            <p className="text-sm text-gray-400">{nameEn}</p>
          </div>
        </div>
      </div>

      <div className="px-5 mt-6">
        {/* 提示语 */}
        <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4 mb-5">
          <div className="text-xs text-accent font-medium mb-1.5 flex items-center gap-1">
            💡 拍摄提示
          </div>
          <p className="text-sm text-gray-200 leading-relaxed">{params.tips}</p>
        </div>

        {/* 参数卡片 */}
        <h2 className="text-sm font-semibold text-gray-300 mb-3">📷 推荐相机参数</h2>
        <div className="space-y-2.5 mb-6">
          <ParamRow label="ISO" value={params.iso} sub="感光度" />
          <ParamRow label="快门" value={params.shutter} sub="速度" />
          <ParamRow label="光圈" value={params.aperture} sub="虚化程度" />
          <ParamRow label="白平衡" value={params.wb} sub="色温" />
          <ParamRow label="对焦" value={params.focus} sub="对焦点" />
        </div>

        {/* 支持品牌 */}
        <h2 className="text-sm font-semibold text-gray-300 mb-3">📱 支持的手机品牌</h2>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {PHONE_BRANDS.map(brand => (
            <div key={brand.id} className="bg-darkCard rounded-xl p-3 text-center border border-gray-800">
              <div className="text-xl mb-1">{brand.logo}</div>
              <div className="text-xs text-gray-300">{brand.nameZh}</div>
              {brand.models[0]?.hasProMode && (
                <div className="text-xs text-green-400 mt-0.5">专业模式 ✓</div>
              )}
            </div>
          ))}
        </div>

        {/* 小红书教程 */}
        <h2 className="text-sm font-semibold text-gray-300 mb-3">📕 小红书教程</h2>
        <button
          onClick={onSearch}
          className="w-full bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-2xl p-4 flex items-center justify-between active:opacity-80 transition-opacity"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center text-xl">📕</div>
            <div className="text-left">
              <div className="text-sm font-medium text-white">小红书拍照教程</div>
              <div className="text-xs text-gray-400">搜索「{mode.searchKeywords}」</div>
            </div>
          </div>
          <span className="text-accent text-xl">→</span>
        </button>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2 mt-5">
          {mode.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-darkCard rounded-full text-xs text-gray-400 border border-gray-800">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* 底部固定按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-dark/95 backdrop-blur-md border-t border-gray-800 p-4 z-10">
        <button
          onClick={onSearch}
          className="w-full bg-accent hover:bg-accentLight text-white font-semibold rounded-2xl py-3.5 text-sm active:opacity-90 transition-colors"
        >
          🔍 搜索小红书教程
        </button>
      </div>
    </div>
  )
}

function ParamRow({ label, value, sub }) {
  return (
    <div className="bg-darkCard rounded-xl px-4 py-3.5 flex items-center justify-between border border-gray-800">
      <div>
        <div className="text-xs text-gray-500 mb-0.5">{sub}</div>
        <div className="text-sm font-semibold text-gray-300">{label}</div>
      </div>
      <div className="text-right">
        <div className="text-sm font-bold text-white">{value}</div>
      </div>
    </div>
  )
}
