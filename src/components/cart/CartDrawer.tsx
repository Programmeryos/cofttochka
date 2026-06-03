'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowLeft, CheckCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCreateOrderMutation } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';

type Step = 'cart' | 'checkout' | 'success';

interface OrderForm {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  comment: string;
}

interface FormErrors {
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
}

const EMPTY_FORM: OrderForm = { customerName: '', customerPhone: '', customerEmail: '', comment: '' };

const validate = (form: OrderForm): FormErrors => {
  const e: FormErrors = {};

  if (!form.customerName.trim()) {
    e.customerName = "Введіть ваше ім'я";
  } else if (form.customerName.trim().length < 2) {
    e.customerName = "Мінімум 2 символи";
  } else if (!/^[а-яА-ЯіІїЇєЄёЁa-zA-Z\s''-]+$/.test(form.customerName.trim())) {
    e.customerName = "Лише літери та пробіли";
  }

  const phone = form.customerPhone.replace(/[\s\-()+]/g, '');
  if (!form.customerPhone.trim()) {
    e.customerPhone = 'Введіть номер телефону';
  } else if (!/^(380|0)\d{9}$/.test(phone)) {
    e.customerPhone = 'Формат: +380XXXXXXXXX або 0XXXXXXXXX';
  }

  if (form.customerEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.customerEmail.trim())) {
    e.customerEmail = 'Введіть коректний email';
  }

  return e;
};

export const CartDrawer = () => {
  const { items, isOpen, closeCart, updateQty, removeItem, total, count } = useCart();
  const [step, setStep] = useState<Step>('cart');
  const [form, setForm] = useState<OrderForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState('');
  const [touched, setTouched] = useState<Partial<Record<keyof FormErrors, boolean>>>({});

  const [createOrder, { isLoading: isSubmitting }] = useCreateOrderMutation();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleClose = () => {
    closeCart();
    setTimeout(() => { setStep('cart'); setForm(EMPTY_FORM); setErrors({}); setTouched({}); setFormError(''); }, 300);
  };

  const handleBlur = (key: keyof FormErrors) => {
    setTouched(prev => ({ ...prev, [key]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    const errs = validate(form);
    setErrors(errs);
    setTouched({ customerName: true, customerPhone: true, customerEmail: true });
    if (Object.keys(errs).length > 0) return;

    try {
      await createOrder({
        customerName: form.customerName.trim(),
        customerPhone: form.customerPhone.trim(),
        customerEmail: form.customerEmail.trim() || undefined,
        comment: form.comment.trim() || undefined,
        items: items.map(item => ({ productId: item.productId, quantity: item.qty })),
      }).unwrap();

      items.forEach(item => removeItem(item.productId));
      setStep('success');
    } catch (err: unknown) {
      const data = (err as { data?: { message?: { message?: string } | string } })?.data;
      const message = typeof data?.message === 'object'
        ? data.message?.message
        : data?.message;
      setFormError(message ?? 'Помилка при оформленні замовлення. Спробуйте ще раз.');
    }
  };

  const field = (key: keyof OrderForm, label: string, extra?: React.InputHTMLAttributes<HTMLInputElement>) => {
    const err = touched[key as keyof FormErrors] ? errors[key as keyof FormErrors] : undefined;
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">{label}</label>
        <input
          value={form[key]}
          onChange={e => {
            setForm(prev => ({ ...prev, [key]: e.target.value }));
            if (touched[key as keyof FormErrors]) setErrors(validate({ ...form, [key]: e.target.value }));
          }}
          onBlur={() => handleBlur(key as keyof FormErrors)}
          className={`w-full px-4 py-3 bg-neutral-50 rounded-2xl border focus:bg-white outline-none transition-all text-sm ${
            err ? 'border-red-400 bg-red-50/30' : 'border-transparent focus:border-brand-primary'
          }`}
          {...extra}
        />
        {err && <p className="text-red-500 text-xs px-1">{err}</p>}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 z-60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-105 bg-white z-70 shadow-2xl flex flex-col"
            role="dialog" aria-modal="true" aria-label="Кошик"
          >
            {/* Header */}
            <div className="px-6 h-20 flex items-center justify-between border-b border-neutral-100 shrink-0">
              <div className="flex items-center gap-3">
                {step === 'checkout' && (
                  <button onClick={() => setStep('cart')} className="mr-1 text-neutral-400 hover:text-brand-dark transition-colors">
                    <ArrowLeft size={20} />
                  </button>
                )}
                <h2 className="text-xl font-serif font-bold">
                  {step === 'cart' ? 'Кошик' : step === 'checkout' ? 'Оформлення' : 'Дякуємо!'}
                </h2>
                {step === 'cart' && <span className="text-sm text-neutral-400 font-medium">({count})</span>}
              </div>
              <button onClick={handleClose} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* ── CART STEP ── */}
            {step === 'cart' && (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-hide">
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                      <div className="w-20 h-20 bg-brand-light rounded-full flex items-center justify-center text-brand-primary mb-6">
                        <ShoppingBag size={32} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-xl font-serif font-bold mb-2">Кошик порожній</h3>
                      <p className="text-neutral-400 text-sm italic mb-8">Додайте щось тепле</p>
                      <Link href="/#catalog" onClick={handleClose} className="w-full border-2 border-brand-primary text-brand-primary py-4 rounded-full font-bold hover:bg-brand-primary hover:text-white transition-all flex items-center justify-center">
                        Перейти до каталогу
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {items.map(item => (
                        <div key={item.productId} className="flex gap-4 group">
                          <Link href={`/product/${item.slug ?? item.productId}`} onClick={handleClose} className="shrink-0">
                            <div className="w-24 h-32 bg-brand-light relative rounded-xl overflow-hidden">
                              {item.image
                                ? <Image src={item.image} alt={item.name} fill className="object-cover" />
                                : <div className="w-full h-full flex items-center justify-center text-neutral-300"><ShoppingBag size={24} /></div>
                              }
                            </div>
                          </Link>
                          <div className="flex-1 flex flex-col py-1">
                            <div className="flex justify-between items-start mb-1">
                              <Link href={`/product/${item.slug ?? item.productId}`} onClick={handleClose}>
                                <h4 className="font-serif font-bold text-sm hover:text-brand-primary transition-colors">{item.name}</h4>
                              </Link>
                              <button onClick={() => removeItem(item.productId)} className="text-neutral-300 hover:text-red-400 transition-colors">
                                <Trash2 size={16} />
                              </button>
                            </div>
                            {item.size && <p className="text-[10px] text-neutral-400 uppercase tracking-widest mb-auto">Розмір: {item.size}</p>}
                            <div className="flex items-center justify-between mt-4">
                              <div />
                              <span className="font-bold text-sm">{item.price.toLocaleString('uk-UA')} ₴</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {items.length > 0 && (
                  <div className="p-6 border-t border-neutral-100 bg-neutral-50/50 shrink-0">
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-bold text-lg">Разом:</span>
                      <span className="font-bold text-2xl text-brand-dark">{total.toLocaleString('uk-UA')} ₴</span>
                    </div>
                    <div className="space-y-3">
                      <button onClick={() => setStep('checkout')} className="w-full bg-brand-primary text-white py-5 rounded-full font-bold text-lg hover:bg-brand-secondary transition-all hover:shadow-xl active:scale-[0.98]">
                        Оформити замовлення
                      </button>
                      <button onClick={handleClose} className="w-full py-2 text-sm text-neutral-400 font-medium hover:text-brand-dark transition-colors">
                        Продовжити покупки
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ── CHECKOUT STEP ── */}
            {step === 'checkout' && (
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 scrollbar-hide">
                  {field('customerName', "Ім'я *", { placeholder: 'Іван Петренко', autoComplete: 'name', required: true })}
                  {field('customerPhone', 'Телефон *', { placeholder: '+380501234567', type: 'tel', autoComplete: 'tel', required: true })}
                  {field('customerEmail', 'Email', { placeholder: 'ivan@example.com', type: 'email', autoComplete: 'email' })}

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Коментар</label>
                    <textarea
                      value={form.comment}
                      onChange={e => setForm(prev => ({ ...prev, comment: e.target.value }))}
                      rows={3}
                      placeholder="Побажання до замовлення..."
                      className="w-full px-4 py-3 bg-neutral-50 rounded-2xl border border-transparent focus:border-brand-primary focus:bg-white outline-none transition-all text-sm resize-none"
                    />
                  </div>

                  <div className="pt-2 border-t border-neutral-100">
                    <p className="text-xs text-neutral-400 mb-3">Ваше замовлення ({items.length} поз.)</p>
                    {items.map(item => (
                      <div key={item.productId} className="flex justify-between text-sm py-1">
                        <span className="text-neutral-600 truncate mr-4">{item.name} × {item.qty}</span>
                        <span className="font-medium shrink-0">{(item.price * item.qty).toLocaleString('uk-UA')} ₴</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-bold text-base pt-3 mt-2 border-t border-neutral-100">
                      <span>Разом</span>
                      <span>{total.toLocaleString('uk-UA')} ₴</span>
                    </div>
                  </div>

                  {formError && (
                    <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl">{formError}</p>
                  )}
                </div>

                <div className="p-6 border-t border-neutral-100 bg-neutral-50/50 shrink-0">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-primary text-white py-5 rounded-full font-bold text-lg hover:bg-brand-secondary transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Відправляємо...' : 'Підтвердити замовлення'}
                  </button>
                </div>
              </form>
            )}

            {/* ── SUCCESS STEP ── */}
            {step === 'success' && (
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-6">
                  <CheckCircle size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-3">Замовлення прийнято!</h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-10">
                  Дякуємо за покупку. Ми зв'яжемось з вами найближчим часом для підтвердження.
                </p>
                <button onClick={handleClose} className="w-full bg-brand-primary text-white py-4 rounded-full font-bold hover:bg-brand-secondary transition-all">
                  Закрити
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
