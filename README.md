# Darb Al Istidama (درب الاستدامة)
## A Climate-Responsive AI Engine for Abu Dhabi’s Net-Zero Mobility Transformation

> **“How can I travel around Abu Dhabi without depending on a car, while staying safe and comfortable in the UAE climate?”**

Darb Al Istidama is a UAE-engineered smart mobility platform designed primarily for **Abu Dhabi**. It empowers residents, commuters, tourists, and People of Determination to walk, cycle, and use public transit safely by adapting journeys to the UAE's extreme climate.

---

## 🌟 Core Highlights

1. **Climate Intelligence Engine:** Live and calibrated Abu Dhabi metrics (Temperature 39°C, Heat Index 44°C, UV 9, AQI 38, Shade Coverage 71%, NW Gulf breeze) with configurable **⚠️ Extreme Heat Advisories**.
2. **Climate-Adaptive Routing:**
   - **Route A — Coolest Route:** 76% shaded / air-conditioned corridors (via Maryah Galleria AC Skybridge & Date Palm canopies).
   - **Route B — Fastest Route:** Direct path with warnings regarding unshaded asphalt sun exposure.
   - **Route C — Sustainable Route:** Multimodal integration with Abu Dhabi Electric Bus 063 and air-conditioned transit shelters.
3. **Interactive Abu Dhabi Map:** Leaflet map with 7 togglable layers:
   - 🟢 Walking routes
   - 🔵 Cycling tracks (Corniche highway, Al Hudayriyat, Yas Marina)
   - 🟡 Public transport (ITC electric bus network)
   - 🌳 Shade zones & date palm canopies
   - ❄️ Air-conditioned pedestrian skywalks
   - ⚠️ Heat-risk unshaded corridors
   - ♿ Step-free & POD accessible crossings
4. **First-Class Accessibility:** Wheelchair, step-free, avoid stairs, stroller-friendly, elder-friendly, and visual contrast modes with active badges.
5. **UAE Cultural Discovery & Heritage Trails:** Sheikh Zayed Grand Mosque, Qasr Al Watan, Abu Dhabi Corniche, Saadiyat Cultural District (Louvre AD), Mangrove National Park, and Masdar City Eco-District. Interactive Emirati living heritage cards: Harees Heritage Trail, Barjeel wind towers, Falaj oasis irrigation, and Gahwa coffee rituals.
6. **Gamification & Sustainability Journey:** 1,280 Green Points, 7-day streak, 4.8 kg CO₂ saved, 24.6 km walked, 8.2 km cycled, 6 earned badges, and an anonymized community leaderboard.
7. **Smart City Dashboard (`/dashboard`):** Aggregated, privacy-preserving telemetry for the Department of Municipalities and Transport (DMT) & Environment Agency Abu Dhabi (EAD) detailing shade demand gaps and B2B Corporate Wellness.
8. **Darb AI Assistant:** Floating and conversational AI mobility companion connected to backend proxy (`@google/genai`).
9. **Full Bilingual Support:** Instant toggle between English and العربية with full RTL layout support.
10. **Security & Privacy-by-Design:** No frontend API keys, Express API proxy, Helmet headers, Rate limiting, bcrypt password hashing, JWT role-based access, and zero tracking of private home/work locations.

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v18+)
- npm

### 2. Environment Setup
The project comes with pre-configured `.env` and `.env.example`:
```bash
cp .env.example .env
```

### 3. Run the Platform
To launch both the backend API server and the frontend client concurrently:
```bash
npm start
```
Or run individually:
```bash
# Terminal 1: Backend API Proxy (Port 5000)
npm run server

# Terminal 2: Frontend Vite Client (Port 5173)
npm run dev
```

Visit: **http://localhost:5173**

---

## 🏛️ Architecture

```
Frontend (React 19 + Tailwind CSS + Leaflet)
           ↓ (Secure /api Proxy)
Backend (Express + Helmet + Rate Limiters)
           ↓
External APIs (Gemini 2.5 AI, Abu Dhabi Weather, Google Maps)
```

- **Demo Mode:** Fully calibrated Abu Dhabi fallback datasets ensure 100% functionality even when offline or external APIs are unavailable.
- **Demo Scenario:** Click **"Run Demo Scenario: Al Reem to Corniche"** in the top banner for an instant live walkthrough.
