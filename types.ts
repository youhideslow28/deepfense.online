
export type PageType = "HOME" | "TOOLS" | "CHALLENGE" | "AI_PROJECT" | "ABOUT_CONTACT";
export type Language = "vi" | "en";
export type Season = "SPRING" | "SUMMER" | "AUTUMN" | "WINTER" | "NORMAL";

export interface LevelData {
  id: string;
  title: string;
  difficulty: string;
  desc: string;
  hint: string;
  fake_pos: 1 | 2;
  advice: string;
  video_url: string;
}

export interface EnhancedLevelData extends LevelData {
  technical_flaws: {
    feature: string;
    real_behavior: string;
    ai_error: string;
  }[];
}

export interface GameState {
  levels: LevelData[];
  current: number;
  score: number;
  wrong_count: number;
  wrong_topics: string[];
  finished: boolean;
  show_result: boolean;
  last_correct: boolean | null;
}

export interface PersonalityQuestion {
  id: string;
  text: string;
  trait: "CONFIDENCE" | "ANXIETY" | "SKEPTICISM" | "AWARENESS";
}

export interface ChecklistItem {
  category: string;
  items: string[];
}

export interface NewsItem {
  tag: string;
  title: string;
  date: string;
  loss: string;
  desc: string;
  url: string;
}

export interface FunFact {
    title: string;
    content: string;
}
