CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    link VARCHAR(255)
);

-- Insert sample projects based on current portfolio data
INSERT INTO projects (title, description, link) VALUES 
('News Summarizer', 'AI-powered Times of India news summarizer using Python, Hugging Face transformers, and GNews API.', 'https://github.com/srishtiim/news-summarizer'),
('Book Recommendation System', 'Intelligent book recommendation system with collaborative filtering and real-time suggestions.', 'https://book-recommendation-app-wheat.vercel.app/library'),
('Neural Networks For Sustainability', 'Sustainability-focused weather prediction system using KNN, clustering, and LSTM-CNN networks.', ''),
('Testing Automation Tool', 'Testing-focused automation project developed during internship at Total Shift Left.', ''),
('Workflow Inefficiency Analyzer', 'Analyzes team workflows to identify bottlenecks and inefficiencies using data visualization.', 'https://workflow-analyzer-beta.vercel.app/');
