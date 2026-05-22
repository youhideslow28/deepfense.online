export const VISUAL_ASSET_KIT_RESOURCE = '/academy/basics/resources/deepfense-basic-visual-asset-prompt-kit-v1.md';

export const VISUAL_ASSET_STYLE_GUIDE = {
  requiredStyle:
    'anime/comic cinematic style, clean line art, soft expressive lighting, modern Vietnamese everyday setting, friendly educational tone, 16:9 or transparent sticker composition, no readable text, no logos, no watermark imitation',
  anCharacter:
    'An, a Vietnamese male young adult aged 21-24, slim-average build, warm light-medium skin, short slightly messy black hair with a soft side part, brown eyes, clean-shaven, gentle thoughtful face, wearing a dark navy lightweight jacket over an off-white T-shirt, modern everyday style, holding a dark-cased smartphone, ordinary internet user, curious and cautious.',
  negativePrompt:
    'Avoid photorealistic real-person likeness, celebrity likeness, distorted face, inconsistent outfit, malformed hands, readable text, logos, watermark imitation, explicit imagery, realistic victim imagery, phishing instructions, hacker stereotype, dark horror mood, or oversexualized character.',
};

export const VISUAL_ASSET_GROUPS = [
  {
    label: 'Companion images',
    purpose: 'Dùng cho course home, màn chào, giải thích khái niệm và trạng thái bảo vệ cộng đồng.',
    items: [
      {
        id: 'IMG_COMPANION_01',
        title: 'An Welcomes Learner',
        format: '16:9 image',
        placement: 'Course Home',
        prompt:
          'An stands in a modern Vietnamese bedroom or study corner at night, holding a smartphone and gently welcoming the learner into a deepfake awareness course. The mood is calm, friendly, and educational.',
      },
      {
        id: 'IMG_COMPANION_02',
        title: 'An Thinking',
        format: '16:9 image',
        placement: 'Reflection blocks',
        prompt:
          'An pauses before reacting to a suspicious phone notification, one hand near his chin, eyes thoughtful, with blurred abstract warning shapes on the phone screen.',
      },
      {
        id: 'IMG_COMPANION_03',
        title: 'An Explains',
        format: '16:9 image',
        placement: 'Lesson explanations',
        prompt:
          'An explains a simple safety idea beside floating abstract cards representing video, audio, message, source, and decision. No readable text inside the image.',
      },
      {
        id: 'IMG_COMPANION_04',
        title: 'An Protects Community',
        format: '16:9 image',
        placement: 'Completion and recap',
        prompt:
          'An chooses not to forward a harmful suspicious post, with soft protective light around a small online community represented by abstract avatars.',
      },
    ],
  },
  {
    label: 'Module illustrations',
    purpose: 'Dùng làm ảnh đầu bài cho Module 0-6 trong DEEPFENSE BASIC.',
    items: [
      { id: 'DFB_ILL_M0_01', title: 'A Normal Digital Day', format: '16:9 image', placement: 'Module 0', prompt: 'A day-in-the-life scene showing phone notifications, social feed, group chat, video call, and An calmly noticing risk signals.' },
      { id: 'DFB_ILL_M1_01', title: 'Media Layers', format: '16:9 image', placement: 'Module 1', prompt: 'Layered visual metaphor of image, video, audio, caption, and source context, arranged clearly like learning cards around An.' },
      { id: 'DFB_ILL_M2_01', title: 'Four Emotion Triggers', format: '16:9 image', placement: 'Module 2', prompt: 'Four abstract emotion triggers around a phone: urgency, fear, shame, and greed, with An taking a calm pause.' },
      { id: 'DFB_ILL_M3_01', title: 'Three-Layer Observation', format: '16:9 image', placement: 'Module 3', prompt: 'Three observation layers: visual details, audio clues, and context behavior, shown as transparent panels in front of An.' },
      { id: 'DFB_ILL_M4_01', title: 'Deepfense Check Path', format: '16:9 image', placement: 'Module 4', prompt: 'A clean path of five safety steps: pause, observe, verify, trace, decide, represented by icons only without readable text.' },
      { id: 'DFB_ILL_M5_01', title: 'Everyday Risk Map', format: '16:9 image', placement: 'Module 5', prompt: 'Everyday online risk situations around school, family, finance, social media, and work, shown as safe abstract vignettes.' },
      { id: 'DFB_ILL_M6_01', title: 'Deepfense Shield', format: '16:9 image', placement: 'Module 6', prompt: 'An holding a symbolic shield made of calm decisions, evidence cards, reporting, and community care, friendly and hopeful.' },
    ],
  },
  {
    label: 'GIF loops',
    purpose: 'Dùng cho micro-interaction, loading, quiz pause và recap ngắn.',
    items: [
      { id: 'AN_GIF_01', title: 'Pause Breath Loop', format: '3-4s loop', placement: 'Risky decision questions', prompt: 'An takes a slow breath, phone lowers slightly, soft light pulse indicates pausing before action.' },
      { id: 'AN_GIF_02', title: 'Verify Call Loop', format: '3-4s loop', placement: 'Verification tips', prompt: 'An switches from suspicious message to a separate trusted contact channel, motion is subtle and instructional.' },
      { id: 'AN_GIF_03', title: 'Observation Scan Loop', format: '3-4s loop', placement: 'Module 3 practice', prompt: 'An scans an abstract media card while gentle highlight rings move across visual, audio, and context clues.' },
      { id: 'AN_GIF_04', title: 'Evidence Cards Loop', format: '3-4s loop', placement: 'Capstone/lab screens', prompt: 'Evidence cards slide into an organized stack: source, time, sender, request, independent check.' },
      { id: 'AN_GIF_05', title: 'No Share Loop', format: '3-4s loop', placement: 'Sensitive-content harm reduction', prompt: 'An moves a finger away from a share button; the harmful thumbnail remains blurred and abstract.' },
    ],
  },
  {
    label: 'Stickers and feedback',
    purpose: 'Dùng cho phản hồi quiz, trạng thái hoàn thành, cảnh báo nhẹ và động viên người học.',
    items: [
      { id: 'AN_STICKER_01', title: 'Pause', format: 'transparent PNG', placement: 'Pause moment', prompt: 'An raises one hand gently to signal pause, friendly expression, transparent sticker composition.' },
      { id: 'AN_STICKER_03', title: 'Verify', format: 'transparent PNG', placement: 'Verification tip', prompt: 'An points at a simple check icon and phone, calm and confident, no readable text.' },
      { id: 'AN_STICKER_04', title: 'Do Not Share', format: 'transparent PNG', placement: 'Sensitive content', prompt: 'An protects a blurred abstract thumbnail with a respectful no-share gesture, no victim imagery.' },
      { id: 'AN_STICKER_06', title: 'Good Job', format: 'transparent PNG', placement: 'Correct answer', prompt: 'An smiles and gives an encouraging thumbs-up, clean educational sticker style.' },
      { id: 'DFB_FEEDBACK_WARNING_01', title: 'High Risk', format: '16:9 image', placement: 'High-risk answer feedback', prompt: 'An notices red warning shapes around a blurred phone screen, expression serious but supportive.' },
      { id: 'DFB_FEEDBACK_COMPLETE_01', title: 'Module Complete', format: '16:9 image', placement: 'Module completion', prompt: 'An finishes a learning module with calm confidence, soft celebratory light, no confetti text or logos.' },
    ],
  },
  {
    label: 'Checklist cards',
    purpose: 'Dùng làm thẻ ghi nhớ trong bài học, recap cuối module và social snippet.',
    items: [
      { id: 'DFB_CARD_01', title: 'Deepfense Check Card', format: 'icon card', placement: 'Module 4 recap', prompt: 'A clean icon-only checklist card for the five Deepfense Check steps, no readable text inside image.' },
      { id: 'DFB_CARD_02', title: 'Three-Layer Observation Card', format: 'icon card', placement: 'Module 3 recap', prompt: 'Three icon layers representing visual, audio, and context observation, clean UI card style.' },
      { id: 'DFB_CARD_03', title: 'Deepfense Shield Card', format: 'icon card', placement: 'Final recap', prompt: 'A symbolic shield made from safe actions: verify, report, ask, do not share, preserve evidence.' },
      { id: 'DFB_CARD_04', title: 'Money Safety Card', format: 'icon card', placement: 'Finance scenarios', prompt: 'Phone, bank card, lock, and trusted call-back icon composition for money-safety learning.' },
      { id: 'DFB_CARD_05', title: 'Sensitive Content Harm Reduction Card', format: 'icon card', placement: 'Sensitive-content scenarios', prompt: 'Respectful harm-reduction icon card: blur, stop sharing, report, seek trusted support, no explicit imagery.' },
    ],
  },
];
