# Telegram 群組影片總覽（Prototype）

這是一個可在**手機與桌機自適配**的前端雛形，展示以下功能：

- 多帳號切換
- 群組影片由新到舊排序
- 影片預覽縮圖
- 影片大小篩選
- 關鍵字搜尋（群組名 / 檔名）

## 快速啟動

直接用瀏覽器打開 `index.html`。

## 真實串接 Telegram 建議

由於 Telegram 登入與資料抓取涉及 API 金鑰與授權流程，正式版建議：

1. **前端（Web）**
   - React / Next.js
   - 顯示影片清單、搜尋、篩選與預覽
2. **後端 API**
   - Node.js + `gramjs` 或 Python + `Telethon`
   - 管理多帳號 session（加密儲存）
   - 提供 `/videos?accountId=...` 查詢
3. **快取與索引**
   - PostgreSQL + Redis
   - 背景同步群組媒體 metadata（建立倒序索引）

## 後續可擴充

- 加上「只看特定群組」篩選
- 無限捲動與分頁
- 影片下載與串流代理
- 權限控管與 2FA 支援
