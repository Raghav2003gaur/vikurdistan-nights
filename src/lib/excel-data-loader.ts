/**
 * Example utility for loading catalog data (Tours, Villas, Experiences) from Excel files
 * 
 * To use this:
 * 1. Place Excel files in the public/data/ folder
 * 2. Ensure Excel files have the correct column structure
 * 3. Use the load functions in your components
 */

import { loadDataFromExcel, type TourData, type VillaData, type ExperienceData } from './excel-utils';

/**
 * Load tours from Excel file
 * Place your tours.xlsx file in public/data/tours.xlsx
 */
export async function loadToursFromExcel(): Promise<TourData[]> {
  try {
    const tours = await loadDataFromExcel<TourData>('/data/tours.xlsx');
    return tours;
  } catch (error) {
    console.error('Failed to load tours from Excel, using fallback data:', error);
    // Return empty array or fallback data
    return [];
  }
}

/**
 * Load villas from Excel file
 * Place your villas.xlsx file in public/data/villas.xlsx
 */
export async function loadVillasFromExcel(): Promise<VillaData[]> {
  try {
    const villas = await loadDataFromExcel<VillaData>('/data/villas.xlsx');
    return villas;
  } catch (error) {
    console.error('Failed to load villas from Excel, using fallback data:', error);
    return [];
  }
}

/**
 * Load experiences from Excel file
 * Place your experiences.xlsx file in public/data/experiences.xlsx
 */
export async function loadExperiencesFromExcel(): Promise<ExperienceData[]> {
  try {
    const experiences = await loadDataFromExcel<ExperienceData>('/data/experiences.xlsx');
    return experiences;
  } catch (error) {
    console.error('Failed to load experiences from Excel, using fallback data:', error);
    return [];
  }
}

/**
 * Example usage in a React component:
 * 
 * import { useState, useEffect } from 'react';
 * import { loadToursFromExcel } from '@/lib/excel-data-loader';
 * 
 * const ToursPage = () => {
 *   const [tours, setTours] = useState<TourData[]>([]);
 * 
 *   useEffect(() => {
 *     loadToursFromExcel().then(setTours);
 *   }, []);
 * 
 *   return (
 *     // Render tours
 *   );
 * };
 */

