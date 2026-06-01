// Cumulative COVID-19 deaths per 100,000 residents by U.S. state.
// Source: CDC / Johns Hopkins cumulative mortality data (pandemic totals, rounded).
// Used to provide geographic context for where the pandemic hit hardest.
export const stateDeathsPer100k: Record<string, number> = {
  Alabama: 423, Alaska: 192, Arizona: 449, Arkansas: 410, California: 274,
  Colorado: 251, Connecticut: 333, Delaware: 333, "District of Columbia": 246,
  Florida: 401, Georgia: 392, Hawaii: 130, Idaho: 295, Illinois: 326,
  Indiana: 392, Iowa: 343, Kansas: 354, Kentucky: 416, Louisiana: 423,
  Maine: 213, Maryland: 281, Massachusetts: 357, Michigan: 422, Minnesota: 281,
  Mississippi: 467, Missouri: 392, Montana: 339, Nebraska: 252, Nevada: 392,
  "New Hampshire": 233, "New Jersey": 396, "New Mexico": 432, "New York": 411,
  "North Carolina": 277, "North Dakota": 343, Ohio: 358, Oklahoma: 420,
  Oregon: 224, Pennsylvania: 380, "Rhode Island": 348, "South Carolina": 393,
  "South Dakota": 369, Tennessee: 444, Texas: 332, Utah: 174, Vermont: 168,
  Virginia: 280, Washington: 211, "West Virginia": 449, Wisconsin: 296,
  Wyoming: 339,
};

export const GEO_URL =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
