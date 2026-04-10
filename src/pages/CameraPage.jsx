import { useState, useRef, useEffect, useCallback } from 'react'
import { PHOTOGRAPHY_MODES } from '../data/photographyModes'
import { useFavorites } from '../hooks/useFavorites'

// 相机页：全屏摄像头 + 浮动模式选择条（支持切换当前模式）
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
    setTimeout(() => setShowCapture(false), 600)
  }

  if (permDenied) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center px-8">
        <div className="text-5xl mb-4">📷</div>
        <h2 className="text-white font-bold text-lg mb-2">需要相机权限</h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          请在系统设置中允许 App 访问相机<br/>
          设置 → 隐私与安全 → 相机 → PhotoMaster Pro
        </p>
        <button onClick={() => startCam(facing)} className="px-6 py-2.5 bg-accent text-white rounded-xl text-sm font-medium active:opacity-80">
          重试
        </button>
      </div>
    )
  }

  if (!hasCam) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center px-8">
        <div className="text-5xl mb-4">📱</div>
        <h2 className="text-white font-bold text-lg mb-2">未检测到相机</h2>
        <p className="text-gray-400 text-sm text-center">请在真机上体验完整功能</p>
      </div>
    )
  }

  return (
    <div className="relative h-full bg-black overflow-hidden select-none">
      {/* 摄像头预览 */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`absolute inset-0 w-full h-full object-cover ${facing === 'user' ? 'scale-x-[-1]' : ''}`}
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* 拍照闪白反馈 */}
      {showCapture && (
        <div className="absolute inset-0 bg-white z-30 animate-pulse pointer-events-none" />
      )}

      {/* 顶部状态栏 */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 pt-14 pb-3">
        <button
          onClick={() => setFlash(f => f === 'off' ? 'on' : f === 'on' ? 'auto' : 'off')}
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white active:scale-90 transition-transform"
        >
          {flash === 'off' ? '⚫' : flash === 'on' ? '💡' : '🔆'}
        </button>

        {/* 当前模式 → 点击打开详情 */}
        <button
          onClick={() => onModeSelect(currentMode)}
          className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-sm font-medium flex items-center gap-1.5 active:scale-95 transition-transform"
        >
          <span>{currentMode.icon}</span>
          <span>{currentMode.name}</span>
          <span>→</span>
        </button>

        <button
          onClick={toggleFacing}
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white text-lg active:scale-90 transition-transform"
        >
          🔄
        </button>
      </div>

      {/* 参数展开层 */}
      {showParams && (
        <div className="absolute top-28 left-4 right-4 z-20 bg-black/80 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{currentMode.icon}</span>
              <div>
                <div className="text-white font-bold text-sm">{currentMode.name}</div>
                <div className="text-gray-400 text-xs">{currentMode.nameEn}</div>
              </div>
            </div>
            <button
              onClick={() => onModeSelect(currentMode)}
              className="px-3 py-1 bg-accent rounded-lg text-xs text-white font-medium"
            >
              查看详情
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[['ISO', currentMode.params.iso], ['快门', currentMode.params.shutter], ['光圈', currentMode.params.aperture], ['白平衡', currentMode.params.wb]].map(([k, v]) => (
              <div key={k} className="bg-white/5 rounded-xl px-3 py-2">
                <div className="text-xs text-gray-400">{k}</div>
                <div className="text-white font-bold text-sm">{v}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">{currentMode.params.tips}</p>
        </div>
      )}

      {/* 底部区域 */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        {/* 浮动模式选择条 */}
        <div className="px-4 pb-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {PHOTOGRAPHY_MODES.map(m => (
              <button
                key={m.id}
                onClick={() => {
                  setCurrentMode(m)
                  setShowParams(false)
                }}
                className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all active:scale-95 ${
                  m.id === currentMode.id
                    ? 'bg-accent text-white'
                    : 'bg-black/50 backdrop-blur-md text-white/80 border border-white/10'
                }`}
              >
                <span className="text-base">{m.icon}</span>
                <span className="whitespace-nowrap">{m.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 快门按钮 */}
        <div className="flex items-center justify-center pb-12">
          <button
            onTouchStart={() => setShowManual(true)}
            onClick={takePhoto}
            className="w-20 h-20 rounded-full bg-white border-4 border-white/30 flex items-center justify-center active:scale-90 transition-all shadow-2xl"
          >
            <div className="w-14 h-14 rounded-full bg-white" />
          </button>
        </div>
      </div>

      {/* 手动参数调节 */}
      {showManual && (
        <div
          className="absolute inset-0 z-30 bg-black/85 backdrop-blur-sm flex flex-col justify-end pb-28 px-5"
          onClick={() => setShowManual(false)}
        >
          <div className="bg-darkCard rounded-t-3xl p-5 border border-gray-800" onClick={e => e.stopPropagation()}>
            <div className="text-center text-white font-bold text-sm mb-4">📐 手动参数调节</div>
            {[
              { label: 'ISO', key: 'iso', min: 50, max: 3200, step: 50 },
              { label: '快门', key: 'shutter', options: ['1/4000','1/2000','1/1000','1/500','1/250','1/125','1/60','1/30','1/15','1/8','1/4','1/2','1"','2"','4"','8"','15"','30"'] },
              { label: '白平衡', key: 'wb', min: 2500, max: 10000, step: 100 },
            ].map(item => (
              <div key={item.key} className="mb-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                  <span>{item.label}</span>
                  <span className="text-accent font-bold">
                    {item.options ? manualParams.shutter : manualParams[item.key]}
                  </span>
                </div>
                {item.options ? (
                  <div className="flex gap-1 overflow-x-auto no-scrollbar pb-1">
                    {item.options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setManualParams(p => ({ ...p, [item.key]: opt }))}
                        className={`flex-shrink-0 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          manualParams.shutter === opt ? 'bg-accent text-white' : 'bg-dark border border-gray-700 text-gray-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <input type="range" min={item.min} max={item.max} step={item.step}
                    value={manualParams[item.key]}
                    onChange={e => setManualParams(p => ({ ...p, [item.key]: Number(e.target.value) }))}
                    className="w-full accent-accent"
                  />
                )}
              </div>
            ))}
            <button onClick={() => setShowManual(false)} className="w-full py-2.5 bg-accent text-white rounded-xl text-sm font-medium mt-1 active:opacity-80">
              应用参数
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
