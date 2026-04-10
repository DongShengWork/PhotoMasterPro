import { useState } from 'react'
import { PHOTOGRAPHY_MODES } from '../data/photographyModes'
import { useFavorites } from '../hooks/useFavorites'
import { useSubscription } from '../hooks/useSubscription'
import { NavBar, Dialog, Toast } from 'antd-mobile'
import { LeftOutline, RightOutline, StarFill, HeartFill, GlobalOutline, MessageOutline, DeleteOutline } from 'antd-mobile-icons'

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
    { icon: <StarFill />, label: '订阅 Pro', desc: '解锁进阶场景和专属教程', badge: isPro ? '当前' : '推荐', color: '#FF9500', onClick: () => Toast.show({ content: '订阅功能即将上线，敬请期待！🚀', duration: 2000 }) },
    { icon: <HeartFill />, label: '我的收藏', desc: `${favorites.length} 个收藏场景`, onClick: () => setActiveTab('favorites') },
    { icon: <GlobalOutline />, label: '支持语言', desc: '简体中文 / English', onClick: () => Toast.show({ content: '当前仅支持简体中文', duration: 1500 }) },
    { icon: <span>ℹ️</span>, label: '版本信息', desc: 'v1.0.0 · PhotoMaster Pro', onClick: () => Dialog.alert({ title: '版本信息', content: 'PhotoMaster Pro v1.0.0\n\n© 2026 All Rights Reserved', confirmText: '好的' }) },
    { icon: <MessageOutline />, label: '意见反馈', desc: '问题和建议', onClick: () => Toast.show({ content: '反馈功能开发中 🛠️', duration: 1500 }) },
    { icon: <span>❓</span>, label: '使用帮助', desc: '快速入门指南', onClick: () => Dialog.alert({ title: '使用帮助', content: '1. 选择拍照模式\n2. 调参建议\n3. 参考小红书教程\n4. 收藏喜欢的模式', confirmText: '知道了' }) },
  ]

  return (
    <div className="min-h-screen bg-black pb-8">
      {/* 导航栏 */}
      <NavBar
        onBack={onBack}
        backArrow={<LeftOutline fontSize={24} />}
        style={{ background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(20px)', borderBottom: '0.5px solid #38383A' }}
      >
        <span className="text-white font-semibold">个人中心</span>
      </NavBar>

      {/* 用户信息卡片 */}
      <div className="mx-4 mt-4 p-5 rounded-2xl active:scale-98 transition-transform" style={{ background: 'linear-gradient(135deg, rgba(10, 132, 255, 0.15) 0%, rgba(48, 209, 88, 0.1) 100%)', border: '1px solid rgba(10, 132, 255, 0.2)' }}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{ background: 'rgba(10, 132, 255, 0.3)' }}>
            📷
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-white">拍照爱好者</h1>
              {isPro && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full" style={{ background: 'rgba(255, 149, 0, 0.3)', color: '#FF9500' }}>
                  PRO
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400">
              {isPro ? `Pro会员 · ${expiresAt ? `至 ${expiresAt.toLocaleDateString('zh-CN')}` : '永久'}` : '免费用户'}
            </p>
          </div>
        </div>

        {/* 数据卡片 */}
        <div className="flex gap-3 mt-5">
          <div className="flex-1 rounded-xl p-3 text-center active:scale-98 transition-transform" style={{ background: 'rgba(28, 28, 30, 0.8)' }}>
            <div className="text-2xl font-bold text-white">{favorites.length}</div>
            <div className="text-xs text-gray-400 mt-0.5">收藏场景</div>
          </div>
          <div className="flex-1 rounded-xl p-3 text-center active:scale-98 transition-transform" style={{ background: 'rgba(28, 28, 30, 0.8)' }}>
            <div className="text-2xl font-bold text-white">{PHOTOGRAPHY_MODES.length}</div>
            <div className="text-xs text-gray-400 mt-0.5">全部场景</div>
          </div>
          <div className="flex-1 rounded-xl p-3 text-center active:scale-98 transition-transform" style={{ background: 'rgba(28, 28, 30, 0.8)' }}>
            <div className="text-2xl font-bold text-white">{tier === 'pro' ? '1' : '0'}</div>
            <div className="text-xs text-gray-400 mt-0.5">订阅状态</div>
          </div>
        </div>
      </div>

      {/* Tab 切换 */}
      <div className="px-4 mt-4">
        <div className="flex rounded-xl overflow-hidden" style={{ background: '#2C2C2E' }}>
          {[
            { key: 'profile', label: '📋 功能' },
            { key: 'favorites', label: `❤️ 收藏 (${favorites.length})` },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="flex-1 py-2.5 text-sm font-medium transition-colors"
              style={{
                background: activeTab === tab.key ? '#3A3A3C' : 'transparent',
                color: activeTab === tab.key ? '#fff' : '#8E8E93'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 功能列表 */}
      {activeTab === 'profile' && (
        <div className="px-4 mt-4">
          <div className="rounded-xl overflow-hidden" style={{ background: '#1C1C1E' }}>
            {menuItems.map((item, index) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className="w-full flex items-center p-4 active:bg-gray-800 transition-colors"
                style={{ borderBottom: index < menuItems.length - 1 ? '0.5px solid #38383A' : 'none' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mr-3" style={{ background: item.color ? `${item.color}20` : 'rgba(60, 60, 60, 0.5)', color: item.color || '#0A84FF', fontSize: '18px' }}>
                  {item.icon}
                </div>
                <div className="flex-1 text-left">
                  <div className="text-white font-medium text-sm">{item.label}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: item.color ? `${item.color}30` : 'rgba(10, 132, 255, 0.2)', color: item.color || '#0A84FF' }}>
                      {item.badge}
                    </span>
                  )}
                  <RightOutline color="#8E8E93" fontSize={14} />
                </div>
              </button>
            ))}

            {/* 清除数据 */}
            <button
              onClick={handleClearFavorites}
              className="w-full flex items-center p-4 active:bg-gray-800 transition-colors"
              style={{ borderTop: '0.5px solid #38383A', marginTop: '8px', paddingTop: '20px' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mr-3" style={{ background: 'rgba(255, 59, 48, 0.2)', color: '#FF3B30', fontSize: '18px' }}>
                <DeleteOutline />
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium" style={{ color: '#FF3B30' }}>清空收藏</div>
                <div className="text-xs text-gray-400 mt-0.5">不可恢复</div>
              </div>
              <RightOutline color="#8E8E93" fontSize={14} />
            </button>
          </div>
        </div>
      )}

      {/* 收藏列表 */}
      {activeTab === 'favorites' && (
        <div className="px-4 mt-4">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-6xl mb-4">❤️‍🔥</div>
              <p className="text-gray-400 text-base mb-2">还没有收藏</p>
              <p className="text-gray-500 text-sm">在拍照场景中点击 ❤️ 收藏</p>
            </div>
          ) : (
            <div className="rounded-xl overflow-hidden" style={{ background: '#1C1C1E' }}>
              {favorites.map((fav, index) => (
                <div
                  key={fav.id}
                  className="flex items-center p-4 active:bg-gray-800 transition-colors"
                  style={{ borderBottom: index < favorites.length - 1 ? '0.5px solid #38383A' : 'none' }}
                >
                  <span className="text-2xl mr-3">{fav.icon}</span>
                  <div className="flex-1 text-left">
                    <div className="text-white font-medium text-sm">{fav.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {fav.nameEn} · {fav.savedAt ? new Date(fav.savedAt).toLocaleDateString('zh-CN') : ''}
                    </div>
                  </div>
                  <button
                    onClick={() => removeFavorite(fav.id)}
                    className="w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-transform"
                    style={{ background: 'rgba(255, 59, 48, 0.2)' }}
                  >
                    <span className="text-red-400 text-sm">✕</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
