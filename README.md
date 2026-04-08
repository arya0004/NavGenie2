# 🌍 NavGenie – AI Travel Planner & Heritage Explorer

NavGenie is an intelligent travel planning platform that combines **AI-powered itinerary generation**, **heritage exploration**, and a **social travel experience** into one seamless application.

It helps users discover destinations, plan trips based on mood and budget, and explore cultural heritage through an interactive and engaging interface.

---

## ✨ Features

### 🤖 AI-Powered Trip Planning

* Personalized itinerary generation based on:

  * Mood 😄
  * Budget 💰
  * Destination 📍
* Smart recommendations using AI (Groq API)

### 🗺️ Heritage Exploration

* Interactive Maharashtra heritage map
* Discover historical sites, landmarks, and cultural hotspots
* Visual exploration of regions and cities

### 📸 Travel Social Feed

* Share travel experiences
* View posts from other users
* Like, comment, and engage with the community

### 🧭 Trip Customization

* Select:

  * Starting location
  * Destination city
  * Trip duration
  * Budget range
* Generate customized travel plans instantly

---

## 🖥️ Tech Stack

### Frontend

* React + TypeScript
* Vite
* Tailwind CSS

### Backend

* Node.js / Express (if applicable)

### APIs

* Groq AI API (for recommendations)

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GROQ_API_KEY=your_api_key_here
```

⚠️ Never commit your `.env` file to GitHub.

---

## 📂 Project Structure

```
NavGenie/
├── heritage-trail-blaze/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── ...
├── backend/
├── public/
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/NavGenie.git
cd NavGenie
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the project

```bash
npm run dev
```

---

## 📸 Screenshots

### 🏠 Home Page

* Discover Maharashtra's heritage with immersive UI (output_images/home.png)

### 🧭 Plan Trip

* Input mood, budget, and preferences to generate itineraries

### 🗺️ Heritage Map

* Interactive regional map with detailed insights

### 📱 Social Feed

* Share and explore travel experiences

---

## 💡 Future Improvements

* User authentication & profiles
* Real-time chat between travelers
* Booking integrations (hotels, transport)
* Mobile app version
* Advanced AI recommendations
