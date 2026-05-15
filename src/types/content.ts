/**
 * DEEPFENSE.ONLINE — Content & Data Structure Types
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

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
