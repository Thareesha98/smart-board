// data/appointmentsData.js

// Helper functions for dates (copied from your JS)
export function getFutureDate(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
}

export function getPastDate(days) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
}

// Helper functions for random data (copied from your JS)
export function getRandomBoardingImage() {
    const images = [
        'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=200&q=80',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=200&q=80',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=200&q=80',
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=200&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=200&q=80'
    ];
    return images[Math.floor(Math.random() * images.length)];
}

export function getRandomContact() {
    const prefixes = ['77', '76', '71', '70', '78'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const number = Math.floor(1000000 + Math.random() * 9000000);
    return `+94 ${prefix} ${number.toString().substring(0,3)} ${number.toString().substring(3,6)}`;
}

export function getRandomOwner() {
    const owners = ['Mr. Silva', 'Ms. Perera', 'Mrs. Fernando', 'Mr. Bandara', 'Ms. Almeida', 'Mr. Rajapaksa'];
    return owners[Math.floor(Math.random() * owners.length)];
}

export function getRandomAddress() {
    const streets = ['University Ave', 'Galle Road', 'Main Street', 'Campus Road', 'Lake View', 'Garden Lane'];
    const numbers = ['123', '456', '789', '321', '654', '987'];
    const street = streets[Math.floor(Math.random() * streets.length)];
    const number = numbers[Math.floor(Math.random() * numbers.length)];
    return `${number} ${street}, Matara`;
}

export function getDurationText(duration) {
    const durations = {
        '3': '3 Months',
        '6': '6 Months',
        '12': '12 Months',
        '24': '24 Months'
    };
    return durations[duration] || `${duration} Months`;
}

// Sample Appointments Data (Modified to be exported)
export const sampleAppointments = [
    { id: 1, boardingName: "Sunshine Hostel", boardingId: "sunshine-hostel", image: getRandomBoardingImage(), date: getFutureDate(2), time: "14:00", status: "upcoming", contact: "+94 77 123 4567", owner: "Mr. Silva", address: "123 University Avenue, Matara", registered: false },
    { id: 2, boardingName: "City View Apartments", boardingId: "city-view", image: getRandomBoardingImage(), date: getFutureDate(5), time: "10:00", status: "upcoming", contact: "+94 76 234 5678", owner: "Ms. Perera", address: "456 Galle Road, Matara", registered: false },
    { id: 7, boardingName: "Garden View Rooms", boardingId: "garden-view", image: getRandomBoardingImage(), date: getPastDate(1), time: "15:00", status: "visited", contact: "+94 71 345 6789", owner: "Mr. Fernando", address: "789 Kamburugamuwa, Matara", registered: false },
    { id: 8, boardingName: "Ocean Breeze Hostel", boardingId: "ocean-breeze", image: getRandomBoardingImage(), date: getPastDate(2), time: "16:00", status: "visited", contact: "+94 72 567 8901", owner: "Mr. De Silva", address: "654 Beach Road, Matara", registered: false },
    { id: 12, boardingName: "University Heights", boardingId: "university-heights", image: getRandomBoardingImage(), date: getPastDate(3), time: "11:00", status: "selected", contact: "+94 70 456 7890", owner: "Mrs. Jayasinghe", address: "321 Campus Road, Matara", registered: false },
    { id: 14, boardingName: "Budget Stay Hostel", boardingId: "budget-stay", image: getRandomBoardingImage(), date: getPastDate(7), time: "09:00", status: "selected", contact: "+94 77 121 2121", owner: "Ms. Kumari", address: "111 Budget Street, Matara", registered: true, moveInDate: getFutureDate(5), contractDuration: "6", emergencyContact: "Rohan Kumari", emergencyPhone: "+94 77 999 8888" },
    { id: 15, boardingName: "Campus Comfort", boardingId: "campus-comfort", image: getRandomBoardingImage(), date: getPastDate(4), time: "09:00", status: "cancelled", contact: "+94 78 678 9012", owner: "Ms. Rathnayake", address: "987 University Lane, Matara", registered: false },
];