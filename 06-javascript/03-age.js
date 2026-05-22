// Add your code here
const calculateAge = function (dateString) {
  const birthDate = new Date(dateString);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  if (age > 125) {
    return "Are you sure you are more than 125 years old?";
  }

  if (age === 1) {
    return "You are 1 year old";
  }

  if (isNaN(age)) {
    return "Error: Invalid date format";
  }
  if (age < 0) {
    return "Error: Birth date cannot be in the future";
  }

  if (age === 0) {
    return "You are not yet a year old";
  }

  return `You are ${age} years old`;
};

console.log(calculateAge("2000-07-01"));
// You are 25 years old
console.log(calculateAge("1988-05-18"));
// You are 38 years old
console.log(calculateAge("2025-01-01"));
// You are 1 year old
console.log(calculateAge("2190-01-01"));
// Error: Birth date cannot be in the future
console.log(calculateAge("1800-01-01"));
// Are you sure you are more than 125 years old?
console.log(calculateAge("invalid-date"));
// Error: Invalid date format

// Note: These calculations were done on May 18, 2026.
