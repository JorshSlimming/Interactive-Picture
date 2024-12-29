// Importamos la clase GoogleGenerativeAI desde el paquete para interactuar con la API de Google
import { GoogleGenerativeAI } from '@google/generative-ai';

// Función para inicializar la API y obtener el modelo generativo
export const initializeAPI = (apiKey) => {
  // Creamos una instancia de GoogleGenerativeAI con la clave API proporcionada
  const genAI = new GoogleGenerativeAI(apiKey); 
  // Obtenemos el modelo generativo 'gemini-1.5-flash' desde la instancia de la API
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // Retornamos un objeto con la instancia de la API y el modelo generativo
  return { genAI, model };
};

// Función para validar si la clave API proporcionada es válida
export const validateApiKey = async (apiKey) => {
  // Inicializamos la API con la clave API y obtenemos el modelo generativo
  const { model } = initializeAPI(apiKey); 

  // Definimos un 'prompt' simple para probar si la API responde correctamente
  const simplePrompt = "¿Cuál es la fecha actual?"; 

  try {
    // Intentamos generar contenido utilizando el modelo con el prompt simple
    const result = await model.generateContent(simplePrompt);
    // Extraemos el texto de la respuesta generada
    const responseText = result.response.text();

    // Si no se recibe una respuesta válida, lanzamos un error
    if (!responseText) {
      throw new Error("No se recibió respuesta válida.");
    }

    // Si la respuesta es válida, devolvemos true
    return true;
  } catch (error) {    
    // Si ocurre un error, lo mostramos en consola y retornamos false
    console.error('Error de validación de API Key:', error.message);
    return false;
  }
};

// Función para obtener una descripción detallada de un personaje o tema
export const fetchCharacterDescription = async (title, model, lang) => {
  // Definimos los prompts en español e inglés para generar la descripción
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

  // Seleccionamos el prompt correspondiente según el idioma especificado
  const prompt = prompts[lang]; 

  try {
    // Intentamos generar contenido utilizando el modelo con el prompt seleccionado
    const result = await model.generateContent(prompt);
    // Extraemos el texto de la respuesta generada
    let responseText = result.response.text();

    // Si no se recibe una respuesta válida, lanzamos un error
    if (!responseText) {
      throw new Error("Respuesta vacía o inválida.");
    }

    // Si la respuesta es válida, la retornamos
    return responseText;
  } catch (err) {
    // Si ocurre un error, lanzamos una excepción con el mensaje de error
    throw new Error(`Error al obtener los datos: ${err.message}`);
  }
};
