/**
 * DEEPFENSE.ONLINE — Game & Challenge Type Definitions
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

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
