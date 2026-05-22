# DEEPFENSE BASIC - Visual Asset Prompt Kit v1

## 1. Purpose

This kit provides prompts for supporting visual assets across DEEPFENSE BASIC:

- Lesson illustration images.
- Short GIF-style loops.
- Sticker/reaction assets.
- Checklist/icon cards.
- UI companion visuals where An guides the learner.

This file complements:

- `DEEPFENSE_BASIC_Character_An_Bible_v1.md`
- `DEEPFENSE_BASIC_Prompt_Flow_Bible_v1.md`

Use this kit when you need extra visuals for the website, quiz feedback, lesson sections, recap screens, loading moments, achievement states, and social snippets.

## 2. Global Rules

### Required Style

```text
anime/comic cinematic style, clean line art, soft expressive lighting, modern Vietnamese everyday setting, friendly educational tone, 16:9 or transparent sticker composition, no readable text, no logos, no watermark imitation
```

### An Character Block

Use this when An appears:

```text
An, a Vietnamese male young adult aged 21-24, slim-average build, warm light-medium skin, short slightly messy black hair with a soft side part, brown eyes, clean-shaven, gentle thoughtful face, wearing a dark navy lightweight jacket over an off-white T-shirt, modern everyday style, holding a dark-cased smartphone, ordinary internet user, curious and cautious, anime/comic cinematic style, clean line art, soft expressive lighting
```

### Continuity Add-on

```text
Character continuity: same An as reference, same face proportions, same short black hair, same dark navy jacket and off-white T-shirt, same age, same calm thoughtful personality, do not change identity, do not change outfit, do not make him look like a hacker or celebrity.
```

### Global Negative Prompt

```text
Negative prompt: photorealistic real-person likeness, real celebrity likeness, distorted face, inconsistent face, changed hairstyle, changed outfit, extra fingers, malformed hands, unreadable text, random letters, fake UI text, logos, watermark imitation, explicit imagery, realistic victim imagery, gore, doxxing, phishing instructions, hacker stereotype, dark cyberpunk cave, horror mood, oversexualized character
```

### Sensitive Content Rule

For sensitive-image, harassment, school harm, or deepfake nude risk:

- Do not depict explicit or identifiable images.
- Show An's reaction, blurred abstract UI, warning shapes, and protective choices.
- Never show a victim in a humiliating pose.
- Never show readable names, faces, school names, phone numbers, addresses, bank details, or account names.

Safe fragment:

```text
phone screen shows only blurred abstract thumbnails and warning-colored UI shapes, no readable text, no explicit image, no identifiable victim, focus on An's concerned reaction and harm-reduction action
```

## 3. Production Workflow

1. Generate An reference first from `DEEPFENSE_BASIC_Character_An_Bible_v1.md`.
2. Generate one asset category at a time.
3. Use the same An reference image in GPT/Nano Banana/Gemini.
4. Approve style on 3-5 assets before scaling.
5. For GIFs, generate a still/keyframe first, then use image-to-video with 3-4 second subtle loop prompt.
6. Add all readable Vietnamese text later in web/editor, not inside the generated image.

Suggested filenames:

```text
AN_STICKER_pause_01.png
AN_STICKER_verify_01.png
AN_GIF_breathe_pause_01.mp4
DFB_ILL_M1_media_layers_01.png
DFB_CARD_deepfense_check_01.png
```

---

# 4. Core Companion Images

## IMG_COMPANION_01 - An Welcomes Learner

**Use:** Course landing, Module 0 start, empty states.

**Image prompt:**

```text
16:9 anime/comic cinematic illustration of An welcoming the learner into DEEPFENSE BASIC, standing in a bright modern Vietnamese study room, holding a dark-cased smartphone in one hand and gesturing gently with the other, friendly but not mascot-like, clean negative space on the right for overlay text, soft daylight, subtle abstract digital safety icons floating in the background without readable text. Character continuity: same An as reference, same face, same hair, same dark navy jacket and off-white T-shirt. No readable text, no logos, no watermark imitation.
```

## IMG_COMPANION_02 - An Thinking

**Use:** Reflection questions, "Before you answer" screens.

**Image prompt:**

```text
16:9 anime/comic cinematic illustration of An sitting at a desk, chin lightly resting on one hand, looking thoughtfully at a phone placed on the table, abstract question-shaped light particles around him but no readable symbols or text, calm reflective mood, warm desk lamp, clean background for overlay. Character continuity: same An as reference.
```

## IMG_COMPANION_03 - An Explains

**Use:** Concept explanation blocks.

**Image prompt:**

```text
16:9 anime/comic cinematic illustration of An explaining a digital safety idea, standing beside floating abstract cards with icons only, one card shows an eye icon, one shows a waveform, one shows a source map, no readable text, friendly instructor-like pose without looking like a teacher mascot, clean line art, soft blue-teal lighting. Character continuity: same An as reference.
```

## IMG_COMPANION_04 - An Protects Community

**Use:** Module 6, community responsibility sections.

**Image prompt:**

```text
16:9 anime/comic cinematic illustration of An standing with a small group of generic community silhouettes behind him, all in a warm modern learning space, An looks empathetic and protective, subtle teal shield-like glow connecting the group, no superhero costume, no readable text, no logos. Character continuity: same An as reference.
```

---

# 5. Module Illustration Prompts

## DFB_ILL_M0_01 - A Normal Digital Day

```text
16:9 anime/comic cinematic illustration of An's ordinary digital day shown as a soft montage: morning phone, cafe message, study desk, night call, viral clip panel, all abstract and non-readable, An centered as the learner moving through the day, calm but curious. Character continuity: same An as reference. No readable text.
```

## DFB_ILL_M1_01 - Media Layers

```text
16:9 anime/comic cinematic illustration of An viewing a phone video that separates into abstract layers: face silhouette, audio waveform, edit scissors, time/context marker, source map, no readable text, no real celebrity likeness, clean educational style. Character continuity: same An as reference.
```

## DFB_ILL_M2_01 - Four Emotion Triggers

```text
16:9 anime/comic cinematic illustration of An surrounded by four abstract emotional trigger icons: urgency clock, familiar avatar, authority badge shape, benefit coin/gift, all symbolic and without text, An takes a calm breath in the center, warm-to-cool lighting transition. Character continuity: same An as reference.
```

## DFB_ILL_M3_01 - Three-Layer Observation

```text
16:9 anime/comic cinematic illustration of An using a three-layer checklist represented by three floating icons: eye, waveform, context map, while observing a blurred phone video, analytical mood, no readable text, clean overlay area. Character continuity: same An as reference.
```

## DFB_ILL_M4_01 - Deepfense Check Path

```text
16:9 anime/comic cinematic illustration of An walking along five glowing abstract step stones, each stone has an icon only: pause hand, eye, check mark, source map, compass, no readable text, calm confident mood, soft teal and blue light. Character continuity: same An as reference.
```

## DFB_ILL_M5_01 - Everyday Risk Map

```text
16:9 anime/comic cinematic illustration of An standing before a map of everyday digital risks: finance, school chat, viral social clip, online identity, job offer, all represented by abstract panels without text, An is alert but calm, modern Vietnamese urban backdrop. Character continuity: same An as reference.
```

## DFB_ILL_M6_01 - Deepfense Shield

```text
16:9 anime/comic cinematic illustration of An holding a calm teal shield-like abstract light, with family and community silhouettes nearby, five small rule icons orbiting gently without text, warm safe lighting, hopeful course-ending tone. Character continuity: same An as reference.
```

---

# 6. GIF-Style Loop Prompts

Generate a still first, then animate as 3-4 second loop. Export as MP4/WebM or convert to GIF if needed.

## AN_GIF_01 - Pause Breath Loop

**Image prompt:**

```text
16:9 anime/comic cinematic still of An holding his phone slightly away, taking a calm breath, soft abstract notification particles frozen around him, warm-cool balanced light, no readable text. Character continuity: same An as reference.
```

**Loop prompt:**

```text
Create a seamless 3-4 second loop. An gently inhales and exhales, notification particles slow down and float softly, phone glow pulses subtly. Keep An's face, hair, outfit, and proportions identical. No readable text.
```

## AN_GIF_02 - Verify Call Loop

**Image prompt:**

```text
16:9 anime/comic cinematic still of An choosing a safe teal contact circle on his phone while an amber suspicious path fades in the background, no readable text, calm decisive expression. Character continuity: same An as reference.
```

**Loop prompt:**

```text
Create a seamless 3-4 second loop. The teal safe contact circle glows gently, the amber suspicious path dims, An's thumb hovers then settles. No readable text, no UI labels, preserve character exactly.
```

## AN_GIF_03 - Observation Scan Loop

**Image prompt:**

```text
16:9 anime/comic cinematic still of An looking at a blurred video frame with abstract highlight rings around face edge, mouth, lighting, and background, no readable text, focused analytical mood. Character continuity: same An as reference.
```

**Loop prompt:**

```text
Create a seamless 3-4 second loop. Highlight rings move slowly across the blurred video frame, An's eyes track them subtly, no text appears, preserve An exactly.
```

## AN_GIF_04 - Evidence Cards Loop

**Image prompt:**

```text
16:9 anime/comic cinematic still of An reviewing abstract evidence cards on a desk: blurred video card, audio waveform, source icon, warning icon, official check icon, no readable text, calm focused mood. Character continuity: same An as reference.
```

**Loop prompt:**

```text
Create a seamless 3-4 second loop. Abstract evidence cards gently arrange and pulse in place, An looks from one card to another, no readable text, no logos, preserve character exactly.
```

## AN_GIF_05 - No Share Loop

**Image prompt:**

```text
16:9 anime/comic cinematic still of An stopping his thumb before sharing a blurred group chat screen, warning-colored abstract shapes only, no explicit image, no identifiable victim, empathetic protective expression. Character continuity: same An as reference.
```

**Loop prompt:**

```text
Create a seamless 3-4 second loop. An's thumb pauses before the share gesture, warning shapes softly dim, his expression stays protective. No explicit content, no readable text, no identifiable victim.
```

---

# 7. Sticker Pack Prompts

Stickers should be generated as isolated character poses. Use transparent background if supported. If transparent is not supported, use plain light background and remove later in editor.

Sticker base style:

```text
transparent background sticker, anime/comic clean line art, An as reference, thick clean outline, expressive but grounded, no readable text, no logos, no watermark imitation
```

## AN_STICKER_01 - Pause

```text
Transparent background sticker of An, same character as reference, raising one hand in a gentle stop gesture while holding a dark-cased smartphone in the other hand, calm decisive expression, small abstract pause icon shape beside him without text, anime/comic clean line art, thick outline, no readable text, no logos.
```

## AN_STICKER_02 - Think First

```text
Transparent background sticker of An, same character as reference, thoughtful pose with one hand on chin and phone in the other hand, curious but cautious expression, small abstract question-light icon without text, anime/comic clean line art, thick outline, no readable text.
```

## AN_STICKER_03 - Verify

```text
Transparent background sticker of An, same character as reference, pointing to two linked safe-channel icons, calm focused expression, dark navy jacket and off-white T-shirt, anime/comic clean line art, thick outline, no readable text.
```

## AN_STICKER_04 - Do Not Share

```text
Transparent background sticker of An, same character as reference, gently covering a blurred phone screen with one hand in a protective way, empathetic expression, small shield icon shape, no explicit content, no readable text, anime/comic clean line art.
```

## AN_STICKER_05 - Evidence First

```text
Transparent background sticker of An, same character as reference, holding a generic folder with abstract evidence icons: camera frame, link chain, clock, no readable text, calm responsible expression, anime/comic clean line art.
```

## AN_STICKER_06 - Good Job

```text
Transparent background sticker of An, same character as reference, giving a small thumbs-up with a warm confident smile, subtle teal sparkle shapes, no readable text, anime/comic clean line art.
```

## AN_STICKER_07 - Careful

```text
Transparent background sticker of An, same character as reference, slightly worried but composed, holding up a small amber warning triangle icon without text, anime/comic clean line art.
```

## AN_STICKER_08 - Ask Someone

```text
Transparent background sticker of An, same character as reference, holding phone and gesturing toward a generic friendly support silhouette icon, kind expression, no readable text, anime/comic clean line art.
```

## AN_STICKER_09 - Not Enough Data

```text
Transparent background sticker of An, same character as reference, shrugging gently with a thoughtful expression, surrounded by abstract incomplete puzzle pieces, no readable text, anime/comic clean line art.
```

## AN_STICKER_10 - Final Confidence

```text
Transparent background sticker of An, same character as reference, standing calmly with phone lowered and soft teal shield glow behind him, quietly confident expression, anime/comic clean line art, no readable text.
```

---

# 8. Checklist and Icon Card Prompts

These are not meant to generate readable text. Add text later in web/editor.

## DFB_CARD_01 - Deepfense Check Card

```text
16:9 clean educational anime/comic card illustration, five abstract icons arranged left to right: pause hand, eye, safe channel check, source map, decision compass, no readable text, soft blue-teal background, clean negative space for web overlay, no character, no logos, no watermark imitation.
```

## DFB_CARD_02 - Three-Layer Observation Card

```text
16:9 clean educational anime/comic card illustration, three large abstract icons arranged as a triangle: eye, audio waveform, context map, no readable text, soft neutral background with teal accents, clean negative space for overlay, no logos.
```

## DFB_CARD_03 - Deepfense Shield Card

```text
16:9 clean educational anime/comic card illustration, five protective icons arranged around a central shield glow: family circle, clock, two linked channels, supportive hand, evidence folder, no readable text, warm safe lighting, clean overlay space.
```

## DFB_CARD_04 - Money Safety Card

```text
16:9 clean educational anime/comic card illustration, abstract phone, bank card shape without numbers, clock, safe contact circle, and shield icon, amber-to-teal color transition, no readable text, no numbers, no logos, clean overlay space.
```

## DFB_CARD_05 - Sensitive Content Harm Reduction Card

```text
16:9 clean educational anime/comic card illustration, blurred phone screen with abstract warning shapes, protective shield icon, supportive hand icon, report flag icon, no explicit content, no identifiable victim, no readable text, calm serious tone.
```

---

# 9. Quiz Feedback Visuals

## DFB_FEEDBACK_CORRECT_01 - Safe Choice

```text
16:9 anime/comic cinematic illustration of An smiling with quiet confidence, soft teal light, abstract safe decision path behind him, no readable text, clean space for feedback overlay. Character continuity: same An as reference.
```

## DFB_FEEDBACK_RETRY_01 - Try Again Carefully

```text
16:9 anime/comic cinematic illustration of An looking thoughtful and encouraging, holding a phone lowered, abstract question cards floating gently, no readable text, warm supportive mood, clean space for retry feedback overlay. Character continuity: same An as reference.
```

## DFB_FEEDBACK_WARNING_01 - High Risk

```text
16:9 anime/comic cinematic illustration of An raising a gentle stop gesture toward an amber abstract warning panel, calm but serious expression, no readable text, clean space for high-risk feedback overlay. Character continuity: same An as reference.
```

## DFB_FEEDBACK_COMPLETE_01 - Module Complete

```text
16:9 anime/comic cinematic illustration of An standing confidently with phone lowered, soft teal shield glow and subtle celebratory particles, no readable text, clean space for completion overlay. Character continuity: same An as reference.
```

---

# 10. Website Placement Suggestions

## Course Home

Use:

- `IMG_COMPANION_01`
- `DFB_ILL_M0_01`
- `AN_GIF_01`

## Lesson Headers

Use each module illustration:

- `DFB_ILL_M0_01`
- `DFB_ILL_M1_01`
- `DFB_ILL_M2_01`
- `DFB_ILL_M3_01`
- `DFB_ILL_M4_01`
- `DFB_ILL_M5_01`
- `DFB_ILL_M6_01`

## Quiz Feedback

Use:

- Correct: `DFB_FEEDBACK_CORRECT_01`
- Retry: `DFB_FEEDBACK_RETRY_01`
- High risk: `DFB_FEEDBACK_WARNING_01`
- Complete: `DFB_FEEDBACK_COMPLETE_01`

## Microinteractions

Use stickers:

- Pause moment: `AN_STICKER_01`
- Reflection block: `AN_STICKER_02`
- Verification tip: `AN_STICKER_03`
- Sensitive content: `AN_STICKER_04`
- Evidence/reporting: `AN_STICKER_05`
- Completion: `AN_STICKER_06` or `AN_STICKER_10`

## GIF Loops

Use sparingly:

- `AN_GIF_01` before risky decision questions.
- `AN_GIF_03` in Module 3 observation practice.
- `AN_GIF_04` in capstone/lab screens.
- `AN_GIF_05` in sensitive-content harm-reduction screens.

---

# 11. GPT Prompt Wrapper

When using GPT image generation, paste the asset prompt inside this wrapper:

```text
Use AN_REF_01 as the strict character reference for An.
Generate the following visual asset in anime/comic cinematic style.
Preserve An's face, hairstyle, age, outfit, and overall style from the reference.
Do not add readable text, logos, random letters, or watermark imitation.
Do not use any real celebrity likeness.
If the scene involves sensitive content, show only blurred abstract UI and An's reaction; do not show explicit or identifiable imagery.

[PASTE ASSET PROMPT HERE]

Negative prompt: photorealistic real-person likeness, real celebrity likeness, distorted face, inconsistent face, changed hairstyle, changed outfit, extra fingers, malformed hands, unreadable text, random letters, fake UI text, logos, watermark imitation, explicit imagery, realistic victim imagery, gore, doxxing, phishing instructions, hacker stereotype, dark cyberpunk cave, horror mood, oversexualized character
```

## 12. Nano Banana/Gemini Refinement Wrapper

Use this when refining an existing generated asset:

```text
Preserve An exactly from the reference image: same face, same hairstyle, same age, same dark navy jacket, same off-white T-shirt, same anime/comic cinematic style.
Refine only the composition, lighting, clarity, and emotional expression requested.
Remove readable text, random letters, logos, and watermark imitation.
Keep sensitive content blurred, abstract, non-explicit, and non-identifying.
```

## 13. Google Flow/FlowLab GIF Wrapper

Use this for image-to-video GIF-style loops:

```text
Create a seamless 3-4 second loop from the uploaded keyframe. Keep An's face, hairstyle, outfit, age, and proportions exactly the same as the image reference. Use subtle motion only: eye movement, breathing, phone glow, floating abstract UI particles. Do not add readable text, logos, new characters, or scene cuts.
```

