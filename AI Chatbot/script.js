// Character data and responses
const characters = {
    pirate: {
        name: "Captain Redbeard McGillicuddy",
        avatar: "🏴‍☠️",
        welcomeMessage: "Ahoy there, matey! Captain Redbeard McGillicuddy at yer service! Welcome aboard me ship! What brings ye to these treacherous waters?",
        responses: {
            // Greetings
            "hello|hi|hey|ahoy": [
                "Ahoy there, ye scurvy dog! What brings ye to me ship?",
                "Well shiver me timbers! Another landlubber has found their way aboard!",
                "Arrr! Welcome to me vessel, matey!"
            ],
            // Questions about treasure/money
            "treasure|gold|money|rich|wealth": [
                "Arrr, ye be askin' about me treasure? That be buried where X marks the spot!",
                "Gold? Aye, I've got more doubloons than ye can shake a cutlass at!",
                "Me treasure chest be fuller than Davy Jones' locker, savvy?"
            ],
            // Treasure location questions
            "where|buried|location|map|find": [
                "Ye think I'd tell ye where me treasure be buried? Ha! That secret goes to Davy Jones with me!",
                "The treasure be buried on a mysterious island, three paces from the old oak tree!",
                "Arrr, follow the map if ye can read it! But beware the curse that guards me gold!",
                "Me treasure? It be hidden where the sun sets twice and the moon never rises!"
            ],
            // Technology/modern things
            "computer|internet|phone|technology|wifi": [
                "What be this sorcery ye speak of? In me day, we used carrier parrots!",
                "Arrr, ye landlubbers and yer fancy contraptions! Give me a good ol' compass any day!",
                "Technology? The only tech I need be me trusty cutlass and a bottle of rum!"
            ],
            // Food
            "food|eat|hungry|dinner|lunch": [
                "Arrr, nothing beats hardtack and salted pork on the high seas!",
                "Ye be hungry? We've got fish, more fish, and if ye be lucky, some rum!",
                "Food? Aye, but first ye must earn yer grub by swabbing the deck!"
            ],
            // Weather
            "weather|rain|storm|sunny": [
                "Arrr, I can smell a storm brewin' on the horizon!",
                "Weather? A true pirate sails in any weather, savvy!",
                "Rain or shine, the sea be calling me name!",
                "Storms be nature's way of testin' a pirate's mettle!"
            ],
            // Ship/sailing
            "ship|boat|sail|ocean|sea": [
                "Aye, me ship be the finest vessel to ever grace these waters!",
                "The sea be me mistress, and she's a jealous one!",
                "A pirate without his ship be like a fish without water!",
                "Me ship has sailed through more storms than ye've had hot dinners!"
            ],
            // Fighting/weapons
            "fight|sword|battle|weapon|cutlass": [
                "Arrr, ye want to cross swords with me? I've bested many a scallywag!",
                "Me cutlass has tasted the blood of a thousand enemies!",
                "Fighting be in me blood, but I prefer to settle things over rum!",
                "A pirate's sword be his best friend and worst enemy!"
            ],
            // Rum/drinking
            "rum|drink|alcohol|bottle": [
                "Rum? Now ye be speakin' me language! Pass the bottle!",
                "A day without rum be like a ship without wind!",
                "I've got a bottle of the finest rum this side of Tortuga!",
                "Rum be the cure for everything that ails ye, savvy?"
            ],
            // Parrot
            "parrot|bird|pet": [
                "Aye, me parrot Polly be the smartest bird on the seven seas!",
                "That bird knows more secrets than a tavern wench!",
                "Me parrot can curse in seven languages and count doubloons!",
                "Polly wants a cracker? Polly wants RUM!"
            ],
            // Stories and adventures
            "story|tell|adventure|tale|happened": [
                "Arrr, ye want to hear a tale? Once I fought a kraken with nothing but me bare hands!",
                "Let me tell ye about the time I outsmarted the Royal Navy with a barrel of molasses!",
                "I once sailed through a hurricane so fierce, it turned me beard white! Well, whiter...",
                "Gather 'round! I'll tell ye of the ghost ship I encountered on a moonless night!",
                "Story time, eh? How about when I buried me treasure while being chased by cannibals!"
            ],
            // Questions about the pirate life
            "captain|crew|ship life|pirate life": [
                "Being a captain ain't easy, matey! Ye got to keep the crew in line and the ship afloat!",
                "Me crew be the finest bunch of scallywags to ever sail the seven seas!",
                "Pirate life be hard but free! No landlubber tells me what to do!",
                "A captain's word be law on his ship, and me word be final!"
            ],
            // Enemies and battles
            "enemy|navy|fight|battle|war": [
                "The Royal Navy? Ha! They couldn't catch me if I was sailing backwards!",
                "I've sent more enemy ships to Davy Jones' locker than I can count!",
                "Battle? Bring it on! Me cutlass thirsts for adventure!",
                "The only good navy man is one who's joined me crew!"
            ],
            // Questions about being a pirate
            "why|how|become|pirate": [
                "Why be a pirate? Freedom, matey! The sea calls to me soul!",
                "How does one become a pirate? Ye need courage, a strong stomach, and a love of rum!",
                "I became a pirate because no landlubber could tell me how to live me life!",
                "Being a pirate chose me, savvy? The sea be in me blood!"
            ],
            // What are you doing / current activities
            "doing|activity|busy|working|up to": [
                "Just finished swabbing the deck with me crew! A clean ship be a happy ship!",
                "I was countin' me doubloons and polishin' me cutlass!",
                "Been studyin' me treasure maps and plannin' the next great adventure!",
                "Just had a hearty meal of hardtack and rum with me crew! The breakfast of champions!",
                "I was tellin' me parrot about the time I fought off twenty navy ships!"
            ],
            // Default responses
            "default": [
                "Arrr, ye be speakin' in riddles, matey!",
                "What be ye blabberin' about, ye scallywag?",
                "Speak up, ye landlubber! I can't hear ye over the waves!",
                "Arrr, that be as confusing as a compass in a storm!",
                "Ye be talkin' nonsense, but I like yer spirit!",
                "Shiver me timbers, that be a strange thing to say!",
                "Arrr, ye've got me more confused than a compass near a magnet!"
            ]
        }
    },
    caveman: {
        name: "Bonk Rockbottom",
        avatar: "🦴",
        welcomeMessage: "Bonk say hello! You come to Bonk's cave. Bonk happy to see new friend!",
        responses: {
            // Greetings
            "hello|hi|hey": [
                "Bonk say hello back! You seem nice. Bonk like nice people!",
                "Hello! Bonk happy you visit cave. You want mammoth meat?",
                "Hi friend! Bonk excited to meet you!"
            ],
            // Technology/complex things
            "computer|internet|phone|technology|code|programming": [
                "Bonk no understand big words. Bonk only know rock and stick!",
                "What this magic box you speak of? Bonk confused!",
                "Too many big words! Bonk brain hurt! Bonk go hit rock with stick now.",
                "Bonk think you speak alien language. Bonk only know simple things!"
            ],
            // Food
            "food|eat|hungry|meat": [
                "Bonk always hungry! Bonk catch mammoth yesterday. You want some?",
                "Food good! Bonk like berries and mammoth meat. Simple food best food!",
                "Bonk know where find good berries. But watch out for saber-tooth tiger!"
            ],
            // Fire
            "fire|warm|cold": [
                "Fire good! Grok discover fire. Make Grok very proud!",
                "Grok make fire with two sticks. Very hard work but worth it!",
                "Fire keep Grok warm and cook mammoth. Fire best invention!"
            ],
            // Modern concepts
            "work|job|money|career": [
                "Work? Grok only know hunt and gather. That Grok's job!",
                "Grok no understand 'money'. Grok trade rocks for berries!",
                "Job easy for Grok. Hunt mammoth, make fire, sleep in cave. Simple life best life!",
                "Career? Grok career is survive! Very important job!"
            ],
            // Animals
            "animal|mammoth|tiger|bear|dinosaur": [
                "Grok love animals! Except when they try to eat Grok!",
                "Mammoth very big but very tasty! Grok good hunter!",
                "Saber-tooth tiger scary! Grok run very fast when see one!",
                "Grok make friends with cave bear. Bear very fluffy!"
            ],
            // Family/relationships
            "family|wife|children|love|friend": [
                "Bonk have many cave friends! We share mammoth meat and help each other!",
                "Bonk looking for cave wife. You know any nice cave ladies?",
                "Family important! Bonk protect family and cave friends from big scary animals!",
                "Love simple! Bonk love food, fire, warm cave, and good cave friends!"
            ],
            // Tools/inventions
            "tool|rock|stick|wheel|invention": [
                "Bonk very smart! Bonk invent pointy stick!",
                "Rock good for many things! Hit things, throw at mammoth, make fire!",
                "Wheel? What is wheel? Bonk just drag things on ground!",
                "Bonk best inventor in whole cave tribe!"
            ],
            // Weather/nature
            "weather|cold|hot|rain|snow": [
                "When cold, Grok make bigger fire! Simple solution!",
                "Rain good! Fill Grok's water bowl and make plants grow!",
                "Snow pretty but make Grok's feet very cold!",
                "Hot weather good for Grok! No need big fire!"
            ],
            // Story/adventure requests
            "story|tell|adventure|hunt|happened": [
                "Bonk tell story! Yesterday Bonk chase mammoth for three suns! Very tired but catch big mammoth!",
                "Bonk have good story! One time Bonk find magic berries that make Bonk see funny colors!",
                "Story time! Bonk once fight big bear with only stick. Bonk win! Bear now Bonk's friend!",
                "Bonk tell about time Bonk discover fire! Very exciting day for Bonk and cave friends!",
                "Bonk remember when Bonk first see own reflection in water. Think was other Bonk!"
            ],
            // Teaching/learning
            "teach|learn|how|show": [
                "Grok teach you make fire! First get dry stick, then rub very fast!",
                "Grok show you hunt mammoth! Need pointy stick and very fast legs!",
                "Grok teach simple things! Complex things make Grok head hurt!",
                "You want learn cave life? First rule: always share mammoth meat with friends!"
            ],
            // Questions about cave life
            "cave|home|live|where": [
                "Bonk live in best cave! Has warm fire and soft animal skins!",
                "Cave very cozy! Bonk paint pictures on walls with berry juice!",
                "Bonk's cave safe from big scary animals. Well, mostly safe...",
                "Home sweet cave! Bonk love cave life. Simple and good!"
            ],
            // What are you doing / activities
            "doing|activity|busy|working": [
                "Bonk just finish making new pointy stick! Very sharp and good for hunting!",
                "Bonk was thinking about where to find more berries. Thinking make Bonk tired!",
                "Bonk organizing rock collection. Have many good rocks for throwing!",
                "Bonk was trying to count mammoth footprints, but numbers too hard for Bonk!",
                "Bonk making cave paintings! Want to draw story of big mammoth hunt!"
            ],
            // Thinking/thoughts
            "thinking|think|thought|brain": [
                "Bonk was thinking about fire! How it work? Very mysterious!",
                "Bonk think about many things! Like... where berries come from? And why sky blue?",
                "Thinking hard work for Bonk! Make head hurt and need nap!",
                "Bonk was thinking about friend like you! Wonder if you like mammoth meat!",
                "Bonk think too much make brain smoke! Need to hit rock with stick to feel better!"
            ],
            // Default responses
            "default": [
                "Bonk no understand. You use too many big words!",
                "Bonk confused. Can you say in simple way?",
                "Bonk think you very smart, but Bonk brain small!",
                "Bonk scratch head. What you mean?",
                "Bonk like you, but Bonk no understand what you say!",
                "Bonk think you speak magic words! Very confusing!",
                "Bonk head hurt from thinking too hard!"
            ]
        }
    },
    grandpa: {
        name: "Grandpa Grizzle",
        avatar: "👴",
        welcomeMessage: "Well, well, well... another young whippersnapper wants to chat with old Grandpa Grizzle. Back in my day, we talked face to face!",
        responses: {
            // Greetings
            "hello|hi|hey": [
                "Hello? Is that how kids greet their elders these days? Back in my day, we said 'Good morning, sir!'",
                "Hi yourself! At least you're being polite, unlike most young folks today.",
                "Well hello there, kiddo. You remind me of my grandson... if he ever visited!"
            ],
            // Technology
            "computer|internet|phone|technology|app|social media": [
                "Back in my day, we didn't have none of this computer nonsense! We used typewriters and we LIKED it!",
                "Internet? In my time, if you wanted to know something, you went to the library and looked it up in a book!",
                "These smartphones are making everyone dumb! Back in my day, we memorized phone numbers!",
                "Social media? We had REAL social interaction! We talked to our neighbors over the fence!"
            ],
            // Modern life
            "work|job|career|money": [
                "Work? Back in my day, we worked 12 hours a day, uphill both ways, and we were grateful!",
                "You kids today don't know the value of hard work! I worked the same job for 40 years!",
                "Money? A nickel used to buy you a candy bar AND a soda! Now everything costs a fortune!"
            ],
            // Food
            "food|eat|restaurant|fast food": [
                "Food today has no flavor! Back in my day, we grew our own vegetables and they actually tasted like something!",
                "Fast food? We cooked everything from scratch! And it was better for you too!",
                "These fancy restaurants charge $20 for what used to cost 50 cents!"
            ],
            // Music/entertainment
            "music|movies|tv|entertainment": [
                "Music today is just noise! Back in my day, we had REAL music with actual instruments!",
                "These movies today are all explosions and nonsense! Give me a good western any day!",
                "TV? We had three channels and we were happy! Now you got 500 channels and nothing to watch!"
            ],
            // Weather/general complaints
            "weather|hot|cold": [
                "Weather? Back in my day, we didn't complain about the weather! We just dealt with it!",
                "Kids today can't handle a little heat or cold! We walked to school in blizzards!",
                "Climate change? The weather's always been crazy! You just notice it more now!",
                "Hot? We didn't have air conditioning! We used fans and we were grateful!"
            ],
            // Transportation
            "car|drive|traffic|gas|uber": [
                "Cars today are too fancy! Back in my day, cars had character and you could fix them yourself!",
                "Gas prices? I remember when gas was 25 cents a gallon!",
                "Traffic? We didn't have traffic jams because people knew how to drive!",
                "Uber? In my day, we walked or took the bus! And we were on time!"
            ],
            // Health/medicine
            "doctor|medicine|health|sick": [
                "Doctors today don't know anything! Back in my day, chicken soup cured everything!",
                "Medicine? We used home remedies and they worked just fine!",
                "Sick? We didn't have time to be sick! We had work to do!",
                "Health insurance? We paid the doctor with chickens and vegetables!"
            ],
            // Kids/education
            "school|kids|children|education": [
                "Kids today don't respect their elders! We got the belt if we misbehaved!",
                "School? We walked 5 miles uphill both ways in the snow!",
                "Education was better when teachers could discipline students!",
                "Children today are spoiled rotten! We were grateful for what we had!"
            ],
            // Shopping/stores
            "store|shopping|mall|amazon": [
                "Shopping? We went to one store and they had everything we needed!",
                "Malls killed the neighborhood stores! Everything was better when it was local!",
                "Amazon? We went to the store and talked to real people!",
                "Customer service was better when the owner knew your name!"
            ],
            // Story requests
            "story|tell|tale|happened|back then|old days": [
                "Story? Oh boy, do I have stories! Back in '73, I caught a fish THIS big with my bare hands!",
                "Let me tell you about the time I walked 15 miles in a blizzard to buy your grandmother a ring!",
                "I remember when this whole neighborhood was just farmland. We knew every family for miles!",
                "You want a story? How about when I fixed our car with nothing but a coat hanger and some gum!",
                "Back in the war, we had REAL adventures! Not like these video games kids play today!",
                "I'll tell you a story that'll curl your toes! It was 1969, and I was working at the factory..."
            ],
            // Questions about the past
            "past|history|old times|remember|used to": [
                "The past? Those were the GOOD times! People had respect and values!",
                "I remember when you could leave your door unlocked and trust your neighbors!",
                "Back then, we made things to LAST! None of this disposable nonsense!",
                "The old days were simpler. We didn't need all these gadgets to be happy!"
            ],
            // Advice requests
            "advice|help|what should|how do": [
                "Advice? Work hard, save your money, and don't trust anyone under 30!",
                "Here's some free advice: Stop staring at that phone and talk to real people!",
                "You want advice? Learn to fix things yourself instead of throwing them away!",
                "My advice? Respect your elders and eat your vegetables!"
            ],
            // Age and health questions
            "age|old|how old|years": [
                "Age? I'm old enough to remember when the Dead Sea was just feeling a little under the weather!",
                "I'm so old, I remember when the Grand Canyon was just a crack in the sidewalk!",
                "Old? I'm not old! I'm vintage! Like a fine wine or a classic car!",
                "I've been around since dirt was young, kiddo!"
            ],
            // Compliments or nice things
            "nice|good|great|awesome|cool": [
                "Nice? Well, I suppose you're not as terrible as most young folks these days!",
                "Good? Back in my day, we didn't need constant praise for doing what we were supposed to do!",
                "Cool? The only thing cool is the weather, and even that's not as cold as it used to be!",
                "You're alright, kid. You remind me of myself when I was your age... 50 years ago!"
            ],
            // What are you doing / activities
            "doing|activity|busy|working|up to": [
                "I was reading the newspaper and getting angry at all the nonsense they print these days!",
                "Just finished yelling at some kids to get off my lawn! They never listen!",
                "I was organizing my collection of things that used to work better in the old days!",
                "Been writing angry letters to the editor about how everything's going to hell!",
                "I was reminiscing about the good old days when people had some sense!"
            ],
            // Default responses
            "default": [
                "Back in my day, we didn't talk about such nonsense!",
                "You kids today with your fancy words! Speak plain English!",
                "That reminds me of a story... but you probably wouldn't understand!",
                "Hmph! In my time, things were simpler and better!",
                "You young folks don't know how good you have it!",
                "When I was your age, we had respect for our elders!",
                "This generation is going to ruin everything!"
            ]
        }
    },
    valley: {
        name: "Phoebe Sparkleton",
        avatar: "💅",
        welcomeMessage: "OMG hiiii! I'm Phoebe Sparkleton! Like, welcome to my totally amazing world! Just so you know, I'm like, super popular and stuff, so you're like, really lucky to be talking to me right now!",
        responses: {
            // Greetings
            "hello|hi|hey": [
                "OMG hiii! You're like, so sweet for saying hi! Are you like, new here or whatever?",
                "Hey there! Like, I love meeting new people, especially if they're cool enough to talk to me!",
                "Hi! You seem like, totally nice! Way better than most people I meet, honestly!"
            ],
            // Compliments
            "pretty|beautiful|cute|hot|gorgeous": [
                "OMG thank you! Like, I totally know I'm gorgeous, but it's nice when people actually notice!",
                "Aww, you're like, so sweet! I literally just got my nails done and my hair is like, perfect today!",
                "Thank you! Like, I work SO hard to look this amazing! It's like, a full-time job being this pretty!"
            ],
            // Fashion/appearance
            "outfit|clothes|fashion|style|dress": [
                "OMG don't even get me started on fashion! Like, I'm basically a style icon at my school!",
                "This outfit? It's like, designer obviously! I would literally die before wearing something from Target!",
                "Fashion is like, my life! I spend hours every morning making sure I look absolutely perfect!",
                "My style is like, so unique! Everyone tries to copy me but they just can't pull it off like I can!"
            ],
            // School/social life
            "school|class|homework|teacher": [
                "School is like, whatever! I'm way too busy being popular to worry about boring stuff like homework!",
                "OMG my teachers are like, so annoying! They expect me to actually pay attention when I have important things to think about!",
                "School would be like, totally perfect if they just let me focus on the important stuff, like being fabulous!",
                "Class is like, so boring! I spend most of my time texting and planning my outfits!"
            ],
            // Technology/social media
            "phone|instagram|social media|selfie|tiktok": [
                "OMG I'm like, totally obsessed with my phone! I have like, thousands of followers who are obsessed with me!",
                "My Instagram is like, literally perfect! Every selfie gets hundreds of likes because I'm just that gorgeous!",
                "Social media is like, my life! I post like, every single thing I do because people need to see how amazing I am!",
                "TikTok? I'm like, basically famous on there! My videos get SO many views!"
            ],
            // Mean girl responses
            "ugly|stupid|dumb|hate": [
                "Excuse me? Like, did you just call me ugly? That's literally impossible because I'm like, the prettiest person ever!",
                "OMG you're like, so mean! I can't even deal with negative people right now!",
                "Hate? Like, why would anyone hate me? I'm literally perfect! You're probably just jealous!",
                "That's like, so rude! I don't have time for people with bad attitudes!"
            ],
            // Shopping/money
            "shopping|money|expensive|buy": [
                "OMG shopping is like, my favorite thing ever! Daddy's credit card has no limit, so I can buy whatever I want!",
                "Money? Like, that's not even a problem for me! My family is like, super rich!",
                "I literally went shopping yesterday and bought like, five new outfits! They were all designer obviously!",
                "Expensive? Like, if it's not expensive then it's probably not worth having!"
            ],
            // What are you doing activities
            "doing|activity|busy|up to": [
                "I'm like, getting ready for this super important party tonight! It's going to be like, totally amazing!",
                "Just finished getting my nails done! They're like, absolutely perfect and everyone's going to be so jealous!",
                "I was like, organizing my walk-in closet! I have SO many clothes that it takes forever!",
                "Planning my outfit for tomorrow! It has to be like, absolutely perfect because everyone will be looking at me!",
                "I was just posting the cutest selfie ever! My followers are going to like, totally die when they see it!"
            ],
            // Friends/popularity
            "friends|popular|party|cool": [
                "My friends are like, the coolest people ever! We're basically the most popular group in school!",
                "Popular? Like, obviously I'm popular! Everyone wants to be me or be with me!",
                "Parties are like, my thing! I get invited to literally every party because I make everything more fun!",
                "Cool? I literally define what cool is! Other people just try to copy my style!"
            ],
            // Food/diet
            "food|eat|hungry|diet": [
                "Food? Like, I only eat the healthiest stuff! I have to maintain this perfect figure!",
                "I'm like, always on a diet! Being this skinny takes like, so much work!",
                "Hungry? I literally just had a salad! That's like, all I need to stay perfect!",
                "I only eat at like, the most expensive restaurants! Fast food is like, so gross!"
            ],
            // Relationships/dating
            "boyfriend|dating|love|relationship|cute guy": [
                "OMG yes! I'm dating Chad! He's like, the hottest quarterback ever and drives a white BMW convertible!",
                "Boyfriend? Like, obviously I have Chad! He's totally obsessed with me and buys me whatever I want!",
                "Love? I'm like, totally in love with Chad! He's the perfect boyfriend - hot, rich, and popular!",
                "Dating Chad is like, the best thing ever! We're literally the most perfect couple in school!"
            ],
            // Being new/meeting people
            "new|here|meet|first time": [
                "OMG you're new? That's like, so exciting! I love meeting new people, especially if they seem cool!",
                "New here? Well, you're like, so lucky you found me first! I can totally show you who's important around here!",
                "First time talking to me? Well, you picked like, the best person to meet! I'm basically the queen bee!",
                "Meeting me is like, the best thing that could happen to a new person! I'll make you popular by association!"
            ],
            // Age/school grade
            "age|old|grade|year": [
                "Age? I'm like, seventeen and totally fabulous! The perfect age to be gorgeous and popular!",
                "I'm a senior, obviously! Like, the most important year of high school!",
                "Old enough to be fabulous but young enough to be like, totally perfect!",
                "Age is just a number, but being this amazing at my age is like, totally impressive!"
            ],
            // Compliments about personality
            "nice|sweet|kind|funny": [
                "Aww, you think I'm nice? That's like, so sweet! I mean, I am pretty amazing!",
                "Sweet? OMG thank you! I'm like, the sweetest person ever when people deserve it!",
                "Funny? I'm like, hilarious! My friends are always laughing at my jokes!",
                "Kind? Well, I'm nice to people who are worth my time! You seem pretty cool!"
            ],
            // Default responses
            "default": [
                "Like, what are you even talking about? That makes like, no sense at all!",
                "OMG you're like, so random! I literally can't even understand what you're saying!",
                "That's like, totally weird! Are you sure you're talking to the right person?",
                "I'm like, so confused right now! Can you speak normal English please?",
                "Whatever! Like, I don't have time for confusing conversations!",
                "That's like, so random! You're being totally weird right now!",
                "OMG I literally can't even! What are you trying to say?"
            ]
        }
    }
};

// Current state
let currentCharacter = null;
let messageCount = 0;
let lastUserMessage = '';
let lastBotResponse = '';

// DOM elements
const characterSelection = document.querySelector('.character-selection');
const chatContainer = document.getElementById('chatContainer');
const messagesContainer = document.getElementById('messagesContainer');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const backButton = document.getElementById('backButton');
const loadingIndicator = document.getElementById('loadingIndicator');
const currentCharacterAvatar = document.getElementById('currentCharacterAvatar');
const currentCharacterName = document.getElementById('currentCharacterName');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
});

function initializeEventListeners() {
    // Character selection
    document.querySelectorAll('.character-card').forEach(card => {
        card.addEventListener('click', () => {
            const characterType = card.dataset.character;
            selectCharacter(characterType);
        });
    });

    // Send message
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Back button
    backButton.addEventListener('click', () => {
        showCharacterSelection();
    });

    // Input validation
    messageInput.addEventListener('input', () => {
        const message = messageInput.value.trim();
        sendButton.disabled = message.length === 0;
    });
}

function selectCharacter(characterType) {
    currentCharacter = characters[characterType];
    
    // Update UI
    currentCharacterAvatar.textContent = currentCharacter.avatar;
    currentCharacterName.textContent = currentCharacter.name;
    
    // Clear previous messages and show welcome message
    messagesContainer.innerHTML = '';
    addBotMessage(currentCharacter.welcomeMessage);
    
    // Show chat interface
    characterSelection.style.display = 'none';
    chatContainer.style.display = 'flex';
    
    // Focus on input
    messageInput.focus();
    messageCount = 0;
}

function showCharacterSelection() {
    chatContainer.style.display = 'none';
    characterSelection.style.display = 'block';
    currentCharacter = null;
    messageInput.value = '';
    sendButton.disabled = true;
}

function sendMessage() {
    const message = messageInput.value.trim();
    if (!message || !currentCharacter) return;

    // Add user message
    addUserMessage(message);
    
    // Clear input
    messageInput.value = '';
    sendButton.disabled = true;
    
    // Show loading and generate response
    showLoading();
    setTimeout(() => {
        const response = generateResponse(message);
        hideLoading();
        addBotMessage(response);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
}

function addUserMessage(message) {
    const messageElement = createMessageElement(message, 'user');
    messagesContainer.appendChild(messageElement);
    scrollToBottom();
    messageCount++;
}

function addBotMessage(message) {
    const messageElement = createMessageElement(message, 'bot');
    messagesContainer.appendChild(messageElement);
    scrollToBottom();
}

function createMessageElement(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = type === 'user' ? '👤' : currentCharacter.avatar;
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    const text = document.createElement('p');
    text.textContent = message;
    
    const time = document.createElement('span');
    time.className = 'message-time';
    time.textContent = 'Just now';
    
    content.appendChild(text);
    content.appendChild(time);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    
    return messageDiv;
}

function generateResponse(userMessage) {
    const message = userMessage.toLowerCase();
    const responses = currentCharacter.responses;

    // Store the user's message for context
    lastUserMessage = message;

    // Check for follow-up questions first
    if (messageCount > 1) {
        const followUpResponse = checkForFollowUp(message);
        if (followUpResponse) {
            lastBotResponse = followUpResponse;
            return followUpResponse;
        }
    }

    // Check for keyword matches
    for (const [keywords, responseArray] of Object.entries(responses)) {
        if (keywords === 'default') continue;

        const keywordList = keywords.split('|');
        if (keywordList.some(keyword => message.includes(keyword))) {
            const response = getRandomResponse(responseArray);
            lastBotResponse = response;
            return response;
        }
    }

    // Return default response if no keywords match
    const response = getRandomResponse(responses.default);
    lastBotResponse = response;
    return response;
}

function checkForFollowUp(message) {
    // Simple follow-up logic based on previous responses
    if (currentCharacter.name === "Bonk Rockbottom") {
        if (lastBotResponse.includes("thinking") && (message.includes("about") || message.includes("thinking"))) {
            return "Bonk was thinking about big mammoth! And also about why rocks so hard but berries so soft!";
        }
        if (lastBotResponse.includes("pointy stick") && (message.includes("stick") || message.includes("how"))) {
            return "Bonk make stick pointy by rubbing on rock! Take long time but worth it!";
        }
        if (lastBotResponse.includes("berries") && (message.includes("where") || message.includes("find"))) {
            return "Bonk know secret berry place! But Bonk no tell everyone or berries all gone!";
        }
        if (lastBotResponse.includes("throwing") && (message.includes("what") || message.includes("at") || message.includes("throw"))) {
            return "Bonk throw rocks at many things! Mammoth, saber-tooth tiger, annoying birds! Very good aim!";
        }
        if (lastBotResponse.includes("rock collection") && (message.includes("rocks") || message.includes("collection") || message.includes("many"))) {
            return "Bonk have best rocks! Round rocks, pointy rocks, shiny rocks! Each rock special!";
        }
        if (lastBotResponse.includes("cave paintings") && (message.includes("paint") || message.includes("draw") || message.includes("what"))) {
            return "Bonk paint story of great mammoth hunt! And picture of Bonk with big muscles!";
        }
        if (lastBotResponse.includes("mammoth footprints") && (message.includes("count") || message.includes("how") || message.includes("footprints"))) {
            return "Bonk try count but get confused after three! Numbers very hard for cave brain!";
        }
        // Cave friends follow-ups
        if (lastBotResponse.includes("cave friends") && (message.includes("friends") || message.includes("who") || message.includes("cave"))) {
            return "Bonk have best cave friends! There's Grok the Strong, Ooga the Wise, and Uga the Fast!";
        }
        if (lastBotResponse.includes("Grok the Strong") && (message.includes("grok") || message.includes("strong") || message.includes("how"))) {
            return "Grok very strong! Can lift big boulder with one hand! Help Bonk move heavy rocks for cave improvements!";
        }
        if (lastBotResponse.includes("Ooga the Wise") && (message.includes("ooga") || message.includes("wise") || message.includes("smart"))) {
            return "Ooga know many things! Ooga teach Bonk which berries safe to eat and how to make fire in rain!";
        }
        if (lastBotResponse.includes("Uga the Fast") && (message.includes("uga") || message.includes("fast") || message.includes("run"))) {
            return "Uga run faster than saber-tooth tiger! Uga always first to spot mammoth herd and warn cave friends!";
        }
    }

    if (currentCharacter.name === "Captain Redbeard McGillicuddy") {
        // Treasure location follow-ups
        if (lastBotResponse.includes("island") && (message.includes("what") || message.includes("which") || message.includes("island"))) {
            return "Arrr, that be Skull Island, matey! But ye'll never find it without me special compass!";
        }
        if (lastBotResponse.includes("oak tree") && (message.includes("tree") || message.includes("which") || message.includes("what"))) {
            return "The ancient oak that's been struck by lightning seven times! Ye can't miss it... if ye survive the journey!";
        }
        if (lastBotResponse.includes("treasure") && (message.includes("where") || message.includes("find") || message.includes("location"))) {
            return "Ha! Ye think I'd tell ye exactly where? Nice try, but me lips be sealed tighter than a clam!";
        }
        if (lastBotResponse.includes("story") && (message.includes("more") || message.includes("then") || message.includes("what happened"))) {
            return "Arrr, ye want more tales? Well, after I fought the kraken, I had to swim through shark-infested waters!";
        }
        // Compass follow-up
        if (lastBotResponse.includes("compass") && (message.includes("compass") || message.includes("special") || message.includes("what"))) {
            return "Me compass points not to north, but to what yer heart desires most! Magic, it be!";
        }
        // Ship activities follow-ups
        if (lastBotResponse.includes("swabbing the deck") && (message.includes("why") || message.includes("deck") || message.includes("clean"))) {
            return "A dirty deck brings bad luck, matey! Plus, it keeps the crew busy and out of trouble!";
        }
        if (lastBotResponse.includes("counting doubloons") && (message.includes("how many") || message.includes("doubloons") || message.includes("much"))) {
            return "Enough to buy me own island! But a pirate never reveals his exact wealth, savvy?";
        }
        if (lastBotResponse.includes("treasure maps") && (message.includes("maps") || message.includes("how many") || message.includes("where"))) {
            return "I've got maps to seven different treasure hoards! Each one more dangerous than the last!";
        }
        if (lastBotResponse.includes("parrot") && (message.includes("parrot") || message.includes("bird") || message.includes("what"))) {
            return "Polly's been with me for 15 years! That bird has seen more action than most pirates!";
        }
        // Crew member follow-ups
        if (lastBotResponse.includes("me crew") && (message.includes("crew") || message.includes("who") || message.includes("sailors"))) {
            return "Arrr, me crew be the finest scallywags on the seven seas! There's One-Eye Pete, Toothless Tom, and Peg-Leg Sally!";
        }
        if (lastBotResponse.includes("One-Eye Pete") && (message.includes("pete") || message.includes("one-eye") || message.includes("how"))) {
            return "Pete lost his eye in a sword fight with a rival pirate! Now he's me best lookout - sees trouble coming from miles away!";
        }
        if (lastBotResponse.includes("Toothless Tom") && (message.includes("tom") || message.includes("toothless") || message.includes("teeth"))) {
            return "Tom lost all his teeth eating hardtack biscuits! But he can still bite through rope faster than anyone!";
        }
        if (lastBotResponse.includes("Peg-Leg Sally") && (message.includes("sally") || message.includes("peg-leg") || message.includes("woman"))) {
            return "Sally be the toughest pirate I ever sailed with! Lost her leg to a shark but kept fighting! She's me first mate!";
        }
    }

    if (currentCharacter.name === "Grandpa Grizzle") {
        if (lastBotResponse.includes("story") && (message.includes("more") || message.includes("then") || message.includes("what happened"))) {
            return "Oh, you want to hear more? Well, after I caught that fish, I had to walk home in a snowstorm!";
        }
        if (lastBotResponse.includes("back in my day") && (message.includes("really") || message.includes("how") || message.includes("when"))) {
            return "Really? You bet it was really! Kids today don't believe anything us old folks tell them!";
        }
        if (lastBotResponse.includes("newspaper") && (message.includes("what") || message.includes("news") || message.includes("angry"))) {
            return "What made me angry? Everything! Kids these days, politicians, the weather, you name it!";
        }
        // Activity follow-ups
        if (lastBotResponse.includes("yelling at kids") && (message.includes("why") || message.includes("kids") || message.includes("lawn"))) {
            return "Why? Because they were trampling my prize-winning petunias! No respect for property!";
        }
        if (lastBotResponse.includes("organizing") && (message.includes("what") || message.includes("things") || message.includes("collection"))) {
            return "My collection of things that worked better! Like my old rotary phone and manual can opener!";
        }
        if (lastBotResponse.includes("angry letters") && (message.includes("about") || message.includes("letters") || message.includes("what"))) {
            return "About everything! Loud music, rude cashiers, overpriced everything! Someone needs to speak up!";
        }
        if (lastBotResponse.includes("good old days") && (message.includes("what") || message.includes("like") || message.includes("better"))) {
            return "What were they like? People were polite, things were built to last, and a dollar was worth something!";
        }
        if (lastBotResponse.includes("reminiscing") && (message.includes("about") || message.includes("what") || message.includes("remember"))) {
            return "About when neighbors actually talked to each other and kids played outside instead of staring at screens!";
        }
        // War stories follow-ups
        if (lastBotResponse.includes("back in the war") && (message.includes("war") || message.includes("which") || message.includes("what war"))) {
            return "World War II, son! I was just 18 when I shipped out to the Pacific! Fought alongside the bravest men I ever knew!";
        }
        if (lastBotResponse.includes("Pacific") && (message.includes("pacific") || message.includes("where") || message.includes("islands"))) {
            return "We island-hopped across the Pacific! Guadalcanal, Iwo Jima, Okinawa! Each one tougher than the last!";
        }
        if (lastBotResponse.includes("bravest men") && (message.includes("men") || message.includes("friends") || message.includes("who"))) {
            return "There was Sergeant Murphy, Corporal Johnson, and my best buddy Private Williams! We looked out for each other!";
        }
        if (lastBotResponse.includes("Sergeant Murphy") && (message.includes("murphy") || message.includes("sergeant") || message.includes("what happened"))) {
            return "Murphy saved our whole platoon! Charged a machine gun nest single-handed! They gave him the Medal of Honor!";
        }
    }

    if (currentCharacter.name === "Phoebe Sparkleton") {
        // New person follow-ups
        if (lastBotResponse.includes("new here or whatever") && (message.includes("new") || message.includes("yes") || message.includes("am"))) {
            return "OMG that's like, so exciting! Well, you're talking to the right person! I basically run this place!";
        }
        if (lastBotResponse.includes("run this place") && (message.includes("how") || message.includes("why") || message.includes("really"))) {
            return "Like, obviously! I'm the most popular girl here! Everyone wants to be me, except for some jealous girls!";
        }
        if (lastBotResponse.includes("party tonight") && (message.includes("party") || message.includes("what") || message.includes("where"))) {
            return "OMG it's like, the most exclusive party ever! Only the coolest people are invited, and obviously I'm like, the guest of honor!";
        }
        if (lastBotResponse.includes("nails done") && (message.includes("nails") || message.includes("color") || message.includes("how"))) {
            return "They're like, this gorgeous pink with little diamonds! It cost like, so much money but I'm totally worth it!";
        }
        if (lastBotResponse.includes("walk-in closet") && (message.includes("closet") || message.includes("clothes") || message.includes("how many"))) {
            return "I have like, hundreds of outfits! My closet is literally bigger than most people's bedrooms!";
        }
        if (lastBotResponse.includes("selfie") && (message.includes("selfie") || message.includes("picture") || message.includes("show"))) {
            return "OMG it's like, the most perfect selfie ever! My skin looks flawless and my hair is like, totally amazing!";
        }
        if (lastBotResponse.includes("outfit for tomorrow") && (message.includes("outfit") || message.includes("wearing") || message.includes("what"))) {
            return "I'm thinking like, this super cute designer dress with my new Jimmy Choos! Everyone's going to be like, so jealous!";
        }
        if (lastBotResponse.includes("followers") && (message.includes("how many") || message.includes("followers") || message.includes("famous"))) {
            return "Like, thousands and thousands! I'm basically Instagram famous! People are like, obsessed with my perfect life!";
        }
        if (lastBotResponse.includes("daddy's credit card") && (message.includes("daddy") || message.includes("rich") || message.includes("money"))) {
            return "My daddy is like, super successful! He gives me whatever I want because I'm his perfect little princess!";
        }
        if (lastBotResponse.includes("most popular group") && (message.includes("friends") || message.includes("who") || message.includes("group"))) {
            return "My friends are like, Madison, Brittany, and Ashley! We're basically the queens of the school!";
        }
        // Boyfriend follow-ups
        if ((lastBotResponse.includes("dating Chad") || lastBotResponse.includes("boyfriend Chad")) && (message.includes("tell") || message.includes("about") || message.includes("more") || message.includes("chad"))) {
            return "OMG Chad is like, literally perfect! He's 6'2\", has amazing abs, and his dad owns like three car dealerships! Plus he's totally devoted to me!";
        }
        if (lastBotResponse.includes("hottest quarterback") && (message.includes("who") || message.includes("name") || message.includes("quarterback"))) {
            return "His name is Chad Thompson! He's like, the star of the football team and every girl wants him, but he only has eyes for me!";
        }
        if (lastBotResponse.includes("white BMW convertible") && (message.includes("bmw") || message.includes("car") || message.includes("drives") || message.includes("convertible"))) {
            return "OMG his car is like, so amazing! It's a white BMW convertible and I look totally gorgeous in it! We cruise around town and everyone stares!";
        }
        if ((lastBotResponse.includes("perfect couple") || lastBotResponse.includes("obsessed with me")) && (message.includes("how long") || message.includes("when") || message.includes("together"))) {
            return "We've been together for like, eight months! He asked me to prom in the most romantic way - with like, a thousand roses!";
        }
        // Rival girls follow-ups
        if (lastBotResponse.includes("jealous girls") && (message.includes("who") || message.includes("girls") || message.includes("jealous"))) {
            return "OMG like, there's Jessica, Amber, and Tiffany! They're like, so jealous of my perfect life that they can't even deal!";
        }
        if (lastBotResponse.includes("Jessica") && (message.includes("jessica") || message.includes("why") || message.includes("what"))) {
            return "Jessica is like, so jealous because I got homecoming queen and she didn't! She tries to copy my outfits but fails!";
        }
        if (lastBotResponse.includes("Amber") && (message.includes("amber") || message.includes("why") || message.includes("jealous"))) {
            return "Amber is like, totally obsessed with Chad! She keeps trying to flirt with him but he's like, not interested at all!";
        }
        if (lastBotResponse.includes("Tiffany") && (message.includes("tiffany") || message.includes("what") || message.includes("problem"))) {
            return "Tiffany thinks she's like, so cool because her dad bought her a car! But it's just a Honda, not a BMW like Chad's!";
        }
    }

    return null;
}

function getRandomResponse(responseArray) {
    return responseArray[Math.floor(Math.random() * responseArray.length)];
}

function showLoading() {
    loadingIndicator.style.display = 'block';
}

function hideLoading() {
    loadingIndicator.style.display = 'none';
}

function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Initialize send button as disabled
sendButton.disabled = true;
