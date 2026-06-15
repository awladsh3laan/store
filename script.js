// ========================================
// script.js - الملف الرئيسي لكل الصفحات
// Firebase + الدوال المشتركة
// ========================================

// ---------- Firebase Configuration ----------
const firebaseConfig = {
    apiKey: "AIzaSyD5tuzZf8VTqT2J8MSZ5zLnzbqRsT_lipA",
    authDomain: "awlad-sh3lan-store.firebaseapp.com",
    projectId: "awlad-sh3lan-store",
    storageBucket: "awlad-sh3lan-store.firebasestorage.app",
    messagingSenderId: "77191704198",
    appId: "1:77191704198:web:d2ce184d9c8ec2e876eb07"
};

// ---------- Initialize Firebase ----------
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// ---------- متغيرات عامة ----------
let currentUser = null;
let cart = [];

// ---------- دوال السلة (localStorage) ----------
function loadCart() {
    const savedCart = localStorage.getItem('ecommerce_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    } else {
        cart = [];
    }
    updateCartCount();
    return cart;
}

function saveCart() {
    localStorage.setItem('ecommerce_cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    saveCart();
    showAlert('تم إضافة المنتج إلى السلة', 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    showAlert('تم إزالة المنتج من السلة', 'success');
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => {
        el.textContent = count;
    });
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// ---------- دوال التنبيهات ----------
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.minWidth = '250px';
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle';
    alertDiv.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.opacity = '0';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

// ---------- دوال التحقق من الأدمن ----------
async function checkAdmin() {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(async (user) => {
            if (!user) {
                window.location.href = 'admin-login.html';
                reject(false);
                return;
            }
            
            try {
                const adminDoc = await db.collection('admins').doc(user.uid).get();
                if (adminDoc.exists) {
                    currentUser = user;
                    resolve(true);
                } else {
                    await auth.signOut();
                    window.location.href = 'admin-login.html';
                    reject(false);
                }
            } catch (error) {
                console.error('خطأ في التحقق من الأدمن:', error);
                reject(false);
            }
        });
    });
}

// ---------- دوال المنتجات ----------
async function getProducts() {
    try {
        const snapshot = await db.collection('products').orderBy('createdAt', 'desc').get();
        const products = [];
        snapshot.forEach(doc => {
            products.push({ id: doc.id, ...doc.data() });
        });
        return products;
    } catch (error) {
        console.error('خطأ في جلب المنتجات:', error);
        return [];
    }
}

async function addProduct(productData) {
    try {
        productData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        const docRef = await db.collection('products').add(productData);
        showAlert('تم إضافة المنتج بنجاح', 'success');
        return docRef.id;
    } catch (error) {
        console.error('خطأ في إضافة المنتج:', error);
        showAlert('حدث خطأ في إضافة المنتج', 'error');
        return null;
    }
}

async function updateProduct(productId, productData) {
    try {
        await db.collection('products').doc(productId).update(productData);
        showAlert('تم تحديث المنتج بنجاح', 'success');
        return true;
    } catch (error) {
        console.error('خطأ في تحديث المنتج:', error);
        showAlert('حدث خطأ في تحديث المنتج', 'error');
        return false;
    }
}

async function deleteProduct(productId) {
    try {
        await db.collection('products').doc(productId).delete();
        showAlert('تم حذف المنتج بنجاح', 'success');
        return true;
    } catch (error) {
        console.error('خطأ في حذف المنتج:', error);
        showAlert('حدث خطأ في حذف المنتج', 'error');
        return false;
    }
}

// ---------- دوال السلايدر ----------
async function getSliders() {
    try {
        const snapshot = await db.collection('sliders').orderBy('order', 'asc').get();
        const sliders = [];
        snapshot.forEach(doc => {
            sliders.push({ id: doc.id, ...doc.data() });
        });
        return sliders;
    } catch (error) {
        console.error('خطأ في جلب السلايدر:', error);
        return [];
    }
}

async function addSlider(sliderData) {
    try {
        const sliders = await getSliders();
        sliderData.order = sliders.length;
        const docRef = await db.collection('sliders').add(sliderData);
        showAlert('تم إضافة السلايد بنجاح', 'success');
        return docRef.id;
    } catch (error) {
        console.error('خطأ في إضافة السلايدر:', error);
        showAlert('حدث خطأ في إضافة السلايدر', 'error');
        return null;
    }
}

async function deleteSlider(sliderId) {
    try {
        await db.collection('sliders').doc(sliderId).delete();
        showAlert('تم حذف السلايد بنجاح', 'success');
        return true;
    } catch (error) {
        console.error('خطأ في حذف السلايدر:', error);
        showAlert('حدث خطأ في حذف السلايدر', 'error');
        return false;
    }
}

// ---------- دوال الطلبات ----------
async function createOrder(orderData) {
    try {
        orderData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        orderData.status = 'pending';
        const docRef = await db.collection('orders').add(orderData);
        
        // تفريغ السلة بعد إنشاء الطلب
        cart = [];
        saveCart();
        
        showAlert('تم إنشاء الطلب بنجاح! رقم الطلب: ' + docRef.id, 'success');
        return docRef.id;
    } catch (error) {
        console.error('خطأ في إنشاء الطلب:', error);
        showAlert('حدث خطأ في إنشاء الطلب', 'error');
        return null;
    }
}

async function getOrders(filters = {}) {
    try {
        let query = db.collection('orders').orderBy('createdAt', 'desc');
        
        if (filters.phone) {
            query = query.where('phone', '==', filters.phone);
        }
        if (filters.status) {
            query = query.where('status', '==', filters.status);
        }
        
        const snapshot = await query.get();
        const orders = [];
        snapshot.forEach(doc => {
            orders.push({ id: doc.id, ...doc.data() });
        });
        return orders;
    } catch (error) {
        console.error('خطأ في جلب الطلبات:', error);
        return [];
    }
}

async function updateOrderStatus(orderId, status) {
    try {
        await db.collection('orders').doc(orderId).update({ status });
        showAlert('تم تحديث حالة الطلب بنجاح', 'success');
        return true;
    } catch (error) {
        console.error('خطأ في تحديث حالة الطلب:', error);
        showAlert('حدث خطأ في تحديث حالة الطلب', 'error');
        return false;
    }
}

// ---------- دوال رقم الشحن ----------
async function getShippingNumber() {
    try {
        const doc = await db.collection('settings').doc('shipping').get();
        if (doc.exists) {
            return doc.data().phoneNumber || '';
        }
        return '';
    } catch (error) {
        console.error('خطأ في جلب رقم الشحن:', error);
        return '';
    }
}

async function updateShippingNumber(phoneNumber) {
    try {
        await db.collection('settings').doc('shipping').set({ phoneNumber });
        showAlert('تم تحديث رقم الشحن بنجاح', 'success');
        return true;
    } catch (error) {
        console.error('خطأ في تحديث رقم الشحن:', error);
        showAlert('حدث خطأ في تحديث رقم الشحن', 'error');
        return false;
    }
}

// ---------- دوال رفع الصور (ImgBB) ----------
const IMGBB_API_KEY = 'fbed47dcedc81b61a1aa27a7087d62fc';

async function uploadImageToImgBB(file) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', IMGBB_API_KEY);
    
    try {
        const response = await fetch('https://api.imgbb.com/1/upload', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        if (data.success) {
            return data.data.url;
        } else {
            throw new Error('فشل رفع الصورة');
        }
    } catch (error) {
        console.error('خطأ في رفع الصورة:', error);
        showAlert('حدث خطأ في رفع الصورة', 'error');
        return null;
    }
}

// ---------- دوال التحقق من صحة البيانات ----------
function validatePhone(phone) {
    const phoneRegex = /^01[0-9]{9}$/;
    return phoneRegex.test(phone);
}

function validateName(name) {
    return name.trim().length >= 3;
}

function validateAddress(address) {
    return address.trim().length >= 10;
}

// ---------- تهيئة الصفحة ----------
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    
    // إضافة مستمع لأزرار السلة في الصفحة
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const product = JSON.parse(btn.dataset.product);
            addToCart(product);
        });
    });
});
