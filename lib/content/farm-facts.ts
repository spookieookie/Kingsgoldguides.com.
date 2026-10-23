/** Facts already described in the published walkthroughs, not live loot or price data. */
export interface FarmFacts {
  location: string;
  targets: string[];
  valueType: string;
  beforeYouGo: string;
}

export const farmFacts: Record<string, FarmFacts> = {
"winterspring-jade-transmog-farm": {
  "location": "Frostshard Rumbler mountain area, Winterspring, Kalimdor",
  "targets": [
    "Jade transmog gear",
    "Other equipment"
  ],
  "valueType": "Rare equipment sales; old auction values are not completed sales",
  "beforeYouGo": "Bring a group and mobility for the original five-area method. Check respawns and loot credit."
},
"starter-gear-resale-method": {
  "location": "Character starting zones, accessible mailboxes and auction house",
  "targets": [
    "Eligible tradeable starter equipment"
  ],
  "valueType": "Resale margin subject to demand and alternative supply",
  "beforeYouGo": "Check binding, mailbox access, postage and vendor supply; former starter gear returned to city vendors in patch 10.0.5."
},
"wetlands-wool-cloth-monk-farm": {
  "location": "Outdoor fighting area in Wetlands, Eastern Kingdoms; opening video map",
  "targets": [
    "Wool Cloth",
    "Green equipment",
    "Occasional patterns"
  ],
  "valueType": "Cloth and eligible equipment sales; spare greens may be disenchanted",
  "beforeYouGo": "2017 Monk setup: Black Ox Statue and Chi Orbit, with regular looting. Check current abilities, loot credit and prices first."
},
"throne-of-kiljaeden-primal-fire-farm": {
  "location": "Throne of Kil’jaeden, Hellfire Peninsula, Outland",
  "targets": [
    "Mote of Fire",
    "Primal Fire"
  ],
  "valueType": "Auctionable crafting materials; ten Motes combine into one Primal Fire",
  "beforeYouGo": "Check material prices, bring a suitable character and test competition and drops. The route and gold claims come from 2017."
},
"karazhan-enchanting-recipe-farm": {
  "location": "Original Karazhan raid, Deadwind Pass, Eastern Kingdoms",
  "targets": [
    "Mongoose enchanting formula",
    "Sunfire enchanting formula",
    "Soulfrost enchanting formula",
    "Disenchanting materials"
  ],
  "valueType": "Recipe unlocks enable crafted enchant sales; spare equipment yields materials",
  "beforeYouGo": "Bring an enchanter and check current recipe requirements, costs and sale prices. The setup and gold figures are from 2017."
},
  'heart-of-fear-spirit-of-harmony-farm': {
    location: 'Heart of Fear, Dread Wastes, Pandaria; trash before the first boss',
    targets: ['Mote of Harmony', 'Spirit of Harmony'],
    valueType: 'Materials to sell where tradeable; ten Motes make one Spirit',
    beforeYouGo: '2017 route: leave the boss alone and check the recorded difficulty reset. MoP Classic Spirits are bind on pickup.',
  },
  'legion-obliterum-shuffle': {
    location: 'Auction house and the Legion Obliterum Forge in Dalaran',
    targets: ['Obliterum Ash', 'Obliterum'],
    valueType: 'Historical resale margin after input purchases and selling costs',
    beforeYouGo: 'Legion archive, not a current Retail farm. Convert stack prices to unit prices before comparing input costs.',
  },
  'stockades-alt-leveling-self-boost': {
    location: 'The Stockades; move to a suitable dungeon as the alt levels',
    targets: ['Dungeon experience for the alt'],
    valueType: 'Character experience, not auction-house gold',
    beforeYouGo: 'Use a higher-level character and two WoW windows; check that grouping and experience credit work in your version.',
  },
  'vortex-pinnacle-volatile-air-farm': {
    location: 'The Vortex Pinnacle, Uldum',
    targets: ['Volatile Air'],
    valueType: 'Materials to sell on the auction house',
    beforeYouGo: 'Fly to the entrance and test trash respawns after resetting.',
  },
  'destiny-sword-farm': {
    location: 'Dreadmaul Hold, Blasted Lands',
    targets: ['Destiny'],
    valueType: 'Rare weapon to sell on the auction house',
    beforeYouGo: 'Use the pre-invasion zone phase and look for Dreadmaul Ambushers.',
  },
  'fiery-war-axe-wow-forever': {
    location: 'Swamp of Sorrows or Feralas',
    targets: ['Fiery War Axe'],
    valueType: 'Rare weapon; Forever prices are a prediction',
    beforeYouGo: 'Check the beta changes and the Green Scalebane or Grimtotem Naturalist spots.',
  },
  'the-glazer-farm': {
    location: 'Mildenhall Meadery, Stormsong Valley',
    targets: ['The Glazer'],
    valueType: 'Rare transmog to sell on the auction house',
    beforeYouGo: 'Look for Bubbling Mead and Flowing Honey; check the mace listings.',
  },
  'zulfarrak-transmog-farming-route': {
    location: "Zul'Farrak, Tanaris",
    targets: ['BoE transmog'],
    valueType: 'Transmog to sell on the auction house',
    beforeYouGo: 'Bring empty bags and follow the trash, prisoner, and grave route.',
  },
  'uldum-loaded-gnomish-dice-farm': {
    location: 'Uldum',
    targets: ['Loaded Gnomish Dice'],
    valueType: 'Rare toy to sell on the auction house',
    beforeYouGo: 'Bring a rogue with Stealth, Sap, and Pick Pocket. Pickpocket before killing.',
  },
  'burning-steppes-mageweave-runecloth-farm': {
    location: 'Burning Steppes, Eastern Kingdoms',
    targets: ['Mageweave Cloth', 'Runecloth'],
    valueType: 'Cloth to sell; keep transmog separate',
    beforeYouGo: 'Bring AoE and work counterclockwise through the four groups.',
  },
  'firelands-volatile-farm': {
    location: 'Firelands, Mount Hyjal',
    targets: ['Volatile Air', 'Volatile Life', 'Volatile Water'],
    valueType: 'Materials to sell, minus the potion cost',
    beforeYouGo: 'Bring Potion of Treasure Finding and leave every boss alive.',
  },
  'wow-gold-farm-1000000-tiragarde-sound-mining-herbalism-route': {
    location: 'Tiragarde Sound, Kul Tiras',
    targets: ['Monelite Ore', 'Storm Silver Ore', 'BFA herbs'],
    valueType: 'Gathering materials to sell on the auction house',
    beforeYouGo: 'Bring Mining; Herbalism lets you gather along the same loop.',
  },
  'wow-gold-farm-3-expensive-items-transmog': {
    location: 'Gundrak, Blackfathom Deeps, and Karazhan',
    targets: ['Advanced Flatbow', 'Crested Scepter', 'Blade of Wizardry'],
    valueType: 'Rare transmog to sell on the auction house',
    beforeYouGo: 'Choose one route and check its current drops and lockout rules.',
  },
  'wow-gold-farm-600k-ghostlands-amani-catacombs': {
    location: 'Sungraze Peak and Amani Catacombs, Ghostlands',
    targets: ['Chest loot', 'BoE transmog'],
    valueType: 'Chest loot and transmog; rare drops drive the headline',
    beforeYouGo: 'Check the chest route and bring lockpicking for locked chests.',
  },
  'wow-gold-farm-80000-zulfarrak-robes-of-insight': {
    location: "Zul'Farrak, Tanaris",
    targets: ['Robes of Insight', 'BoE transmog', 'Mageweave Cloth'],
    valueType: 'Cloth and rare transmog to sell on the auction house',
    beforeYouGo: 'Clear the trash route and price-check rare gear before vendoring.',
  },
  'wow-gold-farm-best-way-200k-iron-docks': {
    location: 'Iron Docks, Gorgrond',
    targets: ['Sumptuous Fur', 'Vendor loot', 'BoE gear'],
    valueType: 'Vendor gold plus materials and gear to sell',
    beforeYouGo: 'Bring a character that can clear the dungeon and check instance limits.',
  },
  'wow-gold-farm-forgotten-farm-blackwing-descent': {
    location: 'Blackwing Descent, Burning Steppes',
    targets: ['Embersilk Cloth', 'Vendor loot', 'BoE transmog'],
    valueType: 'Vendor gold plus cloth and transmog to sell',
    beforeYouGo: 'Check raid lockouts before planning repeated clears.',
  },
  'wow-gold-farm-goblin-power-shovel-150000': {
    location: 'Venture Co. mining area, Northern Stranglethorn',
    targets: ['Goblin Power Shovel'],
    valueType: 'Rare transmog to sell on the auction house',
    beforeYouGo: 'Focus on Venture Co. Miners and check the item source for your game version.',
  },
  'wow-gold-farm-southern-barrens-infinite-respawn-200k': {
    location: 'Bael Modan Excavation, Southern Barrens',
    targets: ['Pattern: Rich Purple Silk Shirt', 'BoE transmog', 'Cloth'],
    valueType: 'Cloth and rare drops to sell on the auction house',
    beforeYouGo: 'Check current spawn behavior and loot as you work through the excavation.',
  },
  'wow-gold-farm-top-5-instant-respawn-gold-farms': {
    location: 'Northern Stranglethorn, Feralas, and Outland',
    targets: ['BoE transmog', 'Cloth', 'Motes', 'Signets'],
    valueType: 'Materials and rare drops to sell on the auction house',
    beforeYouGo: 'Pick one of the five routes and check its drops and competition.',
  },
  '10000-gold-in-10-minutes-timeless-isle-condensed-jademist-farm': {
    location: 'The Misty Strand, Timeless Isle',
    targets: ['Jademist Dancer battle pet'],
    valueType: 'Rare battle pet to sell; bound consumables are separate',
    beforeYouGo: 'Check the pet market. Condensed Jademist is bound and cannot be auctioned.',
  },
  '120000-gold-per-hour-skettis-blackwind-lake-primal-water-farm': {
    location: 'Blackwind Lake, Skettis, Terokkar Forest',
    targets: ['Mote of Water', 'Primal Water'],
    valueType: 'Materials to sell on the auction house',
    beforeYouGo: 'Kill underwater Skettis Surgers; bring water breathing or swimming utility.',
  },
  'data-analyst-darkmoon-firewater-gold-flip-wow-gold-making': {
    location: 'Auction house / Darkmoon Faire market',
    targets: ['Darkmoon Firewater'],
    valueType: 'Resale margin after purchase costs and fees',
    beforeYouGo: 'Check price history and the Faire supply cycle before buying stock.',
  },
};
