import { useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import { CanvasRenderer } from 'echarts/renderers';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  DataZoomComponent,
  BrushComponent,
  VisualMapComponent,
  AxisPointerComponent,
  LegendComponent,
} from 'echarts/components';
import { BarChart, LineChart } from 'echarts/charts';
import '../../estilos/GraphStyles.css';

import ToolBox from '../Toolbox';
import Labels from '../Labels';
import {
  DOWNLOAD_IMAGE_OPTIONS,
  LOADING_STYLE,
} from '../../constantes/ChartConst';

import type { IChartConfig } from 'comunes/funcionales/charts/types/ChartsTypes';

echarts.use([
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  DataZoomComponent,
  BrushComponent,
  VisualMapComponent,
  AxisPointerComponent,
  LegendComponent,
]);

function Bar({
  options,
  theme,
  loading = false,
  title,
  nameX,
  nameY,
}: IChartConfig) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (!chartRef.current) {
      chartRef.current = echarts.init(containerRef.current, theme);
    }

    const chartInstance = chartRef.current;
    chartInstance.setOption(options);
    chartInstance.resize();

    if (loading) {
      chartInstance.showLoading(LOADING_STYLE);
    } else {
      chartInstance.hideLoading();
    }

    const observer = new ResizeObserver(() => {
      if (chartInstance) {
        chartInstance.resize();
      }
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [options, loading, theme]);

  const urlGrafica = () => {
    if (!chartRef.current) return '';
    return chartRef.current.getDataURL({ ...DOWNLOAD_IMAGE_OPTIONS });
  };

  return (
    <main className='charts-component'>
      {title && <h4 className='label-title'>{title}</h4>}
      <ToolBox descargaGrafica={urlGrafica} data={['']} />

      <section id={nanoid()} ref={containerRef} className='charts-container' />

      <Labels nameX={nameX} nameY={nameY} />
    </main>
  );
}

export default Bar;
