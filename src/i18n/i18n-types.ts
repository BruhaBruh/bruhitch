// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales =
	| 'en'
	| 'ru'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	pageNames: {
		/**
		 * Bruhitch
		 */
		index: string
		/**
		 * Bruhitch › {0}
		 * @param {unknown} 0
		 */
		another: RequiredParams<'0'>
	}
	/**
	 * Authorization is required
	 */
	authorization: string
	/**
	 * Continue with Twitch
	 */
	continueWithTwitch: string
	/**
	 * Dont show link anyone
	 */
	dontShowLinkAnyone: string
	/**
	 * Preview widget link
	 */
	preview: string
	/**
	 * This action cannot be undone, are you sure?
	 */
	actionCanNotBeUndone: string
	settings: {
		/**
		 * Settings
		 */
		name: string
		/**
		 * Theme
		 */
		theme: string
		/**
		 * Dark
		 */
		darkTheme: string
		/**
		 * Light
		 */
		lightTheme: string
		/**
		 * Language
		 */
		language: string
		/**
		 * Delete account
		 */
		deleteAccount: string
		/**
		 * Account deleted
		 */
		accountDeleted: string
		/**
		 * Account not deleted
		 */
		accountNotDeleted: string
		/**
		 * Refresh token
		 */
		refreshToken: string
		/**
		 * After this update your widget links. Just copy
		 */
		refreshTokenDescription: string
		/**
		 * Error on refresh token
		 */
		refreshError: string
		/**
		 * Token is Refreshed
		 */
		refreshSuccess: string
		/**
		 * Update your widget links
		 */
		refreshSuccessDescription: string
	}
	chat: {
		/**
		 * Chat
		 */
		name: string
		/**
		 * Chat widget link generator
		 */
		title: string
		/**
		 * Incorrect url
		 */
		incorrectUrl: string
		controls: {
			/**
			 * Nickname
			 */
			nickname: string
			/**
			 * Channel
			 */
			channel: string
			/**
			 * Chat type
			 */
			chatType: string
			/**
			 * Default
			 */
			'default': string
			/**
			 * Block
			 */
			block: string
			/**
			 * Alternative block
			 */
			alternativeBlock: string
			/**
			 * Hide rewards
			 */
			hideRewards: string
			/**
			 * Hide claim channel points rewards in chat
			 */
			hideRewardsDescription: string
			/**
			 * Hidden nicknames
			 */
			hiddenNicknames: string
			/**
			 * Default color
			 */
			defaultColor: string
			/**
			 * Gradient only to custom nicknames
			 */
			gradientOnlyToCustomNicknames: string
			/**
			 * Custom color nicknames
			 */
			customColorNicknames: string
			/**
			 * Is gradient?
			 */
			isGradient: string
			/**
			 * Font
			 */
			font: string
			/**
			 * Font size
			 */
			fontSize: string
			/**
			 * Disable padding
			 */
			disablePadding: string
			/**
			 * Animation
			 */
			animation: string
			animationParams: {
				/**
				 * Animation parameters
				 */
				name: string
				/**
				 * duration in ms
				 */
				duration: string
				/**
				 * start scale
				 */
				startScale: string
				/**
				 * opacity
				 */
				opacity: string
			}
			/**
			 * Chat widget link
			 */
			chatLink: string
			/**
			 * Load config from link
			 */
			loadConfigFromLink: string
		}
	}
	donationAlerts: {
		/**
		 * Donation alerts
		 */
		name: string
	}
	followAlerts: {
		/**
		 * Follow alerts
		 */
		name: string
		/**
		 * Follow alert settings
		 */
		title: string
		controls: {
			/**
			 * Font
			 */
			font: string
			/**
			 * Font size
			 */
			fontSize: string
			/**
			 * Disable padding
			 */
			disablePadding: string
			/**
			 * Animation
			 */
			animation: string
			animationParams: {
				/**
				 * Animation parameters
				 */
				name: string
				/**
				 * start scale
				 */
				startScale: string
				/**
				 * opacity
				 */
				opacity: string
			}
			/**
			 * Pattern
			 */
			pattern: string
			/**
			 * $username$ - show username. ![text](link) - image
			 */
			patternDescription: string
			/**
			 * Text color
			 */
			textColor: string
			/**
			 * Background color
			 */
			backgroundColor: string
			/**
			 * Background image
			 */
			backgroundImage: string
			/**
			 * Link to image
			 */
			backgroundImageDescription: string
			/**
			 * Nickname color
			 */
			colorNickname: string
			/**
			 * Is gradient nickname?
			 */
			isGradientNickname: string
			/**
			 * Vertical alignment
			 */
			verticalAlign: string
			/**
			 * Horizontal alignment
			 */
			horizontalAlign: string
			/**
			 * Top
			 */
			top: string
			/**
			 * Bottom
			 */
			bottom: string
			/**
			 * Center
			 */
			center: string
			/**
			 * Right
			 */
			right: string
			/**
			 * Left
			 */
			left: string
			/**
			 * Follow alert widget link
			 */
			widgetLink: string
		}
	}
	subscribeAlerts: {
		/**
		 * Subscribe alerts
		 */
		name: string
		/**
		 * Subscribe alert settings
		 */
		title: string
		controls: {
			/**
			 * Subscribe/Resubscribe pattern
			 */
			subPattern: string
			/**
			 * $username$ - new sub. ![](link) - image
			 */
			subPatternDescription: string
			/**
			 * Gift pattern
			 */
			giftPattern: string
			/**
			 * $username$ - who gift sub. $recipient$ - new sub. ![](link) - image
			 */
			giftPatternDescription: string
			/**
			 * Gift with multiple months
			 */
			giftMultiMonthPattern: string
			/**
			 * $username$ - who gift sub. $recipient$ - new sub. $duration$ - months. ![](link) - image
			 */
			giftMultiMonthPatternDescription: string
			/**
			 * Anonymous
			 */
			anonymous: string
			/**
			 * This replaces $username$ when anonymous gifts a subscription
			 */
			anonymousDescription: string
			/**
			 * Disable padding
			 */
			disablePadding: string
			/**
			 * Font
			 */
			font: string
			/**
			 * Font size
			 */
			fontSize: string
			/**
			 * Image
			 */
			image: string
			/**
			 * Username color
			 */
			usernameColor: string
			/**
			 * Recipient color
			 */
			recipientColor: string
			/**
			 * Is gradient username?
			 */
			isGradientUsername: string
			/**
			 * Is gradient recipient?
			 */
			isGradientRecipient: string
			/**
			 * Animation
			 */
			animation: string
			animationParams: {
				/**
				 * Animation parameters
				 */
				name: string
				/**
				 * start scale
				 */
				startScale: string
				/**
				 * opacity
				 */
				opacity: string
			}
			/**
			 * Vertical alignment
			 */
			verticalAlign: string
			/**
			 * Top
			 */
			top: string
			/**
			 * Bottom
			 */
			bottom: string
			/**
			 * Center
			 */
			center: string
			/**
			 * Subscribe alert widget link
			 */
			widgetLink: string
		}
	}
	predictionWidget: {
		/**
		 * Predication widget
		 */
		name: string
		/**
		 * Predication widget settings
		 */
		title: string
		controls: {
			/**
			 * Text color
			 */
			textColor: string
			/**
			 * Blue color
			 */
			blueColor: string
			/**
			 * Pink color
			 */
			pinkColor: string
			/**
			 * Channel points image
			 */
			channelPointImage: string
			/**
			 * Disable padding
			 */
			disablePadding: string
			/**
			 * Font
			 */
			font: string
			/**
			 * Font size
			 */
			fontSize: string
			/**
			 * Hide delay
			 */
			hideDelay: string
			/**
			 * Animation
			 */
			animation: string
			animationParams: {
				/**
				 * Animation parameters
				 */
				name: string
				/**
				 * start scale
				 */
				startScale: string
				/**
				 * duration in ms
				 */
				duration: string
				/**
				 * opacity
				 */
				opacity: string
			}
			/**
			 * Vertical alignment
			 */
			verticalAlign: string
			/**
			 * Top
			 */
			top: string
			/**
			 * Bottom
			 */
			bottom: string
			/**
			 * Center
			 */
			center: string
			/**
			 * Predication widget link
			 */
			widgetLink: string
		}
	}
	raidAlerts: {
		/**
		 * Raid alerts
		 */
		name: string
	}
	bitsAlerts: {
		/**
		 * Bits alerts
		 */
		name: string
	}
	/**
	 * Copy
	 */
	copy: string
	/**
	 * Copied
	 */
	copied: string
	/**
	 * Refresh
	 */
	refresh: string
	/**
	 * Load
	 */
	load: string
	/**
	 * Loaded
	 */
	loaded: string
	/**
	 * Add
	 */
	add: string
	/**
	 * Save
	 */
	save: string
	/**
	 * Saved
	 */
	saved: string
	/**
	 * Remove
	 */
	remove: string
	/**
	 * Delete
	 */
	'delete': string
	/**
	 * Cancel
	 */
	cancel: string
	/**
	 * Work In Progress
	 */
	wip: string
	/**
	 * An error has occurred
	 */
	errorOccurred: string
}

export type TranslationFunctions = {
	pageNames: {
		/**
		 * Bruhitch
		 */
		index: () => LocalizedString
		/**
		 * Bruhitch › {0}
		 */
		another: (arg0: unknown) => LocalizedString
	}
	/**
	 * Authorization is required
	 */
	authorization: () => LocalizedString
	/**
	 * Continue with Twitch
	 */
	continueWithTwitch: () => LocalizedString
	/**
	 * Dont show link anyone
	 */
	dontShowLinkAnyone: () => LocalizedString
	/**
	 * Preview widget link
	 */
	preview: () => LocalizedString
	/**
	 * This action cannot be undone, are you sure?
	 */
	actionCanNotBeUndone: () => LocalizedString
	settings: {
		/**
		 * Settings
		 */
		name: () => LocalizedString
		/**
		 * Theme
		 */
		theme: () => LocalizedString
		/**
		 * Dark
		 */
		darkTheme: () => LocalizedString
		/**
		 * Light
		 */
		lightTheme: () => LocalizedString
		/**
		 * Language
		 */
		language: () => LocalizedString
		/**
		 * Delete account
		 */
		deleteAccount: () => LocalizedString
		/**
		 * Account deleted
		 */
		accountDeleted: () => LocalizedString
		/**
		 * Account not deleted
		 */
		accountNotDeleted: () => LocalizedString
		/**
		 * Refresh token
		 */
		refreshToken: () => LocalizedString
		/**
		 * After this update your widget links. Just copy
		 */
		refreshTokenDescription: () => LocalizedString
		/**
		 * Error on refresh token
		 */
		refreshError: () => LocalizedString
		/**
		 * Token is Refreshed
		 */
		refreshSuccess: () => LocalizedString
		/**
		 * Update your widget links
		 */
		refreshSuccessDescription: () => LocalizedString
	}
	chat: {
		/**
		 * Chat
		 */
		name: () => LocalizedString
		/**
		 * Chat widget link generator
		 */
		title: () => LocalizedString
		/**
		 * Incorrect url
		 */
		incorrectUrl: () => LocalizedString
		controls: {
			/**
			 * Nickname
			 */
			nickname: () => LocalizedString
			/**
			 * Channel
			 */
			channel: () => LocalizedString
			/**
			 * Chat type
			 */
			chatType: () => LocalizedString
			/**
			 * Default
			 */
			'default': () => LocalizedString
			/**
			 * Block
			 */
			block: () => LocalizedString
			/**
			 * Alternative block
			 */
			alternativeBlock: () => LocalizedString
			/**
			 * Hide rewards
			 */
			hideRewards: () => LocalizedString
			/**
			 * Hide claim channel points rewards in chat
			 */
			hideRewardsDescription: () => LocalizedString
			/**
			 * Hidden nicknames
			 */
			hiddenNicknames: () => LocalizedString
			/**
			 * Default color
			 */
			defaultColor: () => LocalizedString
			/**
			 * Gradient only to custom nicknames
			 */
			gradientOnlyToCustomNicknames: () => LocalizedString
			/**
			 * Custom color nicknames
			 */
			customColorNicknames: () => LocalizedString
			/**
			 * Is gradient?
			 */
			isGradient: () => LocalizedString
			/**
			 * Font
			 */
			font: () => LocalizedString
			/**
			 * Font size
			 */
			fontSize: () => LocalizedString
			/**
			 * Disable padding
			 */
			disablePadding: () => LocalizedString
			/**
			 * Animation
			 */
			animation: () => LocalizedString
			animationParams: {
				/**
				 * Animation parameters
				 */
				name: () => LocalizedString
				/**
				 * duration in ms
				 */
				duration: () => LocalizedString
				/**
				 * start scale
				 */
				startScale: () => LocalizedString
				/**
				 * opacity
				 */
				opacity: () => LocalizedString
			}
			/**
			 * Chat widget link
			 */
			chatLink: () => LocalizedString
			/**
			 * Load config from link
			 */
			loadConfigFromLink: () => LocalizedString
		}
	}
	donationAlerts: {
		/**
		 * Donation alerts
		 */
		name: () => LocalizedString
	}
	followAlerts: {
		/**
		 * Follow alerts
		 */
		name: () => LocalizedString
		/**
		 * Follow alert settings
		 */
		title: () => LocalizedString
		controls: {
			/**
			 * Font
			 */
			font: () => LocalizedString
			/**
			 * Font size
			 */
			fontSize: () => LocalizedString
			/**
			 * Disable padding
			 */
			disablePadding: () => LocalizedString
			/**
			 * Animation
			 */
			animation: () => LocalizedString
			animationParams: {
				/**
				 * Animation parameters
				 */
				name: () => LocalizedString
				/**
				 * start scale
				 */
				startScale: () => LocalizedString
				/**
				 * opacity
				 */
				opacity: () => LocalizedString
			}
			/**
			 * Pattern
			 */
			pattern: () => LocalizedString
			/**
			 * $username$ - show username. ![text](link) - image
			 */
			patternDescription: () => LocalizedString
			/**
			 * Text color
			 */
			textColor: () => LocalizedString
			/**
			 * Background color
			 */
			backgroundColor: () => LocalizedString
			/**
			 * Background image
			 */
			backgroundImage: () => LocalizedString
			/**
			 * Link to image
			 */
			backgroundImageDescription: () => LocalizedString
			/**
			 * Nickname color
			 */
			colorNickname: () => LocalizedString
			/**
			 * Is gradient nickname?
			 */
			isGradientNickname: () => LocalizedString
			/**
			 * Vertical alignment
			 */
			verticalAlign: () => LocalizedString
			/**
			 * Horizontal alignment
			 */
			horizontalAlign: () => LocalizedString
			/**
			 * Top
			 */
			top: () => LocalizedString
			/**
			 * Bottom
			 */
			bottom: () => LocalizedString
			/**
			 * Center
			 */
			center: () => LocalizedString
			/**
			 * Right
			 */
			right: () => LocalizedString
			/**
			 * Left
			 */
			left: () => LocalizedString
			/**
			 * Follow alert widget link
			 */
			widgetLink: () => LocalizedString
		}
	}
	subscribeAlerts: {
		/**
		 * Subscribe alerts
		 */
		name: () => LocalizedString
		/**
		 * Subscribe alert settings
		 */
		title: () => LocalizedString
		controls: {
			/**
			 * Subscribe/Resubscribe pattern
			 */
			subPattern: () => LocalizedString
			/**
			 * $username$ - new sub. ![](link) - image
			 */
			subPatternDescription: () => LocalizedString
			/**
			 * Gift pattern
			 */
			giftPattern: () => LocalizedString
			/**
			 * $username$ - who gift sub. $recipient$ - new sub. ![](link) - image
			 */
			giftPatternDescription: () => LocalizedString
			/**
			 * Gift with multiple months
			 */
			giftMultiMonthPattern: () => LocalizedString
			/**
			 * $username$ - who gift sub. $recipient$ - new sub. $duration$ - months. ![](link) - image
			 */
			giftMultiMonthPatternDescription: () => LocalizedString
			/**
			 * Anonymous
			 */
			anonymous: () => LocalizedString
			/**
			 * This replaces $username$ when anonymous gifts a subscription
			 */
			anonymousDescription: () => LocalizedString
			/**
			 * Disable padding
			 */
			disablePadding: () => LocalizedString
			/**
			 * Font
			 */
			font: () => LocalizedString
			/**
			 * Font size
			 */
			fontSize: () => LocalizedString
			/**
			 * Image
			 */
			image: () => LocalizedString
			/**
			 * Username color
			 */
			usernameColor: () => LocalizedString
			/**
			 * Recipient color
			 */
			recipientColor: () => LocalizedString
			/**
			 * Is gradient username?
			 */
			isGradientUsername: () => LocalizedString
			/**
			 * Is gradient recipient?
			 */
			isGradientRecipient: () => LocalizedString
			/**
			 * Animation
			 */
			animation: () => LocalizedString
			animationParams: {
				/**
				 * Animation parameters
				 */
				name: () => LocalizedString
				/**
				 * start scale
				 */
				startScale: () => LocalizedString
				/**
				 * opacity
				 */
				opacity: () => LocalizedString
			}
			/**
			 * Vertical alignment
			 */
			verticalAlign: () => LocalizedString
			/**
			 * Top
			 */
			top: () => LocalizedString
			/**
			 * Bottom
			 */
			bottom: () => LocalizedString
			/**
			 * Center
			 */
			center: () => LocalizedString
			/**
			 * Subscribe alert widget link
			 */
			widgetLink: () => LocalizedString
		}
	}
	predictionWidget: {
		/**
		 * Predication widget
		 */
		name: () => LocalizedString
		/**
		 * Predication widget settings
		 */
		title: () => LocalizedString
		controls: {
			/**
			 * Text color
			 */
			textColor: () => LocalizedString
			/**
			 * Blue color
			 */
			blueColor: () => LocalizedString
			/**
			 * Pink color
			 */
			pinkColor: () => LocalizedString
			/**
			 * Channel points image
			 */
			channelPointImage: () => LocalizedString
			/**
			 * Disable padding
			 */
			disablePadding: () => LocalizedString
			/**
			 * Font
			 */
			font: () => LocalizedString
			/**
			 * Font size
			 */
			fontSize: () => LocalizedString
			/**
			 * Hide delay
			 */
			hideDelay: () => LocalizedString
			/**
			 * Animation
			 */
			animation: () => LocalizedString
			animationParams: {
				/**
				 * Animation parameters
				 */
				name: () => LocalizedString
				/**
				 * start scale
				 */
				startScale: () => LocalizedString
				/**
				 * duration in ms
				 */
				duration: () => LocalizedString
				/**
				 * opacity
				 */
				opacity: () => LocalizedString
			}
			/**
			 * Vertical alignment
			 */
			verticalAlign: () => LocalizedString
			/**
			 * Top
			 */
			top: () => LocalizedString
			/**
			 * Bottom
			 */
			bottom: () => LocalizedString
			/**
			 * Center
			 */
			center: () => LocalizedString
			/**
			 * Predication widget link
			 */
			widgetLink: () => LocalizedString
		}
	}
	raidAlerts: {
		/**
		 * Raid alerts
		 */
		name: () => LocalizedString
	}
	bitsAlerts: {
		/**
		 * Bits alerts
		 */
		name: () => LocalizedString
	}
	/**
	 * Copy
	 */
	copy: () => LocalizedString
	/**
	 * Copied
	 */
	copied: () => LocalizedString
	/**
	 * Refresh
	 */
	refresh: () => LocalizedString
	/**
	 * Load
	 */
	load: () => LocalizedString
	/**
	 * Loaded
	 */
	loaded: () => LocalizedString
	/**
	 * Add
	 */
	add: () => LocalizedString
	/**
	 * Save
	 */
	save: () => LocalizedString
	/**
	 * Saved
	 */
	saved: () => LocalizedString
	/**
	 * Remove
	 */
	remove: () => LocalizedString
	/**
	 * Delete
	 */
	'delete': () => LocalizedString
	/**
	 * Cancel
	 */
	cancel: () => LocalizedString
	/**
	 * Work In Progress
	 */
	wip: () => LocalizedString
	/**
	 * An error has occurred
	 */
	errorOccurred: () => LocalizedString
}

export type Formatters = {}
