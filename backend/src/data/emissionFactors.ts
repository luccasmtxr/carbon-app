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