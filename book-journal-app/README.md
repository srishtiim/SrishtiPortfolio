# Book Reading Journal & AI Recommendation App

A personal reading journal application that helps you track your reading progress and discover new books using AI recommendations tailored to your mood and history.

## Features
- **My Reading Journal**: Track books, log daily progress, and view reading statistics.
- **Discover Books**: Get personalized book recommendations using Claude API based on your vibe and reading history.
- **Data Persistence**: Local database stores your library and reading sessions.

## Setup

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure API Key**:
   - Copy `.env.example` to `.env`
   - Add your Anthropic API key to `.env`

3. **Run the App**:
   ```bash
   streamlit run app.py
   ```

## Technologies
- Python
- Streamlit
- Anthropic Claude API
- Pandas & Plotly
- SQLite
