import { BREAKPOINT, THEME } from '@bfoese/eg-ui-models';

class BreakpointMap {
  private values: Map<BREAKPOINT, number>;

  constructor(xs: number, sm: number, md: number, lg: number, xl: number) {
    this.values = new Map([
      [BREAKPOINT.XS, xs],
      [BREAKPOINT.SM, sm],
      [BREAKPOINT.MD, md],
      [BREAKPOINT.LG, lg],
      [BREAKPOINT.XL, xl]
    ]);
  }

  public getValue(breakpoint: number): number | undefined {
    return this.values.get(breakpoint);
  }
}

export class BreakpointConfig {
  private static breakpointValueMap = new Map<THEME, BreakpointMap>([
    [THEME.SSD, new BreakpointMap(320, 568, 768, 1024, 1280)]
  ]);

  public static breakpointValue(
    theme: THEME,
    breakpoint: BREAKPOINT
  ): number | undefined {
    return this.breakpointValueMap.get(theme)?.getValue(breakpoint);
  }
}
