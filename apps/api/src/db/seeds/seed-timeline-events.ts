import { db } from "../index.js";
import { timelineEvents } from "../schema.js";

type ConflictRef = { id: string; slug: string };

interface TimelineEventInput {
  conflictSlug: string;
  eventDate: string;
  title: string;
  description: string;
  category: "military" | "political" | "diplomatic" | "humanitarian";
  significance: "critical" | "major" | "moderate" | "minor";
  sources?: string[];
}

const eventsData: TimelineEventInput[] = [
  // ── Russia-Ukraine War ────────────────────────────────────────
  { conflictSlug: "russia-ukraine-war", eventDate: "2022-02-24", title: "Russia launches full-scale invasion of Ukraine", description: "Russian forces invade Ukraine from multiple directions including Belarus border, targeting Kyiv, Kharkiv, and southern Ukraine. President Putin calls it a 'special military operation.'", category: "military", significance: "critical" },
  { conflictSlug: "russia-ukraine-war", eventDate: "2022-04-03", title: "Russian withdrawal from Kyiv region reveals Bucha massacre", description: "After Russia's retreat from the Kyiv region, evidence of mass killings of civilians in Bucha sparks international condemnation and war crimes investigations.", category: "humanitarian", significance: "critical" },
  { conflictSlug: "russia-ukraine-war", eventDate: "2022-09-30", title: "Russia announces annexation of four Ukrainian regions", description: "Putin signs treaties annexing Donetsk, Luhansk, Zaporizhzhia, and Kherson oblasts, a move condemned as illegal by the UN General Assembly.", category: "political", significance: "critical" },
  { conflictSlug: "russia-ukraine-war", eventDate: "2023-06-06", title: "Ukraine launches counteroffensive", description: "Ukraine begins a long-anticipated counteroffensive in southern and eastern Ukraine, aiming to recapture territory along the Zaporizhzhia axis.", category: "military", significance: "major" },
  { conflictSlug: "russia-ukraine-war", eventDate: "2024-08-06", title: "Ukraine launches incursion into Kursk, Russia", description: "Ukrainian forces cross into Russia's Kursk region in a surprise offensive, capturing territory inside Russia for the first time in the war.", category: "military", significance: "critical" },
  { conflictSlug: "russia-ukraine-war", eventDate: "2022-11-11", title: "Ukraine liberates Kherson", description: "Ukrainian forces recapture Kherson, the only regional capital Russia had seized, marking a major strategic and symbolic victory.", category: "military", significance: "major" },

  // ── Gaza-Israel Conflict ──────────────────────────────────────
  { conflictSlug: "gaza-israel-conflict", eventDate: "2023-10-07", title: "Hamas launches surprise attack on Israel", description: "Hamas militants breach the Gaza border fence, attacking Israeli communities and a music festival, killing approximately 1,200 people and taking over 240 hostages.", category: "military", significance: "critical" },
  { conflictSlug: "gaza-israel-conflict", eventDate: "2023-10-27", title: "Israel begins ground invasion of Gaza", description: "Israeli ground forces enter northern Gaza in a major military operation, beginning an intense urban warfare campaign in Gaza City.", category: "military", significance: "critical" },
  { conflictSlug: "gaza-israel-conflict", eventDate: "2024-01-26", title: "ICJ orders Israel to prevent genocide in Gaza", description: "The International Court of Justice issues provisional measures in South Africa's genocide case, ordering Israel to prevent acts of genocide and ensure humanitarian aid.", category: "diplomatic", significance: "critical" },
  { conflictSlug: "gaza-israel-conflict", eventDate: "2024-05-06", title: "Israel launches Rafah operation despite international opposition", description: "Israel begins military operations in Rafah, the last major refuge for displaced Palestinians, despite warnings from the US and international community.", category: "military", significance: "major" },
  { conflictSlug: "gaza-israel-conflict", eventDate: "2024-11-28", title: "Lebanon ceasefire agreement reached", description: "Israel and Hezbollah agree to a ceasefire in Lebanon, brokered by the US and France, following months of cross-border warfare that opened after October 7.", category: "diplomatic", significance: "major" },

  // ── Sudan Civil War ───────────────────────────────────────────
  { conflictSlug: "sudan-civil-war", eventDate: "2023-04-15", title: "Fighting erupts between SAF and RSF in Khartoum", description: "Armed clashes break out between the Sudanese Armed Forces and the Rapid Support Forces in Khartoum after weeks of escalating tensions over military integration timelines.", category: "military", significance: "critical" },
  { conflictSlug: "sudan-civil-war", eventDate: "2023-06-15", title: "RSF accused of ethnic killings in West Darfur", description: "Reports emerge of mass killings and ethnic cleansing by RSF-allied Arab militias targeting the Masalit community in El Geneina, West Darfur.", category: "humanitarian", significance: "critical" },
  { conflictSlug: "sudan-civil-war", eventDate: "2023-12-15", title: "SAF recaptures parts of Omdurman", description: "The Sudanese Armed Forces launch a major counteroffensive in Omdurman, recapturing key areas of the city across the Nile from Khartoum.", category: "military", significance: "major" },
  { conflictSlug: "sudan-civil-war", eventDate: "2024-03-15", title: "UN warns of imminent famine in Sudan", description: "The UN warns that Sudan faces imminent famine conditions, with over 25 million people — half the population — in acute food insecurity.", category: "humanitarian", significance: "critical" },
  { conflictSlug: "sudan-civil-war", eventDate: "2024-08-01", title: "Ceasefire talks collapse in Jeddah", description: "Saudi-US mediated ceasefire negotiations fail again as both sides refuse to commit to a sustained cessation of hostilities.", category: "diplomatic", significance: "major" },

  // ── Myanmar Civil War ─────────────────────────────────────────
  { conflictSlug: "myanmar-civil-war", eventDate: "2021-02-01", title: "Military coup deposes elected government", description: "Myanmar's military seizes power, detaining Aung San Suu Kyi and declaring a state of emergency. Massive nationwide protests follow.", category: "political", significance: "critical" },
  { conflictSlug: "myanmar-civil-war", eventDate: "2021-03-27", title: "Military kills over 100 protesters in single day", description: "Security forces kill at least 114 people across Myanmar on Armed Forces Day, the deadliest day since the coup began.", category: "humanitarian", significance: "critical" },
  { conflictSlug: "myanmar-civil-war", eventDate: "2021-05-05", title: "National Unity Government formed", description: "Ousted lawmakers and ethnic leaders form a parallel National Unity Government (NUG) and establish the People's Defence Force (PDF) to resist the junta.", category: "political", significance: "major" },
  { conflictSlug: "myanmar-civil-war", eventDate: "2023-10-27", title: "Operation 1027 launches in northern Shan State", description: "The Three Brotherhood Alliance launches Operation 1027, a coordinated offensive that captures dozens of military posts and towns in northern Shan State, the junta's biggest territorial loss.", category: "military", significance: "critical" },
  { conflictSlug: "myanmar-civil-war", eventDate: "2024-06-01", title: "Resistance forces expand control across the country", description: "Anti-junta forces control an estimated 60% of Myanmar's territory, with the military increasingly reliant on airstrikes against civilian areas.", category: "military", significance: "major" },

  // ── Haiti Crisis ──────────────────────────────────────────────
  { conflictSlug: "haiti-crisis", eventDate: "2021-07-07", title: "President Jovenel Moïse assassinated", description: "President Moïse is assassinated at his private residence by a group of foreign mercenaries, plunging Haiti deeper into political chaos.", category: "political", significance: "critical" },
  { conflictSlug: "haiti-crisis", eventDate: "2023-03-01", title: "Gang alliance 'Viv Ansanm' consolidates control", description: "Rival gangs form the 'Viv Ansanm' (Living Together) coalition under Jimmy 'Barbecue' Chérizier, controlling an estimated 80% of Port-au-Prince.", category: "military", significance: "major" },
  { conflictSlug: "haiti-crisis", eventDate: "2024-02-29", title: "Gangs launch coordinated attacks on state institutions", description: "Armed gangs launch synchronized attacks on police stations, the international airport, and prisons, freeing thousands of inmates and paralyzing the capital.", category: "military", significance: "critical" },
  { conflictSlug: "haiti-crisis", eventDate: "2024-03-11", title: "Prime Minister Henry resigns under gang pressure", description: "PM Ariel Henry resigns while stranded abroad, unable to return to Haiti. A transitional presidential council is formed with international backing.", category: "political", significance: "major" },
  { conflictSlug: "haiti-crisis", eventDate: "2024-06-25", title: "Kenyan-led multinational security mission deploys", description: "A Kenyan-led Multinational Security Support mission begins deploying to Haiti to assist police in combating armed gangs.", category: "military", significance: "major" },

  // ── DRC Conflict (M23) ────────────────────────────────────────
  { conflictSlug: "drc-conflict-m23", eventDate: "2022-03-27", title: "M23 resurgence begins in North Kivu", description: "The M23 rebel group launches a new offensive, rapidly capturing territory in North Kivu province after years of dormancy.", category: "military", significance: "critical" },
  { conflictSlug: "drc-conflict-m23", eventDate: "2022-11-23", title: "M23 captures Bunagana on Uganda border", description: "M23 forces seize the strategic border town of Bunagana, establishing control over key trade routes.", category: "military", significance: "major" },
  { conflictSlug: "drc-conflict-m23", eventDate: "2023-09-01", title: "UN Group of Experts confirms Rwandan support for M23", description: "A UN report provides detailed evidence of Rwandan military support for M23, including troops and weapons.", category: "diplomatic", significance: "major" },
  { conflictSlug: "drc-conflict-m23", eventDate: "2024-02-07", title: "M23 advances toward Goma", description: "M23 fighters push toward Goma, the largest city in eastern DRC, displacing hundreds of thousands and raising fears of an assault on the city.", category: "military", significance: "critical" },
  { conflictSlug: "drc-conflict-m23", eventDate: "2025-01-27", title: "M23 captures Goma", description: "M23 rebels seize Goma, the capital of North Kivu province, in their most significant military achievement, triggering a humanitarian catastrophe.", category: "military", significance: "critical" },

  // ── Ethiopia (Amhara Conflict) ────────────────────────────────
  { conflictSlug: "ethiopia-amhara-conflict", eventDate: "2023-08-04", title: "Ethiopian government declares state of emergency in Amhara", description: "Ethiopian authorities declare a state of emergency across the Amhara region as Fano militia fighters seize control of several towns.", category: "political", significance: "critical" },
  { conflictSlug: "ethiopia-amhara-conflict", eventDate: "2023-09-15", title: "Internet shutdown imposed across Amhara", description: "The Ethiopian government imposes a total internet and telecommunications blackout in the Amhara region, limiting information flow.", category: "political", significance: "major" },
  { conflictSlug: "ethiopia-amhara-conflict", eventDate: "2023-11-03", title: "Tigray peace deal signed (Pretoria Agreement)", description: "The Pretoria Agreement officially ends the Tigray War, but its terms — including Amhara militia disarmament — fuel the Amhara conflict.", category: "diplomatic", significance: "critical" },
  { conflictSlug: "ethiopia-amhara-conflict", eventDate: "2024-04-01", title: "Fano forces expand control in western Amhara", description: "Fano militia fighters control large swathes of rural and semi-urban areas in Gondar and Gojjam zones, resisting federal military operations.", category: "military", significance: "major" },
  { conflictSlug: "ethiopia-amhara-conflict", eventDate: "2024-09-01", title: "Reports of civilian casualties from airstrikes", description: "Multiple reports emerge of Ethiopian military airstrikes in Amhara causing civilian casualties, drawing international criticism.", category: "humanitarian", significance: "major" },

  // ── Sahel / Mali-Burkina Faso ─────────────────────────────────
  { conflictSlug: "sahel-mali-burkina-faso", eventDate: "2023-07-26", title: "Niger coup removes President Bazoum", description: "Niger's presidential guard stages a military coup, overthrowing President Mohamed Bazoum and establishing a junta, completing a trilogy of Sahel coups.", category: "political", significance: "critical" },
  { conflictSlug: "sahel-mali-burkina-faso", eventDate: "2023-09-16", title: "Sahel Alliance formed", description: "Mali, Burkina Faso, and Niger establish the Alliance of Sahel States, a mutual defense pact, and announce withdrawal from ECOWAS.", category: "diplomatic", significance: "major" },
  { conflictSlug: "sahel-mali-burkina-faso", eventDate: "2022-02-17", title: "France announces withdrawal from Mali", description: "France announces the end of its military operations in Mali after nearly a decade, citing deteriorating relations with the Malian junta.", category: "military", significance: "major" },
  { conflictSlug: "sahel-mali-burkina-faso", eventDate: "2024-01-28", title: "Sahel states leave ECOWAS", description: "Mali, Burkina Faso, and Niger formally announce their withdrawal from the Economic Community of West African States.", category: "diplomatic", significance: "major" },
  { conflictSlug: "sahel-mali-burkina-faso", eventDate: "2024-06-15", title: "Wagner Group casualties in Mali ambush", description: "An ambush by Tuareg rebels and jihadist fighters in northern Mali kills scores of Wagner Group mercenaries and Malian soldiers in the deadliest single defeat.", category: "military", significance: "major" },

  // ── Somalia (Al-Shabaab) ──────────────────────────────────────
  { conflictSlug: "somalia-al-shabaab", eventDate: "2022-08-19", title: "President Mohamud launches major anti-al-Shabaab offensive", description: "New President Hassan Sheikh Mohamud launches a comprehensive military campaign against al-Shabaab, combining Somali forces, clan militias, and US airstrikes.", category: "military", significance: "major" },
  { conflictSlug: "somalia-al-shabaab", eventDate: "2022-10-29", title: "Mogadishu bombings kill over 100", description: "Two car bombs explode at a busy intersection in Mogadishu, killing over 100 people in the deadliest attack in the capital in years.", category: "military", significance: "critical" },
  { conflictSlug: "somalia-al-shabaab", eventDate: "2023-05-31", title: "AU peacekeeping mission transitions to ATMIS", description: "The African Union Transition Mission in Somalia (ATMIS) begins a phased drawdown, handing over security responsibilities to Somali forces.", category: "diplomatic", significance: "major" },
  { conflictSlug: "somalia-al-shabaab", eventDate: "2024-03-01", title: "Al-Shabaab launches counterattacks recapturing territory", description: "Al-Shabaab reverses some government gains, recapturing areas in central Somalia as the military offensive loses momentum.", category: "military", significance: "major" },
  { conflictSlug: "somalia-al-shabaab", eventDate: "2024-01-01", title: "Ethiopia-Somalia relations strained over Somaliland port deal", description: "Ethiopia's MoU with Somaliland for a naval base and port access strains relations with Somalia, complicating counter-terrorism cooperation.", category: "diplomatic", significance: "major" },

  // ── Yemen Civil War ───────────────────────────────────────────
  { conflictSlug: "yemen-civil-war", eventDate: "2022-04-02", title: "UN-brokered truce begins", description: "A two-month truce between the Saudi-led coalition and Houthi rebels takes effect, the first nationwide ceasefire since 2016, significantly reducing violence.", category: "diplomatic", significance: "critical" },
  { conflictSlug: "yemen-civil-war", eventDate: "2023-12-19", title: "Houthis begin attacking Red Sea shipping", description: "Houthi forces begin systematic attacks on commercial shipping in the Red Sea, claiming solidarity with Gaza and disrupting global trade routes.", category: "military", significance: "critical" },
  { conflictSlug: "yemen-civil-war", eventDate: "2024-01-12", title: "US and UK launch strikes on Houthi targets in Yemen", description: "The US and UK conduct military strikes on Houthi positions in Yemen in response to continued attacks on Red Sea shipping.", category: "military", significance: "major" },
  { conflictSlug: "yemen-civil-war", eventDate: "2024-04-01", title: "Houthi attacks expand to Indian Ocean and Mediterranean", description: "Houthi forces extend their maritime attacks beyond the Red Sea, targeting vessels in the Indian Ocean and attempting strikes in the eastern Mediterranean.", category: "military", significance: "major" },
  { conflictSlug: "yemen-civil-war", eventDate: "2024-09-15", title: "Houthis launch ballistic missile at Tel Aviv", description: "The Houthi movement fires a ballistic missile at Israel, reaching the Tel Aviv area, marking a significant escalation in their involvement in the Gaza war.", category: "military", significance: "critical" },

  // ── Syria Conflict ────────────────────────────────────────────
  { conflictSlug: "syria-conflict", eventDate: "2024-11-27", title: "HTS launches surprise offensive in Aleppo", description: "Hayat Tahrir al-Sham and allied rebel forces launch a surprise offensive, rapidly capturing Aleppo and multiple cities in a dramatic shift of the conflict.", category: "military", significance: "critical" },
  { conflictSlug: "syria-conflict", eventDate: "2024-12-08", title: "Assad regime falls, President flees", description: "Rebel forces capture Damascus and topple the Assad regime after a lightning advance. Bashar al-Assad flees to Moscow, ending 53 years of Assad family rule.", category: "political", significance: "critical" },
  { conflictSlug: "syria-conflict", eventDate: "2024-12-10", title: "Transitional government formation begins", description: "HTS leader Ahmed al-Sharaa (formerly Abu Mohammed al-Julani) begins forming a transitional government amid international diplomatic engagement.", category: "political", significance: "major" },
  { conflictSlug: "syria-conflict", eventDate: "2024-12-20", title: "Israel expands operations into Syrian buffer zone", description: "Israeli forces move into the UN buffer zone in the Golan Heights and conduct extensive airstrikes on Syrian military assets.", category: "military", significance: "major" },
  { conflictSlug: "syria-conflict", eventDate: "2025-01-15", title: "International community begins diplomatic recognition process", description: "Multiple countries begin engaging with Syria's new authorities, with discussions on sanctions relief and reconstruction aid.", category: "diplomatic", significance: "major" },

  // ── Nagorno-Karabakh ──────────────────────────────────────────
  { conflictSlug: "nagorno-karabakh", eventDate: "2020-09-27", title: "Second Nagorno-Karabakh War begins", description: "Azerbaijan launches a large-scale military offensive to recapture Nagorno-Karabakh, using advanced drone warfare including Turkish Bayraktar TB2 drones.", category: "military", significance: "critical" },
  { conflictSlug: "nagorno-karabakh", eventDate: "2020-11-10", title: "Russia-brokered ceasefire ends 44-day war", description: "A ceasefire agreement, mediated by Russia, ends the war. Azerbaijan regains significant territory and Russian peacekeepers deploy to the region.", category: "diplomatic", significance: "critical" },
  { conflictSlug: "nagorno-karabakh", eventDate: "2022-12-12", title: "Azerbaijan blockades Lachin corridor", description: "Azerbaijani activists block the Lachin corridor, the only road connecting Nagorno-Karabakh to Armenia, leading to a months-long siege.", category: "military", significance: "major" },
  { conflictSlug: "nagorno-karabakh", eventDate: "2023-09-19", title: "Azerbaijan launches final offensive", description: "Azerbaijan launches a 24-hour military operation that overwhelms Armenian forces in Nagorno-Karabakh, leading to a ceasefire and disarmament.", category: "military", significance: "critical" },
  { conflictSlug: "nagorno-karabakh", eventDate: "2023-09-24", title: "Mass exodus of ethnic Armenians begins", description: "Over 100,000 ethnic Armenians — virtually the entire population — flee Nagorno-Karabakh to Armenia, ending centuries of Armenian presence.", category: "humanitarian", significance: "critical" },

  // ── India-Pakistan (Kashmir) ──────────────────────────────────
  { conflictSlug: "india-pakistan-kashmir", eventDate: "2019-02-14", title: "Pulwama attack and Balakot airstrikes", description: "A suicide bombing in Pulwama kills 40 Indian security personnel. India responds with airstrikes on Balakot inside Pakistan, the first such strikes since 1971.", category: "military", significance: "critical" },
  { conflictSlug: "india-pakistan-kashmir", eventDate: "2019-08-05", title: "India revokes Article 370", description: "India revokes Article 370, stripping Jammu and Kashmir of its special autonomous status, splitting it into two union territories under direct federal rule.", category: "political", significance: "critical" },
  { conflictSlug: "india-pakistan-kashmir", eventDate: "2021-02-25", title: "India-Pakistan ceasefire agreement on LoC", description: "India and Pakistan announce a surprise recommitment to the 2003 ceasefire along the Line of Control, significantly reducing cross-border shelling.", category: "diplomatic", significance: "major" },
  { conflictSlug: "india-pakistan-kashmir", eventDate: "2024-06-01", title: "First elections held in J&K as Union Territory", description: "Jammu and Kashmir holds its first elections since the revocation of Article 370, with high turnout and a regional party winning power.", category: "political", significance: "major" },
  { conflictSlug: "india-pakistan-kashmir", eventDate: "2025-04-22", title: "India launches Operation Sindoor", description: "India launches military strikes against terror targets in Pakistan and Pakistan-administered Kashmir following the Pahalgam terror attack.", category: "military", significance: "critical" },

  // ── Mozambique (Cabo Delgado) ─────────────────────────────────
  { conflictSlug: "mozambique-cabo-delgado", eventDate: "2021-03-24", title: "Insurgents attack Palma, near gas facilities", description: "ISIS-linked insurgents attack the town of Palma near the TotalEnergies gas project, killing dozens and forcing the company to suspend operations.", category: "military", significance: "critical" },
  { conflictSlug: "mozambique-cabo-delgado", eventDate: "2021-07-09", title: "Rwandan forces deploy to Cabo Delgado", description: "Rwanda deploys 1,000 troops to Cabo Delgado, quickly recapturing key ports and towns from the insurgents in a decisive intervention.", category: "military", significance: "major" },
  { conflictSlug: "mozambique-cabo-delgado", eventDate: "2022-01-15", title: "SADC forces join counterinsurgency operations", description: "Southern African Development Community forces deploy alongside Rwandan troops and Mozambican military in a coordinated counterinsurgency campaign.", category: "military", significance: "moderate" },
  { conflictSlug: "mozambique-cabo-delgado", eventDate: "2024-10-21", title: "Post-election violence erupts across Mozambique", description: "Disputed election results trigger nationwide protests and violence that intersect with the Cabo Delgado insurgency, destabilizing the country.", category: "political", significance: "major" },
  { conflictSlug: "mozambique-cabo-delgado", eventDate: "2024-12-15", title: "Insurgent attacks resurge in northern Cabo Delgado", description: "After a period of relative calm, insurgent attacks increase again in remote areas of northern Cabo Delgado.", category: "military", significance: "moderate" },

  // ── Taiwan Strait Tensions ────────────────────────────────────
  { conflictSlug: "taiwan-strait-tensions", eventDate: "2022-08-02", title: "Pelosi visits Taiwan, China launches military exercises", description: "US House Speaker Nancy Pelosi visits Taiwan, prompting China to launch unprecedented military exercises encircling the island with live-fire drills.", category: "military", significance: "critical" },
  { conflictSlug: "taiwan-strait-tensions", eventDate: "2024-01-13", title: "Lai Ching-te elected Taiwan president", description: "DPP candidate Lai Ching-te wins Taiwan's presidential election. China calls him a 'separatist' and increases military pressure.", category: "political", significance: "major" },
  { conflictSlug: "taiwan-strait-tensions", eventDate: "2024-05-23", title: "China conducts 'Joint Sword-2024A' exercises", description: "China launches large-scale military exercises around Taiwan following President Lai's inauguration, simulating a blockade.", category: "military", significance: "major" },
  { conflictSlug: "taiwan-strait-tensions", eventDate: "2024-10-14", title: "China conducts 'Joint Sword-2024B' exercises", description: "China again encircles Taiwan with major military exercises, deploying record numbers of aircraft and naval vessels.", category: "military", significance: "major" },
  { conflictSlug: "taiwan-strait-tensions", eventDate: "2024-12-01", title: "Record Chinese military aircraft incursions in ADIZ", description: "Over 100 Chinese military aircraft enter Taiwan's Air Defense Identification Zone in a single month, setting new record for incursions.", category: "military", significance: "moderate" },

  // ── South China Sea ───────────────────────────────────────────
  { conflictSlug: "south-china-sea", eventDate: "2023-10-22", title: "Chinese vessels ram Philippine boats near Second Thomas Shoal", description: "Chinese coast guard and militia vessels collide with Philippine vessels conducting resupply missions to a grounded warship at Second Thomas Shoal.", category: "military", significance: "major" },
  { conflictSlug: "south-china-sea", eventDate: "2024-03-23", title: "Water cannon attacks damage Philippine supply vessel", description: "Chinese coast guard vessels use water cannons to damage a Philippine resupply vessel, injuring crew members, in one of the most aggressive encounters.", category: "military", significance: "major" },
  { conflictSlug: "south-china-sea", eventDate: "2024-06-17", title: "Chinese forces seize Philippine military supplies", description: "Chinese coast guard personnel board Philippine boats and confiscate weapons and supplies during a confrontation at Second Thomas Shoal.", category: "military", significance: "major" },
  { conflictSlug: "south-china-sea", eventDate: "2024-04-07", title: "US-Japan-Philippines trilateral summit", description: "The US, Japan, and Philippines hold their first trilateral summit, announcing enhanced security cooperation and joint patrols in the South China Sea.", category: "diplomatic", significance: "major" },
  { conflictSlug: "south-china-sea", eventDate: "2024-08-01", title: "Philippines and China reach provisional agreement", description: "The Philippines and China reach a provisional arrangement on resupply missions to Second Thomas Shoal, temporarily reducing tensions.", category: "diplomatic", significance: "moderate" },

  // ── Kosovo-Serbia ─────────────────────────────────────────────
  { conflictSlug: "kosovo-serbia", eventDate: "2023-05-26", title: "Violence erupts in northern Kosovo over Albanian mayors", description: "Ethnic Serbs protest the installation of Albanian mayors in Serb-majority municipalities, leading to clashes with NATO KFOR peacekeepers.", category: "political", significance: "major" },
  { conflictSlug: "kosovo-serbia", eventDate: "2023-09-24", title: "Armed group attacks Kosovo police in Banjska", description: "An armed group of ethnic Serbs attacks Kosovo police in the village of Banjska, killing one officer. Kosovo links the attack to Serbian state structures.", category: "military", significance: "critical" },
  { conflictSlug: "kosovo-serbia", eventDate: "2023-02-27", title: "EU presents new normalization plan", description: "The EU presents its proposal for normalization of relations between Kosovo and Serbia, building on the Brussels Agreement framework.", category: "diplomatic", significance: "major" },
  { conflictSlug: "kosovo-serbia", eventDate: "2024-03-01", title: "Serbia rejects Kosovo's application to Council of Europe", description: "Serbia lobbies successfully to block Kosovo's membership application to the Council of Europe, reflecting continued diplomatic tensions.", category: "diplomatic", significance: "moderate" },
  { conflictSlug: "kosovo-serbia", eventDate: "2024-06-01", title: "NATO reinforces KFOR presence in northern Kosovo", description: "NATO increases its KFOR peacekeeping deployment in northern Kosovo following continued ethnic tensions and security incidents.", category: "military", significance: "moderate" },

  // ── Iran-Israel Shadow War ────────────────────────────────────
  { conflictSlug: "iran-israel-shadow-war", eventDate: "2024-04-01", title: "Israel strikes Iranian consulate in Damascus", description: "An Israeli airstrike destroys the Iranian consulate building in Damascus, killing senior IRGC commanders including General Zahedi.", category: "military", significance: "critical" },
  { conflictSlug: "iran-israel-shadow-war", eventDate: "2024-04-13", title: "Iran launches unprecedented direct attack on Israel", description: "Iran fires over 300 drones and missiles directly at Israel for the first time, most intercepted by Israeli, US, and allied defenses.", category: "military", significance: "critical" },
  { conflictSlug: "iran-israel-shadow-war", eventDate: "2024-10-01", title: "Iran launches second missile barrage at Israel", description: "Iran fires approximately 200 ballistic missiles at Israel in response to the killings of Hezbollah leader Nasrallah and Hamas leader Haniyeh.", category: "military", significance: "critical" },
  { conflictSlug: "iran-israel-shadow-war", eventDate: "2024-10-26", title: "Israel strikes military targets across Iran", description: "Israel conducts airstrikes on military targets in Iran, including air defense systems and missile production facilities.", category: "military", significance: "critical" },
  { conflictSlug: "iran-israel-shadow-war", eventDate: "2024-07-31", title: "Hamas leader Haniyeh assassinated in Tehran", description: "Hamas political leader Ismail Haniyeh is assassinated in Tehran, widely attributed to Israel, in a major escalation of the shadow war.", category: "military", significance: "critical" },

  // ── North Korea (Korean Peninsula) ────────────────────────────
  { conflictSlug: "north-korea-korean-peninsula", eventDate: "2022-03-24", title: "North Korea tests Hwasong-17 ICBM", description: "North Korea test-fires its largest intercontinental ballistic missile, the Hwasong-17, capable of reaching the continental United States.", category: "military", significance: "critical" },
  { conflictSlug: "north-korea-korean-peninsula", eventDate: "2023-11-21", title: "North Korea launches military spy satellite", description: "North Korea successfully places a military reconnaissance satellite into orbit using technology shared with Russia.", category: "military", significance: "major" },
  { conflictSlug: "north-korea-korean-peninsula", eventDate: "2024-01-15", title: "Kim Jong-un abandons reunification policy", description: "Kim Jong-un declares South Korea a 'hostile state,' officially abandoning the goal of peaceful reunification for the first time.", category: "political", significance: "critical" },
  { conflictSlug: "north-korea-korean-peninsula", eventDate: "2024-06-01", title: "Trash balloon and loudspeaker escalation", description: "North Korea sends hundreds of balloons carrying trash to South Korea, which responds by resuming loudspeaker propaganda broadcasts.", category: "political", significance: "moderate" },
  { conflictSlug: "north-korea-korean-peninsula", eventDate: "2024-10-15", title: "North Korean soldiers deployed to Russia", description: "Reports confirm North Korea has sent thousands of troops to Russia to support its war in Ukraine, marking a significant alliance deepening.", category: "military", significance: "critical" },

  // ── Armenia-Azerbaijan (Post-War) ─────────────────────────────
  { conflictSlug: "armenia-azerbaijan-post-war", eventDate: "2023-09-20", title: "Azerbaijan's military operation ends Karabakh conflict", description: "Azerbaijan launches a 24-hour military operation in Nagorno-Karabakh, forcing Armenian forces to surrender and dissolve the unrecognized republic.", category: "military", significance: "critical" },
  { conflictSlug: "armenia-azerbaijan-post-war", eventDate: "2023-10-01", title: "Mass exodus of Armenians from Karabakh", description: "Over 100,000 ethnic Armenians flee Nagorno-Karabakh to Armenia in a matter of days, creating a refugee crisis.", category: "humanitarian", significance: "critical" },
  { conflictSlug: "armenia-azerbaijan-post-war", eventDate: "2024-02-01", title: "Armenia pivots away from Russia", description: "Armenia formally suspends its participation in the CSTO military alliance and deepens ties with the EU and France.", category: "diplomatic", significance: "major" },
  { conflictSlug: "armenia-azerbaijan-post-war", eventDate: "2024-04-19", title: "Border village handover to Azerbaijan", description: "Armenia hands over four border villages to Azerbaijan as part of border delimitation agreements, sparking domestic protests.", category: "diplomatic", significance: "major" },
  { conflictSlug: "armenia-azerbaijan-post-war", eventDate: "2025-01-15", title: "Peace treaty negotiations stall over key provisions", description: "Despite progress, a comprehensive peace agreement remains elusive over disagreements on the Zangezur corridor and mutual defense pact concerns.", category: "diplomatic", significance: "moderate" },
];

export async function seedTimelineEvents(conflictMap: Map<string, string>) {
  console.log("  → Seeding timeline events...");

  const rows = eventsData.map((e) => {
    const conflictId = conflictMap.get(e.conflictSlug);
    if (!conflictId) throw new Error(`Unknown conflict slug: ${e.conflictSlug}`);
    return {
      conflictId,
      eventDate: e.eventDate,
      title: e.title,
      description: e.description,
      category: e.category,
      significance: e.significance,
      sources: e.sources ?? null,
    };
  });

  // Insert in batches to avoid parameter limit
  const batchSize = 50;
  let total = 0;
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    await db.insert(timelineEvents).values(batch);
    total += batch.length;
  }

  console.log(`  ✓ Inserted ${total} timeline events`);
}
