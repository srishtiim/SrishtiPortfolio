import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from database import init_db, add_book, get_books, update_book_status, log_reading_session, get_reading_history, get_total_pages_read_per_book, get_all_reading_sessions
from recommendations import get_recommendations
import datetime
import os

# Page Configuration
st.set_page_config(
    page_title="Book Journey",
    page_icon="📚",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for "Bookish" Aesthetic
st.markdown("""
<style>
    /* Main Background */
    .stApp {
        background-color: #FDFBF7; /* Creamy white */
        color: #4A4A4A;
    }
    
    /* Headers */
    h1, h2, h3 {
        color: #5D4037; /* Dark Brown */
        font-family: 'Georgia', serif;
    }
    
    /* Buttons */
    .stButton>button {
        background-color: #8D6E63; /* Warm Brown */
        color: white;
        border-radius: 8px;
        border: none;
    }
    .stButton>button:hover {
        background-color: #6D4C41;
    }
    
    /* Sidebar */
    [data-testid="stSidebar"] {
        background-color: #EFEBE9; /* Light Greyish Brown */
    }
    
    /* Cards (Using expanders or containers as proxy) */
    div[data-testid="stExpander"] {
        background-color: #FFFFFF;
        border: 1px solid #D7CCC8;
        border-radius: 10px;
    }
    
    /* Progress Bar */
    .stProgress > div > div > div > div {
        background-color: #7986CB; /* Muted Indigo - change to Sage? */
    }
    /* Sage Green for customizations if possible */
</style>
""", unsafe_allow_html=True)

# Initialize DB
init_db()

# Sidebar Navigation
with st.sidebar:
    st.image("https://cdn-icons-png.flaticon.com/512/3389/3389081.png", width=100) # Placeholder book icon
    st.title("Book Journey")
    
    # API Key Handling
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        api_key = st.text_input("Anthropic API Key", type="password", help="Enter your key here to use AI features.")
        if api_key:
            os.environ["ANTHROPIC_API_KEY"] = api_key
            
    nav = st.radio("Navigation", ["Start Journey", "My Reading Journal", "Discover Books"])

if nav == "Start Journey":
    st.title("Welcome to Your Reading Journey 🌿")
    st.markdown("""
    ### Track your reading, discover new favorites, and build your library.
    
    This is your personal space to:
    - **Log** the books you read and your daily progress.
    - **Visualize** your reading habits with beautiful charts.
    - **Discover** your next favorite book with AI-powered recommendations.
    """)
    
    # Reading Activity Calendar
    st.subheader("Reading Activity")
    sessions = get_all_reading_sessions()
    if not sessions.empty:
        # Aggregate pages per day
        daily_pages = sessions.groupby('date')['pages_read'].sum().reset_index()
        daily_pages['date'] = pd.to_datetime(daily_pages['date'])
        
        # Create a heatmap-like scatter plot or bar chart
        fig_cal = px.bar(daily_pages, x='date', y='pages_read', title="Pages Read Per Day",
                         labels={'pages_read': 'Pages', 'date': 'Date'},
                         color='pages_read', color_continuous_scale=px.colors.sequential.Teal)
        fig_cal.update_layout(xaxis_title=None, yaxis_title="Pages", showlegend=False)
        st.plotly_chart(fig_cal, use_container_width=True)
    else:
        st.info("Log your reading progress to see your activity calendar here!")
    
    col1, col2 = st.columns(2)
    with col1:
        st.info("👈 **Get Started**: Head to 'My Reading Journal' to add your first book!")
    with col2:
        st.success("✨ **Need Inspiration?**: Check out 'Discover Books' for curated picks.")
    
    # Quick Stats Overview
    st.subheader("At a Glance")
    books = get_books()
    if not books.empty:
        col_a, col_b, col_c = st.columns(3)
        with col_a:
            st.metric("Total Books", len(books))
        with col_b:
            completed = len(books[books['status'] == 'Completed'])
            st.metric("Completed", completed)
        with col_c:
            reading = len(books[books['status'] == 'Currently Reading'])
            st.metric("Reading Now", reading)
    else:
        st.write("Your library is empty. Add some books to see stats here!")

elif nav == "My Reading Journal":
    st.title("My Reading Journal 📖")
    
    tab1, tab2, tab3 = st.tabs(["Currently Reading", "Library", "Add New Book"])
    
    with tab3:
        st.subheader("Add a New Book")
        with st.form("add_book_form"):
            new_title = st.text_input("Title")
            new_author = st.text_input("Author")
            new_genre = st.selectbox("Genre", ["Fiction", "Non-Fiction", "Mystery", "Sci-Fi", "Fantasy", "Biography", "Romance", "Thriller", "Other"])
            new_pages = st.number_input("Total Pages", min_value=1)
            new_status = st.selectbox("Status", ["Want to Read", "Currently Reading", "Completed"])
            
            submitted = st.form_submit_button("Add Book")
            if submitted and new_title and new_author:
                add_book(new_title, new_author, new_genre, new_pages, new_status)
                st.success(f"Added '{new_title}' to your library!")
                st.rerun()

    with tab1:
        st.subheader("Currently Reading")
        books_df = get_books("Currently Reading")
        
        if books_df.empty:
            st.info("You are not reading any books right now. Start one from your Library!")
        else:
            for idx, row in books_df.iterrows():
                with st.expander(f"📚 **{row['title']}** by {row['author']}", expanded=True):
                    col_img, col_info = st.columns([1, 4])
                    # In a real app, fetch cover image here
                    
                    with col_info:
                        total_read = get_total_pages_read_per_book(row['id'])
                        total_pages = row['total_pages']
                        progress = min(total_read / total_pages, 1.0)
                        
                        st.progress(progress)
                        st.caption(f"{total_read} / {total_pages} pages ({int(progress*100)}%)")
                        
                        # Update Progress Form
                        with st.form(f"progress_{row['id']}"):
                            pages_today = st.number_input("Pages read today", min_value=1, key=f"p_{row['id']}")
                            comment = st.text_input("Notes/Thoughts (optional)", key=f"c_{row['id']}")
                            if st.form_submit_button("Log Progress"):
                                log_reading_session(row['id'], pages_today, comment)
                                # Check if completed
                                if total_read + pages_today >= total_pages:
                                    st.balloons()
                                    update_book_status(row['id'], "Completed")
                                    st.success("Congratulations! You finished the book!")
                                else:
                                    st.success("Progress logged!")
                                st.rerun()

    with tab2:
        st.subheader("Your Library")
        filter_status = st.selectbox("Filter by Status", ["All", "Want to Read", "Completed"])
        
        if filter_status == "All":
            all_books = get_books()
        else:
            all_books = get_books(filter_status)
            
        if all_books.empty:
            st.write("No books found.")
        else:
            st.dataframe(all_books[['title', 'author', 'genre', 'status', 'rating', 'added_date']])
            
            # Simple Stats Visualization
            st.markdown("---")
            st.subheader("Reading Stats")
            
            if not all_books.empty:
                # Genres Pie Chart
                fig = px.pie(all_books, names='genre', title='Books by Genre', color_discrete_sequence=px.colors.sequential.RdBu)
                st.plotly_chart(fig, use_container_width=True)

elif nav == "Discover Books":
    st.title("Discover New Books 🔮")
    
    st.markdown("Tell us what you're in the mood for, and our AI will find your next read.")
    
    col_input, col_recs = st.columns([1, 2])
    
    with col_input:
        st.subheader("Preferences")
        vibes = st.multiselect(
            "Select Vibes & Genres",
            ["Thriller", "Romance", "Comedy", "Horror", "Mystery", "Fantasy", "Sci-Fi", 
             "Literary Fiction", "Scary", "Funny", "Emotional", "Thought-provoking", 
             "Fast-paced", "Cozy", "Dystopian", "Historical", "Magical Realism"]
        )
        
        # Get history for context
        history_df = get_books("Completed")
        history_list = []
        if not history_df.empty:
            history_list = history_df[['title', 'author']].to_dict('records')
            
        if st.button("Get Recommendations"):
            if not api_key:
                st.error("⚠️ **API Key Missing**: Please enter your Anthropic API Key in the sidebar to generate recommendations.")
            elif not vibes:
                st.warning("Please select at least one vibe or genre.")
            else:
                with st.spinner("Asking Claude for recommendations..."):
                    recs = get_recommendations(history_list, vibes, api_key)
                    st.session_state['recommendations'] = recs
    
    with col_recs:
        if 'recommendations' in st.session_state:
            st.subheader("Your Recommendations")
            for rec in st.session_state['recommendations']:
                with st.container():
                    st.markdown(f"### {rec['title']}")
                    st.markdown(f"**Author:** {rec['author']}")
                    st.write(rec['description'])
                    st.info(f"**Why:** {rec['match_reason']}")
                    if st.button(f"Add '{rec['title']}' to Waitlist", key=rec['title']):
                        add_book(rec['title'], rec['author'], "Unknown", 300, "Want to Read") # Default pages 300
                        st.success(f"Added {rec['title']} to your 'Want to Read' list!")
                    st.markdown("---")
