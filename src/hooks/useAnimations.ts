// Utility function to create floating elements
export const createFloatingElements = (count: number = 5) => {
  const elements = [];
  for (let i = 0; i < count; i++) {
    elements.push({
      id: i,
      size: Math.random() * 20 + 10,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 6,
      color: `hsl(${45 + Math.random() * 30}, 70%, 60%)`
    });
  }
  return elements;
};

