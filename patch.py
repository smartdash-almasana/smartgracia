import re
import codecs

with codecs.open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

new_default_data = """const DEFAULT_COURSE_DATA = [
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
];"""

content = re.sub(r'const DEFAULT_COURSE_DATA = \[.*?\];\n', new_default_data + '\n', content, flags=re.DOTALL)

with codecs.open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
