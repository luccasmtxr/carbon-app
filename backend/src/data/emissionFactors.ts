//asked ai to create an avarage from the values provided as reference

/**
 * Emission factors based on EPA’s GHG Emission Factors Hub and related sources.
 * Note: some values are approximate / converted for this project use cases.
 */

export const housingEmissionFactors = {
  electricity: 0.417, // kg CO2e per kWh (U.S. avg purchased electricity) ‒ approximate from EPA Hub :contentReference[oaicite:3]{index=3}
  naturalGas: 5.3, // kg CO2e per therm, combustion only ‒ from EPA stationary combustion tables :contentReference[oaicite:4]{index=4}
  fuelOil: 2.52, // kg CO2e per litre (approx, fuel oil #2 or similar) ‒ somewhat based on heating oil per gallon etc. ‒ approximate from fuel combustion tables :contentReference[oaicite:5]{index=5}
  lpg: 1.51, // kg CO2e per litre (propane / LPG) – an estimate from similar fuel combustion data :contentReference[oaicite:6]{index=6}
  waste: 1.8, // kg CO2e per kg of municipal solid waste (combustion or waste method) ‒ placeholder / proxy
  water: 0.0015, // kg CO2e per litre for water usage/distribution/treatment – proxy value
};

export const travelEmissionFactors = {
  vehicle: 0.192, // kg CO2e per km for a typical petrol/gasoline passenger car – estimate from transport fuel EF tables (combustion only) :contentReference[oaicite:7]{index=7}
  bus: 0.105, // kg CO2e per km – proxy from public transit emission tables
  metro: 0.06, // kg CO2e per km – proxy for metro / urban rail
  taxi: 0.2, // kg CO2e per km – likely higher due to inefficiencies
  rail: 0.041, // kg CO2e per km – long-distance rail, maybe less
  flying: 0.255, // kg CO2e per km (short / medium haul average) + multiplier for radiative forcing is handled in service logic
};

export const foodEmissionFactors = {
  // These are placeholders / estimates – we'd need LCA or FAO/EPA literature for more precise:
  red_meat: 0.00027, // kg CO2e per kcal ‒ placeholder
  white_meat: 0.00015, // etc.
  dairy: 0.00012,
  cereals: 0.00005,
  vegetables: 0.00002,
  fruit: 0.00003,
  oils: 0.0001,
  snacks: 0.0002,
  drinks: 0.00008,
};

export const productsEmissionFactors = {
  // Placeholder / approximate proxy values for kg CO2e per $ spending
  electrical: 0.6,
  household: 0.4,
  clothes: 0.8,
  medical: 0.5,
  recreational: 0.7,
  other: 0.3,
};

export const servicesEmissionFactors = {
  health: 0.4,
  finance: 0.3,
  recreation: 0.6,
  education: 0.2,
  vehicle: 0.5,
  communications: 0.25,
  other: 0.3,
};
