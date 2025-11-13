"use client";

import { useState } from "react";
import { Film, Sparkles, Copy, CheckCircle2, Loader2 } from "lucide-react";

interface VideoPrompt {
  title: string;
  oneLine: string;
  mood: string;
  style: string;
  scenes: Scene[];
  fullPrompt: string;
  voiceover?: string;
  dialogue?: string;
  thumbnail?: string;
  tags?: string[];
  musicStyle?: string;
}

interface Scene {
  number: number;
  setting: string;
  cameraAngle: string;
  cameraMovement: string;
  actions: string;
  lighting: string;
  colors: string;
  atmosphere: string;
  objects: string;
}

export default function Home() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VideoPrompt | null>(null);
  const [includeOptionals, setIncludeOptionals] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const generatePrompt = async () => {
    if (!idea.trim()) return;

    setLoading(true);

    // Simulate AI generation with sophisticated prompt creation
    await new Promise(resolve => setTimeout(resolve, 2000));

    const generatedPrompt = createCinematicPrompt(idea, includeOptionals);
    setResult(generatedPrompt);
    setLoading(false);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const createCinematicPrompt = (userIdea: string, withOptionals: boolean): VideoPrompt => {
    // Parse the idea and create a cinematic prompt structure
    const basePrompt: VideoPrompt = {
      title: `Cinematic ${userIdea}`,
      oneLine: `A cinematic exploration of ${userIdea}`,
      mood: "Dramatic and emotional",
      style: "Cinematic, high contrast, moody",
      scenes: [
        {
          number: 1,
          setting: "Opening wide shot of the main environment",
          cameraAngle: "Wide establishing shot, slightly elevated",
          cameraMovement: "Slow dolly forward",
          actions: "Scene comes to life, subtle movements",
          lighting: "Golden hour, warm and soft",
          colors: "Rich oranges, deep blues, warm browns",
          atmosphere: "Mysterious yet inviting",
          objects: "Key elements that define the concept"
        },
        {
          number: 2,
          setting: "Close-up intimate moment",
          cameraAngle: "Medium close-up at eye level",
          cameraMovement: "Gentle push in",
          actions: "Subject reveals emotion, detailed interaction",
          lighting: "Soft side lighting, dramatic shadows",
          colors: "Muted tones with pops of color",
          atmosphere: "Intimate and personal",
          objects: "Props that tell the story"
        },
        {
          number: 3,
          setting: "Dynamic action sequence",
          cameraAngle: "Low angle looking up",
          cameraMovement: "Sweeping arc, following motion",
          actions: "Energetic movement, peak moment",
          lighting: "High contrast, dramatic beams of light",
          colors: "Bold primaries, deep shadows",
          atmosphere: "Intense and powerful",
          objects: "Elements in motion"
        },
        {
          number: 4,
          setting: "Resolution and final impact",
          cameraAngle: "Pull back to wide shot",
          cameraMovement: "Slow crane up and away",
          actions: "Final revelation, contemplative moment",
          lighting: "Soft diffused light, ethereal",
          colors: "Harmonious palette, balanced",
          atmosphere: "Reflective and complete",
          objects: "Full scene composition"
        }
      ],
      fullPrompt: `A cinematic video about ${userIdea}.

Scene 1: Opening shot pulls slowly into a wide view of the environment, bathed in golden hour light. The camera glides forward with purpose. Warm oranges and deep blues create depth. Atmosphere is mysterious and inviting. Every element is carefully composed.

Scene 2: Cut to intimate close-up. Soft side lighting sculpts the subject. Camera gently pushes in as emotion builds. Muted tones with strategic color accents. The mood is personal and raw. Details matter here.

Scene 3: Energy explodes. Low angle shot looks up dramatically. Camera sweeps in a bold arc, following the action. High contrast lighting with beams cutting through. Bold colors and deep shadows clash beautifully. The intensity peaks.

Scene 4: Resolution arrives. Camera cranes slowly up and away, revealing the full picture. Soft ethereal light bathes everything. Colors harmonize. The atmosphere is reflective. We understand the journey.

Style: Cinematic composition, dramatic lighting, smooth camera movements. High production value. Emotional resonance. Every frame is intentional. The story is clear without words. Mood ranges from mystery to intensity to reflection. Color grading is professional. Pacing is deliberate. Impact is powerful.`
    };

    if (withOptionals) {
      basePrompt.voiceover = `In a world of ${userIdea}, we discover that the smallest moments carry the greatest weight. Watch as the story unfolds through light, shadow, and emotion.`;
      basePrompt.dialogue = "[Minimal, impactful lines that enhance rather than explain]";
      basePrompt.thumbnail = `Close-up hero shot from scene 2, high contrast, dramatic lighting, bold composition. Subject in focus with cinematic bokeh. Colors: rich and saturated. Text overlay: "${userIdea.toUpperCase()}" in bold modern font.`;
      basePrompt.tags = ["cinematic", "emotional", "dramatic", "storytelling", "visual art", userIdea.toLowerCase()];
      basePrompt.musicStyle = "Orchestral build with electronic undertones. Starts minimal and sparse, builds to emotional peak, resolves with contemplative piano. Tempo: 85-95 BPM. Mood: Epic yet intimate.";
    }

    return basePrompt;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Film className="w-8 h-8 text-purple-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Cinematic Prompt Generator
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Input Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 mb-8">
          <div className="flex items-start gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-500 mt-1" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">Your Video Idea</h2>
              <p className="text-gray-400 text-sm mb-4">
                Describe your concept in a few words or sentences
              </p>
            </div>
          </div>

          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="E.g., A lone astronaut discovering ancient ruins on Mars, A chef creating art through cooking, Time-lapse of a city transforming through seasons..."
            className="w-full h-32 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />

          <div className="flex items-center gap-4 mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeOptionals}
                onChange={(e) => setIncludeOptionals(e.target.checked)}
                className="w-4 h-4 accent-purple-500"
              />
              <span className="text-sm text-gray-300">Include optional add-ons (voiceover, music, tags)</span>
            </label>
          </div>

          <button
            onClick={generatePrompt}
            disabled={!idea.trim() || loading}
            className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Cinematic Prompt...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Cinematic Prompt
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            {/* Video Concept */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">Video Concept</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">Title</h3>
                  <p className="text-white">{result.title}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">One-Line Idea</h3>
                  <p className="text-white">{result.oneLine}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-300 mb-2">Mood & Emotion</h3>
                    <p className="text-white">{result.mood}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-300 mb-2">Style</h3>
                    <p className="text-white">{result.style}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scene Breakdown */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">Scene Breakdown</h2>
              <div className="space-y-6">
                {result.scenes.map((scene) => (
                  <div key={scene.number} className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold mb-4 text-pink-400">Scene {scene.number}</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400 font-semibold">Setting:</span>
                        <p className="text-white mt-1">{scene.setting}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 font-semibold">Camera Angle:</span>
                        <p className="text-white mt-1">{scene.cameraAngle}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 font-semibold">Camera Movement:</span>
                        <p className="text-white mt-1">{scene.cameraMovement}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 font-semibold">Actions:</span>
                        <p className="text-white mt-1">{scene.actions}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 font-semibold">Lighting:</span>
                        <p className="text-white mt-1">{scene.lighting}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 font-semibold">Colors:</span>
                        <p className="text-white mt-1">{scene.colors}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 font-semibold">Atmosphere:</span>
                        <p className="text-white mt-1">{scene.atmosphere}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 font-semibold">Objects:</span>
                        <p className="text-white mt-1">{scene.objects}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Prompt */}
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-purple-300">Full Text-to-Video Prompt</h2>
                <button
                  onClick={() => copyToClipboard(result.fullPrompt, "full-prompt")}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {copied === "full-prompt" ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="bg-black/50 rounded-lg p-6 text-white whitespace-pre-wrap font-mono text-sm leading-relaxed">
                {result.fullPrompt}
              </div>
            </div>

            {/* Optional Add-ons */}
            {includeOptionals && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold mb-6 text-purple-400">Optional Add-ons</h2>
                <div className="space-y-6">
                  {result.voiceover && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-300">Voiceover Script</h3>
                        <button
                          onClick={() => copyToClipboard(result.voiceover!, "voiceover")}
                          className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
                        >
                          {copied === "voiceover" ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      <p className="text-white bg-gray-900/50 p-4 rounded-lg">{result.voiceover}</p>
                    </div>
                  )}

                  {result.dialogue && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-300 mb-2">Dialogue Notes</h3>
                      <p className="text-white bg-gray-900/50 p-4 rounded-lg">{result.dialogue}</p>
                    </div>
                  )}

                  {result.thumbnail && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-300">Thumbnail Prompt</h3>
                        <button
                          onClick={() => copyToClipboard(result.thumbnail!, "thumbnail")}
                          className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
                        >
                          {copied === "thumbnail" ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      <p className="text-white bg-gray-900/50 p-4 rounded-lg">{result.thumbnail}</p>
                    </div>
                  )}

                  {result.tags && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-300 mb-2">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {result.tags.map((tag, idx) => (
                          <span key={idx} className="bg-purple-600/30 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.musicStyle && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-300 mb-2">Music Style & Sound</h3>
                      <p className="text-white bg-gray-900/50 p-4 rounded-lg">{result.musicStyle}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Info Footer */}
        {!result && (
          <div className="text-center text-gray-500 mt-12">
            <p>Enter your video idea above to generate a professional cinematic prompt</p>
          </div>
        )}
      </main>
    </div>
  );
}
