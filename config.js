// ==========================================
// ⚠️ ไฟล์ตั้งค่าระบบฟาร์ม MLP (Config File) ⚠️
// ==========================================

const APP_CONFIG = {
    // 1. นำ Web App URL จาก Google Apps Script มาใส่ตรงนี้
    GOOGLE_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbzWEP_jYYg1uvs2slOmVTBmGOQ6FTULZqGt8YxgH6Ru3bIYMWXjTfCIO6_ga2PtFmFw/exec", 
    
    // 2. ข้อมูลผู้ใช้งานระบบ
    SYSTEM_USERS: [
        { username: "admin", password: "4321", role: "Admin", name: "พี่เม่น" },
        { username: "user1", password: "1234", role: "User", name: "หมอต้อม" },
        { username: "user2", password: "1234", role: "User", name: "หมอโม" },
        { username: "user3", password: "1234", role: "User", name: "หมอม่อน" },
        { username: "user4", password: "1234", role: "User", name: "หมอเกด" },
        { username: "user5", password: "1234", role: "User", name: "หมอนุ่น" },
        { username: "user6", password: "1234", role: "User", name: "หมอน้ำใส" },
        { username: "user7", password: "1234", role: "User", name: "ช่างเล็ก" }
    ]
};