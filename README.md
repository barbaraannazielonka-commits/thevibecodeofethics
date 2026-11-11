# The Vibe-Code of Ethics | Professional Development Course for Global Educators

An interactive, privacy-first professional learning course and practical toolkit for teachers and school leaders navigating **vibe coding** and responsible AI creation in educational settings.

Based on the foundational framework:  
**"THE VIBE-CODE OF ETHICS: A Responsible Creation Framework for Educators Building AI-Powered Educational Tools"**

---

## 🚀 Live Deployment: Use GitHub Directly (No Cloudflare Needed!)

You **do not need Cloudflare, AWS, or any paid hosting**. This repository is configured to build and deploy 100% free directly on **GitHub Pages**.

### How to Activate GitHub Pages (1-Minute Setup):
1. Export or push this repository to your GitHub account.
2. In your GitHub repository, click on **Settings** (gear icon at top).
3. In the left navigation menu, click **Pages** (under *Code and automation*).
4. Under **Build and deployment > Source**, select:  
   👉 **`GitHub Actions`** (instead of "Deploy from a branch").
5. That's it! The pre-configured GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically run, build the project, and publish your site at:
   ```
   https://<your-github-username>.github.io/<your-repo-name>/
   ```
Every time you make an update or push changes, GitHub automatically rebuilds and redeploys the site.

---

## 💻 Running Locally on Your Computer

If you want to run or customize the project on your computer:

### Prerequisites
- [Node.js](https://nodejs.org/) version 18.0 or higher
- npm (comes bundled with Node.js)

### Quick Start
```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/<your-repo-name>.git

# 2. Enter the project directory
cd <your-repo-name>

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open your browser at `http://localhost:3000`.

### Production Build
To create an optimized production build:
```bash
npm run build
```
The static website files will be generated in the `/dist` directory. You can test the production build locally with:
```bash
npm run preview
```

---

## 🔒 Zero-Sensitive-Data Architecture

This course is designed with strict pedagogical ethics:
- **Zero Remote Storage**: No user accounts, passwords, or personal data are ever collected or sent to remote servers.
- **Client-Side Progress**: All module progress, quiz scores, checklist completions, and risk evaluations reside exclusively in your browser's private `localStorage`.
- **Transparency & Control**: An in-app data transparency modal displays the exact number of bytes stored and provides a 1-click permanent data wipe.
- **Client-Side Certificate Generation**: Completion certificates are rendered in-memory via high-resolution HTML5 Canvas 2D and exported directly as Vector PDF and PNG files without server transmission.

---

## 📚 Core Features & Interactive Educator Tools

1. **8 Comprehensive Learning Modules**:
   - Covers all 25 framework sections and the 4 Core Paradoxes (*Agency vs. Amplification, Speed vs. Scrutiny, Access vs. Extraction, Innovation vs. Institutional Duty*).
   - Interactive classroom scenario dilemmas with instant formative feedback.
2. **23-Point Pre-Deployment Checklist Gate**:
   - Categorized across *Pedagogy, Privacy, Security, AI Responsibility, Accessibility, Assessment, and Deployment*.
   - Generates downloadable audit logs for school leadership and data protection officers.
3. **Classroom Risk Calculator**:
   - Classifies custom educational apps into 4 practical risk tiers (*Lower, Moderate, Higher, Very High*).
   - Generates concrete governance recommendations under the EU AI Act and national directives.
4. **Pedagogical Rationale Generator**:
   - Builds Section 2 justifications based on Cognitive Load Theory, Dual-Coding, and national curricula.
5. **Synthetic Classroom Data Lab**:
   - Teaches Section 8 data anonymization with one-click synthetic student datasets.
6. **Official 27-Page Framework PDF Reader**:
   - Embedded document viewer with a 25-section index and direct download.
7. **Full Sources Library**:
   - Academic research (Sweller, Mayer, Roediger & Karpicke, Kapur, Hattie & Timperley, Ryan & Deci).
   - Official directives (Utdanningsdirektoratet, Datatilsynet, NSM, EU AI Act, OWASP LLM Top 10, WCAG 2.2, ICO Children's Code).
8. **Universal Accessibility Drawer (`Aa`)**:
   - Accessible floating button and header trigger.
   - Text scaling (100% to 140%), Dyslexia-friendly typography, High-contrast modes, and an interactive Reading Focus Ruler.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8 with relative asset pathing
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Certificate Engine**: Native HTML5 Canvas 2D + jsPDF
- **Confetti**: canvas-confetti

---

## 📄 License

This educational project is distributed under the **MIT License**. Educators and institutions are free to use, adapt, and share this curriculum for non-commercial professional development.
