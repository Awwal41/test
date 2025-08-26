import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Read local audio data
    const dataPath = path.join(process.cwd(), 'public', 'data', 'audios.json');
    const audioData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Return the audio data
    res.status(200).json({
      items: audioData,
      timestamp: new Date().toISOString(),
      source: 'local'
    });
  } catch (error) {
    console.error('Error reading audio data:', error);
    res.status(500).json({ 
      message: 'Failed to load audio data',
      error: error.message 
    });
  }
}
