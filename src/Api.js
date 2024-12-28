import { GoogleGenerativeAI } from '@google/generative-ai';

// Crear y devolver la instancia del modelo de la API
export const initializeAPI = (apiKey) => {
  const genAI = new GoogleGenerativeAI(apiKey);  // Usamos la API Key que pasamos
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  return { genAI, model };
};

// Función para validar la API Key
export const validateApiKey = async (apiKey) => {
  const { model } = initializeAPI(apiKey); // Inicializamos la API con la API Key

  const simplePrompt = "¿Cuál es la fecha actual?"; // Prompt simple para validar la clave

  try {
    const result = await model.generateContent(simplePrompt);
    const responseText = result.response.text();

    // Si no hay respuesta, o la respuesta es vacía, la API Key es inválida
    if (!responseText) {
      throw new Error("No se recibió respuesta válida.");
    }

    // Si recibimos una respuesta válida, consideramos que la API Key es válida
    return true;
  } catch (error) {
    // Si hay un error (como la clave inválida), lanzamos un error
    console.error('Error de validación de API Key:', error.message);
    return false;
  }
};

// Función para obtener la descripción del personaje con idioma específico
export const fetchCharacterDescription = async (title, model, lang) => {
  // Cambiar el prompt dependiendo del idioma
  const prompts = {
    es: `Proporciona una breve descripción de ${title} de manera clara, detallada y narrativa. Incluye los siguientes aspectos:
    - Su fecha de nacimiento y muerte (si aplica). 
    - Su ocupación principal y los logros más importantes en su carrera.
    - El contexto histórico en el que vivió y cómo influyó en él.
    - Las razones por las cuales es reconocido y su impacto en la historia.

    Si es un objeto no uses términos como "nacido en" o "su ocupación fue". 
    La respuesta debe ser fluida y bien estructurada, como si fuera un breve párrafo o biografía. 
    No debes poner el nombre en la descripcion, ni tampoco destacar en negrita, cursiva o caracteres especiales.
    Por favor, limita la respuesta a no más de 200 palabras.`,
    en: `Provide a brief, clear, and narrative description of ${title}. Include the following aspects:
    - The person's birth and death date (if applicable).
    - Their main occupation and key achievements.
    - The historical context in which they lived and how it influenced them.
    - The reasons they are recognized and their impact on history.

    If it's an object, do not use terms like "born in" or "their occupation was." 
    The answer should be fluid and well-structured, like a brief paragraph or biography. 
    Do not mention the name in the description or emphasize it in bold, italics, or special characters.
    Please limit the response to no more than 200 words.`
  };

  const prompt = prompts[lang]; // Selecciona el prompt según el idioma

  try {
    const result = await model.generateContent(prompt);
    let responseText = result.response.text();

    // Verificar si la respuesta es válida
    if (!responseText) {
      throw new Error("Respuesta vacía o inválida.");
    }

    return responseText;
  } catch (err) {
    throw new Error(`Error al obtener los datos: ${err.message}`);
  }
};
