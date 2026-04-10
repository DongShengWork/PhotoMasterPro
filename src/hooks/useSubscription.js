import { useState, useEffect } from 'react'

// 订阅状态管理 Hook（基于 localStorage 持久化）
export function useSubscription() {
  const [tier, setTier] = useState('free')
  const [expiresAt, setExpiresAt] = useState(null)

  useEffect(() => {
    try {
      const storedTier = localStorage.getItem('photomaster_tier') || 'free'
      const storedExp = localStorage.getItem('photomaster_expires')
      setTier(storedTier)
      setExpiresAt(storedExp ? new Date(storedExp) : null)
    } catch {
      setTier('free')
    }
  }, [])

  const activatePro = () => {
    const exp = new Date()
    exp.setMonth(exp.getMonth() + 1)
    setTier('pro')
    setExpiresAt(exp)
    try {
      localStorage.setItem('photomaster_tier', 'pro')
      localStorage.setItem('photomaster_expires', exp.toISOString())
    } catch {}
  }

  const cancelSubscription = () => {
    setTier('free')
    setExpiresAt(null)
    try {
      localStorage.setItem('photomaster_tier', 'free')
      localStorage.removeItem('photomaster_expires')
    } catch {}
  }

  const isPro = tier === 'pro' && expiresAt && expiresAt > new Date()

  return { tier, isPro, expiresAt, activatePro, cancelSubscription }
}
