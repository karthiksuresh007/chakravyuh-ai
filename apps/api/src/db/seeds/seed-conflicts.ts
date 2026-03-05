import { db } from "../index.js";
import { conflicts } from "../schema.js";

export const conflictData = [
  // ── HIGH INTENSITY (Active War) ──────────────────────────────────
  {
    slug: "russia-ukraine-war",
    displayName: "Russia-Ukraine War",
    status: "active",
    intensity: "high",
    startDate: "2022-02-24",
    region: "Eastern Europe",
    subRegion: "Ukraine",
    lat: "49.000000",
    lng: "31.200000",
    riskScore: "9.2",
    overviewText:
      "A full-scale military invasion launched by Russia against Ukraine in February 2022, escalating from the 2014 annexation of Crimea and conflict in the Donbas. It is the largest conventional war in Europe since World War II, involving widespread artillery, drone, and missile warfare across Ukrainian territory.",
    backgroundText:
      "Tensions between Russia and Ukraine stretch back to the 2004 Orange Revolution and deepened after the 2014 Euromaidan uprising, Russia's annexation of Crimea, and the outbreak of war in the Donbas. NATO expansion eastward and Ukraine's aspirations for EU/NATO membership are central to Russia's stated justifications.",
  },
  {
    slug: "gaza-israel-conflict",
    displayName: "Gaza-Israel Conflict",
    status: "active",
    intensity: "high",
    startDate: "2023-10-07",
    region: "Middle East",
    subRegion: "Palestinian Territories",
    lat: "31.500000",
    lng: "34.470000",
    riskScore: "9.5",
    overviewText:
      "A devastating military escalation triggered by Hamas's October 7, 2023 attack on southern Israel, followed by Israel's large-scale ground and air campaign in Gaza. The conflict has caused unprecedented civilian casualties and a humanitarian catastrophe in the Gaza Strip.",
    backgroundText:
      "The Israeli-Palestinian conflict has deep roots stretching back to the early 20th century, through the 1948 Arab-Israeli War, the 1967 Six-Day War, and decades of occupation, settlement expansion, and failed peace processes. Gaza has been under Israeli blockade since 2007 when Hamas took control.",
  },
  {
    slug: "sudan-civil-war",
    displayName: "Sudan Civil War",
    status: "active",
    intensity: "high",
    startDate: "2023-04-15",
    region: "East Africa",
    subRegion: "Sudan",
    lat: "15.500000",
    lng: "32.530000",
    riskScore: "8.8",
    overviewText:
      "A devastating civil war between the Sudanese Armed Forces (SAF) led by General al-Burhan and the Rapid Support Forces (RSF) led by General Hemeti. The conflict has displaced millions and created one of the world's worst humanitarian crises.",
    backgroundText:
      "Sudan has a long history of internal conflict, including the Darfur genocide (2003), the secession of South Sudan (2011), and the 2019 revolution that toppled Omar al-Bashir. The 2021 military coup set the stage for the power struggle between SAF and RSF that erupted into full-scale war.",
  },
  {
    slug: "myanmar-civil-war",
    displayName: "Myanmar Civil War",
    status: "active",
    intensity: "high",
    startDate: "2021-02-01",
    region: "Southeast Asia",
    subRegion: "Myanmar",
    lat: "19.760000",
    lng: "96.070000",
    riskScore: "8.5",
    overviewText:
      "A multi-front civil war triggered by the February 2021 military coup that ousted the elected government of Aung San Suu Kyi. Resistance forces, including ethnic armed organizations and the People's Defence Force, have challenged the junta's control across much of the country.",
    backgroundText:
      "Myanmar has experienced ethnic armed conflicts since independence in 1948. The brief democratic opening (2015-2021) ended with the military coup, sparking a nationwide resistance movement. The conflict intersects with the Rohingya crisis and decades of ethnic military struggles in border regions.",
  },
  {
    slug: "haiti-crisis",
    displayName: "Haiti Crisis",
    status: "active",
    intensity: "high",
    startDate: "2021-07-07",
    region: "Caribbean",
    subRegion: "Haiti",
    lat: "18.970000",
    lng: "-72.280000",
    riskScore: "8.0",
    overviewText:
      "A devastating security and humanitarian crisis driven by armed gang control over much of Port-au-Prince and key infrastructure. The assassination of President Moïse in 2021 left a power vacuum that gangs have exploited, displacing hundreds of thousands.",
    backgroundText:
      "Haiti's crisis has roots in decades of political instability, foreign intervention, natural disasters, and systemic poverty. The country has faced repeated coups, the devastating 2010 earthquake, cholera outbreaks, and a gradual collapse of state institutions that has empowered armed gangs.",
  },
  {
    slug: "drc-conflict-m23",
    displayName: "DRC Conflict (M23)",
    status: "active",
    intensity: "high",
    startDate: "2022-03-01",
    region: "Central Africa",
    subRegion: "Democratic Republic of the Congo",
    lat: "-1.680000",
    lng: "29.220000",
    riskScore: "8.3",
    overviewText:
      "A resurgent armed conflict in eastern DRC driven by the M23 rebel group, widely reported to be backed by Rwanda. The conflict has displaced millions and destabilized the Great Lakes region despite the presence of UN peacekeepers.",
    backgroundText:
      "Eastern DRC has been mired in conflict since the aftermath of the 1994 Rwandan genocide, which destabilized the entire Great Lakes region. Over 100 armed groups operate in the eastern provinces. The M23 first emerged in 2012, was defeated, and resurged in late 2021.",
  },
  {
    slug: "ethiopia-amhara-conflict",
    displayName: "Ethiopia (Amhara Conflict)",
    status: "active",
    intensity: "high",
    startDate: "2023-08-01",
    region: "East Africa",
    subRegion: "Ethiopia",
    lat: "11.590000",
    lng: "37.390000",
    riskScore: "7.8",
    overviewText:
      "An armed conflict in Ethiopia's Amhara region between the federal government and Fano militia fighters. Following the Tigray peace deal, the Ethiopian government turned to disarm Amhara militias, sparking a new frontline of resistance.",
    backgroundText:
      "Ethiopia's ethnic federalism has long been a source of tension. The 2020-2022 Tigray War killed hundreds of thousands. The Amhara conflict emerged when the federal government attempted to integrate regional forces, and Amhara Fano fighters — who had fought alongside the federal army in Tigray — refused to disarm.",
  },

  // ── MEDIUM INTENSITY (Active armed conflict) ─────────────────────
  {
    slug: "sahel-mali-burkina-faso",
    displayName: "Sahel / Mali-Burkina Faso",
    status: "active",
    intensity: "medium",
    startDate: "2012-01-17",
    region: "West Africa",
    subRegion: "Sahel",
    lat: "14.000000",
    lng: "-2.000000",
    riskScore: "7.5",
    overviewText:
      "A multi-country jihadist insurgency across the Sahel region, primarily in Mali, Burkina Faso, and Niger. Military juntas have seized power in all three countries, expelling French forces and turning toward Russia's Wagner Group for security assistance.",
    backgroundText:
      "The crisis began with the 2012 Tuareg rebellion and Islamist takeover of northern Mali, followed by French military intervention. Despite years of international presence, armed groups linked to al-Qaeda and ISIS have expanded across the Sahel, exploiting governance failures and ethnic tensions.",
  },
  {
    slug: "somalia-al-shabaab",
    displayName: "Somalia (Al-Shabaab)",
    status: "active",
    intensity: "medium",
    startDate: "2006-12-20",
    region: "East Africa",
    subRegion: "Somalia",
    lat: "2.040000",
    lng: "45.340000",
    riskScore: "7.2",
    overviewText:
      "A long-running insurgency by al-Shabaab, an al-Qaeda affiliate, against the Federal Government of Somalia and African Union peacekeeping forces. The group controls significant territory in southern and central Somalia and conducts international terror attacks.",
    backgroundText:
      "Somalia collapsed into civil war after the fall of Siad Barre in 1991 and has lacked effective central governance since. Al-Shabaab emerged from the Islamic Courts Union in 2006 and has sustained an insurgency despite military operations by Somali, AU, and US forces.",
  },
  {
    slug: "yemen-civil-war",
    displayName: "Yemen Civil War",
    status: "active",
    intensity: "medium",
    startDate: "2014-09-21",
    region: "Middle East",
    subRegion: "Yemen",
    lat: "15.370000",
    lng: "44.190000",
    riskScore: "7.8",
    overviewText:
      "A complex civil war between the internationally recognized government (backed by a Saudi-led coalition) and Houthi rebels (backed by Iran). A fragile truce has reduced violence, but Houthi attacks on Red Sea shipping have created a new international dimension.",
    backgroundText:
      "Yemen's conflict stems from the 2011 Arab Spring, the Houthi takeover of Sanaa in 2014, and Saudi Arabia's 2015 military intervention. The war has created the world's worst humanitarian crisis, with famine and cholera devastating the population.",
  },
  {
    slug: "syria-conflict",
    displayName: "Syria Conflict",
    status: "active",
    intensity: "medium",
    startDate: "2011-03-15",
    region: "Middle East",
    subRegion: "Syria",
    lat: "34.800000",
    lng: "38.990000",
    riskScore: "7.0",
    overviewText:
      "A multi-sided civil war that began as pro-democracy protests against the Assad regime and evolved into a complex conflict involving regional and international powers, jihadist groups, and Kurdish forces. The fall of Assad in late 2024 opened a new chapter of transition.",
    backgroundText:
      "Syria's conflict grew from the Arab Spring protests, the Assad regime's brutal crackdown, and the subsequent military intervention by Russia, Iran, Turkey, and the US-led coalition. ISIS's rise and fall, Kurdish autonomy, and the refugee crisis are central elements.",
  },
  {
    slug: "nagorno-karabakh",
    displayName: "Nagorno-Karabakh",
    status: "resolved",
    intensity: "medium",
    startDate: "2020-09-27",
    endDate: "2023-09-20",
    region: "South Caucasus",
    subRegion: "Azerbaijan",
    lat: "39.810000",
    lng: "46.750000",
    riskScore: "4.5",
    overviewText:
      "A territorial conflict between Armenia and Azerbaijan over the Nagorno-Karabakh region. Azerbaijan's 2023 military offensive led to the dissolution of the unrecognized Armenian republic and the mass exodus of its ethnic Armenian population.",
    backgroundText:
      "The conflict dates to the late Soviet era when Nagorno-Karabakh's Armenian majority sought unification with Armenia. A 1988-1994 war left the territory under Armenian control. A 2020 war shifted the balance, and Azerbaijan's 2023 offensive ended the conflict decisively.",
  },
  {
    slug: "india-pakistan-kashmir",
    displayName: "India-Pakistan (Kashmir LoC)",
    status: "active",
    intensity: "medium",
    startDate: "1947-10-22",
    region: "South Asia",
    subRegion: "Kashmir",
    lat: "34.080000",
    lng: "74.800000",
    riskScore: "7.0",
    overviewText:
      "A decades-long territorial dispute between nuclear-armed India and Pakistan over the Kashmir region, divided by the Line of Control. Cross-border shelling, militant attacks, and political tensions maintain this as one of the world's most dangerous flashpoints.",
    backgroundText:
      "The Kashmir conflict began with the 1947 partition of British India and the first Indo-Pakistani war. Three subsequent wars, nuclear tests by both sides, the Kargil crisis (1999), and India's 2019 revocation of Article 370 have shaped the dispute. Militant groups and state security forces keep tensions high.",
  },
  {
    slug: "mozambique-cabo-delgado",
    displayName: "Mozambique (Cabo Delgado)",
    status: "active",
    intensity: "medium",
    startDate: "2017-10-05",
    region: "Southern Africa",
    subRegion: "Mozambique",
    lat: "-12.350000",
    lng: "40.350000",
    riskScore: "6.5",
    overviewText:
      "An Islamist insurgency in Mozambique's northernmost province of Cabo Delgado, linked to ISIS. The conflict has displaced over a million people and threatens major natural gas projects in the region.",
    backgroundText:
      "The insurgency emerged in 2017 in an underdeveloped, predominantly Muslim province that felt marginalized by the central government. The discovery of massive offshore gas reserves attracted international attention. Rwandan and SADC military interventions have partially contained the insurgency.",
  },

  // ── TENSIONS ─────────────────────────────────────────────────────
  {
    slug: "taiwan-strait-tensions",
    displayName: "Taiwan Strait Tensions",
    status: "active",
    intensity: "tension",
    startDate: "1949-12-07",
    region: "East Asia",
    subRegion: "Taiwan Strait",
    lat: "23.700000",
    lng: "120.960000",
    riskScore: "8.0",
    overviewText:
      "Escalating military tensions between China and Taiwan, with China increasing military exercises, airspace incursions, and naval activity around the island. The US commitment to Taiwan's defense makes this one of the most consequential geopolitical flashpoints globally.",
    backgroundText:
      "Taiwan has been governed independently since 1949 when the Republic of China government retreated to the island after losing the Chinese Civil War. China views Taiwan as a breakaway province. US strategic ambiguity, semiconductor dominance, and great-power competition keep this crisis at the center of global affairs.",
  },
  {
    slug: "south-china-sea",
    displayName: "South China Sea",
    status: "active",
    intensity: "tension",
    startDate: "2012-04-08",
    region: "East Asia",
    subRegion: "South China Sea",
    lat: "14.500000",
    lng: "114.000000",
    riskScore: "6.8",
    overviewText:
      "A multi-party territorial dispute in the South China Sea involving China, the Philippines, Vietnam, Malaysia, Brunei, and Taiwan. China's artificial island construction and military patrols challenge freedom of navigation and international maritime law.",
    backgroundText:
      "China claims sovereignty over most of the South China Sea via the 'nine-dash line,' a claim rejected by a 2016 international tribunal. The region is critical for global trade ($3 trillion in annual shipping) and has significant oil and gas reserves. US freedom-of-navigation operations add a great-power dimension.",
  },
  {
    slug: "kosovo-serbia",
    displayName: "Kosovo-Serbia",
    status: "active",
    intensity: "tension",
    startDate: "2008-02-17",
    region: "Southeastern Europe",
    subRegion: "Balkans",
    lat: "42.660000",
    lng: "21.170000",
    riskScore: "5.5",
    overviewText:
      "An unresolved territorial and political dispute between Kosovo and Serbia. Kosovo declared independence in 2008, which Serbia does not recognize. Recurring tensions over Serb-majority municipalities in northern Kosovo periodically escalate into violence.",
    backgroundText:
      "Kosovo was a province of Serbia within Yugoslavia. The 1998-99 Kosovo War and NATO intervention led to UN administration and eventual independence. Serbia, backed by Russia and China, refuses to recognize Kosovo, creating a frozen conflict that complicates both countries' EU aspirations.",
  },
  {
    slug: "iran-israel-shadow-war",
    displayName: "Iran-Israel Shadow War",
    status: "active",
    intensity: "tension",
    startDate: "2010-01-01",
    region: "Middle East",
    subRegion: "Multiple",
    lat: "32.430000",
    lng: "53.690000",
    riskScore: "8.2",
    overviewText:
      "An escalating covert and proxy conflict between Iran and Israel spanning cyberattacks, assassinations, drone strikes, and militia warfare. The conflict has intensified with Iran's nuclear program, its proxy network (Hezbollah, Hamas, Houthis), and direct missile exchanges in 2024.",
    backgroundText:
      "Iran and Israel were allies before the 1979 Islamic Revolution. Since then, Iran has positioned itself as the leader of the 'Axis of Resistance' against Israel. Proxy conflicts in Lebanon, Syria, Gaza, and Yemen, combined with Iran's nuclear program and Israel's sabotage operations, define this long-running shadow war.",
  },
  {
    slug: "north-korea-korean-peninsula",
    displayName: "North Korea (Korean Peninsula)",
    status: "active",
    intensity: "tension",
    startDate: "1950-06-25",
    region: "East Asia",
    subRegion: "Korean Peninsula",
    lat: "39.040000",
    lng: "125.760000",
    riskScore: "7.5",
    overviewText:
      "A decades-long standoff between nuclear-armed North Korea and South Korea (backed by the US). North Korea's accelerating missile tests, nuclear development, and increasing alignment with Russia have raised tensions to some of their highest levels since the Korean War.",
    backgroundText:
      "The Korean War (1950-53) ended in armistice, not peace treaty. North Korea's pursuit of nuclear weapons, isolation under the Kim dynasty, and cycles of provocation and diplomacy define the peninsula's security dynamics. The US maintains ~28,500 troops in South Korea.",
  },
  {
    slug: "armenia-azerbaijan-post-war",
    displayName: "Armenia-Azerbaijan (Post-War)",
    status: "active",
    intensity: "tension",
    startDate: "2023-09-20",
    region: "South Caucasus",
    subRegion: "South Caucasus",
    lat: "40.180000",
    lng: "44.510000",
    riskScore: "5.0",
    overviewText:
      "Post-Nagorno-Karabakh tensions between Armenia and Azerbaijan, centered on border demarcation, the Zangezur corridor, and the status of ethnic Armenian refugees. Despite the end of the Karabakh conflict, a comprehensive peace treaty remains elusive.",
    backgroundText:
      "Following Azerbaijan's 2023 military operation in Nagorno-Karabakh, over 100,000 ethnic Armenians fled to Armenia. Outstanding issues include border delimitation, transport corridors (particularly the Zangezur corridor connecting Azerbaijan to Nakhchivan), and Armenia's strategic reorientation away from Russia.",
  },
] as const;

export type ConflictSeedData = (typeof conflictData)[number];

export async function seedConflicts() {
  console.log("  → Seeding conflicts...");
  const inserted = await db
    .insert(conflicts)
    .values(
      conflictData.map((c) => ({
        slug: c.slug,
        displayName: c.displayName,
        status: c.status,
        intensity: c.intensity,
        startDate: c.startDate,
        endDate: "endDate" in c ? (c as { endDate: string }).endDate : undefined,
        region: c.region,
        subRegion: c.subRegion,
        lat: c.lat,
        lng: c.lng,
        riskScore: c.riskScore,
        overviewText: c.overviewText,
        backgroundText: c.backgroundText,
      }))
    )
    .returning({ id: conflicts.id, slug: conflicts.slug });

  console.log(`  ✓ Inserted ${inserted.length} conflicts`);
  return inserted;
}
