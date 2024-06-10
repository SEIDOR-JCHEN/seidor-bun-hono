import { AreaUOM, CapacityUOM, LengthUOM, VolumeUOM, WeightUOM } from '../constants/uoms.constant.ts'

export function weightToKg(value: number, uom: WeightUOM): number {
  switch (uom) {
    case WeightUOM.KG:
      return value
    case WeightUOM.MG:
      return value / 1000000
    case WeightUOM.LB:
      return value * 0.453592
    case WeightUOM.OZ:
      return value * 0.0283495
    case WeightUOM.TON:
      return value * 1000
    case WeightUOM.GR:
      return value / 1000
    default:
      throw new Error('Invalid weight unit of measure')
  }
}

export function lengthToM(value: number, uom: LengthUOM): number {
  switch (uom) {
    case LengthUOM.M:
      return value
    case LengthUOM.KM:
      return value * 1000
    case LengthUOM.CM:
      return value / 100
    case LengthUOM.MM:
      return value / 1000
    case LengthUOM.IN:
      return value * 0.0254
    case LengthUOM.FT:
      return value * 0.3048
    case LengthUOM.YD:
      return value * 0.9144
    default:
      throw new Error('Invalid length unit of measure')
  }
}

export function capacityToL(value: number, uom: CapacityUOM): number {
  switch (uom) {
    case CapacityUOM.L:
      return value
    case CapacityUOM.ML:
      return value / 1000
    case CapacityUOM.GAL:
      return value * 3.78541
    case CapacityUOM.QT:
      return value * 0.946353
    case CapacityUOM.PT:
      return value * 0.473176
    case CapacityUOM.CUP:
      return value * 0.236588
    default:
      throw new Error('Invalid volume unit of measure')
  }
}

export function areaToM2(value: number, uom: AreaUOM): number {
  switch (uom) {
    case AreaUOM.M2:
      return value
    case AreaUOM.CM2:
      return value / 10000
    case AreaUOM.MM2:
      return value / 1000000
    case AreaUOM.IN2:
      return value * 0.00064516
    case AreaUOM.FT2:
      return value * 0.092903
    case AreaUOM.YD2:
      return value * 0.836127
    default:
      throw new Error('Invalid area unit of measure')
  }
}

export function volumeToM3(value: number, uom: VolumeUOM): number {
  switch (uom) {
    case VolumeUOM.M3:
      return value
    case VolumeUOM.CM3:
      return value / 1000000
    case VolumeUOM.MM3:
      return value / 1000000000
    case VolumeUOM.IN3:
      return value * 0.0000163871
    case VolumeUOM.FT3:
      return value * 0.0283168
    case VolumeUOM.YD3:
      return value * 0.764555
    default:
      throw new Error('Invalid volume unit of measure')
  }
}
