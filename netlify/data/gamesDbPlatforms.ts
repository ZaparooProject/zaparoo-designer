export type Platform = {
  id: number;
  name: string;
  alias: string;
  overview: string;
  icon: string;
  console: string | null;
}

export const count = 150 as const;
export const platforms: Record<Platform["id"], Platform> = {
    "0": {
      "id": 0,
      "name": "all",
      "alias": "all",
      "icon": "",
      "console": "",
      overview: "",
    },
    "1": {
      "id": 1,
      "name": "PC",
      "alias": "pc",
      "overview": "PC stands for Personal Computer. Mass-market consumer computers use highly standardized components and so are simple for an end user to assemble into a working system. A typical desktop computer consists of a computer case which holds the power supply, motherboard, hard disk and often an optical disc drive. External devices such as a computer monitor or visual display unit, keyboard, and a pointing device are usually found in a personal computer.",
      "icon": "pc-1336524756.png",
      "console": "1.png"
    },
    "2": {
      "id": 2,
      "name": "Nintendo GameCube",
      "alias": "nintendo-gamecube",
      "overview": "The Nintendo GameCube was the first Nintendo console to use optical discs as its primary storage medium, after several aborted projects from Nintendo and its partners to utilize optical-based storage media.  In contrast with the GameCube's contemporary competitors, Sony's PlayStation 2, Sega's Dreamcast and Microsoft's Xbox, the GameCube uses miniDVD-based discs instead of full-size DVDs. Partially as a result of this, it does not have the DVD-Video playback functionality of these systems, nor the audio CD playback ability of other consoles that use full-size optical discs.\r\nIn addition, the GameCube introduced a variety of connectivity options to Nintendo consoles, and was the fourth Nintendo console, after the Nintendo 64DD, Famicom Modem and Satellaview, to support online play officially, via the Nintendo GameCube Broadband Adapter and Modem Adapter (sold separately). It also enabled connectivity to the Game Boy Advance to access exclusive features of certain games or to use the portable system as a controller for the Game Boy Player.",
      "icon": "nintendo-gamecube-1336524714.png",
      "console": "2.png"
    },
    "3": {
      "id": 3,
      "name": "Nintendo 64",
      "alias": "nintendo-64",
      "overview": "The Nintendo 64, often referred to as N64, was Nintendo′s third home video game console for the international market. Named for its 64-bit CPU, it was released in June 1996 in Japan, September 1996 in North America, March 1997 in Europe and Australia, September 1997 in France and December 1997 in Brazil. It is Nintendo′s last home console to use ROM cartridges to store games (Nintendo switched to a MiniDVD-based format for the successor GameCube); handhelds in the Game Boy line, however, continued to use Game Paks. It was discontinued in 2001 in Japan, North America and PAL regions by the launch of Nintendo′s GameCube.",
      "icon": "nintendo-64-1336524631.png",
      "console": "3.png"
    },
    "4": {
      "id": 4,
      "name": "Nintendo Game Boy",
      "alias": "nintendo-gameboy",
      "overview": "The Game Boy, is an 8-bit handheld video game device developed and manufactured by Nintendo. It was released in Japan on April 21, 1989, in North America in August 1989, and in Europe on September 28, 1990. It is the first handheld console in the Game Boy line, and was created by Gunpei Yokoi and Nintendo Research & Development 1—the same staff who had designed the Game & Watch series as well as several popular games for the Nintendo Entertainment System.",
      "icon": "nintendo-gameboy-1336524703.png",
      "console": "4.png"
    },
    "5": {
      "id": 5,
      "name": "Nintendo Game Boy Advance",
      "alias": "nintendo-gameboy-advance",
      "overview": "The Game Boy Advance, (often shortened to GBA) is a 32-bit handheld video game console developed, manufactured, and marketed by Nintendo. It is the successor to the Game Boy Color. It was released in Japan on March 21, 2001; in North America on June 11, 2001; in Australia and Europe on June 22, 2001; and in the People's Republic of China on June 8, 2004 (excluding Hong Kong).",
      "icon": "nintendo-gameboy-advance-1336524672.png",
      "console": "5.png"
    },
    "6": {
      "id": 6,
      "name": "Super Nintendo (SNES)",
      "alias": "super-nintendo-snes",
      "overview": "The Super Nintendo Entertainment System (also known as the Super NES, SNES or Super Nintendo) is a 16-bit video game console that was released by Nintendo in North America, Europe, Australasia (Oceania), and South America between 1990 and 1993.\r\n\r\nIn Japan and Southeast Asia, the system is called the Super Famicom (officially adopting the abbreviated name of its predecessor, the Family Computer), or SFC for short. In South Korea, it is known as the Super Comboy and was distributed by Hyundai Electronics.\r\n\r\nAlthough each version is essentially the same, several forms of regional lockout prevent the different versions from being compatible with one another.\r\n\r\nThe Super Nintendo Entertainment System was Nintendo's second home console, following the Nintendo Entertainment System (NES). The console introduced advanced graphics and sound capabilities compared with other consoles at the time. Additionally, development of a variety of enhancement chips (which were integrated on game circuit boards) helped to keep it competitive in the marketplace.\r\n\r\nThe SNES was a global success, becoming the best-selling console of the 16-bit era despite its relatively late start and the fierce competition it faced in North America and Europe from Sega's Genesis console. \r\n\r\nThe SNES remained popular well into the 32-bit era, and although Nintendo no longer offers factory repairs/replacement or accessories for the console, it continues to be popular among fans, collectors, retro gamers, and emulation enthusiasts, some of whom are still making homebrew ROM images.",
      "icon": "super-nintendo-snes-1448530937.png",
      "console": "6.png"
    },
    "7": {
      "id": 7,
      "name": "Nintendo Entertainment System (NES)",
      "alias": "nintendo-entertainment-system-nes",
      "overview": "The Nintendo Entertainment System (also abbreviated as NES or simply called Nintendo) is an 8-bit video game console that was released by Nintendo in North America during 1985, in Europe during 1986 and Australia in 1987. In most of Asia, including Japan (where it was first launched in 1983), China, Vietnam, Singapore, the Middle East and Hong Kong, it was released as the Family Computer, commonly shortened as either the romanized contraction Famicom, or abbreviated to FC. In South Korea, it was known as the Hyundai Comboy, and was distributed by Hynix which then was known as Hyundai Electronics.\r\n\r\nAs the best-selling gaming console of its time, the NES helped revitalize the US video game industry following the video game crash of 1983, and set the standard for subsequent consoles of its generation. With the NES, Nintendo introduced a now-standard business model of licensing third-party developers, authorizing them to produce and distribute software for Nintendo's platform.",
      "icon": "nintendo-entertainment-system-nes-1336524652.png",
      "console": "7.png"
    },
    "8": {
      "id": 8,
      "name": "Nintendo DS",
      "alias": "nintendo-ds",
      "overview": "The Nintendo DS (abbreviated to DS or NDS) is a portable game console produced by Nintendo, first released on November 21, 2004. A distinctive feature of the system is the presence of two separate LCD screens, the lower of which is a touchscreen, encompassed within a clamshell design, similar to the Game Boy Advance SP. The Nintendo DS also features a built-in microphone and supports wireless standards, allowing players to interact with each other within short range, or online with the Nintendo Wi-Fi Connection service. The Nintendo DS is the first Nintendo console to be released in North America before Japan.",
      "icon": "nintendo-ds-1336524642.png",
      "console": "8.png"
    },
    "9": {
      "id": 9,
      "name": "Nintendo Wii",
      "alias": "nintendo-wii",
      "overview": "The Wii is a home video game console released by Nintendo on November 19, 2006. As a seventh-generation console, the Wii primarily competes with Microsoft's Xbox 360 and Sony's PlayStation 3. Nintendo states that its console targets a broader demographic than that of the two others. As of November 2011, the Wii leads the generation over the PlayStation 3 and Xbox 360 in worldwide sales, and in December 2009 broke the record for best-selling console in a single month in the United States.\r\n\r\nA distinguishing feature of the console is its wireless controller, the Wii Remote, which can be used as a handheld pointing device and detects movement in three dimensions. Another distinctive feature of the console is WiiConnect24, which enables it to receive messages and updates over the Internet while in standby mode.\r\n\r\nThe Wii is Nintendo's fifth home console and the direct successor of the Nintendo GameCube, being fully backwardly compatible with all GameCube games and most accessories.",
      "icon": "nintendo-wii-1336524734.png",
      "console": "9.png"
    },
    "10": {
      "id": 10,
      "name": "Sony Playstation",
      "alias": "sony-playstation",
      "overview": "The PlayStation , officially abbreviated as PS; unofficially referred to as the PSX or PS1) is a 32-bit fifth-generation video game console first released by Sony Computer Entertainment in Japan on December 3, 1994.\r\n\r\nThe PlayStation was the first of the PlayStation series of consoles and handheld game devices. The PlayStation 2 was the console's successor in 2000. The PlayStation was the first \"computer entertainment platform\" to ship 100 million units, which it had reached 9 years and 6 months after its initial launch.\r\n\r\nIn 2000, a re-designed, \"slim\" version was released, called the PSone. This marked the end of the original grey console.",
      "icon": "sony-playstation-1336524956.png",
      "console": "10.png"
    },
    "11": {
      "id": 11,
      "name": "Sony Playstation 2",
      "alias": "sony-playstation-2",
      "overview": "The PlayStation 2, (officially abbreviated PS2) is a sixth-generation video game console manufactured by Sony as part of the PlayStation series. Its development was announced in March 1999 and it was first released on March 4, 2000, in Japan. Its primary competitors were Sega's Dreamcast, Microsoft's Xbox, and Nintendo's GameCube.\r\n\r\nThe PS2 is the best-selling console of all time, having reached over 150 million units sold as of January 31, 2011.",
      "icon": "sony-playstation-2-1336524968.png",
      "console": "11.png"
    },
    "12": {
      "id": 12,
      "name": "Sony Playstation 3",
      "alias": "sony-playstation-3",
      "overview": "The PlayStation 3, (officially abbreviated as PS3) is the third home video game console produced by Sony Computer Entertainment and the successor to the PlayStation 2 as part of the PlayStation series.\r\n\r\nThe PlayStation 3 competes with Microsoft's Xbox 360 and Nintendo's Wii as part of the seventh generation of video game consoles. It was first released on November 11, 2006, in Japan, with international markets following shortly thereafter.",
      "icon": "sony-playstation-3-1336524977.png",
      "console": "12.png"
    },
    "13": {
      "id": 13,
      "name": "Sony Playstation Portable",
      "alias": "sony-psp",
      "overview": "The PlayStation Portable, officially abbreviated PSP, is a handheld game console manufactured and marketed by Sony Corporation.  The PlayStation Portable is the first and only handheld video game console to use an optical disc format, Universal Media Disc (UMD), as its primary storage medium.",
      "icon": "sony-psp-1336525006.png",
      "console": "13.png"
    },
    "14": {
      "id": 14,
      "name": "Microsoft Xbox",
      "alias": "microsoft-xbox",
      "overview": "The Xbox is a sixth-generation video game console manufactured by Microsoft. It was released on November 15, 2001 in North America, February 22, 2002 in Japan, and March 14, 2002 in Australia and Europe and is the predecessor to the Xbox 360. It was Microsoft's first foray into the gaming console market, and competed with Sony's PlayStation 2, Sega's Dreamcast, and Nintendo's GameCube. The integrated Xbox Live service allowed players to play games online.",
      "icon": "microsoft-xbox-1336524486.png",
      "console": "14.png"
    },
    "15": {
      "id": 15,
      "name": "Microsoft Xbox 360",
      "alias": "microsoft-xbox-360",
      "overview": "The Xbox 360 is the second video game console produced by Microsoft and the successor to the Xbox. The Xbox 360 competes with Sony's PlayStation 3 and Nintendo's Wii as part of the seventh generation of video game consoles. As of September 30, 2011, 57.6 million Xbox 360 consoles have been sold worldwide.\r\n\r\nSeveral major features of the Xbox 360 are its integrated Xbox Live service that allows players to compete online, download arcade games, game demos, trailers, TV shows, music and movies and its Windows Media Center multimedia capabilities. The Xbox 360 also offers region specific access to third-party media streaming services such as Netflix and ESPN in the US or Sky Go in the UK.",
      "icon": "microsoft-xbox-360-1336524497.png",
      "console": "15.png"
    },
    "16": {
      "id": 16,
      "name": "Sega Dreamcast",
      "alias": "sega-dreamcast",
      "overview": "The Dreamcast is a 128-bit video game console which was released by Sega in late 1998 in Japan and from September 1999 in other territories. It was the first entry in the sixth generation of video game consoles, preceding Sony's PlayStation 2, Microsoft's Xbox and the Nintendo GameCube.\r\n\r\nDreamcast sales were positive during launch, but because of the strong pressure from rival PlayStation 2, Dreamcast sales decreased, and Sega finally discontinued the Dreamcast in March 2001 and withdrew entirely from the console hardware business, making it the company's final console.",
      "icon": "sega-dreamcast-1336524794.png",
      "console": "16.png"
    },
    "17": {
      "id": 17,
      "name": "Sega Saturn",
      "alias": "sega-saturn",
      "overview": "The Sega Saturn is a 32-bit fifth-generation video game console that was first released by Sega on November 22, 1994 in Japan, May 11, 1995 in North America, and July 8, 1995 in Europe. The system was discontinued in North America and Europe in 1998, and in 2000 in Japan.\r\n\r\nWhile it was popular in Japan, the Saturn failed to gain a similar market share in North America and Europe against its main competitors: Sony's PlayStation and the Nintendo 64.",
      "icon": "sega-saturn-1336524946.png",
      "console": "17.png"
    },
    "18": {
      "id": 18,
      "name": "Sega Genesis",
      "alias": "sega-genesis",
      "overview": "The Sega Genesis is a fourth-generation video game console developed and produced by Sega. It was originally released in Japan in 1988 as Mega Drive, then in North America in 1989 as Sega Genesis, and in Europe, Australia and other PAL regions in 1990 as Mega Drive.\r\n\r\nThe reason for the two names is that Sega was unable to secure legal rights to the Mega Drive name in North America. The Sega Genesis is Sega's third console and the successor to the Sega Master System with which it has backward compatibility.\r\n\r\nThe controversy over games like Mortal Kombat in the United States forced Sega to create the first content rating system for video games, the Videogame Rating Council, rather than have the games heavily censored. The rating system allowed Sega to ship games with little to no censorship and gave it a competive edge when the same game was released by Nintendo. The success of those games eventually forced Nintendo to join its rating system.",
      "icon": "sega-genesis-1336524897.png",
      "console": "18.png"
    },
    "20": {
      "id": 20,
      "name": "Sega Game Gear",
      "alias": "sega-game-gear",
      "overview": "The Sega Game Gear was Sega's first handheld game console. It was the third commercially available color handheld console, after the Atari Lynx and the TurboExpress.\r\n\r\nWork began on the console in 1989 under the codename \"Project Mercury\", following Sega's policy at the time of codenaming their systems after planets. The system was released in Japan on October 6, 1990, North America, Europe and Argentina in 1991, and Australia in 1992. The launch price was $150 US and £145 UK. Sega dropped support for the Game Gear in early 1997.",
      "icon": "sega-game-gear-1336524808.png",
      "console": "20.png"
    },
    "21": {
      "id": 21,
      "name": "Sega CD",
      "alias": "sega-cd",
      "overview": "The Mega-CD is an add-on device for the Mega Drive video game console, designed and produced by Sega and released in Japan, Europe, Australia, New Zealand, and South Africa. The device was also released in North America under the name Sega CD, for the Sega Genesis. The device adds a CD-ROM drive to the console, allowing the user to play CD-based games and providing additional hardware functionality. It can also play audio CDs and CD+G discs.\r\n\r\nThe development of the Mega-CD was confidential; game developers were not made aware of what exactly they were working on until the add-on was finally revealed at the Tokyo Toy Show in Japan. The Mega-CD was designed to compete with the PC Engine CD (TurboGrafx-16 CD) in Japan, which had a separate CD-ROM drive.\r\n\r\nThe first version of the Mega-CD sits underneath the Mega Drive console and loads CDs via a motorized tray. A second version places a top-loading CD-ROM drive to the right of the console and is intended primarily for use with the redesigned Sega Mega Drive 2. Both versions of the Mega-CD are compatible with the initial two versions of the Mega Drive console, but not with the Mega Drive 3 or Genesis 3.",
      "icon": "sega-cd-1336524786.png",
      "console": "21.png"
    },
    "22": {
      "id": 22,
      "name": "Atari 2600",
      "alias": "atari-2600",
      "overview": "The Atari 2600 is a video game console released in October 1977 by Atari, Inc. It is credited with popularizing the use of microprocessor-based hardware and cartridges containing game code, instead of having non-microprocessor dedicated hardware with all games built in. The first game console to use this format was the Fairchild Channel F; however, the Atari 2600 receives credit for making the plug-in concept popular among the game-playing public.\r\nThe console was originally sold as the Atari VCS, for Video Computer System. Following the release of the Atari 5200, in 1982, the VCS was renamed \"Atari 2600\", after the unit's Atari part number, CX2600. The 2600 was typically bundled with two joystick controllers, a conjoined pair of paddle controllers, and a cartridge game—initially Combat and later Pac-Man.\r\n\r\nThe Atari 2600 was wildly successful, and during much of the 1980s, \"Atari\" was a synonym for this model in mainstream media and, by extension, for video games in general.",
      "icon": "atari-2600-1336524261.png",
      "console": "22.png"
    },
    "23": {
      "id": 23,
      "name": "Arcade",
      "alias": "arcade",
      "overview": "An arcade game is a coin-operated (also bill-operated or card-operated) entertainment machine, usually installed in public businesses such as restaurants, public houses, and video arcades.\r\nArcade video games are often composed of short levels, intuitive control mechanisms and a rising difficulty. This is the main concept of an arcade video game in which the player is essentially obliged to pay to maintain the play.",
      "icon": "arcade-1336524196.png",
      "console": "23.png"
    },
    "24": {
      "id": 24,
      "name": "Neo Geo",
      "alias": "neogeo",
      "overview": "The NeoGeo is a cartridge-based arcade and home video game system released on July 1, 1991 by Japanese game company SNK. Being in the Fourth generation of Gaming, it was the first console in the former Neo Geo family, which only lived through the 1990s. The hardware featured comparatively colourful 2D graphics.\r\nThe MVS (Multi Video System), as the Neo Geo was known to the coin-op industry, offered arcade operators the ability to put up to 6 different arcade titles into a single cabinet, a key economic consideration for operators with limited floorspace. With its games stored on self-contained cartridges, a game-cabinet could be exchanged for a different game-title by swapping the game's ROM-cartridge and cabinet artwork. Several popular franchise-series, including Fatal Fury, The King of Fighters, Metal Slug and Samurai Shodown, were released for the platform.\r\nThe Neo Geo system was also marketed as a very costly home console, commonly referred to today as the AES (Advanced Entertainment System). The Neo Geo was marketed as 24-bit, though it was technically a parallel processing 16-bit system with an 8-bit Zilog Z80 as coprocessor. The coprocessor was used as a CPU, and for sound processing. The Super Nintendo and Sega Genesis also had similar co-processors, with neither Sega nor Nintendo claiming they were 24-bit.",
      "icon": "neogeo-1336524621.png",
      "console": "24.png"
    },
    "25": {
      "id": 25,
      "name": "3DO",
      "alias": "3do",
      "overview": "The 3DO Interactive Multiplayer, often called simply 3DO, is a video game console originally produced by Panasonic in 1993. Further renditions of the hardware were released in 1994 by Sanyo and Goldstar. The consoles were manufactured according to specifications created by The 3DO Company, and were originally designed by Dave Needle and RJ Mical of New Technology Group. The system was conceived by entrepreneur and Electronic Arts founder Trip Hawkins.\r\n\r\nDespite a highly promoted launch (including being named Time magazine's \"1994 Product of the Year\") and a host of cutting-edge technologies, the 3DO's high price (US$699.95 at launch), limited third-party developer support, and an over-saturated console market prevented the system from achieving success comparable to competitors Sega and Nintendo.  This console was released in North America on October 4, 1993, Japan on March 20, 1994 and in Europe in 1994.",
      "icon": "3do-1336524121.png",
      "console": "25.png"
    },
    "26": {
      "id": 26,
      "name": "Atari 5200",
      "alias": "atari-5200",
      "overview": "The Atari 5200 SuperSystem, commonly known as the Atari 5200, is a video game console that was introduced in 1982 by Atari Inc. as a higher end complementary console for the popular Atari 2600.  The 5200 was created to compete with the Intellivision, but wound up more directly competing with the ColecoVision shortly after its release.\r\n\r\nThe 5200 was based on Atari Inc.'s existing 400/800 computers and the internal hardware was almost identical, although software was not directly compatible between the two systems. The 5200's controllers feature an analog joystick and a numeric keypad along with start, pause and reset buttons. The 360-degree non-centering joystick was touted as offering more control than the four-position joystick controller offered with the Atari 2600.",
      "icon": "atari-5200-1393096687.png",
      "console": "26.png"
    },
    "27": {
      "id": 27,
      "name": "Atari 7800",
      "alias": "atari-7800",
      "overview": "The Atari 7800 ProSystem, or simply the Atari 7800, is a video game console re-released by Atari Corporation in January 1986. The original release had occurred two years earlier under Atari Inc. The 7800 had originally been designed to replace Atari Inc.'s Atari 5200 in 1984, but was temporarily shelved due to the sale of the company after the video game crash. In January 1986, the 7800 was again released and would compete that year with the Nintendo Entertainment System and the Sega Master System. It had simple digital joysticks; it was almost fully backward-compatible with the Atari 2600(and was the first console to have backward compatibility without the use of additional modules); and it was considered affordable at a price of US$140.",
      "icon": "atari-7800-1393096747.png",
      "console": "27.png"
    },
    "28": {
      "id": 28,
      "name": "Atari Jaguar",
      "alias": "atari-jaguar",
      "overview": "The Atari Jaguar is a video game console that was released by Atari Corporation in 1993. It was the last to be marketed under the Atari brand until the release of the Atari Flashback in 2004. It was designed to surpass the Mega Drive/Genesis, Super Nintendo Entertainment System, and the Panasonic 3DO in processing power. Although launched one year earlier, it was eventually in competition with the Sega Saturn, the Sony PlayStation, and other consoles that made up the fifth generation of video game consoles. The console was first released in New York City and San Francisco on November 23, 1993, and the rest of the country in early 1994.  Although it was promoted as the first 64-bit gaming system, the Jaguar proved to be a commercial failure and prompted Atari to leave the home video game console market. Despite its commercial failure, the Jaguar has a dedicated fan base that produces homebrew games for it.",
      "icon": "atari-jaguar-1336524288.png",
      "console": "28.png"
    },
    "29": {
      "id": 29,
      "name": "Atari Jaguar CD",
      "alias": "atari-jaguar-cd",
      "overview": "The Atari Jaguar CD or Jag CD is a CD-ROM peripheral for the Atari Jaguar video game console.\r\nLate in the life span of the company, Atari released this long-promised CD-ROM unit. The unit hit shelves on September 11, 1995 and retailed for $149.95.\r\n\r\nThe device sat atop the Jaguar console, snapping very firmly into the cartridge slot, and had a funnel-like shape. The drive had its own cartridge slot to allow cartridge games to be played without removing the CD drive. There was a separate \"Memory Track\" cartridge for storing saved game position and high scores.\r\nThe Jaguar CD unit featured a double speed (2x) drive and built-in VLM (Virtual Light Machine) software written by Jeff Minter. The VLM, which provided a sophisticated video light show when an audio CD was played in the machine, was as popular among buyers as the games themselves. Packaged with the drive were two games (Blue Lightning and Vid Grid), a music CD (Tempest 2000 soundtrack), and a Myst demo disc. Also, the startup screen was different than that of the cartridge-based Jaguar: using the VLM banks it created a random 'light show' that was different every time the console was switched on. However, the startup was silent.",
      "icon": "atari-jaguar-cd-1336524356.png",
      "console": "29.png"
    },
    "30": {
      "id": 30,
      "name": "Atari XE",
      "alias": "atari-xe",
      "overview": "Atari Corp. brought out the XE Game System (XEGS) in 1987. The XE Game System was sold bundled with a detachable keyboard, a joystick and a light gun (XG-1), and a couple of game cartridges (Bug Hunt and Flight Simulator II). The XE Game System was essentially a repackaged 65XE, and was compatible with almost all Atari 8-bit software and hardware as a result.",
      "icon": "atari-xe-1393098372.png",
      "console": "30.png"
    },
    "31": {
      "id": 31,
      "name": "Colecovision",
      "alias": "colecovision",
      "overview": "The ColecoVision is Coleco Industries' second generation home video game console which was released in August 1982. The ColecoVision offered arcade-quality graphics and gaming style, and the means to expand the system's basic hardware. Released with a catalog of 12 launch titles, with an additional ten games announced for 1982, approximately 145 titles in total were published as ROM cartridges for the system between 1982 and 1984.",
      "icon": "colecovision-1393096902.png",
      "console": "31.png"
    },
    "32": {
      "id": 32,
      "name": "Intellivision",
      "alias": "intellivision",
      "overview": "The Intellivision is a video game console released by Mattel in 1979. Development of the console began in 1978, less than a year after the introduction of its main competitor, the Atari 2600. The word intellivision is a portmanteau of \"intelligent television\". Over 3 million Intellivision units were sold and a total of 125 games were released for the console.",
      "icon": "intellivision-1336524468.png",
      "console": "32.png"
    },
    "33": {
      "id": 33,
      "name": "Sega 32X",
      "alias": "sega-32x",
      "overview": "The Sega 32X, codenamed Project Mars, is an add-on for the Mega Drive/Genesis video game console by Sega. Its aim was to increase the lifespan of the aging Mega Drive/Genesis system, which was facing stiff competition from the SNES. While connecting it to Mega Drive did increase its capabilities, reluctance to adapt due to the previous failure of the Mega-CD and the upcoming Sega Saturn system led to low sales and a short lifespan.\r\n\r\nIt was distributed under the name Sega Super 32X in Japan, Sega Genesis 32X in North America, Sega Mega Drive 32X in the PAL region, and Sega Mega 32X in Brazil.",
      "icon": "sega-32x-1336524764.png",
      "console": "33.png"
    },
    "34": {
      "id": 34,
      "name": "TurboGrafx 16",
      "alias": "turbografx-16",
      "overview": "TurboGrafx-16, fully titled as TurboGrafx-16 Entertainment SuperSystem and known in Japan as the PC Engine, is a video game console developed by Hudson Soft and NEC, released in Japan on October 30, 1987, and in North America on August 29, 1989.",
      "icon": "turbografx-16-1336525037.png",
      "console": "34.png"
    },
    "35": {
      "id": 35,
      "name": "Sega Master System",
      "alias": "sega-master-system",
      "overview": "The Master System (abbreviated to SMS) is a third-generation video game console that was manufactured and released by Sega in 1985 in Japan (as the Sega Mark III), 1986 in North America and 1987 in Europe.\r\n\r\nThe original SMS could play both cartridges and the credit card-sized \"Sega Cards,\" which retailed for cheaper prices than cartridges but had less code. The SMS also featured accessories such as a light gun and 3D glasses which were designed to work with a range of specially coded games.\r\n\r\nThe Master System was released as a direct competitor to the Nintendo Entertainment System in the third videogame generation The SMS was technically superior to the NES, which predated its release significantly, but failed to overturn Nintendo's significant market share advantage in Japan and North America.",
      "icon": "sega-master-system-1336524915.png",
      "console": "35.png"
    },
    "36": {
      "id": 36,
      "name": "Sega Mega Drive",
      "alias": "sega-mega-drive",
      "overview": "(Most Europe countries have this versions and not the Genesis. The games do not even mention Genesis on their covers. Deleting this platform will induce in an enormous amount of database failures. Please DO NOT delete.)",
      "icon": "sega-mega-drive-1336524932.png",
      "console": null
    },
    "37": {
      "id": 37,
      "name": "Mac OS",
      "alias": "mac-os",
      "overview": "Mac OS is a series of graphical user interface-based operating systems developed by Apple Inc. (formerly Apple Computer, Inc.) for their Macintosh line of computer systems. The Macintosh user experience is credited with popularizing the graphical user interface.",
      "icon": "mac-os-1340244009.png",
      "console": "37.png"
    },
    "38": {
      "id": 38,
      "name": "Nintendo Wii U",
      "alias": "nintendo-wii-u",
      "overview": "The Wii U is Nintendo's sixth home console and the first Nintendo console to produce 1080p high-definition graphics, and features a new controller with an embedded touchscreen. The controller allows a player to continue playing certain games by displaying the game even when the television is off. The system will be backwards compatible with Wii, and Wii U games can support compatibility with Wii peripherals, such as the Wii Remote Plus, Nunchuck, and Classic Controller Pro. It will not be backwards compatible with Nintendo GameCube media or peripherals.",
      "icon": "nintendo-wii-u-1336524744.png",
      "console": "38.png"
    },
    "39": {
      "id": 39,
      "name": "Sony Playstation Vita",
      "alias": "sony-playstation-vita",
      "overview": "The PlayStation Vita is a handheld game console manufactured and marketed by Sony Computer Entertainment. It is the successor to the PlayStation Portable as part of the PlayStation brand of gaming devices.\r\n\r\nThe handheld includes two analog sticks, a 5-inch (130 mm) OLED multi-touch capacitive touchscreen, and supports Bluetooth, Wi-Fi and optional 3G.",
      "icon": "sony-playstation-vita-1336524991.png",
      "console": "39.png"
    },
    "40": {
      "id": 40,
      "name": "Commodore 64",
      "alias": "commodore-64",
      "overview": "The Commodore 64 is an 8-bit home computer introduced by Commodore International in January 1982. Volume production started in the spring of 1982, with machines being released on to the market in August at a price of US$595.  Preceded by the Commodore VIC-20 and Commodore PET machines, the C64 features 64 kilobytes (65,536 bytes) of RAM, hence the name, and had favourable sound and graphical specifications when compared to well-known contemporary systems such as the Apple II, particularly as the price was well below that demanded by Apple. It is commonly known as the C64 or C=64 (after the graphic logo on the case) and occasionally as the CBM 64 (for Commodore Business Machines), or VIC-64.",
      "icon": "commodore-64-1393096937.png",
      "console": "40.png"
    },
    "41": {
      "id": 41,
      "name": "Nintendo Game Boy Color",
      "alias": "nintendo-gameboy-color",
      "overview": "The Game Boy Color is Nintendo's successor to the 8-bit Game Boy handheld game console, and was released on October 21, 1998 in Japan, November 19, 1998 in North America, November 23, 1998 in Europe and November 27, 1998 in the United Kingdom. It features a color screen and is slightly thicker and taller than the Game Boy Pocket. As with the original Game Boy, it has an 8-bit processor.   The Game Boy and Game Boy Color combined have sold 118.69 million units worldwide.",
      "icon": "nintendo-gameboy-color-1336524685.png",
      "console": "41.png"
    },
    "4911": {
      "id": 4911,
      "name": "Amiga",
      "alias": "amiga",
      "overview": "The Amiga is a family of personal computers marketed by Commodore in the 1980s and 1990s. The first model was launched in 1985 as a high-end home computer and became popular for its graphical, audio and multi-tasking abilities. The Amiga provided a significant upgrade from 8-bit computers, such as the Commodore 64, and the platform quickly grew in popularity among computer enthusiasts. The best selling model, the Amiga 500, was introduced in 1987 and became the leading home computer of the late 1980s and early 1990s in much of Western Europe. In North America success was more modest. The Amiga went on to sell approximately six million units.\r\n\r\nSecond generation Amiga systems (A1200 and A4000) were released in 1992. However, poor marketing and failure to repeat the technological advances of the first systems meant that the Amiga quickly lost its market share to competing platforms, such as the fourth generation game consoles, Apple Macintosh and IBM PC compatibles.",
      "icon": "amiga-1336524133.png",
      "console": "4911.png"
    },
    "4912": {
      "id": 4912,
      "name": "Nintendo 3DS",
      "alias": "nintendo-3ds",
      "overview": "The autostereoscopic device is able to project stereoscopic 3D effects without the use of 3D glasses or any additional accessories. The Nintendo 3DS features backward compatibility with Nintendo DS series software, including Nintendo DSi software. Announcing the device in March 2010, Nintendo officially unveiled it at E3 2010, with the company inviting attendees to use demonstration units. The console succeeds the Nintendo DS series of handheld systems and competes with Sony PlayStation Vita handheld console.",
      "icon": "nintendo-3ds-1344286647.png",
      "console": "4912.png"
    },
    "4913": {
      "id": 4913,
      "name": "Sinclair ZX Spectrum",
      "alias": "sinclair-zx-spectrum",
      "overview": "The ZX Spectrum (pronounced \"Zed-Ex\") is an 8-bit personal home computer released in the United Kingdom in 1982 by Sinclair Research Ltd.\r\n\r\nReferred to during development as the ZX81 Colour and ZX82, the machine was launched as the ZX Spectrum by Sinclair to highlight the machine's colour display, compared with the black-and-white of its predecessor, the ZX81. The Spectrum was ultimately released as eight different models, ranging from the entry level model with 16 kB RAM released in 1982 to the ZX Spectrum +3 with 128 kB RAM and built in floppy disk drive in 1987; together they sold in excess of 5 million units worldwide (not counting numerous clones).\r\n\r\nThe Spectrum was among the first mainstream audience home computers in the UK, similar in significance to the Commodore 64 in the USA. The introduction of the ZX Spectrum led to a boom in companies producing software and hardware for the machine, the effects of which are still seen; some credit it as the machine which launched the UK IT industry. Licensing deals and clones followed, and earned Clive Sinclair a knighthood for \"services to British industry\".\r\n\r\nThe Commodore 64, BBC Microcomputer and later the Amstrad CPC range were major rivals to the Spectrum in the UK market during the early 1980s. Over 24,000 software titles have been released since the Spectrum's launch and new titles continue to be released, with over 90 new ones in 2010.",
      "icon": "sinclair-zx-spectrum-1393098451.png",
      "console": "4913.png"
    },
    "4914": {
      "id": 4914,
      "name": "Amstrad CPC",
      "alias": "amstrad-cpc",
      "overview": "The Amstrad CPC (short for Colour Personal Computer) is a series of 8-bit home computers produced by Amstrad between 1984 and 1990. It was designed to compete in the mid-1980s home computer market dominated by the Commodore 64 and the Sinclair ZX Spectrum, where it successfully established itself primarily in the United Kingdom, France, Spain, and the German-speaking parts of Europe.\r\n\r\nThe series spawned a total of six distinct models: The CPC464, CPC664, and CPC6128 were highly successful competitors in the European home computer market. The later plus models, 464plus and 6128plus, efforts to prolong the system's lifecycle with hardware updates, were considerably less successful, as was the attempt to repackage the plus hardware into a game console as the GX4000.\r\n\r\nThe CPC models' hardware is based on the Zilog Z80A CPU, complemented with either 64 or 128 kB of memory. Their computer-in-a-keyboard design prominently features an integrated storage device, either a compact cassette deck or 3\" floppy disk drive. The main units were only sold bundled with a colour or monochrome monitor that doubles as the main unit's power supply. Additionally, a wide range of first and third party hardware extensions such as external disk drives, printers, and memory extensions, was available.\r\n\r\nThe CPC series was pitched against other home computers primarily used to play video games and enjoyed a strong supply of game software. The comparatively low price for a complete computer system with dedicated monitor, its high resolution monochrome text and graphic capabilities and the possibility to run CP/M software also rendered the system attractive for business users, which was reflected by a wide selection of application software.",
      "icon": "amstrad-cpc-1393097665.png",
      "console": "4914.png"
    },
    "4915": {
      "id": 4915,
      "name": "iOS",
      "alias": "ios",
      "overview": "iOS (previously iPhone OS) is a mobile operating system developed and distributed by Apple Inc. Originally released in 2007 for the iPhone and iPod Touch platforms, it has been extended to support other Apple devices such as the iPad and Apple TV.\r\n\r\nThe user interface of iOS is based on the concept of direct manipulation, using multi-touch gestures. Interface control elements consist of sliders, switches, and buttons. Interaction with the OS includes gestures such as swipe, tap, pinch, and reverse pinch, all of which have specific definitions within the context of the iOS operating system and its multi-touch interface. Internal accelerometers are used by some applications to respond to shaking the device (one common result is the undo command) or rotating it in three dimensions (one common result is switching from portrait to landscape mode).",
      "icon": "4915-1393096970.png",
      "console": null
    },
    "4916": {
      "id": 4916,
      "name": "Android",
      "alias": "android",
      "overview": "Android is a Linux-based operating system designed primarily for touchscreen mobile devices such as smartphones and tablet computers. Initially developed by Android, Inc., which Google backed financially and later bought in 2005, Android was unveiled in 2007 along with the founding of the Open Handset Alliance: a consortium of hardware, software, and telecommunication companies devoted to advancing open standards for mobile devices. The first Android-powered phone was sold in October 2008.",
      "icon": "4916-1393096477.png",
      "console": null
    },
    "4917": {
      "id": 4917,
      "name": "Philips CD-i",
      "alias": "philips-cd-i",
      "overview": "The Philips CD-i (Compact Disc Interactive) is an interactive multimedia CD player developed and marketed by Royal Philips Electronics N.V. This category of device was created to provide more functionality than an audio CD player or game console, but at a lower price than a personal computer with CD-ROM drive at the time. The cost savings were due to the lack of a hard drive, floppy drive, keyboard, mouse, monitor (a standard television was used), and less operating system software. In addition to games, educational and multimedia reference titles were produced, such as interactive encyclopedias, museum tours, etc. before public Internet access was widespread. Competitors included the Tandy VIS and Commodore CDTV. CD-i also refers to the multimedia Compact Disc standard used by the CD-i console, also known as Green Book, which was developed by Philips and Sony (not to be confused with MMCD, the pre-DVD format also co-developed by Philips and Sony). Work on the CD-i began in 1984 and it was first publicly announced in 1986.",
      "icon": "philips-cd-i-1393098199.png",
      "console": "4917.png"
    },
    "4918": {
      "id": 4918,
      "name": "Nintendo Virtual Boy",
      "alias": "nintendo-virtual-boy",
      "overview": "The Virtual Boy was a table-top video game console developed and manufactured by Nintendo. It was the first video game console that was supposed to be capable of displaying \"true 3D graphics\" out of the box, in a form of virtual reality. Whereas most video games use monocular cues to achieve the illusion of three dimensions on a two-dimensional screen, The Virtual Boy creates an illusion of depth through the effect known as parallax. In a manner similar to using a head-mounted display, the user looks into an eyepiece made of neoprene on the front of the machine, and then an eyeglass-style projector allows viewing of the monochromatic (in this case, red) image.\r\n\r\nIt was released on July 21, 1995 in Japan and August 14, 1995 in North America at a price of around US$180. It then became a commercial failure and it was not released in PAL markets. It met with a lukewarm reception that was unaffected by continued price drops. Nintendo discontinued it the following year.",
      "icon": "nintendo-virtual-boy-1447139594.png",
      "console": "4918.png"
    },
    "4919": {
      "id": 4919,
      "name": "Sony Playstation 4",
      "alias": "sony-playstation-4",
      "overview": "The Playstation 4 is the successor to Sony's Playstation 3 console. Moving away from the Cell architecture, the PlayStation 4 will be the first in the Sony series to feature compatibility with the x86 architecture, specifically x86-64, which is a widely used platform common in many modern PCs. The idea is to make video game development easier on the next-generation console, attracting a broader range of developers large and small. These changes highlight Sony's effort to improve upon the lessons learned during the development, production and release of the PS3. Other notable hardware features of the PS4 include 8 GB of memory and a faster Blu-ray drive.\r\n\r\nExpected Launch Q4 2013",
      "icon": "sony-playstation-4-1393097424.png",
      "console": "4919.png"
    },
    "4920": {
      "id": 4920,
      "name": "Microsoft Xbox One",
      "alias": "microsoft-xbox-one",
      "overview": "The Xbox One was announced on May 21, 2013, and it is the successor to the Xbox 360 and the third console in the Xbox family of consoles.\r\n\r\nMoving away from the PowerPC based architecture used in the Xbox 360, the console features an AMD processor built around the x86-64 instruction set. The console places an increasing emphasis on entertainment and integration with the Kinect peripheral, offering the ability to use an existing set-top box to watch live television programming (augmented by an enhanced program guide with support for voice commands), a built-in Skype client, and improved second screen support. The console also provides new functionality for use in games, such as an expanded Xbox Live service, improved Kinect functionality, cloud computing, the ability to automatically record and share video highlights from gameplay, and integrated support for live streaming gameplay online.",
      "icon": "microsoft-xbox-one-1393097041.png",
      "console": "4920.png"
    },
    "4921": {
      "id": 4921,
      "name": "Ouya",
      "alias": "ouya",
      "overview": "The Ouya is a microconsole running its own version of the Android operating system, developed by Boxer8. Julie Uhrman founded the project in 2012. She brought in designer Yves Béhar to collaborate on the design of the project, and Muffi Ghadiali as product manager to put together the engineering team. Development was funded via Kickstarter, raising $8.5 million and becoming the website's second-highest-earning project in its history.\r\n\r\nUnits started to ship to Kickstarter backers on March 28, 2013. The console was released to the general public on June 25, 2013, and features an exclusive Ouya store for applications and games designed specifically for the Ouya platform, of which the majority are casual games targeted at or used by a mass audience of casual gamers. Out of the box, Ouya supports media apps such as TwitchTV and XBMC media player. It runs a modified version of Android 4.1 Jelly Bean, and is open to rooting without voiding the warranty (developer models ordered during the Kickstarter campaign for $699 or $1,337 come pre-rooted). The console's hardware design allows it to be easily opened up, requiring only a standard screwdriver for easy modding and possible hardware addons.\r\n\r\nAll systems can be used as development kits, allowing any Ouya owner and gamer to also be a developer, without the need for licensing fees. All games are required to have some kind of free-to-play aspect, whether that be completely free, has a free trial, or has purchasable upgrades, levels, or other in-game items. The Ouya is classified as part of the eighth generation of video game consoles and as such is a rival competing against the PlayStation 4, Xbox One, and Wii U.",
      "icon": "ouya-1393097891.png",
      "console": null
    },
    "4922": {
      "id": 4922,
      "name": "Neo Geo Pocket",
      "alias": "neo-geo-pocket",
      "overview": "The Neo Geo Pocket is a monochrome handheld video game console released by SNK. It was the company's first handheld system and is part of the Neo Geo family. It debuted in Japan in late 1998, however never saw a western release, being exclusive to Japan and smaller Asian markets such as Hong Kong.",
      "icon": "neo-geo-pocket-1393097137.png",
      "console": "4922.png"
    },
    "4923": {
      "id": 4923,
      "name": "Neo Geo Pocket Color",
      "alias": "neo-geo-pocket-color",
      "overview": "The Neo Geo Pocket Color (shortened NGPC), is a 16-bit colour handheld video game console manufactured by SNK. It is a successor to SNK's monochrome Neo Geo Pocket handheld which debuted in 1998 in Japan. The Neo Geo Pocket Color was released on March 16, 1999 in Japan, August 6, 1999 in North America, and some time in 1999 in Europe.\r\n\r\nThe Neo Geo Pocket Color was SNK's last video game console, and is backwards compatible with the Neo Geo Pocket. In 2000, following SNK's purchase by American pachinko manufacturer Aruze, the Neo Geo Pocket Color was dropped from both the North American and European markets. It did, however, last until 2001 in Japan, with a total of 2 million units sold.",
      "icon": "neo-geo-pocket-color-1393097242.png",
      "console": "4923.png"
    },
    "4924": {
      "id": 4924,
      "name": "Atari Lynx",
      "alias": "atari-lynx",
      "overview": "The Atari Lynx is a 16-bit handheld game console that was released by Atari Corporation in September 1989. The Lynx holds the distinction of being the world's first handheld electronic game with a color LCD. The system is also notable for its forward-looking features, advanced graphics, and ambidextrous layout. As part of the fourth generation of gaming, the Lynx competed with Nintendo's Game Boy (released just a month earlier), the Sega Game Gear and NEC's TurboExpress, both released the following year.",
      "icon": "atari-lynx-1393097977.png",
      "console": "4924.png"
    },
    "4925": {
      "id": 4925,
      "name": "WonderSwan",
      "alias": "wonderswan",
      "overview": "The WonderSwan was a line of handheld game consoles produced in Japan by Bandai. It was developed by Gunpei Yokoi's company Koto and Bandai. The WonderSwan was made to compete with the Neo Geo Pocket Color and the market leader Nintendo's Game Boy Color (even though the developer for the WonderSwan, Gunpei Yokoi, developed the original Nintendo Game Boy).\r\n\r\nThe original WonderSwan was later replaced by the WonderSwan Color; although some WonderSwan Color games are compatible with the original WonderSwan, many are designed exclusively for the WonderSwan Color and show a message such as \"This cartridge is for WonderSwan Color only\" when run on the original WonderSwan.\r\n\r\nThe WonderSwan is playable both vertically and horizontally, and feature a fairly large library of games, including numerous first-party titles based on licensed anime properties, with significant third-party support from Square and Capcom. As it was a console designed essentially for the Japanese market, most of the games are in Japanese, with only a few featuring English text.",
      "icon": "wonderswan-1393097485.png",
      "console": "4925.png"
    },
    "4926": {
      "id": 4926,
      "name": "WonderSwan Color",
      "alias": "wonderswan-color",
      "overview": "The WonderSwan Color was released on December 9, 2000 in Japan, and was a moderate success.\r\nThe original WonderSwan had only a black and white screen. Although the WonderSwan Color was slightly larger and heavier (7 mm and 2 g) compared to the original WonderSwan, the color version featured 512KB of RAM and a larger color LCD screen. In addition, the WonderSwan Color is compatible with the original WonderSwan library of games.\r\nPrior to WonderSwan's release, Nintendo had a virtual monopoly in the Japanese video game handheld market. After the release of the WonderSwan Color, Bandai took approximately 8% of the market share in Japan partly due to its low price of ¥6800 Japanese yen (approximately $59 USD).\r\nAnother reason for the WonderSwan's success in Japan was the fact that Bandai managed to get a deal with Square to port over the original Famicom Final Fantasy games with improved graphics and controls. However, with the popularity of the Game Boy Advance and the reconciliation between Square and Nintendo, the WonderSwan Color and its successor, the SwanCrystal, quickly lost its competitive advantage.",
      "icon": "wonderswan-color-1393097500.png",
      "console": "4926.png"
    },
    "4927": {
      "id": 4927,
      "name": "Magnavox Odyssey 2",
      "alias": "magnavox-odyssey-2",
      "overview": "The Magnavox Odyssey², known in Europe as the Videopac, in Brazil as the Philips Odyssey, in the United States as the Magnavox Odyssey² and the Philips Odyssey², and also by many other names, is a video game console released in 1978.\r\n\r\nIn the early 1970s, Magnavox was an innovator in the home video game industry. They succeeded in bringing the first home video game system to market, the Odyssey, which was quickly followed by a number of later models, each with a few technological improvements (Magnavox Odyssey Series). In 1978, Magnavox, now a subsidiary of North American Philips, released the Odyssey², its new second-generation video game console.\r\n\r\nIn 2009, the video game website IGN named the Odyssey² the 21st greatest video game console, out of its list of 25.",
      "icon": "magnavox-odyssey-2-1447143561.png",
      "console": "4927.png"
    },
    "4928": {
      "id": 4928,
      "name": "Fairchild Channel F",
      "alias": "fairchild",
      "overview": "The Fairchild Channel F debuted August 1976 for $169.99 USD (about $700 USD in 2014) as the Fairchild Video Entertainment System (VES) later changing the console name to Fairchild Channel F when the Atari (VCS) 2600 was released. The \"F\" in Fairchild Channel F stood for the microprocessor the Fairchild F8. The system had signs of good success for the first year but was short lived do to the release of the Atari (VCS) 2600 and production of the console ceased in 1978.\r\n\r\nDespite the short life of the Fairchild Channel F it brought us many first that we take for granted. The Fairchild Channel F was the first system to make use of the microprocessor. This is important because the microprocessor allowed for another first, playing against a computer opponent. Finally the first that none of us would know what to do with out, the pause feature, to freeze game play. Now technically on the Fairchild Channel F the button was called \"hold\" but it was the first to allow a player to freeze game play and resume at a later time, it was just given the name \"pause\" later on the Atari 5200.",
      "icon": "fairchild-1445261469.png",
      "console": "4928.png"
    },
    "4929": {
      "id": 4929,
      "name": "MSX",
      "alias": "msx",
      "overview": "MSX is a standardized home computer architecture Despite Microsoft's involvement, the MSX-based machines were seldom released in the United States, but were popular in Asian countries like Japan and South Korea, South American countries like Brazil and Chile, and in the European market in countries like the Netherlands, France, Spain and Finland. To a lesser extent, the MSX platform was also popular in the former Soviet Union and Kuwait.\r\n\r\nBefore the appearance and great success of Nintendo's Family Computer, MSX was the platform for which major Japanese game studios, such as Konami and Hudson Soft, produced video game titles. The Metal Gear series, for example, was originally written for MSX hardware.",
      "icon": "msx-1444085603.png",
      "console": "4929.png"
    },
    "4930": {
      "id": 4930,
      "name": "PC-FX",
      "alias": "pcfx",
      "overview": "The PC-FX is a 32-bit home video game console made by NEC Corporation. It was released in Japan on December 23, 1994, just weeks after Sony's PlayStation and a month after the Sega Saturn. It is the successor to NEC's PC Engine, known as TurboGrafx-16 in North America.\r\n\r\nUnlike its predecessor, the PC-FX was only released in Japan. The console is shaped just like a tower PC and was meant to be similarly upgradeable. However the PC-FX was using an outdated graphics chip that rendered the system underpowered in comparison to its competitors, which caused it to be a commercial failure. A lack of developers' support also meant inadequate games and as a result it was unable to compete effectively with its fifth generation peers. The PC-FX was NEC's last home video game console, and was discontinued in February 1998.",
      "icon": "pcfx-1444080539.png",
      "console": "4930.png"
    },
    "4931": {
      "id": 4931,
      "name": "Sharp X68000",
      "alias": "x68",
      "overview": "The X68000 is a home computer created by Sharp Corporation, first released in 1987, sold only in Japan. In terms of hardware, it is very similar to arcade machines of the time, and serves as the Capcom CPS system development machine. It supports separate text RAM, graphic RAM and hardware sprites. Sound is produced internally via Yamaha's then top-of-the-line YM2151 FM synthesizer and a single channel OKI MSM6258V for PCM. Due to this and other similarities, it played host to many arcade game ports in its day. Games made for this system include Parodius Da! －Shinwa kara Owarai e－, Ghouls 'n Ghosts, Strider, Final Fight, Alien Syndrome, Street Fighter II Dash, Akumajo Dracula (Castlevania in other regions, the X68000 version was ported to the PlayStation as Castlevania Chronicles), Cho Ren Sha 68k (which has a Windows port) and many others. Many games also supported the Roland SC-55 and MT-32 MIDI modules for sound as well as mixed-mode internal/external output.",
      "icon": "x68000-1444590873.png",
      "console": "4931.png"
    },
    "4932": {
      "id": 4932,
      "name": "FM Towns Marty",
      "alias": "fmtowns",
      "overview": "The FM Towns Marty is a fifth-generation home video game console released in 1993 by Fujitsu, exclusively for the Japanese market. It was the first 32-bit home video game system, and came complete with a built in CD-ROM drive and disk drive. It was based on the earlier FM Towns computer system Fujitsu had released in 1989. The Marty was backward-compatible with older FM Towns games.",
      "icon": "fmtowns-1444085037.png",
      "console": "4932.png"
    },
    "4933": {
      "id": 4933,
      "name": "PC-88",
      "alias": "pc88",
      "overview": "The PC-8801 is a Zilog Z80-based home computer released by Nippon Electric Company (NEC) in 1981 in Japan, where it became very popular. The PC-8801 is informally called the PC-88.\r\n\r\nCompanies that produced exclusive software for the NEC PC-8801 included Enix, Square, Sega, Nihon Falcom, Bandai, HAL Laboratory, ASCII, Pony Canyon, Technology and Entertainment Software, Wolf Team, Dempa, Champion Soft, Starcraft, Micro Cabin, PSK, and Bothtec. Certain games produced for the PC-8801 had a shared release with the MSX, such as those produced by Game Arts, ELF Corporation, and Konami. Many popular series first appeared on the NEC PC-8801, including Snatcher, Thexder, Dragon Slayer, RPG Maker, and Ys.\r\n\r\nNintendo licensed Hudson Soft to port some of Nintendo's Family Computer games for the console, including Excitebike, Balloon Fight, Tennis, Donkey Kong 3, Golf, and Ice Climber, as well as new editions of Mario Bros. called Mario Bros. Special and Punch Ball Mario Bros. and a unique Super Mario Bros. game for the computer, Super Mario Bros. Special.",
      "icon": "pc88-1444092490.png",
      "console": "4933.png"
    },
    "4934": {
      "id": 4934,
      "name": "PC-98",
      "alias": "pc98",
      "overview": "The PC-9801 is a Japanese 16-bit microcomputer manufactured by NEC from 1982, the first in the PC-9800 series of 16-bit and 32-bit personal computers. The PC9801 had thousands of game titles designed for it, many of which made creative use of the system's limitations (it was originally designed as a business machine) to great commercial success. Despite having hardware specifications far inferior to the Fujitsu FM Towns and Sharp X68000 personal computers, the massive install base and steady flow of game titles (in particular \"doujin\" style dating sims and RPGs, as well as early games of the Touhou Project franchise) kept it as the favored platform for PC game developers in Japan until the rise of the DOS/V clones.",
      "icon": "4934-1444591291.png",
      "console": "4934.png"
    },
    "4935": {
      "id": 4935,
      "name": "Nuon",
      "alias": "nuon",
      "overview": "Nuon is a technology developed by VM Labs that adds features to a DVD player. In addition to viewing DVDs, one can play 3D video games and use enhanced DVD navigational tools such as zoom and smooth scanning of DVD playback. One could also play CDs while the Nuon graphics processor generates synchronized graphics on the screen. There were plans to provide Internet access capability in the next generation of Nuon-equipped DVD players.",
      "icon": "nuon-1445250489.png",
      "console": "4935.png"
    },
    "4936": {
      "id": 4936,
      "name": "Famicom Disk System",
      "alias": "fds",
      "overview": "The Family Disk System was released on February 21, 1986 by Nintendo as a peripheral for the Nintendo Family Computer console in Japan. It uses proprietary floppy disks (called \"Disk Cards\") for data storage. The Disk System's Disk Cards are somewhat proprietary 71 mm × 76 mm (2.8x3 in) 56K-per-side double-sided floppy. These \"Disk Cards,\" as they are officially called, were a slight modification of Mitsumi's \"Quick Disk\" 89 mm 2.8 in square disk format which is used in a handful of Japanese computers and various synthesizer keyboards, along with a few word processors. Some of the QuickDisk drives even made it into devices in Europe and North America, though they are somewhat rare. Mitsumi already had close relations with Nintendo, as it manufactured the Famicom and NES consoles, and possibly other Nintendo hardware.",
      "icon": "fds-1445251188.png",
      "console": "4936.png"
    },
    "4937": {
      "id": 4937,
      "name": "Atari ST",
      "alias": "atari-st",
      "overview": "The Atari ST is a line of home computers from Atari Corporation and the successor to the Atari 8-bit family. The ST enjoyed success in gaming due to low cost, fast performance and colorful graphics.\r\n\r\nNotable individuals who developed games on the ST include Peter Molyneux, Doug Bell, Jeff Minter, Éric Chahi, Jez San, and David Braben. An early real-time 3D role-playing video game, Dungeon Master, was first developed and released on the ST, and was the best-selling software ever produced for the platform. Simulation games like Falcon and Flight Simulator II made use of the enhanced graphics found in the ST machines, as did many arcade ports. One game, MIDI Maze, uses the MIDI ports to connect up to 16 machines for interactive networked play. Games simultaneously released on the Amiga that had identical graphics and sound were often accused by video game magazines of simply being ST ports. The critically acclaimed game Another World was originally released for ST and Amiga in 1991 with the Polygonal engine developed on the ST and the rotoscoped animations created on the Amiga (the two games are very similar on both systems).",
      "icon": "atari-st-1445259571.png",
      "console": "4937.png"
    },
    "4938": {
      "id": 4938,
      "name": "N-Gage",
      "alias": "ngage",
      "overview": "The N-Gage is a feature phone and handheld game system from Nokia, announced on 4 November 2002 and released on 7 October 2003. It runs on the original Series 60 on Symbian OS v6.1.\r\n\r\nN-Gage attempted to lure gamers away from the Game Boy Advance by including mobile phone functionality. This was unsuccessful, partly because the buttons, designed for a phone, were not well-suited for gaming and when used as a phone the original N-Gage was described as resembling a \"taco\", which led to it becoming a well-known mocking nickname along with the \"Frankenphone\"",
      "icon": "4938-1445259918.png",
      "console": "4938.png"
    },
    "4939": {
      "id": 4939,
      "name": "Vectrex",
      "alias": "vectrex",
      "overview": "The Vectrex is a vector display-based home video game console that was developed by Western Technologies/Smith Engineering. It was licensed and distributed first by General Consumer Electronics (GCE), and then by Milton Bradley Company after its purchase of GCE. Unlike other non-portable video game consoles, which connected to televisions and rendered raster graphics, the Vectrex has an integrated vector monitor which displays vector graphics. The Vectrex is monochrome and uses plastic screen overlays to simulate color and various static graphics and decorations. At the time, many of the most popular arcade games used vector displays, and through a licensing deal with Cinematronics, GCE was able to produce high-quality versions of arcade games such as Space Wars and Armor Attack.",
      "icon": "vectrex-1445285621.png",
      "console": "4939.png"
    },
    "4940": {
      "id": 4940,
      "name": "Game.com",
      "alias": "game-com",
      "overview": "The Game.com is a handheld game console released by Tiger Electronics in September 1997. It featured many new ideas for handheld consoles and was aimed at an older target audience, having PDA-style features and functions such as a touchscreen and stylus. Unlike other handheld game consoles, the first Game.com console included two slots for game cartridges and could be connected to a 14.4 kbit/s modem. There were 21 games released for the Game.com, as well as 9 known unreleased.",
      "icon": "game-com-1445286056.png",
      "console": "4940.png"
    },
    "4941": {
      "id": 4941,
      "name": "TRS-80 Color Computer",
      "alias": "trs80-color",
      "overview": "The Radio Shack TRS-80 Color Computer (also marketed as the Tandy Color Computer and affectionately nicknamed CoCo) is a line of home computers based on the Motorola 6809 processor. The Color Computer was launched in 1980, and lasted through three generations of hardware until being discontinued in 1991. The CoCo is designed to be attached to a color television set, whereas the Z80 machines use monochrome computer monitors, often built into the case. The CoCo also features an expansion connector for program cartridges (mostly games, although the EDTASM assembler is a cartridge) and other expansion devices, such as floppy-disk controllers and modems. In this way it is similar to the Atari 2600, Atari 8-bit computers, and other cartridge-capable systems. Tandy released a Multi-Pak Interface which allowed switching quickly among four cartridges. This is similar in concept to the Model I's Expansion Interface.",
      "icon": "trs80-color-1446589658.png",
      "console": "4941.png"
    },
    "4942": {
      "id": 4942,
      "name": "Apple II",
      "alias": "apple2",
      "overview": "The Apple II (styled as apple ][) is an 8-bit home computer, one of the first highly successful mass-produced microcomputer products, designed primarily by Steve Wozniak. It was introduced in 1977 at the West Coast Computer Faire by Jobs and was the first consumer product sold by Apple Computer. It is the first model in a series of computers which were produced until Apple IIe production ceased in November 1993.",
      "icon": "apple2-1446583849.png",
      "console": "4942.png"
    },
    "4943": {
      "id": 4943,
      "name": "Atari 800",
      "alias": "atari800",
      "overview": "The Atari 8-bit family is a series of 8-bit home computers introduced by Atari, Inc. in 1979 and manufactured until 1992. All are based on the MOS Technology 6502 CPU running at 1.79 MHz, roughly twice that of similar designs, and were the first home computers designed with custom co-processor chips. This architecture allowed the Atari designs to offer graphics and sound capabilities that were more advanced than contemporary machines like the Apple II or Commodore PET, and gaming on the platform was a major draw; Star Raiders is widely considered the platform's killer app. Machines with similar performance would not appear until the BBC Micro in late 1981 and the Commodore 64 in 1982.",
      "icon": "atari800-1446587367.png",
      "console": "4943.png"
    },
    "4944": {
      "id": 4944,
      "name": "Acorn Archimedes",
      "alias": "acorn-archimedes",
      "overview": "The Acorn Archimedes is a family of personal computers designed by Acorn Computers Ltd in Cambridge, England and sold in the late-1980s to mid-1990s, their first general purpose home computer based on their own ARM architecture. The Archimedes was one of the most powerful home computers available during the late 1980s and early 1990s; its main CPU was faster than the Motorola 68000 microprocessors found in the more popular Commodore Amiga and Atari ST machines.",
      "icon": "acorn-archimedes-1446690349.png",
      "console": "4944.png"
    },
    "4945": {
      "id": 4945,
      "name": "Commodore VIC-20",
      "alias": "commodore-vic20",
      "overview": "The VIC-20 is an 8-bit home computer which was sold by Commodore Business Machines. The VIC-20 was announced in 1980, roughly three years after Commodore's first personal computer, the PET. The VIC-20 was the first computer of any description to sell one million units. As for commercial software offerings, an estimated 300 titles were available on cartridge, and another 500+ titles were available on tape. By comparison, the Atari 2600—the most popular of the video game consoles at the time—had a library of about 900 titles near the end of its production life (although many titles were extremely similar). Most cartridge games were ready to play as soon as the VIC-20 was turned on, as opposed to games on tape which required a time-consuming loading process. Titles on cartridge included Gorf, Cosmic Cruncher, Sargon II Chess, and many others. A handful of disk applications were released for the VIC-20.",
      "icon": "commodore-vic20-1446691509.png",
      "console": "4945.png"
    },
    "4946": {
      "id": 4946,
      "name": "Commodore 128",
      "alias": "c128",
      "overview": "The Commodore 128 is the last 8-bit home computer that was commercially released by Commodore Business Machines (CBM). Introduced in January 1985 at the CES in Las Vegas, it appeared three years after its predecessor, the bestselling Commodore 64. Some 64 software such as Bard's Tale III and Kid Niki ran in 128 mode without stating this in the documentation, using the autoboot and the 1571's faster disk access.  Some Infocom text adventures took advantage of the 80 column screen and increased memory capacity. Some C64 games were ported to native mode like Kikstart 2 and The Last V8 from Mastertronic, which have separate 128 versions, and Ultima V: Warriors of Destiny from Origin Systems, which uses extra RAM for music if running on the C128. The vast majority of games simply ran in 64 mode.",
      "icon": "c128-1446691445.png",
      "console": "4946.png"
    },
    "4947": {
      "id": 4947,
      "name": "Amiga CD32",
      "alias": "amiga-cd32",
      "overview": "The Amiga CD32 is the first 32-bit home video game console released in western Europe, Australia, Canada and Brazil. It was based on Commodore's Advanced Graphics Architecture chipset, and is of similar specification to the Amiga 1200 computer. Using third party devices, it is possible to upgrade the CD32 with keyboard, floppy drive, hard drive, RAM and mouse, turning it into the equivalent of an Amiga 1200 personal computer. The CD32 is capable of running most of the titles developed for the Amiga CDTV multimedia device, but differences in CPU speed and Kickstart version prevent some of the earlier CDTV titles from running. Many of the games released for the CD32 are simply ports of games that are already available for Amiga computers. One benefit of this is that, when appropriate, many games retain the ability to use an Amiga mouse (in port 2) or Amiga keyboard (plugged into the AUX port).",
      "icon": "amiga-cd32-1447024303.png",
      "console": "4947.png"
    },
    "4948": {
      "id": 4948,
      "name": "Mega Duck",
      "alias": "megaduck",
      "overview": "The Mega Duck (also known as Cougar Boy) is a handheld game console that was produced by Hong Kong-based Welback Holdings through its Timlex International division and came on the market in 1993.\r\n\r\nThe cartridges are very similar to those of the Watara Supervision, but slightly narrower with fewer contacts (36 pins, whereas Supervision cartridges have 40). Conceptually, the electronics inside the Supervision and the Mega Duck are also very similar. The position of the volume controls, contrast controls, buttons, and connectors are virtually identical. However, the LCD of the Supervision is larger than the Mega Duck's.\r\n\r\nThe Cougar Boy came with a 4-in-one game cartridge and a stereo earphone.",
      "icon": "megaduck-1447489202.png",
      "console": "4948.png"
    },
    "4949": {
      "id": 4949,
      "name": "SEGA SG-1000",
      "alias": "sg1000",
      "overview": "The SG-1000 is a cartridge-based home video game console manufactured by Sega and released in Japan, Australia, and other countries. This system marked Sega's first entry into the home video game hardware business, and provided the basis for the more successful Master System.\r\n\r\nThe SG-1000's game library comprises 68 standard cartridge releases and 29 Sega Card releases. All of the SG-1000's games play on each model of the console, though 26 of the cartridge releases require the attached keyboard accessory or the SC-3000. In addition, all titles are fully compatible with the Mark III and Master System. Titles for the system include Flicky, Congo Bongo, Sega-Galaga, and Girl's Garden, the first video game directed by Sonic the Hedgehog creator Yuji Naka. The game library for the SG-1000 also included licensed titles, such as Golgo 13.",
      "icon": "sg1000-1448530019.png",
      "console": "4949.png"
    },
    "4950": {
      "id": 4950,
      "name": "Game & Watch",
      "alias": "game-and-watch",
      "overview": "Game & Watch is a line of handheld electronic games produced by Nintendo from 1980 to 1991. Created by game designer Gunpei Yokoi, each Game & Watch features a single game to be played on an LCD screen in addition to a clock, an alarm, or both. It was the earliest Nintendo product to garner major success.There were 59 different Game & Watch games produced for sale and one that was only available as a contest prize, making 60 in all. The prize game was given to winners of Nintendo's F-1 Grand Prix tournament, a yellow-cased version of Super Mario Bros. that came in a plastic box modeled after the Disk-kun character Nintendo used to advertise their Famicom Disk System. As only 10,000 units were produced and it was never available for retail sale, the yellow version is considered rare.",
      "icon": "game-and-watch-1448906321.png",
      "console": "4950.png"
    },
    "4951": {
      "id": 4951,
      "name": "Handheld Electronic Games (LCD)",
      "alias": "lcd",
      "overview": "Handheld electronic games are very small, portable devices for playing interactive electronic games, often miniaturized versions of video games. The controls, display and speakers are all part of a single unit. Rather than a general-purpose screen made up of a grid of small pixels, they usually have custom displays designed to play one game. This simplicity means they can be made as small as a digital watch, and sometimes are. The visual output of these games can range from a few small light bulbs or LED lights to calculator-like alphanumerical screens; later these were mostly displaced by liquid crystal and Vacuum fluorescent display screens with detailed images and in the case of VFD games, color. Handhelds were at their most popular from the late 1970s into the early 1990s. They are the precursors to the handheld game console.",
      "icon": "lcd-1448986915.png",
      "console": null
    },
    "4952": {
      "id": 4952,
      "name": "Dragon 32/64",
      "alias": "dragon32-64",
      "overview": "The Dragon 32 and Dragon 64 are home computers that were built in the 1980s. The Dragons are very similar to the TRS-80 Color Computer, and were produced for the European market by Dragon Data, Ltd., in Port Talbot, Wales, and for the US market by Tano of New Orleans, Louisiana. The model numbers reflect the primary difference between the two machines, which have 32 and 64 kilobytes of RAM, respectively. Initially, the Dragon was reasonably well supported by the major UK software companies with versions of popular games from other systems being ported to the Dragon. Examples of top selling games available for the Dragon include Arcadia (Imagine), Chuckie Egg (A&F), Manic Miner and sequel Jet Set Willy (Software Projects), Hunchback (Ocean) and Football Manager (Addictive). There were also companies that concentrated on the Dragon such as Microdeal. Their character Cuthbert appeared in several games on the Dragon with Cuthbert Goes Walkabout also being converted for Atari 8-bit and Commodore 64 systems.",
      "icon": "dragon32-64-1449254358.png",
      "console": "4952.png"
    },
    "4953": {
      "id": 4953,
      "name": "Texas Instruments TI-99/4A",
      "alias": "texas-instruments-ti-99-4a",
      "overview": "The Texas Instruments TI-99/4A is a home computer, released June 1981 in the United States at a price of $525 ($1,366 adjusted for inflation). It is an enhanced version of the less successful TI-99/4 model, which was released in late 1979 at a price of $1,150 ($3,749 adjusted for inflation). The TI-99/4 had a calculator-style chiclet keyboard and a character set that lacked lowercase text. The TI-99/4A added an additional graphics mode, \"lowercase\" characters consisting of small capitals, and a full-travel keyboard. Both used 16-bit processors, making the TI-99/4 series the first 16-bit home computers.",
      "icon": "texas-instruments-ti-99-4a-1468138361.png",
      "console": "4953.png"
    },
    "4954": {
      "id": 4954,
      "name": "Acorn Electron",
      "alias": "acorn-electron",
      "overview": "The Acorn Electron is a budget version of the BBC Micro educational/home computer made by Acorn Computers Ltd. It has 32 kilobytes of RAM, and its ROM includes BBC BASIC v2 along with its operating system.\r\n\r\nThe Electron was able to save and load programs onto audio cassette via a supplied converter cable that connected it to any standard tape recorder that had the correct sockets. It was capable of basic graphics, and could display onto either a television set, a colour (RGB) monitor or a \"green screen\" monitor.\r\n\r\nFor a short period, the Electron was reportedly the best selling micro in the United Kingdom and total lifetime game sales for the Electron exceeded those of the BBC Micro.",
      "icon": "acorn-electron-1468269141.png",
      "console": "4954.png"
    },
    "4955": {
      "id": 4955,
      "name": "TurboGrafx CD",
      "alias": "turbo-grafx-cd",
      "overview": "The PC Engine CD-ROM² add-on was released in Japan for the PC Engine console in December of 1988. The North American version, known as the TurboGrafx-CD, went on sale in 1989 for the TurboGrafx-16 (the North American version of the PC Engine).\r\n\r\nWhile it had little success in North America, the device boosted sales for the PC Engine in Japan. It helped the PC Engine outsell the NES for a while (up until the release of the SNES) and become the second best-selling console of the 16-bit era, behind the Super Famicom (which later planned its own PlayStation CD add-on) and ahead of the Sega Mega Drive (which later had its own CD-ROM add-on, the Sega CD).",
      "icon": "4955-1455648164.png",
      "console": "4955.png"
    },
    "4956": {
      "id": 4956,
      "name": "Neo Geo CD",
      "alias": "neo-geo-cd",
      "overview": "From Wikipedia:\r\n\r\nNeo Geo CD (Japanese: ネオジオCD Hepburn: Neo Jio Shī Dī?) is the second home video game console of SNK Corporation's Neo Geo family, released in September 1994, four years after its cartridge-based equivalent. This is the same platform, converted to the cheaper CD format retailing at $49 to $79 per title, compared to the $300 cartridges. The system was originally priced at US$399,[2] or £399 in the UK. The unit's 1X CD-ROM drive is slow, with very long loading times of up to 56 Mbit of data per load.[citation needed] The system can also play Audio CDs. All three versions of the system have no region-lock.\r\n\r\nThe Neo Geo CD was launched bundled with a control pad instead of a joystick like the AES version. However, the original AES joystick can be used with all three Neo Geo CD models.\r\n\r\nAs of March 1997, the Neo Geo CD had sold 570,000 units worldwide.[",
      "icon": "neo-geo-cd-1468269031.png",
      "console": "4956.png"
    },
    "4957": {
      "id": 4957,
      "name": "Nintendo Pokémon Mini",
      "alias": "nintendo-pokmon-mini",
      "overview": "The Pokémon Mini (Japanese: ポケモンミニ Hepburn: Pokemon Mini, officially stylized as Pokémon mini) is a handheld game console that was designed and manufactured by Nintendo and themed around the Pokémon media franchise. It is the smallest game system with interchangeable cartridges ever produced by Nintendo, weighing just under two and a half ounces (70 grams).  It was first released in North America on November 16, 2001, then in Japan on December 14, 2001, and in Europe on March 15, 2002.  The systems were released in three colors: Wooper Blue, Chikorita Green, and Smoochum Purple.",
      "icon": "4957-1468268912.png",
      "console": "4957.png"
    },
    "4958": {
      "id": 4958,
      "name": "Sega Pico",
      "alias": "sega-pico",
      "overview": "The Sega Pico, also known as Kids Computer Pico (キッズコンピューター・ピコ Kizzu Konpyūtā Piko), is an educational video game console by Sega. Marketed as \"edutainment\", the main focus of the Pico was educational video games for children between 3 and 7 years old. The Pico was released in June 1993 in Japan and November 1994 in North America and Europe, later reaching China. It was succeeded by the Advanced Pico Beena, which was released in Japan in 2005. Though the Pico was sold continuously in Japan through the release of the Beena, in North America and Europe the Pico was less successful and was discontinued in early 1998, later being rereleased by Majesco Entertainment. Releases for the Pico were focused on education for children and included titles supported by licensed franchised animated characters, including Disney and Sega's own Sonic the Hedgehog series. Overall, Sega claims sales of 3.4 million Pico consoles and 11.2 million game cartridges, and over 350,000 Beena consoles and 800,000 cartridges.",
      "icon": "4958-1468268712.png",
      "console": "4958.png"
    },
    "4959": {
      "id": 4959,
      "name": "Watara Supervision",
      "alias": "watara-supervision",
      "overview": "The Watara Supervision (also known as the QuickShot Supervision in the UK) is a monochrome handheld game console, originating from Asia, and introduced in 1992 as a cut-price competitor for Nintendo's Game Boy. It came packaged with a game called Crystball, which is similar to Breakout. One unique feature of the Supervision was that it could be linked up to a television via a link cable. Games played in this way would display in four colors, much like Nintendo's Super Game Boy add-on for the SNES.[1] A full color TV link was also in the works, but because of the Supervision's failure to make a major impression among gamers it was cancelled, along with the games which were in development for it.\r\n\r\nThough the machine garnered some attention at launch (mainly due to the low price point for the machine and its games, which many felt might enable it to make inroads into Nintendo's market share) it was ultimately unsuccessful in unseating the Game Boy from its position as the world's most popular handheld. Reasons commonly cited are the poor quality screen which was prone to blurring and made following the action difficult, a general lack of games and the simplistic nature of those that were released.\r\n\r\nYet another problem was that most of the games that were available were developed in Taiwan or Hong Kong, meaning that fans of big-name Western and Japanese developers were underwhelmed by the apparent lack of support from these companies. Only a tiny handful of games were developed by third parties, including Sachen and the British developer B.I.T.S.. Up against Nintendo's list of popular franchises (Zelda, Mario, Metroid) and those of its third parties (Castlevania, Mega Man) - all of which eventually surfaced on the Game Boy - the Supervision's games were of little interest to most.",
      "icon": "console_default.png",
      "console": "4959.png"
    },
    "4960": {
      "id": 4960,
      "name": "Tomy Tutor",
      "alias": "tomy-pyta",
      "overview": "The Tomy Tutor, originally sold in Japan as the Pyūta (ぴゅう太?) and in the UK as the Grandstand Tutor, is a home computer produced by the Japanese toymaker Tomy. It was architecturally similar, but not identical, to the Texas Instruments TI-99/4A, and used a similar 16-bit CPU. The computer was launched on the UK and European markets in late 1983. Outside Japan, however, sales were not significant.\r\n\r\nProduced by Matsushita, the machine was released in Japan in 1982 under the name of Tomy Pyūta.\r\n\r\nTomy described the Tutor, with 16K RAM, as good for games and education. The company stated that its documentation would let an eight-year-old child use the computer without adult supervision.\r\n\r\nOne of the major flaws pointed out with the Tutor was not its hardware, but its marketing: the Tutor was announced as a children's computer when in fact it was practically a cheap, evolved version of the TI-99/4A, even having a similar 16-bit CPU (the TMS 9995, closely related to the TI-99/4's TMS 9990);[1] other competitors in its price range still used 8-bit microprocessors.\r\n\r\nThe Tutor did not sell well against the ZX Spectrum in the UK and the Commodore 64 in other countries. It ended up being removed quickly from the market and replaced the following year by the Tomy Tutor MK II with a standard mechanical keyboard instead of the original \"Chiclet\"-style keyboard. However, the new model seems to have been sold only in Japan, and even then only for a short period of time.\r\n\r\nThe Pyūta Jr. was a console version of the Pyūta, and similarly was only sold in Japan.",
      "icon": "console_default.png",
      "console": "4960.png"
    },
    "4961": {
      "id": 4961,
      "name": "Magnavox Odyssey 1",
      "alias": "magnavox-odyssey",
      "overview": "The Magnavox Odyssey is the first commercial home video game console. It was developed by a small team led by Ralph H. Baer at Sanders Associates and released by Magnavox in the United States in September 1972 and overseas the following year. The Odyssey consists of a white, black, and brown box which connects to a television set and two rectangular controllers attached by wires. It is capable of displaying three square dots on the screen in monochrome black and white, with different behavior of the dots depending on the game played, and has no sound capabilities. Players place plastic overlays on the screen to create visuals, and the one or two players for each game control their dots with the three knobs and one button on the controller in accordance with the rules given for the game. The Odyssey console came packaged with dice, paper money, and other board game paraphernalia to go along with the games, and a peripheral controller—the first video game light gun—was sold separately.\r\n\r\nThe idea for a video game console was thought up by Baer in August 1966, and over the next three years he, along with Bill Harrison and Bill Rusch, created seven successive prototype consoles. The seventh, known as the Brown Box, was shown to several manufacturers before Magnavox agreed to produce it in January 1971. After releasing the console in September 1972 through their dealerships, Magnavox sold between 69,000 and 100,000 units by the end of the year, and 350,000 by the time the console was discontinued in 1975. The console spawned the Magnavox Odyssey series of dedicated consoles, as well as the 1978 Magnavox Odyssey². One of the 28 games made for the system, a ping pong game, was an inspiration for Atari's successful Pong arcade game, in turn driving sales of the console. Baer's patents for the console and the games, including what was termed by a judge as \"the pioneering patent of the video game art\", formed the basis of a series of lawsuits over 20 years, earning Sanders and Magnavox over US$100 million. The release of the Odyssey marked the end of the early history of video games, and the rise of the commercial video game industry along with the start of the first generation of video game consoles.",
      "icon": "console_default.png",
      "console": "4961.png"
    },
    "4962": {
      "id": 4962,
      "name": "Gakken Compact Vision",
      "alias": "gakken-compact-vision",
      "overview": "Gakken Co., Ltd (学研 or 学習研究社) is a Japanese publishing company which also produces educational toys. It released a fair amount of software for the Sega Pico console in Japan.\r\n\r\nThe company had a very brief stint in the video game console market with the Gakken Compact Vision (or TV Boy), released in 1983. With only six games released for the platform, it is considered to be one of many systems pushed off the market by the Nintendo Famicom, and to a lesser extent, the SG-1000.",
      "icon": "console_default.png",
      "console": "4962.png"
    },
    "4963": {
      "id": 4963,
      "name": "Emerson Arcadia 2001",
      "alias": "emerson-arcadia-2001",
      "overview": "Arcadia 2001 is a second-generation 8-bit console released by Emerson Radio in 1982 following the release of ColecoVision. It was discontinued only 18 months later, with a total of 35 games having been released. Emerson licensed the Arcadia 2001 to Bandai, which released it in Japan. Over 30 Arcadia 2001 clones exist.[citation needed]\r\n\r\nThe unrelated Arcadia Corporation, manufacturer of the Atari 2600 Supercharger add-on, was sued by Emerson for trademark infringement. Arcadia Corporation then changed its name to Starpath.\r\n\r\nThe Arcadia is much smaller than its contemporary competitors and is powered by a standard 12-volt power supply so it can be used in a boat or a vehicle. This portability feature, however, requires a portable television, which was extremely rare in the early 1980s. It also has two outputs (or inputs) headphone jacks on the back of the unit, on the far left and far right sides.\r\n\r\nThe system came with two Intellivision-style controllers with a 12 button keypad and 'fire' buttons on the sides. The direction pads have a removable joystick attachment. Most games came with BoPET overlays that could be applied to the controller's keypads. The console itself had five buttons: power, start, reset, option, and select.\r\n\r\nThere are at least three different types of cartridge case styles and artwork, with variations on each. Emerson-family carts come in two different lengths (short and long) of black plastic cases.",
      "icon": "console_default.png",
      "console": "4963.png"
    },
    "4964": {
      "id": 4964,
      "name": "Casio PV-1000",
      "alias": "casio-pv-1000",
      "overview": "The PV-1000 (ぴーぶいせん Pi Bui-Sen?) is a home video game console manufactured by Casio and released in Japan in 1983. The PV-1000 was powered by a Z80A micro-processor, and had 2 KB RAM available, with 1 KB devoted to its character generator. It had a 256x192 pixel resolution and had 8 available colours. It was released alongside a computer known as the PV-2000, which is compatible with PV-1000 controllers but not games. In the same year Casio released two other consoles, the PV-7 and the PV-16 which were MSX computers. The PV-1000 initially sold for 14,800¥.\r\n\r\nCasio failed to achieve a significant market share. It is said to have been pulled from the shelves within a matter of weeks, making the system extremely rare.",
      "icon": "console_default.png",
      "console": "4964.png"
    },
    "4965": {
      "id": 4965,
      "name": "Epoch Cassette Vision",
      "alias": "epoch-cassette-vision",
      "overview": "The Cassette Vision (Japanese: カセットビジョン Hepburn: Kasetto Bijon?) is a home video game console made by Epoch Co. and released in Japan on July 30, 1981. There is also a remodel called the Cassette Vision Jr.\r\n\r\nThe terms cassette, and more commonly tape, are contemporary synonyms for ROM cartridge, not to be confused with the magnetic cassette tape format. In terms of power, it is comparable to the Atari 2600. The Cassette Vision has unusual controls: four knobs built into the console itself, two for each player (one for horizontal, one for vertical); plus two buttons per player.\r\n\r\nThe system originally retailed for 13,500 yen, with games priced at 4,000. Though the Cassette Vision was not a high seller,[citation needed] it received a successor called the Super Cassette Vision (スーパーカセットビジョン Sūpā Kasetto Bijon?) As a 1984 machine, it is more comparable to the likes of the Family Computer and the Atari 7800. The SCV was also sold in Europe, but with little known success.[citation needed] The Super Lady Cassette Vision, a version of the Super Cassette Vision that was aimed at a female market, was released exclusively in Japan. While the specs were exactly the same the plastic was a pink color and included a carrying case and the \"Milky Princess\" game.",
      "icon": "console_default.png",
      "console": "4965.png"
    },
    "4966": {
      "id": 4966,
      "name": "Epoch Super Cassette Vision",
      "alias": "epoch-super-cassette-vision",
      "overview": "The Cassette Vision (Japanese: カセットビジョン Hepburn: Kasetto Bijon?) is a home video game console made by Epoch Co. and released in Japan on July 30, 1981. There is also a remodel called the Cassette Vision Jr.\r\n\r\nThe terms cassette, and more commonly tape, are contemporary synonyms for ROM cartridge, not to be confused with the magnetic cassette tape format. In terms of power, it is comparable to the Atari 2600. The Cassette Vision has unusual controls: four knobs built into the console itself, two for each player (one for horizontal, one for vertical); plus two buttons per player.\r\n\r\nThe system originally retailed for 13,500 yen, with games priced at 4,000. Though the Cassette Vision was not a high seller,[citation needed] it received a successor called the Super Cassette Vision (スーパーカセットビジョン Sūpā Kasetto Bijon?) As a 1984 machine, it is more comparable to the likes of the Family Computer and the Atari 7800. The SCV was also sold in Europe, but with little known success.[citation needed] The Super Lady Cassette Vision, a version of the Super Cassette Vision that was aimed at a female market, was released exclusively in Japan. While the specs were exactly the same the plastic was a pink color and included a carrying case and the \"Milky Princess\" game.",
      "icon": "console_default.png",
      "console": "4966.png"
    },
    "4967": {
      "id": 4967,
      "name": "RCA Studio II",
      "alias": "rca-studio-ii",
      "overview": "The RCA Studio II is a home video game console made by RCA that debuted in January 1977. The graphics of Studio II games were black and white and resembled those of earlier Pong consoles and their clones. The Studio II also did not have joysticks or similar game controllers but instead used two ten button keypads that were built into the console itself. The console was capable of making simple beep sounds with slight variations in tone and length.\r\n\r\nOne distinct feature of the Studio II was its five built-in games.[3] Another was its use of a switchbox that relayed both the modulated RF signal of the console's video to the television set while powering the console with DC power. This type of switchbox would not be seen again until the Atari 5200.\r\n\r\nThe Studio II was not a successful product; the previously released Fairchild Channel F made it obsolete at launch and it suffered a final decisive blow when the superior (to both) Atari 2600 console was released only 10 months later. After poor Christmas sales in 1977, RCA ceased production of the Studio II and offloaded excess inventory to Radio Shack in a fire sale.\r\n\r\nIn 1978, RCA announced low Christmas sales, and cut production of its Studio II system. While losses were not announced, RCA laid off 120 workers at its plant that produced the system in North Carolina. Some analysts blamed the fact the RCA Studio II's games were in black and white, and could not compete with systems offering color.",
      "icon": "console_default.png",
      "console": "4967.png"
    },
    "4968": {
      "id": 4968,
      "name": "Bally Astrocade",
      "alias": "bally-astrocade",
      "overview": " ",
      "icon": "console_default.png",
      "console": "4968.png"
    },
    "4969": {
      "id": 4969,
      "name": "APF MP-1000",
      "alias": "apf-mp-1000",
      "overview": "The APF Microcomputer System is a second generation 8-bit cartridge-based home video game console released in 1977 by APF Electronics Inc with six cartridges. The console is often referred to M-1000 or MP-1000, which are the two model numbers of the console. The controllers are non-detachable joysticks which also have numeric keypads. The APF-MP1000 comes built-in with the game Rocket Patrol. The APF-MP1000 is a part of the APF Imagination Machine.\r\n\r\nIt is the successor to the APF TV Fun line of first generation consoles.",
      "icon": "apf_mp1000.png",
      "console": "4969.png"
    },
    "4970": {
      "id": 4970,
      "name": "Coleco Telstar Arcade",
      "alias": "coleco-telstar-arcade",
      "overview": "The Telstar is a series of video game consoles produced by Coleco from 1976 to 1978. Starting with Telstar Pong clone based on General Instrument's AY-3-8500 chip in 1976, there were 14 consoles released in the Telstar branded series. One million Telstar units were sold.\r\n\r\nThe large product lineup and the impending fading out of the Pong machines led Coleco to face near-bankruptcy in 1980.",
      "icon": "console_default.png",
      "console": "4970.png"
    },
    "4971": {
      "id": 4971,
      "name": "Nintendo Switch",
      "alias": "nintendo-switch",
      "overview": "The Nintendo Switch (Japanese: ニンテンドースイッチ Hepburn: Nintendō Suitchi?), is Nintendo's seventh major home console. Originally known in development as the NX, it was officially unveiled in October 2016 and released worldwide on March 3, 2017.\r\n\r\nThe Switch is a \"hybrid\" console, allowing different modes of play. Its main unit is shaped like a tablet computer which can be used portably as-is, or connected to a television display through a detachable docking station. In addition it can also be used in a tapletop form with its kickstand. Despite these characteristics, Nintendo markets the Switch primarily as a home console rather than as a portable.\r\n\r\nIts most distinguishable feature are the \"Joy-Con\" controllers. These are two detachable controllers that can be either attached to a \"Grip\" to provide a traditional home console gamepad form, attached on either side of the main unit for handheld play, or can be used individually in the hand like Nintendo's Wii Remote. The Joy-Cons are similarly motion-sensitive, and feature NFC for reading Amiibo data. The Switch uses flash ROM cartridges for media, rather than optical discs.",
      "icon": "nintendo-switch-1489508941.png",
      "console": "4971.png"
    },
    "4972": {
      "id": 4972,
      "name": "Milton Bradley Microvision",
      "alias": "milton-bradley-microvision",
      "overview": "The Microvision is the very first handheld game console that used interchangeable cartridges. It was released by the Milton Bradley Company in November 1979. The Microvision was designed by Jay Smith, the engineer who would later design the Vectrex gaming console. The Microvision's combination of portability and a cartridge-based system led to moderate success, with Smith Engineering grossing $15 million in the first year of the system's release. However, very few cartridges, a small screen, and a lack of support from established home video game companies led to its demise in 1981.[2] According to Satoru Okada, the former head of R&D1 Department stated that the Microvision gave birth to Nintendo Game & Watch after Nintendo designed around Microvision's limitations.",
      "icon": "console_default.png",
      "console": null
    },
    "4973": {
      "id": 4973,
      "name": "Entex Select-a-Game",
      "alias": "entex-select-a-game",
      "overview": "The Entex Select-a-game is a handheld game system released in 1981 by Entex Industries. Entex released six games for the device before they dropped support in 1982 in favor of the Entex Adventure Vision.",
      "icon": "console_default.png",
      "console": null
    },
    "4974": {
      "id": 4974,
      "name": "Entex Adventure Vision",
      "alias": "entex-adventure-vision",
      "overview": "The Adventure Vision is a self-contained (no external monitor is required) cartridge-based video game console released by Entex Industries in 1982. The Adventure Vision was Entex's second generation system. Their first console was the Entex Select-A-Game, released a year earlier in 1981.",
      "icon": "console_default.png",
      "console": null
    },
    "4975": {
      "id": 4975,
      "name": "Pioneer LaserActive",
      "alias": "",
      "overview": "The LaserActive (レーザーアクティブ? RēzāAkutibu) is a converged device and fourth-generation home video game console capable of playing Laserdiscs, Compact Discs, console games, and LD-G karaoke discs. It was released by Pioneer Corporation in 1993. In addition to LaserActive games, separately sold add-on modules (called \"PACs\" by Pioneer) accepts Mega Drive/Genesis and PC Engine/TurboGrafx 16 ROM cartridges and CD-ROMs.\r\n\r\nPioneer released the LaserActive model CLD-A100 in Japan on August 20, 1993 at a cost of ¥89,800, and in the United States on September 13, 1993 at a cost of $970. An NEC-branded version of the LaserActive player, the PCE-LD1, was released on December 1993, which was priced identically to the original system and also accepted Pioneer's PAC modules. The LaserActive has no regional lockout, allowing software from any region to be played on any system.\r\n\r\nPAC modules:\r\n\r\nThe Japanese LaserActive shown with the Sega and NEC pacs.\r\nIn the headings below, the Japanese model number occurs first, followed by the North American model number.\r\n\r\nMega LD PAC (PAC-S1 / PAC-S10)\r\nPioneer Electronics (USA) and Sega Enterprises released this module that allows users to play 8-inch and 12-inch LaserActive Mega LD discs, in addition to standard Sega CD discs and Genesis cartridges, as well as CD+G discs. It was the most popular add-on bought by the greater part of the LaserActive owners, costing roughly US $600. It comes with a LaserActive-branded version of Sega's 6-button control pad (CPD-S1).\r\nLD-ROM² PAC (PAC-N1 / PAC-N10)\r\nPioneer Electronics (USA) and NEC Home Electronics released this module that allows users to play 8-inch and 12-inch LaserActive LD-ROM² discs, as well as CD-ROM² and Super CD-ROM² discs, HuCards and CD+G discs. The Japanese version of the PAC can also run Arcade CD-ROM² discs through the use of an Arcade Card Duo. The retail price was US $600. It comes with a LaserActive-branded version of NEC's Turbo Pad (CPD-N1/CPD-N10). A NEC branded version of the LD-ROM² PAC (the PCE-LP1) was also released. Due to the unpopularity of the TurboGrafx-16 platform in North America, very few PAC-N10 units were produced for the North American market, resulting in their scarcity compared to its Sega counterpart.\r\nKaraoke PAC (PAC-K1 / PAC-K10)\r\nThis PAC allows the CLD-A100 to use all NTSC LaserKaraoke titles. The front panel has two microphone inputs with separated volume controls, as well as tone control. The retail price was US $350.\r\nComputer Interface PAC (PAC-PC1)\r\nThe Computer Interface PAC has an RS-232 port, enabling the CLD-A100 to be controlled by a custom software developed for a home computer. The PAC came with a 33-button infrared remote control providing more functionality than the 24-button remote included with the CLD-A100. It also included a computer program called LaserActive Program Editor on floppy disk for DOS and classic Mac OS. The floppy disks had some sample programs created with the editor for use with the first five LaserDiscs in the Tenchi Muyo! anime series.\r\nLaserActive 3-D Goggles[edit]\r\nThe LaserActive 3-D Goggles (model GOL-1) employ an active shutter 3D system compatible with at least four 3D-ready LD-ROM software titles: 3-D Museum (1994), Vajra 2 (1994), and Virtual Cameraman 2 (1994), and 3D Virtual Australia (1996). 3D Virtual Australia was the last software title published for the LaserActive.\r\n\r\nThe goggles are also compatible with the Sega Master System, and are interchangeable with the SegaScope 3-D Glasses. They can also be used to view 3-D images from autostereograms.[4]\r\n\r\nA goggle adapter (model ADP-1), packaged and sold separately from the 3-D Goggles, enables the user to connect one or two pairs of goggles to the CLD-A100.\r\n\r\nGames:\r\nThe standard LaserActive games were on Laserdisc encoded as an LD-ROM. An LD-ROM had a capacity of 540 MB (where digital audio would have normally been stored) with 60 minutes of analog audio and video.",
      "icon": "console_default.png",
      "console": "4975.png"
    },
    "4976": {
      "id": 4976,
      "name": "Action Max",
      "alias": "action-max",
      "overview": "Action Max is a home video game console using VHS tapes for games. It was created in 1987 by Worlds of Wonder. The Action Max had a very limited release outside of the U.S.\r\n\r\nInside the system.\r\n\r\nThe Action Max motherboard.\r\nThe Action Max system requires the player to also have a VCR, as the console has no way to play the requisite VHS tapes itself. Using light guns, players shoot at the screen. The gaming is strictly point-based and dependent on shot accuracy and as a result, players can't truly win or lose a game. The system's post-launch appeal was limited by this and by the fact that the only real genre on the system are light gun games that play exactly the same way every time, leading to its quick market decline.[1]\r\n\r\nBefore playing, a red sensor must be attached to the lower right corner of the television screen. This corner contains a circle that was usually black, but flashes rapidly whenever something on the screen is targetable. At the same time, targets are highlighted by rapidly flashing panels for the player to shoot at. The console uses the corner circle and light from the targets (picked up by the guns) to determine when something has been hit. Flashes in sync with the corner circle count as enemy hits, and earn points for the player. Flashes out of sync with the corner circle count as friendly hits, losing points.\r\n\r\nWith this implementation, the unit can function with copies of the original VHS tapes, including those on more modern formats such as DVD-R or personal computers. The console can work with any filmed footage properly formatted to function with the console's light gun.\r\n\r\nGames\r\nIn all, five VHS cassettes were released for the system: .38 Ambush Alley, a police target range; Blue Thunder, based on the eponymous 1983 motion picture; Hydrosub: 2021, a futuristic underwater voyage; The Rescue of Pops Ghostly, a comic haunted-house adventure; and Sonic Fury, aerial combat, bundled with the system.\r\n\r\nA planned sixth cassette, Fright Night, was unreleased at the time Action Max was discontinued.\r\n\r\nEach game follows an identical gameplay format, differing only in theme, playing the same way each time.\r\n\r\nTechnical specifications\r\nCPU: HD401010\r\nInternal Speaker\r\n2 Character, 7 segment LED score display",
      "icon": "action_max.png",
      "console": "4976.png"
    },
    "4977": {
      "id": 4977,
      "name": "Sharp X1",
      "alias": "sharp-x1",
      "overview": "The X1 (エックスワン Ekkusuwan), sometimes called the Sharp X1, is a series of home computers released by Sharp Corporation from 1982 to 1988. It was based on a Z80 CPU.\r\n\r\nDespite the fact that the Computer Division of Sharp Corporation had released the MZ series, suddenly the Television Division released a new computer series called the X1. At the time the original X1 was released, all other home computers generally had a BASIC language in ROM. However the X1 did not have a BASIC ROM, and it had to load the Hu-BASIC interpreter from a cassette tape. On the plus side however, this concept meant that a free RAM area was available that was as big as possible when not using BASIC. This policy was originally copied from the Sharp MZ series, and they were called clean computers in Japan. The cabinet shape of X1 was also much more stylish than others at that time and a range of cabinet colors (including Red) was selectable.\r\n\r\nThe RGB display monitor for the X1 had a television tuner, and a computer screen could be super-imposed on TV. All the TV functions could be controlled from a computer program. The character font was completely programmable (A.K.A. PCG) with 4bit color, and it was effectively used into a lot of games. The entirety of the VRAM memory was mapped on to the I/O area, so it was controlled without bank change. Since X1 had these features, it was very powerful for game software.\r\n\r\nWhile X1 was struggling to sell, the PC8801 (from NEC) was quickly becoming popular in the Japanese market. In 1984, Sharp released the X1 turbo series with high resolution graphics (640x400, while X1 had 640x200). It had a lot of improvements, but the clock speed was still only 4 MHz. In 1986, Sharp released the X1 turbo Z series with a 4096 color analog RGB monitor. An X1 twin, which had a PC-Engine in the cabinet, was finally released as the last machine of the X1 series in 1987. Then this series was succeeded by the X68000 series.\r\n\r\nSharp continues to sell desktop PC/TV combos in Japan through its Internet Aquos line, where an X1-style red color scheme is available.",
      "icon": "console_default.png",
      "console": null
    },
    "4978": {
      "id": 4978,
      "name": "Fujitsu FM-7",
      "alias": "fujitsu-fm-7",
      "overview": "The FM-7 (\"Fujitsu Micro 7\") is a home computer created by Fujitsu, first released in 1982, only sold in Japan. It is a stripped down version of their earlier FM-8; during development, the FM-7 was known as the \"FM-8 Jr.\".\r\n\r\nAlthough it is known as a lower cost model, most notably removing its (expensive) bubble memory technology, the FM-7 was given a more advanced sound synthesizer, leading to a strong uptake among the hobbyist computer market in Japan and making it a more dominant system than the FM-8.\r\n\r\nThis model competed primarily with the NEC PC-8801 and Sharp X1 series of computers in the early 1980s. It was succeeded by the FM-77 series in 1984 (which were backwards compatible with the FM-7), and later the 32-bit FM Towns in 1989.\r\n\r\nThe FM-7 is 6809-based, similar to the TRS-80 Color Computer by Radio Shack; some software is compatible with both systems.",
      "icon": "console_default.png",
      "console": null
    },
    "4979": {
      "id": 4979,
      "name": "SAM Coupé",
      "alias": "sam-coupe",
      "overview": "The SAM Coupé (pronounced /sæm ku:peɪ/ from its original British English branding) is an 8-bit British home computer that was first released in late 1989. It is commonly considered a clone of the Sinclair ZX Spectrum computer, since it features a compatible screen mode and emulated compatibility, and it was marketed as a logical upgrade from the Spectrum. It was originally manufactured by Miles Gordon Technology (MGT), based in Swansea in the United Kingdom.",
      "icon": "console_default.png",
      "console": null
    },
    "4980": {
      "id": 4980,
      "name": "Sony Playstation 5",
      "alias": "sony-playstation-5",
      "overview": " ",
      "icon": "sony-playstation-4-1393097424.png",
      "console": "4980.jpg"
    },
    "4981": {
      "id": 4981,
      "name": "Microsoft Xbox Series X",
      "alias": "microsoft-xbox-series-x",
      "overview": "The Xbox Series X is an upcoming home video game console developed by Microsoft. It was announced during E3 2019 as \"Project Scarlett\" and scheduled for release in late 2020.\r\n\r\nMicrosoft will also be releasing a digital only version called Xbox Series S, with different specs:\r\nCPU: 8-core AMD Zen 2 CPU @ 3.6GHz (3.4GHz with SMT enabled)\r\nGPU: AMD RDNA 2 GPU, 20 compute units @ 1.565GHz\r\nGPU power: 4 TFLOPS\r\nRAM: 10GB GDDR6",
      "icon": "microsoft-xbox-one-1393097041.png",
      "console": "4981.png"
    },
    "4982": {
      "id": 4982,
      "name": "Tandy Visual Interactive System",
      "alias": "tandy-vis",
      "overview": "Tandy Memorex Visual Interactive System (VIS) is an interactive, multimedia CD-ROM player produced by the Tandy Corporation starting in 1992. It is similar in function to the Philips CD-i and Commodore CDTV systems (particularly the CDTV, since both the VIS and CDTV were adaptations of existing computer platforms and operating systems to the set-top-box design). The VIS systems were sold only at Radio Shack, under the Memorex brand, both of which Tandy owned at the time.",
      "icon": "vis_console_icon.png",
      "console": ""
    },
    "4983": {
      "id": 4983,
      "name": "R-Zone",
      "alias": "r-zone",
      "overview": "Hardware Variants:\r\nR-Zone Headgear, R-Zone Super Screen, \"X.P.G. Xtreme Pocket Game\" & The R-Zone DataZone",
      "icon": "r_zone.png",
      "console": ""
    },
    "4984": {
      "id": 4984,
      "name": "Xavix Port",
      "alias": "xavix-port",
      "overview": "Known as Domyos Interactive System In Europe",
      "icon": "xavix_port.png",
      "console": null
    },
    "4985": {
      "id": 4985,
      "name": "Evercade",
      "alias": "evercade",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "4986": {
      "id": 4986,
      "name": "Oric-1",
      "alias": "oric-1",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "4987": {
      "id": 4987,
      "name": "HyperScan",
      "alias": "hyperscan",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "4988": {
      "id": 4988,
      "name": "V.Smile",
      "alias": "v-smile",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "4989": {
      "id": 4989,
      "name": "Mattel Aquarius",
      "alias": "mattel-aquarius",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "4990": {
      "id": 4990,
      "name": "Oculus Quest",
      "alias": "oculus-quest",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "4991": {
      "id": 4991,
      "name": "Casio Loopy",
      "alias": "casio-loopy",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "4992": {
      "id": 4992,
      "name": "Gizmondo",
      "alias": "gizmondo",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "4993": {
      "id": 4993,
      "name": "Philips Tele-Spiel ES-2201",
      "alias": "philips-tele-spiel-es-2201",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "4994": {
      "id": 4994,
      "name": "Interton VC 4000",
      "alias": "interton-vc-4000",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "4995": {
      "id": 4995,
      "name": "Bandai TV Jack 5000",
      "alias": "bandai-tv-jack-5000",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "4996": {
      "id": 4996,
      "name": "SHG Black Point",
      "alias": "shg-black-point",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "4997": {
      "id": 4997,
      "name": "BBC Bridge Companion",
      "alias": "bbc-bridge-companion",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "4998": {
      "id": 4998,
      "name": "VTech Socrates",
      "alias": "vtech-socrates",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "4999": {
      "id": 4999,
      "name": "Amstrad GX4000",
      "alias": "amstrad-gx4000",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "5000": {
      "id": 5000,
      "name": "Playdia",
      "alias": "playdia",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "5001": {
      "id": 5001,
      "name": "Apple Pippin",
      "alias": "apple-pippin",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "5002": {
      "id": 5002,
      "name": "Game Wave",
      "alias": "game-wave",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "5003": {
      "id": 5003,
      "name": "Palmtex Super Micro",
      "alias": "palmtex-super-micro",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "5004": {
      "id": 5004,
      "name": "Gamate",
      "alias": "gamate",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "5005": {
      "id": 5005,
      "name": "VTech CreatiVision",
      "alias": "vtech-creativision",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "5006": {
      "id": 5006,
      "name": "Commodore 16",
      "alias": "commodore-16",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "5007": {
      "id": 5007,
      "name": "Commodore Plus/4",
      "alias": "commodore-plus/4",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "5008": {
      "id": 5008,
      "name": "Commodore PET",
      "alias": "commodore-pet",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "5009": {
      "id": 5009,
      "name": "Sinclair ZX80",
      "alias": "sinclair-zx80",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "5010": {
      "id": 5010,
      "name": "Sinclair ZX81",
      "alias": "sinclair-zx81",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "5011": {
      "id": 5011,
      "name": "Stadia",
      "alias": "stadia",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "5012": {
      "id": 5012,
      "name": "Didj",
      "alias": "didj",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "5013": {
      "id": 5013,
      "name": "BBC Micro",
      "alias": "bbc-micro",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "5014": {
      "id": 5014,
      "name": "Acorn Atom",
      "alias": "acorn-atom",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "5015": {
      "id": 5015,
      "name": "GP32",
      "alias": "gp32",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "5016": {
      "id": 5016,
      "name": "Playdate",
      "alias": "playdate",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "5017": {
      "id": 5017,
      "name": "Tapwave Zodiac",
      "alias": "tapwave-zodiac",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "5018": {
      "id": 5018,
      "name": "J2ME (Java Platform, Micro Edition)",
      "alias": "j2me-(java-platform,-micro-edition)",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "5019": {
      "id": 5019,
      "name": "Jupiter Ace",
      "alias": "jupiter-ace",
      "overview": " ",
      "icon": "",
      "console": null
    },
    "5020": {
      "id": 5020,
      "name": "Sinclair QL",
      "alias": "sinclair-ql",
      "overview": " ",
      "icon": "",
      "console": null
    }
  } as const;
