import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'library';

  constructor(private router:Router){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects;
        console.log('Current URL:', currentUrl);
  
        const type = localStorage.getItem('type');
        let redirected:any = sessionStorage.getItem('hasRedirected');
  
        if(currentUrl === '/' && type === 'Admin'){
          const manulredirected = true;
        if (!redirected || manulredirected) {
        console.log(redirected,"redirected")

          console.log(redirected,"redirected")
          if (type === 'Admin' || currentUrl === '/' ) {
            this.router.navigate(['/list-books']);
          } else if (!type && (currentUrl === '/' || currentUrl === '/login')) {
            this.router.navigate(['/']);
          }
          sessionStorage.setItem('hasRedirected', 'true');
        }
      }
    }

    });
    
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.seedBookData();
  }

  seedBookData(): void {
    const books = localStorage.getItem('books');
    if (!books) {
      const defaultBooks = [
        {
            "bookname": "Fifty Shades of Grey",
            "imgurl": "https://covers.openlibrary.org/b/id/15088216-L.jpg",
            "description": "<p>When literature student Anastasia Steele goes to interview young entrepreneur Christian Grey, she encounters a man who is beautiful, brilliant, and intimidating. The unworldly, innocent Ana is startled to realize she wants this man and, despite his enigmatic reserve, finds she is desperate to get close to him. Unable to resist Ana’s quiet beauty, wit, and independent spirit, Grey admits he wants her, too—but on his own terms.</p><p>Shocked yet thrilled by Grey’s singular erotic tastes, Ana hesitates. For all the trappings of success—his multinational businesses, his vast wealth, his loving family—Grey is a man tormented by demons and consumed by the need to control. When the couple embarks on a daring, passionately physical affair, Ana discovers Christian Grey’s secrets and explores her own dark desires.</p><p>Erotic, amusing, and deeply moving, the Fifty Shades Trilogy is a tale that will obsess you, possess you, and stay with you forever.</p><p>This book is intended for mature audiences.</p>",
            "price": "150",
            "category": "new",
            "author": "E. L. James",
            "id": 1750259637740
        },
        {
            "bookname": "Control Your Mind and Master Your Feelings",
            "imgurl": "https://covers.openlibrary.org/b/id/15089578-L.jpg",
            "description": "<p>We oftentimes look towards the outside world to find the roots of our problems. However, most of the times, we should be looking inwards. Our mind and our emotions determine our state of being in the present moment. If those aspects are left unchecked, we can get easily overwhelmed and are left feeling unfulfilled every single day.</p><p>This book contains two manuscripts designed to help you discover the best and most efficient way to control your thoughts and master your feelings.</p><p>In the first part of the bundle called Breaking Overthinking, you will discover:</p><p>How overthinking can be detrimental to your social life.<br>The hidden dangers of overthinking and what can happen to you if it’s left untreated.<br>How to declutter your mind from all the noise of the modern world.<br>How overthinking affects your body, your energy levels, and your everyday mood.<br>How your surroundings affect your state of mind, and what you NEED to do in order to break out of that state.<br>Bad habits we perform every day and don’t even realize are destroying our sanity (and how to overcome them properly).<br>How to cut out toxic people from your life, which cloud your judgment and make you feel miserable.</p>",
            "price": "200",
            "category": "new",
            "author": "Eric Robertson",
            "id": 1750298223728
        },
        {
            "bookname": "Grumpy Darling",
            "imgurl": "https://covers.openlibrary.org/b/id/15093598-L.jpg",
            "description": "<p>She's never been kissed. He's never felt this way about anyone.</p><p>Paige has ticked off everything on her senior year bucket list except one tiny thing — she’s never kissed anyone. And her best friend, Grayson Darling, is to blame.</p><p>Grayson is the school hockey team’s notorious enforcer, and he’s been scaring away any eligible bachelors that so much as look in Paige’s direction. With time running out, she demands that Grayson stop defending her honor. Instead, he’ll become her dating coach, training her to win the guy of her dreams.</p><p>But Grayson has plans of his own. He’s been in love with Paige since they were kids, and his clock is running, too. Coaching Paige might be his last chance to show her how good they’d be together. After all, practice makes perfect.</p>",
            "price": "200",
            "category": "new",
            "author": "Alexandra Moody",
            "id": 1750298337036
        },
        {
            "bookname": "Green dolphin country",
            "imgurl": "https://covers.openlibrary.org/b/id/12840426-L.jpg",
            "description": "<p>A haunting love story set in the Channel Islands and New Zealand in the 19th century.</p><p>William Ozanne, whose hypnotic, masculine presence made two sisters adore him with all their heart... The two beautiful daughters of a wealthy merchant of the Channel Islands fall in love with the same man, are very diferent. Marianne, the eldest sister is brilliant, passionate, and moody, by whom William was both fascinated and repelled... And Marguerite, the younger sister is pretty, dreamy and quietly, whom William adored.</p><p>The sisters had both loved him for years. He has gone abroad to seek his fortune to New Zealand. Now they were waiting for him to return from his journeys and claim his bride. But drunkenly he addresses his proposal to the wrong sister.</p><p>Though the book is fiction, and the characters not portraits, it is based on fact. A stunning tale of loss and self-sacrifice, it is truly one of the most memorable love stories of the last century.</p>",
            "price": "150",
            "category": "new",
            "author": "Elizabeth Goudge",
            "id": 1750298457539
        },
        {
            "bookname": "A Game of Thrones",
            "imgurl": "https://covers.openlibrary.org/b/id/15093534-L.jpg",
            "description": "<p><i><strong>A Game of Thrones</strong></i> is the inaugural novel in <i><strong>A Song of Ice and Fire</strong></i>, an epic series of fantasy novels crafted by the American author <strong>George R. R. Martin</strong>. Published on August 1, 1996, this novel introduces readers to the richly detailed world of Westeros and Essos, where political intrigue, power struggles, and magical elements intertwine.</p><p>The story unfolds through multiple perspectives, each chapter focusing on a different character, allowing readers to experience the narrative from various angles. This complex structure has become a hallmark of Martin's storytelling, immersing readers in the lives and motivations of a diverse cast.</p><h3><strong>Plot Summary</strong></h3><p>Set in the fictional continents of Westeros and Essos, the narrative revolves around the power struggles among noble families vying for the Iron Throne, the seat of power in the Seven Kingdoms of Westeros. The story is rich with political intrigue, betrayal, and epic battles, as well as a deep exploration of themes such as loyalty, honor, and the consequences of power.</p><h3><strong>Themes</strong></h3><p>The novel explores themes of power, loyalty, and the moral complexities of leadership. It delves into the consequences of ambition and the struggle between personal honor and political necessity. The richly detailed world-building and intricate character development make <i><strong>A Game of Thrones</strong></i> a compelling and immersive read.</p><h3><strong>Key Characters</strong></h3><ul><li><strong>Eddard \"Ned\" Stark</strong>: The honorable Lord of Winterfell and Warden of the North, known for his unwavering honor and sense of duty.<br>&nbsp;</li><li><strong>Catelyn Stark</strong>: The devoted wife of Eddard Stark, whose strength and wisdom guide her family through challenging times.<br>&nbsp;</li><li><strong>Robert Baratheon</strong>: The King of the Seven Kingdoms, who won the throne through rebellion. His reign is marked by political intrigue and personal struggles, reflecting the broader conflicts of the realm.<br>&nbsp;</li><li><strong>Cersei Lannister</strong>: The ambitious and cunning Queen of Westeros, whose political acumen and determination make her a formidable presence in the court.<br>&nbsp;</li><li><strong>Jaime Lannister</strong>: A skilled swordsman and member of the Kingsguard, known for his prowess in battle and complex loyalties.<br>&nbsp;</li><li><strong>Tyrion Lannister</strong>: The witty and resourceful dwarf, known for his sharp mind and cunning, navigating the treacherous politics of the realm.<br>&nbsp;</li><li><strong>Daenerys Targaryen</strong>: An exiled princess of House Targaryen, seeking to reclaim her birthright and restore her family's dynasty.<br>&nbsp;</li><li><strong>Jon Snow</strong>: The bastard son of Eddard Stark, who joins the Night's Watch and faces unique challenges in the far north.<br>&nbsp;</li><li><strong>Sansa Stark</strong>: The eldest daughter of Eddard Stark, initially known for her naivety and romantic ideals, who learns to navigate the complexities of court life.<br>&nbsp;</li><li><strong>Arya Stark</strong>: The youngest daughter of Eddard Stark, known for her spirited and adventurous nature, seeking her own path in the world.<br>&nbsp;</li><li><strong>Bran Stark</strong>: The second son of Eddard Stark, whose life takes a dramatic turn.</li></ul><h3><strong>Awards and Recognition</strong></h3><ul><li>Winner of the 1997 Locus Award<br>&nbsp;</li><li>Nominated for the 1997 Nebula Award<br>&nbsp;</li><li>Nominated for the 1997 World Fantasy Award<br>&nbsp;</li><li>Winner of the 1997 Hugo Award for Best Novella for \"Blood of the Dragon,\" which includes the Daenerys Targaryen chapters from the novel<br>&nbsp;</li><li>Became a New York Times Bestseller in January 2011 and reached No. 1 on the list in July 2011</li></ul>",
            "price": "250",
            "category": "new",
            "author": "George R. R. Martin",
            "id": 1750298584543
        },
        {
            "bookname": "Read People Like a Book",
            "imgurl": "https://covers.openlibrary.org/b/id/14844833-L.jpg",
            "description": "<p>Speed read people, decipher body language, detect lies, and understand human nature.<br>Is it possible to analyze people without them saying a word? Yes, it is. Learn how to become a “mind reader” and forge deep connections.<br>How to get inside people’s heads without them knowing.<br>Read People Like a Book isn’t a normal book on body language of facial expressions. Yes, it includes all of those things, as well as new techniques on how to truly detect lies in your everyday life, but this book is more about understanding human psychology and nature. We are who we are because of our experiences and pasts, and this guides our habits and behaviors more than anything else. Parts of this book read like the most interesting and applicable psychology textbook you’ve ever read. Take a look inside yourself and others!<br>Understand the subtle signals that you are sending out and increase your emotional intelligence.<br>Patrick King is an internationally bestselling author and social skills coach. His writing draws of a variety of sources, from scientific research, academic experience, coaching, and real life experience.<br>Learn the keys to influencing and persuading others.<br>•What people’s limbs can tell us about their emotions.•Why lie detecting isn’t so reliable when ignoring context.•Diagnosing personality as a means to understanding motivation.•Deducing the most with the least amount of information.•Exactly the kinds of eye contact to use and avoid<br>Find shortcuts to connect quickly and deeply with strangers.<br>The art of reading and analyzing people is truly the art of understanding human nature. Consider it like a cheat code that will allow you to see through people’s actions and words.<br>Decode people’s thoughts and intentions, and you can go in any direction you want with them.</p>",
            "price": "200",
            "category": "new",
            "author": "Patrick King",
            "id": 1750298653863
        },
        {
            "bookname": "Onyx Storm (Standard Edition)",
            "imgurl": "https://covers.openlibrary.org/b/id/14839882-L.jpg",
            "description": "<p>After nearly eighteen months at Basgiath War College, Violet Sorrengail knows there’s no more time for lessons. No more time for uncertainty. Because the battle has truly begun, and with enemies closing in from outside their walls and within their ranks, it’s impossible to know who to trust.</p><p>Now Violet must journey beyond the failing Aretian wards to seek allies from unfamiliar lands to stand with Navarre. The trip will test every bit of her wit, luck, and strength, but she will do anything to save what she loves—her dragons, her family, her home, and him.</p><p>Even if it means keeping a secret so big, it could destroy everything. They need an army. They need power. They need magic. And they need the one thing only Violet can find—the truth. But a storm is coming...and not everyone can survive its wrath.</p>",
            "price": "200",
            "category": "coming-soon",
            "author": "Rebecca Yarros",
            "id": 1750298713487
        },
        {
            "bookname": "Foundation",
            "imgurl": "https://covers.openlibrary.org/b/id/14612980-L.jpg",
            "description": "<p>One of the great masterworks of science fiction, the Foundation novels of Isaac Asimov are unsurpassed for their unique blend of nonstop action, daring ideas, and extensive world-building.</p><p>The story of our future begins with the history of Foundation and its greatest psychohistorian: Hari Seldon. For twelve thousand years the Galactic Empire has ruled supreme. Now it is dying. Only Hari Seldon, creator of the revolutionary science of psychohistory, can see into the future--a dark age of ignorance, barbarism, and warfare that will last thirty thousand years. To preserve knowledge and save mankind, Seldon gathers the best minds in the Empire--both scientists and scholars--and brings them to a bleak planet at the edge of the Galaxy to serve as a beacon of hope for future generations. He calls his sanctuary the Foundation.</p><p>But soon the fledgling Foundation finds itself at the mercy of corrupt warlords rising in the wake of the receding Empire. And mankind's last best hope is faced with an agonizing choice: submit to the barbarians and live as slaves--or take a stand for freedom and risk total destruction.</p>",
            "price": "150",
            "category": "coming-soon",
            "author": "Isaac Asimov",
            "id": 1750298772267
        },
        {
            "bookname": "I Don't Love You Anymore",
            "imgurl": "https://covers.openlibrary.org/b/id/14638562-L.jpg",
            "description": "<p>Dear reader,</p><p>I hope this book feels like a warm hug to you. I wrote this book for the ones who feel everything too deeply. You're right, I wrote this book for you. This book was meant to find you if you've ever loved someone who didn't love you back, if you've ever over-invested in the wrong people or if you have a hard time letting go. I Don't Love You Anymore is a book that'll feel like home to you. I promise it'll hold you gently on your worst days.</p>",
            "price": "200",
            "category": "coming-soon",
            "author": "Rithvik Singh",
            "id": 1750298865227
        },
        {
            "bookname": "Seporsi mie ayam sebelum mati",
            "imgurl": "https://covers.openlibrary.org/b/id/15024576-L.jpg",
            "description": "<p>Ale, seorang pria berusia 37 tahun memiliki tinggi badan 189 cm dan berat 138 kg. Badannya bongsor, berkulit hitam, dan memiliki masalah dengan bau badan. Sejak kecil, Ale hidup di lingkungan keluarga yang tidak mendukungnya. Ia tak memiliki teman dekat dan menjadi korban perundungan di sekolahnya.<br>Ale didiagnosis psikiaternya mengalami depresi akut. Bukannya Ale tidak peduli untuk memperbaiki dirinya sendiri, ia peduli. Ale telah berusaha mengatasi masalah-masalah yang timbul dari dirinya agar ia diterima di lingkungan pertemanan. Namun usahanya tidak pernah berhasil. Bahkan keluarganya pun tidak mendukungnya saat Ale membutuhkan sandaran dan dukungan.</p><p>Atas itu semua, Ale memutuskan untuk mati. Ia mempersiapkan kematiannya dengan baik. Agar ketika mati pun, Ale tidak banyak merepotkan orang. Dua puluh empat jam dari sekarang, ia akan menelan obat antidepresan yang dia punya sekaligus. Sebelum waktu itu tiba, Ale membersihkan apartemennya yang berantakan, makan makanan mahal yang tak pernah ia beli, pergi berkaraoke dan menyanyi sepuasnya hingga mabuk.</p><p>Saat 24 jam itu tiba, Ale telah bersiap dengan kemeja hitam dan celana hitam, bak baju melayat ke pemakamannya sendiri. Ia kenakan topi kecurut ulang tahun dan meletuskan konfeti yang ia beli untuk dirinya sendiri.<br>“Selamat ulang tahun yang terakhir, Ale.”</p><p>Ale siap menenggak seluruh obat antidepresan yang ia punya. Saat ia memain-mainkan botolnya, Ale terdiam saat membaca anjuran di kemasan botol itu, dikonsumsi sesudah makan. Seketika perutnya berbunyi. Dan Ale pun memutuskan untuk makan dulu sebelum mengakhiri hidupnya. Setidaknya, itu akan menjadi satu-satunya keputusan yang bisa dia ambil atas kehendaknya sendiri. Setelah selama hidupnya ia tak pernah mampu melakukan hal-hal yang ia inginkan.</p><p>Ale akan makan seporsi mie ayam sebelum mati.</p>",
            "price": "200",
            "category": "coming-soon",
            "author": "Brian Khrisna",
            "id": 1750298948832
        },
        {
            "bookname": "The Psychology of Money",
            "imgurl": "https://covers.openlibrary.org/b/id/14927094-L.jpg",
            "description": "<p>Timeless lessons on wealth, greed, and happiness doing well with money isn’t necessarily about what you know. It’s about how you behave. And behavior is hard to teach, even to really smart people. How to manage money, invest it, and make business decisions are typically considered to involve a lot of mathematical calculations, where data and formulae tell us exactly what to do. But in the real world, people don’t make financial decisions on a spreadsheet. They make them at the dinner table, or in a meeting room, where personal history, your unique view of the world, ego, pride, marketing, and odd incentives are scrambled together. In the psychology of money, the author shares 19 short stories exploring the strange ways people think about money and teaches you how to make better sense of one of life’s most important matters.</p>",
            "price": "250",
            "category": "coming-soon",
            "author": "Morgan Housel and Juanita Cochran",
            "id": 1750299009667
        },
        {
            "bookname": "Harry Potter and the Sorcerer's Stone",
            "imgurl": "https://covers.openlibrary.org/b/id/15093275-L.jpg",
            "description": "<p>Harry Potter #1</p><p>When mysterious letters start arriving on his doorstep, Harry Potter has never heard of Hogwarts School of Witchcraft and Wizardry.</p><p>They are swiftly confiscated by his aunt and uncle.</p><p>Then, on Harry’s eleventh birthday, a strange man bursts in with some important news: Harry Potter is a wizard and has been awarded a place to study at Hogwarts.</p><p>And so the first of the Harry Potter adventures is set to begin.</p>",
            "price": "250",
            "category": "coming-soon",
            "author": "J. K. Rowling",
            "id": 1750299064585
        }
    ]

      localStorage.setItem('books', JSON.stringify(defaultBooks));
      console.log('Default books data seeded.');
    } else {
      console.log('Books already present in localStorage.');
    }
  }

}
