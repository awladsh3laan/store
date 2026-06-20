// ============================================
// config.js - إعدادات Firebase المحمية
// ============================================

// ===== إعدادات Firebase الأساسية =====
// هذه الإعدادات عامة وآمنة للنشر
const firebaseConfig = {
    apiKey: "AIzaSyD5tuzZf8VTqT2J8MSZ5zLnzbqRsT_lipA",
    authDomain: "awlad-sh3lan-store.firebaseapp.com",
    projectId: "awlad-sh3lan-store",
    storageBucket: "awlad-sh3lan-store.firebasestorage.app",
    messagingSenderId: "77191704198",
    appId: "1:77191704198:web:d2ce184d9c8ec2e876eb07"
};

// ===== تهيئة Firebase =====
firebase.initializeApp(firebaseConfig);

// ===== التصدير للاستخدام في الصفحات =====
const db = firebase.firestore();
const auth = firebase.auth();

// ===== وظيفة آمنة لرفع الصور عبر Firebase Functions =====
// هذا الكود يستدعي Firebase Function كوسيط لحماية ImgBB API Key
async function uploadImageToImgBB(file) {
    try {
        // تحويل الملف إلى Base64
        const reader = new FileReader();
        const base64 = await new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

        // استدعاء Firebase Function (الوسيط الآمن)
        const uploadFunction = firebase.functions().httpsCallable('uploadToImgBB');
        const result = await uploadFunction({ image: base64 });

        if (result.data.success) {
            return result.data.url;
        } else {
            throw new Error(result.data.error || 'فشل رفع الصورة');
        }
    } catch (error) {
        console.error('خطأ في رفع الصورة:', error);
        throw error;
    }
}

// ===== تصدير الوظائف للاستخدام العالمي =====
window.db = db;
window.auth = auth;
window.uploadImageToImgBB = uploadImageToImgBB;

console.log('✅ تم تحميل إعدادات Firebase بشكل آمن');