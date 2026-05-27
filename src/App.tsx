import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Award, 
  Flame, 
  Heart, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  User, 
  Info, 
  Sparkles, 
  ArrowRight,
  HelpCircle,
  Trophy,
  Compass,
  Check,
  Users,
  Play,
  ArrowLeft,
  Crown,
  Share2,
  Tv,
  Sword,
  ShieldAlert,
  X,
  Sparkle,
  Zap,
  Cpu,
  Clock,
  Navigation,
  Database,
  Edit3,
  Plus,
  Trash2,
  Save,
  Download,
  Upload,
  FileText,
  Cloud
} from 'lucide-react';

// Importación de framer-motion desde motion/react según directrices de React Setup
import { motion, AnimatePresence } from 'motion/react';

// Importaciones de los módulos SDK de Firebase Web
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, doc, setDoc, updateDoc, onSnapshot, getDoc } from 'firebase/firestore';

// Declare globals for platform variables
declare global {
  interface Window {
    __firebase_config?: string;
    __app_id?: string;
    __initial_auth_token?: string;
    webkitAudioContext?: typeof AudioContext;
  }
}

// Inicialización de variables globales del entorno para Firebase con fallbacks seguros
let app: any;
let auth: any;
let db: any;
let appId = 'cee3d342-cd16-4004-be88-566dd8633fe2';
let firebaseAvailable = false;

try {
  if (typeof window !== 'undefined' && window.__firebase_config) {
    const firebaseConfig = JSON.parse(window.__firebase_config);
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    appId = window.__app_id || 'cee3d342-cd16-4004-be88-566dd8633fe2';
    firebaseAvailable = true;
  } else if (
    import.meta.env.VITE_FIREBASE_API_KEY &&
    import.meta.env.VITE_FIREBASE_PROJECT_ID
  ) {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ""
    };
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    appId = import.meta.env.VITE_FIREBASE_APP_ID || 'cee3d342-cd16-4004-be88-566dd8633fe2';
    firebaseAvailable = true;
  }
} catch (e) {
  console.warn("Sincronización de Firebase no activa de forma real. Corriendo en modo local simulado.", e);
}

// Respaldo por defecto de la base de datos de aprendizaje (Teología del Nuevo Pacto)
const DEFAULT_COURSE_DATA = [
  {
    id: "unit_1",
    title: "Unidad 1: Ritos y Sacrificios",
    subtitle: "La arquitectura del santuario celestial prefigurada en el tabernáculo de Moisés.",
    gradient: "from-[#1CB0F6] to-[#0D85D8]",
    questions: [
      {
        id: "q1_1",
        type: "multiple",
        difficulty: 1,
        question: "¿Qué representaba el Velo del Templo que separaba el Lugar Santo del Lugar Santísimo según Hebreos?",
        options: [
          "El cuerpo y la carne de Jesucristo, rasgada para abrirnos un camino nuevo y vivo.",
          "La división indestructible creada por la ley moral del Sinaí.",
          "Un símbolo del misterio cósmico reservado para los ángeles.",
          "Una cortina puramente de adorno instalada por el Rey Salomón."
        ],
        correctIndex: 0,
        explanation: "Hebreos 10:19-20 declara que tenemos libertad para entrar al Lugar Santísimo por la sangre de Jesús, a través del velo, esto es, de su carne."
      },
      {
        id: "q1_2",
        type: "translate",
        difficulty: 2,
        question: "Traduce al orden correcto la revelación:",
        textToTranslate: "La ley es una sombra de los bienes venideros.",
        wordBank: ["sombra", "ley", "La", "bienes", "venideros", "es", "una", "de", "los"],
        correctAnswer: ["La", "ley", "es", "una", "sombra", "de", "los", "bienes", "venideros"],
        explanation: "Hebreos 10:1 enseña que la ley, teniendo la sombra de los bienes venideros..."
      },
      {
        id: "q1_3",
        type: "dictation",
        difficulty: 3,
        question: "Escribe la frase que escuchas:",
        textToDictate: "La sangre de toros no quita los pecados",
        correctAnswer: "La sangre de toros no quita los pecados",
        explanation: "Hebreos 10:4 aclara que la sangre de los toros..."
      },
      {
        id: "q1_4",
        type: "fill_blanks",
        difficulty: 4,
        question: "Completa el versículo:",
        textBefore: "Pero estando ya presente Cristo, sumo sacerdote de los ",
        textAfter: " venideros.",
        correctAnswer: "bienes",
        explanation: "Hebreos 9:11."
      }
    ]
  },
  {
    id: "unit_2",
    title: "Unidad 2: Líderes y Provisiones",
    subtitle: "Patriarcas, profetas y milagros del desierto que retratan la geografía de la Gracia.",
    gradient: "from-[#58CC02] to-[#46A302]",
    questions: [
      {
        id: "q2_1",
        type: "boolean",
        difficulty: 2,
        question: "¿La Roca golpeada en el desierto, de la cual brotó agua física, representa a Cristo siendo herido para darnos agua de vida espiritual?",
        options: ["Verdadero", "Falso"],
        correctIndex: 0,
        explanation: "1 Corintios 10:4 dice explícitamente: 'y bebían de la roca espiritual que los seguía, y la roca era Cristo'."
      },
      {
        id: "q2_2",
        type: "multiple",
        difficulty: 5,
        question: "La serpiente de bronce levantada por Moisés en el asta otorgaba vida física a quien la miraba. ¿A quién prefiguraba?",
        options: [
          "Al diablo siendo derrotado públicamente en el cielo.",
          "A Jesucristo levantado en la cruz para que todo el que crea en Él tenga vida eterna.",
          "A una deidad pagana para sanar enfermedades físicas.",
          "Un amuleto sagrado que se guardaba dentro del Arca."
        ],
        correctIndex: 1,
        explanation: "En Juan 3:14-15, Jesús mismo hace la conexión..."
      }
    ]
  }
];

// Glosario del sistema
const GLOSSARY_DATA = [
  { type: "El Maná en el desierto", antitype: "Jesús como el verdadero Pan de Vida descendido del cielo.", bibleRef: "Juan 6:35" },
  { type: "La Roca herida de donde brotó agua", antitype: "La roca espiritual que fue herida para darnos el agua del Espíritu Santo.", bibleRef: "1 Corintios 10:4" },
  { type: "La Serpiente de bronce levantada en el asta", antitype: "Jesús levantado en la cruz para que todo el que mire a Él con fe sea salvo de la mordedura del pecado.", bibleRef: "Juan 3:14-15" }
];

// Generador de sonidos retro nativo del navegador utilizando Web Audio API
const playSound = (type: string) => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    if (type === 'correct') {
      const now = audioCtx.currentTime;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(329.63, now); // E4
      osc.frequency.setValueAtTime(523.25, now + 0.12); // C5
      gainNode.gain.setValueAtTime(0.12, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'incorrect') {
      const now = audioCtx.currentTime;
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(146.83, now); // D3
      osc.frequency.setValueAtTime(110.00, now + 0.15); // A2
      gainNode.gain.setValueAtTime(0.1, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'level-up' || type === 'victory') {
      const now = audioCtx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.1);
      osc.frequency.setValueAtTime(783.99, now + 0.2);
      gainNode.gain.setValueAtTime(0.1, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
      osc.start(now);
      osc.stop(now + 0.6);
    } else if (type === 'tick') {
      const now = audioCtx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, now);
      gainNode.gain.setValueAtTime(0.02, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    }
  } catch (error) {
    console.warn("Audio Context bloqueado o no soportado.", error);
  }
};

export default function App() {
  // Estado General del Sistema de Juego
  // 'cover' | 'learn' | 'solo_trivia' | 'tournament' | 'tournament_active' | 'lesson_active' | 'glossary' | 'cms'
  const [gameState, setGameState] = useState<string>('cover'); 
  const [xp, setXp] = useState<number>(0);
  const [hearts, setHearts] = useState<number>(5);
  const [streak, setStreak] = useState<number>(3);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Base de datos del itinerario dinamizado (CMS / Respaldos)
  const [courseData, setCourseData] = useState<any[]>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('grace_custom_curriculum') : null;
      return saved ? JSON.parse(saved) : DEFAULT_COURSE_DATA;
    } catch (e) {
      console.warn("Estructura JSON dañada en localStorage. Cargando respaldos.", e);
      return DEFAULT_COURSE_DATA;
    }
  });

  // Estados de la lección del itinerario
  const [activeLessonUnit, setActiveLessonUnit] = useState<any>(null);
  const [lessonQuestionIdx, setLessonQuestionIdx] = useState<number>(0);

  // Estados para el MODO SOLO TRIVIA (Contra La Máquina)
  const [soloQuestionIdx, setSoloQuestionIdx] = useState<number>(0);
  const [soloScorePlayer, setSoloScorePlayer] = useState<number>(0);
  const [soloScoreAI, setSoloScoreAI] = useState<number>(0);
  const [soloTimer, setSoloTimer] = useState<number>(15);
  const [soloGameEnded, setSoloGameEnded] = useState<boolean>(false);

  // Estado del usuario e ingresos
  const [user, setUser] = useState<any>(null);
  const [myNickname, setMyNickname] = useState<string>('Discípulo');
  const [lobbyCodeInput, setLobbyCodeInput] = useState<string>('');

  // Sincronización del torneo en tiempo real (Firebase / fallback)
  const [currentLobbyId, setCurrentLobbyId] = useState<string | null>(null);
  const [lobbyData, setLobbyData] = useState<any>(null);
  const [isLobbyHost, setIsLobbyHost] = useState<boolean>(false);
  const [isSimulatedLobby, setIsSimulatedLobby] = useState<boolean>(false);

  // Modales
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [guideTab, setGuideTab] = useState<string>('sombras');
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);

  // Respuestas del Jugador
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [questionAnswered, setQuestionAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  // Mensaje y emociones de Teo (Mascota)
  const [teoMessage, setTeoMessage] = useState<string>("¡Baa! Hola, soy Teo. Elige tu modo de entrenamiento preferido en la portada.");
  const [teoMood, setTeoMood] = useState<string>("happy");

  // Alertas flotantes (Sustituyendo Alerts nativos del navegador)
  const [toastMessage, setToastMessage] = useState<{ text: string; isError?: boolean } | null>(null);

  // Estados del CMS
  const [rawJsonText, setRawJsonText] = useState<string>("");
  const [cmsTab, setCmsTab] = useState<'visual' | 'raw_json'>('visual');
  const [selectedCmsUnitId, setSelectedCmsUnitId] = useState<string | null>(null);
  const [selectedCmsQuestionId, setSelectedCmsQuestionId] = useState<string | null>(null);

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

  const soloTimerInterval = useRef<any>(null);
  const simulatedCompetitorsTimer = useRef<any>(null);

  const triggerSound = (type: string) => {
    if (soundEnabled) playSound(type);
  };

  const resetQuestionState = () => {
    setSelectedOption(null);
    setQuestionAnswered(false);
    setIsCorrect(false);
    setTranslateSelected([]);
    setDictationInput('');
    setFillBlankInput('');
  };

  const showToast = (msg: string, isError = false) => {
    setToastMessage({ text: msg, isError });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Carga inicial y obtención del curriculum desde Firestore
  useEffect(() => {
    const savedXp = localStorage.getItem('grace_xp');
    const savedCompleted = localStorage.getItem('grace_completed');
    const savedNickname = localStorage.getItem('grace_nickname');
    const savedLocalCurriculum = localStorage.getItem('grace_custom_curriculum');
    
    if (savedXp) setXp(parseInt(savedXp));
    if (savedNickname) setMyNickname(savedNickname);
    if (savedCompleted) setCompletedLessons(JSON.parse(savedCompleted));
    
    if (savedLocalCurriculum) {
      try {
        setCourseData(JSON.parse(savedLocalCurriculum));
      } catch (e) {
        console.warn("Estructura JSON dañada, cargando respaldos.");
      }
    }

    if (firebaseAvailable) {
      const initAuth = async () => {
        try {
          if (typeof window !== 'undefined' && window.__initial_auth_token) {
            await signInWithCustomToken(auth, window.__initial_auth_token);
          } else {
            await signInAnonymously(auth);
          }
        } catch (e) {
          console.warn("Omitiendo inicio de sesión.");
        }
      };
      initAuth();
      const unsubscribe = onAuthStateChanged(auth, async (loggedUser) => {
        if (loggedUser) {
          setUser(loggedUser);
          try {
            const curriculumRef = doc(db, 'artifacts', appId, 'public', 'data', 'curriculum', 'main');
            const snap = await getDoc(curriculumRef);
            if (snap.exists()) {
              const cloudData = snap.data().units;
              if (cloudData && Array.isArray(cloudData)) {
                setCourseData(cloudData);
                localStorage.setItem('grace_custom_curriculum', JSON.stringify(cloudData));
              }
            }
          } catch (err) {
            console.warn("Sincronización Cloud temporalmente inhabilitada.");
          }
        }
      });
      return () => unsubscribe();
    }
  }, []);

  // Volcar el JSON estructurado al abrir el CMS
  useEffect(() => {
    if (gameState === 'cms') {
      setRawJsonText(JSON.stringify(courseData, null, 2));
    }
  }, [gameState, courseData]);

  // Manejo del reloj de alta velocidad de Solo Trivia
  useEffect(() => {
    if (gameState === 'solo_trivia' && !soloGameEnded && !questionAnswered) {
      setSoloTimer(15);
      soloTimerInterval.current = setInterval(() => {
        setSoloTimer((prev) => {
          if (prev <= 1) {
            clearInterval(soloTimerInterval.current);
            evaluateAnswer(null, true);
            return 0;
          }
          if (prev <= 5) triggerSound('tick');
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(soloTimerInterval.current);
  }, [gameState, soloQuestionIdx, questionAnswered, soloGameEnded]);

  // Escuchar salas activas de torneo
  useEffect(() => {
    if (!currentLobbyId || !firebaseAvailable || isSimulatedLobby || !user?.uid) return;

    const lobbyRef = doc(db, 'artifacts', appId, 'public', 'data', 'lobbies', currentLobbyId);
    
    const unsubscribe = onSnapshot(lobbyRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setLobbyData(data);
        if (data.status === 'playing' && gameState !== 'tournament_active') {
          setGameState('tournament_active');
          setLessonQuestionIdx(0);
          resetQuestionState();
        }
      } else {
        exitLobby();
        showToast("La sala de torneo fue cerrada.", true);
      }
    }, (err) => console.error(err));

    return () => unsubscribe();
  }, [currentLobbyId, isSimulatedLobby, user?.uid, gameState]);

  // Preguntas dinámicas aplanadas para los modos no limitados por Unidad como la Trivia
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

  const startSoloTrivia = () => {
    setGameState('solo_trivia');
    setSoloQuestionIdx(0);
    setSoloScorePlayer(0);
    setSoloScoreAI(0);
    setSoloGameEnded(false);
    resetQuestionState();
    setTeoMood("excited");
    setTeoMessage("¡Prepárate! La mente robótica de la IA responderá al mismo tiempo. ¡Debes ser veloz!");
    triggerSound('level-up');
  };

  const evaluateAnswer = (selectedIdx: number | null, timeOut = false) => {
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
  };

  const handleContinue = () => {
    const currentQuestionsList = gameState === 'solo_trivia' ? getFlatQuestions() : (activeLessonUnit ? activeLessonUnit.questions : getFlatQuestions());
    const currentIdx = gameState === 'solo_trivia' ? soloQuestionIdx : lessonQuestionIdx;

    if (currentIdx + 1 < currentQuestionsList.length) {
      let nextIdx = currentIdx + 1;
      const nextQ = getNextQuestion(currentDifficulty, currentQuestionsList.slice(currentIdx + 1));
      if (nextQ) {
        nextIdx = currentQuestionsList.findIndex((q: any) => q.id === nextQ.id);
      }

      if (gameState === 'solo_trivia') {
        setSoloQuestionIdx(nextIdx);
      } else {
        setLessonQuestionIdx(nextIdx);
      }
      resetQuestionState();
      setTeoMood("thinking");
      setTeoMessage("Observa el siguiente postulado del itinerario.");
    } else {
      if (gameState === 'solo_trivia') {
        setSoloGameEnded(true);
        triggerSound('victory');
        const won = soloScorePlayer >= soloScoreAI;
        if (won) {
          const nextXp = xp + 80;
          setXp(nextXp);
          localStorage.setItem('grace_xp', nextXp.toString());
          setTeoMessage(`¡Victoria rotunda! Lograste derrotar a la IA con amplio discernimiento. +80 XP.`);
          setTeoMood("excited");
        } else {
          setTeoMessage("El bot ha ganado esta ronda. Sigue preparándote en la Ruta.");
          setTeoMood("sad");
        }
      } else if (gameState === 'tournament_active') {
        finishTournament();
      } else {
        triggerSound('level-up');
        const nextXp = xp + 50;
        setXp(nextXp);
        const updatedCompleted = [...completedLessons, activeLessonUnit.id];
        setCompletedLessons(updatedCompleted);
        localStorage.setItem('grace_xp', nextXp.toString());
        localStorage.setItem('grace_completed', JSON.stringify(updatedCompleted));
        setStreak((prev) => prev + 1);
        
        setActiveLessonUnit(null);
        setGameState('learn');
        setTeoMood("happy");
        setTeoMessage("¡Unidad completada con éxito! Has ganado 50 XP de recompensa.");
      }
    }
  };

  // Sincronización del Lobby
  const createTournamentLobby = async () => {
    if (!myNickname.trim()) return;
    localStorage.setItem('grace_nickname', myNickname);

    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    const myId = firebaseAvailable && user ? user.uid : 'player_local';

    const newLobby = {
      lobbyId: randomCode,
      status: 'playing',
      hostId: myId,
      players: {
        [myId]: { id: myId, name: myNickname, score: 0, questionIndex: 0, hearts: 5, finished: false }
      },
      createdAt: Date.now()
    };

    setIsLobbyHost(true);
    setCurrentLobbyId(randomCode);

    if (firebaseAvailable && user) {
      try {
        const lobbyRef = doc(db, 'artifacts', appId, 'public', 'data', 'lobbies', randomCode);
        await setDoc(lobbyRef, newLobby);
        setLobbyData(newLobby);
        setTeoMessage(`¡Torneo activo! Invita con el código: ${randomCode}`);
      } catch (e) {
        startSimulatedLobbyUpdates(newLobby);
      }
    } else {
      startSimulatedLobbyUpdates(newLobby);
    }
  };

  const startSimulatedLobbyUpdates = (initialLobby: any) => {
    setIsSimulatedLobby(true);
    setLobbyData(initialLobby);
    let currentLobbyState = { ...initialLobby };
    const simulatedRivals = [
      { id: 'rival_1', name: 'Catequista Lucas', score: 0, questionIndex: 0, hearts: 5, finished: false },
      { id: 'rival_2', name: 'Hermana Ruth', score: 0, questionIndex: 0, hearts: 5, finished: false }
    ];
    let rivalIndex = 0;
    
    simulatedCompetitorsTimer.current = setInterval(() => {
      if (currentLobbyState.status === 'waiting') {
        if (rivalIndex < simulatedRivals.length) {
          const rival = simulatedRivals[rivalIndex];
          currentLobbyState.players[rival.id] = rival;
          setLobbyData({ ...currentLobbyState });
          triggerSound('tick');
          rivalIndex++;
        }
      } else if (currentLobbyState.status === 'playing') {
        let progressed = false;
        Object.keys(currentLobbyState.players).forEach(pId => {
          if (pId !== 'player_local' && !currentLobbyState.players[pId].finished) {
            if (Math.random() > 0.4) {
              const rival = currentLobbyState.players[pId];
              rival.questionIndex += 1;
              if (Math.random() > 0.3) {
                rival.score += 60;
              } else {
                rival.hearts = Math.max(0, rival.hearts - 1);
              }
              const totalQuestions = getFlatQuestions().length;
              if (rival.questionIndex >= totalQuestions || rival.hearts <= 0) {
                rival.finished = true;
              }
              progressed = true;
            }
          }
        });
        if (progressed) setLobbyData({ ...currentLobbyState });
        const allFinished = Object.values(currentLobbyState.players).every((p: any) => p.finished);
        if (allFinished) {
          currentLobbyState.status = 'ended';
          setLobbyData({ ...currentLobbyState });
          if (simulatedCompetitorsTimer.current) clearInterval(simulatedCompetitorsTimer.current);
        }
      }
    }, 2500);
  };

  const joinTournamentLobby = async () => {
    if (!myNickname.trim() || !lobbyCodeInput.trim()) return;
    localStorage.setItem('grace_nickname', myNickname);
    const code = lobbyCodeInput.trim();
    const myId = firebaseAvailable && user ? user.uid : 'player_local';

    if (firebaseAvailable && user) {
      try {
        const lobbyRef = doc(db, 'artifacts', appId, 'public', 'data', 'lobbies', code);
        const docSnap = await getDoc(lobbyRef);
        if (docSnap.exists()) {
          const lobby = docSnap.data();
          const updatedPlayers = {
            ...lobby.players,
            [myId]: { id: myId, name: myNickname, score: 0, questionIndex: 0, hearts: 5, finished: false }
          };
          await updateDoc(lobbyRef, { players: updatedPlayers });
          setIsLobbyHost(false);
          setIsSimulatedLobby(false);
          setCurrentLobbyId(code);
          setLobbyData({ ...lobby, players: updatedPlayers });
          setTeoMessage("¡Te has unido con éxito! Esperando inicio...");
        } else {
          showToast("Sala no encontrada.", true);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const hostStartTournament = async () => {
    if (!currentLobbyId || !lobbyData) return;
    if (isSimulatedLobby) {
      const updated = { ...lobbyData, status: 'playing' };
      setLobbyData(updated);
      setGameState('tournament_active');
      setLessonQuestionIdx(0);
      resetQuestionState();
    } else if (firebaseAvailable && user) {
      try {
        const lobbyRef = doc(db, 'artifacts', appId, 'public', 'data', 'lobbies', currentLobbyId);
        await updateDoc(lobbyRef, { status: 'playing' });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const finishTournament = async () => {
    const myId = firebaseAvailable && user ? user.uid : 'player_local';
    if (isSimulatedLobby) {
      const updated = { ...lobbyData };
      if (updated.players[myId]) updated.players[myId].finished = true;
      const allDone = Object.values(updated.players).every((p: any) => p.finished);
      if (allDone) updated.status = 'ended';
      setLobbyData(updated);
      setGameState('tournament');
      triggerSound('victory');
    }
  };

  const exitLobby = () => {
    if (simulatedCompetitorsTimer.current) clearInterval(simulatedCompetitorsTimer.current);
    setCurrentLobbyId(null);
    setLobbyData(null);
    setGameState('cover');
    setIsLobbyHost(false);
    setIsSimulatedLobby(false);
  };

  // Función refillHearts corregida para su correcta inicialización y renderizado
  const refillHearts = () => {
    if (xp >= 50) {
      setXp((prev) => prev - 50);
      setHearts(5);
      triggerSound('level-up');
      showToast("¡Vidas restauradas con éxito!");
    } else {
      showToast("Necesitas al menos 50 XP para restaurar tus corazones.", true);
    }
  };

  // CMS: Aplicar e importar JSON
  const applyJsonCurriculum = () => {
    try {
      const parsed = JSON.parse(rawJsonText);
      if (Array.isArray(parsed)) {
        setCourseData(parsed);
        localStorage.setItem('grace_custom_curriculum', JSON.stringify(parsed));
        showToast("¡Base de datos local actualizada con éxito!");
        triggerSound('level-up');
      } else {
        showToast("El JSON debe ser un Arreglo [] de Unidades.", true);
      }
    } catch (err) {
      showToast("Sintaxis JSON inválida.", true);
    }
  };

  const uploadCurriculumToFirebase = async () => {
    if (!firebaseAvailable || !user) {
      showToast("Inicia sesión o activa Firebase primero.", true);
      return;
    }
    try {
      const curriculumRef = doc(db, 'artifacts', appId, 'public', 'data', 'curriculum', 'main');
      await setDoc(curriculumRef, {
        units: courseData,
        updatedAt: Date.now()
      });
      showToast("Sincronizado en la nube de Firebase con éxito.");
      triggerSound('victory');
    } catch (err) {
      showToast("Error al guardar en Firebase.", true);
    }
  };

  const resetToDefaultCurriculum = () => {
    if (window.confirm("¿Seguro que quieres restaurar las lecciones bíblicas por defecto? Se perderán tus cambios.")) {
      setCourseData(DEFAULT_COURSE_DATA);
      localStorage.setItem('grace_custom_curriculum', JSON.stringify(DEFAULT_COURSE_DATA));
      setRawJsonText(JSON.stringify(DEFAULT_COURSE_DATA, null, 2));
      setSelectedCmsUnitId(null);
      setSelectedCmsQuestionId(null);
      showToast("Preguntas restauradas al diseño predeterminado.");
    }
  };

  // ACCIONES DINÁMICAS DEL CMS VISUAL (Gestión de unidades y preguntas)
  const handleAddUnit = () => {
    const newUnitId = "unit_" + Date.now();
    const newUnit = {
      id: newUnitId,
      title: "Nueva Unidad",
      subtitle: "Descripción introductoria de los tipos y figuras.",
      gradient: "from-[#1CB0F6] to-[#0D85D8]",
      questions: []
    };
    const updated = [...courseData, newUnit];
    setCourseData(updated);
    setSelectedCmsUnitId(newUnitId);
    localStorage.setItem('grace_custom_curriculum', JSON.stringify(updated));
    showToast("¡Unidad añadida de forma local!");
    triggerSound('level-up');
  };

  const handleUpdateUnitMeta = (unitId: string, field: string, value: string) => {
    const updated = courseData.map(u => {
      if (u.id === unitId) {
        return { ...u, [field]: value };
      }
      return u;
    });
    setCourseData(updated);
    localStorage.setItem('grace_custom_curriculum', JSON.stringify(updated));
  };

  const handleDeleteUnit = (unitId: string) => {
    if (window.confirm("¿Seguro que deseas eliminar esta unidad por completo con todas sus preguntas asociadas?")) {
      const updated = courseData.filter(u => u.id !== unitId);
      setCourseData(updated);
      setSelectedCmsUnitId(null);
      setSelectedCmsQuestionId(null);
      localStorage.setItem('grace_custom_curriculum', JSON.stringify(updated));
      showToast("Unidad eliminada.", true);
    }
  };

  const handleAddQuestion = (unitId: string) => {
    const updated = courseData.map(u => {
      if (u.id === unitId) {
        const newQId = "q_" + Date.now();
        const newQ = {
          id: newQId,
          type: "multiple",
          question: "¿Nueva Pregunta Teológica?",
          options: ["Opción A", "Opción B", "Opción C", "Opción D"],
          correctIndex: 0,
          explanation: "Justificación exegética."
        };
        setSelectedCmsQuestionId(newQId);
        return { ...u, questions: [...(u.questions || []), newQ] };
      }
      return u;
    });
    setCourseData(updated);
    localStorage.setItem('grace_custom_curriculum', JSON.stringify(updated));
    showToast("Pregunta añadida.");
  };

  const handleUpdateQuestion = (unitId: string, questionId: string, field: string, value: any) => {
    const updated = courseData.map(u => {
      if (u.id === unitId) {
        const updatedQuestions = u.questions.map((q: any) => {
          if (q.id === questionId) {
            if (field === 'type') {
              if (value === 'boolean') {
                return { ...q, type: 'boolean', options: ["Verdadero", "Falso"], correctIndex: 0 };
              } else {
                return { ...q, type: 'multiple', options: ["Opción A", "Opción B", "Opción C", "Opción D"], correctIndex: 0 };
              }
            }
            return { ...q, [field]: value };
          }
          return q;
        });
        return { ...u, questions: updatedQuestions };
      }
      return u;
    });
    setCourseData(updated);
    localStorage.setItem('grace_custom_curriculum', JSON.stringify(updated));
  };

  const handleUpdateQuestionOption = (unitId: string, questionId: string, optIdx: number, text: string) => {
    const updated = courseData.map(u => {
      if (u.id === unitId) {
        const updatedQuestions = u.questions.map((q: any) => {
          if (q.id === questionId) {
            const newOpts = [...q.options];
            newOpts[optIdx] = text;
            return { ...q, options: newOpts };
          }
          return q;
        });
        return { ...u, questions: updatedQuestions };
      }
      return u;
    });
    setCourseData(updated);
    localStorage.setItem('grace_custom_curriculum', JSON.stringify(updated));
  };

  const handleAddOptionToQuestion = (unitId: string, questionId: string) => {
    const updated = courseData.map(u => {
      if (u.id === unitId) {
        const updatedQuestions = u.questions.map((q: any) => {
          if (q.id === questionId && q.options.length < 6) {
            return { ...q, options: [...q.options, `Nueva Opción ${q.options.length + 1}`] };
          }
          return q;
        });
        return { ...u, questions: updatedQuestions };
      }
      return u;
    });
    setCourseData(updated);
    localStorage.setItem('grace_custom_curriculum', JSON.stringify(updated));
  };

  const handleRemoveOptionFromQuestion = (unitId: string, questionId: string) => {
    const updated = courseData.map(u => {
      if (u.id === unitId) {
        const updatedQuestions = u.questions.map((q: any) => {
          if (q.id === questionId && q.options.length > 2) {
            const newOpts = q.options.slice(0, -1);
            const newCorrect = q.correctIndex >= newOpts.length ? 0 : q.correctIndex;
            return { ...q, options: newOpts, correctIndex: newCorrect };
          }
          return q;
        });
        return { ...u, questions: updatedQuestions };
      }
      return u;
    });
    setCourseData(updated);
    localStorage.setItem('grace_custom_curriculum', JSON.stringify(updated));
  };

  const handleDeleteQuestion = (unitId: string, questionId: string) => {
    if (window.confirm("¿Seguro que deseas eliminar esta pregunta?")) {
      const updated = courseData.map(u => {
        if (u.id === unitId) {
          return { ...u, questions: u.questions.filter((q: any) => q.id !== questionId) };
        }
        return u;
      });
      setCourseData(updated);
      setSelectedCmsQuestionId(null);
      localStorage.setItem('grace_custom_curriculum', JSON.stringify(updated));
      showToast("Pregunta eliminada.", true);
    }
  };

  // Render Vectorial de la Mascota Teo
  const renderTeoLogo = () => {
    return (
      <motion.svg 
        viewBox="0 0 120 120" 
        className="w-20 h-20 mx-auto drop-shadow-[0_4px_12px_rgba(88,204,2,0.15)]"
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
      >
        <circle cx="60" cy="62" r="32" fill="#1E293B" stroke="#334155" strokeWidth="2" />
        <circle cx="60" cy="65" r="22" fill="#F8FAFC" />
        <circle cx="45" cy="55" r="10" fill="#F8FAFC" />
        <circle cx="75" cy="55" r="10" fill="#F8FAFC" />
        <circle cx="48" cy="74" r="10" fill="#F8FAFC" />
        <circle cx="72" cy="74" r="10" fill="#F8FAFC" />
        <rect x="44" y="44" width="32" height="26" rx="13" fill="#FFEAE6" />
        <ellipse cx="38" cy="48" rx="4" ry="8" fill="#FCA5A5" transform="rotate(-15 38 48)" />
        <ellipse cx="82" cy="48" rx="4" ry="8" fill="#FCA5A5" transform="rotate(15 82 48)" />
        <circle cx="52" cy="54" r={2.5} fill="#0F172A" />
        <circle cx="68" cy="54" r={2.5} fill="#0F172A" />
        <path d="M56,61 Q60,64 64,61" stroke="#0F172A" strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="60" cy="24" rx="14" ry="4" fill="none" stroke="#E3C16F" strokeWidth="2" strokeDasharray="3 1.5" />
      </motion.svg>
    );
  };

  const renderAdaptiveQuestion = (question: any) => {
    if (!question) return null;

    if (question.type === 'multiple' || question.type === 'boolean') {
      return (
        <div className={`grid gap-3 ${question.type === 'boolean' ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {question.options?.map((option: string, idx: number) => (
            <button
              key={idx}
              disabled={questionAnswered}
              onClick={() => evaluateAnswer(idx)}
              className={`w-full text-left p-3.5 rounded-xl border-2 font-bold transition-all border-b-4 flex items-center justify-between group active:translate-y-[2px] ${
                selectedOption === idx 
                  ? 'bg-[#1C2E4A] border-[#1CB0F6] text-white border-b-[#1479AB]' 
                  : 'bg-[#1E293B] border-slate-700 text-slate-300 hover:bg-slate-800 border-b-slate-950'
              } ${
                questionAnswered && idx === question.correctIndex
                  ? 'bg-[#1F3124] border-[#58CC02] text-white border-b-[#3B8902]'
                  : ''
              }`}
            >
              <span className="text-xs md:text-sm">{option}</span>
              <span className="text-[10px] font-black text-slate-500">{String.fromCharCode(65 + idx)}</span>
            </button>
          ))}
        </div>
      );
    }

    if (question.type === 'translate') {
      return (
        <div className="space-y-4">
          <div className="min-h-[60px] p-4 border-b-2 border-dashed border-slate-700 flex flex-wrap gap-2 items-center">
            {translateSelected.map((word, idx) => (
              <button
                key={idx}
                disabled={questionAnswered}
                onClick={() => setTranslateSelected(prev => prev.filter((_, i) => i !== idx))}
                className="px-3 py-1.5 bg-[#1C2E4A] border-2 border-[#1CB0F6] border-b-4 rounded-xl text-white font-bold text-sm active:translate-y-[2px]"
              >
                {word}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 justify-center pt-2">
            {question.wordBank?.filter((w: string) => !translateSelected.includes(w)).map((word: string, idx: number) => (
              <button
                key={idx}
                disabled={questionAnswered}
                onClick={() => setTranslateSelected(prev => [...prev, word])}
                className="px-3 py-1.5 bg-[#1E293B] border-2 border-slate-700 border-b-4 rounded-xl text-slate-300 font-bold text-sm hover:bg-slate-800 active:translate-y-[2px]"
              >
                {word}
              </button>
            ))}
          </div>
          {!questionAnswered && (
            <button onClick={() => evaluateAnswer(null)} className="w-full mt-4 py-3 bg-[#1CB0F6] text-white font-extrabold rounded-xl border-b-4 border-[#1479AB]">
              Comprobar
            </button>
          )}
        </div>
      );
    }

    if (question.type === 'dictation') {
      return (
        <div className="space-y-4">
          <button
            onClick={() => {
              if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(question.textToDictate || '');
                utterance.lang = 'es-ES';
                window.speechSynthesis.speak(utterance);
              }
            }}
            className="w-full py-6 bg-[#1C2C24] border-2 border-[#58CC02] rounded-2xl flex items-center justify-center gap-3 text-[#58CC02] hover:bg-[#1F3124] transition-colors"
          >
            <Volume2 className="h-8 w-8" />
            <span className="font-black text-lg">Escuchar Audio</span>
          </button>
          <input
            type="text"
            disabled={questionAnswered}
            value={dictationInput}
            onChange={(e) => setDictationInput(e.target.value)}
            placeholder="Escribe lo que escuchas..."
            className="w-full p-4 rounded-xl bg-[#0B0F19] border-2 border-slate-700 text-white font-bold text-sm focus:outline-none focus:border-[#58CC02]"
          />
          {!questionAnswered && (
            <button onClick={() => evaluateAnswer(null)} className="w-full py-3 bg-[#1CB0F6] text-white font-extrabold rounded-xl border-b-4 border-[#1479AB]">
              Comprobar
            </button>
          )}
        </div>
      );
    }

    if (question.type === 'fill_blanks') {
      return (
        <div className="space-y-4 text-center">
          <div className="text-lg text-white font-bold leading-loose">
            <span>{question.textBefore}</span>
            <input
              type="text"
              disabled={questionAnswered}
              value={fillBlankInput}
              onChange={(e) => setFillBlankInput(e.target.value)}
              className="mx-2 w-32 p-2 rounded-lg bg-[#0B0F19] border-b-2 border-slate-500 text-center text-[#FFC000] font-black focus:outline-none focus:border-[#FFC000]"
            />
            <span>{question.textAfter}</span>
          </div>
          {!questionAnswered && (
            <button onClick={() => evaluateAnswer(null)} className="w-full mt-4 py-3 bg-[#1CB0F6] text-white font-extrabold rounded-xl border-b-4 border-[#1479AB]">
              Comprobar
            </button>
          )}
        </div>
      );
    }

    return null;
  };

  // Obtenemos una sola vez la lista aplanada para usarse de forma segura en las secciones dinámicas
  const TOURNAMENT_QUESTIONS = getFlatQuestions();

  return (
    <div id="camino_de_gracia_redesign_root" className="min-h-screen bg-[#0B0F19] text-[#E2E8F0] font-sans flex flex-col md:flex-row pb-24 md:pb-0 relative overflow-x-hidden">
      
      {/* ALERTA TOAST FLOTANTE ANIMADA */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            className={`fixed top-4 left-1/2 transform px-6 py-3 rounded-xl shadow-2xl z-50 font-bold text-xs flex items-center space-x-2 border ${
              toastMessage.isError 
                ? 'bg-[#291A1E] text-[#FF4B4B] border-[#FF4B4B]/30' 
                : 'bg-[#1C2C24] text-[#58CC02] border-[#2A4832]'
            }`}
          >
            <span>{toastMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL DE CONFIRMACIÓN DE SALIDA CUSTOM (SIN POPUPS NATIVOS) */}
      <AnimatePresence>
        {showExitConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#161F30] border-2 border-[#25354F] p-6 rounded-3xl max-w-sm w-full text-center space-y-4"
            >
              <h3 className="text-lg font-black text-white">¿Quieres abandonar la lección?</h3>
              <p className="text-xs text-slate-400">Si sales ahora perderás tu racha y los puntos de esta unidad.</p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button 
                  id="btn_confirm_exit_yes"
                  onClick={() => {
                    setShowExitConfirm(false);
                    setGameState('learn');
                    setActiveLessonUnit(null);
                  }}
                  className="py-3 bg-[#FF4B4B] text-white font-bold text-xs rounded-xl border-b-4 border-red-800"
                >
                  SÍ, SALIR
                </button>
                <button 
                  id="btn_confirm_exit_no"
                  onClick={() => setShowExitConfirm(false)}
                  className="py-3 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl"
                >
                  CONTINUAR
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BARRA LATERAL (DESKTOP) */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0F172A] border-r border-[#1E293B] p-6 space-y-6 flex-shrink-0">
        <div className="flex items-center space-x-3 pb-4 border-b border-[#1E293B]">
          <div className="p-2.5 bg-[#1C2C24] rounded-xl text-[#58CC02] border border-[#2A4832]">
            <Sparkle className="h-5 w-5" />
          </div>
          <div>
            <span className="text-base font-black tracking-wider text-white">CAMINO DE GRACIA</span>
            <p className="text-[9px] font-black text-[#58CC02] tracking-widest">REDESIGN PRO</p>
          </div>
        </div>

        {/* Mascot Box */}
        <div className="bg-[#161F30] border border-[#25354F] rounded-2xl p-4 text-center space-y-3 shadow-md relative">
          <div className="absolute top-1.5 right-1.5 flex space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          {renderTeoLogo()}
          <p className="text-xs font-extrabold text-[#E2E8F0] leading-relaxed bg-[#0B0F19] p-3 rounded-xl border border-[#1E293B]">
            {teoMessage}
          </p>
        </div>

        {/* Navegación lateral */}
        <nav className="flex-1 space-y-2">
          <button 
            id="nav_btn_portal"
            onClick={() => { setGameState('cover'); exitLobby(); }}
            className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl font-bold transition-all border-b-4 ${
              gameState === 'cover' 
                ? 'bg-[#1C2E4A] text-[#1CB0F6] border-[#1CB0F6]' 
                : 'text-slate-400 hover:bg-[#161F30] border-transparent hover:text-white'
            }`}
          >
            <Compass className="h-5 w-5" />
            <span>Portal de Juegos</span>
          </button>

          <button 
            id="nav_btn_route"
            onClick={() => { setGameState('learn'); }}
            className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl font-bold transition-all border-b-4 ${
              gameState === 'learn' 
                ? 'bg-[#1F3124] text-[#58CC02] border-[#58CC02]' 
                : 'text-slate-400 hover:bg-[#161F30] border-transparent hover:text-white'
            }`}
          >
            <Navigation className="h-5 w-5" />
            <span>Ruta del Pacto</span>
          </button>

          <button 
            id="nav_btn_glossary"
            onClick={() => { setGameState('glossary'); }}
            className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl font-bold transition-all border-b-4 ${
              gameState === 'glossary' 
                ? 'bg-[#29221D] text-[#FFC000] border-[#FFC000]' 
                : 'text-slate-400 hover:bg-[#161F30] border-transparent hover:text-white'
            }`}
          >
            <BookOpen className="h-5 w-5" />
            <span>Símbolos y Tipos</span>
          </button>

          {/* BOTÓN CMS PARA GESTIÓN DE CONTENIDOS */}
          <button 
            id="nav_btn_cms"
            onClick={() => { setGameState('cms'); }}
            className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl font-bold transition-all border-b-4 ${
              gameState === 'cms' 
                ? 'bg-[#291A1E] text-[#FF4B4B] border-[#FF4B4B]' 
                : 'text-slate-400 hover:bg-[#161F30] border-transparent hover:text-white'
            }`}
          >
            <Database className="h-5 w-5" />
            <span className="flex items-center gap-1.5">
              Gestor CMS
              <span className="bg-[#FF4B4B] text-white text-[8px] font-black px-1.5 py-0.5 rounded">Admin</span>
            </span>
          </button>
        </nav>
      </aside>

      {/* ÁREA DE CONTENIDO */}
      <main className="flex-1 flex flex-col min-h-screen pb-16 md:pb-0">
        
        {/* Header superior */}
        <header className="bg-[#0F172A] border-b border-[#1E293B] px-6 py-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center space-x-2 md:hidden">
            <Sparkle className="h-5 w-5 text-[#58CC02]" />
            <span className="font-black text-xs tracking-widest text-white">CAMINO DE GRACIA</span>
          </div>

          <div className="flex items-center space-x-4 ml-auto md:ml-0">
            <div className="flex items-center space-x-1">
              <Flame className="h-4 w-4 text-orange-400 fill-orange-400" />
              <span className="font-extrabold text-xs md:text-sm text-slate-300">{streak} días</span>
            </div>

            <div className="flex items-center space-x-1">
              <Trophy className="h-4 w-4 text-[#FFC000] fill-[#FFC000]/10" />
              <span className="font-extrabold text-xs md:text-sm text-slate-300">{xp} XP</span>
            </div>

            <button id="btn_header_hearts" onClick={refillHearts} className="flex items-center space-x-1 hover:bg-[#1E293B] px-2 py-1 rounded-lg transition">
              <Heart className={`h-4 w-4 text-[#FF4B4B] ${hearts > 0 ? 'fill-[#FF4B4B]' : ''}`} />
              <span className="font-extrabold text-xs md:text-sm text-slate-300">{hearts}</span>
            </button>

            <button id="btn_header_sound" onClick={() => setSoundEnabled(!soundEnabled)} className="text-slate-400 hover:text-white">
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
          </div>
        </header>

        {/* CONTENEDOR CENTRAL */}
        <div className="flex-1 p-4 md:p-8 max-w-4xl w-full mx-auto pb-32">
          
          {/* MÁSCUTA TEO EN MÓVIL */}
          <div className="md:hidden bg-[#161F30] border border-[#25354F] rounded-2xl p-3 flex items-center space-x-4 mb-4 shadow-md">
            <div className="w-12 h-12 flex-shrink-0 bg-[#0B0F19] rounded-xl flex items-center justify-center border border-[#1E293B]">
              {renderTeoLogo()}
            </div>
            <div className="text-[11px] font-bold text-slate-300 leading-tight">
              {teoMessage}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* ================= PANTALLA DE PORTADA (PORTAL) ================= */}
            {gameState === 'cover' && (
              <motion.div
                key="cover"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="space-y-6 md:space-y-8"
              >
              <div className="text-center space-y-2 md:space-y-3">
                <span className="bg-[#1C2C24] text-[#58CC02] border border-[#2A4832] text-[9px] md:text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest inline-block">
                  Centro de Entrenamiento Teológico
                </span>
                <h1 className="text-2xl md:text-5xl font-black tracking-tight text-white leading-tight">
                  ¿Cómo quieres aprender hoy?
                </h1>
                <p className="text-slate-400 text-xs md:text-sm max-w-lg mx-auto">
                  Selecciona uno de los modos de juego premium inspirados en la estética moderna de Duolingo y demuestra tus conocimientos.
                </p>
              </div>

              {/* Grid de 3 Modos de Juego Principales */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                
                {/* MODO 1: Trivia contra La Máquina */}
                <div 
                  id="card_game_mode_solo"
                  onClick={startSoloTrivia}
                  className="bg-[#161F30] hover:bg-[#1C273C] border-2 border-[#25354F] hover:border-[#1CB0F6] rounded-2xl p-5 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 bg-[#1C2E4A] rounded-xl flex items-center justify-center text-[#1CB0F6] border border-[#183D6D]">
                      <Cpu className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm md:text-base font-black text-white group-hover:text-[#1CB0F6] transition-colors">Trivia vs La Máquina</h3>
                      <p className="text-[11px] md:text-xs text-slate-400 leading-relaxed mt-1 font-semibold">
                        Enfréntate a un bot inteligente en una trivia acelerada de 15 segundos por pregunta. ¡Gana el más veloz!
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-[11px] font-black text-[#1CB0F6] uppercase">
                    <span>Retar Bot</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                {/* MODO 2: Ruta del Nuevo Pacto */}
                <div 
                  id="card_game_mode_route"
                  onClick={() => setGameState('learn')}
                  className="bg-[#161F30] hover:bg-[#1C273C] border-2 border-[#25354F] hover:border-[#58CC02] rounded-2xl p-5 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 bg-[#1B2F22] rounded-xl flex items-center justify-center text-[#58CC02] border border-[#234A2F]">
                      <Compass className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm md:text-base font-black text-white group-hover:text-[#58CC02] transition-colors">Ruta de Aprendizaje</h3>
                      <p className="text-[11px] md:text-xs text-slate-400 leading-relaxed mt-1 font-semibold">
                        Explora la clásica ruta progresiva de lecciones de Duolingo, desbloqueando unidades del Antiguo y Nuevo Pacto.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-[11px] font-black text-[#58CC02] uppercase">
                    <span>Ver Itinerario</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                {/* MODO 3: Torneo Multijugador */}
                <div 
                  id="card_game_mode_tournament"
                  onClick={() => setGameState('tournament')}
                  className="bg-[#161F30] hover:bg-[#1C273C] border-2 border-[#25354F] hover:border-[#FFC000] rounded-2xl p-5 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 bg-[#2D261A] rounded-xl flex items-center justify-center text-[#FFC000] border border-[#4D3F22]">
                      <Sword className="h-5 w-5 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-sm md:text-base font-black text-white group-hover:text-[#FFC000] transition-colors">Torneo En Vivo</h3>
                      <p className="text-[11px] md:text-xs text-slate-400 leading-relaxed mt-1 font-semibold">
                        Crea o únete a salas en tiempo real de Firebase para medir tus respuestas contra tus hermanos de congregación.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-[11px] font-black text-[#FFC000] uppercase">
                    <span>Lobby Arena</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

              </div>

              {/* Guía activa */}
              <div id="active_guide_banner" className="bg-[#161F30] border border-[#25354F] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
                <div className="flex items-center space-x-3">
                  <Info className="h-5 w-5 text-[#1CB0F6] flex-shrink-0" />
                  <p className="text-[11px] md:text-xs text-slate-300 leading-relaxed font-semibold">
                    ¿No estás seguro de cómo se conectan las sombras del Antiguo Pacto con Cristo? Despliega la guía e infórmate antes de competir.
                  </p>
                </div>
                <button 
                  id="btn_open_active_guide"
                  onClick={() => setIsGuideOpen(true)}
                  className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-[#1CB0F6] border-b-2 border-slate-900 px-5 py-2.5 rounded-xl text-xs font-bold active:translate-y-[1px]"
                >
                  ABRIR GUÍA ACTIVA
                </button>
              </div>
            </motion.div>
          )}

            {/* ================= MODO 1: SOLO TRIVIA VS LA MÁQUINA ================= */}
            {gameState === 'solo_trivia' && (
              <motion.div
                key="solo_trivia"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="space-y-4 md:space-y-6"
              >
              
              {/* Carriles de progreso */}
              <div id="trivia_progress_section" className="bg-[#161F30] border border-[#25354F] rounded-2xl p-4 space-y-3 shadow-md">
                <div className="flex items-center justify-between text-[10px] font-black uppercase text-slate-400 pb-1.5 border-b border-[#25354F]">
                  <span>Progreso de Batalla</span>
                  <span className="text-[#1CB0F6]">Tus XP: {soloScorePlayer} | IA: {soloScoreAI}</span>
                </div>
                
                {/* Carril jugador */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-extrabold uppercase tracking-widest text-[#58CC02]">
                    <span>Tú (Discípulo)</span>
                    <span>{Math.min(100, Math.floor((soloQuestionIdx / getFlatQuestions().length) * 100))}%</span>
                  </div>
                  <div className="h-2.5 bg-[#0B0F19] rounded-full overflow-hidden relative">
                    <div 
                      className="h-full bg-gradient-to-r from-[#58CC02] to-[#74FD1D] rounded-full transition-all duration-500"
                      style={{ width: `${(soloQuestionIdx / getFlatQuestions().length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Carril bot */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-extrabold uppercase tracking-widest text-[#FF4B4B]">
                    <span>La Mente de la IA 🤖</span>
                    <span>{Math.min(100, Math.floor((soloQuestionIdx / getFlatQuestions().length) * 100))}%</span>
                  </div>
                  <div className="h-2.5 bg-[#0B0F19] rounded-full overflow-hidden relative">
                    <div 
                      className="h-full bg-gradient-to-r from-[#FF4B4B] to-[#FF8585] rounded-full transition-all duration-500"
                      style={{ width: `${(soloQuestionIdx / getFlatQuestions().length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Pantalla de Quiz Activo */}
              {!soloGameEnded ? (
                <div id="trivia_quiz_card" className="bg-[#161F30] border border-[#25354F] rounded-3xl p-5 md:p-8 space-y-4 md:space-y-6 shadow-xl relative overflow-hidden">
                  
                  {/* Cronómetro */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-rose-400 font-extrabold text-xs md:text-sm">
                      <Clock className="h-4 w-4 animate-pulse" />
                      <span>{soloTimer} segundos</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-bold">Pregunta {soloQuestionIdx + 1} de {getFlatQuestions().length}</span>
                  </div>

                  <div className="h-1.5 bg-[#0B0F19] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#FF4B4B] transition-all duration-1000"
                      style={{ width: `${(soloTimer / 15) * 100}%` }}
                    />
                  </div>

                  <h2 className="text-base md:text-xl font-black text-white leading-snug">
                    {getFlatQuestions()[soloQuestionIdx]?.question}
                  </h2>

                  {/* Renderizador Adaptativo de Preguntas */}
                  {renderAdaptiveQuestion(getFlatQuestions()[soloQuestionIdx])}

                  {/* Caja de validación */}
                  {questionAnswered && (
                    <div className="pt-4 border-t border-[#25354F] flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-start space-x-2 text-[11px] text-slate-300">
                        {isCorrect ? <CheckCircle className="h-5 w-5 text-[#58CC02] flex-shrink-0" /> : <XCircle className="h-5 w-5 text-[#FF4B4B] flex-shrink-0" />}
                        <p className="leading-normal">{getFlatQuestions()[soloQuestionIdx]?.explanation}</p>
                      </div>
                      <button 
                        id="btn_trivia_continue"
                        onClick={handleContinue}
                        className="w-full sm:w-auto px-6 py-3 bg-[#58CC02] text-white font-extrabold text-sm rounded-xl border-b-4 border-[#46A302] active:translate-y-[2px]"
                      >
                        CONTINUAR
                      </button>
                    </div>
                  )}

                </div>
              ) : (
                // Fin de Solo Trivia
                <div id="trivia_end_summary" className="bg-[#161F30] border border-[#25354F] rounded-3xl p-5 md:p-8 text-center space-y-4 shadow-xl">
                  <div className="w-16 h-16 bg-gradient-to-tr from-[#FFC000] to-amber-500 rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg rotate-12">
                    <Trophy className="h-8 w-8" />
                  </div>
                  
                  <div>
                    <h2 className="text-lg md:text-xl font-black text-white">¡Fin de la Batalla contra la IA!</h2>
                    <p className="text-slate-400 text-xs mt-1 font-semibold">Comparativa de rendimiento final:</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                    <div className="bg-[#0B0F19] p-3 rounded-xl border border-[#25354F]">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase">Tus Puntos</span>
                      <span className="text-lg font-black text-[#58CC02]">{soloScorePlayer} XP</span>
                    </div>
                    <div className="bg-[#0B0F19] p-3 rounded-xl border border-[#25354F]">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase">Puntos de la IA</span>
                      <span className="text-lg font-black text-[#FF4B4B]">{soloScoreAI} XP</span>
                    </div>
                  </div>

                  <div className="pt-2 space-y-2">
                    <button 
                      id="btn_play_trivia_again"
                      onClick={startSoloTrivia}
                      className="w-full max-w-xs py-3.5 bg-[#58CC02] text-white font-extrabold text-sm rounded-xl border-b-4 border-[#46A302] active:translate-y-[2px]"
                    >
                      JUGAR OTRA VEZ
                    </button>
                    <button 
                      id="btn_exit_trivia_to_cover"
                      onClick={() => setGameState('cover')}
                      className="block text-slate-400 hover:text-white text-[11px] font-bold underline mx-auto"
                    >
                      Volver al menú de juegos
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          )}

            {/* ================= MODO 2: RUTA DE APRENDIZAJE (DUOLINGO) ================= */}
            {gameState === 'learn' && (
              <motion.div
                key="learn"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="space-y-6"
              >
              
              <div className="flex items-center space-x-3">
                <button id="btn_back_learn_to_cover" onClick={() => setGameState('cover')} className="p-2 bg-[#161F30] hover:bg-slate-800 rounded-xl">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <h1 className="text-xl font-black text-white">Ruta del Nuevo Pacto</h1>
              </div>

              {/* Lista progresiva de Unidades */}
              <div className="space-y-8 relative">
                {courseData.map((unit, uIdx) => {
                  return (
                    <div key={unit.id || uIdx} className="space-y-4">
                      
                      {/* Cabecera de la Unidad */}
                      <div className={`p-5 rounded-2xl bg-gradient-to-r ${unit.gradient || 'from-[#1CB0F6] to-[#0D85D8]'} text-white shadow-md relative overflow-hidden`}>
                        <div className="relative z-10 space-y-1">
                          <span className="text-[9px] font-black uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">
                            UNIDAD {uIdx + 1}
                          </span>
                          <h2 className="text-base font-black">{unit.title}</h2>
                          <p className="text-[11px] text-white/95 leading-tight">{unit.subtitle}</p>
                        </div>
                      </div>

                      {/* Círculos de lección en cascada */}
                      <div className="flex flex-col items-center space-y-3 pt-2">
                        {unit.questions && unit.questions.map((q: any, idx: number) => {
                          const questionCompleted = completedLessons.includes(q.id);
                          return (
                            <div key={q.id || idx} className="flex flex-col items-center">
                              <button
                                onClick={() => {
                                  setActiveLessonUnit(unit);
                                  setLessonQuestionIdx(idx);
                                  setGameState('lesson_active');
                                  resetQuestionState();
                                }}
                                className={`w-16 h-16 rounded-full border-b-6 flex flex-col items-center justify-center font-extrabold text-white transition-all transform hover:scale-105 active:translate-y-[4px] active:border-b-2 shadow-md ${
                                  questionCompleted 
                                    ? 'bg-[#58CC02] border-[#46A302] hover:bg-[#68E20B]' 
                                    : 'bg-[#1CB0F6] border-[#1899D6] hover:bg-[#2fc4ff]'
                                }`}
                              >
                                {questionCompleted ? <Check className="h-6 w-6" /> : <span className="text-sm">{idx + 1}</span>}
                              </button>
                              <span className="text-[9px] font-bold text-slate-500 uppercase mt-1">Pregunta {idx + 1}</span>
                            </div>
                          );
                        })}
                      </div>

                    </div>
                  );
                })}
              </div>

            </motion.div>
          )}

            {/* CUESTIONARIO DE RUTA ACTIVO */}
            {gameState === 'lesson_active' && activeLessonUnit && (
              <motion.div
                key="lesson_active"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="bg-[#161F30] border border-[#25354F] rounded-3xl p-5 md:p-8 space-y-5 shadow-xl relative"
              >
              <div className="flex items-center justify-between">
                <button 
                  id="btn_leave_lesson"
                  onClick={() => setShowExitConfirm(true)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <XCircle className="h-5.5 w-5.5" />
                </button>
                <div className="flex-1 mx-4 h-2.5 bg-[#0B0F19] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#58CC02] transition-all duration-300"
                    style={{ width: `${(lessonQuestionIdx / activeLessonUnit.questions.length) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-slate-400 font-bold">{lessonQuestionIdx + 1}/{activeLessonUnit.questions.length}</span>
              </div>

              <h2 className="text-base md:text-xl font-black text-white leading-snug">
                {activeLessonUnit.questions[lessonQuestionIdx]?.question}
              </h2>

              {/* Renderizador unificado responsivo */}
              {renderAdaptiveQuestion(activeLessonUnit.questions[lessonQuestionIdx])}

              {questionAnswered && (
                <div className="pt-4 border-t border-[#25354F] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-start space-x-2 text-[11px] text-slate-300 font-semibold">
                    {isCorrect ? <CheckCircle className="h-5 w-5 text-[#58CC02] flex-shrink-0" /> : <XCircle className="h-5 w-5 text-[#FF4B4B] flex-shrink-0" />}
                    <p className="leading-relaxed">{activeLessonUnit.questions[lessonQuestionIdx]?.explanation}</p>
                  </div>
                  <button 
                    id="btn_lesson_continue"
                    onClick={handleContinue}
                    className="w-full sm:w-auto px-6 py-3 bg-[#58CC02] text-white font-extrabold text-sm rounded-xl border-b-4 border-[#46A302] active:translate-y-[2px]"
                  >
                    CONTINUAR
                  </button>
                </div>
              )}
            </motion.div>
          )}

            {/* ================= MODO 3: TORNEO MULTIJUGADOR ================= */}
            {gameState === 'tournament' && (
              <motion.div
                key="tournament"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="space-y-4 max-w-sm mx-auto"
              >
              <div className="flex items-center space-x-3">
                <button id="btn_back_tournament_to_cover" onClick={() => setGameState('cover')} className="p-2 bg-[#161F30] hover:bg-slate-800 rounded-xl">
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <h1 className="text-lg font-black text-white">Torneo Arena</h1>
              </div>

              {!currentLobbyId ? (
                <div className="bg-[#161F30] border border-[#25354F] rounded-2xl p-5 space-y-4 shadow-md">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-black uppercase text-slate-400">Introduce tu Apodo</label>
                    <input 
                      type="text"
                      value={myNickname}
                      onChange={(e) => setMyNickname(e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-[#0B0F19] border border-slate-700 text-white font-bold text-xs focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2 pt-2">
                    <button 
                      id="btn_create_tournament"
                      onClick={createTournamentLobby}
                      className="w-full py-3.5 bg-[#FFC000] text-slate-950 font-extrabold text-sm rounded-xl border-b-4 border-amber-600 active:translate-y-[2px]"
                    >
                      CREAR NUEVO TORNEO
                    </button>
                    
                    <div className="flex space-x-2">
                      <input 
                        type="text"
                        maxLength={4}
                        value={lobbyCodeInput}
                        onChange={(e) => setLobbyCodeInput(e.target.value)}
                        placeholder="Código"
                        className="w-24 p-3 rounded-xl bg-[#0B0F19] border border-slate-700 text-center text-white font-black text-xs"
                      />
                      <button id="btn_join_tournament" onClick={joinTournamentLobby} className="flex-1 bg-slate-800 text-white font-extrabold px-4 py-3 rounded-xl text-xs">
                        Unirse
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#161F30] rounded-2xl p-5 border border-[#25354F] text-center space-y-3 shadow-md">
                  <div className="bg-[#1C2C24] inline-block px-4 py-1.5 rounded-xl border border-[#2A4832]">
                    <span className="text-[10px] font-bold text-[#58CC02] uppercase tracking-widest block">Código de Sala</span>
                    <h2 className="text-xl font-black text-[#58CC02] tracking-widest">{currentLobbyId}</h2>
                  </div>

                  <div className="space-y-2 max-w-sm mx-auto">
                    {lobbyData && Object.values(lobbyData.players || {}).map((p: any) => (
                      <div key={p.id} className="flex items-center justify-between p-2.5 bg-slate-800/50 border border-slate-700 rounded-lg">
                        <span className="font-bold text-xs text-slate-200 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          {p.name}
                        </span>
                        <span className="text-[9px] font-bold text-slate-400">Conectado</span>
                      </div>
                    ))}
                  </div>

                  {isLobbyHost ? (
                    <button id="btn_host_start" onClick={hostStartTournament} className="w-full py-3 bg-[#58CC02] text-white font-extrabold text-sm rounded-xl border-b-4 border-[#46A302]">
                      INICIAR TORNEO
                    </button>
                  ) : (
                    <p className="text-[11px] text-slate-400 font-bold">Esperando al anfitrión...</p>
                  )}
                  <button id="btn_exit_lobby" onClick={exitLobby} className="text-xs text-rose-400 font-bold block mx-auto underline">Salir de la sala</button>
                </div>
              )}
            </motion.div>
          )}

            {/* JUEGO DEL TORNEO ACTIVO */}
            {gameState === 'tournament_active' && lobbyData && (
              <motion.div
                key="tournament_active"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
              <div className="md:col-span-2 bg-[#161F30] border border-[#25354F] rounded-3xl p-5 shadow-md space-y-4">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold">
                  <span>Sala: {currentLobbyId}</span>
                  <span>Pregunta {lessonQuestionIdx + 1}/{TOURNAMENT_QUESTIONS.length}</span>
                </div>

                <h2 className="text-sm md:text-base font-black text-white">{TOURNAMENT_QUESTIONS[lessonQuestionIdx]?.question}</h2>

                {/* Grid adaptable de respuestas en torneo */}
                {renderAdaptiveQuestion(TOURNAMENT_QUESTIONS[lessonQuestionIdx])}
              </div>

              {/* Marcador del Torneo */}
              <div className="bg-[#161F30] rounded-2xl p-4 border border-[#25354F] shadow-sm space-y-2">
                <h3 className="font-black text-xs text-slate-300">Tablero de Posiciones</h3>
                {Object.values(lobbyData.players || {}).sort((a: any, b: any) => b.score - a.score).map((p: any, idx: number) => (
                  <div key={p.id} className="p-2.5 bg-slate-800/60 border rounded-xl flex items-center justify-between text-xs">
                    <span>{idx + 1}. {p.name}</span>
                    <span className="font-black text-[#FFC000]">{p.score} XP</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

            {/* ================= SÍMBOLOS Y TIPOS (GLOSARIO) ================= */}
            {gameState === 'glossary' && (
              <motion.div
                key="glossary"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="space-y-6"
              >
              <div className="text-center space-y-2">
                <h1 className="text-2xl md:text-3xl font-black text-white">Símbolos y Tipología Bíblica</h1>
                <p className="text-slate-400 text-xs md:text-sm font-semibold">Aprende los fundamentos teológicos de las figuras históricas del Antiguo Pacto que se cumplen en Jesús.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {GLOSSARY_DATA.map((item, idx) => (
                  <div key={idx} className="bg-[#161F30] border border-[#25354F] rounded-2xl p-4 space-y-3 shadow-sm flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <span className="bg-[#1C2C24] text-[#58CC02] border border-[#2A4832] text-[8px] font-black px-2 py-0.5 rounded-md uppercase inline-block">
                        Sombra (A.T.)
                      </span>
                      <h3 className="text-xs md:text-sm font-black text-white pt-1">{item.type}</h3>
                      <p className="text-[11px] text-slate-300 leading-normal font-semibold">
                        <strong>Realidad:</strong> {item.antitype}
                      </p>
                    </div>
                    <span className="text-[9px] font-bold text-[#FFC000] text-right block">{item.bibleRef}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

            {/* ================= PANEL GESTOR DE CONTENIDOS (CMS AMIGABLE) ================= */}
            {gameState === 'cms' && !cmsAuth && (
              <motion.div
                key="cms_login"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="max-w-md mx-auto space-y-4 bg-[#161F30] border border-[#25354F] p-6 rounded-2xl shadow-xl mt-10"
              >
                <div className="text-center space-y-2">
                  <Database className="h-10 w-10 text-[#FF4B4B] mx-auto" />
                  <h2 className="text-xl font-black text-white">Acceso Administrativo</h2>
                  <p className="text-xs text-slate-400">Ingresa tus credenciales para administrar el currículum.</p>
                </div>
                <div className="space-y-3 pt-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Usuario</label>
                    <input 
                      type="text" 
                      value={cmsUsername}
                      onChange={(e) => setCmsUsername(e.target.value)}
                      className="w-full p-3 rounded-xl bg-[#0B0F19] border border-slate-700 text-white font-bold text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Contraseña</label>
                    <input 
                      type="password" 
                      value={cmsPassword}
                      onChange={(e) => setCmsPassword(e.target.value)}
                      className="w-full p-3 rounded-xl bg-[#0B0F19] border border-slate-700 text-white font-bold text-xs focus:outline-none"
                    />
                  </div>
                  <button 
                    onClick={() => {
                      if (cmsUsername === 'Admin' && cmsPassword === 'soyeladmin-che') {
                        setCmsAuth(true);
                      } else {
                        showToast("Credenciales incorrectas", true);
                      }
                    }}
                    className="w-full py-3 bg-[#FF4B4B] hover:bg-red-600 text-white font-extrabold text-sm rounded-xl border-b-4 border-red-800 active:translate-y-[2px]"
                  >
                    INGRESAR AL CMS
                  </button>
                </div>
              </motion.div>
            )}

            {gameState === 'cms' && cmsAuth && (
              <motion.div
                key="cms"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="space-y-6"
              >
              {/* Cabecera del CMS */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#25354F] pb-4">
                <div className="space-y-1">
                  <h1 className="text-2xl font-black text-white flex items-center gap-2">
                    <Database className="text-[#FF4B4B] h-6 w-6" />
                    Panel de Administración del Currículum
                  </h1>
                  <p className="text-slate-400 text-xs font-semibold">
                    Configura las unidades lecciónales de forma interactiva (Visual) o edita su código crudo (Raw JSON).
                  </p>
                </div>
                <button 
                  id="btn_cms_to_portal"
                  onClick={() => setGameState('cover')}
                  className="bg-[#161F30] border-2 border-[#25354F] px-4 py-2 rounded-xl text-xs font-black hover:bg-slate-800 transition text-[#1CB0F6]"
                >
                  Volver al Portal
                </button>
              </div>

              {/* Controles de Firebase y Respaldos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#161F30] border-2 border-[#25354F] p-4 rounded-2xl shadow-md">
                <div className="space-y-1">
                  <h3 className="font-extrabold text-xs uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                    <Cloud className="text-[#1CB0F6] h-4 w-4" />
                    Sincronización con Firebase
                  </h3>
                  <p className="text-[10px] text-slate-300 leading-relaxed font-semibold">
                    Guarda los cambios de forma síncrona en la nube de Firebase para que todos tus jugadores y alumnos vean las unidades actualizadas.
                  </p>
                  <div className="flex gap-2 pt-1.5">
                    <button 
                      id="btn_cms_save_to_cloud"
                      onClick={uploadCurriculumToFirebase}
                      className="px-3 py-2 bg-[#1CB0F6] hover:bg-[#1899D6] text-[#0B0F19] font-black text-xs rounded-xl flex items-center gap-1.5 transition-all shadow border-b-4 border-[#1479AB] active:translate-y-[1px]"
                    >
                      <Save className="h-3.5 w-3.5" />
                      Guardar en la Nube
                    </button>
                    <button 
                      id="btn_cms_restore_backups"
                      onClick={resetToDefaultCurriculum}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all"
                    >
                      Cargar Respaldos por Defecto
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-extrabold text-xs uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                    <FileText className="text-[#58CC02] h-4 w-4" />
                    Copia de Seguridad y Pruebas
                  </h3>
                  <p className="text-[10px] text-slate-300 leading-relaxed font-semibold">
                    Copia el JSON a tu portapapeles o aplica el código crudo que editaste de forma manual en la pestaña de código.
                  </p>
                  <div className="flex gap-2 pt-1.5">
                    <button 
                      id="btn_cms_copy_json"
                      onClick={() => {
                        navigator.clipboard.writeText(rawJsonText);
                        showToast("¡Código JSON copiado al portapapeles con éxito!");
                      }}
                      className="px-3 py-2 bg-[#58CC02] hover:bg-[#46A302] text-white font-black text-xs rounded-xl flex items-center gap-1.5 transition-all border-b-4 border-[#3B8902] active:translate-y-[1px]"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Copiar JSON
                    </button>
                    {cmsTab === 'raw_json' && (
                      <button 
                        id="btn_cms_apply_json"
                        onClick={applyJsonCurriculum}
                        className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-[#58CC02] font-black text-xs rounded-xl flex items-center gap-1.5 transition-all border border-[#2A4832]"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        Aplicar Cambios JSON
                      </button>
                    )}
                    <label className="cursor-pointer px-3 py-2 bg-slate-800 hover:bg-slate-700 text-[#FFC000] font-black text-xs rounded-xl flex items-center gap-1.5 transition-all border border-[#4D3F22]">
                      <Upload className="h-3.5 w-3.5" />
                      Carga a Granel
                      <input 
                        type="file" 
                        accept=".json"
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              try {
                                const parsed = JSON.parse(ev.target?.result as string);
                                setCourseData(parsed);
                                localStorage.setItem('grace_custom_curriculum', JSON.stringify(parsed));
                                showToast("JSON cargado con éxito.");
                              } catch(err) {
                                showToast("Error parseando archivo", true);
                              }
                            };
                            reader.readAsText(file);
                          }
                        }} 
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Members Table */}
              <div className="bg-[#161F30] border-2 border-[#25354F] p-5 rounded-2xl shadow-md">
                <h3 className="font-extrabold text-xs uppercase text-slate-400 tracking-wider mb-4 flex items-center gap-2">
                  <Users className="h-4 w-4" /> Miembros y Progreso
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#25354F] text-slate-400">
                        <th className="py-2">Nombre</th>
                        <th className="py-2">Rol</th>
                        <th className="py-2">XP</th>
                        <th className="py-2">Progreso</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map(m => (
                        <tr key={m.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 text-slate-200">
                          <td className="py-2.5 font-bold">{m.name}</td>
                          <td className="py-2.5">{m.role}</td>
                          <td className="py-2.5 font-black text-[#58CC02]">{m.xp} XP</td>
                          <td className="py-2.5">{m.progress}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Selector de Pestañas del CMS */}
              <div className="flex bg-[#0B0F19] p-1.5 rounded-2xl border-2 border-[#25354F] max-w-sm">
                <button
                  id="tab_cms_visual"
                  onClick={() => setCmsTab('visual')}
                  className={`flex-1 py-2 text-center text-xs font-black rounded-xl transition ${
                    cmsTab === 'visual'
                      ? 'bg-[#1C2E4A] text-[#1CB0F6] border border-[#1CB0F6]/25'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Editor Visual (Formulario)
                </button>
                <button
                  id="tab_cms_raw_json"
                  onClick={() => setCmsTab('raw_json')}
                  className={`flex-1 py-2 text-center text-xs font-black rounded-xl transition ${
                    cmsTab === 'raw_json'
                      ? 'bg-[#1C2E4A] text-[#1CB0F6] border border-[#1CB0F6]/25'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Código Raw JSON
                </button>
              </div>

              {/* PESTAÑA 1: EDITOR VISUAL */}
              {cmsTab === 'visual' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Sidebar izquierdo: Lista de Unidades */}
                  <div className="lg:col-span-4 bg-[#161F30] border-2 border-[#25354F] p-4 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black uppercase text-slate-300">Unidades de la Ruta</h3>
                      <button
                        id="btn_cms_add_unit"
                        onClick={handleAddUnit}
                        className="px-2.5 py-1 text-[10px] bg-[#58CC02] hover:bg-[#46A302] text-white font-black rounded-lg flex items-center gap-1 border-b-2 border-[#3B8902] active:translate-y-[1px]"
                      >
                        <Plus className="h-3 w-3" /> Añadir
                      </button>
                    </div>

                    <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1 fa-scroller">
                      {courseData.map((unit) => (
                        <div
                          key={unit.id}
                          onClick={() => {
                            setSelectedCmsUnitId(unit.id);
                            setSelectedCmsQuestionId(null);
                          }}
                          className={`p-3 rounded-xl border-2 text-left cursor-pointer transition ${
                            selectedCmsUnitId === unit.id
                              ? 'bg-[#1C2E4A] border-[#1CB0F6] text-white'
                              : 'bg-[#0B0F19] border-slate-700 hover:bg-slate-800 text-slate-300'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <h4 className="font-extrabold text-xs leading-snug">{unit.title}</h4>
                              <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{unit.subtitle}</p>
                              <span className="text-[9px] font-black text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded mt-1.5 inline-block">
                                {unit.questions?.length || 0} Preguntas
                              </span>
                            </div>
                            <button
                              id={`btn_delete_unit_${unit.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteUnit(unit.id);
                              }}
                              className="text-slate-500 hover:text-[#FF4B4B] p-1 hover:bg-slate-800/80 rounded"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                      {courseData.length === 0 && (
                        <p className="text-[11px] text-slate-400 text-center py-4 font-semibold">No hay unidades cargadas. ¡Crea una nueva!</p>
                      )}
                    </div>
                  </div>

                  {/* Panel Derecho: Edición de la Unidad Seleccionada */}
                  <div className="lg:col-span-8">
                    {selectedCmsUnitId ? (
                      (() => {
                        const activeUnit = courseData.find(u => u.id === selectedCmsUnitId);
                        if (!activeUnit) return null;

                        return (
                          <div className="space-y-6 bg-[#161F30] border-2 border-[#25354F] p-5 rounded-2xl">
                            
                            {/* Meta de Unidad */}
                            <div className="space-y-3 pb-4 border-b border-[#25354F]">
                              <h3 className="text-xs font-black uppercase text-[#1CB0F6] tracking-wider">Ajustes Generales de la Unidad</h3>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className="block text-[10px] font-black uppercase text-slate-400">Título de la Unidad</label>
                                  <input 
                                    type="text"
                                    value={activeUnit.title}
                                    onChange={(e) => handleUpdateUnitMeta(activeUnit.id, 'title', e.target.value)}
                                    className="w-full p-2.5 rounded-lg bg-[#0B0F19] border border-slate-700 text-white font-bold text-xs focus:outline-none focus:border-[#1CB0F6]"
                                  />
                                </div>
                                
                                <div className="space-y-1">
                                  <label className="block text-[10px] font-black uppercase text-slate-400">Estilo Gradiente (Tailwind)</label>
                                  <input 
                                    type="text"
                                    value={activeUnit.gradient}
                                    onChange={(e) => handleUpdateUnitMeta(activeUnit.id, 'gradient', e.target.value)}
                                    className="w-full p-2.5 rounded-lg bg-[#0B0F19] border border-slate-700 text-white font-bold text-xs focus:outline-none focus:border-[#1CB0F6]"
                                    placeholder="from-[#1CB0F6] to-[#0D85D8]"
                                  />
                                </div>
                              </div>

                              <div className="space-y-1">
                                <label className="block text-[10px] font-black uppercase text-slate-400">Subtítulo o Resumen Teológico</label>
                                <textarea 
                                  value={activeUnit.subtitle}
                                  onChange={(e) => handleUpdateUnitMeta(activeUnit.id, 'subtitle', e.target.value)}
                                  className="w-full p-2.5 rounded-lg bg-[#0B0F19] border border-slate-700 text-white font-bold text-xs h-16 resize-none focus:outline-none focus:border-[#1CB0F6]"
                                />
                              </div>
                            </div>

                            {/* Gestión de Preguntas de la Unidad */}
                            <div className="space-y-4">
                              <div className="flex items-center justify-between pb-2">
                                <h3 className="text-xs font-black uppercase text-[#58CC02] tracking-wider">
                                  Preguntas ({activeUnit.questions?.length || 0})
                                </h3>
                                <button
                                  id="btn_cms_add_question"
                                  onClick={() => handleAddQuestion(activeUnit.id)}
                                  className="px-3 py-1.5 text-[10px] bg-[#58CC02] hover:bg-[#46A302] text-white font-black rounded-lg flex items-center gap-1 border-b-2 border-[#3B8902] active:translate-y-[1px]"
                                >
                                  <Plus className="h-3 w-3" /> Añadir Pregunta
                                </button>
                              </div>

                              {/* Acordeón de preguntas */}
                              <div className="space-y-3">
                                {activeUnit.questions?.map((q: any, qIdx: number) => {
                                  const isExpanded = selectedCmsQuestionId === q.id;
                                  return (
                                    <div 
                                      key={q.id} 
                                      className="border border-[#25354F] bg-[#0B0F19] rounded-xl overflow-hidden"
                                    >
                                      {/* Cabecera Pregunta */}
                                      <div 
                                        onClick={() => setSelectedCmsQuestionId(isExpanded ? null : q.id)}
                                        className="p-3 bg-slate-800/30 flex items-center justify-between cursor-pointer hover:bg-slate-800/60"
                                      >
                                        <div className="flex items-center space-x-2">
                                          <span className="w-5 h-5 rounded-full bg-slate-700 text-slate-300 font-bold text-[10px] flex items-center justify-center">
                                            {qIdx + 1}
                                          </span>
                                          <span className="text-xs font-bold text-white max-w-sm md:max-w-lg truncate">
                                            {q.question || "(Enunciado Vacío)"}
                                          </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/25">
                                            {q.type === 'boolean' ? 'VxF' : 'Opción Múltiple'}
                                          </span>
                                          <button
                                            id={`btn_delete_q_${q.id}`}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleDeleteQuestion(activeUnit.id, q.id);
                                            }}
                                            className="text-slate-400 hover:text-[#FF4B4B] p-1"
                                          >
                                            <Trash2 className="h-3 w-3" />
                                          </button>
                                        </div>
                                      </div>

                                      {/* Contenido Editable de Pregunta */}
                                      {isExpanded && (
                                        <div className="p-4 border-t border-[#25354F] space-y-4 bg-[#161F30]/40">
                                          
                                          {/* Tipo y Enunciado */}
                                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                            <div className="md:col-span-1 space-y-1">
                                              <label className="block text-[9px] font-black uppercase text-slate-400">Tipo de Pregunta</label>
                                              <select
                                                value={q.type}
                                                onChange={(e) => handleUpdateQuestion(activeUnit.id, q.id, 'type', e.target.value)}
                                                className="w-full p-2 rounded-lg bg-[#0B0F19] border border-slate-700 text-white font-bold text-xs focus:outline-none"
                                              >
                                                <option value="multiple">Opción Múltiple</option>
                                                <option value="boolean">Verdadero / Falso</option>
                                              </select>
                                            </div>
                                            <div className="md:col-span-3 space-y-1">
                                              <label className="block text-[9px] font-black uppercase text-slate-400">Pregunta o Enunciado</label>
                                              <input 
                                                type="text"
                                                value={q.question}
                                                onChange={(e) => handleUpdateQuestion(activeUnit.id, q.id, 'question', e.target.value)}
                                                className="w-full p-2 rounded-lg bg-[#0B0F19] border border-slate-700 text-white font-bold text-xs focus:outline-none focus:border-[#58CC02]"
                                              />
                                            </div>
                                          </div>

                                          {/* Opciones y correcto */}
                                          <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                              <label className="block text-[9px] font-black uppercase text-slate-400">Opciones de Respuesta</label>
                                              {q.type === 'multiple' && (
                                                <div className="flex gap-2">
                                                  <button
                                                    onClick={() => handleRemoveOptionFromQuestion(activeUnit.id, q.id)}
                                                    disabled={q.options.length <= 2}
                                                    className="px-2 py-0.5 text-[8px] bg-slate-800 hover:bg-slate-700 text-rose-400 font-bold rounded border border-slate-700 disabled:opacity-50"
                                                  >
                                                    Remover Última
                                                  </button>
                                                  <button
                                                    onClick={() => handleAddOptionToQuestion(activeUnit.id, q.id)}
                                                    disabled={q.options.length >= 6}
                                                    className="px-2 py-0.5 text-[8px] bg-slate-800 hover:bg-slate-700 text-[#58CC02] font-semibold rounded border border-slate-700 disabled:opacity-50"
                                                  >
                                                    Agregar Opción
                                                  </button>
                                                </div>
                                              )}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                                              {q.options.map((opt: string, optIdx: number) => (
                                                <div key={optIdx} className="flex items-center space-x-2 bg-[#0B0F19] border border-slate-700 p-1.5 rounded-lg">
                                                  <input 
                                                    type="radio"
                                                    name={`correct_${q.id}`}
                                                    checked={q.correctIndex === optIdx}
                                                    onChange={() => handleUpdateQuestion(activeUnit.id, q.id, 'correctIndex', optIdx)}
                                                    className="text-[#58CC02] focus:ring-[#58CC02] bg-slate-800 border-slate-700 h-3.5 w-3.5 cursor-pointer"
                                                  />
                                                  <input 
                                                    type="text"
                                                    value={opt}
                                                    onChange={(e) => handleUpdateQuestionOption(activeUnit.id, q.id, optIdx, e.target.value)}
                                                    className="flex-1 bg-transparent border-none text-white font-bold text-xs p-1 focus:outline-none"
                                                  />
                                                </div>
                                              ))}
                                            </div>
                                            <p className="text-[8.5px] text-slate-400 font-medium">
                                              * Marca con el botón circular de la izquierda la opción que se considerará correcta.
                                            </p>
                                          </div>

                                          {/* Explicación Exegética */}
                                          <div className="space-y-1">
                                            <label className="block text-[9px] font-black uppercase text-slate-400">Sentido Teológico / Explicación del Logro</label>
                                            <textarea 
                                              value={q.explanation}
                                              onChange={(e) => handleUpdateQuestion(activeUnit.id, q.id, 'explanation', e.target.value)}
                                              className="w-full p-2.5 rounded-lg bg-[#0B0F19] border border-slate-700 text-white font-bold text-xs h-16 resize-none focus:outline-none focus:border-[#58CC02]"
                                              placeholder="Escribe por qué es correcto para edificar la fe del catequista."
                                            />
                                          </div>

                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                                {(!activeUnit.questions || activeUnit.questions.length === 0) && (
                                  <p className="text-[11px] text-slate-400 text-center py-6 font-semibold">Esta unidad aún no tiene preguntas. ¡Añade tu primera pregunta!</p>
                                )}
                              </div>
                            </div>

                          </div>
                        );
                      })()
                    ) : (
                      <div className="bg-[#161F30] border-2 border-dashed border-[#25354F] p-8 rounded-2xl text-center space-y-2">
                        <Database className="h-10 w-10 text-slate-500 mx-auto" />
                        <h3 className="font-extrabold text-sm text-slate-200">No hay Unidad Seleccionada</h3>
                        <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed font-medium">
                          Selecciona una de las unidades dinámicas de la barra lateral para editar su información general, sus preguntas doctrinales o añadir nuevas lecciones.
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* PESTAÑA 2: CÓDIGO RAW JSON INTACTO */}
              {cmsTab === 'raw_json' && (
                <div className="space-y-4">
                  {/* Editor del Raw JSON */}
                  <div className="space-y-2 bg-[#161F30] border-2 border-[#25354F] p-5 rounded-2xl shadow-md">
                    <label className="block text-xs font-black uppercase text-slate-400 tracking-wider">Editor Directo de Código JSON</label>
                    <textarea 
                      value={rawJsonText}
                      onChange={(e) => setRawJsonText(e.target.value)}
                      className="w-full h-80 bg-[#0B0F19] border border-slate-700 p-4 rounded-xl text-xs font-mono text-[#58CC02] focus:outline-none focus:border-[#58CC02] leading-relaxed resize-none"
                      placeholder="[{ id: 'unit_1', ... }]"
                    />
                  </div>

                  {/* Guía Rápida */}
                  <div className="bg-[#1C2E4A] border border-[#183D6D] p-5 rounded-2xl space-y-2 text-xs md:text-sm">
                    <h4 className="font-extrabold text-[#1CB0F6] flex items-center gap-1.5 font-semibold">
                      <Info className="h-4 w-4" />
                      Instrucciones del Esquema de Preguntas
                    </h4>
                    <p className="text-slate-300 leading-relaxed font-semibold">
                      Asegúrate de respetar este orden estructurado si modificas o agregas preguntas por tu cuenta en el editor de código:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-slate-400 leading-relaxed font-medium">
                      <li><strong>id:</strong> Identificador único para evitar solapamientos en las lecciones completadas académicamente.</li>
                      <li><strong>type:</strong> Puede ser <code className="text-[#FFC000]">"multiple"</code> para opción múltiple o <code className="text-[#FFC000]">"boolean"</code> para verdadero o falso.</li>
                      <li><strong>correctIndex:</strong> El índice numérico que define cuál opción es la correcta (comenzando en 0 para la primera, 1 para la segunda, etc.).</li>
                    </ul>
                  </div>
                </div>
              )}

            </motion.div>
          )}
        </AnimatePresence>

        </div>
      </main>

      {/* MENÚ MÓVIL INFERIOR FLOTANTE */}
      <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0F172A] border-t border-[#1E293B] flex justify-around py-3 z-40 shadow-xl">
        <button id="mobile_nav_portal" onClick={() => { setGameState('cover'); exitLobby(); }} className={`flex flex-col items-center ${gameState === 'cover' ? 'text-[#1CB0F6]' : 'text-slate-400'}`}>
          <Compass className="h-5.5 w-5.5" />
          <span className="text-[9px] font-bold mt-0.5">Portal</span>
        </button>
        <button id="mobile_nav_learn" onClick={() => { setGameState('learn'); }} className={`flex flex-col items-center ${gameState === 'learn' ? 'text-[#58CC02]' : 'text-slate-400'}`}>
          <Navigation className="h-5.5 w-5.5" />
          <span className="text-[9px] font-bold mt-0.5">Ruta</span>
        </button>
        <button id="mobile_nav_glossary" onClick={() => { setGameState('glossary'); }} className={`flex flex-col items-center ${gameState === 'glossary' ? 'text-[#FFC000]' : 'text-slate-400'}`}>
          <BookOpen className="h-5.5 w-5.5" />
          <span className="text-[9px] font-bold mt-0.5">Símbolos</span>
        </button>
        <button id="mobile_nav_cms" onClick={() => { setGameState('cms'); }} className={`flex flex-col items-center ${gameState === 'cms' ? 'text-[#FF4B4B]' : 'text-slate-400'}`}>
          <Database className="h-5.5 w-5.5" />
          <span className="text-[9px] font-bold mt-0.5">CMS</span>
        </button>
      </footer>

      {/* MODAL INTERACTIVO DE GUÍA ACTIVA PREMIUM */}
      <AnimatePresence>
        {isGuideOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 z-50"
          >
            <motion.div 
              initial={{ scale: 0.93, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 15 }}
              className="bg-[#161F30] border-2 border-[#25354F] w-full max-w-lg rounded-3xl p-5 shadow-2xl relative overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="flex items-center justify-between border-b border-[#25354F] pb-3 mb-3 text-sm">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-[#1CB0F6]" />
                  <span className="font-black text-white">Guía de Tipología y Sombras</span>
                </div>
                <button id="btn_close_guide_x" onClick={() => setIsGuideOpen(false)} className="p-1 text-slate-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Tabs internas del modal */}
              <div className="flex bg-[#0B0F19] p-1 rounded-xl mb-3 text-[11px] font-black">
                <button 
                  id="tab_guide_sombras"
                  onClick={() => setGuideTab('sombras')}
                  className={`flex-1 py-1.5 rounded-lg text-center transition ${guideTab === 'sombras' ? 'bg-[#1C2E4A] text-[#1CB0F6]' : 'text-slate-500'}`}
                >
                  Teología
                </button>
                <button 
                  id="tab_guide_ejemplos"
                  onClick={() => setGuideTab('ejemplos')}
                  className={`flex-1 py-1.5 rounded-lg text-center transition ${guideTab === 'ejemplos' ? 'bg-[#1C2E4A] text-[#1CB0F6]' : 'text-slate-500'}`}
                >
                  Modelos
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs leading-relaxed text-slate-300">
                {guideTab === 'sombras' && (
                  <div className="space-y-2">
                    <p className="font-semibold">
                      El término <strong>'Sombra'</strong> hace referencia a que las leyes ceremoniales dadas a Moisés no eran la meta definitiva, sino una ilustración didáctica visible de la obra redentora de Jesús.
                    </p>
                    <div className="bg-[#0B0F19] border border-[#25354F] p-3 rounded-xl space-y-1">
                      <h4 className="font-extrabold text-[10px] text-white uppercase tracking-wider">Planos vs Edificios</h4>
                      <p className="text-[10px] text-slate-400 leading-normal font-semibold">
                        Moisés vio el modelo en el monte (el plano arquitectónico); Jesucristo es el templo verdadero ya edificado en los cielos para darnos libre acceso.
                      </p>
                    </div>
                  </div>
                )}

                {guideTab === 'ejemplos' && (
                  <div className="space-y-1.5">
                    <div className="p-2.5 bg-[#0B0F19] rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase block">Antiguo Pacto</span>
                        <strong className="text-white text-xs">Roca Golpeada</strong>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-500" />
                      <div className="text-right">
                        <span className="text-[8px] font-bold text-slate-400 uppercase block">Nuevo Pacto</span>
                        <strong className="text-[#58CC02] text-xs">Cristo Crucificado</strong>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button 
                id="btn_guide_done"
                onClick={() => setIsGuideOpen(false)}
                className="w-full mt-4 py-3 bg-[#58CC02] text-white font-extrabold text-sm rounded-xl border-b-4 border-[#46A302] hover:bg-[#68E20B] active:translate-y-[2px]"
              >
                ENTENDIDO, A ENTRENAR
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
