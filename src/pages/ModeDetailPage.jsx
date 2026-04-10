import { useState } from 'react'
import { PHONE_BRANDS } from '../data/photographyModes'
import { useFavorites } from '../hooks/useFavorites'
import { NavBar, Toast, Modal } from 'antd-mobile'
import { LeftOutline, HeartOutline, HeartFill, PictureOutline } from 'antd-mobile-icons'

export default function ModeDetailPage({ mode, onBack, onSearch }) {
  const { params, name, icon, nameEn, tags, searchKeywords } = mode
  const { isFavorited, toggleFavorite } = useFavorites()
  const [showPhoneGuide, setShowPhoneGuide] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState(null)
  const favorited = isFavorited(mode.id)

  const handleFavorite = () => {
    const added = toggleFavorite(mode)
    Toast.show({
      icon: added ? 'success' : 'fail',
      content: added ? '已添加到收藏' : '已取消收藏',
      duration: 1000,
    })
  }

  const handleCopyParams = () => {
    const text = `${name} 参数\nISO: ${params.iso} | 快门: ${params.shutter} | 光圈: ${params.aperture} | 白平衡: ${params.wb} | 对焦: ${params.focus}\n\n提示: ${params.tips}\n\n来自 PhotoMaster Pro`
    
    navigator.clipboard.writeText(text).then(() => {
      Toast.show({ icon: 'success', content: '已复制', duration: 1000 })
    }).catch(() => {
      Toast.show({ content: '复制失败', duration: 1000 })
    })
  }

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand)
    setShowPhoneGuide(true)
  }

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* 导航栏 */}
      <NavBar
        onBack={onBack}
        backArrow={<LeftOutline fontSize={22} />}
        right={
          <div className="flex gap-2">
            <button
              onClick={handleFavorite}
              className="w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform"
              style={{ background: favorited ? 'rgba(255,59,48,0.2)' : 'rgba(60,60,60,0.5)' }}
            >
              {favorited ? (
                <HeartFill fontSize={18} color="#FF3B30" />
              ) : (
                <HeartOutline fontSize={18} color="#8E8E93" />
              )}
            </button>
          </div>
        }
        style={{ 
          background: 'rgba(0,0,0,0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '0.5px solid #38383A'
        }}
      >
        <span className="text-white font-semibold">模式详情</span>
      </NavBar>

      {/* 头部信息 */}
      <div className="px-4 pt-6 pb-4 text-center">
        <div 
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4"
          style={{ background: 'linear-gradient(135deg, #1C1C1E 0%, #2C2C2E 100%)' }}
        >
          {icon}
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">{name}</h1>
        <p className="text-sm text-gray-400">{nameEn}</p>
      </div>

      <div className="px-4 space-y-4">
        {/* 提示语 */}
        <div 
          className="rounded-xl p-4"
          style={{ background: 'rgba(10,132,255,0.1)', border: '1px solid rgba(10,132,255,0.2)' }}
        >
          <div className="text-blue-400 font-medium text-sm mb-2">💡 拍摄提示</div>
          <p className="text-sm text-gray-200 leading-relaxed">{params.tips}</p>
        </div>

        {/* 参数卡片 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-300">📷 推荐参数</h2>
            <button
              onClick={handleCopyParams}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium active:scale-95 transition-transform"
              style={{ background: 'rgba(10,132,255,0.2)', color: '#0A84FF' }}
            >
              📋 复制
            </button>
          </div>
          <div className="rounded-xl overflow-hidden" style={{ background: '#1C1C1E' }}>
            <ParamRow label="ISO" value={params.iso} sub="感光度" color="#FF9500" />
            <ParamRow label="快门" value={params.shutter} sub="速度" color="#30D158" />
            <ParamRow label="光圈" value={params.aperture} sub="虚化" color="#0A84FF" />
            <ParamRow label="白平衡" value={params.wb} sub="色温" color="#FF3B30" />
            <ParamRow label="对焦" value={params.focus} sub="对焦" color="#BF5AF2" isLast />
          </div>
        </div>

        {/* 支持品牌 */}
        <div>
          <h2 className="text-sm font-semibold text-gray-300 mb-3">📱 支持品牌</h2>
          <div className="grid grid-cols-4 gap-2">
            {PHONE_BRANDS.map((brand) => (
              <button
                key={brand.id}
                onClick={() => handleBrandClick(brand)}
                className="rounded-xl p-3 text-center active:scale-95 transition-transform"
                style={{ background: '#1C1C1E' }}
              >
                <div className="text-2xl mb-1">{brand.logo}</div>
                <div className="text-xs text-gray-300 truncate">{brand.nameZh}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 小红书 */}
        <button
          onClick={onSearch}
          className="w-full rounded-xl p-4 flex items-center justify-between text-left active:scale-98 transition-transform"
          style={{ 
            background: 'rgba(255,59,48,0.1)',
            border: '1px solid rgba(255,59,48,0.2)'
          }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: 'rgba(255,59,48,0.2)' }}
            >
              📕
            </div>
            <div>
              <div className="text-sm font-medium text-white">小红书教程</div>
              <div className="text-xs text-gray-400">搜索「{searchKeywords}」</div>
            </div>
          </div>
          <span className="text-gray-500">›</span>
        </button>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2 pb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ background: 'rgba(10,132,255,0.15)', color: '#0A84FF' }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* 底部按钮 */}
      <div 
        className="fixed bottom-0 left-0 right-0 p-4"
        style={{ 
          background: 'linear-gradient(to top, rgba(0,0,0,0.95) 70%, transparent)',
          paddingBottom: 'max(16px, env(safe-area-inset-bottom))'
        }}
      >
        <button
          onClick={onSearch}
          className="w-full py-3.5 rounded-xl text-base font-semibold text-white active:scale-98 transition-transform"
          style={{ background: '#0A84FF' }}
        >
          🔍 搜索小红书教程
        </button>
      </div>

      {/* 手机品牌指南弹窗 */}
      <Modal
        visible={showPhoneGuide}
        onClose={() => setShowPhoneGuide(false)}
        content={
          selectedBrand && (
            <div className="p-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{selectedBrand.logo}</span>
                <div>
                  <h3 className="text-lg font-bold">{selectedBrand.nameZh}</h3>
                  <p className="text-sm text-gray-400">{selectedBrand.name}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="rounded-lg p-3" style={{ background: 'rgba(10,132,255,0.1)' }}>
                  <div className="text-blue-400 font-medium text-sm mb-1">📷 专业模式</div>
                  <p className="text-sm text-gray-300">{selectedBrand.howToProMode}</p>
                </div>
                
                <div className="rounded-lg p-3" style={{ background: 'rgba(48,209,88,0.1)' }}>
                  <div className="text-green-400 font-medium text-sm mb-1">🌙 夜景模式</div>
                  <p className="text-sm text-gray-300">{selectedBrand.howToNightMode}</p>
                </div>
              </div>
            </div>
          )
        }
        closeOnMaskClick
      />
    </div>
  )
}

function ParamRow({ label, value, sub, color, isLast }) {
  return (
    <div 
      className="flex items-center justify-between p-3"
      style={{ borderBottom: isLast ? 'none' : '0.5px solid #38383A' }}
    >
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full" style={{ background: color }} />
        <div>
          <div className="text-xs text-gray-500">{sub}</div>
          <div className="text-sm text-gray-300">{label}</div>
        </div>
      </div>
      <div className="text-base font-semibold" style={{ color }}>{value}</div>
    </div>
  )
}
