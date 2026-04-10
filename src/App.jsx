import { useState } from 'react'
import { PHOTOGRAPHY_MODES } from './data/photographyModes'
import CameraPage from './pages/CameraPage'
import ModesPage from './pages/ModesPage'
import ModeDetailPage from './pages/ModeDetailPage'
import XiaohongshuSearchPage from './pages/XiaohongshuSearchPage'
import ProfilePage from './pages/ProfilePage'
import { TabBar, SafeArea } from 'antd-mobile'
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
        {/* 拍照页 */}
        {tab === 'camera' && view === null && (
          <div className="page-wrapper">
            <CameraPage 
              onModeSelect={handleModeSelect} 
              onBack={() => setTab('modes')}
            />
          </div>
        )}

        {/* 模式页 */}
        {tab === 'modes' && view === null && (
          <div className="page-wrapper">
            <ModesPage onSelectMode={handleModeSelect} />
          </div>
        )}

        {/* 我的页 */}
        {tab === 'profile' && view === null && (
          <div className="page-wrapper">
            <ProfilePage onBack={() => setTab('camera')} />
          </div>
        )}

        {/* 模式详情页 */}
        {view === 'detail' && (
          <div className="page-wrapper overlay slide-up">
            <ModeDetailPage
              mode={currentMode}
              onBack={handleBack}
              onSearch={() => setView('search')}
            />
          </div>
        )}

        {/* 小红书搜索页 */}
        {view === 'search' && (
          <div className="page-wrapper overlay slide-up">
            <XiaohongshuSearchPage
              mode={currentMode}
              onBack={handleBack}
            />
          </div>
        )}
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

      {/* 顶部安全区 */}
      <SafeArea position="top" />
      
      <SafeArea position="bottom" />
    </div>
  )
}
