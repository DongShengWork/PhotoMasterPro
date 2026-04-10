import { useState } from 'react'
import { PHOTOGRAPHY_MODES } from './data/photographyModes'
import CameraPage from './pages/CameraPage'
import ModesPage from './pages/ModesPage'
import ModeDetailPage from './pages/ModeDetailPage'
import XiaohongshuSearchPage from './pages/XiaohongshuSearchPage'
import ProfilePage from './pages/ProfilePage'
import { TabBar, SafeArea } from 'antd-mobile'
import { motion, AnimatePresence } from 'framer-motion'
import { CameraOutline, AppOutline, UserOutline } from 'antd-mobile-icons'
import './App.css'

const TABS = [
  { key: 'camera', title: '拍照', icon: <CameraOutline /> },
  { key: 'modes', title: '模式', icon: <AppOutline /> },
  { key: 'profile', title: '我的', icon: <UserOutline /> },
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
    <div className="app-container">
      <div className="app-content">
        <AnimatePresence mode="wait">
          {/* 拍照页 */}
          {tab === 'camera' && view === null && (
            <motion.div
              key="camera"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="page-wrapper"
            >
              <CameraPage onModeSelect={handleModeSelect} />
            </motion.div>
          )}

          {/* 模式页 */}
          {tab === 'modes' && view === null && (
            <motion.div
              key="modes"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="page-wrapper"
            >
              <ModesPage onSelectMode={handleModeSelect} />
            </motion.div>
          )}

          {/* 我的页 */}
          {tab === 'profile' && view === null && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="page-wrapper"
            >
              <ProfilePage onBack={() => setTab('camera')} />
            </motion.div>
          )}

          {/* 模式详情页 */}
          {view === 'detail' && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="page-wrapper overlay"
            >
              <ModeDetailPage
                mode={currentMode}
                onBack={handleBack}
                onSearch={() => setView('search')}
              />
            </motion.div>
          )}

          {/* 小红书搜索页 */}
          {view === 'search' && (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="page-wrapper overlay"
            >
              <XiaohongshuSearchPage
                mode={currentMode}
                onBack={handleBack}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 底部 Tab（只有在一级页面显示） */}
      {view === null && (
        <div className="tab-bar-wrapper">
          <TabBar activeKey={tab} onChange={setTab} safeArea>
            {TABS.map(item => (
              <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
          </TabBar>
        </div>
      )}
      
      <SafeArea position="bottom" />
    </div>
  )
}
