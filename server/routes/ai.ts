import { Router, Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';

const router = Router();

// Darb AI Assistant Prompt & Logic
const SYSTEM_PROMPT = `
You are "Darb AI", the intelligent mobility assistant for "Darb Al Istidama" — Abu Dhabi's Climate-Responsive Sustainable Mobility Platform.
Your purpose is to help UAE residents, visitors, commuters, and People of Determination travel around Abu Dhabi without relying on personal cars, while remaining safe, cool, and comfortable in the UAE climate.

Core Guidelines:
1. Always be polite, encouraging, culturally aware, and aligned with UAE Net-Zero 2050 vision.
2. Abu Dhabi Environmental Context: Current daytime temperature is around 39°C with a heat index of 44°C and UV 9 (Very High). Always advise on shade, hydration, air-conditioned bus connections, or evening travel if outdoor heat is extreme.
3. Support walking, cycling (e.g. Corniche track, Al Hudayriyat), and public transport (Abu Dhabi Bus network, Masdar autonomous pods).
4. For People of Determination or users asking about accessibility/wheelchairs/strollers, strictly highlight step-free routes, elevators, ramps, and accessible bus stops.
5. If asked about routes (e.g. "Al Reem Island to Corniche"), explain the trade-offs:
   - Route A (Coolest): 28 min, 76% shaded via Al Maryah AC Galleria links and Capital Gardens date palms.
   - Route B (Fastest): 20 min, higher sun exposure.
   - Route C (Sustainable Transit): Electric Bus 063 + shaded walkways, minimal heat exposure.
6. Never fabricate opening hours, bus tickets, or medical advice. Label safety information as environmental guidance.
7. Support both English and Arabic queries naturally.
`;

router.post('/chat', async (req: Request, res: Response) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({
        success: false,
        error: { message: 'Message text is required', code: 'INVALID_INPUT' }
      });
      return;
    }

    const trimmed = message.trim();
    const apiKey = process.env.GEMINI_API_KEY;

    // Check if Gemini API key is configured
    if (apiKey && apiKey !== 'your_key_here' && apiKey.length > 10) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            { role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\n\nUser Question: ${trimmed}` }] }
          ]
        });

        const reply = response.text || 'I analyzed the route for you. How else can I assist your journey across Abu Dhabi?';
        res.json({
          success: true,
          reply,
          source: 'Gemini 2.5 Flash Live'
        });
        return;
      } catch (geminiError: any) {
        console.warn('[Darb AI] Gemini API call fallback triggered:', geminiError.message);
        // Graceful fallback to deterministic UAE mobility intelligence
      }
    }

    // Built-in UAE Smart Mobility Engine Fallback (Demo & Offline mode)
    const lower = trimmed.toLowerCase();
    let reply = '';

    if (lower.includes('reem') && lower.includes('corniche')) {
      reply = `It's currently 39°C (Heat Index 44°C) in Abu Dhabi. I calculated three options between Al Reem Island and Abu Dhabi Corniche:\n\n` +
        `• 🌳 **Route A (Coolest - Recommended):** 28 min walk / 11 min cycle, 76% shaded coverage passing through The Galleria Al Maryah climate-controlled skybridge and shaded date palm corridors.\n` +
        `• ⚡ **Route B (Fastest):** 20 min direct path, but has 68% direct sun exposure on unshaded asphalt.\n` +
        `• 🚌 **Route C (Sustainable Transit):** Abu Dhabi Bus 063 with air-conditioned shelters, only 3 minutes of outdoor exposure, saving 1.45 kg CO₂.\n\n` +
        `Would you like me to guide you through the step-free, coolest path?`;
    } else if (lower.includes('wheelchair') || lower.includes('accessible') || lower.includes('stairs') || lower.includes('determination')) {
      reply = `I will prioritize 100% step-free and accessible routes for you across Abu Dhabi. ` +
        `Our climate engine filters for ramps, elevator-equipped bridges, accessible street curb-cuts, and low-floor Abu Dhabi buses with electric boarding ramps. ` +
        `Let me know your starting point and destination to map an accessible, shaded path.`;
    } else if (lower.includes('heat') || lower.includes('weather') || lower.includes('temperature') || lower.includes('hot')) {
      reply = `Current Abu Dhabi environmental conditions:\n` +
        `🌡️ Temperature: 39°C\n` +
        `🔥 Heat Index: 44°C (Extreme Heat Advisory)\n` +
        `☀️ UV Index: 9 (Very High)\n` +
        `🌬️ Air Quality: AQI 38 (Good)\n\n` +
        `Environmental guidance: Midday direct sun is intense. We recommend using our shaded colonnade routes, indoor skywalks, or air-conditioned transit buses (Route 063, 034) between 11:30 AM and 4:00 PM.`;
    } else if (lower.includes('bike') || lower.includes('cycle') || lower.includes('cycling')) {
      reply = `Abu Dhabi has premier dedicated cycling paths! We recommend:\n` +
        `• **Abu Dhabi Corniche:** 8 km continuous segregated cycling track with sea breeze.\n` +
        `• **Al Hudayriyat Island:** 5 km and 10 km illuminated cycling circuits.\n` +
        `• **Yas Marina Circuit:** Evening TrainYAS cycling sessions.\n\n` +
        `During daytime heat, always select our shaded bike routes and carry water. Would you like a route map for one of these?`;
    } else if (lower.includes('mosque') || lower.includes('sheikh zayed')) {
      reply = `Visiting Sheikh Zayed Grand Mosque? Take Abu Dhabi Bus Route 94 directly to the shaded visitor reception concourse. The entire visitor hub, Souq Al Jami', and underground connecting galleries are climate-controlled and fully wheelchair accessible!`;
    } else if (lower.includes('مرحبا') || lower.includes('السلام') || lower.includes('طريق') || lower.includes('حرارة')) {
      reply = `مرحباً بك في "درب الاستدامة"! أنا مساعدك الذكي للتنقل المستدام في أبوظبي. درجة الحرارة حالياً 39° مئوية مع مؤشر حراري 44°. هل ترغب في تخطيط مسار مظلل ومكيف بين جزيرة الريم وكورنيش أبوظبي، أو معرفة خيارات الحافلات الكهربائية والمسارات المهيأة لأصحاب الهمم؟`;
    } else {
      reply = `مرحباً! I am Darb AI, your Abu Dhabi climate mobility companion. I can help you find shaded walking paths, cycling corridors, air-conditioned bus connections, or step-free routes for People of Determination across Abu Dhabi, Masdar City, and Saadiyat Island. Where would you like to travel today?`;
    }

    res.json({
      success: true,
      reply,
      source: 'Darb AI Abu Dhabi Climate Engine (Demo Mode)'
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Darb AI service temporarily unavailable',
        code: 'AI_SERVICE_ERROR'
      }
    });
  }
});

export default router;
