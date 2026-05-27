import re
import codecs

with codecs.open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add states for CMS Admin Auth and Members Table
state_insertion = """  const [selectedCmsQuestionId, setSelectedCmsQuestionId] = useState<string | null>(null);

  // --- NEW STATES FOR ADAPTIVE ENGINE, CMS AUTH AND MEMBERS ---
  const [cmsAuth, setCmsAuth] = useState<boolean>(false);
  const [cmsUsername, setCmsUsername] = useState<string>('');
  const [cmsPassword, setCmsPassword] = useState<string>('');
  const [translateSelected, setTranslateSelected] = useState<string[]>([]);
  const [dictationInput, setDictationInput] = useState<string>('');
  const [fillBlankInput, setFillBlankInput] = useState<string>('');
  const [currentDifficulty, setCurrentDifficulty] = useState<number>(1);
  const [members, setMembers] = useState<any[]>([
    { id: 1, name: 'Hermano Carlos', role: 'Estudiante', xp: 450, progress: '40%' },
    { id: 2, name: 'Hermana Maria', role: 'Catequista', xp: 1200, progress: '100%' }
  ]);
"""
content = re.sub(
    r'  const \[selectedCmsQuestionId, setSelectedCmsQuestionId\] = useState<string \| null>\(null\);',
    state_insertion,
    content
)

# 2. Add getNextQuestion helper before `startSoloTrivia`
get_next_question = """  // Preguntas dinámicas aplanadas para los modos no limitados por Unidad como la Trivia
  const getFlatQuestions = () => {
    let list: any[] = [];
    courseData.forEach(unit => {
      if (unit.questions && Array.isArray(unit.questions)) {
        list = [...list, ...unit.questions];
      }
    });
    return list.length > 0 ? list : DEFAULT_COURSE_DATA[0].questions;
  };

  const getNextQuestion = (targetDifficulty: number, availableQs: any[]) => {
    if (!availableQs || availableQs.length === 0) return null;
    let nearest = availableQs[0];
    let minDiff = Infinity;
    for (const q of availableQs) {
      const d = Math.abs((q.difficulty || 1) - targetDifficulty);
      if (d < minDiff) {
        minDiff = d;
        nearest = q;
      }
    }
    return nearest;
  };
"""
content = re.sub(
    r'  // Preguntas dinámicas aplanadas.*?return list\.length > 0 \? list : DEFAULT_COURSE_DATA\[0\]\.questions;\n  };',
    get_next_question,
    content,
    flags=re.DOTALL
)

# 3. Modify `evaluateAnswer`
evaluate_answer = """  const evaluateAnswer = (selectedIdx: number | null, timeOut = false) => {
    if (questionAnswered) return;

    const currentQuestionsList = gameState === 'solo_trivia' ? getFlatQuestions() : (activeLessonUnit ? activeLessonUnit.questions : getFlatQuestions());
    if (currentQuestionsList.length === 0) return;
    
    const idx = gameState === 'solo_trivia' ? soloQuestionIdx : lessonQuestionIdx;
    const question = currentQuestionsList[idx] || currentQuestionsList[0];
    
    let isAnswerCorrect = false;
    if (!timeOut) {
      if (question.type === 'multiple' || question.type === 'boolean') {
        isAnswerCorrect = selectedIdx === question.correctIndex;
      } else if (question.type === 'translate') {
        isAnswerCorrect = JSON.stringify(translateSelected) === JSON.stringify(question.correctAnswer);
      } else if (question.type === 'dictation') {
        isAnswerCorrect = dictationInput.trim().toLowerCase() === question.correctAnswer?.toLowerCase();
      } else if (question.type === 'fill_blanks') {
        isAnswerCorrect = fillBlankInput.trim().toLowerCase() === question.correctAnswer?.toLowerCase();
      }
    }

    setIsCorrect(isAnswerCorrect);
    setQuestionAnswered(true);
    setSelectedOption(selectedIdx);

    const qDiff = question.difficulty || 1;
    const baseXP = 50;
    const earnedXP = baseXP * qDiff;

    if (isAnswerCorrect) {
      triggerSound('correct');
      setTeoMood("excited");
      setTeoMessage(`¡Increíble! Distingues perfectamente las realidades de la Gracia. (Nivel ${qDiff}: +${earnedXP} XP)`);
      
      if (gameState === 'solo_trivia') {
        const speedBonus = Math.floor(soloTimer * 2);
        setSoloScorePlayer((prev) => prev + earnedXP + speedBonus);
      } else {
        setXp(prev => prev + earnedXP);
      }
      setCurrentDifficulty(prev => Math.min(5, prev + 1));
    } else {
      triggerSound('incorrect');
      setTeoMood("sad");
      setTeoMessage(timeOut ? "¡Reloj agotado! La ley terrenal demanda presteza espiritual." : "Recuerda que los ritos eran una maqueta educativa hasta la venida de Cristo.");
      
      if (gameState !== 'solo_trivia') {
        setHearts((prev) => Math.max(0, prev - 1));
      }
      setCurrentDifficulty(prev => Math.max(1, prev - 1));
    }

    if (gameState === 'solo_trivia') {
      setTimeout(() => {
        const aiCorrect = Math.random() > 0.35; 
        const aiSpeedBonus = Math.floor(Math.random() * 20);
        if (aiCorrect) {
          setSoloScoreAI((prev) => prev + earnedXP + aiSpeedBonus);
        }
      }, 1200);
    }
  };"""
content = re.sub(
    r'  const evaluateAnswer = \(selectedIdx: number \| null, timeOut = false\) => \{.*?\n    \}\n  \};',
    evaluate_answer,
    content,
    flags=re.DOTALL
)

# 4. Modify resetQuestionState
reset_q = """  const resetQuestionState = () => {
    setSelectedOption(null);
    setQuestionAnswered(false);
    setIsCorrect(false);
    setTranslateSelected([]);
    setDictationInput('');
    setFillBlankInput('');
  };"""
content = re.sub(
    r'  const resetQuestionState = \(\) => \{\n    setSelectedOption\(null\);\n    setQuestionAnswered\(false\);\n    setIsCorrect\(false\);\n  \};',
    reset_q,
    content
)

with codecs.open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
