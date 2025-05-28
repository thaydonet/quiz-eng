import { Test } from '../types';

export const mockTests: Test[] = [
  {
    id: 'test-1',
    title: 'THPT Practice Test 1',
    description: 'A comprehensive practice test covering all sections of the THPT English exam.',
    difficulty: 'medium',
    timeLimit: 60, // 60 minutes
    coverImage: 'https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg',
    sections: [
      {
        id: 'reading',
        title: 'Reading Comprehension',
        description: 'Read the passage and answer the questions.',
        instructions: 'Choose the correct option (A, B, C, or D) that best answers each question based on the passage.',
        questions: [
          {
            id: 'r1',
            type: 'reading',
            text: `Read the following passage and answer questions 1-3:
            
            The COVID-19 pandemic has transformed education worldwide, forcing institutions to rapidly transition to online learning platforms. This shift has highlighted both the possibilities and limitations of digital education. On one hand, virtual classrooms provide flexibility and accessibility, allowing students to learn at their own pace and from any location. On the other hand, this transition has exacerbated educational inequalities, as many students lack access to reliable internet connections or appropriate devices.
            
            Research indicates that while some students thrive in virtual environments, others struggle without the structure and social aspects of traditional classrooms. Educators have had to quickly adapt their teaching methodologies, incorporating new technologies and finding creative ways to keep students engaged. As we move forward, the challenge will be to find a balance that leverages the advantages of digital learning while addressing its shortcomings.
            
            What is the main idea of the passage?`,
            options: [
              'A. Online education is superior to traditional classroom learning.',
              'B. The pandemic has permanently changed how education is delivered.',
              'C. The shift to online learning has revealed both benefits and challenges of digital education.',
              'D. Educational inequalities have increased due to the COVID-19 pandemic.'
            ],
            correctAnswer: 'C',
            explanation: 'The main idea is that the pandemic-forced transition to online learning has shown both advantages (flexibility, accessibility) and disadvantages (inequality, lack of structure for some students) of digital education. Option C best captures this balanced perspective presented in the passage.'
          },
          {
            id: 'r2',
            type: 'reading',
            text: 'According to the passage, which of the following is NOT mentioned as a benefit of online learning?',
            options: [
              'A. Learning at one\'s own pace',
              'B. Accessibility from any location',
              'C. Reduced educational costs',
              'D. Flexibility'
            ],
            correctAnswer: 'C',
            explanation: 'The passage mentions flexibility, learning at one\'s own pace, and accessibility from any location as benefits of online learning. However, it does not mention reduced educational costs anywhere in the text.'
          },
          {
            id: 'r3',
            type: 'reading',
            text: 'What challenge do educators face according to the passage?',
            options: [
              'A. Convincing students to return to traditional classrooms',
              'B. Finding a balance between digital and traditional learning methods',
              'C. Developing new educational technologies',
              'D. Reducing the cost of online education'
            ],
            correctAnswer: 'B',
            explanation: 'The last sentence states that "the challenge will be to find a balance that leverages the advantages of digital learning while addressing its shortcomings," which aligns with option B.'
          }
        ]
      },
      {
        id: 'grammar',
        title: 'Grammar and Vocabulary',
        description: 'Test your knowledge of English grammar and vocabulary.',
        instructions: 'Choose the best answer to complete each sentence or identify the correct usage.',
        questions: [
          {
            id: 'g1',
            type: 'grammar',
            text: 'If I ________ enough money, I would buy a new car.',
            options: [
              'A. have',
              'B. had',
              'C. would have',
              'D. having'
            ],
            correctAnswer: 'B',
            explanation: 'This is a conditional sentence (type 2) expressing an unreal or hypothetical situation in the present. The correct form is "If + subject + past simple, subject + would + base verb." Therefore, "had" is correct.'
          },
          {
            id: 'g2',
            type: 'grammar',
            text: 'She\'s lived in Vietnam ________ five years.',
            options: [
              'A. for',
              'B. since',
              'C. during',
              'D. while'
            ],
            correctAnswer: 'A',
            explanation: '"For" is used with periods of time (five years, two hours, etc.) to indicate duration. "Since" would be used with a specific point in time (since 2018, since January, etc.).'
          },
          {
            id: 'g3',
            type: 'vocabulary',
            text: 'The company has introduced a new policy to ________ waste and save resources.',
            options: [
              'A. minimize',
              'B. decline',
              'C. subtract',
              'D. degrade'
            ],
            correctAnswer: 'A',
            explanation: '"Minimize" means to reduce something to the smallest possible amount or degree, which fits the context of reducing waste. "Decline" is a verb meaning to decrease or deteriorate; "subtract" means to take away; "degrade" means to break down or deteriorate.'
          }
        ]
      },
      {
        id: 'pronunciation',
        title: 'Pronunciation and Stress',
        description: 'Identify words with different pronunciation patterns or stress.',
        instructions: 'Choose the word that has a different sound in the underlined part or a different stress pattern.',
        questions: [
          {
            id: 'p1',
            type: 'pronunciation',
            text: 'Choose the word that has the underlined part pronounced differently from the others.',
            options: [
              'A. ch__ai__r',
              'B. b__ea__r',
              'C. h__ai__r',
              'D. f__ai__r'
            ],
            correctAnswer: 'B',
            explanation: 'In "bear," the underlined part "ea" is pronounced as /eə/, while in "chair," "hair," and "fair," the underlined parts "ai" are pronounced as /eə/ as well. The spelling is different but the pronunciation is the same, except for "bear."'
          },
          {
            id: 'p2',
            type: 'pronunciation',
            text: 'Choose the word with a different stress pattern.',
            options: [
              'A. computer',
              'B. consider',
              'C. material',
              'D. important'
            ],
            correctAnswer: 'C',
            explanation: '"Material" has the stress on the second syllable (ma-TE-ri-al), while "computer" (COM-pu-ter), "consider" (con-SI-der), and "important" (im-POR-tant) have stress on different syllables.'
          }
        ]
      },
      {
        id: 'transformation',
        title: 'Sentence Transformation',
        description: 'Transform sentences using correct grammar structures.',
        instructions: 'Choose the option that correctly transforms the given sentence while maintaining its meaning.',
        questions: [
          {
            id: 't1',
            type: 'transformation',
            text: '"I haven\'t seen John since last Monday." Choose the sentence closest in meaning:',
            options: [
              'A. The last time I saw John was last Monday.',
              'B. I didn\'t see John since last Monday.',
              'C. I saw John last Monday for the last time.',
              'D. I have seen John since last Monday.'
            ],
            correctAnswer: 'A',
            explanation: 'The original sentence uses present perfect with "since" to indicate something that started in the past and continues to the present. Option A correctly rephrases this using "The last time..." to indicate the same timeframe.'
          },
          {
            id: 't2',
            type: 'transformation',
            text: '"They forced him to sign the document." Choose the sentence closest in meaning:',
            options: [
              'A. He was forced signing the document.',
              'B. He was forced to sign the document.',
              'C. He was forcing to sign the document.',
              'D. He was forced sign the document.'
            ],
            correctAnswer: 'B',
            explanation: 'The original sentence is in active voice. When converted to passive voice, it becomes "He was forced to sign the document." The infinitive "to sign" remains after the passive form "was forced."'
          }
        ]
      },
      {
        id: 'cloze',
        title: 'Cloze Test',
        description: 'Fill in the gaps in a passage with appropriate words.',
        instructions: 'Read the passage and choose the best option to fill each gap.',
        questions: [
          {
            id: 'c1',
            type: 'cloze',
            text: `Read the following passage and fill in the blanks:
            
            Environmental protection has become a major concern worldwide. Many species are in danger of (1)________ due to human activities such as deforestation and pollution. Governments around the world are implementing policies to (2)________ these problems and promote sustainable development.
            
            (1)`,
            options: [
              'A. extinction',
              'B. distinction',
              'C. exhibition',
              'D. expedition'
            ],
            correctAnswer: 'A',
            explanation: '"Extinction" means the dying out of a species, which fits the context of species being in danger due to human activities. "Distinction" means difference or excellence; "exhibition" is a public display; "expedition" is a journey.'
          },
          {
            id: 'c2',
            type: 'cloze',
            text: '(2)',
            options: [
              'A. address',
              'B. access',
              'C. assess',
              'D. assign'
            ],
            correctAnswer: 'A',
            explanation: '"Address" means to deal with or discuss, which fits the context of governments taking action on environmental problems. "Access" means to gain entry; "assess" means to evaluate; "assign" means to allocate.'
          }
        ]
      },
      {
        id: 'error',
        title: 'Error Identification',
        description: 'Identify errors in sentences.',
        instructions: 'Choose the underlined part that contains an error.',
        questions: [
          {
            id: 'e1',
            type: 'error',
            text: 'The children (A) are very exciting (B) about their (C) trip to the zoo (D) tomorrow.',
            options: [
              'A. The children',
              'B. are very exciting',
              'C. about their',
              'D. trip to the zoo'
            ],
            correctAnswer: 'B',
            explanation: 'The error is in part B. "Exciting" is incorrect because it describes something that causes excitement in others. The children are feeling excitement, so they are "excited" (not "exciting"). The correct phrase should be "are very excited."'
          },
          {
            id: 'e2',
            type: 'error',
            text: 'Neither the students (A) nor the teacher (B) are (C) able to solve (D) the problem.',
            options: [
              'A. Neither the students',
              'B. nor the teacher',
              'C. are',
              'D. able to solve'
            ],
            correctAnswer: 'C',
            explanation: 'The error is in part C. With "neither...nor," the verb agrees with the noun closest to it. Since "the teacher" (singular) is closest to the verb, it should be "is" not "are." The correct sentence should be "Neither the students nor the teacher is able to solve the problem."'
          }
        ]
      }
    ]
  },
  {
    id: 'test-2',
    title: 'THPT Practice Test 2',
    description: 'Another comprehensive practice test with a focus on reading and grammar.',
    difficulty: 'hard',
    timeLimit: 60,
    coverImage: 'https://images.pexels.com/photos/256431/pexels-photo-256431.jpeg',
    sections: [
      {
        id: 'reading',
        title: 'Reading Comprehension',
        description: 'Advanced reading comprehension questions.',
        instructions: 'Read the passage carefully and answer the questions that follow.',
        questions: [
          {
            id: 'r1-t2',
            type: 'reading',
            text: `Read the following passage and answer questions 1-3:
            
            Artificial Intelligence (AI) has made remarkable progress in recent years, with applications ranging from healthcare to finance to transportation. Machine learning algorithms can now diagnose diseases, predict market trends, and drive cars with increasing accuracy. However, this rapid advancement has raised important ethical questions about privacy, bias, and the potential displacement of human workers.
            
            One major concern is algorithmic bias. AI systems learn from existing data, which may contain historical biases. For example, if a hiring algorithm is trained on data from a company that has historically favored certain demographic groups, the algorithm may perpetuate this bias in its recommendations. Researchers and policymakers are working to develop methods to detect and mitigate such biases, ensuring that AI systems are fair and equitable.
            
            What is the main focus of the passage?`,
            options: [
              'A. The technical challenges of developing AI systems',
              'B. The progress and ethical considerations of AI',
              'C. How AI is replacing human workers in various industries',
              'D. Methods to eliminate bias in machine learning algorithms'
            ],
            correctAnswer: 'B',
            explanation: 'The passage discusses both the progress of AI (first paragraph) and the ethical considerations, particularly algorithmic bias (second paragraph). Option B best captures this dual focus.'
          },
          {
            id: 'r2-t2',
            type: 'reading',
            text: 'According to the passage, why might AI systems exhibit bias?',
            options: [
              'A. Because they are programmed to favor certain groups',
              'B. Because they learn from data that may contain historical biases',
              'C. Because they lack human ethical judgment',
              'D. Because policymakers have failed to regulate them'
            ],
            correctAnswer: 'B',
            explanation: 'The passage states that "AI systems learn from existing data, which may contain historical biases," which directly corresponds to option B.'
          }
        ]
      },
      {
        id: 'grammar',
        title: 'Grammar and Vocabulary',
        description: 'Advanced grammar and vocabulary questions.',
        instructions: 'Choose the best answer to complete each sentence or identify the correct usage.',
        questions: [
          {
            id: 'g1-t2',
            type: 'grammar',
            text: 'The manager, along with his assistants, ________ working on the project.',
            options: [
              'A. are',
              'B. is',
              'C. were',
              'D. have been'
            ],
            correctAnswer: 'B',
            explanation: 'When a singular subject is followed by a phrase introduced by "along with," the verb should agree with the singular subject. "The manager" is singular, so the verb should be "is."'
          },
          {
            id: 'g2-t2',
            type: 'vocabulary',
            text: 'The novel was so ________ that I couldn\'t put it down until I finished it.',
            options: [
              'A. tedious',
              'B. monotonous',
              'C. captivating',
              'D. redundant'
            ],
            correctAnswer: 'C',
            explanation: 'If someone couldn\'t put a book down until they finished it, it means the book was very engaging or "captivating." "Tedious," "monotonous," and "redundant" all have negative connotations and would not make someone want to continue reading.'
          }
        ]
      }
    ]
  },
  {
    id: 'test-3',
    title: 'Quick Grammar Practice',
    description: 'A short test focused solely on grammar concepts for quick practice.',
    difficulty: 'easy',
    timeLimit: 15,
    coverImage: 'https://images.pexels.com/photos/261909/pexels-photo-261909.jpeg',
    sections: [
      {
        id: 'grammar',
        title: 'Grammar Practice',
        description: 'Practice your grammar skills with these targeted questions.',
        instructions: 'Choose the best answer to complete each sentence or identify the correct usage.',
        questions: [
          {
            id: 'g1-t3',
            type: 'grammar',
            text: 'She ________ to the store when it started raining.',
            options: [
              'A. walks',
              'B. walking',
              'C. was walking',
              'D. is walking'
            ],
            correctAnswer: 'C',
            explanation: 'This sentence requires the past continuous tense to indicate an action in progress in the past when another action (it started raining) occurred. "Was walking" is the correct form.'
          },
          {
            id: 'g2-t3',
            type: 'grammar',
            text: 'If you ________ harder, you would have passed the exam.',
            options: [
              'A. studied',
              'B. had studied',
              'C. would study',
              'D. study'
            ],
            correctAnswer: 'B',
            explanation: 'This is a conditional sentence (type 3) expressing a hypothetical situation in the past. The correct form is "If + subject + past perfect, subject + would have + past participle." Therefore, "had studied" is correct.'
          },
          {
            id: 'g3-t3',
            type: 'grammar',
            text: 'I\'d rather you ________ tell anyone about this.',
            options: [
              'A. don\'t',
              'B. won\'t',
              'C. didn\'t',
              'D. not to'
            ],
            correctAnswer: 'C',
            explanation: 'After "I\'d rather" (I would rather), when referring to someone else\'s action, we use the past simple form, even though we are talking about the present or future. Therefore, "didn\'t" is correct.'
          }
        ]
      }
    ]
  }
];