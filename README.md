# EGFM USA Website

This is the official website for EGFM USA, built with Next.js.

## Table of Contents

- [Getting Started](#getting-started)
- [Backend Integration](#backend-integration)
  - [Audio Files Integration](#audio-files-integration)
  - [Transcript Files Integration](#transcript-files-integration)
- [JSON Schema Examples](#json-schema-examples)
- [Development](#development)
- [Deployment](#deployment)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Backend Integration

### Audio Files Integration

#### Audio JSON Structure

The audio messages are defined in a JSON file with the following structure:

```json
[
  {
    "id": 1,
    "title": "Light of God",
    "speaker": "Rev. Kayode Oyegoke",
    "date": "2024_11_10",
    "duration": "2:45:30",
    "category": "OBED",
    "description": "A powerful message about walking in the light of God's presence and truth.",
    "speakerImage": "/images/rev-kayode-oyegoke.jpg",
    "audioUrl": "https://egfmusa.b-cdn.net/audios/2024_11_10%20-%20SOGAG%20Day%202%20-%20Rev.%20Kayode%20Oyegoke.mp3",
    "tags": ["light", "presence", "truth"],
    "featured": true,
    "views": 1250,
    "likes": 89
  }
]
```

#### Required Fields:
- `id`: Unique identifier for the audio message
- `title`: Title of the message
- `speaker`: Name of the speaker
- `date`: Date in format YYYY_MM_DD
- `duration`: Duration in format H:MM:SS
- `category`: Category name (e.g., "OBED", "Converge", "Daystar Arising")
- `audioUrl`: Direct URL to the audio file

#### Optional Fields:
- `description`: Brief description of the message content
- `speakerImage`: Path to speaker's image (relative to public folder or full URL)
- `tags`: Array of relevant tags
- `featured`: Boolean indicating if this is a featured message
- `views`: Number of views/listens
- `likes`: Number of likes/favorites

#### Audio File Naming Convention

For consistent URL generation, audio files should follow this naming pattern:

```
YYYY_MM_DD-Category-Title-Speaker.mp3
```

Example:
```
2024_11_10-OBED-Light%20of%20God-Rev.%20Kayode%20Oyegoke.mp3
```

#### Audio Generation Script

You can use the provided script to automatically generate the JSON file from your audio files:

```javascript
// src/data/generate-audio-json.js

// Usage: node generate-audio-json.js
// Place this script in your audio folder and run it to generate audios.json for upload to your CDN.
// Requires: npm install music-metadata
const fs = require('fs');
const path = require('path');
const mm = require('music-metadata');

const audioDir = __dirname;
const files = fs.readdirSync(audioDir);

function formatDuration(seconds) {
  if (!seconds || isNaN(seconds)) return '';
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

async function main() {
  const audios = [];
  let idx = 1;
  for (const file of files) {
    if (!file.endsWith('.mp3')) continue;
    // Example: 2024_11_10-OBED-My%20Sermon-Rev.%20Kayode%20Oyegoke.mp3
    const [date, category, ...rest] = file.replace('.mp3', '').split('-');
    if (rest.length < 2) continue; // Must have at least title and speaker
    const title = rest.slice(0, rest.length - 1).join('-').replace(/%20/g, ' ');
    const speaker = rest[rest.length - 1].replace(/%20/g, ' ');
    let duration = '';
    try {
      const metadata = await mm.parseFile(path.join(audioDir, file));
      duration = formatDuration(metadata.format.duration);
    } catch (e) {
      duration = '';
    }
    audios.push({
      id: idx++,
      title,
      speaker,
      date,
      duration,
      category,
      audioUrl: `https://egfmusa.b-cdn.net/audios/${file}`
    });
  }
  fs.writeFileSync(path.join(audioDir, 'audios.json'), JSON.stringify(audios, null, 2));
  console.log('audios.json generated with', audios.length, 'entries.');
}

main();
```

### Transcript Files Integration

#### Transcript JSON Structure

The transcripts are defined in a JSON file with the following structure:

```json
[
  {
    "id": 1,
    "title": "The Power of Faith in Uncertain Times",
    "speaker": "Rev. Kayode Oyegoke",
    "date": "2024-03-15",
    "pages": 12,
    "readingTime": "15 min read",
    "category": "Faith & Trust",
    "description": "A powerful exploration of how faith sustains us through life's challenges and uncertainties.",
    "speakerImage": "/images/rev-kayode-oyegoke.jpg",
    "downloadUrl": "/transcripts/power-of-faith.pdf",
    "previewUrl": "/transcripts/preview/power-of-faith.pdf",
    "tags": ["faith", "trust", "challenges", "biblical"],
    "featured": true,
    "downloads": 1250,
    "fileSize": "2.3 MB"
  }
]
```

#### Required Fields:
- `id`: Unique identifier for the transcript
- `title`: Title of the transcript
- `speaker`: Name of the speaker
- `date`: Date in format YYYY-MM-DD
- `pages`: Number of pages in the transcript
- `readingTime`: Estimated reading time
- `category`: Category name
- `downloadUrl`: URL to download the full PDF

#### Optional Fields:
- `description`: Brief description of the transcript content
- `speakerImage`: Path to speaker's image
- `previewUrl`: URL to a preview version of the transcript
- `tags`: Array of relevant tags
- `featured`: Boolean indicating if this is a featured transcript
- `downloads`: Number of downloads
- `fileSize`: Size of the PDF file

#### Transcript File Naming Convention

For consistent organization, transcript files should follow this naming pattern:

```
YYYY-MM-DD-Category-Title-Speaker.pdf
```

Example:
```
2024-03-15-Faith-Power-of-Faith-Rev-Kayode-Oyegoke.pdf
```

## JSON Schema Examples

For more detailed JSON schema examples, please see [JSON_SCHEMA_EXAMPLES.md](JSON_SCHEMA_EXAMPLES.md).

For complete backend integration documentation, please see [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md).

## Development

This project uses Next.js. To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
