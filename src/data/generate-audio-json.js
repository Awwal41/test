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
      category
    });
  }
  fs.writeFileSync(path.join(audioDir, 'audios.json'), JSON.stringify(audios, null, 2));
  console.log('audios.json generated with', audios.length, 'entries.');
}

main(); 