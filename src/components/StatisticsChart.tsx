import { useState, useEffect, useMemo } from 'react';
import './StatisticsChart.css';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'expense' | 'income';
  date: string;
  category: string;
}

interface StatisticsChartProps {
  refreshTrigger?: number;
}

const StatisticsChart = ({ refreshTrigger = 0 }: StatisticsChartProps) => {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // 1. Get the current user
        const savedUser = localStorage.getItem('jubuddy_user');
        if (!savedUser) return;
        const user = JSON.parse(savedUser);

        // 2. Fetch specific user history using user_id
        const response = await fetch(`http://127.0.0.1:8000/transaction/api/history/?user_id=${user.id}`);
        
        if (response.ok) {
          const result = await response.json();
          setTransactions(result);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, [refreshTrigger]);

  // --- CHART LOGIC ---
  const chartData = useMemo(() => {
    if (isLoading) return [];
    
    // Get actual days in the selected month
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

    // Always generate exactly 31 points for smooth CSS transitions
    return Array.from({ length: 31 }, (_, i) => {
      const day = i + 1;
      const isValidDay = day <= daysInMonth;

      if (!isValidDay) {
        return { day, income: 0, expense: 0, isValid: false };
      }

      const monthStr = String(selectedMonth + 1).padStart(2, '0');
      const dayStr = String(day).padStart(2, '0');
      const dateString = `${selectedYear}-${monthStr}-${dayStr}`;

      const dayTrans = transactions.filter(t => t.date === dateString);

      return {
        day: day,
        // Ensure we compare types case-insensitively just in case
        income: dayTrans.filter(t => t.type.toLowerCase() === 'income').reduce((sum, t) => sum + t.amount, 0),
        expense: dayTrans.filter(t => t.type.toLowerCase() === 'expense').reduce((sum, t) => sum + t.amount, 0),
        isValid: true
      };
    });
  }, [selectedYear, selectedMonth, transactions, isLoading]);

  const allValues = chartData.flatMap(d => [d.income, d.expense]);
  const maxValue = Math.max(...allValues, 1000) * 1.1; 
  
  const generateYAxisLabels = () => {
    const labels = [];
    const step = maxValue / 4;
    for (let i = 4; i >= 1; i--) {
      const val = step * i;
      if (val >= 1000) labels.push(`₱${(val / 1000).toFixed(1)}k`);
      else labels.push(`₱${val.toFixed(0)}`);
    }
    labels.push('₱0');
    return labels;
  };

  const generatePath = (type: 'income' | 'expense', isArea: boolean = false) => {
    if (chartData.length === 0) return "";
    
    const width = 100;
    const height = 100;
    
    const points = chartData.map((d, i) => {
      const x = (i / (chartData.length - 1)) * width;
      const val = type === 'income' ? d.income : d.expense;
      const y = height - ((val / maxValue) * height);
      return { x, y };
    });

    let path = `M ${points[0].x} ${points[0].y} `;
    
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const midX = (current.x + next.x) / 2;
      path += `C ${midX} ${current.y}, ${midX} ${next.y}, ${next.x} ${next.y} `;
    }

    if (isArea) {
      path += `L ${width} ${height} L 0 ${height} Z`;
    }

    return path;
  };

  return (
    <div className="statistics-chart">
      <div className="statistics-header">
        <h3 className="statistics-title">Expenses and Income Graph</h3>
        
        <div className="filter-controls">
          <select 
            className="chart-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {months.map((month, index) => (
              <option key={index} value={index}>{month}</option>
            ))}
          </select>

          <select 
            className="chart-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="chart-container">
        <div className="y-axis-labels">
          {generateYAxisLabels().map((label, i) => (
            <span key={i}>{label}</span>
          ))}
        </div>

        <div className="chart-area">
          <svg viewBox="0 0 100 100" className="area-chart-svg" preserveAspectRatio="none">
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06D2CA" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#06D2CA" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D2060E" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#D2060E" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path d={generatePath('income', true)} fill="url(#incomeGradient)" className="area-path" />
            <path 
              d={generatePath('income')} 
              fill="none" 
              stroke="#06D2CA" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              className="area-path income-line" 
            />

            <path d={generatePath('expense', true)} fill="url(#expenseGradient)" className="area-path" />
            <path 
              d={generatePath('expense')} 
              fill="none" 
              stroke="#D2060E" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              className="area-path expense-line" 
            />
          </svg>

          <div className="x-axis-labels">
            {chartData.map((d, index) => {
              // Only show label if valid AND (1st, 5th, 10th... or last valid day)
              if (d.isValid && (d.day === 1 || d.day % 5 === 0)) {
                const leftPos = (index / (chartData.length - 1)) * 100;
                return (
                  <span 
                    key={d.day} 
                    className="x-axis-label"
                    style={{ left: `${leftPos}%` }}
                  >
                    {d.day}
                  </span>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>

      <div className="chart-legend">
        <div className="legend-item">
          <div className="dot income-dot"></div>
          <span>Income</span>
        </div>
        <div className="legend-item">
          <div className="dot expense-dot"></div>
          <span>Expenses</span>
        </div>
      </div>
    </div>
  );
};

export default StatisticsChart;