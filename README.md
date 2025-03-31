# MedInsight - Medical Document Analysis Platform

A comprehensive platform for analyzing medical documents using AI, providing insights and chat-based interactions.

## Features

- Document upload and analysis (PDF, DOCX, Images)
- AI-powered medical document analysis
- Interactive chat interface for document queries
- Multi-language support
- User authentication and profile management
- Secure file handling

## Tech Stack

### Backend
- Python/Flask
- MongoDB
- Firebase Authentication
- Google Gemini AI
- Tesseract OCR

### Frontend
- React
- TypeScript
- Tailwind CSS
- Axios

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 14+
- MongoDB
- Tesseract OCR

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file with the following variables:
   ```
   FLASK_DEBUG=true
   MONGODB_URI=mongodb://localhost:27017/
   JWT_SECRET=your-secret-key
   GEMINI_API_KEY=your-gemini-api-key
   ```

5. Start the backend server:
   ```bash
   python app.py
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
FLASK_DEBUG=true
MONGODB_URI=mongodb://localhost:27017/
JWT_SECRET=your-secret-key
GEMINI_API_KEY=your-gemini-api-key
```

## Security Notes

- Never commit sensitive information like API keys or service account credentials
- Keep your `.env` file secure and never share it
- Use strong passwords and keep them secure
- Regularly update dependencies for security patches

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 