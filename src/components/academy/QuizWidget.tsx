"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle, Award, RefreshCw, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

interface Question {
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

interface QuizWidgetProps {
  quizId: string;
  quizTitle: string;
  questions: Question[];
  onComplete?: (scorePct: number) => void;
}

export default function QuizWidget({
  quizId,
  quizTitle,
  questions,
  onComplete
}: QuizWidgetProps) {
  const { updateUserProgress } = useAuth();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [scorePct, setScorePct] = useState<number>(0);

  const handleSelectOption = (qIdx: number, oIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOptionIndex) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / questions.length) * 100);
    setScorePct(finalScore);
    setSubmitted(true);

    // Save score & update user progress in AuthContext
    updateUserProgress();
    if (onComplete) onComplete(finalScore);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScorePct(0);
  };

  return (
    <div className="w-full bg-hero-bg border border-border rounded-xl p-6 font-sora flex flex-col gap-6">
      {/* Quiz Header */}
      <div className="flex justify-between items-center border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          <h3 className="text-base font-bold text-foreground">{quizTitle}</h3>
        </div>
        <span className="text-xs font-mono text-muted-foreground">{questions.length} Questions</span>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const isSelected = selectedAnswers[qIdx] !== undefined;
          const isCorrect = selectedAnswers[qIdx] === q.correctOptionIndex;

          return (
            <div key={qIdx} className="flex flex-col gap-3 p-4 bg-secondary/40 border border-border rounded-lg">
              <span className="text-xs font-bold text-foreground">
                Q{qIdx + 1}: {q.question}
              </span>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2">
                {q.options.map((opt, oIdx) => {
                  const isThisSelected = selectedAnswers[qIdx] === oIdx;
                  const isThisCorrect = q.correctOptionIndex === oIdx;

                  let btnStyle = "bg-hero-bg border-border text-foreground hover:border-primary/50";
                  if (submitted) {
                    if (isThisCorrect) {
                      btnStyle = "bg-profit/20 border-profit text-profit font-bold";
                    } else if (isThisSelected && !isThisCorrect) {
                      btnStyle = "bg-destructive/20 border-destructive text-destructive";
                    } else {
                      btnStyle = "bg-hero-bg/50 border-border/50 text-muted-foreground/50";
                    }
                  } else if (isThisSelected) {
                    btnStyle = "bg-primary/20 border-primary text-primary font-bold";
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(qIdx, oIdx)}
                      className={`p-3 rounded-lg border text-xs text-left transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {submitted && isThisCorrect && <CheckCircle2 className="w-4 h-4 text-profit shrink-0" />}
                      {submitted && isThisSelected && !isThisCorrect && <XCircle className="w-4 h-4 text-destructive shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box on Submit */}
              {submitted && (
                <div className="p-3 bg-hero-bg rounded border border-border text-xs text-muted-foreground font-light leading-relaxed mt-1">
                  <strong className="text-primary font-semibold block mb-0.5">Explanation:</strong>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Score Result & Submit Bar */}
      {!submitted ? (
        <div className="pt-2">
          <Button
            variant="primary"
            onClick={handleSubmitQuiz}
            disabled={Object.keys(selectedAnswers).length < questions.length}
            className="w-full font-bold uppercase tracking-wider"
          >
            Submit Answers & Check Score
          </Button>
        </div>
      ) : (
        <div className="p-4 bg-secondary border border-profit/40 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-profit shrink-0" />
            <div>
              <span className="text-xs text-muted-foreground uppercase font-bold block">Quiz Score Result</span>
              <span className="text-xl font-black text-foreground font-mono">
                {scorePct}% ({scorePct >= 70 ? "Passed! 🎉" : "Needs Review"})
              </span>
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={handleRetry} className="flex items-center gap-1 font-bold">
            <RefreshCw className="w-3.5 h-3.5" /> Retry Quiz
          </Button>
        </div>
      )}
    </div>
  );
}
