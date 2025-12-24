# Lester's Release Method

A guided digital emotional release tool based on Lester Levenson's **Sedona Method**. This application helps users release negative emotions and achieve goals through a structured, meditative 6-step process, enhanced with AI coaching.

[Insert Demo Video URL Here]

---

## 🧘‍♂️ App Flow & Functionality

The application follows a strict psychological flow designed to move the user from stress to peace.

### 1. Define Goal
*   **Action:** User inputs a specific goal or a problem they are facing.
*   **Feature:** Includes preset templates for Career, Health, Relationships, and Personal Growth to help users articulate their intent.

### 2. Identify Feeling
*   **Action:** User connects with the immediate emotion arising from the goal (e.g., Anxiety, Grief).
*   **AI Feature:** If the user is stuck, the "AI Assist" button uses Gemini to help articulate the feeling based on the goal.

### 3. Identify Core Want
*   **Concept:** All negative emotions stem from three root desires:
    1.  **Approval** (Wanting love/validation)
    2.  **Control** (Wanting to change/manage outcomes)
    3.  **Security** (Wanting safety/survival)
*   **Action:** User identifies which root desire is driving the current feeling.

### 4. Allow & Welcome
*   **Action:** Instead of resisting, the user is guided to fully welcome and accept the feeling. This is the paradoxical key to release.

### 5. The Release (The 3 Questions)
*   **Action:** A rapid-fire sequence of questions to trigger letting go:
    *   *Could you let it go?*
    *   *Would you let it go?*
    *   *When?*
*   **Interaction:** Optimized for keyboard use (`Enter` for Yes, `Backspace` for No) to maintain a meditative state.

### 6. Check Intensity (The Lotus)
*   **Action:** User rates the remaining emotional intensity (0-10).
*   **Visual:** The **Golden Lotus** in the background visually represents the intensity. As the user releases (Loop), petals disappear.
*   **Loop:** If intensity > 0, the app loops back to Step 4 until the user reaches zero (Total Freedom).

---

## 🛠 Tech Stack

*   **Framework:** React 19 + TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **AI:** Google Gemini API (@google/genai)
*   **Icons:** Lucide React
*   **Typography:** Playfair Display (Headings) & Source Serif 4 (Body) - *New York Times Aesthetic*

---

## 🚀 How to Run Locally

Follow these instructions to set up the project from scratch.

### Prerequisites
*   Node.js (LTS version) installed.
*   A Google Gemini API Key (Get one at [aistudio.google.com](https://aistudio.google.com/)).

### 1. Initialize Project
Open your terminal and create a new Vite project:

```bash
npm create vite@latest lester-release -- --template react-ts
cd lester-release
```

### 2. Install Dependencies
Install the required packages:

```bash
npm install @google/genai lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Configure Files
*   Copy the project files provided into the root directory.
*   Ensure `index.html` is in the root.

### 4. Set API Key
**Mac/Linux:**
```bash
export API_KEY="your_actual_api_key_here"
```

**Windows (PowerShell):**
```powershell
$env:API_KEY="your_actual_api_key_here"
```

### 5. Run
Start the development server:

```bash
npm run dev
```
Open the link shown in the terminal (usually `http://localhost:5173`).

---

## ☁️ Deployment (Vercel)

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  **Critical:** In the Vercel project settings, go to **Environment Variables** and add:
    *   Key: `API_KEY`
    *   Value: `your_google_gemini_api_key`
4.  Deploy.

*Note: The app requires the Environment Variable to access AI features.*
