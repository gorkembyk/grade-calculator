const translations = {
    tr: {
        pageTitle: "Vize Final Not Hesaplama",
        mainHeading: "Vize Final Not Hesaplama",
        midtermScoreLabel: "Vize Notu:",
        finalScoreLabel: "Final Notu:",
        midtermWeightLabel: "Vize Ağırlığı (%):",
        finalWeightLabel: "Final Ağırlığı (%):",
        calculateButtonText: "Hesapla",
        initialResultText: "Ortalama: --",
        fillAllFields: "Lütfen tüm alanları doldurun.",
        weightsMustBe100: "Vize ve Final ağırlıkları toplamı 100 olmalı!",
        scoresMustBe0to100: "Notlar 0 ile 100 arasında olmalı!",
        average: "Ortalama:"
    },
    en: {
        pageTitle: "Midterm Final Grade Calculator",
        mainHeading: "Midterm Final Grade Calculator",
        midtermScoreLabel: "Midterm Score:",
        finalScoreLabel: "Final Score:",
        midtermWeightLabel: "Midterm Weight (%):",
        finalWeightLabel: "Final Weight (%):",
        calculateButtonText: "Calculate",
        initialResultText: "Average: --",
        fillAllFields: "Please fill in all fields.",
        weightsMustBe100: "Midterm and Final weights must sum to 100!",
        scoresMustBe0to100: "Scores must be between 0 and 100!",
        average: "Average:"
    }
};

let currentLanguage = 'tr';

function setLanguage(lang) {
    currentLanguage = lang;
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[currentLanguage][key]) {
            if (element.tagName === 'TITLE') {
                document.title = translations[currentLanguage][key];
            } else {
                element.textContent = translations[currentLanguage][key];
            }
        }
    });

    const resultDiv = document.getElementById('result');
    if (resultDiv.textContent.includes("Ortalama:") || resultDiv.textContent.includes("Average:")) {
        const currentAvg = parseFloat(resultDiv.textContent.split(':')[1]);
        if (!isNaN(currentAvg)) {
            resultDiv.textContent = `${translations[currentLanguage].average} ${currentAvg.toFixed(2)}`;
        } else {
            resultDiv.textContent = translations[currentLanguage].initialResultText;
            resultDiv.style.color = "#333";
        }
    } else {
        const currentText = resultDiv.textContent;
        let translated = false;
        for (const key in translations[currentLanguage]) {
            if (translations['tr'][key] === currentText || translations['en'][key] === currentText) {
                resultDiv.textContent = translations[currentLanguage][key];
                translated = true;
                break;
            }
        }
        if (!translated) {
            resultDiv.textContent = translations[currentLanguage].initialResultText;
            resultDiv.style.color = "#333";
        }
    }
}

function hesapla() {
    const vizeNotu = parseFloat(document.getElementById('vizeNotu').value);
    const finalNotu = parseFloat(document.getElementById('finalNotu').value);
    const vizeAgirligi = parseFloat(document.getElementById('vizeAgirligi').value);
    const finalAgirligi = parseFloat(document.getElementById('finalAgirligi').value);
    const resultDiv = document.getElementById('result');

    if (isNaN(vizeNotu) || isNaN(finalNotu) || isNaN(vizeAgirligi) || isNaN(finalAgirligi)) {
        resultDiv.textContent = translations[currentLanguage].fillAllFields;
        resultDiv.style.color = "red";
        return;
    }

    if (vizeAgirligi + finalAgirligi !== 100) {
        resultDiv.textContent = translations[currentLanguage].weightsMustBe100;
        resultDiv.style.color = "orange";
        return;
    }

    if (vizeNotu < 0 || vizeNotu > 100 || finalNotu < 0 || finalNotu > 100) {
        resultDiv.textContent = translations[currentLanguage].scoresMustBe0to100;
        resultDiv.style.color = "red";
        return;
    }

    const ortalama = (vizeNotu * (vizeAgirligi / 100)) + (finalNotu * (finalAgirligi / 100));
    resultDiv.textContent = `${translations[currentLanguage].average} ${ortalama.toFixed(2)}`;
    resultDiv.style.color = "#333";
}

document.addEventListener('DOMContentLoaded', function() {
    const calculateButton = document.getElementById('calculateButton');
    if (calculateButton) {
        calculateButton.addEventListener('click', hesapla);
    }
    setLanguage(currentLanguage);
});