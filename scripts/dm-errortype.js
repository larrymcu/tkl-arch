/**
 * 回傳錯誤碼意義
 * @param {any} error
 */
function GetErrorCode(error) {
    switch (error.toLowerCase()) {
        case "err110":
            return "系統忙碌中，請稍後再試一次";
        case "err120":
            return "參數錯誤";
        case "err130":
            return "網址有誤";
        case "err140":
            return "過久未有動作，系統基於保護已自動登出<br>請重新登入再試一次";
        case "err150":
            return "您並未授權執行此項作業";
        case "err200":
            return "歡迎登入曾國立建築師事務所後台系統";
        case "err210":
            return "請先登入";
        case "err220":
            return "目前未開放註冊";
        case "err230":
            return "無法登入";
        case "err240":
            return "帳號新增成功！請重新登入";
        case "err260":
            return "您的帳號已關閉";
        case "err270":
            return "您的帳號在別的裝置登入<br>基於安全性考量，系統已將您登出";

        case "err310":
            return "查無請求的資料";
        case "err320":
            return "尚有資料未填寫";
        case "err330":
            return "資料已存在";
        case "err340":
            return "資料新增成功";
        case "err350":
            return "資料刪除成功";
        case "err360":
            return "資料修改成功";
        case "err370":
            return "資料排序成功";
        case "err400":
            return "圖檔數量超過上限";
        case "err410":
            return "您的最愛清單已超過50筆<br>請刪除部分後再繼續";
        case "err420":
            return "您並非案件所有人";
        default:
            return error;//"Client端尚未建置錯誤碼";
    }
}