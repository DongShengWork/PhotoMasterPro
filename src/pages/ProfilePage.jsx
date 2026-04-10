import { useState } from 'react'
import { PHOTOGRAPHY_MODES } from '../data/photographyModes'
import { useFavorites } from '../hooks/useFavorites'
import { useSubscription } from '../hooks/useSubscription'

// 个人中心页
export default function ProfilePage({ onBack, onSelectMode }) {
  const { favorites, removeFavorite, clearFavorites } = useFavorites()
  const { tier, isPro, expiresAt } = useSubscription()
  const [tab, setTab] = useState('profile') // 'profile' | 'favorites'

  return (
    <div className="min-h-screen pb-8">
      {/* 顶部 */}
      <div className="px-5 pt-14 pb-6 bg-gradient-to-b from-accent/15 to-transparent">
        <button onClick={onBack} className="flex items-center gap-1 text-gray-400 text-sm mb-4 active:opacity-70">
          <span>←</span> 返回
        </button>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-accent/30 flex items-center justify-center text-3xl">
            📷
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-white">拍照爱好者</h1>
              {isPro && (
                <span className="px-2 py-0.5 bg-accent/30 text-accent text-xs font-bold rounded-full">
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
          <div className="flex-1 bg-darkCard rounded-2xl p-4 text-center border border-gray-800">
            <div className="text-2xl font-bold text-white">{favorites.length}</div>
            <div className="text-xs text-gray-400 mt-0.5">收藏场景</div>
          </div>
          <div className="flex-1 bg-darkCard rounded-2xl p-4 text-center border border-gray-800">
            <div className="text-2xl font-bold text-white">{PHOTOGRAPHY_MODES.length}</div>
            <div className="text-xs text-gray-400 mt-0.5">全部场景</div>
          </div>
          <div className="flex-1 bg-darkCard rounded-2xl p-4 text-center border border-gray-800">
            <div className="text-2xl font-bold text-white">{tier === 'pro' ? '1' : '0'}</div>
            <div className="text-xs text-gray-400 mt-0.5">订阅状态</div>
          </div>
        </div>
      </div>

      {/* Tab 切换 */}
      <div className="px-5 mb-4">
        <div className="flex bg-darkCard rounded-2xl p-1 border border-gray-800">
          <button
            onClick={() => setTab('profile')}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
              tab === 'profile' ? 'bg-accent/20 text-white' : 'text-gray-400'
            }`}
          >
            📋 功能
          </button>
          <button
            onClick={() => setTab('favorites')}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
              tab === 'favorites' ? 'bg-accent/20 text-white' : 'text-gray-400'
            }`}
          >
            ❤️ 收藏 ({favorites.length})
          </button>
        </div>
      </div>

      {/* 功能菜单 / 收藏列表 */}
      <div className="px-5">
        {tab === 'profile' && (
          <div className="space-y-2.5">
            <MenuItem icon="📕" label="订阅 Pro" desc="解锁进阶场景和专属教程" badge={isPro ? '当前' : '推荐'} badgeColor="accent" onClick={() => {/* 跳转到订阅页 */}} />
            <MenuItem icon="❤️" label="我的收藏" desc={`${favorites.length} 个收藏场景`} onClick={() => setTab('favorites')} />
            <MenuItem icon="🌐" label="支持语言" desc="简体中文 / English" />
            <MenuItem icon="📱" label="版本信息" desc="v1.0.0 · PhotoMaster Pro" />
            <MenuItem icon="💬" label="意见反馈" desc="问题和建议" />
            <MenuItem icon="📖" label="使用帮助" desc="快速入门指南" />

            {/* 清除数据 */}
            <button
              onClick={() => {
                if (confirm('确定要清空所有收藏吗？此操作不可撤销。')) {
                  clearFavorites()
                }
              }}
              className="w-full text-left bg-darkCard rounded-2xl p-4 border border-gray-800 flex items-center gap-3 active:opacity-70"
            >
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-lg">🗑️</div>
              <div>
                <div className="text-sm font-medium text-red-400">清空收藏</div>
                <div className="text-xs text-gray-500">不可恢复</div>
              </div>
            </button>
          </div>
        )}

        {tab === 'favorites' && (
          <div>
            {favorites.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">❤️‍🔥</div>
                <p className="text-sm text-gray-400 mb-1">还没有收藏</p>
                <p className="text-xs text-gray-500">在拍照场景中点击 ❤️ 收藏</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {favorites.map(fav => (
                  <div key={fav.id} className="bg-darkCard rounded-2xl p-4 border border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{fav.icon}</div>
                      <div>
                        <div className="text-sm font-semibold text-white">{fav.name}</div>
                        <div className="text-xs text-gray-500">{fav.nameEn} · {fav.savedAt ? new Date(fav.savedAt).toLocaleDateString('zh-CN') : ''}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFavorite(fav.id)}
                      className="text-red-400/60 hover:text-red-400 text-xs active:scale-90 transition-transform"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function MenuItem({ icon, label, desc, badge, badgeColor = 'accent', onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-darkCard rounded-2xl p-4 border border-gray-800 flex items-center justify-between hover:border-gray-700 active:opacity-80 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-dark flex items-center justify-center text-lg">{icon}</div>
        <div>
          <div className="text-sm font-medium text-white">{label}</div>
          <div className="text-xs text-gray-500">{desc}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {badge && (
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            badgeColor === 'accent' ? 'bg-accent/20 text-accent' : 'bg-green-500/20 text-green-400'
          }`}>
            {badge}
          </span>
        )}
        <span className="text-gray-600 text-sm">→</span>
      </div>
    </button>
  )
}
