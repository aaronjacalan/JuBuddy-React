import { useState, useEffect } from 'react';
import './StatisticsChart.css';

interface TransactionData {
  date: Date;
  income: number;
  expense: number;
}

interface StatisticsChartProps {
  data?: TransactionData[];
}

const StatisticsChart = ({ data }: StatisticsChartProps) => {
  const [activeTab, setActiveTab] = useState<'Days' | 'Weeks' | 'Months'>('Days');
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null); // Will be set to current day

  // Generate sample data for the last 13 days
  const generateSampleData = (): TransactionData[] => {
    const today = new Date();
    return Array.from({ length: 30 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (12 - i));
      return {
        date: date,
        income: Math.random() * 15000 + 5000,
        expense: Math.random() * 12000 + 3000,
      };
    }); 
  };

  const displayData = data || generateSampleData();

  // Filter and aggregate data based on active tab
  const getProcessedData = () => {
    const now = new Date();
    let filteredData: TransactionData[] = [];

    switch (activeTab) {
      case 'Days':
        const daysData = Array.from({ length: 13 }, (_, i) => {
          const date = new Date(now);
          date.setDate(now.getDate() - (12 - i));
          date.setHours(0, 0, 0, 0);
          
          const dayTransactions = displayData. filter(d => {
            const transDate = new Date(d.date);
            transDate.setHours(0, 0, 0, 0);
            return transDate.getTime() === date.getTime();
          });
          
          return {
            date: date,
            income: dayTransactions.reduce((sum, d) => sum + d.income, 0) || Math.random() * 30000 + 5000,
            expense: dayTransactions.reduce((sum, d) => sum + d.expense, 0) || Math. random() * 20000 + 3000,
          };
        });
        filteredData = daysData;
        break;
        
      case 'Weeks':
        filteredData = Array.from({ length: 13 }, (_, i) => {
          const weekEnd = new Date(now);
          weekEnd.setDate(now.getDate() - (12 - i) * 7);
          weekEnd.setHours(0, 0, 0, 0);
          
          const weekStart = new Date(weekEnd);
          weekStart.setDate(weekEnd.getDate() - 6);
          
          const weekData = displayData.filter(d => {
            const transDate = new Date(d. date);
            transDate.setHours(0, 0, 0, 0);
            return transDate >= weekStart && transDate <= weekEnd;
          });
          
          return {
            date: weekEnd,
            income: weekData.reduce((sum, d) => sum + d.income, 0) || Math.random() * 150000 + 30000,
            expense: weekData.reduce((sum, d) => sum + d. expense, 0) || Math.random() * 100000 + 20000,
          };
        });
        break;
        
      case 'Months':
        filteredData = Array. from({ length: 13 }, (_, i) => {
          const monthDate = new Date(now. getFullYear(), now.getMonth() - (12 - i), 1);
          monthDate.setHours(0, 0, 0, 0);
          
          const monthData = displayData.filter(d => {
            const transDate = new Date(d. date);
            return transDate.getMonth() === monthDate.getMonth() && 
                   transDate.getFullYear() === monthDate.getFullYear();
          });
          
          return {
            date: monthDate,
            income: monthData.reduce((sum, d) => sum + d.income, 0) || Math. random() * 500000 + 150000,
            expense: monthData.reduce((sum, d) => sum + d. expense, 0) || Math.random() * 400000 + 100000,
          };
        });
        break;
    }

    return filteredData;
  };

  const processedData = getProcessedData();
  
  // Auto-select current day on mount and when data changes, always center on today
  useEffect(() => {
    if (processedData.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const todayIndex = processedData.findIndex(data => {
        const dataDate = new Date(data.date);
        dataDate.setHours(0, 0, 0, 0);
        return dataDate.getTime() === today.getTime();
      });
      
      // Always select today's index if found, otherwise select the last item (most recent)
      const targetIndex = todayIndex !== -1 ? todayIndex : processedData.length - 1;
      setSelectedDayIndex(targetIndex);
    }
  }, [processedData]);
  
  // Generate more granular data points for smoother chart (13 points for time labels)
  const generateChartPoints = () => {
    return Array.from({ length: 13 }, (_, i) => ({
      income: Math.random() * 30000 + 5000, // Random between 5k-35k for more variety
      expense: Math.random() * 20000 + 3000, // Random between 3k-23k for more variety
    }));
  };
  
  const chartPoints = generateChartPoints();
  const incomeValues = chartPoints.map(d => d.income);
  const expenseValues = chartPoints. map(d => d.expense);
  
  // Calculate dynamic min and max values from actual data
  const allValues = [...incomeValues, ...expenseValues];
  const maxValue = Math.max(...allValues) * 1.1; // Add 10% padding to the top
  const minValue = Math.min(...allValues);
  
  // Generate dynamic Y-axis labels based on actual data range
const generateYAxisLabels = () => {
  const range = maxValue - minValue;
  // Calculate appropriate step size based on range
  let step;
  if (range > 30000) {
    step = Math.ceil(range / 4 / 10000) * 10000; // Round to nearest 10k for large ranges
  } else if (range > 15000) {
    step = Math.ceil(range / 4 / 5000) * 5000; // Round to nearest 5k for medium ranges
  } else {
    step = Math.ceil(range / 4 / 2000) * 2000; // Round to nearest 2k for small ranges
  }
  
  const labels = [];
  
  // Build from highest to lowest (top to bottom on the chart)
  for (let i = 4; i >= 1; i--) {
    const value = minValue + (step * i);
    if (value > 0) {
      if (value >= 1000000) {
        labels.push(`₱${(value / 1000000).toFixed(1)}M`);
      } else if (value >= 1000) {
        labels.push(`₱${(value / 1000).toFixed(0)}k`);
      } else {
        labels.push(`₱${value.toFixed(0)}`);
      }
    }
  }
  
  // Always include 0 at the bottom
  labels.push('₱0');
  return labels;
};
  
  const yAxisLabels = generateYAxisLabels();

  // Generate smooth curve path for area chart
  const generateAreaPath = (values: number[]) => {
    const width = 100;
    const height = 120; // Increased height for better visibility
    const padding = 8; // Increased padding
    
    const points = values.map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const normalizedValue = ((value - minValue) / (maxValue - minValue)) * (height - padding * 2);
      const y = padding + (1 - normalizedValue / (height - padding * 2)) * (height - padding * 2);
      return { x, y };
    });

    let path = `M 0 ${height} `;
    path += `L ${points[0].x} ${points[0].y} `;

    for (let i = 0; i < points. length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const midX = (current. x + next.x) / 2;
      path += `C ${midX} ${current.y}, ${midX} ${next. y}, ${next.x} ${next.y} `;
    }

    path += `L ${width} ${height} Z`;
    return path;
  };

  // Generate line path (without area fill)
  const generateLinePath = (values: number[]) => {
    const width = 100;
    const height = 120; // Increased height for better visibility
    const padding = 8; // Increased padding
    
    const points = values.map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const normalizedValue = ((value - minValue) / (maxValue - minValue)) * (height - padding * 2);
      const y = padding + (1 - normalizedValue / (height - padding * 2)) * (height - padding * 2);
      return { x, y };
    });

    let path = `M ${points[0].x} ${points[0].y} `;

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const midX = (current.x + next.x) / 2;
      path += `C ${midX} ${current.y}, ${midX} ${next.y}, ${next.x} ${next.y} `;
    }

    return path;
  };

  // Format date labels based on active tab
  const formatDateLabel = (date: Date) => {
    switch (activeTab) {
      case 'Days':
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return dayNames[date.getDay()];
      case 'Weeks':
        return 'Wk';
      case 'Months':
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return monthNames[date.getMonth()];
      default:
        return '';
    }
  };

  // Dynamic time labels for X-axis based on active tab
  const generateTimeLabels = () => {
    switch (activeTab) {
      case 'Days':
        // For daily view: 12am to 12am next day (13 points)
        return ['12am', '2am', '4am', '6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm', '12am'];
      
      case 'Weeks':
        // For weekly view: 7 days of the week (13 points for smooth curve)
        const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        return [
          ...dayNames,
          ...dayNames.slice(0, 6) // Continue with 6 more days to make 13 points
        ];
      
      case 'Months':
        // For monthly view: actual days in current month (13 points for smooth curve)
        const now = new Date();
        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        const labels = [];
        
        // Generate 13 evenly distributed day labels
        for (let i = 0; i < 13; i++) {
          const dayIndex = Math.floor((i / 12) * (daysInMonth - 1)) + 1;
          labels.push(`${dayIndex}`);
        }
        return labels;
      
      default:
        return ['12am', '2am', '4am', '6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm', '12am'];
    }
  };

  const timeLabels = generateTimeLabels();



  return (
    <div className="statistics-chart">
      <div className="statistics-header">
        <h3 className="statistics-title">Expenses and Income Graph</h3>
        <div className="statistics-tabs">
          <button
            className={`stat-tab ${activeTab === 'Days' ? 'active' : ''}`}
            onClick={() => setActiveTab('Days')}
          >
            Days
          </button>
          <button
            className={`stat-tab ${activeTab === 'Weeks' ? 'active' : ''}`}
            onClick={() => setActiveTab('Weeks')}
          >
            Weeks
          </button>
          <button
            className={`stat-tab ${activeTab === 'Months' ? 'active' : ''}`}
            onClick={() => setActiveTab('Months')}
          >
            Months
          </button>
        </div>
      </div>

      <div className="day-selector" ref={(el) => {
        if (el && selectedDayIndex !== null) {
          const activeElement = el.children[selectedDayIndex] as HTMLElement;
          if (activeElement) {
            activeElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'nearest',
              inline: 'center'
            });
          }
        }
      }}>
        {processedData.map((point, index) => {
          const isToday = activeTab === 'Days' && 
            point.date.toDateString() === new Date().toDateString();
          
          return (
            <div
              key={index}
              className={`day-item ${selectedDayIndex === index ? 'active' : ''} ${isToday ? 'today' : ''}`}
              onClick={() => setSelectedDayIndex(index)}
            >
              <div className="day-number">
                {activeTab === 'Days' 
                  ? String(point.date.getDate()). padStart(2, '0')
                  : activeTab === 'Weeks'
                  ? String(index + 1).padStart(2, '0')
                  : String(point.date.getMonth() + 1). padStart(2, '0')
                }
              </div>
              <div className="day-label">{formatDateLabel(point.date)}</div>
            </div>
          );
        })}
      </div>

      <div className="chart-container">
        <div className="y-axis-labels">
          {yAxisLabels.map((label, index) => (
            <span key={index}>{label}</span>
          ))}
        </div>
        
        <div className="chart-area">
          <svg viewBox="0 0 100 120" className="area-chart-svg" preserveAspectRatio="none">
            <defs>
              <linearGradient id="expenseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D2060E" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#D2060E" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="incomeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06D2CA" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#06D2CA" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            {/* Income area (cyan) */}
            <path
              d={generateAreaPath(incomeValues)}
              fill="url(#incomeGradient)"
              className="area-path income-area"
            />
            
            {/* Expense area (red) */}
            <path
              d={generateAreaPath(expenseValues)}
              fill="url(#expenseGradient)"
              className="area-path expense-area"
            />
            
            {/* Income line (dashed cyan) */}
            <path
              d={generateLinePath(incomeValues)}
              fill="none"
              stroke="#06d2ca"
              strokeWidth="0.8"
              strokeDasharray="2,2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="dotted-line income-line"
            />
            
            {/* Expense line (solid red) */}
            <path
              d={generateLinePath(expenseValues)}
              fill="none"
              stroke="#D2060E"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="solid-line expense-line"
            />
          </svg>
          
          <div className="x-axis-labels">
            {timeLabels.map((label, index) => (
              <span key={index}>{label}</span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="chart-legend">
        <div className="legend-item-stat">
          <div className="legend-indicator income-indicator"></div>
          <span>Income</span>
        </div>
        <div className="legend-item-stat">
          <div className="legend-indicator expense-indicator"></div>
          <span>Expenses</span>
        </div>
      </div>
    </div>
  );
};

export default StatisticsChart;