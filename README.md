# Namaste Netflix GPT 🎬

A Netflix-inspired movie browsing application with GPT-powered search functionality built using React, Redux, Firebase, and TMDB API.

## 🚀 Live Demo

[Visit the deployed application](https://namastenetflixgpt.web.app)

## ✨ Features

### Authentication
- 🔐 User Sign Up and Sign In with Firebase Authentication
- 👤 Profile management
- 🔒 Protected routes with authentication
- 🚪 Secure sign-out functionality

### Browse Experience
- 🎥 Main movie showcase with background trailer
- 📺 Embedded YouTube trailers (autoplay & muted)
- 🎬 Now Playing movies from TMDB
- 📜 Multiple movie lists with horizontal scrolling
- 🖼️ Movie cards with CDN poster images
- 💅 Responsive UI with Tailwind CSS

### GPT Search
- 🔍 AI-powered movie search
- 🤖 Integration with Hugging Face API

### Technical Highlights
- ⚛️ React Router for navigation
- 🔴 Redux Toolkit for state management
- 🎣 Custom hooks for data fetching
- 📝 Form validation with useRef
- 🔥 Firebase Hosting for deployment

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <your-repository-url>
cd namaste-netflix-gpt
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```properties
REACT_APP_HF_TOKEN=<your-huggingface-token>
REACT_APP_TMDB_API_KEY=<your-tmdb-api-key>
```

## 🚀 Running the Application

Start the development server:

```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## 📦 Build for Production

Create an optimized production build:

```bash
npm run build
```

## 🎯 Development Roadmap

### Completed ✅
- [x] React Router implementation
- [x] Header component
- [x] Login/SignUp forms with validation
- [x] Firebase authentication setup
- [x] Redux store with user & movie slices
- [x] TMDB API integration
- [x] Custom hooks for data fetching
- [x] Browse page with main & secondary containers
- [x] Trailer video playback
- [x] Movie lists with cards
- [x] Horizontal scrolling for movie lists
- [x] GPT search functionality
- [x] Multi-language support
- [x] Production deployment on Firebase

## 🔑 Getting API Keys

### TMDB API Key
1. Visit [TMDB](https://www.themoviedb.org/)
2. Create an account
3. Go to Settings → API
4. Request an API key

### Hugging Face Token
1. Visit [Hugging Face](https://huggingface.co/)
2. Create an account
3. Go to Settings → Access Tokens
4. Create a new token

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 🙏 Acknowledgments

- TMDB for movie data and images
- OpenAI/Hugging Face for AI capabilities
- React and Redux communities

---

**Made with ❤️ using React**