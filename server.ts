import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Initialize Gemini AI Client lazily or safely on server
  let aiClient: GoogleGenAI | null = null;
  function getAi() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not configured in environment secrets.");
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // API Endpoint: Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "Safe Space Renovation Trust Engine" });
  });

  // API Endpoint: AI Renovation Assistant & Risk Analyzer (Gemini API)
  app.post("/api/ai-assistant", async (req, res) => {
    try {
      const { mode, payload } = req.body;
      const ai = getAi();

      if (mode === "analyze-quote") {
        const { quoteText, budget, propertyType } = payload;
        const prompt = `You are SafeSpace AI, Singapore's expert renovation quote auditor and consumer advocate.
Analyze this renovation quotation for a ${propertyType || "Singapore HDB/Condo"} with a target budget of S$${budget || "50,000"}.

Quotation text / line items:
"${quoteText}"

Please evaluate and return a clean JSON object with:
1. "riskScore": A number from 0 (very low risk) to 100 (high risk)
2. "riskSummary": Concise paragraph explaining overall assessment
3. "redFlags": Array of string warnings (e.g. missing hacking permit items, vague carpentry material descriptions like 'quality plywood' without laminate thickness, excessive deposit upfront >20%, unbundled electrical points, lack of timeline / liquidated damages clause)
4. "missingEssentialItems": Array of missing essential renovation items (e.g., haulage/debris removal, floor protection, chemical wash, plumbing submission fees)
5. "recommendedQuestions": Array of 3-5 specific, tough questions the homeowner MUST ask the contractor before signing.
6. "estimatedSavingsPotential": String estimate of potential savings or avoided hidden costs (e.g. "S$2,500 - S$5,000").

Respond ONLY in valid JSON format matching this schema without markdown codeblocks around it if possible, or clean standard JSON.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
          },
        });

        const text = response.text || "{}";
        const parsed = JSON.parse(text);
        return res.json({ success: true, data: parsed });
      }

      if (mode === "company-summary") {
        const { companyName, uen, acraYears, caseTrust, hdbRegistered, rating, reviewsCount } = payload;
        const prompt = `You are SafeSpace AI, a Singapore renovation industry intelligence advisor.
Generate a concise, objective diligence report for the interior design / contracting firm:
- Name: ${companyName}
- UEN: ${uen}
- Operating History: ${acraYears} years
- CaseTrust Accredited: ${caseTrust ? "Yes" : "No"}
- HDB Registered Renovation Contractor: ${hdbRegistered ? "Yes" : "No"}
- Customer Rating: ${rating}/5.0 (${reviewsCount} verified reviews)

Provide:
1. "overview": Brief summary of the firm's standing in Singapore
2. "keyStrengths": Array of 3 bullet points
3. "watchouts": Array of 2-3 caution points (e.g., check sub-contractor warranties, confirm CaseTrust deposit protection insurance policy number, verify director history)
4. "accreditationExplanation": Plain English explanation of what their specific accreditations mean for homeowner protection.

Respond in clean JSON format.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
          },
        });

        const text = response.text || "{}";
        const parsed = JSON.parse(text);
        return res.json({ success: true, data: parsed });
      }

      if (mode === "chat") {
        const { query, conversationHistory } = payload;
        const systemInstruction = `You are SafeSpace AI, Singapore's premier renovation advisor and consumer rights advocate.
You provide helpful, authoritative, objective advice on Singapore renovation topics:
- HDB renovation rules, fire safety, load-bearing wall restrictions, window bca rules
- CaseTrust deposit performance guarantee scheme (100% deposit protection up to S$50k via insurance/escrow)
- ACRA business profile checks & director red flags
- Small Claims Tribunal (SCT) process & mediation via Singapore Mediation Centre / Society of Project Managers
- Budget allocation guidelines (Carpentry ~30%, Hacking & Masonry ~25%, Electrical ~15%, Painting/Cleaning ~10%, Contingency 10-15%)
- Comparing contractor vs interior designer roles
Keep answers concise, direct, professional, friendly, and tailored to Singapore homeowners (HDB BTO, Resale, Condo, Landed).`;

        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: query,
          config: {
            systemInstruction,
          },
        });

        return res.json({ success: true, text: response.text });
      }

      return res.status(400).json({ error: "Invalid mode parameter" });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      return res.status(500).json({
        error: "Failed to generate AI response",
        details: err?.message || "Internal server error",
      });
    }
  });

  // API Endpoint: Live ACRA / HDB Lookup Simulation & Search
  app.get("/api/verify-acra", (req, res) => {
    const uen = (req.query.uen as string || "").toUpperCase().trim();
    if (!uen) {
      return res.status(400).json({ error: "UEN query parameter is required" });
    }

    // Return structured ACRA status
    const isMockValid = uen.length >= 8;
    res.json({
      uen,
      entityName: isMockValid ? `VERIFIED ID FIRM (SINGAPORE) PTE. LTD.` : "NOT FOUND",
      registrationDate: "2018-04-12",
      entityType: "EXEMPT PRIVATE COMPANY LIMITED BY SHARES",
      status: isMockValid ? "LIVE" : "CANCELLED / UNREGISTERED",
      paidUpCapitalSGD: 250000,
      registeredAddress: "10 Anson Road #22-03 International Plaza, Singapore 079903",
      primaryActivity: "INTERIOR DESIGN SERVICES (74101) & GENERAL CONTRACTORS (41001)",
      hdbRegistered: true,
      caseTrustAccredited: true,
      bcaGrade: "L1 (Interior Decoration & Finishing)",
      courtJudgmentsCount: 0,
    });
  });

  // Vite development / production static serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Safe Space server running at http://localhost:${PORT}`);
  });
}

startServer();
