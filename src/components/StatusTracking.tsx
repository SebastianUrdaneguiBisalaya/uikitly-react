import React from 'react';
import { useCallback } from 'react';

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
   * Background color of spacer in dark theme.
   */
  bgSpacerDark?: string;

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
   * Text color - dark theme
   */
  textColorDark?: string;

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
  bgSpacer = '#2a2a2a',
  bgSpacerDark = '#aaaaaa',
  data,
  fill = {
    'zero': '#3ECF8E',
    'low': '#e6c516',
    'high': '#e74c3c',
  },
  titleComponent,
  textColor = '#1f2328',
  textColorDark = '#f0f6fc',
  theme = 'system',
  status,
  fromDateLabel = 'days ago',
  toDateLabel = 'Today',
  uptimeLabel = 'uptime',
  tooltipContentMark,
}) => {
  return (
    <div className='w-full flex flex-col gap-1.5'>
      <div className='w-full flex flex-row justify-between items-end'>
        <div className='flex flex-row items-center gap-1'>
          <span className={`text-base font-medium inline-block text-[${textColor}] dark:text-[${textColorDark}]`}>
            {titleComponent}
          </span>
          <span
            className={`inline-block transition-opacity cursor-pointer outline-none text-[${bgSpacer}] dark:text-[${bgSpacerDark}] hover:opacity-70`}
            tabIndex={0}
            role='button'
            aria-label='Show more information'
            aria-describedby='status-tooltip'

          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 8.75c-.69 0-1.25.56-1.25 1.25v.107a.75.75 0 1 1-1.5 0V10A2.75 2.75 0 0 1 12 7.25h.116a2.634 2.634 0 0 1 1.714 4.633l-.77.66a.9.9 0 0 0-.31.674v.533a.75.75 0 0 1-1.5 0v-.533c0-.697.304-1.359.833-1.812l.771-.66a1.134 1.134 0 0 0-.738-1.995zM12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2"/><path fill="currentColor" d="M3.25 12a8.75 8.75 0 1 1 17.5 0a8.75 8.75 0 0 1-17.5 0M12 4.75a7.25 7.25 0 1 0 0 14.5a7.25 7.25 0 0 0 0-14.5"/></svg>
          </span>
        </div>
        <span className={`text-sm inline-block text-[${textColor}] dark:text-[${textColorDark}]`}>
          {status}
        </span>
      </div>

      <div
        className={`tooltip ${this.isTooltipVisible ? 'visible' : ''}`}
        id="status-tooltip"
        role="tooltip"
      >
        {tooltipContentMark}
        <div className="tooltip-arrow"></div>
      </div>

      <div
        className={`rect-tooltip ${this.isRectTooltipVisible ? 'visible' : ''}`}
        id="rect-tooltip"
        role="tooltip"
      >
        {
          this.rectTooltipData && (
            <div className='tooltip-status-content'>
              <div className='tooltip-status-header'>
                <span className='tooltip-status-header-date'>{this.rectTooltipData.date}</span>
              </div>
              <div className='tooltip-status-body'>
                <span className='tooltip-status-body-title'>{this.rectTooltipData.mainTitle}</span>
                <span className='tooltip-status-body-content'>{this.rectTooltipData.content}</span>
              </div>
            </div>
          )
        }
        <div className='rect-tooltip-arrow'></div>
      </div>

      <svg className='inline-block w-full h-[34px]' preserveAspectRatio='none' height='34' viewBox={this.calculateViewBox()}>
        {
          data.map((data, index) => {
            return (
              <rect
                key={index}
                className='status-rect'
                fill={data.level ? fill[data.level] : `${bgRankEmpty}`}
                height='34'
                width='3'
                role='button'
                tabIndex={0}
                aria-label={`${data.date} ${data.level}`}
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
          <span className={`text-sm font-light inline-block text-[${textColor}] dark:text-[${textColorDark}]`}>
            {`${this.lengthOfData()} ${fromDateLabel}`}
          </span>
        </div>
        <div className={`flex-1 bg-[${bgSpacer}] dark:bg-[${bgSpacerDark}] h-[1px] mx-3 mt-3 mb-2`}/>
        <div>
          <span className={`text-sm font-light inline-block text-[${textColor}] dark:text-[${textColorDark}]`}>
            {`100% ${uptimeLabel}`}
          </span>
        </div>
        <div className={`flex-1 bg-[${bgSpacer}] dark:bg-[${bgSpacerDark}] h-[1px] mx-3 mt-3 mb-2`}/>
        <div>
          <span className={`text-sm font-light inline-block text-[${textColor}] dark:text-[${textColorDark}]`}>
            {toDateLabel}
          </span>
        </div>
      </div>
    </div>
  )
}
