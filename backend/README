# 🧩 Carbon Footprint API (Backend)

Express + TypeScript backend that powers the Personal Carbon Footprint Calculator.

- **Runtime:** Node.js 22 (LTS)
- **Framework:** Express
- **Language:** TypeScript
- **Tests:** Jest (+ ts-jest)
- **Port:** `7007` (default)

---

## 🚀 Quick Start (Local)

```bash
cd backend
npm install
# dev with auto-reload (ts-node-dev or nodemon)
npm run dev          # http://localhost:7007
```

> Production:
```bash
npm run build
npm start            # runs dist/index.js
```

---

## 🐳 Docker / Docker Compose

The root `docker-compose.yml` builds and runs **frontend + backend** together.

From the repo root:
```bash
docker-compose up --build
```

- Backend: <http://localhost:7007>
- Frontend: <http://localhost:3000>

You can also build the backend image alone:
```bash
cd backend
docker build -t carbon-backend .
docker run -p 7007:7007 carbon-backend
```

---

## 📡 REST API

### `POST /api/v1/footprint`

Calculates annual carbon footprint in **kg CO₂e/yr** for the provided categories. All fields are optional; missing values are treated as `0`.

#### Request body (JSON)

```jsonc
{
  "housing": {
    "electricity_kwh": 4000,
    "naturalGas_therms": 200,
    "fuelOil_litres": 0,
    "lpg_litres": 0,
    "waste_kg_per_week": 5,
    "water_litres_per_day": 120
  },
  "travel": {
    "vehicle_km": 12000,
    "bus_km": 0,
    "metro_km": 0,
    "taxi_km": 300,
    "rail_km": 1500,
    "flying_km": 2000
  },
  "food": {
    "red_meat_kcal_per_day": 400,
    "white_meat_kcal_per_day": 300,
    "dairy_kcal_per_day": 200,
    "cereals_kcal_per_day": 250,
    "vegetables_kcal_per_day": 350,
    "fruit_kcal_per_day": 200,
    "oils_kcal_per_day": 100,
    "snacks_kcal_per_day": 150,
    "drinks_kcal_per_day": 180
  },
  "products": {
    "electrical_usd_per_month": 100,
    "household_usd_per_month": 120,
    "clothes_usd_per_month": 80,
    "medical_usd_per_month": 60,
    "recreational_usd_per_month": 70,
    "other_usd_per_month": 50
  },
  "services": {
    "health_usd_per_month": 120,
    "finance_usd_per_month": 40,
    "recreation_usd_per_month": 90,
    "education_usd_per_month": 100,
    "vehicle_usd_per_month": 150,
    "communications_usd_per_month": 60,
    "other_usd_per_month": 50
  }
}
```

#### Response (JSON)

```json
{
  "total": 3456.78,
  "breakdown": {
    "housing": 1234.56,
    "travel": 987.65,
    "food": 543.21,
    "products": 432.10,
    "services": 259.26
  }
}
```

#### cURL example

```bash
curl -X POST http://localhost:7007/api/v1/footprint   -H "Content-Type: application/json"   -d '{
    "housing": { "electricity_kwh": 4000, "waste_kg_per_week": 5 },
    "travel": { "vehicle_km": 12000 },
    "food": { "red_meat_kcal_per_day": 400 },
    "products": { "electrical_usd_per_month": 100 },
    "services": { "health_usd_per_month": 120 }
  }'
```

---

## 🧪 Tests

We use **Jest** with **ts-jest** for unit and integration tests.

```bash
# from /backend
npm test
npm run test:watch
npm run test:coverage
```

Typical test locations:
```
backend/
├── tests/
│   ├── unit/          # calculators & pure services
│   └── integration/   # Express routes
```

---

## 📁 Folder Structure (overview)

```
backend/
├── src/
│   ├── app.ts                # express app wiring
│   ├── index.ts              # server bootstrap (PORT=7007)
│   ├── routes/
│   │   └── footprint.ts
│   │   ├── housing.ts
│   │   ├── travel.ts
│   │   ├── food.ts
│   │   ├── products.ts
│   │   └── services.ts
│   ├── controllers/
│   │   └── footprintController.ts
│   │   ├── housingController.ts
│   │   ├── travelController.ts
│   │   ├── foodController.ts
│   │   ├── productsController.ts
│   │   └── servicesController.ts
│   ├── services/
│   │   ├── housingService.ts
│   │   ├── travelService.ts
│   │   ├── foodService.ts
│   │   ├── footprintService.ts
│   │   ├── productsService.ts
│   │   └── servicesService.ts
│   └── data/
│       └── emissionFactors.ts
├── tests/
│   ├── unit/
│   └── integration/
├── jest.config.ts
├── tsconfig.json
└── Dockerfile
```

> Notes:
> - Emission factors are provided for demonstration and can be updated to match the latest references (EPA/others).
> - The API is stateless and uses no database connection by default.

---

## ⚙️ Scripts (package.json)

```jsonc
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest --passWithNoTests",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

## 🔐 Environment

- `PORT` (optional) — defaults to **7007**
- `NODE_ENV` — `development` | `production`

---

