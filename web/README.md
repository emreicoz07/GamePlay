# 🐍 Snake Game

Modern ve rekabetçi bir yaklaşımla yeniden tasarlanmış klasik yılan oyunu.

## 🎨 Tasarım Sistemi

### Renk Paleti

#### Ana Renkler
- Primary Blue: `#2A6B9B` (Ana marka rengi, butonlar)
- Secondary Teal: `#48B8A0` (Vurgular, başarı durumları, yılan gövdesi)
- Accent Orange: `#FF7F50` (Yemek öğeleri, özel vurgular)

#### Arka Plan Renkleri
- Light Mode: `#F5F7FA`
- Dark Mode: `#1A1D21`

#### Arayüz Elementleri
- Light Text: `#FFFFFF`
- Dark Text: `#1A1D21`
- Muted Text: `#6B7280`
- Border Light: `#E5E7EB`
- Border Dark: `#374151`

#### Oyun Elementleri
- Snake Head: `#48B8A0`
- Snake Body: `#5FCFB6`
- Regular Food: `#FF7F50`
- Special Food: `#FFD700`
- Grid Light: `#EDF2F7`
- Grid Dark: `#2D3748`

## 🎮 Özellikler

### Oyun Mekanikleri
- Duvarlardan geçebilen yılan
- Başlangıç geri sayım animasyonu
- Farklı zorluk seviyeleri
- Canlı skor gösterimi
- Duraklat/Devam Et özelliği
- Ülke bayrağı gösterimi

### Skor ve Rekabet
- Global skor tablosu
- Ülke bazlı sıralamalar
- Özel başarı rozetleri
- Anlık skor güncellemeleri

## 🚀 Başlangıç

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Uygulamayı başlatın:
```bash
npx expo start
```

## 📱 Desteklenen Platformlar

- iOS (Expo Go veya Simulator)
- Android (Expo Go veya Emulator)
- Web (Tarayıcı)

## 🛠 Teknik Özellikler

### Frontend
- React Native + Expo
- Gesture Controls
- Redux State Management
- JWT Authentication

### Backend
- Node.js + Express
- PostgreSQL Database
- RESTful API
- Secure Authentication

## 🔐 Güvenlik

- HTTPS Protokolü
- JWT Token Authentication
- Veri Şifreleme
- Rate Limiting

## 🌐 API Endpoints

```typescript
POST /api/players     // Oyuncu kaydı
POST /api/scores     // Skor kaydetme
GET  /api/leaderboard // Skor tablosu
GET  /api/countries   // Ülke skorları
```

## 🎯 Geliştirme Yol Haritası

- [ ] Çoklu dil desteği
- [ ] Özel temalar
- [ ] Çevrimiçi turnuvalar
- [ ] Arkadaş sistemi
- [ ] Başarı rozetleri

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun
3. Değişikliklerinizi commit edin
4. Branch'inizi push edin
5. Pull request açın

## 📄 Lisans

MIT License - daha fazla detay için [LICENSE.md](LICENSE.md) dosyasına bakın.
