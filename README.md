# tutor-questionnaire-view

## 使用情況調查（2026-11-09）

> 本節為 hanlin-edu-tech repo 清理作業的調查紀錄，待負責人確認後決定封存或刪除。

- 調查結論：仍在使用
- 建議處置：保留，理由：正式站 `/app/survey/` 與 `/app/questionnaire/` 仍提供本 repo 產出的頁面，且正式環境運行中的 tutor-coach-api 會產生 `/app/survey/index.html?id=...` 問卷連結。
- 最後更新：pushedAt 2026-07-09；最後 commit `2b0d96e` 2023-09-18 tzhau 配合E家教問卷插入隨機碼 顯示表格內容邏輯調整 (#56)（pushedAt 來自 `fix/html-lang-zh-tw` 分支，PR #57 未合併）
- 用途：問卷前台（`front-stage/`，原生 JS，學生填寫問卷，對外路徑 `/app/survey/`）與問卷後台（`back-stage/`，pug 產生，建立樣板、問卷列表、報表，對外路徑 `/app/questionnaire/`）靜態頁，以 gulp（`uploadGcsTest`、`uploadGcsProd`）上傳到 GCS 靜態網站，頁面呼叫同網域 `/questionnaire/` API（由 tutor-questionnaire 提供）。

### 檢查結果

| 檢查項目 | 結果 | 依據 |
|---|---|---|
| GitHub 活動 | 預設分支 2023-09-18 後無 commit；有 1 個未合併 PR | 預設分支 22 個 commit（2019-11-06～2023-09-18，tzhau 11、Zhi1211 10、林芷瑄 1）；分支 21 個：`main`、`ch1964`（2021-09-14）、`google`（2021-07-21）、`fix/html-lang-zh-tw`（2026-07-09 kao-hh）、17 個 dependabot 分支（2021-03～2022-12）；tag 16 個（最新 v1.0.15）、release 0；PR 57（open 17：#57 與 16 個 dependabot PR；其餘 40 個 merged 或 closed）、issue 0；Actions workflow 0（`.github/workflows/deploy-to-production.yml`、`deploy-to-test.yml` 已於 2021-01-18 commit `9976eaa` 刪除）；webhook 0；非 fork |
| org 內程式碼引用 | 正式環境服務產生問卷連結 | `tutor-questionnaire-view` 0 筆；`app/survey` 命中 tutor-coach-api（問卷連結轉址、解析與進度檢查程式，pushedAt 2026-11-09，正式環境有運行中部署）、tutor-coach-data-helper（報表程式，pushedAt 2026-10-02）、ted-works（測試腳本）。已查核，細節記錄於內部調查報告 |
| GCP 部署 | 正式站與測試站頁面提供中 | 正式站 `https://www.ehanlin.com.tw/app/survey/index.html` 回 200（`<title>問卷</title>`，內容與 `front-stage/index.html` 完全相同），`/app/questionnaire/index.html`、`/app/questionnaire/list.html` 回 200（後台登入頁、樣板列表頁）；測試站兩個路徑亦回 200。GCS 正式環境前台檔案上傳於 2021-06-22、後台檔案上傳於 2023-09-21，測試環境於 2024-04-15。Cloud Build trigger（global 與 7 個區域清單）以 `tutor-questionnaire-view` 搜尋 0 筆。已查核，細節記錄於內部調查報告 |
| AWS 部署 | 查無 | 4 個 AWS 帳號的 Lambda、API Gateway（REST 與 HTTP／WebSocket API）、CloudFront、ECR、ECS、EventBridge、SQS、S3 清單以 `questionnaire`、`survey` 搜尋 0 筆；盤點檔無 AccessDenied |

### 待確認事項
- 已發現須立即處理的部署問題，已查核，細節記錄於內部調查報告，須由 tzhau 或問卷功能負責人處理。
- 16 個 dependabot PR（2021-03～2022-12）與 PR #57 未處理；分支 `ch1964`、`google` 各領先 main 1 個 commit。
