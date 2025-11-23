# Laravel Integration Guide

## Интеграция React приложения с Laravel

### 1. Установка в Laravel проект

#### Шаг 1: Копирование файлов
```bash
# Скопируйте содержимое папки dist после сборки в public директорию Laravel
npm run build
cp -r dist/* ../laravel-project/public/solar-app/
```

#### Шаг 2: Настройка роутинга Laravel
Добавьте в `routes/web.php`:
```php
Route::get('/solar-app/{any}', function () {
    return view('solar-app');
})->where('any', '.*');
```

#### Шаг 3: Создание blade шаблона
Создайте `resources/views/solar-app.blade.php`:
```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Солнечная радиация Беларуси</title>
    @vite(['resources/js/app.js', 'public/solar-app/assets/index.css'])
</head>
<body>
    <div id="root"></div>
    <script type="module" src="{{ asset('solar-app/assets/index.js') }}"></script>
</body>
</html>
```

### 2. API Endpoints для Laravel

Создайте контроллер для работы с данными солнечной радиации:

```bash
php artisan make:controller Api/SolarDataController
```

#### Пример контроллера `app/Http/Controllers/Api/SolarDataController.php`:
```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SolarDataController extends Controller
{
    public function getRegions()
    {
        // Получение данных о регионах из БД
        $regions = [
            [
                'id' => 'minsk',
                'name' => 'Минская область',
                'centerLat' => 53.9,
                'centerLon' => 27.56,
                'area' => 39900,
                'solarRadiation' => 1050,
                'averageAnnualSunshine' => 1780,
                'optimalPanelAngle' => 35,
            ],
            // ... другие регионы
        ];

        return response()->json([
            'data' => $regions,
            'message' => 'Regions retrieved successfully'
        ]);
    }

    public function getRegionData($regionId)
    {
        // Получение данных конкретного региона
        return response()->json([
            'data' => [/* данные региона */],
        ]);
    }

    public function getMonthlyData(Request $request)
    {
        $regionId = $request->query('region');
        
        // Получение месячных данных
        return response()->json([
            'data' => [/* месячные данные */],
        ]);
    }

    public function getComparison()
    {
        // Получение сравнительных данных
        return response()->json([
            'data' => [/* сравнительные данные */],
        ]);
    }
}
```

#### Добавьте роуты в `routes/api.php`:
```php
use App\Http\Controllers\Api\SolarDataController;

Route::prefix('solar')->group(function () {
    Route::get('/regions', [SolarDataController::class, 'getRegions']);
    Route::get('/regions/{id}', [SolarDataController::class, 'getRegionData']);
    Route::get('/monthly', [SolarDataController::class, 'getMonthlyData']);
    Route::get('/comparison', [SolarDataController::class, 'getComparison']);
});
```

### 3. База данных

#### Миграция для таблицы регионов:
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('solar_regions', function (Blueprint $table) {
            $table->id();
            $table->string('region_id')->unique();
            $table->string('name');
            $table->decimal('center_lat', 10, 6);
            $table->decimal('center_lon', 10, 6);
            $table->integer('area');
            $table->decimal('solar_radiation', 8, 2);
            $table->integer('average_annual_sunshine');
            $table->integer('optimal_panel_angle');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('solar_regions');
    }
};
```

#### Модель Region:
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SolarRegion extends Model
{
    protected $fillable = [
        'region_id',
        'name',
        'center_lat',
        'center_lon',
        'area',
        'solar_radiation',
        'average_annual_sunshine',
        'optimal_panel_angle',
    ];

    protected $casts = [
        'center_lat' => 'float',
        'center_lon' => 'float',
        'solar_radiation' => 'float',
    ];
}
```

### 4. CORS настройка

В `config/cors.php`:
```php
return [
    'paths' => ['api/*', 'solar-app/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['*'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
```

### 5. Конфигурация .env

В Laravel проекте:
```env
APP_URL=http://localhost:8000
VITE_API_BASE_URL="${APP_URL}/api"
```

В React проекте (.env):
```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_BASE_PATH=/solar-app
```

### 6. Сборка и деплой

#### Разработка:
```bash
# Terminal 1: Laravel server
php artisan serve

# Terminal 2: React dev server
npm run dev
```

#### Продакшен:
```bash
# Сборка React приложения
npm run build

# Копирование в Laravel public
cp -r dist/* ../laravel-project/public/solar-app/

# Оптимизация Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 7. Nginx конфигурация (опционально)

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/laravel-project/public;

    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

## Полезные команды

```bash
# Очистка кэша Laravel
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Пересборка React
npm run build && cp -r dist/* ../laravel-project/public/solar-app/

# Запуск миграций
php artisan migrate

# Создание сидера для тестовых данных
php artisan make:seeder SolarRegionsSeeder
```

## Troubleshooting

### Проблема: CORS ошибки
**Решение**: Убедитесь что `config/cors.php` правильно настроен и middleware включен

### Проблема: 404 на роутах React
**Решение**: Добавьте fallback роут в Laravel который возвращает index.html

### Проблема: Assets не загружаются
**Решение**: Проверьте `VITE_BASE_PATH` и убедитесь что пути в `asset()` корректны
