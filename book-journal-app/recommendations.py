import os
import anthropic
import json

# Try to load env from .env file if dotenv is available, otherwise rely on environment
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

def get_recommendations(user_history, vibe_tags, api_key=None):
    """
    Generates book recommendations using Claude API based on history and vibes.
    
    Args:
        user_history (list of dict): List of books user enjoyed [{'title': '...', 'author': '...'}, ...]
        vibe_tags (list of str): List of selected vibes/genres e.g., ['Sci-Fi', 'Fast-paced']
        api_key (str): Anthropic API Key
        
    Returns:
        list of dict: Recommended books including title, author, description, matchmaking_reason.
    """
    
    # Priority: passed arg > env var
    if not api_key:
        api_key = os.getenv("ANTHROPIC_API_KEY")
        
    if not api_key:
        return [{"title": "API Key Missing", "author": "System", "description": "Please add your Anthropic API Key in the sidebar or .env file.", "match_reason": "N/A"}]

    client = anthropic.Anthropic(api_key=api_key)
    
    # Construct the prompt
    history_str = ", ".join([f"{b['title']} by {b['author']}" for b in user_history]) if user_history else "No reading history yet"
    vibes_str = ", ".join(vibe_tags) if vibe_tags else "General good reads"
    
    prompt = f"""
    Based on the following user reading profile, recommend 5 books.
    
    User's Reading History (Books they enjoyed): {history_str}
    Current Desired Vibes/Genres: {vibes_str}
    
    Please provide the recommendations in valid JSON format as a list of objects.
    Each object must have these keys:
    - "title": Book title
    - "author": Author name
    - "description": A short 1-sentence description
    - "match_reason": Why this matches the user's vibes/history
    
    Do not include any other text, just the JSON list.
    """
    
    try:
        message = client.messages.create(
            model="claude-3-haiku-20240307", # Using Haiku for speed/cost, or Sonnet
            max_tokens=1000,
            temperature=0.7,
            system="You are a knowledgeable librarian and book recommender system.",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        
        response_text = message.content[0].text
        # Clean up potential markdown code blocks
        if "```json" in response_text:
            response_text = response_text.split("```json")[1].split("```")[0]
        elif "```" in response_text:
             response_text = response_text.split("```")[1].split("```")[0]
             
        recommendations = json.loads(response_text.strip())
        return recommendations

    except Exception as e:
        return [{"title": "Error", "author": "System", "description": f"Failed to get recommendations: {str(e)}", "match_reason": "Error"}]
