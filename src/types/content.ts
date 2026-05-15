/**
 * DEEPFENSE.ONLINE â€” Content & Data Structure Types
 * @copyright 2025 H? Xuân Nguy?n & VKU Project Team
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
