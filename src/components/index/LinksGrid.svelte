<script lang="ts">
  import Typography from '@components/ui/Typography.svelte';
</script>

<div class="links-grid grid gap-2">
  <a
    href="https://github.com/BruhaBruh/bruhitch"
    target="_blank"
    class={[
      'p-2 sm:p-4 cursor-pointer space-x-4',
      'flex items-center justify-start rounded-default disabled:text-gray-dark disabled:bg-gray-light dark:disabled:text-gray-light dark:disabled:bg-gray-dark transition ease-in',
      'border text-gray-darkest border-gray-base bg-gray-lightest hover:bg-gray-lighter dark:text-gray-lightest dark:bg-gray-darkest dark:hover:bg-gray-darker'
    ]
      .filter(Boolean)
      .join(' ')}
  >
    <svg
      height="64"
      aria-hidden="true"
      viewBox="0 0 16 16"
      version="1.1"
      width="64"
      data-view-component="true"
      class="fill-gray-darkest dark:fill-gray-lightest"
    >
      <path
        fill-rule="evenodd"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
    <Typography variant="button">GitHub клиента</Typography>
  </a>
  <a
    href="https://github.com/BruhaBruh/bruhitch-api"
    target="_blank"
    class={[
      'p-2 sm:p-4 cursor-pointer space-x-4',
      'flex items-center justify-start rounded-default disabled:text-gray-dark disabled:bg-gray-light dark:disabled:text-gray-light dark:disabled:bg-gray-dark transition ease-in',
      'border text-gray-darkest border-gray-base bg-gray-lightest hover:bg-gray-lighter dark:text-gray-lightest dark:bg-gray-darkest dark:hover:bg-gray-darker'
    ]
      .filter(Boolean)
      .join(' ')}
  >
    <svg
      height="64"
      aria-hidden="true"
      viewBox="0 0 16 16"
      version="1.1"
      width="64"
      data-view-component="true"
      class="fill-gray-darkest dark:fill-gray-lightest"
    >
      <path
        fill-rule="evenodd"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
    <Typography variant="button">GitHub сервера</Typography>
  </a>
  <a
    href="https://t.me/bruhabruh"
    target="_blank"
    class={[
      'p-2 sm:p-4 cursor-pointer space-x-4',
      'flex items-center justify-start rounded-default disabled:text-gray-dark disabled:bg-gray-light dark:disabled:text-gray-light dark:disabled:bg-gray-dark transition ease-in',
      'border text-gray-darkest border-gray-base bg-gray-lightest hover:bg-gray-lighter dark:text-gray-lightest dark:bg-gray-darkest dark:hover:bg-gray-darker'
    ]
      .filter(Boolean)
      .join(' ')}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      height="64"
      viewBox="0 0 1000 1000"
      version="1.1"
    >
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="99.2583404%" id="linearGradient-1">
          <stop stop-color="#2AABEE" offset="0%" />
          <stop stop-color="#229ED9" offset="100%" />
        </linearGradient>
      </defs>
      <g id="Artboard" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <circle id="Oval" fill="url(#linearGradient-1)" cx="500" cy="500" r="500" />
        <path
          d="M226.328419,494.722069 C372.088573,431.216685 469.284839,389.350049 517.917216,369.122161 C656.772535,311.36743 685.625481,301.334815 704.431427,301.003532 C708.567621,300.93067 717.815839,301.955743 723.806446,306.816707 C728.864797,310.92121 730.256552,316.46581 730.922551,320.357329 C731.588551,324.248848 732.417879,333.113828 731.758626,340.040666 C724.234007,419.102486 691.675104,610.964674 675.110982,699.515267 C668.10208,736.984342 654.301336,749.547532 640.940618,750.777006 C611.904684,753.448938 589.856115,731.588035 561.733393,713.153237 C517.726886,684.306416 492.866009,666.349181 450.150074,638.200013 C400.78442,605.66878 432.786119,587.789048 460.919462,558.568563 C468.282091,550.921423 596.21508,434.556479 598.691227,424.000355 C599.00091,422.680135 599.288312,417.758981 596.36474,415.160431 C593.441168,412.561881 589.126229,413.450484 586.012448,414.157198 C581.598758,415.158943 511.297793,461.625274 375.109553,553.556189 C355.154858,567.258623 337.080515,573.934908 320.886524,573.585046 C303.033948,573.199351 268.692754,563.490928 243.163606,555.192408 C211.851067,545.013936 186.964484,539.632504 189.131547,522.346309 C190.260287,513.342589 202.659244,504.134509 226.328419,494.722069 Z"
          id="Path-3"
          fill="#FFFFFF"
        />
      </g>
    </svg>
    <Typography variant="button">Telegram создателя</Typography>
  </a>
  <a
    href="https://twitch.tv/bruhabruh"
    target="_blank"
    class={[
      'p-2 sm:p-4 cursor-pointer space-x-4',
      'flex items-center justify-start rounded-default disabled:text-gray-dark disabled:bg-gray-light dark:disabled:text-gray-light dark:disabled:bg-gray-dark transition ease-in',
      'border text-gray-darkest border-gray-base bg-gray-lightest hover:bg-gray-lighter dark:text-gray-lightest dark:bg-gray-darkest dark:hover:bg-gray-darker'
    ]
      .filter(Boolean)
      .join(' ')}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      id="Layer_1"
      height="64"
      viewBox="0 0 2400 2800"
      style="enable-background:new 0 0 2400 2800;"
      xml:space="preserve"
    >
      <style type="text/css">
        .st0 {
          fill: #ffffff;
        }
        .st1 {
          fill: #9146ff;
        }
      </style>
      <title>Asset 2</title>
      <g>
        <polygon
          class="st0"
          points="2200,1300 1800,1700 1400,1700 1050,2050 1050,1700 600,1700 600,200 2200,200  "
        />
        <g>
          <g id="Layer_1-2">
            <path
              class="st1"
              d="M500,0L0,500v1800h600v500l500-500h400l900-900V0H500z M2200,1300l-400,400h-400l-350,350v-350H600V200h1600     V1300z"
            />
            <rect x="1700" y="550" class="st1" width="200" height="600" />
            <rect x="1150" y="550" class="st1" width="200" height="600" />
          </g>
        </g>
      </g>
    </svg>
    <Typography variant="button">Twitch создателя</Typography>
  </a>
  <a
    href="https://www.donationalerts.com/r/bruhabruh"
    target="_blank"
    class={[
      'p-2 sm:p-4 cursor-pointer space-x-4',
      'flex items-center justify-start rounded-default disabled:text-gray-dark disabled:bg-gray-light dark:disabled:text-gray-light dark:disabled:bg-gray-dark transition ease-in',
      'border text-gray-darkest border-gray-base bg-gray-lightest hover:bg-gray-lighter dark:text-gray-lightest dark:bg-gray-darkest dark:hover:bg-gray-darker'
    ]
      .filter(Boolean)
      .join(' ')}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      height="64"
      viewBox="0 0 69 80"
      version="1.1"
    >
      <defs>
        <linearGradient x1="74.9906006%" y1="0%" x2="19.1353629%" y2="100%" id="linearGradient-1">
          <stop stop-color="#FC8722" offset="0%" />
          <stop stop-color="#F57507" offset="100%" />
        </linearGradient>
        <linearGradient x1="87.1953125%" y1="0%" x2="12.8046875%" y2="100%" id="linearGradient-2">
          <stop stop-color="#F59C07" offset="0%" />
          <stop stop-color="#F57507" offset="100%" />
        </linearGradient>
      </defs>
      <g id="Dashboard" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g
          id="Brand"
          transform="translate(-536.000000, -275.000000)"
          fill="url(#linearGradient-2)"
          fill-rule="nonzero"
        >
          <g id="Logos" transform="translate(390.000000, 120.000000)">
            <g id="1" transform="translate(0.000000, 120.000000)">
              <g id="Logo" transform="translate(146.000000, 35.000000)">
                <path
                  d="M34.8586103,46.5882227 L29.4383109,46.5882227 C29.1227896,46.5896404 28.8214241,46.4709816 28.6091788,46.2617625 C28.3969336,46.0525435 28.2937566,45.7724279 28.325313,45.4910942 L28.8039021,40.6038855 C28.8504221,40.0844231 29.3353656,39.684617 29.9168999,39.6862871 L35.3371993,39.6862871 C35.6527206,39.6848694 35.9540862,39.8035282 36.1663314,40.0127473 C36.3785767,40.2219663 36.4817536,40.5020819 36.4501972,40.7834156 L35.9716081,45.6706244 C35.9250881,46.1900867 35.4401446,46.5898928 34.8586103,46.5882227 Z M35.7273704,37.0196078 L30.2062624,37.0196078 C29.5964177,37.0196078 29.1020408,36.5436108 29.1020408,35.9564386 L30.6037822,19.445421 C30.6711655,18.9085577 31.1463683,18.5059261 31.7080038,18.5098321 L37.2291117,18.5098321 C37.8389565,18.5098321 38.3333333,18.9858292 38.3333333,19.5730013 L36.7874231,36.0946506 C36.71732,36.6114677 36.2684318,37.0031485 35.7273704,37.0196078 Z M68.1907868,17.7655375 C68.7783609,18.4477209 69.0654113,19.3359027 68.9874243,20.2304671 L66.8294442,44.7595227 C66.7602449,45.5618649 66.4022166,46.3125114 65.8210422,46.8737509 L48.1740082,63.9078173 C47.5440361,64.5136721 46.7011436,64.8515656 45.8244317,64.849701 L27.0379034,64.849701 L10.5001116,80 L11.780782,64.8396809 L3.37070981,64.8396809 C2.42614186,64.8404154 1.52467299,64.4469919 0.886144518,63.7553546 C0.247616048,63.0637173 -0.0692823639,62.1374374 0.0127313353,61.2024067 L5.14549723,3.00601995 C5.32162283,1.29571214 6.77326374,-0.00377492304 8.50347571,8.23911697e-06 L51.3303063,8.23911697e-06 C52.3155567,-0.000274507348 53.2515294,0.428127083 53.8916472,1.17235281 L68.1907868,17.7655375 Z M55.1118136,40.0801644 L56.4832402,24.9398854 C56.5364472,24.0422509 56.2238954,23.1611024 55.6160145,22.4949959 L47.548799,13.2364798 C46.9095165,12.5050105 45.982605,12.084699 45.0076261,12.0841753 L19.5958971,12.0841753 C17.8656851,12.0803922 16.4140442,13.3798792 16.2379186,15.090187 L13.2127128,49.1583198 C13.1430685,50.0904539 13.4642119,51.0097453 14.1001037,51.6985265 C14.7359954,52.3873077 15.6300918,52.7843324 16.5706913,52.795594 L41.5588914,52.795594 C42.4258216,52.7976549 43.2601656,52.4674704 43.8882999,51.8737504 L54.1034116,42.2044127 C54.6867718,41.6406314 55.0449815,40.8860452 55.1118136,40.0801644 Z"
                  id="DA_Logo"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
    <Typography variant="button">DonationAlerts создателя</Typography>
  </a>
</div>

<style lang="postcss">
  .links-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
</style>
