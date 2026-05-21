# Deepfake challenge videos

Place challenge `.mp4` files in these folders and reference them from `src/data/levels.ts` with public URLs:

## Active detective challenge

The current app data points to the difficulty folders below. Each playthrough randomly selects 2 videos from each level.

- `level-1/18-thien-nhien-troi.mp4` -> `/challenges/videos/level-1/18-thien-nhien-troi.mp4`
- `level-1/20-banh-mi-chuyen-dong.mp4` -> `/challenges/videos/level-1/20-banh-mi-chuyen-dong.mp4`
- `level-1/21-hoa-chuyen-dong.mp4` -> `/challenges/videos/level-1/21-hoa-chuyen-dong.mp4`
- `level-2/28-ga-me-va-con.mp4` -> `/challenges/videos/level-2/28-ga-me-va-con.mp4`
- `level-2/29-ngua-an-co.mp4` -> `/challenges/videos/level-2/29-ngua-an-co.mp4`
- `level-2/30-cuu-an-co.mp4` -> `/challenges/videos/level-2/30-cuu-an-co.mp4`
- `level-3/15-nguoi-nhay-day.mp4` -> `/challenges/videos/level-3/15-nguoi-nhay-day.mp4`
- `level-3/23-nguoi-chay.mp4` -> `/challenges/videos/level-3/23-nguoi-chay.mp4`
- `level-3/25-nguoi-danh-dan.mp4` -> `/challenges/videos/level-3/25-nguoi-danh-dan.mp4`
- `level-3/26-nguoi-dat-cho.mp4` -> `/challenges/videos/level-3/26-nguoi-dat-cho.mp4`
- `level-3/27-nguoi-thoi-banh.mp4` -> `/challenges/videos/level-3/27-nguoi-thoi-banh.mp4`
- `level-4/11-hai-nguoi-yeu.mp4` -> `/challenges/videos/level-4/11-hai-nguoi-yeu.mp4`
- `level-4/12-nguoi-ngoi-xe.mp4` -> `/challenges/videos/level-4/12-nguoi-ngoi-xe.mp4`
- `level-4/16-canh-cap-treo.mp4` -> `/challenges/videos/level-4/16-canh-cap-treo.mp4`
- `level-4/22-chan-nuoc-bien.mp4` -> `/challenges/videos/level-4/22-chan-nuoc-bien.mp4`
- `level-4/24-nguoi-trong-kinh-long.mp4` -> `/challenges/videos/level-4/24-nguoi-trong-kinh-long.mp4`
- `level-5/13-nguoi-mat.mp4` -> `/challenges/videos/level-5/13-nguoi-mat.mp4`
- `level-5/14-nguoi-mat.mp4` -> `/challenges/videos/level-5/14-nguoi-mat.mp4`
- `level-5/17-nguoi-mat.mp4` -> `/challenges/videos/level-5/17-nguoi-mat.mp4`
- `level-5/19-nguoi-mat.mp4` -> `/challenges/videos/level-5/19-nguoi-mat.mp4`

Keep files lightweight for the public web build. For larger files, move them to object storage and keep only the remote URL in the challenge data.
