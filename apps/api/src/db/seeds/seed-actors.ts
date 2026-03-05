import { db } from "../index.js";
import { actors, conflictActors } from "../schema.js";

interface ActorInput {
  name: string;
  type: "state" | "non_state" | "organization" | "individual";
  countryCode?: string;
  description: string;
}

interface ConflictActorInput {
  conflictSlug: string;
  actorName: string;
  role: "attacker" | "defender" | "mediator" | "supporter" | "observer";
  statedObjectives: string;
}

const actorsData: ActorInput[] = [
  // States
  { name: "Russia", type: "state", countryCode: "RU", description: "Russian Federation, a permanent UN Security Council member and major military power." },
  { name: "Ukraine", type: "state", countryCode: "UA", description: "Republic of Ukraine, a sovereign state in Eastern Europe defending against Russian invasion." },
  { name: "Israel", type: "state", countryCode: "IL", description: "State of Israel, a Middle Eastern country with one of the region's most powerful militaries." },
  { name: "United States", type: "state", countryCode: "US", description: "United States of America, leading global superpower and NATO leader providing military aid." },
  { name: "China", type: "state", countryCode: "CN", description: "People's Republic of China, second-largest economy and permanent UN Security Council member." },
  { name: "Iran", type: "state", countryCode: "IR", description: "Islamic Republic of Iran, a regional power that leads the 'Axis of Resistance' network of proxy forces." },
  { name: "Saudi Arabia", type: "state", countryCode: "SA", description: "Kingdom of Saudi Arabia, the largest Gulf state and leader of the coalition fighting in Yemen." },
  { name: "Pakistan", type: "state", countryCode: "PK", description: "Islamic Republic of Pakistan, a nuclear-armed state with claims to Kashmir." },
  { name: "India", type: "state", countryCode: "IN", description: "Republic of India, the world's most populous country and a nuclear-armed state." },
  { name: "Rwanda", type: "state", countryCode: "RW", description: "Republic of Rwanda, an East African state accused of supporting M23 rebels in the DRC." },
  { name: "Azerbaijan", type: "state", countryCode: "AZ", description: "Republic of Azerbaijan, a South Caucasus nation that recaptured Nagorno-Karabakh." },
  { name: "Armenia", type: "state", countryCode: "AM", description: "Republic of Armenia, a South Caucasus nation that lost control of Nagorno-Karabakh." },
  { name: "Turkey", type: "state", countryCode: "TR", description: "Republic of Türkiye, a NATO member and key regional power with military involvement across multiple theaters." },
  { name: "Ethiopia", type: "state", countryCode: "ET", description: "Federal Democratic Republic of Ethiopia, the second-most populous African nation dealing with internal conflicts." },
  { name: "Serbia", type: "state", countryCode: "RS", description: "Republic of Serbia, a Balkan state that does not recognize Kosovo's independence." },
  { name: "North Korea", type: "state", countryCode: "KP", description: "Democratic People's Republic of Korea, a nuclear-armed authoritarian state." },
  { name: "South Korea", type: "state", countryCode: "KR", description: "Republic of Korea, a democratic ally of the US facing North Korean threats." },
  { name: "France", type: "state", countryCode: "FR", description: "French Republic, former colonial power with military presence in Africa and Middle East." },
  { name: "Taiwan", type: "state", countryCode: "TW", description: "Republic of China (Taiwan), a de facto independent democratic state claimed by the PRC." },
  { name: "Philippines", type: "state", countryCode: "PH", description: "Republic of the Philippines, a US ally in the South China Sea territorial disputes." },
  { name: "Mozambique", type: "state", countryCode: "MZ", description: "Republic of Mozambique, a southeastern African nation facing Islamist insurgency." },
  { name: "Myanmar Junta (SAC)", type: "state", countryCode: "MM", description: "State Administration Council, Myanmar's military junta that seized power in a 2021 coup." },
  { name: "Sudan (SAF)", type: "state", countryCode: "SD", description: "Sudanese Armed Forces, the national military of Sudan led by General Abdel Fattah al-Burhan." },
  { name: "Mali", type: "state", countryCode: "ML", description: "Republic of Mali, governed by a military junta since the 2020 and 2021 coups." },
  { name: "Somalia", type: "state", countryCode: "SO", description: "Federal Republic of Somalia, working to rebuild state institutions amid ongoing insurgency." },
  { name: "Kosovo", type: "state", countryCode: "XK", description: "Republic of Kosovo, a partially recognized state that declared independence from Serbia in 2008." },

  // Non-state actors
  { name: "Hamas", type: "non_state", description: "Palestinian Islamist movement governing Gaza since 2007, designated as terrorist organization by the US and EU." },
  { name: "Hezbollah", type: "non_state", description: "Lebanese Shia militant group and political party, a key Iranian proxy force in the Levant." },
  { name: "Rapid Support Forces (RSF)", type: "non_state", description: "Sudanese paramilitary force led by General Mohamed Hamdan Dagalo (Hemeti), involved in the Sudan civil war." },
  { name: "M23", type: "non_state", description: "March 23 Movement, a Congolese rebel group allegedly backed by Rwanda, operating in eastern DRC." },
  { name: "Al-Shabaab", type: "non_state", description: "Al-Qaeda-affiliated jihadist group controlling territory in southern and central Somalia." },
  { name: "Houthi Movement (Ansar Allah)", type: "non_state", description: "Yemeni Shia rebel movement controlling much of northern Yemen and launching Red Sea attacks." },
  { name: "Fano Militia", type: "non_state", description: "Amhara ethnic militia fighters resisting the Ethiopian federal government's disarmament efforts." },
  { name: "National Unity Government (NUG)", type: "non_state", description: "Myanmar's parallel government formed by ousted lawmakers and ethnic leaders opposing the military junta." },
  { name: "Hayat Tahrir al-Sham (HTS)", type: "non_state", description: "Syrian rebel group that led the offensive toppling the Assad regime in late 2024." },
  { name: "Wagner Group", type: "non_state", description: "Russian private military company (now Africa Corps) providing mercenary forces in Africa and Ukraine." },
  { name: "ISIS", type: "non_state", description: "Islamic State, a jihadist organization operating across multiple theaters including Syria, Iraq, Africa, and Southeast Asia." },
  { name: "JNIM (Al-Qaeda Sahel)", type: "non_state", description: "Group for the Support of Islam and Muslims, the primary al-Qaeda affiliate in the Sahel region." },
  { name: "Viv Ansanm Gang Coalition", type: "non_state", description: "Haitian gang coalition led by Jimmy 'Barbecue' Chérizier, controlling most of Port-au-Prince." },

  // Organizations
  { name: "United Nations", type: "organization", description: "International organization responsible for peacekeeping, humanitarian aid, and international law." },
  { name: "NATO", type: "organization", description: "North Atlantic Treaty Organization, a military alliance of 32 member states." },
  { name: "African Union", type: "organization", description: "Continental union of 55 African member states coordinating political and security affairs." },
  { name: "European Union", type: "organization", description: "Political and economic union of 27 European states promoting peace and stability." },
];

const conflictActorsData: ConflictActorInput[] = [
  // Russia-Ukraine War
  { conflictSlug: "russia-ukraine-war", actorName: "Russia", role: "attacker", statedObjectives: "Demilitarization and denazification of Ukraine, preventing NATO expansion." },
  { conflictSlug: "russia-ukraine-war", actorName: "Ukraine", role: "defender", statedObjectives: "Territorial integrity, sovereignty, EU and NATO integration." },
  { conflictSlug: "russia-ukraine-war", actorName: "United States", role: "supporter", statedObjectives: "Supporting Ukraine's sovereignty and deterring Russian aggression." },
  { conflictSlug: "russia-ukraine-war", actorName: "NATO", role: "supporter", statedObjectives: "Collective defense and supporting Ukraine militarily and politically." },

  // Gaza-Israel Conflict
  { conflictSlug: "gaza-israel-conflict", actorName: "Israel", role: "attacker", statedObjectives: "Destroying Hamas military capabilities and recovering hostages." },
  { conflictSlug: "gaza-israel-conflict", actorName: "Hamas", role: "defender", statedObjectives: "Resisting occupation, liberating Palestinian prisoners, defending Gaza." },
  { conflictSlug: "gaza-israel-conflict", actorName: "United States", role: "supporter", statedObjectives: "Supporting Israel's right to self-defense while seeking civilian protection." },
  { conflictSlug: "gaza-israel-conflict", actorName: "Iran", role: "supporter", statedObjectives: "Supporting Palestinian resistance through its Axis of Resistance network." },

  // Sudan Civil War
  { conflictSlug: "sudan-civil-war", actorName: "Sudan (SAF)", role: "attacker", statedObjectives: "Restoring order and defeating the RSF insurrection." },
  { conflictSlug: "sudan-civil-war", actorName: "Rapid Support Forces (RSF)", role: "attacker", statedObjectives: "Political power-sharing and integration of RSF into civilian governance." },
  { conflictSlug: "sudan-civil-war", actorName: "Saudi Arabia", role: "mediator", statedObjectives: "Brokering ceasefire and humanitarian access through Jeddah talks." },
  { conflictSlug: "sudan-civil-war", actorName: "United Nations", role: "observer", statedObjectives: "Humanitarian assistance and civilian protection." },

  // Myanmar Civil War
  { conflictSlug: "myanmar-civil-war", actorName: "Myanmar Junta (SAC)", role: "attacker", statedObjectives: "Maintaining military control and constitutional order." },
  { conflictSlug: "myanmar-civil-war", actorName: "National Unity Government (NUG)", role: "defender", statedObjectives: "Restoring democratic governance and federal democracy." },

  // Haiti Crisis
  { conflictSlug: "haiti-crisis", actorName: "Viv Ansanm Gang Coalition", role: "attacker", statedObjectives: "Political control and territorial dominance in Port-au-Prince." },
  { conflictSlug: "haiti-crisis", actorName: "United Nations", role: "mediator", statedObjectives: "Stabilization and humanitarian assistance." },

  // DRC Conflict
  { conflictSlug: "drc-conflict-m23", actorName: "M23", role: "attacker", statedObjectives: "Protection of Tutsi communities and political participation in DRC." },
  { conflictSlug: "drc-conflict-m23", actorName: "Rwanda", role: "supporter", statedObjectives: "Security interests and protecting ethnic Tutsi in eastern DRC." },
  { conflictSlug: "drc-conflict-m23", actorName: "United Nations", role: "observer", statedObjectives: "Peacekeeping and civilian protection through MONUSCO." },

  // Ethiopia Amhara
  { conflictSlug: "ethiopia-amhara-conflict", actorName: "Ethiopia", role: "attacker", statedObjectives: "Disarming irregular forces and enforcing federal authority." },
  { conflictSlug: "ethiopia-amhara-conflict", actorName: "Fano Militia", role: "defender", statedObjectives: "Protecting Amhara regional autonomy and self-determination." },

  // Sahel
  { conflictSlug: "sahel-mali-burkina-faso", actorName: "Mali", role: "defender", statedObjectives: "Restoring sovereignty and defeating jihadist insurgency." },
  { conflictSlug: "sahel-mali-burkina-faso", actorName: "JNIM (Al-Qaeda Sahel)", role: "attacker", statedObjectives: "Establishing Islamic governance across the Sahel region." },
  { conflictSlug: "sahel-mali-burkina-faso", actorName: "Wagner Group", role: "supporter", statedObjectives: "Providing security services in exchange for mining and resource concessions." },
  { conflictSlug: "sahel-mali-burkina-faso", actorName: "France", role: "observer", statedObjectives: "Counter-terrorism and supporting regional stability (withdrew 2022)." },

  // Somalia
  { conflictSlug: "somalia-al-shabaab", actorName: "Somalia", role: "defender", statedObjectives: "Reclaiming territory from al-Shabaab and rebuilding state capacity." },
  { conflictSlug: "somalia-al-shabaab", actorName: "Al-Shabaab", role: "attacker", statedObjectives: "Establishing an Islamic emirate in Somalia and the Horn of Africa." },
  { conflictSlug: "somalia-al-shabaab", actorName: "African Union", role: "supporter", statedObjectives: "Supporting Somali security forces through ATMIS peacekeeping." },

  // Yemen
  { conflictSlug: "yemen-civil-war", actorName: "Saudi Arabia", role: "attacker", statedObjectives: "Restoring the internationally recognized government and countering Iranian influence." },
  { conflictSlug: "yemen-civil-war", actorName: "Houthi Movement (Ansar Allah)", role: "defender", statedObjectives: "Controlling Yemen and supporting Palestinian cause through Red Sea operations." },
  { conflictSlug: "yemen-civil-war", actorName: "Iran", role: "supporter", statedObjectives: "Supporting Houthi movement as part of the Axis of Resistance." },
  { conflictSlug: "yemen-civil-war", actorName: "United States", role: "attacker", statedObjectives: "Protecting freedom of navigation in the Red Sea from Houthi attacks." },

  // Syria
  { conflictSlug: "syria-conflict", actorName: "Hayat Tahrir al-Sham (HTS)", role: "attacker", statedObjectives: "Toppling the Assad regime and establishing new governance in Syria." },
  { conflictSlug: "syria-conflict", actorName: "Russia", role: "supporter", statedObjectives: "Maintaining military bases and geopolitical influence in Syria." },
  { conflictSlug: "syria-conflict", actorName: "Turkey", role: "supporter", statedObjectives: "Managing Kurdish threats and supporting Syrian opposition groups." },

  // Nagorno-Karabakh
  { conflictSlug: "nagorno-karabakh", actorName: "Azerbaijan", role: "attacker", statedObjectives: "Restoring territorial integrity over Nagorno-Karabakh." },
  { conflictSlug: "nagorno-karabakh", actorName: "Armenia", role: "defender", statedObjectives: "Protecting ethnic Armenian population and self-determination in Karabakh." },
  { conflictSlug: "nagorno-karabakh", actorName: "Russia", role: "mediator", statedObjectives: "Peacekeeping and maintaining regional influence in the South Caucasus." },
  { conflictSlug: "nagorno-karabakh", actorName: "Turkey", role: "supporter", statedObjectives: "Supporting Azerbaijan's sovereignty and strengthening bilateral ties." },

  // India-Pakistan Kashmir
  { conflictSlug: "india-pakistan-kashmir", actorName: "India", role: "defender", statedObjectives: "Maintaining sovereignty over Jammu and Kashmir as integral territory." },
  { conflictSlug: "india-pakistan-kashmir", actorName: "Pakistan", role: "attacker", statedObjectives: "Self-determination for Kashmir and implementation of UN resolutions." },
  { conflictSlug: "india-pakistan-kashmir", actorName: "United Nations", role: "observer", statedObjectives: "Monitoring ceasefire along the Line of Control." },

  // Mozambique
  { conflictSlug: "mozambique-cabo-delgado", actorName: "Mozambique", role: "defender", statedObjectives: "Defeating the Islamist insurgency and securing gas infrastructure." },
  { conflictSlug: "mozambique-cabo-delgado", actorName: "ISIS", role: "attacker", statedObjectives: "Establishing an Islamic province in Cabo Delgado." },
  { conflictSlug: "mozambique-cabo-delgado", actorName: "Rwanda", role: "supporter", statedObjectives: "Counterinsurgency support and regional security stabilization." },

  // Taiwan
  { conflictSlug: "taiwan-strait-tensions", actorName: "China", role: "attacker", statedObjectives: "Reunification of Taiwan with the mainland, by force if necessary." },
  { conflictSlug: "taiwan-strait-tensions", actorName: "Taiwan", role: "defender", statedObjectives: "Maintaining de facto independence and democratic governance." },
  { conflictSlug: "taiwan-strait-tensions", actorName: "United States", role: "supporter", statedObjectives: "Strategic ambiguity and deterrence of unilateral change to Taiwan's status." },

  // South China Sea
  { conflictSlug: "south-china-sea", actorName: "China", role: "attacker", statedObjectives: "Sovereignty over South China Sea islands and waters within the nine-dash line." },
  { conflictSlug: "south-china-sea", actorName: "Philippines", role: "defender", statedObjectives: "Defending exclusive economic zone and territorial waters under UNCLOS." },
  { conflictSlug: "south-china-sea", actorName: "United States", role: "supporter", statedObjectives: "Ensuring freedom of navigation and supporting allied territorial claims." },

  // Kosovo-Serbia
  { conflictSlug: "kosovo-serbia", actorName: "Kosovo", role: "defender", statedObjectives: "Full international recognition and EU integration." },
  { conflictSlug: "kosovo-serbia", actorName: "Serbia", role: "attacker", statedObjectives: "Protecting ethnic Serbs in Kosovo and contesting Kosovo's independence." },
  { conflictSlug: "kosovo-serbia", actorName: "European Union", role: "mediator", statedObjectives: "Normalizing Kosovo-Serbia relations as part of EU accession process." },
  { conflictSlug: "kosovo-serbia", actorName: "NATO", role: "observer", statedObjectives: "Maintaining peace through KFOR peacekeeping mission." },

  // Iran-Israel Shadow War
  { conflictSlug: "iran-israel-shadow-war", actorName: "Israel", role: "attacker", statedObjectives: "Preventing Iranian nuclear capability and neutralizing proxy threats." },
  { conflictSlug: "iran-israel-shadow-war", actorName: "Iran", role: "attacker", statedObjectives: "Deterring Israel and supporting Axis of Resistance against Israeli expansion." },
  { conflictSlug: "iran-israel-shadow-war", actorName: "Hezbollah", role: "supporter", statedObjectives: "Deterring Israel and supporting Palestinian resistance from Lebanon." },
  { conflictSlug: "iran-israel-shadow-war", actorName: "United States", role: "supporter", statedObjectives: "Protecting Israel's security and preventing Iranian nuclear breakout." },

  // North Korea
  { conflictSlug: "north-korea-korean-peninsula", actorName: "North Korea", role: "attacker", statedObjectives: "Regime survival, nuclear deterrance, and recognition as nuclear state." },
  { conflictSlug: "north-korea-korean-peninsula", actorName: "South Korea", role: "defender", statedObjectives: "Defending against North Korean aggression and pursuing denuclearization." },
  { conflictSlug: "north-korea-korean-peninsula", actorName: "United States", role: "supporter", statedObjectives: "Extended deterrence for South Korea and complete denuclearization of DPRK." },

  // Armenia-Azerbaijan Post-War
  { conflictSlug: "armenia-azerbaijan-post-war", actorName: "Azerbaijan", role: "attacker", statedObjectives: "Border demarcation, Zangezur corridor, and peace treaty on Azerbaijani terms." },
  { conflictSlug: "armenia-azerbaijan-post-war", actorName: "Armenia", role: "defender", statedObjectives: "Sovereign border control, refugee rights, and comprehensive peace agreement." },
  { conflictSlug: "armenia-azerbaijan-post-war", actorName: "European Union", role: "mediator", statedObjectives: "Brokering a peace agreement and supporting Armenia's democratic development." },
];

export async function seedActors(conflictMap: Map<string, string>) {
  console.log("  → Seeding actors...");

  // Insert all actors
  const insertedActors = await db
    .insert(actors)
    .values(
      actorsData.map((a) => ({
        name: a.name,
        type: a.type,
        countryCode: a.countryCode ?? null,
        description: a.description,
      }))
    )
    .returning({ id: actors.id, name: actors.name });

  console.log(`  ✓ Inserted ${insertedActors.length} actors`);

  // Build name → id map
  const actorMap = new Map(insertedActors.map((a) => [a.name, a.id]));

  // Insert conflict-actor junction rows
  console.log("  → Seeding conflict-actor relationships...");
  const junctionRows = conflictActorsData.map((ca) => {
    const conflictId = conflictMap.get(ca.conflictSlug);
    const actorId = actorMap.get(ca.actorName);
    if (!conflictId) throw new Error(`Unknown conflict slug: ${ca.conflictSlug}`);
    if (!actorId) throw new Error(`Unknown actor: ${ca.actorName}`);
    return {
      conflictId,
      actorId,
      role: ca.role,
      statedObjectives: ca.statedObjectives,
    };
  });

  const batchSize = 50;
  let total = 0;
  for (let i = 0; i < junctionRows.length; i += batchSize) {
    const batch = junctionRows.slice(i, i + batchSize);
    await db.insert(conflictActors).values(batch);
    total += batch.length;
  }

  console.log(`  ✓ Inserted ${total} conflict-actor relationships`);
}
