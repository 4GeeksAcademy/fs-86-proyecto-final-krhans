# Khrans - Integración de Gemini para la creación de rutinas personalizadas

¡Bienvenidos al repositorio de **Khrans**! Este proyecto tiene como objetivo ofrecer ejercicios y coaching personalizado para los usuarios, adaptando las rutinas a sus necesidades basadas en sus respuestas a encuestas. A continuación, se explica cómo hemos integrado **Gemini** para crear rutinas personalizadas, así como el uso de la **API Key** para autenticar nuestras solicitudes.

## Descripción de la integración

**Gemini** se ha integrado en **Khrans** como un **componente de IA** que genera rutinas de ejercicio personalizadas según las respuestas de los usuarios en la encuesta. Gracias a esta integración, nuestros usuarios reciben planes de ejercicios altamente adaptados a sus metas y condiciones personales.

### Flujo de trabajo

1. **Encuesta del usuario**: Los usuarios responden una serie de preguntas sobre su condición física, metas, preferencias de ejercicio, etc.
2. **Almacenaje de respuestas**: Las respuestas se almacenan en el estado de React, listas para ser enviadas a Gemini.
3. **Llamada a Gemini**: Se envía la información a la API de Gemini, que utiliza el modelo de IA para generar una rutina personalizada.
4. **Generación de rutina**: Gemini devuelve una rutina de ejercicios adaptada a las respuestas.
5. **Almacenaje de la rutina**: La rutina se guarda en el backend del proyecto y se muestra en la interfaz de usuario.

## Implementación del código

Para integrar Gemini, utilizamos el paquete `@google/generative-ai`. A continuación, te mostramos el código utilizado para la integración.

### Código de integración:

```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";

// Configuración de la API Key de Gemini
const API_KEY = process.env.GEMINI_API_KEY; 
const genAI = new GoogleGenerativeAI(API_KEY);

// Función para obtener la respuesta de Gemini
export async function getGeminiResponse(prompt, retries = 3, delay = 3000) {
  try {
    // Configuración del modelo Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Generación de contenido a partir del prompt proporcionado
    const result = await model.generateContent(prompt);
    
    // Retorno del texto generado por Gemini
    return result.response.text();
  } catch (error) {
    console.error("Error al obtener respuesta de Gemini:", error);

    // Manejo de errores: reintento en caso de fallo
    if (error.message.includes("503") && retries > 0) {
      console.warn(`Servidor sobrecargado. Reintentando en ${delay / 1000} segundos...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return getGeminiResponse(prompt, retries - 1, delay);
    }

    // Mensaje de error si no se pueden obtener datos de la IA
    return "Hubo un problema con la IA. Inténtalo más tarde.";
  }
}.
```

## 📜 Explicación del código

### 1. **Importación de la librería**:
Usamos el paquete `@google/generative-ai` para interactuar con el servicio **Gemini**, lo que nos permite generar rutinas personalizadas utilizando inteligencia artificial.

### 2. **API Key**:
La **API Key** se guarda de forma segura en un archivo `.env` y se pasa a través de la variable `process.env.GEMINI_API_KEY`. Esto asegura que la clave no sea expuesta en el código fuente.

### 3. **Función `getGeminiResponse`**:
Esta función recibe un `prompt` (texto con las respuestas del usuario) y utiliza el modelo de IA `gemini-pro` para generar contenido. Además, en caso de error, implementa un mecanismo de **reintento** (hasta 3 veces) si el servidor responde con un error de tipo **503** (servicio no disponible).

### 4. Respuesta generada:
La función devuelve el texto generado por Gemini, que luego se procesa y se presenta en la interfaz de usuario.

## 🔑 Uso de la API Key
Para utilizar Gemini, es necesario contar con una API Key que autentique las solicitudes a su servicio. A continuación, se detallan los pasos para obtenerla y utilizarla correctamente:

## 🔑 Pasos para obtener la API Key

1. **Regístrate** en el portal de desarrolladores de **Gemini**.
2. **Crea un nuevo proyecto** y obtén tu **API Key** desde la sección **"API Keys"**.
3. **Guarda esta clave en un archivo `.env`** para mantenerla segura:

```bash
REACT_APP_GEMINI_API_KEY=tu_api_key_aqui
```
## 🔑 Acceso a la API Key en el código

En tu código de **React**, puedes acceder a la **API Key** de esta manera:

```javascript
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
```

# 🚀 Conclusión
La integración de Gemini en Mundo Fit permite crear rutinas personalizadas basadas en las respuestas de los usuarios, mejorando su experiencia y ayudándolos a alcanzar sus metas de forma efectiva. Gracias a esta poderosa herramienta de IA, los planes de ejercicio se adaptan de manera dinámica a las necesidades de cada usuario.

Si tienes alguna duda sobre la implementación o necesitas más información, no dudes en abrir un issue o enviar un pull request.