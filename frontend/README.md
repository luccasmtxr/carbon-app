# 🌐 Frontend – Carbon Footprint Calculator

This is the **Next.js 15 + shadcn/ui** frontend for the Carbon Footprint Calculator.  
It provides an interactive form to estimate personal carbon footprints and displays results with charts and tables.

---

## 📂 Project Structure

```
frontend/
├── app/                # Next.js app router
│   ├── home/           # HomePage components, sections, and context
│   └── page.tsx        # Entry point that renders HomePage
├── components/         # Reusable UI components (shadcn/ui)
├── __tests__/          # Unit/integration tests (Jest + React Testing Library)
├── jest.config.js      # Jest config
├── package.json
└── tsconfig.json
```

---

## 📦 Key Dependencies

- **Next.js 15.5.3** – React framework  
- **shadcn/ui** – UI components  
- **react-hook-form + zod** – Form handling and validation  
- **recharts** – Charting library  
- **Jest + React Testing Library** – Testing  

---

## 🖥 Running Locally

⚠️ **Important:** The backend must be running at `http://localhost:7007` before starting the frontend.  

```bash
cd frontend
npm install
npm run dev
```

The app will be available at: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Running Tests

We use **Jest** with **React Testing Library**.

```bash
cd frontend
npm run test
```

Tests live inside the `__tests__/` folder.  

---

## 🐳 Running with Docker (Frontend Only)

```bash
docker build -t carbon-frontend .
docker run -p 3000:3000 carbon-frontend
```
