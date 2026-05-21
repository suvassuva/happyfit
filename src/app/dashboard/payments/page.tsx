"use client";

import { useDashboard } from "@/context/DashboardContext";
import { useState } from "react";

export default function PaymentsPage() {
  const { profile, transactions, addTransaction, addNotification } = useDashboard();
  
  // Card input mock states
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleUpdateCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardNumber.length < 12 || !cardHolder.trim() || expiry.length < 4 || cvv.length < 3) {
      addNotification("⚠️ Invalid card details. Please review and retry.", "warning");
      return;
    }

    const brand = cardNumber.startsWith("5") ? "Mastercard" : "Visa";
    const last4 = cardNumber.slice(-4);
    
    addTransaction({
      invoiceNo: `INV-2026-0${transactions.length + 6}`,
      amount: "$49.00",
      status: "Paid",
      method: `${brand} ending in ${last4}`,
      planName: "Premium Monthly Subscription"
    });

    // Reset card fields
    setCardNumber("");
    setCardHolder("");
    setExpiry("");
    setCvv("");
    setShowCardForm(false);
  };

  const handleDownloadInvoice = (invoiceNo: string) => {
    addNotification(`📄 Downloading invoice "${invoiceNo}.pdf"...`, "info");
    
    // Simulate minor download delay
    setTimeout(() => {
      // Create a dummy text file to simulate downloading a pdf invoice
      const element = document.createElement("a");
      const file = new Blob([
        `----------------------------------------------------
                       HAPPY FIT CLUB RECEIPT
        ----------------------------------------------------
        Invoice Number: ${invoiceNo}
        Transaction Date: May 20, 2026
        Student Account: ${profile.name}
        Billing Package: Premium Monthly Subscription
        Transaction Cost: $49.00 USD
        Payment Mechanism: Active Card Profile
        Status: SUCCESSFUL (PAID IN FULL)
        ----------------------------------------------------
        Thank you for choosing Happy Fit! Set your intention today.
        `
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${invoiceNo}-HappyFit-Receipt.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      addNotification("Invoice downloaded successfully!", "success");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-headline-lg text-[28px] font-extrabold text-on-surface tracking-tight">
          Payments & Billing
        </h1>
        <p className="font-body-md text-[13px] text-on-surface-variant mt-1">
          Review your subscription invoices, billing history, renewal timelines, and payment methods.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Active Plan Detail - Span 5 */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-inverse-surface/5 border border-outline-variant/60 rounded-3xl p-6 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-15">
              <span className="material-symbols-outlined text-[72px] text-primary">account_balance_wallet</span>
            </div>

            <span className="bg-secondary-container/20 text-secondary px-2.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest inline-block mb-3">
              Plan Status: {profile.status}
            </span>
            <h2 className="font-headline-md text-[18px] text-on-surface font-extrabold mb-1">
              {profile.plan}
            </h2>
            <p className="font-body-sm text-[12px] text-on-surface-variant mb-4.5">
              Access premium live stream schedules, group workshops, on-demand catalog archives, and custom instructor guidance.
            </p>

            <div className="border-t border-outline-variant/50 pt-4 space-y-3">
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-on-surface-variant">Membership Cost:</span>
                <span className="font-bold text-on-surface">$49.00 / month</span>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-on-surface-variant">Next Renewal:</span>
                <span className="font-bold text-primary">{profile.renewalDate}</span>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-on-surface-variant">Payment Profile:</span>
                <span className="font-bold text-on-surface flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-primary">credit_card</span>
                  {transactions[0]?.method || "Visa ending in 4242"}
                </span>
              </div>
            </div>

            <div className="mt-5.5 flex gap-3">
              <button
                onClick={() => setShowCardForm(!showCardForm)}
                className="w-full bg-primary hover:bg-primary/95 text-white py-2.5 rounded-full font-label-md text-[11px] font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">edit_card</span>
                Update Card
              </button>
            </div>
          </div>

          {/* Collapsible Card form simulation */}
          {showCardForm && (
            <div className="bg-white dark:bg-inverse-surface/5 border border-outline-variant/60 rounded-3xl p-6 shadow-md animate-fade-in space-y-4">
              <h3 className="font-headline-md text-[14px] text-on-surface font-bold">Update Card Details</h3>
              <form onSubmit={handleUpdateCard} className="space-y-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wide">Card Holder Name</label>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder="Alex River"
                    className="bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2 font-body-sm text-[12px] text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                    required
                  />
                </div>
                
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wide">Card Number (Visa / Mastercard)</label>
                  <input
                    type="text"
                    maxLength={16}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="4111 2222 3333 4444"
                    className="bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2 font-body-sm text-[12px] text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wide">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      maxLength={5}
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="12/28"
                      className="bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2 font-body-sm text-[12px] text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wide">CVV / CVN</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                      placeholder="123"
                      className="bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2 font-body-sm text-[12px] text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary/95 text-white px-5 py-2 rounded-full font-label-md text-[11px] font-bold transition-all active:scale-95"
                  >
                    Save Method
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCardForm(false)}
                    className="border border-outline-variant text-on-surface-variant hover:text-on-surface px-5 py-2 rounded-full font-label-md text-[11px] font-bold transition-all active:scale-95"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Transaction History Table - Span 7 */}
        <div className="lg:col-span-7 bg-white dark:bg-inverse-surface/5 border border-outline-variant/60 rounded-3xl p-6 shadow-xs overflow-hidden">
          <h2 className="font-headline-md text-[17px] text-on-surface font-extrabold mb-4.5 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">history</span>
            Billing & Invoicing History
          </h2>

          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full min-w-[500px] text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/60 text-[9px] text-on-surface-variant uppercase tracking-wider font-extrabold">
                  <th className="pb-3.5 pl-2">Invoice No</th>
                  <th className="pb-3.5">Date</th>
                  <th className="pb-3.5">Amount</th>
                  <th className="pb-3.5">Payment Method</th>
                  <th className="pb-3.5">Status</th>
                  <th className="pb-3.5 text-right pr-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/40">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="text-[12px] text-on-surface hover:bg-surface-container-lowest/50 transition-colors animate-fade-in group">
                    <td className="py-3.5 pl-2 font-semibold text-primary">{tx.invoiceNo}</td>
                    <td className="py-3.5 text-on-surface-variant">{tx.date}</td>
                    <td className="py-3.5 font-bold">{tx.amount}</td>
                    <td className="py-3.5 text-on-surface-variant/90">{tx.method}</td>
                    <td className="py-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        tx.status === "Paid"
                          ? "bg-success/10 text-success border border-success/20"
                          : "bg-warning/10 text-warning border border-warning/20"
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right pr-2">
                      <button
                        onClick={() => handleDownloadInvoice(tx.invoiceNo)}
                        className="text-primary hover:text-primary-container p-1 rounded-full hover:bg-primary/5 transition-colors"
                        title="Download Invoice Receipt"
                      >
                        <span className="material-symbols-outlined text-[18px] group-hover:scale-105 transition-transform">download</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
