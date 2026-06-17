/**
 * Central GSAP import — import { gsap, ScrollTrigger } from '../utils/gsap'
 * instead of accessing window.gsap everywhere.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
