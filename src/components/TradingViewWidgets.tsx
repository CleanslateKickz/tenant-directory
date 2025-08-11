
import React, { useEffect, useRef } from 'react';

interface TradingViewWidgetProps {
  symbol: string;
}

export const TechnicalAnalysisWidget: React.FC<TradingViewWidgetProps> = ({ symbol }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Clear previous widget
      containerRef.current.innerHTML = '';
      
      const widgetContainer = document.createElement('div');
      widgetContainer.className = 'tradingview-widget-container__widget';
      
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        interval: "1m",
        width: 425,
        isTransparent: true,
        height: 450,
        symbol: symbol,
        displayMode: "single",
        locale: "en",
        colorTheme: "light"
      });

      containerRef.current.appendChild(widgetContainer);
      containerRef.current.appendChild(script);
    }
  }, [symbol]);

  return <div className="tradingview-widget-container" ref={containerRef}></div>;
};

export const NewsWidget: React.FC<TradingViewWidgetProps> = ({ symbol }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      
      const widgetContainer = document.createElement('div');
      widgetContainer.className = 'tradingview-widget-container__widget';
      
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        feedMode: "symbol",
        symbol: symbol,
        isTransparent: true,
        displayMode: "regular",
        width: "100%",
        height: 500,
        colorTheme: "light",
        locale: "en"
      });

      containerRef.current.appendChild(widgetContainer);
      containerRef.current.appendChild(script);
    }
  }, [symbol]);

  return <div className="tradingview-widget-container" ref={containerRef}></div>;
};

export const SingleTickerWidget: React.FC<TradingViewWidgetProps> = ({ symbol }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      
      const widgetContainer = document.createElement('div');
      widgetContainer.className = 'tradingview-widget-container__widget';
      
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbol: symbol,
        width: "100%",
        isTransparent: true,
        colorTheme: "light",
        locale: "en"
      });

      containerRef.current.appendChild(widgetContainer);
      containerRef.current.appendChild(script);
    }
  }, [symbol]);

  return <div className="tradingview-widget-container" ref={containerRef}></div>;
};

export const MiniChartWidget: React.FC<TradingViewWidgetProps> = ({ symbol }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      
      const widgetContainer = document.createElement('div');
      widgetContainer.className = 'tradingview-widget-container__widget';
      
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbol: symbol,
        width: "100%",
        height: 220,
        locale: "en",
        dateRange: "12M",
        colorTheme: "light",
        isTransparent: true,
        autosize: false,
        chartOnly: false
      });

      containerRef.current.appendChild(widgetContainer);
      containerRef.current.appendChild(script);
    }
  }, [symbol]);

  return <div className="tradingview-widget-container" ref={containerRef}></div>;
};
