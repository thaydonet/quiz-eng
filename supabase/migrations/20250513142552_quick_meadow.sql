/*
  # Add question bank and user authentication

  1. New Tables
    - question_bank: Stores reusable questions
    - question_categories: Organizes questions by category
    - user_sessions: Tracks user test sessions

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create question categories table
CREATE TABLE IF NOT EXISTS question_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create question bank table
CREATE TABLE IF NOT EXISTS question_bank (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES question_categories(id) ON DELETE SET NULL,
  text text NOT NULL,
  options jsonb NOT NULL,
  correct_answer text NOT NULL,
  explanation text,
  difficulty text CHECK (difficulty IN ('easy', 'medium', 'hard')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user sessions table
CREATE TABLE IF NOT EXISTS user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  test_id uuid REFERENCES tests(id) ON DELETE CASCADE,
  questions jsonb NOT NULL, -- Stores randomized questions for this session
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  score numeric,
  answers jsonb
);

-- Enable RLS
ALTER TABLE question_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- Policies for question categories
CREATE POLICY "Question categories are viewable by everyone"
  ON question_categories FOR SELECT
  TO public
  USING (true);

-- Policies for question bank
CREATE POLICY "Questions in bank are viewable by everyone"
  ON question_bank FOR SELECT
  TO public
  USING (true);

-- Policies for user sessions
CREATE POLICY "Users can view their own sessions"
  ON user_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own sessions"
  ON user_sessions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions"
  ON user_sessions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_question_bank_category ON question_bank(category_id);
CREATE INDEX idx_user_sessions_user ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_test ON user_sessions(test_id);