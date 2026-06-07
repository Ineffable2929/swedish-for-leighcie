// ============================================================
//  Swedish for Leighcie — phrase data
//  This is the ONLY file you need to touch to add/change phrases.
//  See CLAUDE.md for how to ask Claude to edit this for you.
//
//  Each phrase: { sv: "Swedish", en: "English", say: "rough sound" }
//   - sv   = the Swedish words (this is what gets spoken aloud)
//   - en   = what it means in English
//   - say  = a simple "sounds like" hint (optional, for at-a-glance)
// ============================================================

// The little greeting from Dacia at the top of the page.
// Edit this anytime — leave it as-is if you're still thinking on it.
const NOTE = {
  to: "Leighcie",
  from: "Dacia",
  message:
    "Happy birthday, Leighcie! Sweden's lucky to be getting you. " +
    "I made you a little something to help you feel at home — " +
    "a few words to get you through your first fika, your first bus, " +
    "and your first new friend. Tap any card to hear it out loud. " +
    "Älskar dig. 💛",
  // ^ "Älskar dig" = "Love you". Replace this whole message whenever you like.
};

const CATEGORIES = [
  {
    id: "basics",
    title: "The Basics",
    emoji: "🐱", // cat face
    blurb: "The handful of words you'll use every single day.",
    phrases: [
      { sv: "Hej", en: "Hi / Hello", say: "hey" },
      { sv: "Hej då", en: "Goodbye", say: "hey doh" },
      { sv: "Ja", en: "Yes", say: "yah" },
      { sv: "Nej", en: "No", say: "ney" },
      { sv: "Tack", en: "Thank you", say: "tahk" },
      { sv: "Tack så mycket", en: "Thank you very much", say: "tahk soh MEW-keh" },
      { sv: "Varsågod", en: "You're welcome / here you go", say: "VASH-eh-good" },
      { sv: "Snälla", en: "Please", say: "SNELL-ah" },
      { sv: "Förlåt", en: "Sorry", say: "fur-LOHT" },
      { sv: "Ursäkta", en: "Excuse me", say: "oosh-EK-tah" },
      { sv: "Hur mår du?", en: "How are you?", say: "hoor mohr doo" },
      { sv: "Bra, tack", en: "Good, thanks", say: "brah tahk" },
      { sv: "Talar du engelska?", en: "Do you speak English?", say: "TAH-lar doo ENG-el-skah" },
      { sv: "Jag förstår inte", en: "I don't understand", say: "yah fur-STOHR in-teh" },
      { sv: "Jag pratar lite svenska", en: "I speak a little Swedish", say: "yah PRAH-tar LEE-teh SVEN-skah" },
    ],
  },
  {
    id: "getaround",
    title: "Getting Around",
    emoji: "🗺️", // map
    blurb: "Directions, transit, tickets, and asking for help.",
    phrases: [
      { sv: "Var är...?", en: "Where is...?", say: "var air" },
      { sv: "Var är toaletten?", en: "Where is the bathroom?", say: "var air twa-LET-en" },
      { sv: "Hur kommer jag till...?", en: "How do I get to...?", say: "hoor KOM-er yah til" },
      { sv: "Jag är vilse", en: "I'm lost", say: "yah air VIL-seh" },
      { sv: "Kan du hjälpa mig?", en: "Can you help me?", say: "kan doo YEL-pa may" },
      { sv: "Till vänster", en: "To the left", say: "til VEN-ster" },
      { sv: "Till höger", en: "To the right", say: "til HUR-ger" },
      { sv: "Rakt fram", en: "Straight ahead", say: "rahkt frahm" },
      { sv: "Tunnelbana", en: "Subway / metro", say: "TOON-el-bah-nah" },
      { sv: "Buss", en: "Bus", say: "boos" },
      { sv: "Tåg", en: "Train", say: "tohg" },
      { sv: "Biljett", en: "Ticket", say: "bil-YET" },
      { sv: "Var är stationen?", en: "Where is the station?", say: "var air stat-SHOH-nen" },
      { sv: "Hur mycket kostar det?", en: "How much does it cost?", say: "hoor MEW-keh KOS-tar deh" },
      { sv: "Ingång", en: "Entrance", say: "IN-gohng" },
      { sv: "Utgång", en: "Exit", say: "OOT-gohng" },
      { sv: "Öppet", en: "Open", say: "UP-eht" },
      { sv: "Stängt", en: "Closed", say: "stengt" },
    ],
  },
  {
    id: "cafe",
    title: "Café & Shops",
    emoji: "☕", // coffee
    blurb: "Fika is basically a national sport. Be ready.",
    phrases: [
      { sv: "Fika", en: "Coffee + cake break (a whole vibe)", say: "FEE-kah" },
      { sv: "En kaffe, tack", en: "A coffee, please", say: "en KAH-feh tahk" },
      { sv: "Kanelbulle", en: "Cinnamon bun", say: "kah-NEL-bool-eh" },
      { sv: "Jag vill ha...", en: "I would like...", say: "yah vil hah" },
      { sv: "Vatten", en: "Water", say: "VAT-en" },
      { sv: "Notan, tack", en: "The bill, please", say: "NOO-tan tahk" },
      { sv: "Kan jag betala med kort?", en: "Can I pay by card?", say: "kan yah beh-TAH-lah meh kort" },
      { sv: "Smaklig måltid", en: "Enjoy your meal", say: "SMAHK-lig MOHL-teed" },
    ],
  },
  {
    id: "friends",
    title: "Making Friends",
    emoji: "🫂", // people hugging
    blurb: "How to turn a stranger into a fika buddy.",
    phrases: [
      { sv: "Jag heter...", en: "My name is...", say: "yah HEH-ter" },
      { sv: "Vad heter du?", en: "What's your name?", say: "vah HEH-ter doo" },
      { sv: "Trevligt att träffas", en: "Nice to meet you", say: "TREV-ligt at TREF-as" },
      { sv: "Var kommer du ifrån?", en: "Where are you from?", say: "var KOM-er doo ee-FROHN" },
      { sv: "Vill du fika?", en: "Want to grab coffee?", say: "vil doo FEE-kah" },
      { sv: "Ha en bra dag", en: "Have a good day", say: "hah en brah dahg" },
      { sv: "Vi hörs", en: "Talk soon", say: "vee hursh" },
      { sv: "Lycka till", en: "Good luck", say: "LEW-kah til" },
      { sv: "Skål!", en: "Cheers!", say: "skohl" },
    ],
  },
  {
    id: "important",
    title: "Just In Case",
    emoji: "🆘", // SOS
    blurb: "The ones you hope you never need.",
    phrases: [
      { sv: "Hjälp!", en: "Help!", say: "yelp" },
      { sv: "Ring 112", en: "Call 112 (emergency number)", say: "ring ett-ett-tvoh" },
      { sv: "Jag mår inte bra", en: "I don't feel well", say: "yah mohr in-teh brah" },
      { sv: "Jag behöver en läkare", en: "I need a doctor", say: "yah beh-HUR-ver en LEH-kah-reh" },
      { sv: "Apotek", en: "Pharmacy", say: "ah-poo-TEHK" },
      { sv: "Sjukhus", en: "Hospital", say: "SHOOK-hoos" },
      { sv: "Polis", en: "Police", say: "poo-LEES" },
    ],
  },
  {
    id: "cats",
    title: "Cat Words 🐾",
    emoji: "🐈", // cat
    blurb: "The truly essential vocabulary.",
    phrases: [
      { sv: "Katt", en: "Cat", say: "kat" },
      { sv: "Kattunge", en: "Kitten", say: "KAT-oong-eh" },
      { sv: "Spinna", en: "To purr", say: "SPIN-ah" },
      { sv: "Mjau", en: "Meow", say: "myow" },
      { sv: "Tass", en: "Paw", say: "tass" },
      { sv: "Morrhår", en: "Whiskers", say: "MOR-hohr" },
      { sv: "Söt", en: "Cute", say: "surt" },
      { sv: "Min katt", en: "My cat", say: "min kat" },
      { sv: "Jag älskar katter", en: "I love cats", say: "yah EL-skar KAT-er" },
    ],
  },
];
