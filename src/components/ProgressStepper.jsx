import React from 'react';
import { motion } from 'framer-motion';
import { Check, Wallet, PieChart, ClipboardList } from 'lucide-react';

const steps = [
  { id: 1, name: 'Salary', icon: Wallet },
  { id: 2, name: 'Allocation', icon: PieChart },
  { id: 3, name: 'Breakdown', icon: ClipboardList },
];

const ProgressStepper = ({ currentStep, onStepClick }) => {
  return (
    <div className="w-full p-2">
      <div className="flex items-center justify-center relative">
        <div className="absolute left-0 right-0 top-6 md:top-7 -translate-y-1/2 h-1 w-[calc(100%-48px)] sm:w-[calc(100%-56px)] mx-auto bg-zinc-800">
            <motion.div 
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-[0_0_10px_theme(colors.amber.500)]"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            />
        </div>

        <div className="flex justify-between w-full max-w-xs sm:max-w-md">
          {steps.map((step) => {
            const status =
              step.id < currentStep ? 'completed' : step.id === currentStep ? 'active' : 'inactive';
            const Icon = step.icon;
            const isClickable = step.id <= currentStep;

            const StepWrapper = isClickable ? motion.button : motion.div;

            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <StepWrapper
                  onClick={isClickable ? () => onStepClick(step.id) : undefined}
                  initial={false}
                  animate={{ scale: status === 'active' ? 1.1 : 1 }}
                  whileHover={isClickable ? { scale: 1.1, y: -2 } : {}}
                  whileTap={isClickable ? { scale: 0.95 } : {}}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border-2 transition-all duration-300 relative shadow-lg
                    ${status === 'completed' ? 'bg-amber-500 border-amber-400 text-black cursor-pointer' : ''}
                    ${status === 'active' ? 'bg-zinc-900 border-amber-500 text-amber-400 cursor-pointer' : ''}
                    ${status === 'inactive' ? 'bg-zinc-900 border-zinc-700 text-zinc-500 cursor-not-allowed' : ''}
                  `}
                >
                  {status === 'active' && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        boxShadow: '0 0 25px 8px rgba(217, 119, 6, 0.4)',
                      }}
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  )}
                  {status === 'completed' ? <Check className="w-7 h-7 md:w-8 md:h-8" /> : <Icon className="w-6 h-6 md:w-7 md:h-7" />}
                </StepWrapper>
                <p className={`mt-2 md:mt-3 text-xs sm:text-sm md:text-base font-semibold text-center transition-colors duration-300
                  ${status === 'active' ? 'text-amber-400' : ''}
                  ${status === 'completed' ? 'text-zinc-300' : 'text-zinc-500'}
                `}>
                  {step.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressStepper;