import React, { useState, useCallback, useEffect, useRef } from 'react';
import { computePosition, autoUpdate, offset, flip, shift, arrow } from '@floating-ui/dom';
import clsx from 'clsx';

export interface HabitTrackingProps {
  /**
   *  Background color of cells that have no activity in light theme. By default, the color is '#EFF2F5'.
   */
  bgColor?: string;

  /**
   * Array of objects used to fill the background of each cell based on its activity.
   */
  colors?: { min: number; max: number; color: string; }[];

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Array of objects that contains the user data based on activity (value) of each day (date).
   */
  data: { date: string; value: number; }[];

  /**
   * Legend name of minimum value. By default, the value is 'Less'.
   */
  legendLabelMin?: string;

  /**
   * Legend name of maximum value. By default, the value is 'More'.
   */
  legendLabelMax?: string;

  /**
   * Array of string of months. The length of array is 12 exactly.
   */
  months?: string[];

  /**
   * Callback function when a cell is clicked
   */
  onCellClick?: (data: { date: string; value: number }) => void;

  /**
   * Text color - light theme
   */
  textColor?: string;

  /**
   * Detail tasks of each day. By default, the value is 'tasks on'.
   */
  tooltipLabel?: string;

  /**
   * Array of string of week;s days. The length of array is 7 exactly.
   */
  weekDays?: string[];
}

export const HabitTracking: React.FC<HabitTrackingProps> = ({
  bgColor = 'bg-[#EFF2F5] dark:bg-[#151B23]',
  colors = [
    {min: 1, max: 6, color: 'bg-[#aceebb] dark:bg-[#033a16]'},
    {min: 7, max: 13, color: 'bg-[#4ac26b] dark:bg-[#196C2E]'},
    {min: 14, max: 19, color: 'bg-[#2da44e] dark:bg-[#2EA043]'},
    {min: 20, max: null, color: 'bg-[#116329] dark:bg-[#56D364]'},
  ],
  className,
  data,
  legendLabelMin = 'Less',
  legendLabelMax = 'More',
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  onCellClick,
  textColor = 'text-[#1f2328] dark:text-[#f0f6fc]',
  tooltipLabel = 'tasks on',
  weekDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [cellTooltipData, setCellTooltipData] = useState<string | null>(null);

  const tooltipRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const cleanupAutoUpdateRef = useRef<(() => void) | null>(null);

  const weekDayStart: number = 0;
  const weeks: number = 52;

  const getLevel = useCallback((value: number) => {
    if (value === 0) return bgColor;

    for (let i = 0; i < colors.length; i++) {
      const color = colors[i];
      const maxValue = color.max === null ? Infinity : color.max;
      if (color.min <= value && value <= maxValue) {
        return colors[i].color;
      }
    }
    return bgColor;
  }, []);

  const computedDays = useCallback(() => {
    const today = new Date().toISOString().slice(0, 10);
    const yearAgo = new Date(today);
    yearAgo.setFullYear(yearAgo.getFullYear() - 1);

    const start = new Date(yearAgo);
    start.setDate(start.getDate() + 1);
    while (start.getDay() !== weekDayStart) {
      start.setDate(start.getDate() - 1);
    }

    const totalDays = weeks * 7;
    const statsMap = new Map<string, number>(
      data?.map((stat) => [stat.date, stat.value])
    );

    const days: { date: string; value: number }[] = [];
    for (let i = 0; i < totalDays; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      const iso = d.toISOString().slice(0, 10);
      days.push({ date: iso, value: statsMap.get(iso) ?? 0 });
    }

    return days;
  }, [weekDayStart, weeks, data]);

  const getCellTooltipData = useCallback((index: number) => {
    const days = computedDays();
    if (days && days[index]) {
      return `${days[index].date} ${tooltipLabel}: ${days[index].value}`;
    }
    return '';
  }, [computedDays, tooltipLabel]);

  const getArrowRotation = (placement: string) => {
    if (placement.startsWith('top')) return 'rotate-45';
    if (placement.startsWith('right')) return 'rotate-[135deg]';
    if (placement.startsWith('bottom')) return 'rotate-[-135deg]';
    if (placement.startsWith('left')) return 'rotate-[-45deg]';
    return 'rotate-45';
  }

  const showTooltip = useCallback(async (element: HTMLElement, index: number) => {
    if (!tooltipRef.current || !arrowRef.current) return;

    setIsTooltipVisible(true);
    setCellTooltipData(getCellTooltipData(index));

    if (cleanupAutoUpdateRef.current) {
      cleanupAutoUpdateRef.current();
    }

    cleanupAutoUpdateRef.current = autoUpdate(
      element,
      tooltipRef.current,
      async () => {
        if (!tooltipRef.current || !arrowRef.current) return;

        const { x, y, placement, middlewareData } = await computePosition(
          element,
          tooltipRef.current,
          {
            placement: 'top',
            middleware: [
              offset(8),
              flip(),
              shift({ padding: 8 }),
              arrow({ element: arrowRef.current }),
            ]
          }
        );

        Object.assign(tooltipRef.current.style, {
          left: `${x}px`,
          top: `${y}px`,
        });

        const { x: arrowX, y: arrowY } = middlewareData.arrow || {};

        const placementSide = placement.split('-')[0] as 'top' | 'right' | 'bottom' | 'left';

        const staticSide = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right',
        }[placementSide];

        if (arrowRef.current) {
          Object.assign(arrowRef.current.style, {
            left:  arrowX !== null && arrowX !== undefined ? `${arrowX}px` : '',
            top: arrowY !== null && arrowY !== undefined ? `${arrowY}px` : '',
            right: '',
            bottom: '',
            [staticSide]: '-4px',
          });

          arrowRef.current.className = `absolute w-2 h-2 bg-[#333333] ${getArrowRotation(placement)}`;
        }
      }
    )
  }, [getCellTooltipData]);

  const hideTooltip = useCallback(() => {
    setIsTooltipVisible(false);
    if (cleanupAutoUpdateRef.current) {
      cleanupAutoUpdateRef.current();
      cleanupAutoUpdateRef.current = null;
    }
  }, []);

  const handleDayClick = useCallback((dayData: { date: string; value: number }) => {
    onCellClick?.(dayData);
  }, [onCellClick]);

  useEffect(() => {
    return () => {
      if (cleanupAutoUpdateRef.current) {
        cleanupAutoUpdateRef.current();
      }
    }
  }, []);

  const days = computedDays();
  const groupedWeeks = [];

  for (let i = 0; i < days.length; i += 7) {
    groupedWeeks.push(days.slice(i, i + 7));
  }

  return (
    <div className={clsx('w-fit max-w-full flex flex-col', className)}>
      <div className='grid grid-cols-[max-content_1fr] w-fit max-w-full overflow-x-auto overflow-y-hidden py-2.5 px-0 gap-2'>
        <div className='min-w-fit flex flex-col justify-end items-start gap-0.5'>
          {weekDays?.map((day, index) => (
            <div key={index} className='relative h-2.5 w-max' data-text={day}>
              <span className="invisible text-xs whitespace-nowrap">
                {index % 2 === 1 ? day : ''}
              </span>
              <span className={`inline-block absolute bottom-[-3px] left-0 text-xs whitespace-nowrap pointer-events-none ${textColor}`}>
                {index % 2 === 1 ? day : ''}
              </span>
            </div>
          ))}
        </div>
        <div className='flex flex-col gap-2.5'>
          <div className='flex flex-row gap-0.5'>
            {
              groupedWeeks?.map((week, index) => {
                const firstDay = new Date(week[0].date);
                return (
                  <div key={index} className={`w-2.5 h-2.5 text-xs ${textColor}`}>
                    {
                      firstDay.getDate() <= 7 ? months[firstDay.getMonth()] : ''
                    }
                  </div>
                )
              })
            }
          </div>
          <div className='flex flex-row'>
            {
              groupedWeeks?.map((week, weekIndex) => (
                <div key={weekIndex} className='w-full flex flex-col gap-0.5'>
                  {
                    week?.map((day: { date: string; value: number }) => {
                      return (
                        <div
                          key={day.date}
                          className={`status-cells relative w-2.5 h-2.5 rounded-[3px] cursor-pointer hover:opacity-80 transition-opacity duration-200 ease-in-out focus:outline-none focus:opacity-80 ${getLevel(day.value)}`}
                          onClick={() => handleDayClick({ date: day.date, value: day.value })}
                          onMouseEnter={(event) => showTooltip(event.currentTarget, days.indexOf(day))}
                          onMouseLeave={hideTooltip}
                          onBlur={hideTooltip}
                          tabIndex={0}
                        >
                        </div>
                      )
                    })
                  }
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className='w-full max-w-full flex flex-row justify-end'>
        <div className='flex flex-row items-center gap-2'>
            <span className={`text-xs ${textColor}`}>{legendLabelMin}</span>
            <div className='flex flex-row gap-0.5'>
              {
                colors?.map((color, index) => {
                  return (
                    <div
                      key={index}
                      className={`w-2.5 h-2.5 rounded-[3px] ${color.color}`}
                    >
                    </div>
                  )
                })
              }
            </div>
            <span className={`text-xs ${textColor}`}>{legendLabelMax}</span>
        </div>
      </div>

      <div
        className={`absolute bg-[#333333] text-white py-2 px-3 rounded-md text-xs max-w-3xs z-[1000] opacity-0 invisible transition-[opacity,visibility] duration-200 ease pointer-events-none ${isTooltipVisible ? 'opacity-100 visible' : ''}`}
        id="habit-tracking-tooltip"
        ref={tooltipRef}
        role="tooltip"
      >
        {cellTooltipData}
        <div ref={arrowRef}></div>
      </div>
    </div>
  )
}
