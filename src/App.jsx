import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Gem, DollarSign, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Toaster } from '@/components/ui/toaster';
import Fireworks from '@/components/Fireworks';
import ProgressStepper from '@/components/ProgressStepper';
import ScrollReveal from '@/components/ScrollReveal';
import InteractiveBackground from '@/components/InteractiveBackground';
import Preloader from '@/components/Preloader';
import AnimatedNumber from '@/components/AnimatedNumber';
import CursorGlow from '@/components/CursorGlow';
import { currencies, investmentTypes, allCurrencies } from '@/data/investmentData';

function App() {
  const [salary, setSalary] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [investmentPercentage, setInvestmentPercentage] = useState(100);
  const [allocations, setAllocations] = useState({});
  const [showFireworks, setShowFireworks] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  
  const salaryRef = useRef(null);
  const allocationRef = useRef(null);
  const resultsRef = useRef(null);

  const selectedCurrency = allCurrencies.find(c => c.code === currency);
  const totalAllocation = Object.values(allocations).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
  const isValidAllocation = Math.abs(totalAllocation - 100) < 0.01;
  const salaryAmount = parseFloat(salary) || 0;
  const totalInvestmentFund = (salaryAmount * investmentPercentage) / 100;

  useEffect(() => {
    if (isValidAllocation) {
      setShowFireworks(true);
      const fireworksTimer = setTimeout(() => setShowFireworks(false), 4000);
      
      const scrollTimer = setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);

      return () => {
        clearTimeout(fireworksTimer);
        clearTimeout(scrollTimer);
      };
    }
  }, [isValidAllocation]);


  const handleAllocationChange = (investmentId, value) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || (numValue >= 0 && numValue <= 100)) {
        setAllocations(prev => ({
            ...prev,
            [investmentId]: value
        }));
    }
  };

  const formatCurrency = (amount) => {
    try {
        return new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    } catch (e) {
        return `${selectedCurrency?.symbol || '$'}${amount.toLocaleString()}`;
    }
  };
  
  const handleStepClick = (stepId) => {
    let targetRef;
    if (stepId === 1) targetRef = salaryRef;
    if (stepId === 2) targetRef = allocationRef;
    if (stepId === 3) targetRef = resultsRef;
  
    if (targetRef && targetRef.current) {
        targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  if (loading) {
    return <Preloader onComplete={() => setLoading(false)} />;
  }

  return (
    <>
      <Helmet>
        <title>Investment Planner - Premium Portfolio Allocation</title>
        <meta name="description" content="Craft your premium investment portfolio with our sophisticated allocation calculator. Define your salary, allocate across diverse assets, and visualize your financial future with elegance." />
      </Helmet>
      <InteractiveBackground />
      <CursorGlow />
      {showFireworks && <Fireworks />}
      <div className="min-h-screen p-4 md:p-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto space-y-12 md:space-y-16"
        >
          <ScrollReveal onVisible={() => {}}>
            <div className="text-center space-y-6 pt-8">
              <motion.div 
                className="flex justify-center"
                initial={{ scale: 0, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: 'backOut' }}
              >
                <div className="p-4 md:p-5 rounded-full bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 pulse-glow shadow-lg">
                  <Gem className="h-12 w-12 md:h-14 md:w-14 text-white" />
                </div>
              </motion.div>
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-white to-gray-300 text-glow"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              >
                Investment Planner
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
              >
                Craft your premium investment portfolio. Define your salary, allocate across diverse assets, and visualize your financial future with elegance.
              </motion.p>
            </div>
          </ScrollReveal>

          <div className="sticky top-4 z-50 flex justify-center my-8">
             <div className="w-full max-w-3xl backdrop-blur-md bg-black/30 rounded-2xl border border-zinc-800 shadow-lg p-2">
                <ProgressStepper currentStep={currentStep} onStepClick={handleStepClick} />
             </div>
          </div>

          <ScrollReveal onVisible={() => setCurrentStep(1)}>
            <div ref={salaryRef}>
              <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                <Card className="card-glow-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-lg md:text-xl">
                      <DollarSign className="h-6 w-6" />
                      Step 1: Salary Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <div className="space-y-3">
                        <Label htmlFor="salary" className="text-zinc-300 text-base">Net Monthly Salary Amount</Label>
                        <Input
                          id="salary"
                          type="number"
                          placeholder="e.g., 5000"
                          value={salary}
                          onChange={(e) => setSalary(e.target.value)}
                          className="text-lg"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="currency" className="text-zinc-300 text-base">Currency</Label>
                        <Select
                          id="currency"
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                        >
                          {Object.entries(currencies).map(([continent, options]) => (
                            <optgroup key={continent} label={continent} className="bg-zinc-900 font-bold text-amber-400">
                              {options.map((curr) => (
                                <option key={curr.code} value={curr.code} className="bg-zinc-800 text-white font-normal">
                                  {curr.code} - {curr.name}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <Label htmlFor="investment-percentage" className="text-zinc-300 text-base">
                        Percentage of Salary to Invest: <span className="font-bold text-amber-400">{investmentPercentage}%</span>
                      </Label>
                      <input
                        id="investment-percentage"
                        type="range"
                        min="0"
                        max="100"
                        value={investmentPercentage}
                        onChange={(e) => setInvestmentPercentage(parseInt(e.target.value))}
                        className="w-full h-3 bg-zinc-800 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-sm text-zinc-500">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    {salaryAmount > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 md:p-5 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20"
                      >
                        <p className="text-zinc-300 font-medium text-base md:text-lg">
                          Total Monthly Investment Fund: <span className="text-green-400 text-xl md:text-2xl font-bold tracking-wider block sm:inline mt-1 sm:mt-0">
                            {formatCurrency(totalInvestmentFund)}
                          </span>
                        </p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </ScrollReveal>

          {totalInvestmentFund > 0 && (
            <ScrollReveal onVisible={() => setCurrentStep(2)}>
              <div ref={allocationRef}>
                <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                  <Card className="card-glow-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-lg md:text-xl">
                        <TrendingUp className="h-6 w-6" />
                        Step 2: Investment Allocation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {investmentTypes.map((investment) => (
                          <motion.div
                            key={investment.id}
                            whileHover={{ scale: 1.03, zIndex: 10, transition: { duration: 0.2 } }}
                            className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/50 hover:bg-amber-900/20 transition-all duration-200 shadow-md"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl md:text-3xl">{investment.icon}</span>
                                <span className="text-zinc-200 font-medium text-base md:text-lg">{investment.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Input
                                  type="number"
                                  placeholder="0"
                                  value={allocations[investment.id] || ''}
                                  onChange={(e) => handleAllocationChange(investment.id, e.target.value)}
                                  className="w-20 md:w-24 text-center text-lg"
                                  min="0"
                                  max="100"
                                  step="0.1"
                                />
                                <span className="text-zinc-400 text-lg">%</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="space-y-4 pt-4">
                        <div className={`p-4 rounded-lg border transition-all duration-300 ${
                          isValidAllocation 
                            ? 'bg-green-500/10 border-green-500/30' 
                            : totalAllocation > 0 
                              ? 'bg-yellow-500/10 border-yellow-500/30' 
                              : 'bg-zinc-900/50 border-zinc-800'
                        }`}>
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                            <span className="text-zinc-200 font-medium text-base md:text-lg">Total Allocation:</span>
                            <div className="flex items-center gap-2">
                              <span className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
                                isValidAllocation ? 'text-green-400' : 
                                totalAllocation > 100 ? 'text-red-400' : 'text-yellow-400'
                              }`}>
                                {totalAllocation.toFixed(1)}%
                              </span>
                              {isValidAllocation ? (
                                <CheckCircle className="h-6 w-6 text-green-400" />
                              ) : totalAllocation > 0 ? (
                                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                              ) : null}
                            </div>
                          </div>
                          
                          {!isValidAllocation && totalAllocation > 0 && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-sm text-yellow-400 mt-2 text-center sm:text-left"
                            >
                              {totalAllocation > 100 
                                ? `You're over by ${(totalAllocation - 100).toFixed(1)}%. Please reduce your allocations.`
                                : `You need ${(100 - totalAllocation).toFixed(1)}% more to reach 100%.`
                              }
                            </motion.p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </ScrollReveal>
          )}

          {isValidAllocation && (
            <ScrollReveal onVisible={() => setCurrentStep(3)}>
              <div ref={resultsRef}>
                <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                  <Card className="card-glow-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-green-400 text-lg md:text-xl">
                        <CheckCircle className="h-6 w-6" />
                        Step 3: Your Investment Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      <div className="p-4 md:p-6 rounded-lg bg-gradient-to-br from-zinc-900 to-black/50 border border-zinc-800 shadow-lg">
                        <p className="text-zinc-300 text-base md:text-lg mb-4 text-center sm:text-left">
                          From a salary of <span className="font-bold text-amber-400">{formatCurrency(salaryAmount)}</span>, 
                          you have chosen to allocate <span className="font-bold text-purple-400">{investmentPercentage}%</span> for investment.
                        </p>
                        <p className="text-zinc-200 text-lg md:text-xl text-center sm:text-left">
                          Total Monthly Investment Fund: <span className="font-bold text-green-400 text-2xl md:text-3xl tracking-wider block mt-1">
                            <AnimatedNumber value={totalInvestmentFund} formatCurrency={formatCurrency} />
                          </span>
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl md:text-2xl font-semibold text-zinc-200 mb-4">Allocation Breakdown:</h3>
                        {Object.entries(allocations)
                          .filter(([_, percentage]) => parseFloat(percentage) > 0)
                          .sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]))
                          .map(([investmentId, percentage]) => {
                            const investment = investmentTypes.find(inv => inv.id === investmentId);
                            const amount = (totalInvestmentFund * parseFloat(percentage)) / 100;
                            
                            return (
                              <motion.div
                                key={investmentId}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 p-4 md:p-5 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-800/50 transition-all duration-200 shadow-md"
                              >
                                <div className="flex items-center gap-4">
                                  <span className="text-2xl md:text-3xl">{investment.icon}</span>
                                  <div>
                                    <span className="text-zinc-100 font-medium text-base md:text-lg">{investment.name}</span>
                                    <span className="text-zinc-400 text-sm block">({parseFloat(percentage).toFixed(1)}%)</span>
                                  </div>
                                </div>
                                <span className="text-lg md:text-xl font-bold text-green-400 tracking-wide self-end sm:self-center">
                                  <AnimatedNumber value={amount} formatCurrency={formatCurrency} />
                                </span>
                              </motion.div>
                            );
                          })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </ScrollReveal>
          )}
        </motion.div>
        
        <Toaster />
      </div>
    </>
  );
}

export default App;