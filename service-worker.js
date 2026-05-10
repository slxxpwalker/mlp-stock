// ==========================================
// 🔔 MLP Service Worker
// ทำงานเบื้องหลัง รับ push event แม้ปิดเว็บแล้ว
// ==========================================

const CACHE_VERSION = "mlp-v1";

// ตอนติดตั้ง Service Worker ครั้งแรก
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker');
  // Activate ทันที ไม่ต้องรอเว็บเปิดใหม่
  self.skipWaiting();
});

// ตอน activate
self.addEventListener('activate', (event) => {
  console.log('[SW] Service Worker Activated');
  // ควบคุมทุกหน้าที่เปิดอยู่ทันที
  event.waitUntil(self.clients.claim());
});

// ==========================================
// 🔔 รับ Push Event (สำคัญที่สุด!)
// ==========================================
self.addEventListener('push', (event) => {
  console.log('[SW] Push received');
  
  let data = {
    title: '🔔 MLP สต็อกฟาร์ม',
    body: 'มีการแจ้งเตือนใหม่',
    url: '/'
  };
  
  // อ่านข้อมูลจาก push payload
  try {
    if (event.data) {
      data = { ...data, ...event.data.json() };
    }
  } catch (e) {
    // ถ้า parse JSON ไม่ได้ ใช้เป็น text แทน
    if (event.data) data.body = event.data.text();
  }
  
  const options = {
    body: data.body,
    icon: 'icons/icon-192.png',
    badge: 'icons/icon-192.png',
    vibrate: [200, 100, 200],
    tag: 'mlp-notification',  // ถ้า tag ซ้ำ → แทนที่อันเก่า ไม่กองสะสม
    renotify: true,            // เด้งซ้ำได้แม้ tag เดิม
    requireInteraction: false, // ปิดอัตโนมัติได้
    data: {
      url: data.url || '/',
      timestamp: data.timestamp || Date.now()
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// ==========================================
// 👆 ตอนผู้ใช้แตะที่ notification
// ==========================================
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked');
  event.notification.close();
  
  // URL ที่จะเปิด (default = หน้าประวัติ)
  const targetPath = event.notification.data?.url || '?view=history';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // ถ้ามีเว็บ MLP เปิดอยู่แล้ว → focus + navigate ไปหน้าประวัติ
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          // ส่ง message ไปบอก client ให้เปลี่ยนหน้า
          client.postMessage({ type: 'navigate', view: 'history' });
          return client.focus();
        }
      }
      // ถ้าไม่มี → เปิดใหม่พร้อม query string
      if (clients.openWindow) {
        const fullUrl = self.location.origin + self.registration.scope.replace(self.location.origin, '') + targetPath;
        return clients.openWindow(fullUrl);
      }
    })
  );
});

// ==========================================
// 🔄 ตอน subscription หมดอายุ
// ==========================================
self.addEventListener('pushsubscriptionchange', (event) => {
  console.log('[SW] Push subscription changed');
  // (Optional) — แจ้ง server ว่า subscription เปลี่ยน
  // ตอนนี้ปล่อยให้ user เปิดเว็บแล้ว subscribe ใหม่เอง
});