import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RefreshCw, 
  ArrowRight, 
  Award, 
  BookOpen, 
  Bookmark,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CourseModule, QuizQuestion, QuizOption } from '../types/course';

interface QuizViewProps {
  module: CourseModule;
  questions: QuizQuestion[];
  currentScore?: number;
  onComplete: (score: number) => void;
  onBackToLesson: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  module,
  questions,
  currentScore,
  onComplete,
  onBackToLesson,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({}); // questionId -> optionId
  const [isSubmitted, setIsSubmitted] = useState<Record<string, boolean>>({}); // questionId -> submitted
  const [quizFinished, setQuizFinished] = useState(false);
  const [calculatedScore, setCalculatedScore] = useState<number | null>(null);

  const question = questions[currentQuestionIndex];
  const selectedOptionId = selectedAnswers[question.id];
  const isCurrentQuestionSubmitted = isSubmitted[question.id];

  const handleSelectOption = (optionId: string) => {
    if (isCurrentQuestionSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [question.id]: optionId }));
  };

  const handleConfirmAnswer = () => {
    if (!selectedOptionId) return;
    setIsSubmitted(prev => ({ ...prev, [question.id]: true }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate final score
      let correctCount = 0;
      questions.forEach(q => {
        const picked = selectedAnswers[q.id];
        const opt = q.options.find(o => o.id === picked);
        if (opt && opt.isCorrect) correctCount++;
      });
      const finalPercent = Math.round((correctCount / questions.length) * 100);
      setCalculatedScore(finalPercent);
      setQuizFinished(true);
      onComplete(finalPercent);

      if (finalPercent >= 80) {
        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // ignore
        }
      }
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setIsSubmitted({});
    setQuizFinished(false);
    setCurrentQuestionIndex(0);
    setCalculatedScore(null);
  };

  if (quizFinished && calculatedScore !== null) {
    const isPassing = calculatedScore >= 80;

    return (
      <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-6 shadow-sm">
        <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center ${
          isPassing 
            ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400' 
            : 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
        }`}>
          {isPassing ? <Award className="w-8 h-8" /> : <RefreshCw className="w-8 h-8" />}
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Knowledge Check Result
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {isPassing ? 'Ethical Mastery Achieved!' : 'Review & Try Again'}
          </h2>
          <div className="text-4xl font-black text-blue-600 dark:text-blue-400 mt-2">
            {calculatedScore}%
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
            {isPassing
              ? `Outstanding! You successfully navigated the classroom ethical scenarios for Module ${module.number}.`
              : 'You scored below the 80% mastery threshold. Review the lesson explanations and give the scenarios another shot!'}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            onClick={handleRetry}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Scenario Quiz</span>
          </button>

          <button
            onClick={onBackToLesson}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs sm:text-sm font-bold hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Return to Lesson</span>
          </button>
        </div>
      </div>
    );
  }

  const currentOption = question.options.find(o => o.id === selectedOptionId);

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      {/* Quiz Header & Progress */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Module {module.number} Knowledge Check
          </span>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Classroom Dilemma {currentQuestionIndex + 1} of {questions.length}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Bookmark className="w-3.5 h-3.5 text-indigo-500" />
          <span>{question.frameworkReference}</span>
        </div>
      </div>

      {/* Scenario Box */}
      {question.scenario && (
        <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 leading-relaxed">
          <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-1">
            Classroom Case Study:
          </span>
          {question.scenario}
        </div>
      )}

      {/* Question */}
      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
        {question.question}
      </h4>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          let containerStyle = 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900';

          if (isCurrentQuestionSubmitted) {
            if (option.isCorrect) {
              containerStyle = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-100';
            } else if (isSelected && !option.isCorrect) {
              containerStyle = 'border-rose-500 bg-rose-50/80 dark:bg-rose-950/30 text-rose-900 dark:text-rose-100';
            } else {
              containerStyle = 'opacity-50 border-slate-200 dark:border-slate-800';
            }
          } else if (isSelected) {
            containerStyle = 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/30 ring-2 ring-blue-500/20';
          }

          return (
            <div
              key={option.id}
              onClick={() => handleSelectOption(option.id)}
              className={`p-4 rounded-2xl border text-xs sm:text-sm transition-all cursor-pointer ${containerStyle}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold uppercase">
                  {isCurrentQuestionSubmitted && option.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : isCurrentQuestionSubmitted && isSelected && !option.isCorrect ? (
                    <XCircle className="w-4 h-4 text-rose-600" />
                  ) : (
                    <span>{option.id}</span>
                  )}
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="font-medium text-slate-800 dark:text-slate-200">
                    {option.text}
                  </div>
                  {isCurrentQuestionSubmitted && (isSelected || option.isCorrect) && (
                    <p className={`text-xs mt-2 pt-2 border-t ${
                      option.isCorrect 
                        ? 'border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300' 
                        : 'border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
                    }`}>
                      <strong>{option.isCorrect ? 'Why this is correct:' : 'Why this is problematic:'}</strong> {option.explanation}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <button
          onClick={onBackToLesson}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
        >
          Review Lesson
        </button>

        {!isCurrentQuestionSubmitted ? (
          <button
            onClick={handleConfirmAnswer}
            disabled={!selectedOptionId}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedOptionId
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md cursor-pointer'
                : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed'
            }`}
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs sm:text-sm font-bold hover:bg-blue-700 shadow-md transition-all cursor-pointer"
          >
            <span>{currentQuestionIndex < questions.length - 1 ? 'Next Scenario' : 'View Results'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
