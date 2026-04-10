import { useState } from 'react'
import { PHOTOGRAPHY_MODES } from './data/photographyModes'
import CameraPage from './pages/CameraPage'
import ModesPage from './pages/ModesPage'
import ModeDetailPage from './pages/ModeDetailPage'
import XiaohongshuSearchPage from './pages/XiaohongshuSearchPage'
import ProfilePage from './pages/ProfilePage'

const TABS = [
  { key: 'camera', label: '📷', name: '拍照' },
  { key: 'modes', label: '🎨', name: '模式' },
  { key: 'profile', label: '👤', name: '我的' },
]

export default function App() {
  const [tab, setTab] = useState('camera')
  const [view, setView] = useState(null)        // null | 'detail' | 'search'
  const [currentMode, setCurrentMode] = useState(PHOTOGRAPHY_MODES[0])

  const handleModeSelect = (mode) => {
    setCurrentMode(mode)
    setView('detail')
  }

  const handleBack = () => setView(null)

  return (
    <div className="h-screen bg-dark text-white font-sans flex flex-col overflow-hidden">
      <div className="flex-1 overflow-hidden relative">

        {/* 拍照页 */}
        {tab === 'camera' && view === null && (
          <CameraPage onModeSelect={handleModeSelect} />
        )}

        {/* 模式页 */}
        {tab === 'modes' && view === null && (
          <ModesPage onSelectMode={handleModeSelect} />
        )}

        {/* 我的页 */}
        {tab === 'profile' && view === null && (
          <ProfilePage onBack={() => setTab('camera')} />
        )}

        {/* 模式详情页 */}
        {view === 'detail' && (
          <ModeDetailPage
            mode={currentMode}
            onBack={handleBack}
            onSearch={() => setView('search')}
          />
        )}

        {/* 小红书搜索页 */}
        {view === 'search' && (
          <XiaohongshuSearchPage
            mode={currentMode}
            onBack={handleBack}
          />
        )}
      </div>

      {/* 底部 Tab（只有在一级页面显示） */}
      {view === null && (
        <nav className="flex-none bg-dark/95 backdrop-blur-md border-t border-gray-800 px-6 pb-6 pt-2 z-30">
          <div className="flex items-center justify-around">
            {TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex flex-col items-center gap-0.5 py-1 px-4 rounded-xl transition-colors ${
                  tab === t.key ? 'text-accent' : 'text-gray-500'
                }`}
              >
                <span className="text-2xl">{t.label}</span>
                <span className="text-xs font-medium">{t.name}</span>
              </button>
            ))}
          </div>
        </nav>
      )}
    </div>
  )
}
