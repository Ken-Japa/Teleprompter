# PromptNinja - Product Context (SSOT)

**Version:** 2.0 - Consolidated  
**Last Updated:** January 2026  
**Purpose:** Single Source of Truth for AI Agents

---

## 1. Core Identity

### What is PromptNinja?

**PromptNinja** is a **professional-grade web teleprompter** that transforms any browser into a complete teleprompter studio, eliminating the need for specialized hardware, mobile apps, or complex configurations.

### Value Proposition (USP)

- ✅ **Zero Installation**: Progressive Web App (PWA) that works directly in the browser
- ✅ **Zero Hardware**: Smartphone becomes remote control via QR Code (P2P)
- ✅ **Zero Login**: Immediate access without registration or authentication
- ✅ **Total Privacy**: 100% local processing, scripts never uploaded to cloud

### Core Technical Differentiator

**Peer-to-Peer (P2P) Connection** with virtually zero latency (<10ms) using WebRTC/PeerJS, superior to Bluetooth or traditional WiFi solutions.

### Brand Positioning

> **"Forget the hardware. Your professional teleprompter is now 100% software."**

We eliminate the three main barriers to professional teleprompting:
1. **Cost** - No need for $500+ hardware rigs
2. **Complexity** - No Bluetooth pairing or app installations
3. **Privacy** - No cloud uploads or account requirements

---

## 2. Technical Architecture

### Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **P2P**: PeerJS (WebRTC abstraction)
- **Deployment**: Vercel
- **PWA**: Service Workers, works offline after initial load
- **Validation**: Firebase (Firestore/Auth for PRO license validation)

### Technical Characteristics

- **Offline-First**: Works without internet after initial cache (except P2P handshake)
- **Multi-Language**: Portuguese, English, Spanish
- **Responsive**: Desktop (Host) + Mobile (Remote)
- **Cross-Platform**: Chrome, Edge, Safari, Android, iOS

### Key Constraints (Design Principles)

1. **Offline-First**: Everything except P2P must work without internet
2. **Privacy-First**: Never upload user scripts unless explicitly logged in
3. **Zero-Friction Onboarding**: No barrier between landing page → usage
4. **Progressive Enhancement**: Core features free, PRO features are add-ons

---

## 3. Key Features

### 3.1 Core Features (Free)

#### Intelligent Editor

**Syntax Highlighting** with color tags:
- `<r>Text</r>`: Red (alerts/stops)
- `<y>Text</y>`: Yellow (emphasis)
- `<g>Text</g>`: Green (start/calm)
- `<b>Text</b>`: Blue (direction notes)

**Quick Edit**: Edit without leaving teleprompter mode

#### P2P Remote Control (Mobile)

- **Instant pairing** via QR Code
- **Virtual trackpad** with natural gestures and inertia physics
- **Haptic feedback** on supported devices
- **Bidirectional sync** of state (speed, position, play/pause)
- **Connection type**: WebRTC Peer-to-Peer (<10ms latency)

#### Visual Customization

**Typography**:
- Font size: 20px to 200px
- Side margins: 0% to 50%
- Fonts: Inter, Outfit, OpenDyslexic, Roboto Mono, Poppins, Lexend

**9 Visual Themes**:
- **Ninja**: OLED dark mode
- **Paper**: Traditional light
- **Contrast**: High contrast for bright environments
- **Matrix/Cyber**: Futuristic aesthetics
- **Cream**: Sepia tone for reduced eye strain
- **Chroma Key Green/Blue**: Solid background for video editors (OBS/Premiere)

**Display Modes**:
- **Mirror Mode**: Horizontal flip for beam-splitter mirrors
- **Vertical Flip**: 180° rotation for complex setups
- **Dynamic Focus Line**: Dims text above/below active reading line
- **Uppercase Toggle**: Instant ALL CAPS transformation

#### Automation via Text Commands

Insert commands directly in script for automatic control:
- `[SPEED X]`: Change speed at specific point
- `[PAUSE X]`: Pause for X seconds and auto-resume
- `[STOP]`: Full stop
- `[LOOP START] / [LOOP X]`: Create repetition loops
- `[SLIDE X] / [PART X]`: Section navigation (keyboard shortcuts)

**Fitness Mode Commands**:
- `[REST X]`: Rest countdown HUD
- `[COUNT X]`: Rep counter integrated with voice control

Now in the editor we have an autocomplete for these commands. When the user types `[` the autocomplete will show all the available commands. When the user types `[` and then `L` the autocomplete will show `[LOOP START]` and `[LOOP X]`. 

#### Keyboard Shortcuts

- `Space/Enter`: Play/Pause
- `Arrow ↑↓`: Adjust speed
- `Arrow ←→`: Jump to parts (via SLIDE/PART commands)
- `+/-`: Increase/decrease font
- `M`: Toggle mirror
- `V`: Toggle vertical flip
- `F`: Toggle focus mode
- `H`: Show/hide interface
- `C`: Toggle background camera
- `W`: Toggle mini-window (PiP)
- `R`: Restart (back to top)
- `Esc`: Exit presentation mode
- `Ctrl + B`: Toggle bold text
- `Ctrl + I`: Toggle italic text
- `Ctrl + U`: Toggle underline text
- `Ctrl + E`: Toggle red text (evicted conflit with refresh)
- `Ctrl + K`: Toggle yellow text
- `Ctrl + Q`: Toggle green text
- `Ctrl + M`: Toggle blue text


#### Advanced Video Features

- **Picture-in-Picture (PiP)**: Floating window over other apps (Zoom/Teams/Meet) -
- **Camera Overlay**: Webcam as teleprompter background
- **Recording**: Audio/video in `.webm` and `.mp4`
- **Pacing Calculator (WPM)**: Estimates reading time based on word count
- **HUD-less Mode**: Starts teleprompter with zero visible buttons.

#### Specialized Modes

**Music Mode**:
- Preserves original paragraph formatting
- Ideal for song lyrics with aligned chords
- Pedal shortcuts (Page Up/Down, Home/End)

**Bilingual Mode**:
- Two scripts side-by-side (50/50)
- Independent voice tracking per language

**Fitness Mode**:
- Rest countdown HUD
- Voice-activated rep counter

### 3.2 PRO Features

#### Voice Control (AI)

- **Voice-Synced Scrolling**: Automatic scroll synchronized with speech (Web Speech API)
- **Keep-to-Top**: Keeps current phrase always at top
- **Multilingual support**
- **Auto-pause**: Stops when you stop speaking, resumes when you continue

#### Controle Multi-Teleprompter (Master/Receiver)
Allow professional operators to manage multiple displays simultaneously in events, eliminating the need for physical cables and simplifying the technical setup.

#### Integração Nativa com OBS Studio
Fluid WebSocket integration for streamers and content creators who use OBS as their production hub, making PromptNinja an essential part of the broadcast workflow.

#### Gerador de Legendas Automáticas (SRT/VTT)
Automates the process of captioning for content creators, saving hours of post-production.

#### PRO Exclusives

- ✅ Unlimited sessions (free version has 20min limit per session)
- ✅ No watermark
- ✅ Custom keyboard shortcuts
- ✅ Multi-Remote (multiple phones connected)

---

## 4. Target Audiences & Use Cases

### Content Creators

**Profile**: YouTube/TikTok/Reels creators, online educators, coaches

**Pain Points**:
- Need to record quickly without mistakes
- Want natural eye contact with camera
- Struggle to memorize long scripts

**Key Features**: Voice Control, PiP mode, Camera Overlay, Recording

**Use Case Example**: "Record 10-minute YouTube video in one take without looking down"

---

### Corporate Professionals

**Profile**: B2B sales, real estate agents, speakers, pastors

**Pain Points**:
- Need to look professional on Zoom/Teams/Meet
- Long presentations require script support
- Must maintain credibility with eye contact

**Key Features**: PiP, High Contrast theme, Large fonts, Section navigation

**Use Case Example**: "Deliver perfect sales pitch on Zoom with direct camera eye contact"

---

### Specialized Niches

**Musicians**:
- Aligned chords and lyrics
- Paused scroll for sight-reading
- Pedal support for hands-free control

**Fitness Instructors**:
- Rep counting via voice
- Rest timers
- HIIT interval automation

**Bilingual Professionals** (Translators/Interpreters):
- Simultaneous dual-language display
- Independent tracking per side

---

## 5. Competitive Landscape

### What Problems We Solve

| Market Pain | Traditional Solution | PromptNinja Solution |
|-------------|---------------------|---------------------|
| Subscription fatigue | Expensive monthly SaaS | Lifetime PRO or free forever |
| Unstable connectivity | Bluetooth/WiFi with lag | WebRTC P2P (<10ms) |
| Robotic eye movement | Fixed scroll speed | AI Voice Control |
| Complex setup | Expensive hardware (mirrors, tablets) | Browser + phone |
| Data insecurity | Cloud uploads | Local processing |
| Learning curve | Professional software complexity | Zero configuration |

### Main Competitors

- **Speakflow**: Premium leader, expensive, complex
- **PromptSmart**: Mobile app, requires installation
- **CuePrompter**: Basic, no native remote control
- **Teleprompter Mirror**: Focus on physical hardware

### Our Unique Advantage

**Technical**: WebRTC P2P with <10ms latency (vs. 100-300ms Bluetooth)  
**UX**: QR Code pairing (vs. manual Bluetooth pairing)  
**Privacy**: Local-only processing (vs. cloud dependency)  
**Access**: Browser-based (vs. app stores/downloads)

---

## 6. User Journey & Conversion Funnel

### Onboarding Flow

1. **Landing Page** → User discovers PromptNinja
2. **Immediate Usage** → Click "Start" (no signup)
3. **First Scroll** → Test basic teleprompter
4. **QR Pairing** → Connect phone as remote
5. **Micro-Conversion** → 3+ minutes of active use

### Paywall Triggers

1. User clicks PRO feature (e.g., Voice Control)
2. After 20 minutes continuous use
3. Modal appears with options:
   - Buy PRO (lifetime)
   - 24h Free Trial
   - Give Feedback
   - Share App

### Trial Mechanism

**24-Hour PRO Trial**:
- Activated via modal (no login required)
- LocalStorage with encrypted timestamp
- All PRO features unlocked
- Auto-reverts after 24h

### Conversion Points

- **Micro-conversion**: 3 minutes active use
- **Quality user**: Connects P2P remote
- **High-intent**: Uses Voice Control or PiP
- **Conversion**: Purchases PRO key

---

## 7. Analytics Philosophy

### Critical Events (Product Decisions)

- `successful_connection`: Validates P2P works
- `teleprompter_play` / `finish_reading`: Validates real usage
- `micro_conversion`: 3+ minutes active use
- `paywall_view` / `paywall_cta_click`: Conversion funnel
- `pro_key_redeemed`: Revenue confirmed
- `pro_trial_started`: Trial activation
- `setting_changed`: User preferences
- `app_error`: Technical issues tracking

### Measurement Philosophy

- **Quality > Quantity**: Prefer "average usage time" over "pageviews"
- **Heartbeats**: Events every 60s during active use prove real engagement
- **Micro-conversions**: Track actions indicating product-market fit
- **Error tracking**: Proactive issue detection via `app_error` events

---

## 8. Brand Voice & Messaging

### We Are

- ✅ **Technical**: We talk about latency, WebRTC, P2P without fear
- ✅ **Direct**: No corporate fluff, straight to the point
- ✅ **Useful**: Focus on solving real problems, not creating hype
- ✅ **Accessible**: No unnecessary jargon for beginners

### We Are Not

- ❌ Generic corporate
- ❌ Course/infoproduct sellers
- ❌ Exaggerated claims ("revolutionary", "incredible")

### Tone of Voice

- **Informal but professional**: "You" instead of "the user"
- **Confident but humble**: Admit limitations when they exist
- **Performance-oriented**: Concrete numbers (<10ms, not "super fast")

### Copy Hooks (Headlines)

1. "Turn your phone into a professional remote control — no Bluetooth, no app."
2. "Record perfect videos on Zoom without anyone noticing you're reading."
3. "The teleprompter that follows your voice, not the other way around."
4. "Zero hardware cost, maximum camera confidence."

---

## 9. SEO & Content Strategy

### Long-tail Keywords

**Portuguese**:
- "como ler roteiro de vídeo sem desviar o olhar"
- "teleprompter online grátis para PC"
- "app teleprompter para gravar aulas"
- "como não esquecer fala em vídeo"

**English**:
- "read video script on Teams without eye distraction"
- "how to look natural using teleprompter"
- "free online teleprompter with remote control"
- "zoom presentation script tool"

**Spanish**:
- "teleprompter para no olvidar líneas en pitch de ventas"
- "cómo leer script en Zoom sin que se note"
- "aplicación teleprompter gratis español"

### Content Pillars

1. **Tutorial Content**: "How to..." guides for specific use cases
2. **Comparison Content**: "PromptNinja vs [Competitor]"
3. **Use Case Stories**: Success stories per audience segment
4. **Technical Explainers**: "Why WebRTC beats Bluetooth for teleprompters"

### ~40 SEO Landing Pages

All pages follow consistent structure:
- Problem statement
- Solution explanation
- Feature showcase
- CTA to try PromptNinja
- Internal linking to related pages

---

## 10. Common User Scenarios (For Agent Context)

### Scenario 1: YouTube Creator Recording at Home

**Setup**: PC + webcam + phone as remote  
**Features Used**: Voice Control, Camera Overlay, Recording  
**User Goal**: Record 10-min video in 1 take without looking away  
**Pain Point Solved**: No more "robotic eyes" from fixed scroll speed

---

### Scenario 2: Salesperson in Zoom Meeting

**Setup**: Laptop + Zoom open  
**Features Used**: PiP mode, Contrast theme  
**User Goal**: Perfect sales pitch with direct laptop camera eye contact  
**Pain Point Solved**: Looks natural while reading detailed product pitch

---

### Scenario 3: Musician in Rehearsal

**Setup**: Tablet + Bluetooth pedal  
**Features Used**: Music Mode, Page Up/Down shortcuts  
**User Goal**: Aligned chords, verse advancement with foot pedal  
**Pain Point Solved**: Hands-free navigation, preserved formatting

---

### Scenario 4: Bilingual English Teacher

**Setup**: PC + PT/EN script side-by-side  
**Features Used**: Bilingual Mode, Voice Control tracking EN  
**User Goal**: Fluid class alternating languages without losing position  
**Pain Point Solved**: Simultaneous dual-language reference

---

### Scenario 5: Fitness Coach Recording HIIT Workout

**Setup**: PC + voice commands  
**Features Used**: Fitness Mode, `[REST 30]` and `[COUNT 15]` commands  
**User Goal**: Automated rest timers and rep counting  
**Pain Point Solved**: Hands-free workout video recording with automated cues

---

## 11. Technical FAQ (For AI Agents)

**Q: Why P2P instead of Bluetooth?**  
A: Bluetooth has 100-300ms lag and requires physical pairing. WebRTC has <10ms and connects via QR code.

**Q: How does the 24h trial work without backend?**  
A: LocalStorage with encrypted timestamp. No server validation needed.

**Q: Why is PiP free instead of PRO?**  
A: PiP is a browser API feature that doesn't require special development. We prioritize value-add PRO features like Voice Control that use AI/ML.

**Q: What happens to user scripts?**  
A: Stored only in browser's LocalStorage (RAM). Never uploaded to servers unless user explicitly saves/shares.

**Q: How is PRO validated?**  
A: User receives key via email (Kiwify), enters it in app, Firebase validates against purchase database.

**Q: Can it work completely offline?**  
A: Yes, after first load. Only P2P handshake requires brief internet for signaling server connection.

---

## 12. Product Differentiation Matrix

### Feature Comparison

| Feature | PromptNinja | Traditional Apps | Professional Hardware |
|---------|-------------|------------------|----------------------|
| **Setup Time** | <30 seconds | 5-10 minutes | 30+ minutes |
| **Hardware Cost** | $0 | $0-50 | $200-2000 |
| **Latency** | <10ms | 100-300ms | 0ms (wired) |
| **Privacy** | 100% local | Cloud uploads | 100% local |
| **Portability** | Any browser | Device-locked | Physical rig |
| **Learning Curve** | None | Low-Medium | High |
| **Voice Control** | ✅ PRO | ❌ | ❌ |
| **Multi-Device** | ✅ Free | ❌ | ❌ |

### Why Users Choose Us

1. **Creators**: Voice Control + PiP = natural-looking videos
2. **Professionals**: Zero setup = ready for any client meeting
3. **Budget-conscious**: Free forever tier beats $10/month SaaS
4. **Privacy-aware**: No cloud uploads beats "trust us with your scripts"
5. **Technical users**: <10ms latency beats "good enough" Bluetooth

---

## 13. Product Constraints & Limitations

### Technical Limitations

- **Browser Dependency**: Requires modern browser (Chrome 90+, Safari 14+)
- **P2P Handshake**: Initial connection needs internet (offline after)
- **Voice Control**: Requires microphone permission (some users hesitant)
- **PiP Transparency**: Not yet functional (browser API limitation)

### Intentional Design Choices

- **No User Accounts**: Privacy by design, but limits sync across devices
- **No Cloud Backup**: Scripts stay local, user must manage own backups
- **Serverless Architecture**: Keeps costs low, but limits real-time collaboration
- **LocalStorage Only**: Fast access, but data lost if browser cache cleared

### Future Considerations (Not Roadmap)

These are known user requests, documented for agent awareness:
- Visual eye contact indicators
- Pedal support improvements
- Better compatibility with older devices
- Anti-glare mode for extreme outdoor use

---

## 14. Success Metrics (For Context)

### Product Health Indicators

- **Engagement**: Average session duration >5 minutes
- **Quality**: >60% of users connect P2P remote
- **Conversion**: Paywall view → Trial activation >40%
- **Retention**: Return users within 7 days >30%
- **Technical**: P2P connection success rate >95%

### Validation Signals

✅ Users spending 3+ minutes = Serious intent (not just curious)  
✅ P2P connection = Understanding core value prop  
✅ Voice Control usage = High-intent professional users  
✅ Repeated usage = Product-market fit confirmation

---

## 15. For AI Agents: Context Usage Guidelines

### When to Reference This Document

- **Agent 4 (Community Discovery)**: Use pain points, use cases, and keywords to identify relevant conversations
- **Agent 5 (Partnership Discovery)**: Use target audiences and differentiation matrix to qualify potential partners
- **Agent 1 (SEO Diagnosis)**: Use SEO keywords and content pillars for optimization
- **Agent 2 (Product Intelligence)**: Use analytics events and success metrics for data analysis
- **Agent 3 (Content Optimizer)**: Use brand voice, copy hooks, and messaging guidelines

### Key Sections by Agent

**Agent 4**: Sections 4, 5, 9, 10  
**Agent 5**: Sections 4, 5, 12  
**Agent 1**: Sections 9, 11  
**Agent 2**: Sections 7, 14  
**Agent 3**: Sections 8, 9

### How to Interpret User Needs

When analyzing community discussions or partner content:
1. **Map pain points** → Section 5 (Competitive Landscape)
2. **Identify user type** → Section 4 (Target Audiences)
3. **Match use case** → Section 10 (Common Scenarios)
4. **Apply brand voice** → Section 8 (Messaging)

---

**End of Document**  
**Maintained by**: Product Team  
**Used by**: AI Agents 1-5 via `context_manager.py`  
**Update Frequency**: As needed when core product changes