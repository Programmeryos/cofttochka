'use client';

import React, { useState, useEffect, useId } from 'react';
import type { Review, ReviewsResponse } from '@/lib/api/types';
import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useGetProductReviewsQuery,
  useLazyGetProductReviewsQuery,
  useCheckProductReviewQuery,
  useCreateReviewMutation,
} from '@/lib/api';

const LIMIT = 5;

function getOrCreateDeviceId(): string {
  const key = 'coftochka_device_id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

const StarRow = ({
  value,
  interactive,
  hovered,
  onHover,
  onClick,
  size = 20,
}: {
  value: number;
  interactive?: boolean;
  hovered?: number;
  onHover?: (v: number) => void;
  onClick?: (v: number) => void;
  size?: number;
}) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((i) => {
      const filled = i <= (hovered || value);
      return (
        <Star
          key={i}
          size={size}
          strokeWidth={1.5}
          className={`transition-colors ${interactive ? 'cursor-pointer' : ''} ${
            filled ? 'fill-brand-primary text-brand-primary' : 'text-neutral-300'
          }`}
          onMouseEnter={() => onHover?.(i)}
          onMouseLeave={() => onHover?.(0)}
          onClick={() => onClick?.(i)}
        />
      );
    })}
  </div>
);

const ReviewForm = ({
  productId,
  deviceId,
  onSuccess,
}: {
  productId: string;
  deviceId: string;
  onSuccess: () => void;
}) => {
  const formId = useId();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [text, setText] = useState('');
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const [errors, setErrors] = useState<string[]>([]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return;
    setErrors([]);
    const result = await createReview({ productId, body: { deviceId, rating, text: text.trim() || undefined } });
    if ('error' in result) {
      const msg = (result.error as { data?: { message?: string | string[] } })?.data?.message;
      if (Array.isArray(msg)) setErrors(msg);
      else if (typeof msg === 'string') setErrors([msg]);
      else setErrors(['Сталася помилка. Спробуйте ще раз.']);
      return;
    }
    onSuccess();
  };

  return (
    <form onSubmit={submit} className="mt-8 p-6 bg-brand-light rounded-2xl">
      <h3 className="font-serif font-bold text-xl mb-5">Залишити відгук</h3>

      <div className="mb-5">
        <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">
          Оцінка *
        </label>
        <StarRow
          value={rating}
          interactive
          hovered={hovered}
          onHover={setHovered}
          onClick={setRating}
          size={28}
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor={`${formId}-text`}
          className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2"
        >
          Коментар (необов&apos;язково)
        </label>
        <textarea
          id={`${formId}-text`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          maxLength={2000}
          placeholder="Поділіться враженнями..."
          className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-brand-primary transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={!rating || isLoading}
        className="px-8 py-3 bg-brand-primary text-white rounded-full font-bold text-sm hover:bg-brand-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Надсилання...' : 'Надіслати'}
      </button>
      {errors.length > 0 && (
        <ul className="mt-3 space-y-1">
          {errors.map((e, i) => (
            <li key={i} className="text-sm text-red-500">{e}</li>
          ))}
        </ul>
      )}
    </form>
  );
};

export const ProductReviews = ({
  productId,
  initialReviews,
  avgRating,
  reviewCount,
}: {
  productId: string;
  initialReviews?: ReviewsResponse;
  avgRating: number;
  reviewCount: number;
}) => {
  const [deviceId, setDeviceId] = useState('');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDeviceId(getOrCreateDeviceId()); // sync localStorage → state after hydration
  }, []);
  const [submitted, setSubmitted] = useState(false);
  const [extraReviews, setExtraReviews] = useState<Review[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { data: page1Data, refetch: refetchPage1 } = useGetProductReviewsQuery(
    { productId, page: 1, limit: LIMIT }
  );
  const [triggerGetReviews] = useLazyGetProductReviewsQuery();
  const { data: checkData } = useCheckProductReviewQuery(
    { productId, deviceId },
    { skip: !deviceId }
  );

  const allReviews = [...(page1Data?.data ?? initialReviews?.data ?? []), ...extraReviews];
  const hasReviewed = submitted || checkData?.hasReview;
  const hasMore = reviewCount > allReviews.length;

  const handleShowMore = async () => {
    setIsFetchingMore(true);
    const result = await triggerGetReviews({ productId, page: currentPage + 1, limit: LIMIT });
    if (result.data?.data.length) {
      setExtraReviews(prev => [...prev, ...result.data!.data]);
      setCurrentPage(p => p + 1);
    }
    setIsFetchingMore(false);
  };

  const handleSuccess = () => {
    setSubmitted(true);
    setExtraReviews([]);
    setCurrentPage(1);
    refetchPage1();
  };

  return (
    <section className="mt-20 mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-serif font-bold">Відгуки</h2>
        {reviewCount > 0 && (
          <div className="flex items-center gap-3">
            <StarRow value={Math.round(avgRating)} size={18} />
            <span className="text-sm text-neutral-500">
              {avgRating.toFixed(1)} · {reviewCount} {reviewCount === 1 ? 'відгук' : reviewCount < 5 ? 'відгуки' : 'відгуків'}
            </span>
          </div>
        )}
      </div>

      {deviceId && (
        hasReviewed ? (
          <p className="mb-8 text-sm text-neutral-400 italic">Ви вже залишили відгук. Дякуємо!</p>
        ) : (
          <ReviewForm productId={productId} deviceId={deviceId} onSuccess={handleSuccess} />
        )
      )}

      <div className="mt-10">
        <AnimatePresence initial={false}>
          {allReviews.length === 0 && reviewCount === 0 && (
            <p className="text-neutral-400 text-sm">Поки що відгуків немає. Будьте першим!</p>
          )}
          {allReviews.map((r) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-b border-neutral-100 py-6 last:border-0"
            >
              <div className="flex items-center gap-3 mb-3">
                <StarRow value={r.rating} size={16} />
                <span className="text-xs text-neutral-400">
                  {new Date(r.createdAt).toLocaleDateString('uk-UA', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
              {r.text && <p className="text-sm text-neutral-600 leading-relaxed">{r.text}</p>}
            </motion.div>
          ))}
        </AnimatePresence>

        {hasMore && (
          <button
            onClick={handleShowMore}
            disabled={isFetchingMore}
            className="mt-6 px-8 py-3 border border-neutral-200 rounded-full text-sm font-medium hover:border-brand-primary hover:text-brand-primary transition-colors disabled:opacity-50"
          >
            {isFetchingMore ? 'Завантаження...' : `Показати ще (${reviewCount - allReviews.length})`}
          </button>
        )}
      </div>
    </section>
  );
};
