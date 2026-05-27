import { Unit, Question, GlossaryItem } from './types';

export const COURSE_DATA: Unit[] = [
  {
    unitId: 1,
    unitTitle: "Unidad 1: Sombras del Tabernáculo",
    unitSub: "El Santuario terrenal y sus ritos eran una maqueta didáctica del templo espiritual eterno.",
    color: "from-[#161F30] to-[#25354F]",
    lessons: [
      {
        id: "l1_1",
        title: "El Velo, la Carne y el Lugar Santísimo",
        icon: "Temple",
        xpReward: 50,
        questions: [
          {
            type: "multiple",
            question: "¿Qué representaba el velo del templo que separaba el Lugar Santo del Lugar Santísimo?",
            options: [
              "La división permanente e insalvable entre Dios y la humanidad.",
              "La carne de Jesucristo, la cual al ser rasgada nos abrió un camino nuevo y vivo.",
              "Un simple adorno tradicional ordenado a Moisés sin valor espiritual.",
              "El misterio del conocimiento gnóstico prohibido."
            ],
            correctIndex: 1,
            explanation: "Según Hebreos 10:19-20, tenemos libertad para entrar al Lugar Santísimo por la sangre de Jesucristo, por el camino nuevo y vivo que él nos abrió a través del velo, esto es, de su carne."
          },
          {
            type: "wordbank",
            question: "Ordena los conceptos para completar Hebreos 10:1 (La Ley como sombra):",
            correctOrder: ["La", "ley,", "teniendo", "la", "sombra", "de", "los", "bienes", "venideros"],
            words: ["ley,", "sombra", "bienes", "venideros", "La", "teniendo", "de", "los", "la"],
            explanation: "La ley del Antiguo Pacto solo contenía la sombra (el bosquejo) de las realidades perfectas que Cristo traería en el Nuevo Pacto."
          },
          {
            type: "matching",
            question: "Empareja la Sombra del Antiguo Pacto con su Realidad en Cristo:",
            pairs: [
              { shadow: "Sumo Sacerdote Levita", reality: "Jesús, Sumo Sacerdote eterno según el orden de Melquisedec" },
              { shadow: "Sangre de machos cabríos", reality: "La sangre perfecta de Cristo derramada de una vez por todas" },
              { shadow: "Lugar Santísimo terrenal", reality: "El mismísimo cielo donde Cristo intercede hoy por nosotros" }
            ],
            explanation: "El sacerdocio terrenal y los sacrificios animales eran temporales e imperfectos, señalando la obra perfecta y eterna de Jesús."
          },
          {
            type: "boolean",
            question: "El Sumo Sacerdote del Antiguo Pacto debía ofrecer sacrificios primero por sus propios pecados antes de poder interceder por el pueblo.",
            correctAnswer: true,
            explanation: "Es verdadero. A diferencia de Cristo, que no tuvo pecado, los sumos sacerdotes terrenales eran débiles y pecadores (Hebreos 7:27)."
          }
        ]
      },
      {
        id: "l1_2",
        title: "El Sacrificio de la Pascua",
        icon: "Fire",
        xpReward: 50,
        questions: [
          {
            type: "multiple",
            question: "¿Por qué el sacrificio del Cordero Pascual en Egipto evitaba el juicio de la muerte sobre los primogénitos?",
            options: [
              "Porque la sangre en los postes era una señal de que la justicia divina ya había sido ejecutada sobre un sustituto.",
              "Porque la sangre tenía propiedades mágicas que asustaban al ángel.",
              "Porque los israelitas eran moralmente perfectos frente a los egipcios.",
              "Porque era una muestra de riqueza familiar."
            ],
            correctIndex: 0,
            explanation: "1 Corintios 5:7 declara: 'Porque nuestra pascua, que es Cristo, ya fue sacrificada por nosotros'. La muerte del cordero sustituto protegió a Israel de la ira justa de Dios."
          },
          {
            type: "wordbank",
            question: "Completa la famosa declaración de Juan el Bautista al ver a Jesús:",
            correctOrder: ["He", "aquí", "el", "Cordero", "de", "Dios", "que", "quita", "el", "pecado"],
            words: ["el", "Cordero", "pecado", "de", "He", "aquí", "Dios", "que", "quita", "el"],
            explanation: "Jesucristo es el verdadero antitipo de todos los corderos sacrificados en el Antiguo Testamento."
          },
          {
            type: "boolean",
            question: "La sangre del Antiguo Pacto borraba por completo la conciencia de pecado en quienes la ofrecían.",
            correctAnswer: false,
            explanation: "Es falso. Hebreos 10:4 nos dice: 'porque la sangre de los toros y de los machos cabríos no puede quitar los pecados'. Solo cubría temporalmente la transgresión hasta que viniera Cristo."
          }
        ]
      }
    ]
  },
  {
    unitId: 2,
    unitTitle: "Unidad 2: Personajes y Provisiones",
    unitSub: "Los líderes y las provisiones milagrosas retrataban la geografía espiritual de la Gracia.",
    color: "from-[#111A24] to-[#25354F]",
    lessons: [
      {
        id: "l2_1",
        title: "La Roca, el Maná y la Serpiente",
        icon: "Crown",
        xpReward: 60,
        questions: [
          {
            type: "multiple",
            question: "¿Por qué se compara el sacerdocio de Jesús con el de Melquisedec en lugar del de Aarón?",
            options: [
              "Porque Melquisedec no tiene registro de genealogía ni fin de días, tipificando el carácter eterno del sacerdocio de Cristo.",
              "Porque Melquisedec era un rey guerrero que conquistaba por la fuerza física.",
              "Porque el sacerdocio levítico (de Aarón) era demasiado moderno para Jesús.",
              "Porque Melquisedec escribió gran parte del Nuevo Testamento."
            ],
            correctIndex: 0,
            explanation: "Hebreos 7 explica que Melquisedec, al no tener principio de días ni fin de vida registrado, es hecho semejante al Hijo de Dios, permaneciendo sacerdote para siempre."
          },
          {
            type: "wordbank",
            question: "Completa la tipología de Moisés según Deuteronomio 18:15:",
            correctOrder: ["Profeta", "de", "en", "medio", "de", "ti", "te", "levantará", "Jehová"],
            words: ["te", "de", "en", "Profeta", "Jehová", "levantará", "ti", "medio", "de"],
            explanation: "Moisés profetizó que Dios levantaría un Profeta como él, refiriéndose a Jesucristo, quien traería el verdadero mensaje de liberación espiritual."
          },
          {
            type: "matching",
            question: "Relaciona las facetas de Moisés con el cumplimiento en Jesús:",
            pairs: [
              { shadow: "Moisés libertador de la esclavitud física", reality: "Jesús libertador de la esclavitud del pecado y Satanás" },
              { shadow: "Moisés mediador de la Ley en piedra", reality: "Jesús mediador de la Gracia escrita en el corazón" },
              { shadow: "Moisés intercediendo por el pueblo rebelde", reality: "Jesús intercediendo eternamente a la diestra del Padre" }
            ],
            explanation: "Moisés fue fiel como siervo sobre la casa, pero Cristo es el Hijo y Señor de toda la casa de la fe."
          }
        ]
      }
    ]
  }
];

export const TOURNAMENT_QUESTIONS: Question[] = [
  {
    type: "multiple",
    question: "¿De qué manera el Maná en el desierto prefigura la obra y persona de Jesucristo?",
    options: [
      "Era un alimento común y corriente que cualquiera podía cultivar.",
      "Representa a Jesús como el verdadero Pan Vivo descendido del cielo que sacia eternamente.",
      "Simboliza la ley del Sinaí que debía ser guardada bajo pena de castigo físico.",
      "No tiene relación espiritual con el Nuevo Testamento."
    ],
    correctIndex: 1,
    explanation: "En Juan 6:35, Jesús declara: 'Yo soy el pan de vida; el que a mí viene, nunca tendrá hambre'."
  },
  {
    type: "boolean",
    question: "La Roca herida en el desierto, de la cual fluyó agua para apagar la sed de Israel, representa a Cristo siendo herido para darnos el Espíritu Santo.",
    correctAnswer: true,
    explanation: "Correcto. 1 Corintios 10:4 afirma explícitamente: 'y la roca era Cristo'."
  },
  {
    type: "multiple",
    question: "¿Por qué el Sumo Sacerdote entraba al Lugar Santísimo solo una vez al año en el Día de la Expiación (Yom Kippur)?",
    options: [
      "Porque era un recordatorio anual de que el camino directo al Trono de Dios aún no estaba abierto.",
      "Porque le daba flojera entrar más seguido.",
      "Porque las leyes de higiene del desierto prohibían una entrada constante.",
      "Para limpiar físicamente el polvo acumulado en el Arca."
    ],
    correctIndex: 0,
    explanation: "Hebreos 9:7-8 enseña que esto indicaba que el camino al Lugar Santísimo no estaba descubierto en tanto el primer tabernáculo estuviese en pie."
  }
];

// Glosario para estudio
export const GLOSSARY_DATA: GlossaryItem[] = [
  { type: "El Maná en el desierto", antitype: "Jesús como el verdadero Pan de Vida descendido del cielo.", bibleRef: "Juan 6:35" },
  { type: "La Roca herida de donde brotó agua", antitype: "La roca espiritual que fue herida para darnos el agua del Espíritu Santo.", bibleRef: "1 Corintios 10:4" },
  { type: "La Serpiente de bronce levantada en el asta", antitype: "Jesús levantado en la cruz para que todo el que mire a Él con fe sea salvo de la mordedura del pecado.", bibleRef: "Juan 3:14-15" }
];
