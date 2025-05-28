import { Test, TestSummary, Question } from '../types';
import { supabase } from '../lib/supabaseClient';
import { mockTests } from '../data/mockTests';

// Simulate API fetching with delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTestSummaries = async (): Promise<TestSummary[]> => {
  try {
    const { data: tests, error } = await supabase
      .from('tests')
      .select(`
        id,
        title,
        description,
        difficulty,
        time_limit,
        sections (
          id,
          title
        )
      `);

    if (error) throw error;

    return tests.map(test => ({
      id: test.id,
      title: test.title,
      description: test.description,
      difficulty: test.difficulty,
      timeLimit: test.time_limit,
      questionCount: test.sections.reduce((acc: number, section: any) => acc + section.questions?.length || 0, 0),
      sections: test.sections,
      coverImage: test.cover_image
    }));
  } catch (error) {
    console.error('Error fetching tests:', error);
    // Fallback to mock data
    await delay(800);
    return mockTests.map(test => ({
      id: test.id,
      title: test.title,
      description: test.description,
      difficulty: test.difficulty,
      timeLimit: test.timeLimit,
      questionCount: test.sections.reduce((acc, section) => acc + section.questions.length, 0),
      sections: test.sections.map(section => ({
        id: section.id,
        title: section.title
      })),
      coverImage: test.coverImage
    }));
  }
};

export const startTestSession = async (testId: string): Promise<string | null> => {
  try {
    // Get questions for the test
    const { data: questions, error: questionsError } = await supabase
      .from('question_bank')
      .select('*')
      .order('RANDOM()');

    if (questionsError) throw questionsError;

    // Create a new session with randomized questions
    const { data: session, error: sessionError } = await supabase
      .from('user_sessions')
      .insert({
        test_id: testId,
        questions: questions,
      })
      .select()
      .single();

    if (sessionError) throw sessionError;

    return session.id;
  } catch (error) {
    console.error('Error starting test session:', error);
    return null;
  }
};

export const fetchTestById = async (id: string): Promise<Test | null> => {
  try {
    // First check for an existing session
    const { data: session, error: sessionError } = await supabase
      .from('user_sessions')
      .select('*')
      .eq('test_id', id)
      .is('completed_at', null)
      .single();

    if (sessionError && sessionError.code !== 'PGRST116') throw sessionError;

    // If no active session, create one
    const sessionId = session?.id || await startTestSession(id);
    if (!sessionId) throw new Error('Failed to create test session');

    const { data: test, error: testError } = await supabase
      .from('tests')
      .select(`
        *,
        sections (
          *,
          questions:question_bank (*)
        )
      `)
      .eq('id', id)
      .single();

    if (testError) throw testError;

    // Transform the data to match our Test type
    return {
      id: test.id,
      title: test.title,
      description: test.description,
      difficulty: test.difficulty,
      timeLimit: test.time_limit,
      sections: test.sections.map((section: any) => ({
        id: section.id,
        title: section.title,
        description: section.description,
        instructions: section.instructions,
        questions: shuffleArray(section.questions.map((q: any) => ({
          id: q.id,
          text: q.text,
          options: shuffleArray(q.options),
          correctAnswer: q.correct_answer,
          explanation: q.explanation,
          type: q.type
        })))
      }))
    };
  } catch (error) {
    console.error('Error fetching test:', error);
    // Fallback to mock data
    await delay(600);
    const test = mockTests.find(test => test.id === id);
    if (!test) return null;
    return test;
  }
};

// Helper function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export const saveTestResult = async (result: any): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_results')
      .insert([result]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error saving result:', error);
    return false;
  }
};