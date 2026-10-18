import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, G, Line, Path, Rect } from 'react-native-svg';
import type { IconKind } from '../data/medicines';

/**
 * Every medicine icon is drawn here in the same flat style, on the same tile, with the same
 * small palette, so the set always looks consistent. They are vector shapes bundled in the app,
 * which means they work with no internet at all (and have no photo-licensing questions).
 */

const WHITE = '#E6EDF3';
const BLUE = '#5B8DEF';
const RED = '#E5484D';
const GREEN = '#30A46C';
const AMBER = '#F5A623';
const GRAY = '#8A8F98';
const TILE = '#1B222C';

function Glyph({ kind }: { kind: IconKind }) {
  switch (kind) {
    case 'acetaminophen': // caplet
      return (
        <G rotation={-35} origin="32, 32">
          <Rect x={10} y={22} width={44} height={20} rx={10} fill={WHITE} />
          <Line x1={32} y1={22} x2={32} y2={42} stroke={GRAY} strokeWidth={2} />
        </G>
      );
    case 'ibuprofen': // round coated tablet
      return (
        <G>
          <Circle cx={32} cy={32} r={19} fill={AMBER} />
          <Circle cx={32} cy={32} r={13} fill="none" stroke="rgba(0,0,0,0.22)" strokeWidth={2} />
        </G>
      );
    case 'aspirin': // scored round tablet
      return (
        <G>
          <Circle cx={32} cy={32} r={19} fill={WHITE} />
          <Line x1={20} y1={32} x2={44} y2={32} stroke={GRAY} strokeWidth={2} />
          <Line x1={32} y1={20} x2={32} y2={44} stroke={GRAY} strokeWidth={2} />
        </G>
      );
    case 'antihistamine': // two-tone capsule
      return (
        <G rotation={-35} origin="32, 32">
          <Path d="M19 22 H32 V42 H19 A10 10 0 0 1 19 22 Z" fill={BLUE} />
          <Path d="M32 22 H45 A10 10 0 0 1 45 42 H32 Z" fill={WHITE} />
        </G>
      );
    case 'ors': // bottle with a drop
      return (
        <G>
          <Rect x={26} y={9} width={12} height={9} rx={2} fill={BLUE} />
          <Rect x={21} y={18} width={22} height={38} rx={6} fill={WHITE} />
          <Rect x={23} y={32} width={18} height={22} rx={4} fill={BLUE} opacity={0.35} />
          <Path d="M32 28 C28 34 27 37 27 39 A5 5 0 0 0 37 39 C37 37 36 34 32 28 Z" fill={BLUE} />
        </G>
      );
    case 'epinephrine': // auto-injector pen
      return (
        <G rotation={-30} origin="32, 32">
          <Rect x={4} y={24} width={14} height={16} rx={3} fill={BLUE} />
          <Rect x={14} y={26} width={36} height={12} rx={4} fill={WHITE} />
          <Rect x={48} y={28} width={10} height={8} rx={2} fill={AMBER} />
        </G>
      );
    case 'naloxone': // nasal spray bottle
      return (
        <G>
          <Rect x={30} y={8} width={4} height={10} rx={2} fill={BLUE} />
          <Rect x={28} y={16} width={8} height={8} fill={GRAY} />
          <Rect x={22} y={24} width={20} height={32} rx={5} fill={WHITE} />
          <Rect x={22} y={34} width={20} height={9} fill={GREEN} />
        </G>
      );
    case 'inhaler': // L-shaped inhaler
      return (
        <G>
          <Rect x={18} y={8} width={20} height={32} rx={6} fill={BLUE} />
          <Rect x={18} y={32} width={32} height={18} rx={7} fill={WHITE} />
          <Rect x={48} y={36} width={10} height={10} rx={2} fill={GRAY} />
        </G>
      );
    case 'glucose': // candy-style roll of tablets
      return (
        <G>
          <Rect x={10} y={23} width={44} height={18} rx={9} fill={GREEN} />
          <Circle cx={22} cy={32} r={3.5} fill={WHITE} />
          <Circle cx={32} cy={32} r={3.5} fill={WHITE} />
          <Circle cx={42} cy={32} r={3.5} fill={WHITE} />
        </G>
      );
    case 'bandage': // adhesive bandage
      return (
        <G rotation={-35} origin="32, 32">
          <Rect x={6} y={23} width={52} height={18} rx={9} fill="#E7B98E" />
          <Rect x={23} y={23} width={18} height={18} fill={WHITE} />
          <Circle cx={29} cy={29} r={1.5} fill={GRAY} />
          <Circle cx={35} cy={29} r={1.5} fill={GRAY} />
          <Circle cx={29} cy={35} r={1.5} fill={GRAY} />
          <Circle cx={35} cy={35} r={1.5} fill={GRAY} />
        </G>
      );
    case 'thermometer':
      return (
        <G>
          <Rect x={28} y={8} width={8} height={36} rx={4} fill={WHITE} />
          <Circle cx={32} cy={47} r={9} fill={RED} />
          <Rect x={30.5} y={20} width={3} height={28} fill={RED} />
          <Line x1={39} y1={16} x2={44} y2={16} stroke={GRAY} strokeWidth={2} />
          <Line x1={39} y1={23} x2={44} y2={23} stroke={GRAY} strokeWidth={2} />
          <Line x1={39} y1={30} x2={44} y2={30} stroke={GRAY} strokeWidth={2} />
        </G>
      );
    case 'coldpack': // cold pack with snowflake
      return (
        <G>
          <Rect x={13} y={13} width={38} height={38} rx={9} fill={BLUE} />
          <Line x1={32} y1={21} x2={32} y2={43} stroke={WHITE} strokeWidth={3} strokeLinecap="round" />
          <G rotation={60} origin="32, 32">
            <Line x1={32} y1={21} x2={32} y2={43} stroke={WHITE} strokeWidth={3} strokeLinecap="round" />
          </G>
          <G rotation={120} origin="32, 32">
            <Line x1={32} y1={21} x2={32} y2={43} stroke={WHITE} strokeWidth={3} strokeLinecap="round" />
          </G>
        </G>
      );
    case 'antacid': // two chewable discs
      return (
        <G>
          <Circle cx={25} cy={36} r={14} fill={WHITE} />
          <Circle cx={25} cy={36} r={9} fill="none" stroke={GRAY} strokeWidth={2} />
          <Circle cx={40} cy={27} r={14} fill="#F4B6C2" />
          <Circle cx={40} cy={27} r={9} fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth={2} />
        </G>
      );
    case 'saline': // nasal spray bottle
      return (
        <G>
          <Rect x={29} y={8} width={6} height={10} rx={2} fill={GRAY} />
          <Rect x={24} y={17} width={16} height={9} rx={2} fill={BLUE} />
          <Rect x={22} y={26} width={20} height={30} rx={5} fill={WHITE} />
          <Path d="M32 34 C28 40 27 43 27 45 A5 5 0 0 0 37 45 C37 43 36 40 32 34 Z" fill={BLUE} />
        </G>
      );
    case 'cream': // squeeze tube
      return (
        <G>
          <Rect x={26} y={8} width={12} height={11} rx={2} fill={BLUE} />
          <Path d="M20 19 H44 L40 51 H24 Z" fill={WHITE} />
          <Rect x={23} y={30} width={18} height={9} fill={GREEN} />
          <Rect x={24} y={51} width={16} height={5} rx={1} fill={GRAY} />
        </G>
      );
    default:
      return null;
  }
}

export function MedIcon({ kind, size = 56 }: { kind: IconKind; size?: number }) {
  const tile = size + 20;
  return (
    <View
      style={{
        width: tile,
        height: tile,
        borderRadius: 18,
        backgroundColor: TILE,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg width={size} height={size} viewBox="0 0 64 64">
        <Glyph kind={kind} />
      </Svg>
    </View>
  );
}
