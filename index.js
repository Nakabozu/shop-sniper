import puppeteer from "puppeteer";
import {playAudioFile} from 'audic';
const url = "https://www.midnightmoonpins.com/collections/all";
const prevItemNames = [
    'pink bow flawed goddess',
    'pink bow flawed goddess',
    'po : harbinger cake cats',
    'po : harbinger cake cats',
    'po : lucifer half body',
    'po : lucifer half body',
    'po : mn op girls wave 1',
    'po : mn op girls wave 1',
    'wrio panel',
    'wrio panel'
  ];
  function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));
const checkForAlastor = async () => {
    // Start a Puppeteer session with:
    // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
    // - no default viewport (`defaultViewport: null` - website page will be in full width and height)
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });

    // Open a new page
    const page = await browser.newPage();

    // On this new page:
    // - open the "http://quotes.toscrape.com/" website
    // - wait until the dom content is loaded (HTML is ready)
    await page.goto(url, {
        waitUntil: "domcontentloaded",
    });

    // Get page data
    const itemNames = await page.evaluate(() => {
        // Fetch the first element with class "quote"
        // Get the displayed text and returns it
        const itemsForSale = document.querySelectorAll(".full-unstyled-link");

        // Convert the quoteList to an iterable array
        // For each quote fetch the text and author
        return Array.from(itemsForSale).map((item) => {
            return String(item.innerText).trim().toLocaleLowerCase();
        });
    });

    if(itemNames.some((name)=> {
        String(name).toLocaleLowerCase().includes("alastor") || String(name).toLocaleLowerCase().includes("radio") || String(name).toLocaleLowerCase().includes("al");
    }) || !(arraysEqual(itemNames, prevItemNames))){
        for (let i = 0; i < 100; i++) { 
            console.log("ALASTOR IS HERE! ALASTOR IS HERE! ALASTOR IS HERE!");
        }
        setInterval(async () => {await playAudioFile('./Ahooga.mp3')}, 5000);
        return;
    }else{
        const minimumTimeBetweenRefresh = 1000;
        const randomAdditionalTimeBetweenRefresh = 2000;
        const waitTimeMS = Math.floor(Math.random() * randomAdditionalTimeBetweenRefresh + minimumTimeBetweenRefresh);
        // Close the browser
        await browser.close();
        console.log(`Waiting ${waitTimeMS} milliseconds`);
        await timeout(waitTimeMS);
        checkForAlastor();
    }
    return;
};

// Start the scraping
checkForAlastor();
//setInterval(checkForAlastor, 3000);