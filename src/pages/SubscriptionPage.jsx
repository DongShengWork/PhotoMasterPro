import { useState } from 'react'
import { useSubscription } from '../hooks/useSubscription'

// 订阅页面 - Free vs Pro 对比
export default function SubscriptionPage({ onBack }) {
  const { tier, isPro, expiresAt, activatePro, cancelSubscription } = useSubscription()
  const [paying, setPaying] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handlePay = () => {
    setShowConfirm(true)
  }

  const confirmPay = () => {
    setPaying(true)
    setShowConfirm(false)
    // 模拟支付流程（2秒后激活）
    setTimeout(() => {
      activatePro()
      setPaying(false)
    }, 2000)
  }

  const plans = [
    {
      id: 'monthly',
      name: '月度会员',
      price: '¥9.9',
      period: '/月',
      original: '¥19.9',
      badge: '限时特惠',
      features: ['全部进阶拍照场景解锁', '专属小红书教程合集', '优先获取新功能', '无广告体验']
    },
    {
      id: 'yearly',
      name: '年度会员',
      price: '¥69',
      period: '/年',
      original: '¥199',
      badge: '推荐',
      savings: '省 ¥170',
      features: ['月度会员全部权益', '专属拍摄计划定制', '年度专属活动参与权', '专属客服支持']
    }
  ]

  return (
    <div className="min-h-screen pb-8">
      {/* 顶部 */}
      <div className="px-5 pt-14 pb-6 bg-gradient-to-b from-accent/15 to-transparent">
        <button onClick={onBack} className="flex items-center gap-1 text-gray-400 text-sm mb-4 active:opacity-70">
          <span>←</span> 返回
        </button>
        <div className="text-center">
          <div className="text-4xl mb-3">👑</div>
          <h1 className="text-2xl font-bold text-white mb-1">
            {isPro ? '您已是 Pro 会员' : '解锁 PhotoMaster Pro'}
          </h1>
          <p className="text-sm text-gray-400">
            {isPro
              ? `会员有效期至 ${expiresAt ? expiresAt.toLocaleDateString('zh-CN') : '永久'}`
              : '解锁全部进阶功能，拍照更专业'}
          </p>
        </div>
      </div>

      {/* Pro 功能亮点 */}
      {!isPro && (
        <div className="px-5 mb-5">
          <div className="bg-gradient-to-r from-accent/20 to-orange-500/20 rounded-2xl p-4 border border-accent/20">
            <div className="text-xs text-accent font-semibold mb-2">✨ Pro 专属权益</div>
            <div className="space-y-2">
              {[
                ['🎯', '解锁进阶拍照场景（星轨、HDR合成、延时摄影等）'],
                ['📕', '专属小红书教程合集（持续更新）'],
                ['🗺️', '个人拍摄计划定制（按季节/地点推荐）'],
                ['🔔', '新功能优先体验'],
                ['🚫', '完全无广告'],
              ].map(([icon, text]) => (
                <div key={text} className="flex items-start gap-2">
                  <span className="text-base mt-0.5">{icon}</span>
                  <span className="text-sm text-gray-200 leading-relaxed">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 会员方案 */}
      {!isPro && (
        <div className="px-5 mb-5">
          <h2 className="text-sm font-semibold text-gray-300 mb-3">选择会员方案</h2>
          <div className="space-y-3">
            {plans.map((plan, idx) => (
              <div
                key={plan.id}
                className={`rounded-2xl p-4 border transition-colors relative ${
                  plan.badge === '推荐'
                    ? 'bg-accent/10 border-accent/40'
                    : 'bg-darkCard border-gray-800'
                }`}
              >
                {plan.badge && (
                  <div className={`absolute -top-2.5 ${plan.badge === '推荐' ? 'left-4' : 'right-4'}`}>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      plan.badge === '推荐' ? 'bg-accent text-white' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {plan.badge}
                    </span>
                  </div>
                )}
                <div className="flex items-end justify-between mb-3">
                  <div>
                    <div className="text-base font-bold text-white">{plan.name}</div>
                    {plan.savings && (
                      <div className="text-xs text-green-400 mt-0.5">{plan.savings}</div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-accent">{plan.price}</div>
                    <div className="text-xs text-gray-500 line-through">{plan.original}{plan.period}</div>
                  </div>
                </div>
                <div className="space-y-1.5 mb-4">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-center gap-2">
                      <span className="text-accent text-xs">✓</span>
                      <span className="text-xs text-gray-300">{f}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handlePay}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors active:scale-95 ${
                    plan.badge === '推荐'
                      ? 'bg-accent hover:bg-accentLight text-white'
                      : 'bg-dark border border-gray-700 text-gray-300 hover:border-gray-600'
                  }`}
                >
                  立即订阅 {plan.price}{plan.period}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 已订阅：取消订阅 */}
      {isPro && (
        <div className="px-5 mb-5">
          <div className="bg-darkCard rounded-2xl p-4 border border-gray-800 text-center">
            <div className="text-4xl mb-2">👑</div>
            <h3 className="text-base font-bold text-white mb-1">感谢支持 PhotoMaster Pro</h3>
            <p className="text-xs text-gray-400 mb-4">
              您的 Pro 会员有效期至<br/>
              {expiresAt ? expiresAt.toLocaleDateString('zh-CN') : '永久'}
            </p>
            <button
              onClick={() => {
                if (confirm('确定要取消订阅吗？取消后无法退款，但您仍可使用至本期结束。')) {
                  cancelSubscription()
                }
              }}
              className="px-6 py-2 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-400 active:opacity-80 transition-opacity"
            >
              取消订阅
            </button>
          </div>
        </div>
      )}

      {/* 底部支付方式提示 */}
      {!isPro && (
        <div className="px-5 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>💳</span> 微信支付
            </div>
            <div className="w-px h-3 bg-gray-700"></div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>💰</span> 支付宝
            </div>
            <div className="w-px h-3 bg-gray-700"></div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>📱</span> Apple Pay
            </div>
          </div>
          <p className="text-xs text-gray-600">
            订阅即表示同意《用户协议》和《隐私政策》<br/>
            取消订阅后会员权益持续至当期结束
          </p>
        </div>
      )}

      {/* 支付确认弹窗 */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end justify-center p-4" onClick={() => setShowConfirm(false)}>
          <div
            className="bg-darkCard rounded-2xl p-5 w-full max-w-sm border border-gray-800"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-base font-bold text-white mb-1">确认订阅</h3>
            <p className="text-xs text-gray-400 mb-4">即将通过微信支付完成付款</p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2.5 rounded-xl text-sm text-gray-300 bg-dark border border-gray-700 active:opacity-80"
              >
                取消
              </button>
              <button
                onClick={confirmPay}
                className="flex-1 py-2.5 rounded-xl text-sm text-white bg-accent font-semibold active:opacity-90"
              >
                确认支付
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 支付中 */}
      {paying && (
        <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center">
          <div className="text-5xl animate-bounce mb-4">💳</div>
          <p className="text-sm text-white font-medium mb-1">支付处理中...</p>
          <p className="text-xs text-gray-400">请在微信支付弹窗中完成确认</p>
        </div>
      )}
    </div>
  )
}
