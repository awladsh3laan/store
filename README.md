# ============================================
# ملف .gitignore لمشروع متجر أولاد شعلان
# ============================================

# -------------------------------
# ملفات نظام التشغيل
# -------------------------------
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
*.swp
*.swo
*~
 desktop.ini
$RECYCLE.BIN/

# -------------------------------
# ملفات تحرير النصوص (مؤقتة)
# -------------------------------
*.tmp
*.temp
*.log
*.bak
*.cache
*.~

# -------------------------------
# ملفات Firebase المحلية (للتجربة فقط - لا ترفعها)
# -------------------------------
.firebaserc
firebase-debug.log
.firebase/
firebase.json
.database.rules.json
.firebaserc.local
firestore.indexes.json
firestore.rules

# -------------------------------
# ملفات ImgBB API (لا ترفعها أبداً)
# -------------------------------
# ملاحظة: الـ API Key المستخدم في الأكواد موجود داخل HTML
# هذا الملف فقط للحماية عند استخدام متغيرات البيئة مستقبلاً
.env
.env.local
.env.production
.env.development

# -------------------------------
# ملفات Node.js (للمستقبل)
# -------------------------------
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
package-lock.json
yarn.lock
package.json

# -------------------------------
# ملفات IDE وأدوات التطوير
# -------------------------------
.vscode/
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
.vs/
.cursor/
.cursorrules

# -------------------------------
# ملفات GitHub (تجنب التكرار)
# -------------------------------
.git/
.gitignore
.gitattributes
.github/

# -------------------------------
# ملفات النشر والبناء
# -------------------------------
dist/
build/
out/
*.zip
*.rar
*.7z

# -------------------------------
# ملفات سرية أو شخصية
# -------------------------------
*.pem
*.key
*.crt
*.p12
secrets.json
credentials.json
serviceAccount.json

# -------------------------------
# ملفات النسخ الاحتياطي
# -------------------------------
*.backup
*.old
*.orig
backup/
backups/

# -------------------------------
# ملفات اختبارات
# -------------------------------
test/
tests/
*.test.js
*.spec.js
coverage/
.nyc_output/

# -------------------------------
# ملفات مؤقتة من المتصفحات
# -------------------------------
*.sublime-*
*.sass-cache
*.scssc
*.compiled.css

# -------------------------------
# ملفات خاصة بـ Firebase Functions (للمستقبل)
# -------------------------------
functions/node_modules/
functions/.runtimeconfig.json
functions/package-lock.json
functions/yarn.lock

# -------------------------------
# التقارير والملفات الكبيرة
# -------------------------------
*.pdf
*.xlsx
*.csv
reports/
*.mp4
*.mp3
*.zip

# -------------------------------
# استثناء الملفات المهمة (لا يتم استثناؤها)
# -------------------------------
# نعكس الاستثناء - هذه الملفات مهمة ويجب رفعها
!README.md
!.gitignore
!index.html
!checkout.html
!track-order.html
!price-list.html
!admin-login.html
!admin-dashboard.html
!admin-products.html
!admin-slider.html
!admin-shipping.html
!admin-orders.html
