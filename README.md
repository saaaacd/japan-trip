# Japan Trip Dashboard

這是一個專為個人日本旅遊設計的 PWA（漸進式網路應用程式）儀表板。

## 1. 如何安裝
請先確保您的電腦有安裝 Node.js (建議 v18 以上)。
在專案目錄下執行：
```bash
npm install
```

## 2. 如何啟動
安裝完成後，執行以下指令啟動開發伺服器：
```bash
npm run dev
```
接著在瀏覽器打開 [http://localhost:3000](http://localhost:3000) 即可查看網站。

## 3. 如何修改行程資料
行程資料存放在 `src/data/trip.json`。
您可以直接編輯該 JSON 檔案，修改每日的行程項目（包含標題、時間、地點、備註等）。

## 4. 如何修改住宿資料
住宿資料存放在 `src/data/hotels.json`。
包含飯店名稱、Check-in/Check-out 日期、地圖連結等。請直接編輯該 JSON。

## 5. 如何修改票券狀態
票券資料存放在 `src/data/tickets.json`。
此外，網頁上所有卡片的狀態（例如：「未開始」、「已完成」等）在您切換時，都會自動存入瀏覽器的 `localStorage` 中。
若要重置狀態，可以清除瀏覽器的網站資料 (清除 localStorage)。

## 6. 如何部署到 Vercel
1. 將專案推送到 GitHub。
2. 在 [Vercel](https://vercel.com/) 點選 "Add New Project"。
3. 匯入您的 GitHub 專案。
4. Vercel 會自動偵測 Next.js 專案並預設好 Build 設定。
5. 點擊 "Deploy" 即可完成部署。

## 7. 如何加到手機主畫面
這個網站已經支援 PWA：
- **iOS (Safari)**：使用 Safari 打開網站後，點選底部的「分享」按鈕，然後選擇「加入主畫面」。
- **Android (Chrome)**：使用 Chrome 打開網站後，通常會自動跳出「新增至主畫面」的提示，或是點選右上角選單，選擇「加到主畫面」。
