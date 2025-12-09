import { SeoRouteKey } from './seoRoutes';

export type RoutePath = `/${string}`;

export interface RouteConfig {
  paths: Record<string, RoutePath>;
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: '1.0' | '0.9' | '0.8' | '0.7' | '0.6' | '0.5';
}

export declare const ROUTES_CONFIG: Record<SeoRouteKey, RouteConfig>;
