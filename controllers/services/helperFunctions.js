module.exports = {
    getFormattedCurrentDate: () => {
        const date = new Date(Date.now())
        const format = { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/New_York' }
        return date.toLocaleDateString('en-US', format)        
    },

    mapSourceLanguage: (languageCode) => {
        const sourceLanguageMap = {
            'en-US': 'English',
            'de-DE': 'German',
            'ar-EG': 'Arabic',
            'es-ES': 'Spanish',
            'fi-FI': 'Finnish',
            'fr-FR': 'French',
            'hi-IN': 'Hindi',
            'it-IT': 'Italian',
            'ja-JP': 'Japanese',
            'ko-KR': 'Korean',
            'pl-PL': 'Polish',
            'pt-BR': 'Portugese',
            'ru-RU': 'Russian',
            'sv-SE': 'Swedish',
            'zh-Hans': 'Chinese'
          };

        return sourceLanguageMap[languageCode]
    },

    mapTargetLanguage: (languageCode) => {
        const targetLanguageMap = {
            'en': 'English',
            'de': 'German',
            'ar': 'Arabic',
            'es': 'Spanish',
            'fi': 'Finnish',
            'fr': 'French',
            'hi': 'Hindi',
            'it': 'Italian',
            'ja': 'Japanese',
            'ko': 'Korean',
            'pl': 'Polish',
            'pt': 'Portugese',
            'ru': 'Russian',
            'sv': 'Swedish',
            'zh-Hans': 'Chinese'
          };

        return targetLanguageMap[languageCode]
    }
}