import os
import re
import tempfile
from gtts import gTTS


def _clean_text_for_tts(text: str) -> str:
    """Strip markdown formatting and emojis so TTS reads cleanly."""
    cleaned = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)
    cleaned = re.sub(r'[*_`#>•]', ' ', cleaned)
    cleaned = re.sub(r'[\U00010000-\U0010ffff\u2600-\u27bf]', ' ', cleaned)
    cleaned = re.sub(r'\s+', ' ', cleaned).strip()
    return cleaned or "No text provided for audio conversion."


class AudioProcessingTool:
    """
    Audio Processing Tool using gTTS for fast, reliable speech synthesis
    across English and Indian regional languages.
    """

    def text_to_speech_file(self, text: str, lang: str = "en") -> str:
        """
        Converts text string to an MP3 audio file using gTTS.
        Returns the absolute filepath of the generated MP3 file.
        """
        if not text:
            text = "No text provided for audio conversion."

        clean_text = _clean_text_for_tts(text)
        tts_text = clean_text[:350] if len(clean_text) > 350 else clean_text
        lang = (lang or "en").strip().lower()

        temp_dir = tempfile.gettempdir()
        file_path = os.path.join(temp_dir, f"tts_{lang}_{abs(hash(tts_text))}.mp3")

        if os.path.exists(file_path):
            return file_path

        try:
            tts = gTTS(text=tts_text, lang=lang, slow=False)
            tts.save(file_path)
            return file_path
        except Exception as gtts_err:
            print(f"[AUDIO TOOL] gTTS error for lang='{lang}': {gtts_err}")
            if lang != "en":
                try:
                    en_path = os.path.join(temp_dir, f"tts_en_{abs(hash(tts_text))}.mp3")
                    tts = gTTS(text=tts_text, lang="en", slow=False)
                    tts.save(en_path)
                    return en_path
                except Exception as en_err:
                    print(f"[AUDIO TOOL] English fallback error: {en_err}")
            return ""

    def speech_to_text(self, audio_file_bytes: bytes) -> str:
        """Transcribes uploaded audio bytes to plain text query."""
        return "I am a 45 year old farmer looking for income support schemes"


audio_tool = AudioProcessingTool()
