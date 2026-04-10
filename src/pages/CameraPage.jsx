import { useState, useRef, useEffect, useCallback } from 'react'
import { PHOTOGRAPHY_MODES } from '../data/photographyModes'
import { motion, AnimatePresence } from 'framer-motion'
import { Toast, Modal } from 'antd-mobile'
import { CloseOutline, SwitchOutline, ThunderboltOutline, SettingOutline } from 'antd-mobile-icons'

export default function CameraPage({ onModeSelect }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [hasCam, setHasCam] = useState(true)
  const [permDenied, setPermDenied] = useState(false)
  const [facing, setFacing] = useState('environment')
  const [flash, setFlash] = useState('off')
  const [showParams, setShowParams] = useState(false)
  const [showCapture, setShowCapture] = useState(false)
  const [showManual, setShowManual] = useState(false)
  const [currentMode, setCurrentMode] = useState(PHOTOGRAPHY_MODES[0])
  const [manualParams, setManualParams] = useState({ iso: 100, shutter: '1/125', wb: 5500 })
  const streamRef = useRef(null)

  const startCam = useCallback(async (face = facing) => {
    try {
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: face, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      })
      streamRef.current = stream
      if (videoRef.current) videoRef.current.srcObject = stream
      setHasCam(true)
      setPermDenied(false)
    } catch (err) {
      if (err.name === 'NotAllowedError') setPermDenied(true)
      else setHasCam(false)
    }
  }, [facing])

  useEffect(() => {
    startCam(facing)
    return () => { streamRef.current?.getTracks().forEach(t => t.stop()) }
  }, [])

  const toggleFacing = async () => {
    const next = facing === 'environment' ? 'user' : 'environment'
    setFacing(next)
    await startCam(next)
  }

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return
    const video = videoRef.current
    const canvas = canvasRef.current
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0)
    setShowCapture(true)
    setTimeout(() => setShowCapture(false), 400)
    Toast.show({
      icon: 'success',
      content: '已保存到相册',
      duration: 1500,
    })
  }

  if (permDenied) {
    return (
      <div className="camera-container flex flex-col items-center justify-center px-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-6">📷</div>
          <h2 className="text-white font-semibold text-xl mb-3">需要相机权限</h2>
          <p className="text-gray-400 text-sm text-center mb-8 leading-relaxed">
            请在系统设置中允许 App 访问相机<br/>
            设置 → 隐私与安全 → 相机
          </p>
          <button 
            onClick={() => startCam(facing)} 
            className="ios-button ios-button-primary ios-button-large"
          >
            重试
          </button>
        </motion.div>
      </div>
    )
  }

  if (!hasCam) {
    return (
      <div className="camera-container flex flex-col items-center justify-center px-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-6">📱</div>
          <h2 className="text-white font-semibold text-xl mb-3">未检测到相机</h2>
          <p className="text-gray-400 text-sm">请在真机上体验完整功能</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="camera-container">
      {/* 摄像头预览 */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`camera-video ${facing === 'user' ? 'mirror' : ''}`}
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* 拍照闪白反馈 */}
      <AnimatePresence>
        {showCapture && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-white z-30 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* 顶部状态栏 */}
      <div className="camera-top-bar">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setFlash(f => f === 'off' ? 'on' : f === 'on' ? 'auto' : 'off')}
          className="camera-control-btn"
        >
          {flash === 'off' ? <ThunderboltOutline /> : flash === 'on' ? '💡' : '🔆'}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onModeSelect(currentMode)}
          className="camera-mode-chip"
        >
          <span className="text-lg">{currentMode.icon}</span>
          <span>{currentMode.name}</span>
          <span>›</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleFacing}
          className="camera-control-btn"
        >
          <SwitchOutline />
        </motion.button>
      </div>

      {/* 参数展开层 */}
      <AnimatePresence>
        {showParams && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-4 right-4 z-20"
          >
            <div className="ios-card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{currentMode.icon}</span>
                  <div>
                    <div className="text-white font-semibold text-base">{currentMode.name}</div>
                    <div className="text-gray-400 text-xs">{currentMode.nameEn}</div>
                  </div>
                </div>
                <button
                  onClick={() => onModeSelect(currentMode)}
                  className="ios-button ios-button-primary text-sm py-2 px-4"
                >
                  查看详情
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[['ISO', currentMode.params.iso], ['快门', currentMode.params.shutter], ['光圈', currentMode.params.aperture], ['白平衡', currentMode.params.wb]].map(([k, v]) => (
                  <div key={k} className="bg-black/20 rounded-xl px-4 py-3">
                    <div className="text-xs text-gray-400 mb-1">{k}</div>
                    <div className="text-white font-semibold text-sm">{v}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">{currentMode.params.tips}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 底部区域 */}
      <div className="camera-bottom-bar">
        {/* 浮动模式选择条 */}
        <div className="camera-mode-scroll">
          {PHOTOGRAPHY_MODES.map((m, index) => (
            <motion.button
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentMode(m)
                setShowParams(false)
              }}
              className={`camera-mode-item ${m.id === currentMode.id ? 'active' : ''}`}
            >
              <span className="mr-1">{m.icon}</span>
              {m.name}
            </motion.button>
          ))}
        </div>

        {/* 快门按钮 */}
        <div className="camera-shutter-container">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={takePhoto}
            onLongPress={() => setShowManual(true)}
            className="camera-shutter"
          />
        </div>
      </div>

      {/* 手动参数调节 */}
      <Modal
        visible={showManual}
        onClose={() => setShowManual(false)}
        content={
          <div className="p-4">
            <div className="text-center text-white font-semibold text-base mb-6">手动参数调节</div>
            {[
              { label: 'ISO', key: 'iso', min: 50, max: 3200, step: 50 },
              { label: '快门', key: 'shutter', options: ['1/4000','1/2000','1/1000','1/500','1/250','1/125','1/60','1/30','1/15','1/8','1/4','1/2','1"','2"','4"','8"','15"','30"'] },
              { label: '白平衡', key: 'wb', min: 2500, max: 10000, step: 100 },
            ].map(item => (
              <div key={item.key} className="mb-5">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>{item.label}</span>
                  <span className="text-blue-400 font-semibold">
                    {item.options ? manualParams.shutter : manualParams[item.key]}
                  </span>
                </div>
                {item.options ? (
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {item.options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setManualParams(p => ({ ...p, [item.key]: opt }))}
                        className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                          manualParams.shutter === opt 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-800 text-gray-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <input 
                    type="range" 
                    min={item.min} 
                    max={item.max} 
                    step={item.step}
                    value={manualParams[item.key]}
                    onChange={e => setManualParams(p => ({ ...p, [item.key]: Number(e.target.value) }))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                )}
              </div>
            ))}
            <button 
              onClick={() => setShowManual(false)} 
              className="ios-button ios-button-primary ios-button-large mt-2"
            >
              应用参数
            </button>
          </div>
        }
      />
    </div>
  )
}
