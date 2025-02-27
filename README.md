# Laravel + React (Inertia.js ile) Proje Kurulumu

Bu rehber, Laravel ve React'i Inertia.js ile entegre ederek nasıl bir proje kurulacağını adım adım açıklar(Bir Inertia view return edilir). Tabiki Inertia.js kullanmadan sadece Laravel API kullanılarak gönderilen veriler React tarafında alınarak da kullanılabilir.

---

## 1️⃣ **Laravel Projesini Oluşturma**

### Laravel'i Kur

Terminalde aşağıdaki komutu çalıştırarak yeni bir Laravel projesi oluşturun:

```sh
laravel new my-app
```

Alternatif olarak, aşağıdaki komutla Laravel'i Composer ile de kurabilirsiniz:

```sh
composer create-project laravel/laravel my-app
```

Projenize girin:

```sh
cd my-app
```

### Laravel Starter Kit (Opsiyonel)

Eğer React ve Inertia.js’in önceden yapılandırılmış olmasını istiyorsanız, aşağıdaki komutu çalıştırabilirsiniz:

```sh
composer require laravel/breeze --dev
php artisan breeze:install react
npm install && npm run dev
```

Ancak, bu rehberde React ve Inertia.js’i elle kuracağız.

---

## 2️⃣ **Vite ve NPM Kurulumu**

**Blade Template dosyanızda** aşağıdaki kodu ekleyerek Vite’i etkinleştirin:

```blade
@vite(['resources/css/app.css', 'resources/js/app.js'])
```

Vite'in çalışması için npm paketlerini yükleyin:

```sh
npm install
npm run dev
```

Bunlar, Laravel'in frontend tarafını derlemek için gereklidir.

---

## 3️⃣ **React Kurulumu**

Şimdi React'ı yükleyelim:

```sh
npm install react react-dom
```

Ayrıca, Vite ile React’ı kullanabilmek için şu eklentiyi yükleyin:

```sh
npm install -D @vitejs/plugin-react
```

Şimdi **`vite.config.js`** dosyanızı açın ve aşağıdaki kodu ekleyin:

```js
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.jsx"],
            refresh: true,
        }),
        react(),
    ],
});
```

Bu adımlar, Laravel projenize React desteği ekler.

---

## 4️⃣ **Inertia.js Kurulumu**

Şimdi Laravel ve React arasında köprü görevi görecek olan Inertia.js’i yükleyelim.

### Backend (Laravel) İçin Kurulum:

```sh
composer require inertiajs/inertia-laravel
```

Şimdi Inertia için bir Middleware ekleyin:

```sh
php artisan inertia:middleware
```

Middleware’i **`bootstrap/app.php`** dosyanızda `web` middleware grubuna ekleyin:

```php
$middleware->web(append: [
    \App\Http\Middleware\HandleInertiaRequests::class,
]);
```

Laravel, Inertia’nın ana dosyasını **`app.blade.php`** olarak arar. Bu yüzden **`welcome.blade.php`** dosyanızın adını **`app.blade.php`** olarak değiştirin.

Ardından, **`routes/web.php`** içinde şu şekilde bir yönlendirme yapın:

```php
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia::render('Home');
});
```

Bu, Inertia ile **React bileşeni (Home.jsx)** yükleyecek şekilde ayarlanmıştır.

---

## 5️⃣ **Frontend (React) İçin Inertia.js Kurulumu**

Şimdi Inertia'nın React tarafını yükleyelim:

```sh
npm install @inertiajs/react
```

Ardından **`resources/js/app.jsx`** dosyanızı oluşturun ve aşağıdaki kodu ekleyin:

```jsx
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import "./bootstrap";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
```

Bu kod, Inertia.js’in React bileşenlerini bulup yüklemesini sağlar.

Ayrıca, **`app.blade.php`** içinde aşağıdaki kodları eklediğinizden emin olun:

```blade
@viteReactRefresh
@vite(['resources/css/app.css', 'resources/js/app.jsx'])
@inertiaHead
```

Bu kodlar, Vite’in **React Hot Module Reloading (HMR)** desteğini etkinleştirir.

---

## 6️⃣ **React Bileşeni Oluşturma**

Artık React bileşenleri oluşturabiliriz. **`resources/js/Pages/Home.jsx`** dosyanızı oluşturun ve aşağıdaki kodları ekleyin:

```jsx
export default function Home() {
    return (
        <div>
            <h1>Merhaba, Inertia.js Çalışıyor!</h1>
        </div>
    );
}
```

---

## 7️⃣ **Projenin Çalıştırılması**

Şimdi Laravel ve Vite’i başlatalım:

Laravel’i çalıştırın:

```sh
php artisan serve
```

Vite’i çalıştırın:

```sh
npm run dev
```

Tarayıcınızda `http://127.0.0.1:8000/` adresini açarak projenizin çalıştığını görebilirsiniz! 🚀

---

## 🎯 **Sonuç**

Bu rehberde, Laravel ve React’i Inertia.js kullanarak nasıl entegre edeceğimizi adım adım öğrendik. Artık React bileşenlerinizi Laravel içinde kullanabilir ve modern bir frontend/backend entegrasyonu sağlayabilirsiniz! 🚀
