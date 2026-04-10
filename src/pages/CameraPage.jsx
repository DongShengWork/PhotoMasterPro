import { useState, useEffect } from 'react'
import { PHOTOGRAPHY_MODES } from '../data/photographyModes'
import { motion, AnimatePresence } from 'framer-motion'
import { NavBar, Toast, ProgressBar } from 'antd-mobile'
import { CameraOutline, FlashlightOutline, MoonOutline, SunOutline, SwapOutline } from 'antd-mobile-icons'

export default function CameraPage({ onModeSelect }) {
  const [selectedMode, setSelectedMode] = useState(PHOTOGRAPHY_MODES[0])
  const [isCapturing, setIsCapturing] = useState(false)
  const [flashMode, setFlashMode] = useState('auto') // auto, on, off
  const [cameraFacing, setCameraFacing] = useState('back')
  const [zoom, setZoom] = useState(1)

  const handleCapture = () => {
    setIsCapturing(true)
    // 模拟拍照
    setTimeout(() => {
      setIsCapturing(false)
      Toast.show({
        icon: 'success',
        content: '照片已保存到相册',
        duration: 1500,
      })
    }, 800)
  }

  const handleModeChange = (mode) => {
    setSelectedMode(mode)
    Toast.show({
      content: `已切换到：${mode.name}`,
      duration: 1000,
    })
  }

  const toggleFlash = () => {
    const modes = ['auto', 'on', 'off']
    const currentIndex = modes.indexOf(flashMode)
    const nextMode = modes[(currentIndex + 1) % modes.length]
    setFlashMode(nextMode)
    
    const modeText = { auto: '自动', on: '开启', off: '关闭' }
    Toast.show({
      content: `闪光灯：${modeText[nextMode]}`,
      duration: 1000,
    })
  }

  const toggleCamera = () => {
    setCameraFacing(prev => prev === 'back' ? 'front' : 'back')
    Toast.show({
      content: cameraFacing === 'back' ? '已切换到前置摄像头' : '已切换到后置摄像头',
      duration: 1000,
    })
  }

  const flashIcons = {
    auto: <span className="text-xs font-medium">A</span>,
    on: <FlashlightOutline fontSize={20} />,
    off: <FlashlightOutline fontSize={20} style={{ opacity: 0.3 }} />,
  }

  return (
    <div className="camera-page">
      {/* 顶部导航 */}
      <NavBar
        right={
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleFlash}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ background: 'rgba(60, 60, 60, 0.5)' }}
            >
              {flashIcons[flashMode]}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleCamera}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ background: 'rgba(60, 60, 60, 0.5)' }}
            >
              <SwapOutline fontSize={20} />
            </motion.button>
          </div>
        }
        style={{ 
          background: 'transparent',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10
        }}
      >
        <span className="text-white font-semibold">拍照</span>
      </NavBar>

      {/* 取景框区域 */}
      <div className="camera-viewfinder">
        {/* 模拟相机画面 */}
        <div 
          className="camera-preview"
          style={{
            background: cameraFacing === 'back' 
              ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
              : 'linear-gradient(135deg, #2d1b4e 0%, #1a1a2e 100%)'
          }}
        >
          {/* 网格线 */}
          <div className="camera-grid">
            <div className="grid-line-v" style={{ left: '33.33%' }} />
            <div className="grid-line-v" style={{ left: '66.66%' }} />
            <div className="grid-line-h" style={{ top: '33.33%' }} />
            <div className="grid-line-h" style={{ top: '66.66%' }} />
          </div>

          {/* 对焦框 */}
          <motion.div
            className="focus-frame"
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="focus-corner tl" />
            <div className="focus-corner tr" />
            <div className="focus-corner bl" />
            <div className="focus-corner br" />
          </motion.div>

          {/* 当前模式提示 */}
          <motion.div
            key={selectedMode.id}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mode-hint"
          >
            <span className="text-2xl mr-2">{selectedMode.icon}</span>
            <div>
              <div className="text-white font-medium text-sm">{selectedMode.name}</div>
              <div className="text-gray-300 text-xs">{selectedMode.params.iso} · {selectedMode.params.shutter}</div>
            </div>
          </motion.div>

          {/* 变焦指示器 */}
          <div className="zoom-indicator">
            <div className="flex items-center gap-2 bg-black/50 rounded-full px-3 py-1">
              <span className="text-white text-xs">{zoom}x</span>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-20"
              />
            </div>
          </div>

          {/* 拍照动画 */}
          <AnimatePresence>
            {isCapturing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="capture-flash"
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 底部控制区 */}
      <div className="camera-controls">
        {/* 模式选择条 */}
        <div className="mode-selector">
          <div className="flex gap-2 overflow-x-auto pb-2 px-4 scrollbar-hide">
            {PHOTOGRAPHY_MODES.map((mode) => (
              <motion.button
                key={mode.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleModeChange(mode)}
                className={`mode-chip ${selectedMode.id === mode.id ? 'active' : ''}`}
              >
                <span className="text-lg mr-1">{mode.icon}</span>
                <span className="text-xs whitespace-nowrap">{mode.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* 拍照按钮区域 */}
        <div className="shutter-area">
          <div className="flex items-center justify-between px-8">
            {/* 相册预览 */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-lg overflow-hidden border-2 border-white/30"
              style={{ background: 'rgba(60, 60, 60, 0.5)' }}
            >
              <div className="w-full h-full flex items-center justify-center text-xl">
                🖼️
              </div>
            </motion.button>

            {/* 快门按钮 */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCapture}
              className="shutter-button"
            >
              <div className="shutter-inner" />
            </motion.button>

            {/* 模式详情 */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onModeSelect(selectedMode)}
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(60, 60, 60, 0.5)' }}
            >
              <span className="text-xl">⚙️</span>
            </motion.button>
          </div>
        </div>

        {/* 参数快速显示 */}
        <motion.div
          key={selectedMode.id}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="quick-params"
        >
          <div className="flex justify-center gap-4 text-xs text-gray-400">
            <span>ISO {selectedMode.params.iso}</span>
            <span>·</span>
            <span>{selectedMode.params.shutter}</span>
            <span>·</span>
            <span>{selectedMode.params.wb}</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
