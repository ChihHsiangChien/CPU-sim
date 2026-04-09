# CPU-GPU Educational Simulation Platform (CPU-GPU 教育模擬平台)

這是一個互動式的網頁版教育工具，旨在透過視覺化模擬，幫助學生與開發者深入理解計算機架構。本專案從最基礎的邏輯閘開始，逐步引導使用者構建出一個完整的 4 位元中央處理器 (CPU)。

## 🚀 專案特點
- **漸進式學習**：包含 14 個學習步驟（Step 0 到 Step 13）。
- **即時電路模擬**：基於 [DigitalJS](https://github.com/tilk/digitaljs) 引擎，可觀察每一條線路的電位變化。
- **視覺化儀表板**：內建即時監控暫存器（PC, ACC）數值。
- **現代化介面**：提供淺色/深色主題切換（目前預設為淺色桌面風格）。

## 🛠 核心技術
- **模擬引擎**: DigitalJS (v0.13.x)
- **繪圖核心**: JointJS (v3.7.7)
- **前端框架**: Vanilla JavaScript (ES Modules), jQuery, Lodash
- **自動佈局**: ELK (Eclipse Layout Kernel)

## 📂 目錄結構
- `/js`: 包含所有電路生成邏輯 (`generator.js`) 與主程式 (`main.js`)。
- `/vendor`: 存放所有必要的第三方函式庫。
- `index.html`: 應用程式進入點。
- `style.css`: 介面樣式定義。

## 📖 學習路徑
1. **基礎層**: 邏輯閘、加法器 (Half/Full Adder)。
2. **記憶層**: D-Latch, D-Flip-Flop, Registers。
3. **運算層**: ALU (算術邏輯單元), Multiplexer。
4. **控制層**: Decoder, Program Counter, ROM。
5. **整合層**: Step 13 - 完整 4-bit CPU 集成。

## 🛠 如何執行
本專案為純靜態網頁，不需安裝相依套件。
1. 使用任何靜態網頁伺服器（如 `live-server`, `python -m http.server`, `npx serve .`）開啟目錄。
2. 在瀏覽器中開啟 `index.html`。

---
*註：本專案曾從瀏覽器快取中救回，並由 Gemini CLI 協助重建樣式與修復電路邏輯。*
