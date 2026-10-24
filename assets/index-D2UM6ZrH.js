(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=e=>440*2**((e-69)/12),t=new Set([3,6,10,12,14]),n=[50,50,50,51,50,50,53,50,50,50,51,50,55,53,51,50],r=[1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0],i=[50,46,43,45],a=[50,46,43,45],o=[57,55,52,48],s=[[[0,62,1],[1,65,1],[2,67,1],[3,69,1],[4,72,1],[5,74,1],[6,72,1],[7,69,1],[8,67,1],[9,69,1],[10,65,1],[11,67,1],[12,62,4]],[[0,74,4],[4,75,2],[6,74,2],[8,72,2],[10,69,2],[12,67,2],[14,65,2]],[[0,62,1],[1,63,1],[2,65,1],[3,67,1],[4,69,1],[5,70,1],[6,72,1],[7,74,1],[8,75,3],[11,74,2],[13,72,3]],[[0,74,2],[2,72,2],[4,69,2],[6,67,2],[8,65,1],[9,67,1],[10,69,1],[11,72,1],[12,74,4]],[[0,74,1],[1,72,1],[2,69,1],[3,67,1],[4,69,1],[5,72,1],[6,74,1],[7,75,1],[8,74,2],[10,72,2],[12,69,2],[14,67,2]],[[0,81,4,79],[4,79,2],[6,77,2],[8,75,2],[10,74,2],[12,72,2],[14,74,2]],[[0,75,1],[1,74,1],[2,72,1],[3,74,1],[4,75,1],[5,77,1],[6,79,1],[7,81,1],[8,79,2],[10,77,2],[12,75,2],[14,74,2]],[[0,74,2],[2,72,2],[4,69,2],[6,65,2],[8,62,8]]];function c(e,t){if(t===`game`){let t=e%16;return t<4?`riffA`:t<6?`riffB`:t<8?t===7?`fill`:`riffA`:t<12?`chorus`:t<14?`solo`:t===14?`fill`:`break`}return e<4?`intro`:e<12?`riffA`:e<20?`riffB`:e<28?`solo`:e<36?`chorus`:e<39?`outro`:`fill`}function l(e){let t=1024,n=new Float32Array(t),r=Math.tanh(e);for(let i=0;i<t;i++){let t=i/1023*2-1;n[i]=Math.tanh(e*t)/r}return n}var u=class{ctx;noise;gtrL;gtrR;bassIn;leadIn;drums;verb;curve=l(5.2);constructor(e,t){this.ctx=e;let n=Math.floor(e.sampleRate*2);this.noise=e.createBuffer(1,n,e.sampleRate);let r=this.noise.getChannelData(0);for(let e=0;e<n;e++)r[e]=Math.random()*2-1;let i=Math.floor(e.sampleRate*1.6),a=e.createBuffer(2,i,e.sampleRate);for(let e=0;e<2;e++){let t=a.getChannelData(e);for(let e=0;e<i;e++){let n=(1-e/i)**3.2;t[e]=(Math.random()*2-1)*n}}let o=e.createConvolver();o.buffer=a;let s=e.createGain();s.gain.value=.32,o.connect(s).connect(t),this.verb=o;let c=e.createGain();c.gain.value=.85,c.connect(t),this.drums=c;let u=e.createWaveShaper();u.curve=l(2.2);let d=e.createBiquadFilter();d.type=`lowpass`,d.frequency.value=1500,d.Q.value=.8;let f=e.createGain();f.gain.value=.62,this.bassIn=e.createGain(),this.bassIn.connect(u).connect(d).connect(f).connect(t);let p=e.createWaveShaper();p.oversample=`2x`,p.curve=l(7);let m=e.createBiquadFilter();m.type=`lowpass`,m.frequency.value=5600;let h=e.createGain();h.gain.value=.5,this.leadIn=e.createGain(),this.leadIn.connect(p).connect(m).connect(h).connect(t);let g=e.createDelay(1);g.delayTime.value=.31;let _=e.createGain();_.gain.value=.3;let v=e.createGain();v.gain.value=.22,h.connect(g),g.connect(_).connect(g),g.connect(v).connect(t);let y=e.createGain();y.gain.value=.18,h.connect(y).connect(o),this.gtrL=this.makeGuitar(t,-.55),this.gtrR=this.makeGuitar(t,.55)}makeGuitar(e,t){let n=this.ctx,r=n.createGain();r.gain.value=2.6;let i=n.createWaveShaper();i.oversample=`2x`,i.curve=this.curve;let a=n.createBiquadFilter();a.type=`highpass`,a.frequency.value=88;let o=n.createBiquadFilter();o.type=`peaking`,o.frequency.value=1550,o.Q.value=.9,o.gain.value=3.2;let s=n.createBiquadFilter();s.type=`lowpass`,s.frequency.value=4700,s.Q.value=.7;let c=n.createGain();c.gain.value=.42;let l=n.createStereoPanner();l.pan.value=t;let u=n.createGain();return u.gain.value=.06,r.connect(i).connect(a).connect(o).connect(s).connect(c),c.connect(l).connect(e),c.connect(u).connect(this.verb),r}scheduleBar(e,t,n,r=`game`){let o=60/n/4;switch(c(t,r)){case`intro`:this.introBar(e,o,t);break;case`riffA`:this.riffA(e,o,t%4==0);break;case`riffB`:this.riffB(e,o,i[t%4],t%4==3),t%8==0&&this.crash(e,.7);break;case`solo`:this.riffA(e,o,!1),this.leadPhrase(e,o,s[(t-20+8)%8],.9),t%4==0&&this.crash(e,.6);break;case`chorus`:this.chorusBar(e,o,a[t%4],t%2==0);break;case`fill`:this.fillBar(e,o);break;case`break`:this.breakBar(e,o,t);break;case`outro`:this.outroBar(e,o,t)}}introBar(e,t,n){if(n===0)this.crash(e,.9),this.chord(e,50,t*3.2,.95,!1),this.bass(e,38,t*3.6,.85),this.drone(e,t*8),this.door(e+.35),this.heart(e+.9),this.heart(e+2.2),this.crow(e+1.6),this.kick(e,.8),this.kick(e+t*8,.6);else if(n===1){for(let n=0;n<16;n+=2)this.chord(e+n*t,50,t*.85,.55,!0);this.bass(e,38,t*15,.7);for(let n of[0,4,8,12])this.kick(e+n*t,.7);for(let n=0;n<16;n+=2)this.hat(e+n*t,n===14);this.crow(e+t*10)}else if(n===2){for(let n=0;n<16;n+=2)this.chord(e+n*t,50,t*.85,.6,!0);for(let n of[3,7,11,15])this.chord(e+n*t,51,t*.7,.6,!0);this.bass(e,38,t*15,.72);for(let n=0;n<16;n++)r[n]&&this.kick(e+n*t,.62);this.snare(e+4*t,.7),this.snare(e+12*t,.75);for(let n=0;n<16;n+=2)this.hat(e+n*t,!1);this.scream(e+t*11,.55)}else{for(let n=0;n<8;n++)this.chord(e+n*t,50,t*.8,.5+n*.03,!0);for(let n=4;n<16;n++)this.snare(e+n*t,.42+(n-4)*.035);for(let[n,r]of[12,13,14,15].entries())this.tom(e+r*t,o[n],.75);for(let n of[0,2,4,6,8,10,12,13,14,15])this.kick(e+n*t,.6);this.bass(e,38,t*7,.6),this.door(e+t*8),this.noiseRiser(e+t*8,t*8)}}riffA(e,i,a){a&&this.crash(e,.8);for(let r=0;r<16;r++){let a=t.has(r);this.chord(e+r*i,n[r],a?i*2.6:i*.85,a?.92:.6,!a)}for(let t=0;t<16;t+=2)this.bass(e+t*i,(n[t]??50)-12,i*1.05,t===0?.85:.6);for(let t=0;t<16;t++)r[t]&&this.kick(e+t*i,t%4==0?.8:.62);this.snare(e+4*i,.85),this.snare(e+12*i,.85);for(let t=0;t<16;t+=2)this.hat(e+t*i,t===14)}riffB(e,t,n,r){this.chord(e,n,t*3.4,.95,!1),this.chord(e+3*t,n,t*.8,.6,!0),this.chord(e+6*t,n,t*.8,.55,!0),this.chord(e+8*t,n,t*2.3,.9,!1),this.chord(e+11*t,n,t*.8,.6,!0),this.chord(e+14*t,n,t*.8,.65,!0),this.bass(e,n-12,t*3.2,.85),this.bass(e+6*t,n-12,t*.9,.6),this.bass(e+8*t,n-12,t*2.2,.75),this.bass(e+14*t,n-12,t*1.8,.65);for(let n of[0,3,6,8,11,14])this.kick(e+n*t,n===0?.82:.6);this.snare(e+4*t,.8),this.snare(e+12*t,.82);for(let n=0;n<16;n+=2)this.hat(e+n*t,n===6);if(r){for(let[n,r]of[12,13,14,15].entries())this.tom(e+r*t,o[n],.7);this.bass(e+15*t,n-12,t,.6)}}chorusBar(e,t,n,r){r&&this.crash(e,.75);for(let r of[0,4,8,12])this.chord(e+r*t,n,t*(r===0?3.1:1.7),.95,!1);for(let r of[14,15])this.chord(e+r*t,n,t*.85,.62,!0);for(let r=0;r<16;r+=2)this.bass(e+r*t,n-12,t*1.1,.8);for(let n=0;n<16;n++)this.kick(e+n*t,n%4==0?.78:.5);this.snare(e+4*t,.9),this.snare(e+12*t,.9),this.snare(e+15*t,.45);for(let n=0;n<16;n+=2)this.hat(e+n*t,n===14)}leadPhrase(e,t,n,r){for(let[i,a,o,s]of n){let n=o*t*.92;this.lead(e+i*t,a,n,r,s,o>=3?.9:0)}}fillBar(e,t){for(let n=0;n<8;n++)this.chord(e+n*t,50,t*.8,.5+n*.04,!0);this.bass(e,38,t*7.5,.6);for(let n=4;n<16;n++)this.snare(e+n*t,.4+(n-4)*.04);for(let[n,r]of[12,13,14,15].entries())this.tom(e+r*t,o[n],.8);for(let n of[0,2,4,6,8,10,12,13,14,15])this.kick(e+n*t,.55);this.crow(e+t*2),this.door(e+t*9)}breakBar(e,t,n){let r=n===36?50:n===37?51:50;this.crash(e,.85),this.chord(e,r,t*3.4,.95,!1),this.chord(e+8*t,51,t*3,.9,!1),this.bass(e,r-12,t*3.4,.8),this.bass(e+8*t,39,t*3,.75),this.kick(e,.8),this.kick(e+8*t,.7),this.snare(e+4*t,.8),this.snare(e+12*t,.85);for(let n=0;n<16;n+=2)this.hat(e+n*t,!1);this.scream(e+t*1.5,.5),this.heart(e+t*6)}outroBar(e,t,n){if(n===36)this.crash(e,.9),this.chord(e,50,t*3.6,.95,!1),this.bass(e,38,t*3.8,.85),this.kick(e,.8),this.snare(e+8*t,.75),this.heart(e+t*2),this.door(e+t*9);else if(n===37)this.chord(e,51,t*3.4,.95,!1),this.chord(e+8*t,50,t*2.5,.9,!1),this.bass(e,39,t*3.4,.8),this.bass(e+8*t,38,t*2.5,.75),this.kick(e,.7),this.snare(e+4*t,.75),this.snare(e+12*t,.8),this.crow(e+t*2);else{this.chord(e,55,t*3.2,.9,!1),this.chord(e+8*t,57,t*3.2,.9,!1),this.bass(e,43,t*3.2,.78),this.bass(e+8*t,45,t*3.2,.72),this.kick(e,.7),this.kick(e+8*t,.7),this.snare(e+4*t,.8),this.snare(e+12*t,.82);for(let[n,r]of[13,14,15].entries())this.tom(e+r*t,o[n],.7);this.scream(e+t*6,.42)}}chord(t,n,r,i,a){let o=this.ctx,s=i*(a?.8:.95);for(let[c,l]of[[0,this.gtrL],[1,this.gtrR]]){let u=t+c*.006,d=o.createGain();d.gain.setValueAtTime(1e-4,u),d.gain.linearRampToValueAtTime(s,u+.004);let f=a?.05:Math.min(.4,r);d.gain.exponentialRampToValueAtTime(Math.max(2e-4,s*.3),u+f),d.gain.setValueAtTime(Math.max(2e-4,s*(a?.14:.28)),u+r),d.gain.exponentialRampToValueAtTime(1e-4,u+r+(a?.05:.09)),d.connect(l);let p=a?[[0,-3],[7,4]]:[[0,-3],[7,3],[12,5]];for(let[t,i]of p){let a=o.createOscillator();a.type=`sawtooth`,a.frequency.value=e(n+t),a.detune.value=i*(c?1:-1),a.connect(d),a.start(u),a.stop(u+r+.15)}let m=o.createBufferSource();m.buffer=this.noise;let h=o.createBiquadFilter();h.type=`bandpass`,h.frequency.value=2600,h.Q.value=1.4;let g=o.createGain();g.gain.setValueAtTime(.11*i,u),g.gain.exponentialRampToValueAtTime(1e-4,u+.035),m.connect(h).connect(g).connect(l),m.start(u,Math.random()*1.4),m.stop(u+.05)}}bass(t,n,r,i){let a=this.ctx,o=a.createGain();o.gain.setValueAtTime(1e-4,t),o.gain.linearRampToValueAtTime(i,t+.006),o.gain.setValueAtTime(i,t+Math.max(.02,r*.7)),o.gain.exponentialRampToValueAtTime(1e-4,t+r+.05),o.connect(this.bassIn);let s=a.createOscillator();s.type=`sawtooth`,s.frequency.value=e(n);let c=a.createOscillator();c.type=`sine`,c.frequency.value=e(n-12);let l=a.createGain();l.gain.value=.55,s.connect(o),c.connect(l).connect(o),s.start(t),c.start(t),s.stop(t+r+.08),c.stop(t+r+.08)}lead(t,n,r,i,a,o=0){let s=this.ctx,c=s.createGain();c.gain.setValueAtTime(1e-4,t),c.gain.linearRampToValueAtTime(i,t+.01),c.gain.setValueAtTime(i*.9,t+Math.max(.05,r*.7)),c.gain.exponentialRampToValueAtTime(1e-4,t+r+.08),c.connect(this.leadIn);let l=[];for(let[i,o]of[[`sawtooth`,-6],[`square`,5]]){let u=s.createOscillator();u.type=i,u.frequency.setValueAtTime(e(a??n),t),a!==void 0&&u.frequency.exponentialRampToValueAtTime(e(n),t+.11),u.detune.value=o,u.connect(c),u.start(t),u.stop(t+r+.1),l.push(u)}if(o>0){let e=s.createOscillator(),n=s.createGain();e.frequency.value=5.6,n.gain.setValueAtTime(0,t),n.gain.linearRampToValueAtTime(9*o,t+.22),e.connect(n);for(let e of l)n.connect(e.frequency);e.start(t),e.stop(t+r+.1)}}kick(e,t){let n=this.ctx,r=n.createOscillator(),i=n.createGain();r.type=`sine`,r.frequency.setValueAtTime(168,e),r.frequency.exponentialRampToValueAtTime(46,e+.085),i.gain.setValueAtTime(1e-4,e),i.gain.linearRampToValueAtTime(t,e+.003),i.gain.exponentialRampToValueAtTime(1e-4,e+.24),r.connect(i).connect(this.drums),r.start(e),r.stop(e+.28);let a=n.createBufferSource();a.buffer=this.noise;let o=n.createBiquadFilter();o.type=`highpass`,o.frequency.value=2200;let s=n.createGain();s.gain.setValueAtTime(.16*t,e),s.gain.exponentialRampToValueAtTime(1e-4,e+.03),a.connect(o).connect(s).connect(this.drums),a.start(e,Math.random()*1.4),a.stop(e+.04)}snare(e,t){let n=this.ctx,r=n.createBufferSource();r.buffer=this.noise;let i=n.createBiquadFilter();i.type=`bandpass`,i.frequency.value=1850,i.Q.value=.7;let a=n.createGain();a.gain.setValueAtTime(1e-4,e),a.gain.linearRampToValueAtTime(t*.7,e+.002),a.gain.exponentialRampToValueAtTime(1e-4,e+.18),r.connect(i).connect(a).connect(this.drums);let o=n.createGain();o.gain.value=.45,a.connect(o).connect(this.verb),r.start(e,Math.random()*1.4),r.stop(e+.22);let s=n.createOscillator(),c=n.createGain();s.type=`triangle`,s.frequency.setValueAtTime(200,e),s.frequency.exponentialRampToValueAtTime(130,e+.09),c.gain.setValueAtTime(1e-4,e),c.gain.linearRampToValueAtTime(t*.4,e+.002),c.gain.exponentialRampToValueAtTime(1e-4,e+.11),s.connect(c).connect(this.drums),s.start(e),s.stop(e+.14)}hat(e,t){let n=this.ctx,r=n.createBufferSource();r.buffer=this.noise;let i=n.createBiquadFilter();i.type=`highpass`,i.frequency.value=8400;let a=n.createGain();a.gain.setValueAtTime(1e-4,e),a.gain.linearRampToValueAtTime(t?.18:.12,e+.001),a.gain.exponentialRampToValueAtTime(1e-4,e+(t?.22:.045)),r.connect(i).connect(a).connect(this.drums),r.start(e,Math.random()*1.4),r.stop(e+.26)}tom(t,n,r){let i=this.ctx,a=i.createOscillator(),o=i.createGain();a.type=`sine`,a.frequency.setValueAtTime(e(n),t),a.frequency.exponentialRampToValueAtTime(e(n)*.6,t+.16),o.gain.setValueAtTime(1e-4,t),o.gain.linearRampToValueAtTime(r*.8,t+.004),o.gain.exponentialRampToValueAtTime(1e-4,t+.3),a.connect(o).connect(this.drums),a.start(t),a.stop(t+.34);let s=i.createBufferSource();s.buffer=this.noise;let c=i.createBiquadFilter();c.type=`lowpass`,c.frequency.value=500;let l=i.createGain();l.gain.setValueAtTime(r*.18,t),l.gain.exponentialRampToValueAtTime(1e-4,t+.1),s.connect(c).connect(l).connect(this.drums),s.start(t,Math.random()*1.4),s.stop(t+.12)}crash(e,t){let n=this.ctx,r=n.createBufferSource();r.buffer=this.noise;let i=n.createBiquadFilter();i.type=`highpass`,i.frequency.value=4600;let a=n.createGain();a.gain.setValueAtTime(1e-4,e),a.gain.linearRampToValueAtTime(t*.38,e+.003),a.gain.exponentialRampToValueAtTime(1e-4,e+1.7),r.connect(i).connect(a).connect(this.drums);let o=n.createGain();o.gain.value=.5,a.connect(o).connect(this.verb),r.start(e,Math.random()*1.2),r.stop(e+1.8)}drone(t,n,r=.22){let i=this.ctx,a=i.createGain();a.gain.setValueAtTime(1e-4,t),a.gain.linearRampToValueAtTime(r,t+Math.min(.6,n*.3)),a.gain.setValueAtTime(r,t+n*.7),a.gain.exponentialRampToValueAtTime(1e-4,t+n),a.connect(this.bassIn);let o=i.createOscillator();o.type=`sawtooth`,o.frequency.value=e(38);let s=i.createOscillator();s.type=`sine`,s.frequency.value=e(26),s.detune.value=6,o.connect(a),s.connect(a),o.start(t),s.start(t),o.stop(t+n+.1),s.stop(t+n+.1)}heart(e){for(let t=0;t<2;t++){let n=e+t*.17,r=this.ctx.createOscillator(),i=this.ctx.createGain();r.type=`sine`,r.frequency.setValueAtTime(62,n),r.frequency.exponentialRampToValueAtTime(34,n+.16),i.gain.setValueAtTime(1e-4,n),i.gain.linearRampToValueAtTime(.5*(t===0?1:.65),n+.01),i.gain.exponentialRampToValueAtTime(1e-4,n+.2),r.connect(i).connect(this.drums),r.start(n),r.stop(n+.24)}}crow(e){for(let t=0;t<2;t++){let n=e+t*.22,r=this.ctx.createOscillator(),i=this.ctx.createBiquadFilter(),a=this.ctx.createGain();r.type=`sawtooth`,r.frequency.setValueAtTime(620+Math.random()*120,n),r.frequency.exponentialRampToValueAtTime(300,n+.18),i.type=`bandpass`,i.frequency.value=1400,i.Q.value=4,a.gain.setValueAtTime(1e-4,n),a.gain.linearRampToValueAtTime(.18,n+.01),a.gain.exponentialRampToValueAtTime(1e-4,n+.21),r.connect(i).connect(a).connect(this.drums),r.start(n),r.stop(n+.25)}}door(e){let t=this.ctx.createBufferSource();t.buffer=this.noise;let n=this.ctx.createBiquadFilter();n.type=`bandpass`,n.frequency.setValueAtTime(330,e),n.frequency.linearRampToValueAtTime(150,e+.5),n.Q.value=3;let r=this.ctx.createGain();r.gain.setValueAtTime(1e-4,e),r.gain.linearRampToValueAtTime(.22,e+.04),r.gain.exponentialRampToValueAtTime(1e-4,e+.55),t.connect(n).connect(r).connect(this.drums),t.start(e,Math.random()*1.2),t.stop(e+.6)}scream(e,t){let n=this.ctx,r=.9,i=n.createGain();i.gain.setValueAtTime(1e-4,e),i.gain.exponentialRampToValueAtTime(t*.5,e+.05),i.gain.setValueAtTime(t*.5,e+.4),i.gain.exponentialRampToValueAtTime(1e-4,e+r),i.connect(this.verb),i.connect(this.drums);let a=n.createOscillator();a.type=`sawtooth`,a.frequency.setValueAtTime(700,e),a.frequency.exponentialRampToValueAtTime(410,e+.22),a.frequency.exponentialRampToValueAtTime(170,e+r);let o=n.createOscillator(),s=n.createGain();o.frequency.value=7.2,s.gain.value=15,o.connect(s).connect(a.frequency);let c=n.createWaveShaper();c.curve=l(3);for(let[e,t]of[[820,9],[1180,11],[2600,8]]){let r=n.createBiquadFilter();r.type=`bandpass`,r.frequency.value=e,r.Q.value=t;let i=n.createGain();i.gain.value=1.5,a.connect(r).connect(i).connect(c)}c.connect(i),a.start(e),o.start(e),a.stop(e+r),o.stop(e+r)}noiseRiser(e,t){let n=this.ctx.createBufferSource();n.buffer=this.noise,n.loop=!0;let r=this.ctx.createBiquadFilter();r.type=`bandpass`,r.frequency.setValueAtTime(300,e),r.frequency.exponentialRampToValueAtTime(3600,e+t),r.Q.value=1.2;let i=this.ctx.createGain();i.gain.setValueAtTime(1e-4,e),i.gain.exponentialRampToValueAtTime(.16,e+t*.95),i.gain.exponentialRampToValueAtTime(1e-4,e+t+.05),n.connect(r).connect(i).connect(this.drums),n.start(e),n.stop(e+t+.1)}},d=`/moonnight/`,f={door:`${d}sfx/door.mp3`,step:`${d}sfx/step.mp3`,crow:`${d}sfx/crow.mp3`,scream:`${d}sfx/scream.mp3`,glass:`${d}sfx/glass.mp3`,crowd:`${d}sfx/crowd.mp3`},p=`${d}music/dead-beat.mp3`,m=e=>440*2**((e-69)/12),h=m(38),g=m(41),_=m(43),v=m(45),y=m(46),b=m(50),x=[h,0,0,h,0,0,g,0,_,0,0,_,0,v,0,0],S=[1,0,0,0,1,0,1,0,1,0,0,0,1,0,0,1],C=[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],w=[0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],T=class{ctx=null;bpm=128;playing=!1;master;music;sfx;noise;timer=null;nextStepTime=0;stepIdx=0;layerDrums=1;layerBass=1;layerStab=0;layerLead=0;layerHats=0;metal=null;metalGain;metalOn=!1;metalBar=0;muted=!1;musicBuffer=null;musicSource=null;musicStartedAt=0;sfxBuffers={};get ready(){return this.ctx!==null}isRunning(){return this.ctx!==null&&this.ctx.state===`running`}now(){return this.ctx&&this.ctx.state===`running`?this.ctx.currentTime:performance.now()/1e3}async init(){if(this.ctx){this.ctx.state===`suspended`&&await this.ctx.resume();return}let e=new(window.AudioContext??window.webkitAudioContext);this.ctx=e;let t=e.createDynamicsCompressor();t.threshold.value=-14,t.ratio.value=4,t.attack.value=.004,t.release.value=.18,t.connect(e.destination),this.master=e.createGain(),this.master.gain.value=.9,this.master.connect(t),this.music=e.createGain(),this.music.gain.value=.72,this.music.connect(this.master),this.metalGain=e.createGain(),this.metalGain.gain.value=1e-4,this.metalGain.connect(this.music),this.metal=new u(e,this.metalGain),this.sfx=e.createGain(),this.sfx.gain.value=.9,this.sfx.connect(this.master);let n=e.sampleRate*2;this.noise=e.createBuffer(1,n,e.sampleRate);let r=this.noise.getChannelData(0);for(let e=0;e<n;e++)r[e]=Math.random()*2-1;e.state===`suspended`&&await e.resume(),this.loadBuffer(p).then(e=>{e&&(this.musicBuffer=e)});for(let e of Object.keys(f)){let t=f[e];t&&this.loadBuffer(t).then(t=>{t&&(this.sfxBuffers[e]=t)})}}async loadBuffer(e){if(!this.ctx)return null;try{let t=await(await fetch(e)).arrayBuffer();return await this.ctx.decodeAudioData(t)}catch(t){return console.warn(`[audio] 加载 ${e} 失败，回退到程序合成`,t),null}}playSfxFile(e){if(!this.ctx)return!1;let t=this.sfxBuffers[e];if(!t)return!1;let n=this.ctx.createBufferSource();return n.buffer=t,n.connect(this.sfx),n.start(this.ctx.currentTime),!0}setTempo(e){this.bpm=e}setLayers(e){let t=e>=3;if(t!==this.metalOn&&(this.metalOn=t,this.metalBar=0,this.ctx)){let e=this.ctx.currentTime;this.metalGain.gain.cancelScheduledValues(e),this.metalGain.gain.setTargetAtTime(t?.85:1e-4,e,.25)}this.layerDrums=+!t,this.layerBass=+!t,this.layerStab=t||e<1?0:1,this.layerHats=t||e<1?0:1,this.layerLead=t||e<3?0:1}startGroove(){if(this.ctx&&!this.playing){if(this.playing=!0,this.musicBuffer){let e=this.ctx.createBufferSource();e.buffer=this.musicBuffer,e.connect(this.music);let t=this.ctx.currentTime+.08;e.start(t),this.musicSource=e,this.musicStartedAt=t}else this.stepIdx=0,this.metalBar=0,this.nextStepTime=this.ctx.currentTime+.08,this.timer=window.setInterval(()=>this.schedule(),25)}}stopGroove(){if(this.playing=!1,this.musicSource){try{this.musicSource.stop()}catch{}this.musicSource=null}this.timer!==null&&(clearInterval(this.timer),this.timer=null)}get musicAnchor(){return this.musicBuffer?this.musicStartedAt:null}get hasMusicFile(){return this.musicBuffer!==null}get musicPosition(){return!this.ctx||!this.musicSource||this.ctx.state!==`running`?null:Math.max(0,this.ctx.currentTime-this.musicStartedAt)}duckMusic(e,t){if(!this.ctx)return;let n=this.ctx.currentTime;this.music.gain.cancelScheduledValues(n),this.music.gain.setValueAtTime(this.music.gain.value,n),this.music.gain.linearRampToValueAtTime(e,n+.08),this.music.gain.linearRampToValueAtTime(.72,n+t)}silenceMusic(){this.ctx&&(this.music.gain.cancelScheduledValues(this.ctx.currentTime),this.music.gain.setTargetAtTime(1e-4,this.ctx.currentTime,.05))}restoreMusic(){this.ctx&&(this.music.gain.cancelScheduledValues(this.ctx.currentTime),this.music.gain.setTargetAtTime(.72,this.ctx.currentTime,.1))}toggleMute(){return this.master&&(this.muted=!this.muted,this.master.gain.setTargetAtTime(this.muted?0:.9,this.now(),.05)),this.muted}schedule(){if(!this.ctx||!this.playing)return;let e=60/this.bpm/4;for(;this.nextStepTime<this.ctx.currentTime+.12;){let t=this.stepIdx%16,n=this.nextStepTime;if(t===0&&this.metalOn&&this.metal?.scheduleBar(n,this.metalBar++,this.bpm,`game`),this.layerDrums&&(S[t]&&this.kick(n),C[t]&&this.snare(n)),this.layerHats&&t%2==0&&this.hat(n,t%4==2),this.layerBass){let r=x[t];r&&this.bass(n,r,e*1.4)}this.layerStab&&w[t]&&this.stab(n,t%8==3?[b,g,v]:[b,_,y]),this.layerLead&&t%8==6&&this.lead(n,t%16==6?v*2:b*2),this.nextStepTime+=e,this.stepIdx++}}env(e,t,n,r,i){e.gain.setValueAtTime(1e-4,t),e.gain.exponentialRampToValueAtTime(Math.max(2e-4,n),t+r),e.gain.exponentialRampToValueAtTime(1e-4,t+r+i)}kick(e){let t=this.ctx,n=t.createOscillator(),r=t.createGain();n.type=`sine`,n.frequency.setValueAtTime(150,e),n.frequency.exponentialRampToValueAtTime(42,e+.11),this.env(r,e,.95,.004,.3),n.connect(r).connect(this.music),n.start(e),n.stop(e+.4)}snare(e){let t=this.ctx,n=t.createBufferSource();n.buffer=this.noise;let r=t.createBiquadFilter();r.type=`bandpass`,r.frequency.value=1900,r.Q.value=.8;let i=t.createGain();this.env(i,e,.5,.002,.16),n.connect(r).connect(i).connect(this.music),n.start(e,Math.random()*1.5),n.stop(e+.22);let a=t.createOscillator(),o=t.createGain();a.type=`triangle`,a.frequency.setValueAtTime(185,e),a.frequency.exponentialRampToValueAtTime(120,e+.1),this.env(o,e,.28,.002,.1),a.connect(o).connect(this.music),a.start(e),a.stop(e+.16)}hat(e,t){let n=this.ctx,r=n.createBufferSource();r.buffer=this.noise;let i=n.createBiquadFilter();i.type=`highpass`,i.frequency.value=7600;let a=n.createGain();this.env(a,e,t?.16:.1,.001,t?.13:.035),r.connect(i).connect(a).connect(this.music),r.start(e,Math.random()*1.5),r.stop(e+.2)}bass(e,t,n){let r=this.ctx,i=r.createOscillator(),a=r.createBiquadFilter(),o=r.createGain();i.type=`sawtooth`,i.frequency.setValueAtTime(t,e),a.type=`lowpass`,a.frequency.setValueAtTime(900,e),a.frequency.exponentialRampToValueAtTime(220,e+n),a.Q.value=6,this.env(o,e,.34,.006,n),i.connect(a).connect(o).connect(this.music),i.start(e),i.stop(e+n+.05)}stab(e,t){let n=this.ctx,r=n.createGain();this.env(r,e,.12,.004,.22);let i=n.createBiquadFilter();i.type=`lowpass`,i.frequency.value=2400;for(let r of t){let t=n.createOscillator();t.type=`sawtooth`,t.frequency.value=r,t.detune.value=(Math.random()-.5)*12,t.connect(i),t.start(e),t.stop(e+.3)}i.connect(r).connect(this.music)}lead(e,t){let n=this.ctx,r=n.createOscillator(),i=n.createGain(),a=n.createOscillator(),o=n.createGain();r.type=`sine`,r.frequency.setValueAtTime(t*.97,e),r.frequency.linearRampToValueAtTime(t,e+.12),a.frequency.value=5.5,o.gain.value=3,a.connect(o).connect(r.frequency),this.env(i,e,.09,.05,.55),r.connect(i).connect(this.music),r.start(e),a.start(e),r.stop(e+.7),a.stop(e+.7)}noiseBurst(e,t,n,r,i,a,o){let s=this.ctx,c=s.createBufferSource();c.buffer=this.noise;let l=s.createBiquadFilter();l.type=n,l.frequency.value=r,l.Q.value=i;let u=s.createGain();return this.env(u,e,a,.003,t),c.connect(l).connect(u).connect(o),c.start(e,Math.random()*1.2),c.stop(e+t+.1),l}crow(){if(!this.ctx||this.playSfxFile(`crow`))return;let e=this.ctx,t=e.currentTime;for(let n=0;n<2;n++){let r=t+n*.22,i=e.createOscillator(),a=e.createGain(),o=e.createBiquadFilter();i.type=`sawtooth`,i.frequency.setValueAtTime(620+Math.random()*120,r),i.frequency.exponentialRampToValueAtTime(300,r+.18),o.type=`bandpass`,o.frequency.value=1400,o.Q.value=4,this.env(a,r,.22,.01,.2),i.connect(o).connect(a).connect(this.sfx),i.start(r),i.stop(r+.25)}}heartbeat(e=1){if(!this.ctx)return;let t=this.ctx,n=t.currentTime;for(let r=0;r<2;r++){let i=n+r*.17,a=t.createOscillator(),o=t.createGain();a.type=`sine`,a.frequency.setValueAtTime(62,i),a.frequency.exponentialRampToValueAtTime(34,i+.16),this.env(o,i,.5*e*(r===0?1:.65),.01,.16),a.connect(o).connect(this.sfx),a.start(i),a.stop(i+.22)}}door(){if(!this.ctx||this.playSfxFile(`door`))return;let e=this.ctx.currentTime,t=this.noiseBurst(e,.5,`bandpass`,320,3,.3,this.sfx);t.frequency.setValueAtTime(300,e),t.frequency.linearRampToValueAtTime(140,e+.45)}stinger(){if(!this.ctx)return;let e=this.ctx,t=e.currentTime,n=e.createOscillator(),r=e.createOscillator(),i=e.createGain();n.type=`sawtooth`,r.type=`sawtooth`,n.frequency.setValueAtTime(220,t),n.frequency.exponentialRampToValueAtTime(880,t+.35),r.frequency.setValueAtTime(233,t),r.frequency.exponentialRampToValueAtTime(932,t+.35),this.env(i,t,.16,.004,.5),n.connect(i),r.connect(i),i.connect(this.sfx),n.start(t),r.start(t),n.stop(t+.6),r.stop(t+.6)}glass(){if(!this.ctx||this.playSfxFile(`glass`))return;let e=this.ctx.currentTime;this.noiseBurst(e,.5,`highpass`,2600,1,.5,this.sfx),this.noiseBurst(e+.02,.35,`bandpass`,5200,8,.25,this.sfx)}scream(){if(!this.ctx||this.playSfxFile(`scream`))return;let e=this.ctx,t=e.currentTime,n=1.1,r=e.createGain();r.gain.setValueAtTime(1e-4,t),r.gain.exponentialRampToValueAtTime(.55,t+.06),r.gain.setValueAtTime(.55,t+.5),r.gain.exponentialRampToValueAtTime(1e-4,t+n),r.connect(this.sfx);let i=e.createWaveShaper(),a=new Float32Array(1024);for(let e=0;e<1024;e++){let t=e/1023*2-1;a[e]=Math.tanh(t*3.2)}i.curve=a,i.connect(r);let o=e.createOscillator();o.type=`sawtooth`,o.frequency.setValueAtTime(760,t),o.frequency.exponentialRampToValueAtTime(430,t+.25),o.frequency.exponentialRampToValueAtTime(175,t+n);let s=e.createOscillator(),c=e.createGain();s.frequency.value=7.5,c.gain.value=16,s.connect(c).connect(o.frequency);for(let[t,n]of[[820,9],[1180,11],[2650,8]]){let r=e.createBiquadFilter();r.type=`bandpass`,r.frequency.value=t,r.Q.value=n;let a=e.createGain();a.gain.value=1.6,o.connect(r).connect(a).connect(i)}let l=e.createBufferSource();l.buffer=this.noise;let u=e.createBiquadFilter();u.type=`bandpass`,u.frequency.value=1800,u.Q.value=1.2;let d=e.createGain();d.gain.setValueAtTime(1e-4,t),d.gain.exponentialRampToValueAtTime(.18,t+.08),d.gain.exponentialRampToValueAtTime(1e-4,t+.8),l.connect(u).connect(d).connect(r),l.start(t),l.stop(t+.9),o.start(t),s.start(t),o.stop(t+n),s.stop(t+n)}crowd(){if(!this.ctx||this.playSfxFile(`crowd`))return;let e=this.ctx,t=e.currentTime;for(let n=0;n<5;n++){let n=t+Math.random()*.12,r=e.createOscillator(),i=e.createGain(),a=e.createBiquadFilter(),o=e.createBiquadFilter();r.type=`sawtooth`,r.frequency.setValueAtTime(120+Math.random()*90,n),r.frequency.exponentialRampToValueAtTime(70+Math.random()*40,n+.9),a.type=`bandpass`,a.frequency.value=450+Math.random()*200,a.Q.value=3,o.type=`bandpass`,o.frequency.value=1100+Math.random()*500,o.Q.value=5,this.env(i,n,.16,.05,.9),r.connect(a).connect(o).connect(i).connect(this.sfx),r.start(n),r.stop(n+1.1)}}step(){if(!this.ctx||this.playSfxFile(`step`))return;let e=this.ctx.currentTime;this.noiseBurst(e,.08,`lowpass`,420,1,.16,this.sfx)}},E={torso:1,shoulderHalf:.29,headUp:.4,headR:.155,upperArm:.44,foreArm:.42,thigh:.55,shin:.52,hipHalf:.19},D=E.headUp+E.headR+E.torso+E.thigh+E.shin,O={x:0,y:-1},k=(e,t)=>({x:e.x+t.x,y:e.y+t.y}),ee=(e,t)=>({x:e.x-t.x,y:e.y-t.y}),A=(e,t)=>({x:e.x*t,y:e.y*t});function te(e,t){let n=Math.cos(t),r=Math.sin(t);return{x:e.x*n-e.y*r,y:e.x*r+e.y*n}}var ne=Math.PI/180,re=180/Math.PI;function ie(e,t){let n=e*ne;return{x:Math.sin(n)*t,y:-Math.cos(n)}}function ae(e){let t=e.lean??0,n=te(O,Math.PI+t*ne),r=te(n,-Math.PI/2),i={x:0,y:0},a=k(i,A(n,E.torso)),o=k(a,A(r,E.shoulderHalf)),s=k(a,A(r,-E.shoulderHalf)),c=e.armL??[0,0],l=e.armR??[0,0],u=e.legL??[0,0],d=e.legR??[0,0],f=k(o,A(ie(c[0],1),E.upperArm)),p=k(f,A(ie(c[0]+c[1],1),E.foreArm)),m=k(s,A(ie(l[0],-1),E.upperArm)),h=k(m,A(ie(l[0]+l[1],-1),E.foreArm)),g=k(i,A(r,E.hipHalf)),_=k(i,A(r,-E.hipHalf)),v=k(g,A(ie(u[0],1),E.thigh)),y=k(v,A(ie(u[0]+u[1],1),E.shin)),b=k(_,A(ie(d[0],-1),E.thigh)),x=k(b,A(ie(d[0]+d[1],-1),E.shin)),S=(e.head??0)*ne;return{pelvis:i,shoulderCenter:a,head:k(k(a,A(n,E.headUp)),A(te(r,-S),0)),lShoulder:o,lElbow:f,lWrist:p,rShoulder:s,rElbow:m,rWrist:h,lHip:g,lKnee:v,lAnkle:y,rHip:_,rKnee:b,rAnkle:x}}function oe(e,t,n){let r=t.x-e.x,i=t.y-e.y;return Math.atan2(r*n,-i)*re}function se(e){for(;e>180;)e-=360;for(;e<-180;)e+=360;return e}function ce(e){let t=Math.atan2(e.shoulderCenter.x-e.pelvis.x,e.shoulderCenter.y-e.pelvis.y)*re,n=ee(e.head,e.shoulderCenter),r=Math.atan2(n.x,n.y)*re,i=oe(e.lShoulder,e.lElbow,1),a=se(oe(e.lElbow,e.lWrist,1)-i),o=oe(e.rShoulder,e.rElbow,-1),s=se(oe(e.rElbow,e.rWrist,-1)-o),c=oe(e.lHip,e.lKnee,1),l=se(oe(e.lKnee,e.lAnkle,1)-c),u=oe(e.rHip,e.rKnee,-1),d=se(oe(e.rKnee,e.rAnkle,-1)-u);return{lean:t,head:se(r-t),armLSh:i,armLEl:a,armRSh:o,armREl:s,legLHip:c,legLKnee:l,legRHip:u,legRKnee:d}}var le=[[`armLSh`,1],[`armLEl`,.7],[`armRSh`,1],[`armREl`,.7],[`legLHip`,.55],[`legLKnee`,.35],[`legRHip`,.55],[`legRKnee`,.35],[`lean`,.7],[`head`,.2]];function ue(e,t){let n=ce(e),r=ce(t),i=0,a=0;for(let[e,t]of le)i+=Math.abs(se(n[e]-r[e]))*t,a+=t;let o=i/a;return Math.max(0,Math.min(1,1-o/46))}function de(e,t,n){let r=(e=0,t=0)=>e+(t-e)*n,i=(e,t)=>[r(e?.[0],t?.[0]),r(e?.[1],t?.[1])];return{lean:r(e.lean,t.lean),head:r(e.head,t.head),armL:i(e.armL,t.armL),armR:i(e.armR,t.armR),legL:i(e.legL,t.legL),legR:i(e.legR,t.legR)}}var fe=e=>e<.5?2*e*e:1-(-2*e+2)**2/2,pe={armL:[10,-8],armR:[10,-8],legL:[5,0],legR:[5,0],lean:0,head:0},me={stand:{id:`stand`,name:`站住`,params:pe,key:`↓`},spread:{id:`spread`,name:`张开`,params:{armL:[96,0],armR:[96,0],legL:[10,0],legR:[10,0],lean:0,head:0},key:`↑`},armsUp:{id:`armsUp`,name:`举高`,params:{armL:[152,12],armR:[152,12],legL:[6,0],legR:[6,0],head:-6},key:`↑`},slump:{id:`slump`,name:`垂下`,params:{armL:[2,-4],armR:[2,-4],legL:[5,0],legR:[5,0],lean:6,head:20},key:`↓`},clawL:{id:`clawL`,name:`左手抓`,params:{armL:[118,74],armR:[6,-6],legL:[6,0],legR:[6,0],lean:-8,head:-6},key:`←`},clawR:{id:`clawR`,name:`右手抓`,params:{armR:[118,74],armL:[6,-6],legL:[6,0],legR:[6,0],lean:8,head:6},key:`→`},kneeL:{id:`kneeL`,name:`抬左膝`,params:{legL:[78,-82],legR:[2,0],armL:[26,0],armR:[26,0],lean:4},key:`←`},kneeR:{id:`kneeR`,name:`抬右膝`,params:{legR:[78,-82],legL:[2,0],armL:[26,0],armR:[26,0],lean:-4},key:`→`},leanL:{id:`leanL`,name:`向左倒`,params:{lean:26,head:10,armL:[46,0],armR:[46,0],legL:[12,0],legR:[4,0]},key:`←`},leanR:{id:`leanR`,name:`向右倒`,params:{lean:-26,head:-10,armL:[46,0],armR:[46,0],legL:[4,0],legR:[12,0]},key:`→`},reach:{id:`reach`,name:`斜伸`,params:{armL:[128,6],armR:[34,-18],lean:12,head:12,legL:[16,0],legR:[2,0]},key:`↑`},twist:{id:`twist`,name:`扭身`,params:{armL:[62,58],armR:[62,-58],lean:-12,head:18,legL:[8,0],legR:[8,0]},key:`←`},clawBoth:{id:`clawBoth`,name:`双手抓`,params:{armL:[104,82],armR:[104,82],lean:0,head:-4,legL:[8,0],legR:[8,0]},key:`↑`},hang:{id:`hang`,name:`手伸直`,params:{armL:[168,4],armR:[168,4],lean:0,head:26,legL:[4,0],legR:[4,0]},key:`↑`},stepL:{id:`stepL`,name:`左踏步`,params:{legL:[34,-26],legR:[2,0],armL:[30,0],armR:[58,0],lean:8},key:`←`},stepR:{id:`stepR`,name:`右踏步`,params:{legR:[34,-26],legL:[2,0],armL:[58,0],armR:[30,0],lean:-8},key:`→`},stepBack:{id:`stepBack`,name:`退步`,params:{legL:[10,14],legR:[10,14],armL:[24,-10],armR:[24,-10],lean:18,head:8},key:`↓`},lookUp:{id:`lookUp`,name:`抬头`,params:{armL:[4,-2],armR:[4,-2],legL:[5,0],legR:[5,0],lean:-4,head:-34},key:`→`}},he=[`reach`,`stepBack`,`twist`,`lookUp`],ge=129.2,_e=[[`reach`,`slump`,`twist`,`spread`,`stepBack`,`lookUp`,`slump`,`reach`],[`reach`,`slump`,`twist`,`leanR`,`stepBack`,`spread`,`kneeL`,`lookUp`,`slump`,`reach`],[`reach`,`stepBack`,`twist`,`clawR`,`spread`,`kneeL`,`lookUp`,`leanL`,`armsUp`,`stepL`,`slump`,`reach`],[`reach`,`clawL`,`stepBack`,`kneeR`,`twist`,`leanR`,`armsUp`,`lookUp`,`stepL`,`hang`,`slump`,`clawR`,`kneeL`,`reach`],[`reach`,`stepL`,`armsUp`,`leanR`,`stepBack`,`clawL`,`lookUp`,`hang`,`kneeL`,`clawBoth`,`slump`,`stepR`,`twist`,`spread`,`leanL`,`reach`],[`reach`,`clawL`,`leanR`,`stepBack`,`kneeL`,`armsUp`,`twist`,`clawR`,`hang`,`stepL`,`slump`,`leanL`,`spread`,`kneeR`,`clawBoth`,`stepR`,`twist`,`reach`]],j=[4,4,4,3,3,3],ve=[`stepBack`,`lookUp`,`reach`,`twist`,`stepBack`,`lookUp`,`reach`,`twist`],ye=[`reach`,`stepBack`,`twist`,`lookUp`,`reach`,`stepBack`,`twist`,`lookUp`,`reach`,`stepBack`,`twist`,`lookUp`,`reach`,`stepBack`,`twist`,`lookUp`,`reach`,`stepBack`,`twist`,`lookUp`];function be(e){let t=Math.min(6,Math.max(1,e));return{level:t,bpm:ge,beatsPerMove:j[t-1],moveIds:_e[t-1],cycleBeats:Math.max(8,13-t),zombieCount:Math.min(6,t+1)}}function M(e){return e===`breakdown`?{level:6,bpm:ge,beatsPerMove:4,moveIds:ve,cycleBeats:8,zombieCount:6}:{level:6,bpm:ge,beatsPerMove:4,moveIds:ye,cycleBeats:8,zombieCount:6}}var xe=`#000000`,N=`196, 222, 214`;function P(e){return e/D}function Se(e,t,n,r,i={}){let a=P(r);return{pose:e,x:t,y:n-(E.thigh+E.shin)*a,height:r,alpha:1,stare:0,...i}}function Ce(e,t,n,r){e.lineWidth=r,e.beginPath(),e.moveTo(t.x,t.y),e.lineTo(n.x,n.y),e.stroke()}function we(e,t){let n=P(t.height),r=t.x+(t.lag??0),i=t.y,a=t.variant??0,o=e=>({x:r+e.x*n,y:i-e.y*n}),s=t.pose,c=o(s.pelvis),l=o(s.shoulderCenter),u=o(s.head),d=o(s.lShoulder),f=o(s.lElbow),p=o(s.lWrist),m=o(s.rShoulder),h=o(s.rElbow),g=o(s.rWrist),_=o(s.lHip),v=o(s.lKnee),y=o(s.lAnkle),b=o(s.rHip),x=o(s.rKnee),S=o(s.rAnkle),C=Math.max(3,n*.155),w=Math.max(2.5,n*.12),T=Math.max(4,n*.2),D=Math.max(3,n*.15),O=n*E.headR,k=a===3?{x:u.x+O*.75,y:u.y+O*.55}:u,ee=a===1,A=a===4,te=()=>{if(e.lineCap=`round`,e.lineJoin=`round`,t.wire){e.strokeStyle=`rgba(${N}, 0.72)`,e.shadowColor=`rgba(${N}, 0.55)`,e.shadowBlur=12,e.lineWidth=1.4,e.beginPath(),e.moveTo(d.x,d.y),e.lineTo(_.x,_.y),e.lineTo(b.x,b.y),e.lineTo(m.x,m.y),e.closePath(),e.moveTo(l.x,l.y),e.lineTo(d.x,d.y),e.moveTo(l.x,l.y),e.lineTo(m.x,m.y),e.moveTo(l.x,l.y),e.lineTo(c.x,c.y);for(let[t,n,r]of[[d,f,p],[m,h,g],[_,v,y],[b,x,S]])e.moveTo(t.x,t.y),e.lineTo(n.x,n.y),e.lineTo(r.x,r.y);e.stroke(),e.beginPath(),e.arc(u.x,u.y,O,0,Math.PI*2),e.stroke(),e.shadowBlur=0;return}let r=()=>{if(Ce(e,d,f,C),a===2?Ce(e,f,{x:f.x+(p.x-f.x)*.55,y:f.y+(p.y-f.y)*.55},w):Ce(e,f,p,w),Ce(e,m,h,C),Ce(e,h,g,w),A)e.beginPath(),e.moveTo(_.x,_.y),e.quadraticCurveTo(c.x+n*.1,c.y+n*.22,b.x,b.y),e.lineTo(b.x+n*.04,b.y+n*.18),e.quadraticCurveTo(c.x,c.y+n*.34,_.x-n*.04,_.y+n*.18),e.closePath(),e.fill();else if(Ce(e,_,v,T),Ce(e,v,y,D),Ce(e,b,x,T),Ce(e,x,S,D),t.skirt){let t=c.y+n*.72,r=n*.46;e.beginPath(),e.moveTo(_.x,_.y),e.lineTo(c.x+r,t),e.quadraticCurveTo(c.x,t+n*.08,c.x-r,t),e.lineTo(b.x,b.y),e.closePath(),e.fill()}if(e.beginPath(),e.moveTo(d.x,d.y),e.lineTo(_.x,_.y),e.lineTo(b.x,b.y),e.lineTo(m.x,m.y),e.closePath(),e.fill(),!ee)Ce(e,l,k,O*.9),e.beginPath(),e.arc(k.x,k.y,O,0,Math.PI*2),e.fill(),t.hat&&a===0&&(e.beginPath(),e.ellipse(k.x,k.y-O*.52,O*1.72,O*.2,0,0,Math.PI*2),e.fill(),e.beginPath(),e.moveTo(k.x-O*.8,k.y-O*.5),e.lineTo(k.x-O*.6,k.y-O*1.38),e.quadraticCurveTo(k.x,k.y-O*1.5,k.x+O*.6,k.y-O*1.38),e.lineTo(k.x+O*.8,k.y-O*.5),e.closePath(),e.fill());else{let t={x:_.x+n*.16,y:_.y+n*.02};e.beginPath(),e.arc(t.x,t.y,O,0,Math.PI*2),e.fill(),Ce(e,{x:f.x,y:f.y},{x:t.x-O*.6,y:t.y},C*.9)}};if(e.strokeStyle=`rgba(${N}, 0.30)`,e.fillStyle=`rgba(${N}, 0.30)`,e.save(),e.lineWidth=2.4,r(),e.restore(),e.strokeStyle=xe,e.fillStyle=xe,r(),a===2&&(e.beginPath(),e.ellipse(p.x+n*.02,p.y+n*.1,n*.055,n*.035,.4,0,Math.PI*2),e.fill()),t.stare>.01){let r=t.stare,i=O*.36,a=O*.05,o=ee?{x:_.x+n*.16,y:_.y+n*.02}:k;e.globalAlpha=t.alpha*r,e.fillStyle=`rgba(232, 244, 238, ${.45+.5*r})`,e.shadowColor=`rgba(232, 244, 238, ${.9*r})`,e.shadowBlur=Math.max(4,n*.05),e.beginPath(),e.arc(o.x-i,o.y+a,Math.max(.9,n*.013),0,Math.PI*2),e.arc(o.x+i,o.y+a,Math.max(.9,n*.013),0,Math.PI*2),e.fill(),e.shadowBlur=0,r>.55&&(e.globalAlpha=t.alpha*(r-.55)*1.6,e.beginPath(),e.ellipse(o.x,o.y+O*.34,O*.16,O*.22,0,0,Math.PI*2),e.fillStyle=`rgba(12, 14, 14, 0.95)`,e.fill())}};if(e.save(),e.globalAlpha=t.alpha,t.sway&&(e.translate(r,i),e.rotate(t.sway),e.translate(-r,-i)),t.reflection){let r=t.y+(E.thigh+E.shin)*n;e.save(),e.translate(0,r*2),e.scale(1,-1),e.globalAlpha=t.alpha*.085,te(),e.restore()}te(),e.restore()}function Te(e){let t=Math.sin(e*127.1+311.7)*43758.5453;return t-Math.floor(t)}var Ee=null;function De(){if(Ee)return Ee;let e=document.createElement(`canvas`);e.width=512,e.height=256;let t=e.getContext(`2d`);for(let e=0;e<46;e++){let n=Te(e*3.3)*512,r=100+Te(e*7.1)*150,i=40+Te(e*5.7)*90,a=t.createRadialGradient(n,r,0,n,r,i);a.addColorStop(0,`rgba(180, 208, 202, 0.16)`),a.addColorStop(1,`rgba(180, 208, 202, 0)`),t.fillStyle=a,t.fillRect(n-i,r-i,i*2,i*2)}return Ee=e,e}function Oe(e,t,n){let r=n*.72;e.save(),e.beginPath(),e.rect(t*.13,n*.04,t*.74,n*.62),e.clip(),e.strokeStyle=`rgba(2, 5, 6, 0.92)`,e.lineCap=`round`;let i=(t,n,r,a,o,s,c)=>{if(s<=0||a<6)return;let l=t+Math.cos(r)*a,u=n+Math.sin(r)*a;e.lineWidth=o,e.beginPath(),e.moveTo(t,n),e.lineTo(l,u),e.stroke();for(let e=0;e<2;e++){let t=r+(Te(c+e*3.1)-.5)*1.1;i(l,u,t,a*(.62+Te(c+e*7.7)*.16),o*.62,s-1,c+e*11+1)}};i(t*.2,r-20,-Math.PI/2-.08,n*.24,12,5,3),i(t*.82,r-20,-Math.PI/2+.14,n*.21,10,5,9),i(t*.55,r-16,-Math.PI/2,n*.14,5,4,21),e.restore()}function ke(e,t,n,r,i){let a=[[.24,.2],[.78,.17],[.33,.31],[.68,.27],[.16,.36],[.86,.33],[.45,.14],[.6,.39]];e.save(),e.fillStyle=`rgba(1, 3, 4, 0.96)`;for(let o=0;o<Math.min(r,a.length);o++){let[r,s]=a[o],c=t*r,l=n*s+Math.sin(i*.7+o)*1.2,u=Math.max(5,t*.009);e.save(),e.translate(c,l),e.beginPath(),e.ellipse(0,0,u,u*.45,-.3,0,Math.PI*2),e.fill(),e.beginPath(),e.arc(u*.85,-u*.18,u*.3,0,Math.PI*2),e.fill(),e.beginPath(),e.moveTo(-u*.8,0),e.lineTo(-u*1.6,u*.14),e.lineTo(-u*.8,u*.2),e.closePath(),e.fill(),e.restore()}e.restore()}function Ae(e,t,n,r){let i=n*.72;e.fillStyle=`#05090a`,e.fillRect(0,0,t,n);let a=t*.13,o=t*.87,s=n*.04,c=n*.66,l=e.createLinearGradient(0,s,0,c);l.addColorStop(0,`rgba(26, 46, 52, 0.98)`),l.addColorStop(.38,`rgba(90, 130, 128, 0.72)`),l.addColorStop(.72,`rgba(170, 204, 198, 0.44)`),l.addColorStop(1,`rgba(120, 158, 155, 0.14)`),e.fillStyle=l,e.fillRect(a,s,o-a,c-s);for(let t=0;t<44;t++){let n=a+Te(t*5.3)*(o-a),r=s+Te(t*9.7)*(c-s)*.5;e.fillStyle=`rgba(226, 244, 238, ${.14+Te(t*3.9)*.4})`,e.fillRect(n,r,1.4,1.4)}let u=t*.66,d=s+n*.14,f=Math.max(13,t*.042),p=e.createRadialGradient(u,d,f*.5,u,d,f*6);p.addColorStop(0,`rgba(240, 255, 250, 0.5)`),p.addColorStop(.22,`rgba(214, 240, 233, 0.2)`),p.addColorStop(1,`rgba(200, 228, 220, 0)`),e.fillStyle=p,e.fillRect(a,s,o-a,c-s);let m=e.createRadialGradient(u-f*.3,d-f*.35,f*.1,u,d,f);m.addColorStop(0,`rgba(253, 255, 252, 0.98)`),m.addColorStop(.72,`rgba(228, 247, 239, 0.92)`),m.addColorStop(1,`rgba(198, 224, 216, 0.72)`),e.beginPath(),e.arc(u,d,f,0,Math.PI*2),e.fillStyle=m,e.fill(),e.fillStyle=`rgba(150, 182, 176, 0.2)`;for(let t=0;t<5;t++){let n=Te(t*4.1)*Math.PI*2,r=Te(t*7.3)*f*.6;e.beginPath(),e.arc(u+Math.cos(n)*r,d+Math.sin(n)*r,f*(.09+Te(t*2.3)*.16),0,Math.PI*2),e.fill()}Oe(e,t,n),ke(e,t,n,r.crowCount,r.time),e.fillStyle=`#030607`;for(let t=1;t<=3;t++){let n=a+(o-a)*t/4;e.fillRect(n-4,s,8,c-s)}for(let t=1;t<=2;t++){let n=s+(c-s)*t/3;e.fillRect(a,n-3,o-a,6)}e.strokeStyle=`rgba(200, 228, 220, 0.16)`,e.lineWidth=3,e.strokeRect(a,s,o-a,c-s);let h=e.createLinearGradient(0,c,0,i);h.addColorStop(0,`rgba(150, 190, 185, 0.06)`),h.addColorStop(1,`rgba(150, 190, 185, 0)`),e.fillStyle=h,e.fillRect(0,c,t,i-c);let g=e.createLinearGradient(0,i,0,n);g.addColorStop(0,`#0c1213`),g.addColorStop(.45,`#080c0d`),g.addColorStop(1,`#020303`),e.fillStyle=g,e.fillRect(0,i,t,n-i),e.strokeStyle=`rgba(160, 190, 185, 0.06)`,e.lineWidth=1;for(let r=1;r<10;r++){let a=r/10,o=i+(n-i)*a*a;e.beginPath(),e.moveTo(0,o),e.lineTo(t,o),e.stroke()}for(let r=-7;r<=7;r++){let a=t/2+t/8*r,o=t/2+t/1.9*r;e.beginPath(),e.moveTo(a,i),e.lineTo(o,n),e.stroke()}let _=e.createRadialGradient(t*.5,i,10,t*.5,i,t*.6);_.addColorStop(0,`rgba(150, 190, 185, 0.12)`),_.addColorStop(1,`rgba(150, 190, 185, 0)`),e.fillStyle=_,e.fillRect(0,i-n*.15,t,n*.55);let v=e.createRadialGradient(t*.5,c,0,t*.5,c,Math.max(t,n)*.55);v.addColorStop(0,`rgba(255, 70, 44, ${.06+r.blood*.16})`),v.addColorStop(1,`rgba(255, 70, 44, 0)`),e.fillStyle=v,e.fillRect(0,c-n*.12,t,n-c+n*.12),e.fillStyle=`rgba(178, 38, 28, ${.55+r.blood*.4})`,e.fillRect(a+10,c-2,o-a-20,2)}function je(e,t,n,r){let i=De();e.save(),e.globalCompositeOperation=`screen`;for(let a=0;a<3;a++){let o=r*(9+a*7)%i.width,s=1+a*.35,c=n*(.55+a*.1);e.globalAlpha=.16-a*.03;for(let n=-o;n<t;n+=i.width*s)e.drawImage(i,n,c,i.width*s,i.height*s)}e.restore()}function Me(e,t,n,r){if(r<.04)return;let i=Math.floor(r*14);e.save();for(let a=0;a<i;a++){let i=t*(.08+Te(a*3.1)*.84),o=n*(.05+Te(a*7.7)*.8),s=i,c=o,l=Te(a*11.3)*Math.PI*2,u=5+Math.floor(Te(a*5.5)*6);e.beginPath(),e.moveTo(s,c);for(let t=0;t<u;t++){l+=(Te(a*13+t)-.5)*1.6;let n=10+Te(a*17+t)*46;s+=Math.cos(l)*n,c+=Math.sin(l)*n,e.lineTo(s,c)}e.strokeStyle=`rgba(210, 228, 224, ${.05+r*.3})`,e.lineWidth=1,e.stroke()}e.restore()}function Ne(e,t,n,r){e.save();for(let i=0;i<70;i++){let a=4+Te(i)*12,o=(Te(i*2.7)*t+Math.sin(r*.3+i)*18+t)%t,s=((Te(i*4.3)*n-r*a)%n+n)%n;e.fillStyle=`rgba(200, 222, 216, ${.03+Te(i*9.1)*.09})`,e.fillRect(o,s,1.2,1.2)}e.restore()}function Pe(e,t,n){let r=Math.min(t,n)*.028;e.save();let i=e.createLinearGradient(0,0,t,n);i.addColorStop(0,`#0e1416`),i.addColorStop(.5,`#05080a`),i.addColorStop(1,`#131a1c`),e.strokeStyle=i,e.lineWidth=r*2,e.strokeRect(r*.5,r*.5,t-r,n-r),e.strokeStyle=`rgba(190, 215, 210, 0.09)`,e.lineWidth=1,e.strokeRect(r*1.5,r*1.5,t-r*3,n-r*3),e.restore()}function Fe(e,t,n,r,i){if(r<=.001)return;let a=Math.floor(2+r*7),o=Math.floor(i*14);for(let i=0;i<a;i++){let a=Te(o+i*3.3)*n,s=6+Te(o+i*7.1)*42,c=(Te(o+i*11.9)-.5)*60*r;try{e.drawImage(e.canvas,0,a,t,s,c,a,t,s)}catch{break}}}function Ie(e,t,n,r){if(r>=1)return;let i=Math.min(1,Math.max(0,(r-.25)/.55)),a=t/2*(1-i);if(e.save(),e.fillStyle=`#000`,e.fillRect(0,0,a,n),e.fillRect(t-a,0,a,n),r<.25){e.fillStyle=`#000`,e.fillRect(0,0,t,n);let i=Math.max(.5,r/.25*6),a=e.createLinearGradient(t/2-i,0,t/2+i,0);a.addColorStop(0,`rgba(0,0,0,0)`),a.addColorStop(.5,`rgba(190, 218, 210, ${r/.25*.25})`),a.addColorStop(1,`rgba(0,0,0,0)`),e.fillStyle=a,e.fillRect(t/2-i*4,0,i*8,n)}e.restore()}function Le(e,t,n,r){e.save();let i=(Te(r.time*31)-.5)*r.shake*18,a=(Te(r.time*47)-.5)*r.shake*18;if(e.translate(i,a),r.intro<1){let i=1.18-.18*r.intro;e.translate(t/2,n/2),e.scale(i,i),e.translate(-t/2,-n/2)}Ae(e,t,n,r);for(let t of r.zombies)we(e,t);we(e,r.instructor),r.reflection&&we(e,r.reflection),je(e,t,n,r.time),Ne(e,t,n,r.time),Me(e,t,n,r.crack),r.blood>.001&&(e.fillStyle=`rgba(58, 6, 5, ${r.blood*.5})`,e.fillRect(0,0,t,n)),r.dark>.001&&(e.fillStyle=`rgba(0, 0, 0, ${r.dark})`,e.fillRect(0,0,t,n)),Fe(e,t,n,r.glitch,r.time),Pe(e,t,n),e.restore(),r.intro<1&&Ie(e,t,n,r.intro)}var Re=.45,ze=.75,Be=2,Ve=.45,He={1:`她们开始靠近了。`,2:`它们曾经也站在这里。`,3:`老树上，系着一条褪色的红绳。`,4:`镜中的她，只比你快半拍。`,5:`所有人都在等你。`,6:`最后一遍。跳完就去看月亮。`},Ue={"↑":`reach`,"↓":`stepBack`,"←":`twist`,"→":`lookUp`};function We(e){switch(e){case`ArrowUp`:case`w`:case`W`:case`↑`:return`↑`;case`ArrowDown`:case`s`:case`S`:case`↓`:return`↓`;case`ArrowLeft`:case`a`:case`A`:case`←`:return`←`;case`ArrowRight`:case`d`:case`D`:case`→`:return`→`;default:return``}}var Ge=(e,t)=>(e%t+t)%t,Ke=class{hud={visible:!1,round:``,roundTotal:``,hits:0,moveIndex:0,moveTotal:0,moveName:``,key:``,dots:[],subtitle:``,meter:0,tutorial:!1,cinema:!1};stats={level:0,hits:0,perfects:0,zombies:2,tutorialHits:0};phase=`intro`;mode;audio;tracker;renderer;onDeath;onEnding;w=0;h=0;last=0;dt=0;time=0;phaseT=0;bpm=104;beatOrigin=0;beat=0;beatPhase=0;lastBeat=0;audioClockOn=!1;musicOn=!1;realMusicStarted=!1;musicLevelStart=0;finaleSection=null;level=0;plan=null;moveIndex=-1;results=[];best=0;judged=!1;resolved=!1;failed=!1;sawPose=!1;combo=0;tutSteps=[];tutIdx=0;tutStart=2;playerPose=null;keyed=``;keyDown=!1;cue=pe;prevCue=pe;cueT=1;cueDur=.22;instructor=ae(pe);target=ae(pe);zombieP=[];prevZombieP=[];snapPulse=0;deadT=0;hitSfx=!1;warned=!1;warn=0;cause=null;lunge=0;dark=0;blood=0;shake=0;glitch=0;endingT=0;reported=!1;constructor(e){this.audio=e.audio,this.tracker=e.tracker,this.renderer=e.renderer??null,this.mode=e.mode,this.onDeath=e.onDeath,this.onEnding=e.onEnding}begin(){this.reset(),this.phase=`intro`,this.phaseT=0,this.bpm=104,this.audio.setTempo(104),this.audio.setLayers(0),this.beatOrigin=this.audio.now(),this.beat=0,this.lastBeat=0,this.audioClockOn=this.audio.isRunning(),this.hud.visible=!1,this.hud.subtitle=``,this.audio.door()}restart(){this.reset(),this.startLevel(1)}reset(){this.stats.level=0,this.stats.hits=0,this.stats.perfects=0,this.stats.tutorialHits=0,this.stats.zombies=2,this.level=0,this.plan=null,this.moveIndex=-1,this.results=[],this.combo=0,this.playerPose=null,this.keyed=``,this.keyDown=!1,this.musicOn=!1,this.zombieP=[],this.prevZombieP=[],this.snapPulse=0,this.deadT=0,this.hitSfx=!1,this.warned=!1,this.warn=0,this.cause=null,this.lunge=0,this.dark=0,this.blood=0,this.shake=0,this.glitch=0,this.endingT=0,this.reported=!1,this.finaleSection=null,this.realMusicStarted=!1,this.audio.stopGroove(),this.hud.dots=[],this.hud.moveName=``,this.hud.key=``,this.hud.tutorial=!1,this.hud.meter=0,this.setInstructor(pe,!0),this.audio.restoreMusic()}pushKey(e){let t=We(e);t&&(this.keyDown=!0,this.keyed=Ue[t],this.phase===`tutorial`?this.keyTutorial(t):this.phase===`level`&&this.keyLevel(t))}releaseKey(){this.keyDown=!1,this.keyed=``}replayMove(){if(this.phase!==`tutorial`)return;let e=this.tutSteps[this.tutIdx],t=e?e.id:he[0];this.tutSteps=[{id:t,kind:`demo`,beats:2},{id:t,kind:`demo`,beats:2},{id:t,kind:`do`,beats:4}],this.tutIdx=0,this.tutStart=this.beat+1,this.resetWindow(),this.hud.subtitle=`再看一遍。`}replayAll(){this.phase===`tutorial`&&(this.tutSteps=this.tutorialSteps(),this.tutIdx=0,this.tutStart=this.beat+1,this.resetWindow(),this.hud.subtitle=`从第一个开始。`)}skipTutorial(){this.phase===`tutorial`&&this.startLevel(1)}degradeToKeys(){this.mode!==`keys`&&(this.mode=`keys`,this.tracker=null,this.phase!==`tutorial`&&this.phase!==`level`||this.judged||(this.judged=!0,this.best=Math.max(this.best,Re)))}degradeTo2D(){this.renderer=null}tick(e,t,n){this.w=t,this.h=n;let r=this.last?Math.min(.06,e-this.last):.016;if(this.last=e,this.dt=r,this.time=e,this.phaseT+=r,this.snapPulse=Math.max(0,this.snapPulse-r*2.2),this.glitch=Math.max(0,this.glitch-r*2.6),this.shake=Math.max(0,this.shake-r*1.7),this.tracker){let t=this.tracker.update(e*1e3);t&&(this.playerPose=t,this.sawPose=!0)}switch(this.syncBeat(),this.phase){case`intro`:this.tickIntro();break;case`tutorial`:this.tickTutorial();break;case`level`:this.tickLevel();break;case`levelup`:this.phaseT>2.4&&this.startLevel(this.level+1);break;case`dead`:this.tickDead(r);break;case`ending`:this.tickEnding()}this.updateCue(r),this.phase!==`ending`&&this.phase!==`dead`&&this.updateZombies(),this.syncHud()}syncBeat(){let e=this.dt*this.bpm/60,t=this.audio.musicPosition;if(t!==null){let n=(t-this.musicLevelStart)*this.bpm/60;n<0&&(n=0);let r=n-this.lastBeat;(r<-.05||r>e*3+.25)&&(this.musicLevelStart=t-(this.lastBeat+e)*60/this.bpm,n=this.lastBeat+e),this.beat=n,this.audioClockOn=!0}else if(this.audio.isRunning()){let t=this.audio.now(),n=(t-this.beatOrigin)*this.bpm/60,r=n-this.lastBeat,i=r<-.25||r>Math.max(.75,e+.4);(!this.audioClockOn||i)&&(this.beatOrigin=t-(this.lastBeat+e)*60/this.bpm,n=this.lastBeat+e),this.beat=n,this.audioClockOn=!0}else this.beat+=e,this.audioClockOn=!1;this.lastBeat=this.beat,this.beatPhase=this.beat-Math.floor(this.beat)}startMusic(e,t){this.bpm=this.audio.hasMusicFile?ge:e,this.audio.setTempo(this.bpm),this.audio.setLayers(t),this.audio.restoreMusic(),this.audio.hasMusicFile?(this.realMusicStarted?this.musicLevelStart=this.audio.musicPosition??0:(this.audio.stopGroove(),this.audio.startGroove(),this.realMusicStarted=!0,this.musicLevelStart=0),this.beat=0,this.lastBeat=0,this.audioClockOn=!1):(this.audio.stopGroove(),this.audio.startGroove(),this.beatOrigin=this.audio.now()+.08,this.beat=0,this.lastBeat=0,this.audioClockOn=this.audio.isRunning()),this.musicOn=!0}tickIntro(){let e=this.phaseT;e>1.1&&!this.musicOn&&this.startMusic(104,0),e>.2&&(this.hud.subtitle=`午夜，旧剧院。`),e>2.6&&(this.hud.subtitle=`镜子里，有人在等你。`),e>4.4&&(this.hud.subtitle=`跟着她跳。`),e>6.2&&this.startTutorial()}tutorialSteps(){let e=[];for(let t of he)e.push({id:t,kind:`demo`,beats:2},{id:t,kind:`demo`,beats:2},{id:t,kind:`do`,beats:4});return e}startTutorial(){this.phase=`tutorial`,this.phaseT=0,this.tutSteps=this.tutorialSteps(),this.tutIdx=0,this.tutStart=Be,this.resetWindow(),this.startMusic(100,0),this.hud.round=`教学`,this.hud.roundTotal=``,this.hud.moveTotal=he.length,this.hud.subtitle=`先看她跳两遍。`}tickTutorial(){let e=this.tutSteps[this.tutIdx];if(!e){this.startLevel(1);return}let t=this.beat-this.tutStart;if(t<0){this.setInstructor(pe);return}let n=me[e.id];if(this.setInstructor(n.params),this.hud.moveName=n.name,this.hud.key=n.key,this.hud.moveIndex=he.indexOf(e.id)+1,e.kind===`demo`?(this.hud.subtitle=`看她的手。`,this.hud.meter=0):(this.hud.subtitle=`跟着做。`,this.sample()),t>=e.beats){if(e.kind===`do`){if(!(this.mode===`keys`?this.judged&&!this.failed:this.best>=Re)){this.retryTutorial(e.id);return}this.stats.hits++,this.stats.tutorialHits++,this.combo++,this.hud.subtitle=`对。`}this.tutStart+=e.beats,this.tutIdx++,this.resetWindow(),this.tutIdx>=this.tutSteps.length&&this.startLevel(1)}}retryTutorial(e){this.audio.crow(),this.hud.subtitle=this.mode===`keys`?`按错了。再看一遍。`:this.sawPose?`还差一点。再看一遍。`:`看不到你。站远些，或跳过教学。`,this.tutSteps=[{id:e,kind:`demo`,beats:2},{id:e,kind:`demo`,beats:2},{id:e,kind:`do`,beats:4}],this.tutIdx=0,this.tutStart=this.beat+1,this.resetWindow()}keyTutorial(e){let t=this.tutSteps[this.tutIdx];if(!t||t.kind!==`do`||this.judged)return;let n=this.beat-this.tutStart;n<0||n>t.beats||(this.judged=!0,e===me[t.id].key?(this.best=1,this.hud.meter=1,this.audio.step()):(this.failed=!0,this.hud.meter=0))}startLevel(e){this.phase=`level`,this.phaseT=0,this.level=e,this.stats.level=e,this.plan=be(e),this.finaleSection=null,this.stats.zombies=this.plan.zombieCount,this.moveIndex=-1,this.results=Array(this.plan.moveIds.length).fill(``),this.prevZombieP=[],this.resetWindow(),this.setInstructor(pe,!0),this.hud.tutorial=!1,this.hud.round=`第 ${e} 关`,this.hud.roundTotal=`共 6 关`,this.hud.moveTotal=this.plan.moveIds.length,this.hud.moveIndex=0,this.hud.dots=this.results.slice(),this.hud.subtitle=He[e]??``,this.startMusic(this.plan.bpm,e)}tickLevel(){let e=this.plan;if(!e)return;let t=this.beat-Be;if(t<0){this.setInstructor(pe),this.hud.subtitle=`第 ${this.level} 关`;return}let n=Math.floor(t/e.beatsPerMove);if(n>=e.moveIds.length){if(this.resolved||this.judgeLevel(this.moveIndex),this.phase!==`level`)return;this.clearLevel();return}let r=me[e.moveIds[n]];if(n!==this.moveIndex){if(this.moveIndex>=0&&this.moveIndex<e.moveIds.length&&!this.resolved&&(this.judgeLevel(this.moveIndex),this.phase!==`level`))return;this.moveIndex=n,this.resetWindow(),this.setInstructor(r.params),this.target=ae(r.params)}let i=t-n*e.beatsPerMove;this.hud.moveIndex=n+1,this.hud.moveName=r.name,this.hud.key=r.key,this.hud.subtitle=t<4?this.levelLine():this.combo>=3?`连对 ${this.combo}`:``,this.sample(),!this.resolved&&i>e.beatsPerMove-.15&&this.judgeLevel(n)}judgeLevel(e){if(this.resolved=!0,this.mode===`camera`&&!this.sawPose){this.judged=!0,this.results[e]=`done`;return}if(!(this.mode===`keys`?this.judged&&!this.failed:this.best>=Re)){this.die();return}this.judged=!0;let t=this.mode===`camera`&&this.best>=ze;this.results[e]=t?`perfect`:`done`,this.stats.hits++,t&&this.stats.perfects++,this.combo++,this.audio.step()}keyLevel(e){let t=this.plan;if(!t||this.judged||this.moveIndex<0||this.moveIndex>=t.moveIds.length)return;let n=this.beat-Be-this.moveIndex*t.beatsPerMove;if(n<.05||n>t.beatsPerMove)return;let r=me[t.moveIds[this.moveIndex]];this.judged=!0,e===r.key?(this.best=1,this.hud.meter=1):(this.failed=!0,this.die(e))}startFinale(e){this.phase=`level`,this.phaseT=0,this.level=6,this.stats.level=6,this.finaleSection=e,this.plan=M(e),this.stats.zombies=this.plan.zombieCount,this.moveIndex=-1,this.results=Array(this.plan.moveIds.length).fill(``),this.prevZombieP=[],this.resetWindow(),this.setInstructor(pe,!0),this.hud.tutorial=!1,this.hud.round=e===`breakdown`?`终章 · 收`:`终章 · 高潮`,this.hud.roundTotal=`最后一段`,this.hud.moveTotal=this.plan.moveIds.length,this.hud.moveIndex=0,this.hud.dots=this.results.slice(),this.hud.subtitle=e===`breakdown`?`音乐落下去。只剩这四个动作。`:`抬头。看月亮。`,this.startMusic(this.plan.bpm,6)}levelLine(){return this.finaleSection===`breakdown`?`收回来。`:this.finaleSection===`peak`?`跟着她。`:He[this.level]??``}clearLevel(){this.finaleSection===`breakdown`?this.startFinale(`peak`):this.finaleSection===`peak`?this.toEnding():this.level>=6?this.startFinale(`breakdown`):(this.phase=`levelup`,this.phaseT=0,this.hud.subtitle=`第 ${this.level} 关 · 过了`,this.audio.stinger())}buildCause(e){let t=this.plan,n=this.moveIndex,r=t&&n>=0&&n<t.moveIds.length?t.moveIds[n]:null,i=r?me[r]:null,a=e?Ue[e]:``;return{level:Math.max(1,this.level),moveNo:n>=0?n+1:0,moveTotal:t?t.moveIds.length:0,expected:i?i.name:``,expectedKey:i?i.key:``,pressed:e,pressedName:a&&me[a]?me[a].name:e,mode:this.mode}}die(e=``){this.phase!==`dead`&&(this.phase=`dead`,this.phaseT=0,this.deadT=0,this.warned=!1,this.warn=0,this.lunge=0,this.cause=this.buildCause(e),this.shake=.22,this.glitch=.3,this.hud.meter=0,this.hud.subtitle=``,this.hud.moveName=``,this.hud.key=``,this.audio.silenceMusic(),this.audio.crow())}tickDead(e){this.deadT+=e;let t=this.deadT-Ve;t<0?(this.warn=Math.min(1,this.deadT/Ve),this.lunge=0,this.shake=.22+this.warn*.3,this.glitch=.3+this.warn*.5,this.blood=this.warn*.26):(this.warned||(this.warned=!0,this.warn=1,this.shake=1,this.glitch=.95,this.audio.scream(),this.audio.crowd()),this.lunge=Math.min(1,t/.26),!this.hitSfx&&t>.3&&(this.hitSfx=!0,this.audio.glass(),this.shake=1,this.glitch=1),this.blood=Math.min(1,.26+Math.min(1,Math.max(0,(t-.12)/.42))*.74),this.dark=Math.min(1,Math.max(0,(t-.7)/.8)),this.warn=Math.max(0,1-t/.3),this.deadT>2.6&&!this.reported&&(this.reported=!0,this.onDeath({...this.stats,level:this.level},this.cause)))}toEnding(){this.phase=`ending`,this.phaseT=0,this.endingT=0,this.audio.silenceMusic(),this.audio.crow(),this.hud.subtitle=`她放下了手。`,this.hud.dots=[],this.hud.tutorial=!1,this.hud.moveName=``,this.hud.key=``}tickEnding(){this.endingT+=this.dt,this.endingT>2.2&&(this.hud.subtitle=`你转过身。`),this.endingT>4.2&&(this.hud.subtitle=`队伍的最后，多了一个人。`),this.endingT>7.6&&!this.reported&&(this.reported=!0,this.onEnding({...this.stats}))}resetWindow(){this.best=0,this.judged=!1,this.resolved=!1,this.failed=!1,this.sawPose=!1,this.hud.meter=0}sample(){if(this.mode!==`camera`||!this.playerPose)return;let e=ue(this.playerPose,this.target);e>this.best&&(this.best=e),this.hud.meter=e}setInstructor(e,t=!1){t?(this.prevCue=e,this.cue=e,this.cueT=1,this.target=ae(e)):this.cue!==e&&(this.prevCue=this.cue,this.cue=e,this.cueT=0,this.target=ae(e))}updateCue(e){this.cueT=Math.min(1,this.cueT+e/this.cueDur);let t=fe(this.cueT);this.instructor=ae(de(this.prevCue,this.cue,t))}updateZombies(){let e=this.plan,t=this.phase===`intro`||this.phase===`tutorial`?2:e?e.zombieCount:2,n=e?e.cycleBeats:12,r=[];for(let e=0;e<t;e++){let t=.02+e*.012;this.phase!==`intro`&&this.phase!==`tutorial`&&(t=Ge(this.beat+e*n*.17,n)/n);let i=this.prevZombieP[e];i!==void 0&&t+.5<i&&(this.snapPulse=Math.min(1,this.snapPulse+.55),this.glitch=Math.max(this.glitch,.2),this.audio.step()),this.prevZombieP[e]=t,r.push(t)}this.prevZombieP.length=t,this.zombieP=r}syncHud(){this.hud.hits=this.stats.hits,this.hud.visible=this.phase!==`intro`,this.hud.tutorial=this.phase===`tutorial`,this.hud.cinema=this.phase===`ending`||this.phase===`dead`,(this.phase===`level`||this.phase===`levelup`)&&(this.hud.dots=this.results.map((e,t)=>this.phase===`level`&&t===this.moveIndex?`now`:e))}render(e){let t=this.scene();this.renderer?this.renderer.render(t,this.w,this.h):Le(e,this.w,this.h,t)}scene(){let e=this.w,t=this.h,n=t*.93,r=Math.min(t*.62,e*.58),i=1,a=[];if(this.phase===`ending`){if(i=Math.max(0,1-this.endingT/1.4),this.endingT>3.6){let n=Math.min(1,(this.endingT-3.6)/2);a=[Se(this.shamblePose(0),e*.17,t*.79,t*.36,{alpha:n*.9,stare:n*.55,reflection:!0,skirt:!0})]}}else a=this.phase===`dead`?this.lungeFigures():this.creepFigures();let o=Se(this.instructor,e*.5,n,r,{reflection:!0,alpha:i,skirt:!0,hat:!0});return{time:this.time,beatPhase:this.beatPhase,instructor:o,zombies:a,reflection:this.playerFigure(),crack:Math.min(1,this.blood*.8+this.snapPulse*.18),crowCount:1+Math.min(7,this.level+ +(this.phase===`intro`)),dark:this.dark,glitch:Math.max(this.glitch,this.snapPulse*.22),shake:this.shake+this.snapPulse*.05,intro:this.phase===`intro`?Math.min(1,this.phaseT/4.6):1,lunge:this.lunge,blood:this.blood,ending:this.phase===`ending`?this.endingT:0,level:this.level}}zombieParams(e,t){let n=this.beat*Math.PI*.5+e*1.7,r=e%2==0?-1:1;return{armL:[30+Math.sin(n)*8,14],armR:[26-Math.sin(n)*8,-12],legL:[18+Math.sin(n)*10,-8],legR:[18-Math.sin(n)*10,-8],lean:r*-3+Math.sin(n*.5)*2,head:12+t*10}}shamblePose(e){return ae(this.zombieParams(e,0))}creepFigures(){let e=this.w,t=this.h,n=[],r=this.phase===`intro`||this.phase===`tutorial`;for(let i=0;i<this.zombieP.length;i++){let a=this.zombieP[i],o=i%2==0?-1:1,s=Math.floor(i/2),c=a**2,l=e*(.5+o*(.24+s*.05)),u=l+(e*(.5+o*(.48+s*.1))-l)*c,d=t*(.775+.235*c),f=t*(.33+.5*c),p=this.level>=2||r?(i*2+this.level)%5:0;n.push(Se(ae(this.zombieParams(i,a)),u,d,f,{alpha:r?.32:.55+.45*a,stare:r?.25:Math.max(0,(a-.42)/.58),variant:r?0:p,sway:Math.sin(this.beat*Math.PI+i)*.035,reflection:!0,skirt:i%2==1}))}return n}lungeFigures(){let e=this.w,t=this.h,n=[];for(let r=0;r<Math.max(1,this.zombieP.length);r++){let i=this.zombieP[r]??.9,a=r%2==0?-1:1,o=Math.floor(r/2),s=this.lunge,c=e*(.5+a*(.48+o*.1)),l=c+(e*.5-c)*s*.85,u=t*(1.01+.04*s),d=t*(.83+.35*s);n.push(Se(ae(this.zombieParams(r,1)),l,u,d,{alpha:.65+.35*i,stare:1,variant:(r*2+Math.max(2,this.level))%5,reflection:!0,skirt:r%2==1}))}return n}playerFigure(){if(this.phase===`dead`||this.phase===`ending`)return null;let e=null;return this.mode===`camera`?e=this.playerPose:this.keyDown&&this.keyed&&(e=ae(me[this.keyed].params)),e?Se(e,this.w*.5,this.h*1.06,this.h*.36,{alpha:.22,wire:!0,reflection:!0}):null}},qe=typeof self<`u`?self:{};function Je(e,t){t:{for(var n=[`CLOSURE_FLAGS`],r=qe,i=0;i<n.length;i++)if((r=r[n[i]])==null){n=null;break t}n=r}return(e=n&&n[e])??t}function Ye(e,t){e=e.split(`.`);for(var n,r=qe;e.length&&(n=e.shift());)e.length||t===void 0?r=r[n]&&r[n]!==Object.prototype[n]?r[n]:r[n]={}:r[n]=t}function Xe(){throw Error(`Invalid UTF8`)}function Ze(e,t){return t=String.fromCharCode.apply(null,t),e==null?t:e+t}var Qe,$e,et=void 0,tt=typeof TextDecoder<`u`,nt=typeof TextEncoder<`u`;function rt(e){if(nt)e=($e||=new TextEncoder).encode(e);else{let n=0,r=new Uint8Array(3*e.length);for(let i=0;i<e.length;i++){var t=e.charCodeAt(i);if(t<128)r[n++]=t;else{if(t<2048)r[n++]=t>>6|192;else{if(t>=55296&&t<=57343){if(t<=56319&&i<e.length){let a=e.charCodeAt(++i);if(a>=56320&&a<=57343){t=1024*(t-55296)+a-56320+65536,r[n++]=t>>18|240,r[n++]=t>>12&63|128,r[n++]=t>>6&63|128,r[n++]=63&t|128;continue}i--}t=65533}r[n++]=t>>12|224,r[n++]=t>>6&63|128}r[n++]=63&t|128}}e=n===r.length?r:r.subarray(0,n)}return e}function it(e){qe.setTimeout(()=>{throw e},0)}var at=Je(610401301,!1),ot=Je(748402147,!0);function st(){var e=qe.navigator;return(e&&=e.userAgent)?e:``}var ct,lt=qe.navigator;function ut(e){return ut[` `](e),e}ct=lt&&lt.userAgentData||null,ut[` `]=function(){};var dt={},ft=null;function pt(e){var t=e.length,n=3*t/4;n%3?n=Math.floor(n):`=.`.indexOf(e[t-1])!=-1&&(n=`=.`.indexOf(e[t-2])==-1?n-1:n-2);var r=new Uint8Array(n),i=0;return function(e,t){function n(t){for(;r<e.length;){let t=e.charAt(r++),n=ft[t];if(n!=null)return n;if(!/^[\s\xa0]*$/.test(t))throw Error(`Unknown base64 encoding at char: `+t)}return t}mt();for(var r=0;;){let e=n(-1),r=n(0),i=n(64),a=n(64);if(a===64&&e===-1)break;t(e<<2|r>>4),i!=64&&(t(r<<4&240|i>>2),a!=64&&t(i<<6&192|a))}}(e,function(e){r[i++]=e}),i===n?r:r.subarray(0,i)}function mt(){if(!ft){ft={};var e=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`.split(``),t=[`+/=`,`+/`,`-_=`,`-_.`,`-_`];for(let n=0;n<5;n++){let r=e.concat(t[n].split(``));dt[n]=r;for(let e=0;e<r.length;e++){let t=r[e];ft[t]===void 0&&(ft[t]=e)}}}}var ht=typeof Uint8Array<`u`,gt=(!!(at&&ct&&ct.brands.length>0)||st().indexOf(`Trident`)==-1&&st().indexOf(`MSIE`)==-1)&&typeof btoa==`function`,_t=/[-_.]/g,vt={"-":`+`,_:`/`,".":`=`};function yt(e){return vt[e]||``}function bt(e){if(!gt)return pt(e);e=_t.test(e)?e.replace(_t,yt):e,e=atob(e);var t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}function xt(e){return ht&&e!=null&&e instanceof Uint8Array}var St={};function Ct(){return Tt||=new Et(null,St)}function wt(e){Dt(St);var t=e.h;return(t=t==null||xt(t)?t:typeof t==`string`?bt(t):null)==null?t:e.h=t}var Tt,Et=class{i(){return new Uint8Array(wt(this)||0)}constructor(e,t){if(Dt(t),this.h=e,e!=null&&e.length===0)throw Error(`ByteString should be constructed with non-empty values`)}};function Dt(e){if(e!==St)throw Error(`illegal external caller`)}function Ot(e,t){e.__closure__error__context__984382||={},e.__closure__error__context__984382.severity=t}var kt=void 0;function At(e){return Ot(e=Error(e),`warning`),e}function jt(e,t){if(e!=null){var n=kt??={},r=n[e]||0;r>=t||(n[e]=r+1,Ot(e=Error(),`incident`),it(e))}}function Mt(){return typeof BigInt==`function`}var Nt=typeof Symbol==`function`&&typeof Symbol()==`symbol`;function Pt(e,t,n=!1){return typeof Symbol==`function`&&typeof Symbol()==`symbol`?n&&Symbol.for&&e?Symbol.for(e):e==null?Symbol():Symbol(e):t}var Ft,It=Pt(`jas`,void 0,!0),Lt=Pt(void 0,`0di`),Rt=Pt(void 0,`1oa`),zt=Pt(void 0,Symbol()),Bt=Pt(void 0,`0ub`),Vt=Pt(void 0,`0ubs`),Ht=Pt(void 0,`0ubsb`),Ut=Pt(void 0,`0actk`),Wt=Pt(`m_m`,`lb`,!0),Gt=Pt(),Kt={Wa:{value:0,configurable:!0,writable:!0,enumerable:!1}},qt=Object.defineProperties,F=Nt?It:`Wa`,Jt=[];function Yt(e,t){Nt||F in e||qt(e,Kt),e[F]|=t}function Xt(e,t){Nt||F in e||qt(e,Kt),e[F]=t}function Zt(e){return Yt(e,34),e}function Qt(e){return Yt(e,8192),e}Xt(Jt,7),Ft=Object.freeze(Jt);var $t={};function en(e){return e!=null&&e[Wt]===$t}function tn(e,t){return t===void 0?e.i!==nn&&!!(2&e.B[F]):!!(2&t)&&e.i!==nn}var nn={};function rn(e,t){if(e!=null){if(typeof e==`string`)e=e?new Et(e,St):Ct();else if(e.constructor!==Et){if(xt(e))e=e.length?new Et(new Uint8Array(e),St):Ct();else{if(!t)throw Error();e=void 0}}}return e}var an=class{constructor(e,t,n){this.h=e,this.i=t,this.l=n}next(){var e=this.h.next();return e.done||(e.value=this.i.call(this.l,e.value)),e}[Symbol.iterator](){return this}};function on(e,t,n){var r,i=128&t?0:-1,a=e.length;(r=!!a)&&(r=(r=e[a-1])!=null&&typeof r==`object`&&r.constructor===Object);var o=a+(r?-1:0);for(t=128&t?1:0;t<o;t++)n(t-i,e[t]);if(r){e=e[a-1];for(let t in e)!isNaN(t)&&n(+t,e[t])}}Object.freeze({});var sn={};function cn(e){return 128&e?sn:void 0}function ln(e){return e.jb=!0,e}var un=ln(e=>typeof e==`number`),dn=ln(e=>typeof e==`string`),fn=ln(e=>typeof e==`boolean`),pn=typeof qe.BigInt==`function`&&typeof qe.BigInt(0)==`bigint`;function mn(e){var t=e;if(dn(t)){if(!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(t))throw Error(String(t))}else if(un(t)&&!Number.isSafeInteger(t))throw Error(String(t));return pn?BigInt(e):e=fn(e)?e?`1`:`0`:dn(e)?e.trim()||`0`:String(e)}var hn=ln(e=>pn?e>=_n&&e<=yn:e[0]===`-`?bn(e,gn):bn(e,vn)),gn=(-(2**53-1)).toString(),_n=pn?BigInt(-(2**53-1)):void 0,vn=(2**53-1).toString(),yn=pn?BigInt(2**53-1):void 0;function bn(e,t){if(e.length>t.length)return!1;if(e.length<t.length||e===t)return!0;for(let n=0;n<e.length;n++){let r=e[n],i=t[n];if(r>i)return!1;if(r<i)return!0}}var xn,Sn=typeof Uint8Array.prototype.slice==`function`,Cn=0,wn=0;function Tn(e){var t=e>>>0;Cn=t,wn=(e-t)/4294967296>>>0}function En(e){if(e<0){Tn(-e);let[t,n]=Fn(Cn,wn);Cn=t>>>0,wn=n>>>0}else Tn(e)}function Dn(e){var t=xn||=new DataView(new ArrayBuffer(8));t.setFloat32(0,+e,!0),wn=0,Cn=t.getUint32(0,!0)}function On(e,t){var n=4294967296*t+(e>>>0);return Number.isSafeInteger(n)?n:jn(e,t)}function kn(e,t){return mn(Mt()?BigInt.asUintN(64,(BigInt(t>>>0)<<BigInt(32))+BigInt(e>>>0)):jn(e,t))}function An(e,t){return Mt()?mn(BigInt.asIntN(64,(BigInt.asUintN(32,BigInt(t))<<BigInt(32))+BigInt.asUintN(32,BigInt(e)))):mn(Nn(e,t))}function jn(e,t){if(e>>>=0,(t>>>=0)<=2097151)var n=``+(4294967296*t+e);else Mt()?n=``+(BigInt(t)<<BigInt(32)|BigInt(e)):(e=(16777215&e)+6777216*(n=16777215&(e>>>24|t<<8))+6710656*(t=t>>16&65535),n+=8147497*t,t*=2,e>=1e7&&(n+=e/1e7>>>0,e%=1e7),n>=1e7&&(t+=n/1e7>>>0,n%=1e7),n=t+Mn(n)+Mn(e));return n}function Mn(e){return e=String(e),`0000000`.slice(e.length)+e}function Nn(e,t){if(2147483648&t){if(Mt())e=``+(BigInt(0|t)<<BigInt(32)|BigInt(e>>>0));else{let[n,r]=Fn(e,t);e=`-`+jn(n,r)}}else e=jn(e,t);return e}function Pn(e){if(e.length<16)En(Number(e));else if(Mt())e=BigInt(e),Cn=Number(e&BigInt(4294967295))>>>0,wn=Number(e>>BigInt(32)&BigInt(4294967295));else{let t=+(e[0]===`-`);wn=Cn=0;let n=e.length;for(let r=t,i=(n-t)%6+t;i<=n;r=i,i+=6){let t=Number(e.slice(r,i));wn*=1e6,(Cn=1e6*Cn+t)>=4294967296&&(wn+=Math.trunc(Cn/4294967296),wn>>>=0,Cn>>>=0)}if(t){let[e,t]=Fn(Cn,wn);Cn=e,wn=t}}}function Fn(e,t){return t=~t,e?e=1+~e:t+=1,[e,t]}function In(e){return Array.prototype.slice.call(e)}var Ln=typeof BigInt==`function`?BigInt.asIntN:void 0,Rn=typeof BigInt==`function`?BigInt.asUintN:void 0,zn=Number.isSafeInteger,Bn=Number.isFinite,Vn=Math.trunc,Hn=mn(0);function Un(e){if(typeof e!=`number`)throw Error(`Value of float/double field must be a number, found ${typeof e}: ${e}`);return e}function Wn(e){return e==null||typeof e==`number`?e:e===`NaN`||e===`Infinity`||e===`-Infinity`?Number(e):void 0}function Gn(e){if(typeof e!=`boolean`){var t=typeof e;throw Error(`Expected boolean but got ${t==`object`?e?Array.isArray(e)?`array`:t:`null`:t}: ${e}`)}return e}var Kn=/^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;function qn(e){switch(typeof e){case`bigint`:return!0;case`number`:return Bn(e);case`string`:return Kn.test(e);default:return!1}}function Jn(e){if(e!=null){if(!Bn(e))throw At(`enum`);e|=0}return e}function Yn(e){if(e==null)return e;if(typeof e==`string`&&e)e=+e;else if(typeof e!=`number`)return;return Bn(e)?0|e:void 0}function Xn(e){if(e==null)return e;if(typeof e==`string`&&e)e=+e;else if(typeof e!=`number`)return;return Bn(e)?e>>>0:void 0}function Zn(e,t){if(t??=1024,!qn(e))throw At(`int64`);var n=typeof e;switch(t){case 512:switch(n){case`string`:return rr(e);case`bigint`:return String(Ln(64,e));default:return nr(e)}case 1024:switch(n){case`string`:return ir(e);case`bigint`:return mn(Ln(64,e));default:return ar(e)}case 0:switch(n){case`string`:return rr(e);case`bigint`:return mn(Ln(64,e));default:return er(e)}default:return function(e,t=`unexpected value ${e}!`){throw Error(t)}(t,`Unknown format requested type for int64`)}}function Qn(e){var t=e.length;return(e[0]===`-`?t<20||t===20&&e<=`-9223372036854775808`:t<19||t===19&&e<=`9223372036854775807`)?e:(Pn(e),Nn(Cn,wn))}function $n(e){if(e[0]===`-`)var t=!1;else t=(t=e.length)<20||t===20&&e<=`18446744073709551615`;return t?e:(Pn(e),jn(Cn,wn))}function er(e){if(e=Vn(e),!zn(e)){En(e);var t=Cn,n=wn;(e=2147483648&n)&&(n=~n>>>0,(t=1+~t>>>0)==0&&(n=n+1>>>0)),e=typeof(t=On(t,n))==`number`?e?-t:t:e?`-`+t:t}return e}function tr(e){return(e=Vn(e))>=0&&zn(e)||(En(e),e=On(Cn,wn)),e}function nr(e){return e=Vn(e),zn(e)?e=String(e):(En(e),e=Nn(Cn,wn)),e}function rr(e){var t=Vn(Number(e));return zn(t)?String(t):((t=e.indexOf(`.`))!==-1&&(e=e.substring(0,t)),Qn(e))}function ir(e){var t=Vn(Number(e));return zn(t)?mn(t):((t=e.indexOf(`.`))!==-1&&(e=e.substring(0,t)),Mt()?mn(Ln(64,BigInt(e))):mn(Qn(e)))}function ar(e){return zn(e)?mn(er(e)):mn(nr(e))}function or(e){var t=typeof e;return e==null?e:t===`bigint`?mn(Ln(64,e)):qn(e)?t===`string`?ir(e):ar(e):void 0}function sr(e){if(e==null)return e;var t=typeof e;if(t===`bigint`)return String(Ln(64,e));if(qn(e)){if(t===`string`)return rr(e);if(t===`number`)return er(e)}}function cr(e){if(e==null||typeof e==`string`||e instanceof Et)return e}function lr(e){if(typeof e!=`string`)throw Error();return e}function ur(e){if(e!=null&&typeof e!=`string`)throw Error();return e}function dr(e){return e==null||typeof e==`string`?e:void 0}function fr(e,t,n,r){return en(e)?e:Array.isArray(e)?((r=(n=0|e[F])|32&r|2&r)!==n&&Xt(e,r),new t(e)):(n?2&r?((e=t[Lt])||(Zt((e=new t).B),e=t[Lt]=e),t=e):t=new t:t=void 0,t)}function pr(e,t,n){return(e=t?Zn(e,1024):or(e))??(n?Hn:void 0)}function mr(e){return e}var hr={},gr=function(){try{return ut(new class extends Map{constructor(){super()}}),!1}catch{return!0}}(),_r=class{constructor(){this.h=new Map}get(e){return this.h.get(e)}set(e,t){return this.h.set(e,t),this.size=this.h.size,this}delete(e){return e=this.h.delete(e),this.size=this.h.size,e}clear(){this.h.clear(),this.size=this.h.size}has(e){return this.h.has(e)}entries(){return this.h.entries()}keys(){return this.h.keys()}values(){return this.h.values()}forEach(e,t){return this.h.forEach(e,t)}[Symbol.iterator](){return this.entries()}},vr=gr?(Object.setPrototypeOf(_r.prototype,Map.prototype),Object.defineProperties(_r.prototype,{size:{value:0,configurable:!0,enumerable:!0,writable:!0}}),_r):class extends Map{constructor(){super()}};function yr(e){return e}function br(e){if(2&e.N)throw Error(`Cannot mutate an immutable Map`)}var xr,Sr=class extends vr{constructor(e,t,n=yr,r=yr){super(),this.N=0|e[F],this.O=t,this.ca=n,this.oa=this.O?Cr:r;for(let i=0;i<e.length;i++){let a=e[i],o=n(a[0],!1,!0),s=a[1];t?s===void 0&&(s=null):s=r(a[1],!1,!0,void 0,void 0,this.N),super.set(o,s)}}fa(e){return Qt(Array.from(super.entries(),e))}clear(){br(this),super.clear()}delete(e){return br(this),super.delete(this.ca(e,!0,!1))}entries(){if(this.O){var e=super.keys();e=new an(e,wr,this)}else e=super.entries();return e}values(){if(this.O){var e=super.keys();e=new an(e,Sr.prototype.get,this)}else e=super.values();return e}forEach(e,t){this.O?super.forEach((n,r,i)=>{e.call(t,i.get(r),r,i)}):super.forEach(e,t)}set(e,t){return br(this),(e=this.ca(e,!0,!1))==null?this:t==null?(super.delete(e),this):super.set(e,this.oa(t,!0,!0,this.O,!1,this.N))}hb(e){var t=this.ca(e[0],!1,!0);e=e[1],e=this.O?e===void 0?null:e:this.oa(e,!1,!0,void 0,!1,this.N),super.set(t,e)}has(e){return super.has(this.ca(e,!1,!1))}get(e){e=this.ca(e,!1,!1);var t=super.get(e);if(t!==void 0){var n=this.O;return n?((n=this.oa(t,!1,!0,n,this.Ga,this.N))!==t&&super.set(e,n),n):t}}[Symbol.iterator](){return this.entries()}};function Cr(e,t,n,r,i,a){return e=fr(e,r,n,a),i&&(e=Wr(e)),e}function wr(e){return[e,this.get(e)]}function Tr(){return xr||=new Sr(Zt([]),void 0,void 0,void 0,hr)}function Er(e){return zt?e[zt]:void 0}function Dr(e,t){for(let n in e)!isNaN(n)&&t(e,+n,e[n])}Sr.prototype.toJSON=void 0;var Or,kr,Ar=class{},jr={eb:!0};function Mr(e,t){t<100||jt(Vt,1)}function Nr(e,t,n,r){var i=r!==void 0;r=!!r;var a,o=zt;!i&&Nt&&o&&(a=e[o])&&Dr(a,Mr),o=[];var s=e.length;a=4294967295;var c=!1,l=!!(64&t),u=l?128&t?0:-1:void 0;if(!(1&t)){var d=s&&e[s-1];typeof d==`object`&&d&&d.constructor===Object?a=--s:d=void 0,!l||128&t||i||(c=!0,a=mr(a-u,u,e,d,void 0)+u)}t=void 0;for(var f=0;f<s;f++){let i=e[f];if(i!=null&&(i=n(i,r))!=null){if(l&&f>=a){let e=f-u;(t??={})[e]=i}else o[f]=i}}if(d)for(let e in d){if((s=d[e])==null||(s=n(s,r))==null)continue;let i;f=+e,l&&!Number.isNaN(f)&&(i=f+u)<a?o[i]=s:(t??={})[e]=s}return t&&(c?o.push(t):o[a]=t),i&&zt&&(e=Er(e))&&e instanceof Ar&&(o[zt]=function(e){var t=new Ar;return Dr(e,(e,n,r)=>{t[n]=In(r)}),t.la=e.la,t}(e)),o}function Pr(e){return e[0]=Fr(e[0]),e[1]=Fr(e[1]),e}function Fr(e){switch(typeof e){case`number`:return Number.isFinite(e)?e:``+e;case`bigint`:return hn(e)?Number(e):``+e;case`boolean`:return+!!e;case`object`:if(Array.isArray(e)){var t=0|e[F];return e.length===0&&1&t?void 0:Nr(e,t,Fr)}if(en(e))return Ir(e);if(e instanceof Et){if((t=e.h)==null)e=``;else if(typeof t==`string`)e=t;else{if(gt){for(var n=``,r=0,i=t.length-10240;r<i;)n+=String.fromCharCode.apply(null,t.subarray(r,r+=10240));n+=String.fromCharCode.apply(null,r?t.subarray(r):t),t=btoa(n)}else{n===void 0&&(n=0),mt(),n=dt[n],r=Array(Math.floor(t.length/3)),i=n[64]||``;let e=0,l=0;for(;e<t.length-2;e+=3){var a=t[e],o=t[e+1],s=t[e+2],c=n[a>>2];a=n[(3&a)<<4|o>>4],o=n[(15&o)<<2|s>>6],s=n[63&s],r[l++]=c+a+o+s}switch(c=0,s=i,t.length-e){case 2:s=n[(15&(c=t[e+1]))<<2]||i;case 1:t=t[e],r[l]=n[t>>2]+n[(3&t)<<4|c>>4]+s+i}t=r.join(``)}e=e.h=t}return e}return e instanceof Sr?e=e.size===0?void 0:e.fa(Pr):void 0}return e}function Ir(e){return Nr(e=e.B,0|e[F],Fr)}function Lr(e,t){return Rr(e,t[0],t[1])}function Rr(e,t,n,r=0){if(e==null){var i=32;n?(e=[n],i|=128):e=[],t&&(i=-16760833&i|(1023&t)<<14)}else{if(!Array.isArray(e))throw Error(`narr`);if(i=0|e[F],ot&&1&i)throw Error(`rfarr`);if(2048&i&&!(2&i)&&function(){if(ot)throw Error(`carr`);jt(Ut,5)}(),256&i)throw Error(`farr`);if(64&i)return(i|r)!==i&&Xt(e,i|r),e;if(n&&(i|=128,n!==e[0]))throw Error(`mid`);t:{i|=64;var a=(n=e).length;if(a){var o=a-1;let e=n[o];if(typeof e==`object`&&e&&e.constructor===Object){if((o-=t=128&i?0:-1)>=1024)throw Error(`pvtlmt`);for(var s in e)(a=+s)<o&&(n[a+t]=e[s],delete e[s]);i=-16760833&i|(1023&o)<<14;break t}}if(t){if((s=Math.max(t,a-(128&i?0:-1)))>1024)throw Error(`spvt`);i=-16760833&i|(1023&s)<<14}}}return Xt(e,64|i|r),e}function zr(e,t){if(typeof e!=`object`)return e;if(Array.isArray(e)){var n=0|e[F];return e.length===0&&1&n?void 0:Br(e,n,t)}if(en(e))return Hr(e);if(e instanceof Sr){if(2&(t=e.N))return e;if(!e.size)return;if(n=Zt(e.fa()),e.O)for(e=0;e<n.length;e++){let r=n[e],i=r[1];i=typeof i!=`object`||!i?void 0:en(i)?Hr(i):Array.isArray(i)?Br(i,0|i[F],!!(32&t)):void 0,r[1]=i}return n}return e instanceof Et?e:void 0}function Br(e,t,n){return 2&t||(!n||4096&t||16&t?e=Ur(e,t,!1,n&&!(16&t)):(Yt(e,34),4&t&&Object.freeze(e))),e}function Vr(e,t,n){return e=new e.constructor(t),n&&(e.i=nn),e.o=nn,e}function Hr(e){var t=e.B,n=0|t[F];return tn(e,n)?e:Jr(e,t,n)?Vr(e,t):Ur(t,n)}function Ur(e,t,n,r){return r??=!!(34&t),e=Nr(e,t,zr,r),r=32,n&&(r|=2),Xt(e,t=16769217&t|r),e}function Wr(e){var t=e.B,n=0|t[F];return tn(e,n)?Jr(e,t,n)?Vr(e,t,!0):new e.constructor(Ur(t,n,!1)):e}function Gr(e){if(e.i!==nn)return!1;var t=e.B;return Yt(t=Ur(t,0|t[F]),2048),e.B=t,e.i=void 0,e.o=void 0,!0}function Kr(e){if(!Gr(e)&&tn(e,0|e.B[F]))throw Error()}function qr(e,t){t===void 0&&(t=0|e[F]),32&t&&!(4096&t)&&Xt(e,4096|t)}function Jr(e,t,n){return!!(2&n)||!(!(32&n)||4096&n)&&(Xt(t,2|n),e.i=nn,!0)}var Yr=mn(0),Xr={};function Zr(e,t,n,r){if((t=Qr(e.B,t,void 0,r))!==null||n&&e.o!==nn)return t}function Qr(e,t,n,r){if(t===-1)return null;var i=t+(n?0:-1),a=e.length-1;if(!(a<1+(n?0:-1))){if(i>=a){var o=e[a];if(typeof o==`object`&&o&&o.constructor===Object){n=o[t];var s=!0}else{if(i!==a)return;n=o}}else n=e[i];if(r&&n!=null){if((r=r(n))==null)return r;if(!Object.is(r,n))return s?o[t]=r:e[i]=r,r}return n}}function I(e,t,n,r){Kr(e);var i=e.B;return $r(i,0|i[F],t,n,r),e}function $r(e,t,n,r,i){var a=n+(i?0:-1),o=e.length-1;if(o>=1+(i?0:-1)&&a>=o){let i=e[o];if(typeof i==`object`&&i&&i.constructor===Object)return i[n]=r,t}return a<=o?(e[a]=r,t):(r!==void 0&&(n>=(o=(t??=0|e[F])>>14&1023||536870912)?r!=null&&(e[o+(i?0:-1)]={[n]:r}):e[a]=r),t)}function ei(e,t){return en(e=Qr(e.B,t))||Array.isArray(e)}function ti(e,t,n){return ei(e,t=di(e,n)===t?t:-1)}function ni(e,t,n,r,i){var a=e.B,o=0|a[F];r=tn(e,o)?1:r||4,i=!!i||r===3,r===2&&Gr(e)&&(o=0|(a=e.B)[F]);var s=(e=ii(a,t))===Ft?7:0|e[F],c=ai(s,o),l=!(4&c);if(l){4&c&&(e=In(e),s=0,c=Si(c,o),o=$r(a,o,t,e));let r=0,i=0;for(;r<e.length;r++){let t=n(e[r]);t!=null&&(e[i++]=t)}i<r&&(e.length=i),n=-513&c|4,c=n&=-1025,c&=-4097}return c!==s&&(Xt(e,c),2&c&&Object.freeze(e)),ri(e,c,a,o,t,r,l,i)}function ri(e,t,n,r,i,a,o,s){var c=t;return a===1||a===4&&(2&t||!(16&t)&&32&r)?oi(t)||((t|=!e.length||o&&!(4096&t)||32&r&&!(4096&t||16&t)?2:256)!==c&&Xt(e,t),Object.freeze(e)):(a===2&&oi(t)&&(e=In(e),c=0,t=Si(t,r),r=$r(n,r,i,e)),oi(t)||(s||(t|=16),t!==c&&Xt(e,t))),2&t||!(4096&t||16&t)||qr(n,r),e}function ii(e,t,n){return e=Qr(e,t,n),Array.isArray(e)?e:Ft}function ai(e,t){return 2&t&&(e|=2),1|e}function oi(e){return!!(2&e)&&!!(4&e)||!!(256&e)}function si(e){return rn(e,!0)}function ci(e){e=In(e);for(let t=0;t<e.length;t++){let n=e[t]=In(e[t]);Array.isArray(n[1])&&(n[1]=Zt(n[1]))}return Qt(e)}function li(e,t,n,r){Kr(e),$r(e=e.B,0|e[F],t,(r===`0`?Number(n)===0:n===r)?void 0:n)}function ui(e,t,n){if(2&t)throw Error();var r=cn(t),i=ii(e,n,r),a=i===Ft?7:0|i[F],o=ai(a,t);return(2&o||oi(o)||16&o)&&(o===a||oi(o)||Xt(i,o),i=In(i),a=0,o=Si(o,t),$r(e,t,n,i,r)),(o&=-13)!==a&&Xt(i,o),i}function di(e,t){return mi(fi(e=e.B),e,void 0,t)}function fi(e){if(Nt)return e[Rt]??(e[Rt]=new Map);if(Rt in e)return e[Rt];var t=new Map;return Object.defineProperty(e,Rt,{value:t}),t}function pi(e,t,n,r,i){var a=fi(e),o=mi(a,e,t,n,i);return o!==r&&(o&&(t=$r(e,t,o,void 0,i)),a.set(n,r)),t}function mi(e,t,n,r,i){var a=e.get(r);if(a!=null)return a;a=0;for(let e=0;e<r.length;e++){let o=r[e];Qr(t,o,i)!=null&&(a!==0&&(n=$r(t,n,a,void 0,i)),a=o)}return e.set(r,a),a}function hi(e,t,n){var r=0|e[F],i=cn(r),a=Qr(e,n,i);if(en(a)){if(!tn(a))return Gr(a),a.B;var o=a.B}else Array.isArray(a)&&(o=a);if(o){let e=0|o[F];2&e&&(o=Ur(o,e))}return(o=Lr(o,t))!==a&&$r(e,r,n,o,i),o}function gi(e,t,n,r){var i=e.B,a=0|i[F];if(t=function(e,t,n,r,i){var a=!1;if((r=Qr(e,r,i,e=>{var r=fr(e,n,!1,t);return a=r!==e&&r!=null,r}))!=null)return a&&!tn(r)&&qr(e,t),r}(i,a,t,n,r),t==null)return t;if(!tn(e,a=0|i[F])){let o=Wr(t);o!==t&&(Gr(e)&&(a=0|(i=e.B)[F]),qr(i,a=$r(i,a,n,t=o,r)))}return t}function _i(e,t,n,r,i,a,o,s){var c=tn(e,n);a=c?1:a||4,o=!!o||a===3,c=s&&!c,(a===2||c)&&Gr(e)&&(n=0|(t=e.B)[F]);var l=(e=ii(t,i))===Ft?7:0|e[F],u=ai(l,n);if(s=!(4&u)){var d=e,f=n;let t=!!(2&u);t&&(f|=2);let i=!t,a=!0,o=0,s=0;for(;o<d.length;o++){let e=fr(d[o],r,!1,f);if(e instanceof r){if(!t){let t=tn(e);i&&=!t,a&&=t}d[s++]=e}}s<o&&(d.length=s),u|=4,u=a?-4097&u:4096|u,u=i?8|u:-9&u}if(u!==l&&(Xt(e,u),2&u&&Object.freeze(e)),c&&!(8&u||!e.length&&(a===1||a===4&&(2&u||!(16&u)&&32&n)))){for(oi(u)&&(e=In(e),u=Si(u,n),n=$r(t,n,i,e)),r=e,c=u,l=0;l<r.length;l++)(d=r[l])!==(u=Wr(d))&&(r[l]=u);c|=8,Xt(e,u=c=r.length?4096|c:-4097&c)}return ri(e,u,t,n,i,a,s,o)}function vi(e,t,n){var r=e.B;return _i(e,r,0|r[F],t,n,void 0,!1,!0)}function yi(e){return e??=void 0,e}function L(e,t,n,r,i){return I(e,n,r=yi(r),i),r&&!tn(r)&&qr(e.B),e}function bi(e,t,n,r){t:{var i=r=yi(r);Kr(e);let a=e.B,o=0|a[F];if(i==null){let e=fi(a);if(mi(e,a,o,n)!==t)break t;e.set(n,0)}else o=pi(a,o,n,t);$r(a,o,t,i)}return r&&!tn(r)&&qr(e.B),e}function xi(e,t,n){Kr(e);var r=e.B,i=0|r[F];if(n==null)return $r(r,i,t),e;var a=n===Ft?7:0|n[F],o=a,s=oi(a),c=s||Object.isFrozen(n),l=!0,u=!0;for(let e=0;e<n.length;e++){var d=n[e];s||(d=tn(d),l&&=!d,u&&=d)}return s||(a=l?13:5,a=u?-4097&a:4096|a),c&&a===o||(n=In(n),o=0,a=Si(a,i)),a!==o&&Xt(n,a),i=$r(r,i,t,n),2&a||!(4096&a||16&a)||qr(r,i),e}function Si(e,t){return-273&(2&t?2|e:-3&e)}function Ci(e,t,n,r){var i=r;Kr(e),e=_i(e,r=e.B,0|r[F],n,t,2,!0),i??=new n,e.push(i),t=n=e===Ft?7:0|e[F],(i=tn(i))?(n&=-9,e.length===1&&(n&=-4097)):n|=4096,n!==t&&Xt(e,n),i||qr(r)}function wi(e,t,n){return Yn(Zr(e,t,n))}function Ti(e,t){return Zr(e,t,void 0,Wn)??0}function Ei(e,t,n,r){return gi(e,t,n=di(e,r)===n?n:-1,void 0)}function Di(e,t){li(e,3,t==null?t:Gn(t),!1)}function Oi(e,t,n){if(n!=null){if(typeof n!=`number`||!Bn(n))throw At(`int32`);n|=0}I(e,t,n)}function ki(e,t,n){return I(e,t,n==null?n:Zn(n))}function Ai(e,t,n){return I(e,t,n==null?n:function(e){if(!qn(e))throw At(`uint64`);switch(typeof e){case`string`:var t=Vn(Number(e));return zn(t)&&t>=0?e=mn(t):((t=e.indexOf(`.`))!==-1&&(e=e.substring(0,t)),e=Mt()?mn(Rn(64,BigInt(e))):mn($n(e))),e;case`bigint`:return mn(Rn(64,e));default:return zn(e)?e=mn(tr(e)):((e=Vn(e))>=0&&zn(e)?e=String(e):(En(e),e=jn(Cn,wn)),e=mn(e)),e}}(n))}function R(e,t,n){I(e,t,n==null?n:Un(n))}function ji(e,t,n){li(e,t,n==null?n:Un(n),0)}function Mi(e,t,n){li(e,t,ur(n),``)}function Ni(e,t,n){{Kr(e);let o=e.B,s=0|o[F];if(n==null)$r(o,s,t);else{var r=e=n===Ft?7:0|n[F],i=oi(e),a=i||Object.isFrozen(n);for(i||(e=0),a||=(n=In(n),r=0,e=Si(e,s),!1),e|=5,e|=(4&e?512&e?512:1024&e?1024:0:void 0)??1024,i=0;i<n.length;i++){let t=n[i],o=lr(t);Object.is(t,o)||(a&&=(n=In(n),r=0,e=Si(e,s),!1),n[i]=o)}e!==r&&(a&&(n=In(n),e=Si(e,s)),Xt(n,e)),$r(o,s,t,n)}}}function Pi(e,t,n){Kr(e),ni(e,t,dr,2,!0).push(lr(n))}var Fi=class{constructor(e,t,n){if(this.buffer=e,n&&!t)throw Error();this.h=t}};function Ii(e,t){if(typeof e==`string`)return new Fi(bt(e),t);if(Array.isArray(e))return new Fi(new Uint8Array(e),t);if(e.constructor===Uint8Array)return new Fi(e,!1);if(e.constructor===ArrayBuffer)return e=new Uint8Array(e),new Fi(e,!1);if(e.constructor===Et)return t=wt(e)||new Uint8Array,new Fi(t,!0,e);if(e instanceof Uint8Array)return e=e.constructor===Uint8Array?e:new Uint8Array(e.buffer,e.byteOffset,e.byteLength),new Fi(e,!1);throw Error()}function Li(e,t){var n=0,r=0,i=0,a=e.i,o=e.h;do{var s=a[o++];n|=(127&s)<<i,i+=7}while(i<32&&128&s);if(i>32)for(r|=(127&s)>>4,i=3;i<32&&128&s;i+=7)r|=(127&(s=a[o++]))<<i;if(Gi(e,o),!(128&s))return t(n>>>0,r>>>0);throw Error()}function Ri(e){for(var t=0,n=e.h,r=n+10,i=e.i;n<r;){let r=i[n++];if(t|=r,!(128&r))return Gi(e,n),!!(127&t)}throw Error()}function zi(e){var t=e.i,n=e.h,r=t[n++],i=127&r;if(128&r&&(i|=(127&(r=t[n++]))<<7,128&r&&(i|=(127&(r=t[n++]))<<14,128&r&&(i|=(127&(r=t[n++]))<<21,128&r&&(i|=(r=t[n++])<<28,128&r&&128&t[n++]&&128&t[n++]&&128&t[n++]&&128&t[n++]&&128&t[n++])))))throw Error();return Gi(e,n),i}function Bi(e){return zi(e)>>>0}function Vi(e){return Li(e,An)}function Hi(e){var t=e.i,n=e.h,r=t[n],i=t[n+1],a=t[n+2];return t=t[n+3],Gi(e,e.h+4),(r|i<<8|a<<16|t<<24)>>>0}function Ui(e){var t=Hi(e);e=2*(t>>31)+1;var n=t>>>23&255;return t&=8388607,n==255?t?NaN:1/0*e:n==0?1401298464324817e-60*e*t:e*2**(n-150)*(t+8388608)}function Wi(e){return zi(e)}function Gi(e,t){if(e.h=t,t>e.l)throw Error()}function Ki(e,t){if(t<0)throw Error();var n=e.h;if((t=n+t)>e.l)throw Error();return e.h=t,n}function qi(e,t){if(t==0)return Ct();var n=Ki(e,t);return e.ga&&e.u?n=e.i.subarray(n,n+t):(e=e.i,n=n===(t=n+t)?new Uint8Array:Sn?e.slice(n,t):new Uint8Array(e.subarray(n,t))),n.length==0?Ct():new Et(n,St)}var Ji=class{constructor(e,t,n,r){this.i=null,this.u=!1,this.h=this.l=this.o=0,this.init(e,t,n,r)}init(e,t,n,{ga:r=!1,na:i=!1}={}){this.ga=r,this.na=i,e&&(e=Ii(e,this.na),this.i=e.buffer,this.u=e.h,this.o=t||0,this.l=n===void 0?this.i.length:this.o+n,this.h=this.o)}clear(){this.i=null,this.u=!1,this.h=this.l=this.o=0,this.ga=!1}},Yi=[],Xi=0;function Zi(e,t,n,r){if(sa.length){let i=sa.pop();return i.A(r),i.h.init(e,t,n,r),i}return new oa(e,t,n,r)}function Qi(e){e.h.clear(),e.l=-1,e.i=-1,sa.length<100&&sa.push(e)}function $i(e){var t=e.h;if(t.h==t.l)return!1;e.o=e.h.h;var n=Bi(e.h);if(t=n>>>3,!((n&=7)>=0&&n<=5)||t<1)throw Error();return e.l=t,e.i=n,!0}function ea(e){try{switch(e.i){case 0:e.i==0?Ri(e.h):ea(e);break;case 1:var t=e.h;Gi(t,t.h+8);break;case 2:if(e.i!=2)ea(e);else{var n=Bi(e.h),r=e.h;Gi(r,r.h+n)}break;case 5:var i=e.h;Gi(i,i.h+4);break;case 3:ta();let a=e.l;try{for(;;){if(!$i(e))throw Error();if(e.i==4){if(e.l!=a)throw Error();break}ea(e)}}catch(e){throw e instanceof RangeError?SyntaxError():e}finally{Xi>0&&Xi--}break;default:throw Error()}}catch(e){throw e instanceof RangeError?SyntaxError():e}}function ta(){if(Xi>=100)throw SyntaxError();Xi++}function na(e,t,n){var r=e.h.l,i=Bi(e.h),a=(i=e.h.h+i)-r;if(a<=0&&(e.h.l=i,n(t,e,void 0,void 0,void 0),a=i-e.h.h),a)throw Error();return e.h.h=i,e.h.l=r,t}function ra(e){var t=Bi(e.h),n=Ki(e=e.h,t);if(e=e.i,tt){var r,i=e;(r=Qe)||(r=Qe=new TextDecoder(`utf-8`,{fatal:!0})),t=n+t,i=n===0&&t===i.length?i:i.subarray(n,t);try{var a=r.decode(i)}catch(e){if(et===void 0){try{r.decode(new Uint8Array([128]))}catch{}try{r.decode(new Uint8Array([97])),et=!0}catch{et=!1}}throw!et&&(Qe=void 0),e}}else{t=(a=n)+t,n=[];let s,c=null;for(;a<t;){var o=e[a++];o<128?n.push(o):o<224?a>=t?Xe():(s=e[a++],o<194||(192&s)!=128?(a--,Xe()):n.push((31&o)<<6|63&s)):o<240?a>=t-1?Xe():(s=e[a++],(192&s)!=128||o===224&&s<160||o===237&&s>=160||(192&(r=e[a++]))!=128?(a--,Xe()):n.push((15&o)<<12|(63&s)<<6|63&r)):o<=244?a>=t-2?Xe():(s=e[a++],(192&s)!=128||s-144+(o<<28)>>30||(192&(r=e[a++]))!=128||(192&(i=e[a++]))!=128?(a--,Xe()):(o=(7&o)<<18|(63&s)<<12|(63&r)<<6|63&i,o-=65536,n.push(55296+(o>>10&1023),56320+(1023&o)))):Xe(),n.length>=8192&&(c=Ze(c,n),n.length=0)}a=Ze(c,n)}return a}function ia(e){var t=Bi(e.h);return qi(e.h,t)}function aa(e,t,n){var r=Bi(e.h);for(r=e.h.h+r;e.h.h<r;)n.push(t(e.h))}var oa=class{constructor(e,t,n,r){if(Yi.length){let i=Yi.pop();i.init(e,t,n,r),e=i}else e=new Ji(e,t,n,r);this.h=e,this.o=this.h.h,this.i=this.l=-1,this.A(r)}A({sa:e=!1}={}){this.sa=e}},sa=[];function ca(e){return new da(0|e,Math.floor(e/4294967296))}function la(e){return e?/^\d+$/.test(e)?(Pn(e),new da(Cn,wn)):null:ua||=new da(0,0)}var ua,da=class{constructor(e,t){this.i=e>>>0,this.h=t>>>0}};function fa(e){return new Sa(0|e,Math.floor(e/4294967296))}function pa(e){return e?/^-?\d+$/.test(e)?(Pn(e),new Sa(Cn,wn)):null:ma||=new Sa(0,0)}var ma,ha,ga,_a,va,ya,ba,xa,Sa=class{constructor(e,t){this.i=e>>>0,this.h=t>>>0}};function Ca(e,t,n){return typeof BigInt64Array<`u`?(ba||(ba=new BigInt64Array(1),xa=new Uint32Array(ba.buffer),ba[0]=BigInt(1),ya=xa[0]===1),ba[0]=e,new t(xa[e=+!ya],xa[1-e])):(va||=(ha=BigInt(-(2**53-1)),ga=BigInt(2**53-1),_a=BigInt(4294967295),BigInt(32)),e>=ha&&e<=ga?n(Number(e)):(e=BigInt.asUintN(64,e),new t(Number(e&_a),Number(e>>va))))}function wa(e,t,n){for(;n>0||t>127;)e.h.push(127&t|128),t=(t>>>7|n<<25)>>>0,n>>>=7;e.h.push(t)}function Ta(e,t){for(;t>127;)e.h.push(127&t|128),t>>>=7;e.h.push(t)}function Ea(e,t){if(t>=0)Ta(e,t);else{for(let n=0;n<9;n++)e.h.push(127&t|128),t>>=7;e.h.push(1)}}function Da(e,t){Pn(t),function(e){var t=wn>>31;e(Cn<<1^t,(wn<<1|Cn>>>31)^t)}((t,n)=>{wa(e,t>>>0,n>>>0)})}function Oa(e,t){e.h.push(t>>>0&255),e.h.push(t>>>8&255),e.h.push(t>>>16&255),e.h.push(t>>>24&255)}var ka=class{constructor(){this.h=[]}length(){return this.h.length}end(){var e=this.h;return this.h=[],e}};function Aa(e,t){t.length!==0&&(e.l.push(t),e.i+=t.length)}function ja(e,t,n){Ta(e.h,8*t+n)}function Ma(e,t){return ja(e,t,2),t=e.h.end(),Aa(e,t),t.push(e.i),t}function Na(e,t){var n=t.pop();for(n=e.i+e.h.length()-n;n>127;)t.push(127&n|128),n>>>=7,e.i++;t.push(n),e.i++}function Pa(e,t,n){if(n!=null)switch(ja(e,t,0),typeof n){case`number`:e=e.h,En(n),wa(e,Cn,wn);break;case`bigint`:n=Ca(n,Sa,fa),wa(e.h,n.i,n.h);break;default:n=pa(n),wa(e.h,n.i,n.h)}}function Fa(e,t,n){ja(e,t,2),Ta(e.h,n.length),Aa(e,e.h.end()),Aa(e,n)}function Ia(e,t,n,r){n!=null&&(t=Ma(e,t),r(n,e),Na(e,t))}var La=class{constructor(){this.l=[],this.i=0,this.h=new ka}};function Ra(e){typeof e==`string`&&pa(e)}function za(){var e=class{constructor(){throw Error()}};return Object.setPrototypeOf(e,e.prototype),e}var Ba=za(),Va=za(),Ha=za(),Ua=za(),Wa=za(),Ga=za(),Ka=za(),qa=za(),Ja=za(),Ya=za(),Xa=za(),Za=za();function Qa(e,t,n){var r=e.B;zt&&zt in r&&(r=r[zt])&&delete r[t.h],t.i?t.u(e,t.i,t.h,n,t.l):t.u(e,t.h,n,t.l)}var z=class{constructor(e,t){this.B=Rr(e,t,void 0,2048)}toJSON(){return Ir(this)}u(){var e=_l,t=this.B,n=e.h,r=zt;if(Nt&&r&&t[r]?.[n]!=null&&jt(Bt,3),t=e.h,Gt&&zt&&Gt===void 0&&(r=(n=this.B)[zt])&&(r=r.la))try{r(n,t,jr)}catch(e){it(e)}return e.i?e.o(this,e.i,e.h,e.l):e.o(this,e.h,e.defaultValue,e.l)}clone(){var e=this.B,t=0|e[F];return Jr(this,e,t)?Vr(this,e,!0):new this.constructor(Ur(e,t,!1))}};z.prototype[Wt]=$t,z.prototype.toString=function(){return this.B.toString()};var $a=class{constructor(e,t,n){this.h=e,this.i=t,e=Ba,this.l=!!e&&n===e||!1}};function eo(e,t){return new $a(e,t,Ba)}function to(e,t,n,r,i){Ia(e,n,mo(t,r),i)}var no,ro,io=eo(function(e,t,n,r,i){return e.i===2&&(na(e,hi(t,r,n),i),!0)},to),ao=eo(function(e,t,n,r,i){return e.i===2&&(na(e,hi(t,r,n),i),!0)},to),oo=Symbol(),so=Symbol(),co=Symbol(),lo=Symbol(),uo=Symbol();function fo(e,t,n,r){var i=r[e];if(i)return i;(i={}).Fa=r,i.da=function(e){switch(typeof e){case`boolean`:return Or||=[0,void 0,!0];case`number`:return e>0?void 0:e===0?kr||=[0,void 0]:[-e,void 0];case`string`:return[0,e];case`object`:return e}}(r[0]);var a=r[1],o=1;a&&a.constructor===Object&&(i.ja=a,typeof(a=r[++o])==`function`&&(i.xa=!0,no??=a,ro??=r[o+1],a=r[o+=2]));for(var s={};a&&Array.isArray(a)&&a.length&&typeof a[0]==`number`&&a[0]>0;){for(var c=0;c<a.length;c++)s[a[c]]=a;a=r[++o]}for(c=1;a!==void 0;){let e;typeof a==`number`&&(c+=a,a=r[++o]);var l=void 0;if(a instanceof $a?e=a:(e=io,o--),e?.l){a=r[++o],l=r;var u=o;typeof a==`function`&&(a=a(),l[u]=a),l=a}for(u=c+1,typeof(a=r[++o])==`number`&&a<0&&(u-=a,a=r[++o]);c<u;c++){let r=s[c];l?n(i,c,e,l,r):t(i,c,e,r)}}return r[e]=i}function po(e){return Array.isArray(e)?e[0]instanceof $a?e:[ao,e]:[e,void 0]}function mo(e,t){return e instanceof z?e.B:Array.isArray(e)?Lr(e,t):void 0}function ho(e,t,n,r){var i=n.h;e[t]=r?(e,t,n)=>i(e,t,n,r):i}function go(e,t,n,r,i){var a,o,s=n.h;e[t]=(e,t,n)=>s(e,t,n,o||=fo(so,ho,go,r).da,a||=_o(r),i)}function _o(e){var t=e[co];if(t!=null)return t;var n=fo(so,ho,go,e);return t=n.xa?(e,t)=>no(e,t,n):(e,t)=>{t:{ta();try{for(;$i(t)&&t.i!=4;){let c=t.l,l=n[c];if(l==null){let e=n.ja;if(e){let t=e[c];if(t){let e=yo(t);e!=null&&(l=n[c]=e)}}}if(l==null||!l(t,e,c)){var r=t;let n=r.o;if(ea(r),r.sa)var i=void 0;else{let e=r.h.h-n;r.h.h=n,i=qi(r.h,e)}r=void 0;var a=e,o=c,s=i;s&&((r=a[zt]??(a[zt]=new Ar))[o]??(r[o]=[])).push(s)}}let l=Er(e);l&&(l.la=n.Fa[uo]);var c=!0;break t}catch(e){throw e instanceof RangeError?SyntaxError():e}finally{Xi>0&&Xi--}}return c},e[co]=t,e[uo]=vo.bind(e),t}function vo(e,t,n,r){var i=this[so],a=this[co],o=Lr(void 0,i.da),s=Er(e);if(s){var c=!1,l=i.ja;if(l){if(i=(t,n,i)=>{if(i.length!==0){if(l[n])for(let e of i){t=Zi(e);try{c=!0,a(o,t)}finally{Qi(t)}}else r?.(e,n,i)}},t==null)Dr(s,i);else if(s!=null){let e=s[t];e&&i(s,t,e)}if(c){let r=0|e[F];if(2&r&&2048&r&&!n?.eb)throw Error();let i=cn(r),a=(t,a)=>{if(Qr(e,t,i)!=null){if(n?.mb===1)return;throw Error()}a!=null&&(r=$r(e,r,t,a,i)),delete s[t]};t==null?on(o,0|o[F],(e,t)=>{a(e,t)}):a(t,Qr(o,t,i))}}}}function yo(e){var t=(e=po(e))[0].h;if(e=e[1]){let n=_o(e),r=fo(so,ho,go,e).da;return(e,i,a)=>t(e,i,a,r,n)}return t}function bo(e,t,n){e[t]=n.i}function xo(e,t,n,r){var i,a,o=n.i;e[t]=(e,t,n)=>o(e,t,n,a||=fo(oo,bo,xo,r).da,i||=So(r))}function So(e){var t=e[lo];if(!t){let n=fo(oo,bo,xo,e);t=(e,t)=>Co(e,t,n),e[lo]=t}return t}function Co(e,t,n){on(e,0|e[F],(e,r)=>{if(r!=null){var i=function(e,t){var n=e[t];if(n)return n;if((n=e.ja)&&(n=n[t])){var r=(n=po(n))[0].i;if(n=n[1]){let t=So(n),i=fo(oo,bo,xo,n).da;n=e.xa?ro(i,t):(e,n,a)=>r(e,n,a,i,t)}else n=r;return e[t]=n}}(n,e);i?i(t,r,e):e<500||jt(Ht,3)}}),(e=Er(e))&&Dr(e,(e,n,r)=>{for(Aa(t,t.h.end()),e=0;e<r.length;e++)Aa(t,wt(r[e])||new Uint8Array)})}var wo=mn(0);function To(e,t,n){if(Array.isArray(t)){var r=0|t[F];if(4&r)return t;for(var i=0,a=0;i<t.length;i++){let n=e(t[i]);n!=null&&(t[a++]=n)}return a<i&&(t.length=a),e=1|r,n&&(e=-1537&e|4),e!==r&&Xt(t,e),n&&2&e&&Object.freeze(t),t}}var Eo=(e,t)=>{var n=new La;Co(e.B,n,fo(oo,bo,xo,t)),Aa(n,n.h.end()),e=new Uint8Array(n.i);var r=(t=n.l).length,i=0;for(let n=0;n<r;n++){let r=t[n];e.set(r,i),i+=r.length}return n.l=[e],e};function Do(e,t,n){return new $a(e,t,n)}function Oo(e,t,n){return new $a(e,t,n)}function ko(e,t,n){$r(e,0|e[F],t,n,cn(0|e[F]))}var Ao=eo(function(e,t,n,r,i){if(e.i!==2)return!1;if(e=In(e=na(e,Lr([void 0,void 0],r),i)),i=cn(r=0|t[F]),2&r)throw Error();var a=Qr(t,n,i);if(a instanceof Sr)2&a.N?((a=a.fa()).push(e),$r(t,r,n,a,i)):a.hb(e);else if(Array.isArray(a)){var o=0|a[F];8192&o||Xt(a,o|=8192),2&o&&$r(t,r,n,a=ci(a),i),a.push(e)}else $r(t,r,n,Qt([e]),i);return!0},function(e,t,n,r,i){if(t instanceof Sr)t.forEach((t,a)=>{Ia(e,n,Lr([a,t],r),i)});else if(Array.isArray(t)){for(let a=0;a<t.length;a++){let o=t[a];Array.isArray(o)&&Ia(e,n,Lr(o,r),i)}Qt(t)}});function jo(e,t,n){(t=Wn(t))!=null&&(ja(e,n,5),e=e.h,Dn(t),Oa(e,Cn))}function Mo(e,t,n){(t=sr(t))!=null&&(Ra(t),Pa(e,n,t))}function No(e,t,n){(t=Yn(t))!=null&&t!=null&&(ja(e,n,0),Ea(e.h,t))}function Po(e,t,n){(t=t==null||typeof t==`boolean`?t:typeof t==`number`?!!t:void 0)!=null&&(ja(e,n,0),e.h.h.push(+!!t))}function Fo(e,t,n){(t=dr(t))!=null&&Fa(e,n,rt(t))}function Io(e,t,n,r,i){Ia(e,n,mo(t,r),i)}function Lo(e,t,n){(t=cr(t))!=null&&Fa(e,n,Ii(t,!0).buffer)}function Ro(e,t,n){(t=Xn(t))!=null&&t!=null&&(ja(e,n,0),Ta(e.h,t))}function zo(e,t,n){(t=Yn(t))!=null&&(t=parseInt(t,10),ja(e,n,0),Ea(e.h,t))}function Bo(e,t,n){return(e.i===5||e.i===2)&&(t=ui(t,0|t[F],n),e.i==2?aa(e,Ui,t):t.push(Ui(e.h)),!0)}function Vo(e,t,n){return e.i===0&&(ko(t,n,Vi(e.h)),!0)}function Ho(e,t,n){return(e.i===0||e.i===2)&&(t=ui(t,0|t[F],n),e.i==2?aa(e,zi,t):t.push(zi(e.h)),!0)}function Uo(e,t,n){return e.i===2&&(ko(t,n,(e=ia(e))===Ct()?void 0:e),!0)}var Wo=Do(function(e,t,n){if(e.i!==1)return!1;var r=e.h;e=Hi(r);var i=Hi(r);r=2*(i>>31)+1;var a=i>>>20&2047;return e=4294967296*(1048575&i)+e,ko(t,n,a==2047?e?NaN:1/0*r:a==0?5e-324*r*e:r*2**(a-1075)*(e+4503599627370496)),!0},function(e,t,n){(t=Wn(t))!=null&&(ja(e,n,1),e=e.h,(n=xn||=new DataView(new ArrayBuffer(8))).setFloat64(0,+t,!0),Cn=n.getUint32(0,!0),wn=n.getUint32(4,!0),Oa(e,Cn),Oa(e,wn))},Ya),Go=Do(function(e,t,n){return e.i===5&&(ko(t,n,Ui(e.h)),!0)},jo,Ja),Ko=Oo(Bo,function(e,t,n){if((t=To(Wn,t,!0))!=null)for(let o=0;o<t.length;o++){var r=e,i=n,a=t[o];a!=null&&(ja(r,i,5),r=r.h,Dn(a),Oa(r,Cn))}},Ja),qo=Oo(Bo,function(e,t,n){if((t=To(Wn,t,!0))!=null&&t.length){ja(e,n,2),Ta(e.h,4*t.length);for(let r=0;r<t.length;r++)n=e.h,Dn(t[r]),Oa(n,Cn)}},Ja),Jo=Do(function(e,t,n){return e.i===5&&(ko(t,n,(e=Ui(e.h))===0?void 0:e),!0)},jo,Ja),Yo=Do(function(e,t,n){return Vo(e,t,n)},Mo,Ga),Xo=Do(function(e,t,n){return Vo(e,t,n)},Mo,Ga),Zo=Oo(function(e,t,n){return e.i!==0&&e.i!==2?e=!1:(t=ui(t,0|t[F],n),e.i==2?aa(e,Vi,t):t.push(Vi(e.h)),e=!0),e},function(e,t,n){if((t=To(sr,t,!1))!=null)for(let r=0;r<t.length;r++)Pa(e,n,t[r])},Ga),Qo=Do(function(e,t,n){return e.i===0?(ko(t,n,(e=Vi(e.h))===wo?void 0:e),t=!0):t=!1,t},Mo,Ga),$o=Do(function(e,t,n){return e.i===0?(ko(t,n,Li(e.h,kn)),e=!0):e=!1,e},function(e,t,n){if(t=function(e){if(e==null)return e;var t=typeof e;if(t===`bigint`)return String(Rn(64,e));if(qn(e)){if(t===`string`)return t=Vn(Number(e)),zn(t)&&t>=0?e=String(t):((t=e.indexOf(`.`))!==-1&&(e=e.substring(0,t)),e=$n(e)),e;if(t===`number`)return tr(e)}}(t),t!=null&&(typeof t==`string`&&la(t),t!=null))switch(ja(e,n,0),typeof t){case`number`:e=e.h,En(t),wa(e,Cn,wn);break;case`bigint`:n=Ca(t,da,ca),wa(e.h,n.i,n.h);break;default:n=la(t),wa(e.h,n.i,n.h)}},Ka),es=Do(function(e,t,n){return e.i===0&&(ko(t,n,zi(e.h)),!0)},No,Ua),ts=Oo(Ho,function(e,t,n){if((t=To(Yn,t,!0))!=null)for(let o=0;o<t.length;o++){var r=e,i=n,a=t[o];a!=null&&(ja(r,i,0),Ea(r.h,a))}},Ua),ns=Oo(Ho,function(e,t,n){if((t=To(Yn,t,!0))!=null&&t.length){n=Ma(e,n);for(let n=0;n<t.length;n++)Ea(e.h,t[n]);Na(e,n)}},Ua),rs=Do(function(e,t,n){return e.i===0&&(ko(t,n,(e=zi(e.h))===0?void 0:e),!0)},No,Ua),B=Do(function(e,t,n){return e.i===0&&(ko(t,n,Ri(e.h)),!0)},Po,Va),is=Do(function(e,t,n){return e.i===0&&(ko(t,n,!1===(e=Ri(e.h))?void 0:e),!0)},Po,Va),as=Oo(function(e,t,n){return e.i===2&&(e=ra(e),ui(t,0|t[F],n).push(e),!0)},function(e,t,n){if((t=To(dr,t,!0))!=null)for(let o=0;o<t.length;o++){var r=e,i=n,a=t[o];a!=null&&Fa(r,i,rt(a))}},Ha),os=Do(function(e,t,n){return e.i===2&&(ko(t,n,(e=ra(e))===``?void 0:e),!0)},Fo,Ha),V=Do(function(e,t,n){return e.i===2&&(ko(t,n,ra(e)),!0)},Fo,Ha),ss=function(e,t,n=Ba){return new $a(e,t,n)}(function(e,t,n,r,i){return e.i===2&&(r=Lr(void 0,r),ui(t,0|t[F],n).push(r),na(e,r,i),!0)},function(e,t,n,r,i){if(Array.isArray(t)){for(let a=0;a<t.length;a++)Io(e,t[a],n,r,i);1&(e=0|t[F])||Xt(t,1|e)}}),H=eo(function(e,t,n,r,i,a){if(e.i!==2)return!1;var o=0|t[F];return pi(t,o,a,n,cn(o)),na(e,t=hi(t,r,n),i),!0},Io),cs=Do(function(e,t,n){return e.i===2&&(ko(t,n,ia(e)),!0)},Lo,Xa),ls=Oo(function(e,t,n){return e.i===2&&(e=ia(e),ui(t,0|t[F],n).push(e),!0)},function(e,t,n){if((t=To(cr,t,!1))!=null)for(let o=0;o<t.length;o++){var r=e,i=n,a=t[o];a!=null&&Fa(r,i,Ii(a,!0).buffer)}},Xa),us=Do(function(e,t,n){return e.i===0&&(ko(t,n,Bi(e.h)),!0)},Ro,Wa),ds=Oo(function(e,t,n){return(e.i===0||e.i===2)&&(t=ui(t,0|t[F],n),e.i==2?aa(e,Bi,t):t.push(Bi(e.h)),!0)},function(e,t,n){if((t=To(Xn,t,!0))!=null)for(let o=0;o<t.length;o++){var r=e,i=n,a=t[o];a!=null&&(ja(r,i,0),Ta(r.h,a))}},Wa),fs=Do(function(e,t,n){return e.i===0&&(ko(t,n,(e=Bi(e.h))===0?void 0:e),!0)},Ro,Wa),U=Do(function(e,t,n){return e.i===0&&(ko(t,n,zi(e.h)),!0)},zo,Za),ps=Do(function(e,t,n){return e.i===0&&(ko(t,n,(e=zi(e.h))===0?void 0:e),!0)},zo,Za),ms=Do(function(e,t,n){return e.i===0?(ko(t,n,function(e){return Li(e,(e,t)=>{var n=-(1&e);return An(e=(e>>>1|t<<31)^n,t>>>1^n)})}(e.h)),e=!0):e=!1,e},function(e,t,n){if((t=sr(t))!=null&&(Ra(t),t!=null))switch(ja(e,n,0),typeof t){case`number`:e=e.h,t=(n=t)<0,Tn(n=2*Math.abs(n)),n=Cn;let r=wn;t&&(n==0?r==0?r=n=4294967295:(r--,n=4294967295):n--),wa(e,Cn=n,wn=r);break;case`bigint`:e=e.h,t=t<<BigInt(1)^t>>BigInt(63),Cn=Number(BigInt.asUintN(32,t)),wn=Number(BigInt.asUintN(32,t>>BigInt(32))),wa(e,Cn,wn);break;default:Da(e.h,t)}},qa),hs=class{constructor(e,t){var n=Us;this.h=e,this.i=t,this.o=gi,this.u=L,this.defaultValue=void 0,this.l=n.kb==null?void 0:sn}register(){ut(this)}};function gs(e,t){return new hs(e,t)}function _s(e,t){return(n,r)=>{t:{let a={na:!0};r&&Object.assign(a,r),n=Zi(n,void 0,void 0,a);try{let r=new e,a=r.B;_o(t)(a,n);var i=r;break t}catch(e){throw e instanceof RangeError?SyntaxError():e}finally{Qi(n)}}return i}}function vs(e){return t=>Eo(t,e)}function ys(e){return function(){return Eo(this,e)}}var bs=[0,cs,ls,B,V],xs=[0,os,[0,ps,[0,Qo,rs],ps,-1,[0,U],ps,-1],Do(Uo,Lo,Xa)],Ss,Cs=class extends z{constructor(e){super(e)}},ws=[0,os,Do(Uo,function(e,t,n){if(t!=null){if(t instanceof z){let r=t.nb;r?(t=r(t),t!=null&&Fa(e,n,Ii(t,!0).buffer)):jt(Ht,3);return}if(Array.isArray(t))return void jt(Ht,3)}Lo(e,t,n)},Xa)],Ts=[0,1,[0,12,es,10,B],[0,7,[0,es,-1]]],Es=globalThis.trustedTypes,Ds=class{constructor(e){this.h=e}toString(){return this.h+``}};function Os(e){var t;return Ss===void 0&&(Ss=function(){var e=null;if(!Es)return e;try{let t=e=>e;e=Es.createPolicy(`goog#html`,{createHTML:t,createScript:t,createScriptURL:t})}catch{}return e}()),e=(t=Ss)?t.createScriptURL(e):e,new Ds(e)}function ks(e,...t){if(t.length===0)return Os(e[0]);var n=e[0];for(let r=0;r<t.length;r++)n+=encodeURIComponent(t[r])+e[r+1];return Os(n)}var As=[0,es,U,B,-1,ns,U,-1,B,-1],js=[0,U,-1,B],Ms=class extends z{constructor(e){super(e)}},Ns=[0,B,V,B,U,-1,Oo(function(e,t,n){return(e.i===0||e.i===2)&&(t=ui(t,0|t[F],n),e.i==2?aa(e,Wi,t):t.push(zi(e.h)),!0)},function(e,t,n){if((t=To(Yn,t,!0))!=null&&t.length){n=Ma(e,n);for(let n=0;n<t.length;n++)Ea(e.h,t[n]);Na(e,n)}},Za),V,-1,[0,B,-1],U,B,-1,js],Ps=class extends z{constructor(e){super(e)}},Fs=class extends z{constructor(e){super(e)}},Is=class extends z{constructor(e){super(e)}h(){return ei(this,9)}},Ls=[0,3,B,-1,2,[0,[2],es,H,[0,us]],[0,U,B,U,B,U,4,[0,B,V,-1,B],U,B,-1],[0,[3,4],V,-1,H,[0,es],H,[0,U,-1]],[0],V,B],Rs=[0,V,-2],zs=class extends z{constructor(e){super(e)}},Bs=[0],Vs=class extends z{constructor(e){super(e)}},Hs=[0,es,B,1,B,-4],Us=class extends z{constructor(e){super(e,2)}},Ws={};Ws[336783863]=[0,V,B,-1,es,[0,[1,2,3,4,5,6,7,8,9],H,Bs,H,Ns,H,Rs,H,Hs,H,As,H,[0,V,-2],H,[0,V,U],H,Ls,H,js],[0,V],B,[0,[1,3],[2,4],H,[0,ns],-1,H,[0,as],-1,ss,[0,V,-1]],V];var Gs=[0,Qo,-1,is,-3,Qo,ns,os,rs,Qo,-1,is,rs,is,-2,os];function Ks(e,t){Pi(e,3,t)}function qs(e,t){Pi(e,4,t)}var Js=class extends z{constructor(e){super(e,500)}A(e){return L(this,0,7,e)}},Ys=[-1,{}],Xs=[0,V,1,Ys],Zs=[0,V,as,Ys];function Qs(e,t){Ci(e,1,Js,t)}function $s(e,t){Pi(e,10,t)}function ec(e,t){Pi(e,15,t)}var tc=class extends z{constructor(e){super(e,500)}A(e){return L(this,0,1001,e)}},nc=[-500,ss,[-500,os,-1,as,-3,[-2,Ws,B],ss,ws,rs,-1,Xs,Zs,ss,[0,os,is],os,Gs,rs,as,987,as],4,ss,[-500,V,-1,[-1,{}],998,V],ss,[-500,V,as,-1,[-2,{},B],997,as,-1],rs,ss,[-500,V,as,Ys,998,as],as,rs,Xs,Zs,ss,[0,os,-1,Ys],as,-2,Gs,os,-1,is,[0,is,fs],978,Ys,ss,ws];tc.prototype.h=ys(nc);var rc=_s(tc,nc),ic=class extends z{constructor(e){super(e)}},ac=class extends z{constructor(e){super(e)}h(){return vi(this,ic,1)}},oc=[0,ss,[0,es,Go,V,-1]],sc=_s(ac,oc),cc=class extends z{constructor(e){super(e)}},lc=class extends z{constructor(e){super(e)}},uc=class extends z{constructor(e){super(e)}l(){return gi(this,cc,2)}h(){return vi(this,lc,5)}},dc=_s(class extends z{constructor(e){super(e)}},[0,as,ns,qo,[0,U,[0,es,-3],[0,Go,-3],[0,es,-1,[0,ss,[0,es,-2]]],ss,[0,Go,-1,V,Go]],V,-1,Xo,ss,[0,es,Go],as,Xo]),fc=class extends z{constructor(e){super(e)}},pc=_s(class extends z{constructor(e){super(e)}},[0,ss,[0,Go,-4]]),mc=class extends z{constructor(e){super(e)}},hc=_s(class extends z{constructor(e){super(e)}},[0,ss,[0,Go,-4]]),gc=class extends z{constructor(e){super(e)}},_c=[0,es,-1,qo,U],vc=class extends z{constructor(e){super(e)}};vc.prototype.h=ys([0,Go,-4,Xo]);var yc=class extends z{constructor(e){super(e)}},bc=_s(class extends z{constructor(e){super(e)}},[0,ss,[0,1,es,V,oc],Xo]),xc=class extends z{constructor(e){super(e)}},Sc=class extends z{constructor(e){super(e)}h(){return Zr(this,1,void 0,si)??Ct()}},Cc=class extends z{constructor(e){super(e)}},wc=[1,2],Tc=_s(class extends z{constructor(e){super(e)}},[0,ss,[0,wc,H,[0,qo],H,[0,cs],es,V],Xo]),Ec=class extends z{constructor(e){super(e)}},Dc=[0,V,es,Go,as,-1],Oc=class extends z{constructor(e){super(e)}},kc=[0,B,-1],Ac=class extends z{constructor(e){super(e)}h(){return ti(this,2,jc)}l(){return Ei(this,Is,6,jc)}},jc=[1,2,3,4,5,6],Mc=class extends z{constructor(e){super(e)}h(){return Zr(this,1,void 0,si)!=null}l(){return dr(Zr(this,2))!=null}},Nc=class extends z{constructor(e){super(e)}},Pc=[0,cs,V,[0,es,Xo,-1],[0,$o,Xo]],Fc=[0,Pc,B,[0,jc,H,Hs,H,Ns,H,As,H,Bs,H,Rs,H,Ls],U],Ic=vs(Fc),Lc=class extends z{constructor(e){super(e)}},Rc=[0,Fc,Go,-1,es],zc=gs(502141897,Lc);Ws[502141897]=Rc;var Bc=_s(class extends z{constructor(e){super(e)}},[0,[0,U,-1,Ko,ds],_c]),Vc=class extends z{constructor(e){super(e)}},Hc=class extends z{constructor(e){super(e)}},Uc=[0,Fc,Go,[0,Fc],B],Wc=gs(508968150,Hc);Ws[508968150]=[0,Fc,Rc,Uc,Go,[0,[0,Pc]]],Ws[508968149]=Uc;var Gc=class extends z{constructor(e){super(e)}l(){return gi(this,Ec,2)}h(){I(this,2)}},Kc=[0,Fc,Dc];Ws[478825465]=Kc;var qc=class extends z{constructor(e){super(e)}},Jc=class extends z{constructor(e){super(e)}},Yc=class extends z{constructor(e){super(e)}},Xc=class extends z{constructor(e){super(e)}},Zc=class extends z{constructor(e){super(e)}},Qc=[0,Fc,[0,Fc],Kc,-1],$c=[0,Fc,Go,es],el=[0,Fc,Go],tl=[0,Fc,$c,el,Go],nl=gs(479097054,Zc);Ws[479097054]=[0,Fc,tl,Qc],Ws[463370452]=Qc,Ws[464864288]=$c;var rl=gs(462713202,Xc);Ws[462713202]=tl,Ws[474472470]=el;var il=class extends z{constructor(e){super(e)}},al=class extends z{constructor(e){super(e)}},ol=class extends z{constructor(e){super(e)}},sl=class extends z{constructor(e){super(e)}},cl=[0,Fc,Go,-1,es],ll=[0,Fc,Go,B];sl.prototype.h=ys([0,Fc,el,[0,Fc],Rc,Uc,cl,ll]);var ul=class extends z{constructor(e){super(e)}},dl=gs(456383383,ul);Ws[456383383]=[0,Fc,Dc];var fl=class extends z{constructor(e){super(e)}},pl=gs(476348187,fl);Ws[476348187]=[0,Fc,kc];var ml=class extends z{constructor(e){super(e)}},hl=class extends z{constructor(e){super(e)}},gl=[0,U,-1],_l=gs(458105876,class extends z{constructor(e){super(e)}h(){var e=this.B,t=0|e[F],n=tn(this,t);return e=function(e,t,n,r){var i=hl;!r&&Gr(e)&&(n=0|(t=e.B)[F]);var a=Qr(t,2);if(e=!1,a==null){if(r)return Tr();a=[]}else if(a.constructor===Sr){if(!(2&a.N)||r)return a;a=a.fa()}else Array.isArray(a)?e=!!(2&a[F]):a=[];if(r){if(!a.length)return Tr();e||(e=!0,Zt(a))}else e&&(e=!1,Qt(a),a=ci(a));return!e&&32&n&&Yt(a,32),n=$r(t,n,2,r=new Sr(a,i,pr,void 0)),e||qr(t,n),r}(this,e,t,n),!n&&hl&&(e.Ga=!0),e}});Ws[458105876]=[0,gl,Ao,[!0,Xo,[0,V,-1,as]],[0,ns,B,U],B];var vl=class extends z{constructor(e){super(e)}},yl=gs(458105758,vl);Ws[458105758]=[0,Fc,V,gl];var bl=class extends z{constructor(e){super(e)}},xl=class extends z{constructor(e){super(e)}},Sl=class extends z{constructor(e){super(e)}},Cl=vs([0,ss,[0,ps,ss,[0,Jo,-1],is]]),wl=class extends z{constructor(e){super(e)}},Tl=[0,Jo,-1,is],El=class extends z{constructor(e){super(e)}},Dl=class extends z{constructor(e){super(e)}},Ol=[1,2];Dl.prototype.h=ys([0,Ol,H,Tl,H,[0,ss,Tl]]);var kl=class extends z{constructor(e){super(e)}},Al=gs(443442058,kl);Ws[443442058]=[0,Fc,V,es,Go,as,-1,B,Go],Ws[514774813]=cl;var jl=class extends z{constructor(e){super(e)}},Ml=gs(516587230,jl);function Nl(e,t){return t=t?t.clone():new Ec,e.displayNamesLocale===void 0?e.displayNamesLocale===void 0&&I(t,1):I(t,1,ur(e.displayNamesLocale)),e.maxResults===void 0?`maxResults`in e&&I(t,2):Oi(t,2,e.maxResults),e.scoreThreshold===void 0?`scoreThreshold`in e&&I(t,3):R(t,3,e.scoreThreshold),e.categoryAllowlist===void 0?`categoryAllowlist`in e&&I(t,4):Ni(t,4,e.categoryAllowlist),e.categoryDenylist===void 0?`categoryDenylist`in e&&I(t,5):Ni(t,5,e.categoryDenylist),t}function Pl(e){var t=Number(e);return Number.isSafeInteger(t)?t:String(e)}function Fl(e,t=-1,n=``){return{categories:e.map(e=>({index:wi(e,1)??0??-1,score:Ti(e,2)??0,categoryName:dr(Zr(e,3))??``??``,displayName:dr(Zr(e,4))??``??``})),headIndex:t,headName:n}}function Il(e){var t={classifications:vi(e,yc,1).map(e=>Fl(gi(e,ac,4)?.h()??[],wi(e,2)??0,dr(Zr(e,3))??``))};return function(e){return e==null?e:typeof e==`bigint`?(hn(e)?e=Number(e):(e=Ln(64,e),e=hn(e)?Number(e):String(e)),e):qn(e)?typeof e==`number`?er(e):rr(e):void 0}(Zr(e,2,void 0,or))!=null&&(t.timestampMs=Pl(Zr(e,2,void 0,or)??Yr)),t}function Ll(e){var t=ni(e,3,Wn),n=ni(e,2,Yn),r=ni(e,1,dr),i=ni(e,9,dr),a={categories:[],keypoints:[]};for(let e=0;e<t.length;e++)a.categories.push({score:t[e],index:n[e]??-1,categoryName:r[e]??``,displayName:i[e]??``});if((t=gi(e,uc,4)?.l())&&(a.boundingBox={originX:wi(t,1,Xr)??0,originY:wi(t,2,Xr)??0,width:wi(t,3,Xr)??0,height:wi(t,4,Xr)??0,angle:0}),gi(e,uc,4)?.h().length)for(let t of gi(e,uc,4).h())a.keypoints.push({x:Zr(t,1,Xr,Wn)??0,y:Zr(t,2,Xr,Wn)??0,score:Zr(t,4,Xr,Wn)??0,label:dr(Zr(t,3,Xr))??``});return a}function Rl(e){var t=[];for(let n of vi(e,mc,1))e={x:Ti(n,1)??0,y:Ti(n,2)??0,z:Ti(n,3)??0,visibility:Ti(n,4)??0},Zr(n,5,void 0,Wn)!=null&&(e.presence=Ti(n,5)??0),t.push(e);return t}function zl(e){var t=[];for(let n of vi(e,fc,1))e={x:Ti(n,1)??0,y:Ti(n,2)??0,z:Ti(n,3)??0,visibility:Ti(n,4)??0},Zr(n,5,void 0,Wn)!=null&&(e.presence=Ti(n,5)??0),t.push(e);return t}function Bl(e){return Array.from(e,e=>e>127?e-256:e)}function Vl(e,t){if(e.length!==t.length)throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${e.length} vs. ${t.length}).`);var n=0,r=0,i=0;for(let a=0;a<e.length;a++)n+=e[a]*t[a],r+=e[a]*e[a],i+=t[a]*t[a];if(r<=0||i<=0)throw Error(`Cannot compute cosine similarity on embedding with 0 norm.`);return n/Math.sqrt(r*i)}Ws[516587230]=[0,Fc,cl,ll,Go],Ws[518928384]=ll;var Hl,Ul=new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11]);async function Wl(e){if(e)return!0;if(Hl===void 0)try{await WebAssembly.instantiate(Ul),Hl=!0}catch{Hl=!1}return Hl}async function Gl(e,t,n){return{wasmLoaderPath:`${t}/${e}_${n=`wasm${n?`_module`:``}${await Wl(n)?``:`_nosimd`}_internal`}.js`,wasmBinaryPath:`${t}/${e}_${n}.wasm`}}var Kl=class{};function ql(e){return I(new Jl,1,Jn(e))}Kl.forVisionTasks=function(e,t=!1){return Gl(`vision`,e??ks``,t)},Kl.forLiteRtLmTextTasks=function(e,t=!1){return Gl(`litertlm_text`,e??ks``,t)},Kl.forTextTasks=function(e,t=!1){return Gl(`text`,e??ks``,t)},Kl.forRetrievalTasks=function(e,t=!1){return Gl(`retrieval`,e??ks``,t)},Kl.forGenAiTasks=function(e,t=!1){return Gl(`genai`,e??ks``,t)},Kl.forDecisionTasks=function(e,t=!1){return Gl(`decision`,e??ks``,t)},Kl.forAudioTasks=function(e,t=!1){return Gl(`audio`,e??ks``,t)},Kl.isSimdSupported=function(e=!1){return Wl(e)};var Jl=class extends z{constructor(e){super(e)}},Yl=class extends z{constructor(e){super(e)}},Xl=[0,U,2,$o,-2,Xo,ss,[0,U,Xo]],Zl=class extends z{constructor(e){super(e)}},Ql=class extends z{constructor(e){super(e)}};function $l(e,t){return I(e,1,Jn(t))}function eu(e,t){return I(e,2,Jn(t))}var tu=class extends z{constructor(e){super(e)}},nu=[3,4,5,6,7],ru=class extends z{constructor(e){super(e)}},iu=class extends z{constructor(e){super(e)}};iu.prototype.h=ys([0,[0,U,V,-3,U],[0,nu,U,-1,H,[0,U,V,$o],H,Xl,H,[0,1,Xl],H,[0,U],H,[0,U,V,$o]]]);var au=class{constructor(){this.h=typeof AbortController<`u`}async send(e,t,n){var r=this.h?new AbortController:void 0,i=r&&e.ma>0?setTimeout(()=>{r.abort()},e.ma):void 0;try{let i=await fetch(e.url,{method:e.cb,headers:{...e.bb},...e.body&&{body:e.body},...e.withCredentials&&{credentials:`include`},signal:e.ma&&r?r.signal:null});i.status===200?t?.(await i.text()):n?.(i.status)}catch(e){e?.name===`AbortError`?n?.(408):n?.(400)}finally{clearTimeout(i)}}},ou=class extends z{constructor(e){super(e,37)}},su=[-4,{},Ts,U,xs],cu=[0,V,U,1,V,-1,U,1,U,1,Xo],lu=[0,U,V,-2],uu=[0,V,U],du=[0,V,U],fu=[0,B,-3],pu=[0,U,V,-1,Xo,es,-1,V,-5,ss,[0,V,-4],-1,B,[0,B,-3],U],mu=class extends z{constructor(e){super(e,19)}},hu=vs([-19,{},[0,U,1,[0,V,-6,Xo,es,V,-1,Xo],1,[0,V,1,V,-5],V,-1,[0,U,V,-8],[0,V,-3],[0,V,U,V,-2],[0,V,-1,U,V,-1,U,V,-1,[0,ss,[0,V,-1],B,V,-5],[0,U,B,es,-2]],Xo,[0,V,-3,Xo,es,V,-1],[0,U,V,-1],[0,V,-9],[0,V,-6,U,V,1,V,B,U,-1,B,V,-2,U,V,U,V,es,-1],1,[0,U],1,[0,V,-4],1,cu,[0,[1,2,3,4,5,6],H,cu,H,uu,H,du,H,[0,U],H,pu,H,lu],uu,du,pu,[0,[0,U,V,-1,Xo,es,-1,V,-4,ss,[0,V,-4],-1,1,fu],[0,U,V,-1,Xo,es,-1,V,-4,fu]],lu,[0,V,[0,es,-3,U],U,-2,[0,es,-1],B],4,[0,V,U,V,-1,Xo,U,V,-1,U,es,-1]],U,ss,[-37,{},Yo,V,ss,[0,V,-1],cs,1,cs,[0,as,-1,ts,Zo,-1],V,[0,es,V,-1],B,es,Xo,V,-1,ms,bs,Yo,cs,U,ts,Xo,-1,[0,U,-1],V,B,V,ns,V,-1,Wo,1,Wo,su,B,[0,U,[0,Go,es,-2],[0,Go]],[0,U,Xo]],Yo,ls,V,-1,Yo,U,-1,[0,B,-1,U,B],[0,Xo,-1,V],[0,Yo,B,Xo],Xo,1,us,1,su]),gu=class{constructor(e){this.i=[],this.o=new au,this.l=e??``,this.h=setInterval(()=>{this.flush()},6e4)}close(){this.h!==void 0&&(clearInterval(this.h),this.h=void 0),this.flush()}flush(e,t){if(this.error)t?.(`net-send-failed`);else if(this.i.length===0)e?.();else{var n=this.i;this.i=[],n=function(e){var t=new mu;return xi(t=I(t,2,Jn(1786)),3,e)}(n),n=hu(n),this.o.send({url:`https://odml.pa.googleapis.com/v1/log`,cb:`POST`,ma:1e4,body:n,ib:2,bb:{"Content-Type":`application/x-protobuf`,"x-goog-api-key":this.l},withCredentials:!1},()=>{e?.()},e=>{this.error=Error(`Logging failed with HTTP error: ${e}`),this.i=[],this.h!==void 0&&(clearInterval(this.h),this.h=void 0),t?.(`net-send-failed`,e)})}}},_u=class{constructor(){this.ba=this.V=this.Y=this.S=this.W=this.U=this.R=0}};function vu(e,t){var n=new iu;n=L(n,0,1,e.C),n=L(n,0,2,t),t=I(t=new ou,6,rn(n=n.h(),!1)),(e=e.m).error||e.i.push(t)}function yu(e,t){var n={R:t.R-e.l.R,U:t.U-e.l.U,W:t.W-e.l.W,S:t.S-e.l.S,Y:t.Y-e.l.Y,V:t.V,ba:t.ba},r=eu($l(new tu,e.D),1);n=bu(e,n),vu(e,r=bi(r,4,nu,n)),e.l=t}function bu(e,t){var n=new Yl;return e=Ai(e=ki(e=I(n,1,Jn(e.F)),7,t.S),5,t.V),e=Ai(e,6,t.ba),t.W>0&&Ai(e,4,t.Y/t.W),t.R!==0&&(n=ki(n=ql(3),2,t.R),Ci(e,8,Jl,n)),t.U!==0&&(t=ki(n=ql(4),2,t.U),Ci(e,8,Jl,t)),e}var xu=class{constructor(e,t,n){this.v=performance.now(),this.o=performance.now(),this.i=new Map,this.u=0,this.h=new _u,this.l=new _u,this.m=new gu(n),this.D=function(e){switch(e){case`AudioClassifier`:return 4;case`AudioEmbedder`:return 5;case`TextClassifier`:return 6;case`TextEmbedder`:return 7;case`GestureRecognizer`:return 8;case`HandDetector`:return 9;case`HandLandmarker`:return 10;case`ImageClassifier`:return 11;case`ImageEmbedder`:return 12;case`ImageSegmenter`:return 13;case`ObjectDetector`:return 14;case`FaceDetector`:return 15;case`FaceLandmarker`:return 16;case`InteractiveSegmenter`:case`InteractiveSegmenterLegacy`:return 18;case`HolisticLandmarker`:return 20;case`LlmInference`:return 21;case`LanguageDetector`:return 22;case`PoseLandmarker`:return 23;case`UniversalEmbedder`:return 28;case`SemanticRetriever`:return 29;case`DecisionMaker`:return 30;case`TextSummarizer`:return 26;case`TextProofreader`:return 27;case`AudioTranscriber`:return 31;default:return 0}}(e),this.F=function(e){switch(e){case`IMAGE`:return 11;case`VIDEO`:return 12;case`LIVE_STREAM`:return 13;case`AUDIO_CLIPS`:return 14;case`AUDIO_STREAM`:return 15;default:return 10}}(t),e=new ru,typeof window>`u`?t=0:(t=navigator.userAgent,t=/Android/i.test(t)?1:/iPhone|iPad|iPod/i.test(t)?2:/Windows/i.test(t)?5:/Macintosh/i.test(t)?4:/Linux/i.test(t)?3:0),e=I(e,1,Jn(t)),e=I(e,2,ur(``)),e=I(e,3,ur(``)),e=I(e,4,ur(`1.1.1`)),e=I(e,5,ur(``)),this.C=I(e,6,Jn(4))}za(){var e=new Ql;e=Ai(e=I(e,1,Jn(this.F)),3,performance.now()-this.v),vu(this,e=bi(eu($l(new tu,this.D),0),3,nu,e)),this.o=performance.now()}Aa(e){var t=this.i.get(e);if(t!==void 0&&(this.i.delete(e),e=performance.now()-t,++this.h.W,this.h.Y+=e,this.h.V=Math.max(this.h.V,e),this.u=Math.max(this.u,e),performance.now()>this.o+3e4)){for(let[n,r]of this.i.entries())e=n,r<t&&(this.h.S++,this.i.delete(e));t={...this.h,ba:performance.now()-this.o},this.h.V=0,this.o=performance.now(),yu(this,t)}}ya(){var e={...this.h,S:this.h.S+this.i.size,V:this.u,ba:performance.now()-this.v};yu(this,e);var t=new Zl;t=L(t,0,2,e=bu(this,e)),vu(this,t=bi(e=eu($l(new tu,this.D),2),5,nu,t))}close(){var e=this.m;typeof e.close==`function`?e.close():e.flush()}};function Su(){var e=navigator;return typeof OffscreenCanvas<`u`&&(!function(e=navigator){return(e=e.userAgent).includes(`Safari`)&&!e.includes(`Chrome`)}(e)||!!((e=e.userAgent.match(/Version\/([\d]+).*Safari/))&&e.length>=1&&Number(e[1])>=17))}async function Cu(e){if(typeof importScripts!=`function`){let t=document.createElement(`script`);return t.src=e.toString(),t.crossOrigin=`anonymous`,new Promise((e,n)=>{t.addEventListener(`load`,()=>{e()},!1),t.addEventListener(`error`,e=>{n(e)},!1),document.body.appendChild(t)})}try{importScripts(e.toString())}catch(t){if(!(t instanceof TypeError))throw t;{let t=self.import;t?await t(e.toString()):await import(e.toString())}}}function wu(e){return e.videoWidth===void 0?e.naturalWidth===void 0?e.displayWidth===void 0?[e.width,e.height]:[e.displayWidth,e.displayHeight]:[e.naturalWidth,e.naturalHeight]:[e.videoWidth,e.videoHeight]}function W(e,t,n){e.o||console.error(`No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target`),n(t=e.j.stringToNewUTF8(t)),e.j._free(t)}function Tu(e,t,n){if(!e.j.canvas)throw Error(`No OpenGL canvas configured.`);if(n?e.j._bindTextureToStream(n):e.j._bindTextureToCanvas(),!(n=e.j.canvas.getContext(`webgl2`)||e.j.canvas.getContext(`webgl`)))throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");e.j.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!0),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,t),e.j.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1);var[r,i]=wu(t);return!e.l||r===e.j.canvas.width&&i===e.j.canvas.height||(e.j.canvas.width=r,e.j.canvas.height=i),[r,i]}function Eu(e,t,n){e.o||console.error(`No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target`);var r=new Uint32Array(t.length);for(let n=0;n<t.length;n++)r[n]=e.j.stringToNewUTF8(t[n]);t=e.j._malloc(4*r.length),e.j.HEAPU32.set(r,t>>2),n(t);for(let t of r)e.j._free(t);e.j._free(t)}function Du(e,t,n){e.j.simpleListeners=e.j.simpleListeners||{},e.j.simpleListeners[t]=n}function Ou(e,t,n){var r=[];e.j.simpleListeners=e.j.simpleListeners||{},e.j.simpleListeners[t]=(e,t,i)=>{t?(n(r,i),r=[]):r.push(e)}}var ku=class{constructor(e,t){this.l=!0,this.j=e,this.h=null,this.i=0,this.o=typeof this.j._addIntToInputStream==`function`,t===void 0?Su()?this.j.canvas=new OffscreenCanvas(1,1):(console.warn(`OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas.`),this.j.canvas=document.createElement(`canvas`)):this.j.canvas=t}async initializeGraph(e){var t=await(await fetch(e)).arrayBuffer();e=!(e.endsWith(`.pbtxt`)||e.endsWith(`.textproto`)),this.setGraph(new Uint8Array(t),e)}setGraphFromString(e){this.setGraph(new TextEncoder().encode(e),!1)}setGraph(e,t){var n=e.length,r=this.j._malloc(n);this.j.HEAPU8.set(e,r),t?this.j._changeBinaryGraph(n,r):this.j._changeTextGraph(n,r),this.j._free(r)}configureAudio(e,t,n,r,i){this.j._configureAudio||console.warn(`Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?`),W(this,r||`input_audio`,r=>{W(this,i||=`audio_header`,i=>{this.j._configureAudio(r,i,e,t??0,n)})})}setAutoResizeCanvas(e){this.l=e}setAutoRenderToScreen(e){this.j._setAutoRenderToScreen(e)}setGpuBufferVerticalFlip(e){this.j.gpuOriginForWebTexturesIsBottomLeft=e}ka(e){Du(this,`__graph_config__`,t=>{e(t)}),W(this,`__graph_config__`,e=>{this.j._getGraphConfig(e,void 0)}),delete this.j.simpleListeners.__graph_config__}attachErrorListener(e){this.j.errorListener=e}attachEmptyPacketListener(e,t){this.j.emptyPacketListeners=this.j.emptyPacketListeners||{},this.j.emptyPacketListeners[e]=t}addAudioToStream(e,t,n){this.addAudioToStreamWithShape(e,0,0,t,n)}addAudioToStreamWithShape(e,t,n,r,i){var a=4*e.length;this.i!==a&&(this.h&&this.j._free(this.h),this.h=this.j._malloc(a),this.i=a),this.j.HEAPF32.set(e,this.h/4),W(this,r,e=>{this.j._addAudioToInputStream(this.h,t,n,e,i)})}addGpuBufferToStream(e,t,n){W(this,t,t=>{var[r,i]=Tu(this,e,t);this.j._addBoundTextureToStream(t,r,i,n)})}addBoolToStream(e,t,n){W(this,t,t=>{this.j._addBoolToInputStream(e,t,n)})}addDoubleToStream(e,t,n){W(this,t,t=>{this.j._addDoubleToInputStream(e,t,n)})}addFloatToStream(e,t,n){W(this,t,t=>{this.j._addFloatToInputStream(e,t,n)})}addIntToStream(e,t,n){W(this,t,t=>{this.j._addIntToInputStream(e,t,n)})}addUintToStream(e,t,n){W(this,t,t=>{this.j._addUintToInputStream(e,t,n)})}addStringToStream(e,t,n){W(this,t,t=>{W(this,e,e=>{this.j._addStringToInputStream(e,t,n)})})}addStringRecordToStream(e,t,n){W(this,t,t=>{Eu(this,Object.keys(e),r=>{Eu(this,Object.values(e),i=>{this.j._addFlatHashMapToInputStream(r,i,Object.keys(e).length,t,n)})})})}addProtoToStream(e,t,n,r){W(this,n,n=>{W(this,t,t=>{var i=this.j._malloc(e.length);this.j.HEAPU8.set(e,i),this.j._addProtoToInputStream(i,e.length,t,n,r),this.j._free(i)})})}addEmptyPacketToStream(e,t){W(this,e,e=>{this.j._addEmptyPacketToInputStream(e,t)})}addBoolVectorToStream(e,t,n){W(this,t,t=>{var r=this.j._allocateBoolVector(e.length);if(!r)throw Error(`Unable to allocate new bool vector on heap.`);for(let t of e)this.j._addBoolVectorEntry(r,t);this.j._addBoolVectorToInputStream(r,t,n)})}addDoubleVectorToStream(e,t,n){W(this,t,t=>{var r=this.j._allocateDoubleVector(e.length);if(!r)throw Error(`Unable to allocate new double vector on heap.`);for(let t of e)this.j._addDoubleVectorEntry(r,t);this.j._addDoubleVectorToInputStream(r,t,n)})}addFloatVectorToStream(e,t,n){W(this,t,t=>{var r=this.j._allocateFloatVector(e.length);if(!r)throw Error(`Unable to allocate new float vector on heap.`);for(let t of e)this.j._addFloatVectorEntry(r,t);this.j._addFloatVectorToInputStream(r,t,n)})}addIntVectorToStream(e,t,n){W(this,t,t=>{var r=this.j._allocateIntVector(e.length);if(!r)throw Error(`Unable to allocate new int vector on heap.`);for(let t of e)this.j._addIntVectorEntry(r,t);this.j._addIntVectorToInputStream(r,t,n)})}addUintVectorToStream(e,t,n){W(this,t,t=>{var r=this.j._allocateUintVector(e.length);if(!r)throw Error(`Unable to allocate new unsigned int vector on heap.`);for(let t of e)this.j._addUintVectorEntry(r,t);this.j._addUintVectorToInputStream(r,t,n)})}addStringVectorToStream(e,t,n){W(this,t,t=>{var r=this.j._allocateStringVector(e.length);if(!r)throw Error(`Unable to allocate new string vector on heap.`);for(let t of e)W(this,t,e=>{this.j._addStringVectorEntry(r,e)});this.j._addStringVectorToInputStream(r,t,n)})}addBoolToInputSidePacket(e,t){W(this,t,t=>{this.j._addBoolToInputSidePacket(e,t)})}addDoubleToInputSidePacket(e,t){W(this,t,t=>{this.j._addDoubleToInputSidePacket(e,t)})}addFloatToInputSidePacket(e,t){W(this,t,t=>{this.j._addFloatToInputSidePacket(e,t)})}addIntToInputSidePacket(e,t){W(this,t,t=>{this.j._addIntToInputSidePacket(e,t)})}addUintToInputSidePacket(e,t){W(this,t,t=>{this.j._addUintToInputSidePacket(e,t)})}addStringToInputSidePacket(e,t){W(this,t,t=>{W(this,e,e=>{this.j._addStringToInputSidePacket(e,t)})})}addProtoToInputSidePacket(e,t,n){W(this,n,n=>{W(this,t,t=>{var r=this.j._malloc(e.length);this.j.HEAPU8.set(e,r),this.j._addProtoToInputSidePacket(r,e.length,t,n),this.j._free(r)})})}addBoolVectorToInputSidePacket(e,t){W(this,t,t=>{var n=this.j._allocateBoolVector(e.length);if(!n)throw Error(`Unable to allocate new bool vector on heap.`);for(let t of e)this.j._addBoolVectorEntry(n,t);this.j._addBoolVectorToInputSidePacket(n,t)})}addDoubleVectorToInputSidePacket(e,t){W(this,t,t=>{var n=this.j._allocateDoubleVector(e.length);if(!n)throw Error(`Unable to allocate new double vector on heap.`);for(let t of e)this.j._addDoubleVectorEntry(n,t);this.j._addDoubleVectorToInputSidePacket(n,t)})}addFloatVectorToInputSidePacket(e,t){W(this,t,t=>{var n=this.j._allocateFloatVector(e.length);if(!n)throw Error(`Unable to allocate new float vector on heap.`);for(let t of e)this.j._addFloatVectorEntry(n,t);this.j._addFloatVectorToInputSidePacket(n,t)})}addIntVectorToInputSidePacket(e,t){W(this,t,t=>{var n=this.j._allocateIntVector(e.length);if(!n)throw Error(`Unable to allocate new int vector on heap.`);for(let t of e)this.j._addIntVectorEntry(n,t);this.j._addIntVectorToInputSidePacket(n,t)})}addUintVectorToInputSidePacket(e,t){W(this,t,t=>{var n=this.j._allocateUintVector(e.length);if(!n)throw Error(`Unable to allocate new unsigned int vector on heap.`);for(let t of e)this.j._addUintVectorEntry(n,t);this.j._addUintVectorToInputSidePacket(n,t)})}addStringVectorToInputSidePacket(e,t){W(this,t,t=>{var n=this.j._allocateStringVector(e.length);if(!n)throw Error(`Unable to allocate new string vector on heap.`);for(let t of e)W(this,t,e=>{this.j._addStringVectorEntry(n,e)});this.j._addStringVectorToInputSidePacket(n,t)})}attachBoolListener(e,t){Du(this,e,t),W(this,e,e=>{this.j._attachBoolListener(e)})}attachBoolVectorListener(e,t){Ou(this,e,t),W(this,e,e=>{this.j._attachBoolVectorListener(e)})}attachIntListener(e,t){Du(this,e,t),W(this,e,e=>{this.j._attachIntListener(e)})}attachIntVectorListener(e,t){Ou(this,e,t),W(this,e,e=>{this.j._attachIntVectorListener(e)})}attachUintListener(e,t){Du(this,e,t),W(this,e,e=>{this.j._attachUintListener(e)})}attachUintVectorListener(e,t){Ou(this,e,t),W(this,e,e=>{this.j._attachUintVectorListener(e)})}attachDoubleListener(e,t){Du(this,e,t),W(this,e,e=>{this.j._attachDoubleListener(e)})}attachDoubleVectorListener(e,t){Ou(this,e,t),W(this,e,e=>{this.j._attachDoubleVectorListener(e)})}attachFloatListener(e,t){Du(this,e,t),W(this,e,e=>{this.j._attachFloatListener(e)})}attachFloatVectorListener(e,t){Ou(this,e,t),W(this,e,e=>{this.j._attachFloatVectorListener(e)})}attachStringListener(e,t){Du(this,e,t),W(this,e,e=>{this.j._attachStringListener(e)})}attachStringVectorListener(e,t){Ou(this,e,t),W(this,e,e=>{this.j._attachStringVectorListener(e)})}attachProtoListener(e,t,n){Du(this,e,t),W(this,e,e=>{this.j._attachProtoListener(e,n||!1)})}attachProtoVectorListener(e,t,n){Ou(this,e,t),W(this,e,e=>{this.j._attachProtoVectorListener(e,n||!1)})}attachAudioListener(e,t,n){this.j._attachAudioListener||console.warn(`Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?`),Du(this,e,(e,n)=>{e=new Float32Array(e.buffer,e.byteOffset,e.length/4),t(e,n)}),W(this,e,e=>{this.j._attachAudioListener(e,n||!1)})}finishProcessing(){this.j._waitUntilIdle()}closeGraph(){this.j._closeGraph(),this.j.simpleListeners=void 0,this.j.emptyPacketListeners=void 0}};function Au(e){return class extends e{get qa(){return this.j}Ta(){if(typeof this.qa._mediapipeLoggerGetEncodedApiKey==`function`){let e=this.qa._mediapipeLoggerGetEncodedApiKey();return this.qa._decodeBase64(e)}}}}function ju(e){return class extends e{ab(){this.j._registerModelResourcesGraphService()}}}var Mu=Au(ju(ku)),Nu=class extends Mu{};async function Pu(e,t,n,r){return e=await(async(e,t,n,r,i)=>{if(t&&await Cu(t),!self.ModuleFactory||n&&(await Cu(n),!self.ModuleFactory))throw Error(`ModuleFactory not set.`);return self.Module&&i&&((t=self.Module).locateFile=i.locateFile,i.mainScriptUrlOrBlob&&(t.mainScriptUrlOrBlob=i.mainScriptUrlOrBlob)),i=await self.ModuleFactory(self.Module||i),self.ModuleFactory=self.Module=void 0,new e(i,r)})(e,n.wasmLoaderPath,n.assetLoaderPath,t,{locateFile:e=>e.endsWith(`.wasm`)?n.wasmBinaryPath.toString():n.assetBinaryPath&&e.endsWith(`.data`)?n.assetBinaryPath.toString():e}),function(e,t){t=t.runningMode??``;var n=e.h.Ta();e.o=new xu(e.D(),t,n)}(e,r),await e.A(r),e}async function Fu(e,t,n,r){return Pu(e,t,n,r)}function Iu(e,t,n){try{e.h.j.FS_unlink(`/${n}`)}catch{}e.h.j.FS_createDataFile(`/`,n,t,!0,!1,!1),Lu(e,`/${n}`)}function Lu(e,t){var n=gi(e.baseOptions,Mc,1)||new Mc;typeof t==`string`?(I(n,2,ur(t)),I(n,1)):t instanceof Uint8Array&&(I(n,1,rn(t,!1)),I(n,2)),L(e.baseOptions,0,1,n)}function Ru(e){try{let t=e.L.length;if(t===1)throw Error(e.L[0].message);if(t>1)throw Error(`Encountered multiple errors: `+e.L.map(e=>e.message).join(`, `))}finally{e.L=[]}}function G(e,t){e.J=Math.max(e.J,t)}function zu(e,t){e.F=new Js,Mi(e.F,2,`PassThroughCalculator`),Ks(e.F,`free_memory`),qs(e.F,`free_memory_unused_out`),$s(t,`free_memory`),Qs(t,e.F)}function Bu(e,t){Ks(e.F,t),qs(e.F,t+`_unused_out`)}function Vu(e){e.h.addBoolToStream(!0,`free_memory`,e.J)}var Hu=class{constructor(e){this.h=e,this.L=[],this.J=0,this.h.setAutoRenderToScreen(!1)}l(e,t=!0,n=!1,r=!1){if(t){let t=e.baseOptions||{};if(e.baseOptions?.modelAssetBuffer&&e.baseOptions?.modelAssetPath)throw Error(`Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer`);if(!(gi(this.baseOptions,Mc,1)?.h()||gi(this.baseOptions,Mc,1)?.l()||e.baseOptions?.modelAssetBuffer||e.baseOptions?.modelAssetPath))throw Error(`Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set`);(function(e,t,n=!1){var r=gi(e.baseOptions,Ac,3);if(!r){var i=r=new Ac,a=new zs;bi(i,4,jc,a)}`delegate`in t&&(t.delegate===`GPU`?(t=r,i=new Ms,bi(t,2,jc,i)):(t=r,i=new zs,bi(t,4,jc,i))),n&&(n=r.l(),t=r.h()||!0===n?.h(),n=new Is,t?L(n,0,9,t=new Fs):L(n,0,8,t=new Ps),bi(r,6,jc,n)),L(e.baseOptions,0,3,r)})(this,t,r);let i=n?`model.litertlm`:`model.dat`;if(t.modelAssetPath)return fetch(t.modelAssetPath.toString()).then(e=>{if(e.ok)return e.arrayBuffer();throw Error(`Failed to fetch model: ${t.modelAssetPath} (${e.status})`)}).then(e=>{Iu(this,new Uint8Array(e),i),this.u(),this.M()});if(t.modelAssetBuffer instanceof Uint8Array)n?Iu(this,t.modelAssetBuffer,i):Lu(this,t.modelAssetBuffer);else if(t.modelAssetBuffer)return async function(e){for(var t=[],n=0;;){let{done:r,value:i}=await e.read();if(r)break;t.push(i),n+=i.length}if(t.length===0)return new Uint8Array;if(t.length===1)return t[0];e=new Uint8Array(n),n=0;for(let r of t)e.set(r,n),n+=r.length;return e}(t.modelAssetBuffer).then(e=>{n?Iu(this,e,i):Lu(this,e),this.u(),this.M()})}return this.u(),this.M(),Promise.resolve()}M(){}ka(){var e;if(this.h.ka(t=>{e=rc(t)}),!e)throw Error(`Failed to retrieve CalculatorGraphConfig`);return e}setGraph(e,t){this.h.attachErrorListener((e,t)=>{this.L.push(Error(t))}),this.h.ab(),this.h.setGraph(e,t),this.o?.za(),this.F=void 0,Ru(this)}finishProcessing(e){this.h.finishProcessing(),Ru(this),this.o&&e!==void 0&&this.o.Aa(e)}close(){this.F=void 0,this.o?.ya(),this.o?.close(),this.h.closeGraph()}};function Uu(e,t){if(!e)throw Error(`Unable to obtain required WebGL resource: ${t}`);return e}Hu.prototype.close=Hu.prototype.close;var Wu=class{constructor(e,t,n,r){this.h=e,this.i=t,this.o=n,this.l=r}bind(){this.h.bindVertexArray(this.i)}close(){this.h.deleteVertexArray(this.i),this.h.deleteBuffer(this.o),this.h.deleteBuffer(this.l)}};function Gu(e,t,n){var r=e.h;if(n=Uu(r.createShader(n),`Failed to create WebGL shader`),r.shaderSource(n,t),r.compileShader(n),!r.getShaderParameter(n,r.COMPILE_STATUS))throw Error(`Could not compile WebGL shader: ${r.getShaderInfoLog(n)}`);return r.attachShader(e.i,n),n}function Ku(e,t){var n=e.h,r=Uu(n.createVertexArray(),`Failed to create vertex array`);n.bindVertexArray(r);var i=Uu(n.createBuffer(),`Failed to create buffer`);n.bindBuffer(n.ARRAY_BUFFER,i),n.enableVertexAttribArray(e.G),n.vertexAttribPointer(e.G,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),n.STATIC_DRAW);var a=Uu(n.createBuffer(),`Failed to create buffer`);return n.bindBuffer(n.ARRAY_BUFFER,a),n.enableVertexAttribArray(e.L),n.vertexAttribPointer(e.L,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array(t?[0,1,0,0,1,0,1,1]:[0,0,0,1,1,1,1,0]),n.STATIC_DRAW),n.bindBuffer(n.ARRAY_BUFFER,null),n.bindVertexArray(null),new Wu(n,r,i,a)}function qu(e,t){if(e.h){if(t!==e.h)throw Error(`Cannot change GL context once initialized`)}else e.h=t}function Ju(e,t,n,r){return qu(e,t),e.i||(e.o(),e.J()),n?(e.m||(e.m=Ku(e,!0)),n=e.m):(e.F||(e.F=Ku(e,!1)),n=e.F),t.useProgram(e.i),n.bind(),e.l(),e=r(),n.h.bindVertexArray(null),e}function Yu(e,t,n){return qu(e,t),e=Uu(t.createTexture(),`Failed to create texture`),t.bindTexture(t.TEXTURE_2D,e),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,n??t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,n??t.LINEAR),t.bindTexture(t.TEXTURE_2D,null),e}function Xu(e,t,n){qu(e,t),e.D||=Uu(t.createFramebuffer(),`Failed to create framebuffe.`),t.bindFramebuffer(t.FRAMEBUFFER,e.D),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,n,0)}function Zu(e){e.h?.bindFramebuffer(e.h.FRAMEBUFFER,null)}var Qu=class{C(){return`
  precision mediump float;
  varying vec2 vTex;
  uniform sampler2D inputTexture;
  void main() {
    gl_FragColor = texture2D(inputTexture, vTex);
  }
 `}o(){var e=this.h;if(this.i=Uu(e.createProgram(),`Failed to create WebGL program`),this.ea=Gu(this,`
  attribute vec2 aVertex;
  attribute vec2 aTex;
  varying vec2 vTex;
  void main(void) {
    gl_Position = vec4(aVertex, 0.0, 1.0);
    vTex = aTex;
  }`,e.VERTEX_SHADER),this.aa=Gu(this,this.C(),e.FRAGMENT_SHADER),e.linkProgram(this.i),!e.getProgramParameter(this.i,e.LINK_STATUS))throw Error(`Error during program linking: ${e.getProgramInfoLog(this.i)}`);this.G=e.getAttribLocation(this.i,`aVertex`),this.L=e.getAttribLocation(this.i,`aTex`)}J(){}l(){}close(){if(this.i){let e=this.h;e.deleteProgram(this.i),e.deleteShader(this.ea),e.deleteShader(this.aa)}this.D&&this.h.deleteFramebuffer(this.D),this.F&&this.F.close(),this.m&&this.m.close()}},$u=class extends Qu{C(){return`
  precision mediump float;
  uniform sampler2D backgroundTexture;
  uniform sampler2D maskTexture;
  uniform sampler2D colorMappingTexture;
  varying vec2 vTex;
  void main() {
    vec4 backgroundColor = texture2D(backgroundTexture, vTex);
    float category = texture2D(maskTexture, vTex).r;
    vec4 categoryColor = texture2D(colorMappingTexture, vec2(category, 0.0));
    gl_FragColor = mix(backgroundColor, categoryColor, categoryColor.a);
  }
 `}J(){var e=this.h;e.activeTexture(e.TEXTURE1),this.v=Yu(this,e,e.LINEAR),e.activeTexture(e.TEXTURE2),this.u=Yu(this,e,e.NEAREST)}o(){super.o();var e=this.h;this.P=Uu(e.getUniformLocation(this.i,`backgroundTexture`),`Uniform location`),this.Z=Uu(e.getUniformLocation(this.i,`colorMappingTexture`),`Uniform location`),this.M=Uu(e.getUniformLocation(this.i,`maskTexture`),`Uniform location`)}l(){super.l();var e=this.h;e.uniform1i(this.M,0),e.uniform1i(this.P,1),e.uniform1i(this.Z,2)}close(){this.v&&this.h.deleteTexture(this.v),this.u&&this.h.deleteTexture(this.u),super.close()}},ed=class extends Qu{C(){return`
  precision mediump float;
  uniform sampler2D maskTexture;
  uniform sampler2D defaultTexture;
  uniform sampler2D overlayTexture;
  varying vec2 vTex;
  void main() {
    float confidence = texture2D(maskTexture, vTex).r;
    vec4 defaultColor = texture2D(defaultTexture, vTex);
    vec4 overlayColor = texture2D(overlayTexture, vTex);
    // Apply the alpha from the overlay and merge in the default color
    overlayColor = mix(defaultColor, overlayColor, overlayColor.a);
    gl_FragColor = mix(defaultColor, overlayColor, confidence);
  }
 `}J(){var e=this.h;e.activeTexture(e.TEXTURE1),this.u=Yu(this,e),e.activeTexture(e.TEXTURE2),this.v=Yu(this,e)}o(){super.o();var e=this.h;this.M=Uu(e.getUniformLocation(this.i,`defaultTexture`),`Uniform location`),this.P=Uu(e.getUniformLocation(this.i,`overlayTexture`),`Uniform location`),this.K=Uu(e.getUniformLocation(this.i,`maskTexture`),`Uniform location`)}l(){super.l();var e=this.h;e.uniform1i(this.K,0),e.uniform1i(this.M,1),e.uniform1i(this.P,2)}close(){this.u&&this.h.deleteTexture(this.u),this.v&&this.h.deleteTexture(this.v),super.close()}};function td(e,t){switch(t){case 0:return e.h.find(e=>e instanceof Uint8Array);case 1:return e.h.find(e=>e instanceof Float32Array);case 2:return e.h.find(e=>typeof WebGLTexture<`u`&&e instanceof WebGLTexture);default:throw Error(`Type is not supported: ${t}`)}}function nd(e){var t=td(e,1);if(!t){if(t=td(e,0))t=new Float32Array(t).map(e=>e/255);else{t=new Float32Array(e.width*e.height);let r=id(e);var n=od(e);if(Xu(n,r,rd(e)),`iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod`.split(`;`).includes(navigator.platform)||navigator.userAgent.includes(`Mac`)&&`document`in self&&`ontouchend`in self.document){n=new Float32Array(e.width*e.height*4),r.readPixels(0,0,e.width,e.height,r.RGBA,r.FLOAT,n);for(let e=0,r=0;e<t.length;++e,r+=4)t[e]=n[r]}else r.readPixels(0,0,e.width,e.height,r.RED,r.FLOAT,t)}e.h.push(t)}return t}function rd(e){var t=td(e,2);if(!t){let n=id(e);t=sd(e);let r=nd(e),i=ad(e);n.texImage2D(n.TEXTURE_2D,0,i,e.width,e.height,0,n.RED,n.FLOAT,r),cd(e)}return t}function id(e){if(!e.canvas)throw Error(`Conversion to different image formats require that a canvas is passed when initializing the image.`);return e.i||=Uu(e.canvas.getContext(`webgl2`),`You cannot use a canvas that is already bound to a different type of rendering context.`),e.i}function ad(e){if(e=id(e),!ld){if(e.getExtension(`EXT_color_buffer_float`)&&e.getExtension(`OES_texture_float_linear`)&&e.getExtension(`EXT_float_blend`))ld=e.R32F;else{if(!e.getExtension(`EXT_color_buffer_half_float`))throw Error(`GPU does not fully support 4-channel float32 or float16 formats`);ld=e.R16F}}return ld}function od(e){return e.l||=new Qu,e.l}function sd(e){var t=id(e);t.viewport(0,0,e.width,e.height),t.activeTexture(t.TEXTURE0);var n=td(e,2);return n||(n=Yu(od(e),t,e.o?t.LINEAR:t.NEAREST),e.h.push(n),e.u=!0),t.bindTexture(t.TEXTURE_2D,n),n}function cd(e){e.i.bindTexture(e.i.TEXTURE_2D,null)}var ld,ud=class{constructor(e,t,n,r,i,a,o){this.h=e,this.o=t,this.u=n,this.canvas=r,this.l=i,this.width=a,this.height=o,this.u&&--dd===0&&console.error(`You seem to be creating MPMask instances without invoking .close(). This leaks resources.`)}Va(){return!!td(this,0)}va(){return!!td(this,1)}X(){return!!td(this,2)}ua(){return(t=td(e=this,0))||(t=nd(e),t=new Uint8Array(t.map(e=>Math.round(255*e))),e.h.push(t)),t;var e,t}ta(){return nd(this)}T(){return rd(this)}clone(){var e=[];for(let t of this.h){let n;if(t instanceof Uint8Array)n=new Uint8Array(t);else if(t instanceof Float32Array)n=new Float32Array(t);else{if(!(t instanceof WebGLTexture))throw Error(`Type is not supported: ${t}`);{let e=id(this),t=od(this);e.activeTexture(e.TEXTURE1),n=Yu(t,e,this.o?e.LINEAR:e.NEAREST),e.bindTexture(e.TEXTURE_2D,n);let r=ad(this);e.texImage2D(e.TEXTURE_2D,0,r,this.width,this.height,0,e.RED,e.FLOAT,null),e.bindTexture(e.TEXTURE_2D,null),Xu(t,e,n),Ju(t,e,!1,()=>{sd(this),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLE_FAN,0,4),cd(this)}),Zu(t),cd(this)}}e.push(n)}return new ud(e,this.o,this.X(),this.canvas,this.l,this.width,this.height)}close(){this.u&&id(this).deleteTexture(td(this,2)),dd=-1}};ud.prototype.close=ud.prototype.close,ud.prototype.clone=ud.prototype.clone,ud.prototype.getAsWebGLTexture=ud.prototype.T,ud.prototype.getAsFloat32Array=ud.prototype.ta,ud.prototype.getAsUint8Array=ud.prototype.ua,ud.prototype.hasWebGLTexture=ud.prototype.X,ud.prototype.hasFloat32Array=ud.prototype.va,ud.prototype.hasUint8Array=ud.prototype.Va;var dd=250,fd={color:`white`,lineWidth:4,radius:6};function pd(e){return{...fd,fillColor:(e||={}).color,...e}}function md(e,t){return e instanceof Function?e(t):e}function hd(e,t,n){return Math.max(Math.min(t,n),Math.min(Math.max(t,n),e))}function gd(e){if(!e.l)throw Error(`CPU rendering requested but CanvasRenderingContext2D not provided.`);return e.l}function _d(e){if(!e.u)throw Error(`GPU rendering requested but WebGL2RenderingContext not provided.`);return e.u}function vd(e,t,n){if(t.X())n(t.T());else{let r=t.va()?t.ta():t.ua();e.o=e.o??new Qu;let i=_d(e);n((e=new ud([r],t.o,!1,i.canvas,e.o,t.width,t.height)).T()),e.close()}}function yd(e,t,n,r){var i=function(e){return e.h||=new $u,e.h}(e),a=_d(e),o=Array.isArray(n)?new ImageData(new Uint8ClampedArray(n),1,1):n;Ju(i,a,!0,()=>{(function(e,t,n,r){var i=e.h;if(i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D,t),i.activeTexture(i.TEXTURE1),i.bindTexture(i.TEXTURE_2D,e.v),i.texImage2D(i.TEXTURE_2D,0,i.RGBA,i.RGBA,i.UNSIGNED_BYTE,n),e.K&&function(e,t){if(e!==t)return!1;e=e.entries(),t=t.entries();for(let[n,r]of e){e=n;let i=r,a=t.next();if(a.done)return!1;let[o,s]=a.value;if(e!==o||i[0]!==s[0]||i[1]!==s[1]||i[2]!==s[2]||i[3]!==s[3])return!1}return!!t.next().done}(e.K,r))i.activeTexture(i.TEXTURE2),i.bindTexture(i.TEXTURE_2D,e.u);else{e.K=r;let t=Array(1024).fill(0);r.forEach((e,n)=>{if(e.length!==4)throw Error(`Color at index ${n} is not a four-channel value.`);t[4*n]=e[0],t[4*n+1]=e[1],t[4*n+2]=e[2],t[4*n+3]=e[3]}),i.activeTexture(i.TEXTURE2),i.bindTexture(i.TEXTURE_2D,e.u),i.texImage2D(i.TEXTURE_2D,0,i.RGBA,256,1,0,i.RGBA,i.UNSIGNED_BYTE,new Uint8Array(t))}})(i,t,o,r),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT),a.drawArrays(a.TRIANGLE_FAN,0,4);var e=i.h;e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,null)})}function bd(e,t,n,r){var i=_d(e),a=function(e){return e.i||=new ed,e.i}(e),o=Array.isArray(n)?new ImageData(new Uint8ClampedArray(n),1,1):n,s=Array.isArray(r)?new ImageData(new Uint8ClampedArray(r),1,1):r;Ju(a,i,!0,()=>{var e=a.h;e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,t),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,a.u),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,o),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,a.v),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,s),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),i.drawArrays(i.TRIANGLE_FAN,0,4),i.bindTexture(i.TEXTURE_2D,null),(e=a.h).activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,null)})}var xd=class{constructor(e,t){typeof CanvasRenderingContext2D<`u`&&e instanceof CanvasRenderingContext2D||e instanceof OffscreenCanvasRenderingContext2D?(this.l=e,this.u=t):this.u=e}Na(e,t){if(e){var n=gd(this);t=pd(t),n.save();var r=n.canvas,i=0;for(let a of e)n.fillStyle=md(t.fillColor,{index:i,from:a}),n.strokeStyle=md(t.color,{index:i,from:a}),n.lineWidth=md(t.lineWidth,{index:i,from:a}),(e=new Path2D).arc(a.x*r.width,a.y*r.height,md(t.radius,{index:i,from:a}),0,2*Math.PI),n.fill(e),n.stroke(e),++i;n.restore()}}Ma(e,t,n){if(e&&t){var r=gd(this);n=pd(n),r.save();var i=r.canvas,a=0;for(let o of t){r.beginPath(),t=e[o.start];let s=e[o.end];t&&s&&(r.strokeStyle=md(n.color,{index:a,from:t,to:s}),r.lineWidth=md(n.lineWidth,{index:a,from:t,to:s}),r.moveTo(t.x*i.width,t.y*i.height),r.lineTo(s.x*i.width,s.y*i.height)),++a,r.stroke()}r.restore()}}Ja(e,t){var n=gd(this);t=pd(t),n.save(),n.beginPath(),n.lineWidth=md(t.lineWidth,{}),n.strokeStyle=md(t.color,{}),n.fillStyle=md(t.fillColor,{}),n.moveTo(e.originX,e.originY),n.lineTo(e.originX+e.width,e.originY),n.lineTo(e.originX+e.width,e.originY+e.height),n.lineTo(e.originX,e.originY+e.height),n.lineTo(e.originX,e.originY),n.stroke(),n.fill(),n.restore()}Ka(e,t,n=[0,0,0,255]){this.l?function(e,t,n,r){var i=_d(e);vd(e,t,t=>{yd(e,t,n,r),(t=gd(e)).drawImage(i.canvas,0,0,t.canvas.width,t.canvas.height)})}(this,e,n,t):yd(this,e.T(),n,t)}La(e,t,n){this.l?function(e,t,n,r){var i=_d(e);vd(e,t,t=>{bd(e,t,n,r),(t=gd(e)).drawImage(i.canvas,0,0,t.canvas.width,t.canvas.height)})}(this,e,t,n):bd(this,e.T(),t,n)}close(){this.h?.close(),this.h=void 0,this.i?.close(),this.i=void 0,this.o?.close(),this.o=void 0}};function Sd(e,t){switch(t){case 0:return e.h.find(e=>e instanceof ImageData);case 1:return e.h.find(e=>typeof ImageBitmap<`u`&&e instanceof ImageBitmap);case 2:return e.h.find(e=>typeof WebGLTexture<`u`&&e instanceof WebGLTexture);default:throw Error(`Type is not supported: ${t}`)}}function Cd(e){var t=Sd(e,0);if(!t){t=Td(e);let n=Ed(e),r=new Uint8Array(e.width*e.height*4);Xu(n,t,wd(e)),t.readPixels(0,0,e.width,e.height,t.RGBA,t.UNSIGNED_BYTE,r),Zu(n),t=new ImageData(new Uint8ClampedArray(r.buffer),e.width,e.height),e.h.push(t)}return t}function wd(e){var t=Sd(e,2);if(!t){let n=Td(e);t=Dd(e);let r=Sd(e,1)||Cd(e);n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,r),Od(e)}return t}function Td(e){if(!e.canvas)throw Error(`Conversion to different image formats require that a canvas is passed when initializing the image.`);return e.i||=Uu(e.canvas.getContext(`webgl2`),`You cannot use a canvas that is already bound to a different type of rendering context.`),e.i}function Ed(e){return e.l||=new Qu,e.l}function Dd(e){var t=Td(e);t.viewport(0,0,e.width,e.height),t.activeTexture(t.TEXTURE0);var n=Sd(e,2);return n||(n=Yu(Ed(e),t),e.h.push(n),e.o=!0),t.bindTexture(t.TEXTURE_2D,n),n}function Od(e){e.i.bindTexture(e.i.TEXTURE_2D,null)}function kd(e){var t=Td(e);return Ju(Ed(e),t,!0,()=>function(e,t){var n=e.canvas;if(n.width===e.width&&n.height===e.height)return t();var r=n.width,i=n.height;return n.width=e.width,n.height=e.height,e=t(),n.width=r,n.height=i,e}(e,()=>{if(t.bindFramebuffer(t.FRAMEBUFFER,null),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.drawArrays(t.TRIANGLE_FAN,0,4),!(e.canvas instanceof OffscreenCanvas))throw Error(`Conversion to ImageBitmap requires that the MediaPipe Tasks is initialized with an OffscreenCanvas`);return e.canvas.transferToImageBitmap()}))}xd.prototype.close=xd.prototype.close,xd.prototype.drawConfidenceMask=xd.prototype.La,xd.prototype.drawCategoryMask=xd.prototype.Ka,xd.prototype.drawBoundingBox=xd.prototype.Ja,xd.prototype.drawConnectors=xd.prototype.Ma,xd.prototype.drawLandmarks=xd.prototype.Na,xd.lerp=function(e,t,n,r,i){return hd(r*(1-(e-t)/(n-t))+i*(1-(n-e)/(n-t)),r,i)},xd.clamp=hd;var Ad=class{constructor(e,t,n,r,i,a,o){this.h=e,this.u=t,this.o=n,this.canvas=r,this.l=i,this.width=a,this.height=o,(this.u||this.o)&&--jd===0&&console.error(`You seem to be creating MPImage instances without invoking .close(). This leaks resources.`)}Ua(){return!!Sd(this,0)}wa(){return!!Sd(this,1)}X(){return!!Sd(this,2)}Ra(){return Cd(this)}Qa(){var e=Sd(this,1);return e||(wd(this),Dd(this),e=kd(this),Od(this),this.h.push(e),this.u=!0),e}T(){return wd(this)}clone(){var e=[];for(let t of this.h){let n;if(t instanceof ImageData)n=new ImageData(t.data,this.width,this.height);else if(t instanceof WebGLTexture){let e=Td(this),t=Ed(this);e.activeTexture(e.TEXTURE1),n=Yu(t,e),e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,this.width,this.height,0,e.RGBA,e.UNSIGNED_BYTE,null),e.bindTexture(e.TEXTURE_2D,null),Xu(t,e,n),Ju(t,e,!1,()=>{Dd(this),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLE_FAN,0,4),Od(this)}),Zu(t),Od(this)}else{if(!(t instanceof ImageBitmap))throw Error(`Type is not supported: ${t}`);wd(this),Dd(this),n=kd(this),Od(this)}e.push(n)}return new Ad(e,this.wa(),this.X(),this.canvas,this.l,this.width,this.height)}close(){this.u&&Sd(this,1).close(),this.o&&Td(this).deleteTexture(Sd(this,2)),jd=-1}};Ad.prototype.close=Ad.prototype.close,Ad.prototype.clone=Ad.prototype.clone,Ad.prototype.getAsWebGLTexture=Ad.prototype.T,Ad.prototype.getAsImageBitmap=Ad.prototype.Qa,Ad.prototype.getAsImageData=Ad.prototype.Ra,Ad.prototype.hasWebGLTexture=Ad.prototype.X,Ad.prototype.hasImageBitmap=Ad.prototype.wa,Ad.prototype.hasImageData=Ad.prototype.Ua;var jd=250;function Md(...e){return e.map(([e,t])=>({start:e,end:t}))}var Nd,Pd=ju((Nd=Au(ku),class extends Nd{get pa(){return this.j}Ea(e,t,n){W(this,t,t=>{var[r,i]=Tu(this,e,t);this.pa._addBoundTextureAsImageToStream(t,r,i,n)})}ha(e,t){Du(this,e,t),W(this,e,e=>{this.pa._attachImageListener(e)})}ia(e,t){Ou(this,e,t),W(this,e,e=>{this.pa._attachImageVectorListener(e)})}})),Fd=class extends Pd{};async function Id(e,t,n){return Fu(e,n.canvas??(Su()?void 0:document.createElement(`canvas`)),t,n)}function Ld(e,t,n,r){if(e.o&&r!==void 0){var i=gi(e.baseOptions,Ac,3);i?.h()||i?.l()?.h()?(++(i=e.o).h.U,i.i.set(r,performance.now())):(++(i=e.o).h.R,i.i.set(r,performance.now()))}if(e.ra){if(i=new vc,n?.regionOfInterest){if(!e.Da)throw Error(`This task doesn't support region-of-interest.`);var a=n.regionOfInterest;if(a.left>=a.right||a.top>=a.bottom)throw Error(`Expected RectF with left < right and top < bottom.`);if(a.left<0||a.top<0||a.right>1||a.bottom>1)throw Error(`Expected RectF values to be in [0,1].`);R(i,1,(a.left+a.right)/2),R(i,2,(a.top+a.bottom)/2),R(i,4,a.right-a.left),R(i,3,a.bottom-a.top)}else R(i,1,.5),R(i,2,.5),R(i,4,1),R(i,3,1);if(n?.rotationDegrees){if(n?.rotationDegrees%90!=0)throw Error(`Expected rotation to be a multiple of 90°.`);if(R(i,5,-Math.PI*n.rotationDegrees/180),n?.rotationDegrees%180!=0){let[e,r]=wu(t);n=Ti(i,3)*r/e,a=Ti(i,4)*e/r,R(i,4,n),R(i,3,a)}}e.h.addProtoToStream(i.h(),`mediapipe.NormalizedRect`,e.ra,r)}e.h.Ea(t,e.Ca,r??performance.now()),e.finishProcessing(r)}function Rd(e,t,n){if(e.K)throw Error(`Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.`);Ld(e,t,n,e.J+1)}function zd(e,t,n,r){if(!e.K)throw Error(`Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.`);Ld(e,t,n,r)}function Bd(e,t,n,r){var i=t.data,a=t.width,o=a*(t=t.height);if((i instanceof Uint8Array||i instanceof Float32Array)&&i.length!==o)throw Error(`Unsupported channel count: `+i.length/o);return e=new ud([i],n,!1,e.h.j.canvas,e.ea,a,t),r?e.clone():e}var Vd=class extends Hu{constructor(e,t,n,r){super(e),this.h=e,this.Ca=t,this.ra=n,this.Da=r,this.ea=new Qu,this.K=!1}l(e,t=!0,n=!1,r=!1){if(`runningMode`in e){var i=this.K=!!e.runningMode&&e.runningMode!==`IMAGE`;I(this.baseOptions,2,i==null?i:Gn(i))}if(e.canvas!==void 0&&this.h.j.canvas!==e.canvas)throw Error(`You must create a new task to reset the canvas.`);return super.l(e,t,n,r)}close(){this.ea.close(),super.close()}};Vd.prototype.close=Vd.prototype.close;var Hd=class extends Vd{constructor(e,t){super(new Fd(e,t),`image_in`,`norm_rect_in`,!1),this.m={detections:[]},L(e=this.i=new Lc,0,1,t=new Nc),R(this.i,2,.5),R(this.i,3,.3)}D(){return`FaceDetector`}get baseOptions(){return gi(this.i,Nc,1)}set baseOptions(e){L(this.i,0,1,e)}A(e){return`minDetectionConfidence`in e&&R(this.i,2,e.minDetectionConfidence??.5),`minSuppressionThreshold`in e&&R(this.i,3,e.minSuppressionThreshold??.3),this.l(e)}H(e,t){return this.m={detections:[]},Rd(this,e,t),this.m}I(e,t,n){return this.m={detections:[]},zd(this,e,n,t),this.m}u(){var e=new tc;$s(e,`image_in`),$s(e,`norm_rect_in`),ec(e,`detections`);var t=new Us;Qa(t,zc,this.i);var n=new Js;Mi(n,2,`mediapipe.tasks.vision.face_detector.FaceDetectorGraph`),Ks(n,`IMAGE:image_in`),Ks(n,`NORM_RECT:norm_rect_in`),qs(n,`DETECTIONS:detections`),n.A(t),Qs(e,n),this.h.attachProtoVectorListener(`detections`,(e,t)=>{for(let t of e)e=dc(t),this.m.detections.push(Ll(e));G(this,t)}),this.h.attachEmptyPacketListener(`detections`,e=>{G(this,e)}),e=e.h(),this.setGraph(new Uint8Array(e),!0)}};Hd.prototype.detectForVideo=Hd.prototype.I,Hd.prototype.detect=Hd.prototype.H,Hd.prototype.setOptions=Hd.prototype.A,Hd.createFromModelPath=async function(e,t){return Id(Hd,e,{baseOptions:{modelAssetPath:t}})},Hd.createFromModelBuffer=function(e,t){return Id(Hd,e,{baseOptions:{modelAssetBuffer:t}})},Hd.createFromOptions=function(e,t){return Id(Hd,e,t)};var Ud=Md([61,146],[146,91],[91,181],[181,84],[84,17],[17,314],[314,405],[405,321],[321,375],[375,291],[61,185],[185,40],[40,39],[39,37],[37,0],[0,267],[267,269],[269,270],[270,409],[409,291],[78,95],[95,88],[88,178],[178,87],[87,14],[14,317],[317,402],[402,318],[318,324],[324,308],[78,191],[191,80],[80,81],[81,82],[82,13],[13,312],[312,311],[311,310],[310,415],[415,308]),Wd=Md([263,249],[249,390],[390,373],[373,374],[374,380],[380,381],[381,382],[382,362],[263,466],[466,388],[388,387],[387,386],[386,385],[385,384],[384,398],[398,362]),Gd=Md([276,283],[283,282],[282,295],[295,285],[300,293],[293,334],[334,296],[296,336]),Kd=Md([474,475],[475,476],[476,477],[477,474]),qd=Md([33,7],[7,163],[163,144],[144,145],[145,153],[153,154],[154,155],[155,133],[33,246],[246,161],[161,160],[160,159],[159,158],[158,157],[157,173],[173,133]),Jd=Md([46,53],[53,52],[52,65],[65,55],[70,63],[63,105],[105,66],[66,107]),Yd=Md([469,470],[470,471],[471,472],[472,469]),Xd=Md([10,338],[338,297],[297,332],[332,284],[284,251],[251,389],[389,356],[356,454],[454,323],[323,361],[361,288],[288,397],[397,365],[365,379],[379,378],[378,400],[400,377],[377,152],[152,148],[148,176],[176,149],[149,150],[150,136],[136,172],[172,58],[58,132],[132,93],[93,234],[234,127],[127,162],[162,21],[21,54],[54,103],[103,67],[67,109],[109,10]),Zd=[...Ud,...Wd,...Gd,...qd,...Jd,...Xd],Qd=Md([127,34],[34,139],[139,127],[11,0],[0,37],[37,11],[232,231],[231,120],[120,232],[72,37],[37,39],[39,72],[128,121],[121,47],[47,128],[232,121],[121,128],[128,232],[104,69],[69,67],[67,104],[175,171],[171,148],[148,175],[118,50],[50,101],[101,118],[73,39],[39,40],[40,73],[9,151],[151,108],[108,9],[48,115],[115,131],[131,48],[194,204],[204,211],[211,194],[74,40],[40,185],[185,74],[80,42],[42,183],[183,80],[40,92],[92,186],[186,40],[230,229],[229,118],[118,230],[202,212],[212,214],[214,202],[83,18],[18,17],[17,83],[76,61],[61,146],[146,76],[160,29],[29,30],[30,160],[56,157],[157,173],[173,56],[106,204],[204,194],[194,106],[135,214],[214,192],[192,135],[203,165],[165,98],[98,203],[21,71],[71,68],[68,21],[51,45],[45,4],[4,51],[144,24],[24,23],[23,144],[77,146],[146,91],[91,77],[205,50],[50,187],[187,205],[201,200],[200,18],[18,201],[91,106],[106,182],[182,91],[90,91],[91,181],[181,90],[85,84],[84,17],[17,85],[206,203],[203,36],[36,206],[148,171],[171,140],[140,148],[92,40],[40,39],[39,92],[193,189],[189,244],[244,193],[159,158],[158,28],[28,159],[247,246],[246,161],[161,247],[236,3],[3,196],[196,236],[54,68],[68,104],[104,54],[193,168],[168,8],[8,193],[117,228],[228,31],[31,117],[189,193],[193,55],[55,189],[98,97],[97,99],[99,98],[126,47],[47,100],[100,126],[166,79],[79,218],[218,166],[155,154],[154,26],[26,155],[209,49],[49,131],[131,209],[135,136],[136,150],[150,135],[47,126],[126,217],[217,47],[223,52],[52,53],[53,223],[45,51],[51,134],[134,45],[211,170],[170,140],[140,211],[67,69],[69,108],[108,67],[43,106],[106,91],[91,43],[230,119],[119,120],[120,230],[226,130],[130,247],[247,226],[63,53],[53,52],[52,63],[238,20],[20,242],[242,238],[46,70],[70,156],[156,46],[78,62],[62,96],[96,78],[46,53],[53,63],[63,46],[143,34],[34,227],[227,143],[123,117],[117,111],[111,123],[44,125],[125,19],[19,44],[236,134],[134,51],[51,236],[216,206],[206,205],[205,216],[154,153],[153,22],[22,154],[39,37],[37,167],[167,39],[200,201],[201,208],[208,200],[36,142],[142,100],[100,36],[57,212],[212,202],[202,57],[20,60],[60,99],[99,20],[28,158],[158,157],[157,28],[35,226],[226,113],[113,35],[160,159],[159,27],[27,160],[204,202],[202,210],[210,204],[113,225],[225,46],[46,113],[43,202],[202,204],[204,43],[62,76],[76,77],[77,62],[137,123],[123,116],[116,137],[41,38],[38,72],[72,41],[203,129],[129,142],[142,203],[64,98],[98,240],[240,64],[49,102],[102,64],[64,49],[41,73],[73,74],[74,41],[212,216],[216,207],[207,212],[42,74],[74,184],[184,42],[169,170],[170,211],[211,169],[170,149],[149,176],[176,170],[105,66],[66,69],[69,105],[122,6],[6,168],[168,122],[123,147],[147,187],[187,123],[96,77],[77,90],[90,96],[65,55],[55,107],[107,65],[89,90],[90,180],[180,89],[101,100],[100,120],[120,101],[63,105],[105,104],[104,63],[93,137],[137,227],[227,93],[15,86],[86,85],[85,15],[129,102],[102,49],[49,129],[14,87],[87,86],[86,14],[55,8],[8,9],[9,55],[100,47],[47,121],[121,100],[145,23],[23,22],[22,145],[88,89],[89,179],[179,88],[6,122],[122,196],[196,6],[88,95],[95,96],[96,88],[138,172],[172,136],[136,138],[215,58],[58,172],[172,215],[115,48],[48,219],[219,115],[42,80],[80,81],[81,42],[195,3],[3,51],[51,195],[43,146],[146,61],[61,43],[171,175],[175,199],[199,171],[81,82],[82,38],[38,81],[53,46],[46,225],[225,53],[144,163],[163,110],[110,144],[52,65],[65,66],[66,52],[229,228],[228,117],[117,229],[34,127],[127,234],[234,34],[107,108],[108,69],[69,107],[109,108],[108,151],[151,109],[48,64],[64,235],[235,48],[62,78],[78,191],[191,62],[129,209],[209,126],[126,129],[111,35],[35,143],[143,111],[117,123],[123,50],[50,117],[222,65],[65,52],[52,222],[19,125],[125,141],[141,19],[221,55],[55,65],[65,221],[3,195],[195,197],[197,3],[25,7],[7,33],[33,25],[220,237],[237,44],[44,220],[70,71],[71,139],[139,70],[122,193],[193,245],[245,122],[247,130],[130,33],[33,247],[71,21],[21,162],[162,71],[170,169],[169,150],[150,170],[188,174],[174,196],[196,188],[216,186],[186,92],[92,216],[2,97],[97,167],[167,2],[141,125],[125,241],[241,141],[164,167],[167,37],[37,164],[72,38],[38,12],[12,72],[38,82],[82,13],[13,38],[63,68],[68,71],[71,63],[226,35],[35,111],[111,226],[101,50],[50,205],[205,101],[206,92],[92,165],[165,206],[209,198],[198,217],[217,209],[165,167],[167,97],[97,165],[220,115],[115,218],[218,220],[133,112],[112,243],[243,133],[239,238],[238,241],[241,239],[214,135],[135,169],[169,214],[190,173],[173,133],[133,190],[171,208],[208,32],[32,171],[125,44],[44,237],[237,125],[86,87],[87,178],[178,86],[85,86],[86,179],[179,85],[84,85],[85,180],[180,84],[83,84],[84,181],[181,83],[201,83],[83,182],[182,201],[137,93],[93,132],[132,137],[76,62],[62,183],[183,76],[61,76],[76,184],[184,61],[57,61],[61,185],[185,57],[212,57],[57,186],[186,212],[214,207],[207,187],[187,214],[34,143],[143,156],[156,34],[79,239],[239,237],[237,79],[123,137],[137,177],[177,123],[44,1],[1,4],[4,44],[201,194],[194,32],[32,201],[64,102],[102,129],[129,64],[213,215],[215,138],[138,213],[59,166],[166,219],[219,59],[242,99],[99,97],[97,242],[2,94],[94,141],[141,2],[75,59],[59,235],[235,75],[24,110],[110,228],[228,24],[25,130],[130,226],[226,25],[23,24],[24,229],[229,23],[22,23],[23,230],[230,22],[26,22],[22,231],[231,26],[112,26],[26,232],[232,112],[189,190],[190,243],[243,189],[221,56],[56,190],[190,221],[28,56],[56,221],[221,28],[27,28],[28,222],[222,27],[29,27],[27,223],[223,29],[30,29],[29,224],[224,30],[247,30],[30,225],[225,247],[238,79],[79,20],[20,238],[166,59],[59,75],[75,166],[60,75],[75,240],[240,60],[147,177],[177,215],[215,147],[20,79],[79,166],[166,20],[187,147],[147,213],[213,187],[112,233],[233,244],[244,112],[233,128],[128,245],[245,233],[128,114],[114,188],[188,128],[114,217],[217,174],[174,114],[131,115],[115,220],[220,131],[217,198],[198,236],[236,217],[198,131],[131,134],[134,198],[177,132],[132,58],[58,177],[143,35],[35,124],[124,143],[110,163],[163,7],[7,110],[228,110],[110,25],[25,228],[356,389],[389,368],[368,356],[11,302],[302,267],[267,11],[452,350],[350,349],[349,452],[302,303],[303,269],[269,302],[357,343],[343,277],[277,357],[452,453],[453,357],[357,452],[333,332],[332,297],[297,333],[175,152],[152,377],[377,175],[347,348],[348,330],[330,347],[303,304],[304,270],[270,303],[9,336],[336,337],[337,9],[278,279],[279,360],[360,278],[418,262],[262,431],[431,418],[304,408],[408,409],[409,304],[310,415],[415,407],[407,310],[270,409],[409,410],[410,270],[450,348],[348,347],[347,450],[422,430],[430,434],[434,422],[313,314],[314,17],[17,313],[306,307],[307,375],[375,306],[387,388],[388,260],[260,387],[286,414],[414,398],[398,286],[335,406],[406,418],[418,335],[364,367],[367,416],[416,364],[423,358],[358,327],[327,423],[251,284],[284,298],[298,251],[281,5],[5,4],[4,281],[373,374],[374,253],[253,373],[307,320],[320,321],[321,307],[425,427],[427,411],[411,425],[421,313],[313,18],[18,421],[321,405],[405,406],[406,321],[320,404],[404,405],[405,320],[315,16],[16,17],[17,315],[426,425],[425,266],[266,426],[377,400],[400,369],[369,377],[322,391],[391,269],[269,322],[417,465],[465,464],[464,417],[386,257],[257,258],[258,386],[466,260],[260,388],[388,466],[456,399],[399,419],[419,456],[284,332],[332,333],[333,284],[417,285],[285,8],[8,417],[346,340],[340,261],[261,346],[413,441],[441,285],[285,413],[327,460],[460,328],[328,327],[355,371],[371,329],[329,355],[392,439],[439,438],[438,392],[382,341],[341,256],[256,382],[429,420],[420,360],[360,429],[364,394],[394,379],[379,364],[277,343],[343,437],[437,277],[443,444],[444,283],[283,443],[275,440],[440,363],[363,275],[431,262],[262,369],[369,431],[297,338],[338,337],[337,297],[273,375],[375,321],[321,273],[450,451],[451,349],[349,450],[446,342],[342,467],[467,446],[293,334],[334,282],[282,293],[458,461],[461,462],[462,458],[276,353],[353,383],[383,276],[308,324],[324,325],[325,308],[276,300],[300,293],[293,276],[372,345],[345,447],[447,372],[352,345],[345,340],[340,352],[274,1],[1,19],[19,274],[456,248],[248,281],[281,456],[436,427],[427,425],[425,436],[381,256],[256,252],[252,381],[269,391],[391,393],[393,269],[200,199],[199,428],[428,200],[266,330],[330,329],[329,266],[287,273],[273,422],[422,287],[250,462],[462,328],[328,250],[258,286],[286,384],[384,258],[265,353],[353,342],[342,265],[387,259],[259,257],[257,387],[424,431],[431,430],[430,424],[342,353],[353,276],[276,342],[273,335],[335,424],[424,273],[292,325],[325,307],[307,292],[366,447],[447,345],[345,366],[271,303],[303,302],[302,271],[423,266],[266,371],[371,423],[294,455],[455,460],[460,294],[279,278],[278,294],[294,279],[271,272],[272,304],[304,271],[432,434],[434,427],[427,432],[272,407],[407,408],[408,272],[394,430],[430,431],[431,394],[395,369],[369,400],[400,395],[334,333],[333,299],[299,334],[351,417],[417,168],[168,351],[352,280],[280,411],[411,352],[325,319],[319,320],[320,325],[295,296],[296,336],[336,295],[319,403],[403,404],[404,319],[330,348],[348,349],[349,330],[293,298],[298,333],[333,293],[323,454],[454,447],[447,323],[15,16],[16,315],[315,15],[358,429],[429,279],[279,358],[14,15],[15,316],[316,14],[285,336],[336,9],[9,285],[329,349],[349,350],[350,329],[374,380],[380,252],[252,374],[318,402],[402,403],[403,318],[6,197],[197,419],[419,6],[318,319],[319,325],[325,318],[367,364],[364,365],[365,367],[435,367],[367,397],[397,435],[344,438],[438,439],[439,344],[272,271],[271,311],[311,272],[195,5],[5,281],[281,195],[273,287],[287,291],[291,273],[396,428],[428,199],[199,396],[311,271],[271,268],[268,311],[283,444],[444,445],[445,283],[373,254],[254,339],[339,373],[282,334],[334,296],[296,282],[449,347],[347,346],[346,449],[264,447],[447,454],[454,264],[336,296],[296,299],[299,336],[338,10],[10,151],[151,338],[278,439],[439,455],[455,278],[292,407],[407,415],[415,292],[358,371],[371,355],[355,358],[340,345],[345,372],[372,340],[346,347],[347,280],[280,346],[442,443],[443,282],[282,442],[19,94],[94,370],[370,19],[441,442],[442,295],[295,441],[248,419],[419,197],[197,248],[263,255],[255,359],[359,263],[440,275],[275,274],[274,440],[300,383],[383,368],[368,300],[351,412],[412,465],[465,351],[263,467],[467,466],[466,263],[301,368],[368,389],[389,301],[395,378],[378,379],[379,395],[412,351],[351,419],[419,412],[436,426],[426,322],[322,436],[2,164],[164,393],[393,2],[370,462],[462,461],[461,370],[164,0],[0,267],[267,164],[302,11],[11,12],[12,302],[268,12],[12,13],[13,268],[293,300],[300,301],[301,293],[446,261],[261,340],[340,446],[330,266],[266,425],[425,330],[426,423],[423,391],[391,426],[429,355],[355,437],[437,429],[391,327],[327,326],[326,391],[440,457],[457,438],[438,440],[341,382],[382,362],[362,341],[459,457],[457,461],[461,459],[434,430],[430,394],[394,434],[414,463],[463,362],[362,414],[396,369],[369,262],[262,396],[354,461],[461,457],[457,354],[316,403],[403,402],[402,316],[315,404],[404,403],[403,315],[314,405],[405,404],[404,314],[313,406],[406,405],[405,313],[421,418],[418,406],[406,421],[366,401],[401,361],[361,366],[306,408],[408,407],[407,306],[291,409],[409,408],[408,291],[287,410],[410,409],[409,287],[432,436],[436,410],[410,432],[434,416],[416,411],[411,434],[264,368],[368,383],[383,264],[309,438],[438,457],[457,309],[352,376],[376,401],[401,352],[274,275],[275,4],[4,274],[421,428],[428,262],[262,421],[294,327],[327,358],[358,294],[433,416],[416,367],[367,433],[289,455],[455,439],[439,289],[462,370],[370,326],[326,462],[2,326],[326,370],[370,2],[305,460],[460,455],[455,305],[254,449],[449,448],[448,254],[255,261],[261,446],[446,255],[253,450],[450,449],[449,253],[252,451],[451,450],[450,252],[256,452],[452,451],[451,256],[341,453],[453,452],[452,341],[413,464],[464,463],[463,413],[441,413],[413,414],[414,441],[258,442],[442,441],[441,258],[257,443],[443,442],[442,257],[259,444],[444,443],[443,259],[260,445],[445,444],[444,260],[467,342],[342,445],[445,467],[459,458],[458,250],[250,459],[289,392],[392,290],[290,289],[290,328],[328,460],[460,290],[376,433],[433,435],[435,376],[250,290],[290,392],[392,250],[411,416],[416,433],[433,411],[341,463],[463,464],[464,341],[453,464],[464,465],[465,453],[357,465],[465,412],[412,357],[343,412],[412,399],[399,343],[360,363],[363,440],[440,360],[437,399],[399,456],[456,437],[420,456],[456,363],[363,420],[401,435],[435,288],[288,401],[372,383],[383,353],[353,372],[339,255],[255,249],[249,339],[448,261],[261,255],[255,448],[133,243],[243,190],[190,133],[133,155],[155,112],[112,133],[33,246],[246,247],[247,33],[33,130],[130,25],[25,33],[398,384],[384,286],[286,398],[362,398],[398,414],[414,362],[362,463],[463,341],[341,362],[263,359],[359,467],[467,263],[263,249],[249,255],[255,263],[466,467],[467,260],[260,466],[75,60],[60,166],[166,75],[238,239],[239,79],[79,238],[162,127],[127,139],[139,162],[72,11],[11,37],[37,72],[121,232],[232,120],[120,121],[73,72],[72,39],[39,73],[114,128],[128,47],[47,114],[233,232],[232,128],[128,233],[103,104],[104,67],[67,103],[152,175],[175,148],[148,152],[119,118],[118,101],[101,119],[74,73],[73,40],[40,74],[107,9],[9,108],[108,107],[49,48],[48,131],[131,49],[32,194],[194,211],[211,32],[184,74],[74,185],[185,184],[191,80],[80,183],[183,191],[185,40],[40,186],[186,185],[119,230],[230,118],[118,119],[210,202],[202,214],[214,210],[84,83],[83,17],[17,84],[77,76],[76,146],[146,77],[161,160],[160,30],[30,161],[190,56],[56,173],[173,190],[182,106],[106,194],[194,182],[138,135],[135,192],[192,138],[129,203],[203,98],[98,129],[54,21],[21,68],[68,54],[5,51],[51,4],[4,5],[145,144],[144,23],[23,145],[90,77],[77,91],[91,90],[207,205],[205,187],[187,207],[83,201],[201,18],[18,83],[181,91],[91,182],[182,181],[180,90],[90,181],[181,180],[16,85],[85,17],[17,16],[205,206],[206,36],[36,205],[176,148],[148,140],[140,176],[165,92],[92,39],[39,165],[245,193],[193,244],[244,245],[27,159],[159,28],[28,27],[30,247],[247,161],[161,30],[174,236],[236,196],[196,174],[103,54],[54,104],[104,103],[55,193],[193,8],[8,55],[111,117],[117,31],[31,111],[221,189],[189,55],[55,221],[240,98],[98,99],[99,240],[142,126],[126,100],[100,142],[219,166],[166,218],[218,219],[112,155],[155,26],[26,112],[198,209],[209,131],[131,198],[169,135],[135,150],[150,169],[114,47],[47,217],[217,114],[224,223],[223,53],[53,224],[220,45],[45,134],[134,220],[32,211],[211,140],[140,32],[109,67],[67,108],[108,109],[146,43],[43,91],[91,146],[231,230],[230,120],[120,231],[113,226],[226,247],[247,113],[105,63],[63,52],[52,105],[241,238],[238,242],[242,241],[124,46],[46,156],[156,124],[95,78],[78,96],[96,95],[70,46],[46,63],[63,70],[116,143],[143,227],[227,116],[116,123],[123,111],[111,116],[1,44],[44,19],[19,1],[3,236],[236,51],[51,3],[207,216],[216,205],[205,207],[26,154],[154,22],[22,26],[165,39],[39,167],[167,165],[199,200],[200,208],[208,199],[101,36],[36,100],[100,101],[43,57],[57,202],[202,43],[242,20],[20,99],[99,242],[56,28],[28,157],[157,56],[124,35],[35,113],[113,124],[29,160],[160,27],[27,29],[211,204],[204,210],[210,211],[124,113],[113,46],[46,124],[106,43],[43,204],[204,106],[96,62],[62,77],[77,96],[227,137],[137,116],[116,227],[73,41],[41,72],[72,73],[36,203],[203,142],[142,36],[235,64],[64,240],[240,235],[48,49],[49,64],[64,48],[42,41],[41,74],[74,42],[214,212],[212,207],[207,214],[183,42],[42,184],[184,183],[210,169],[169,211],[211,210],[140,170],[170,176],[176,140],[104,105],[105,69],[69,104],[193,122],[122,168],[168,193],[50,123],[123,187],[187,50],[89,96],[96,90],[90,89],[66,65],[65,107],[107,66],[179,89],[89,180],[180,179],[119,101],[101,120],[120,119],[68,63],[63,104],[104,68],[234,93],[93,227],[227,234],[16,15],[15,85],[85,16],[209,129],[129,49],[49,209],[15,14],[14,86],[86,15],[107,55],[55,9],[9,107],[120,100],[100,121],[121,120],[153,145],[145,22],[22,153],[178,88],[88,179],[179,178],[197,6],[6,196],[196,197],[89,88],[88,96],[96,89],[135,138],[138,136],[136,135],[138,215],[215,172],[172,138],[218,115],[115,219],[219,218],[41,42],[42,81],[81,41],[5,195],[195,51],[51,5],[57,43],[43,61],[61,57],[208,171],[171,199],[199,208],[41,81],[81,38],[38,41],[224,53],[53,225],[225,224],[24,144],[144,110],[110,24],[105,52],[52,66],[66,105],[118,229],[229,117],[117,118],[227,34],[34,234],[234,227],[66,107],[107,69],[69,66],[10,109],[109,151],[151,10],[219,48],[48,235],[235,219],[183,62],[62,191],[191,183],[142,129],[129,126],[126,142],[116,111],[111,143],[143,116],[118,117],[117,50],[50,118],[223,222],[222,52],[52,223],[94,19],[19,141],[141,94],[222,221],[221,65],[65,222],[196,3],[3,197],[197,196],[45,220],[220,44],[44,45],[156,70],[70,139],[139,156],[188,122],[122,245],[245,188],[139,71],[71,162],[162,139],[149,170],[170,150],[150,149],[122,188],[188,196],[196,122],[206,216],[216,92],[92,206],[164,2],[2,167],[167,164],[242,141],[141,241],[241,242],[0,164],[164,37],[37,0],[11,72],[72,12],[12,11],[12,38],[38,13],[13,12],[70,63],[63,71],[71,70],[31,226],[226,111],[111,31],[36,101],[101,205],[205,36],[203,206],[206,165],[165,203],[126,209],[209,217],[217,126],[98,165],[165,97],[97,98],[237,220],[220,218],[218,237],[237,239],[239,241],[241,237],[210,214],[214,169],[169,210],[140,171],[171,32],[32,140],[241,125],[125,237],[237,241],[179,86],[86,178],[178,179],[180,85],[85,179],[179,180],[181,84],[84,180],[180,181],[182,83],[83,181],[181,182],[194,201],[201,182],[182,194],[177,137],[137,132],[132,177],[184,76],[76,183],[183,184],[185,61],[61,184],[184,185],[186,57],[57,185],[185,186],[216,212],[212,186],[186,216],[192,214],[214,187],[187,192],[139,34],[34,156],[156,139],[218,79],[79,237],[237,218],[147,123],[123,177],[177,147],[45,44],[44,4],[4,45],[208,201],[201,32],[32,208],[98,64],[64,129],[129,98],[192,213],[213,138],[138,192],[235,59],[59,219],[219,235],[141,242],[242,97],[97,141],[97,2],[2,141],[141,97],[240,75],[75,235],[235,240],[229,24],[24,228],[228,229],[31,25],[25,226],[226,31],[230,23],[23,229],[229,230],[231,22],[22,230],[230,231],[232,26],[26,231],[231,232],[233,112],[112,232],[232,233],[244,189],[189,243],[243,244],[189,221],[221,190],[190,189],[222,28],[28,221],[221,222],[223,27],[27,222],[222,223],[224,29],[29,223],[223,224],[225,30],[30,224],[224,225],[113,247],[247,225],[225,113],[99,60],[60,240],[240,99],[213,147],[147,215],[215,213],[60,20],[20,166],[166,60],[192,187],[187,213],[213,192],[243,112],[112,244],[244,243],[244,233],[233,245],[245,244],[245,128],[128,188],[188,245],[188,114],[114,174],[174,188],[134,131],[131,220],[220,134],[174,217],[217,236],[236,174],[236,198],[198,134],[134,236],[215,177],[177,58],[58,215],[156,143],[143,124],[124,156],[25,110],[110,7],[7,25],[31,228],[228,25],[25,31],[264,356],[356,368],[368,264],[0,11],[11,267],[267,0],[451,452],[452,349],[349,451],[267,302],[302,269],[269,267],[350,357],[357,277],[277,350],[350,452],[452,357],[357,350],[299,333],[333,297],[297,299],[396,175],[175,377],[377,396],[280,347],[347,330],[330,280],[269,303],[303,270],[270,269],[151,9],[9,337],[337,151],[344,278],[278,360],[360,344],[424,418],[418,431],[431,424],[270,304],[304,409],[409,270],[272,310],[310,407],[407,272],[322,270],[270,410],[410,322],[449,450],[450,347],[347,449],[432,422],[422,434],[434,432],[18,313],[313,17],[17,18],[291,306],[306,375],[375,291],[259,387],[387,260],[260,259],[424,335],[335,418],[418,424],[434,364],[364,416],[416,434],[391,423],[423,327],[327,391],[301,251],[251,298],[298,301],[275,281],[281,4],[4,275],[254,373],[373,253],[253,254],[375,307],[307,321],[321,375],[280,425],[425,411],[411,280],[200,421],[421,18],[18,200],[335,321],[321,406],[406,335],[321,320],[320,405],[405,321],[314,315],[315,17],[17,314],[423,426],[426,266],[266,423],[396,377],[377,369],[369,396],[270,322],[322,269],[269,270],[413,417],[417,464],[464,413],[385,386],[386,258],[258,385],[248,456],[456,419],[419,248],[298,284],[284,333],[333,298],[168,417],[417,8],[8,168],[448,346],[346,261],[261,448],[417,413],[413,285],[285,417],[326,327],[327,328],[328,326],[277,355],[355,329],[329,277],[309,392],[392,438],[438,309],[381,382],[382,256],[256,381],[279,429],[429,360],[360,279],[365,364],[364,379],[379,365],[355,277],[277,437],[437,355],[282,443],[443,283],[283,282],[281,275],[275,363],[363,281],[395,431],[431,369],[369,395],[299,297],[297,337],[337,299],[335,273],[273,321],[321,335],[348,450],[450,349],[349,348],[359,446],[446,467],[467,359],[283,293],[293,282],[282,283],[250,458],[458,462],[462,250],[300,276],[276,383],[383,300],[292,308],[308,325],[325,292],[283,276],[276,293],[293,283],[264,372],[372,447],[447,264],[346,352],[352,340],[340,346],[354,274],[274,19],[19,354],[363,456],[456,281],[281,363],[426,436],[436,425],[425,426],[380,381],[381,252],[252,380],[267,269],[269,393],[393,267],[421,200],[200,428],[428,421],[371,266],[266,329],[329,371],[432,287],[287,422],[422,432],[290,250],[250,328],[328,290],[385,258],[258,384],[384,385],[446,265],[265,342],[342,446],[386,387],[387,257],[257,386],[422,424],[424,430],[430,422],[445,342],[342,276],[276,445],[422,273],[273,424],[424,422],[306,292],[292,307],[307,306],[352,366],[366,345],[345,352],[268,271],[271,302],[302,268],[358,423],[423,371],[371,358],[327,294],[294,460],[460,327],[331,279],[279,294],[294,331],[303,271],[271,304],[304,303],[436,432],[432,427],[427,436],[304,272],[272,408],[408,304],[395,394],[394,431],[431,395],[378,395],[395,400],[400,378],[296,334],[334,299],[299,296],[6,351],[351,168],[168,6],[376,352],[352,411],[411,376],[307,325],[325,320],[320,307],[285,295],[295,336],[336,285],[320,319],[319,404],[404,320],[329,330],[330,349],[349,329],[334,293],[293,333],[333,334],[366,323],[323,447],[447,366],[316,15],[15,315],[315,316],[331,358],[358,279],[279,331],[317,14],[14,316],[316,317],[8,285],[285,9],[9,8],[277,329],[329,350],[350,277],[253,374],[374,252],[252,253],[319,318],[318,403],[403,319],[351,6],[6,419],[419,351],[324,318],[318,325],[325,324],[397,367],[367,365],[365,397],[288,435],[435,397],[397,288],[278,344],[344,439],[439,278],[310,272],[272,311],[311,310],[248,195],[195,281],[281,248],[375,273],[273,291],[291,375],[175,396],[396,199],[199,175],[312,311],[311,268],[268,312],[276,283],[283,445],[445,276],[390,373],[373,339],[339,390],[295,282],[282,296],[296,295],[448,449],[449,346],[346,448],[356,264],[264,454],[454,356],[337,336],[336,299],[299,337],[337,338],[338,151],[151,337],[294,278],[278,455],[455,294],[308,292],[292,415],[415,308],[429,358],[358,355],[355,429],[265,340],[340,372],[372,265],[352,346],[346,280],[280,352],[295,442],[442,282],[282,295],[354,19],[19,370],[370,354],[285,441],[441,295],[295,285],[195,248],[248,197],[197,195],[457,440],[440,274],[274,457],[301,300],[300,368],[368,301],[417,351],[351,465],[465,417],[251,301],[301,389],[389,251],[394,395],[395,379],[379,394],[399,412],[412,419],[419,399],[410,436],[436,322],[322,410],[326,2],[2,393],[393,326],[354,370],[370,461],[461,354],[393,164],[164,267],[267,393],[268,302],[302,12],[12,268],[312,268],[268,13],[13,312],[298,293],[293,301],[301,298],[265,446],[446,340],[340,265],[280,330],[330,425],[425,280],[322,426],[426,391],[391,322],[420,429],[429,437],[437,420],[393,391],[391,326],[326,393],[344,440],[440,438],[438,344],[458,459],[459,461],[461,458],[364,434],[434,394],[394,364],[428,396],[396,262],[262,428],[274,354],[354,457],[457,274],[317,316],[316,402],[402,317],[316,315],[315,403],[403,316],[315,314],[314,404],[404,315],[314,313],[313,405],[405,314],[313,421],[421,406],[406,313],[323,366],[366,361],[361,323],[292,306],[306,407],[407,292],[306,291],[291,408],[408,306],[291,287],[287,409],[409,291],[287,432],[432,410],[410,287],[427,434],[434,411],[411,427],[372,264],[264,383],[383,372],[459,309],[309,457],[457,459],[366,352],[352,401],[401,366],[1,274],[274,4],[4,1],[418,421],[421,262],[262,418],[331,294],[294,358],[358,331],[435,433],[433,367],[367,435],[392,289],[289,439],[439,392],[328,462],[462,326],[326,328],[94,2],[2,370],[370,94],[289,305],[305,455],[455,289],[339,254],[254,448],[448,339],[359,255],[255,446],[446,359],[254,253],[253,449],[449,254],[253,252],[252,450],[450,253],[252,256],[256,451],[451,252],[256,341],[341,452],[452,256],[414,413],[413,463],[463,414],[286,441],[441,414],[414,286],[286,258],[258,441],[441,286],[258,257],[257,442],[442,258],[257,259],[259,443],[443,257],[259,260],[260,444],[444,259],[260,467],[467,445],[445,260],[309,459],[459,250],[250,309],[305,289],[289,290],[290,305],[305,290],[290,460],[460,305],[401,376],[376,435],[435,401],[309,250],[250,392],[392,309],[376,411],[411,433],[433,376],[453,341],[341,464],[464,453],[357,453],[453,465],[465,357],[343,357],[357,412],[412,343],[437,343],[343,399],[399,437],[344,360],[360,440],[440,344],[420,437],[437,456],[456,420],[360,420],[420,363],[363,360],[361,401],[401,288],[288,361],[265,372],[372,353],[353,265],[390,339],[339,249],[249,390],[339,448],[448,255],[255,339]);function $d(e){e.m={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]}}var ef=class extends Vd{constructor(e,t){super(new Fd(e,t),`image_in`,`norm_rect`,!1),this.m={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]},this.outputFacialTransformationMatrixes=this.outputFaceBlendshapes=!1,L(e=this.i=new Hc,0,1,t=new Nc),this.C=new Vc,L(this.i,0,3,this.C),this.v=new Lc,L(this.i,0,2,this.v),Oi(this.v,4,1),R(this.v,2,.5),R(this.C,2,.5),R(this.i,4,.5)}D(){return`FaceLandmarker`}get baseOptions(){return gi(this.i,Nc,1)}set baseOptions(e){L(this.i,0,1,e)}A(e){return`numFaces`in e&&Oi(this.v,4,e.numFaces??1),`minFaceDetectionConfidence`in e&&R(this.v,2,e.minFaceDetectionConfidence??.5),`minTrackingConfidence`in e&&R(this.i,4,e.minTrackingConfidence??.5),`minFacePresenceConfidence`in e&&R(this.C,2,e.minFacePresenceConfidence??.5),`outputFaceBlendshapes`in e&&(this.outputFaceBlendshapes=!!e.outputFaceBlendshapes),`outputFacialTransformationMatrixes`in e&&(this.outputFacialTransformationMatrixes=!!e.outputFacialTransformationMatrixes),this.l(e)}H(e,t){return $d(this),Rd(this,e,t),this.m}I(e,t,n){return $d(this),zd(this,e,n,t),this.m}u(){var e=new tc;$s(e,`image_in`),$s(e,`norm_rect`),ec(e,`face_landmarks`);var t=new Us;Qa(t,Wc,this.i);var n=new Js;Mi(n,2,`mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph`),Ks(n,`IMAGE:image_in`),Ks(n,`NORM_RECT:norm_rect`),qs(n,`NORM_LANDMARKS:face_landmarks`),n.A(t),Qs(e,n),this.h.attachProtoVectorListener(`face_landmarks`,(e,t)=>{for(let t of e)e=hc(t),this.m.faceLandmarks.push(Rl(e));G(this,t)}),this.h.attachEmptyPacketListener(`face_landmarks`,e=>{G(this,e)}),this.outputFaceBlendshapes&&(ec(e,`blendshapes`),qs(n,`BLENDSHAPES:blendshapes`),this.h.attachProtoVectorListener(`blendshapes`,(e,t)=>{if(this.outputFaceBlendshapes)for(let t of e)e=sc(t),this.m.faceBlendshapes.push(Fl(e.h()??[]));G(this,t)}),this.h.attachEmptyPacketListener(`blendshapes`,e=>{G(this,e)})),this.outputFacialTransformationMatrixes&&(ec(e,`face_geometry`),qs(n,`FACE_GEOMETRY:face_geometry`),this.h.attachProtoVectorListener(`face_geometry`,(e,t)=>{if(this.outputFacialTransformationMatrixes)for(let t of e)(e=gi(e=Bc(t),gc,2))&&this.m.facialTransformationMatrixes.push({rows:wi(e,1)??0??0,columns:wi(e,2)??0??0,data:ni(e,3,Wn).slice()??[]});G(this,t)}),this.h.attachEmptyPacketListener(`face_geometry`,e=>{G(this,e)})),e=e.h(),this.setGraph(new Uint8Array(e),!0)}};ef.prototype.detectForVideo=ef.prototype.I,ef.prototype.detect=ef.prototype.H,ef.prototype.setOptions=ef.prototype.A,ef.createFromModelPath=function(e,t){return Id(ef,e,{baseOptions:{modelAssetPath:t}})},ef.createFromModelBuffer=function(e,t){return Id(ef,e,{baseOptions:{modelAssetBuffer:t}})},ef.createFromOptions=function(e,t){return Id(ef,e,t)},ef.FACE_LANDMARKS_LIPS=Ud,Ye(`module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_LIPS`,ef.FACE_LANDMARKS_LIPS),ef.FACE_LANDMARKS_LEFT_EYE=Wd,Ye(`module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_LEFT_EYE`,ef.FACE_LANDMARKS_LEFT_EYE),ef.FACE_LANDMARKS_LEFT_EYEBROW=Gd,Ye(`module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW`,ef.FACE_LANDMARKS_LEFT_EYEBROW),ef.FACE_LANDMARKS_LEFT_IRIS=Kd,Ye(`module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS`,ef.FACE_LANDMARKS_LEFT_IRIS),ef.FACE_LANDMARKS_RIGHT_EYE=qd,Ye(`module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE`,ef.FACE_LANDMARKS_RIGHT_EYE),ef.FACE_LANDMARKS_RIGHT_EYEBROW=Jd,Ye(`module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW`,ef.FACE_LANDMARKS_RIGHT_EYEBROW),ef.FACE_LANDMARKS_RIGHT_IRIS=Yd,Ye(`module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS`,ef.FACE_LANDMARKS_RIGHT_IRIS),ef.FACE_LANDMARKS_FACE_OVAL=Xd,Ye(`module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_FACE_OVAL`,ef.FACE_LANDMARKS_FACE_OVAL),ef.FACE_LANDMARKS_CONTOURS=Zd,Ye(`module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_CONTOURS`,ef.FACE_LANDMARKS_CONTOURS),ef.FACE_LANDMARKS_TESSELATION=Qd,Ye(`module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_TESSELATION`,ef.FACE_LANDMARKS_TESSELATION);var tf=Md([0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[0,17],[17,18],[18,19],[19,20]);function nf(e){e.gestures=[],e.landmarks=[],e.worldLandmarks=[],e.handedness=[]}function rf(e){return e.gestures.length===0?{gestures:[],landmarks:[],worldLandmarks:[],handedness:[],handednesses:[]}:{gestures:e.gestures,landmarks:e.landmarks,worldLandmarks:e.worldLandmarks,handedness:e.handedness,handednesses:e.handedness}}function af(e,t=!0){var n=[];for(let i of e){var r=sc(i);e=[];for(let n of r.h())r=t&&wi(n,1)!=null?wi(n,1)??0:-1,e.push({score:Ti(n,2)??0,index:r,categoryName:dr(Zr(n,3))??``??``,displayName:dr(Zr(n,4))??``??``});n.push(e)}return n}var of=class extends Vd{constructor(e,t){super(new Fd(e,t),`image_in`,`norm_rect`,!1),this.gestures=[],this.landmarks=[],this.worldLandmarks=[],this.handedness=[],L(e=this.m=new Zc,0,1,t=new Nc),this.v=new Xc,L(this.m,0,2,this.v),this.G=new Yc,L(this.v,0,3,this.G),this.C=new Jc,L(this.v,0,2,this.C),this.i=new qc,L(this.m,0,3,this.i),R(this.C,2,.5),R(this.v,4,.5),R(this.G,2,.5)}D(){return`GestureRecognizer`}get baseOptions(){return gi(this.m,Nc,1)}set baseOptions(e){L(this.m,0,1,e)}A(e){if(Oi(this.C,3,e.numHands??1),`minHandDetectionConfidence`in e&&R(this.C,2,e.minHandDetectionConfidence??.5),`minTrackingConfidence`in e&&R(this.v,4,e.minTrackingConfidence??.5),`minHandPresenceConfidence`in e&&R(this.G,2,e.minHandPresenceConfidence??.5),e.cannedGesturesClassifierOptions){var t=new Gc,n=t,r=Nl(e.cannedGesturesClassifierOptions,gi(this.i,Gc,3)?.l());L(n,0,2,r),L(this.i,0,3,t)}else e.cannedGesturesClassifierOptions===void 0&&gi(this.i,Gc,3)?.h();return e.customGesturesClassifierOptions?(L(n=t=new Gc,0,2,r=Nl(e.customGesturesClassifierOptions,gi(this.i,Gc,4)?.l())),L(this.i,0,4,t)):e.customGesturesClassifierOptions===void 0&&gi(this.i,Gc,4)?.h(),this.l(e)}Ya(e,t){return nf(this),Rd(this,e,t),rf(this)}Za(e,t,n){return nf(this),zd(this,e,n,t),rf(this)}u(){var e=new tc;$s(e,`image_in`),$s(e,`norm_rect`),ec(e,`hand_gestures`),ec(e,`hand_landmarks`),ec(e,`world_hand_landmarks`),ec(e,`handedness`);var t=new Us;Qa(t,nl,this.m);var n=new Js;Mi(n,2,`mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph`),Ks(n,`IMAGE:image_in`),Ks(n,`NORM_RECT:norm_rect`),qs(n,`HAND_GESTURES:hand_gestures`),qs(n,`LANDMARKS:hand_landmarks`),qs(n,`WORLD_LANDMARKS:world_hand_landmarks`),qs(n,`HANDEDNESS:handedness`),n.A(t),Qs(e,n),this.h.attachProtoVectorListener(`hand_landmarks`,(e,t)=>{for(let t of e)e=hc(t),this.landmarks.push(Rl(e));G(this,t)}),this.h.attachEmptyPacketListener(`hand_landmarks`,e=>{G(this,e)}),this.h.attachProtoVectorListener(`world_hand_landmarks`,(e,t)=>{for(let t of e)e=pc(t),this.worldLandmarks.push(zl(e));G(this,t)}),this.h.attachEmptyPacketListener(`world_hand_landmarks`,e=>{G(this,e)}),this.h.attachProtoVectorListener(`hand_gestures`,(e,t)=>{this.gestures.push(...af(e,!1)),G(this,t)}),this.h.attachEmptyPacketListener(`hand_gestures`,e=>{G(this,e)}),this.h.attachProtoVectorListener(`handedness`,(e,t)=>{this.handedness.push(...af(e)),G(this,t)}),this.h.attachEmptyPacketListener(`handedness`,e=>{G(this,e)}),e=e.h(),this.setGraph(new Uint8Array(e),!0)}};function sf(e){return{landmarks:e.landmarks,worldLandmarks:e.worldLandmarks,handednesses:e.handedness,handedness:e.handedness}}of.prototype.recognizeForVideo=of.prototype.Za,of.prototype.recognize=of.prototype.Ya,of.prototype.setOptions=of.prototype.A,of.createFromModelPath=function(e,t){return Id(of,e,{baseOptions:{modelAssetPath:t}})},of.createFromModelBuffer=function(e,t){return Id(of,e,{baseOptions:{modelAssetBuffer:t}})},of.createFromOptions=function(e,t){return Id(of,e,t)},of.HAND_CONNECTIONS=tf,Ye(`module$exports$google3$third_party$mediapipe$tasks$web$vision$gesture_recognizer$gesture_recognizer.GestureRecognizer.HAND_CONNECTIONS`,of.HAND_CONNECTIONS);var cf=class extends Vd{constructor(e,t){super(new Fd(e,t),`image_in`,`norm_rect`,!1),this.landmarks=[],this.worldLandmarks=[],this.handedness=[],L(e=this.i=new Xc,0,1,t=new Nc),this.v=new Yc,L(this.i,0,3,this.v),this.m=new Jc,L(this.i,0,2,this.m),Oi(this.m,3,1),R(this.m,2,.5),R(this.v,2,.5),R(this.i,4,.5)}D(){return`HandLandmarker`}get baseOptions(){return gi(this.i,Nc,1)}set baseOptions(e){L(this.i,0,1,e)}A(e){return`numHands`in e&&Oi(this.m,3,e.numHands??1),`minHandDetectionConfidence`in e&&R(this.m,2,e.minHandDetectionConfidence??.5),`minTrackingConfidence`in e&&R(this.i,4,e.minTrackingConfidence??.5),`minHandPresenceConfidence`in e&&R(this.v,2,e.minHandPresenceConfidence??.5),this.l(e)}H(e,t){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],Rd(this,e,t),sf(this)}I(e,t,n){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],zd(this,e,n,t),sf(this)}u(){var e=new tc;$s(e,`image_in`),$s(e,`norm_rect`),ec(e,`hand_landmarks`),ec(e,`world_hand_landmarks`),ec(e,`handedness`);var t=new Us;Qa(t,rl,this.i);var n=new Js;Mi(n,2,`mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph`),Ks(n,`IMAGE:image_in`),Ks(n,`NORM_RECT:norm_rect`),qs(n,`LANDMARKS:hand_landmarks`),qs(n,`WORLD_LANDMARKS:world_hand_landmarks`),qs(n,`HANDEDNESS:handedness`),n.A(t),Qs(e,n),this.h.attachProtoVectorListener(`hand_landmarks`,(e,t)=>{for(let t of e)e=hc(t),this.landmarks.push(Rl(e));G(this,t)}),this.h.attachEmptyPacketListener(`hand_landmarks`,e=>{G(this,e)}),this.h.attachProtoVectorListener(`world_hand_landmarks`,(e,t)=>{for(let t of e)e=pc(t),this.worldLandmarks.push(zl(e));G(this,t)}),this.h.attachEmptyPacketListener(`world_hand_landmarks`,e=>{G(this,e)}),this.h.attachProtoVectorListener(`handedness`,(e,t)=>{var n=this.handedness,r=n.push,i=[];for(let t of e){e=sc(t);let n=[];for(let t of e.h())n.push({score:Ti(t,2)??0,index:wi(t,1)??0??-1,categoryName:dr(Zr(t,3))??``??``,displayName:dr(Zr(t,4))??``??``});i.push(n)}r.call(n,...i),G(this,t)}),this.h.attachEmptyPacketListener(`handedness`,e=>{G(this,e)}),e=e.h(),this.setGraph(new Uint8Array(e),!0)}};cf.prototype.detectForVideo=cf.prototype.I,cf.prototype.detect=cf.prototype.H,cf.prototype.setOptions=cf.prototype.A,cf.createFromModelPath=function(e,t){return Id(cf,e,{baseOptions:{modelAssetPath:t}})},cf.createFromModelBuffer=function(e,t){return Id(cf,e,{baseOptions:{modelAssetBuffer:t}})},cf.createFromOptions=function(e,t){return Id(cf,e,t)},cf.HAND_CONNECTIONS=tf,Ye(`module$exports$google3$third_party$mediapipe$tasks$web$vision$hand_landmarker$hand_landmarker.HandLandmarker.HAND_CONNECTIONS`,cf.HAND_CONNECTIONS);var lf=Md([0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]);function uf(e){e.i={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]}}function df(e){try{if(!e.G)return e.i;e.G(e.i)}finally{Vu(e)}}function ff(e,t){e=hc(e),t.push(Rl(e))}var K=class extends Vd{constructor(e,t){super(new Fd(e,t),`input_frames_image`,null,!1),this.i={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]},this.outputPoseSegmentationMasks=this.outputFaceBlendshapes=!1,L(e=this.m=new sl,0,1,t=new Nc),this.Z=new Yc,L(this.m,0,2,this.Z),this.Ba=new il,L(this.m,0,3,this.Ba),this.v=new Lc,L(this.m,0,4,this.v),this.P=new Vc,L(this.m,0,5,this.P),this.C=new al,L(this.m,0,6,this.C),this.aa=new ol,L(this.m,0,7,this.aa),R(this.v,2,.5),R(this.v,3,.3),R(this.P,2,.5),R(this.C,2,.5),R(this.C,3,.3),R(this.aa,2,.5),R(this.Z,2,.5)}D(){return`HolisticLandmarker`}get baseOptions(){return gi(this.m,Nc,1)}set baseOptions(e){L(this.m,0,1,e)}A(e){return`minFaceDetectionConfidence`in e&&R(this.v,2,e.minFaceDetectionConfidence??.5),`minFaceSuppressionThreshold`in e&&R(this.v,3,e.minFaceSuppressionThreshold??.3),`minFacePresenceConfidence`in e&&R(this.P,2,e.minFacePresenceConfidence??.5),`outputFaceBlendshapes`in e&&(this.outputFaceBlendshapes=!!e.outputFaceBlendshapes),`minPoseDetectionConfidence`in e&&R(this.C,2,e.minPoseDetectionConfidence??.5),`minPoseSuppressionThreshold`in e&&R(this.C,3,e.minPoseSuppressionThreshold??.3),`minPosePresenceConfidence`in e&&R(this.aa,2,e.minPosePresenceConfidence??.5),`outputPoseSegmentationMasks`in e&&(this.outputPoseSegmentationMasks=!!e.outputPoseSegmentationMasks),`minHandLandmarksConfidence`in e&&R(this.Z,2,e.minHandLandmarksConfidence??.5),this.l(e)}H(e,t,n){var r=typeof t==`function`?{}:t;return this.G=typeof t==`function`?t:n,uf(this),Rd(this,e,r),df(this)}I(e,t,n,r){var i=typeof n==`function`?{}:n;return this.G=typeof n==`function`?n:r,uf(this),zd(this,e,i,t),df(this)}u(){var e=new tc;$s(e,`input_frames_image`),ec(e,`pose_landmarks`),ec(e,`pose_world_landmarks`),ec(e,`face_landmarks`),ec(e,`left_hand_landmarks`),ec(e,`left_hand_world_landmarks`),ec(e,`right_hand_landmarks`),ec(e,`right_hand_world_landmarks`);var t=new Us,n=new Cs;Mi(n,1,`type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions`),function(e,t){if(t!=null){if(Array.isArray(t))I(e,2,Nr(t,0,Fr));else{if(!(typeof t==`string`||t instanceof Et||xt(t)))throw Error(`invalid value in Any.value field: `+t+` expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array`);li(e,2,rn(t,!1),Ct())}}}(n,this.m.h());var r=new Js;Mi(r,2,`mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph`),Ci(r,8,Cs,n),Ks(r,`IMAGE:input_frames_image`),qs(r,`POSE_LANDMARKS:pose_landmarks`),qs(r,`POSE_WORLD_LANDMARKS:pose_world_landmarks`),qs(r,`FACE_LANDMARKS:face_landmarks`),qs(r,`LEFT_HAND_LANDMARKS:left_hand_landmarks`),qs(r,`LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks`),qs(r,`RIGHT_HAND_LANDMARKS:right_hand_landmarks`),qs(r,`RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks`),r.A(t),Qs(e,r),zu(this,e),this.h.attachProtoListener(`pose_landmarks`,(e,t)=>{ff(e,this.i.poseLandmarks),G(this,t)}),this.h.attachEmptyPacketListener(`pose_landmarks`,e=>{G(this,e)}),this.h.attachProtoListener(`pose_world_landmarks`,(e,t)=>{var n=this.i.poseWorldLandmarks;e=pc(e),n.push(zl(e)),G(this,t)}),this.h.attachEmptyPacketListener(`pose_world_landmarks`,e=>{G(this,e)}),this.outputPoseSegmentationMasks&&(qs(r,`POSE_SEGMENTATION_MASK:pose_segmentation_mask`),Bu(this,`pose_segmentation_mask`),this.h.ha(`pose_segmentation_mask`,(e,t)=>{this.i.poseSegmentationMasks=[Bd(this,e,!0,!this.G)],G(this,t)}),this.h.attachEmptyPacketListener(`pose_segmentation_mask`,e=>{this.i.poseSegmentationMasks=[],G(this,e)})),this.h.attachProtoListener(`face_landmarks`,(e,t)=>{ff(e,this.i.faceLandmarks),G(this,t)}),this.h.attachEmptyPacketListener(`face_landmarks`,e=>{G(this,e)}),this.outputFaceBlendshapes&&(ec(e,`extra_blendshapes`),qs(r,`FACE_BLENDSHAPES:extra_blendshapes`),this.h.attachProtoListener(`extra_blendshapes`,(e,t)=>{var n=this.i.faceBlendshapes;this.outputFaceBlendshapes&&(e=sc(e),n.push(Fl(e.h()??[]))),G(this,t)}),this.h.attachEmptyPacketListener(`extra_blendshapes`,e=>{G(this,e)})),this.h.attachProtoListener(`left_hand_landmarks`,(e,t)=>{ff(e,this.i.leftHandLandmarks),G(this,t)}),this.h.attachEmptyPacketListener(`left_hand_landmarks`,e=>{G(this,e)}),this.h.attachProtoListener(`left_hand_world_landmarks`,(e,t)=>{var n=this.i.leftHandWorldLandmarks;e=pc(e),n.push(zl(e)),G(this,t)}),this.h.attachEmptyPacketListener(`left_hand_world_landmarks`,e=>{G(this,e)}),this.h.attachProtoListener(`right_hand_landmarks`,(e,t)=>{ff(e,this.i.rightHandLandmarks),G(this,t)}),this.h.attachEmptyPacketListener(`right_hand_landmarks`,e=>{G(this,e)}),this.h.attachProtoListener(`right_hand_world_landmarks`,(e,t)=>{var n=this.i.rightHandWorldLandmarks;e=pc(e),n.push(zl(e)),G(this,t)}),this.h.attachEmptyPacketListener(`right_hand_world_landmarks`,e=>{G(this,e)}),e=e.h(),this.setGraph(new Uint8Array(e),!0)}};K.prototype.detectForVideo=K.prototype.I,K.prototype.detect=K.prototype.H,K.prototype.setOptions=K.prototype.A,K.createFromModelPath=function(e,t){return Id(K,e,{baseOptions:{modelAssetPath:t}})},K.createFromModelBuffer=function(e,t){return Id(K,e,{baseOptions:{modelAssetBuffer:t}})},K.createFromOptions=function(e,t){return Id(K,e,t)},K.HAND_CONNECTIONS=tf,Ye(`module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.HAND_CONNECTIONS`,K.HAND_CONNECTIONS),K.POSE_CONNECTIONS=lf,Ye(`module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.POSE_CONNECTIONS`,K.POSE_CONNECTIONS),K.FACE_LANDMARKS_LIPS=Ud,Ye(`module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_LIPS`,K.FACE_LANDMARKS_LIPS),K.FACE_LANDMARKS_LEFT_EYE=Wd,Ye(`module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_LEFT_EYE`,K.FACE_LANDMARKS_LEFT_EYE),K.FACE_LANDMARKS_LEFT_EYEBROW=Gd,Ye(`module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_LEFT_EYEBROW`,K.FACE_LANDMARKS_LEFT_EYEBROW),K.FACE_LANDMARKS_LEFT_IRIS=Kd,Ye(`module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_LEFT_IRIS`,K.FACE_LANDMARKS_LEFT_IRIS),K.FACE_LANDMARKS_RIGHT_EYE=qd,Ye(`module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_RIGHT_EYE`,K.FACE_LANDMARKS_RIGHT_EYE),K.FACE_LANDMARKS_RIGHT_EYEBROW=Jd,Ye(`module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW`,K.FACE_LANDMARKS_RIGHT_EYEBROW),K.FACE_LANDMARKS_RIGHT_IRIS=Yd,Ye(`module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_RIGHT_IRIS`,K.FACE_LANDMARKS_RIGHT_IRIS),K.FACE_LANDMARKS_FACE_OVAL=Xd,Ye(`module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_FACE_OVAL`,K.FACE_LANDMARKS_FACE_OVAL),K.FACE_LANDMARKS_CONTOURS=Zd,Ye(`module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_CONTOURS`,K.FACE_LANDMARKS_CONTOURS),K.FACE_LANDMARKS_TESSELATION=Qd,Ye(`module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_TESSELATION`,K.FACE_LANDMARKS_TESSELATION);var pf=class extends Vd{constructor(e,t){super(new Fd(e,t),`input_image`,`norm_rect`,!0),this.m={classifications:[]},L(e=this.i=new ul,0,1,t=new Nc)}D(){return`ImageClassifier`}get baseOptions(){return gi(this.i,Nc,1)}set baseOptions(e){L(this.i,0,1,e)}A(e){return L(this.i,0,2,Nl(e,gi(this.i,Ec,2))),this.l(e)}Ha(e,t){return this.m={classifications:[]},Rd(this,e,t),this.m}Ia(e,t,n){return this.m={classifications:[]},zd(this,e,n,t),this.m}u(){var e=new tc;$s(e,`input_image`),$s(e,`norm_rect`),ec(e,`classifications`);var t=new Us;Qa(t,dl,this.i);var n=new Js;Mi(n,2,`mediapipe.tasks.vision.image_classifier.ImageClassifierGraph`),Ks(n,`IMAGE:input_image`),Ks(n,`NORM_RECT:norm_rect`),qs(n,`CLASSIFICATIONS:classifications`),n.A(t),Qs(e,n),this.h.attachProtoListener(`classifications`,(e,t)=>{this.m=Il(bc(e)),G(this,t)}),this.h.attachEmptyPacketListener(`classifications`,e=>{G(this,e)}),e=e.h(),this.setGraph(new Uint8Array(e),!0)}};pf.prototype.classifyForVideo=pf.prototype.Ia,pf.prototype.classify=pf.prototype.Ha,pf.prototype.setOptions=pf.prototype.A,pf.createFromModelPath=function(e,t){return Id(pf,e,{baseOptions:{modelAssetPath:t}})},pf.createFromModelBuffer=function(e,t){return Id(pf,e,{baseOptions:{modelAssetBuffer:t}})},pf.createFromOptions=function(e,t){return Id(pf,e,t)};var mf=class extends Vd{constructor(e,t){super(new Fd(e,t),`image_in`,`norm_rect`,!0),this.i=new fl,this.embeddings={embeddings:[]},L(e=this.i,0,1,t=new Nc)}D(){return`ImageEmbedder`}get baseOptions(){return gi(this.i,Nc,1)}set baseOptions(e){L(this.i,0,1,e)}A(e){var t=this.i,n=gi(this.i,Oc,2);if(n=n?n.clone():new Oc,e.l2Normalize!==void 0){var r=e.l2Normalize;I(n,1,r==null?r:Gn(r))}else`l2Normalize`in e&&I(n,1);return e.quantize===void 0?`quantize`in e&&I(n,2):I(n,2,(r=e.quantize)==null?r:Gn(r)),L(t,0,2,n),this.l(e)}Oa(e,t){return Rd(this,e,t),this.embeddings}Pa(e,t,n){return zd(this,e,n,t),this.embeddings}u(){var e=new tc;$s(e,`image_in`),$s(e,`norm_rect`),ec(e,`embeddings_out`);var t=new Us;Qa(t,pl,this.i);var n=new Js;Mi(n,2,`mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph`),Ks(n,`IMAGE:image_in`),Ks(n,`NORM_RECT:norm_rect`),qs(n,`EMBEDDINGS:embeddings_out`),n.A(t),Qs(e,n),this.h.attachProtoListener(`embeddings_out`,(e,t)=>{e=Tc(e),this.embeddings=function(e){return{embeddings:vi(e,Cc,1).map(e=>{var t={headIndex:wi(e,3)??0??-1,headName:dr(Zr(e,4))??``??``};if(ti(e,1,wc))e=ni(e=Ei(e,xc,1,wc),1,Wn),t.floatEmbedding=e.slice();else{let n=new Uint8Array;t.quantizedEmbedding=Ei(e,Sc,2,wc)?.h()?.i()??n}return t}),timestampMs:Pl(Zr(e,2,void 0,or)??Yr)}}(e),G(this,t)}),this.h.attachEmptyPacketListener(`embeddings_out`,e=>{G(this,e)}),e=e.h(),this.setGraph(new Uint8Array(e),!0)}};mf.cosineSimilarity=function(e,t){if(e.floatEmbedding&&t.floatEmbedding)e=Vl(e.floatEmbedding,t.floatEmbedding);else{if(!e.quantizedEmbedding||!t.quantizedEmbedding)throw Error(`Cannot compute cosine similarity between quantized and float embeddings.`);e=Vl(Bl(e.quantizedEmbedding),Bl(t.quantizedEmbedding))}return e},mf.prototype.embedForVideo=mf.prototype.Pa,mf.prototype.embed=mf.prototype.Oa,mf.prototype.setOptions=mf.prototype.A,mf.createFromModelPath=function(e,t){return Id(mf,e,{baseOptions:{modelAssetPath:t}})},mf.createFromModelBuffer=function(e,t){return Id(mf,e,{baseOptions:{modelAssetBuffer:t}})},mf.createFromOptions=function(e,t){return Id(mf,e,t)};var hf=class{constructor(e,t,n){this.confidenceMasks=e,this.categoryMask=t,this.qualityScores=n}close(){this.confidenceMasks?.forEach(e=>{e.close()}),this.categoryMask?.close()}};function gf(e){var t=function(e){return vi(e,Js,1)}(e.ka()).filter(e=>(dr(Zr(e,1))??``).includes(`mediapipe.tasks.TensorsToSegmentationCalculator`));if(e.v=[],t.length>1)throw Error(`The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.`);t.length===1&&(gi(t[0],Us,7)?.u()?.h()??new Map).forEach((t,n)=>{e.v[Number(n)]=dr(Zr(t,1))??``})}function _f(e){e.categoryMask=void 0,e.confidenceMasks=void 0,e.qualityScores=void 0}function vf(e){try{let t=new hf(e.confidenceMasks,e.categoryMask,e.qualityScores);if(!e.m)return t;e.m(t)}finally{Vu(e)}}hf.prototype.close=hf.prototype.close;var yf=class extends Vd{constructor(e,t){super(new Fd(e,t),`image_in`,`norm_rect`,!1),this.v=[],this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.i=new vl,this.C=new ml,L(this.i,0,3,this.C),L(e=this.i,0,1,t=new Nc)}D(){return`ImageSegmenter`}get baseOptions(){return gi(this.i,Nc,1)}set baseOptions(e){L(this.i,0,1,e)}A(e){return e.displayNamesLocale===void 0?`displayNamesLocale`in e&&I(this.i,2):I(this.i,2,ur(e.displayNamesLocale)),`outputCategoryMask`in e&&(this.outputCategoryMask=e.outputCategoryMask??!1),`outputConfidenceMasks`in e&&(this.outputConfidenceMasks=e.outputConfidenceMasks??!0),super.l(e)}M(){gf(this)}segment(e,t,n){var r=typeof t==`function`?{}:t;return this.m=typeof t==`function`?t:n,_f(this),Rd(this,e,r),vf(this)}fb(e,t,n,r){var i=typeof n==`function`?{}:n;return this.m=typeof n==`function`?n:r,_f(this),zd(this,e,i,t),vf(this)}Sa(){return this.v}u(){var e=new tc;$s(e,`image_in`),$s(e,`norm_rect`);var t=new Us;Qa(t,yl,this.i);var n=new Js;Mi(n,2,`mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph`),Ks(n,`IMAGE:image_in`),Ks(n,`NORM_RECT:norm_rect`),n.A(t),Qs(e,n),zu(this,e),this.outputConfidenceMasks&&(ec(e,`confidence_masks`),qs(n,`CONFIDENCE_MASKS:confidence_masks`),Bu(this,`confidence_masks`),this.h.ia(`confidence_masks`,(e,t)=>{this.confidenceMasks=e.map(e=>Bd(this,e,!0,!this.m)),G(this,t)}),this.h.attachEmptyPacketListener(`confidence_masks`,e=>{this.confidenceMasks=[],G(this,e)})),this.outputCategoryMask&&(ec(e,`category_mask`),qs(n,`CATEGORY_MASK:category_mask`),Bu(this,`category_mask`),this.h.ha(`category_mask`,(e,t)=>{this.categoryMask=Bd(this,e,!1,!this.m),G(this,t)}),this.h.attachEmptyPacketListener(`category_mask`,e=>{this.categoryMask=void 0,G(this,e)})),ec(e,`quality_scores`),qs(n,`QUALITY_SCORES:quality_scores`),this.h.attachFloatVectorListener(`quality_scores`,(e,t)=>{this.qualityScores=e,G(this,t)}),this.h.attachEmptyPacketListener(`quality_scores`,e=>{this.categoryMask=void 0,G(this,e)}),e=e.h(),this.setGraph(new Uint8Array(e),!0)}};yf.prototype.getLabels=yf.prototype.Sa,yf.prototype.segmentForVideo=yf.prototype.fb,yf.prototype.segment=yf.prototype.segment,yf.prototype.setOptions=yf.prototype.A,yf.createFromModelPath=function(e,t){return Id(yf,e,{baseOptions:{modelAssetPath:t}})},yf.createFromModelBuffer=function(e,t){return Id(yf,e,{baseOptions:{modelAssetBuffer:t}})},yf.createFromOptions=function(e,t){return Id(yf,e,t)};var bf={0:0,1:1,2:2,3:3};function xf(){return Su()?void 0:document.createElement(`canvas`)}var Sf=class extends Hu{constructor(e,t){super(new Nu(e,t)),this.v=new Qu,this.delegate=`CPU`,this.i=0,this.baseOptions=new Nc,this.C=this.m=0}D(){return`InteractiveSegmenter`}get j(){return this.h.j}A(e){return this.delegate=e.baseOptions?.delegate??`CPU`,super.l(e)}gb(e){if(this.i===0)throw Error(`Segmenter is not initialized.`);var t;if(this.m!==0&&(this.j._free(this.m),this.m=0),!(t=typeof ImageData<`u`&&e instanceof ImageData)){if(typeof e!=`object`||!e)t=!1;else{t=e.data;var n=e.width,r=e.height;t=Number.isInteger(n)&&n>0&&Number.isInteger(r)&&r>0&&(t instanceof Uint8ClampedArray||t instanceof Uint8Array)}}if(t)t=e.width,n=e.height,e=e.data;else{if([t,n]=wu(e),typeof OffscreenCanvas<`u`)r=new OffscreenCanvas(t,n);else{if(typeof document>`u`)throw Error(`Canvas is not supported in this environment.`);r=document.createElement(`canvas`)}if(r.width=t,r.height=n,!(r=r.getContext(`2d`)))throw Error(`Canvas 2D context is not supported in this environment.`);r.drawImage(e,0,0),e=r.getImageData(0,0,t,n).data}if(!e)throw Error(`Unsupported image source or failed to extract image pixels.`);r=function({Xa:e,width:t,height:n}){if(t<=0||n<=0)throw Error(`Invalid image dimensions: ${t}x${n}. Dimensions must be positive.`);if(e%(t*n)!==0)throw Error(`Invalid image dimensions or pixel data length. Pixel data length ${e} is not a multiple of the number of pixels (${t*n}).`);if((e/=t*n)!==4&&e!==3&&e!==1)throw Error(`Invalid image dimensions or pixel data length. Calculated channels: ${e}. Expected 1, 3, or 4.`);return e}({Xa:e.length,width:t,height:n});var i=this.j._malloc(e.length);if(this.j.HEAPU8.set(e,i),this.m=i,!this.j._interactive_segmenter_set_image(this.i,i,t,n,r))throw Error(`Failed to set image on native engine.`)}segment(e){if(this.i===0)throw Error(`Segmenter is not initialized.`);var t=function(e){e=e.map(({isCompleted:e,brushMode:t,point:n})=>{t=bf[t]??0,n=n.map(({x:e,y:t})=>{var n=new bl;return ji(n,1,e),ji(n,2,t),n});var r=new xl;return Di(r,e),li(r,1,Jn(t),0),xi(r,2,n),r});var t=new Sl;return xi(t,1,e),Cl(t)}(e);e=this.j._malloc(t.length),this.j.HEAPU8.set(t,e);var n=this.j._malloc(12),r=n+4,i=n+8,a=0,o=this.C++;try{if(this.o){if(this.delegate===`GPU`){var s=this.o;++s.h.U,s.i.set(o,performance.now())}else{var c=this.o;++c.h.R,c.i.set(o,performance.now())}}if((a=this.j._interactive_segmenter_segment(this.i,e,t.length,n,r,i))===0)throw Error(`Segmentation failed.`);this.o?.Aa(o);let u=this.j.HEAPU32[n/4],d=this.j.HEAPU32[r/4],f=new Float32Array(this.j.HEAPU8.buffer,a,this.j.HEAPU32[i/4]/4);var l=new Float32Array(f);if(s=u*d,(l instanceof Uint8Array||l instanceof Float32Array)&&l.length!==s)throw Error(`Unsupported channel count: `+l.length/s);return new ud([l],!0,!1,this.h.j.canvas??void 0,this.v,u,d)}finally{e!==0&&this.j._free(e),n!==0&&this.j._free(n),a!==0&&this.j._free(a)}}u(){this.i!==0&&(this.o?.ya(),this.j._interactive_segmenter_close(this.i),this.i=0),this.m!==0&&(this.j._free(this.m),this.m=0);var e=new Ac;if(this.delegate===`GPU`){var t=new Ms;bi(e,2,jc,t)}else Oi(t=new Vs,1,4),bi(e,1,jc,t);if(L(this.baseOptions,0,3,e),e=Ic(this.baseOptions),t=this.j._malloc(e.length),this.j.HEAPU8.set(e,t),this.i=this.j._interactive_segmenter_create(t,e.length),this.j._free(t),this.i===0)throw Error(`Failed to create native InteractiveSegmenter engine.`);this.o?.za()}close(){this.i!==0&&(this.j._interactive_segmenter_close(this.i),this.i=0),this.m!==0&&(this.j._free(this.m),this.m=0),this.v.close(),super.close()}};Sf.prototype.close=Sf.prototype.close,Sf.prototype.segment=Sf.prototype.segment,Sf.prototype.setImage=Sf.prototype.gb,Sf.prototype.setOptions=Sf.prototype.A,Sf.createFromModelPath=function(e,t){return Fu(Sf,xf(),e,{baseOptions:{modelAssetPath:t}})},Sf.createFromModelBuffer=function(e,t){return Fu(Sf,xf(),e,{baseOptions:{modelAssetBuffer:t}})},Sf.createFromOptions=function(e,t){return Fu(Sf,t.canvas??xf(),e,t)};var Cf=class{constructor(e,t,n){this.confidenceMasks=e,this.categoryMask=t,this.qualityScores=n}close(){this.confidenceMasks?.forEach(e=>{e.close()}),this.categoryMask?.close()}};Cf.prototype.close=Cf.prototype.close;var wf=class extends Vd{constructor(e,t){super(new Fd(e,t),`image_in`,`norm_rect_in`,!1),this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.i=new vl,this.v=new ml,L(this.i,0,3,this.v),L(e=this.i,0,1,t=new Nc)}D(){return`InteractiveSegmenterLegacy`}get baseOptions(){return gi(this.i,Nc,1)}set baseOptions(e){L(this.i,0,1,e)}A(e){return`outputCategoryMask`in e&&(this.outputCategoryMask=e.outputCategoryMask??!1),`outputConfidenceMasks`in e&&(this.outputConfidenceMasks=e.outputConfidenceMasks??!0),super.l(e)}segment(e,t,n,r){var i=typeof n==`function`?{}:n;if(this.m=typeof n==`function`?n:r,this.qualityScores=this.categoryMask=this.confidenceMasks=void 0,n=this.J+1,r=new Dl,t.keypoint&&t.scribble)throw Error(`Cannot provide both keypoint and scribble.`);if(t.keypoint){var a=new wl;Di(a,!0),ji(a,1,t.keypoint.x),ji(a,2,t.keypoint.y),bi(r,1,Ol,a)}else{if(!t.scribble)throw Error(`Must provide either a keypoint or a scribble.`);{let e=new El;for(a of t.scribble)Di(t=new wl,!0),ji(t,1,a.x),ji(t,2,a.y),Ci(e,1,wl,t);bi(r,2,Ol,e)}}this.h.addProtoToStream(r.h(),`mediapipe.tasks.vision.interactive_segmenter_legacy.proto.RegionOfInterest`,`roi_in`,n),Rd(this,e,i);t:{try{let e=new Cf(this.confidenceMasks,this.categoryMask,this.qualityScores);if(!this.m){var o=e;break t}this.m(e)}finally{Vu(this)}o=void 0}return o}u(){var e=new tc;$s(e,`image_in`),$s(e,`roi_in`),$s(e,`norm_rect_in`);var t=new Us;Qa(t,yl,this.i);var n=new Js;Mi(n,2,`mediapipe.tasks.vision.interactive_segmenter_legacy.InteractiveSegmenterLegacyGraph`),Ks(n,`IMAGE:image_in`),Ks(n,`ROI:roi_in`),Ks(n,`NORM_RECT:norm_rect_in`),n.A(t),Qs(e,n),zu(this,e),this.outputConfidenceMasks&&(ec(e,`confidence_masks`),qs(n,`CONFIDENCE_MASKS:confidence_masks`),Bu(this,`confidence_masks`),this.h.ia(`confidence_masks`,(e,t)=>{this.confidenceMasks=e.map(e=>Bd(this,e,!0,!this.m)),G(this,t)}),this.h.attachEmptyPacketListener(`confidence_masks`,e=>{this.confidenceMasks=[],G(this,e)})),this.outputCategoryMask&&(ec(e,`category_mask`),qs(n,`CATEGORY_MASK:category_mask`),Bu(this,`category_mask`),this.h.ha(`category_mask`,(e,t)=>{this.categoryMask=Bd(this,e,!1,!this.m),G(this,t)}),this.h.attachEmptyPacketListener(`category_mask`,e=>{this.categoryMask=void 0,G(this,e)})),ec(e,`quality_scores`),qs(n,`QUALITY_SCORES:quality_scores`),this.h.attachFloatVectorListener(`quality_scores`,(e,t)=>{this.qualityScores=e,G(this,t)}),this.h.attachEmptyPacketListener(`quality_scores`,e=>{this.categoryMask=void 0,G(this,e)}),e=e.h(),this.setGraph(new Uint8Array(e),!0)}};wf.prototype.segment=wf.prototype.segment,wf.prototype.setOptions=wf.prototype.A,wf.createFromModelPath=function(e,t){return Id(wf,e,{baseOptions:{modelAssetPath:t}})},wf.createFromModelBuffer=function(e,t){return Id(wf,e,{baseOptions:{modelAssetBuffer:t}})},wf.createFromOptions=function(e,t){return Id(wf,e,t)};var Tf=class extends Vd{constructor(e,t){super(new Fd(e,t),`input_frame_gpu`,`norm_rect`,!1),this.m={detections:[]},L(e=this.i=new kl,0,1,t=new Nc)}D(){return`ObjectDetector`}get baseOptions(){return gi(this.i,Nc,1)}set baseOptions(e){L(this.i,0,1,e)}A(e){return e.displayNamesLocale===void 0?`displayNamesLocale`in e&&I(this.i,2):I(this.i,2,ur(e.displayNamesLocale)),e.maxResults===void 0?`maxResults`in e&&I(this.i,3):Oi(this.i,3,e.maxResults),e.scoreThreshold===void 0?`scoreThreshold`in e&&I(this.i,4):R(this.i,4,e.scoreThreshold),e.categoryAllowlist===void 0?`categoryAllowlist`in e&&I(this.i,5):Ni(this.i,5,e.categoryAllowlist),e.categoryDenylist===void 0?`categoryDenylist`in e&&I(this.i,6):Ni(this.i,6,e.categoryDenylist),this.l(e)}H(e,t){return this.m={detections:[]},Rd(this,e,t),this.m}I(e,t,n){return this.m={detections:[]},zd(this,e,n,t),this.m}u(){var e=new tc;$s(e,`input_frame_gpu`),$s(e,`norm_rect`),ec(e,`detections`);var t=new Us;Qa(t,Al,this.i);var n=new Js;Mi(n,2,`mediapipe.tasks.vision.ObjectDetectorGraph`),Ks(n,`IMAGE:input_frame_gpu`),Ks(n,`NORM_RECT:norm_rect`),qs(n,`DETECTIONS:detections`),n.A(t),Qs(e,n),this.h.attachProtoVectorListener(`detections`,(e,t)=>{for(let t of e)e=dc(t),this.m.detections.push(Ll(e));G(this,t)}),this.h.attachEmptyPacketListener(`detections`,e=>{G(this,e)}),e=e.h(),this.setGraph(new Uint8Array(e),!0)}};Tf.prototype.detectForVideo=Tf.prototype.I,Tf.prototype.detect=Tf.prototype.H,Tf.prototype.setOptions=Tf.prototype.A,Tf.createFromModelPath=async function(e,t){return Id(Tf,e,{baseOptions:{modelAssetPath:t}})},Tf.createFromModelBuffer=function(e,t){return Id(Tf,e,{baseOptions:{modelAssetBuffer:t}})},Tf.createFromOptions=function(e,t){return Id(Tf,e,t)};var Ef=class{constructor(e,t,n){this.landmarks=e,this.worldLandmarks=t,this.segmentationMasks=n}close(){this.segmentationMasks?.forEach(e=>{e.close()})}};function Df(e){e.landmarks=[],e.worldLandmarks=[],e.segmentationMasks=void 0}function Of(e){try{let t=new Ef(e.landmarks,e.worldLandmarks,e.segmentationMasks);if(!e.v)return t;e.v(t)}finally{Vu(e)}}Ef.prototype.close=Ef.prototype.close;var kf=class extends Vd{constructor(e,t){super(new Fd(e,t),`image_in`,`norm_rect`,!1),this.landmarks=[],this.worldLandmarks=[],this.outputSegmentationMasks=!1,L(e=this.i=new jl,0,1,t=new Nc),this.C=new ol,L(this.i,0,3,this.C),this.m=new al,L(this.i,0,2,this.m),Oi(this.m,4,1),R(this.m,2,.5),R(this.C,2,.5),R(this.i,4,.5)}D(){return`PoseLandmarker`}get baseOptions(){return gi(this.i,Nc,1)}set baseOptions(e){L(this.i,0,1,e)}A(e){return`numPoses`in e&&Oi(this.m,4,e.numPoses??1),`minPoseDetectionConfidence`in e&&R(this.m,2,e.minPoseDetectionConfidence??.5),`minTrackingConfidence`in e&&R(this.i,4,e.minTrackingConfidence??.5),`minPosePresenceConfidence`in e&&R(this.C,2,e.minPosePresenceConfidence??.5),`outputSegmentationMasks`in e&&(this.outputSegmentationMasks=e.outputSegmentationMasks??!1),this.l(e)}H(e,t,n){var r=typeof t==`function`?{}:t;return this.v=typeof t==`function`?t:n,Df(this),Rd(this,e,r),Of(this)}I(e,t,n,r){var i=typeof n==`function`?{}:n;return this.v=typeof n==`function`?n:r,Df(this),zd(this,e,i,t),Of(this)}u(){var e=new tc;$s(e,`image_in`),$s(e,`norm_rect`),ec(e,`normalized_landmarks`),ec(e,`world_landmarks`),ec(e,`segmentation_masks`);var t=new Us;Qa(t,Ml,this.i);var n=new Js;Mi(n,2,`mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph`),Ks(n,`IMAGE:image_in`),Ks(n,`NORM_RECT:norm_rect`),qs(n,`NORM_LANDMARKS:normalized_landmarks`),qs(n,`WORLD_LANDMARKS:world_landmarks`),n.A(t),Qs(e,n),zu(this,e),this.h.attachProtoVectorListener(`normalized_landmarks`,(e,t)=>{this.landmarks=[];for(let t of e)e=hc(t),this.landmarks.push(Rl(e));G(this,t)}),this.h.attachEmptyPacketListener(`normalized_landmarks`,e=>{this.landmarks=[],G(this,e)}),this.h.attachProtoVectorListener(`world_landmarks`,(e,t)=>{this.worldLandmarks=[];for(let t of e)e=pc(t),this.worldLandmarks.push(zl(e));G(this,t)}),this.h.attachEmptyPacketListener(`world_landmarks`,e=>{this.worldLandmarks=[],G(this,e)}),this.outputSegmentationMasks&&(qs(n,`SEGMENTATION_MASK:segmentation_masks`),Bu(this,`segmentation_masks`),this.h.ia(`segmentation_masks`,(e,t)=>{this.segmentationMasks=e.map(e=>Bd(this,e,!0,!this.v)),G(this,t)}),this.h.attachEmptyPacketListener(`segmentation_masks`,e=>{this.segmentationMasks=[],G(this,e)})),e=e.h(),this.setGraph(new Uint8Array(e),!0)}};kf.prototype.detectForVideo=kf.prototype.I,kf.prototype.detect=kf.prototype.H,kf.prototype.setOptions=kf.prototype.A,kf.createFromModelPath=function(e,t){return Id(kf,e,{baseOptions:{modelAssetPath:t}})},kf.createFromModelBuffer=function(e,t){return Id(kf,e,{baseOptions:{modelAssetBuffer:t}})},kf.createFromOptions=function(e,t){return Id(kf,e,t)},kf.POSE_CONNECTIONS=lf,Ye(`module$exports$google3$third_party$mediapipe$tasks$web$vision$pose_landmarker$pose_landmarker.PoseLandmarker.POSE_CONNECTIONS`,kf.POSE_CONNECTIONS);var Af={nose:0,ls:11,rs:12,le:13,re:14,lw:15,rw:16,lh:23,rh:24,lk:25,rk:26,la:27,ra:28},jf=(e,t,n)=>e+(t-e)*n;function Mf(e,t,n){if(!e)return t;let r={};for(let i of Object.keys(t))r[i]={x:jf(e[i].x,t[i].x,n),y:jf(e[i].y,t[i].y,n)};return r}var Nf=class{status=`idle`;errorMessage=``;onLost=null;landmarker=null;stream=null;track=null;lostNotified=!1;video;lastVideoTime=-1;smoothed=null;lastDetect=0;handleTrackEnded=()=>{this.lostNotified||(this.lostNotified=!0,this.onLost?.())};constructor(e){this.video=e}async start(){if(this.status===`ready`)return;this.status=`loading`;try{let e=await navigator.mediaDevices.getUserMedia({video:{width:{ideal:640},height:{ideal:480},facingMode:`user`},audio:!1});this.stream=e;let t=e.getVideoTracks()[0]??null;this.track=t,this.lostNotified=!1,t?.addEventListener(`ended`,this.handleTrackEnded),this.video.srcObject=e,await this.video.play()}catch(e){throw this.status=`error`,this.errorMessage=`打不开摄像头，可以用键盘模式。`,e}let e=`/moonnight/`,t=await Kl.forVisionTasks(`${e}wasm`),n=n=>kf.createFromOptions(t,{baseOptions:{modelAssetPath:`${e}models/pose_landmarker_lite.task`,delegate:n},numPoses:1,runningMode:`VIDEO`,minPoseDetectionConfidence:.5,minPosePresenceConfidence:.5,minTrackingConfidence:.5});try{this.landmarker=await n(`GPU`)}catch{this.landmarker=await n(`CPU`)}this.status=`ready`}stop(){this.track?.removeEventListener(`ended`,this.handleTrackEnded),this.track=null,this.lostNotified=!1,(this.stream??this.video.srcObject)?.getTracks().forEach(e=>e.stop()),this.stream=null,this.video.srcObject=null,this.landmarker?.close(),this.landmarker=null,this.status=`idle`}update(e){if(!this.landmarker||this.video.readyState<2)return null;if(e-this.lastDetect<28||(this.lastDetect=e,this.video.currentTime===this.lastVideoTime))return this.smoothed;this.lastVideoTime=this.video.currentTime;let t;try{t=this.landmarker.detectForVideo(this.video,e)}catch{return this.smoothed}let n=t.landmarks?.[0];if(!n)return this.smoothed;let r=this.video.videoWidth/Math.max(1,this.video.videoHeight),i=e=>({x:n[e].x*r,y:n[e].y,v:n[e].visibility??1}),a=i(Af.ls),o=i(Af.rs),s=i(Af.lh),c=i(Af.rh);if(a.v<.5||o.v<.5||s.v<.5||c.v<.5)return this.smoothed;let l={x:(a.x+o.x)/2,y:(a.y+o.y)/2},u={x:(s.x+c.x)/2,y:(s.y+c.y)/2},d=Math.hypot(l.x-u.x,l.y-u.y);if(d<.04)return this.smoothed;let f=1/d,p=e=>({x:(e.x-u.x)*f,y:-(e.y-u.y)*f}),m={pelvis:{x:0,y:0},shoulderCenter:p({...l,v:1}),head:p(i(Af.nose)),lShoulder:p(a),lElbow:p(i(Af.le)),lWrist:p(i(Af.lw)),rShoulder:p(o),rElbow:p(i(Af.re)),rWrist:p(i(Af.rw)),lHip:p(s),lKnee:p(i(Af.lk)),lAnkle:p(i(Af.la)),rHip:p(c),rKnee:p(i(Af.rk)),rAnkle:p(i(Af.ra))};return Pf(m,`l`,i(Af.lk).v,i(Af.la).v),Pf(m,`r`,i(Af.rk).v,i(Af.ra).v),this.smoothed=Mf(this.smoothed,m,.45),this.smoothed}};function Pf(e,t,n,r){let i=t===`l`?e.lHip:e.rHip,a=t===`l`?e.lKnee:e.rKnee,o={x:a.x,y:a.y-E.shin};if(n<.4)e[t===`l`?`lKnee`:`rKnee`]={x:i.x,y:i.y-E.thigh},e[t===`l`?`lAnkle`:`rAnkle`]={x:i.x,y:i.y-E.thigh-E.shin};else if(r<.4){let n=a.x-i.x,r=a.y-i.y,s=Math.hypot(n,r)||1;o.x=a.x+n/s*E.shin,o.y=a.y+r/s*E.shin,e[t===`l`?`lAnkle`:`rAnkle`]=o}}var Ff=1e3,If=1001,Lf=1002,Rf=1003,zf=1004,Bf=1005,Vf=1006,Hf=1007,Uf=1008,Wf=1009,Gf=1010,Kf=1011,qf=1012,Jf=1013,Yf=1014,Xf=1015,Zf=1016,Qf=1017,$f=1018,ep=1020,tp=35902,np=1021,rp=1022,ip=1023,ap=1024,op=1025,sp=1026,cp=1027,lp=1028,up=1029,dp=1030,fp=1031,pp=1033,mp=33776,hp=33777,gp=33778,_p=33779,vp=35840,yp=35841,bp=35842,xp=35843,Sp=36196,Cp=37492,wp=37496,Tp=37808,Ep=37809,Dp=37810,Op=37811,kp=37812,Ap=37813,jp=37814,Mp=37815,Np=37816,Pp=37817,Fp=37818,Ip=37819,Lp=37820,Rp=37821,zp=36492,Bp=36494,Vp=36495,Hp=36283,Up=36284,Wp=36285,Gp=36286,Kp=2300,qp=2301,Jp=2302,Yp=2400,Xp=2401,Zp=2402,Qp=3200,$p=3201,em=`srgb`,tm=`srgb-linear`,nm=`linear`,rm=`srgb`,im=7680,am=35044,om=2e3,sm=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let n=this._listeners[e];if(n!==void 0){let e=n.indexOf(t);e!==-1&&n.splice(e,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let t=this._listeners[e.type];if(t!==void 0){e.target=this;let n=t.slice(0);for(let t=0,r=n.length;t<r;t++)n[t].call(this,e);e.target=null}}},cm=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),lm=1234567,um=Math.PI/180,dm=180/Math.PI;function fm(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(cm[e&255]+cm[e>>8&255]+cm[e>>16&255]+cm[e>>24&255]+`-`+cm[t&255]+cm[t>>8&255]+`-`+cm[t>>16&15|64]+cm[t>>24&255]+`-`+cm[n&63|128]+cm[n>>8&255]+`-`+cm[n>>16&255]+cm[n>>24&255]+cm[r&255]+cm[r>>8&255]+cm[r>>16&255]+cm[r>>24&255]).toLowerCase()}function pm(e,t,n){return Math.max(t,Math.min(n,e))}function mm(e,t){return(e%t+t)%t}function hm(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function gm(e,t,n){return e===t?0:(n-e)/(t-e)}function _m(e,t,n){return(1-n)*e+n*t}function vm(e,t,n,r){return _m(e,t,1-Math.exp(-n*r))}function ym(e,t=1){return t-Math.abs(mm(e,t*2)-t)}function bm(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function xm(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function Sm(e,t){return e+Math.floor(Math.random()*(t-e+1))}function Cm(e,t){return e+Math.random()*(t-e)}function wm(e){return e*(.5-Math.random())}function Tm(e){e!==void 0&&(lm=e);let t=lm+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Em(e){return e*um}function Dm(e){return e*dm}function Om(e){return!(e&e-1)&&e!==0}function km(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function Am(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function jm(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:console.warn(`THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Mm(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`Invalid component type.`)}}function Nm(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`Invalid component type.`)}}var Pm={DEG2RAD:um,RAD2DEG:dm,generateUUID:fm,clamp:pm,euclideanModulo:mm,mapLinear:hm,inverseLerp:gm,lerp:_m,damp:vm,pingpong:ym,smoothstep:bm,smootherstep:xm,randInt:Sm,randFloat:Cm,randFloatSpread:wm,seededRandom:Tm,degToRad:Em,radToDeg:Dm,isPowerOfTwo:Om,ceilPowerOfTwo:km,floorPowerOfTwo:Am,setQuaternionFromProperEuler:jm,normalize:Nm,denormalize:Mm},q=class e{constructor(t=0,n=0){e.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(pm(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},J=class e{constructor(t,n,r,i,a,o,s,c,l){e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,r,i,a,o,s,c,l)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Fm.makeScale(e,t)),this}rotate(e){return this.premultiply(Fm.makeRotation(-e)),this}translate(e,t){return this.premultiply(Fm.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Fm=new J;function Im(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Lm(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Rm(){let e=Lm(`canvas`);return e.style.display=`block`,e}var zm={};function Bm(e){e in zm||(zm[e]=!0,console.warn(e))}function Vm(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}function Hm(e){let t=e.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Um(e){let t=e.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var Wm={enabled:!0,workingColorSpace:tm,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=Gm(e.r),e.g=Gm(e.g),e.b=Gm(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Km(e.r),e.g=Km(e.g),e.b=Km(e.b))),e},fromWorkingColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},toWorkingColorSpace:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?nm:this.spaces[e].transfer},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}};function Gm(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Km(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var qm=[.64,.33,.3,.6,.15,.06],Jm=[.2126,.7152,.0722],Ym=[.3127,.329],Xm=new J().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Zm=new J().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Wm.define({[tm]:{primaries:qm,whitePoint:Ym,transfer:nm,toXYZ:Xm,fromXYZ:Zm,luminanceCoefficients:Jm,workingColorSpaceConfig:{unpackColorSpace:em},outputColorSpaceConfig:{drawingBufferColorSpace:em}},[em]:{primaries:qm,whitePoint:Ym,transfer:rm,toXYZ:Xm,fromXYZ:Zm,luminanceCoefficients:Jm,outputColorSpaceConfig:{drawingBufferColorSpace:em}}});var Qm,$m=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Qm===void 0&&(Qm=Lm(`canvas`)),Qm.width=e.width,Qm.height=e.height;let n=Qm.getContext(`2d`);e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Qm}return t.width>2048||t.height>2048?(console.warn(`THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons`,e),t.toDataURL(`image/jpeg`,.6)):t.toDataURL(`image/png`)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Lm(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Gm(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Gm(t[e]/255)*255):t[e]=Gm(t[e]);return{data:t,width:e.width,height:e.height}}return console.warn(`THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},eh=0,th=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:eh++}),this.uuid=fm(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(nh(r[t].image)):e.push(nh(r[t]))}else e=nh(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function nh(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?$m.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn(`THREE.Texture: Unable to serialize Texture.`),{})}var rh=0,ih=class e extends sm{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=If,i=If,a=Vf,o=Uf,s=ip,c=Wf,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:rh++}),this.uuid=fm(),this.name=``,this.source=new th(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new q(0,0),this.repeat=new q(1,1),this.center=new q(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new J,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ff:e.x-=Math.floor(e.x);break;case If:e.x=e.x<0?0:1;break;case Lf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Ff:e.y-=Math.floor(e.y);break;case If:e.y=e.y<0?0:1;break;case Lf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};ih.DEFAULT_IMAGE=null,ih.DEFAULT_MAPPING=300,ih.DEFAULT_ANISOTROPY=1;var ah=class e{constructor(t=0,n=0,r=0,i=1){e.prototype.isVector4=!0,this.x=t,this.y=n,this.z=r,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},oh=class extends sm{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ah(0,0,e,t),this.scissorTest=!1,this.viewport=new ah(0,0,e,t);let r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vf,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let i=new ih(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);i.flipY=!1,i.generateMipmaps=n.generateMipmaps,i.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let e=0;e<a;e++)this.textures[e]=i.clone(),this.textures[e].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++)this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new th(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:`dispose`})}},sh=class extends oh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ch=class extends ih{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Rf,this.minFilter=Rf,this.wrapR=If,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},lh=class extends ih{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Rf,this.minFilter=Rf,this.wrapR=If,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},uh=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(o===0)e[t+0]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u;else if(o===1)e[t+0]=d,e[t+1]=f,e[t+2]=p,e[t+3]=m;else{if(u!==m||s!==d||c!==f||l!==p){let e=1-o,t=s*d+c*f+l*p+u*m,n=t>=0?1:-1,r=1-t*t;if(r>2**-52){let i=Math.sqrt(r),a=Math.atan2(i,t*n);e=Math.sin(e*a)/i,o=Math.sin(o*a)/i}let i=o*n;if(s=s*e+d*i,c=c*e+f*i,l=l*e+p*i,u=u*e+m*i,e===1-o){let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:console.warn(`THREE.Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<2**-52?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(pm(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,i=this._z,a=this._w,o=a*e._w+n*e._x+r*e._y+i*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=i,this;let s=1-o*o;if(s<=2**-52){let e=1-t;return this._w=e*a+t*this._w,this._x=e*n+t*this._x,this._y=e*r+t*this._y,this._z=e*i+t*this._z,this.normalize(),this}let c=Math.sqrt(s),l=Math.atan2(c,o),u=Math.sin((1-t)*l)/c,d=Math.sin(t*l)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=r*u+this._y*d,this._z=i*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Y=class e{constructor(t=0,n=0,r=0){e.prototype.isVector3=!0,this.x=t,this.y=n,this.z=r}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(fh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(fh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return dh.copy(this).projectOnVector(e),this.sub(dh)}reflect(e){return this.sub(dh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(pm(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},dh=new Y,fh=new uh,ph=class{constructor(e=new Y(1/0,1/0,1/0),t=new Y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(hh.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(hh.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=hh.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,hh):hh.fromBufferAttribute(r,t),hh.applyMatrix4(e.matrixWorld),this.expandByPoint(hh);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),gh.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),gh.copy(e.boundingBox)),gh.applyMatrix4(e.matrixWorld),this.union(gh)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,hh),hh.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ch),wh.subVectors(this.max,Ch),_h.subVectors(e.a,Ch),vh.subVectors(e.b,Ch),yh.subVectors(e.c,Ch),bh.subVectors(vh,_h),xh.subVectors(yh,vh),Sh.subVectors(_h,yh);let t=[0,-bh.z,bh.y,0,-xh.z,xh.y,0,-Sh.z,Sh.y,bh.z,0,-bh.x,xh.z,0,-xh.x,Sh.z,0,-Sh.x,-bh.y,bh.x,0,-xh.y,xh.x,0,-Sh.y,Sh.x,0];return!Dh(t,_h,vh,yh,wh)||(t=[1,0,0,0,1,0,0,0,1],!Dh(t,_h,vh,yh,wh))?!1:(Th.crossVectors(bh,xh),t=[Th.x,Th.y,Th.z],Dh(t,_h,vh,yh,wh))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,hh).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(hh).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(mh[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),mh[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),mh[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),mh[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),mh[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),mh[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),mh[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),mh[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(mh)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},mh=[new Y,new Y,new Y,new Y,new Y,new Y,new Y,new Y],hh=new Y,gh=new ph,_h=new Y,vh=new Y,yh=new Y,bh=new Y,xh=new Y,Sh=new Y,Ch=new Y,wh=new Y,Th=new Y,Eh=new Y;function Dh(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Eh.fromArray(e,a);let o=i.x*Math.abs(Eh.x)+i.y*Math.abs(Eh.y)+i.z*Math.abs(Eh.z),s=t.dot(Eh),c=n.dot(Eh),l=r.dot(Eh);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var Oh=new ph,kh=new Y,Ah=new Y,jh=class{constructor(e=new Y,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Oh.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;kh.subVectors(e,this.center);let t=kh.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(kh,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ah.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(kh.copy(e.center).add(Ah)),this.expandByPoint(kh.copy(e.center).sub(Ah))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Mh=new Y,Nh=new Y,Ph=new Y,Fh=new Y,Ih=new Y,Lh=new Y,Rh=new Y,zh=class{constructor(e=new Y,t=new Y(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Mh)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Mh.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Mh.copy(this.origin).addScaledVector(this.direction,t),Mh.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Nh.copy(e).add(t).multiplyScalar(.5),Ph.copy(t).sub(e).normalize(),Fh.copy(this.origin).sub(Nh);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Ph),o=Fh.dot(this.direction),s=-Fh.dot(Ph),c=Fh.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Nh).addScaledVector(Ph,d),f}intersectSphere(e,t){Mh.subVectors(e.center,this.origin);let n=Mh.dot(this.direction),r=Mh.dot(Mh)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Mh)!==null}intersectTriangle(e,t,n,r,i){Ih.subVectors(t,e),Lh.subVectors(n,e),Rh.crossVectors(Ih,Lh);let a=this.direction.dot(Rh),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Fh.subVectors(this.origin,e);let s=o*this.direction.dot(Lh.crossVectors(Fh,Lh));if(s<0)return null;let c=o*this.direction.dot(Ih.cross(Fh));if(c<0||s+c>a)return null;let l=-o*Fh.dot(Rh);return l<0?null:this.at(l/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Bh=class e{constructor(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g){e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/Vh.setFromMatrixColumn(e,0).length(),i=1/Vh.setFromMatrixColumn(e,1).length(),a=1/Vh.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Uh,e,Wh)}lookAt(e,t,n){let r=this.elements;return qh.subVectors(e,t),qh.lengthSq()===0&&(qh.z=1),qh.normalize(),Gh.crossVectors(n,qh),Gh.lengthSq()===0&&(Math.abs(n.z)===1?qh.x+=1e-4:qh.z+=1e-4,qh.normalize(),Gh.crossVectors(n,qh)),Gh.normalize(),Kh.crossVectors(qh,Gh),r[0]=Gh.x,r[4]=Kh.x,r[8]=qh.x,r[1]=Gh.y,r[5]=Kh.y,r[9]=qh.y,r[2]=Gh.z,r[6]=Kh.z,r[10]=qh.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],ee=r[6],A=r[10],te=r[14],ne=r[3],re=r[7],ie=r[11],ae=r[15];return i[0]=a*x+o*T+s*k+c*ne,i[4]=a*S+o*E+s*ee+c*re,i[8]=a*C+o*D+s*A+c*ie,i[12]=a*w+o*O+s*te+c*ae,i[1]=l*x+u*T+d*k+f*ne,i[5]=l*S+u*E+d*ee+f*re,i[9]=l*C+u*D+d*A+f*ie,i[13]=l*w+u*O+d*te+f*ae,i[2]=p*x+m*T+h*k+g*ne,i[6]=p*S+m*E+h*ee+g*re,i[10]=p*C+m*D+h*A+g*ie,i[14]=p*w+m*O+h*te+g*ae,i[3]=_*x+v*T+y*k+b*ne,i[7]=_*S+v*E+y*ee+b*re,i[11]=_*C+v*D+y*A+b*ie,i[15]=_*w+v*O+y*te+b*ae,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15];return p*(+i*s*u-r*c*u-i*o*d+n*c*d+r*o*f-n*s*f)+m*(+t*s*f-t*c*d+i*a*d-r*a*f+r*c*l-i*s*l)+h*(+t*c*u-t*o*f-i*a*u+n*a*f+i*o*l-n*c*l)+g*(-r*o*l-t*s*u+t*o*d+r*a*u-n*a*d+n*s*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=u*h*c-m*d*c+m*s*f-o*h*f-u*s*g+o*d*g,v=p*d*c-l*h*c-p*s*f+a*h*f+l*s*g-a*d*g,y=l*m*c-p*u*c+p*o*f-a*m*f-l*o*g+a*u*g,b=p*u*s-l*m*s-p*o*d+a*m*d+l*o*h-a*u*h,x=t*_+n*v+r*y+i*b;if(x===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let S=1/x;return e[0]=_*S,e[1]=(m*d*i-u*h*i-m*r*f+n*h*f+u*r*g-n*d*g)*S,e[2]=(o*h*i-m*s*i+m*r*c-n*h*c-o*r*g+n*s*g)*S,e[3]=(u*s*i-o*d*i-u*r*c+n*d*c+o*r*f-n*s*f)*S,e[4]=v*S,e[5]=(l*h*i-p*d*i+p*r*f-t*h*f-l*r*g+t*d*g)*S,e[6]=(p*s*i-a*h*i-p*r*c+t*h*c+a*r*g-t*s*g)*S,e[7]=(a*d*i-l*s*i+l*r*c-t*d*c-a*r*f+t*s*f)*S,e[8]=y*S,e[9]=(p*u*i-l*m*i-p*n*f+t*m*f+l*n*g-t*u*g)*S,e[10]=(a*m*i-p*o*i+p*n*c-t*m*c-a*n*g+t*o*g)*S,e[11]=(l*o*i-a*u*i-l*n*c+t*u*c+a*n*f-t*o*f)*S,e[12]=b*S,e[13]=(l*m*r-p*u*r+p*n*d-t*m*d-l*n*h+t*u*h)*S,e[14]=(p*o*r-a*m*r-p*n*s+t*m*s+a*n*h-t*o*h)*S,e[15]=(a*u*r-l*o*r+l*n*s-t*u*s-a*n*d+t*o*d)*S,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,i=Vh.set(r[0],r[1],r[2]).length(),a=Vh.set(r[4],r[5],r[6]).length(),o=Vh.set(r[8],r[9],r[10]).length();this.determinant()<0&&(i=-i),e.x=r[12],e.y=r[13],e.z=r[14],Hh.copy(this);let s=1/i,c=1/a,l=1/o;return Hh.elements[0]*=s,Hh.elements[1]*=s,Hh.elements[2]*=s,Hh.elements[4]*=c,Hh.elements[5]*=c,Hh.elements[6]*=c,Hh.elements[8]*=l,Hh.elements[9]*=l,Hh.elements[10]*=l,t.setFromRotationMatrix(Hh),n.x=i,n.y=a,n.z=o,this}makePerspective(e,t,n,r,i,a,o=om){let s=this.elements,c=2*i/(t-e),l=2*i/(n-r),u=(t+e)/(t-e),d=(n+r)/(n-r),f,p;if(o===2e3)f=-(a+i)/(a-i),p=-2*a*i/(a-i);else if(o===2001)f=-a/(a-i),p=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return s[0]=c,s[4]=0,s[8]=u,s[12]=0,s[1]=0,s[5]=l,s[9]=d,s[13]=0,s[2]=0,s[6]=0,s[10]=f,s[14]=p,s[3]=0,s[7]=0,s[11]=-1,s[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=om){let s=this.elements,c=1/(t-e),l=1/(n-r),u=1/(a-i),d=(t+e)*c,f=(n+r)*l,p,m;if(o===2e3)p=(a+i)*u,m=-2*u;else if(o===2001)p=i*u,m=-1*u;else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return s[0]=2*c,s[4]=0,s[8]=0,s[12]=-d,s[1]=0,s[5]=2*l,s[9]=0,s[13]=-f,s[2]=0,s[6]=0,s[10]=m,s[14]=-p,s[3]=0,s[7]=0,s[11]=0,s[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Vh=new Y,Hh=new Bh,Uh=new Y(0,0,0),Wh=new Y(1,1,1),Gh=new Y,Kh=new Y,qh=new Y,Jh=new Bh,Yh=new uh,Xh=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(pm(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-pm(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(pm(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-pm(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(pm(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-pm(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:console.warn(`THREE.Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Jh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Jh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Yh.setFromEuler(this),this.setFromQuaternion(Yh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Xh.DEFAULT_ORDER=`XYZ`;var Zh=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},Qh=0,$h=new Y,eg=new uh,tg=new Bh,ng=new Y,rg=new Y,ig=new Y,ag=new uh,og=new Y(1,0,0),sg=new Y(0,1,0),cg=new Y(0,0,1),lg={type:`added`},ug={type:`removed`},dg={type:`childadded`,child:null},fg={type:`childremoved`,child:null},pg=class e extends sm{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Qh++}),this.uuid=fm(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new Y,n=new Xh,r=new uh,i=new Y(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Bh},normalMatrix:{value:new J}}),this.matrix=new Bh,this.matrixWorld=new Bh,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Zh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return eg.setFromAxisAngle(e,t),this.quaternion.multiply(eg),this}rotateOnWorldAxis(e,t){return eg.setFromAxisAngle(e,t),this.quaternion.premultiply(eg),this}rotateX(e){return this.rotateOnAxis(og,e)}rotateY(e){return this.rotateOnAxis(sg,e)}rotateZ(e){return this.rotateOnAxis(cg,e)}translateOnAxis(e,t){return $h.copy(e).applyQuaternion(this.quaternion),this.position.add($h.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(og,e)}translateY(e){return this.translateOnAxis(sg,e)}translateZ(e){return this.translateOnAxis(cg,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(tg.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ng.copy(e):ng.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),rg.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?tg.lookAt(rg,ng,this.up):tg.lookAt(ng,rg,this.up),this.quaternion.setFromRotationMatrix(tg),r&&(tg.extractRotation(r.matrixWorld),eg.setFromRotationMatrix(tg),this.quaternion.premultiply(eg.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(console.error(`THREE.Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(lg),dg.child=e,this.dispatchEvent(dg),dg.child=null):console.error(`THREE.Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ug),fg.child=e,this.dispatchEvent(fg),fg.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),tg.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),tg.multiply(e.parent.matrixWorld)),e.applyMatrix4(tg),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(lg),dg.child=e,this.dispatchEvent(dg),dg.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rg,e,ig),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rg,ag,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let e=this.children;for(let t=0,n=e.length;t<n;t++)e[t].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==``&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(e=>({boxInitialized:e.boxInitialized,boxMin:e.box.min.toArray(),boxMax:e.box.max.toArray(),sphereInitialized:e.sphereInitialized,sphereRadius:e.sphere.radius,sphereCenter:e.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}};pg.DEFAULT_UP=new Y(0,1,0),pg.DEFAULT_MATRIX_AUTO_UPDATE=!0,pg.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var mg=new Y,hg=new Y,gg=new Y,_g=new Y,vg=new Y,yg=new Y,bg=new Y,xg=new Y,Sg=new Y,Cg=new Y,wg=new ah,Tg=new ah,Eg=new ah,Dg=class e{constructor(e=new Y,t=new Y,n=new Y){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),mg.subVectors(e,t),r.cross(mg);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){mg.subVectors(r,t),hg.subVectors(n,t),gg.subVectors(e,t);let a=mg.dot(mg),o=mg.dot(hg),s=mg.dot(gg),c=hg.dot(hg),l=hg.dot(gg),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,_g)!==null&&_g.x>=0&&_g.y>=0&&_g.x+_g.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,_g)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,_g.x),s.addScaledVector(a,_g.y),s.addScaledVector(o,_g.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return wg.setScalar(0),Tg.setScalar(0),Eg.setScalar(0),wg.fromBufferAttribute(e,t),Tg.fromBufferAttribute(e,n),Eg.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(wg,i.x),a.addScaledVector(Tg,i.y),a.addScaledVector(Eg,i.z),a}static isFrontFacing(e,t,n,r){return mg.subVectors(n,t),hg.subVectors(e,t),mg.cross(hg).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return mg.subVectors(this.c,this.b),hg.subVectors(this.a,this.b),mg.cross(hg).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;vg.subVectors(r,n),yg.subVectors(i,n),xg.subVectors(e,n);let s=vg.dot(xg),c=yg.dot(xg);if(s<=0&&c<=0)return t.copy(n);Sg.subVectors(e,r);let l=vg.dot(Sg),u=yg.dot(Sg);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(vg,a);Cg.subVectors(e,i);let f=vg.dot(Cg),p=yg.dot(Cg);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(yg,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return bg.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(bg,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(vg,a).addScaledVector(yg,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Og={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},kg={h:0,s:0,l:0},Ag={h:0,s:0,l:0};function jg(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var X=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=em){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Wm.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=Wm.workingColorSpace){return this.r=e,this.g=t,this.b=n,Wm.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=Wm.workingColorSpace){if(e=mm(e,1),t=pm(t,0,1),n=pm(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=jg(i,r,e+1/3),this.g=jg(i,r,e),this.b=jg(i,r,e-1/3)}return Wm.toWorkingColorSpace(this,r),this}setStyle(e,t=em){function n(t){t!==void 0&&parseFloat(t)<1&&console.warn(`THREE.Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:console.warn(`THREE.Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);console.warn(`THREE.Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=em){let n=Og[e.toLowerCase()];return n===void 0?console.warn(`THREE.Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Gm(e.r),this.g=Gm(e.g),this.b=Gm(e.b),this}copyLinearToSRGB(e){return this.r=Km(e.r),this.g=Km(e.g),this.b=Km(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=em){return Wm.fromWorkingColorSpace(Mg.copy(this),e),Math.round(pm(Mg.r*255,0,255))*65536+Math.round(pm(Mg.g*255,0,255))*256+Math.round(pm(Mg.b*255,0,255))}getHexString(e=em){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Wm.workingColorSpace){Wm.fromWorkingColorSpace(Mg.copy(this),t);let n=Mg.r,r=Mg.g,i=Mg.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Wm.workingColorSpace){return Wm.fromWorkingColorSpace(Mg.copy(this),t),e.r=Mg.r,e.g=Mg.g,e.b=Mg.b,e}getStyle(e=em){Wm.fromWorkingColorSpace(Mg.copy(this),e);let t=Mg.r,n=Mg.g,r=Mg.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(kg),this.setHSL(kg.h+e,kg.s+t,kg.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(kg),e.getHSL(Ag);let n=_m(kg.h,Ag.h,t),r=_m(kg.s,Ag.s,t),i=_m(kg.l,Ag.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Mg=new X;X.NAMES=Og;var Ng=0,Pg=class extends sm{static get type(){return`Material`}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ng++}),this.uuid=fm(),this.name=``,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new X(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=im,this.stencilZFail=im,this.stencilZPass=im,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,this.name!==``&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==`round`&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==`round`&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn(`Material: onBuild() has been removed.`)}},Fg=class extends Pg{static get type(){return`MeshBasicMaterial`}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new X(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xh,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Ig=new Y,Lg=new q,Rg=class{constructor(e,t,n=!1){if(Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=am,this.updateRanges=[],this.gpuType=Xf,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Lg.fromBufferAttribute(this,t),Lg.applyMatrix3(e),this.setXY(t,Lg.x,Lg.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ig.fromBufferAttribute(this,t),Ig.applyMatrix3(e),this.setXYZ(t,Ig.x,Ig.y,Ig.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ig.fromBufferAttribute(this,t),Ig.applyMatrix4(e),this.setXYZ(t,Ig.x,Ig.y,Ig.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ig.fromBufferAttribute(this,t),Ig.applyNormalMatrix(e),this.setXYZ(t,Ig.x,Ig.y,Ig.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ig.fromBufferAttribute(this,t),Ig.transformDirection(e),this.setXYZ(t,Ig.x,Ig.y,Ig.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Mm(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Nm(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Mm(t,this.array)),t}setX(e,t){return this.normalized&&(t=Nm(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Mm(t,this.array)),t}setY(e,t){return this.normalized&&(t=Nm(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Mm(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Nm(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Mm(t,this.array)),t}setW(e,t){return this.normalized&&(t=Nm(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Nm(t,this.array),n=Nm(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Nm(t,this.array),n=Nm(n,this.array),r=Nm(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=Nm(t,this.array),n=Nm(n,this.array),r=Nm(r,this.array),i=Nm(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==``&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}},zg=class extends Rg{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Bg=class extends Rg{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Vg=class extends Rg{constructor(e,t,n){super(new Float32Array(e),t,n)}},Hg=0,Ug=new Bh,Wg=new pg,Gg=new Y,Kg=new ph,qg=new ph,Jg=new Y,Yg=class e extends sm{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Hg++}),this.uuid=fm(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Im(e)?Bg:zg)(e,1):e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new J().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ug.makeRotationFromQuaternion(e),this.applyMatrix4(Ug),this}rotateX(e){return Ug.makeRotationX(e),this.applyMatrix4(Ug),this}rotateY(e){return Ug.makeRotationY(e),this.applyMatrix4(Ug),this}rotateZ(e){return Ug.makeRotationZ(e),this.applyMatrix4(Ug),this}translate(e,t,n){return Ug.makeTranslation(e,t,n),this.applyMatrix4(Ug),this}scale(e,t,n){return Ug.makeScale(e,t,n),this.applyMatrix4(Ug),this}lookAt(e){return Wg.lookAt(e),Wg.updateMatrix(),this.applyMatrix4(Wg.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Gg).negate(),this.translate(Gg.x,Gg.y,Gg.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Vg(t,3))}else{for(let n=0,r=t.count;n<r;n++){let r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn(`THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ph);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)console.error(`THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new Y(-1/0,-1/0,-1/0),new Y(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Kg.setFromBufferAttribute(n),this.morphTargetsRelative?(Jg.addVectors(this.boundingBox.min,Kg.min),this.boundingBox.expandByPoint(Jg),Jg.addVectors(this.boundingBox.max,Kg.max),this.boundingBox.expandByPoint(Jg)):(this.boundingBox.expandByPoint(Kg.min),this.boundingBox.expandByPoint(Kg.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error(`THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new jh);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)console.error(`THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new Y,1/0);else if(e){let n=this.boundingSphere.center;if(Kg.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];qg.setFromBufferAttribute(n),this.morphTargetsRelative?(Jg.addVectors(Kg.min,qg.min),Kg.expandByPoint(Jg),Jg.addVectors(Kg.max,qg.max),Kg.expandByPoint(Jg)):(Kg.expandByPoint(qg.min),Kg.expandByPoint(qg.max))}Kg.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Jg.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Jg));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Jg.fromBufferAttribute(a,t),o&&(Gg.fromBufferAttribute(e,t),Jg.add(Gg)),r=Math.max(r,n.distanceToSquared(Jg))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error(`THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error(`THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv;this.hasAttribute(`tangent`)===!1&&this.setAttribute(`tangent`,new Rg(new Float32Array(4*n.count),4));let a=this.getAttribute(`tangent`),o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new Y,s[e]=new Y;let c=new Y,l=new Y,u=new Y,d=new q,f=new q,p=new q,m=new Y,h=new Y;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new Y,y=new Y,b=new Y,x=new Y;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0)n=new Rg(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new Y,i=new Y,a=new Y,o=new Y,s=new Y,c=new Y,l=new Y,u=new Y;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Jg.fromBufferAttribute(e,t),Jg.normalize(),e.setXYZ(t,Jg.x,Jg.y,Jg.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Rg(a,r,i)}if(this.index===null)return console.warn(`THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.6,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.type,this.name!==``&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:`dispose`})}},Xg=new Bh,Zg=new zh,Qg=new jh,$g=new Y,e_=new Y,t_=new Y,n_=new Y,r_=new Y,i_=new Y,a_=new Y,o_=new Y,Z=class extends pg{constructor(e=new Yg,t=new Fg){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){i_.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(r_.fromBufferAttribute(s,e),a?i_.addScaledVector(r_,r):i_.addScaledVector(r_.sub(t),r))}t.add(i_)}return t}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Qg.copy(n.boundingSphere),Qg.applyMatrix4(i),Zg.copy(e.ray).recast(e.near),!(Qg.containsPoint(Zg.origin)===!1&&(Zg.intersectSphere(Qg,$g)===null||Zg.origin.distanceToSquared($g)>(e.far-e.near)**2))&&(Xg.copy(i).invert(),Zg.copy(e.ray).applyMatrix4(Xg),(n.boundingBox===null||Zg.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Zg)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=c_(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=c_(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=c_(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=c_(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function s_(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;o_.copy(s),o_.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(o_);return l<n.near||l>n.far?null:{distance:l,point:o_.clone(),object:e}}function c_(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,e_),e.getVertexPosition(c,t_),e.getVertexPosition(l,n_);let u=s_(e,t,n,r,e_,t_,n_,a_);if(u){let e=new Y;Dg.getBarycoord(a_,e_,t_,n_,e),i&&(u.uv=Dg.getInterpolatedAttribute(i,s,c,l,e,new q)),a&&(u.uv1=Dg.getInterpolatedAttribute(a,s,c,l,e,new q)),o&&(u.normal=Dg.getInterpolatedAttribute(o,s,c,l,e,new Y),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new Y,materialIndex:0};Dg.getNormal(e_,t_,n_,t.normal),u.face=t,u.barycoord=e}return u}var l_=class e extends Yg{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Vg(c,3)),this.setAttribute(`normal`,new Vg(l,3)),this.setAttribute(`uv`,new Vg(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new Y;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function u_(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone():Array.isArray(i)?t[n][r]=i.slice():t[n][r]=i}}return t}function d_(e){let t={};for(let n=0;n<e.length;n++){let r=u_(e[n]);for(let e in r)t[e]=r[e]}return t}function f_(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function p_(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Wm.workingColorSpace}var m_={clone:u_,merge:d_},h_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,g_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,__=class extends Pg{static get type(){return`ShaderMaterial`}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=h_,this.fragmentShader=g_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=u_(e.uniforms),this.uniformsGroups=f_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},v_=class extends pg{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new Bh,this.projectionMatrix=new Bh,this.projectionMatrixInverse=new Bh,this.coordinateSystem=om}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},y_=new Y,b_=new q,x_=new q,S_=class extends v_{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=dm*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(um*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return dm*2*Math.atan(Math.tan(um*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){y_.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(y_.x,y_.y).multiplyScalar(-e/y_.z),y_.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(y_.x,y_.y).multiplyScalar(-e/y_.z)}getViewSize(e,t){return this.getViewBounds(e,b_,x_),t.subVectors(x_,b_)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(um*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},C_=-90,w_=1,T_=class extends pg{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new S_(C_,w_,e,t);r.layers=this.layers,this.add(r);let i=new S_(C_,w_,e,t);i.layers=this.layers,this.add(i);let a=new S_(C_,w_,e,t);a.layers=this.layers,this.add(a);let o=new S_(C_,w_,e,t);o.layers=this.layers,this.add(o);let s=new S_(C_,w_,e,t);s.layers=this.layers,this.add(s);let c=new S_(C_,w_,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,i),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,s),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},E_=class extends ih{constructor(e,t,n,r,i,a,o,s,c,l){e=e===void 0?[]:e,t=t===void 0?301:t,super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},D_=class extends sh{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new E_(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0&&t.generateMipmaps,this.texture.minFilter=t.minFilter===void 0?Vf:t.minFilter}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new l_(5,5,5),i=new __({name:`CubemapFromEquirect`,uniforms:u_(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Z(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=Vf),new T_(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,r){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},O_=new Y,k_=new Y,A_=new J,j_=class{constructor(e=new Y(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=O_.subVectors(n,t).cross(k_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(O_),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let i=-(e.start.dot(this.normal)+this.constant)/r;return i<0||i>1?null:t.copy(e.start).addScaledVector(n,i)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||A_.getNormalMatrix(e),r=this.coplanarPoint(O_).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},M_=new jh,N_=new Y,P_=class{constructor(e=new j_,t=new j_,n=new j_,r=new j_,i=new j_,a=new j_){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=om){let n=this.planes,r=e.elements,i=r[0],a=r[1],o=r[2],s=r[3],c=r[4],l=r[5],u=r[6],d=r[7],f=r[8],p=r[9],m=r[10],h=r[11],g=r[12],_=r[13],v=r[14],y=r[15];if(n[0].setComponents(s-i,d-c,h-f,y-g).normalize(),n[1].setComponents(s+i,d+c,h+f,y+g).normalize(),n[2].setComponents(s+a,d+l,h+p,y+_).normalize(),n[3].setComponents(s-a,d-l,h-p,y-_).normalize(),n[4].setComponents(s-o,d-u,h-m,y-v).normalize(),t===2e3)n[5].setComponents(s+o,d+u,h+m,y+v).normalize();else if(t===2001)n[5].setComponents(o,u,m,v).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),M_.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),M_.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(M_)}intersectsSprite(e){return M_.center.set(0,0,0),M_.radius=.7071067811865476,M_.applyMatrix4(e.matrixWorld),this.intersectsSphere(M_)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(N_.x=r.normal.x>0?e.max.x:e.min.x,N_.y=r.normal.y>0?e.max.y:e.min.y,N_.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(N_)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function F_(){let e=null,t=!1,n=null,r=null;function i(t,a){n(t,a),r=e.requestAnimationFrame(i)}return{start:function(){t!==!0&&n!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function I_(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var L_=class e extends Yg{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Vg(p,3)),this.setAttribute(`normal`,new Vg(m,3)),this.setAttribute(`uv`,new Vg(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Q={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distanceRGBA_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distanceRGBA_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},$={common:{diffuse:{value:new X(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new J},alphaMap:{value:null},alphaMapTransform:{value:new J},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new J}},envmap:{envMap:{value:null},envMapRotation:{value:new J},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new J}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new J}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new J},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new J},normalScale:{value:new q(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new J},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new J}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new J}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new J}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new X(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new X(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new J},alphaTest:{value:0},uvTransform:{value:new J}},sprite:{diffuse:{value:new X(16777215)},opacity:{value:1},center:{value:new q(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new J},alphaMap:{value:null},alphaMapTransform:{value:new J},alphaTest:{value:0}}},R_={basic:{uniforms:d_([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.fog]),vertexShader:Q.meshbasic_vert,fragmentShader:Q.meshbasic_frag},lambert:{uniforms:d_([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.fog,$.lights,{emissive:{value:new X(0)}}]),vertexShader:Q.meshlambert_vert,fragmentShader:Q.meshlambert_frag},phong:{uniforms:d_([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.fog,$.lights,{emissive:{value:new X(0)},specular:{value:new X(1118481)},shininess:{value:30}}]),vertexShader:Q.meshphong_vert,fragmentShader:Q.meshphong_frag},standard:{uniforms:d_([$.common,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.roughnessmap,$.metalnessmap,$.fog,$.lights,{emissive:{value:new X(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Q.meshphysical_vert,fragmentShader:Q.meshphysical_frag},toon:{uniforms:d_([$.common,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.gradientmap,$.fog,$.lights,{emissive:{value:new X(0)}}]),vertexShader:Q.meshtoon_vert,fragmentShader:Q.meshtoon_frag},matcap:{uniforms:d_([$.common,$.bumpmap,$.normalmap,$.displacementmap,$.fog,{matcap:{value:null}}]),vertexShader:Q.meshmatcap_vert,fragmentShader:Q.meshmatcap_frag},points:{uniforms:d_([$.points,$.fog]),vertexShader:Q.points_vert,fragmentShader:Q.points_frag},dashed:{uniforms:d_([$.common,$.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Q.linedashed_vert,fragmentShader:Q.linedashed_frag},depth:{uniforms:d_([$.common,$.displacementmap]),vertexShader:Q.depth_vert,fragmentShader:Q.depth_frag},normal:{uniforms:d_([$.common,$.bumpmap,$.normalmap,$.displacementmap,{opacity:{value:1}}]),vertexShader:Q.meshnormal_vert,fragmentShader:Q.meshnormal_frag},sprite:{uniforms:d_([$.sprite,$.fog]),vertexShader:Q.sprite_vert,fragmentShader:Q.sprite_frag},background:{uniforms:{uvTransform:{value:new J},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Q.background_vert,fragmentShader:Q.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new J}},vertexShader:Q.backgroundCube_vert,fragmentShader:Q.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Q.cube_vert,fragmentShader:Q.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Q.equirect_vert,fragmentShader:Q.equirect_frag},distanceRGBA:{uniforms:d_([$.common,$.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Q.distanceRGBA_vert,fragmentShader:Q.distanceRGBA_frag},shadow:{uniforms:d_([$.lights,$.fog,{color:{value:new X(0)},opacity:{value:1}}]),vertexShader:Q.shadow_vert,fragmentShader:Q.shadow_frag}};R_.physical={uniforms:d_([R_.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new J},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new J},clearcoatNormalScale:{value:new q(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new J},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new J},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new J},sheen:{value:0},sheenColor:{value:new X(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new J},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new J},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new J},transmissionSamplerSize:{value:new q},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new J},attenuationDistance:{value:0},attenuationColor:{value:new X(0)},specularColor:{value:new X(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new J},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new J},anisotropyVector:{value:new q},anisotropyMap:{value:null},anisotropyMapTransform:{value:new J}}]),vertexShader:Q.meshphysical_vert,fragmentShader:Q.meshphysical_frag};var z_={r:0,b:0,g:0},B_=new Xh,V_=new Bh;function H_(e,t,n,r,i,a,o){let s=new X(0),c=a===!0?0:1,l,u,d=null,f=0,p=null;function m(e){let r=e.isScene===!0?e.background:null;return r&&r.isTexture&&(r=(e.backgroundBlurriness>0?n:t).get(r)),r}function h(t){let n=!1,i=m(t);i===null?_(s,c):i&&i.isColor&&(_(i,1),n=!0);let a=e.xr.getEnvironmentBlendMode();a===`additive`?r.buffers.color.setClear(0,0,0,1,o):a===`alpha-blend`&&r.buffers.color.setClear(0,0,0,0,o),(e.autoClear||n)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function g(t,n){let r=m(n);r&&(r.isCubeTexture||r.mapping===306)?(u===void 0&&(u=new Z(new l_(1,1,1),new __({name:`BackgroundCubeMaterial`,uniforms:u_(R_.backgroundCube.uniforms),vertexShader:R_.backgroundCube.vertexShader,fragmentShader:R_.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute(`normal`),u.geometry.deleteAttribute(`uv`),u.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),B_.copy(n.backgroundRotation),B_.x*=-1,B_.y*=-1,B_.z*=-1,r.isCubeTexture&&r.isRenderTargetTexture===!1&&(B_.y*=-1,B_.z*=-1),u.material.uniforms.envMap.value=r,u.material.uniforms.flipEnvMap.value=r.isCubeTexture&&r.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(V_.makeRotationFromEuler(B_)),u.material.toneMapped=Wm.getTransfer(r.colorSpace)!==rm,(d!==r||f!==r.version||p!==e.toneMapping)&&(u.material.needsUpdate=!0,d=r,f=r.version,p=e.toneMapping),u.layers.enableAll(),t.unshift(u,u.geometry,u.material,0,0,null)):r&&r.isTexture&&(l===void 0&&(l=new Z(new L_(2,2),new __({name:`BackgroundMaterial`,uniforms:u_(R_.background.uniforms),vertexShader:R_.background.vertexShader,fragmentShader:R_.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute(`normal`),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=r,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.toneMapped=Wm.getTransfer(r.colorSpace)!==rm,r.matrixAutoUpdate===!0&&r.updateMatrix(),l.material.uniforms.uvTransform.value.copy(r.matrix),(d!==r||f!==r.version||p!==e.toneMapping)&&(l.material.needsUpdate=!0,d=r,f=r.version,p=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null))}function _(t,n){t.getRGB(z_,p_(e)),r.buffers.color.setClear(z_.r,z_.g,z_.b,n,o)}return{getClearColor:function(){return s},setClearColor:function(e,t=1){s.set(e),c=t,_(s,c)},getClearAlpha:function(){return c},setClearAlpha:function(e){c=e,_(s,c)},render:h,addToRenderList:g}}function U_(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n){let i=n.wireframe===!0,a=r[e.id];a===void 0&&(a={},r[e.id]=a);let o=a[t.id];o===void 0&&(o={},a[t.id]=o);let s=o[i];return s===void 0&&(s=f(c()),o[i]=s),s}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){w();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n)u(n[e].object),delete n[e];delete t[e]}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n)u(n[e].object),delete n[e];delete t[e]}delete r[e.id]}function C(e){for(let t in r){let n=r[t];if(n[e.id]===void 0)continue;let i=n[e.id];for(let e in i)u(i[e].object),delete i[e];delete n[e.id]}}function w(){T(),o=!0,a!==i&&(a=i,l(a.object))}function T(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:w,resetDefaultState:T,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function W_(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}function c(e,i,a,s){if(a===0)return;let c=t.get(`WEBGL_multi_draw`);if(c===null)for(let t=0;t<e.length;t++)o(e[t],i[t],s[t]);else{c.multiDrawArraysInstancedWEBGL(r,e,0,i,0,s,0,a);let t=0;for(let e=0;e<a;e++)t+=i[e]*s[e];n.update(t,r,1)}}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s,this.renderMultiDrawInstances=c}function G_(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&n!==1015&&!i)}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(console.warn(`THREE.WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reverseDepthBuffer===!0&&t.has(`EXT_clip_control`),p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=m>0,S=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,vertexTextures:x,maxSamples:S}}function K_(e){let t=this,n=null,r=0,i=!1,a=!1,o=new j_,s=new J,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}function q_(e){let t=new WeakMap;function n(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function r(r){if(r&&r.isTexture){let a=r.mapping;if(a===303||a===304){if(t.has(r)){let e=t.get(r).texture;return n(e,r.mapping)}{let a=r.image;if(a&&a.height>0){let o=new D_(a.height);return o.fromEquirectangularTexture(e,r),t.set(r,o),r.addEventListener(`dispose`,i),n(o.texture,r.mapping)}return null}}}return r}function i(e){let n=e.target;n.removeEventListener(`dispose`,i);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function a(){t=new WeakMap}return{get:r,dispose:a}}var J_=class extends v_{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Y_=4,X_=[.125,.215,.35,.446,.526,.582],Z_=20,Q_=new J_,$_=new X,ev=null,tv=0,nv=0,rv=!1,iv=(1+Math.sqrt(5))/2,av=1/iv,ov=[new Y(-iv,av,0),new Y(iv,av,0),new Y(-av,0,iv),new Y(av,0,iv),new Y(0,iv,-av),new Y(0,iv,av),new Y(-1,1,-1),new Y(1,1,-1),new Y(-1,1,1),new Y(1,1,1)],sv=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){ev=this._renderer.getRenderTarget(),tv=this._renderer.getActiveCubeFace(),nv=this._renderer.getActiveMipmapLevel(),rv=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let i=this._allocateTargets();return i.depthBuffer=!0,this._sceneToCubeUV(e,n,r,i),t>0&&this._blur(i,0,0,t),this._applyPMREM(i),this._cleanup(i),i}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=pv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ev,tv,nv),this._renderer.xr.enabled=rv,e.scissorTest=!1,uv(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ev=this._renderer.getRenderTarget(),tv=this._renderer.getActiveCubeFace(),nv=this._renderer.getActiveMipmapLevel(),rv=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Vf,minFilter:Vf,generateMipmaps:!1,type:Zf,format:ip,colorSpace:tm,depthBuffer:!1},r=lv(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=lv(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=cv(r)),this._blurMaterial=dv(r,e,t)}return r}_compileMaterial(e){let t=new Z(this._lodPlanes[0],e);this._renderer.compile(t,Q_)}_sceneToCubeUV(e,t,n,r){let i=new S_(90,1,t,n),a=[1,-1,1,1,1,1],o=[1,1,1,-1,-1,-1],s=this._renderer,c=s.autoClear,l=s.toneMapping;s.getClearColor($_),s.toneMapping=0,s.autoClear=!1;let u=new Fg({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1}),d=new Z(new l_,u),f=!1,p=e.background;p?p.isColor&&(u.color.copy(p),e.background=null,f=!0):(u.color.copy($_),f=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(i.up.set(0,a[t],0),i.lookAt(o[t],0,0)):n===1?(i.up.set(0,0,a[t]),i.lookAt(0,o[t],0)):(i.up.set(0,a[t],0),i.lookAt(0,0,o[t]));let c=this._cubeSize;uv(r,n*c,t>2?c:0,c,c),s.setRenderTarget(r),f&&s.render(d,i),s.render(e,i)}d.geometry.dispose(),d.material.dispose(),s.toneMapping=l,s.autoClear=c,e.background=p}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=pv()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fv());let i=r?this._cubemapMaterial:this._equirectMaterial,a=new Z(this._lodPlanes[0],i),o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;uv(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Q_)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let t=1;t<r;t++){let n=Math.sqrt(this._sigmas[t]*this._sigmas[t]-this._sigmas[t-1]*this._sigmas[t-1]),i=ov[(r-t-1)%ov.length];this._blur(e,t-1,t,n,i)}t.autoClear=n}_blur(e,t,n,r,i){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,`latitudinal`,i),this._halfBlur(a,e,n,n,r,`longitudinal`,i)}_halfBlur(e,t,n,r,i,a,o){let s=this._renderer,c=this._blurMaterial;a!==`latitudinal`&&a!==`longitudinal`&&console.error(`blur direction must be either latitudinal or longitudinal!`);let l=new Z(this._lodPlanes[r],c),u=c.uniforms,d=this._sizeLods[n]-1,f=isFinite(i)?Math.PI/(2*d):2*Math.PI/39,p=i/f,m=isFinite(i)?1+Math.floor(3*p):Z_;m>Z_&&console.warn(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Z_}`);let h=[],g=0;for(let e=0;e<Z_;++e){let t=e/p,n=Math.exp(-t*t/2);h.push(n),e===0?g+=n:e<m&&(g+=2*n)}for(let e=0;e<h.length;e++)h[e]=h[e]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=h,u.latitudinal.value=a===`latitudinal`,o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let v=this._sizeLods[r];uv(t,3*v*(r>_-Y_?r-_+Y_:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(l,Q_)}};function cv(e){let t=[],n=[],r=[],i=e,a=e-Y_+1+X_.length;for(let o=0;o<a;o++){let a=2**i;n.push(a);let s=1/a;o>e-Y_?s=X_[o-e+Y_-1]:o===0&&(s=0),r.push(s);let c=1/(a-2),l=-c,u=1+c,d=[l,l,u,l,u,u,l,l,u,u,l,u],f=new Float32Array(108),p=new Float32Array(72),m=new Float32Array(36);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];f.set(r,18*e),p.set(d,12*e);let i=[e,e,e,e,e,e];m.set(i,6*e)}let h=new Yg;h.setAttribute(`position`,new Rg(f,3)),h.setAttribute(`uv`,new Rg(p,2)),h.setAttribute(`faceIndex`,new Rg(m,1)),t.push(h),i>Y_&&i--}return{lodPlanes:t,sizeLods:n,sigmas:r}}function lv(e,t,n){let r=new sh(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function uv(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function dv(e,t,n){let r=new Float32Array(Z_),i=new Y(0,1,0);return new __({name:`SphericalGaussianBlur`,defines:{n:Z_,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:mv(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function fv(){return new __({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:mv(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function pv(){return new __({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:mv(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function mv(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function hv(e){let t=new WeakMap,n=null;function r(r){if(r&&r.isTexture){let o=r.mapping,s=o===303||o===304,c=o===301||o===302;if(s||c){let o=t.get(r),l=o===void 0?0:o.texture.pmremVersion;if(r.isRenderTargetTexture&&r.pmremVersion!==l)return n===null&&(n=new sv(e)),o=s?n.fromEquirectangular(r,o):n.fromCubemap(r,o),o.texture.pmremVersion=r.pmremVersion,t.set(r,o),o.texture;if(o!==void 0)return o.texture;{let l=r.image;return s&&l&&l.height>0||c&&l&&i(l)?(n===null&&(n=new sv(e)),o=s?n.fromEquirectangular(r):n.fromCubemap(r),o.texture.pmremVersion=r.pmremVersion,t.set(r,o),r.addEventListener(`dispose`,a),o.texture):null}}}return r}function i(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function a(e){let n=e.target;n.removeEventListener(`dispose`,a);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function o(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:o}}function gv(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r;switch(n){case`WEBGL_depth_texture`:r=e.getExtension(`WEBGL_depth_texture`)||e.getExtension(`MOZ_WEBGL_depth_texture`)||e.getExtension(`WEBKIT_WEBGL_depth_texture`);break;case`EXT_texture_filter_anisotropic`:r=e.getExtension(`EXT_texture_filter_anisotropic`)||e.getExtension(`MOZ_EXT_texture_filter_anisotropic`)||e.getExtension(`WEBKIT_EXT_texture_filter_anisotropic`);break;case`WEBGL_compressed_texture_s3tc`:r=e.getExtension(`WEBGL_compressed_texture_s3tc`)||e.getExtension(`MOZ_WEBGL_compressed_texture_s3tc`)||e.getExtension(`WEBKIT_WEBGL_compressed_texture_s3tc`);break;case`WEBGL_compressed_texture_pvrtc`:r=e.getExtension(`WEBGL_compressed_texture_pvrtc`)||e.getExtension(`WEBKIT_WEBGL_compressed_texture_pvrtc`);break;default:r=e.getExtension(n)}return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Bm(`THREE.WebGLRenderer: `+e+` extension not supported.`),t}}}function _v(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);for(let e in s.morphAttributes){let n=s.morphAttributes[e];for(let e=0,r=n.length;e<r;e++)t.remove(n[e])}s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER);let i=n.morphAttributes;for(let n in i){let r=i[n];for(let n=0,i=r.length;n<i;n++)t.update(r[n],e.ARRAY_BUFFER)}}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else if(i!==void 0){let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}else return;let s=new(Im(n)?Bg:zg)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function vv(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}function d(e,i,s,c){if(s===0)return;let u=t.get(`WEBGL_multi_draw`);if(u===null)for(let t=0;t<e.length;t++)l(e[t]/o,i[t],c[t]);else{u.multiDrawElementsInstancedWEBGL(r,i,0,a,e,0,c,0,s);let t=0;for(let e=0;e<s;e++)t+=i[e]*c[e];n.update(t,r,1)}}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function yv(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:console.error(`THREE.WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function bv(e,t,n){let r=new WeakMap,i=new ah;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new ch(h,p,m,u);g.type=Xf,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new q(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function xv(e,t,n,r){let i=new WeakMap;function a(a){let o=r.render.frame,c=a.geometry,l=t.get(a,c);if(i.get(l)!==o&&(t.update(l),i.set(l,o)),a.isInstancedMesh&&(a.hasEventListener(`dispose`,s)===!1&&a.addEventListener(`dispose`,s),i.get(a)!==o&&(n.update(a.instanceMatrix,e.ARRAY_BUFFER),a.instanceColor!==null&&n.update(a.instanceColor,e.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let e=a.skeleton;i.get(e)!==o&&(e.update(),i.set(e,o))}return l}function o(){i=new WeakMap}function s(e){let t=e.target;t.removeEventListener(`dispose`,s),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:a,dispose:o}}var Sv=class extends ih{constructor(e,t,n,r,i,a,o,s,c,l=sp){if(l!==1026&&l!==1027)throw Error(`DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);n===void 0&&l===1026&&(n=Yf),n===void 0&&l===1027&&(n=ep),super(null,r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o===void 0?Rf:o,this.minFilter=s===void 0?Rf:s,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Cv=new ih,wv=new Sv(1,1),Tv=new ch,Ev=new lh,Dv=new E_,Ov=[],kv=[],Av=new Float32Array(16),jv=new Float32Array(9),Mv=new Float32Array(4);function Nv(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Ov[i];if(a===void 0&&(a=new Float32Array(i),Ov[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Pv(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Fv(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Iv(e,t){let n=kv[t];n===void 0&&(n=new Int32Array(t),kv[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Lv(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Rv(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Pv(n,t))return;e.uniform2fv(this.addr,t),Fv(n,t)}}function zv(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Pv(n,t))return;e.uniform3fv(this.addr,t),Fv(n,t)}}function Bv(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Pv(n,t))return;e.uniform4fv(this.addr,t),Fv(n,t)}}function Vv(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Pv(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Fv(n,t)}else{if(Pv(n,r))return;Mv.set(r),e.uniformMatrix2fv(this.addr,!1,Mv),Fv(n,r)}}function Hv(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Pv(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Fv(n,t)}else{if(Pv(n,r))return;jv.set(r),e.uniformMatrix3fv(this.addr,!1,jv),Fv(n,r)}}function Uv(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Pv(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Fv(n,t)}else{if(Pv(n,r))return;Av.set(r),e.uniformMatrix4fv(this.addr,!1,Av),Fv(n,r)}}function Wv(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Gv(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Pv(n,t))return;e.uniform2iv(this.addr,t),Fv(n,t)}}function Kv(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Pv(n,t))return;e.uniform3iv(this.addr,t),Fv(n,t)}}function qv(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Pv(n,t))return;e.uniform4iv(this.addr,t),Fv(n,t)}}function Jv(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Yv(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Pv(n,t))return;e.uniform2uiv(this.addr,t),Fv(n,t)}}function Xv(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Pv(n,t))return;e.uniform3uiv(this.addr,t),Fv(n,t)}}function Zv(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Pv(n,t))return;e.uniform4uiv(this.addr,t),Fv(n,t)}}function Qv(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(wv.compareFunction=515,a=wv):a=Cv,n.setTexture2D(t||a,i)}function $v(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Ev,i)}function ey(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Dv,i)}function ty(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Tv,i)}function ny(e){switch(e){case 5126:return Lv;case 35664:return Rv;case 35665:return zv;case 35666:return Bv;case 35674:return Vv;case 35675:return Hv;case 35676:return Uv;case 5124:case 35670:return Wv;case 35667:case 35671:return Gv;case 35668:case 35672:return Kv;case 35669:case 35673:return qv;case 5125:return Jv;case 36294:return Yv;case 36295:return Xv;case 36296:return Zv;case 35678:case 36198:case 36298:case 36306:case 35682:return Qv;case 35679:case 36299:case 36307:return $v;case 35680:case 36300:case 36308:case 36293:return ey;case 36289:case 36303:case 36311:case 36292:return ty}}function ry(e,t){e.uniform1fv(this.addr,t)}function iy(e,t){let n=Nv(t,this.size,2);e.uniform2fv(this.addr,n)}function ay(e,t){let n=Nv(t,this.size,3);e.uniform3fv(this.addr,n)}function oy(e,t){let n=Nv(t,this.size,4);e.uniform4fv(this.addr,n)}function sy(e,t){let n=Nv(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function cy(e,t){let n=Nv(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function ly(e,t){let n=Nv(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function uy(e,t){e.uniform1iv(this.addr,t)}function dy(e,t){e.uniform2iv(this.addr,t)}function fy(e,t){e.uniform3iv(this.addr,t)}function py(e,t){e.uniform4iv(this.addr,t)}function my(e,t){e.uniform1uiv(this.addr,t)}function hy(e,t){e.uniform2uiv(this.addr,t)}function gy(e,t){e.uniform3uiv(this.addr,t)}function _y(e,t){e.uniform4uiv(this.addr,t)}function vy(e,t,n){let r=this.cache,i=t.length,a=Iv(n,i);Pv(r,a)||(e.uniform1iv(this.addr,a),Fv(r,a));for(let e=0;e!==i;++e)n.setTexture2D(t[e]||Cv,a[e])}function yy(e,t,n){let r=this.cache,i=t.length,a=Iv(n,i);Pv(r,a)||(e.uniform1iv(this.addr,a),Fv(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Ev,a[e])}function by(e,t,n){let r=this.cache,i=t.length,a=Iv(n,i);Pv(r,a)||(e.uniform1iv(this.addr,a),Fv(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Dv,a[e])}function xy(e,t,n){let r=this.cache,i=t.length,a=Iv(n,i);Pv(r,a)||(e.uniform1iv(this.addr,a),Fv(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Tv,a[e])}function Sy(e){switch(e){case 5126:return ry;case 35664:return iy;case 35665:return ay;case 35666:return oy;case 35674:return sy;case 35675:return cy;case 35676:return ly;case 5124:case 35670:return uy;case 35667:case 35671:return dy;case 35668:case 35672:return fy;case 35669:case 35673:return py;case 5125:return my;case 36294:return hy;case 36295:return gy;case 36296:return _y;case 35678:case 36198:case 36298:case 36306:case 35682:return vy;case 35679:case 36299:case 36307:return yy;case 35680:case 36300:case 36308:case 36293:return by;case 36289:case 36303:case 36311:case 36292:return xy}}var Cy=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ny(t.type)}},wy=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Sy(t.type)}},Ty=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Ey=/(\w+)(\])?(\[|\.)?/g;function Dy(e,t){e.seq.push(t),e.map[t.id]=t}function Oy(e,t,n){let r=e.name,i=r.length;for(Ey.lastIndex=0;;){let a=Ey.exec(r),o=Ey.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Dy(n,l===void 0?new Cy(s,e,t):new wy(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Ty(s),Dy(n,e)),n=e}}}var ky=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Oy(n,e.getUniformLocation(t,n.name),this)}}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Ay(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var jy=37297,My=0;function Ny(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Py=new J;function Fy(e){Wm._getMatrix(Py,Wm.workingColorSpace,e);let t=`mat3( ${Py.elements.map(e=>e.toFixed(4))} )`;switch(Wm.getTransfer(e)){case nm:return[t,`LinearTransferOETF`];case rm:return[t,`sRGBTransferOETF`];default:return console.warn(`THREE.WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Iy(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=e.getShaderInfoLog(t).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Ny(e.getShaderSource(t),r)}return i}function Ly(e,t){let n=Fy(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}function Ry(e,t){let n;switch(t){case 1:n=`Linear`;break;case 2:n=`Reinhard`;break;case 3:n=`Cineon`;break;case 4:n=`ACESFilmic`;break;case 6:n=`AgX`;break;case 7:n=`Neutral`;break;case 5:n=`Custom`;break;default:console.warn(`THREE.WebGLProgram: Unsupported toneMapping:`,t),n=`Linear`}return`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var zy=new Y;function By(){return Wm.getLuminanceCoefficients(zy),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${zy.x.toFixed(4)}, ${zy.y.toFixed(4)}, ${zy.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Vy(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Wy).join(`
`)}function Hy(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Uy(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Wy(e){return e!==``}function Gy(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ky(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var qy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Jy(e){return e.replace(qy,Xy)}var Yy=new Map;function Xy(e,t){let n=Q[t];if(n===void 0){let e=Yy.get(t);if(e!==void 0)n=Q[e],console.warn(`THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`Can not resolve #include <`+t+`>`)}return Jy(n)}var Zy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qy(e){return e.replace(Zy,$y)}function $y(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function eb(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}function tb(e){let t=`SHADOWMAP_TYPE_BASIC`;return e.shadowMapType===1?t=`SHADOWMAP_TYPE_PCF`:e.shadowMapType===2?t=`SHADOWMAP_TYPE_PCF_SOFT`:e.shadowMapType===3&&(t=`SHADOWMAP_TYPE_VSM`),t}function nb(e){let t=`ENVMAP_TYPE_CUBE`;if(e.envMap)switch(e.envMapMode){case 301:case 302:t=`ENVMAP_TYPE_CUBE`;break;case 306:t=`ENVMAP_TYPE_CUBE_UV`}return t}function rb(e){let t=`ENVMAP_MODE_REFLECTION`;if(e.envMap)switch(e.envMapMode){case 302:t=`ENVMAP_MODE_REFRACTION`}return t}function ib(e){let t=`ENVMAP_BLENDING_NONE`;if(e.envMap)switch(e.combine){case 0:t=`ENVMAP_BLENDING_MULTIPLY`;break;case 1:t=`ENVMAP_BLENDING_MIX`;break;case 2:t=`ENVMAP_BLENDING_ADD`}return t}function ab(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function ob(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=tb(n),l=nb(n),u=rb(n),d=ib(n),f=ab(n),p=Vy(n),m=Hy(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Wy).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Wy).join(`
`),_.length>0&&(_+=`
`)):(g=[eb(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGDEPTHBUF`:``,n.reverseDepthBuffer?`#define USE_REVERSEDEPTHBUF`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Wy).join(`
`),_=[eb(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor||n.batchingColor?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGDEPTHBUF`:``,n.reverseDepthBuffer?`#define USE_REVERSEDEPTHBUF`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Q.tonemapping_pars_fragment,n.toneMapping===0?``:Ry(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Q.colorspace_pars_fragment,Ly(`linearToOutputTexel`,n.outputColorSpace),By(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Wy).join(`
`)),o=Jy(o),o=Gy(o,n),o=Ky(o,n),s=Jy(s),s=Gy(s,n),s=Ky(s,n),o=Qy(o),s=Qy(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=Ay(i,i.VERTEX_SHADER,y),S=Ay(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.morphTargets===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h).trim(),r=i.getShaderInfoLog(x).trim(),a=i.getShaderInfoLog(S).trim(),o=!0,s=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(o=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Iy(i,x,`vertex`),r=Iy(i,S,`fragment`);console.error(`THREE.WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+n+`
`+e+`
`+r)}}else n===``?(r===``||a===``)&&(s=!1):console.warn(`THREE.WebGLProgram: Program Info Log:`,n);s&&(t.diagnostics={runnable:o,programLog:n,vertexShader:{log:r,prefix:g},fragmentShader:{log:a,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new ky(i,h),T=Uy(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,jy)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=My++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var sb=0,cb=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),i=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new lb(e),t.set(e,n)),n}},lb=class{constructor(e){this.id=sb++,this.code=e,this.usedTimes=0}};function ub(e,t,n,r,i,a,o){let s=new Zh,c=new cb,l=new Set,u=[],d=i.logarithmicDepthBuffer,f=i.vertexTextures,p=i.precision,m={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distanceRGBA`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function h(e){return l.add(e),e===0?`uv`:`uv${e}`}function g(a,s,u,g,_){let v=g.fog,y=_.geometry,b=a.isMeshStandardMaterial?g.environment:null,x=(a.isMeshStandardMaterial?n:t).get(a.envMap||b),S=x&&x.mapping===306?x.image.height:null,C=m[a.type];a.precision!==null&&(p=i.getMaxPrecision(a.precision),p!==a.precision&&console.warn(`THREE.WebGLProgram.getParameters:`,a.precision,`not supported, using`,p,`instead.`));let w=y.morphAttributes.position||y.morphAttributes.normal||y.morphAttributes.color,T=w===void 0?0:w.length,E=0;y.morphAttributes.position!==void 0&&(E=1),y.morphAttributes.normal!==void 0&&(E=2),y.morphAttributes.color!==void 0&&(E=3);let D,O,k,ee;if(C){let e=R_[C];D=e.vertexShader,O=e.fragmentShader}else D=a.vertexShader,O=a.fragmentShader,c.update(a),k=c.getVertexShaderID(a),ee=c.getFragmentShaderID(a);let A=e.getRenderTarget(),te=e.state.buffers.depth.getReversed(),ne=_.isInstancedMesh===!0,re=_.isBatchedMesh===!0,ie=!!a.map,ae=!!a.matcap,oe=!!x,se=!!a.aoMap,ce=!!a.lightMap,le=!!a.bumpMap,ue=!!a.normalMap,de=!!a.displacementMap,fe=!!a.emissiveMap,pe=!!a.metalnessMap,me=!!a.roughnessMap,he=a.anisotropy>0,ge=a.clearcoat>0,_e=a.dispersion>0,j=a.iridescence>0,ve=a.sheen>0,ye=a.transmission>0,be=he&&!!a.anisotropyMap,M=ge&&!!a.clearcoatMap,xe=ge&&!!a.clearcoatNormalMap,N=ge&&!!a.clearcoatRoughnessMap,P=j&&!!a.iridescenceMap,Se=j&&!!a.iridescenceThicknessMap,Ce=ve&&!!a.sheenColorMap,we=ve&&!!a.sheenRoughnessMap,Te=!!a.specularMap,Ee=!!a.specularColorMap,De=!!a.specularIntensityMap,Oe=ye&&!!a.transmissionMap,ke=ye&&!!a.thicknessMap,Ae=!!a.gradientMap,je=!!a.alphaMap,Me=a.alphaTest>0,Ne=!!a.alphaHash,Pe=!!a.extensions,Fe=0;a.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Fe=e.toneMapping);let Ie={shaderID:C,shaderType:a.type,shaderName:a.name,vertexShader:D,fragmentShader:O,defines:a.defines,customVertexShaderID:k,customFragmentShaderID:ee,isRawShaderMaterial:a.isRawShaderMaterial===!0,glslVersion:a.glslVersion,precision:p,batching:re,batchingColor:re&&_._colorsTexture!==null,instancing:ne,instancingColor:ne&&_.instanceColor!==null,instancingMorph:ne&&_.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:A===null?e.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:tm,alphaToCoverage:!!a.alphaToCoverage,map:ie,matcap:ae,envMap:oe,envMapMode:oe&&x.mapping,envMapCubeUVHeight:S,aoMap:se,lightMap:ce,bumpMap:le,normalMap:ue,displacementMap:f&&de,emissiveMap:fe,normalMapObjectSpace:ue&&a.normalMapType===1,normalMapTangentSpace:ue&&a.normalMapType===0,metalnessMap:pe,roughnessMap:me,anisotropy:he,anisotropyMap:be,clearcoat:ge,clearcoatMap:M,clearcoatNormalMap:xe,clearcoatRoughnessMap:N,dispersion:_e,iridescence:j,iridescenceMap:P,iridescenceThicknessMap:Se,sheen:ve,sheenColorMap:Ce,sheenRoughnessMap:we,specularMap:Te,specularColorMap:Ee,specularIntensityMap:De,transmission:ye,transmissionMap:Oe,thicknessMap:ke,gradientMap:Ae,opaque:a.transparent===!1&&a.blending===1&&a.alphaToCoverage===!1,alphaMap:je,alphaTest:Me,alphaHash:Ne,combine:a.combine,mapUv:ie&&h(a.map.channel),aoMapUv:se&&h(a.aoMap.channel),lightMapUv:ce&&h(a.lightMap.channel),bumpMapUv:le&&h(a.bumpMap.channel),normalMapUv:ue&&h(a.normalMap.channel),displacementMapUv:de&&h(a.displacementMap.channel),emissiveMapUv:fe&&h(a.emissiveMap.channel),metalnessMapUv:pe&&h(a.metalnessMap.channel),roughnessMapUv:me&&h(a.roughnessMap.channel),anisotropyMapUv:be&&h(a.anisotropyMap.channel),clearcoatMapUv:M&&h(a.clearcoatMap.channel),clearcoatNormalMapUv:xe&&h(a.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:N&&h(a.clearcoatRoughnessMap.channel),iridescenceMapUv:P&&h(a.iridescenceMap.channel),iridescenceThicknessMapUv:Se&&h(a.iridescenceThicknessMap.channel),sheenColorMapUv:Ce&&h(a.sheenColorMap.channel),sheenRoughnessMapUv:we&&h(a.sheenRoughnessMap.channel),specularMapUv:Te&&h(a.specularMap.channel),specularColorMapUv:Ee&&h(a.specularColorMap.channel),specularIntensityMapUv:De&&h(a.specularIntensityMap.channel),transmissionMapUv:Oe&&h(a.transmissionMap.channel),thicknessMapUv:ke&&h(a.thicknessMap.channel),alphaMapUv:je&&h(a.alphaMap.channel),vertexTangents:!!y.attributes.tangent&&(ue||he),vertexColors:a.vertexColors,vertexAlphas:a.vertexColors===!0&&!!y.attributes.color&&y.attributes.color.itemSize===4,pointsUvs:_.isPoints===!0&&!!y.attributes.uv&&(ie||je),fog:!!v,useFog:a.fog===!0,fogExp2:!!v&&v.isFogExp2,flatShading:a.flatShading===!0,sizeAttenuation:a.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:te,skinning:_.isSkinnedMesh===!0,morphTargets:y.morphAttributes.position!==void 0,morphNormals:y.morphAttributes.normal!==void 0,morphColors:y.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numDirLights:s.directional.length,numPointLights:s.point.length,numSpotLights:s.spot.length,numSpotLightMaps:s.spotLightMap.length,numRectAreaLights:s.rectArea.length,numHemiLights:s.hemi.length,numDirLightShadows:s.directionalShadowMap.length,numPointLightShadows:s.pointShadowMap.length,numSpotLightShadows:s.spotShadowMap.length,numSpotLightShadowsWithMaps:s.numSpotLightShadowsWithMaps,numLightProbes:s.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:a.dithering,shadowMapEnabled:e.shadowMap.enabled&&u.length>0,shadowMapType:e.shadowMap.type,toneMapping:Fe,decodeVideoTexture:ie&&a.map.isVideoTexture===!0&&Wm.getTransfer(a.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:fe&&a.emissiveMap.isVideoTexture===!0&&Wm.getTransfer(a.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:a.premultipliedAlpha,doubleSided:a.side===2,flipSided:a.side===1,useDepthPacking:a.depthPacking>=0,depthPacking:a.depthPacking||0,index0AttributeName:a.index0AttributeName,extensionClipCullDistance:Pe&&a.extensions.clipCullDistance===!0&&r.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Pe&&a.extensions.multiDraw===!0||re)&&r.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:r.has(`KHR_parallel_shader_compile`),customProgramCacheKey:a.customProgramCacheKey()};return Ie.vertexUv1s=l.has(1),Ie.vertexUv2s=l.has(2),Ie.vertexUv3s=l.has(3),l.clear(),Ie}function _(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(v(n,t),y(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function v(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function y(e,t){s.disableAll(),t.supportsVertexTextures&&s.enable(0),t.instancing&&s.enable(1),t.instancingColor&&s.enable(2),t.instancingMorph&&s.enable(3),t.matcap&&s.enable(4),t.envMap&&s.enable(5),t.normalMapObjectSpace&&s.enable(6),t.normalMapTangentSpace&&s.enable(7),t.clearcoat&&s.enable(8),t.iridescence&&s.enable(9),t.alphaTest&&s.enable(10),t.vertexColors&&s.enable(11),t.vertexAlphas&&s.enable(12),t.vertexUv1s&&s.enable(13),t.vertexUv2s&&s.enable(14),t.vertexUv3s&&s.enable(15),t.vertexTangents&&s.enable(16),t.anisotropy&&s.enable(17),t.alphaHash&&s.enable(18),t.batching&&s.enable(19),t.dispersion&&s.enable(20),t.batchingColor&&s.enable(21),e.push(s.mask),s.disableAll(),t.fog&&s.enable(0),t.useFog&&s.enable(1),t.flatShading&&s.enable(2),t.logarithmicDepthBuffer&&s.enable(3),t.reverseDepthBuffer&&s.enable(4),t.skinning&&s.enable(5),t.morphTargets&&s.enable(6),t.morphNormals&&s.enable(7),t.morphColors&&s.enable(8),t.premultipliedAlpha&&s.enable(9),t.shadowMapEnabled&&s.enable(10),t.doubleSided&&s.enable(11),t.flipSided&&s.enable(12),t.useDepthPacking&&s.enable(13),t.dithering&&s.enable(14),t.transmission&&s.enable(15),t.sheen&&s.enable(16),t.opaque&&s.enable(17),t.pointsUvs&&s.enable(18),t.decodeVideoTexture&&s.enable(19),t.decodeVideoTextureEmissive&&s.enable(20),t.alphaToCoverage&&s.enable(21),e.push(s.mask)}function b(e){let t=m[e.type],n;if(t){let e=R_[t];n=m_.clone(e.uniforms)}else n=e.uniforms;return n}function x(t,n){let r;for(let e=0,t=u.length;e<t;e++){let t=u[e];if(t.cacheKey===n){r=t,++r.usedTimes;break}}return r===void 0&&(r=new ob(e,n,t,a),u.push(r)),r}function S(e){if(--e.usedTimes===0){let t=u.indexOf(e);u[t]=u[u.length-1],u.pop(),e.destroy()}}function C(e){c.remove(e)}function w(){c.dispose()}return{getParameters:g,getProgramCacheKey:_,getUniforms:b,acquireProgram:x,releaseProgram:S,releaseShaderCache:C,programs:u,dispose:w}}function db(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function fb(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.z===t.z?e.id-t.id:e.z-t.z:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function pb(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function mb(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(n,r,i,a,o,s){let c=e[t];return c===void 0?(c={id:n.id,object:n,geometry:r,material:i,groupOrder:a,renderOrder:n.renderOrder,z:o,group:s},e[t]=c):(c.id=n.id,c.object=n,c.geometry=r,c.material=i,c.groupOrder=a,c.renderOrder=n.renderOrder,c.z=o,c.group=s),t++,c}function s(e,t,a,s,c,l){let u=o(e,t,a,s,c,l);a.transmission>0?r.push(u):a.transparent===!0?i.push(u):n.push(u)}function c(e,t,a,s,c,l){let u=o(e,t,a,s,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function l(e,t){n.length>1&&n.sort(e||fb),r.length>1&&r.sort(t||pb),i.length>1&&i.sort(t||pb)}function u(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:s,unshift:c,finish:u,sort:l}}function hb(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new mb,e.set(t,[i])):n>=r.length?(i=new mb,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function gb(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={direction:new Y,color:new X};break;case`SpotLight`:n={position:new Y,direction:new Y,color:new X,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new Y,color:new X,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new Y,skyColor:new X,groundColor:new X};break;case`RectAreaLight`:n={color:new X,position:new Y,halfWidth:new Y,halfHeight:new Y}}return e[t.id]=n,n}}}function _b(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new q};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new q};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new q,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var vb=0;function yb(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function bb(e){let t=new gb,n=_b(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new Y);let i=new Y,a=new Bh,o=new Bh;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0;i.sort(yb);for(let e=0,y=i.length;e<y;e++){let y=i[e],b=y.color,x=y.intensity,S=y.distance,C=y.shadow&&y.shadow.map?y.shadow.map.texture:null;if(y.isAmbientLight)a+=b.r*x,o+=b.g*x,s+=b.b*x;else if(y.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(y.sh.coefficients[e],x);v++}else if(y.isDirectionalLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[c]=t,r.directionalShadowMap[c]=C,r.directionalShadowMatrix[c]=y.shadow.matrix,p++}r.directional[c]=e,c++}else if(y.isSpotLight){let e=t.get(y);e.position.setFromMatrixPosition(y.matrixWorld),e.color.copy(b).multiplyScalar(x),e.distance=S,e.coneCos=Math.cos(y.angle),e.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),e.decay=y.decay,r.spot[u]=e;let i=y.shadow;if(y.map&&(r.spotLightMap[g]=y.map,g++,i.updateMatrices(y),y.castShadow&&_++),r.spotLightMatrix[u]=i.matrix,y.castShadow){let e=n.get(y);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[u]=e,r.spotShadowMap[u]=C,h++}u++}else if(y.isRectAreaLight){let e=t.get(y);e.color.copy(b).multiplyScalar(x),e.halfWidth.set(y.width*.5,0,0),e.halfHeight.set(0,y.height*.5,0),r.rectArea[d]=e,d++}else if(y.isPointLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),e.distance=y.distance,e.decay=y.decay,y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[l]=t,r.pointShadowMap[l]=C,r.pointShadowMatrix[l]=y.shadow.matrix,m++}r.point[l]=e,l++}else if(y.isHemisphereLight){let e=t.get(y);e.skyColor.copy(y.color).multiplyScalar(x),e.groundColor.copy(y.groundColor).multiplyScalar(x),r.hemi[f]=e,f++}}d>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=$.LTC_FLOAT_1,r.rectAreaLTC2=$.LTC_FLOAT_2):(r.rectAreaLTC1=$.LTC_HALF_1,r.rectAreaLTC2=$.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let y=r.hash;(y.directionalLength!==c||y.pointLength!==l||y.spotLength!==u||y.rectAreaLength!==d||y.hemiLength!==f||y.numDirectionalShadows!==p||y.numPointShadows!==m||y.numSpotShadows!==h||y.numSpotMaps!==g||y.numLightProbes!==v)&&(r.directional.length=c,r.spot.length=u,r.rectArea.length=d,r.point.length=l,r.hemi.length=f,r.directionalShadow.length=p,r.directionalShadowMap.length=p,r.pointShadow.length=m,r.pointShadowMap.length=m,r.spotShadow.length=h,r.spotShadowMap.length=h,r.directionalShadowMatrix.length=p,r.pointShadowMatrix.length=m,r.spotLightMatrix.length=h+g-_,r.spotLightMap.length=g,r.numSpotLightShadowsWithMaps=_,r.numLightProbes=v,y.directionalLength=c,y.pointLength=l,y.spotLength=u,y.rectAreaLength=d,y.hemiLength=f,y.numDirectionalShadows=p,y.numPointShadows=m,y.numSpotShadows=h,y.numSpotMaps=g,y.numLightProbes=v,r.version=vb++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=t.matrixWorldInverse;for(let t=0,f=e.length;t<f;t++){let f=e[t];if(f.isDirectionalLight){let e=r.directional[n];e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),n++}else if(f.isSpotLight){let e=r.spot[c];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),c++}else if(f.isRectAreaLight){let e=r.rectArea[l];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),o.identity(),a.copy(f.matrixWorld),a.premultiply(d),o.extractRotation(a),e.halfWidth.set(f.width*.5,0,0),e.halfHeight.set(0,f.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),l++}else if(f.isPointLight){let e=r.point[s];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),s++}else if(f.isHemisphereLight){let e=r.hemi[u];e.direction.setFromMatrixPosition(f.matrixWorld),e.direction.transformDirection(d),u++}}}return{setup:s,setupView:c,state:r}}function xb(e){let t=new bb(e),n=[],r=[];function i(e){l.camera=e,n.length=0,r.length=0}function a(e){n.push(e)}function o(e){r.push(e)}function s(){t.setup(n)}function c(e){t.setupView(n,e)}let l={lightsArray:n,shadowsArray:r,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:s,setupLightsView:c,pushLight:a,pushShadow:o}}function Sb(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new xb(e),t.set(n,[a])):r>=i.length?(a=new xb(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Cb=class extends Pg{static get type(){return`MeshDepthMaterial`}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Qp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},wb=class extends Pg{static get type(){return`MeshDistanceMaterial`}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},Tb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Eb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Db(e,t,n){let r=new P_,i=new q,a=new q,o=new ah,s=new Cb({depthPacking:$p}),c=new wb,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new __({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new q},radius:{value:4}},vertexShader:Tb,fragmentShader:Eb}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new Yg;m.setAttribute(`position`,new Rg(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new Z(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==3&&this.type===3,m=_===3&&this.type!==3;for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){console.warn(`THREE.WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let h=d.getFrameExtents();if(i.multiply(h),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/h.x),i.x=a.x*h.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/h.y),i.y=a.y*h.y,d.mapSize.y=a.y)),d.map===null||p===!0||m===!0){let e=this.type===3?{}:{minFilter:Rf,magFilter:Rf};d.map!==null&&d.map.dispose(),d.map=new sh(i.x,i.y,e),d.map.texture.name=l.name+`.shadowMap`,d.camera.updateProjectionMatrix()}e.setRenderTarget(d.map),e.clear();let g=d.getViewportCount();for(let e=0;e<g;e++){let t=d.getViewport(e);o.set(a.x*t.x,a.y*t.y,a.x*t.z,a.y*t.w),f.viewport(o),d.updateMatrices(l,e),r=d.getFrustum(),b(n,s,d.camera,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null&&(n.mapPass=new sh(i.x,i.y)),f.uniforms.shadow_pass.value=n.map.texture,f.uniforms.resolution.value=n.mapSize,f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value=n.mapSize,p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||r.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}var Ob={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};function kb(e,t){function n(){let t=!1,n=new ah,r=null,i=new ah(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let e=t.get(`EXT_clip_control`);r?e.clipControlEXT(e.LOWER_LEFT_EXT,e.ZERO_TO_ONE_EXT):e.clipControlEXT(e.LOWER_LEFT_EXT,e.NEGATIVE_ONE_TO_ONE_EXT);let n=o;o=null,this.setClear(n)}r=e},getReversed:function(){return r},setTest:function(t){t?fe(e.DEPTH_TEST):pe(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Ob[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(r&&(t=1-t),e.clearDepth(t),o=t)},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?fe(e.STENCIL_TEST):pe(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f=new WeakMap,p=[],m=null,h=!1,g=null,_=null,v=null,y=null,b=null,x=null,S=null,C=new X(0,0,0),w=0,T=!1,E=null,D=null,O=null,k=null,ee=null,A=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),te=!1,ne=0,re=e.getParameter(e.VERSION);re.indexOf(`WebGL`)===-1?re.indexOf(`OpenGL ES`)!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(re)[1]),te=ne>=2):(ne=parseFloat(/^WebGL (\d)/.exec(re)[1]),te=ne>=1);let ie=null,ae={},oe=e.getParameter(e.SCISSOR_BOX),se=e.getParameter(e.VIEWPORT),ce=new ah().fromArray(oe),le=new ah().fromArray(se);function ue(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let de={};de[e.TEXTURE_2D]=ue(e.TEXTURE_2D,e.TEXTURE_2D,1),de[e.TEXTURE_CUBE_MAP]=ue(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),de[e.TEXTURE_2D_ARRAY]=ue(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),de[e.TEXTURE_3D]=ue(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),fe(e.DEPTH_TEST),o.setFunc(3),be(!1),M(1),fe(e.CULL_FACE),ve(0);function fe(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function pe(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function me(t,n){return d[t]!==n&&(e.bindFramebuffer(t,n),d[t]=n,t===e.DRAW_FRAMEBUFFER&&(d[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(d[e.DRAW_FRAMEBUFFER]=n),!0)}function he(t,n){let r=p,i=!1;if(t){r=f.get(n),r===void 0&&(r=[],f.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function ge(t){return m!==t&&(e.useProgram(t),m=t,!0)}let _e={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};_e[103]=e.MIN,_e[104]=e.MAX;let j={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ve(t,n,r,i,a,o,s,c,l,u){if(t===0)h===!0&&(pe(e.BLEND),h=!1);else if(h===!1&&(fe(e.BLEND),h=!0),t!==5){if(t!==g||u!==T){if((_!==100||b!==100)&&(e.blendEquation(e.FUNC_ADD),_=100,b=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.ZERO,e.SRC_COLOR,e.ZERO,e.SRC_ALPHA);break;default:console.error(`THREE.WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.SRC_ALPHA,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFunc(e.ZERO,e.SRC_COLOR);break;default:console.error(`THREE.WebGLState: Invalid blending: `,t)}v=null,y=null,x=null,S=null,C.set(0,0,0),w=0,g=t,T=u}}else a||=n,o||=r,s||=i,(n!==_||a!==b)&&(e.blendEquationSeparate(_e[n],_e[a]),_=n,b=a),(r!==v||i!==y||o!==x||s!==S)&&(e.blendFuncSeparate(j[r],j[i],j[o],j[s]),v=r,y=i,x=o,S=s),(c.equals(C)===!1||l!==w)&&(e.blendColor(c.r,c.g,c.b,l),C.copy(c),w=l),g=t,T=!1}function ye(t,n){t.side===2?pe(e.CULL_FACE):fe(e.CULL_FACE);let r=t.side===1;n&&(r=!r),be(r),t.blending===1&&t.transparent===!1?ve(0):ve(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),N(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?fe(e.SAMPLE_ALPHA_TO_COVERAGE):pe(e.SAMPLE_ALPHA_TO_COVERAGE)}function be(t){E!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),E=t)}function M(t){t===0?pe(e.CULL_FACE):(fe(e.CULL_FACE),t!==D&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),D=t}function xe(t){t!==O&&(te&&e.lineWidth(t),O=t)}function N(t,n,r){t?(fe(e.POLYGON_OFFSET_FILL),(k!==n||ee!==r)&&(e.polygonOffset(n,r),k=n,ee=r)):pe(e.POLYGON_OFFSET_FILL)}function P(t){t?fe(e.SCISSOR_TEST):pe(e.SCISSOR_TEST)}function Se(t){t===void 0&&(t=e.TEXTURE0+A-1),ie!==t&&(e.activeTexture(t),ie=t)}function Ce(t,n,r){r===void 0&&(r=ie===null?e.TEXTURE0+A-1:ie);let i=ae[r];i===void 0&&(i={type:void 0,texture:void 0},ae[r]=i),(i.type!==t||i.texture!==n)&&(ie!==r&&(e.activeTexture(r),ie=r),e.bindTexture(t,n||de[t]),i.type=t,i.texture=n)}function we(){let t=ae[ie];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Te(){try{e.compressedTexImage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Ee(){try{e.compressedTexImage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function De(){try{e.texSubImage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Oe(){try{e.texSubImage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function ke(){try{e.compressedTexSubImage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Ae(){try{e.compressedTexSubImage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function je(){try{e.texStorage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Me(){try{e.texStorage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Ne(){try{e.texImage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Pe(){try{e.texImage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Fe(t){ce.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ce.copy(t))}function Ie(t){le.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),le.copy(t))}function Le(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Re(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function ze(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),u={},ie=null,ae={},d={},f=new WeakMap,p=[],m=null,h=!1,g=null,_=null,v=null,y=null,b=null,x=null,S=null,C=new X(0,0,0),w=0,T=!1,E=null,D=null,O=null,k=null,ee=null,ce.set(0,0,e.canvas.width,e.canvas.height),le.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:fe,disable:pe,bindFramebuffer:me,drawBuffers:he,useProgram:ge,setBlending:ve,setMaterial:ye,setFlipSided:be,setCullFace:M,setLineWidth:xe,setPolygonOffset:N,setScissorTest:P,activeTexture:Se,bindTexture:Ce,unbindTexture:we,compressedTexImage2D:Te,compressedTexImage3D:Ee,texImage2D:Ne,texImage3D:Pe,updateUBOMapping:Le,uniformBlockBinding:Re,texStorage2D:je,texStorage3D:Me,texSubImage2D:De,texSubImage3D:Oe,compressedTexSubImage2D:ke,compressedTexSubImage3D:Ae,scissor:Fe,viewport:Ie,reset:ze}}function Ab(e,t,n,r){let i=jb(r);switch(n){case np:return e*t;case ap:return e*t;case op:return e*t*2;case lp:return e*t/i.components*i.byteLength;case up:return e*t/i.components*i.byteLength;case dp:return e*t*2/i.components*i.byteLength;case fp:return e*t*2/i.components*i.byteLength;case rp:return e*t*3/i.components*i.byteLength;case ip:return e*t*4/i.components*i.byteLength;case pp:return e*t*4/i.components*i.byteLength;case mp:case hp:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case gp:case _p:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case yp:case xp:return Math.max(e,16)*Math.max(t,8)/4;case vp:case bp:return Math.max(e,8)*Math.max(t,8)/2;case Sp:case Cp:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case wp:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Tp:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Ep:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Dp:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Op:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case kp:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Ap:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case jp:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Mp:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Np:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Pp:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Fp:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Ip:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Lp:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Rp:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case zp:case Bp:case Vp:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Hp:case Up:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Wp:case Gp:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function jb(e){switch(e){case Wf:case Gf:return{byteLength:1,components:1};case qf:case Kf:case Zf:return{byteLength:2,components:1};case Qf:case $f:return{byteLength:2,components:4};case Yf:case Jf:case Xf:return{byteLength:4,components:1};case tp:return{byteLength:4,components:3}}throw Error(`Unknown texture type ${e}.`)}function Mb(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new q,u=new WeakMap,d,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function m(e,t){return p?new OffscreenCanvas(e,t):Lm(`canvas`)}function h(e,t,n){let r=1,i=P(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);d===void 0&&(d=m(n,a));let o=t?m(n,a):d;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),console.warn(`THREE.WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&console.warn(`THREE.WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function g(e){return e.generateMipmaps}function _(t){e.generateMipmap(t)}function v(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function y(n,r,i,a,o=!1){if(n!==null){if(e[n]!==void 0)return e[n];console.warn(`THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let s=r;if(r===e.RED&&(i===e.FLOAT&&(s=e.R32F),i===e.HALF_FLOAT&&(s=e.R16F),i===e.UNSIGNED_BYTE&&(s=e.R8)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(s=e.R8UI),i===e.UNSIGNED_SHORT&&(s=e.R16UI),i===e.UNSIGNED_INT&&(s=e.R32UI),i===e.BYTE&&(s=e.R8I),i===e.SHORT&&(s=e.R16I),i===e.INT&&(s=e.R32I)),r===e.RG&&(i===e.FLOAT&&(s=e.RG32F),i===e.HALF_FLOAT&&(s=e.RG16F),i===e.UNSIGNED_BYTE&&(s=e.RG8)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(s=e.RG8UI),i===e.UNSIGNED_SHORT&&(s=e.RG16UI),i===e.UNSIGNED_INT&&(s=e.RG32UI),i===e.BYTE&&(s=e.RG8I),i===e.SHORT&&(s=e.RG16I),i===e.INT&&(s=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(s=e.RGB8UI),i===e.UNSIGNED_SHORT&&(s=e.RGB16UI),i===e.UNSIGNED_INT&&(s=e.RGB32UI),i===e.BYTE&&(s=e.RGB8I),i===e.SHORT&&(s=e.RGB16I),i===e.INT&&(s=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(s=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(s=e.RGBA16UI),i===e.UNSIGNED_INT&&(s=e.RGBA32UI),i===e.BYTE&&(s=e.RGBA8I),i===e.SHORT&&(s=e.RGBA16I),i===e.INT&&(s=e.RGBA32I)),r===e.RGB&&i===e.UNSIGNED_INT_5_9_9_9_REV&&(s=e.RGB9_E5),r===e.RGBA){let t=o?nm:Wm.getTransfer(a);i===e.FLOAT&&(s=e.RGBA32F),i===e.HALF_FLOAT&&(s=e.RGBA16F),i===e.UNSIGNED_BYTE&&(s=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT_4_4_4_4&&(s=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(s=e.RGB5_A1)}return(s===e.R16F||s===e.R32F||s===e.RG16F||s===e.RG32F||s===e.RGBA16F||s===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),s}function b(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,console.warn(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function x(e,t){return g(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function S(e){let t=e.target;t.removeEventListener(`dispose`,S),w(t),t.isVideoTexture&&u.delete(t)}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),E(t)}function w(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=f.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&T(e),Object.keys(i).length===0&&f.delete(n)}r.remove(e)}function T(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=f.get(i);delete a[n.__cacheKey],o.memory.textures--}function E(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let D=0;function O(){D=0}function k(){let e=D;return e>=i.maxTextures&&console.warn(`THREE.WebGLTextures: Trying to use `+e+` texture units while this GPU supports only `+i.maxTextures),D+=1,e}function ee(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function A(t,i){let a=r.get(t);if(t.isVideoTexture&&xe(t),t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)console.warn(`THREE.WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)console.warn(`THREE.WebGLRenderer: Texture marked for update but image is incomplete`);else{le(a,t,i);return}}n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function te(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?le(a,t,i):n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function ne(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?le(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function re(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?ue(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let ie={[Ff]:e.REPEAT,[If]:e.CLAMP_TO_EDGE,[Lf]:e.MIRRORED_REPEAT},ae={[Rf]:e.NEAREST,[zf]:e.NEAREST_MIPMAP_NEAREST,[Bf]:e.NEAREST_MIPMAP_LINEAR,[Vf]:e.LINEAR,[Hf]:e.LINEAR_MIPMAP_NEAREST,[Uf]:e.LINEAR_MIPMAP_LINEAR},oe={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function se(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&console.warn(`THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ie[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ie[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ie[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ae[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ae[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,oe[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function ce(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,S));let i=n.source,a=f.get(i);a===void 0&&(a={},f.set(i,a));let s=ee(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&T(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function le(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=ce(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let d=r.get(u);if(u.version!==d.__version||l===!0){n.activeTexture(e.TEXTURE0+s);let t=Wm.getPrimaries(Wm.workingColorSpace),r=o.colorSpace===``?null:Wm.getPrimaries(o.colorSpace),f=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,f);let p=h(o.image,!1,i.maxTextureSize);p=N(o,p);let m=a.convert(o.format,o.colorSpace),v=a.convert(o.type),S=y(o.internalFormat,m,v,o.colorSpace,o.isVideoTexture);se(c,o);let C,w=o.mipmaps,T=o.isVideoTexture!==!0,E=d.__version===void 0||l===!0,D=u.dataReady,O=x(o,p);if(o.isDepthTexture)S=b(o.format===cp,o.type),E&&(T?n.texStorage2D(e.TEXTURE_2D,1,S,p.width,p.height):n.texImage2D(e.TEXTURE_2D,0,S,p.width,p.height,0,m,v,null));else if(o.isDataTexture){if(w.length>0){T&&E&&n.texStorage2D(e.TEXTURE_2D,O,S,w[0].width,w[0].height);for(let t=0,r=w.length;t<r;t++)C=w[t],T?D&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,C.width,C.height,m,v,C.data):n.texImage2D(e.TEXTURE_2D,t,S,C.width,C.height,0,m,v,C.data);o.generateMipmaps=!1}else T?(E&&n.texStorage2D(e.TEXTURE_2D,O,S,p.width,p.height),D&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,p.width,p.height,m,v,p.data)):n.texImage2D(e.TEXTURE_2D,0,S,p.width,p.height,0,m,v,p.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){T&&E&&n.texStorage3D(e.TEXTURE_2D_ARRAY,O,S,w[0].width,w[0].height,p.depth);for(let t=0,r=w.length;t<r;t++)if(C=w[t],o.format!==1023){if(m!==null){if(T){if(D){if(o.layerUpdates.size>0){let r=Ab(C.width,C.height,o.format,o.type);for(let i of o.layerUpdates){let a=C.data.subarray(i*r/C.data.BYTES_PER_ELEMENT,(i+1)*r/C.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,t,0,0,i,C.width,C.height,1,m,a)}o.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,t,0,0,0,C.width,C.height,p.depth,m,C.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,t,S,C.width,C.height,p.depth,0,C.data,0,0)}else console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else T?D&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,t,0,0,0,C.width,C.height,p.depth,m,v,C.data):n.texImage3D(e.TEXTURE_2D_ARRAY,t,S,C.width,C.height,p.depth,0,m,v,C.data)}else{T&&E&&n.texStorage2D(e.TEXTURE_2D,O,S,w[0].width,w[0].height);for(let t=0,r=w.length;t<r;t++)C=w[t],o.format===1023?T?D&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,C.width,C.height,m,v,C.data):n.texImage2D(e.TEXTURE_2D,t,S,C.width,C.height,0,m,v,C.data):m===null?console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):T?D&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,C.width,C.height,m,C.data):n.compressedTexImage2D(e.TEXTURE_2D,t,S,C.width,C.height,0,C.data)}}else if(o.isDataArrayTexture){if(T){if(E&&n.texStorage3D(e.TEXTURE_2D_ARRAY,O,S,p.width,p.height,p.depth),D){if(o.layerUpdates.size>0){let t=Ab(p.width,p.height,o.format,o.type);for(let r of o.layerUpdates){let i=p.data.subarray(r*t/p.data.BYTES_PER_ELEMENT,(r+1)*t/p.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,r,p.width,p.height,1,m,v,i)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,p.width,p.height,p.depth,m,v,p.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,S,p.width,p.height,p.depth,0,m,v,p.data)}else if(o.isData3DTexture)T?(E&&n.texStorage3D(e.TEXTURE_3D,O,S,p.width,p.height,p.depth),D&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,p.width,p.height,p.depth,m,v,p.data)):n.texImage3D(e.TEXTURE_3D,0,S,p.width,p.height,p.depth,0,m,v,p.data);else if(o.isFramebufferTexture){if(E){if(T)n.texStorage2D(e.TEXTURE_2D,O,S,p.width,p.height);else{let t=p.width,r=p.height;for(let i=0;i<O;i++)n.texImage2D(e.TEXTURE_2D,i,S,t,r,0,m,v,null),t>>=1,r>>=1}}}else if(w.length>0){if(T&&E){let t=P(w[0]);n.texStorage2D(e.TEXTURE_2D,O,S,t.width,t.height)}for(let t=0,r=w.length;t<r;t++)C=w[t],T?D&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,m,v,C):n.texImage2D(e.TEXTURE_2D,t,S,m,v,C);o.generateMipmaps=!1}else if(T){if(E){let t=P(p);n.texStorage2D(e.TEXTURE_2D,O,S,t.width,t.height)}D&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,m,v,p)}else n.texImage2D(e.TEXTURE_2D,0,S,m,v,p);g(o)&&_(c),d.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ue(t,o,s){if(o.image.length!==6)return;let c=ce(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=Wm.getPrimaries(Wm.workingColorSpace),r=o.colorSpace===``?null:Wm.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=h(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=N(o,m[e]);let v=m[0],b=a.convert(o.format,o.colorSpace),S=a.convert(o.type),C=y(o.internalFormat,b,S,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=x(o,v);se(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,v.width,v.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,b,S,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,b,S,i.data):b===null?console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,b,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=P(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,b,S,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,b,S,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,b,S,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,b,S,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,b,S,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,b,S,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,b,S,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,b,S,i.image[t])}}}g(o)&&_(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function de(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=y(o.internalFormat,d,f,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),M(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,be(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function fe(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=b(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,l=be(n);M(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,l,o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,l,o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=y(o.internalFormat,c,l,o.colorSpace),d=be(n);r&&M(n)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,d,u,n.width,n.height):M(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,d,u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function pe(t,i){if(i&&i.isWebGLCubeRenderTarget)throw Error(`Depth Texture with cube render targets is not supported`);if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`renderTarget.depthTexture must be an instance of THREE.DepthTexture`);let a=r.get(i.depthTexture);a.__renderTarget=i,a.__webglTexture&&i.depthTexture.image.width===i.width&&i.depthTexture.image.height===i.height||(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),A(i.depthTexture,0);let o=a.__webglTexture,c=be(i);if(i.depthTexture.format===1026)M(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,o,0,c):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,o,0);else if(i.depthTexture.format===1027)M(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,o,0,c):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,o,0);else throw Error(`Unknown depthTexture format`)}function me(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)throw Error(`target.depthTexture not supported in Cube render targets`);pe(i.__webglFramebuffer,t)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),fe(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),fe(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function he(t,n,i){let a=r.get(t);n!==void 0&&de(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&me(t)}function ge(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,C);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&M(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=y(r.internalFormat,i,o,r.colorSpace,t.isXRRenderTarget===!0),u=be(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),fe(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),se(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)de(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else de(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);g(i)&&_(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a);n.bindTexture(e.TEXTURE_2D,o.__webglTexture),se(e.TEXTURE_2D,a),de(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,e.TEXTURE_2D,0),g(a)&&_(e.TEXTURE_2D)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),se(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)de(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else de(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);g(i)&&_(r),n.unbindTexture()}t.depthBuffer&&me(t)}function _e(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(g(a)){let t=v(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),_(t),n.unbindTexture()}}}let j=[],ve=[];function ye(t){if(t.samples>0){if(M(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(j.length=0,ve.length=0,j.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.resolveDepthBuffer===!1&&(j.push(l),ve.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,ve)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,j))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.resolveDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function be(e){return Math.min(i.maxSamples,e.samples)}function M(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function xe(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function N(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Wm.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&console.warn(`THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):console.error(`THREE.WebGLTextures: Unsupported texture color space:`,n)),t}function P(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=O,this.setTexture2D=A,this.setTexture2DArray=te,this.setTexture3D=ne,this.setTextureCube=re,this.rebindTextures=he,this.setupRenderTarget=ge,this.updateRenderTargetMipmap=_e,this.updateMultisampleRenderTarget=ye,this.setupDepthRenderbuffer=me,this.setupFrameBufferTexture=de,this.useMultisampledRTT=M}function Nb(e,t){function n(n,r=``){let i,a=Wm.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1024)return e.LUMINANCE;if(n===1025)return e.LUMINANCE_ALPHA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36492)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Pb=class extends S_{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Fb=class extends pg{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Ib={type:`move`},Lb=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Fb,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Fb,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Fb,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Y),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ib)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Fb;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Rb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,zb=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Bb=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let r=new ih,i=e.properties.get(r);i.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new __({vertexShader:Rb,fragmentShader:zb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Z(new L_(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Vb=class extends sm{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=new Bb,h=t.getContextAttributes(),g=null,_=null,v=[],y=[],b=new q,x=null,S=new S_;S.viewport=new ah;let C=new S_;C.viewport=new ah;let w=[S,C],T=new Pb,E=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=v[e];return t===void 0&&(t=new Lb,v[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=v[e];return t===void 0&&(t=new Lb,v[e]=t),t.getGripSpace()},this.getHand=function(e){let t=v[e];return t===void 0&&(t=new Lb,v[e]=t),t.getHandSpace()};function O(e){let t=y.indexOf(e.inputSource);if(t===-1)return;let n=v[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function k(){r.removeEventListener(`select`,O),r.removeEventListener(`selectstart`,O),r.removeEventListener(`selectend`,O),r.removeEventListener(`squeeze`,O),r.removeEventListener(`squeezestart`,O),r.removeEventListener(`squeezeend`,O),r.removeEventListener(`end`,k),r.removeEventListener(`inputsourceschange`,ee);for(let e=0;e<v.length;e++){let t=y[e];t!==null&&(y[e]=null,v[e].disconnect(t))}E=null,D=null,m.reset(),e.setRenderTarget(g),f=null,d=null,u=null,r=null,_=null,se.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(b.width,b.height,!1),n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&console.warn(`THREE.WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&console.warn(`THREE.WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(g=e.getRenderTarget(),r.addEventListener(`select`,O),r.addEventListener(`selectstart`,O),r.addEventListener(`selectend`,O),r.addEventListener(`squeeze`,O),r.addEventListener(`squeezestart`,O),r.addEventListener(`squeezeend`,O),r.addEventListener(`end`,k),r.addEventListener(`inputsourceschange`,ee),h.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(b),r.renderState.layers===void 0){let n={antialias:h.antialias,alpha:!0,depth:h.depth,stencil:h.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new sh(f.framebufferWidth,f.framebufferHeight,{format:ip,type:Wf,colorSpace:e.outputColorSpace,stencilBuffer:h.stencil})}else{let n=null,a=null,o=null;h.depth&&(o=h.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=h.stencil?cp:sp,a=h.stencil?ep:Yf);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=new XRWebGLBinding(r,t),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),_=new sh(d.textureWidth,d.textureHeight,{format:ip,type:Wf,depthTexture:new Sv(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:h.stencil,colorSpace:e.outputColorSpace,samples:h.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),se.setContext(r),se.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ee(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=y.indexOf(n);r>=0&&(y[r]=null,v[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=y.indexOf(n);if(r===-1){for(let e=0;e<v.length;e++)if(e>=y.length){y.push(n),r=e;break}else if(y[e]===null){y[e]=n,r=e;break}if(r===-1)break}let i=v[r];i&&i.connect(n)}}let A=new Y,te=new Y;function ne(e,t,n){A.setFromMatrixPosition(t.matrixWorld),te.setFromMatrixPosition(n.matrixWorld);let r=A.distanceTo(te),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function re(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;m.texture!==null&&(m.depthNear>0&&(t=m.depthNear),m.depthFar>0&&(n=m.depthFar)),T.near=C.near=S.near=t,T.far=C.far=S.far=n,(E!==T.near||D!==T.far)&&(r.updateRenderState({depthNear:T.near,depthFar:T.far}),E=T.near,D=T.far),S.layers.mask=e.layers.mask|2,C.layers.mask=e.layers.mask|4,T.layers.mask=S.layers.mask|C.layers.mask;let i=e.parent,a=T.cameras;re(T,i);for(let e=0;e<a.length;e++)re(a[e],i);a.length===2?ne(T,S,C):T.projectionMatrix.copy(S.projectionMatrix),ie(e,T,i)};function ie(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=dm*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return T},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(T)};let ae=null;function oe(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(_,f.framebuffer),e.setRenderTarget(_));let n=!1;t.length!==T.cameras.length&&(T.cameras.length=0,n=!0);for(let r=0;r<t.length;r++){let i=t[r],a=null;if(f!==null)a=f.getViewport(i);else{let t=u.getViewSubImage(d,i);a=t.viewport,r===0&&(e.setRenderTargetTextures(_,t.colorTexture,d.ignoreDepthValues?void 0:t.depthStencilTexture),e.setRenderTarget(_))}let o=w[r];o===void 0&&(o=new S_,o.layers.enable(r),o.viewport=new ah,w[r]=o),o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(i.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),r===0&&(T.matrix.copy(o.matrix),T.matrix.decompose(T.position,T.quaternion,T.scale)),n===!0&&T.cameras.push(o)}let i=r.enabledFeatures;if(i&&i.includes(`depth-sensing`)){let n=u.getDepthInformation(t[0]);n&&n.isValid&&n.texture&&m.init(e,n,r.renderState)}}for(let e=0;e<v.length;e++){let t=y[e],n=v[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ae&&ae(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let se=new F_;se.setAnimationLoop(oe),this.setAnimationLoop=function(e){ae=e},this.dispose=function(){}}},Hb=new Xh,Ub=new Bh;function Wb(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,p_(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isMeshBasicMaterial||t.isMeshLambertMaterial?a(e,t):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,Hb.copy(o),Hb.x*=-1,Hb.y*=-1,Hb.z*=-1,a.isCubeTexture&&a.isRenderTargetTexture===!1&&(Hb.y*=-1,Hb.z*=-1),e.envMapRotation.value.setFromMatrix4(Ub.makeRotationFromEuler(Hb)),e.flipEnvMap.value=a.isCubeTexture&&a.isRenderTargetTexture===!1?-1:1,e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Gb(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(m(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return console.error(`THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let t=0,n=r.length;t<n;t++){let n=Array.isArray(r[t])?r[t]:[r[t]];for(let r=0,i=n.length;r<i;r++){let i=n[r];if(p(i,t,r,a)===!0){let t=i.__offset,n=Array.isArray(i.value)?i.value:[i.value],r=0;for(let a=0;a<n.length;a++){let o=n[a],s=h(o);typeof o==`number`||typeof o==`boolean`?(i.__data[0]=o,e.bufferSubData(e.UNIFORM_BUFFER,t+r,i.__data)):o.isMatrix3?(i.__data[0]=o.elements[0],i.__data[1]=o.elements[1],i.__data[2]=o.elements[2],i.__data[3]=0,i.__data[4]=o.elements[3],i.__data[5]=o.elements[4],i.__data[6]=o.elements[5],i.__data[7]=0,i.__data[8]=o.elements[6],i.__data[9]=o.elements[7],i.__data[10]=o.elements[8],i.__data[11]=0):(o.toArray(i.__data,r),r+=s.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,t,i.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=h(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?console.warn(`THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.`):console.warn(`THREE.WebGLRenderer: Unsupported uniform value type.`,e),t}function g(t){let n=t.target;n.removeEventListener(`dispose`,g);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:_}}var Kb=class{constructor(e={}){let{canvas:t=Rm(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);f=n.getContextAttributes().alpha}else f=a;let p=new Uint32Array(4),m=new Int32Array(4),h=null,g=null,_=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=em,this.toneMapping=0,this.toneMappingExposure=1;let y=this,b=!1,x=0,S=0,C=null,w=-1,T=null,E=new ah,D=new ah,O=null,k=new X(0),ee=0,A=t.width,te=t.height,ne=1,re=null,ie=null,ae=new ah(0,0,A,te),oe=new ah(0,0,A,te),se=!1,ce=new P_,le=!1,ue=!1,de=new Bh,fe=new Bh,pe=new Y,me=new ah,he={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ge=!1;function _e(){return C===null?ne:1}let j=n;function ve(e,n){return t.getContext(e,n)}try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r170`),t.addEventListener(`webglcontextlost`,He,!1),t.addEventListener(`webglcontextrestored`,Ue,!1),t.addEventListener(`webglcontextcreationerror`,We,!1),j===null){let t=`webgl2`;if(j=ve(t,e),j===null)throw ve(t)?Error(`Error creating WebGL context with your selected attributes.`):Error(`Error creating WebGL context.`)}}catch(e){throw console.error(`THREE.WebGLRenderer: `+e.message),e}let ye,be,M,xe,N,P,Se,Ce,we,Te,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze;function Be(){ye=new gv(j),ye.init(),Le=new Nb(j,ye),be=new G_(j,ye,e,Le),M=new kb(j,ye),be.reverseDepthBuffer&&d&&M.buffers.depth.setReversed(!0),xe=new yv(j),N=new db,P=new Mb(j,ye,M,N,be,Le,xe),Se=new q_(y),Ce=new hv(y),we=new I_(j),Re=new U_(j,we),Te=new _v(j,we,xe,Re),Ee=new xv(j,Te,we,xe),Pe=new bv(j,be,P),je=new K_(N),De=new ub(y,Se,Ce,ye,be,Re,je),Oe=new Wb(y,N),ke=new hb,Ae=new Sb(ye),Ne=new H_(y,Se,Ce,M,Ee,f,s),Me=new Db(y,Ee,be),ze=new Gb(j,xe,be,M),Fe=new W_(j,ye,xe),Ie=new vv(j,ye,xe),xe.programs=De.programs,y.capabilities=be,y.extensions=ye,y.properties=N,y.renderLists=ke,y.shadowMap=Me,y.state=M,y.info=xe}Be();let Ve=new Vb(y,j);this.xr=Ve,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){let e=ye.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=ye.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(e){e!==void 0&&(ne=e,this.setSize(A,te,!1))},this.getSize=function(e){return e.set(A,te)},this.setSize=function(e,n,r=!0){Ve.isPresenting?console.warn(`THREE.WebGLRenderer: Can't change size while VR device is presenting.`):(A=e,te=n,t.width=Math.floor(e*ne),t.height=Math.floor(n*ne),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(A*ne,te*ne).floor()},this.setDrawingBufferSize=function(e,n,r){A=e,te=n,ne=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.getCurrentViewport=function(e){return e.copy(E)},this.getViewport=function(e){return e.copy(ae)},this.setViewport=function(e,t,n,r){e.isVector4?ae.set(e.x,e.y,e.z,e.w):ae.set(e,t,n,r),M.viewport(E.copy(ae).multiplyScalar(ne).round())},this.getScissor=function(e){return e.copy(oe)},this.setScissor=function(e,t,n,r){e.isVector4?oe.set(e.x,e.y,e.z,e.w):oe.set(e,t,n,r),M.scissor(D.copy(oe).multiplyScalar(ne).round())},this.getScissorTest=function(){return se},this.setScissorTest=function(e){M.setScissorTest(se=e)},this.setOpaqueSort=function(e){re=e},this.setTransparentSort=function(e){ie=e},this.getClearColor=function(e){return e.copy(Ne.getClearColor())},this.setClearColor=function(){Ne.setClearColor.apply(Ne,arguments)},this.getClearAlpha=function(){return Ne.getClearAlpha()},this.setClearAlpha=function(){Ne.setClearAlpha.apply(Ne,arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(C!==null){let t=C.texture.format;e=t===1033||t===1031||t===1029}if(e){let e=C.texture.type,t=e===1009||e===1014||e===1012||e===1020||e===1017||e===1018,n=Ne.getClearColor(),r=Ne.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(p[0]=i,p[1]=a,p[2]=o,p[3]=r,j.clearBufferuiv(j.COLOR,0,p)):(m[0]=i,m[1]=a,m[2]=o,m[3]=r,j.clearBufferiv(j.COLOR,0,m))}else r|=j.COLOR_BUFFER_BIT}t&&(r|=j.DEPTH_BUFFER_BIT),n&&(r|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),j.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener(`webglcontextlost`,He,!1),t.removeEventListener(`webglcontextrestored`,Ue,!1),t.removeEventListener(`webglcontextcreationerror`,We,!1),ke.dispose(),Ae.dispose(),N.dispose(),Se.dispose(),Ce.dispose(),Ee.dispose(),Re.dispose(),ze.dispose(),De.dispose(),Ve.dispose(),Ve.removeEventListener(`sessionstart`,Ze),Ve.removeEventListener(`sessionend`,Qe),$e.stop()};function He(e){e.preventDefault(),console.log(`THREE.WebGLRenderer: Context Lost.`),b=!0}function Ue(){console.log(`THREE.WebGLRenderer: Context Restored.`),b=!1;let e=xe.autoReset,t=Me.enabled,n=Me.autoUpdate,r=Me.needsUpdate,i=Me.type;Be(),xe.autoReset=e,Me.enabled=t,Me.autoUpdate=n,Me.needsUpdate=r,Me.type=i}function We(e){console.error(`THREE.WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function Ge(e){let t=e.target;t.removeEventListener(`dispose`,Ge),Ke(t)}function Ke(e){qe(e),N.remove(e)}function qe(e){let t=N.get(e).programs;t!==void 0&&(t.forEach(function(e){De.releaseProgram(e)}),e.isShaderMaterial&&De.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=he);let o=i.isMesh&&i.matrixWorld.determinant()<0,s=ct(e,t,n,r,i);M.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Te.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Re.setup(i,r,s,n,c);let h,g=Fe;if(c!==null&&(h=we.get(c),g=Ie,g.setIndex(h)),i.isMesh)r.wireframe===!0?(M.setLineWidth(r.wireframeLinewidth*_e()),g.setMode(j.LINES)):g.setMode(j.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),M.setLineWidth(e*_e()),i.isLineSegments?g.setMode(j.LINES):i.isLineLoop?g.setMode(j.LINE_LOOP):g.setMode(j.LINE_STRIP)}else i.isPoints?g.setMode(j.POINTS):i.isSprite&&g.setMode(j.TRIANGLES);if(i.isBatchedMesh){if(i._multiDrawInstances!==null)g.renderMultiDrawInstances(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount,i._multiDrawInstances);else if(ye.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?we.get(c).bytesPerElement:1,o=N.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(j,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function Je(e,t,n){e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,at(e,t,n),e.side=0,e.needsUpdate=!0,at(e,t,n),e.side=2):at(e,t,n)}this.compile=function(e,t,n=null){n===null&&(n=e),g=Ae.get(n),g.init(t),v.push(g),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(g.pushLight(e),e.castShadow&&g.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(g.pushLight(e),e.castShadow&&g.pushShadow(e))}),g.setupLights();let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let t=e.material;if(t){if(Array.isArray(t))for(let i=0;i<t.length;i++){let a=t[i];Je(a,n,e),r.add(a)}else Je(t,n,e),r.add(t)}}),v.pop(),g=null,r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){N.get(e).currentProgram.isReady()&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}ye.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let Ye=null;function Xe(e){Ye&&Ye(e)}function Ze(){$e.stop()}function Qe(){$e.start()}let $e=new F_;$e.setAnimationLoop(Xe),typeof self<`u`&&$e.setContext(self),this.setAnimationLoop=function(e){Ye=e,Ve.setAnimationLoop(e),e===null?$e.stop():$e.start()},Ve.addEventListener(`sessionstart`,Ze),Ve.addEventListener(`sessionend`,Qe),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){console.error(`THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(b===!0)return;if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Ve.enabled===!0&&Ve.isPresenting===!0&&(Ve.cameraAutoUpdate===!0&&Ve.updateCamera(t),t=Ve.getCamera()),e.isScene===!0&&e.onBeforeRender(y,e,t,C),g=Ae.get(e,v.length),g.init(t),v.push(g),fe.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),ce.setFromProjectionMatrix(fe),ue=this.localClippingEnabled,le=je.init(this.clippingPlanes,ue),h=ke.get(e,_.length),h.init(),_.push(h),Ve.enabled===!0&&Ve.isPresenting===!0){let e=y.xr.getDepthSensingMesh();e!==null&&et(e,t,-1/0,y.sortObjects)}et(e,t,0,y.sortObjects),h.finish(),y.sortObjects===!0&&h.sort(re,ie),ge=Ve.enabled===!1||Ve.isPresenting===!1||Ve.hasDepthSensing()===!1,ge&&Ne.addToRenderList(h,e),this.info.render.frame++,le===!0&&je.beginShadows();let n=g.state.shadowsArray;Me.render(n,e,t),le===!0&&je.endShadows(),this.info.autoReset===!0&&this.info.reset();let r=h.opaque,i=h.transmissive;if(g.setupLights(),t.isArrayCamera){let n=t.cameras;if(i.length>0)for(let t=0,a=n.length;t<a;t++){let a=n[t];nt(r,i,e,a)}ge&&Ne.render(e);for(let t=0,r=n.length;t<r;t++){let r=n[t];tt(h,e,r,r.viewport)}}else i.length>0&&nt(r,i,e,t),ge&&Ne.render(e),tt(h,e,t);C!==null&&(P.updateMultisampleRenderTarget(C),P.updateRenderTargetMipmap(C)),e.isScene===!0&&e.onAfterRender(y,e,t),Re.resetDefaultState(),w=-1,T=null,v.pop(),v.length>0?(g=v[v.length-1],le===!0&&je.setGlobalState(y.clippingPlanes,g.state.camera)):g=null,_.pop(),h=_.length>0?_[_.length-1]:null};function et(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)g.pushLight(e),e.castShadow&&g.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||ce.intersectsSprite(e)){r&&me.setFromMatrixPosition(e.matrixWorld).applyMatrix4(fe);let t=Ee.update(e),i=e.material;i.visible&&h.push(e,t,i,n,me.z,null)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||ce.intersectsObject(e))){let t=Ee.update(e),i=e.material;if(r&&(e.boundingSphere===void 0?(t.boundingSphere===null&&t.computeBoundingSphere(),me.copy(t.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),me.copy(e.boundingSphere.center)),me.applyMatrix4(e.matrixWorld).applyMatrix4(fe)),Array.isArray(i)){let r=t.groups;for(let a=0,o=r.length;a<o;a++){let o=r[a],s=i[o.materialIndex];s&&s.visible&&h.push(e,t,s,n,me.z,o)}}else i.visible&&h.push(e,t,i,n,me.z,null)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)et(i[e],t,n,r)}function tt(e,t,n,r){let i=e.opaque,a=e.transmissive,o=e.transparent;g.setupLightsView(n),le===!0&&je.setGlobalState(y.clippingPlanes,n),r&&M.viewport(E.copy(r)),i.length>0&&rt(i,t,n),a.length>0&&rt(a,t,n),o.length>0&&rt(o,t,n),M.buffers.depth.setTest(!0),M.buffers.depth.setMask(!0),M.buffers.color.setMask(!0),M.setPolygonOffset(!1)}function nt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[r.id]===void 0&&(g.state.transmissionRenderTarget[r.id]=new sh(1,1,{generateMipmaps:!0,type:ye.has(`EXT_color_buffer_half_float`)||ye.has(`EXT_color_buffer_float`)?Zf:Wf,minFilter:Uf,samples:4,stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Wm.workingColorSpace}));let a=g.state.transmissionRenderTarget[r.id],o=r.viewport||E;a.setSize(o.z,o.w);let s=y.getRenderTarget();y.setRenderTarget(a),y.getClearColor(k),ee=y.getClearAlpha(),ee<1&&y.setClearColor(16777215,.5),y.clear(),ge&&Ne.render(n);let c=y.toneMapping;y.toneMapping=0;let l=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),g.setupLightsView(r),le===!0&&je.setGlobalState(y.clippingPlanes,r),rt(e,n,r),P.updateMultisampleRenderTarget(a),P.updateRenderTargetMipmap(a),ye.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let a=t[i],o=a.object,s=a.geometry,c=a.material,l=a.group;if(c.side===2&&o.layers.test(r.layers)){let t=c.side;c.side=1,c.needsUpdate=!0,it(o,n,r,s,c,l),c.side=t,c.needsUpdate=!0,e=!0}}e===!0&&(P.updateMultisampleRenderTarget(a),P.updateRenderTargetMipmap(a))}y.setRenderTarget(s),y.setClearColor(k,ee),l!==void 0&&(r.viewport=l),y.toneMapping=c}function rt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],o=a.object,s=a.geometry,c=r===null?a.material:r,l=a.group;o.layers.test(n.layers)&&it(o,t,n,s,c,l)}}function it(e,t,n,r,i,a){e.onBeforeRender(y,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(y,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,y.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,y.renderBufferDirect(n,t,r,i,e,a),i.side=2):y.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(y,t,n,r,i,a)}function at(e,t,n){t.isScene!==!0&&(t=he);let r=N.get(e),i=g.state.lights,a=g.state.shadowsArray,o=i.state.version,s=De.getParameters(e,i.state,a,t,n),c=De.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial?t.environment:null,r.fog=t.fog,r.envMap=(e.isMeshStandardMaterial?Ce:Se).get(e.envMap||r.environment),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,Ge),l=new Map,r.programs=l);let u=l.get(c);if(u!==void 0){if(r.currentProgram===u&&r.lightsStateVersion===o)return st(e,s),u}else s.uniforms=De.getUniforms(e),e.onBeforeCompile(s,y),u=De.acquireProgram(s,c),l.set(c,u),r.uniforms=s.uniforms;let d=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(d.clippingPlanes=je.uniform),st(e,s),r.needsLights=ut(e),r.lightsStateVersion=o,r.needsLights&&(d.ambientLightColor.value=i.state.ambient,d.lightProbe.value=i.state.probe,d.directionalLights.value=i.state.directional,d.directionalLightShadows.value=i.state.directionalShadow,d.spotLights.value=i.state.spot,d.spotLightShadows.value=i.state.spotShadow,d.rectAreaLights.value=i.state.rectArea,d.ltc_1.value=i.state.rectAreaLTC1,d.ltc_2.value=i.state.rectAreaLTC2,d.pointLights.value=i.state.point,d.pointLightShadows.value=i.state.pointShadow,d.hemisphereLights.value=i.state.hemi,d.directionalShadowMap.value=i.state.directionalShadowMap,d.directionalShadowMatrix.value=i.state.directionalShadowMatrix,d.spotShadowMap.value=i.state.spotShadowMap,d.spotLightMatrix.value=i.state.spotLightMatrix,d.spotLightMap.value=i.state.spotLightMap,d.pointShadowMap.value=i.state.pointShadowMap,d.pointShadowMatrix.value=i.state.pointShadowMatrix),r.currentProgram=u,r.uniformsList=null,u}function ot(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=ky.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function st(e,t){let n=N.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function ct(e,t,n,r,i){t.isScene!==!0&&(t=he),P.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial?t.environment:null,s=C===null?y.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:tm,c=(r.isMeshStandardMaterial?Ce:Se).get(r.envMap||o),l=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,u=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),d=!!n.morphAttributes.position,f=!!n.morphAttributes.normal,p=!!n.morphAttributes.color,m=0;r.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(m=y.toneMapping);let h=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=h===void 0?0:h.length,v=N.get(r),b=g.state.lights;if(le===!0&&(ue===!0||e!==T)){let t=e===T&&r.id===w;je.setState(r,e,t)}let x=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==b.state.version?x=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i.colorTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i.colorTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?x=!0:v.envMap===c?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==je.numPlanes||v.numIntersection!==je.numIntersection)?x=!0:v.vertexAlphas===l&&v.vertexTangents===u&&v.morphTargets===d&&v.morphNormals===f&&v.morphColors===p&&v.toneMapping===m?v.morphTargetsCount!==_&&(x=!0):x=!0:x=!0:x=!0:(x=!0,v.__version=r.version);let S=v.currentProgram;x===!0&&(S=at(r,t,i));let E=!1,D=!1,O=!1,k=S.getUniforms(),ee=v.uniforms;if(M.useProgram(S.program)&&(E=!0,D=!0,O=!0),r.id!==w&&(w=r.id,D=!0),E||T!==e){M.buffers.depth.getReversed()?(de.copy(e.projectionMatrix),Hm(de),Um(de),k.setValue(j,`projectionMatrix`,de)):k.setValue(j,`projectionMatrix`,e.projectionMatrix),k.setValue(j,`viewMatrix`,e.matrixWorldInverse);let t=k.map.cameraPosition;t!==void 0&&t.setValue(j,pe.setFromMatrixPosition(e.matrixWorld)),be.logarithmicDepthBuffer&&k.setValue(j,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&k.setValue(j,`isOrthographic`,e.isOrthographicCamera===!0),T!==e&&(T=e,D=!0,O=!0)}if(i.isSkinnedMesh){k.setOptional(j,i,`bindMatrix`),k.setOptional(j,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),k.setValue(j,`boneTexture`,e.boneTexture,P))}i.isBatchedMesh&&(k.setOptional(j,i,`batchingTexture`),k.setValue(j,`batchingTexture`,i._matricesTexture,P),k.setOptional(j,i,`batchingIdTexture`),k.setValue(j,`batchingIdTexture`,i._indirectTexture,P),k.setOptional(j,i,`batchingColorTexture`),i._colorsTexture!==null&&k.setValue(j,`batchingColorTexture`,i._colorsTexture,P));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&Pe.update(i,n,S),(D||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,k.setValue(j,`receiveShadow`,i.receiveShadow)),r.isMeshGouraudMaterial&&r.envMap!==null&&(ee.envMap.value=c,ee.flipEnvMap.value=c.isCubeTexture&&c.isRenderTargetTexture===!1?-1:1),r.isMeshStandardMaterial&&r.envMap===null&&t.environment!==null&&(ee.envMapIntensity.value=t.environmentIntensity),D&&(k.setValue(j,`toneMappingExposure`,y.toneMappingExposure),v.needsLights&&lt(ee,O),a&&r.fog===!0&&Oe.refreshFogUniforms(ee,a),Oe.refreshMaterialUniforms(ee,r,ne,te,g.state.transmissionRenderTarget[e.id]),ky.upload(j,ot(v),ee,P)),r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(ky.upload(j,ot(v),ee,P),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&k.setValue(j,`center`,i.center),k.setValue(j,`modelViewMatrix`,i.modelViewMatrix),k.setValue(j,`normalMatrix`,i.normalMatrix),k.setValue(j,`modelMatrix`,i.matrixWorld),r.isShaderMaterial||r.isRawShaderMaterial){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];ze.update(n,S),ze.bind(n,S)}}return S}function lt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function ut(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return x},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(e,t,n){N.get(e.texture).__webglTexture=t,N.get(e.depthTexture).__webglTexture=n;let r=N.get(e);r.__hasExternalTextures=!0,r.__autoAllocateDepthBuffer=n===void 0,r.__autoAllocateDepthBuffer||ye.has(`WEBGL_multisampled_render_to_texture`)===!0&&(console.warn(`THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided`),r.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(e,t){let n=N.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){C=e,x=t,S=n;let r=!0,i=null,a=!1,o=!1;if(e){let s=N.get(e);if(s.__useDefaultFramebuffer!==void 0)M.bindFramebuffer(j.FRAMEBUFFER,null),r=!1;else if(s.__webglFramebuffer===void 0)P.setupRenderTarget(e);else if(s.__hasExternalTextures)P.rebindTextures(e,N.get(e.texture).__webglTexture,N.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(s.__boundDepthTexture!==t){if(t!==null&&N.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.`);P.setupDepthRenderbuffer(e)}}let c=e.texture;(c.isData3DTexture||c.isDataArrayTexture||c.isCompressedArrayTexture)&&(o=!0);let l=N.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(i=Array.isArray(l[t])?l[t][n]:l[t],a=!0):i=e.samples>0&&P.useMultisampledRTT(e)===!1?N.get(e).__webglMultisampledFramebuffer:Array.isArray(l)?l[n]:l,E.copy(e.viewport),D.copy(e.scissor),O=e.scissorTest}else E.copy(ae).multiplyScalar(ne).floor(),D.copy(oe).multiplyScalar(ne).floor(),O=se;if(M.bindFramebuffer(j.FRAMEBUFFER,i)&&r&&M.drawBuffers(e,i),M.viewport(E),M.scissor(D),M.setScissorTest(O),a){let r=N.get(e.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(o){let r=N.get(e.texture),i=t||0;j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,r.__webglTexture,n||0,i)}w=-1},this.readRenderTargetPixels=function(e,t,n,r,i,a,o){if(!(e&&e.isWebGLRenderTarget)){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let s=N.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(s=s[o]),s){M.bindFramebuffer(j.FRAMEBUFFER,s);try{let o=e.texture,s=o.format,c=o.type;if(!be.textureFormatReadable(s)){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(!be.textureTypeReadable(c)){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&j.readPixels(t,n,r,i,Le.convert(s),Le.convert(c),a)}finally{let e=C===null?null:N.get(C).__webglFramebuffer;M.bindFramebuffer(j.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let s=N.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(s=s[o]),s){let o=e.texture,c=o.format,l=o.type;if(!be.textureFormatReadable(c))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(!be.textureTypeReadable(l))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){M.bindFramebuffer(j.FRAMEBUFFER,s);let e=j.createBuffer();j.bindBuffer(j.PIXEL_PACK_BUFFER,e),j.bufferData(j.PIXEL_PACK_BUFFER,a.byteLength,j.STREAM_READ),j.readPixels(t,n,r,i,Le.convert(c),Le.convert(l),0);let o=C===null?null:N.get(C).__webglFramebuffer;M.bindFramebuffer(j.FRAMEBUFFER,o);let u=j.fenceSync(j.SYNC_GPU_COMMANDS_COMPLETE,0);return j.flush(),await Vm(j,u,4),j.bindBuffer(j.PIXEL_PACK_BUFFER,e),j.getBufferSubData(j.PIXEL_PACK_BUFFER,0,a),j.deleteBuffer(e),j.deleteSync(u),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){e.isTexture!==!0&&(Bm(`WebGLRenderer: copyFramebufferToTexture function signature has changed.`),t=arguments[0]||null,e=arguments[1]);let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;P.setTexture2D(e,0),j.copyTexSubImage2D(j.TEXTURE_2D,n,0,0,o,s,i,a),M.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0){e.isTexture!==!0&&(Bm(`WebGLRenderer: copyTextureToTexture function signature has changed.`),r=arguments[0]||null,e=arguments[1],t=arguments[2],i=arguments[3]||0,n=null);let a,o,s,c,l,u,d,f,p,m=e.isCompressedTexture?e.mipmaps[i]:e.image;n===null?(a=m.width,o=m.height,s=m.depth||1,c=0,l=0,u=0):(a=n.max.x-n.min.x,o=n.max.y-n.min.y,s=n.isBox3?n.max.z-n.min.z:1,c=n.min.x,l=n.min.y,u=n.isBox3?n.min.z:0),r===null?(d=0,f=0,p=0):(d=r.x,f=r.y,p=r.z);let h=Le.convert(t.format),g=Le.convert(t.type),_;t.isData3DTexture?(P.setTexture3D(t,0),_=j.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(P.setTexture2DArray(t,0),_=j.TEXTURE_2D_ARRAY):(P.setTexture2D(t,0),_=j.TEXTURE_2D),j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,t.flipY),j.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),j.pixelStorei(j.UNPACK_ALIGNMENT,t.unpackAlignment);let v=j.getParameter(j.UNPACK_ROW_LENGTH),y=j.getParameter(j.UNPACK_IMAGE_HEIGHT),b=j.getParameter(j.UNPACK_SKIP_PIXELS),x=j.getParameter(j.UNPACK_SKIP_ROWS),S=j.getParameter(j.UNPACK_SKIP_IMAGES);j.pixelStorei(j.UNPACK_ROW_LENGTH,m.width),j.pixelStorei(j.UNPACK_IMAGE_HEIGHT,m.height),j.pixelStorei(j.UNPACK_SKIP_PIXELS,c),j.pixelStorei(j.UNPACK_SKIP_ROWS,l),j.pixelStorei(j.UNPACK_SKIP_IMAGES,u);let C=e.isDataArrayTexture||e.isData3DTexture,w=t.isDataArrayTexture||t.isData3DTexture;if(e.isRenderTargetTexture||e.isDepthTexture){let n=N.get(e),r=N.get(t),m=N.get(n.__renderTarget),h=N.get(r.__renderTarget);M.bindFramebuffer(j.READ_FRAMEBUFFER,m.__webglFramebuffer),M.bindFramebuffer(j.DRAW_FRAMEBUFFER,h.__webglFramebuffer);for(let n=0;n<s;n++)C&&j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,N.get(e).__webglTexture,i,u+n),e.isDepthTexture?(w&&j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,N.get(t).__webglTexture,i,p+n),j.blitFramebuffer(c,l,a,o,d,f,a,o,j.DEPTH_BUFFER_BIT,j.NEAREST)):w?j.copyTexSubImage3D(_,i,d,f,p+n,c,l,a,o):j.copyTexSubImage2D(_,i,d,f,p+n,c,l,a,o);M.bindFramebuffer(j.READ_FRAMEBUFFER,null),M.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else w?e.isDataTexture||e.isData3DTexture?j.texSubImage3D(_,i,d,f,p,a,o,s,h,g,m.data):t.isCompressedArrayTexture?j.compressedTexSubImage3D(_,i,d,f,p,a,o,s,h,m.data):j.texSubImage3D(_,i,d,f,p,a,o,s,h,g,m):e.isDataTexture?j.texSubImage2D(j.TEXTURE_2D,i,d,f,a,o,h,g,m.data):e.isCompressedTexture?j.compressedTexSubImage2D(j.TEXTURE_2D,i,d,f,m.width,m.height,h,m.data):j.texSubImage2D(j.TEXTURE_2D,i,d,f,a,o,h,g,m);j.pixelStorei(j.UNPACK_ROW_LENGTH,v),j.pixelStorei(j.UNPACK_IMAGE_HEIGHT,y),j.pixelStorei(j.UNPACK_SKIP_PIXELS,b),j.pixelStorei(j.UNPACK_SKIP_ROWS,x),j.pixelStorei(j.UNPACK_SKIP_IMAGES,S),i===0&&t.generateMipmaps&&j.generateMipmap(_),M.unbindTexture()},this.copyTextureToTexture3D=function(e,t,n=null,r=null,i=0){return e.isTexture!==!0&&(Bm(`WebGLRenderer: copyTextureToTexture3D function signature has changed.`),n=arguments[0]||null,r=arguments[1]||null,e=arguments[2],t=arguments[3],i=arguments[4]||0),Bm(`WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.`),this.copyTextureToTexture(e,t,n,r,i)},this.initRenderTarget=function(e){N.get(e).__webglFramebuffer===void 0&&P.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?P.setTextureCube(e,0):e.isData3DTexture?P.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?P.setTexture2DArray(e,0):P.setTexture2D(e,0),M.unbindTexture()},this.resetState=function(){x=0,S=0,C=null,M.reset(),Re.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return om}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=Wm._getDrawingBufferColorSpace(e),t.unpackColorSpace=Wm._getUnpackColorSpace()}},qb=class e{constructor(e,t=25e-5){this.isFogExp2=!0,this.name=``,this.color=new X(e),this.density=t}clone(){return new e(this.color,this.density)}toJSON(){return{type:`FogExp2`,name:this.name,color:this.color.getHex(),density:this.density}}},Jb=class extends pg{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Xh,this.environmentIntensity=1,this.environmentRotation=new Xh,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Yb=class extends Pg{static get type(){return`LineBasicMaterial`}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new X(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Xb=new Y,Zb=new Y,Qb=new Bh,$b=new zh,ex=new jh,tx=new Y,nx=new Y,rx=class extends pg{constructor(e=new Yg,t=new Yb){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)Xb.fromBufferAttribute(t,e-1),Zb.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=Xb.distanceTo(Zb);e.setAttribute(`lineDistance`,new Vg(n,1))}else console.warn(`THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ex.copy(n.boundingSphere),ex.applyMatrix4(r),ex.radius+=i,e.ray.intersectsSphere(ex)===!1)return;Qb.copy(r).invert(),$b.copy(e.ray).applyMatrix4(Qb);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=ix(this,e,$b,s,n,r);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=ix(this,e,$b,s,i,a);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=ix(this,e,$b,s,i,i+1);n&&t.push(n)}if(this.isLineLoop){let i=ix(this,e,$b,s,r-1,n);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function ix(e,t,n,r,i,a){let o=e.geometry.attributes.position;if(Xb.fromBufferAttribute(o,i),Zb.fromBufferAttribute(o,a),n.distanceSqToSegment(Xb,Zb,tx,nx)>r)return;tx.applyMatrix4(e.matrixWorld);let s=t.ray.origin.distanceTo(tx);if(!(s<t.near||s>t.far))return{distance:s,point:nx.clone().applyMatrix4(e.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:e}}var ax=new Y,ox=new Y,sx=class extends rx{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)ax.fromBufferAttribute(t,e),ox.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+ax.distanceTo(ox);e.setAttribute(`lineDistance`,new Vg(n,1))}else console.warn(`THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},cx=class extends Pg{static get type(){return`PointsMaterial`}constructor(e){super(),this.isPointsMaterial=!0,this.color=new X(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},lx=new Bh,ux=new zh,dx=new jh,fx=new Y,px=class extends pg{constructor(e=new Yg,t=new cx){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),dx.copy(n.boundingSphere),dx.applyMatrix4(r),dx.radius+=i,e.ray.intersectsSphere(dx)===!1)return;lx.copy(r).invert(),ux.copy(e.ray).applyMatrix4(lx);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);fx.fromBufferAttribute(l,n),mx(fx,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)fx.fromBufferAttribute(l,a),mx(fx,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function mx(e,t,n,r,i,a,o){let s=ux.distanceSqToPoint(e);if(s<n){let n=new Y;ux.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var hx=class extends ih{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},gx=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200}getPoint(){return console.warn(`THREE.Curve: .getPoint() not implemented.`),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new q:new Y);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new Y,r=[],i=[],a=[],o=new Y,s=new Bh;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new Y)}i[0]=new Y,a[0]=new Y;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(pm(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(pm(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},_x=class extends gx{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new q){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},vx=class extends _x{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function yx(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var bx=new Y,xx=new yx,Sx=new yx,Cx=new yx,wx=class extends gx{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new Y){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(bx.subVectors(r[0],r[1]).add(r[0]),c=bx);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(bx.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=bx),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),xx.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),Sx.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),Cx.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(xx.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),Sx.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),Cx.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(xx.calc(s),Sx.calc(s),Cx.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new Y().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Tx(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function Ex(e,t){let n=1-e;return n*n*t}function Dx(e,t){return 2*(1-e)*e*t}function Ox(e,t){return e*e*t}function kx(e,t,n,r){return Ex(e,t)+Dx(e,n)+Ox(e,r)}function Ax(e,t){let n=1-e;return n*n*n*t}function jx(e,t){let n=1-e;return 3*n*n*e*t}function Mx(e,t){return 3*(1-e)*e*e*t}function Nx(e,t){return e*e*e*t}function Px(e,t,n,r,i){return Ax(e,t)+jx(e,n)+Mx(e,r)+Nx(e,i)}var Fx=class extends gx{constructor(e=new q,t=new q,n=new q,r=new q){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new q){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Px(e,r.x,i.x,a.x,o.x),Px(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ix=class extends gx{constructor(e=new Y,t=new Y,n=new Y,r=new Y){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new Y){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Px(e,r.x,i.x,a.x,o.x),Px(e,r.y,i.y,a.y,o.y),Px(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Lx=class extends gx{constructor(e=new q,t=new q){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new q){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new q){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Rx=class extends gx{constructor(e=new Y,t=new Y){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new Y){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Y){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},zx=class extends gx{constructor(e=new q,t=new q,n=new q){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new q){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(kx(e,r.x,i.x,a.x),kx(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Bx=class extends gx{constructor(e=new Y,t=new Y,n=new Y){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Y){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(kx(e,r.x,i.x,a.x),kx(e,r.y,i.y,a.y),kx(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Vx=Object.freeze({__proto__:null,ArcCurve:vx,CatmullRomCurve3:wx,CubicBezierCurve:Fx,CubicBezierCurve3:Ix,EllipseCurve:_x,LineCurve:Lx,LineCurve3:Rx,QuadraticBezierCurve:zx,QuadraticBezierCurve3:Bx,SplineCurve:class extends gx{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new q){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(Tx(o,s.x,c.x,l.x,u.x),Tx(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new q().fromArray(n))}return this}}}),Hx=class e extends Yg{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new Vg(u,3)),this.setAttribute(`normal`,new Vg(d,3)),this.setAttribute(`uv`,new Vg(f,2));function _(){let a=new Y,_=new Y,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new q,m=new Y,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ux=class e extends Yg{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new Y,d=new Y,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=0;f===0&&a===0?v=.5/t:f===n&&s===Math.PI&&(v=-.5/t);for(let n=0;n<=t;n++){let s=n/t;u.x=-e*Math.cos(r+s*i)*Math.sin(a+_*o),u.y=e*Math.cos(a+_*o),u.z=e*Math.sin(r+s*i)*Math.sin(a+_*o),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(s+v,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new Vg(p,3)),this.setAttribute(`normal`,new Vg(m,3)),this.setAttribute(`uv`,new Vg(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},Wx=class e extends Yg{constructor(e=new Bx(new Y(-1,-1,0),new Y(-1,1,0),new Y(1,1,0)),t=64,n=1,r=8,i=!1){super(),this.type=`TubeGeometry`,this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:i};let a=e.computeFrenetFrames(t,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new Y,s=new Y,c=new q,l=new Y,u=[],d=[],f=[],p=[];m(),this.setIndex(p),this.setAttribute(`position`,new Vg(u,3)),this.setAttribute(`normal`,new Vg(d,3)),this.setAttribute(`uv`,new Vg(f,2));function m(){for(let e=0;e<t;e++)h(e);h(i===!1?t:0),_(),g()}function h(i){l=e.getPointAt(i/t,l);let c=a.normals[i],f=a.binormals[i];for(let e=0;e<=r;e++){let t=e/r*Math.PI*2,i=Math.sin(t),a=-Math.cos(t);s.x=a*c.x+i*f.x,s.y=a*c.y+i*f.y,s.z=a*c.z+i*f.z,s.normalize(),d.push(s.x,s.y,s.z),o.x=l.x+n*s.x,o.y=l.y+n*s.y,o.z=l.z+n*s.z,u.push(o.x,o.y,o.z)}}function g(){for(let e=1;e<=t;e++)for(let t=1;t<=r;t++){let n=(r+1)*(e-1)+(t-1),i=(r+1)*e+(t-1),a=(r+1)*e+t,o=(r+1)*(e-1)+t;p.push(n,i,o),p.push(i,a,o)}}function _(){for(let e=0;e<=t;e++)for(let n=0;n<=r;n++)c.x=e/t,c.y=n/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(t){return new e(new Vx[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}},Gx=class extends __{static get type(){return`RawShaderMaterial`}constructor(e){super(e),this.isRawShaderMaterial=!0}},Kx=class extends Pg{static get type(){return`MeshStandardMaterial`}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:``},this.color=new X(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new X(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xh,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function qx(e,t,n){return!e||!n&&e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Jx(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}var Yx=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`call to abstract method`)}intervalChanged_(){}},Xx=class extends Yx{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Yp,endingEnd:Yp}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Xp:i=e,o=2*t-n;break;case Zp:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Xp:a=e,s=2*n-t;break;case Zp:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Zx=class extends Yx{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Qx=class extends Yx{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},$x=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=qx(t,this.TimeBufferType),this.values=qx(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:qx(e.times,Array),values:qx(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Qx(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Zx(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Xx(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Kp:t=this.InterpolantFactoryMethodDiscrete;break;case qp:t=this.InterpolantFactoryMethodLinear;break;case Jp:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return console.warn(`THREE.KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Kp;case this.InterpolantFactoryMethodLinear:return qp;case this.InterpolantFactoryMethodSmooth:return Jp}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error(`THREE.KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(console.error(`THREE.KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){console.error(`THREE.KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){console.error(`THREE.KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Jx(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){console.error(`THREE.KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Jp,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};$x.prototype.TimeBufferType=Float32Array,$x.prototype.ValueBufferType=Float32Array,$x.prototype.DefaultInterpolation=qp;var eS=class extends $x{constructor(e,t,n){super(e,t,n)}};eS.prototype.ValueTypeName=`bool`,eS.prototype.ValueBufferType=Array,eS.prototype.DefaultInterpolation=Kp,eS.prototype.InterpolantFactoryMethodLinear=void 0,eS.prototype.InterpolantFactoryMethodSmooth=void 0;var tS=class extends $x{};tS.prototype.ValueTypeName=`color`;var nS=class extends $x{};nS.prototype.ValueTypeName=`number`;var rS=class extends Yx{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)uh.slerpFlat(i,0,a,c-o,a,c,s);return i}},iS=class extends $x{InterpolantFactoryMethodLinear(e){return new rS(this.times,this.values,this.getValueSize(),e)}};iS.prototype.ValueTypeName=`quaternion`,iS.prototype.InterpolantFactoryMethodSmooth=void 0;var aS=class extends $x{constructor(e,t,n){super(e,t,n)}};aS.prototype.ValueTypeName=`string`,aS.prototype.ValueBufferType=Array,aS.prototype.DefaultInterpolation=Kp,aS.prototype.InterpolantFactoryMethodLinear=void 0,aS.prototype.InterpolantFactoryMethodSmooth=void 0;var oS=class extends $x{};oS.prototype.ValueTypeName=`vector`;var sS={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(this.files[e]=t)},get:function(e){if(this.enabled!==!1)return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}},cS=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null}}},lS=class{constructor(e){this.manager=e===void 0?cS:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};lS.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var uS=class extends lS{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=sS.get(e);if(a!==void 0)return i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0),a;let o=Lm(`img`);function s(){l(),sS.add(e,this),t&&t(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),i.manager.itemStart(e),o.src=e,o}},dS=class extends lS{constructor(e){super(e)}load(e,t,n,r){let i=new ih,a=new uS(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},fS=class extends pg{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new X(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},pS=class extends fS{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(pg.DEFAULT_UP),this.updateMatrix(),this.groundColor=new X(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},mS=new Bh,hS=new Y,gS=new Y,_S=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new q(512,512),this.map=null,this.mapPass=null,this.matrix=new Bh,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new P_,this._frameExtents=new q(1,1),this._viewportCount=1,this._viewports=[new ah(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;hS.setFromMatrixPosition(e.matrixWorld),t.position.copy(hS),gS.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(gS),t.updateMatrixWorld(),mS.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(mS),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(mS)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},vS=new Bh,yS=new Y,bS=new Y,xS=class extends _S{constructor(){super(new S_(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new q(4,2),this._viewportCount=6,this._viewports=[new ah(2,1,1,1),new ah(0,1,1,1),new ah(3,1,1,1),new ah(1,1,1,1),new ah(3,0,1,1),new ah(1,0,1,1)],this._cubeDirections=[new Y(1,0,0),new Y(-1,0,0),new Y(0,0,1),new Y(0,0,-1),new Y(0,1,0),new Y(0,-1,0)],this._cubeUps=[new Y(0,1,0),new Y(0,1,0),new Y(0,1,0),new Y(0,1,0),new Y(0,0,1),new Y(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,r=this.matrix,i=e.distance||n.far;i!==n.far&&(n.far=i,n.updateProjectionMatrix()),yS.setFromMatrixPosition(e.matrixWorld),n.position.copy(yS),bS.copy(n.position),bS.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(bS),n.updateMatrixWorld(),r.makeTranslation(-yS.x,-yS.y,-yS.z),vS.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vS)}},SS=class extends fS{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new xS}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},CS=class extends _S{constructor(){super(new J_(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},wS=class extends fS{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(pg.DEFAULT_UP),this.updateMatrix(),this.target=new pg,this.shadow=new CS}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},TS=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=ES(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=ES();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};function ES(){return performance.now()}var DS=`\\[\\]\\.:\\/`,OS=RegExp(`[\\[\\]\\.:\\/]`,`g`),kS=`[^\\[\\]\\.:\\/]`,AS=`[^`+DS.replace(`\\.`,``)+`]`,jS=`((?:WC+[\\/:])*)`.replace(`WC`,kS),MS=`(WCOD+)?`.replace(`WCOD`,AS),NS=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,kS),PS=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,kS),FS=RegExp(`^`+jS+MS+NS+PS+`$`),IS=[`material`,`materials`,`bones`,`map`],LS=class{constructor(e,t,n){let r=n||RS.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},RS=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(OS,``)}static parseTrackName(e){let t=FS.exec(e);if(t===null)throw Error(`PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);IS.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn(`THREE.PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){console.error(`THREE.PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){console.error(`THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){console.error(`THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){console.error(`THREE.PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){console.error(`THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){console.error(`THREE.PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){console.error(`THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;console.error(`THREE.PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.needsUpdate===void 0?t.matrixWorldNeedsUpdate!==void 0&&(s=this.Versioning.MatrixWorldNeedsUpdate):s=this.Versioning.NeedsUpdate;let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){console.error(`THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){console.error(`THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};RS.Composite=LS,RS.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},RS.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},RS.prototype.GetterByBindingType=[RS.prototype._getValue_direct,RS.prototype._getValue_array,RS.prototype._getValue_arrayElement,RS.prototype._getValue_toArray],RS.prototype.SetterByBindingTypeAndVersioning=[[RS.prototype._setValue_direct,RS.prototype._setValue_direct_setNeedsUpdate,RS.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[RS.prototype._setValue_array,RS.prototype._setValue_array_setNeedsUpdate,RS.prototype._setValue_array_setMatrixWorldNeedsUpdate],[RS.prototype._setValue_arrayElement,RS.prototype._setValue_arrayElement_setNeedsUpdate,RS.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[RS.prototype._setValue_fromArray,RS.prototype._setValue_fromArray_setNeedsUpdate,RS.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`170`}})),typeof window<`u`&&(window.__THREE__?console.warn(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`170`);var zS={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},BS=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},VS=new J_(-1,1,1,-1,0,1),HS=new class extends Yg{constructor(){super(),this.setAttribute(`position`,new Vg([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new Vg([0,2,0,0,2,0],2))}},US=class{constructor(e){this._mesh=new Z(HS,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,VS)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},WS=class extends BS{constructor(e,t){super(),this.textureID=t===void 0?`tDiffuse`:t,e instanceof __?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=m_.clone(e.uniforms),this.material=new __({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new US(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}},GS=class extends BS{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},KS=class extends BS{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},qS=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new q);this._width=n.width,this._height=n.height,t=new sh(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Zf}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new WS(zS),this.copyPass.material.blending=0,this.clock=new TS}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}GS!==void 0&&(r instanceof GS?n=!0:r instanceof KS&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new q);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},JS=class extends BS{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new X}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},YS={name:`LuminosityHighPassShader`,shaderID:`luminosityHighPass`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new X(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},XS=class e extends BS{constructor(e,t,n,r){super(),this.strength=t===void 0?1:t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new q(256,256):new q(e.x,e.y),this.clearColor=new X(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new sh(i,a,{type:Zf}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new sh(i,a,{type:Zf});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new sh(i,a,{type:Zf});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let o=YS;this.highPassUniforms=m_.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new __({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let s=[3,5,7,9,11];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(s[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new q(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new Y(1,1,1),new Y(1,1,1),new Y(1,1,1),new Y(1,1,1),new Y(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;let l=zS;this.copyUniforms=m_.clone(l.uniforms),this.blendMaterial=new __({uniforms:this.copyUniforms,vertexShader:l.vertexShader,fragmentShader:l.fragmentShader,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new X,this.oldClearAlpha=1,this.basic=new Fg,this.fsQuad=new US(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new q(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=r.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this.fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this.fsQuad.render(t),s=this.renderTargetsVertical[n];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(r),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(e){let t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new __({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new q(.5,.5)},direction:{value:new q(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new __({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}};XS.BlurDirectionX=new q(1,0),XS.BlurDirectionY=new q(0,1);var ZS={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},QS=class extends BS{constructor(){super();let e=ZS;this.uniforms=m_.clone(e.uniforms),this.material=new Gx({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new US(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Wm.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7&&(this.material.defines.NEUTRAL_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}},$S=class e extends Z{constructor(t,n={}){super(t),this.isReflector=!0,this.type=`Reflector`,this.camera=new S_;let r=this,i=n.color===void 0?new X(8355711):new X(n.color),a=n.textureWidth||512,o=n.textureHeight||512,s=n.clipBias||0,c=n.shader||e.ReflectorShader,l=n.multisample===void 0?4:n.multisample,u=new j_,d=new Y,f=new Y,p=new Y,m=new Bh,h=new Y(0,0,-1),g=new ah,_=new Y,v=new Y,y=new ah,b=new Bh,x=this.camera,S=new sh(a,o,{samples:l,type:Zf}),C=new __({name:c.name===void 0?`unspecified`:c.name,uniforms:m_.clone(c.uniforms),fragmentShader:c.fragmentShader,vertexShader:c.vertexShader});C.uniforms.tDiffuse.value=S.texture,C.uniforms.color.value=i,C.uniforms.textureMatrix.value=b,this.material=C,this.onBeforeRender=function(e,t,n){if(f.setFromMatrixPosition(r.matrixWorld),p.setFromMatrixPosition(n.matrixWorld),m.extractRotation(r.matrixWorld),d.set(0,0,1),d.applyMatrix4(m),_.subVectors(f,p),_.dot(d)>0)return;_.reflect(d).negate(),_.add(f),m.extractRotation(n.matrixWorld),h.set(0,0,-1),h.applyMatrix4(m),h.add(p),v.subVectors(f,h),v.reflect(d).negate(),v.add(f),x.position.copy(_),x.up.set(0,1,0),x.up.applyMatrix4(m),x.up.reflect(d),x.lookAt(v),x.far=n.far,x.updateMatrixWorld(),x.projectionMatrix.copy(n.projectionMatrix),b.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),b.multiply(x.projectionMatrix),b.multiply(x.matrixWorldInverse),b.multiply(r.matrixWorld),u.setFromNormalAndCoplanarPoint(d,f),u.applyMatrix4(x.matrixWorldInverse),g.set(u.normal.x,u.normal.y,u.normal.z,u.constant);let i=x.projectionMatrix;y.x=(Math.sign(g.x)+i.elements[8])/i.elements[0],y.y=(Math.sign(g.y)+i.elements[9])/i.elements[5],y.z=-1,y.w=(1+i.elements[10])/i.elements[14],g.multiplyScalar(2/g.dot(y)),i.elements[2]=g.x,i.elements[6]=g.y,i.elements[10]=g.z+1-s,i.elements[14]=g.w,r.visible=!1;let a=e.getRenderTarget(),o=e.xr.enabled,c=e.shadowMap.autoUpdate;e.xr.enabled=!1,e.shadowMap.autoUpdate=!1,e.setRenderTarget(S),e.state.buffers.depth.setMask(!0),e.autoClear===!1&&e.clear(),e.render(t,x),e.xr.enabled=o,e.shadowMap.autoUpdate=c,e.setRenderTarget(a);let l=n.viewport;l!==void 0&&e.state.viewport(l),r.visible=!0},this.getRenderTarget=function(){return S},this.dispose=function(){S.dispose(),r.material.dispose()}}};$S.ReflectorShader={name:`ReflectorShader`,uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		#include <common>
		#include <logdepthbuf_pars_vertex>

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			#include <logdepthbuf_vertex>

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};var eC=class extends Jb{constructor(){super();let e=new l_;e.deleteAttribute(`uv`);let t=new Kx({side:1}),n=new Kx,r=new SS(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);let i=new Z(e,t);i.position.set(-.757,13.219,.717),i.scale.set(31.713,28.305,28.591),this.add(i);let a=new Z(e,n);a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),this.add(a);let o=new Z(e,n);o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),this.add(o);let s=new Z(e,n);s.position.set(6.167,.857,7.803),s.rotation.set(0,.561,0),s.scale.set(3.927,6.285,3.687),this.add(s);let c=new Z(e,n);c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),this.add(c);let l=new Z(e,n);l.position.set(2.291,-.756,-2.621),l.rotation.set(0,-.286,0),l.scale.set(1.546,1.552,1.496),this.add(l);let u=new Z(e,n);u.position.set(-2.193,-.369,-5.547),u.rotation.set(0,.516,0),u.scale.set(3.875,3.487,2.986),this.add(u);let d=new Z(e,tC(50));d.position.set(-16.116,14.37,8.208),d.scale.set(.1,2.428,2.739),this.add(d);let f=new Z(e,tC(50));f.position.set(-16.109,18.021,-8.207),f.scale.set(.1,2.425,2.751),this.add(f);let p=new Z(e,tC(17));p.position.set(14.904,12.198,-1.832),p.scale.set(.15,4.265,6.331),this.add(p);let m=new Z(e,tC(43));m.position.set(-.462,8.89,14.52),m.scale.set(4.38,5.441,.088),this.add(m);let h=new Z(e,tC(20));h.position.set(3.235,11.486,-12.541),h.scale.set(2.5,2,.1),this.add(h);let g=new Z(e,tC(100));g.position.set(0,20,0),g.scale.set(1,.1,1),this.add(g)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function tC(e){let t=new Fg;return t.color.setScalar(e),t}var nC=new Y(0,1,0),rC=new Y(0,1.72,6.5),iC=new Y(0,1.3,-1.6),aC=39,oC=-6.5,sC=8.6,cC=4.7,lC=4.95,uC=`/moonnight/plates/theater_wide.png`,dC=e=>{let t=Math.sin(e*127.1+311.7)*43758.5453;return t-Math.floor(t)};function fC(e,t,n){let r=document.createElement(`canvas`);r.width=e,r.height=t,n(r.getContext(`2d`));let i=new hx(r);return i.colorSpace=em,i.anisotropy=4,i}function pC(){return fC(1024,1024,e=>{let t=e.createLinearGradient(0,0,0,1024);t.addColorStop(0,`#060d11`),t.addColorStop(.34,`#10262a`),t.addColorStop(.62,`#2f5a56`),t.addColorStop(.8,`#7ba49b`),t.addColorStop(.92,`#12211f`),t.addColorStop(1,`#050a0b`),e.fillStyle=t,e.fillRect(0,0,1024,1024);for(let t=0;t<190;t++){let n=dC(t*2.3)*1024,r=dC(t*5.7)*560,i=.6+dC(t*8.1)*1.5;e.fillStyle=`rgba(226, 245, 238, ${.18+dC(t*3.3)*.6})`,e.beginPath(),e.arc(n,r,i,0,Math.PI*2),e.fill()}let n=e.createRadialGradient(690,300,43.2,690,300,561.6);n.addColorStop(0,`rgba(232, 253, 246, 0.55)`),n.addColorStop(.18,`rgba(206, 240, 232, 0.2)`),n.addColorStop(1,`rgba(190, 226, 218, 0)`),e.fillStyle=n,e.fillRect(0,0,1024,1024);let r=e.createRadialGradient(655.44,267.6,108*.12,690,300,108);r.addColorStop(0,`#fdfffc`),r.addColorStop(.68,`#e6f6ee`),r.addColorStop(1,`#b9d6cc`),e.fillStyle=r,e.beginPath(),e.arc(690,300,108,0,Math.PI*2),e.fill(),e.fillStyle=`rgba(120, 155, 148, 0.26)`;for(let t=0;t<7;t++){let n=dC(t*4.1)*Math.PI*2,r=dC(t*7.3)*108*.62;e.beginPath(),e.arc(690+Math.cos(n)*r,300+Math.sin(n)*r,108*(.07+dC(t*2.3)*.15),0,Math.PI*2),e.fill()}e.strokeStyle=`rgba(3, 7, 8, 0.94)`,e.lineCap=`round`;let i=(t,n,r,a,o,s,c)=>{if(s<=0||a<8)return;let l=t+Math.cos(r)*a,u=n+Math.sin(r)*a;e.lineWidth=o,e.beginPath(),e.moveTo(t,n),e.lineTo(l,u),e.stroke();for(let e=0;e<2;e++)i(l,u,r+(dC(c+e*3.1)-.5)*1.25,a*(.6+dC(c+e*7.7)*.2),Math.max(1.2,o*.6),s-1,c+e*11+1)};i(40,1030,-Math.PI/2-.16,300,34,6,5),i(250,1030,-Math.PI/2+.04,210,20,5,13),e.fillStyle=`rgba(2, 5, 6, 0.98)`,e.beginPath(),e.ellipse(404,386,17,9,-.32,0,Math.PI*2),e.fill(),e.beginPath(),e.arc(421,377,6,0,Math.PI*2),e.fill(),e.beginPath(),e.moveTo(427,375),e.lineTo(436,379),e.lineTo(427,381),e.closePath(),e.fill(),e.beginPath(),e.moveTo(390,386),e.lineTo(372,396),e.lineTo(390,393),e.closePath(),e.fill(),e.strokeStyle=`rgba(150, 44, 40, 0.85)`,e.lineWidth=2.4,e.beginPath(),e.moveTo(414,392),e.bezierCurveTo(410,410,424,420,418,442),e.stroke(),e.fillStyle=`rgba(3, 8, 9, 0.9)`,e.beginPath(),e.moveTo(0,900);for(let t=0;t<=1024;t+=64)e.lineTo(t,878-dC(t)*46);e.lineTo(1024,1024),e.lineTo(0,1024),e.closePath(),e.fill()})}function mC(){return fC(1024,1024,e=>{e.fillStyle=`#10181a`,e.fillRect(0,0,1024,1024);for(let t=0;t<8;t++){let n=t*1024/8;e.fillStyle=t%2?`#0d1517`:`#121b1d`,e.fillRect(0,n,1024,125),e.strokeStyle=`rgba(160, 190, 183, 0.07)`,e.lineWidth=2;for(let r=0;r<26;r++){let i=n+dC(t*31+r)*122;e.beginPath(),e.moveTo(dC(t*7+r)*300,i),e.lineTo(400+dC(t*13+r)*624,i+(dC(r)-.5)*5),e.stroke()}e.fillStyle=`rgba(0, 0, 0, 0.55)`,e.fillRect(0,n+128-3,1024,3)}})}function hC(){return fC(512,700,e=>{let t=e.createLinearGradient(0,0,512,700);t.addColorStop(0,`#d8cfb6`),t.addColorStop(.5,`#bdb298`),t.addColorStop(1,`#8d836e`),e.fillStyle=t,e.fillRect(0,0,512,700),e.strokeStyle=`rgba(48, 40, 30, 0.55)`,e.lineWidth=6,e.strokeRect(26,26,460,648),e.fillStyle=`#2b2620`,e.textAlign=`center`,e.font=`600 58px "Noto Serif SC", serif`,e.fillText(`月  夜`,256,150),e.font=`400 22px "Noto Sans SC", sans-serif`,e.fillText(`M O O N N I G H T`,256,194),e.strokeStyle=`rgba(48, 40, 30, 0.4)`,e.lineWidth=2,e.beginPath(),e.moveTo(80,226),e.lineTo(432,226),e.stroke(),e.font=`400 26px "Noto Serif SC", serif`,e.fillStyle=`rgba(43, 38, 32, 0.85)`,e.fillText(`舞　者`,256,300),e.fillText(`舞　者`,256,430),e.save(),e.translate(256,350);let n=e.createRadialGradient(0,0,10,0,0,128);n.addColorStop(0,`rgba(22, 10, 4, 0.98)`),n.addColorStop(.55,`rgba(48, 20, 8, 0.9)`),n.addColorStop(.82,`rgba(92, 44, 14, 0.55)`),n.addColorStop(1,`rgba(120, 70, 30, 0)`),e.fillStyle=n,e.beginPath(),e.ellipse(0,0,138,46,0,0,Math.PI*2),e.fill(),e.restore(),e.fillStyle=`rgba(43, 38, 32, 0.75)`,e.font=`400 34px "Noto Serif SC", serif`,e.fillText(`＿ ＿`,214,480),e.fillStyle=`rgba(30, 26, 20, 0.95)`,e.font=`600 42px "Noto Serif SC", serif`,e.fillText(`安`,300,482),e.font=`400 20px "Noto Sans SC", sans-serif`,e.fillStyle=`rgba(43, 38, 32, 0.6)`,e.fillText(`满月之夜 · 无观众演出`,256,586),e.fillText(`请从第一关重新开始`,256,620)})}function gC(){return fC(256,256,e=>{let t=e.createRadialGradient(128,128,0,128,128,128);t.addColorStop(0,`rgba(226, 248, 240, 0.95)`),t.addColorStop(.4,`rgba(198, 232, 222, 0.35)`),t.addColorStop(1,`rgba(180, 220, 212, 0)`),e.fillStyle=t,e.fillRect(0,0,256,256)})}function _C(){return fC(64,64,e=>{let t=e.createRadialGradient(32,32,0,32,32,32);t.addColorStop(0,`rgba(240, 255, 250, 1)`),t.addColorStop(.35,`rgba(220, 245, 238, 0.55)`),t.addColorStop(1,`rgba(200, 235, 228, 0)`),e.fillStyle=t,e.fillRect(0,0,64,64)})}function vC(){return fC(128,512,e=>{let t=e.createLinearGradient(0,0,0,512);t.addColorStop(0,`rgba(214, 242, 234, 0.55)`),t.addColorStop(.5,`rgba(202, 236, 226, 0.2)`),t.addColorStop(1,`rgba(192, 228, 218, 0)`),e.fillStyle=t,e.fillRect(0,0,128,512);let n=e.createLinearGradient(0,0,128,0);n.addColorStop(0,`rgba(0,0,0,1)`),n.addColorStop(.24,`rgba(0,0,0,0)`),n.addColorStop(.76,`rgba(0,0,0,0)`),n.addColorStop(1,`rgba(0,0,0,1)`),e.globalCompositeOperation=`destination-out`,e.fillStyle=n,e.fillRect(0,0,128,512)})}var yC=[{a:`lShoulder`,b:`lElbow`,r:.072,kind:`limb`},{a:`lElbow`,b:`lWrist`,r:.056,kind:`limb`},{a:`rShoulder`,b:`rElbow`,r:.072,kind:`limb`},{a:`rElbow`,b:`rWrist`,r:.056,kind:`limb`},{a:`lHip`,b:`lKnee`,r:.092,kind:`leg`},{a:`lKnee`,b:`lAnkle`,r:.068,kind:`leg`},{a:`rHip`,b:`rKnee`,r:.092,kind:`leg`},{a:`rKnee`,b:`rAnkle`,r:.068,kind:`leg`}],bC=new Hx(1,1,1,12,1,!1),xC=new Ux(1,20,14);function SC(e,t,n=`0.42, 0.78, 0.71`){let r=t.toFixed(2);e.onBeforeCompile=e=>{e.fragmentShader=e.fragmentShader.replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
        float rimF = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewPosition))), 5.0);
        totalEmissiveRadiance += vec3(${n}) * rimF * ${r};`)},e.customProgramCacheKey=()=>`rim`+r+n}var CC=class{group=new Fb;body;cloth;eyeMat;bones=[];joints=[];torso;neck;head;brim;crown;skirt;handL;handR;footL;footR;eyeL;eyeR;constructor(e){this.body=new Kx({color:e?197898:329739,roughness:e?.34:.62,metalness:.18,transparent:!0,envMapIntensity:.55}),this.cloth=new Kx({color:329484,roughness:.55,metalness:.2,transparent:!0,side:2,envMapIntensity:.6}),this.eyeMat=new Kx({color:15335414,emissive:13631466,emissiveIntensity:2.4,transparent:!0,opacity:0,toneMapped:!1});let t=e?`1.0, 0.78, 0.46`:`0.42, 0.78, 0.71`;SC(this.body,e?.34:.22,t),SC(this.cloth,e?.28:.18,t);for(let e of yC){let t=new Z(bC,this.body);t.castShadow=!0,this.group.add(t),this.bones.push({mesh:t,...e})}for(let e of[`lElbow`,`rElbow`,`lKnee`,`rKnee`]){let t=new Z(xC,this.body);t.castShadow=!0,this.group.add(t),this.joints.push({mesh:t,key:e,side:e[0],r:e.includes(`Elbow`)?.062:.078})}this.torso=new Z(new Hx(.3,.235,1,18,1),this.body),this.torso.castShadow=!0,this.group.add(this.torso),this.neck=new Z(bC,this.body),this.neck.castShadow=!0,this.group.add(this.neck),this.head=new Z(xC,this.body),this.head.scale.set(E.headR*.94,E.headR*1.12,E.headR*.97),this.head.castShadow=!0,this.group.add(this.head),this.brim=new Z(new Hx(.27,.27,.016,26),this.cloth),this.brim.castShadow=!0,this.group.add(this.brim),this.crown=new Z(new Hx(.168,.18,.26,22),this.cloth),this.crown.castShadow=!0,this.group.add(this.crown),this.skirt=new Z(new Hx(.23,.38,.6,22,1,!0),this.cloth),this.group.add(this.skirt),this.handL=new Z(xC,this.body),this.handL.scale.setScalar(.072),this.group.add(this.handL),this.handR=new Z(xC,this.body),this.handR.scale.setScalar(.072),this.group.add(this.handR),this.footL=new Z(xC,this.body),this.footL.scale.set(.075,.05,.12),this.group.add(this.footL),this.footR=new Z(xC,this.body),this.footR.scale.set(.075,.05,.12),this.group.add(this.footR),this.eyeL=new Z(xC,this.eyeMat),this.eyeR=new Z(xC,this.eyeMat),this.eyeL.scale.setScalar(.019),this.eyeR.scale.setScalar(.019),this.group.add(this.eyeL,this.eyeR),this.skirt.visible=!1,this.brim.visible=!1,this.crown.visible=!1,this.group.visible=!1}update(e,t,n,r,i){let a=e.pose,o=e.variant??0,s=e.alpha;if(this.group.visible=s>.02,!this.group.visible)return;this.group.scale.setScalar(n),this.group.position.set(r,(E.thigh+E.shin)*n,i),o===4&&(this.group.position.y-=.42*n),this.group.rotation.z=e.sway??0,this.body.opacity=s,this.cloth.opacity=s,this.body.transparent=s<.999,this.cloth.transparent=s<.999;let c=.045,l=-.045;for(let e of this.bones){let t=a[e.a],n=a[e.b],r=n.x,i=n.y;o===2&&e.a===`lElbow`&&(r=t.x+(n.x-t.x)*.55,i=t.y+(n.y-t.y)*.55);let s=r-t.x,u=i-t.y,d=Math.hypot(s,u)||1e-4;e.mesh.position.set((t.x+r)/2,(t.y+i)/2,e.a.includes(`l`)?c:l),e.mesh.quaternion.setFromUnitVectors(nC,new Y(s/d,u/d,0)),e.mesh.scale.set(e.r,d,e.r),e.mesh.visible=o!==4||e.kind!==`leg`}for(let e of this.joints){let t=a[e.key];e.mesh.position.set(t.x,t.y,e.side===`l`?c:l),e.mesh.scale.setScalar(e.r),e.mesh.visible=!(o===4&&e.key.includes(`Knee`))}let u=a.shoulderCenter,d=a.pelvis,f=u.x-d.x,p=u.y-d.y,m=Math.hypot(f,p)||1e-4;this.torso.position.set((u.x+d.x)/2,(u.y+d.y)/2,0),this.torso.quaternion.setFromUnitVectors(nC,new Y(f/m,p/m,0)),this.torso.scale.set(1,m*1.04,.62);let h={x:a.head.x,y:a.head.y,z:0};o===1?(h.x=a.lHip.x+.16,h.y=a.lHip.y+.02,this.head.position.set(h.x,h.y,.1),this.neck.visible=!1):o===3?(this.head.position.set(h.x+.12,h.y-.08,0),this.head.rotation.z=.9,this.neck.visible=!0,this.neck.position.set((u.x+h.x)/2+.03,(u.y+h.y)/2-.04,0),this.neck.quaternion.setFromUnitVectors(nC,new Y(.1,1,0).normalize()),this.neck.scale.set(.09,Math.abs(u.y-h.y)*.9,.09)):(this.neck.visible=!0,this.neck.position.set((u.x+h.x)/2,(u.y+h.y)/2,0),this.neck.quaternion.setFromUnitVectors(nC,new Y(h.x-u.x,h.y-u.y,0).normalize()),this.neck.scale.set(.09,Math.hypot(h.x-u.x,h.y-u.y)*1.1,.09),this.head.position.set(h.x,h.y,0),this.head.rotation.z=0),this.head.visible=o!==1;let g=!!e.hat&&o===0;this.brim.visible=g,this.crown.visible=g,g&&(this.brim.position.set(h.x,h.y+E.headR*.56,0),this.crown.position.set(h.x,h.y+E.headR*.56+.13,0),this.brim.rotation.z=.03,this.crown.rotation.z=.03),this.skirt.visible=!!e.skirt&&o!==4,this.skirt.visible&&this.skirt.position.set(d.x,d.y-.3,0),this.handL.position.set(a.lWrist.x,a.lWrist.y,c),this.handR.position.set(a.rWrist.x,a.rWrist.y,l),this.handL.visible=o!==2,this.footL.position.set(a.lAnkle.x,a.lAnkle.y-.02,.05),this.footR.position.set(a.rAnkle.x,a.rAnkle.y-.02,-.05),this.footL.visible=this.footR.visible=o!==4;let _=e.stare,v=_>.02&&o!==1;if(this.eyeL.visible=this.eyeR.visible=v,v){let e=1+Math.sin(t*3.1)*.06;this.eyeMat.opacity=s*Math.min(1,_*1.25),this.eyeMat.emissiveIntensity=1.6+_*3.4*e,this.eyeL.position.set(h.x-.052,h.y+.012,.135),this.eyeR.position.set(h.x+.052,h.y+.012,.135)}}hide(){this.group.visible=!1}},wC=[[`lShoulder`,`lElbow`],[`lElbow`,`lWrist`],[`rShoulder`,`rElbow`],[`rElbow`,`rWrist`],[`lHip`,`lKnee`],[`lKnee`,`lAnkle`],[`rHip`,`rKnee`],[`rKnee`,`rAnkle`],[`lShoulder`,`lHip`],[`rShoulder`,`rHip`],[`lHip`,`rHip`],[`lShoulder`,`rShoulder`],[`shoulderCenter`,`pelvis`],[`shoulderCenter`,`head`]],TC=14,EC=class{line;geo;positions;constructor(){let e=(wC.length+TC)*2;this.positions=new Float32Array(e*3),this.geo=new Yg,this.geo.setAttribute(`position`,new Rg(this.positions,3)),this.line=new sx(this.geo,new Yb({color:10479830,transparent:!0,opacity:.5,blending:2,depthWrite:!1,toneMapped:!1})),this.line.visible=!1}update(e,t,n,r){if(!e){this.line.visible=!1;return}this.line.visible=!0,this.line.position.set(n,(E.thigh+E.shin)*t,r),this.line.scale.setScalar(t);let i=e.pose,a=this.positions,o=0,s=(e,t,n)=>{a[o++]=e,a[o++]=t,a[o++]=n};for(let[e,t]of wC)s(i[e].x,i[e].y,0),s(i[t].x,i[t].y,0);let c=i.head;for(let e=0;e<TC;e++){let t=e/TC*Math.PI*2,n=(e+1)/TC*Math.PI*2;s(c.x+Math.cos(t)*E.headR,c.y+Math.sin(t)*E.headR,0),s(c.x+Math.cos(n)*E.headR,c.y+Math.sin(n)*E.headR,0)}this.geo.getAttribute(`position`).needsUpdate=!0}},DC={uniforms:{tDiffuse:{value:null},uTime:{value:0},uBlood:{value:0},uGlitch:{value:0},uRes:{value:new q(1,1)}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uBlood;
    uniform float uGlitch;
    uniform vec2 uRes;
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv;
      float row = floor(uv.y * 42.0);
      float slice = step(0.7, hash(vec2(row, floor(uTime * 16.0)))) * uGlitch;
      uv.x += (hash(vec2(row, floor(uTime * 23.0))) - 0.5) * 0.07 * slice;

      float ca = 0.0011 + uGlitch * 0.005;
      vec3 col;
      col.r = texture2D(tDiffuse, uv + vec2(ca, 0.0)).r;
      col.g = texture2D(tDiffuse, uv).g;
      col.b = texture2D(tDiffuse, uv - vec2(ca, 0.0)).b;

      float n = hash(uv * uRes + fract(uTime) * 97.3);
      col += (n - 0.5) * 0.05;

      vec2 d = uv - 0.5;
      float dist = length(d) * 1.26;
      float vig = 1.0 - smoothstep(0.42, 1.02, dist);
      col *= mix(0.34, 1.0, vig);

      float edge = smoothstep(0.22, 0.86, length(d) * 1.45);
      // 环境底色的一点血红：照宣发分镜的调色走，红只压在边缘，画面中间不脏
      col = mix(col, vec3(col.r * 1.28 + 0.012, col.g * 0.62, col.b * 0.6), edge * 0.16);
      col = mix(col, vec3(col.r * 1.45 + 0.035, col.g * 0.24, col.b * 0.2), uBlood * edge * 0.9);

      gl_FragColor = vec4(col, 1.0);
    }
  `},OC=class{renderer;scene=new Jb;camera;composer;grade;bloom;moon;pool=[];wire=new EC;dust;dustBase;dustMat;cracks;crackMat;bottles;playbill;redString;doors;doorL;doorR;shell=[];floorPool;propLight;instLight;exitGlow;w=1;h=1;slim=!1;camDist=rC.z;constructor(e,t,n){this.slim=window.innerWidth<900,this.camDist=t/n<.8?8.8:rC.z,this.renderer=new Kb({canvas:e,antialias:!0,powerPreference:`high-performance`}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,window.innerWidth<900?1.5:2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=2,this.renderer.toneMapping=4,this.renderer.toneMappingExposure=.88,this.renderer.outputColorSpace=em,this.camera=new S_(aC,t/n,.1,120),this.camera.position.copy(rC),this.camera.lookAt(iC),this.scene.fog=new qb(789002,.028);let r=new sv(this.renderer);this.scene.environment=r.fromScene(new eC,.03).texture,this.scene.environmentIntensity=.16,r.dispose(),this.buildRoom(),this.buildLights(),this.applyPlate(),this.wire.line.renderOrder=5,this.scene.add(this.wire.line);let i=this.slim?320:560;this.dustBase=new Float32Array(i*3);let a=new Yg;for(let e=0;e<i;e++)this.dustBase[e*3]=(dC(e*3.1)-.5)*11,this.dustBase[e*3+1]=dC(e*7.7)*4.4,this.dustBase[e*3+2]=-6.2+dC(e*5.3)*12;a.setAttribute(`position`,new Rg(this.dustBase.slice(),3)),this.dustMat=new cx({size:.028,map:_C(),transparent:!0,opacity:.22,depthWrite:!1,blending:2,color:14284012,toneMapped:!1}),this.dust=new px(a,this.dustMat),this.scene.add(this.dust);let o=[];for(let e=0;e<22;e++){let t=(dC(e*3.7)-.5)*sC*.92,n=.2+dC(e*9.1)*4.2,r=dC(e*11.3)*Math.PI*2;for(let i=0;i<5;i++){let a=t+Math.cos(r)*(.18+dC(e*5+i)*.5),s=n+Math.sin(r)*(.18+dC(e*7+i)*.5);o.push(t,n,0,a,s,0),t=a,n=s,r+=(dC(e*13+i)-.5)*1.7}}let s=new Yg;s.setAttribute(`position`,new Vg(o,3)),this.crackMat=new Yb({color:14677999,transparent:!0,opacity:0,blending:2,depthWrite:!1,toneMapped:!1}),this.cracks=new sx(s,this.crackMat),this.cracks.position.set(0,0,-6.47),this.scene.add(this.cracks),this.bottles=this.buildBottles(),this.playbill=this.buildPlaybill(),this.redString=this.buildRedString(),this.doors=this.buildDoors(),this.floorPool=new Z(new L_(9,9),new Fg({map:gC(),transparent:!0,opacity:.055,blending:2,depthWrite:!1,toneMapped:!1})),this.floorPool.rotation.x=-Math.PI/2,this.floorPool.position.set(-1.8,.012,-2.4),this.scene.add(this.floorPool),this.propLight=new SS(16767400,0,4.5,2),this.propLight.position.set(-1.2,.9,-5.1),this.scene.add(this.propLight),this.composer=new qS(this.renderer),this.composer.addPass(new JS(this.scene,this.camera)),this.bloom=new XS(new q(t,n),.38,.45,.86),this.composer.addPass(this.bloom),this.grade=new WS(DC),this.composer.addPass(this.grade),this.composer.addPass(new QS),this.resize(t,n)}applyPlate(){new URLSearchParams(location.search).get(`plate`)===`1`&&new dS().load(uC,e=>{e.colorSpace=em,this.scene.background=e;for(let e of this.shell)e.visible=!1},void 0,()=>console.warn(`[3d] 底板缺失，退回纯程序化厅堂`))}buildRoom(){let e=mC();e.wrapS=e.wrapT=Ff,e.repeat.set(4,4);let t=new Z(new L_(26,26),new Kx({map:e,color:16777215,roughness:.52,metalness:.2,envMapIntensity:.3}));t.rotation.x=-Math.PI/2,t.receiveShadow=!0,this.scene.add(t);let n=new Kx({color:659473,roughness:.92,metalness:.08,side:2}),r=new Z(new L_(26,6),n);r.rotation.y=Math.PI/2,r.position.set(-4.95,3,-1),this.scene.add(r),this.shell.push(r);let i=new Z(new L_(26,6),n);i.rotation.y=-Math.PI/2,i.position.set(lC,3,-1),this.scene.add(i),this.shell.push(i);let a=new Z(new L_(26,26),new Kx({color:329994,roughness:1}));a.rotation.x=Math.PI/2,a.position.y=5.2,this.scene.add(a),this.shell.push(a);let o=new $S(new L_(sC,cC),{clipBias:.003,textureWidth:this.slim?512:1024,textureHeight:this.slim?512:1024,color:6584946});o.position.set(0,2.37,oC),this.scene.add(o);let s=new Kx({color:1316628,roughness:.42,metalness:.65}),c=(e,t,n,r,i,a)=>{let o=new Z(new l_(e,t,n),s);o.position.set(r,i,a),o.castShadow=!0,this.scene.add(o)};c(9.219999999999999,.26,.34,0,4.84,-6.48),c(9.219999999999999,.3,.4,0,-.1,-6.48),c(.3,5.2,.38,-8.6/2-.16,cC/2,-6.48),c(.3,5.2,.38,4.46,cC/2,-6.48);let l=new Fg({color:9086620,transparent:!0,opacity:.34,toneMapped:!1}),u=(e,t,n,r)=>{let i=new Z(new L_(e,t),l);i.position.set(n,r,-6.24),this.scene.add(i)};u(8.54,.02,0,4.66),u(8.54,.02,0,.04),u(.02,4.640000000000001,-4.26,cC/2),u(.02,4.640000000000001,sC/2-.04,cC/2);let d=new Z(new L_(4.3,3.7),new Fg({map:pC(),toneMapped:!1}));d.position.set(-4.92,2.55,-1.6),d.rotation.y=Math.PI/2,this.scene.add(d);let f=new Kx({color:264202,roughness:.75,metalness:.3});for(let e=1;e<=3;e++){let t=-3.75+4.3*e/4,n=new Z(new l_(.09,3.7,.11),f);n.position.set(-4.86,2.55,t),this.scene.add(n)}for(let e=1;e<=2;e++){let t=2.55-1.85+3.7*e/3,n=new Z(new l_(.09,.11,4.3),f);n.position.set(-4.86,t,-1.6),this.scene.add(n)}let p=new Kx({color:725266,roughness:.8,metalness:.12});for(let e of[-1,1])for(let t=0;t<3;t++){let n=new Z(new l_(.36,5.2,.36),p);n.position.set(e*4.75,2.6,1.6-t*2.9),n.castShadow=!0,this.scene.add(n)}let m=new Fg({map:vC(),transparent:!0,opacity:.1,blending:2,depthWrite:!1,side:2,toneMapped:!1});for(let e of[{x:-2.55,y:1.95,z:.7,w:1.15,len:4.9,rot:.74},{x:-2.7,y:1.85,z:-1.3,w:1.6,len:5.2,rot:.7},{x:-2.4,y:2.05,z:-3.1,w:.95,len:4.6,rot:.78}]){let t=new Z(new L_(e.w,e.len),m);t.position.set(e.x,e.y,e.z),t.rotation.z=e.rot,this.scene.add(t)}}buildLights(){let e=new pS(10471357,263946,.2);this.scene.add(e),this.moon=new wS(12839132,1.25),this.moon.position.set(-7.5,5.5,2.4),this.moon.target.position.set(.4,.9,-2.6),this.moon.castShadow=!0,this.moon.shadow.mapSize.set(this.slim?1024:2048,this.slim?1024:2048),this.moon.shadow.camera.left=-8,this.moon.shadow.camera.right=8,this.moon.shadow.camera.top=8,this.moon.shadow.camera.bottom=-8,this.moon.shadow.camera.near=.5,this.moon.shadow.camera.far=30,this.moon.shadow.bias=-.0012,this.scene.add(this.moon,this.moon.target);let t=new wS(14090228,1.05);t.position.set(1.5,4.2,-8),t.target.position.set(0,1.2,1),this.scene.add(t,t.target);let n=new wS(7183509,.3);n.position.set(0,2,7),this.scene.add(n);let r=new SS(11132624,4,12,2);r.position.set(-4.95+.6,2.6,-1.6),this.scene.add(r),this.instLight=new SS(16764822,2.4,5,2),this.scene.add(this.instLight),this.exitGlow=new SS(16722462,9,7.5,2),this.exitGlow.position.set(0,.95,-5.95),this.scene.add(this.exitGlow);let i=new Z(new L_(sC*.94,.045),new Fg({color:16726566,transparent:!0,opacity:.72,toneMapped:!1}));i.position.set(0,.035,-6.08),i.rotation.x=-Math.PI/2,this.scene.add(i)}buildBottles(){let e=new Fb,t=new Kx({color:2246716,roughness:.08,metalness:.2,transparent:!0,opacity:.55,envMapIntensity:1.6}),n=new Kx({color:9080712,roughness:.35,metalness:.8}),r=new Kx({color:12170144,roughness:.85}),i=(i,a,o,s)=>{let c=new Fb,l=new Z(new Hx(.085,.095,.46,18),t);l.position.y=.23;let u=new Z(new Hx(.042,.085,.12,18),t);u.position.y=.52;let d=new Z(new Hx(.04,.042,.15,16),t);d.position.y=.65;let f=new Z(new Hx(.045,.045,.035,16),n);f.position.y=.74;let p=new Z(new Hx(.096,.096,.16,18,1,!0),r);if(p.position.y=.26,c.add(l,u,d,f,p),!s){let e=new Z(new Hx(.072,.082,.36,16),new Kx({color:7027218,roughness:.2,metalness:.1,transparent:!0,opacity:.85}));e.position.y=.19,c.add(e)}c.position.set(i,0,a),c.rotation.y=o,c.traverse(e=>{e.castShadow=!0}),e.add(c)};return i(-1.55,-5.5,.4,!0),i(-.98,-5.62,-.5,!1),e.visible=!1,this.scene.add(e),e}buildPlaybill(){let e=new Z(new L_(.62,.85),new Kx({map:hC(),roughness:.92,metalness:0,side:2}));return e.position.set(1.35,.42,-6.24),e.rotation.set(-.12,-.24,.05),e.visible=!1,this.scene.add(e),e}buildRedString(){let e=[];for(let t=0;t<=12;t++){let n=t/12;e.push(new Y(-4.95+.1,2.95-n*.55,-2.05+Math.sin(n*Math.PI)*.06))}let t=new Z(new Wx(new wx(e),22,.021,6,!1),new Fg({color:13191998,transparent:!0,opacity:.85,toneMapped:!1}));return t.visible=!1,this.scene.add(t),t}buildDoors(){let e=new Fb,t=new Fg({color:0});return this.doorL=new Z(new l_(5.4,8,.2),t),this.doorR=new Z(new l_(5.4,8,.2),t),e.add(this.doorL,this.doorR),e.position.z=2.4,this.scene.add(e),e}resize(e,t){this.w=e,this.h=t,this.camDist=e/t<.8?8.8:rC.z,this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1),this.composer.setSize(e,t),this.grade.uniforms.uRes.value.set(e,t)}render(e,t,n){(t!==this.w||n!==this.h)&&this.resize(t,n);let r=this.camDist,i=t/n<.8,a=2*Math.tan(Pm.degToRad(aC/2))*r*(t/n)/t,o=i?.72:1,s=(e,t=.5,n=.92)=>Math.min(n,Math.max(t,e*a/D*o)),c=e=>(e-t/2)*a,l=(e,t)=>(e+(E.thigh+E.shin)*(t/D)-n*.93)*a*1.25,u=0,d=e=>{if(!this.pool[u]){let t=new CC(e);this.scene.add(t.group),this.pool[u]=t}return this.pool[u++]},f=l(e.instructor.y,e.instructor.height);for(let t of e.zombies){let n=d(!1),r=Math.min(l(t.y,t.height),f-.4),o=c(t.x)*(i?1.14:1);n.update(t,e.time,s(t.height,.42,.85),o+(t.lag??0)*a,r)}let p=d(!0),m=s(e.instructor.height,.6,.95);p.update(e.instructor,e.time,m,c(e.instructor.x),f),this.instLight.position.set(c(e.instructor.x)-.85,1.9,f+1.4);for(let e=u;e<this.pool.length;e++)this.pool[e].hide();let h=e.reflection;h?this.wire.update(h,2.3/D,c(h.x)*.2,-6.28):this.wire.update(null,1,0,0),this.crackMat.opacity=Math.min(.95,e.crack*.9),this.cracks.visible=e.crack>.02;let g=e.ending??0;if(this.bottles.visible=g>.6,this.playbill.visible=g>1.8,this.propLight.intensity=g>.4?Math.min(1,(g-.4)/1.4)*2.2:0,this.redString.visible=(e.level??0)>=3||g>0,this.redString.visible){let t=.55+Math.sin(e.time*2.2)*.25;this.redString.material.opacity=t}let _=this.dust.geometry.getAttribute(`position`),v=_.array;for(let t=0;t<v.length;t+=3)v[t]=this.dustBase[t]+Math.sin(e.time*.22+t)*.12,v[t+1]=.2+(this.dustBase[t+1]+e.time*.055)%4.4,v[t+2]=this.dustBase[t+2]+Math.cos(e.time*.17+t)*.1;_.needsUpdate=!0;let y=e.intro??1;if(this.doors.visible=y<1,this.doors.visible){let e=Math.max(0,Math.min(1,(y-.22)/.58));this.doorL.position.x=-(2.7+e*4.2),this.doorR.position.x=2.7+e*4.2}let b=e.shake,x=(dC(e.time*31)-.5)*b*.34,S=(dC(e.time*47)-.5)*b*.28,C=Math.sin(e.time*.7)*.012;this.camera.position.set(rC.x+x,rC.y+S+C,this.camDist),this.camera.lookAt(iC),this.bloom.strength=.38+(e.crack>.4?.2:0)+b*.16;let w=e.blood,T=dC(Math.floor(e.time*6))>.94?.45:1;this.exitGlow.intensity=(9+w*9)*T,this.grade.uniforms.uTime.value=e.time,this.grade.uniforms.uBlood.value=e.blood,this.grade.uniforms.uGlitch.value=e.glitch,this.dustMat.opacity=.16+(1-e.dark)*.08,this.floorPool.material.opacity=.045+Math.sin(e.time*.8)*.01,this.composer.render()}};function kC(e,t,n){try{let r=document.createElement(`canvas`);return r.getContext(`webgl2`)||r.getContext(`webgl`)?new OC(e,t,n):null}catch{return null}}var AC=document.getElementById(`stage`),jC=document.getElementById(`stage3d`),MC=AC.getContext(`2d`),NC=document.getElementById(`cam`),PC=document.getElementById(`hud`),FC=document.getElementById(`dots`),IC=document.getElementById(`meter`),LC=document.getElementById(`tutbar`),RC=document.getElementById(`toast`),zC=document.getElementById(`touchpad`),BC=Array.from(zC.querySelectorAll(`button[data-key]`)),VC=document.getElementById(`start`),HC=document.getElementById(`result`),UC=document.getElementById(`ending`),WC=new T,GC=null,KC=`keys`,qC=null,JC=0,YC=0;function XC(){let e=Math.min(window.devicePixelRatio||1,2);JC=window.innerWidth,YC=window.innerHeight,AC.width=Math.floor(JC*e),AC.height=Math.floor(YC*e),AC.style.width=JC+`px`,AC.style.height=YC+`px`,MC.setTransform(e,0,0,e,0,0),qC?.resize(JC,YC)}window.addEventListener(`resize`,XC),XC(),qC=kC(jC,JC,YC),qC?(jC.style.display=`block`,AC.classList.add(`offscreen`)):jC.style.display=`none`;function ZC(e){qC=null,jC.style.display=`none`,AC.classList.remove(`offscreen`),GC?.degradeTo2D(),XC(),e&&iw(`3D 舞台中断，已切回 2D`)}jC.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),ZC(!0)});function QC(e){return{time:e,beatPhase:e*.4%1,instructor:Se(ae(me.stand.params),JC*.72,YC*.93,Math.min(YC*.62,JC*.58),{reflection:!0}),zombies:[],reflection:null,crack:0,crowCount:3,dark:.15,glitch:0,shake:0,intro:1,lunge:0,blood:0}}var $C={},ew=!1;function tw(e,t){if($C[e]===t)return;$C[e]=t;let n=document.getElementById(e);n&&(n.textContent=t)}function nw(e,t,n){e.classList.contains(t)!==n&&e.classList.toggle(t,n)}var rw=0;function iw(e){RC.textContent=e,RC.classList.add(`show`),window.clearTimeout(rw),rw=window.setTimeout(()=>RC.classList.remove(`show`),2600)}function aw(e){nw(PC,`hidden`,!e.visible||ew),nw(PC,`tutorial-on`,e.tutorial),nw(PC,`cinema`,e.cinema),nw(LC,`hidden`,!e.tutorial),tw(`round`,e.round),tw(`round-total`,e.roundTotal),tw(`score`,String(e.hits)),tw(`moveinfo`,e.moveTotal?`${e.moveIndex} / ${e.moveTotal}`:``),tw(`cue-name`,e.moveName),tw(`sub`,e.subtitle);let t=document.getElementById(`cue-key`),n=KC===`keys`?e.key:``;if(tw(`cue-key`,n),nw(t,`hidden`,!n),$C.padKey!==n){$C.padKey=n;for(let e of BC)e.classList.toggle(`cue`,!!n&&e.dataset.key===n)}let r=e.dots.join(`,`);if($C.dots!==r){if($C.dots=r,FC.children.length!==e.dots.length){FC.innerHTML=``;for(let t=0;t<e.dots.length;t++)FC.appendChild(document.createElement(`i`))}e.dots.forEach((e,t)=>{FC.children[t].className=e})}let i=Math.round(e.meter*100);$C.meter!==String(i)&&($C.meter=String(i),IC.style.width=`${i}%`,IC.style.opacity=i>0?`1`:`0.25`)}function ow(e,t){tw(e,t.tutorialHits===0?`跳对`:t.hits>t.tutorialHits?`跳对 · 含教学`:`跳对 · 全是教学`)}function sw(e){let t=e.moveNo>0?e.moveTotal?`第 ${e.moveNo} / ${e.moveTotal} 拍`:`第 ${e.moveNo} 拍`:`起手前`,n=`${e.level>6?`终章`:`第 ${e.level} 关`} · ${t}`;if(!e.expected)return n;let r=`「${e.expectedKey} ${e.expected}」`,i;return i=e.mode===`camera`?`该做${r}，身体没有到那个位置`:e.pressed?`该按${r}，你按了「${e.pressed} ${e.pressedName}」`:`该按${r}，这一拍没跟上`,`${n} · ${i}`}function cw(e,t){ew=!0,PC.classList.add(`hidden`);let n=e.level<=1?`你连第一遍都没跳完。
他们在镜子后面，等这一刻等了很久。`:e.level<=3?`你跳错的那一下，她看见了。
镜子里的每一个人都看见了。`:`你已经快跳到最后了。
可他们的手，从来不在乎你跳到第几个。`;document.getElementById(`final-line`).textContent=n;let r=document.getElementById(`final-why`);r.textContent=t?sw(t):``,r.classList.toggle(`hidden`,!t),tw(`final-level`,`第 ${Math.max(1,e.level)} 关`),tw(`final-hits`,String(e.hits)),ow(`final-hits-lbl`,e),tw(`final-heads`,`${e.zombies+1} 人`),HC.classList.remove(`hidden`)}function lw(e){ew=!0,PC.classList.add(`hidden`),document.getElementById(`ending-line`).textContent=`最后一拍，她放下了手。
镜子空了。队伍的最后，多了一个人。
第二天，镜子前放着两瓶汽水。`,tw(`ending-hits`,String(e.hits)),ow(`ending-hits-lbl`,e),tw(`ending-perfect`,String(e.perfects)),UC.classList.remove(`hidden`)}async function uw(e){let t=document.getElementById(`btn-cam`),n=document.getElementById(`btn-keys`),r=document.getElementById(`loadnote`);t.disabled=!0,n.disabled=!0,r.textContent=e===`camera`?`正在加载姿势模型…`:``;try{await WC.init()}catch{iw(`音频初始化失败，将静音游玩`)}let i=null,a=!1;if(KC=e,e===`camera`){let e=new Nf(NC);i=e,e.onLost=()=>{a=!0,GC&&(e.stop(),i===e&&(i=null),KC=`keys`,NC.classList.add(`hidden`),GC.degradeToKeys(),iw(`摄像头断开了，已切到键盘模式`))};try{if(await e.start(),a)throw Error(`camera lost`);NC.classList.remove(`hidden`)}catch{e.stop(),i=null,KC=`keys`,NC.classList.add(`hidden`),iw(`摄像头打不开，已切到键盘模式`)}}$C.dots=``,$C.meter=``,ew=!1,VC.classList.add(`hidden`),HC.classList.add(`hidden`),UC.classList.add(`hidden`),PC.classList.remove(`hidden`),GC=new Ke({audio:WC,tracker:i,mode:KC,renderer:qC,onDeath:cw,onEnding:lw}),a&&KC===`camera`&&(KC=`keys`,i?.stop(),i=null,NC.classList.add(`hidden`),GC.degradeToKeys(),iw(`摄像头断开了，已切到键盘模式`)),GC.begin(),t.disabled=!1,n.disabled=!1,r.textContent=KC===`keys`&&e===`camera`?`摄像头不可用，本次为键盘模式`:``,window.__game=GC}document.getElementById(`btn-cam`).addEventListener(`click`,()=>void uw(`camera`)),document.getElementById(`btn-keys`).addEventListener(`click`,()=>void uw(`keys`)),document.getElementById(`btn-again`).addEventListener(`click`,()=>{HC.classList.add(`hidden`),$C.dots=``,ew=!1,GC?.restart()}),document.getElementById(`btn-again2`).addEventListener(`click`,()=>{UC.classList.add(`hidden`),$C.dots=``,ew=!1,GC?.restart()}),document.getElementById(`btn-replay`).addEventListener(`click`,()=>GC?.replayMove()),document.getElementById(`btn-replayall`).addEventListener(`click`,()=>GC?.replayAll()),document.getElementById(`btn-skip`).addEventListener(`click`,()=>GC?.skipTutorial());for(let e of BC){let t=e.dataset.key,n=n=>{n.preventDefault(),e.classList.add(`on`),GC?.pushKey(t)},r=t=>{t.preventDefault(),e.classList.remove(`on`),GC?.releaseKey()};e.addEventListener(`pointerdown`,n),e.addEventListener(`pointerup`,r),e.addEventListener(`pointercancel`,r),e.addEventListener(`pointerleave`,r)}function dw(){tw(`btn-mute`,WC.toggleMute()?`♪ 已静音`:`♪ 声音`)}document.getElementById(`btn-mute`).addEventListener(`click`,dw),window.addEventListener(`keydown`,e=>{e.key===`m`||e.key===`M`?dw():GC&&([`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`,` `].includes(e.key)&&e.preventDefault(),!e.repeat&&GC.pushKey(e.key))}),window.addEventListener(`keyup`,e=>{GC&&[`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`,`w`,`a`,`s`,`d`].includes(e.key)&&GC.releaseKey()});function fw(e){let t=e/1e3;if(GC)GC.tick(t,JC,YC),GC.render(MC),aw(GC.hud);else{let e=QC(t);qC?qC.render(e,JC,YC):Le(MC,JC,YC,e)}requestAnimationFrame(fw)}requestAnimationFrame(fw);