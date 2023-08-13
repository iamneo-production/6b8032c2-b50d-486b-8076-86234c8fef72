//Mock JSON Data from Local Storage

//Generate Random Color
const generateRandomColor = () => {
  const existingCategoriesLength = fetchData("budgetCategory")?.length ?? 0;
  return `${existingCategoriesLength * 45} 65% 55%`;
};

//Get Data from Local Storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

//Get all items from local storage
export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};

// Delete Data from Local Storage
export const deleteData = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

//Delete all Data from local storage
export const deleteCompletData = () => {
  return localStorage.clear();
};

//Create new Budget Category
export const createBudgetCategory = ({ categoryName, amount }) => {
  const newCategory = {
    id: crypto.randomUUID(),
    categoryName: categoryName,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };
  const existingCategories = fetchData("budgetCategory") ?? [];
  return localStorage.setItem(
    "budgetCategory",
    JSON.stringify([...existingCategories, newCategory])
  );
};

//Create new Expense
export const createExpense = ({ name, amount, categoryId }) => {
  const newExpense = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    categoryId: categoryId,
  };
  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newExpense])
  );
};

// Total spent by category
export const calculateSpentByCategory = (categoryId) => {
  const expenses = fetchData("expenses") ?? [];

  const filteredExpenses = expenses.filter(
    (expense) => expense.categoryId === categoryId
  );

  const amountSpent = filteredExpenses
    .map((expense) => expense.amount)
    .reduce((total, amount) => total + amount, 0);

  return amountSpent;
};

//Format Date to Local
export const formatDateToLocaleString = (epoch) => {
  const date = new Date(epoch);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  return `${day}/${month}/${year}`;
};
// Formatting percentages
export const formatPercentage = (prt) => {
  return prt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

// Formatting currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "INR",
  });
};
