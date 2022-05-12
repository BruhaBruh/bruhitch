<script lang="ts">
  import donate from '$lib/stores/donate/donate';
  import config from '$lib/stores/follow/config';
  import { Currency, type DonationAlert } from '$types/donate';
  import faker from '@faker-js/faker';
  import { onDestroy, onMount } from 'svelte';
  import DonateWidget from './widget/DonateWidget.svelte';

  let timeout: NodeJS.Timeout;

  const templateOfDonateWithSound: DonationAlert = {
    amount: 1,
    amount_in_user_currency: 1,
    created_at: '2022-04-28 16:19:17',
    currency: Currency.RussianRuble,
    id: 96263913,
    is_shown: 0,
    message:
      'https://static.donationalerts.ru/audiodonations/113978/7e495ed981e5c8ce25a3347ef08c081c.wav',
    message_type: 'audio',
    name: 'Donations',
    reason: 'default',
    recipient_name: '',
    shown_at: null,
    username: ''
  };

  const templateOfDonateWithText: DonationAlert = {
    amount: 1,
    amount_in_user_currency: 1,
    created_at: '2021-01-19 13:43:01',
    currency: Currency.RussianRuble,
    id: 74519375,
    is_shown: 1,
    message: '',
    message_type: 'text',
    name: 'Donations',
    reason: 'default',
    recipient_name: '',
    shown_at: null,
    username: ''
  };

  onMount(() => {
    sendNewDonate();
  });

  const sendNewDonate = () => {
    const templates = [templateOfDonateWithSound, templateOfDonateWithText];
    const currencies = [
      Currency.BelarusianRuble,
      Currency.BrazilianReal,
      Currency.Euro,
      Currency.Hryvnia,
      Currency.RussianRuble,
      Currency.Tenge,
      Currency.TurkishLira,
      Currency.USDollar
    ];

    const template = templates[Math.floor(Math.random() * templates.length)];
    const currency = currencies[Math.floor(Math.random() * currencies.length)];

    if (template.message_type === 'text') {
      template.message = faker.random.words(faker.datatype.number({ min: 0, max: 25 }));
    }
    const amount = faker.datatype.number({ min: 10, max: 200000 });

    template.amount = amount;
    template.amount_in_user_currency = amount;
    template.currency = currency;
    template.username = faker.datatype.boolean() ? null : faker.name.findName();

    donate.add(template);

    timeout = setTimeout(sendNewDonate, Math.floor(Math.random() * 5000 + 2000));
  };

  onDestroy(() => clearTimeout(timeout));

  config.subscribe((v) => donate.reset());
</script>

<div
  {...$$restProps}
  class={[
    'preview border border-gray-base h-full flex items-center justify-center overflow-hidden bg-gray-lightest',
    $$restProps.class
  ]
    .filter(Boolean)
    .join(' ')}
>
  <div class="h-full w-full flex flex-col items-stretch justify-start overflow-hidden">
    <DonateWidget />
  </div>
</div>

<style lang="postcss">
  .preview {
    height: 576px;
  }
</style>
