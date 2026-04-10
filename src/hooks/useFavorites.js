import { useState, useEffect } from 'react'

// 收藏模式管理 Hook（基于 localStorage 持久化）
export function useFavorites() {
  const [favorites, setFavorites] = useState([])

  // 初始化：从 localStorage 加载收藏
  useEffect(() => {
    try {
      const stored = localStorage.getItem('photomaster_favorites')
      if (stored) {
        setFavorites(JSON.parse(stored))
      }
    } catch {
      setFavorites([])
    }
  }, [])

  // 持久化保存
  const save = (newFavorites) => {
    setFavorites(newFavorites)
    try {
      localStorage.setItem('photomaster_favorites', JSON.stringify(newFavorites))
    } catch {
      // 存储满时忽略
    }
  }

  // 切换收藏状态
  const toggleFavorite = (mode) => {
    const exists = favorites.some(f => f.id === mode.id)
    if (exists) {
      save(favorites.filter(f => f.id !== mode.id))
      return false
    } else {
      save([...favorites, {
        id: mode.id,
        name: mode.name,
        nameEn: mode.nameEn,
        icon: mode.icon,
        description: mode.description,
        tags: mode.tags,
        savedAt: new Date().toISOString()
      }])
      return true
    }
  }

  const isFavorited = (modeId) => favorites.some(f => f.id === modeId)

  // 移除单个收藏
  const removeFavorite = (modeId) => {
    save(favorites.filter(f => f.id !== modeId))
  }

  // 清空全部收藏
  const clearFavorites = () => save([])

  return { favorites, toggleFavorite, isFavorited, removeFavorite, clearFavorites }
}
