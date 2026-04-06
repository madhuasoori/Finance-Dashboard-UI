import { createContext, useState, useEffect } from 'react';
import { generateMockTransactions } from '../data/mock';

export const INITIAL_CARDS = [
  { id: 'all', name: 'All Accounts', icon: '🏦', last4: '' },
  { id: 'card_1', name: 'Visa Platinum', icon: '💳', last4: '4242' },
  { id: 'card_2', name: 'Mastercard Gold', icon: '💳', last4: '8888' },
];

const getTodayDateStr = (day) => {
  const date = new Date();
  date.setDate(day);
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
};

export const INITIAL_TRANSACTIONS = [
  { id: 1, date: getTodayDateStr(24), description: 'Institutional Profit Distribution', category: 'Investment', amount: 845000.00, type: 'income', cardId: 'card_1' },
  { id: 2, date: getTodayDateStr(22), description: 'Luxury Apartment Rent', category: 'Housing', amount: 45000.00, type: 'expense', cardId: 'card_1' },
  { id: 3, date: getTodayDateStr(21), description: 'High-Net-Worth Advisory', category: 'Investment', amount: 525000.00, type: 'income', cardId: 'card_2' },
  { id: 4, date: getTodayDateStr(19), description: 'Fine Dining: The Ritz', category: 'Food', amount: 8500.00, type: 'expense', cardId: 'card_2' },
  { id: 5, date: getTodayDateStr(15), description: 'Travel: First Class Suite', category: 'Shopping', amount: 125000.00, type: 'expense', cardId: 'card_1' },
  { id: 6, date: getTodayDateStr(12), description: 'Grocery: Premium Organics', category: 'Food', amount: 4600.00, type: 'expense', cardId: 'card_2' },
  { id: 7, date: getTodayDateStr(10), description: 'Portfolio Dividend Yield', category: 'Investment', amount: 315000.00, type: 'income', cardId: 'card_1' },
  { id: 8, date: getTodayDateStr(8), description: 'Gym & Core Membership', category: 'Entertainment', amount: 4500.00, type: 'expense', cardId: 'card_2' },
  { id: 9, date: getTodayDateStr(5), description: 'Executive Office Rental', category: 'Housing', amount: 42000.00, type: 'expense', cardId: 'card_2' },
  { id: 10, date: getTodayDateStr(2), description: 'Venture Capital Carry', category: 'Investment', amount: 650000.00, type: 'income', cardId: 'card_1' },
];

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  // Try to load from localStorage first
  const loadTransactions = () => {
    const saved = localStorage.getItem('finance_transactions');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migrate legacy data: distribute transactions between cards
      const migrated = parsed.map((t, idx) => ({
        ...t,
        cardId: t.cardId || (idx % 2 === 0 ? 'card_1' : 'card_2')
      }));
      
      // Update existing mock transactions (ID 1-10) with the new high-income values
      const initialMap = new Map(INITIAL_TRANSACTIONS.map(t => [t.id, t]));
      const updated = migrated.map(t => {
        const base = initialMap.has(t.id) ? initialMap.get(t.id) : t;
        return { ...base, amount: Number(base.amount) };
      });
      
      // Add any new initial items that might not be in the list at all
      const existingIds = new Set(updated.map(t => t.id));
      const newItems = INITIAL_TRANSACTIONS.filter(t => !existingIds.has(t.id));
      
      return [...newItems, ...updated];
    }
    return INITIAL_TRANSACTIONS;
  };

  const [transactions, setTransactions] = useState(loadTransactions());
  // 'viewer' or 'admin'
  const [role, setRole] = useState(localStorage.getItem('finance_role') || 'viewer');
  
  const loadCards = () => {
    const saved = localStorage.getItem('finance_cards');
    if (saved) return JSON.parse(saved);
    return INITIAL_CARDS;
  };

  const [cards, setCards] = useState(loadCards());
  const [activeCardId, setActiveCardId] = useState(localStorage.getItem('finance_active_card') || 'all');
  
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('finance_profile');
    if (saved) return JSON.parse(saved);
    return {
      name: 'Julian Wealth',
      email: 'julian.wealth@atelier.com',
      phone: '+91 98765 43210',
      location: 'Manhattan, New York',
      title: 'Premium Client'
    };
  });

  const [isAddModalOpen, setAddModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finance_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('finance_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('finance_active_card', activeCardId);
  }, [activeCardId]);

  useEffect(() => {
    localStorage.setItem('finance_cards', JSON.stringify(cards));
  }, [cards]);

  const addTransaction = (t) => {
    const newTx = { ...t, id: Math.random().toString(36).substr(2, 9) };
    setTransactions(prev => [newTx, ...prev]);
  };

  const updateTransaction = (id, updatedT) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updatedT } : t));
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const clearAllTransactions = () => {
    setTransactions([]);
  };

  const updateUserProfile = (newData) => {
    setUserProfile(prev => ({ ...prev, ...newData }));
  };

  const addCard = (card) => {
    const newCard = { ...card, id: `card_${Math.random().toString(36).substr(2, 9)}` };
    setCards(prev => [...prev, newCard]);
  };

  const updateCard = (id, updatedCard) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, ...updatedCard } : c));
  };

  const deleteCard = (id) => {
    if (id === 'all') return;
    setCards(prev => prev.filter(c => c.id !== id));
    if (activeCardId === id) setActiveCardId('all');
  };

  return (
    <FinanceContext.Provider value={{
      transactions,
      role,
      setRole,
      userProfile,
      updateUserProfile,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      clearAllTransactions,
      isAddModalOpen,
      setAddModalOpen,
      cards,
      addCard,
      updateCard,
      deleteCard,
      activeCardId,
      setActiveCardId
    }}>
      {children}
    </FinanceContext.Provider>
  );
};
