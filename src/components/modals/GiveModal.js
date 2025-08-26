import { useState } from 'react';
import { XMarkIcon } from "@heroicons/react/24/outline";
import PrimaryButton from '../elements/primaryButton';
import SecondaryButton from '../elements/secondaryButton';
import Image from 'next/image';

export default function GiveModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState('');
  const [selectedOption, setSelectedOption] = useState('one-time');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // TODO: Implement payment processing
    // For now, just simulate a delay
    setTimeout(() => {
      setIsProcessing(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop with blur effect */}
      <div 
        className="fixed inset-0 backdrop-blur-sm bg-black/30 transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="relative flex flex-col md:flex-row items-center gap-0 md:gap-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-gray-400 hover:text-gray-500 z-10"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          {/* Left Container - Info */}
          <div className="w-full md:w-[400px] h-auto md:h-[600px] bg-[#90651b] text-white rounded-t-lg md:rounded-lg shadow-xl overflow-hidden">
            <div className="p-4 md:p-8 h-full">
              <div className="h-full flex flex-col">
                {/* Image at the top */}
                <div className="relative w-full h-40 md:h-48 rounded-lg overflow-hidden mb-4 md:mb-6">
                  <Image
                    src="/images/about-static.jpg"
                    alt="Giving to Ministry"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Support Our Ministry</h2>
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">One-Time Giving</h3>
                      <p className="text-white/90 text-xs md:text-sm">
                        Make a one-time donation to support our ministry's work and mission. Your contribution helps us continue spreading the gospel and serving our community.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">Recurring Giving</h3>
                      <p className="text-white/90 text-xs md:text-sm">
                        Set up automatic monthly donations to provide consistent support for our ongoing ministry needs. Choose an amount that works for you and make a lasting impact.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Container - Donation Form */}
          <div className="w-full md:w-[400px] h-auto md:h-[600px] bg-white rounded-b-lg md:rounded-lg shadow-xl overflow-hidden">
            <div className="p-4 md:p-8 h-full">
              <form onSubmit={handleSubmit} className="h-full flex flex-col space-y-3 md:space-y-4">
                {/* Donation Type */}
                <div className="space-y-1 md:space-y-2">
                  <label className="block text-xs md:text-sm font-medium text-gray-700">
                    Donation Type
                  </label>
                  <div className="flex gap-2 md:gap-4">
                    <button
                      type="button"
                      onClick={() => setSelectedOption('one-time')}
                      className={`flex-1 py-1.5 md:py-2 px-3 md:px-4 rounded-lg border text-sm md:text-base ${
                        selectedOption === 'one-time'
                          ? 'bg-[#90651b] text-white border-[#90651b]'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      One-time
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedOption('recurring')}
                      className={`flex-1 py-1.5 md:py-2 px-3 md:px-4 rounded-lg border text-sm md:text-base ${
                        selectedOption === 'recurring'
                          ? 'bg-[#90651b] text-white border-[#90651b]'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Recurring
                    </button>
                  </div>
                </div>

                {/* Amount */}
                <div className="space-y-1 md:space-y-2">
                  <label className="block text-xs md:text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="block w-full rounded-lg border-gray-300 pl-8 pr-4 py-1.5 md:py-2 text-sm md:text-base focus:border-[#90651b] focus:ring-[#90651b]"
                      required
                    />
                  </div>
                </div>

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-3 gap-1.5 md:gap-2">
                  {[10, 25, 50, 100, 250, 500].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setAmount(value.toString())}
                      className="py-1.5 md:py-2 px-2 md:px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm md:text-base"
                    >
                      ${value}
                    </button>
                  ))}
                </div>

                {/* Spacer */}
                <div className="flex-grow" />

                {/* Submit Button */}
                <div>
                  <PrimaryButton
                    type="submit"
                    customStyle="w-full bg-[#90651b] hover:bg-[#a67a2a] text-sm md:text-base py-1.5 md:py-2"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Donate Now'}
                  </PrimaryButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 