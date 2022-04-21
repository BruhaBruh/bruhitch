import { SettingName, type Settings } from '$types/chat/settings';

class UrlEncoder {
  private url: URL;
  private settings: Settings;

  constructor(settings: Settings, origin: string) {
    this.url = new URL(origin);
    this.settings = settings;
  }

  private setChannel(): this {
    this.url.pathname = '/chat/' + this.settings.channel;
    return this;
  }

  private setHiddenNicknames(): this {
    if (this.settings.hiddenNicknames.length !== 0) {
      this.url.searchParams.append(
        SettingName.HiddenNicknames,
        this.settings.hiddenNicknames.join(',')
      );
    }
    return this;
  }

  private setDefaultColor(): this {
    if (this.settings.defaultColor) {
      this.url.searchParams.append(
        SettingName.DefaultColor,
        this.settings.defaultColor.replace('#', '')
      );
    }
    return this;
  }

  private setCustomNicknameColors(): this {
    if (Object.keys(this.settings.nicknameColors).length !== 0) {
      let v = [];
      Object.keys(this.settings.nicknameColors).forEach((nickname) => {
        const color = this.settings.nicknameColors[nickname];
        if (typeof color === 'string') {
          v.push(`${nickname}:${color.replace('#', '')}`);
        } else {
          v.push(`${nickname}:${color.start.replace('#', '')}:${color.end.replace('#', '')}`);
        }
      });

      this.url.searchParams.append(SettingName.CustomNicknameColors, v.join(','));
    }
    return this;
  }

  private setFont(): this {
    if (this.settings.font) {
      this.url.searchParams.append(SettingName.Font, this.settings.font);
    }
    return this;
  }

  private setAnimation(): this {
    if (this.settings.animation) {
      this.url.searchParams.append(SettingName.Animation, this.settings.animation);
    }
    return this;
  }

  private setAnimationEasing(): this {
    if (this.settings.animationEasing) {
      this.url.searchParams.append(SettingName.AnimationEasing, this.settings.animationEasing);
    }
    return this;
  }

  private setAnimationParams(): this {
    if (Object.keys(this.settings.animationParams).length !== 0) {
      let v = [];
      Object.keys(this.settings.animationParams).forEach((key) => {
        if (!this.settings.animationParams[key]) return;
        v.push(key + ':' + this.settings.animationParams[key]);
      });

      if (v.length !== 0) this.url.searchParams.append(SettingName.AnimationParams, v.join(','));
    }
    return this;
  }

  private setHideReward(): this {
    if (this.settings.hideReward) {
      this.url.searchParams.append(SettingName.HideReward, '1');
    }
    return this;
  }

  private setDisablePadding(): this {
    if (this.settings.disablePadding) {
      this.url.searchParams.append(SettingName.DisablePadding, '1');
    }
    return this;
  }

  private setFontSize(): this {
    if (this.settings.fontSize !== 16) {
      this.url.searchParams.append(SettingName.FontSize, this.settings.fontSize.toString());
    }
    return this;
  }

  private setGradientOnlyCustom(): this {
    if (this.settings.gradientOnlyCustom) {
      this.url.searchParams.append(SettingName.GradientOnlyCustom, '1');
    }
    return this;
  }

  private setChatType(): this {
    if (this.settings.chatType !== 'default') {
      this.url.searchParams.append(SettingName.ChatType, this.settings.chatType);
    }
    return this;
  }

  public getLink(): URL {
    return this.setChannel()
      .setFontSize()
      .setChatType()
      .setHiddenNicknames()
      .setDefaultColor()
      .setCustomNicknameColors()
      .setFont()
      .setAnimation()
      .setAnimationEasing()
      .setAnimationParams()
      .setHideReward()
      .setDisablePadding()
      .setGradientOnlyCustom().url;
  }
}

export default UrlEncoder;
