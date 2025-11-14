# WebDiaries.Online

**A modern platform that automatically creates personalized blog pages for users on their own subdomain.**

## 🛠️ Technologies and Tools

### Backend

- **Node.js** - Runtime environment

- **Apollo GraphQL** - API server

- **MongoDB** - Database

- **Bind9 & [bind-rest-api](https://gitlab.com/jaytuck/bind-rest-api)** - DNS management

### Frontend

#### User Dashboard (Blog Management)

- **Vite** - Build tool and development server

- **React** - UI library

- **Tailwind CSS** - Styling framework

#### Blog Viewer (Published Blog Display)

- **Next.js** - Framework for server-side rendering and static generation

- **React** - UI library

- **Tailwind CSS** - Styling framework

### Infrastructure

- **Docker** - Containerization

- **Nginx** - Web server and reverse proxy

- **GitHub Actions** - CI/CD pipeline

## ✨ Key Features

- **Automatic Subdomain Creation:** When a new user registers, an A/AAAA DNS record is automatically created in the format username.webdiaries.online

- **Rich Content Editor:** Draft saving, tag management, and media support

- **Advanced Search:** Search functionality based on keywords, tags, and content

- **Responsive Design:** Optimized user experience across all devices

## ⚙️ Development Environment Setup

To run the project on your local machine:

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/dracorl/webdiaries.online.git
    cd webdiaries.online
    ```

2.  **Set Environment Variables:**

    Create a .env.development.local file using .env.dev.example as reference.

    ```bash
    cp .env.dev.example .env.development.local
    ```

3.  **Create Configuration Files for Development:**

    Run the script for Nginx configuration.

    ```bash
    bash dev-envsubst.sh
    ```

4.  **Start the Project with Docker:**

    ```bash
    docker compose --env-file .env.development.local -f 'dev.compose.yml' up -d --build
    ```

5.  **Setup Complete:**

    You can access the project at:
    http://webdiaries.test and
    http://test.webdiaries.test

## 🚀 Deploying the Project

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/dracorl/webdiaries.online.git
    cd webdiaries.online
    ```

2.  **Set Environment Variables:**

    Create a .env.production.local file using .env.prod.example as reference.

    ```bash
    cp .env.prod.example .env.production.local
    ```

3.  **Create Configuration Files for Production:**

    Run the script for Nginx and DNS configurations.

    ```bash
    bash prod-envsubst.sh
    ```

4.  **Start the Project with Docker:**
    ```bash
    docker compose --env-file .env.production.local -f 'prod.compose.yml' up -d --build
    ```

## Common Issues

- Port 53 or default DNS program may conflict. In this case, stop conflicting programs and start dnsmasq first:

  ```bash
  # Check current DNS services
  sudo netstat -tulpn | grep :53
  # Stop the service if needed
  sudo systemctl stop systemd-resolved
  docker compose --env-file .env.development.local -f 'dev.compose.yml' up -d --build "dnsmasq"
  ```

- If dnsmasq continues running after stopping the project:

  ```bash
  sudo pkill -9 dnsmasq
  ```

- Bind9 Permission Issues:

  ```bash
  chown -R 100:100 ./zones // directory access permission for bind9
  ```

## Project Structure

```bash
webdiaries.online/
├── user-dashboard/    # Blog management React application
├── frontend/          # React application for blog viewing
├── backend/           # Node.js GraphQL API
├── nginx/             # Reverse proxy configuration
├── dns/               # Bind9 configurations
├── dnsmasq.conf       # Dynamic DNS infrastructure for development
├── dev-envsubst.sh    # Configuration script for development
├── prod-envsubst.sh   # Configuration script for production
├── docker-compose.yml # Container definitions
└── .github/           # CI/CD workflows
```

## Useful Links

- [Live Demo](https://webdiaries.online/)
- [Sample Blog Page](https://test.webdiaries.online/)

## 🤝 Contributing

This project is currently not open to external contributions.

## 📜 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

# WebDiaries.Online

**Kullanıcılarına otomatik olarak kendi subdomain'inde kişiselleştirilmiş blog sayfası oluşturan modern bir platform.**

## 🛠️ Kullanılan Teknolojiler ve Araçlar

### Backend

- **Node.js** - Runtime ortamı

- **Apollo GraphQL** - API sunucusu

- **MongoDB** - Veritabanı

- **Bind9 & [bind-rest-api](https://gitlab.com/jaytuck/bind-rest-api)** - DNS yönetimi

### Frontend

#### Kullanıcı Paneli (Blog Yönetimi)

- **Vite** - Build tool ve development server

- **React** - UI kütüphanesi

- **Tailwind CSS** - Styling framework

#### Blog Görüntüleyici (Yayınlanmış Blog Gösterimi)

- **Next.js** - Statik sayfalar ve sunucu taraflı render için framework

- **React** - UI kütüphanesi

- **Tailwind CSS** - Styling framework

### Infrastructure

- **Docker** - Containerization

- **Nginx** - Web sunucusu ve reverse proxy

- **GitHub Actions** - CI/CD pipeline

## ✨ Öne Çıkan Özellikler

- **Otomatik Subdomain Oluşturma:** Yeni kullanıcı kaydıyla birlikte kullaniciadi.webdiaries.online formatında A/AAAA DNS kaydı otomatik tanımlanır

- **Zengin İçerik Editörü:** Taslak kaydetme, etiket ekleme ve medya desteği

- **Gelişmiş Arama:** Kelime, etiket ve içerik bazlı arama fonksiyonelliği

- **Responsive Tasarım:** Tüm cihazlarda optimize edilmiş kullanıcı deneyimi

## ⚙️ Geliştirme Ortamı Kurulumu

Projeyi yerel makinenizde çalıştırmak için:

1.  **Depoyu Klonlayın:**

    ```bash
    git clone https://github.com/dracorl/webdiaries.online.git
    cd webdiaries.online
    ```

2.  **Ortam Değişkenlerini Ayarlayın:**

    .env.dev.example referans alarak bir .env.development.local dosyası oluşturun.

    ```bash
    cp .env.dev.example .env.development.local
    ```

3.  **Geliştirme ortamı için yapılandırma dosyalarını oluşturun:**

    Nginx yapılandırma dosyası için scripti çalıştırın.

    ```bash
    bash dev-envsubst.sh
    ```

4.  **Projeyi Docker ile ayağa kaldırın:**

    ```bash
    docker compose --env-file .env.development.local -f 'dev.compose.yml' up -d --build
    ```

5.  **Kurulum bitti:**

    http://webdiaries.test ve
    http://test.webdiaries.test
    Adreslerinden projeye erişebilirsiniz.

## 🚀 Projeyi Deploy Etme

1.  **Depoyu Klonlayın:**

    ```bash
    git clone https://github.com/dracorl/webdiaries.online.git
    cd webdiaries.online
    ```

2.  **Ortam Değişkenlerini Ayarlayın:**

    .env.prod.example referans alarak bir .env.production.local dosyası oluşturun.

    ```bash
    cp .env.prod.example .env.production.local
    ```

3.  **Geliştirme ortamı için yapılandırma dosyalarını oluşturun:**

    Nginx ve DNS yapılandırma dosyaları için scripti çalıştırın.

    ```bash
    bash prod-envsubst.sh
    ```

4.  **Projeyi Docker ile ayağa kaldırın:**
    ```bash
    docker compose --env-file .env.production.local -f 'prod.compose.yml' up -d --build
    ```

## Sık Karşılaşılan Sorunlar

- Port 53 veya varsayılan dns programı çakışabilir o durumda çakışan programları kapatıp ilk olarak dnsmasq çalıştırılabilir:

  ```bash
  # Mevcut DNS servislerini kontrol edin
  sudo netstat -tulpn | grep :53
  # Gerekirse servisi durdurun
  sudo systemctl stop systemd-resolved
  docker compose --env-file .env.development.local -f 'dev.compose.yml' up -d --build "dnsmasq"
  ```

- Proje durdurulduktan sonra dnsmasq hala çalışmaya devam ederse:

  ```bash
  sudo pkill -9 dnsmasq
  ```

- Bind9 İzin Problemleri:

  ```bash
  chown -R 100:100 ./zones // bind9 için dizin erişim izni
  ```

## Proje Yapısı

```bash
webdiaries.online/
├── user-dashboard/    # Blog yönetimi React uygulaması
├── frontend/          # Blog görüntülenmesi için React uygulaması
├── backend/           # Node.js GraphQL API
├── nginx/             # Reverse proxy yapılandırması
├── dns/               # Bind9 konfigürasyonları
├── dnsmasq.conf       # Geliştirme ortamı için dinamik dns altyapısı
├── dev-envsubst.sh    # Geliştirme ortamı için yapılandırma scripti
├── prod-envsubst.sh   # Production ortamı için yapılandırma scripti
├── docker-compose.yml # Container tanımları
└── .github/           # CI/CD workflow'ları
```

## Faydalı Bağlantılar

- [Canlı Demo](https://webdiaries.online/)
- [Örnek Blog Sayfası](https://test.webdiaries.online/)

## 🤝 Katkıda Bulunma

Bu proje şu anda dış katkılara açık değildir.

## 📜 Lisans

Bu proje MIT lisansı ile lisanslanmıştır. Detaylar için LICENSE dosyasını inceleyebilirsiniz.
