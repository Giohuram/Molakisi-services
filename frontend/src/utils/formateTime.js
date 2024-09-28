export const formateTime = (time) => {
  const options = { hour: '2-digit', minute: '2-digit', hour12: false }; // 24-hour format
  return new Date(`1970-01-01T${time}:00`).toLocaleTimeString('fr-FR', options);
};
