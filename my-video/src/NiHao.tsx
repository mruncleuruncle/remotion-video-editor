import {
  AbsoluteFill,
  Composition,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const NiHao = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({
    frame: frame - 8,
    fps,
    config: { damping: 11, stiffness: 180, mass: 0.7 },
  });
  const exit = interpolate(frame, [100, 119], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glow = 0.85 + Math.sin((frame / fps) * Math.PI * 2) * 0.15;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: 190,
          fontWeight: 900,
          letterSpacing: -7,
          whiteSpace: "nowrap",
          color: "#fff236",
          scale: String(
            pop *
              interpolate(frame, [100, 119], [1, 0.88], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
          ),
          translate: `0px ${interpolate(pop, [0, 1], [100, 0])}px`,
          opacity:
            interpolate(frame, [8, 13], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }) * exit,
          textShadow: `0 0 8px #fff98a, 0 0 ${24 * glow}px #ffe600, 0 0 ${65 * glow}px #ffd000, 0 0 ${120 * glow}px #ffb80099`,
        }}
      >
        Ni Hao
      </div>
    </AbsoluteFill>
  );
};

export const NiHaoComposition = () => (
  <Composition
    id="NiHao"
    component={NiHao}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={120}
  />
);
