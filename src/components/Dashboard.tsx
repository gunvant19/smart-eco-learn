import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Trash2, Cloud, TreePine, TrendingUp } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const monthlyData = [
  { month: 'Jan', recycled: 120, saved: 45 },
  { month: 'Feb', recycled: 150, saved: 60 },
  { month: 'Mar', recycled: 180, saved: 72 },
  { month: 'Apr', recycled: 220, saved: 88 },
  { month: 'May', recycled: 280, saved: 112 },
  { month: 'Jun', recycled: 340, saved: 136 },
];

const wasteBreakdown = [
  { name: 'Plastic', value: 35, color: '#3b82f6' },
  { name: 'Paper', value: 25, color: '#22c55e' },
  { name: 'Glass', value: 15, color: '#06b6d4' },
  { name: 'Metal', value: 12, color: '#f59e0b' },
  { name: 'Organic', value: 8, color: '#84cc16' },
  { name: 'E-Waste', value: 5, color: '#a855f7' },
];

interface StatCardProps {
  icon: React.ElementType;
  value: number;
  targetValue: number;
  label: string;
  suffix: string;
  color: string;
  isVisible: boolean;
  delay: number;
}

const StatCard = ({ icon: Icon, targetValue, label, suffix, color, isVisible, delay }: StatCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isVisible || hasAnimated) return;
    
    setHasAnimated(true);
    const duration = 2000;
    const steps = 60;
    const increment = targetValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setDisplayValue(targetValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [targetValue, isVisible, hasAnimated]);

  return (
    <Card 
      className={`bg-gradient-to-br ${color} border-0 overflow-hidden transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-white/80 mb-1">{label}</p>
            <p className="text-3xl font-bold text-white">
              {displayValue.toLocaleString()}{suffix}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white/20">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-white/80 text-sm">
          <TrendingUp className="w-4 h-4" />
          <span>+12% from last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const { t } = useLanguage();
  const statsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      icon: Zap,
      value: 0,
      targetValue: 45680,
      label: t('energySaved'),
      suffix: ' kWh',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: Trash2,
      value: 0,
      targetValue: 12450,
      label: t('wasteReduced'),
      suffix: ' kg',
      color: 'from-eco-primary to-eco-secondary',
    },
    {
      icon: Cloud,
      value: 0,
      targetValue: 8920,
      label: t('carbonReduced'),
      suffix: ' kg',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: TreePine,
      value: 0,
      targetValue: 1234,
      label: t('treesEquivalent'),
      suffix: '',
      color: 'from-green-600 to-emerald-500',
    },
  ];

  return (
    <section id="dashboard" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('dashboardTitle')}
          </h2>
        </div>

        {/* Stats Grid */}
        <div ref={statsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} isVisible={isVisible} delay={index * 100} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Area Chart */}
          <Card className="bg-card border-border">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4 sm:mb-6">
                Monthly Recycling Trend
              </h3>
              <div className="h-[250px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRecycled" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="month" 
                      stroke="hsl(var(--muted-foreground))" 
                      tick={{ fontSize: 12 }}
                      tickMargin={8}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))" 
                      tick={{ fontSize: 12 }}
                      tickMargin={8}
                      width={40}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        fontSize: '12px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="recycled"
                      stroke="#22c55e"
                      fillOpacity={1}
                      fill="url(#colorRecycled)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="saved"
                      stroke="#0ea5e9"
                      fillOpacity={1}
                      fill="url(#colorSaved)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card className="bg-card border-border">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4 sm:mb-6">
                Waste Breakdown by Category
              </h3>
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0">
                <div className="h-[200px] sm:h-[250px] w-full sm:w-1/2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={wasteBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {wasteBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          fontSize: '12px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full sm:w-1/2 grid grid-cols-2 sm:grid-cols-1 gap-2">
                  {wasteBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 sm:gap-3">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs sm:text-sm text-muted-foreground truncate">{item.name}</span>
                      <span className="text-xs sm:text-sm font-medium text-foreground ml-auto">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
