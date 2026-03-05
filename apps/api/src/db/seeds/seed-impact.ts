import { db } from "../index.js";
import { humanitarianImpact, economicImpact } from "../schema.js";

interface HumanitarianInput {
  conflictSlug: string;
  totalDeaths: number | null;
  civilianDeaths: number | null;
  combatantDeaths: number | null;
  idpCount: number | null;
  refugeeCount: number | null;
  asOfDate: string;
  source: string;
}

interface EconomicInput {
  conflictSlug: string;
  metricName: string;
  metricValue: string;
  metricUnit: string;
  asOfDate: string;
  source: string;
  notes?: string;
}

const humanitarianData: HumanitarianInput[] = [
  { conflictSlug: "russia-ukraine-war", totalDeaths: 500000, civilianDeaths: 30000, combatantDeaths: 470000, idpCount: 5900000, refugeeCount: 6500000, asOfDate: "2025-01-01", source: "UN OHCHR / UNHCR estimates" },
  { conflictSlug: "gaza-israel-conflict", totalDeaths: 46000, civilianDeaths: 35000, combatantDeaths: 11000, idpCount: 1900000, refugeeCount: 100000, asOfDate: "2025-01-01", source: "Gaza Health Ministry / UNRWA" },
  { conflictSlug: "sudan-civil-war", totalDeaths: 150000, civilianDeaths: 25000, combatantDeaths: 125000, idpCount: 9000000, refugeeCount: 2000000, asOfDate: "2025-01-01", source: "UN OCHA / ACLED" },
  { conflictSlug: "myanmar-civil-war", totalDeaths: 50000, civilianDeaths: 6000, combatantDeaths: 44000, idpCount: 2600000, refugeeCount: 1200000, asOfDate: "2025-01-01", source: "AAPP / UNHCR" },
  { conflictSlug: "haiti-crisis", totalDeaths: 10000, civilianDeaths: 8000, combatantDeaths: 2000, idpCount: 580000, refugeeCount: 200000, asOfDate: "2025-01-01", source: "UN Integrated Office in Haiti" },
  { conflictSlug: "drc-conflict-m23", totalDeaths: 20000, civilianDeaths: 7000, combatantDeaths: 13000, idpCount: 6900000, refugeeCount: 1000000, asOfDate: "2025-01-01", source: "UN OCHA / UNHCR" },
  { conflictSlug: "ethiopia-amhara-conflict", totalDeaths: 10000, civilianDeaths: 3000, combatantDeaths: 7000, idpCount: 2000000, refugeeCount: 50000, asOfDate: "2025-01-01", source: "Estimates from aid organizations" },
  { conflictSlug: "sahel-mali-burkina-faso", totalDeaths: 18000, civilianDeaths: 8000, combatantDeaths: 10000, idpCount: 3000000, refugeeCount: 500000, asOfDate: "2025-01-01", source: "ACLED / UNHCR" },
  { conflictSlug: "somalia-al-shabaab", totalDeaths: 12000, civilianDeaths: 5000, combatantDeaths: 7000, idpCount: 3800000, refugeeCount: 800000, asOfDate: "2025-01-01", source: "ACLED / UNHCR" },
  { conflictSlug: "yemen-civil-war", totalDeaths: 377000, civilianDeaths: 150000, combatantDeaths: 227000, idpCount: 4500000, refugeeCount: 100000, asOfDate: "2025-01-01", source: "UNDP / UN OCHA" },
  { conflictSlug: "syria-conflict", totalDeaths: 610000, civilianDeaths: 306000, combatantDeaths: 304000, idpCount: 6700000, refugeeCount: 5400000, asOfDate: "2025-01-01", source: "Syrian Observatory for Human Rights" },
  { conflictSlug: "nagorno-karabakh", totalDeaths: 8000, civilianDeaths: 200, combatantDeaths: 7800, idpCount: 120000, refugeeCount: 100000, asOfDate: "2023-10-01", source: "ICRC / Armenian government" },
  { conflictSlug: "india-pakistan-kashmir", totalDeaths: 100000, civilianDeaths: 47000, combatantDeaths: 53000, idpCount: 250000, refugeeCount: 40000, asOfDate: "2025-01-01", source: "JKCCS / South Asia Terrorism Portal" },
  { conflictSlug: "mozambique-cabo-delgado", totalDeaths: 5000, civilianDeaths: 3000, combatantDeaths: 2000, idpCount: 1000000, refugeeCount: 50000, asOfDate: "2025-01-01", source: "ACLED / UNHCR" },
  { conflictSlug: "taiwan-strait-tensions", totalDeaths: null, civilianDeaths: null, combatantDeaths: null, idpCount: null, refugeeCount: null, asOfDate: "2025-01-01", source: "No armed conflict — potential escalation scenario" },
  { conflictSlug: "south-china-sea", totalDeaths: null, civilianDeaths: null, combatantDeaths: null, idpCount: null, refugeeCount: null, asOfDate: "2025-01-01", source: "No armed conflict — territorial maritime dispute" },
  { conflictSlug: "kosovo-serbia", totalDeaths: null, civilianDeaths: null, combatantDeaths: null, idpCount: null, refugeeCount: null, asOfDate: "2025-01-01", source: "No active armed conflict — political tensions" },
  { conflictSlug: "iran-israel-shadow-war", totalDeaths: 2500, civilianDeaths: 500, combatantDeaths: 2000, idpCount: null, refugeeCount: null, asOfDate: "2025-01-01", source: "Estimates from various sources" },
  { conflictSlug: "north-korea-korean-peninsula", totalDeaths: null, civilianDeaths: null, combatantDeaths: null, idpCount: null, refugeeCount: null, asOfDate: "2025-01-01", source: "No active armed conflict — standoff with nuclear dimension" },
  { conflictSlug: "armenia-azerbaijan-post-war", totalDeaths: 300, civilianDeaths: 50, combatantDeaths: 250, idpCount: 8000, refugeeCount: 100000, asOfDate: "2025-01-01", source: "ICRC / Armenian government" },
];

const economicData: EconomicInput[] = [
  // Russia-Ukraine War
  { conflictSlug: "russia-ukraine-war", metricName: "Ukraine GDP Loss", metricValue: "200.0000", metricUnit: "USD Billion", asOfDate: "2024-12-01", source: "World Bank", notes: "Cumulative GDP loss since invasion" },
  { conflictSlug: "russia-ukraine-war", metricName: "Global Energy Price Spike", metricValue: "40.0000", metricUnit: "Percent Increase", asOfDate: "2022-06-01", source: "IEA", notes: "Peak energy price increase in Europe due to Russian gas cutoff" },
  { conflictSlug: "russia-ukraine-war", metricName: "Western Sanctions on Russia", metricValue: "300.0000", metricUnit: "USD Billion Frozen", asOfDate: "2024-06-01", source: "EU/US Treasury", notes: "Russian central bank assets frozen by Western nations" },
  { conflictSlug: "russia-ukraine-war", metricName: "Ukraine Reconstruction Cost Estimate", metricValue: "486.0000", metricUnit: "USD Billion", asOfDate: "2024-02-01", source: "World Bank / EU / Ukraine", notes: "Estimated cost to rebuild Ukraine over 10 years" },

  // Gaza-Israel Conflict
  { conflictSlug: "gaza-israel-conflict", metricName: "Gaza GDP Destruction", metricValue: "18.5000", metricUnit: "USD Billion", asOfDate: "2024-12-01", source: "World Bank", notes: "Destruction of nearly all economic infrastructure in Gaza" },
  { conflictSlug: "gaza-israel-conflict", metricName: "Israeli Defense Spending Surge", metricValue: "25.0000", metricUnit: "USD Billion", asOfDate: "2024-06-01", source: "Israeli Finance Ministry", notes: "Supplementary defense budget for the war" },
  { conflictSlug: "gaza-israel-conflict", metricName: "Red Sea Trade Disruption Cost", metricValue: "100.0000", metricUnit: "USD Billion", asOfDate: "2024-12-01", source: "IMF", notes: "Estimated global trade cost from Houthi attacks disrupting Red Sea shipping" },

  // Sudan Civil War
  { conflictSlug: "sudan-civil-war", metricName: "Sudan GDP Decline", metricValue: "40.0000", metricUnit: "Percent Decline", asOfDate: "2024-06-01", source: "World Bank", notes: "GDP contraction since war began" },
  { conflictSlug: "sudan-civil-war", metricName: "Humanitarian Aid Required", metricValue: "4.1000", metricUnit: "USD Billion", asOfDate: "2024-12-01", source: "UN OCHA", notes: "2024 humanitarian response plan funding requirement" },
  { conflictSlug: "sudan-civil-war", metricName: "Agricultural Output Loss", metricValue: "70.0000", metricUnit: "Percent Decline", asOfDate: "2024-06-01", source: "FAO", notes: "Decline in agricultural production in conflict-affected areas" },

  // Myanmar Civil War
  { conflictSlug: "myanmar-civil-war", metricName: "Myanmar GDP Decline", metricValue: "18.0000", metricUnit: "Percent Below Pre-Coup", asOfDate: "2024-06-01", source: "World Bank", notes: "Economy still below pre-coup levels" },
  { conflictSlug: "myanmar-civil-war", metricName: "Foreign Investment Flight", metricValue: "3.5000", metricUnit: "USD Billion Withdrawn", asOfDate: "2023-12-01", source: "UNCTAD", notes: "Cumulative FDI withdrawal since coup" },
  { conflictSlug: "myanmar-civil-war", metricName: "Western Sanctions on Junta", metricValue: "1.2000", metricUnit: "USD Billion Assets Frozen", asOfDate: "2024-06-01", source: "US/EU Sanctions Lists", notes: "Targeted sanctions on junta leaders and military-linked enterprises" },

  // Haiti Crisis
  { conflictSlug: "haiti-crisis", metricName: "Haiti GDP Per Capita", metricValue: "1748.0000", metricUnit: "USD", asOfDate: "2024-01-01", source: "World Bank", notes: "Among the lowest in the Western Hemisphere" },
  { conflictSlug: "haiti-crisis", metricName: "Economic Loss from Gang Control", metricValue: "2.5000", metricUnit: "USD Billion", asOfDate: "2024-06-01", source: "IDB Estimates", notes: "Estimated annual economic output lost to gang-controlled areas" },
  { conflictSlug: "haiti-crisis", metricName: "Humanitarian Aid Required", metricValue: "0.6740", metricUnit: "USD Billion", asOfDate: "2024-12-01", source: "UN OCHA", notes: "2024 Humanitarian needs overview" },

  // DRC Conflict
  { conflictSlug: "drc-conflict-m23", metricName: "Eastern DRC Mining Revenue Loss", metricValue: "1.0000", metricUnit: "USD Billion Annually", asOfDate: "2024-06-01", source: "UN Group of Experts", notes: "Lost mining revenue due to conflict and illegal extraction" },
  { conflictSlug: "drc-conflict-m23", metricName: "Humanitarian Aid Gap", metricValue: "2.6000", metricUnit: "USD Billion", asOfDate: "2024-12-01", source: "UN OCHA", notes: "Funding shortfall for DRC humanitarian response" },
  { conflictSlug: "drc-conflict-m23", metricName: "Conflict Mineral Trade", metricValue: "0.5000", metricUnit: "USD Billion", asOfDate: "2024-01-01", source: "IPIS Research", notes: "Estimated annual trade in conflict minerals from eastern DRC" },

  // Ethiopia Amhara
  { conflictSlug: "ethiopia-amhara-conflict", metricName: "Ethiopia GDP Growth Impact", metricValue: "-2.0000", metricUnit: "Percentage Points", asOfDate: "2024-06-01", source: "IMF", notes: "Estimated GDP growth reduction due to Amhara and other conflicts" },
  { conflictSlug: "ethiopia-amhara-conflict", metricName: "Humanitarian Aid Required (Ethiopia)", metricValue: "3.2000", metricUnit: "USD Billion", asOfDate: "2024-12-01", source: "UN OCHA", notes: "Total Ethiopia humanitarian needs" },
  { conflictSlug: "ethiopia-amhara-conflict", metricName: "Agricultural Disruption", metricValue: "30.0000", metricUnit: "Percent of Amhara Farmland", asOfDate: "2024-06-01", source: "FAO", notes: "Portion of Amhara region farmland affected by conflict" },

  // Sahel
  { conflictSlug: "sahel-mali-burkina-faso", metricName: "Sahel Region GDP Loss", metricValue: "12.0000", metricUnit: "USD Billion Cumulative", asOfDate: "2024-06-01", source: "African Development Bank", notes: "Combined GDP loss across Mali, Burkina Faso, Niger since 2020" },
  { conflictSlug: "sahel-mali-burkina-faso", metricName: "French Military Operation Cost", metricValue: "1.1000", metricUnit: "USD Billion Annual", asOfDate: "2022-01-01", source: "French Ministry of Defense", notes: "Annual cost of Operation Barkhane before withdrawal" },
  { conflictSlug: "sahel-mali-burkina-faso", metricName: "Wagner Group Contracts Value", metricValue: "0.2000", metricUnit: "USD Billion", asOfDate: "2024-01-01", source: "Estimates from investigative reporting", notes: "Estimated value of Wagner/Africa Corps contracts in Sahel states" },

  // Somalia
  { conflictSlug: "somalia-al-shabaab", metricName: "Al-Shabaab Revenue (Taxation)", metricValue: "0.1800", metricUnit: "USD Billion Annual", asOfDate: "2024-01-01", source: "Hiraal Institute", notes: "Al-Shabaab generates more domestic revenue than the federal government" },
  { conflictSlug: "somalia-al-shabaab", metricName: "Humanitarian Aid Required", metricValue: "1.8000", metricUnit: "USD Billion", asOfDate: "2024-12-01", source: "UN OCHA", notes: "2024 humanitarian response plan for Somalia" },
  { conflictSlug: "somalia-al-shabaab", metricName: "Piracy and Maritime Security Cost", metricValue: "0.3000", metricUnit: "USD Billion Annual", asOfDate: "2024-06-01", source: "One Earth Future", notes: "Cost of international anti-piracy operations and insurance premiums" },

  // Yemen
  { conflictSlug: "yemen-civil-war", metricName: "Yemen GDP Contraction", metricValue: "50.0000", metricUnit: "Percent Since 2015", asOfDate: "2024-06-01", source: "World Bank", notes: "Total economic contraction since Saudi intervention" },
  { conflictSlug: "yemen-civil-war", metricName: "Red Sea Shipping Insurance Premiums", metricValue: "1000.0000", metricUnit: "Percent Increase", asOfDate: "2024-02-01", source: "Lloyd's of London", notes: "War risk premiums for Red Sea transit increased tenfold" },
  { conflictSlug: "yemen-civil-war", metricName: "Suez Canal Revenue Loss (Egypt)", metricValue: "6.0000", metricUnit: "USD Billion Annual", asOfDate: "2024-06-01", source: "Suez Canal Authority", notes: "Egypt revenue decline as ships reroute around Africa" },

  // Syria
  { conflictSlug: "syria-conflict", metricName: "Syria GDP Loss (Total War)", metricValue: "530.0000", metricUnit: "USD Billion", asOfDate: "2024-12-01", source: "World Bank / ESCWA", notes: "Total estimated economic loss over the full conflict period" },
  { conflictSlug: "syria-conflict", metricName: "Reconstruction Cost Estimate", metricValue: "400.0000", metricUnit: "USD Billion", asOfDate: "2025-01-01", source: "World Bank", notes: "Estimated reconstruction cost for post-Assad Syria" },
  { conflictSlug: "syria-conflict", metricName: "Sanctions Frozen Assets", metricValue: "50.0000", metricUnit: "USD Billion", asOfDate: "2024-12-01", source: "US/EU Sanctions", notes: "Syrian state and elite assets frozen under Caesar Act and other sanctions" },

  // Nagorno-Karabakh
  { conflictSlug: "nagorno-karabakh", metricName: "Azerbaijan Military Spending (2020)", metricValue: "2.7000", metricUnit: "USD Billion", asOfDate: "2020-09-01", source: "SIPRI", notes: "Military budget that enabled modern drone warfare capabilities" },
  { conflictSlug: "nagorno-karabakh", metricName: "Turkey Bayraktar Drone Sales Boost", metricValue: "3.0000", metricUnit: "USD Billion Orders", asOfDate: "2023-06-01", source: "Turkish Defense Industry", notes: "Global TB2 drone orders after Karabakh success demonstration" },
  { conflictSlug: "nagorno-karabakh", metricName: "Armenian Refugee Resettlement Cost", metricValue: "0.5000", metricUnit: "USD Billion", asOfDate: "2024-01-01", source: "Armenian Government", notes: "Cost of resettling 100,000+ Karabakh refugees in Armenia" },

  // India-Pakistan Kashmir
  { conflictSlug: "india-pakistan-kashmir", metricName: "Indian Defense Budget", metricValue: "74.0000", metricUnit: "USD Billion", asOfDate: "2024-04-01", source: "Indian Ministry of Defence", notes: "India's total defense budget, partially driven by Pakistan/China threats" },
  { conflictSlug: "india-pakistan-kashmir", metricName: "Kashmir Tourism Revenue Loss", metricValue: "1.2000", metricUnit: "USD Billion Annual", asOfDate: "2024-06-01", source: "J&K Tourism Dept", notes: "Estimated annual tourism revenue lost to security situation" },
  { conflictSlug: "india-pakistan-kashmir", metricName: "LoC Fencing and Security Cost", metricValue: "5.0000", metricUnit: "USD Billion Cumulative", asOfDate: "2024-01-01", source: "Indian Home Ministry", notes: "Cumulative cost of LoC fencing, surveillance, and security infrastructure" },

  // Mozambique
  { conflictSlug: "mozambique-cabo-delgado", metricName: "TotalEnergies LNG Project Suspension Loss", metricValue: "20.0000", metricUnit: "USD Billion", asOfDate: "2024-01-01", source: "TotalEnergies", notes: "Value of suspended LNG project investment" },
  { conflictSlug: "mozambique-cabo-delgado", metricName: "Humanitarian Cost", metricValue: "0.4500", metricUnit: "USD Billion", asOfDate: "2024-12-01", source: "UN OCHA", notes: "Humanitarian response plan for Cabo Delgado" },
  { conflictSlug: "mozambique-cabo-delgado", metricName: "Rwandan Military Deployment Cost", metricValue: "0.1000", metricUnit: "USD Billion Annual", asOfDate: "2024-06-01", source: "Estimates", notes: "Estimated annual cost of Rwandan force deployment" },

  // Taiwan Strait
  { conflictSlug: "taiwan-strait-tensions", metricName: "Taiwan Semiconductor Industry Value", metricValue: "115.0000", metricUnit: "USD Billion Annual Revenue", asOfDate: "2024-12-01", source: "TSIA", notes: "Taiwan produces ~60% of global semiconductor output" },
  { conflictSlug: "taiwan-strait-tensions", metricName: "Estimated Global GDP Loss if Conflict", metricValue: "2500.0000", metricUnit: "USD Billion", asOfDate: "2024-06-01", source: "Bloomberg Economics", notes: "Estimated first-year global GDP impact of a Taiwan conflict" },
  { conflictSlug: "taiwan-strait-tensions", metricName: "Taiwan Defense Budget", metricValue: "19.2000", metricUnit: "USD Billion", asOfDate: "2024-01-01", source: "Taiwan Ministry of National Defense", notes: "Record defense spending including asymmetric warfare capabilities" },

  // South China Sea
  { conflictSlug: "south-china-sea", metricName: "Annual Trade Through SCS", metricValue: "3400.0000", metricUnit: "USD Billion", asOfDate: "2024-01-01", source: "CSIS / AMTI", notes: "Approximately one-third of global maritime trade transits the South China Sea" },
  { conflictSlug: "south-china-sea", metricName: "China Island-Building Investment", metricValue: "10.0000", metricUnit: "USD Billion", asOfDate: "2024-06-01", source: "AMTI Estimates", notes: "Estimated cost of China's artificial island construction and militarization" },
  { conflictSlug: "south-china-sea", metricName: "Oil and Gas Reserves", metricValue: "11.0000", metricUnit: "Billion Barrels Oil Equivalent", asOfDate: "2024-01-01", source: "EIA", notes: "Estimated proven and probable oil and gas reserves in the SCS" },

  // Kosovo-Serbia
  { conflictSlug: "kosovo-serbia", metricName: "Kosovo GDP", metricValue: "9.4000", metricUnit: "USD Billion", asOfDate: "2024-01-01", source: "World Bank", notes: "Kosovo remains one of the poorest countries in Europe" },
  { conflictSlug: "kosovo-serbia", metricName: "EU Integration Revenue at Risk", metricValue: "1.5000", metricUnit: "USD Billion", asOfDate: "2024-06-01", source: "European Commission", notes: "Estimated annual EU funding both countries could access with normalization" },
  { conflictSlug: "kosovo-serbia", metricName: "KFOR Peacekeeping Annual Cost", metricValue: "0.2000", metricUnit: "USD Billion", asOfDate: "2024-01-01", source: "NATO", notes: "Annual cost of maintaining KFOR mission in Kosovo" },

  // Iran-Israel Shadow War
  { conflictSlug: "iran-israel-shadow-war", metricName: "Iranian Proxy Network Funding", metricValue: "2.0000", metricUnit: "USD Billion Annual", asOfDate: "2024-01-01", source: "US State Department", notes: "Iran's estimated annual funding to Hezbollah, Hamas, Houthis, and Iraqi militias" },
  { conflictSlug: "iran-israel-shadow-war", metricName: "Israel Iron Dome / Defense Costs", metricValue: "5.0000", metricUnit: "USD Billion", asOfDate: "2024-12-01", source: "Israeli MoD", notes: "Cost of intercepting Iranian and proxy attacks in 2024" },
  { conflictSlug: "iran-israel-shadow-war", metricName: "Iran Sanctions Economic Impact", metricValue: "150.0000", metricUnit: "USD Billion Lost Revenue", asOfDate: "2024-06-01", source: "IMF", notes: "Estimated cumulative economic impact of US/EU sanctions on Iran" },

  // North Korea
  { conflictSlug: "north-korea-korean-peninsula", metricName: "North Korea Nuclear Program Cost", metricValue: "3.0000", metricUnit: "USD Billion Cumulative", asOfDate: "2024-01-01", source: "RAND Corporation", notes: "Estimated total investment in nuclear weapons program" },
  { conflictSlug: "north-korea-korean-peninsula", metricName: "Sanctions Economic Impact on DPRK", metricValue: "4.0000", metricUnit: "USD Billion Annual Loss", asOfDate: "2024-01-01", source: "KOTRA (Korea Trade-Investment Promotion Agency)", notes: "Estimated annual economic loss from UN and US sanctions" },
  { conflictSlug: "north-korea-korean-peninsula", metricName: "US Forces Korea Annual Cost", metricValue: "4.5000", metricUnit: "USD Billion", asOfDate: "2024-01-01", source: "US DoD", notes: "Annual cost of maintaining ~28,500 US troops in South Korea" },

  // Armenia-Azerbaijan Post-War
  { conflictSlug: "armenia-azerbaijan-post-war", metricName: "Azerbaijan Karabakh Reconstruction", metricValue: "5.0000", metricUnit: "USD Billion", asOfDate: "2024-06-01", source: "Azerbaijani Government", notes: "Planned investment in rebuilding recaptured Karabakh territories" },
  { conflictSlug: "armenia-azerbaijan-post-war", metricName: "Armenia GDP Growth Impact", metricValue: "8.7000", metricUnit: "Percent Growth (2023)", asOfDate: "2024-01-01", source: "IMF", notes: "Paradoxical GDP growth driven by Russian money and tech worker influx" },
  { conflictSlug: "armenia-azerbaijan-post-war", metricName: "Zangezur Corridor Infrastructure Cost", metricValue: "0.8000", metricUnit: "USD Billion", asOfDate: "2024-06-01", source: "Estimates", notes: "Estimated infrastructure cost for proposed transport corridor" },
];

export async function seedImpact(conflictMap: Map<string, string>) {
  console.log("  → Seeding humanitarian impact data...");

  const humanRows = humanitarianData.map((h) => {
    const conflictId = conflictMap.get(h.conflictSlug);
    if (!conflictId) throw new Error(`Unknown conflict slug: ${h.conflictSlug}`);
    return {
      conflictId,
      totalDeaths: h.totalDeaths,
      civilianDeaths: h.civilianDeaths,
      combatantDeaths: h.combatantDeaths,
      idpCount: h.idpCount,
      refugeeCount: h.refugeeCount,
      asOfDate: h.asOfDate,
      source: h.source,
    };
  });

  await db.insert(humanitarianImpact).values(humanRows);
  console.log(`  ✓ Inserted ${humanRows.length} humanitarian impact records`);

  console.log("  → Seeding economic impact data...");

  const econRows = economicData.map((e) => {
    const conflictId = conflictMap.get(e.conflictSlug);
    if (!conflictId) throw new Error(`Unknown conflict slug: ${e.conflictSlug}`);
    return {
      conflictId,
      metricName: e.metricName,
      metricValue: e.metricValue,
      metricUnit: e.metricUnit,
      asOfDate: e.asOfDate,
      source: e.source,
      notes: e.notes ?? null,
    };
  });

  const batchSize = 50;
  let total = 0;
  for (let i = 0; i < econRows.length; i += batchSize) {
    const batch = econRows.slice(i, i + batchSize);
    await db.insert(economicImpact).values(batch);
    total += batch.length;
  }
  console.log(`  ✓ Inserted ${total} economic impact records`);
}
