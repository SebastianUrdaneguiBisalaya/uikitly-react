import React, { useState, useEffect, useCallback, useRef } from 'react';
import { computePosition, autoUpdate, offset, flip, shift, arrow } from '@floating-ui/dom';
import clsx from 'clsx';

export interface StatusTrackingProps {
  /**
   * Background color of rectangle without data in light theme.
   */
  bgRankEmpty?: string;

  /**
   * Background color of rectangle without data in dark theme.
   */
  bgRankEmptyDark?: string;

  /**
   * Background color of spacer in light theme.
   */
  bgSpacer?: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Array of objects that contains the activity of your product or service.
   */
  data: { date: string; mainTitle: string | null; content: string; level: 'zero' | 'low' | 'high' | null }[];

  /**
   * Object used to fill the background of each rectangle based on its level. The level types are 'zero', 'low', 'high', null. By default, if the level type is null , the color is '#EFF2F5' in light theme and '#151B23' in dark mode.
   */
  fill?: Record<string, string>;

  /**
   * Text color - light theme
   */
  textColor?: string;

  /**
   * Main title of the analytic chart.
   */
  titleComponent: string;

  /**
   * Indicator of the latest status of the analytic chart.
   */
  status: string;

  /**
   * Indicate the legend based on length of the period time that user is analyzing. By default, the value is 'days ago'.
   */
  fromDateLabel?: string;

  /**
   * By default, the value is 'Today'.
   */
  toDateLabel?: string;

  /**
   * By default, the value is 'uptime'.
   */
  uptimeLabel?: string;

  /**
   * Description of the main metric of that chart.
   */
  tooltipContentMark: string;
}

export const StatusTracking: React.FC<StatusTrackingProps> = ({
  bgRankEmpty = '#EFF2F5',
  bgRankEmptyDark = '#151b23',
  bgSpacer = 'bg-[#2a2a2a] dark:bg-[#aaaaaa]',
  className,
  data,
  fill = {
    'zero': '#3ECF8E',
    'low': '#e6c516',
    'high': '#e74c3c',
  },
  titleComponent,
  textColor = 'text-[#1f2328] dark:text-[#f0f6fc]',
  status,
  fromDateLabel = 'days ago',
  toDateLabel = 'Today',
  uptimeLabel = 'uptime',
  tooltipContentMark,
}) => {

  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [isRectTooltipVisible, setIsRectTooltipVisible] = useState<boolean>(false);
  const [rectTooltipData, setRectTooltipData] = useState<{ date: string; mainTitle: string | null; content: string; level: 'zero' | 'low' | 'high' | null } | null>(null);
  const [isDark, setIsDark] = useState<boolean>(false);

  const tooltipRef = useRef<HTMLDivElement>(null);
  const rectTooltipRef = useRef<HTMLDivElement>(null);

  const arrowRef = useRef<HTMLDivElement>(null);
  const arrowRectRef = useRef<HTMLDivElement>(null);

  const cleanupAutoUpdateRef = useRef<(() => void) | null>(null);
  const cleanupAutoUpdateRectRef = useRef<(() => void) | null>(null);


  const lengthOfData = (data: { date: string; mainTitle: string | null; content: string; level: 'zero' | 'low' | 'high' | null }[]) => {
    return data?.length;
  }

  const calculateViewBox = (data: { date: string; mainTitle: string | null; content: string; level: 'zero' | 'low' | 'high' | null }[]) => {
    const dataLength = lengthOfData(data) ?? 0;
    const totalWidth = dataLength * 5;
    return `0 0 ${totalWidth} 34`;
  }

  const getArrowRotation = (placement: string) => {
    if (placement.startsWith('top')) return 'rotate-45';
    if (placement.startsWith('right')) return 'rotate-[135deg]';
    if (placement.startsWith('bottom')) return 'rotate-[-135deg]';
    if (placement.startsWith('left')) return 'rotate-[-45deg]';
    return 'rotate-45';
  }

  const getRectTooltipData = useCallback((index: number) => {
    if (data && data[index]) {
      return {
        date: data[index].date,
        mainTitle: data[index].mainTitle ?? null,
        content: data[index].content,
        level: data[index].level,
      }
    }
  }, []);

  const showTooltip = useCallback(async (element: HTMLElement) => {
    if (!tooltipRef.current || !arrowRef.current) return;

    setIsTooltipVisible(true);

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
  }, []);

  const showTooltipRect = useCallback(async (element: HTMLElement, index: number) => {
    if (!rectTooltipRef.current || !arrowRectRef.current) return;

    setIsRectTooltipVisible(true);
    setRectTooltipData(getRectTooltipData(index) ?? null);

    if (cleanupAutoUpdateRectRef.current) {
      cleanupAutoUpdateRectRef.current();
    }

    cleanupAutoUpdateRectRef.current = autoUpdate(
      element,
      rectTooltipRef.current,
      async () => {
        if (!rectTooltipRef.current || !arrowRectRef.current) return;

        const { x, y, placement, middlewareData } = await computePosition(
          element,
          rectTooltipRef.current,
          {
            placement: 'top',
            middleware: [
              offset(8),
              flip(),
              shift({ padding: 8 }),
              arrow({ element: arrowRectRef.current }),
            ]
          }
        );

        Object.assign(rectTooltipRef.current.style, {
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

        if (arrowRectRef.current) {
          Object.assign(arrowRectRef.current.style, {
            left:  arrowX !== null && arrowX !== undefined ? `${arrowX}px` : '',
            top: arrowY !== null && arrowY !== undefined ? `${arrowY}px` : '',
            right: '',
            bottom: '',
            [staticSide]: '-4px',
          });

          arrowRectRef.current.className = `absolute w-2 h-2 bg-[#333333] ${getArrowRotation(placement)}`;
        }
      }
    )
  }, [getRectTooltipData]);

  const hideTooltip = useCallback(() => {
    setIsTooltipVisible(false);
    if (cleanupAutoUpdateRef.current) {
      cleanupAutoUpdateRef.current();
      cleanupAutoUpdateRef.current = null;
    }
  }, []);

  const hideTooltipRect = useCallback(() => {
    setIsRectTooltipVisible(false);
    if (cleanupAutoUpdateRectRef.current) {
      cleanupAutoUpdateRectRef.current();
      cleanupAutoUpdateRectRef.current = null;
    }
  }, []);

  const getFillColor = (level: 'zero' | 'low' | 'high' | null, isDark: boolean) => {
    if (!level) {
      return isDark ? bgRankEmptyDark : bgRankEmpty;
    }
    return fill[level] || (isDark ? bgRankEmptyDark : bgRankEmpty);
  }

  useEffect(() => {
    return () => {
      if (cleanupAutoUpdateRef.current) {
        cleanupAutoUpdateRef.current();
      }
      if (cleanupAutoUpdateRectRef.current) {
        cleanupAutoUpdateRectRef.current();
      }
    }
  }, []);

  useEffect(() => {
    const mediaQuery: MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setIsDark(event.matches);
    }
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className={clsx('w-full flex flex-col gap-1.5', className)}>
      <div className='w-full flex flex-row justify-between items-end'>
        <div className='flex flex-row items-center gap-1'>
          <span className={`text-base font-medium inline-block ${textColor}`}>
            {titleComponent ?? ''}
          </span>
          <span
            className={`inline-block transition-opacity cursor-pointer outline-none ${textColor} hover:opacity-70`}
            tabIndex={0}
            role='button'
            aria-label='Show more information'
            aria-describedby='status-tooltip'
            onMouseEnter={(event) => showTooltip(event.currentTarget)}
            onMouseLeave={hideTooltip}
            onBlur={hideTooltip}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 8.75c-.69 0-1.25.56-1.25 1.25v.107a.75.75 0 1 1-1.5 0V10A2.75 2.75 0 0 1 12 7.25h.116a2.634 2.634 0 0 1 1.714 4.633l-.77.66a.9.9 0 0 0-.31.674v.533a.75.75 0 0 1-1.5 0v-.533c0-.697.304-1.359.833-1.812l.771-.66a1.134 1.134 0 0 0-.738-1.995zM12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2"/><path fill="currentColor" d="M3.25 12a8.75 8.75 0 1 1 17.5 0a8.75 8.75 0 0 1-17.5 0M12 4.75a7.25 7.25 0 1 0 0 14.5a7.25 7.25 0 0 0 0-14.5"/></svg>
          </span>
        </div>
        <span className={`text-sm inline-block ${textColor}`}>
          {status ?? ''}
        </span>
      </div>

      <div
        className={`absolute bg-[#333333] text-white py-2 px-3 rounded-md text-xs max-w-3xs z-[1000] opacity-0 invisible transition-[opacity,visibility] duration-200 ease pointer-events-none ${isTooltipVisible ? 'opacity-100 visible' : ''}`}
        id="status-tooltip"
        ref={tooltipRef}
        role="tooltip"
      >
        {tooltipContentMark ?? ''}
        <div ref={arrowRef}></div>
      </div>

      <div
        className={`absolute bg-[#333333] text-white py-2 px-3 rounded-md text-xs min-w-24 max-w-80 z-[1000] opacity-0 invisible transition-[opacity,visibility] duration-200 ease pointer-events-none ${isRectTooltipVisible ? 'opacity-100 visible' : ''}`}
        id="rect-tooltip"
        ref={rectTooltipRef}
        role="tooltip"
      >
        {
          rectTooltipData && (
            <div className='tooltip-status-content'>
              <div className='tooltip-status-header'>
                <span className='tooltip-status-header-date'>{rectTooltipData.date ?? ''}</span>
              </div>
              <div className='tooltip-status-body'>
                <span className='tooltip-status-body-title'>{rectTooltipData.mainTitle ?? ''}</span>
                <span className='tooltip-status-body-content'>{rectTooltipData.content ?? ''}</span>
              </div>
            </div>
          )
        }
        <div ref={arrowRectRef}></div>
      </div>

      <svg className='inline-block w-full h-[34px]' preserveAspectRatio='none' height='34' viewBox={calculateViewBox(data)}>
        {
          data?.map((val, index) => {
            return (
              <rect
                key={index}
                className='transition-opacity duration-200 ease-in-out hover:opacity-80 focus:outline-none focus:opacity-80'
                fill={getFillColor(val.level, isDark)}
                height='34'
                width='3'
                onMouseEnter={(event) => showTooltipRect(event.currentTarget as unknown as HTMLElement, index)}
                onMouseLeave={hideTooltipRect}
                onBlur={hideTooltipRect}
                role='button'
                tabIndex={0}
                aria-label={`${val.date} ${val.level}`}
                x={`${index * 5}`}
                y='0'
              >
              </rect>
            )
          })
        }
      </svg>
      <div className='w-full flex flex-row justify-between items-center'>
        <div>
          <span className={`text-sm font-light inline-block ${textColor}`}>
            {`${lengthOfData(data) ?? 0} ${fromDateLabel}`}
          </span>
        </div>
        <div className={`flex-1 ${bgSpacer} h-[1px] mx-3 mt-3 mb-2`}/>
        <div>
          <span className={`text-sm font-light inline-block ${textColor}`}>
            {`100% ${uptimeLabel}`}
          </span>
        </div>
        <div className={`flex-1 ${bgSpacer} h-[1px] mx-3 mt-3 mb-2`}/>
        <div>
          <span className={`text-sm font-light inline-block ${textColor}`}>
            {toDateLabel}
          </span>
        </div>
      </div>
    </div>
  )
}
