# tutor-questionnaire-view

## 使用情況調查（2026-11-09）

> 本節為 hanlin-edu-tech repo 清理作業的調查紀錄，待負責人確認後決定封存或刪除。

- 調查結論：仍在使用（2026-11-11 以 DB 與 ingress 存取紀錄複查：後台報表頁有實際使用；前台填寫功能自 2023-01-11 後無資料寫入）
- 建議處置：保留，理由：2026-11-11 有使用者以後台報表頁 `/app/questionnaire/report.html` 查詢 E家教問卷的最新報名資料；正式環境運行中的 tutor-coach-api 仍持續產生 `/app/survey/index.html?id=...&view=true` 問卷檢視連結。
- 最後更新：pushedAt 2026-07-09；最後 commit `2b0d96e` 2023-09-18 tzhau 配合E家教問卷插入隨機碼 顯示表格內容邏輯調整 (#56)（pushedAt 來自 `fix/html-lang-zh-tw` 分支，PR #57 未合併）
- 用途：問卷前台（`front-stage/`，原生 JS，學生填寫問卷，對外路徑 `/app/survey/`）與問卷後台（`back-stage/`，pug 產生，建立樣板、問卷列表、報表，對外路徑 `/app/questionnaire/`）靜態頁，以 gulp（`uploadGcsTest`、`uploadGcsProd`）上傳到 GCS 靜態網站，頁面呼叫同網域 `/questionnaire/` API（由 tutor-questionnaire 提供）。

### 檢查結果

| 檢查項目 | 結果 | 依據 |
|---|---|---|
| GitHub 活動 | 預設分支 2023-09-18 後無 commit；有 1 個未合併 PR | 預設分支 22 個 commit（2019-11-06～2023-09-18，tzhau 11、Zhi1211 10、林芷瑄 1）；分支 21 個：`main`、`ch1964`（2021-09-14）、`google`（2021-07-21）、`fix/html-lang-zh-tw`（2026-07-09 kao-hh）、17 個 dependabot 分支（2021-03～2022-12）；tag 16 個（最新 v1.0.15）、release 0；PR 57（open 17：#57 與 16 個 dependabot PR；其餘 40 個 merged 或 closed）、issue 0；Actions workflow 0（`.github/workflows/deploy-to-production.yml`、`deploy-to-test.yml` 已於 2021-01-18 commit `9976eaa` 刪除）；webhook 0；非 fork |
| org 內程式碼引用 | 正式環境服務產生問卷連結 | `tutor-questionnaire-view` 0 筆；`app/survey` 命中 tutor-coach-api（問卷連結轉址、解析與進度檢查程式，pushedAt 2026-11-09，正式環境有運行中部署）、tutor-coach-data-helper（報表程式，pushedAt 2026-10-02）、ted-works（測試腳本）。已查核，細節記錄於內部調查報告 |
| GCP 部署 | 正式站與測試站頁面提供中 | 正式站 `https://www.ehanlin.com.tw/app/survey/index.html` 回 200（`<title>問卷</title>`，內容與 `front-stage/index.html` 完全相同），`/app/questionnaire/index.html`、`/app/questionnaire/list.html` 回 200（後台登入頁、樣板列表頁）；測試站兩個路徑亦回 200。GCS 正式環境前台檔案上傳於 2021-06-22、後台檔案上傳於 2023-09-21，測試環境於 2024-04-15。Cloud Build trigger（global 與 7 個區域清單）以 `tutor-questionnaire-view` 搜尋 0 筆。已查核，細節記錄於內部調查報告 |
| AWS 部署 | 查無 | 4 個 AWS 帳號的 Lambda、API Gateway（REST 與 HTTP／WebSocket API）、CloudFront、ECR、ECS、EventBridge、SQS、S3 清單以 `questionnaire`、`survey` 搜尋 0 筆；盤點檔無 AccessDenied |

### 實際使用複查（2026-11-11，DB 與 ingress 存取紀錄）

| 檢查項目 | 結果 | 依據 |
|---|---|---|
| 存取紀錄可用範圍 | 只有約 35 分鐘，無法統計長期流量 | 正式機 GKE `high-mem2208` 的 ingress-nginx controller 在節點上保留 5 個輪替檔，涵蓋 2026-11-11 06:29:06Z～07:04:28Z（95,129 行）；Cloud Logging `_Default` sink 排除 `severity<=INFO`，ingress 存取紀錄未保留；HTTP Load Balancer log 近 1 天無 status 200 紀錄。`/app/survey/`、`/app/questionnaire/` 的 HTML 由 Load Balancer 直接從 GCS 提供，不經 ingress-nginx，ingress 只記錄頁面發出的 `/questionnaire/` API 請求 |
| 後台報表頁 `/app/questionnaire/report.html` | 有實際使用 | 2026-11-11 06:48:55Z 一位使用者（Windows Chrome 155）從 `report.html?id=<E家教問卷範本>` 呼叫報表 API，回 200、86,582 bytes。報表頁程式有處理新格式題目（`qContent`），可顯示 E家教問卷的報名資料（學生姓名、聯絡手機、年級、學校、想試聽科目等），預設區間為最近 7 天，可匯出 `.xls`；依 DB 計算，該次預設區間（台灣時間 2026-11-04～2026-11-11）有 28 筆，最新一筆填寫於查詢前 11 分鐘 |
| 前台問卷頁 `/app/survey/` 填寫功能 | 2023-01-11 後無資料寫入 | 前台送出時呼叫 v1 `POST /questionnaire/questionnaire/create`，寫入舊格式（題目無 `qid`）。正式機 MongoDB `questionnaire.UserQuestionnaire` 共 31,315 筆，舊格式 23,810 筆，最後一筆 2023-01-11；其後的資料全為新格式（`qid`／`qContent`），由 event-ecoach 報名頁經 `create/v2` 寫入，2025-11～2026-10 每月 73～192 筆。存取紀錄時間窗內無其他使用者開啟前台問卷頁（唯一一筆為調查人員本人） |
| 前台問卷頁 `/app/survey/` 檢視功能 | 連結持續產生，但頁面不顯示答案；點擊次數無法統計 | 正式機 MongoDB `tutor-coach.Inquire` 有 7,502 筆名單帶 `/app/survey/index.html?id=...&view=true` 連結（tutor-coach-api QuestionnaireInspector 寫入），最後更新 2026-11-11 06:39:10Z，2026-06～2026-10 每月新增 76～171 筆。`front-stage/js/main.js` 的 `composeForm` 依題目第一層 `type` 產生欄位，新格式題型在 `qContent[].type`，第一層無 `type`（DB 0 筆），實測開啟新格式問卷的檢視連結只顯示標題、答案區 0 個欄位。線上 `main.js`、`questionnaire.js` 與 repo 內容完全相同 |
| 後台建立範本功能 | 2021-06-23 後未使用 | `questionnaire.Template` 共 16 筆，最新一筆建立於 2021-06-23 |

### 待確認事項
- 已發現須立即處理的部署問題，已查核，細節記錄於內部調查報告，須由 tzhau 或問卷功能負責人處理。
- 2026-11-11 複查另發現須立即處理的資料存取問題，已查核，細節記錄於內部調查報告，須由 tutor-questionnaire 負責人處理。
- 後台報表頁是 E家教報名名單的查詢與匯出工具，下架或刪除正式站 `/app/questionnaire/` 前，須確認使用者身分與替代管道。
- 前台檢視頁無法顯示新格式問卷的答案，tutor-coach-api 寫入 E家教名單的 `questionnaireUrl` 連結實際無法查看答案，須由問卷功能負責人決定修正或改用其他頁面。
- 16 個 dependabot PR（2021-03～2022-12）與 PR #57 未處理；分支 `ch1964`、`google` 各領先 main 1 個 commit。
