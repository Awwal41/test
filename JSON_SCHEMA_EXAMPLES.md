# JSON Schema Examples for EGFM USA Website

This document provides detailed JSON schema examples for the audio and transcript data used by the EGFM USA website.

## Audio JSON Schema

### Complete Example

```json
{
  "audios": [
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
      "tags": ["light", "presence", "truth", "faith"],
      "featured": true,
      "views": 1250,
      "likes": 89,
      "youtubeId": "abc123xyz",
      "relatedAudios": [2, 5, 8]
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
    },
    {
      "id": 3,
      "title": "The Race To Becoming A Godly & Everlasting Tree",
      "speaker": "Pastor Tayo Fasan",
      "date": "2024_11_12",
      "duration": "1:42:20",
      "category": "Daystar Arising",
      "description": "Exploring the spiritual journey of growth and maturity in Christ.",
      "speakerImage": "/images/pastor-tayo-fasan.jpg",
      "audioUrl": "https://egfmusa.b-cdn.net/audios/05_09_2025-DSA-The%20Race%20To%20Becoming%20A%20Godly%20%26%20Everlasting%20Tree%20part%205-Pastor%20Tayo%20Fasan.mp3",
      "tags": ["growth", "maturity", "journey"],
      "featured": false,
      "views": 1100,
      "likes": 78
    }
  ],
  "metadata": {
    "lastUpdated": "2024-11-15T12:00:00Z",
    "totalCount": 3,
    "categories": ["OBED", "Converge", "Daystar Arising"],
    "speakers": ["Rev. Kayode Oyegoke", "Rev. Helen Oyegoke", "Pastor Tayo Fasan"]
  }
}
```

### Minimal Example

```json
[
  {
    "id": 1,
    "title": "Light of God",
    "speaker": "Rev. Kayode Oyegoke",
    "date": "2024_11_10",
    "duration": "2:45:30",
    "category": "OBED",
    "audioUrl": "https://egfmusa.b-cdn.net/audios/2024_11_10%20-%20SOGAG%20Day%202%20-%20Rev.%20Kayode%20Oyegoke.mp3"
  },
  {
    "id": 2,
    "title": "Entrance into Everlasting life by beholding the lamb",
    "speaker": "Rev. Helen Oyegoke",
    "date": "2024_11_11",
    "duration": "1:38:15",
    "category": "Converge",
    "audioUrl": "https://egfmusa.b-cdn.net/audios/2025_06_19%20-%20(LUA25%20D3%20AM)%20-%20Entrance%20into%20Everlasting%20Life%20by%20Beholding%20the%20Lamb%20by%20Rev%20Helen%20Oyegoke.mp3"
  }
]
```

### Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | Number | Yes | Unique identifier for the audio message |
| title | String | Yes | Title of the message |
| speaker | String | Yes | Name of the speaker |
| date | String | Yes | Date in format YYYY_MM_DD |
| duration | String | Yes | Duration in format H:MM:SS |
| category | String | Yes | Category name (e.g., "OBED", "Converge") |
| audioUrl | String | Yes | Direct URL to the audio file |
| description | String | No | Brief description of the message content |
| speakerImage | String | No | Path to speaker's image |
| tags | Array | No | Array of relevant tags |
| featured | Boolean | No | Whether this is a featured message |
| views | Number | No | Number of views/listens |
| likes | Number | No | Number of likes/favorites |
| youtubeId | String | No | YouTube video ID if available |
| relatedAudios | Array | No | Array of related audio IDs |

## Transcript JSON Schema

### Complete Example

```json
{
  "transcripts": [
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
      "fileSize": "2.3 MB",
      "relatedTranscripts": [3, 5],
      "relatedAudios": [2, 4]
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
  ],
  "metadata": {
    "lastUpdated": "2024-03-20T12:00:00Z",
    "totalCount": 2,
    "categories": ["Faith & Trust", "Love & Relationships"],
    "speakers": ["Rev. Kayode Oyegoke", "Rev. Helen Oyegoke"]
  }
}
```

### Minimal Example

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
    "downloadUrl": "/transcripts/power-of-faith.pdf"
  },
  {
    "id": 2,
    "title": "Walking in Divine Love",
    "speaker": "Rev. Helen Oyegoke",
    "date": "2024-03-10",
    "pages": 8,
    "readingTime": "10 min read",
    "category": "Love & Relationships",
    "downloadUrl": "/transcripts/walking-in-love.pdf"
  }
]
```

### Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | Number | Yes | Unique identifier for the transcript |
| title | String | Yes | Title of the transcript |
| speaker | String | Yes | Name of the speaker |
| date | String | Yes | Date in format YYYY-MM-DD |
| pages | Number | Yes | Number of pages in the transcript |
| readingTime | String | Yes | Estimated reading time |
| category | String | Yes | Category name |
| downloadUrl | String | Yes | URL to download the full PDF |
| description | String | No | Brief description of the transcript content |
| speakerImage | String | No | Path to speaker's image |
| previewUrl | String | No | URL to a preview version of the transcript |
| tags | Array | No | Array of relevant tags |
| featured | Boolean | No | Whether this is a featured transcript |
| downloads | Number | No | Number of downloads |
| fileSize | String | No | Size of the PDF file |
| relatedTranscripts | Array | No | Array of related transcript IDs |
| relatedAudios | Array | No | Array of related audio IDs |

## API Response Format

For API endpoints, the response format includes pagination and metadata:

```json
{
  "items": [
    {
      "id": 1,
      "title": "Light of God",
      "speaker": "Rev. Kayode Oyegoke",
      "date": "2024_11_10",
      "duration": "2:45:30",
      "category": "OBED",
      "audioUrl": "https://egfmusa.b-cdn.net/audios/2024_11_10%20-%20SOGAG%20Day%202%20-%20Rev.%20Kayode%20Oyegoke.mp3"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 42,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "filters": {
    "category": "OBED",
    "speaker": null,
    "search": null,
    "sort": "newest"
  },
  "timestamp": "2024-11-15T12:00:00Z"
}
```

## File Naming Conventions

### Audio Files

```
YYYY_MM_DD-Category-Title-Speaker.mp3
```

Example:
```
2024_11_10-OBED-Light%20of%20God-Rev.%20Kayode%20Oyegoke.mp3
```

### Transcript Files

```
YYYY-MM-DD-Category-Title-Speaker.pdf
```

Example:
```
2024-03-15-Faith-Power-of-Faith-Rev-Kayode-Oyegoke.pdf
```

## CDN Directory Structure

```
/
├── audios/
│   ├── audios.json
│   ├── 2024_11_10-OBED-Light%20of%20God-Rev.%20Kayode%20Oyegoke.mp3
│   ├── 2025_06_19-(LUA25%20D3%20AM)-Entrance%20into%20Everlasting%20Life-Rev%20Helen%20Oyegoke.mp3
│   └── ...
├── transcripts/
│   ├── transcripts.json
│   ├── power-of-faith.pdf
│   ├── walking-in-love.pdf
│   └── preview/
│       ├── power-of-faith.pdf
│       └── walking-in-love.pdf
└── images/
    ├── rev-kayode-oyegoke.jpg
    ├── rev-helen-oyegoke.jpg
    └── pastor-tayo-fasan.jpg
```