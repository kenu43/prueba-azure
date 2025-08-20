import type { EChartsCoreOption } from 'echarts/core';

type DataValue = string | number | Date;

interface GeoJSONGeometryMultiPolygonCompressed {
  type: 'MultiPolygon';
  coordinates: string[][];
  encodeOffsets: number[][][];
}

type TGeometry = GeoJSONGeometryMultiPolygonCompressed;

export interface IdowloadImage {
  type?: 'svg' | 'png' | 'jpeg' | undefined;
  pixelRatio?: number | undefined;
  backgroundColor?: string | undefined;
  excludeComponents?: string[] | undefined;
}

export interface TagcloudProps {
  title: string;
  data: { [key: string]: number };
  loading?: boolean;
}

export interface IChartConfig {
  title?: string;
  nameX?: string;
  nameY?: string;
  options: EChartsCoreOption;
  data?: DataValue[];
  theme?: 'light' | 'dark' | 'colorful' | undefined;
  loading?: boolean;
  geoMap?: {
    type: 'FeatureCollection';
    features: {
      type: string;
      properties: {
        OBJECTID: number;
        name: string;
      };
      geometry: {
        type: string;
        coordinates: number[][][][];
      };
    }[];
  };
}

export interface IChartMapConfig {
  title: string;
  options: EChartsCoreOption;
  data?: DataValue[];
  theme?: 'light' | 'dark' | 'colorful' | undefined;
  loading?: boolean;
  geoMap: {
    type: 'FeatureCollection';
    features: {
      type: 'Feature';
      properties: {
        OBJECTID: number;
        name: string;
      };
      geometry: TGeometry;
    }[];
  };
}
