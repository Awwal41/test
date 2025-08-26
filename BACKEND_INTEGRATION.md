# Backend Integration Guide for Audio and Transcript Files

This guide explains how to set up the backend JSON files for audio messages and transcripts to integrate with the EGFM USA website.

## Table of Contents
1. [Overview](#overview)
2. [Audio Files Integration](#audio-files-integration)
   - [JSON Structure](#audio-json-structure)
   - [File Naming Convention](#audio-file-naming-convention)
   - [Deployment](#audio-deployment)
   - [Generation Script](#audio-generation-script)
3. [Transcript Files Integration](#transcript-files-integration)
   - [JSON Structure](#transcript-json-structure)
   - [File Naming Convention](#transcript-file-naming-convention)
   - [Deployment](#transcript-deployment)
   - [Generation Script](#transcript-generation-script)
4. [CDN Configuration](#cdn-configuration)
5. [Testing and Validation](#testing-and-validation)
6. [Troubleshooting](#troubleshooting)

## Overview

The EGFM USA website uses JSON files to manage audio messages and transcripts. These files are hosted on a CDN (Content Delivery Network) and fetched by the frontend to display content to users. This approach provides several benefits:

- **Simplified Updates**: Add new content by updating JSON files without changing code
- **Performance**: Fast loading through CDN distribution
- **Flexibility**: Easy to modify content structure as needed
- **Scalability**: Handles growing content libraries efficiently

## Audio Files Integration

### Audio JSON Structure

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
  },
  {
    "id": 2,
    "title": "Entrance into Everlasting life by beholding the lamb",
    "speaker": "Rev. Helen Oyegoke",
    "date": "2024_11_11",
    "duration": "1:38:15",
    "category": "Converge",
    "description": "Understanding how beholding the Lamb of God transforms us and grants eternal life.",
    "speakerImage": "/images/rev-helen-oyegoke.jpg",
    "audioUrl": "https://egfmusa.b-cdn.net/audios/2025_06_19%20-%20(LUA25%20D3%20AM)%20-%20Entrance%20into%20Everlasting%20Life%20by%20Beholding%20the%20Lamb%20by%20Rev%20Helen%20Oyegoke.mp3",
    "tags": ["lamb", "eternal life", "transformation"],
    "featured": false,
    "views": 980,
    "likes": 67
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

### Audio File Naming Convention

For consistent URL generation, audio files should follow this naming pattern:

```
YYYY_MM_DD-Category-Title-Speaker.mp3
```

Example:
```
2024_11_10-OBED-Light%20of%20God-Rev.%20Kayode%20Oyegoke.mp3
```

Notes:
- Use underscores (`_`) to separate date components
- Use hyphens (`-`) to separate major sections
- Use URL encoding for spaces (`%20`) and special characters in title and speaker name

### Audio Deployment

1. **Create JSON File**:
   - Create a file named `audios.json` with your audio message data
   - Ensure it follows the structure outlined above

2. **Upload to CDN**:
   - Upload the JSON file to your CDN at: `https://egfmusa.b-cdn.net/audios/audios.json`
   - Upload all audio files to the same directory

3. **Update References**:
   - Ensure all `audioUrl` values in the JSON file point to valid files on your CDN

### Audio Generation Script

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

## Transcript Files Integration

### Transcript JSON Structure

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
  },
  {
    "id": 2,
    "title": "Walking in Divine Love",
    "speaker": "Rev. Helen Oyegoke",
    "date": "2024-03-10",
    "pages": 8,
    "readingTime": "10 min read",
    "category": "Love & Relationships",
    "description": "Understanding how to manifest God's love in our daily relationships and interactions.",
    "speakerImage": "/images/rev-helen-oyegoke.jpg",
    "downloadUrl": "/transcripts/walking-in-love.pdf",
    "previewUrl": "/transcripts/preview/walking-in-love.pdf",
    "tags": ["love", "relationships", "community", "practical"],
    "featured": false,
    "downloads": 980,
    "fileSize": "1.8 MB"
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

### Transcript File Naming Convention

For consistent organization, transcript files should follow this naming pattern:

```
YYYY-MM-DD-Category-Title-Speaker.pdf
```

Example:
```
2024-03-15-Faith-Power-of-Faith-Rev-Kayode-Oyegoke.pdf
```

### Transcript Deployment

1. **Create JSON File**:
   - Create a file named `transcripts.json` with your transcript data
   - Ensure it follows the structure outlined above

2. **Upload to CDN**:
   - Upload the JSON file to your CDN at: `https://egfmusa.b-cdn.net/transcripts/transcripts.json`
   - Upload all PDF files to the same directory
   - Create a `preview` subdirectory for preview versions if needed

3. **Update References**:
   - Ensure all `downloadUrl` and `previewUrl` values point to valid files

### Transcript Generation Script

You can use this script to generate the JSON file from your transcript files:

```javascript
// src/data/generate-transcript-json.js

// Usage: node generate-transcript-json.js
// Place this script in your transcripts folder and run it to generate transcripts.json
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const transcriptDir = __dirname;
const files = fs.readdirSync(transcriptDir).filter(file => file.endsWith('.pdf'));

// Estimate reading time based on pages (average 2 minutes per page)
function estimateReadingTime(pages) {
  const minutes = pages * 2;
  return minutes < 60 ? `${minutes} min read` : `${Math.floor(minutes/60)}:${(minutes%60).toString().padStart(2, '0')} hours`;
}

// Get PDF info using pdftk or similar tool
function getPdfInfo(filePath) {
  return new Promise((resolve, reject) => {
    exec(`pdftk "${filePath}" dump_data`, (error, stdout, stderr) => {
      if (error) {
        // Fallback to basic file stats if pdftk not available
        try {
          const stats = fs.statSync(filePath);
          const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(1);
          resolve({
            pages: Math.ceil(stats.size / 100000), // Rough estimate
            fileSize: `${fileSizeInMB} MB`
          });
        } catch (err) {
          resolve({ pages: 1, fileSize: 'Unknown' });
        }
        return;
      }
      
      const pageMatch = stdout.match(/NumberOfPages: (\d+)/);
      const pages = pageMatch ? parseInt(pageMatch[1]) : 1;
      
      const stats = fs.statSync(filePath);
      const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(1);
      
      resolve({
        pages,
        fileSize: `${fileSizeInMB} MB`
      });
    });
  });
}

async function main() {
  const transcripts = [];
  let idx = 1;
  
  for (const file of files) {
    try {
      // Parse filename: 2024-03-15-Faith-Power-of-Faith-Rev-Kayode-Oyegoke.pdf
      const parts = file.replace('.pdf', '').split('-');
      if (parts.length < 6) continue; // Skip files that don't match pattern
      
      const date = `${parts[0]}-${parts[1]}-${parts[2]}`;
      const category = parts[3];
      
      // Find speaker part (usually contains "Rev" or "Pastor")
      let speakerStartIndex = -1;
      for (let i = 4; i < parts.length; i++) {
        if (parts[i] === 'Rev' || parts[i] === 'Pastor') {
          speakerStartIndex = i;
          break;
        }
      }
      
      if (speakerStartIndex === -1) speakerStartIndex = parts.length - 2;
      
      const title = parts.slice(4, speakerStartIndex).join(' ');
      const speaker = parts.slice(speakerStartIndex).join(' ');
      
      // Get PDF info
      const filePath = path.join(transcriptDir, file);
      const { pages, fileSize } = await getPdfInfo(filePath);
      const readingTime = estimateReadingTime(pages);
      
      // Determine speaker image
      let speakerImage = '/images/event-placeholder.jpg';
      if (speaker.includes('Kayode')) {
        speakerImage = '/images/rev-kayode-oyegoke.jpg';
      } else if (speaker.includes('Helen')) {
        speakerImage = '/images/rev-helen-oyegoke.jpg';
      } else if (speaker.includes('Tayo')) {
        speakerImage = '/images/pastor-tayo-fasan.jpg';
      }
      
      transcripts.push({
        id: idx++,
        title,
        speaker,
        date,
        pages,
        readingTime,
        category,
        description: `Transcript of "${title}" message by ${speaker}.`,
        speakerImage,
        downloadUrl: `https://egfmusa.b-cdn.net/transcripts/${file}`,
        previewUrl: `https://egfmusa.b-cdn.net/transcripts/preview/${file}`,
        fileSize,
        downloads: Math.floor(Math.random() * 1000) + 100 // Sample data
      });
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
  
  fs.writeFileSync(path.join(transcriptDir, 'transcripts.json'), JSON.stringify(transcripts, null, 2));
  console.log('transcripts.json generated with', transcripts.length, 'entries.');
}

main();
```

## CDN Configuration

For optimal performance, configure your CDN with these settings:

1. **CORS Headers**:
   ```
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Methods: GET, OPTIONS
   Access-Control-Allow-Headers: Content-Type
   ```

2. **Cache Control**:
   ```
   Cache-Control: public, max-age=3600
   ```

3. **Content Types**:
   - JSON files: `application/json`
   - MP3 files: `audio/mpeg`
   - PDF files: `application/pdf`

## Testing and Validation

Before deploying to production, validate your JSON files:

1. **JSON Validation**:
   - Use a tool like [JSONLint](https://jsonlint.com/) to validate your JSON syntax
   - Ensure all required fields are present

2. **URL Testing**:
   - Test all audio and PDF URLs to ensure they're accessible
   - Check that file formats are correct and playable/viewable

3. **Integration Testing**:
   - Test the website's ability to fetch and display the JSON data
   - Verify that audio playback and transcript downloads work correctly

## Troubleshooting

Common issues and solutions:

1. **CORS Errors**:
   - Ensure your CDN has proper CORS headers configured
   - Check that the frontend is using the correct URL format

2. **404 Errors**:
   - Verify that all files referenced in JSON exist on the CDN
   - Check for case sensitivity in file paths

3. **Parsing Errors**:
   - Validate JSON syntax with a JSON validator
   - Check for special characters that might need escaping

4. **Audio Playback Issues**:
   - Ensure audio files are properly encoded MP3 files
   - Check that file sizes aren't too large for efficient streaming

5. **PDF Display Problems**:
   - Verify PDFs are properly formatted and not password-protected
   - Consider providing preview versions at lower resolution

---

For additional assistance or custom integration needs, please contact the development team.