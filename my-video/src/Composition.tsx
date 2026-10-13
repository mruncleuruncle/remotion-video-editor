import { Audio, Video } from "@remotion/media";
import type { Caption } from "@remotion/captions";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import {
  AbsoluteFill,
  Composition,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = { title: string; videoPath: string; audioPath: string };

// JSON-compatible Caption data; replace with imported/transcribed captions.
const Captions = ({ captions }: { captions: Caption[] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = captions.find(
    (caption) =>
      (frame * 1000) / fps >= caption.startMs &&
      (frame * 1000) / fps < caption.endMs,
  );
  return active ? (
    <div
      style={{
        position: "absolute",
        bottom: 170,
        left: 70,
        right: 70,
        textAlign: "center",
        fontSize: 44,
        fontWeight: 600,
        background: "#101827dd",
        padding: 24,
        borderRadius: 24,
      }}
    >
      {active.text}
    </div>
  ) : null;
};

const Opening = ({ title, videoPath }: Pick<Props, "title" | "videoPath">) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Video
        src={staticFile(videoPath)}
        muted
        objectFit="cover"
        premountFor={fps}
        style={{ width: "100%", height: "100%" }}
      />
      <AbsoluteFill
        style={{ background: "linear-gradient(transparent, #081222ee)" }}
      />
      <div
        style={{
          position: "absolute",
          top: 210,
          left: 80,
          right: 80,
          fontSize: 100,
          fontWeight: 800,
          lineHeight: 1.05,
          opacity: interpolate(frame, [0, fps * 0.6], [0, 1], {
            extrapolateRight: "clamp",
          }),
          translate: `${0}px ${interpolate(frame, [0, fps * 0.6], [60, 0], { extrapolateRight: "clamp" })}px`,
        }}
      >
        {title}
      </div>
      <Captions
        captions={[
          {
            text: "Start with your footage.",
            startMs: 400,
            endMs: 2400,
            timestampMs: null,
            confidence: null,
          },
        ]}
      />
    </AbsoluteFill>
  );
};

const Animation = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{ background: "#081222", justifyContent: "center", padding: 80 }}
    >
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "#14b8a6",
          opacity: 0.25,
          top: 360,
          left: 240,
          scale: String(interpolate(frame, [0, 3 * fps], [0.5, 1.5])),
        }}
      />
      <div
        style={{
          fontSize: 96,
          fontWeight: 800,
          lineHeight: 1.12,
          opacity: interpolate(frame, [0, 0.5 * fps], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        Make it
        <br />
        <span style={{ color: "#5eead4" }}>move.</span>
      </div>
      <Captions
        captions={[
          {
            text: "Add animation, audio and captions.",
            startMs: 300,
            endMs: 2700,
            timestampMs: null,
            confidence: null,
          },
        ]}
      />
    </AbsoluteFill>
  );
};

export const VerticalSample = ({ title, videoPath, audioPath }: Props) => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ color: "white", fontFamily: "Arial, sans-serif" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={3 * fps} premountFor={fps}>
          <Opening title={title} videoPath={videoPath} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 0.5 * fps })}
        />
        <TransitionSeries.Sequence durationInFrames={3 * fps} premountFor={fps}>
          <Animation />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Audio src={staticFile(audioPath)} premountFor={fps} />
    </AbsoluteFill>
  );
};

export const MyComposition = () => (
  <Composition
    id="VerticalSample"
    component={VerticalSample}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={165}
    defaultProps={{
      title: "Your story.\nIn motion.",
      videoPath: "media/placeholder.mp4",
      audioPath: "media/sample.wav",
    }}
  />
);
