<script lang="ts">
  import { me } from '$lib/stores/me';
  import { ui } from '$lib/stores/ui';
  import FullScreenSpinner from '@components/FullScreenSpinner.svelte';
  import Button from '@components/ui/Button.svelte';
  import Modal from '@components/ui/Modal.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';

  let showDeleteAccountAlert = false;
  let deleteAccountIsLoading = false;

  const handleDeleteAccount = async () => {
    deleteAccountIsLoading = true;

    const status = await fetch('/api/v1/user/remove', { method: 'DELETE' }).then((r) => r.status);
    deleteAccountIsLoading = false;
    if (status !== 200) {
      ui.toast.add(
        'circle-cancel',
        $LL.settings.accountNotDeleted(),
        $LL.errorOccurred(),
        'danger'
      );
    } else {
      ui.toast.add('circle-check', $LL.settings.accountDeleted(), undefined, 'success');
      me.reset();
      showDeleteAccountAlert = false;
    }
  };
</script>

<Modal
  show={showDeleteAccountAlert}
  header={$LL.settings.deleteAccount()}
  on:close={() => (showDeleteAccountAlert = false)}
>
  <Typography variant="b1">
    {$LL.actionCanNotBeUndone()}
  </Typography>
  <div slot="footer" class="flex justify-end space-x-4 w-full">
    <Button color="secondary" on:click={() => (showDeleteAccountAlert = false)}>
      {$LL.cancel()}
    </Button>
    <Button color="danger" on:click={handleDeleteAccount}>
      {$LL.delete()}
    </Button>
  </div>
</Modal>
<FullScreenSpinner show={deleteAccountIsLoading} />
{#if $me}
  <TextField title={$LL.settings.deleteAccount()} class="mb-4">
    <Button class="w-full max-w-sm" color="danger" on:click={() => (showDeleteAccountAlert = true)}>
      {$LL.settings.deleteAccount()}
    </Button>
  </TextField>
{/if}
