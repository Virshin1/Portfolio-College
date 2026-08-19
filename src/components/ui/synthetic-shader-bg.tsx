import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SyntheticShaderBgProps {
  className?: string;
  speed?: number;
  opacity?: number;
}

export const SyntheticShaderBg: React.FC<SyntheticShaderBgProps> = ({
  className = '',
  speed = 0.35,
  opacity = 0.28,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.Camera;
    material: THREE.ShaderMaterial;
    geometry: THREE.PlaneGeometry;
    animId: number;
    clock: THREE.Clock;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;

      varying vec2 vUv;
      uniform float u_time;
      uniform vec3 u_resolution;

      vec2 toPolar(vec2 p) {
          float r = length(p);
          float a = atan(p.y, p.x);
          return vec2(r, a);
      }

      void mainImage(out vec4 fragColor, in vec2 fragCoord) {
          vec2 p = 5.0 * ((fragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y);

          vec2 polar = toPolar(p);
          float r = polar.x;

          vec2 i = p;
          float c = 0.0;
          float rot = r + u_time + p.x * 0.100;
          for (float n = 0.0; n < 4.0; n++) {
              float rr = r + 0.15 * sin(u_time * 0.7 + float(n) + r * 2.0);
              p *= mat2(
                  cos(rot - sin(u_time / 10.0)), sin(rot),
                  -sin(cos(rot) - u_time / 10.0), cos(rot)
              ) * -0.25;

              float t = r - u_time / (n + 30.0);
              i -= p + sin(t - i.y) + rr;

              c += 2.2 / length(vec2(
                  (sin(i.x + t) / 0.15),
                  (cos(i.y + t) / 0.15)
              ));
          }

          c /= 8.0;

          // Subtle elegant dark emerald / zinc theme
          vec3 baseColor = vec3(0.12, 0.50, 0.35);
          vec3 finalColor = baseColor * smoothstep(0.0, 1.0, c * 0.65);

          fragColor = vec4(finalColor, 1.0);
      }

      void main() {
          vec4 fragColor;
          vec2 fragCoord = vUv * u_resolution.xy;
          mainImage(fragColor, fragCoord);
          gl_FragColor = fragColor;
      }
    `;

    const camera = new THREE.Camera();
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector3(width, height, 1.0) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthTest: false,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.domElement.style.width = '100vw';
    renderer.domElement.style.height = '100vh';
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.pointerEvents = 'none';

    container.appendChild(renderer.domElement);

    const clock = new THREE.Clock();

    const handleResize = () => {
      if (!container || !renderer) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      uniforms.u_resolution.value.set(w, h, 1.0);
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      const animId = requestAnimationFrame(animate);
      if (sceneRef.current) {
        sceneRef.current.animId = animId;
      }

      uniforms.u_time.value = clock.getElapsedTime() * speed;
      renderer.render(scene, camera);
    };

    sceneRef.current = {
      renderer,
      scene,
      camera,
      material,
      geometry,
      animId: 0,
      clock,
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animId);
        if (container.contains(sceneRef.current.renderer.domElement)) {
          container.removeChild(sceneRef.current.renderer.domElement);
        }
        sceneRef.current.renderer.dispose();
        sceneRef.current.geometry.dispose();
        sceneRef.current.material.dispose();
        sceneRef.current = null;
      }
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      style={{ opacity }}
    />
  );
};
