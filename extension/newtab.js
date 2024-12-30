// Random Quran Verse by Abdulwahab Humayun

/**
 * Definitions of terms used: 
 * Quran - the Islamic religious book of Islam
 * Surah - chapters of the Quran
 * Ayah - a verse of a Quran
 */

// the total number of surahs in the Quran
const TOTAL_SURAHS = 114;

// declares the number of ayahs based on the chosen surah
let totalAyahs;

// declares the randomly chosen surah 
let surahNumber;

// declares the randomly chosen ayah
let ayahNumber;

// declares the Arabic ayah from the surah
let ayah;

// declares the translated ayah from Arabic
let translatedAyah;

let surahName;  // Declare surahName variable

// the Quran API link
const SURAH_URL = 'https://api.alquran.cloud/v1/surah/';

// declares the API call for the translation
let newSurahURL;

// the part of the link for the English translation
let eng = 'bn.hoque';

// gets a random ayah on startup 

// gets a random ayah from the Quran API and displays it
async function randomAyah() {
    surahNumber = Math.floor(Math.random() * (TOTAL_SURAHS - 1)) + 1;

    newSurahURL = SURAH_URL + surahNumber;

    const response = await fetch(newSurahURL);
    const chapterJSON = await response.json();

    // Log the data to verify the structure
    console.log("Chapter JSON: ", chapterJSON);

    surahName = chapterJSON.data.englishName;  // Assigning surah name

    // Debugging log to confirm surahName
    console.log("Surah Name: ", surahName);

    totalAyahs = chapterJSON.data.numberOfAyahs;
    
    ayahNumber = Math.floor(Math.random() * totalAyahs);
   
    ayah = chapterJSON.data.ayahs[ayahNumber].text;

    translateAyah();
    return Promise.resolve('Getting the ayah works!');
}

// translates the random ayah
async function translateAyah() {
    newSurahURL += '/' + eng;

    const response = await fetch(newSurahURL);
    const chapterJSON2 = await response.json();
    
    translatedAyah = chapterJSON2.data.ayahs[ayahNumber].text;

    printToHTML();
    return Promise.resolve('Getting the translation works!');
}

// prints the random ayah and translation to the HTML file
function printToHTML() {
    const quoteContainer = document.getElementById("quote-container");
    let enquoteContainer = document.getElementById("quote-container-en");
    const ref = document.getElementById("ref");

    // Log to check if surahName is still a string
    console.log("Printing to HTML - Surah Name: ", surahName);
    
    // Directly assign ayah to quote container without random quote function
    quoteContainer.textContent = "\n\n \r \t" + ayah;
    enquoteContainer.textContent = translatedAyah;

    // Display Surah name and verse number
    ref.textContent = "Surah: " + surahName + " | " + "Verse " + (ayahNumber + 1);
}

// gets a random ayah
async function getRandomAyah() {
    randomAyah();
}

// Automatically gets a random ayah when the extension is opened
document.addEventListener('DOMContentLoaded', function() {
    getRandomAyah();
});
