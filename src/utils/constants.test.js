import { describe, it, expect } from 'vitest';
import {
  INACTIVITY_TIMEOUT_MS,
  API_PRODUCT_LIST_DELAY_MS,
  API_PRODUCT_DETAIL_DELAY_MS,
  API_SYNC_DELAY_MS,
  API_RETRIEVE_DELAY_MS,
  AUDIO_MASTER_GAIN,
  CUSTOMIZER_ZOOM_SCALE,
  DEV_SERVER_PORT,
} from './constants';

describe('constants', () => {
  it('has sensible inactivity timeout', () => {
    expect(INACTIVITY_TIMEOUT_MS).toBe(5 * 60 * 1000);
  });

  it('has positive API delays', () => {
    expect(API_PRODUCT_LIST_DELAY_MS).toBeGreaterThan(0);
    expect(API_PRODUCT_DETAIL_DELAY_MS).toBeGreaterThan(0);
    expect(API_SYNC_DELAY_MS).toBeGreaterThan(0);
    expect(API_RETRIEVE_DELAY_MS).toBeGreaterThan(0);
  });

  it('has valid audio gain between 0 and 1', () => {
    expect(AUDIO_MASTER_GAIN).toBeGreaterThan(0);
    expect(AUDIO_MASTER_GAIN).toBeLessThanOrEqual(1);
  });

  it('has valid zoom scale', () => {
    expect(CUSTOMIZER_ZOOM_SCALE).toBeGreaterThan(1);
  });

  it('has a valid dev port number', () => {
    expect(DEV_SERVER_PORT).toBeGreaterThan(1024);
    expect(DEV_SERVER_PORT).toBeLessThan(65535);
  });
});
