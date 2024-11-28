export const convertDate = (dateString: string): string => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
  
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure 2 digits for minutes
    const isPM = hours >= 12;
    const formattedHour = hours % 12 === 0 ? 12 : hours % 12; // Convert 24-hour to 12-hour format
    const period = isPM ? 'PM' : 'AM';
  
    return `${day} ${month} ${year} ${formattedHour}:${minutes}${period}`;
   }