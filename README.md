# MedInsight - Medical Document Analysis Platform

A comprehensive platform for analyzing medical documents using AI, providing insights and chat-based interactions. This platform helps healthcare professionals and patients better understand medical documents through advanced AI analysis and interactive features.

## 🌟 Features

### Document Analysis
- Support for multiple document formats (PDF, DOCX, Images)
- AI-powered medical document analysis
- Text extraction and processing
- Multi-language support for document analysis
- Real-time analysis results

### Interactive Features
- Chat-based interface for document queries
- Real-time document insights
- Interactive Q&A with AI about medical documents
- Document history tracking
- User-friendly interface

### User Management
- Secure user authentication
- Profile management
- Document history
- Personalized dashboard
- Role-based access control

### Security
- Secure file handling
- Encrypted data transmission
- JWT-based authentication
- Protected API endpoints
- Secure document storage

## 🛠️ Tech Stack

### Backend
- **Python/Flask**: Web framework
- **MongoDB**: Database for storing user data and document metadata
- **Firebase Authentication**: User authentication and management
- **Google Gemini AI**: Advanced document analysis and chat capabilities
- **Tesseract OCR**: Optical Character Recognition for image processing
- **JWT**: Secure token-based authentication
- **CORS**: Cross-Origin Resource Sharing support

### Frontend
- **React**: UI framework
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **React Router**: Navigation and routing
- **Context API**: State management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.8 or higher
- Node.js 14 or higher
- MongoDB (local installation or cloud service)
- Tesseract OCR
- Git

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Mathew222/Medinsight.git
cd Medinsight
```

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the backend directory:
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

### 3. Frontend Setup

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

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
FLASK_DEBUG=true
MONGODB_URI=mongodb://localhost:27017/
JWT_SECRET=your-secret-key
GEMINI_API_KEY=your-gemini-api-key
```

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and Firestore
3. Download your `serviceAccountKey.json` and place it in the backend directory
4. Add the file to `.gitignore` to prevent accidental commits

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login user
- `GET /api/user`: Get user profile (protected)
- `PUT /api/user`: Update user profile (protected)

### Document Endpoints

- `POST /api/documents/upload`: Upload a document
- `GET /api/documents`: Get user's documents
- `GET /api/documents/<id>`: Get specific document
- `POST /api/documents/<id>/analyze`: Analyze document
- `POST /api/documents/<id>/chat`: Chat about document

## 🔒 Security Considerations

- Never commit sensitive information like API keys or service account credentials
- Keep your `.env` file secure and never share it
- Use strong passwords and keep them secure
- Regularly update dependencies for security patches
- Implement rate limiting for API endpoints
- Use HTTPS in production
- Sanitize user inputs
- Implement proper error handling

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for document analysis capabilities
- Firebase for authentication and storage
- MongoDB for database services
- All contributors and maintainers

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## 🔄 Updates

Stay tuned for updates and new features. Follow the repository to get notifications about new releases and updates. 