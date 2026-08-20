import sys
from deep_translator import GoogleTranslator

# deep-translator (GoogleTranslator) has a hard limit of 5000 chars per request.
GOOGLE_TRANSLATE_LIMIT = 4500  # conservative limit


def safe_print(msg: str):
    """Windows CP1252-safe print that strips non-ASCII characters for logging."""
    try:
        print(msg)
    except UnicodeEncodeError:
        # Encode to ASCII ignoring non-encodable chars (Hindi/Bengali chars etc.)
        safe_msg = msg.encode("ascii", errors="replace").decode("ascii")
        print(safe_msg)


class MultilingualTranslator:
    """
    Multilingual Translator using deep-translator (GoogleTranslator).
    Supports: hi, bn, mr, pa, ta, te, gu, en.
    Handles Windows CP1252 encoding constraint for safe console logging.
    """

    def __init__(self):
        self.supported_langs = {
            "en": "English",  # Allowed as target (for regional → English translation)
            "hi": "Hindi",
            "bn": "Bengali",
            "mr": "Marathi",
            "pa": "Punjabi",
            "ta": "Tamil",
            "te": "Telugu",
            "gu": "Gujarati"
        }

    def _translate_chunk(self, text: str, target_lang: str) -> str:
        """Translate a single chunk (must be under char limit)."""
        return GoogleTranslator(source="auto", target=target_lang).translate(text)

    def translate_text(self, text: str, target_lang: str = "hi") -> str:
        """
        Translates English text into the target regional language.
        Automatically splits long text into chunks to handle the 5000-char limit.
        Returns original text if translation fails.
        """
        if not text:
            return text
        # Allow translating TO English (for web_agent Hindi → English query conversion)
        if target_lang not in self.supported_langs:
            return text

        text = text.strip()

        try:
            # Short text — single call
            if len(text) <= GOOGLE_TRANSLATE_LIMIT:
                result = self._translate_chunk(text, target_lang)
                if result:
                    safe_print(f"[TRANSLATOR] OK -> lang={target_lang}, len={len(result)}")
                    return result
                return text

            # Chunked translation for long summaries
            safe_print(f"[TRANSLATOR] Long text ({len(text)} chars), splitting into chunks...")
            chunks = []
            sentences = text.replace(". ", ".|").split("|")
            current_chunk = ""

            for sentence in sentences:
                if len(current_chunk) + len(sentence) < GOOGLE_TRANSLATE_LIMIT:
                    current_chunk += sentence + " "
                else:
                    if current_chunk.strip():
                        chunks.append(current_chunk.strip())
                    current_chunk = sentence + " "
            if current_chunk.strip():
                chunks.append(current_chunk.strip())

            translated_chunks = []
            for i, chunk in enumerate(chunks):
                translated_chunk = self._translate_chunk(chunk, target_lang)
                translated_chunks.append(translated_chunk if translated_chunk else chunk)
                safe_print(f"[TRANSLATOR] Chunk {i+1}/{len(chunks)} done.")

            return " ".join(translated_chunks)

        except Exception as e:
            safe_print(f"[TRANSLATOR] ERROR for lang='{target_lang}': {e}")
            return text  # graceful fallback to original English


translator = MultilingualTranslator()
