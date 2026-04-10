import { useState } from 'react'
import { PHOTOGRAPHY_MODES } from '../data/photographyModes'
import { useFavorites } from '../hooks/useFavorites'
import { useSubscription } from '../hooks/useSubscription'
import { motion, AnimatePresence } from 'framer-motion'
import { NavBar, Dialog, Toast } from 'antd-mobile'
import { LeftOutline, RightOutline, StarFill, HeartFill, GlobalOutline, InfoCircleOutline, MessageOutline, QuestionCircleOutline, DeleteOutline } from 'antd-mobile-icons'

export default function ProfilePage({ onBack }) {
  const { favorites, removeFavorite, clearFavorites } = useFavorites()
  const { tier, isPro, expiresAt } = useSubscription()
  const [activeTab, setActiveTab] = useState('profile')

  const handleClearFavorites = () => {
    Dialog.confirm({
      content: '确定要清空所有收藏吗？此操作不可撤销。',
      confirmText: '清空',
      cancelText: '取消',
      onConfirm: () => {
        clearFavorites()
        Toast.show({ icon: 'success', content: '已清空收藏' })
      },
    })
  }

  const menuItems = [
    { icon: <StarFill />, label: '订阅 Pro', desc: '解锁进阶场景和专属教程', badge: isPro ? '当前' : '推荐', color: '#FF9500', onClick: () => {} },
    { icon: <HeartFill />, label: '我的收藏', desc: `${favorites.length} 个收藏场景`, onClick: () => setActiveTab('favorites') },
    { icon: <GlobalOutline />, label: '支持语言', desc: '简体中文 / English' },
    { icon: <InfoCircleOutline />, label: '版本信息', desc: 'v1.0.0 · PhotoMaster Pro' },
    { icon: <MessageOutline />, label: '意见反馈', desc: '问题和建议' },
    { icon: <QuestionCircleOutline />, label: '使用帮助', desc: '快速入门指南' },
  ]

  return (
    <div className="min-h-screen bg-black pb-8">
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
        <span className="text-white font-semibold">个人中心</span>
      </NavBar>

      {/* 用户信息卡片 */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mx-4 mt-4 p-5 rounded-2xl"
        style={{ 
          background: 'linear-gradient(135deg, rgba(10, 132, 255, 0.15) 0%, rgba(48, 209, 88, 0.1) 100%)',
          border: '1px solid rgba(10, 132, 255, 0.2)'
        }}
      >
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
            style={{ background: 'rgba(10, 132, 255, 0.3)' }}
          >
            📷
          </motion.div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-white">拍照爱好者</h1>
              {isPro && (
                <span 
                  className="px-2 py-0.5 text-xs font-bold rounded-full"
                  style={{ background: 'rgba(255, 149, 0, 0.3)', color: '#FF9500' }}
                >
                  PRO
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400">
              {isPro
                ? `Pro会员 · ${expiresAt ? `至 ${expiresAt.toLocaleDateString('zh-CN')}` : '永久'}`
                : '免费用户'}
            </p>
          </div>
        </div>

        {/* 数据卡片 */}
        <div className="flex gap-3 mt-5">
          <motion.div
            whileTap={{ scale: 0.98 }}
            className="flex-1 rounded-xl p-3 text-center"
            style={{ background: 'rgba(28, 28, 30, 0.8)' }}
          >
            <div className="text-2xl font-bold text-white">{favorites.length}</div>
            <div className="text-xs text-gray-400 mt-0.5">收藏场景</div>
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.98 }}
            className="flex-1 rounded-xl p-3 text-center"
            style={{ background: 'rgba(28, 28, 30, 0.8)' }}
          >
            <div className="text-2xl font-bold text-white">{PHOTOGRAPHY_MODES.length}</div>
            <div className="text-xs text-gray-400 mt-0.5">全部场景</div>
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.98 }}
            className="flex-1 rounded-xl p-3 text-center"
            style={{ background: 'rgba(28, 28, 30, 0.8)' }}
          >
            <div className="text-2xl font-bold text-white">{tier === 'pro' ? '1' : '0'}</div>
            <div className="text-xs text-gray-400 mt-0.5">订阅状态</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Tab 切换 */}
      <div className="px-4 mt-4">
        <div className="ios-segmented">
          <button
            onClick={() => setActiveTab('profile')}
            className={`ios-segmented-item ${activeTab === 'profile' ? 'ios-segmented-item-active' : ''}`}
          >
            📋 功能
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`ios-segmented-item ${activeTab === 'favorites' ? 'ios-segmented-item-active' : ''}`}
          >
            ❤️ 收藏 ({favorites.length})
          </button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="px-4 mt-4">
        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="ios-list"
            >
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={item.onClick}
                  className="ios-list-item w-full"
                >
                  <div 
                    className="ios-list-icon"
                    style={{ 
                      background: item.color ? `${item.color}20` : 'rgba(60, 60, 60, 0.5)',
                      color: item.color || '#0A84FF'
                    }}
                  >
                    {item.icon}
                  </div>
                  <div className="ios-list-content">
                    <div className="ios-list-title">{item.label}</div>
                    <div className="ios-list-subtitle">{item.desc}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span 
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{ 
                          background: item.color ? `${item.color}30` : 'rgba(10, 132, 255, 0.2)',
                          color: item.color || '#0A84FF'
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                    <RightOutline color="#8E8E93" />
                  </div>
                </motion.button>
              ))}

              {/* 清除数据 */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: menuItems.length * 0.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClearFavorites}
                className="ios-list-item w-full"
              >
                <div 
                  className="ios-list-icon"
                  style={{ background: 'rgba(255, 59, 48, 0.2)', color: '#FF3B30' }}
                >
                  <DeleteOutline />
                </div>
                <div className="ios-list-content">
                  <div className="ios-list-title" style={{ color: '#FF3B30' }}>清空收藏</div>
                  <div className="ios-list-subtitle">不可恢复</div>
                </div>
                <RightOutline color="#8E8E93" />
              </motion.button>
            </motion.div>
          )}

          {activeTab === 'favorites' && (
            <motion.div
              key="favorites"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="text-6xl mb-4">❤️‍🔥</div>
                  <p className="text-gray-400 text-base mb-2">还没有收藏</p>
                  <p className="text-gray-500 text-sm">在拍照场景中点击 ❤️ 收藏</p>
                </div>
              ) : (
                <div className="ios-list">
                  {favorites.map((fav, index) => (
                    <motion.div
                      key={fav.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="ios-list-item"
                    >
                      <span className="text-2xl mr-3">{fav.icon}</span>
                      <div className="ios-list-content">
                        <div className="ios-list-title">{fav.name}</div>
                        <div className="ios-list-subtitle">
                          {fav.nameEn} · {fav.savedAt ? new Date(fav.savedAt).toLocaleDateString('zh-CN') : ''}
                        </div>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => removeFavorite(fav.id)}
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(255, 59, 48, 0.2)' }}
                      >
                        <span className="text-red-400 text-sm">✕</span>
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
