import { isColor } from '$lib/color';
import { Animation, AnimationEasing, type AnimationParams } from '$types/animation';
import type { UserNicknameColor } from '$types/chat/nickname';
import { SettingName, type ChatType, type Settings } from '$types/chat/settings';

class UrlParser {
  private url: URL;

  constructor(url: URL | string) {
    if (typeof url === 'string') {
      this.url = new URL(url);
    } else {
      this.url = url;
    }
  }

  public getChannel(): string {
    const [, , channel] = this.url.pathname.split('/');
    return channel.replace(/-preview$/i, '');
  }

  public getHiddenNicknames(): string[] {
    const hidden = this.url.searchParams.get(SettingName.HiddenNicknames);
    if (!hidden) return [];
    return hidden.split(',');
  }

  public getDefaultColor(): string {
    const defaultColor = this.url.searchParams.get(SettingName.DefaultColor);
    if (!defaultColor) return '';
    return '#' + defaultColor;
  }

  public getNicknameColors(): UserNicknameColor {
    let colors: UserNicknameColor = {};
    const custom = this.url.searchParams.get(SettingName.CustomNicknameColors);

    if (!custom) return colors;

    custom.split(',').forEach((nicknameWithColors) => {
      const [nickname, start, end] = nicknameWithColors.split(':');
      if (!end) {
        if (!isColor('#' + start)) return;
        colors = {
          ...colors,
          [nickname]: '#' + start
        };
      } else {
        if (!isColor('#' + start) || !isColor('#' + end)) return;
        colors = {
          ...colors,
          [nickname]: {
            start: '#' + start,
            end: '#' + end
          }
        };
      }
    });

    return colors;
  }

  public getFont(): string {
    const font = this.url.searchParams.get(SettingName.Font);
    return font ?? '';
  }

  public getAnimation(): Animation {
    const animation: string = this.url.searchParams.get(SettingName.Animation);
    if (Object.values(Animation).includes(animation as Animation)) {
      return animation as Animation;
    }
    return Animation.Slide;
  }

  public getAnimationEasing(): AnimationEasing {
    const animationEasing: string = this.url.searchParams.get(SettingName.AnimationEasing);
    if (Object.values(AnimationEasing).includes(animationEasing as AnimationEasing)) {
      return animationEasing as AnimationEasing;
    }
    return AnimationEasing.Linear;
  }

  public getAnimationParams(): AnimationParams {
    let params: AnimationParams = {};
    const animationParams: string = this.url.searchParams.get(SettingName.AnimationParams);
    if (!animationParams) return params;

    animationParams.split(',').forEach((param) => {
      const [key, value] = param.split(':');
      try {
        const numberValue = Number(value);
        if (Number.isNaN(numberValue)) throw new Error(key + ' is NaN');
        params = {
          [key]: numberValue
        };
      } catch (e) {
        console.error(e);
      }
    });

    return params;
  }

  public getHideReward(): boolean {
    const hideReward = this.url.searchParams.get(SettingName.HideReward);
    return !!hideReward;
  }

  public getDisablePadding(): boolean {
    const disablePadding = this.url.searchParams.get(SettingName.DisablePadding);
    return !!disablePadding;
  }

  public getFontSize(): number {
    const fontSize = this.url.searchParams.get(SettingName.FontSize);
    try {
      const n = Number(fontSize);
      if (!Number.isNaN(n) && n >= 8) return n;
    } catch (e) {}
    return 16;
  }

  public getGradientOnlyCustom(): boolean {
    const gradientOnlyCustom = this.url.searchParams.get(SettingName.GradientOnlyCustom);
    return !!gradientOnlyCustom;
  }

  public getChatType(): ChatType {
    const chatType = this.url.searchParams.get(SettingName.ChatType) as ChatType;
    return chatType ?? 'default';
  }

  public getSettings(): Settings {
    return {
      channel: this.getChannel(),
      hiddenNicknames: this.getHiddenNicknames(),
      defaultColor: this.getDefaultColor(),
      nicknameColors: this.getNicknameColors(),
      font: this.getFont(),
      animation: this.getAnimation(),
      animationEasing: this.getAnimationEasing(),
      animationParams: this.getAnimationParams(),
      hideReward: this.getHideReward(),
      disablePadding: this.getDisablePadding(),
      fontSize: this.getFontSize(),
      gradientOnlyCustom: this.getGradientOnlyCustom(),
      chatType: this.getChatType()
    };
  }
}

export default UrlParser;
