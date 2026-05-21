# Deepfake challenge videos

Place challenge `.mp4` files in these folders and reference them from `src/data/levels.ts` with public URLs:

## Active detective challenge

The current app data points to:

- `detective/v1.mp4` -> `/challenges/videos/detective/v1.mp4`
- `detective/v2.mp4` -> `/challenges/videos/detective/v2.mp4`
- `detective/v3.mp4` -> `/challenges/videos/detective/v3.mp4`
- `detective/v4.mp4` -> `/challenges/videos/detective/v4.mp4`
- `detective/v5.mp4` -> `/challenges/videos/detective/v5.mp4`
- `detective/v6.mp4` -> `/challenges/videos/detective/v6.mp4`
- `detective/v7.mp4` -> `/challenges/videos/detective/v7.mp4`
- `detective/v8.mp4` -> `/challenges/videos/detective/v8.mp4`
- `detective/v9.mp4` -> `/challenges/videos/detective/v9.mp4`
- `detective/v10.mp4` -> `/challenges/videos/detective/v10.mp4`

## Suggested difficulty folders

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
