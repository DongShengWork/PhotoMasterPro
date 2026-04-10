import { useState } from 'react'
import { PHONE_BRANDS } from '../data/photographyModes'
import { useFavorites } from '../hooks/useFavorites'
import { motion } from 'framer-motion'
import { NavBar, Toast, Tag } from 'antd-mobile'
import { LeftOutline, HeartOutline, HeartFill } from 'antd-mobile-icons'

export default function ModeDetailPage({ mode, onBack, onSearch }) {
  const { params, name, icon, nameEn, tags, searchKeywords } = mode
  const { isFavorited, toggleFavorite } = useFavorites()
  const [justFavorited, setJustFavorited] = useState(false)
  const favorited = isFavorited(mode.id)

  const handleFavorite = () => {
    const added = toggleFavorite(mode)
    setJustFavorited(true)
    Toast.show({
      icon: added ? 'success' : 'fail',
      content: added ? '已添加到收藏' : '已取消收藏',
      duration: 1500,
    })
    setTimeout(() => setJustFavorited(false), 1500)
  }

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* 导航栏 */}
      <NavBar
        onBack={onBack}
        backArrow={<LeftOutline fontSize={24} />}
        right={
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleFavorite}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: favorited ? 'rgba(255, 59, 48, 0.2)' : 'rgba(60, 60, 60, 0.5)' }}
          >
            {favorited ? (
              <HeartFill fontSize={20} color="#FF3B30" />
            ) : (
              <HeartOutline fontSize={20} color="#8E8E93" />
            )}
          </motion.button>
        }
        style={{ 
          background: 'rgba(0, 0, 0, 0.8)', 
          backdropFilter: 'blur(20px)',
          borderBottom: '0.5px solid #38383A'
        }}
      >
        <span className="text-white font-semibold">模式详情</span>
      </NavBar>

      {/* 头部信息 */}
      <div className="detail-header">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="detail-icon"
        >
          {icon}
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="detail-title"
        >
          {name}
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="detail-subtitle"
        >
          {nameEn}
        </motion.p>
      </div>

      <div className="px-4">
        {/* 提示语 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="ios-card mb-4"
          style={{ background: 'rgba(10, 132, 255, 0.1)', border: '1px solid rgba(10, 132, 255, 0.2)' }}
        >
          <div className="ios-card-content">
            <div className="text-blue-400 font-medium text-sm mb-2 flex items-center gap-2">
              <span>💡</span> 拍摄提示
            </div>
            <p className="text-sm text-gray-200 leading-relaxed">{params.tips}</p>
          </div>
        </motion.div>

        {/* 参数卡片 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <h2 className="text-sm font-semibold text-gray-300 mb-3 px-1">📷 推荐相机参数</h2>
          <div className="ios-card mb-4">
            <div className="ios-card-content py-2">
              <ParamRow label="ISO" value={params.iso} sub="感光度" />
              <ParamRow label="快门" value={params.shutter} sub="速度" />
              <ParamRow label="光圈" value={params.aperture} sub="虚化程度" />
              <ParamRow label="白平衡" value={params.wb} sub="色温" />
              <ParamRow label="对焦" value={params.focus} sub="对焦点" />
            </div>
          </div>
        </motion.div>

        {/* 支持品牌 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-sm font-semibold text-gray-300 mb-3 px-1">📱 支持的手机品牌</h2>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {PHONE_BRANDS.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.35 + index * 0.05 }}
                className="ios-card"
                style={{ margin: 0 }}
              >
                <div className="ios-card-content text-center py-4">
                  <div className="text-2xl mb-2">{brand.logo}</div>
                  <div className="text-xs text-gray-300">{brand.nameZh}</div>
                  {brand.models[0]?.hasProMode && (
                    <div className="ios-tag ios-tag-green mt-2 text-xs">专业模式</div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 小红书教程 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-sm font-semibold text-gray-300 mb-3 px-1">📕 小红书教程</h2>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onSearch}
            className="ios-card w-full text-left"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255, 59, 48, 0.1) 0%, rgba(255, 149, 0, 0.1) 100%)',
              border: '1px solid rgba(255, 59, 48, 0.2)'
            }}
          >
            <div className="ios-card-content flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: 'rgba(255, 59, 48, 0.2)' }}>
                  📕
                </div>
                <div>
                  <div className="text-sm font-medium text-white">小红书拍照教程</div>
                  <div className="text-xs text-gray-400">搜索「{searchKeywords}」</div>
                </div>
              </div>
              <span className="text-gray-500 text-lg">›</span>
            </div>
          </motion.button>
        </motion.div>

        {/* 标签 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="flex flex-wrap gap-2 mt-4 px-1"
        >
          {tags.map((tag, index) => (
            <motion.span
              key={tag}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.03 }}
              className="ios-tag ios-tag-blue"
            >
              #{tag}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* 底部固定按钮 */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: 'spring' }}
        className="fixed bottom-0 left-0 right-0 p-4 pb-8"
        style={{ 
          background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onSearch}
          className="ios-button ios-button-primary ios-button-large"
        >
          🔍 搜索小红书教程
        </motion.button>
      </motion.div>
    </div>
  )
}

function ParamRow({ label, value, sub }) {
  return (
    <div className="param-row">
      <div>
        <div className="text-xs text-gray-500 mb-0.5">{sub}</div>
        <div className="text-sm text-gray-300">{label}</div>
      </div>
      <div className="param-value">{value}</div>
    </div>
  )
}
