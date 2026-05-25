const root = '/academy/basics/visual-assets';

export const visualAssetManifest = {
  courseHome: {
    hero: `${root}/session-01-course-home/IMG_COMPANION_01_an_welcomes_learner.png.png`,
    context: `${root}/session-01-course-home/DFB_ILL_M0_01_normal_digital_day.png.png`,
    pauseLoop: `${root}/session-01-course-home/AN_GIF_breathe_pause_01.mp4.png`,
    sticker: `${root}/session-01-course-home/AN_STICKER_start_calm_01.png.png`,
    checklist: `${root}/session-01-course-home/05-checklist-card.png`,
  },
  moduleHeaders: {
    normalDigitalDay: `${root}/session-02/DFB_ILL_M0_01_normal_digital_day.png.png`,
    mediaLayers: `${root}/session-02/DFB_ILL_M1_01_media_layers.png.png`,
    emotionTriggers: `${root}/session-02/DFB_ILL_M2_01_four_emotion_triggers.png.png`,
    observation: `${root}/session-02/DFB_ILL_M3_01_three_layer_observation.png.png`,
    deepfenseCheck: `${root}/session-02/DFB_ILL_M4_01_deepfense_check_path.png.png`,
    riskMap: `${root}/session-02/DFB_ILL_M5_01_everyday_risk_map.png.png`,
    shield: `${root}/session-02/DFB_ILL_M6_01_deepfense_shield.png.png`,
  },
  lessonSupport: {
    thinking: `${root}/session-03/IMG_COMPANION_02_an_thinking_before_reacting.png.png`,
    explains: `${root}/session-03/IMG_COMPANION_03_an_explains_media_layers.png.png`,
    observationCard: `${root}/session-03/DFB_CARD_02_three_layer_observation_card.png.png`,
    checkCard: `${root}/session-03/DFB_CARD_01_deepfense_check_card.png.png`,
    moneySafety: `${root}/session-03/DFB_CARD_04_money_safety_card.png.png`,
    sensitiveContent: `${root}/session-03/DFB_CARD_05_sensitive_content_harm_reduction_card.png.png`,
    evidenceFirst: `${root}/session-03/DFB_ILL_evidence_first_mini.png.png`,
    trustedPerson: `${root}/session-03/IMG_COMPANION_ask_trusted_person.png.png`,
  },
  quizFeedback: {
    correct: `${root}/session-04/DFB_FEEDBACK_CORRECT_01_safe_choice.png.png`,
    retry: `${root}/session-04/DFB_FEEDBACK_RETRY_01_try_again_carefully.png.png`,
    warning: `${root}/session-04/DFB_FEEDBACK_WARNING_01_high_risk.png.png`,
    complete: `${root}/session-04/DFB_FEEDBACK_COMPLETE_01_module_complete.png.png`,
    dpfBadge: `${root}/session-04/DFB_BADGE_DPF_reward_coin.png.png`,
  },
  practice: {
    familyCall: `${root}/session-05/DFB_SCENARIO_family_video_call_suspicious.png.png`,
    investment: `${root}/session-05/DFB_SCENARIO_fake_investment_video.png.png`,
    sensitiveGroup: `${root}/session-05/DFB_SCENARIO_group_chat_sensitive_risk.png.png`,
    loanMessage: `${root}/session-05/DFB_SCENARIO_suspicious_loan_message.png.png`,
    caseBoard: `${root}/session-05/DFB_SCENARIO_case_file_board.png.png`,
    riskSorting: `${root}/session-05/DFB_MINIGAME_risk_sorting_background.png.png`,
  },
  website: {
    hero: `${root}/session-07-website-home-marketing/01-main-hero/WEB_HERO_deepfake_defense_main.png`,
    academy: `${root}/session-07-website-home-marketing/02-feature-sections/WEB_FEATURE_academy_training.png`,
    tools: `${root}/session-07-website-home-marketing/02-feature-sections/WEB_FEATURE_risk_scan_tools.png`,
    aiProject: `${root}/session-07-website-home-marketing/02-feature-sections/WEB_FEATURE_ai_project_research.png`,
    about: `${root}/session-07-website-home-marketing/03-about-contact/WEB_ABOUT_deepfense_mission.png`,
    contact: `${root}/session-07-website-home-marketing/03-about-contact/WEB_CONTACT_support_visual.png`,
    auth: `${root}/session-07-website-home-marketing/04-auth-admin/WEB_AUTH_profile_setup_visual.png`,
    admin: `${root}/session-07-website-home-marketing/04-auth-admin/WEB_ADMIN_control_dashboard_visual.png`,
    footer: `${root}/session-07-website-home-marketing/05-footer-og/WEB_FOOTER_brand_visual_strip.png`,
    openGraph: `${root}/session-07-website-home-marketing/05-footer-og/WEB_OG_deepfense_share_preview.png`,
  },
} as const;

export type VisualAssetManifest = typeof visualAssetManifest;
