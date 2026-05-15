/**
 * DEEPFENSE.ONLINE — Common Type Definitions
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

export type PageType = "HOME" | "TOOLS" | "CHALLENGE" | "AI_PROJECT" | "ABOUT_CONTACT" | "ADMIN";
export type Language = "vi" | "en";
export type Season = "SPRING" | "SUMMER" | "AUTUMN" | "WINTER" | "NORMAL";

export interface PersonalityQuestion {
  id: string;
  text: string;
  trait: "CONFIDENCE" | "ANXIETY" | "SKEPTICISM" | "AWARENESS";
}
