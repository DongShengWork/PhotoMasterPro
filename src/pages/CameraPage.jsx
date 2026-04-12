import { useState, useEffect, useRef, useCallback } from 'react'
import { PHOTOGRAPHY_MODES } from '../data/photographyModes'
import { Toast } from 'antd-mobile'
import { CameraOutline } from 'antd-mobile-icons'

export default function CameraPage({ onModeSelect, onBack }) {
  const [selectedMode, setSelectedMode] = useState(PHOTOGRAPHY_MODES[0])
  const [isCapturing, setIsCapturing] = useState(false)
  const [flashMode, setFlashMode] = useState('auto')
  const [cameraFacing, setCameraFacing] = useState('environment')
  const [hasCamera, setHasCamera] = useState(false)
  const [cameraError, setCameraError] = useState(null)
  const [showParams, setShowParams] = useState(false)
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const initDone = useRef(false)

  // 判断是否支持摄像头 API（扩展/特殊环境可能不支持）
  const supportsCameraApi = typeof navigator !== 'undefined' &&
    navigator.mediaDevices && navigator.mediaDevices.getUserMedia

  useEffect(() => {
    // 不支持 API 的环境 → 直接显示模拟相机
    if (!supportsCameraApi) {
      setHasCamera(false)
      setCameraError('NOT_SUPPORTED')
      return
    }
    // 已初始化过且未切换摄像头 → 跳过
    if (initDone.current && cameraFacing === 'environment') {
      return
    }
    initDone.current = true
    initCamera()
    return () => stopCamera()
  }, []) // eslint-disable-line

  const initCamera = useCallback(async () => {
    if (!supportsCameraApi) return
    stopCamera()
    try {
      const constraints = {
        video: {
          facingMode: cameraFacing,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      }
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
        setHasCamera(true)
        setCameraError(null)
      }
    } catch (err) {
      console.warn('Camera unavailable:', err.name)
      setHasCamera(false)
      if (err.name === 'NotAllowedError') setCameraError('NOT_ALLOWED')
      else if (err.name === 'NotFoundError') setCameraError('NOT_FOUND')
      else setCameraError('ERROR')
    }
  }, [cameraFacing, supportsCameraApi])

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
  }

  const handleCapture = useCallback(() => {
    if (isCapturing) return
    setIsCapturing(true)
    Toast.show({ content: '📸 拍照成功', duration: 1000 })
    setTimeout(() => setIsCapturing(false), 300)
  }, [isCapturing])

  const toggleFlash = useCallback(() => {
    const modes = ['auto', 'on', 'off']
    const next = modes[(modes.indexOf(flashMode) + 1) % 3]
    setFlashMode(next)
    const labels = { auto: '自动', on: '开启', off: '关闭' }
    Toast.show({ content: `闪光灯: ${labels[next]}`, duration: 800 })
  }, [flashMode])

  const toggleCameraFacing = useCallback(() => {
    setCameraFacing(prev => prev === 'environment' ? 'user' : 'environment')
    Toast.show({ content: '切换摄像头', duration: 600 })
  }, [])

  const flashLabels = { auto: 'A', on: '⚡', off: '○' }

  return (
    <div className="camera-page">
      {/* 顶部悬浮按钮（替代 NavBar） */}
      <div className="camera-topbar">
        <button className="topbar-btn" onClick={onBack} aria-label="返回">
          <span className="text-lg">←</span>
        </button>
        <div className="topbar-title">拍照模式</div>
        <div className="topbar-right">
          <button className="topbar-btn" onClick={toggleFlash} aria-label="闪光灯">
            {flashLabels[flashMode]}
          </button>
          <button className="topbar-btn" onClick={toggleCameraFacing} aria-label="切换摄像头">
            🔄
          </button>
        </div>
      </div>

      {/* 相机画面 */}
      <div className="camera-viewfinder">
        {cameraError ? (
          /* 模拟相机界面 */
          <div className="camera-simulator">
            <div className="sim-bg" />
            <div className="sim-overlay">
              {/* 模拟取景框 */}
              <div className="sim-frame">
                <div className="frame-corner tl" />
                <div className="frame-corner tr" />
                <div className="frame-corner bl" />
                <div className="frame-corner br" />
                {/* 模拟拍摄对象 */}
                <div className="sim-subject">📷</div>
              </div>
              {/* 参数叠加 */}
              <div className="sim-params">
                <div className="sim-param">
                  <span className="sim-label">ISO</span>
                  <span className="sim-value">{selectedMode.params.iso}</span>
                </div>
                <div className="sim-param">
                  <span className="sim-label">快门</span>
                  <span className="sim-value">{selectedMode.params.shutter}</span>
                </div>
                <div className="sim-param">
                  <span className="sim-label">光圈</span>
                  <span className="sim-value">{selectedMode.params.aperture}</span>
                </div>
              </div>
              {/* 相机不可用提示 */}
              <div className="sim-hint">
                {cameraError === 'NOT_ALLOWED' ? '请允许相机访问' :
                 cameraError === 'NOT_FOUND' ? '未检测到相机' :
                 cameraError === 'NOT_SUPPORTED' ? '浏览器不支持相机' :
                 '相机初始化失败'}
              </div>
            </div>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              className="camera-video"
              playsInline
              muted
            />
            {isCapturing && <div className="capture-flash" />}
          </>
        )}

        {/* 相机网格 */}
        {!cameraError && (
          <div className="camera-grid" aria-hidden="true">
            <div className="grid-line v1" />
            <div className="grid-line v2" />
            <div className="grid-line h1" />
            <div className="grid-line h2" />
          </div>
        )}

        {/* 当前模式提示 */}
        {!cameraError && (
          <div className="mode-hint">
            <span className="mode-hint-icon">{selectedMode.icon}</span>
            <div>
              <div className="mode-hint-name">{selectedMode.name}</div>
              <div className="mode-hint-params">
                ISO {selectedMode.params.iso} · {selectedMode.params.shutter}
              </div>
            </div>
          </div>
        )}

        {/* 查看参数按钮 */}
        <button
          className="param-btn"
          onClick={() => { onModeSelect(selectedMode) }}
        >
          📋 查看参数
        </button>
      </div>

      {/* 底部控制区 */}
      <div className="camera-controls">
        {/* 模式选择条 */}
        <div className="mode-selector">
          <div className="mode-scroll">
            {PHOTOGRAPHY_MODES.map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  setSelectedMode(mode)
                  Toast.show({ content: mode.name, duration: 600 })
                }}
                className={`mode-chip ${selectedMode.id === mode.id ? 'active' : ''}`}
              >
                <span className="text-base">{mode.icon}</span>
                <span className="text-xs">{mode.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 快门按钮 */}
        <div className="shutter-row">
          <div className="w-14" />
          <button
            className="shutter-btn"
            onClick={handleCapture}
            disabled={isCapturing}
            aria-label="拍照"
          >
            <div className="shutter-inner" />
          </button>
          <div className="w-14" />
        </div>

        {/* 快捷参数 */}
        <div className="quick-params">
          <span>ISO {selectedMode.params.iso}</span>
          <span className="text-gray-600">·</span>
          <span>{selectedMode.params.shutter}</span>
          <span className="text-gray-600">·</span>
          <span>{selectedMode.params.wb}</span>
        </div>
      </div>

      <style>{`
        .camera-page {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #000;
          position: relative;
        }

        /* 顶部悬浮栏 */
        .camera-topbar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          padding: max(12px, env(safe-area-inset-top)) 16px 12px;
          background: linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 100%);
        }
        .topbar-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(10px);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 18px;
        }
        .topbar-btn:active { transform: scale(0.92); }
        .topbar-title {
          flex: 1;
          text-align: center;
          font-size: 17px;
          font-weight: 600;
          color: white;
        }
        .topbar-right {
          display: flex;
          gap: 8px;
        }

        /* 取景器 */
        .camera-viewfinder {
          flex: 1;
          position: relative;
          overflow: hidden;
        }
        .camera-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .camera-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .grid-line {
          position: absolute;
          background: rgba(255,255,255,0.12);
        }
        .grid-line.v1 { left: 33.33%; top: 0; bottom: 0; width: 1px; }
        .grid-line.v2 { left: 66.66%; top: 0; bottom: 0; width: 1px; }
        .grid-line.h1 { top: 33.33%; left: 0; right: 0; height: 1px; }
        .grid-line.h2 { top: 66.66%; left: 0; right: 0; height: 1px; }

        /* 模拟相机 */
        .camera-simulator {
          width: 100%;
          height: 100%;
          position: relative;
        }
        .sim-bg {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
        }
        .sim-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .sim-frame {
          width: 60%;
          aspect-ratio: 3/4;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 8px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .frame-corner {
          position: absolute;
          width: 16px;
          height: 16px;
          border-color: rgba(255,255,255,0.6);
          border-style: solid;
        }
        .frame-corner.tl { top: -2px; left: -2px; border-width: 3px 0 0 3px; border-radius: 4px 0 0 0; }
        .frame-corner.tr { top: -2px; right: -2px; border-width: 3px 3px 0 0; border-radius: 0 4px 0 0; }
        .frame-corner.bl { bottom: -2px; left: -2px; border-width: 0 0 3px 3px; border-radius: 0 0 0 4px; }
        .frame-corner.br { bottom: -2px; right: -2px; border-width: 0 3px 3px 0; border-radius: 0 0 4px 0; }
        .sim-subject {
          font-size: 48px;
          opacity: 0.5;
        }
        .sim-params {
          position: absolute;
          bottom: 80px;
          display: flex;
          gap: 20px;
        }
        .sim-param {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(10px);
          padding: 6px 12px;
          border-radius: 8px;
        }
        .sim-label { font-size: 10px; color: rgba(255,255,255,0.5); }
        .sim-value { font-size: 13px; color: white; font-weight: 600; font-family: monospace; }
        .sim-hint {
          position: absolute;
          bottom: 24px;
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          background: rgba(0,0,0,0.5);
          padding: 4px 12px;
          border-radius: 12px;
        }

        /* 模式提示 */
        .mode-hint {
          position: absolute;
          top: 60px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          z-index: 10;
        }
        .mode-hint-icon { font-size: 20px; }
        .mode-hint-name { font-size: 13px; color: white; font-weight: 500; }
        .mode-hint-params { font-size: 11px; color: rgba(255,255,255,0.6); }

        /* 参数按钮 */
        .param-btn {
          position: absolute;
          bottom: 130px;
          right: 16px;
          padding: 7px 14px;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(10px);
          border-radius: 18px;
          color: white;
          font-size: 13px;
          border: none;
          cursor: pointer;
          z-index: 10;
        }
        .param-btn:active { transform: scale(0.95); }

        /* 拍照闪光 */
        .capture-flash {
          position: absolute;
          inset: 0;
          background: white;
          animation: flashAnim 0.15s ease-out forwards;
          pointer-events: none;
          z-index: 60;
        }
        @keyframes flashAnim { 0% { opacity: 1; } 100% { opacity: 0; } }

        /* 底部控制 */
        .camera-controls {
          background: #000;
          padding-bottom: max(8px, env(safe-area-inset-bottom));
        }
        .mode-selector {
          padding: 10px 0 6px;
        }
        .mode-scroll {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 0 16px;
          scrollbar-width: none;
        }
        .mode-scroll::-webkit-scrollbar { display: none; }
        .mode-chip {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          padding: 6px 10px;
          border-radius: 14px;
          background: rgba(60,60,60,0.6);
          color: rgba(255,255,255,0.7);
          border: none;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.15s;
          min-width: 52px;
        }
        .mode-chip.active {
          background: #0A84FF;
          color: white;
        }
        .mode-chip:active { transform: scale(0.93); }

        .shutter-row {
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 10px 0;
        }
        .shutter-btn {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: transparent;
          border: 4px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .shutter-inner {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: white;
          transition: transform 0.1s;
        }
        .shutter-btn:active .shutter-inner { transform: scale(0.9); }

        .quick-params {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
          padding: 2px 16px 8px;
          font-size: 12px;
          color: rgba(255,255,255,0.5);
        }
      `}</style>
    </div>
  )
}
