// API endpoint for transcripts
// This can be easily modified to connect to your actual database or CMS

import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'GET') {
    try {
      // In production, this would connect to your database
      // For now, we'll read from the JSON file
      const filePath = path.join(process.cwd(), 'public', 'data', 'transcripts.json');
      
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ 
          error: 'Transcripts data file not found',
          message: 'Please ensure transcripts.json exists in public/data/' 
        });
      }

      const fileContents = fs.readFileSync(filePath, 'utf8');
      const transcripts = JSON.parse(fileContents);

      // Add any server-side processing here
      const processedTranscripts = transcripts.map(transcript => ({
        ...transcript,
        // Add server-generated fields if needed
        serverTimestamp: new Date().toISOString(),
        // Validate required fields
        id: transcript.id || Math.random().toString(36).substr(2, 9),
        title: transcript.title || 'Untitled Transcript',
        speaker: transcript.speaker || 'Unknown Speaker',
        date: transcript.date || new Date().toISOString().split('T')[0],
      }));

      // Support query parameters for filtering
      let filteredTranscripts = processedTranscripts;

      // Filter by category
      if (req.query.category && req.query.category !== 'All') {
        filteredTranscripts = filteredTranscripts.filter(
          transcript => transcript.category === req.query.category
        );
      }

      // Filter by speaker
      if (req.query.speaker) {
        filteredTranscripts = filteredTranscripts.filter(
          transcript => transcript.speaker.toLowerCase().includes(req.query.speaker.toLowerCase())
        );
      }

      // Search functionality
      if (req.query.search) {
        const searchTerm = req.query.search.toLowerCase();
        filteredTranscripts = filteredTranscripts.filter(
          transcript => 
            transcript.title.toLowerCase().includes(searchTerm) ||
            transcript.description.toLowerCase().includes(searchTerm) ||
            transcript.speaker.toLowerCase().includes(searchTerm) ||
            transcript.category.toLowerCase().includes(searchTerm)
        );
      }

      // Sort functionality
      if (req.query.sort) {
        switch (req.query.sort) {
          case 'newest':
            filteredTranscripts.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
          case 'oldest':
            filteredTranscripts.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
          case 'popular':
            filteredTranscripts.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
            break;
          case 'title':
            filteredTranscripts.sort((a, b) => a.title.localeCompare(b.title));
            break;
          default:
            // Default to newest
            filteredTranscripts.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
      }

      // Pagination support
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 50;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      const paginatedTranscripts = filteredTranscripts.slice(startIndex, endIndex);

      // Return response with metadata
      res.status(200).json({
        transcripts: paginatedTranscripts,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(filteredTranscripts.length / limit),
          totalItems: filteredTranscripts.length,
          itemsPerPage: limit,
          hasNextPage: endIndex < filteredTranscripts.length,
          hasPrevPage: page > 1
        },
        filters: {
          category: req.query.category || null,
          speaker: req.query.speaker || null,
          search: req.query.search || null,
          sort: req.query.sort || 'newest'
        },
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error fetching transcripts:', error);
      res.status(500).json({ 
        error: 'Failed to fetch transcripts',
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }
  } else if (req.method === 'POST') {
    // Handle creating new transcripts (for admin functionality)
    try {
      const newTranscript = req.body;
      
      // Validate required fields
      if (!newTranscript.title || !newTranscript.speaker) {
        return res.status(400).json({
          error: 'Missing required fields',
          required: ['title', 'speaker']
        });
      }

      // In production, this would save to your database
      // For now, we'll append to the JSON file
      const filePath = path.join(process.cwd(), 'public', 'data', 'transcripts.json');
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const transcripts = JSON.parse(fileContents);

      // Add new transcript with generated ID
      const transcript = {
        id: Date.now(), // In production, use proper ID generation
        ...newTranscript,
        date: newTranscript.date || new Date().toISOString().split('T')[0],
        downloads: 0,
        featured: false
      };

      transcripts.unshift(transcript); // Add to beginning

      // Save back to file (in production, save to database)
      fs.writeFileSync(filePath, JSON.stringify(transcripts, null, 2));

      res.status(201).json({
        message: 'Transcript created successfully',
        transcript: transcript
      });

    } catch (error) {
      console.error('Error creating transcript:', error);
      res.status(500).json({
        error: 'Failed to create transcript',
        message: error.message
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}

// Helper function to validate transcript data
function validateTranscript(transcript) {
  const required = ['title', 'speaker'];
  const missing = required.filter(field => !transcript[field]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }

  return true;
}