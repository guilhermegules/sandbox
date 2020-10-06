type answers = 'Bern' | 'Dublin' | 'Chicago' | 'Lisbon' | 'Sao Paulo' | 'Sidney' | 'Vienna';

export interface Question {
  image: string;
  possibleSelections: string[];
  correctAnswer: answers;
}
