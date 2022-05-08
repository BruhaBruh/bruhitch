<script lang="ts">
  import { me } from '$lib/stores/me';
  import { ui } from '$lib/stores/ui';
  import FullScreenSpinner from '@components/FullScreenSpinner.svelte';
  import Button from '@components/ui/Button.svelte';
  import Modal from '@components/ui/Modal.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';

  let showRefreshTokenAlert = false;
  let refreshTokenIsLoading = false;

  const handleRefreshToken = async () => {
    refreshTokenIsLoading = true;

    const status = await fetch('/api/v1/user/token', { method: 'PATCH' }).then((r) => r.status);
    refreshTokenIsLoading = false;
    if (status !== 200) {
      ui.toast.add('circle-cancel', $LL.settings.refreshError(), $LL.errorOccurred(), 'danger');
    } else {
      ui.toast.add(
        'circle-check',
        $LL.settings.refreshSuccess(),
        $LL.settings.refreshSuccessDescription(),
        'success'
      );
      showRefreshTokenAlert = false;
    }
  };
</script>

<Modal
  show={showRefreshTokenAlert}
  header={$LL.settings.refreshToken()}
  on:close={() => (showRefreshTokenAlert = false)}
>
  <Typography variant="b1" class="mb-2">
    {$LL.actionCanNotBeUndone()}
  </Typography>
  <Typography variant="b1">
    {$LL.settings.refreshTokenDescription()}
  </Typography>
  <div slot="footer" class="flex justify-end space-x-4 w-full">
    <Button color="secondary" on:click={() => (showRefreshTokenAlert = false)}>
      {$LL.cancel()}
    </Button>
    <Button color="warning" on:click={handleRefreshToken}>
      {$LL.refresh()}
    </Button>
  </div>
</Modal>
<FullScreenSpinner show={refreshTokenIsLoading} />
{#if $me}
  <TextField
    title={$LL.settings.refreshToken()}
    status="validation"
    statusText={$LL.settings.refreshTokenDescription()}
    class="mb-4"
  >
    <Button color="warning" on:click={() => (showRefreshTokenAlert = true)}>
      {$LL.settings.refreshToken()}
    </Button>
  </TextField>
{/if}
