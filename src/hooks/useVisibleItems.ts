import { useState, useEffect, useRef } from 'react';

export const useVisibleItems = (data: any[]) => {
  const total = data.length;
  const getItemsPerRow = () => (window.innerWidth < 768 ? 1 : 3);
  const [itemsPerRow, setItemsPerRow] = useState(getItemsPerRow());
  const [startIndex, setStartIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

interface CalculateVisibleItemsParams {
    start: number;
}

const calculateVisibleItems = ({ start }: CalculateVisibleItemsParams): typeof data => {
    const result: typeof data = [];
    for (let i = 0; i < itemsPerRow; i++) {
        const idx = (start + i) % total;
        result.push(data[idx]);
    }
    return result;
};

  const updateVisibleItems = (newStart: number) => {
    setVisibleItems(calculateVisibleItems({ start: newStart }));
  };

  const handleNext = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const newStart = (startIndex + itemsPerRow) % total;
      setStartIndex(newStart);
      updateVisibleItems(newStart);
      setLoading(false);
    }, 800);
  };

  const handlePrev = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const newStart = (startIndex - itemsPerRow + total) % total;
      setStartIndex(newStart);
      updateVisibleItems(newStart);
      setLoading(false);
    }, 400);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndY.current = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY.current;
    if (Math.abs(deltaY) > 50) {
      deltaY > 0 ? handleNext() : handlePrev();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerRow = getItemsPerRow();
      if (newItemsPerRow !== itemsPerRow) {
        setItemsPerRow(newItemsPerRow);
        updateVisibleItems(startIndex);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerRow, startIndex]);

  useEffect(() => {
    updateVisibleItems(startIndex);
  }, [data, itemsPerRow, startIndex]);

  return {
    visibleItems,
    handleNext,
    handlePrev,
    handleTouchStart,
    handleTouchEnd,
    renderKey: startIndex,
    loading,
    itemsPerRow,
  }  
};
