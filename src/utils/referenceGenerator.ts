function generateRefNumber() {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 10000); 
  return `WYF-${timestamp}-${randomNum}`;
}

export default {generateRefNumber};