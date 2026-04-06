export const generateMockTransactions = () => {
  const categories = [
    { name: 'Food & Dining', type: 'expense' },
    { name: 'Rent', type: 'expense' },
    { name: 'Salary', type: 'income' },
    { name: 'Transportation', type: 'expense' },
    { name: 'Entertainment', type: 'expense' },
    { name: 'Freelance', type: 'income' },
    { name: 'Utilities', type: 'expense' }
  ];

  const transactions = [];
  const now = new Date();
  
  // Generate reliable mock data for the last 30 days
  for (let i = 0; i < 25; i++) {
    const randomDate = new Date(now.getTime() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000);
    const categoryName = categories[Math.floor(Math.random() * categories.length)];
    const id = Math.random().toString(36).substr(2, 9);
    
    // Amount range based on type
    let amount = 0;
    if (categoryName.type === 'income') {
      amount = Math.floor(Math.random() * 2000) + 500; // 500 to 2500
    } else {
      amount = Math.floor(Math.random() * 150) + 10; // 10 to 160
      if (categoryName.name === 'Rent') amount = Math.floor(Math.random() * 500) + 1000;
    }

    transactions.push({
      id,
      date: randomDate.toISOString().split('T')[0],
      amount,
      category: categoryName.name,
      type: categoryName.type,
      description: `Payment for ${categoryName.name}`
    });
  }
  
  // Sort by date descending
  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};
