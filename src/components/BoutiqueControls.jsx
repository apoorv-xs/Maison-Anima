import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Grid, Eye, EyeOff } from 'lucide-react';

function BoutiqueControls() {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isGridActive, setIsGridActive] = useState(false);
  
  const audioCtxRef = useRef(null);
  const noiseNodeRef = useRef(null);
  const chordIntervalRef = useRef(null);
  const clickIntervalRef = useRef(null);

  const startSoundscape = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;
      
      // Master gain node
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.045, ctx.currentTime); // Keep it extremely soft and unobtrusive
      masterGain.connect(ctx.destination);
      
      // 1. Procedural Pink Noise Low Hum (Simulates rainfall in Pisa / workshop space)
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; 
      }
      
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;
      noiseNodeRef.current = noiseSource;
      
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.value = 650;
      
      noiseSource.connect(noiseFilter);
      noiseFilter.connect(masterGain);
      noiseSource.start();
      
      // 2. Slow Florentine Boutique Chords (Delicate triangle arpeggios)
      const playChord = () => {
        const notes = [
          [261.63, 329.63, 392.00, 493.88], // Cmaj7
          [220.00, 261.63, 329.63, 392.00], // Am7
          [174.61, 220.00, 261.63, 349.23], // Fmaj7
          [196.00, 246.94, 293.66, 392.00]  // G6
        ];
        // Select random chord
        const chord = notes[Math.floor(Math.random() * notes.length)];
        const now = ctx.currentTime;
        
        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gainNode = ctx.createGain();
          
          osc.type = 'triangle';
          osc.frequency.value = freq;
          
          const noteDelay = idx * 0.18; // Slow arpeggiator delay
          
          gainNode.gain.setValueAtTime(0, now);
          gainNode.gain.linearRampToValueAtTime(0.08, now + noteDelay + 2.0); // Slow attack
          gainNode.gain.exponentialRampToValueAtTime(0.0001, now + noteDelay + 7.5); // Very slow decay
          
          const lowpass = ctx.createBiquadFilter();
          lowpass.type = 'lowpass';
          lowpass.frequency.value = 500;
          
          osc.connect(lowpass);
          lowpass.connect(gainNode);
          gainNode.connect(masterGain);
          
          osc.start(now + noteDelay);
          osc.stop(now + noteDelay + 8.0);
        });
      };
      
      playChord();
      chordIntervalRef.current = setInterval(playChord, 9500);
      
      // 3. Rhythmic Artisan Leather Taps
      const playTap = () => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = 1600;
        
        const now = ctx.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.02, now + 0.004);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        
        const hipass = ctx.createBiquadFilter();
        hipass.type = 'highpass';
        hipass.frequency.value = 1200;
        
        osc.connect(hipass);
        hipass.connect(gainNode);
        gainNode.connect(masterGain);
        
        osc.start(now);
        osc.stop(now + 0.1);
      };
      
      clickIntervalRef.current = setInterval(() => {
        if (Math.random() > 0.45) {
          playTap();
          if (Math.random() > 0.6) {
            setTimeout(playTap, 160); // Double-click tapping
          }
        }
      }, 4000);
      
    } catch (e) {
      console.warn("Web Audio API failed to load:", e);
    }
  };

  const stopSoundscape = () => {
    if (chordIntervalRef.current) clearInterval(chordIntervalRef.current);
    if (clickIntervalRef.current) clearInterval(clickIntervalRef.current);
    
    if (noiseNodeRef.current) {
      try { noiseNodeRef.current.stop(); } catch {}
    }
    if (audioCtxRef.current) {
      try { audioCtxRef.current.close(); } catch {}
    }
  };

  const toggleAudio = () => {
    if (isAudioActive) {
      stopSoundscape();
      setIsAudioActive(false);
    } else {
      startSoundscape();
      setIsAudioActive(true);
    }
  };

  useEffect(() => {
    return () => stopSoundscape();
  }, []);

  return (
    <>
      {/* Golden Ratio Alignment Layout Grid Overlay */}
      <div className={`boutique-grid-overlay ${isGridActive ? 'active' : ''}`}>
        <div className="grid-line"></div>
        <div className="grid-line" style={{ left: '16.18%', position: 'absolute' }}></div>
        <div className="grid-line" style={{ left: '38.2%', position: 'absolute' }}></div>
        <div className="grid-line" style={{ left: '61.8%', position: 'absolute' }}></div>
        <div className="grid-line" style={{ left: '83.82%', position: 'absolute' }}></div>
        <div className="grid-line" style={{ right: 0, position: 'absolute' }}></div>
        
        {/* Horizontal Alignment Markers */}
        <div className="grid-horizontal-line" style={{ top: '25%' }}></div>
        <div className="grid-horizontal-line" style={{ top: '50%' }}></div>
        <div className="grid-horizontal-line" style={{ top: '75%' }}></div>
      </div>

      {/* Floating Controller HUD */}
      <div 
        className="boutique-controls-hud"
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 105,
          display: 'flex',
          gap: '8px',
          padding: '6px',
          borderRadius: '24px',
          backgroundColor: 'rgba(28, 27, 26, 0.85)',
          border: '1px solid rgba(229, 226, 222, 0.15)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          alignItems: 'center',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Audio Toggle */}
        <button
          onClick={toggleAudio}
          title={isAudioActive ? "Mute Atmospheric Soundscape" : "Play Atmospheric Soundscape"}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isAudioActive ? 'var(--accent-siena)' : 'transparent',
            color: '#FFFFFF',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          {isAudioActive ? <Volume2 size={13} /> : <VolumeX size={13} />}
        </button>

        {/* Layout Grid Toggle */}
        <button
          onClick={() => setIsGridActive(!isGridActive)}
          title={isGridActive ? "Hide Alignment Layout Grid" : "Show Alignment Layout Grid"}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isGridActive ? 'var(--accent-siena)' : 'transparent',
            color: '#FFFFFF',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          <Grid size={13} />
        </button>
        
        {/* Sub-label describing grid mode (rendered only when grid is active) */}
        {isGridActive && (
          <span 
            className="font-sans" 
            style={{ 
              fontSize: '0.62rem', 
              color: '#EDD397', 
              textTransform: 'uppercase', 
              letterSpacing: '0.12em',
              paddingRight: '12px',
              paddingLeft: '4px',
              animation: 'fadeInText 0.3s ease forwards'
            }}
          >
            Golden Grid Active
          </span>
        )}
      </div>
    </>
  );
}

export default BoutiqueControls;
