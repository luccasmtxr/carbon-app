//asked ai to create an avarage from the values provided as reference

export const housingEmissionFactors = {
  electricity: 0.417,     // kg CO2e per kWh
  naturalGas: 5.3,        // kg CO2e per therm
  fuelOil: 2.52,          // kg CO2e per litre
  lpg: 1.51,              // kg CO2e per litre
  waste: 1.8,             // kg CO2e per kg
  water: 0.0015           // kg CO2e per litre (distribution + treatment)
};

export const travelEmissionFactors = {
  vehicle: 0.192,  // kg CO2e per km (typical petrol car)
  bus: 0.105,      // kg CO2e per km
  metro: 0.060,    // kg CO2e per km
  taxi: 0.200,     // kg CO2e per km
  rail: 0.041,     // kg CO2e per km
  flying: 0.255    // kg CO2e per km (short/medium haul avg)
};

export const foodEmissionFactors = {
  red_meat: 0.00027,     // kg CO2e per kCal
  white_meat: 0.00015,   // kg CO2e per kCal
  dairy: 0.00012,        // kg CO2e per kCal
  cereals: 0.00005,      // kg CO2e per kCal
  vegetables: 0.00002,   // kg CO2e per kCal
  fruit: 0.00003,        // kg CO2e per kCal
  oils: 0.00010,         // kg CO2e per kCal
  snacks: 0.00020,       // kg CO2e per kCal
  drinks: 0.00008        // kg CO2e per kCal
};

export const productsEmissionFactors = {
  electrical: 0.6,    // kg CO2e per $
  household: 0.4,     // kg CO2e per $
  clothes: 0.8,       // kg CO2e per $
  medical: 0.5,       // kg CO2e per $
  recreational: 0.7,  // kg CO2e per $
  other: 0.3          // kg CO2e per $
};
