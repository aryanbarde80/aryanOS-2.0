# AryanOS 2.0 — AI-OS Portfolio

> **"Discipline and Consistency is all what is needed!"**

A high-performance, immersive portfolio built with a futuristic **"Agentic OS"** philosophy — a fully interactive digital experience that blurs the line between portfolio and operating system. Leveraging cutting-edge web technologies to deliver cinematic visuals, a terminal-driven interface, and holographic 3D animations throughout.

![Portfolio Preview](/public/aryan-avatar-3d.png)

**Live Site:** [aryanos-2-0.pages.dev](https://aryanos-2-0.pages.dev/)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [License](#license)

---

## Overview

**AryanOS 2.0** is a portfolio website designed as a self-contained digital operating system. Visitors experience a boot sequence, a responsive terminal hero, glassmorphic OS windows, real-time diagnostics, animated section dividers, holographic 3D fillers, ambient particles, and a neural matrix background — all crafted to create a narrative-driven user journey.

### Key Highlights
- **OS Boot Sequence** — Cinematic loading animation simulating a system boot
- **Terminal Hero** — Interactive terminal-style introduction with typewriter effects
- **Glassmorphic OS Windows** — Every section is wrapped in collapsible OS-style panels
- **Holographic 3D Fillers** — Animated wireframe cube, DNA helix, atom model, and constellation network fill empty spaces in side-by-side card layouts
- **Neural Matrix Background** — Interactive canvas-based background reacting to cursor movement
- **Ambient Particles & Side Decorations** — Floating particle system and OS-themed decorative icons in page margins
- **Sticky Navigation** — OS-style top navigation bar with section links
- **Recruiter HUD** — Quick-access panel for recruiters
- **Divine Audio** — Ambient soundscapes with a sound mixer panel
- **Cinematic Quotes & Section Dividers** — Animated dividers (circuit, data stream, pulse, waveform, matrix) between sections
- **System HUD** — Real-time clock and session timer overlay
- **Magnetic Cursor** — Custom cursor glow effect

---

## Features

### Sections & Components

| Section | Component | Description |
|---------|-----------|-------------|
| **Hero** | `TerminalHero` | Terminal-style intro with typewriter animation |
| **Stats** | `StatsCounter` | Animated counters for projects, lines of code, deployments, etc. |
| **Analytics** | `AnalyticsDashboard` | Domain mastery radar chart, tech stack badges, competency mapping |
| **Timeline** | `SystemMonitorNode` | Career timeline with filterable categories (Work, Projects, Awards, Education) |
| **Knowledge Graph** | `KnowledgeGraph` | Tech stack proficiency bars organized by category |
| **Diagnostics** | `DiagnosticLog` | Simulated live system diagnostic terminal output |
| **Career Trajectory** | `CareerTrajectory` | Full career timeline with milestone markers |
| **GitHub** | `GitHubStatsNode` | GitHub profile stats, repos, followers, and recent repositories |
| **Architecture** | `SystemArchitectureNode` | System architecture overview with layer breakdown |
| **Impact Metrics** | `ImpactMetrics` | Performance dashboard with benchmarks and percentile score |
| **Benchmarks** | `PerformanceBenchmarks` | Detailed performance metrics visualization |
| **Hackathons** | `HackathonWins` | Hackathon achievements and participation |
| **Experience** | `ExperienceList` | Work experience with detailed role descriptions |
| **Bio** | `BioMatrix` | Professional summary with language proficiencies |
| **Skills** | `SkillsGrid` | 8-category skills grid (Languages, Frontend, Backend, DB, Cloud, IoT, AI, Tools) |
| **Education** | `EducationNode` | Academic records (B.Tech CSE, Higher Secondary, Secondary) |
| **Achievements** | `AchievementsNode` | Awards and recognition timeline |
| **References** | `ReferenceVault` | Encrypted credential vault with audit trail |
| **Certifications** | `CertificationsNode` | 22+ verified credentials (Cisco, Cloud, Oracle, Open Source, Internship) |
| **Coursework** | `CourseworkGrid` | 16 courses organized by category with semester info |
| **Technical Writing** | `TechnicalWritingNode` | Published blog articles with links to Medium |
| **Leadership** | `LeadershipNode` | Leadership roles and professional affiliations |
| **Projects** | `ProjectsShowcase` | Featured projects with tech tags and status |
| **Open Source** | `OpenSourceNode` | Hacktoberfest and open source contributions |
| **Contact** | `ContactNode` | Contact information and social links |

### Visual & Interactive Systems

| System | Component | Description |
|--------|-----------|-------------|
| **Boot Sequence** | `BootSequence` | OS-style loading animation on page load |
| **Neural Matrix** | `NeuralMatrix` | Interactive canvas background with cursor reactivity |
| **Ambient Particles** | `AmbientParticles` | Floating particle system overlay |
| **Side Decorations** | `SideDecorations` | Canvas-rendered OS icons (CPU, signal, gear, node, circuit) in margins |
| **Holographic Fillers** | `HolographicFiller` | 3D wireframe animations (cube, DNA, atom, constellation) for side-by-side card gaps |
| **Magnetic Cursor** | `MagneticCursor` | Custom cursor glow effect |
| **Cursor Glow** | `CursorGlow` | Root-level cursor tracking glow |
| **Divine Audio** | `DivineAudio` | Ambient audio with controls |
| **Divine Canvas** | `DivineCanvas` | 3D scene with Three.js |
| **Section Dividers** | `SectionDivider` | Animated dividers between sections (5 variants) |
| **System HUD** | `SystemHUD` | Real-time clock and session timer |
| **Recruiter HUD** | `RecruiterHUD` | Quick-access recruiter panel |
| **Mantra CLI** | `MantraCLI` | Hidden CLI for power users |

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16.2 (App Router) |
| **3D Graphics** | Three.js, @react-three/fiber, @react-three/drei |
| **Animations** | GSAP, Framer Motion, CSS Keyframes, Canvas API |
| **Styling** | Tailwind CSS 4.0, CSS Variables |
| **Audio** | Howler.js |
| **State Management** | Zustand, React Context |
| **Icons** | Lucide React |
| **Deployment** | Cloudflare Pages |

---

## Project Structure

```
aryanOS-2.0/
├── public/
│   ├── aryan-avatar-3d.png    # 3D avatar image
│   ├── aryan-avatar.png       # Fallback avatar
│   ├── favicon.png            # Site favicon
│   └── robots.txt             # SEO robots file
├── src/
│   ├── app/
│   │   ├── globals.css        # Global styles, Tailwind imports, theme variables
│   │   ├── layout.js          # Root layout with metadata, JSON-LD, CursorGlow
│   │   ├── page.js            # Main OS interface — all sections composed here
│   │   ├── not-found.js       # Custom 404 page
│   │   └── sitemap.js         # Dynamic sitemap generation
│   └── components/
│       ├── TerminalHero.js    # Terminal-style hero section
│       ├── BootSequence.js    # OS boot animation
│       ├── StickyNav.js       # Top navigation bar
│       ├── OSWindow.js        # Reusable OS window wrapper (glassmorphic, collapsible)
│       ├── StatsCounter.js    # Animated statistics counters
│       ├── CinematicQuote.js  # Animated quote display
│       ├── SkillsGrid.js      # Skills organized in 8 categories
│       ├── ExperienceList.js  # Work experience section
│       ├── ProjectsShowcase.js # Featured projects
│       ├── ContactNode.js     # Contact section
│       ├── EducationNode.js   # Education records
│       ├── CertificationsNode.js # 22+ certifications
│       ├── CourseworkGrid.js  # Academic coursework
│       ├── AchievementsNode.js # Awards timeline
│       ├── ReferenceVault.js  # Credential vault
│       ├── TechnicalWritingNode.js # Blog articles
│       ├── LeadershipNode.js  # Leadership roles
│       ├── BioMatrix.js       # Professional bio
│       ├── GitHubStatsNode.js # GitHub profile stats
│       ├── OpenSourceNode.js  # Open source contributions
│       ├── HackathonWins.js   # Hackathon achievements
│       ├── CareerTrajectory.js # Career timeline
│       ├── AnalyticsDashboard.js # Domain mastery dashboard
│       ├── SystemMonitorNode.js # Interactive career timeline
│       ├── SystemArchitectureNode.js # Architecture overview
│       ├── ImpactMetrics.js   # Performance dashboard
│       ├── PerformanceBenchmarks.js # Benchmark metrics
│       ├── KnowledgeGraph.js  # Tech proficiency visualization
│       ├── DiagnosticLog.js   # Simulated diagnostics
│       ├── RecruiterHUD.js    # Recruiter quick-access panel
│       ├── MantraCLI.js       # Hidden CLI interface
│       ├── HolographicFiller.js # 3D wireframe animations for card gaps
│       ├── NeuralMatrix.js    # Interactive neural network background
│       ├── AmbientParticles.js # Floating particles overlay
│       ├── SideDecorations.js # OS-themed margin decorations
│       ├── SectionDivider.js  # Animated section dividers
│       ├── DivineCanvas.js    # Three.js 3D scene
│       ├── DivineAudio.js     # Ambient audio system
│       ├── MagneticCursor.js  # Custom cursor effect
│       ├── CursorGlow.js      # Cursor glow wrapper
│       └── SystemHUD.js       # Clock and session timer
├── eslint.config.mjs          # ESLint configuration
├── jsconfig.json              # Path aliases (@/components, etc.)
├── next.config.mjs            # Next.js configuration
├── postcss.config.mjs         # PostCSS with Tailwind
├── package.json               # Dependencies and scripts
└── .gitignore
```

---

## Getting Started

### Prerequisites
- Node.js 20.x or higher
- npm 10.x or higher
- A modern browser with WebGL & Canvas support

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/aryanbarde80/aryanOS-2.0.git
   cd aryanOS-2.0
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Lint**:
   ```bash
   npm run lint
   ```

---

## Deployment

The project is deployed on **Cloudflare Pages**.

- **Live URL:** [https://aryanos-2-0.pages.dev/](https://aryanos-2-0.pages.dev/)
- **Build command:** `npm run build`
- **Output directory:** `.next`
- **Framework:** Next.js

---

## License

This project is licensed under the **MIT License**.

---

**© 2026 Aryan Barde** — Built with Next.js, Three.js, GSAP, Framer Motion & Tailwind CSS.  
*"The code is the mantra; the execution is the meditation."*
