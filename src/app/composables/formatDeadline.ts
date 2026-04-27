
/**
 * Formats a deadline string into a human-readable relative time string.
 * @param deadlineString - The deadline date string to format
 * @param now - Optional reference date (defaults to current date/time)
 * @returns A formatted string describing when the deadline is
 */

export default function formatDeadline(deadlineString:string, now:Date = new Date()) {
  const deadline = new Date(deadlineString);
  // console.log(deadline);
  
  const diffMs:number = deadline.getTime() - now.getTime();
  // console.log(diffMs);
  const diffMinutes:number  = Math.round(diffMs / (1000 * 60));
  const diffHours:number  = Math.round(diffMs / (1000 * 60 * 60));
  const diffDays:number  = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  const deadlineDate = deadline.toDateString();
  const nowDate = now.toDateString();
  
  if (deadlineDate === nowDate) {
    if (diffHours > 0) return `Today at ${deadline.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    if(diffMinutes>0){
      return `${Math.abs(diffMinutes)} minutes left`;
      
    }else{
      return `${Math.abs(diffMinutes)} minutes ago`;
      
    }
  }
  
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  
  if (deadline.toDateString() === tomorrow.toDateString()) {
    return `Tomorrow at ${deadline.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  if (deadline.toDateString() === yesterday.toDateString()) {
    return `Yesterday at ${deadline.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  if (Math.abs(diffDays) <= 7) {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    return rtf.format(diffDays, 'day'); // e.g., "in 3 days"
  }
  
  return `${deadline.toLocaleDateString()} at ${deadline.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}


export const timeDistance =(timeGiven:Date | string):number=>{
  const now =new Date()
  const time = new Date(timeGiven);

  
  return time.getTime() - now.getTime();
  
}