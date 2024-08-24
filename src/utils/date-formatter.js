export function formatDate(dateString) {
    // Create a new Date object from the input string
    let date = new Date(dateString);
    
    // Define an array with month names
    let monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    // Extract the day, month, and year from the Date object
    let day = date.getDate();
    let month = monthNames[date.getMonth()];
    let year = date.getFullYear();
    
    // Format the date as "3 November 2023"
    let formattedDate = `${day} ${month} ${year}`;
    
    return formattedDate;
}
