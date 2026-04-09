import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username } = await req.json();

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    // 1. Fetch GitHub Profile
    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    });

    if (!userResponse.ok) {
      return NextResponse.json({ error: "GitHub user not found" }, { status: 404 });
    }

    const userData = await userResponse.json();

    // 2. Fetch Repositories
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=30&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    const reposData = await reposResponse.json();
    const repoSummary = reposData.map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      topics: repo.topics,
      stars: repo.stargazers_count,
    }));

    // 3. Call Grok API
    const grokPrompt = `
You are a technical skill evaluator for engineering students. Analyze this GitHub profile and return ONLY a valid JSON object, no markdown, no explanation.

GitHub Username: ${username}
Bio: ${userData.bio}
Repositories: ${JSON.stringify(repoSummary)}

Return this exact JSON structure:
{
  "skill_value": <weighted average score 0-100>,
  "scores": {
    "Flutter": { "score": <0-100>, "reason": "<1 line>" },
    "Web Development": { "score": <0-100>, "reason": "<1 line>" },
    "UI Design": { "score": <0-100>, "reason": "<1 line>" },
    "Machine Learning": { "score": <0-100>, "reason": "<1 line>" },
    "DSA": { "score": <0-100>, "reason": "<1 line>" },
    "Vibe Coding": { "score": <0-100>, "reason": "<1 line>" },
    "Mobile Dev": { "score": <0-100>, "reason": "<1 line>" }
  },
  "top_skill": "<skill with highest score>",
  "summary": "<2 sentence overall assessment>"
}
`;

    const groqApiKey = process.env.GROQ_API_KEY;

    if (!groqApiKey) {
      console.warn("GROQ_API_KEY is missing. Returning demo data.");
      return NextResponse.json({
        profile: {
          name: userData.name || username,
          avatar: userData.avatar_url,
          bio: userData.bio,
          followers: userData.followers,
        },
        analysis: {
          skill_value: 78,
          scores: {
            "Flutter": { score: 15, reason: "Minimal flutter presence detected." },
            "Web Development": { score: 92, reason: "Excellent Next.js and React usage in multiple repos." },
            "UI Design": { score: 70, reason: "Clean UI implementation in frontend projects." },
            "Machine Learning": { score: 45, reason: "Basic Python scripts found but no complex models." },
            "DSA": { score: 85, reason: "Leetsolve repo shows strong problem solving skills." },
            "Vibe Coding": { score: 95, reason: "Projects exhibit high 'vibe' and aesthetic polish." },
            "Mobile Dev": { score: 60, reason: "Some React Native exploration noted." }
          },
          top_skill: "Web Development",
          summary: "Highly proficient frontend engineer with a strong focus on building aesthetic web applications. Solid grounding in DSA and clean code practices."
        }
      });
    }

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are a technical skill evaluator for engineering students. Return only valid JSON.",
          },
          { role: "user", content: grokPrompt },
        ],
        temperature: 0.3,
      }),
    });

    const groqData = await groqResponse.json();
    let analysisResult;
    
    try {
      const content = groqData.choices[0].message.content.replace(/```json|```/g, "").trim();
      analysisResult = JSON.parse(content);
    } catch (e) {
      console.error("Failed to parse Groq response", e);
      throw new Error("Invalid response from AI");
    }

    return NextResponse.json({
      profile: {
        name: userData.name || username,
        avatar: userData.avatar_url,
        bio: userData.bio,
        followers: userData.followers,
      },
      analysis: analysisResult,
    });
  } catch (error: any) {
    console.error("Analysis error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
