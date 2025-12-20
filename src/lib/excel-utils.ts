import * as XLSX from 'xlsx';

/**
 * Excel utility functions for storing and reading data
 */

// Type definitions
export interface BookingData {
  type: 'tour' | 'property';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  selectedItemName?: string;
  date?: string;
  checkIn?: string;
  checkOut?: string;
  guests: string;
  totalPrice: number;
  specialRequests?: string;
  bookingDate: string;
}

export interface TourData {
  id: number;
  title: string;
  location: string;
  duration: string;
  groupSize: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string | null;
  category: string;
}

export interface VillaData {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  amenities: string[];
  featured: boolean;
}

export interface ExperienceData {
  id: number;
  category: string;
  title: string;
  description: string;
  duration: string;
  groupSize: string;
  price: number;
  rating: number;
  image: string;
}

/**
 * Export booking data to an Excel file
 */
export async function exportBookingToExcel(bookingData: BookingData): Promise<void> {
  try {
    // Try to load existing bookings from localStorage or create new array
    const existingBookings = loadBookingsFromStorage();
    
    // Add new booking to the array
    const allBookings = [...existingBookings, bookingData];
    
    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(allBookings);
    
    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Bookings');
    
    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `bookings_${timestamp}.xlsx`;
    
    // Write file
    XLSX.writeFile(workbook, filename);
    
    // Save to localStorage for persistence
    saveBookingsToStorage(allBookings);
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    throw error;
  }
}

/**
 * Export all bookings to Excel (useful for admin/export feature)
 */
export function exportAllBookingsToExcel(): void {
  const bookings = loadBookingsFromStorage();
  
  if (bookings.length === 0) {
    throw new Error('No bookings to export');
  }
  
  const worksheet = XLSX.utils.json_to_sheet(bookings);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'All Bookings');
  
  const timestamp = new Date().toISOString().split('T')[0];
  XLSX.writeFile(workbook, `all_bookings_${timestamp}.xlsx`);
}

/**
 * Load data from an Excel file (for catalog data like tours, villas, experiences)
 */
export async function loadDataFromExcel<T>(filePath: string): Promise<T[]> {
  try {
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    // Get the first sheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const data = XLSX.utils.sheet_to_json<T>(worksheet);
    return data;
  } catch (error) {
    console.error(`Error loading data from ${filePath}:`, error);
    throw error;
  }
}

/**
 * Load data from a user-uploaded Excel file
 */
export async function loadDataFromFile<T>(file: File): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json<T>(worksheet);
        
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Convert array of data to Excel and download
 */
export function exportArrayToExcel<T extends Record<string, any>>(
  data: T[],
  filename: string,
  sheetName: string = 'Sheet1'
): void {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, filename);
}

// Local storage helpers for bookings persistence
const STORAGE_KEY = 'vikurdistan_bookings';

function saveBookingsToStorage(bookings: BookingData[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  } catch (error) {
    console.warn('Could not save bookings to localStorage:', error);
  }
}

function loadBookingsFromStorage(): BookingData[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Could not load bookings from localStorage:', error);
    return [];
  }
}

/**
 * Get all stored bookings from localStorage
 */
export function getAllStoredBookings(): BookingData[] {
  return loadBookingsFromStorage();
}

/**
 * Clear all stored bookings from localStorage
 */
export function clearStoredBookings(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Could not clear bookings from localStorage:', error);
  }
}

