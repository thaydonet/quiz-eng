/*
  # Initial schema setup for English Test Prep App

  1. New Tables
    - tests: Stores test metadata and configuration
    - sections: Stores test sections
    - questions: Stores questions for each section
    - user_results: Stores test results for each user

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create tests table
CREATE TABLE IF NOT EXISTS tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  difficulty text CHECK (difficulty IN ('easy', 'medium', 'hard')),
  time_limit integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sections table
CREATE TABLE IF NOT EXISTS sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id uuid REFERENCES tests(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  instructions text,
  order_number integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id uuid REFERENCES sections(id) ON DELETE CASCADE,
  text text NOT NULL,
  options jsonb NOT NULL,
  correct_answer text NOT NULL,
  explanation text,
  type text NOT NULL,
  order_number integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_results table
CREATE TABLE IF NOT EXISTS user_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  test_id uuid REFERENCES tests(id) ON DELETE CASCADE,
  score numeric NOT NULL,
  total_questions integer NOT NULL,
  correct_answers integer NOT NULL,
  section_scores jsonb NOT NULL,
  user_answers jsonb NOT NULL,
  completed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_results ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Tests are viewable by everyone"
  ON tests FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Sections are viewable by everyone"
  ON sections FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Questions are viewable by everyone"
  ON questions FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can view their own results"
  ON user_results FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own results"
  ON user_results FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_sections_test_id ON sections(test_id);
CREATE INDEX idx_questions_section_id ON questions(section_id);
CREATE INDEX idx_user_results_user_id ON user_results(user_id);
CREATE INDEX idx_user_results_test_id ON user_results(test_id);