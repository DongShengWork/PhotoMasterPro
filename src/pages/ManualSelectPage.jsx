import { useState } from 'react'
import { PHONE_BRANDS, PHOTOGRAPHY_MODES } from '../data/photographyModes'

// 手动选择手机品牌和型号
export default function ManualSelectPage({ onBack, onSelect }) {
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [selectedModel, setSelectedModel] = useState(null)
  const [selectedMode, setSelectedMode] = useState(null)

  const handleConfirm = () => {
    if (selectedBrand && selectedModel && selectedMode) {
      // 跳转到对应模式的详情页（复用 ModeDetailPage）
      onSelect('detail', selectedMode)
    }
  }

  return (
    <div className="min-h-screen pb-28">
      <div className="px-5 pt-14">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-gray-400 text-sm mb-4 active:opacity-70"
        >
          <span>←</span> 返回
        </button>
        <h1 className="text-2xl font-bold text-white mb-1">手动选择</h1>
        <p className="text-sm text-gray-400 mb-6">选择你的手机和想要的拍摄效果</p>

        {/* Step 1: 选择品牌 */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <h2 className="text-sm font-semibold text-white">选择手机品牌</h2>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {PHONE_BRANDS.map(brand => (
              <button
                key={brand.id}
                onClick={() => { setSelectedBrand(brand); setSelectedModel(null) }}
                className={`rounded-xl p-3 text-center border transition-colors active:scale-95 ${
                  selectedBrand?.id === brand.id
                    ? 'bg-accent/20 border-accent text-white'
                    : 'bg-darkCard border-gray-800 text-gray-300'
                }`}
              >
                <div className="text-xl mb-1">{brand.logo}</div>
                <div className="text-xs">{brand.nameZh}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: 选择型号 */}
        {selectedBrand && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold">2</span>
              <h2 className="text-sm font-semibold text-white">选择具体型号</h2>
            </div>
            <div className="space-y-2">
              {selectedBrand.models.map(model => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model)}
                  className={`w-full text-left rounded-xl p-4 border transition-colors ${
                    selectedModel?.id === model.id
                      ? 'bg-accent/20 border-accent'
                      : 'bg-darkCard border-gray-800'
                  }`}
                >
                  <div className="text-sm font-medium text-white">{model.name}</div>
                  <div className="flex gap-2 mt-1">
                    {model.hasProMode && (
                      <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full">专业模式</span>
                    )}
                    {model.hasNightMode && (
                      <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded-full">夜景模式</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: 选择拍摄场景 */}
        {selectedModel && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold">3</span>
              <h2 className="text-sm font-semibold text-white">选择拍摄场景</h2>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {PHOTOGRAPHY_MODES.map(mode => (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode)}
                  className={`text-left rounded-xl p-3 border transition-colors active:scale-95 ${
                    selectedMode?.id === mode.id
                      ? 'bg-accent/20 border-accent'
                      : 'bg-darkCard border-gray-800'
                  }`}
                >
                  <div className="text-2xl mb-1">{mode.icon}</div>
                  <div className="text-xs font-medium text-white">{mode.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 品牌使用指南 */}
        {selectedModel && (
          <div className="bg-darkCard rounded-2xl p-4 border border-gray-800 mb-4">
            <div className="text-xs text-accent font-medium mb-3">📱 {selectedModel.name} 使用指南</div>
            {selectedModel.hasProMode && (
              <div className="mb-2">
                <div className="text-xs text-gray-400 mb-1">专业模式</div>
                <p className="text-xs text-gray-300">{selectedBrand.howToProMode}</p>
              </div>
            )}
            {selectedModel.hasNightMode && (
              <div>
                <div className="text-xs text-gray-400 mb-1">夜景模式</div>
                <p className="text-xs text-gray-300">{selectedBrand.howToNightMode}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 底部确认按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-dark/95 backdrop-blur-md border-t border-gray-800 p-4 z-10">
        <button
          onClick={handleConfirm}
          disabled={!selectedMode}
          className={`w-full font-semibold rounded-2xl py-3.5 text-sm transition-colors ${
            selectedMode
              ? 'bg-accent hover:bg-accentLight text-white active:opacity-90'
              : 'bg-darkCard text-gray-500 cursor-not-allowed border border-gray-800'
          }`}
        >
          {selectedMode ? `查看「${selectedMode.name}」参数 →` : '请完成以上选择'}
        </button>
      </div>
    </div>
  )
}
